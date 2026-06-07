import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { Trash2, ShoppingBag, ArrowRight, Minus } from "lucide-react";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getCartSubtotal, token, formatPrice, showAlert } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const subtotal = getCartSubtotal();
  const deliveryFee = subtotal > 0 ? 3000 : 0;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError("");

    if (promoCode.trim().toUpperCase() === "ARTISAN10") {
      setDiscount(subtotal * 0.1);
      setPromoApplied(true);
    } else if (promoCode.trim().toUpperCase() === "FREEDELIVERY") {
      setDiscount(3000);
      setPromoApplied(true);
    } else {
      setPromoError("Invalid code. Try ARTISAN10 or FREEDELIVERY.");
    }
  };

  const total = Math.max(0, subtotal + deliveryFee - discount);

  const handleCheckoutRedirect = () => {
    if (!token) {
      showAlert("Please sign in to continue.", "warning", "Sign in required");
      return;
    }
    navigate("/order", { state: { total, subtotal, deliveryFee, discount } });
  };

  const cartLineItems = food_list.filter((item) => (cartItems[item._id] || 0) > 0);
  const hasItems = cartLineItems.length > 0 && subtotal > 0;

  const SummaryBlock = ({ className = "" }) => (
    <div className={`brand-card p-5 sm:p-8 rounded-2xl border border-brand-charcoal/5 flex flex-col gap-5 ${className}`}>
      <h3 className="text-lg sm:text-xl font-bold font-serif text-brand-charcoal border-b border-brand-charcoal/5 pb-3">
        Order total
      </h3>
      <div className="flex flex-col gap-3 text-sm text-brand-charcoal/70">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-brand-charcoal">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span className="font-semibold text-brand-charcoal">{formatPrice(deliveryFee)}</span>
        </div>
        {promoApplied && (
          <div className="flex justify-between text-green-700 font-semibold">
            <span>Discount</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-base font-bold text-brand-charcoal border-t border-brand-charcoal/5 pt-3">
          <span>Total</span>
          <span className="font-serif text-lg">{formatPrice(total)}</span>
        </div>
      </div>
      <button
        onClick={handleCheckoutRedirect}
        className="w-full py-3.5 bg-brand-charcoal hover:bg-brand-gold hover:text-brand-charcoal text-brand-cream font-bold text-sm rounded-xl transition-colors flex justify-center items-center gap-2 min-h-[48px]"
      >
        Continue to delivery
        <ArrowRight size={16} />
      </button>
      {!token && (
        <p className="text-xs text-red-600 text-center font-medium">Sign in required to checkout</p>
      )}
    </div>
  );

  return (
    <div className={`page-container py-8 sm:py-12 min-h-[50vh] animate-fade-in ${hasItems ? "pb-28 lg:pb-12" : ""}`}>
      <div className="text-left mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal">Your order</h2>
        <p className="text-sm text-brand-charcoal/50 mt-1">Review items, then continue to delivery.</p>
      </div>

      {!hasItems ? (
        <div className="text-center py-16 sm:py-20 bg-brand-charcoal/5 rounded-2xl border border-dashed border-brand-charcoal/10 max-w-2xl mx-auto flex flex-col items-center gap-5 px-4">
          <ShoppingBag size={44} className="text-brand-charcoal/30" />
          <div>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-brand-charcoal">Your bag is empty</h3>
            <p className="text-sm text-brand-charcoal/50 mt-1 max-w-xs">Add something from the menu to get started.</p>
          </div>
          <Link
            to="/"
            className="px-6 py-3 bg-brand-charcoal hover:bg-brand-gold hover:text-brand-charcoal text-brand-cream font-bold text-sm rounded-full transition-colors min-h-[44px] flex items-center"
          >
            Browse menu
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Mobile card list */}
            <div className="flex flex-col gap-3 lg:hidden">
              {cartLineItems.map((item) => {
                const quantity = cartItems[item._id];
                return (
                  <div key={item._id} className="brand-card-accent p-4 flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-brand-charcoal/5 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-brand-charcoal truncate">{item.name}</p>
                      <p className="text-[10px] text-brand-gold uppercase font-semibold tracking-wider">{item.category}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-brand-charcoal/60">Qty: {quantity}</span>
                        <span className="font-bold text-brand-charcoal">{formatPrice(item.price * quantity)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="self-start p-2 text-brand-charcoal/40 hover:text-red-600 rounded-lg min-w-[40px] min-h-[40px] flex items-center justify-center"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Desktop table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-brand-charcoal/5 text-[10px] uppercase font-bold tracking-wider text-brand-charcoal/40">
                    <th className="pb-4">Product</th>
                    <th className="pb-4">Name</th>
                    <th className="pb-4">Price</th>
                    <th className="pb-4">Qty</th>
                    <th className="pb-4">Total</th>
                    <th className="pb-4 text-right">Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-charcoal/5 text-sm">
                  {cartLineItems.map((item) => {
                    const quantity = cartItems[item._id];
                    return (
                      <tr key={item._id}>
                        <td className="py-4">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-brand-charcoal/5">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                        </td>
                        <td className="py-4 font-bold text-brand-charcoal">
                          <p>{item.name}</p>
                          <span className="text-[10px] text-brand-gold uppercase font-semibold">{item.category}</span>
                        </td>
                        <td className="py-4 text-brand-charcoal/70">{formatPrice(item.price)}</td>
                        <td className="py-4 font-bold">{quantity}</td>
                        <td className="py-4 font-bold">{formatPrice(item.price * quantity)}</td>
                        <td className="py-4 text-right">
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="p-2 text-brand-charcoal/30 hover:text-red-600 rounded-full hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Promo */}
            <div className="brand-card p-5 rounded-2xl text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-2">Promo code</h4>
              <form onSubmit={handleApplyPromo} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value);
                    setPromoError("");
                  }}
                  placeholder="Enter code"
                  disabled={promoApplied}
                  className="flex-1 px-4 py-3 rounded-xl border border-brand-charcoal/10 focus:border-brand-gold outline-none text-sm min-h-[44px] disabled:bg-gray-100"
                />
                <button
                  type="submit"
                  disabled={promoApplied || !promoCode}
                  className="px-6 py-3 bg-brand-charcoal hover:bg-brand-gold hover:text-brand-charcoal text-brand-cream text-sm font-bold rounded-xl disabled:opacity-50 transition-colors min-h-[44px] shrink-0"
                >
                  {promoApplied ? "Applied" : "Apply"}
                </button>
              </form>
              {promoApplied && (
                <p className="text-xs text-green-700 font-medium mt-2">Saved {formatPrice(discount)} on this order.</p>
              )}
              {promoError && <p className="text-xs text-red-600 font-medium mt-2">{promoError}</p>}
            </div>
          </div>

          {/* Desktop summary */}
          <SummaryBlock className="hidden lg:flex h-fit" />
        </div>
      )}

      {/* Mobile sticky checkout bar */}
      {hasItems && (
        <div className="mobile-sticky-bar lg:hidden flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-brand-charcoal/50">Total</p>
            <p className="text-lg font-bold font-serif text-brand-charcoal">{formatPrice(total)}</p>
          </div>
          <button
            onClick={handleCheckoutRedirect}
            className="flex-1 max-w-[200px] py-3 bg-brand-charcoal text-brand-cream font-bold text-sm rounded-xl flex items-center justify-center gap-2 min-h-[48px]"
          >
            Checkout
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
