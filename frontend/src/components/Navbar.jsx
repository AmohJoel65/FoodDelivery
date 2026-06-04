import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { ShoppingBag, Search, User, LogOut, ClipboardList, Menu, X, Heart } from "lucide-react";

const Navbar = ({ setShowLogin }) => {
  const { getCartQuantity, token, logout, user } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Smooth scroll handler for anchor links
  const handleScroll = (elementId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const element = document.getElementById(elementId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-gradient-to-r from-[#fdfbf7]/95 via-[#fdfbf7]/98 to-[#fdfbf7]/95 backdrop-blur-xl border-b border-[#1a1a1a]/5 shadow-soft transition-all">
      <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link to="/" className="group">
          <div className="flex items-center gap-2">
            <div className="relative">
              <h1 className="text-4xl font-bold font-['Playfair_Display'] tracking-tight leading-none">
                <span className="text-[#1a1a1a] group-hover:text-[#d4af37] transition-all duration-500">Joel</span>
                <span className="text-[#d4af37] relative">
                  .
                  <span className="absolute -inset-1 bg-[#d4af37]/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                </span>
              </h1>
              <p className="text-[8px] font-semibold tracking-[0.3em] uppercase text-[#d4af37]/70 mt-1">Artisan Gastronomy</p>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { to: "/", label: "Home" },
            { action: "explore-menu", label: "Menu" },
            { to: "/about", label: "About" },
            { to: "/catering", label: "Catering" },
            { to: "/journal", label: "Journal" },
            { to: "/careers", label: "Careers" },
            { action: "footer", label: "Contact" }
          ].map((item, index) => (
            item.to ? (
              <Link
                key={index}
                to={item.to}
                className="relative px-4 py-2 text-[13px] font-['Outfit'] font-medium tracking-wide text-[#1a1a1a]/70 hover:text-[#d4af37] transition-all duration-300 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#b88934] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ) : (
              <button
                key={index}
                onClick={() => handleScroll(item.action)}
                className="relative px-4 py-2 text-[13px] font-['Outfit'] font-medium tracking-wide text-[#1a1a1a]/70 hover:text-[#d4af37] transition-all duration-300 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#b88934] group-hover:w-full transition-all duration-300"></span>
              </button>
            )
          ))}
          {user?.isAdmin && (
            <Link
              to="/admin"
              className="relative px-4 py-2 text-[13px] font-['Outfit'] font-semibold tracking-wide text-[#d4af37] hover:text-[#b88934] transition-all duration-300 flex items-center gap-2 group ml-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] pulse-active"></span>
              Admin Desk
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#b88934] group-hover:w-full transition-all duration-300"></span>
            </Link>
          )}
        </div>

        {/* Utility / Right Action Icons */}
        <div className="flex items-center gap-4">
          
          {/* Search Trigger */}
          <button className="relative p-2 text-[#1a1a1a]/70 hover:text-[#d4af37] transition-all duration-300 group">
            <Search size={18} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
            <span className="absolute inset-0 bg-[#d4af37]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>

          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2 text-[#1a1a1a]/70 hover:text-[#d4af37] transition-all duration-300 group">
            <ShoppingBag size={18} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
            {getCartQuantity() > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#d4af37] to-[#b88934] text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex justify-center items-center shadow-gold animate-bounce">
                {getCartQuantity()}
              </span>
            )}
            <span className="absolute inset-0 bg-[#d4af37]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>

          {/* Wishlist Icon */}
          <Link to="/wishlist" className="relative p-2 text-[#1a1a1a]/70 hover:text-[#d4af37] transition-all duration-300 group">
            <Heart size={18} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
            <span className="absolute inset-0 bg-[#d4af37]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>

          {/* Sign In Button / User Profiles */}
          {!token ? (
            <button 
              onClick={() => setShowLogin(true)} 
              className="hidden md:block px-5 py-2 rounded-full border-2 border-[#1a1a1a]/20 text-[12px] font-['Outfit'] font-semibold tracking-wide hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-[#1a1a1a] transition-all duration-300 shadow-sm hover:shadow-gold"
            >
              Sign In
            </button>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)} 
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-[#1a1a1a]/10 hover:border-[#d4af37]/50 bg-white/50 backdrop-blur-sm transition-all duration-300 group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#b88934]/20 flex items-center justify-center text-[#d4af37] font-semibold text-sm font-['Playfair_Display'] shadow-sm">
                  {user?.name?.charAt(0).toUpperCase() || <User size={16} />}
                </div>
                <span className="hidden sm:inline text-xs font-semibold max-w-[80px] truncate text-[#1a1a1a] font-['Outfit']">
                  {user?.name || "Client"}
                </span>
              </button>

              {/* Profile Dropdown */}
              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)}></div>
                  <div className="absolute right-0 mt-3 w-52 bg-white/95 backdrop-blur-xl border border-[#1a1a1a]/8 rounded-2xl shadow-gold z-50 py-3 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-5 py-3 border-b border-[#1a1a1a]/5 bg-gradient-to-r from-[#d4af37]/5 to-transparent">
                      <p className="text-[10px] font-semibold tracking-wider uppercase text-[#1a1a1a]/40">Welcome</p>
                      <p className="text-xs font-bold text-[#1a1a1a] truncate font-['Outfit'] mt-0.5">{user?.email}</p>
                    </div>
                    
                    <Link 
                      to="/profile" 
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left px-5 py-3 text-xs font-medium text-[#1a1a1a]/70 hover:bg-[#d4af37]/10 hover:text-[#d4af37] flex items-center gap-3 transition-all duration-200 group"
                    >
                      <User size={16} className="text-[#d4af37] group-hover:scale-110 transition-transform" />
                      <span className="font-['Outfit']">My Profile</span>
                    </Link>
                    
                    <Link 
                      to="/myorders" 
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left px-5 py-3 text-xs font-medium text-[#1a1a1a]/70 hover:bg-[#d4af37]/10 hover:text-[#d4af37] flex items-center gap-3 transition-all duration-200 group"
                    >
                      <ClipboardList size={16} className="text-[#d4af37] group-hover:scale-110 transition-transform" />
                      <span className="font-['Outfit']">My Orders</span>
                    </Link>
                    
                    {user?.isAdmin && (
                      <Link 
                        to="/admin" 
                        onClick={() => setDropdownOpen(false)}
                        className="w-full text-left px-5 py-3 text-xs font-semibold text-[#d4af37] hover:bg-[#d4af37]/10 flex items-center gap-3 transition-all duration-200 group border-t border-[#1a1a1a]/5 mt-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] pulse-active"></span>
                        <span className="font-['Outfit']">Admin Dashboard</span>
                      </Link>
                    )}

                    <button 
                      onClick={() => { logout(); setDropdownOpen(false); navigate("/"); }}
                      className="w-full text-left px-5 py-3 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-3 transition-all duration-200 group border-t border-[#1a1a1a]/5 mt-1"
                    >
                      <LogOut size={16} className="group-hover:scale-110 transition-transform" />
                      <span className="font-['Outfit']">Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Mobile Hamburgers Trigger */}
          <Link 
            to="/mobile-nav" 
            state={{ from: location.pathname }}
            className="md:hidden relative p-2 text-[#1a1a1a] hover:text-[#d4af37] transition-colors duration-300"
          >
            <Menu size={24} strokeWidth={2} />
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
