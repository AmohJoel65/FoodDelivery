import React from "react";

// Curated category items with premium representations
const menu_list = [
  { menu_name: "Signature Bowls", menu_image: "🥣" },
  { menu_name: "Wood-Fired Rolls", menu_image: "🥖" },
  { menu_name: "Artisan Desserts", menu_image: "🍰" },
  { menu_name: "Gourmet Sandwiches", menu_image: "🥪" },
  { menu_name: "Curated Salads", menu_image: "🥗" },
  { menu_name: "Special Pasta", menu_image: "🍝" },
  { menu_name: "African Curations", menu_image: "🌍" }
];

const ExploreMenu = ({ category, setCategory }) => {
  const handleCategorySelect = (name) => {
    setCategory(prev => prev === name ? "All" : name);
  };

  return (
    <div id="explore-menu" className="max-w-7xl mx-auto px-6 py-12 scroll-mt-20">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1a1a1a]">Explore Our Curated Menu</h2>
        <p className="text-sm sm:text-base text-[#1a1a1a]/60 mt-3 font-light leading-relaxed">
          Navigate our signature selections. Crafted fresh daily by culinary specialists, designed to offer an exquisite gastronomic escape. Click a category to isolate your favorites.
        </p>
        <div className="w-16 h-1 bg-[#d4af37] mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Categories Circle Slider */}
      <div className="flex items-center justify-start md:justify-center gap-6 sm:gap-10 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
        
        {/* "All" Category Toggle Option */}
        <div 
          onClick={() => setCategory("All")}
          className="flex flex-col items-center gap-3 cursor-pointer shrink-0 select-none group"
        >
          <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-3xl transition-all duration-300 shadow-md ${
            category === "All" 
              ? "bg-[#1a1a1a] text-[#fdfbf7] ring-4 ring-[#d4af37] scale-105" 
              : "bg-[#fdfbf7] border border-[#1a1a1a]/5 text-[#1a1a1a]/40 hover:border-[#d4af37]/30 hover:scale-102"
          }`}>
            🍽️
          </div>
          <span className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
            category === "All" ? "text-[#d4af37]" : "text-[#1a1a1a]/60 group-hover:text-[#1a1a1a]"
          }`}>
            All Culinary
          </span>
        </div>

        {menu_list.map((item, index) => {
          const isActive = category === item.menu_name;
          return (
            <div
              key={index}
              onClick={() => handleCategorySelect(item.menu_name)}
              className="flex flex-col items-center gap-3 cursor-pointer shrink-0 select-none group"
            >
              <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-3xl transition-all duration-300 shadow-md ${
                isActive
                  ? "bg-[#1a1a1a] text-[#fdfbf7] ring-4 ring-[#d4af37] scale-105"
                  : "bg-[#fdfbf7] border border-[#1a1a1a]/5 hover:border-[#d4af37]/30 hover:scale-102"
              }`}>
                {item.menu_image}
              </div>
              <span className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                isActive ? "text-[#d4af37]" : "text-[#1a1a1a]/60 group-hover:text-[#1a1a1a]"
              }`}>
                {item.menu_name}
              </span>
            </div>
          );
        })}

      </div>
      
      <div className="border-b border-[#1a1a1a]/5 mt-10"></div>
    </div>
  );
};

export default ExploreMenu;
