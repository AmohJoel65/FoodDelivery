import React from "react";

const variants = {
  primary: "bg-brand-charcoal text-brand-cream hover:bg-brand-gold hover:text-brand-charcoal",
  secondary: "bg-brand-cream text-brand-charcoal border border-brand-charcoal/15 hover:border-brand-gold hover:text-brand-gold",
  ghost: "bg-transparent text-brand-charcoal/70 hover:text-brand-gold hover:bg-brand-gold/5",
  gold: "bg-brand-gold text-brand-charcoal hover:bg-brand-gold-dark",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3 text-sm",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
