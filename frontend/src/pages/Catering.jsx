import React, { useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { 
  Calendar, 
  Users, 
  Sparkles, 
  Utensils, 
  Download, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MessageSquare,
  ShieldCheck,
  ChefHat
} from "lucide-react";

const Catering = () => {
  const { showToast, url } = useContext(StoreContext);
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    date: "",
    eventType: "Corporate Gala",
    guestCount: "",
    theme: "Artisan French Gastronomy",
    dietaryTheme: "None",
    customRequests: "",
    name: "",
    email: "",
    phone: ""
  });
  
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Experience Packages Seeding
  const packages = [
    {
      title: "The Artisan Gathering",
      price: "FCFA 125 / guest",
      tagline: "Designed for intimate, cozy, yet highly sophisticated gatherings.",
      inclusions: [
        "Interactive charcuterie & raw bar grazing table setup",
        "4-course curated menu featuring signature wood-fired dishes",
        "Personal dedicated Lead Chef and elite table side service team",
        "Organic local farm-to-table wine pairings",
        "Full kitchen teardown and immaculate cleanup post-service"
      ],
      pdfName: "Artisan_Gathering_Menu.pdf"
    },
    {
      title: "The Chef's Table Experience",
      price: "FCFA 225 / guest",
      tagline: "An immersive, exclusive gastronomic odyssey crafted live by Joel.",
      inclusions: [
        "Stunning 7-course chef tasting experience crafted before your guests",
        "Ultra-rare seasonal ingredients (Kashmiri Saffron, White Truffle butter)",
        "Curated storytelling for each plate by the Head Culinary Director",
        "Artisanal molecular gastronomy elements & live fire preparations",
        "Luxury custom keepsakes and signed menus for every guest"
      ],
      pdfName: "Chefs_Table_Experience_Menu.pdf",
      featured: true
    },
    {
      title: "Gourmet Corporate Gala",
      price: "FCFA 95 / guest",
      tagline: "Uncompromised elegance, precision logistics, and memorable flavors for large events.",
      inclusions: [
        "Flexible station setups or grand synchronized plated service",
        "Extensive selection of passing hors d'oeuvres and signature bowls",
        "Specialized dietary considerations (Plant-based, allergen-free overlays)",
        "Comprehensive coordination with planners, designers, and logistics leads",
        "Optional artisanal mixology cocktail pairings & custom espresso bars"
      ],
      pdfName: "Corporate_Gala_Menu.pdf"
    }
  ];

  // Timeline Steps
  const timeline = [
    {
      step: "01",
      title: "Personal Consultation",
      description: "We discuss your venue, thematic wishes, and custom guest considerations to begin planning your luxury gathering."
    },
    {
      step: "02",
      title: "Menu Curation",
      description: "Our head chefs design a fully customized menu draft sourcing organic, wild-caught ingredients matching your culinary theme."
    },
    {
      step: "03",
      title: "The Private Tasting",
      description: "Join us in our private boutique studio to preview, taste, and fine-tune every dish and wine pairing before the grand event."
    },
    {
      step: "04",
      title: "Flawless Execution",
      description: "Our dedicated logistics and culinary team arrive to coordinate a seamless, beautiful, and absolutely delicious dining experience."
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = () => {
    let newErrors = {};
    if (formStep === 1) {
      if (!formData.date) newErrors.date = "Please select an event date";
      if (!formData.guestCount || isNaN(formData.guestCount) || formData.guestCount <= 0) {
        newErrors.guestCount = "Please enter a valid guest count";
      }
    } else if (formStep === 3) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setFormStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setFormStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) {
      showToast('Please correct the errors before submitting.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${url}/api/catering/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.success) {
        // Build WhatsApp message
        const waMsg = [
          `*New Catering Inquiry — Joel's Kitchen*`,
          ``,
          `*Client:* ${formData.name}`,
          `*Email:* ${formData.email}`,
          `*Phone:* ${formData.phone}`,
          ``,
          `*Event Date:* ${formData.date}`,
          `*Event Type:* ${formData.eventType}`,
          `*Guests:* ${formData.guestCount}`,
          `*Theme:* ${formData.theme}`,
          `*Dietary:* ${formData.dietaryTheme}`,
          formData.customRequests ? `*Special Requests:*\n${formData.customRequests}` : ''
        ].filter(Boolean).join('\n');

        const waNumber = '237673184599';
        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMsg)}`;

        setSubmitted(true);
        showToast('Inquiry submitted! Opening WhatsApp...', 'success');

        // Open WhatsApp after a brief delay so the success screen shows first
        setTimeout(() => window.open(waUrl, '_blank'), 800);
      } else {
        showToast(data.message || 'Failed to submit. Please try again.', 'error');
      }
    } catch {
      showToast('Network error. Please check your connection and try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormStep(1);
    setFormData({
      date: '',
      eventType: 'Corporate Gala',
      guestCount: '',
      theme: 'Artisan French Gastronomy',
      dietaryTheme: 'None',
      customRequests: '',
      name: '',
      email: '',
      phone: ''
    });
  };

  const downloadMenu = (fileName) => {
    showToast(`Downloading Menu PDF: ${fileName}`, "success");
  };

  return (
    <main className="min-h-screen bg-brand-cream text-brand-charcoal pb-24" aria-label="Catering and Private Events Page">
      {/* 1. Luxurious Banner Header */}
      <section className="relative bg-brand-charcoal text-brand-cream py-28 md:py-36 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-brand-gold blur-3xl"></div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-brand-gold font-medium tracking-[0.2em] text-xs uppercase block mb-3 animate-fade-in">
            Exclusive Gastronomic Services
          </span>
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight mb-6 text-brand-cream">
            Catering & Private Events
          </h1>
          <p className="max-w-2xl mx-auto text-brand-cream/80 text-base md:text-lg font-light leading-relaxed">
            Elevate your personal celebrations and corporate galas with **Joel.** Curated Artistry. 
            We deliver uncompromised fine-dining culinary theater, customized menus, and flawless execution directly to your venue.
          </p>
        </div>
      </section>

      {/* 2. Visual Timeline - How We Work */}
      <section className="max-w-7xl mx-auto px-6 py-20" aria-label="Our Service Execution Process">
        <div className="text-center mb-16">
          <span className="text-brand-gold text-xs tracking-widest uppercase font-semibold block mb-2">Our Process</span>
          <h2 className="text-3xl md:text-4xl font-serif">A Flawless Journey from Consult to Table</h2>
          <div className="w-12 h-[2px] bg-brand-gold mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-[52px] left-[12%] right-[12%] h-[1px] bg-[#e4e1db] z-0"></div>
          {timeline.map((item, idx) => (
            <div key={idx} className="relative z-10 bg-white p-6 rounded-2xl border border-[#e4e1db]/60 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-full bg-brand-charcoal text-brand-gold flex items-center justify-center font-serif text-xl font-bold mb-6 border border-brand-gold/30 group-hover:scale-110 transition-transform duration-300 mx-auto md:mx-0">
                {item.step}
              </div>
              <h3 className="text-lg font-serif mb-3 font-semibold group-hover:text-brand-gold transition-colors">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-light">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Tiers & Packages Section */}
      <section className="bg-white border-y border-[#e4e1db]/60 py-20" aria-label="Experience Packages">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-brand-gold text-xs tracking-widest uppercase font-semibold block mb-2">Curated Tiers</span>
            <h2 className="text-3xl md:text-4xl font-serif">Tailored Dining Packages</h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto mt-2">Choose a baseline structure, then collaborate with our chef to finalize details.</p>
            <div className="w-12 h-[2px] bg-brand-gold mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg, idx) => (
              <div 
                key={idx} 
                className={`relative flex flex-col justify-between p-8 rounded-3xl transition-all duration-300 ${
                  pkg.featured 
                    ? "bg-brand-charcoal text-brand-cream shadow-2xl scale-105 border border-brand-gold/40 z-10" 
                    : "bg-brand-cream text-brand-charcoal border border-[#e4e1db]/80 hover:shadow-xl"
                }`}
              >
                {pkg.featured && (
                  <span className="absolute top-4 right-4 bg-brand-gold text-brand-charcoal text-[10px] tracking-widest uppercase font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Chef's Signature
                  </span>
                )}
                <div>
                  <h3 className="text-2xl font-serif mb-2 font-bold">{pkg.title}</h3>
                  <div className={`text-xl font-serif font-semibold mb-4 ${pkg.featured ? "text-brand-gold" : "text-gray-900"}`}>
                    {pkg.price}
                  </div>
                  <p className={`text-sm mb-6 font-light leading-relaxed ${pkg.featured ? "text-gray-300" : "text-gray-600"}`}>
                    {pkg.tagline}
                  </p>
                  
                  <div className="w-full h-[1px] bg-current opacity-10 mb-6"></div>
                  
                  <ul className="space-y-4 mb-8">
                    {pkg.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${pkg.featured ? "text-brand-gold" : "text-emerald-600"}`} />
                        <span className="font-light">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => downloadMenu(pkg.pdfName)}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 ${
                    pkg.featured 
                      ? "bg-brand-gold text-brand-charcoal hover:bg-brand-gold/90 active:scale-[0.98]" 
                      : "bg-brand-charcoal text-white hover:bg-brand-charcoal/90 active:scale-[0.98]"
                  }`}
                  aria-label={`Download PDF menu for ${pkg.title}`}
                >
                  <Download className="w-4 h-4" /> Download Menu PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Multistep Event Booking inquiry Form */}
      <section className="max-w-3xl mx-auto px-6 mt-20" aria-label="Event Inquiry Form Section">
        <div className="bg-white rounded-3xl border border-[#e4e1db]/80 shadow-xl overflow-hidden">
          {/* Progress Indicators */}
          <div className="bg-brand-charcoal px-8 py-6 text-white flex justify-between items-center border-b border-brand-gold/20">
            <div>
              <h3 className="text-xl font-serif text-brand-gold">Private Event Inquiry</h3>
              <p className="text-xs text-gray-400 font-light mt-0.5">Let's craft your masterpiece culinary event.</p>
            </div>
            <div className="flex gap-2 items-center">
              <span className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center transition-all ${
                formStep >= 1 ? "bg-brand-gold text-brand-charcoal" : "bg-gray-800 text-gray-400"
              }`}>1</span>
              <div className="w-4 h-[1px] bg-gray-800"></div>
              <span className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center transition-all ${
                formStep >= 2 ? "bg-brand-gold text-brand-charcoal" : "bg-gray-800 text-gray-400"
              }`}>2</span>
              <div className="w-4 h-[1px] bg-gray-800"></div>
              <span className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center transition-all ${
                formStep >= 3 ? "bg-brand-gold text-brand-charcoal" : "bg-gray-800 text-gray-400"
              }`}>3</span>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="p-8 space-y-6">
            {/* SUCCESS STATE */}
            {submitted ? (
              <div className="py-12 flex flex-col items-center gap-5 text-center animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <div>
                  <h4 className="text-2xl font-serif font-bold text-brand-charcoal mb-2">Inquiry Received!</h4>
                  <p className="text-sm text-gray-500 max-w-xs mx-auto">We've received your catering inquiry and sent it to our team. A WhatsApp message has also been opened so you can send the details directly.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                  <a
                    href={`https://wa.me/237673184599`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" /> WhatsApp Us
                  </a>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 py-3 px-4 rounded-xl border border-brand-charcoal/20 text-xs font-semibold tracking-wider uppercase text-brand-charcoal"
                  >
                    New Inquiry
                  </button>
                </div>
              </div>
            ) : (
            <>
            {/* STEP 1: Date & Basics */}
            {formStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h4 className="text-brand-gold font-serif text-lg border-b border-gray-100 pb-2">Step 1: Event Coordination</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Event Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      <input 
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.date ? "border-red-500 focus:ring-red-200" : "border-[#e4e1db] focus:ring-brand-gold/20"} focus:outline-none focus:ring-4 transition-all bg-brand-cream text-sm`}
                        aria-required="true"
                      />
                    </div>
                    {errors.date && <p className="text-red-500 text-xs mt-1" role="alert">{errors.date}</p>}
                  </div>

                  <div>
                    <label htmlFor="eventType" className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Event Category *</label>
                    <div className="relative">
                      <ChefHat className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      <select 
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e4e1db] focus:ring-4 focus:ring-brand-gold/20 focus:outline-none transition-all bg-brand-cream text-sm appearance-none cursor-pointer"
                      >
                        <option value="Corporate Gala">Corporate Gala / Dinner</option>
                        <option value="Luxury Wedding">Luxury Wedding Reception</option>
                        <option value="Intimate Chef Dinner">Intimate Private Chef Dinner</option>
                        <option value="Boutique Cocktail Party">Boutique Cocktail Party</option>
                        <option value="Other Celebrations">Other Luxury Celebrations</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="guestCount" className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Guest Capacity *</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <input 
                      type="number"
                      id="guestCount"
                      name="guestCount"
                      value={formData.guestCount}
                      placeholder="e.g. 15"
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.guestCount ? "border-red-500" : "border-[#e4e1db]"} focus:ring-4 focus:ring-brand-gold/20 focus:outline-none transition-all bg-brand-cream text-sm`}
                      aria-required="true"
                    />
                  </div>
                  {errors.guestCount && <p className="text-red-500 text-xs mt-1" role="alert">{errors.guestCount}</p>}
                </div>
              </div>
            )}

            {/* STEP 2: Culinary Theme & Requests */}
            {formStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h4 className="text-brand-gold font-serif text-lg border-b border-gray-100 pb-2">Step 2: Gastronomy Choices</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="theme" className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Preferred Gastronomy Theme</label>
                    <select 
                      id="theme"
                      name="theme"
                      value={formData.theme}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#e4e1db] focus:ring-4 focus:ring-brand-gold/20 focus:outline-none transition-all bg-brand-cream text-sm appearance-none cursor-pointer"
                    >
                      <option value="Artisan French Gastronomy">Artisan French Gastronomy</option>
                      <option value="Organic Plant-Based Curation">Organic Plant-Based Curation</option>
                      <option value="Mediterranean Ocean Harvest">Mediterranean Ocean Harvest</option>
                      <option value="Modern Molecular Fusion">Modern Molecular Fusion</option>
                      <option value="Traditional Wood-Fired Rustic">Traditional Wood-Fired Rustic</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="dietaryTheme" className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Primary Dietary Requirements</label>
                    <select 
                      id="dietaryTheme"
                      name="dietaryTheme"
                      value={formData.dietaryTheme}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#e4e1db] focus:ring-4 focus:ring-brand-gold/20 focus:outline-none transition-all bg-brand-cream text-sm appearance-none cursor-pointer"
                    >
                      <option value="None">No General Restrictions</option>
                      <option value="Gluten-Free Only">Gluten-Free Selection</option>
                      <option value="Strictly Vegan/Vegetarian">Strictly Vegan / Vegetarian</option>
                      <option value="Halal Certified Items">Halal Certified Items</option>
                      <option value="Multiple Allergens (specified below)">Multiple Allergens (detail below)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="customRequests" className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Custom Culinary Intent & Creative Vision</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <textarea 
                      id="customRequests"
                      name="customRequests"
                      rows="4"
                      value={formData.customRequests}
                      placeholder="e.g. We would love a live fire station during the cocktail phase and a customized saffron pairing..."
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e4e1db] focus:ring-4 focus:ring-brand-gold/20 focus:outline-none transition-all bg-brand-cream text-sm resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Contact details */}
            {formStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h4 className="text-brand-gold font-serif text-lg border-b border-gray-100 pb-2">Step 3: Contact Credentials</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Client Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      <input 
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        placeholder="e.g. Alexis Harrington"
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.name ? "border-red-500" : "border-[#e4e1db]"} focus:ring-4 focus:ring-brand-gold/20 focus:outline-none transition-all bg-brand-cream text-sm`}
                        aria-required="true"
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1" role="alert">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Direct Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      <input 
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        placeholder="e.g. alexis@harringtonholdings.com"
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.email ? "border-red-500" : "border-[#e4e1db]"} focus:ring-4 focus:ring-brand-gold/20 focus:outline-none transition-all bg-brand-cream text-sm`}
                        aria-required="true"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1" role="alert">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Phone Coordinates *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <input 
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      placeholder="e.g. 310-555-0199"
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.phone ? "border-red-500" : "border-[#e4e1db]"} focus:ring-4 focus:ring-brand-gold/20 focus:outline-none transition-all bg-brand-cream text-sm`}
                      aria-required="true"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1" role="alert">{errors.phone}</p>}
                </div>

                <div className="flex gap-2 items-center bg-brand-cream p-4 rounded-xl border border-dashed border-[#e4e1db] text-xs text-gray-500 font-light">
                  <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0" />
                  <span>By submitting this inquiry, you secure a temporary, non-binding calendar hold for 48 hours while our Guest Relations team reviews your request.</span>
                </div>
              </div>
            )}

            {/* BUTTON CONTROLS */}
            <div className="flex justify-between items-center border-t border-gray-100 pt-6 mt-6">
              {formStep > 1 ? (
                <button 
                  type="button" 
                  onClick={prevStep}
                  className="py-3 px-6 rounded-xl border border-[#e4e1db] hover:bg-brand-cream text-xs font-semibold tracking-widest uppercase flex items-center gap-2 active:scale-95 transition-all text-gray-600"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <div></div> // empty spacer
              )}

              {formStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="py-3 px-6 rounded-xl bg-brand-charcoal text-white hover:bg-brand-charcoal/95 text-xs font-semibold tracking-widest uppercase flex items-center gap-2 active:scale-95 transition-all"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="py-3.5 px-8 rounded-xl bg-brand-gold text-brand-charcoal hover:bg-brand-gold/90 text-xs font-semibold tracking-widest uppercase flex items-center gap-2 active:scale-95 transition-all font-bold disabled:opacity-60"
                >
                  {submitting ? (
                    <><div className="w-4 h-4 border-2 border-brand-charcoal border-t-transparent rounded-full animate-spin" /> Sending...</>
                  ) : (
                    'Submit Inquiry'
                  )}
                </button>
              )}
            </div>
            </>
            )} {/* end !submitted */}
          </form>
        </div>
      </section>
    </main>
  );
};

export default Catering;
