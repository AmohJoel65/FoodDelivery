import React from "react";
import { Smartphone } from "lucide-react";

const AppDownload = () => {
  return (
    <div id="app-download" className="page-container section-padding scroll-mt-20">
      <div className="brand-card-accent rounded-2xl bg-brand-charcoal text-brand-cream p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-lg text-left flex flex-col gap-3">
          <span className="brand-label text-brand-gold">Coming soon</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif leading-tight">
            Order faster with the Joel. mobile app
          </h2>
          <p className="text-sm text-brand-cream/70 leading-relaxed">
            Track your delivery, save favorites, and reorder in one tap. Available on iOS and Android soon.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-3 bg-brand-cream/10 border border-white/10 px-5 py-3 rounded-xl opacity-70 cursor-not-allowed">
            <Smartphone size={20} className="text-brand-gold" />
            <div className="text-left">
              <p className="text-[10px] uppercase font-semibold text-brand-cream/50 tracking-wider">App Store</p>
              <p className="text-xs font-semibold">Coming soon</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-brand-cream/10 border border-white/10 px-5 py-3 rounded-xl opacity-70 cursor-not-allowed">
            <Smartphone size={20} className="text-brand-gold" />
            <div className="text-left">
              <p className="text-[10px] uppercase font-semibold text-brand-cream/50 tracking-wider">Google Play</p>
              <p className="text-xs font-semibold">Coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
