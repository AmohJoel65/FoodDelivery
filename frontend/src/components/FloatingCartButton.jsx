import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import { ShoppingCart, X } from 'lucide-react';

const FloatingCartButton = () => {
  const { cartItems } = useContext(StoreContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const totalItems = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  const scrollToCart = () => {
    const cartSection = document.getElementById('cart-section');
    if (cartSection) {
      cartSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/cart';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded && (
        <div className="absolute bottom-16 right-0 bg-[#1a1a1a] text-[#fdfbf7] px-4 py-2 rounded-lg shadow-lg mb-2 animate-in slide-in-from-bottom-2 duration-300">
          <p className="text-sm font-semibold">{totalItems} item{totalItems !== 1 ? 's' : ''} in cart</p>
        </div>
      )}
      
      <button
        onClick={scrollToCart}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className="relative w-14 h-14 bg-[#d4af37] hover:bg-[#b88934] text-[#1a1a1a] rounded-full shadow-lg shadow-gold-500/30 flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12 button-glow"
        aria-label="View cart"
      >
        <ShoppingCart size={24} strokeWidth={2.5} />
        
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#1a1a1a] text-[#fdfbf7] text-xs font-bold rounded-full flex items-center justify-center border-2 border-[#fdfbf7] animate-bounce">
            {totalItems > 9 ? '9+' : totalItems}
          </span>
        )}
      </button>
    </div>
  );
};

export default FloatingCartButton;
