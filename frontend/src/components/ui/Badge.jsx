import React from "react";

const variants = {
  default: "bg-brand-charcoal/80 text-brand-cream",
  gold: "bg-brand-gold/15 text-brand-gold border border-brand-gold/30",
  outline: "bg-brand-cream text-brand-charcoal/70 border border-brand-charcoal/10",
};

const Badge = ({ children, variant = "default", className = "" }) => {
  return (
    <span
      className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
