import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { ShoppingBag, Search, User, LogOut, ClipboardList, Menu, Heart } from "lucide-react";
import { Button } from "./ui";

const Navbar = ({ setShowLogin }) => {
  const { getCartQuantity, token, logout, user } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const navLinkClass =
    "px-4 py-2 text-sm font-medium text-brand-charcoal/70 hover:text-brand-gold transition-colors";

  return (
    <nav className="sticky top-0 z-40 bg-brand-cream/95 backdrop-blur-sm border-b border-brand-charcoal/5 shadow-soft">
      <div className="page-container h-16 sm:h-20 flex justify-between items-center gap-2">
        <Link to="/" className="group">
          <h1 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight leading-none">
            <span className="text-brand-charcoal group-hover:text-brand-gold transition-colors">Joel</span>
            <span className="text-brand-gold">.</span>
          </h1>
          <p className="text-[9px] font-semibold tracking-[0.25em] uppercase text-brand-gold/70 mt-0.5">
            Kitchen & Delivery
          </p>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {[
            { to: "/", label: "Home" },
            { action: "explore-menu", label: "Menu" },
            { to: "/about", label: "About" },
            { to: "/catering", label: "Catering" },
            { to: "/journal", label: "Journal" },
            { to: "/careers", label: "Careers" },
            { action: "footer", label: "Contact" },
          ].map((item, index) =>
            item.to ? (
              <Link key={index} to={item.to} className={navLinkClass}>
                {item.label}
              </Link>
            ) : (
              <button key={index} onClick={() => handleScroll(item.action)} className={navLinkClass}>
                {item.label}
              </button>
            )
          )}
          {user?.isAdmin && (
            <Link to="/admin" className={`${navLinkClass} text-brand-gold font-semibold`}>
              Admin
            </Link>
          )}
        </div>

        <div className="flex items-center gap-0.5 sm:gap-2">
          <button className="hidden sm:flex p-2.5 text-brand-charcoal/60 hover:text-brand-gold transition-colors min-w-[44px] min-h-[44px] items-center justify-center">
            <Search size={18} strokeWidth={2} />
          </button>

          <Link to="/cart" className="relative p-2.5 text-brand-charcoal/60 hover:text-brand-gold transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
            <ShoppingBag size={18} strokeWidth={2} />
            {getCartQuantity() > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-brand-gold text-brand-charcoal text-[9px] font-bold w-4 h-4 rounded-full flex justify-center items-center">
                {getCartQuantity()}
              </span>
            )}
          </Link>

          <Link to="/wishlist" className="hidden sm:flex p-2.5 text-brand-charcoal/60 hover:text-brand-gold transition-colors min-w-[44px] min-h-[44px] items-center justify-center">
            <Heart size={18} strokeWidth={2} />
          </Link>

          {!token ? (
            <Button
              variant="secondary"
              size="sm"
              className="hidden md:inline-flex rounded-full"
              onClick={() => setShowLogin(true)}
            >
              Sign In
            </Button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-charcoal/10 hover:border-brand-gold/40 bg-brand-cream transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold font-semibold text-sm font-serif">
                  {user?.name?.charAt(0).toUpperCase() || <User size={14} />}
                </div>
                <span className="hidden sm:inline text-xs font-semibold max-w-[80px] truncate text-brand-charcoal">
                  {user?.name || "Account"}
                </span>
              </button>

              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-52 bg-brand-cream border border-brand-charcoal/10 rounded-xl shadow-card-hover z-50 py-2 overflow-hidden animate-scale-in">
                    <div className="px-4 py-2 border-b border-brand-charcoal/5">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-charcoal/40">Signed in</p>
                      <p className="text-xs font-semibold text-brand-charcoal truncate mt-0.5">{user?.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left px-4 py-2.5 text-xs font-medium text-brand-charcoal/70 hover:bg-brand-gold/10 hover:text-brand-gold flex items-center gap-2.5 transition-colors"
                    >
                      <User size={15} />
                      My Profile
                    </Link>

                    <Link
                      to="/myorders"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left px-4 py-2.5 text-xs font-medium text-brand-charcoal/70 hover:bg-brand-gold/10 hover:text-brand-gold flex items-center gap-2.5 transition-colors"
                    >
                      <ClipboardList size={15} />
                      My Orders
                    </Link>

                    {user?.isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="w-full text-left px-4 py-2.5 text-xs font-semibold text-brand-gold hover:bg-brand-gold/10 flex items-center gap-2.5 transition-colors border-t border-brand-charcoal/5"
                      >
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                        navigate("/");
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors border-t border-brand-charcoal/5"
                    >
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          <Link
            to="/mobile-nav"
            state={{ from: location.pathname }}
            className="md:hidden p-2.5 text-brand-charcoal hover:text-brand-gold transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <Menu size={22} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
