import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { X, Home, Menu, Utensils, Info, Calendar, BookOpen, Briefcase, Phone, User, LogOut, ClipboardList, ShoppingBag, Heart, Search } from "lucide-react";
import { MessageCircle, Facebook, Linkedin, Instagram } from "lucide-react";

const MobileNav = ({ setShowLogin }) => {
  const { token, logout, user, getCartQuantity } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (elementId) => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-[#fdfbf7]/95 via-[#fdfbf7]/98 to-[#fdfbf7]/95 backdrop-blur-xl border-b border-brand-charcoal/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          {/* Brand Logo */}
          <Link to="/" className="group">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold font-['Playfair_Display'] tracking-tight leading-none">
                <span className="text-brand-charcoal group-hover:text-brand-gold transition-all duration-500">Joel</span>
                <span className="text-brand-gold">.</span>
              </h1>
            </div>
          </Link>

          {/* Close Button */}
          <Link to={location.state?.from || "/"} className="p-2 text-brand-charcoal hover:text-brand-gold transition-colors duration-300">
            <X size={28} strokeWidth={2} />
          </Link>
        </div>
      </div>

      {/* Navigation Content */}
      <div className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
        
        {/* Main Navigation Links */}
        <div className="space-y-2 mb-8">
          <Link 
            to="/" 
            className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-brand-charcoal/5 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-charcoal/5 flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors">
              <Home size={22} className="text-brand-charcoal group-hover:text-brand-gold" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Outfit'] text-brand-charcoal">Home</h3>
              <p className="text-xs text-brand-charcoal/50">Return to main page</p>
            </div>
          </Link>

          <button 
            onClick={() => handleScroll("explore-menu")}
            className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl border border-brand-charcoal/5 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-charcoal/5 flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors">
              <Menu size={22} className="text-brand-charcoal group-hover:text-brand-gold" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold font-['Outfit'] text-brand-charcoal">Menu</h3>
              <p className="text-xs text-brand-charcoal/50">Explore our dishes</p>
            </div>
          </button>

          <Link 
            to="/about" 
            className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-brand-charcoal/5 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-charcoal/5 flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors">
              <Info size={22} className="text-brand-charcoal group-hover:text-brand-gold" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Outfit'] text-brand-charcoal">About Us</h3>
              <p className="text-xs text-brand-charcoal/50">Our story & team</p>
            </div>
          </Link>

          <Link 
            to="/catering" 
            className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-brand-charcoal/5 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-charcoal/5 flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors">
              <Utensils size={22} className="text-brand-charcoal group-hover:text-brand-gold" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Outfit'] text-brand-charcoal">Catering</h3>
              <p className="text-xs text-brand-charcoal/50">Event services</p>
            </div>
          </Link>

          <Link 
            to="/journal" 
            className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-brand-charcoal/5 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-charcoal/5 flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors">
              <BookOpen size={22} className="text-brand-charcoal group-hover:text-brand-gold" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Outfit'] text-brand-charcoal">Journal</h3>
              <p className="text-xs text-brand-charcoal/50">Culinary articles</p>
            </div>
          </Link>

          <Link 
            to="/careers" 
            className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-brand-charcoal/5 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-charcoal/5 flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors">
              <Briefcase size={22} className="text-brand-charcoal group-hover:text-brand-gold" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Outfit'] text-brand-charcoal">Careers</h3>
              <p className="text-xs text-brand-charcoal/50">Join our team</p>
            </div>
          </Link>

          <button 
            onClick={() => handleScroll("footer")}
            className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl border border-brand-charcoal/5 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-charcoal/5 flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors">
              <Phone size={22} className="text-brand-charcoal group-hover:text-brand-gold" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold font-['Outfit'] text-brand-charcoal">Contact Us</h3>
              <p className="text-xs text-brand-charcoal/50">Get in touch</p>
            </div>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2 mb-8">
          <h4 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal/40 mb-4">Quick Actions</h4>
          
          <Link 
            to="/cart" 
            className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] rounded-2xl hover:shadow-lg transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <ShoppingBag size={22} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold font-['Outfit'] text-white">Cart</h3>
              <p className="text-xs text-white/60">{getCartQuantity()} items</p>
            </div>
            {getCartQuantity() > 0 && (
              <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center">
                <span className="text-white text-xs font-bold">{getCartQuantity()}</span>
              </div>
            )}
          </Link>

          <Link 
            to="/wishlist" 
            className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-brand-charcoal/5 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-charcoal/5 flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors">
              <Heart size={22} className="text-brand-charcoal group-hover:text-brand-gold" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Outfit'] text-brand-charcoal">Wishlist</h3>
              <p className="text-xs text-brand-charcoal/50">Saved items</p>
            </div>
          </Link>
        </div>

        {/* Account Section */}
        {token && (
          <div className="space-y-2 mb-8">
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal/40 mb-4">Account</h4>
            
            <Link 
              to="/profile" 
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-brand-charcoal/5 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-charcoal/5 flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors">
                <User size={22} className="text-brand-charcoal group-hover:text-brand-gold" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-['Outfit'] text-brand-charcoal">My Profile</h3>
                <p className="text-xs text-brand-charcoal/50">{user?.name || "Client"}</p>
              </div>
            </Link>

            <Link 
              to="/myorders" 
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-brand-charcoal/5 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-charcoal/5 flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors">
                <ClipboardList size={22} className="text-brand-charcoal group-hover:text-brand-gold" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-['Outfit'] text-brand-charcoal">My Orders</h3>
                <p className="text-xs text-brand-charcoal/50">Order history</p>
              </div>
            </Link>

            {user?.isAdmin && (
              <Link 
                to="/admin" 
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-brand-gold/10 to-brand-gold-dark/10 rounded-2xl border border-brand-gold/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-gold/20 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-brand-gold pulse-active"></span>
                </div>
                <div>
                  <h3 className="text-lg font-bold font-['Outfit'] text-brand-gold">Admin Dashboard</h3>
                  <p className="text-xs text-brand-gold/60">Management panel</p>
                </div>
              </Link>
            )}
          </div>
        )}

        {/* Social Media Icons */}
        <div className="mb-8">
          <h4 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal/40 mb-4">Connect With Us</h4>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="https://wa.me/237673184599"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-green-600 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 min-h-[52px]"
            >
              <MessageCircle size={20} className="text-white" />
              <span className="text-white font-semibold text-sm">WhatsApp</span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 min-h-[52px]"
            >
              <Facebook size={20} className="text-white" />
              <span className="text-white font-semibold text-sm">Facebook</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 min-h-[52px]"
            >
              <Instagram size={20} className="text-white" />
              <span className="text-white font-semibold text-sm">Instagram</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-blue-700 rounded-xl hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 min-h-[52px]"
            >
              <Linkedin size={20} className="text-white" />
              <span className="text-white font-semibold text-sm">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Sign In/Out Button */}
        <div className="pt-4 border-t border-brand-charcoal/10">
          {!token ? (
            <button 
              onClick={() => setShowLogin(true)}
              className="w-full py-4 bg-gradient-to-r from-brand-gold to-brand-gold-dark text-white rounded-2xl font-bold text-sm font-['Outfit'] tracking-wide brand-card hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              Sign In
            </button>
          ) : (
            <button 
              onClick={handleLogout}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-bold text-sm font-['Outfit'] tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
