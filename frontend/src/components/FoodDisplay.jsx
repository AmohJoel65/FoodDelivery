import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodDetailsModal from "./FoodDetailsModal";
import FoodItemCard from "./FoodItemCard";
import SkeletonLoader from "./SkeletonLoader";

const FoodDisplay = ({ category, searchQuery, sortOption = "popular" }) => {
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

  // Sort the filtered foods
  const sortedFoods = [...filteredFoods].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "alpha":
        return a.name.localeCompare(b.name);
      case "popular":
      default:
        // In a real app this would sort by a popularity score. For now we leave it in the original API order.
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="page-container py-10 sm:py-16">
        <SkeletonLoader count={8} />
      </div>
    );
  }

  return (
    <div className="page-container py-10 sm:py-16">
      {sortedFoods.length === 0 ? (
        <div className="text-center py-20 bg-brand-charcoal/5 rounded-3xl border border-dashed border-brand-charcoal/10">
          <p className="text-lg font-serif text-brand-charcoal/60 italic">No dishes found matching your search or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {sortedFoods.map((item, index) => (
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
