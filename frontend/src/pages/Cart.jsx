import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getCartSubtotal, token, formatPrice, showAlert } = useContext(StoreContext);
  const navigate = useNavigate();
  
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const subtotal = getCartSubtotal();
  const deliveryFee = subtotal > 0 ? 5.00 : 0;
  
  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError("");
    
    if (promoCode.trim().toUpperCase() === "ARTISAN10") {
      setDiscount(subtotal * 0.10); // 10% discount
      setPromoApplied(true);
    } else if (promoCode.trim().toUpperCase() === "FREEDELIVERY") {
      setDiscount(5.00); // covers the delivery fee
      setPromoApplied(true);
    } else {
      setPromoError("Invalid promo code. Try 'ARTISAN10' or 'FREEDELIVERY'.");
    }
  };

  const total = Math.max(0, subtotal + deliveryFee - discount);

  const handleCheckoutRedirect = () => {
    if (!token) {
      showAlert("Please sign in or register to proceed to payment.", "warning", "Authentication Required");
      return;
    }
    // Navigate and pass total/discount info to payment
    navigate("/order", { state: { total, subtotal, deliveryFee, discount } });
  };

  const hasItems = Object.keys(cartItems).length > 0 && subtotal > 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-[600px] animate-in fade-in duration-500">
      
      {/* Page Title */}
      <div className="text-left mb-10">
        <h2 className="text-3xl font-bold text-[#1a1a1a]">Shopping Bag</h2>
        <p className="text-xs text-[#1a1a1a]/50 mt-1 font-light">Review your selected gourmet plates before entering delivery options.</p>
      </div>

      {!hasItems ? (
        <div className="text-center py-20 bg-[#1a1a1a]/5 rounded-3xl border border-dashed border-[#1a1a1a]/10 max-w-2xl mx-auto flex flex-col items-center gap-6">
          <ShoppingBag size={48} className="text-[#1a1a1a]/30" />
          <div>
            <h3 className="text-xl font-bold font-serif text-[#1a1a1a]">Your Shopping Bag is Empty</h3>
            <p className="text-xs text-[#1a1a1a]/50 mt-1 max-w-xs font-light">Add some of our freshly-crafted signature items to begin your culinary checkout.</p>
          </div>
          <Link 
            to="/" 
            className="px-6 py-3 bg-[#1a1a1a] hover:bg-[#d4af37] hover:text-[#1a1a1a] text-[#fdfbf7] font-bold text-xs rounded-full shadow-md transition-all duration-300"
          >
            Explore Menu Selection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Items Table Section */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1a1a1a]/5 text-[10px] uppercase font-extrabold tracking-widest text-[#1a1a1a]/40 pb-4">
                    <th className="pb-4">Product</th>
                    <th className="pb-4">Name</th>
                    <th className="pb-4">Price</th>
                    <th className="pb-4">Qty</th>
                    <th className="pb-4">Total</th>
                    <th className="pb-4 text-right">Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a1a1a]/5 text-sm">
                  {food_list.map((item) => {
                    const quantity = cartItems[item._id] || 0;
                    if (quantity > 0) {
                      return (
                        <tr key={item._id} className="group">
                          {/* Thumbnail */}
                          <td className="py-4">
                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#1a1a1a]/5 border border-[#1a1a1a]/5">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover object-center"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800";
                                }}
                              />
                            </div>
                          </td>
                          {/* Name */}
                          <td className="py-4 font-bold text-[#1a1a1a]">
                            <p>{item.name}</p>
                            <span className="text-[10px] text-[#d4af37] font-sans uppercase font-semibold tracking-wider">
                              {item.category}
                            </span>
                          </td>
                          {/* Price */}
                          <td className="py-4 font-medium text-[#1a1a1a]/70">{formatPrice(item.price)}</td>
                          {/* Qty */}
                          <td className="py-4 font-bold text-[#1a1a1a]">{quantity}</td>
                          {/* Total */}
                          <td className="py-4 font-bold text-[#1a1a1a]">{formatPrice(item.price * quantity)}</td>
                          {/* Remove */}
                          <td className="py-4 text-right">
                            <button 
                              onClick={() => removeFromCart(item._id)}
                              className="text-[#1a1a1a]/30 hover:text-red-650 p-2 rounded-full hover:bg-red-50 transition-colors"
                              title="Decrease Quantity"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    }
                    return null;
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Promo Code Input Block */}
            <div className="glass-panel p-6 rounded-2xl text-left border border-[#1a1a1a]/5 mt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a]/70 mb-2">Have a promotional coupon?</h4>
              <p className="text-[11px] text-[#1a1a1a]/40 mb-4 font-light">Apply valid discount credentials to subtract final checkout costs. Try 'ARTISAN10' or 'FREEDELIVERY'.</p>
              
              <form onSubmit={handleApplyPromo} className="flex gap-3">
                <input 
                  type="text" 
                  value={promoCode}
                  onChange={(e) => { setPromoCode(e.target.value); setPromoError(""); }}
                  placeholder="Promo Code" 
                  disabled={promoApplied}
                  className="flex-grow px-4 py-3 rounded-xl border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs disabled:bg-gray-100 disabled:text-gray-400"
                />
                <button 
                  type="submit"
                  disabled={promoApplied || !promoCode}
                  className="px-6 py-3 bg-[#1a1a1a] hover:bg-[#d4af37] hover:text-[#1a1a1a] text-[#fdfbf7] text-xs font-bold rounded-xl disabled:bg-gray-200 disabled:text-gray-450 transition-colors shrink-0"
                >
                  {promoApplied ? "Applied" : "Apply"}
                </button>
              </form>

              {promoApplied && (
                <p className="text-[11px] text-green-700 font-semibold mt-3 text-left">
                  ✓ Code successfully validated! Saved {formatPrice(discount)} on this order.
                </p>
              )}
              {promoError && (
                <p className="text-[11px] text-red-600 font-semibold mt-3 text-left">
                  ✗ {promoError}
                </p>
              )}
            </div>

          </div>

          {/* Cart Summary Totals column */}
          <div className="glass-panel p-8 rounded-3xl border border-[#1a1a1a]/5 h-fit text-left flex flex-col gap-6 shadow-md">
            <h3 className="text-xl font-bold font-serif text-[#1a1a1a] border-b border-[#1a1a1a]/5 pb-4">Order Totals</h3>
            
            <div className="flex flex-col gap-4 text-xs font-medium text-[#1a1a1a]/70">
              
              {/* Subtotal */}
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#1a1a1a]">{formatPrice(subtotal)}</span>
              </div>
              
              {/* Delivery */}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-bold text-[#1a1a1a]">{formatPrice(deliveryFee)}</span>
              </div>

              {/* Discount if present */}
              {promoApplied && (
                <div className="flex justify-between text-green-700 font-bold">
                  <span>Promo Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              {/* Grand Total */}
              <div className="flex justify-between text-sm font-extrabold text-[#1a1a1a] border-t border-[#1a1a1a]/5 pt-4">
                <span>Grand Total</span>
                <span className="text-lg font-serif font-bold text-[#1a1a1a]">{formatPrice(total)}</span>
              </div>

            </div>

            {/* Checkout CTA */}
            <button 
              onClick={handleCheckoutRedirect}
              className="w-full mt-2 py-4 bg-[#1a1a1a] hover:bg-[#d4af37] hover:text-[#1a1a1a] text-[#fdfbf7] font-bold text-xs rounded-xl shadow-lg transition-all duration-300 flex justify-center items-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight size={14} />
            </button>

            {!token && (
              <p className="text-[10px] text-red-650 text-center font-bold">
                * Authorization required. Please Sign In first.
              </p>
            )}

          </div>

        </div>
      )}

    </div>
  );
};

export default Cart;
