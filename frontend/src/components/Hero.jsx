import React from "react";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToMenu = () => {
    const menuSection = document.getElementById("explore-menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto px-6 pt-6 pb-12">
      <div 
        className="relative rounded-3xl overflow-hidden h-[540px] flex items-center bg-cover bg-center shadow-2xl transition-all duration-700 hover:shadow-gold-300/10"
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(26, 26, 26, 0.95) 30%, rgba(26, 26, 26, 0.5) 60%, rgba(26, 26, 26, 0.2) 100%), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1600')` 
        }}
      >
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 pattern-dots opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/80 via-transparent to-transparent"></div>
        
        <div className="max-w-xl md:max-w-2xl px-8 md:px-16 text-left flex flex-col gap-6 select-none animate-in fade-in slide-in-from-left-6 duration-700 relative z-10">
          
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/30 px-4 py-1.5 rounded-full w-fit backdrop-blur-sm animate-float">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#ebdcae]">Artisanal Delivery</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-[#fdfbf7] leading-[1.1] tracking-tight">
            Experience <br/>
            <span className="gold-gradient-text italic animate-shimmer bg-gradient-to-r from-[#d4af37] via-[#f4e4bc] to-[#d4af37] bg-[length:200%_auto]">Curated Cuisine</span> <br/>
            from Joel's Kitchen.
          </h1>

          {/* Description */}
          <p className="text-[#fdfbf7]/80 text-sm sm:text-base leading-relaxed max-w-lg font-light">
            Indulge in pure gastronomy. Every ingredient is sourced from local, sustainable farms, hand-prepared by master chefs, and delivered warm to your table. Simple food, elevated.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button 
              onClick={scrollToMenu}
              className="px-8 py-4 metallic-gradient text-[#1a1a1a] rounded-full font-bold text-sm shadow-glow transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group button-glow"
            >
              Explore Menu
              <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
            </button>
            <button 
              onClick={() => {
                const appSection = document.getElementById("app-download");
                if (appSection) appSection.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 glass-card text-[#1a1a1a] rounded-full font-bold text-sm transition-all duration-300 hover:scale-105"
            >
              Get Mobile App
            </button>
          </div>

        </div>

        {/* Dynamic design graphic - subtle badge */}
        <div className="hidden lg:flex absolute bottom-12 right-12 glass-panel p-6 rounded-2xl items-center gap-4 border border-[#fdfbf7]/10 max-w-xs transition-all duration-300 hover:scale-105 select-none animate-float animate-delay-300">
          <div className="w-12 h-12 rounded-xl metallic-gradient flex items-center justify-center text-2xl shadow-glow">
            🌾
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">100% Organic Curation</h4>
            <p className="text-xs text-[#1a1a1a]/60 mt-1 font-light">No artificial chemicals, just raw, freshly picked farm ingredients.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
