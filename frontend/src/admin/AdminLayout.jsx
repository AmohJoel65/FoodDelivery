import React, { useContext, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { PlusCircle, ListCollapse, ShoppingBag, ShieldAlert, ArrowLeft, LayoutDashboard, Users, Ticket, MapPin, Clock, Percent, DollarSign, RefreshCw, FileText } from "lucide-react";

const AdminLayout = () => {
  const { user, token, loading } = useContext(StoreContext);
  const navigate = useNavigate();

  // Route guarding: only allow Admin users to view dashboard
  useEffect(() => {
    if (!loading) {
      if (!token || !user || !user.isAdmin) {
        // Not authorized, redirect after small delay
        const timer = setTimeout(() => navigate("/"), 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [user, token, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#fdfbf7]">
        <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-semibold tracking-widest text-[#1a1a1a]/50 uppercase mt-4">Verifying Admin Credentials...</p>
      </div>
    );
  }

  if (!token || !user || !user.isAdmin) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#fdfbf7] p-6 text-center select-none">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-650 border border-red-100 shadow-md animate-bounce mb-6">
          <ShieldAlert size={32} />
        </div>
        <h2 className="text-3xl font-bold font-serif text-[#1a1a1a]">Access Restricted</h2>
        <p className="text-sm text-[#1a1a1a]/60 mt-3 max-w-sm font-light leading-relaxed">
          Administrative permissions required. Normal user credentials detected. Redirecting to Joel's home landing in 3 seconds...
        </p>
        <Link 
          to="/" 
          className="mt-8 px-6 py-3 bg-[#1a1a1a] hover:bg-[#d4af37] hover:text-[#1a1a1a] text-[#fdfbf7] font-semibold text-xs rounded-full flex items-center gap-2 transition-all shadow-md"
        >
          <ArrowLeft size={14} />
          Return Home Immediately
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col md:flex-row text-left">
      
      {/* PERSISTENT SIDEBAR */}
      <aside className="w-full md:w-64 bg-[#1a1a1a] text-[#fdfbf7] shrink-0 flex flex-col border-r border-[#ebdcae]/10">
        
        {/* Title branding */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <Link to="/" className="text-2xl font-bold font-serif tracking-tight flex items-center gap-0.5">
              <span>Joel</span>
              <span className="text-[#d4af37]">.</span>
            </Link>
            <p className="text-[9px] uppercase font-bold tracking-widest text-[#d4af37] mt-0.5">Admin Desk</p>
          </div>
          <span className="bg-[#d4af37]/20 border border-[#d4af37]/30 text-[#ebdcae] text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
            Sysop
          </span>
        </div>

        {/* Navigation links */}
        <nav className="flex-grow p-4 flex flex-col gap-2">
          
          <NavLink 
            to="/admin"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              isActive 
                ? "bg-[#d4af37] text-[#1a1a1a] shadow-lg shadow-gold-500/10 scale-102 font-bold" 
                : "text-[#fdfbf7]/75 hover:bg-white/5 hover:text-white"
            }`}
          >
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink 
            to="/admin/users"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              isActive 
                ? "bg-[#d4af37] text-[#1a1a1a] shadow-lg shadow-gold-500/10 scale-102 font-bold" 
                : "text-[#fdfbf7]/75 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Users size={16} />
            <span>Users</span>
          </NavLink>

          <NavLink 
            to="/admin/coupons"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              isActive 
                ? "bg-[#d4af37] text-[#1a1a1a] shadow-lg shadow-gold-500/10 scale-102 font-bold" 
                : "text-[#fdfbf7]/75 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Ticket size={16} />
            <span>Coupons</span>
          </NavLink>

          <NavLink 
            to="/admin/zones"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              isActive 
                ? "bg-[#d4af37] text-[#1a1a1a] shadow-lg shadow-gold-500/10 scale-102 font-bold" 
                : "text-[#fdfbf7]/75 hover:bg-white/5 hover:text-white"
            }`}
          >
            <MapPin size={16} />
            <span>Zones</span>
          </NavLink>

          <NavLink 
            to="/admin/time-slots"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              isActive 
                ? "bg-[#d4af37] text-[#1a1a1a] shadow-lg shadow-gold-500/10 scale-102 font-bold" 
                : "text-[#fdfbf7]/75 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Clock size={16} />
            <span>Time Slots</span>
          </NavLink>

          <NavLink 
            to="/admin/tax"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              isActive 
                ? "bg-[#d4af37] text-[#1a1a1a] shadow-lg shadow-gold-500/10 scale-102 font-bold" 
                : "text-[#fdfbf7]/75 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Percent size={16} />
            <span>Tax</span>
          </NavLink>

          <NavLink 
            to="/admin/refunds"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              isActive 
                ? "bg-[#d4af37] text-[#1a1a1a] shadow-lg shadow-gold-500/10 scale-102 font-bold" 
                : "text-[#fdfbf7]/75 hover:bg-white/5 hover:text-white"
            }`}
          >
            <DollarSign size={16} />
            <span>Refunds</span>
          </NavLink>

          <NavLink 
            to="/admin/export"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              isActive 
                ? "bg-[#d4af37] text-[#1a1a1a] shadow-lg shadow-gold-500/10 scale-102 font-bold" 
                : "text-[#fdfbf7]/75 hover:bg-white/5 hover:text-white"
            }`}
          >
            <FileText size={16} />
            <span>Export</span>
          </NavLink>

          <div className="border-t border-white/10 my-2"></div>

          <NavLink 
            to="/admin/add"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              isActive 
                ? "bg-[#d4af37] text-[#1a1a1a] shadow-lg shadow-gold-500/10 scale-102 font-bold" 
                : "text-[#fdfbf7]/75 hover:bg-white/5 hover:text-white"
            }`}
          >
            <PlusCircle size={16} />
            <span>Add Item</span>
          </NavLink>

          <NavLink 
            to="/admin/list"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              isActive 
                ? "bg-[#d4af37] text-[#1a1a1a] shadow-lg shadow-gold-500/10 scale-102 font-bold" 
                : "text-[#fdfbf7]/75 hover:bg-white/5 hover:text-white"
            }`}
          >
            <ListCollapse size={16} />
            <span>List Items</span>
          </NavLink>

          <NavLink 
            to="/admin/orders"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              isActive 
                ? "bg-[#d4af37] text-[#1a1a1a] shadow-lg shadow-gold-500/10 scale-102 font-bold" 
                : "text-[#fdfbf7]/75 hover:bg-white/5 hover:text-white"
            }`}
          >
            <ShoppingBag size={16} />
            <span>Manage Orders</span>
          </NavLink>

        </nav>

        {/* Back link at bottom */}
        <div className="p-4 border-t border-white/5">
          <Link 
            to="/"
            className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-[#fdfbf7]/70 hover:text-white transition-all"
          >
            <ArrowLeft size={13} />
            Back to Client Shop
          </Link>
        </div>

      </aside>

      {/* ADMIN SUBPAGE CONTAINER */}
      <main className="flex-grow p-8 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;
