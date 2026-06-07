import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowDownAZ, TrendingUp, DollarSign } from "lucide-react";

const options = [
  { id: "popular", label: "Most Popular", icon: TrendingUp },
  { id: "price-asc", label: "Price: Low to High", icon: DollarSign },
  { id: "price-desc", label: "Price: High to Low", icon: DollarSign },
  { id: "alpha", label: "Alphabetical", icon: ArrowDownAZ },
];

const SortDropdown = ({ selectedSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.id === selectedSort) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-between items-center w-full sm:w-48 rounded-xl border border-brand-charcoal/10 bg-brand-cream px-4 py-3 text-sm font-medium text-brand-charcoal hover:bg-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-gold/20 shadow-sm transition-all"
        >
          <span className="flex items-center gap-2">
            <selectedOption.icon size={16} className="text-brand-charcoal/60" />
            {selectedOption.label}
          </span>
          <ChevronDown size={16} className={`text-brand-charcoal/50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 sm:left-0 z-10 mt-2 w-full sm:w-56 origin-top-right sm:origin-top-left rounded-xl bg-brand-cream shadow-card-hover border border-brand-charcoal/5 focus:outline-none animate-scale-in">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onSortChange(option.id);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  selectedSort === option.id
                    ? "bg-brand-gold/10 text-brand-gold font-medium"
                    : "text-brand-charcoal hover:bg-brand-surface"
                }`}
              >
                <option.icon size={16} className={selectedSort === option.id ? "text-brand-gold" : "text-brand-charcoal/50"} />
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
