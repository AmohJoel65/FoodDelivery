import React, { useContext } from "react";
import { Plus, Minus, Heart } from "lucide-react";
import { StoreContext } from "../context/StoreContext";
import { Badge, Button } from "./ui";

const FoodItemCard = ({ item, index, cartItems, favorites, addToCart, removeFromCart, toggleFavorite, setSelectedItem }) => {
  const { formatPrice, showAlert } = useContext(StoreContext);
  const qty = cartItems[item._id] || 0;
  const isFav = favorites?.includes(item._id) || false;
  const outOfStock = item.stock !== undefined && item.stock <= 0;

  return (
    <div
      key={item._id}
      style={{ animationDelay: `${index * 50}ms` }}
      className="brand-card-accent flex flex-col overflow-hidden animate-fade-in"
    >
      <div
        onClick={() => setSelectedItem(item)}
        className="relative h-52 image-zoom-container bg-brand-charcoal/5 cursor-pointer"
        title={`View details for ${item.name}`}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800";
          }}
        />

        <div className="absolute top-3 left-3">
          <Badge>{item.category}</Badge>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(item._id);
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-brand-cream rounded-lg flex items-center justify-center shadow-card hover:scale-105 transition-transform"
          aria-label={`Save ${item.name}`}
        >
          <Heart size={14} className={isFav ? "fill-red-500 text-red-500" : "text-brand-charcoal/40"} />
        </button>

        <div className="absolute bottom-3 right-3" onClick={(e) => e.stopPropagation()}>
          {qty === 0 ? (
            <button
              onClick={() => addToCart(item._id)}
              disabled={outOfStock}
              className="w-9 h-9 bg-brand-cream border border-brand-charcoal/10 text-brand-charcoal rounded-full flex justify-center items-center shadow-card hover:bg-brand-charcoal hover:text-brand-cream transition-colors disabled:opacity-50"
              title="Add to cart"
            >
              <Plus size={16} strokeWidth={2.5} />
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-brand-cream border border-brand-gold px-2 py-1 rounded-full shadow-card">
              <button
                onClick={() => removeFromCart(item._id)}
                className="w-5 h-5 text-brand-charcoal hover:text-brand-gold flex items-center justify-center"
              >
                <Minus size={14} strokeWidth={2.5} />
              </button>
              <span className="text-xs font-bold text-brand-charcoal min-w-[14px] text-center">{qty}</span>
              <button
                onClick={() => addToCart(item._id)}
                className="w-5 h-5 text-brand-charcoal hover:text-brand-gold flex items-center justify-center"
              >
                <Plus size={14} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow gap-2 text-left">
        <h4
          onClick={() => setSelectedItem(item)}
          className="text-base font-bold text-brand-charcoal truncate cursor-pointer hover:text-brand-gold transition-colors"
        >
          {item.name}
        </h4>

        <p className="text-xs leading-relaxed brand-muted line-clamp-2">{item.description}</p>

        {item.stock !== undefined && (
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-brand-charcoal/40">Stock</span>
            <span
              className={`text-xs font-semibold ${
                outOfStock ? "text-red-600" : item.stock <= item.lowStockThreshold ? "text-amber-600" : "text-green-700"
              }`}
            >
              {outOfStock ? "Out of stock" : `${item.stock} left`}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-brand-charcoal/5">
          <span className="text-lg font-bold text-brand-charcoal font-serif">{formatPrice(item.price)}</span>
          <Button
            size="sm"
            variant={qty > 0 ? "gold" : "primary"}
            disabled={outOfStock}
            onClick={() => {
              if (outOfStock) {
                showAlert("This item is currently out of stock", "warning", "Out of Stock");
                return;
              }
              if (qty === 0) addToCart(item._id);
              else removeFromCart(item._id);
            }}
          >
            {outOfStock ? "Unavailable" : qty === 0 ? "Add" : "Remove"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodItemCard;
