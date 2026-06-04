import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodDetailsModal from "./FoodDetailsModal";
import FoodItemCard from "./FoodItemCard";
import SkeletonLoader from "./SkeletonLoader";

const FoodDisplay = ({ category, searchQuery }) => {
  const { food_list, cartItems, addToCart, removeFromCart, loading, favorites, toggleFavorite } = useContext(StoreContext);
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter food items based on category and search query
  const filteredFoods = food_list.filter((item) => {
    // Category filter
    const categoryMatch = category === "All" || item.category === category;

    // Search filter (search in name, description, and ingredients)
    const searchLower = searchQuery.toLowerCase();
    const searchMatch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchLower) ||
      (item.description && item.description.toLowerCase().includes(searchLower)) ||
      (item.ingredients && item.ingredients.toLowerCase().includes(searchLower)) ||
      (item.category && item.category.toLowerCase().includes(searchLower));

    return categoryMatch && searchMatch;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <SkeletonLoader count={8} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {filteredFoods.length === 0 ? (
        <div className="text-center py-20 bg-[#1a1a1a]/5 rounded-3xl border border-dashed border-[#1a1a1a]/10">
          <p className="text-lg font-serif text-[#1a1a1a]/60 italic">No dishes found matching your search or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredFoods.map((item, index) => (
            <FoodItemCard
              key={item._id}
              item={item}
              index={index}
              cartItems={cartItems}
              favorites={favorites}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              toggleFavorite={toggleFavorite}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </div>
      )}

      {/* Luxury Details Popup Modal */}
      {selectedItem && (
        <FoodDetailsModal 
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default FoodDisplay;
