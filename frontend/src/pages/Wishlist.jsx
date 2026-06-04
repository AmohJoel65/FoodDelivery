import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { Heart, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { favorites, toggleFavorite, food_list, addToCart, url } = useContext(StoreContext);
  const navigate = useNavigate();

  // Filter food items that are in favorites
  const wishlistItems = food_list.filter(item => favorites?.includes(item._id));

  const handleAddToCart = (itemId) => {
    addToCart(itemId);
  };

  const handleRemoveFromWishlist = (itemId) => {
    toggleFavorite(itemId);
  };

  const handleViewDetails = (item) => {
    // Navigate to home and scroll to the item
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-serif text-[#1a1a1a] mb-2">My Wishlist</h1>
        <p className="text-sm text-[#1a1a1a]/60">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-20 bg-[#1a1a1a]/5 rounded-3xl border border-dashed border-[#1a1a1a]/10">
          <Heart className="w-16 h-16 text-[#1a1a1a]/20 mx-auto mb-4" />
          <h2 className="text-2xl font-bold font-serif text-[#1a1a1a] mb-2">Your wishlist is empty</h2>
          <p className="text-sm text-[#1a1a1a]/50 mb-6">
            Save your favorite dishes to keep track of what you love
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-[#d4af37] hover:bg-[#b88934] text-[#1a1a1a] rounded-xl font-bold text-sm transition-all flex items-center gap-2 mx-auto"
          >
            <ShoppingBag size={16} /> Browse Menu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="artisan-card flex flex-col bg-[#fdfbf7] border border-[#1a1a1a]/5 rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Image Section */}
              <div className="relative h-56 bg-[#1a1a1a]/5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                {/* Remove from Wishlist Button */}
                <button
                  onClick={() => handleRemoveFromWishlist(item._id)}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-md border border-[#1a1a1a]/10 p-2 rounded-full text-red-500 hover:text-red-600 hover:scale-110 transition-all shadow-md"
                  title="Remove from wishlist"
                >
                  <Trash2 size={16} />
                </button>
                {/* Category Badge */}
                <div className="absolute bottom-3 left-3">
                  <span className="bg-[#1a1a1a]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-wider text-white font-semibold">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-base font-bold font-serif text-[#1a1a1a] mb-2 line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-xs text-[#1a1a1a]/60 line-clamp-2 mb-3 font-light">
                  {item.description}
                </p>

                <div className="mt-auto">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#1a1a1a]/40">Price</span>
                    <span className="text-lg font-bold text-[#1a1a1a] font-serif">
                      {item.price.toFixed(0)} FCFA
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(item._id)}
                      className="flex-1 py-2.5 bg-[#1a1a1a] hover:bg-[#d4af37] text-white hover:text-black rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                    >
                      <Plus size={14} /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
