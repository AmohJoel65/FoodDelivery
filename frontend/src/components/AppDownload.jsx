import React from "react";

const AppDownload = () => {
  return (
    <div id="app-download" className="max-w-7xl mx-auto px-6 py-16 scroll-mt-20">
      <div className="relative rounded-3xl bg-[#1a1a1a] text-[#fdfbf7] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between overflow-hidden shadow-2xl">
        
        {/* Background Decorative Rings */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full border border-white/5 pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full border border-white/5 pointer-events-none"></div>

        {/* Content */}
        <div className="max-w-xl text-left flex flex-col gap-4 z-10">
          <span className="text-[#d4af37] text-xs font-bold uppercase tracking-widest">Joel. Anywhere</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif leading-tight">
            Elevate Your Culinary Experience. <br/> Download the Mobile App.
          </h2>
          <p className="text-xs sm:text-sm text-[#fdfbf7]/75 font-light leading-relaxed max-w-md">
            Unlock priority slots, customized curation filters, and direct-from-kitchen GPS food delivery tracking. Joel's gastronomics are now available on the go.
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-4 mt-8 md:mt-0 z-10 shrink-0">
          
          {/* Apple App Store */}
          <a 
            href="#appstore" 
            className="flex items-center gap-3 bg-[#fdfbf7]/10 hover:bg-[#fdfbf7]/20 border border-white/10 px-5 py-3 rounded-2xl transition-all duration-300 transform active:scale-98 select-none"
            onClick={(e) => e.preventDefault()}
          >
            <span className="text-2xl">🍏</span>
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold text-[#fdfbf7]/60 tracking-wider">Download on the</p>
              <p className="text-xs font-bold text-[#fdfbf7]">Apple App Store</p>
            </div>
          </a>

          {/* Google Play Store */}
          <a 
            href="#googleplay" 
            className="flex items-center gap-3 bg-[#fdfbf7]/10 hover:bg-[#fdfbf7]/20 border border-white/10 px-5 py-3 rounded-2xl transition-all duration-300 transform active:scale-98 select-none"
            onClick={(e) => e.preventDefault()}
          >
            <span className="text-2xl">🤖</span>
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold text-[#fdfbf7]/60 tracking-wider">Get it on</p>
              <p className="text-xs font-bold text-[#fdfbf7]">Google Play Store</p>
            </div>
          </a>

        </div>

      </div>
    </div>
  );
};

export default AppDownload;
