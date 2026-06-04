import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { CreditCard, MapPin, Truck, ChevronRight, CheckCircle, AlertTriangle } from "lucide-react";

const PlaceOrder = () => {
  const { cartItems, food_list, getCartSubtotal, token, url, formatPrice, showAlert } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve calculated amounts from Cart page route state
  const subtotal = getCartSubtotal();
  const deliveryFee = subtotal > 0 ? 3000 : 0;
  
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (location.state) {
      setDiscount(location.state.discount || 0);
      setTotal(location.state.total || (subtotal + deliveryFee));
    } else {
      setTotal(subtotal + deliveryFee);
    }
  }, [location.state, subtotal, deliveryFee]);

  // Billing address state
  const [addressData, setAddressData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  });

  // Stripe/Razorpay simulation interface toggles
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccessState, setPaymentSuccessState] = useState(false);

  // Credit Card mock details
  const [cardDetails, setCardDetails] = useState({
    number: "4242 •••• •••• 4242",
    expiry: "12/28",
    cvv: "•••"
  });

  // Redirect to menu if cart is empty and page is reloaded
  useEffect(() => {
    if (subtotal === 0) {
      navigate("/cart");
    }
  }, [subtotal, navigate]);

  const handleInputChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrderSubmit = async (e) => {
    e.preventDefault();

    // Map cartItems mapping to detailed arrays
    const orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    const orderPayload = {
      address: addressData,
      items: orderItems,
      amount: total
    };

    try {
      const response = await fetch(`${url}/api/order/place`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token
        },
        body: JSON.stringify(orderPayload)
      });

      const data = await response.json();
      if (data.success) {
        setPlacedOrderId(data.orderId);
        setShowPaymentGateway(true); // Launch payment gateway screen
      } else {
        showAlert(data.message || "Failed to initialize order placement.", "error", "Order Failed");
      }
    } catch (error) {
      console.error("Order initiation failed:", error);
      showAlert("Network check failed. Unable to place order.", "error", "Network Error");
    }
  };

  const handleConfirmPayment = async (statusSuccess) => {
    setPaymentLoading(true);
    try {
      const response = await fetch(`${url}/api/order/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: placedOrderId,
          success: statusSuccess
        })
      });

      const data = await response.json();
      if (data.success && statusSuccess) {
        setPaymentSuccessState(true);
        setTimeout(() => {
          setShowPaymentGateway(false);
          navigate("/myorders");
        }, 2000);
      } else {
        showAlert("Payment was aborted or cancelled. Order will be cancelled.", "warning", "Payment Cancelled");
        setShowPaymentGateway(false);
        navigate("/");
      }
    } catch (err) {
      console.error("Payment confirmation failed:", err);
      showAlert("Error confirming payment.", "error", "Payment Error");
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-[600px] animate-in fade-in duration-500 relative">
      
      {/* Title */}
      <div className="text-left mb-10">
        <h2 className="text-3xl font-bold text-[#1a1a1a]">Checkout Information</h2>
        <p className="text-xs text-[#1a1a1a]/50 mt-1 font-light">Input your primary dispatch coordinates and confirm payment credentials.</p>
      </div>

      <form onSubmit={handlePlaceOrderSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-12 text-left">
        
        {/* Left Form: Delivery Details */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <h3 className="text-xl font-bold font-serif text-[#1a1a1a] flex items-center gap-2 border-b border-[#1a1a1a]/5 pb-3">
            <MapPin size={18} className="text-[#d4af37]" />
            Delivery Coordinates
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/40">First Name</label>
              <input 
                type="text" 
                name="firstName"
                value={addressData.firstName}
                onChange={handleInputChange}
                required
                placeholder="e.g. Jean" 
                className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs" 
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/40">Last Name</label>
              <input 
                type="text" 
                name="lastName"
                value={addressData.lastName}
                onChange={handleInputChange}
                required
                placeholder="e.g. Joel" 
                className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs" 
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/40">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={addressData.email}
              onChange={handleInputChange}
              required
              placeholder="e.g. buyer@example.com" 
              className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs" 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/40">Street Address</label>
            <input 
              type="text" 
              name="street"
              value={addressData.street}
              onChange={handleInputChange}
              required
              placeholder="e.g. 104 Fresh Herbs Way" 
              className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs" 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/40">City</label>
              <input 
                type="text" 
                name="city"
                value={addressData.city}
                onChange={handleInputChange}
                required
                placeholder="e.g. Manhattan" 
                className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs" 
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/40">State / Region</label>
              <input 
                type="text" 
                name="state"
                value={addressData.state}
                onChange={handleInputChange}
                required
                placeholder="e.g. NY" 
                className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/40">Zip Code</label>
              <input 
                type="text" 
                name="zipCode"
                value={addressData.zipCode}
                onChange={handleInputChange}
                required
                placeholder="e.g. 10001" 
                className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs" 
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/40">Country</label>
              <input 
                type="text" 
                name="country"
                value={addressData.country}
                onChange={handleInputChange}
                required
                placeholder="e.g. United States" 
                className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs" 
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/40">Contact Phone Number</label>
            <input 
              type="tel" 
              name="phone"
              value={addressData.phone}
              onChange={handleInputChange}
              required
              placeholder="e.g. +1 (555) 019-2834" 
              className="px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs" 
            />
          </div>

        </div>

        {/* Right Summary Breakdowns */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="glass-panel p-8 rounded-3xl border border-[#1a1a1a]/5 text-left flex flex-col gap-6 shadow-md">
            
            <h3 className="text-xl font-bold font-serif text-[#1a1a1a] border-b border-[#1a1a1a]/5 pb-4 flex items-center gap-2">
              <Truck size={18} className="text-[#d4af37]" />
              Order Summary
            </h3>

            {/* List mini products */}
            <div className="max-h-48 overflow-y-auto divide-y divide-[#1a1a1a]/5 pr-2">
              {food_list.map((item) => {
                const qty = cartItems[item._id] || 0;
                if (qty > 0) {
                  return (
                    <div key={item._id} className="flex justify-between py-2.5 text-xs">
                      <div className="max-w-[70%]">
                        <p className="font-bold text-[#1a1a1a] truncate">{item.name}</p>
                        <p className="text-[10px] text-[#1a1a1a]/40">Quantity: {qty} × {formatPrice(item.price)}</p>
                      </div>
                      <span className="font-bold text-[#1a1a1a]">{formatPrice(item.price * qty)}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* Calculations Grid */}
            <div className="flex flex-col gap-4 text-xs font-semibold text-[#1a1a1a]/70 border-t border-[#1a1a1a]/5 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{formatPrice(deliveryFee)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Coupon Deduction</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold text-[#1a1a1a] border-t border-[#1a1a1a]/5 pt-4">
                <span>Total Amount Due</span>
                <span className="text-lg font-serif font-bold text-[#1a1a1a]">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Submit Action */}
            <button 
              type="submit"
              className="w-full mt-2 py-4 bg-[#1a1a1a] hover:bg-[#d4af37] hover:text-[#1a1a1a] text-[#fdfbf7] font-bold text-xs rounded-xl shadow-lg transition-all duration-300 flex justify-center items-center gap-2"
            >
              <span>Proceed to Payment</span>
              <ChevronRight size={14} />
            </button>

          </div>
        </div>

      </form>

      {/* MANUAL PAYMENT INSTRUCTIONS MODAL OVERLAY */}
      {showPaymentGateway && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a1a1a]/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-[480px] bg-[#1a1a1a] text-[#fdfbf7] rounded-3xl border border-white/10 shadow-2xl p-8 z-10 animate-in zoom-in-95 duration-300">
            
            {/* Header */}
            <div className="text-left border-b border-white/5 pb-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] flex items-center gap-1.5">
                  <CreditCard size={14} />
                  Manual Payment
                </span>
                <span className="text-[10px] text-white/40">Secure Transfer</span>
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#fdfbf7] mt-2">Mobile Money Transfer</h3>
            </div>

            {paymentSuccessState ? (
              <div className="py-12 flex flex-col items-center gap-4 text-center animate-in zoom-in-75">
                <CheckCircle size={56} className="text-[#d4af37]" />
                <div>
                  <h4 className="text-lg font-bold font-serif text-white">Order Placed Successfully</h4>
                  <p className="text-xs text-white/50 mt-1 max-w-xs font-light">Your order of <b>{formatPrice(total)}</b> has been received. We will confirm your payment shortly.</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6 text-left">
                
                {/* Amount Box */}
                <div className="bg-white/5 rounded-2xl p-4 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Merchant Name</p>
                    <p className="text-xs font-bold text-white">AMOH JOEL</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Total Amount</p>
                    <p className="text-base font-serif font-bold text-[#d4af37]">{formatPrice(total)}</p>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="bg-gradient-to-br from-[#d4af37]/20 to-[#b88934]/10 rounded-2xl border border-[#d4af37]/30 p-6">
                  <h4 className="text-sm font-bold text-[#d4af37] mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse"></span>
                    Payment Instructions
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/70">Phone Number:</span>
                      <span className="text-sm font-bold text-white font-mono">237673184599</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/70">Account Name:</span>
                      <span className="text-sm font-bold text-white">AMOH JOEL</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/70">Amount:</span>
                      <span className="text-sm font-bold text-[#d4af37]">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-[10px] text-white/50 leading-relaxed">
                      Transfer the exact amount to the number above. Your order will be processed once payment is confirmed.
                    </p>
                  </div>
                </div>

                {/* Phonebook Redirect Button */}
                <a 
                  href="tel:237673184599"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#d4af37] hover:bg-[#b88934] text-[#1a1a1a] font-bold text-xs rounded-xl transition-all flex justify-center items-center gap-2 shadow-lg shadow-gold-500/10"
                >
                  <span>📱 Open Phonebook to Pay</span>
                </a>

                {/* Info Box */}
                <div className="p-3 bg-white/5 text-white/70 text-[10px] rounded-xl border border-white/10 flex items-start gap-2 leading-relaxed">
                  <AlertTriangle size={15} className="shrink-0 text-[#d4af37]" />
                  <span>
                    After completing your transfer, click "Confirm Payment" below. We will verify your transaction and process your order.
                  </span>
                </div>

                {/* Payment actions */}
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <button 
                    onClick={() => handleConfirmPayment(false)}
                    disabled={paymentLoading}
                    className="py-3 bg-red-950/20 hover:bg-red-900/40 text-red-400 font-bold text-xs rounded-xl border border-red-500/20 transition-all"
                  >
                    Cancel Order
                  </button>
                  <button 
                    onClick={() => handleConfirmPayment(true)}
                    disabled={paymentLoading}
                    className="py-3 bg-[#d4af37] hover:bg-[#b88934] text-[#1a1a1a] font-bold text-xs rounded-xl transition-all flex justify-center items-center gap-1.5 shadow-lg shadow-gold-500/10"
                  >
                    {paymentLoading ? (
                      <div className="w-4 h-4 border-2 border-[#1a1a1a] border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>Confirm Payment</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default PlaceOrder;
