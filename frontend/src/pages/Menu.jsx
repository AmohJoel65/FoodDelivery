import React, { useState } from "react";
import { Search } from "lucide-react";
import ExploreMenu from "../components/ExploreMenu";
import FoodDisplay from "../components/FoodDisplay";
import SortDropdown from "../components/ui/SortDropdown";

const Menu = () => {
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("popular");

  return (
    <div className="animate-fade-in pb-16">
      {/* Header Section */}
      <div className="bg-brand-charcoal py-12 sm:py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-serif text-brand-cream font-bold mb-4">Our Complete Menu</h1>
        <p className="text-brand-cream/80 max-w-2xl mx-auto px-4">
          Discover our full selection of artisanal dishes, crafted with the finest ingredients.
        </p>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-brand-cream p-4 rounded-2xl shadow-sm border border-brand-charcoal/5">
          {/* Search Bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoal/40" size={20} />
            <input
              type="text"
              placeholder="Search dishes, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-brand-charcoal/10 bg-brand-surface/50 focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm transition-all"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="w-full md:w-auto flex justify-end">
            <SortDropdown selectedSort={sortOption} onSortChange={setSortOption} />
          </div>
        </div>
      </div>

      {/* Category selector */}
      <div className="mt-8">
        <ExploreMenu category={category} setCategory={setCategory} />
      </div>

      {/* Food Grid */}
      <div className="mt-4">
        <FoodDisplay category={category} searchQuery={searchQuery} sortOption={sortOption} />
      </div>
    </div>
  );
};

export default Menu;
