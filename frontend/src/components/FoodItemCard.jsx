import React, { useContext } from "react";
import { Plus, Minus, Star, Heart } from "lucide-react";
import useTilt from "../hooks/useTilt";
import { StoreContext } from "../context/StoreContext";

const FoodItemCard = ({ item, index, cartItems, favorites, addToCart, removeFromCart, toggleFavorite, setSelectedItem }) => {
  const { formatPrice, showAlert } = useContext(StoreContext);
  const qty = cartItems[item._id] || 0;
  const isFav = favorites?.includes(item._id) || false;
  const { ref, transform, onMouseMove, onMouseLeave } = useTilt(8);

  return (
    <div 
      key={item._id}
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transform, animationDelay: `${index * 50}ms` }}
      className="artisan-card flex flex-col bg-[#fdfbf7] border border-[#1a1a1a]/5 rounded-2xl overflow-hidden group shadow-soft animate-fade-in"
    >
      
      {/* Image Section */}
      <div 
        onClick={() => setSelectedItem(item)}
        className="relative h-56 image-zoom-container bg-[#1a1a1a]/5 cursor-pointer overflow-hidden"
        title={`View details for ${item.name}`}
      >
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover object-center transition-transform duration-700"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800";
          }}
        />
        
        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category Tag */}
        <span className="absolute top-4 left-4 bg-[#1a1a1a]/80 backdrop-blur-md text-[#fdfbf7] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10">
          {item.category}
        </span>

        {/* Bookmark Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); toggleFavorite(item._id); }}
          className="absolute top-4 right-16 glass-card p-1.5 rounded-lg flex items-center justify-center shadow-soft hover:scale-110 active:scale-95 transition-all z-10"
          aria-label={`Bookmark ${item.name}`}
        >
          <Heart size={13} className={isFav ? "fill-red-500 text-red-500" : "text-gray-400"} />
        </button>

        {/* Rating Banner */}
        <div className="absolute top-4 right-4 glass-card py-1 px-2 rounded-lg flex items-center gap-1 shadow-soft">
          <Star size={11} fill="#d4af37" stroke="none" />
          <span className="text-[10px] font-bold text-[#1a1a1a]">5.0</span>
        </div>

        {/* Quantity Stepper Add Action Button */}
        <div className="absolute bottom-4 right-4 z-10" onClick={(e) => e.stopPropagation()}>
          {qty === 0 ? (
            <button 
              onClick={() => addToCart(item._id)}
              className="w-10 h-10 glass-card border border-[#1a1a1a]/15 text-[#1a1a1a] rounded-full flex justify-center items-center shadow-gold hover:bg-[#1a1a1a] hover:text-[#fdfbf7] hover:border-transparent transition-all duration-300 transform active:scale-95 group-hover:scale-105 button-glow"
              title="Add to cart"
            >
              <Plus size={18} strokeWidth={2.5} />
            </button>
          ) : (
            <div className="flex items-center gap-2 glass-card border border-[#d4af37] px-2.5 py-1.5 rounded-full shadow-gold transition-all duration-300 animate-in zoom-in-75">
              <button 
                onClick={() => removeFromCart(item._id)}
                className="w-6 h-6 text-[#1a1a1a] hover:text-[#d4af37] flex items-center justify-center transition-colors"
              >
                <Minus size={14} strokeWidth={2.5} />
              </button>
              <span className="text-xs font-extrabold text-[#1a1a1a] min-w-[14px] text-center">
                {qty}
              </span>
              <button 
                onClick={() => addToCart(item._id)}
                className="w-6 h-6 text-[#1a1a1a] hover:text-[#d4af37] flex items-center justify-center transition-colors"
              >
                <Plus size={14} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Details Section */}
      <div className="p-5 flex flex-col flex-grow gap-2 text-left">
        <h4 
          onClick={() => setSelectedItem(item)}
          className="text-lg font-bold text-[#1a1a1a] tracking-tight truncate cursor-pointer hover:text-[#d4af37] transition-colors"
          title={`View details for ${item.name}`}
        >
          {item.name}
        </h4>
        
        {/* Ingredients/Provenance */}
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#d4af37] truncate">
          Ingredients: {item.ingredients || "Seasonal Organic Selection"}
        </p>
        
        {/* Description */}
        <p className="text-xs leading-relaxed text-[#1a1a1a]/60 line-clamp-3 font-light">
          {item.description}
        </p>

        {/* Stock Level */}
        {item.stock !== undefined && (
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#1a1a1a]/40">Stock</span>
            <span className={`text-xs font-bold ${
              item.stock <= item.lowStockThreshold 
                ? "text-red-600" 
                : item.stock <= item.lowStockThreshold * 2 
                  ? "text-amber-600" 
                  : "text-green-600"
            }`}>
              {item.stock <= 0 ? "Out of Stock" : `${item.stock} available`}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline justify-between mt-auto pt-3 border-t border-[#1a1a1a]/5">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#1a1a1a]/40">Price</span>
          <span className="text-lg font-bold text-[#1a1a1a] font-serif">
            {formatPrice(item.price)}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => {
            if (item.stock !== undefined && item.stock <= 0) {
              showAlert("This item is currently out of stock", "warning", "Out of Stock");
              return;
            }
            if (qty === 0) {
              addToCart(item._id);
            } else {
              removeFromCart(item._id);
            }
          }}
          disabled={item.stock !== undefined && item.stock <= 0}
          className={`w-full mt-3 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all transform active:scale-95 shadow-md flex items-center justify-center gap-2 ${
            item.stock !== undefined && item.stock <= 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : qty === 0
                ? "bg-[#1a1a1a] hover:bg-[#d4af37] text-white hover:text-black"
                : "bg-[#d4af37] hover:bg-[#b88934] text-[#1a1a1a]"
          }`}
        >
          {item.stock !== undefined && item.stock <= 0 ? (
            "Out of Stock"
          ) : qty === 0 ? (
            <>
              <Plus className="w-4 h-4" /> Add To Bag
            </>
          ) : (
            <>
              <Minus className="w-4 h-4" /> Remove
            </>
          )}
        </button>

      </div>

    </div>
  );
};

export default FoodItemCard;
