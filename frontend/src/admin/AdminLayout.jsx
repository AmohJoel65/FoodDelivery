import React, { useContext, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import {
  PlusCircle,
  ListCollapse,
  ShoppingBag,
  ShieldAlert,
  ArrowLeft,
  LayoutDashboard,
  Users,
  Ticket,
} from "lucide-react";

const navItems = [
  { to: "/admin", end: true, icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/orders", icon: ShoppingBag, label: "Orders" },
  { to: "/admin/list", icon: ListCollapse, label: "Menu Items" },
  { to: "/admin/add", icon: PlusCircle, label: "Add Item" },
  { to: "/admin/users", icon: Users, label: "Users" },
  { to: "/admin/coupons", icon: Ticket, label: "Coupons" },
];

const AdminLayout = () => {
  const { user, token, loading } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!token || !user || !user.isAdmin) {
        const timer = setTimeout(() => navigate("/"), 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [user, token, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-brand-cream px-4">
        <div className="w-10 h-10 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-brand-charcoal/50 mt-4">Verifying access...</p>
      </div>
    );
  }

  if (!token || !user || !user.isAdmin) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-brand-cream p-6 text-center">
        <ShieldAlert size={32} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-bold font-serif text-brand-charcoal">Access restricted</h2>
        <p className="text-sm text-brand-charcoal/60 mt-2 max-w-sm">Admin permissions required. Redirecting...</p>
        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-brand-charcoal text-brand-cream font-semibold text-sm rounded-full flex items-center gap-2 min-h-[44px]"
        >
          <ArrowLeft size={14} />
          Back to shop
        </Link>
      </div>
    );
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2.5 md:px-4 md:py-3.5 rounded-xl text-[11px] md:text-xs font-semibold uppercase tracking-wider transition-all shrink-0 whitespace-nowrap min-h-[44px] ${
      isActive
        ? "bg-brand-gold text-brand-charcoal shadow-card"
        : "text-brand-cream/75 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col md:flex-row text-left">
      <aside className="w-full md:w-64 bg-brand-charcoal text-brand-cream shrink-0 flex flex-col border-b md:border-b-0 md:border-r border-brand-gold/10">
        <div className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <Link to="/" className="text-xl md:text-2xl font-bold font-serif tracking-tight">
              Joel<span className="text-brand-gold">.</span>
            </Link>
            <p className="text-[9px] uppercase font-bold tracking-widest text-brand-gold mt-0.5">Admin</p>
          </div>
          <Link
            to="/"
            className="md:hidden flex items-center gap-1 text-[10px] font-semibold text-brand-cream/60 hover:text-brand-gold px-2 py-1"
          >
            <ArrowLeft size={12} />
            Shop
          </Link>
        </div>

        <nav className="flex md:flex-col overflow-x-auto md:overflow-visible gap-1 p-2 md:p-4 md:flex-grow no-scrollbar snap-x-mandatory">
          {navItems.map(({ to, end, icon: Icon, label }) => (
            <NavLink key={to} to={to} end={end} className={linkClass}>
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block p-4 border-t border-white/5">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-brand-cream/70 hover:text-white transition-all min-h-[44px]"
          >
            <ArrowLeft size={13} />
            Back to shop
          </Link>
        </div>
      </aside>

      <main className="flex-grow p-4 sm:p-6 md:p-10 lg:p-12 overflow-y-auto overflow-x-hidden">
        <div className="max-w-5xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
