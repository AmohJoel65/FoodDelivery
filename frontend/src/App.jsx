import React, { useState, useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import ScrollToTop from "./components/ScrollToTop";
import FloatingCartButton from "./components/FloatingCartButton";
import CustomModal from "./components/CustomModal";
import { StoreContext } from "./context/StoreContext";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

// Customer Pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import MyOrders from "./pages/MyOrders";
import Wishlist from "./pages/Wishlist";
import Catering from "./pages/Catering";
import Journal from "./pages/Journal";
import ArticleDetail from "./pages/ArticleDetail";
import Careers from "./pages/Careers";
import Profile from "./pages/Profile";
import About from "./pages/About";
import MobileNav from "./pages/MobileNav";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Refund from "./pages/Refund";

// Admin Pages
import AdminLayout from "./admin/AdminLayout";
import DashboardOverview from "./admin/DashboardOverview";
import AddItem from "./admin/AddItem";
import ListItem from "./admin/ListItem";
import ManageOrders from "./admin/ManageOrders";
import UserManagement from "./admin/UserManagement";
import CouponManagement from "./admin/CouponManagement";
import DeliveryZones from "./admin/DeliveryZones";
import DeliveryTimeSlots from "./admin/DeliveryTimeSlots";
import TaxConfiguration from "./admin/TaxConfiguration";
import RefundManagement from "./admin/RefundManagement";
import DataExport from "./admin/DataExport";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const { toasts, removeToast, customModal, closeCustomModal } = useContext(StoreContext);
  const location = useLocation();

  // If the path starts with /admin or is mobile-nav, hide customer Navbar and Footer
  const isAdminPath = location.pathname.startsWith("/admin");
  const isMobileNavPath = location.pathname === "/mobile-nav";

  return (
    <div className="flex flex-col min-h-screen bg-brand-surface">
      {/* Scroll Restoration */}
      <ScrollToTop />

      {/* 1. Login Modal Overlay Popup */}
      {showLogin && <LoginModal setShowLogin={setShowLogin} />}

      {/* Custom Alert/Confirm Modal */}
      <CustomModal
        isOpen={customModal.isOpen}
        onClose={closeCustomModal}
        title={customModal.title}
        message={customModal.message}
        type={customModal.type}
        onConfirm={customModal.onConfirm}
        confirmText={customModal.confirmText}
        cancelText={customModal.cancelText}
      />

      {/* 2. Customer Persistent Sticky Navbar (Hidden on Admin and mobile-nav pages) */}
      {!isAdminPath && !isMobileNavPath && <Navbar setShowLogin={setShowLogin} />}

      {/* 3. Primary Pages Route Handlers */}
      <div className="flex-grow">
        <Routes>
          {/* Customer Frontend Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/catering" element={<Catering />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:id" element={<ArticleDetail />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/profile" element={<Profile setShowLogin={setShowLogin} />} />
          <Route path="/about" element={<About />} />
          <Route path="/mobile-nav" element={<MobileNav setShowLogin={setShowLogin} />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund" element={<Refund />} />

          {/* Admin Dashboard Routes (Nested) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="dashboard" element={<DashboardOverview />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="coupons" element={<CouponManagement />} />
            <Route path="zones" element={<DeliveryZones />} />
            <Route path="time-slots" element={<DeliveryTimeSlots />} />
            <Route path="tax" element={<TaxConfiguration />} />
            <Route path="refunds" element={<RefundManagement />} />
            <Route path="export" element={<DataExport />} />
            <Route path="add" element={<AddItem />} />
            <Route path="list" element={<ListItem />} />
            <Route path="orders" element={<ManageOrders />} />
          </Route>

          {/* Fallback route redirection */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* 4. Customer Persistent Dark Footer (Hidden on Admin and mobile-nav pages) */}
      {!isAdminPath && !isMobileNavPath && <Footer />}

      {/* 5. Floating Cart Button (Hidden on Admin, Cart, and mobile-nav pages) */}
      {!isAdminPath && location.pathname !== '/cart' && !isMobileNavPath && <FloatingCartButton />}

      {/* 6. Toast notifications — above FAB on mobile */}
      <div
        className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 flex flex-col gap-2 sm:max-w-sm pointer-events-none"
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className={`pointer-events-auto flex items-center justify-between p-3 sm:p-4 rounded-xl shadow-card border text-xs sm:text-sm font-medium transition-all duration-300 animate-fade-in ${
              toast.type === "success" 
                ? "bg-brand-charcoal text-brand-cream border-brand-gold/30" 
                : toast.type === "error"
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-brand-cream border-brand-charcoal/10 text-brand-charcoal"
            }`}
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-center gap-2.5">
              {toast.type === "success" && <CheckCircle className="w-5 h-5 text-brand-gold shrink-0" />}
              {toast.type === "error" && <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />}
              {toast.type === "info" && <Info className="w-5 h-5 text-brand-gold shrink-0" />}
              <span>{toast.message}</span>
            </div>
            <button 
              onClick={() => removeToast(toast.id)}
              className="ml-4 hover:opacity-85 text-gray-400 hover:text-white transition-colors focus:outline-none"
              aria-label="Dismiss notification"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
