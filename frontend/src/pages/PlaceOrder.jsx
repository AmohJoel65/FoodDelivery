import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { MapPin, Truck, ChevronRight, CheckCircle, AlertTriangle, Phone, User } from "lucide-react";
import { parseApiError, normalizeCameroonPhone } from "../utils/apiErrors";

const CAMEROON_CITIES = [
  "Bamenda",
  "Douala",
  "Yaoundé",
  "Buea",
  "Limbe",
  "Garoua",
  "Maroua",
  "Kribi",
  "Ngaoundéré",
  "Bafoussam",
  "Ebolowa",
];

const EMPTY_FORM = {
  fullName: "",
  phone: "",
  city: "Bamenda",
  quarter: "",
  landmark: "",
  deliveryZoneId: "",
};

const PlaceOrder = () => {
  const { cartItems, setCartItems, food_list, getCartSubtotal, token, user, url, formatPrice, showAlert } =
    useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();

  const subtotal = getCartSubtotal();
  const [discount, setDiscount] = useState(0);
  const [deliveryZones, setDeliveryZones] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState(3000);
  const [form, setForm] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const total = Math.max(0, subtotal + deliveryFee - discount);

  useEffect(() => {
    if (location.state?.discount) setDiscount(location.state.discount);
  }, [location.state]);

  useEffect(() => {
    if (subtotal === 0) navigate("/cart");
  }, [subtotal, navigate]);

  useEffect(() => {
    if (user?.name) {
      setForm((prev) => ({ ...prev, fullName: prev.fullName || user.name }));
    }
  }, [user]);

  useEffect(() => {
    const loadZones = async () => {
      try {
        const res = await fetch(`${url}/api/delivery/zones`);
        const data = await res.json();
        if (data.success && data.deliveryZones?.length) {
          setDeliveryZones(data.deliveryZones);
          setForm((prev) => ({
            ...prev,
            deliveryZoneId: prev.deliveryZoneId || data.deliveryZones[0]._id,
          }));
          setDeliveryFee(data.deliveryZones[0].baseFee);
        }
      } catch {
        // keep default fee
      }
    };
    loadZones();
  }, [url]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "deliveryZoneId") {
      const zone = deliveryZones.find((z) => z._id === value);
      if (zone) setDeliveryFee(zone.baseFee);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!form.fullName.trim()) errors.fullName = "Enter your full name";
    if (!form.phone.trim()) {
      errors.phone = "Enter your phone number";
    } else if (!/^(\+?237)?[6-9]\d{8}$/.test(form.phone.replace(/\s/g, ""))) {
      errors.phone = "Use a valid number like 677 123 456";
    }
    if (!form.city) errors.city = "Select your city";
    if (!form.quarter.trim()) errors.quarter = "Enter your neighborhood (quarter)";
    if (deliveryZones.length && !form.deliveryZoneId) {
      errors.deliveryZoneId = "Select a delivery area";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const buildOrderItems = () => {
    const items = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        items.push({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: cartItems[item._id],
          description: item.description,
          category: item.category,
          image: item.image,
        });
      }
    });
    return items;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const response = await fetch(`${url}/api/order/place`, {
        method: "POST",
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify({
          address: {
            fullName: form.fullName.trim(),
            phone: normalizeCameroonPhone(form.phone),
            city: form.city,
            quarter: form.quarter.trim(),
            landmark: form.landmark.trim(),
          },
          items: buildOrderItems(),
          amount: total,
          deliveryZoneId: form.deliveryZoneId || undefined,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setPlacedOrderId(data.orderId);
        setShowPayment(true);
      } else {
        showAlert(
          parseApiError(data.message, "We couldn't place your order. Please check your details."),
          "error",
          "Could not place order"
        );
      }
    } catch {
      showAlert("No internet connection. Check your network and try again.", "error", "Connection problem");
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmPayment = async (confirmed) => {
    setPaymentLoading(true);
    try {
      const response = await fetch(`${url}/api/order/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: placedOrderId, success: confirmed }),
      });
      const data = await response.json();

      if (data.success && confirmed) {
        setPaymentSuccess(true);
        setCartItems({}); // Clear the cart state on the frontend
        setTimeout(() => {
          setShowPayment(false);
          navigate("/myorders");
        }, 2000);
      } else {
        showAlert("Order cancelled. You can order again anytime.", "warning", "Order cancelled");
        setShowPayment(false);
        navigate("/");
      }
    } catch {
      showAlert("Could not confirm payment. Contact us if you already paid.", "error", "Confirmation failed");
    } finally {
      setPaymentLoading(false);
    }
  };

  const FieldError = ({ name }) =>
    fieldErrors[name] ? (
      <p className="text-[11px] text-red-600 mt-1">{fieldErrors[name]}</p>
    ) : null;

  const inputClass = (name) =>
    `w-full px-4 py-3.5 rounded-xl border outline-none text-sm transition-colors ${
      fieldErrors[name]
        ? "border-red-300 bg-red-50/50 focus:border-red-400"
        : "border-[#1a1a1a]/10 focus:border-[#d4af37]"
    }`;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 min-h-[600px] animate-in fade-in duration-500">
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-1">Step 2 of 2</p>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1a1a1a]">Delivery details</h2>
        <p className="text-sm text-[#1a1a1a]/50 mt-1">
          Tell us where to bring your order. Only the essentials — name, phone, and location.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="space-y-8">
        {/* Delivery form */}
        <div className="bg-white rounded-2xl border border-[#1a1a1a]/8 p-6 sm:p-8 shadow-sm space-y-5">
          <h3 className="text-sm font-bold text-[#1a1a1a] flex items-center gap-2 pb-1">
            <MapPin size={16} className="text-[#d4af37]" />
            Where should we deliver?
          </h3>

          <div>
            <label className="text-xs font-semibold text-[#1a1a1a]/60 mb-1.5 flex items-center gap-1.5">
              <User size={13} /> Full name
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="e.g. Amoh Joel"
              className={inputClass("fullName")}
            />
            <FieldError name="fullName" />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1a1a1a]/60 mb-1.5 flex items-center gap-1.5">
              <Phone size={13} /> Phone number (Mobile Money)
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="e.g. 677 123 456"
              className={inputClass("phone")}
            />
            <FieldError name="phone" />
            <p className="text-[10px] text-[#1a1a1a]/40 mt-1">We'll call or text you when your order is on the way.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#1a1a1a]/60 mb-1.5 block">City</label>
              <select name="city" value={form.city} onChange={handleChange} className={inputClass("city")}>
                {CAMEROON_CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <FieldError name="city" />
            </div>

            {deliveryZones.length > 0 && (
              <div>
                <label className="text-xs font-semibold text-[#1a1a1a]/60 mb-1.5 block">Delivery area</label>
                <select
                  name="deliveryZoneId"
                  value={form.deliveryZoneId}
                  onChange={handleChange}
                  className={inputClass("deliveryZoneId")}
                >
                  {deliveryZones.map((zone) => (
                    <option key={zone._id} value={zone._id}>
                      {zone.name} — {formatPrice(zone.baseFee)}
                    </option>
                  ))}
                </select>
                <FieldError name="deliveryZoneId" />
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1a1a1a]/60 mb-1.5 block">Neighborhood / Quarter</label>
            <input
              type="text"
              name="quarter"
              value={form.quarter}
              onChange={handleChange}
              placeholder="e.g. Nkwen, Mile 4, Bonamoussadi"
              className={inputClass("quarter")}
            />
            <FieldError name="quarter" />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1a1a1a]/60 mb-1.5 block">
              Landmark <span className="font-normal text-[#1a1a1a]/35">(optional)</span>
            </label>
            <input
              type="text"
              name="landmark"
              value={form.landmark}
              onChange={handleChange}
              placeholder="e.g. Near City Chemist, opposite Total station"
              className={inputClass("landmark")}
            />
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-[#1a1a1a] text-[#fdfbf7] rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <Truck size={16} className="text-[#d4af37]" />
            Order summary
          </h3>

          <div className="space-y-2 text-sm max-h-36 overflow-y-auto">
            {food_list.map((item) => {
              const qty = cartItems[item._id] || 0;
              if (!qty) return null;
              return (
                <div key={item._id} className="flex justify-between text-white/80">
                  <span className="truncate pr-4">{qty}× {item.name}</span>
                  <span className="shrink-0 font-semibold">{formatPrice(item.price * qty)}</span>
                </div>
              );
            })}
          </div>

          <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-white/60">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Delivery</span>
              <span>{formatPrice(deliveryFee)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-400">
                <span>Discount</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold font-serif pt-2">
              <span>Total</span>
              <span className="text-[#d4af37]">{formatPrice(total)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-[#d4af37] hover:bg-[#c9a430] disabled:opacity-60 text-[#1a1a1a] font-bold text-sm rounded-xl transition-all flex justify-center items-center gap-2"
          >
            {submitting ? (
              <div className="w-5 h-5 border-2 border-[#1a1a1a] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Place order — {formatPrice(total)}
                <ChevronRight size={16} />
              </>
            )}
          </button>

          <p className="text-[10px] text-white/40 text-center">
            Pay with Mobile Money after placing your order
          </p>
        </div>
      </form>

      {/* Mobile Money payment */}
      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#1a1a1a]/60 backdrop-blur-sm">
          <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 animate-in slide-in-from-bottom duration-300">
            {paymentSuccess ? (
              <div className="py-8 flex flex-col items-center gap-4 text-center">
                <CheckCircle size={52} className="text-green-500" />
                <h4 className="text-xl font-bold font-serif">Order received!</h4>
                <p className="text-sm text-[#1a1a1a]/60">
                  We'll confirm your payment and start preparing your food.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold font-serif text-[#1a1a1a] mb-1">Pay with Mobile Money</h3>
                <p className="text-sm text-[#1a1a1a]/50 mb-6">
                  Send exactly <strong className="text-[#1a1a1a]">{formatPrice(total)}</strong> to the number below.
                </p>

                <div className="bg-[#fdfbf7] border border-[#d4af37]/30 rounded-2xl p-5 space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#1a1a1a]/50">Number</span>
                    <span className="font-bold">673 184 599</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#1a1a1a]/50">Name</span>
                    <span className="font-bold">AMOH JOEL</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#1a1a1a]/50">Amount</span>
                    <span className="font-bold text-[#d4af37]">{formatPrice(total)}</span>
                  </div>
                </div>

                <a
                  href="tel:237673184599"
                  className="block w-full py-3.5 mb-3 bg-[#1a1a1a] text-white text-center font-bold text-sm rounded-xl"
                >
                  Open phone to pay
                </a>

                <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl text-[11px] text-amber-800 mb-5">
                  <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                  <span>After paying, tap "I've paid" so we can verify and start your order.</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleConfirmPayment(false)}
                    disabled={paymentLoading}
                    className="py-3 text-sm font-semibold text-[#1a1a1a]/60 border border-[#1a1a1a]/10 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleConfirmPayment(true)}
                    disabled={paymentLoading}
                    className="py-3 text-sm font-bold bg-[#d4af37] text-[#1a1a1a] rounded-xl flex justify-center items-center"
                  >
                    {paymentLoading ? (
                      <div className="w-4 h-4 border-2 border-[#1a1a1a] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "I've paid"
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
