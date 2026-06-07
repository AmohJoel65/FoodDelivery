import React from "react";

const Input = ({ label, className = "", ...props }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal/50">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 bg-brand-cream border border-brand-charcoal/10 rounded-lg text-sm text-brand-charcoal placeholder:text-brand-charcoal/40 transition-colors focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
