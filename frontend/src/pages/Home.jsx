import React, { useState } from "react";
import Hero from "../components/Hero";
import ExploreMenu from "../components/ExploreMenu";
import FoodDisplay from "../components/FoodDisplay";
import AppDownload from "../components/AppDownload";
import { Search } from "lucide-react";
import useScrollAnimation from "../hooks/useScrollAnimation";

const Home = () => {
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [menuRef, menuVisible] = useScrollAnimation(0.1);
  const [foodRef, foodVisible] = useScrollAnimation(0.1);
  const [appRef, appVisible] = useScrollAnimation(0.1);

  return (
    <div className="animate-in fade-in duration-500">
      {/* Artisanal Hero Showcase */}
      <Hero />

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a1a1a]/30" size={20} />
          <input
            type="text"
            placeholder="Search for dishes, ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[#1a1a1a]/10 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 outline-none text-sm transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Category selector filters */}
      <div ref={menuRef} className={`transition-all duration-700 ${menuVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <ExploreMenu category={category} setCategory={setCategory} />
      </div>

      {/* Responsively-arranged Food Grid cards */}
      <div ref={foodRef} className={`transition-all duration-700 ${foodVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <FoodDisplay category={category} searchQuery={searchQuery} />
      </div>

      {/* App store promotion */}
      <div ref={appRef} className={`transition-all duration-700 ${appVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <AppDownload />
      </div>
    </div>
  );
};

export default Home;
