import React, { useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { 
  User, 
  Mail, 
  Lock, 
  MapPin, 
  Award, 
  Heart, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ChevronRight,
  ShieldCheck,
  Star,
  CheckCircle,
  LogIn,
  Settings,
  Sparkles,
  Phone
} from "lucide-react";

const Profile = ({ setShowLogin }) => {
  const { 
    token, 
    user, 
    favorites, 
    toggleFavorite, 
    addToCart, 
    food_list, 
    addresses, 
    saveAddress, 
    deleteAddress, 
    updateProfile,
    showAlert
  } = useContext(StoreContext);

  const [activeTab, setActiveTab] = useState("settings");
  
  // Profile settings inputs
  const [profileName, setProfileName] = useState(user?.name || "");
  const [profileEmail, setProfileEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Address form states
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    id: null,
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: ""
  });

  // Default Fallback details for unauthenticated views
  if (!token) {
    return (
      <main className="min-h-screen bg-[#fdfbf7] flex items-center justify-center py-20 px-6" aria-label="Joel Profile Gate Screen">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#e4e1db]/80 shadow-2xl p-8 text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-[#fdfbf7] border border-[#d4af37]/30 flex items-center justify-center mx-auto text-[#d4af37] shadow-sm">
            <User className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] tracking-widest uppercase font-bold text-[#d4af37]">Members Entrance</span>
            <h1 className="text-2xl font-serif font-bold text-gray-900">Your Gastronomy Profile</h1>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              Unlock your exclusive Gold Member loyalty point progressions, saved delivery coordinates, and bookmark your favorite artisan recipes.
            </p>
          </div>
          <button 
            onClick={() => setShowLogin && setShowLogin(true)}
            className="w-full py-3.5 bg-[#1a1a1a] text-white hover:bg-[#1a1a1a]/95 text-xs font-semibold tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all font-bold shadow-md"
            aria-label="Sign In or Register to Joel"
          >
            <LogIn className="w-4 h-4 text-[#d4af37]" /> Sign In / Register
          </button>
        </div>
      </main>
    );
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      showAlert("Passwords do not match!", "error", "Password Mismatch");
      return;
    }
    updateProfile({ name: profileName, email: profileEmail });
    setPassword("");
    setConfirmPassword("");
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!addressForm.name || !addressForm.street || !addressForm.city || !addressForm.phone) {
      showAlert("Please fill in required address fields", "warning", "Missing Information");
      return;
    }
    saveAddress(addressForm);
    setShowAddressForm(false);
    setAddressForm({
      id: null,
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      phone: ""
    });
  };

  const openEditAddress = (addr) => {
    setAddressForm(addr);
    setShowAddressForm(true);
  };

  // Filtered bookmarks mapping
  const favoriteItems = food_list.filter((item) => favorites.includes(item._id));

  // Loyalty Program Badges
  const badges = [
    { name: "Connoisseur of Saffron", desc: "Ordered 5+ saffron-infused signature creations.", unlocked: true },
    { name: "Fire-Hearth Devotee", desc: "Purchased wood-fired flatbreads on 3+ sessions.", unlocked: true },
    { name: "Grand Feast Coordinator", desc: "Booked a corporate or private wedding gala event.", unlocked: false },
    { name: "Chardonnay Sommelier", desc: "Added custom white wine pairings to orders.", unlocked: false }
  ];

  return (
    <main className="min-h-screen bg-[#fdfbf7] text-[#1a1a1a] pb-24" aria-label="User Account Profile and Loyalty Desk">
      {/* Upper header */}
      <section className="bg-[#1a1a1a] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
            <div className="w-20 h-20 rounded-full bg-[#d4af37] text-[#1a1a1a] font-serif text-3xl font-bold flex items-center justify-center border-2 border-white shadow-xl">
              {user?.name ? user.name.substring(0, 2).toUpperCase() : "JL"}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h1 className="text-2xl md:text-3xl font-serif font-bold">{user?.name || "Artisan Guest"}</h1>
                <span className="bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#d4af37] text-[9px] tracking-widest uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="w-2.5 h-2.5 fill-[#d4af37]" /> Gold Tier
                </span>
              </div>
              <p className="text-xs text-gray-400 font-light">{user?.email}</p>
            </div>
          </div>
          
          {/* Quick Point Tracker */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 shrink-0 shadow-lg">
            <div className="w-12 h-12 rounded-full border-2 border-[#d4af37] flex items-center justify-center text-lg font-serif font-bold text-[#d4af37]">
              450
            </div>
            <div>
              <p className="text-[10px] tracking-wider uppercase font-bold text-gray-400">Available Points</p>
              <p className="text-xs text-[#d4af37] font-semibold">100 Points to next dessert reward</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Menu Tabs */}
          <nav className="lg:col-span-3 space-y-2" aria-label="Account Settings Category menu">
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full p-4 rounded-xl text-left text-xs font-semibold tracking-widest uppercase flex items-center gap-3 transition-all ${
                activeTab === "settings" 
                  ? "bg-[#1a1a1a] text-white" 
                  : "bg-white text-gray-600 border border-[#e4e1db]/80 hover:bg-gray-50 active:scale-95"
              }`}
            >
              <Settings className="w-4 h-4" /> Account Settings
            </button>
            <button
              onClick={() => setActiveTab("rewards")}
              className={`w-full p-4 rounded-xl text-left text-xs font-semibold tracking-widest uppercase flex items-center gap-3 transition-all ${
                activeTab === "rewards" 
                  ? "bg-[#1a1a1a] text-white" 
                  : "bg-white text-gray-600 border border-[#e4e1db]/80 hover:bg-gray-50 active:scale-95"
              }`}
            >
              <Award className="w-4 h-4" /> Joel's Rewards
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`w-full p-4 rounded-xl text-left text-xs font-semibold tracking-widest uppercase flex items-center gap-3 transition-all ${
                activeTab === "favorites" 
                  ? "bg-[#1a1a1a] text-white" 
                  : "bg-white text-gray-600 border border-[#e4e1db]/80 hover:bg-gray-50 active:scale-95"
              }`}
            >
              <Heart className="w-4 h-4" /> Saved Favorites ({favorites.length})
            </button>
            <button
              onClick={() => setActiveTab("addresses")}
              className={`w-full p-4 rounded-xl text-left text-xs font-semibold tracking-widest uppercase flex items-center gap-3 transition-all ${
                activeTab === "addresses" 
                  ? "bg-[#1a1a1a] text-white" 
                  : "bg-white text-gray-600 border border-[#e4e1db]/80 hover:bg-gray-50 active:scale-95"
              }`}
            >
              <MapPin className="w-4 h-4" /> Delivery Addresses ({addresses.length})
            </button>
          </nav>

          {/* Right Content Tab Sheets */}
          <div className="lg:col-span-9 bg-white rounded-3xl border border-[#e4e1db]/80 shadow-sm p-6 md:p-8 min-h-[500px]">
            
            {/* A. ACCOUNT SETTINGS TAB */}
            {activeTab === "settings" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-2xl font-serif mb-1 font-bold">Profile Credentials</h2>
                  <p className="text-xs text-gray-500 font-light">Update your profile identity and login security credentials.</p>
                  <div className="w-12 h-[1px] bg-[#d4af37] mt-3"></div>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="prof-name" className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Display Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                        <input 
                          type="text"
                          id="prof-name"
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e4e1db] focus:ring-4 focus:ring-[#d4af37]/20 focus:outline-none transition-all bg-[#fdfbf7] text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="prof-email" className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                        <input 
                          type="email"
                          id="prof-email"
                          value={profileEmail}
                          onChange={(e) => setProfileEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e4e1db] focus:ring-4 focus:ring-[#d4af37]/20 focus:outline-none transition-all bg-[#fdfbf7] text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                    <div>
                      <label htmlFor="prof-pass" className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">New Password (leave blank to keep current)</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                        <input 
                          type="password"
                          id="prof-pass"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e4e1db] focus:ring-4 focus:ring-[#d4af37]/20 focus:outline-none transition-all bg-[#fdfbf7] text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="prof-confirm" className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Confirm New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                        <input 
                          type="password"
                          id="prof-confirm"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e4e1db] focus:ring-4 focus:ring-[#d4af37]/20 focus:outline-none transition-all bg-[#fdfbf7] text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button 
                      type="submit"
                      className="py-3 px-8 bg-[#1a1a1a] text-white hover:bg-[#1a1a1a]/95 text-xs font-semibold tracking-widest uppercase rounded-xl flex items-center gap-2 active:scale-95 transition-all shadow-md"
                    >
                      Save Settings
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* B. LOYALTY PROGRAM TAB */}
            {activeTab === "rewards" && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="text-2xl font-serif mb-1 font-bold">Joel's Rewards Loyalty Desk</h2>
                  <p className="text-xs text-gray-500 font-light">Your dedication to artisan dining earns points, unlocking custom culinary rewards.</p>
                  <div className="w-12 h-[1px] bg-[#d4af37] mt-3"></div>
                </div>

                {/* Point progression meter */}
                <div className="bg-[#1a1a1a] text-white p-8 rounded-3xl border border-[#d4af37]/20 relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                    <Star className="w-64 h-64 text-[#d4af37]" />
                  </div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="space-y-3 text-center md:text-left">
                      <span className="text-[#d4af37] text-[10px] tracking-widest uppercase font-bold">Loyalty Progression</span>
                      <h3 className="text-2xl font-serif text-white font-semibold">Gold Member Tier</h3>
                      <p className="text-xs text-gray-300 font-light max-w-sm">
                        You have earned **450 points** total! We award 1 point for every dollar spent on signature orders, private bookings, and curations.
                      </p>
                    </div>

                    <div className="w-32 h-32 relative shrink-0">
                      {/* Circular Gauge Ring */}
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="50" fill="transparent" stroke="#2a2a2a" strokeWidth="6" />
                        <circle cx="64" cy="64" r="50" fill="transparent" stroke="#d4af37" strokeWidth="6" 
                          strokeDasharray="314" strokeDashoffset="78" // 75% progression
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-serif font-bold text-white">450</span>
                        <span className="text-[8px] tracking-widest text-[#d4af37] uppercase font-bold">Points</span>
                      </div>
                    </div>
                  </div>

                  {/* Progressive Bar */}
                  <div className="relative z-10 mt-8 space-y-2">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>450 Points</span>
                      <span>600 Points (Next Premium Milestone)</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[#d4af37] rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-700">Active Gold Benefits:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2.5 text-xs text-gray-600 font-light">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>**Free signature dessert** on every birthday session request.</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-xs text-gray-600 font-light">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>**Priority scheduling** for pre-event private tastings.</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-xs text-gray-600 font-light">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>**Waiver** of standard peak-hour delivery shipping surcharges.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Rewards Badges */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-700">Unlockable Rewards Badges:</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {badges.map((badge, idx) => (
                        <div 
                          key={idx} 
                          className={`p-3 rounded-xl border text-center transition-all ${
                            badge.unlocked 
                              ? "bg-[#fdfbf7] border-[#d4af37]/30 text-gray-900" 
                              : "bg-gray-50 border-gray-200 text-gray-400 opacity-60"
                          }`}
                        >
                          <div className="flex justify-center mb-1.5">
                            <Sparkles className={`w-5 h-5 ${badge.unlocked ? "text-[#d4af37]" : "text-gray-300"}`} />
                          </div>
                          <h5 className="text-[10px] font-serif font-bold truncate">{badge.name}</h5>
                          <p className="text-[9px] font-light mt-0.5 line-clamp-2 leading-tight">{badge.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* C. SAVED FAVORITES TAB */}
            {activeTab === "favorites" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-2xl font-serif mb-1 font-bold">Saved Favorites</h2>
                  <p className="text-xs text-gray-500 font-light">Quickly view and immediately re-order your bookmarked dishes.</p>
                  <div className="w-12 h-[1px] bg-[#d4af37] mt-3"></div>
                </div>

                {favoriteItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favoriteItems.map((item) => (
                      <div key={item._id} className="bg-[#fdfbf7] border border-[#e4e1db]/80 rounded-2xl p-4 flex gap-4 hover:shadow-md transition-all group">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-20 h-20 rounded-xl object-cover shrink-0 border border-gray-100 group-hover:scale-105 transition-transform duration-300" 
                        />
                        <div className="flex flex-col justify-between flex-1 min-w-0">
                          <div>
                            <div className="flex justify-between items-start gap-1">
                              <h3 className="text-sm font-serif font-bold text-gray-900 truncate">{item.name}</h3>
                              <button 
                                onClick={() => toggleFavorite(item._id)}
                                className="text-red-500 hover:text-red-700 shrink-0 p-0.5"
                                aria-label={`Remove ${item.name} from favorites`}
                              >
                                <Heart className="w-3.5 h-3.5 fill-red-500" />
                              </button>
                            </div>
                            <span className="text-[10px] text-gray-400 font-light uppercase tracking-wider block mt-0.5">{item.category}</span>
                          </div>
                          
                          <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-gray-100/60">
                            <span className="text-xs font-semibold font-serif text-gray-800">{item.price.toFixed(0)} FCFA</span>
                            <button 
                              onClick={() => addToCart(item._id)}
                              className="py-1 px-3 bg-[#1a1a1a] text-white hover:bg-[#d4af37] hover:text-[#1a1a1a] text-[10px] tracking-widest uppercase font-bold rounded-lg flex items-center gap-1 transition-all active:scale-95"
                              aria-label={`Reorder ${item.name}`}
                            >
                              <ShoppingBag className="w-3 h-3" /> Reorder
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 border border-dashed border-[#e4e1db] rounded-2xl p-8 bg-[#fdfbf7]/50">
                    <Heart className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-base font-serif mb-1 font-semibold">No Bookmarks Saved</h3>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto">Click the heart bookmark icons on dishes across the menu display grids to populate your saved favorites.</p>
                  </div>
                )}
              </div>
            )}

            {/* D. DELIVERY ADDRESSES TAB */}
            {activeTab === "addresses" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-serif mb-1 font-bold">Delivery Coordinates</h2>
                    <p className="text-xs text-gray-500 font-light">Manage your saved home, office, and estate delivery profiles.</p>
                    <div className="w-12 h-[1px] bg-[#d4af37] mt-3"></div>
                  </div>
                  {!showAddressForm && (
                    <button 
                      onClick={() => setShowAddressForm(true)}
                      className="py-2.5 px-4 bg-[#1a1a1a] text-white hover:bg-[#d4af37] hover:text-[#1a1a1a] text-xs font-semibold tracking-widest uppercase rounded-xl flex items-center gap-1.5 active:scale-95 transition-all shadow-sm"
                    >
                      <Plus className="w-4 h-4" /> Add Address
                    </button>
                  )}
                </div>

                {/* New Address Form Modal overlay sheet */}
                {showAddressForm && (
                  <form onSubmit={handleAddressSubmit} className="bg-[#fdfbf7] p-6 rounded-2xl border border-[#d4af37]/20 space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                      <h3 className="text-sm font-serif font-bold text-gray-900">{addressForm.id ? "Edit Address Profile" : "New Address Profile"}</h3>
                      <button 
                        type="button"
                        onClick={() => { setShowAddressForm(false); setAddressForm({ id: null, name: "", street: "", city: "", state: "", zip: "", phone: "" }); }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600 mb-1">Address Label *</label>
                        <input 
                          type="text"
                          placeholder="e.g. Vacation Home"
                          required
                          value={addressForm.name}
                          onChange={(e) => setAddressForm({...addressForm, name: e.target.value})}
                          className="w-full px-3 py-2 border border-[#e4e1db] rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600 mb-1">Street Address *</label>
                        <input 
                          type="text"
                          placeholder="e.g. 124 Luxury Terraces"
                          required
                          value={addressForm.street}
                          onChange={(e) => setAddressForm({...addressForm, street: e.target.value})}
                          className="w-full px-3 py-2 border border-[#e4e1db] rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600 mb-1">City *</label>
                        <input 
                          type="text"
                          placeholder="e.g. Beverly Hills"
                          required
                          value={addressForm.city}
                          onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                          className="w-full px-3 py-2 border border-[#e4e1db] rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600 mb-1">State *</label>
                        <input 
                          type="text"
                          placeholder="e.g. CA"
                          required
                          value={addressForm.state}
                          onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
                          className="w-full px-3 py-2 border border-[#e4e1db] rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600 mb-1">Zip Code</label>
                        <input 
                          type="text"
                          placeholder="90210"
                          value={addressForm.zip}
                          onChange={(e) => setAddressForm({...addressForm, zip: e.target.value})}
                          className="w-full px-3 py-2 border border-[#e4e1db] rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600 mb-1">Phone Coordinate *</label>
                        <input 
                          type="text"
                          placeholder="310-555-0192"
                          required
                          value={addressForm.phone}
                          onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})}
                          className="w-full px-3 py-2 border border-[#e4e1db] rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                      <button 
                        type="button"
                        onClick={() => { setShowAddressForm(false); setAddressForm({ id: null, name: "", street: "", city: "", state: "", zip: "", phone: "" }); }}
                        className="py-2 px-4 rounded-xl border border-gray-200 text-xs font-semibold tracking-wider uppercase text-gray-500 hover:bg-white"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="py-2 px-5 bg-[#d4af37] text-[#1a1a1a] hover:bg-[#d4af37]/90 text-xs font-semibold tracking-wider uppercase rounded-xl font-bold active:scale-95"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                )}

                {/* Addresses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="border border-[#e4e1db] rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-all bg-[#fdfbf7]/20">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-serif font-bold text-gray-900">{addr.name}</h3>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => openEditAddress(addr)}
                              className="text-gray-400 hover:text-[#d4af37] text-[10px] uppercase font-bold"
                              aria-label={`Edit address ${addr.name}`}
                            >
                              Edit
                            </button>
                            <span className="text-gray-300">|</span>
                            <button 
                              onClick={() => deleteAddress(addr.id)}
                              className="text-gray-400 hover:text-red-500 text-[10px] uppercase font-bold"
                              aria-label={`Delete address ${addr.name}`}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className="w-full h-[1px] bg-gray-100"></div>
                        <p className="text-xs text-gray-600 font-light leading-relaxed">
                          {addr.street}, {addr.city}, {addr.state} {addr.zip}
                        </p>
                        <p className="text-[10px] text-gray-400 font-light flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-[#d4af37]" /> {addr.phone}
                        </p>
                      </div>
                    </div>
                  ))}

                  {addresses.length === 0 && (
                    <div className="col-span-2 text-center py-16 border border-dashed border-[#e4e1db] rounded-2xl p-8 bg-[#fdfbf7]/50">
                      <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-base font-serif mb-1 font-semibold">No Addresses Saved</h3>
                      <p className="text-xs text-gray-500 max-w-xs mx-auto">Create a saved address coordinate profile to complete checkout in a single click.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
