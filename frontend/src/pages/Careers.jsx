import React, { useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Plus, 
  Minus, 
  Upload, 
  X, 
  ArrowRight, 
  Heart, 
  Award, 
  Compass, 
  ChefHat, 
  FileText,
  User,
  Mail,
  Phone
} from "lucide-react";

const Careers = () => {
  const { showToast } = useContext(StoreContext);
  const [expandedJob, setExpandedJob] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const culturePillars = [
    {
      icon: <ChefHat className="w-6 h-6 text-brand-gold" />,
      title: "Uncompromising Precision",
      description: "We focus on the minute details, from raw ingredient temperatures to organic microgreens plating coordinates."
    },
    {
      icon: <Heart className="w-6 h-6 text-brand-gold" />,
      title: "Zero Waste Integrity",
      description: "Our kitchen honors every harvest. We coordinate active compost loops and zero-waste broth reductions daily."
    },
    {
      icon: <Award className="w-6 h-6 text-brand-gold" />,
      title: "Active Mentorship",
      description: "Every station is a learning lab. We fund external certifications, pastry seminars, and organic farm tours."
    }
  ];

  // Active Open Roles Seeding
  const jobOpenings = [
    {
      id: "sous-chef-pastry",
      title: "Sous Chef - Artisan Pastry",
      location: "Beverly Hills Kitchen Lab",
      type: "Full-Time",
      compensation: "$65,000 - $75,000 / year + health",
      description: "Lead our signature pastry lab, curating delicate high-end desserts like Kashmiri saffron panna cottas and Valrhona single-origin dark chocolate ganache cakes.",
      requirements: [
        "5+ years of pastry experience in fine-dining, Michelin-rated, or artisanal pastry kitchens.",
        "Expert-level knowledge of sugar arts, tempered chocolate design, and classical French pastry mechanics.",
        "Deep understanding of fermentation mechanics for brioches and sweet organic viennoiserie.",
        "Food protection manager certificate required."
      ],
      responsibilities: [
        "Oversee daily prep of desserts, pastries, and artisanal breads for the central fulfillment center.",
        "Collaborate with the Head Chef to develop seasonal culinary menus and dessert pairings.",
        "Manage dry stock inventory, sourcing premium elements (single-origin chocolates, rare spices).",
        "Train, guide, and mentor apprentice pastry cooks in standard kitchen operating procedures."
      ]
    },
    {
      id: "artisan-line-cook",
      title: "Artisan Line Cook - Hearth Station",
      location: "Los Angeles Kitchen Hub",
      type: "Full-Time / Part-Time",
      compensation: "$22 - $26 / hour + tips share",
      description: "Master the fire and steel. Oversee high-heat sears, wood-fired hearth baking of signature rolls, and delicate component assembly.",
      requirements: [
        "2+ years of line-cook experience in fast-paced upscale or fine-dining kitchen environments.",
        "Familiarity with wood-fire oven operation, temperature monitoring, and artisanal dough handling.",
        "Ability to maintain absolute consistency during peak rush hours.",
        "Active food handler certificate."
      ],
      responsibilities: [
        "Bake artisanal sourdough fire-rolls and custom flatbreads directly on hearth stones.",
        "Prep and maintain seared elements (pork belly, grilled asparagus) matching exact recipe weights.",
        "Maintain absolute sanitation standards at the hearth prep table.",
        "Coordinate with plating assistants to ensure seamless meal ticket assembly."
      ]
    },
    {
      id: "logistics-specialist",
      title: "Logistics & Delivery Specialist",
      location: "Los Angeles Transit Area",
      type: "Full-Time / Flexible",
      compensation: "$20 - $24 / hour + mileage stipend",
      description: "Represent our brand at the doorstep. Deliver gourmet warm selections in insulated luxury carriers with impeccable concierge service.",
      requirements: [
        "Clean driving record, active license, and a clean, reliable luxury-aesthetic vehicle.",
        "Excellent communication, client service, and professional presentation coordinates.",
        "Familiarity with West Los Angeles and Beverly Hills transit routes.",
        "Ability to lift up to 40 lbs of culinary delivery carriers."
      ],
      responsibilities: [
        "Ensure food temperature control integrity during loading and transportation phases.",
        "Deliver curated meals directly to guest estates, businesses, and private event spaces.",
        "Provide a high-end, welcoming threshold presentation, introducing the signature dishes placed in hand.",
        "Report transit feedback to dispatch controllers to improve logistics operations."
      ]
    },
    {
      id: "hospitality-lead",
      title: "Hospitality & Guest Relations Lead",
      location: "Beverly Hills Concierge Desk",
      type: "Full-Time",
      compensation: "$50,000 - $58,000 / year",
      description: "Act as the primary point of contact. Review private catering requests, handle VIP accounts, and welcome boutique guests.",
      requirements: [
        "3+ years in upscale hospitality, concierge desks, or high-end dining reception positions.",
        "Stellar verbal and written coordination skills, and a warm, elegant demeanor.",
        "Proficiency in reservation software, CRM, and Microsoft Office Suite.",
        "Excellent organizational and multi-tasking abilities."
      ],
      responsibilities: [
        "Manage central catering bookings, coordinate phone/email consultations, and dispatch quotes.",
        "Oversee scheduling and host private pre-event tasting bookings inside our boutique tasting room.",
        "Maintain VIP guest relationship profiles, log dietary needs, and curate premium touchpoints.",
        "Collaborate with the Logistics Director to oversee catering dispatch timelines."
      ]
    }
  ];

  const toggleJob = (jobId) => {
    setExpandedJob((prev) => (prev === jobId ? null : jobId));
  };

  const openApplyDrawer = (job) => {
    setSelectedJob(job);
    setShowDrawer(true);
    setFileUploaded(false);
    setFileName("");
    setApplicationData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  };

  const closeApplyDrawer = () => {
    setShowDrawer(false);
    setSelectedJob(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileUploaded(true);
      setFileName(file.name);
      showToast(`Resume uploaded: ${file.name}`, "success");
    }
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applicationData.name || !applicationData.email || !applicationData.phone) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    if (!fileUploaded) {
      showToast("Please upload your resume file", "error");
      return;
    }
    
    // Success simulation
    showToast(`Application for "${selectedJob.title}" submitted successfully!`, "success");
    closeApplyDrawer();
  };

  return (
    <main className="min-h-screen bg-brand-cream text-brand-charcoal pb-24" aria-label="Joel Careers and Opportunities Page">
      {/* 1. Luxurious Banner Header */}
      <section className="relative bg-brand-charcoal text-brand-cream py-28 md:py-36 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full border border-brand-gold blur-3xl"></div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-brand-gold font-medium tracking-[0.2em] text-xs uppercase block mb-3 animate-fade-in">
            Join Our Culinary Family
          </span>
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight mb-6 text-brand-cream">
            Culinary Artistry Careers
          </h1>
          <p className="max-w-2xl mx-auto text-brand-cream/80 text-base md:text-lg font-light leading-relaxed">
            We are looking for dedicated culinary technicians, hospitality leaders, and logistics professionals. 
            Grow your skills inside a modern, clean-cooking, and uncompromised artisanal food ecosystem.
          </p>
        </div>
      </section>

      {/* 2. Kitchen Culture section */}
      <section className="max-w-7xl mx-auto px-6 py-20" aria-label="Kitchen Culture and Pillars">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-brand-gold text-xs tracking-widest uppercase font-semibold block">Kitchen Culture</span>
            <h2 className="text-3xl md:text-4xl font-serif leading-tight">Where Fine Craftsmanship Meets Pure Community</h2>
            <div className="w-12 h-[2px] bg-brand-gold"></div>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              At **Joel.**, we believe a kitchen should operate with absolute respect, focus, and collaboration. 
              We banish classical high-stress shouting in favor of structured prep, deep culinary theory, 
              and shared creative control over seasonal menu assemblies.
            </p>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              Join us to work in a pristine studio utilizing state-of-the-art ovens, composting loops, and 
              the finest wild-caught, organic harvests California has to offer.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
            {culturePillars.map((pillar, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-[#e4e1db]/60 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center border border-[#e4e1db]/60 mb-5">
                  {pillar.icon}
                </div>
                <h3 className="text-base font-serif mb-2 font-semibold">{pillar.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-light">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Accordion Jobs List */}
      <section className="max-w-4xl mx-auto px-6 py-12" aria-label="Active Openings List">
        <div className="text-center mb-16">
          <span className="text-brand-gold text-xs tracking-widest uppercase font-semibold block mb-2">Our Openings</span>
          <h2 className="text-3xl md:text-4xl font-serif">Current Opportunities</h2>
          <div className="w-12 h-[2px] bg-brand-gold mx-auto mt-4"></div>
        </div>

        <div className="space-y-6">
          {jobOpenings.map((job) => {
            const isExpanded = expandedJob === job.id;
            return (
              <div 
                key={job.id} 
                className={`bg-white rounded-2xl border border-[#e4e1db]/80 overflow-hidden shadow-sm transition-all duration-300 ${
                  isExpanded ? "ring-2 ring-brand-gold/30 border-transparent" : "hover:border-gray-400"
                }`}
              >
                {/* Accordion header */}
                <button 
                  onClick={() => toggleJob(job.id)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
                  aria-expanded={isExpanded}
                  aria-controls={`job-details-${job.id}`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] tracking-widest uppercase font-bold text-brand-gold">{job.type}</span>
                    <h3 className="text-xl font-serif font-bold text-gray-900">{job.title}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 font-light">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> {job.compensation}</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-brand-cream border border-[#e4e1db] flex items-center justify-center shrink-0">
                    {isExpanded ? (
                      <Minus className="w-5 h-5 text-brand-charcoal" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>

                {/* Expanded Details body */}
                {isExpanded && (
                  <div 
                    id={`job-details-${job.id}`}
                    className="p-6 pt-0 border-t border-gray-100 bg-brand-cream/50 space-y-6 animate-fade-in"
                  >
                    <p className="text-sm text-gray-600 font-light leading-relaxed mt-4">
                      {job.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-brand-gold" /> Key Requirements:
                        </h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, i) => (
                            <li key={i} className="text-xs text-gray-500 font-light flex items-start gap-2 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5 shrink-0"></span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                          <Compass className="w-4 h-4 text-brand-gold" /> Core Responsibilities:
                        </h4>
                        <ul className="space-y-2">
                          {job.responsibilities.map((resp, i) => (
                            <li key={i} className="text-xs text-gray-500 font-light flex items-start gap-2 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5 shrink-0"></span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button 
                        onClick={() => openApplyDrawer(job)}
                        className="py-3 px-6 bg-brand-charcoal text-white hover:bg-brand-charcoal/95 text-xs font-semibold tracking-widest uppercase rounded-xl flex items-center gap-2 active:scale-95 transition-all shadow-md"
                        aria-label={`Apply Now for ${job.title}`}
                      >
                        Apply Now <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. MOCK UPLOAD RESUME DRAWER PANEL */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          {/* Backdrop blur clickoff */}
          <div 
            onClick={closeApplyDrawer}
            className="absolute inset-0 bg-brand-charcoal/40 backdrop-blur-sm transition-opacity"
          ></div>
          
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            {/* Slide-out Panel */}
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#e4e1db] transform transition-transform duration-300 ease-out animate-slide-in">
              <div className="flex-1 overflow-y-auto py-8 px-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-6">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase font-bold text-brand-gold">Culinary Application</span>
                    <h3 className="text-xl font-serif font-bold text-gray-900 leading-tight">Apply for Role</h3>
                    <p className="text-xs text-gray-500 font-light mt-0.5">{selectedJob?.title}</p>
                  </div>
                  <button 
                    onClick={closeApplyDrawer}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center border border-gray-100 text-gray-500 focus:outline-none"
                    aria-label="Close application drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form fields */}
                <form onSubmit={handleApplySubmit} className="space-y-6">
                  <div>
                    <label htmlFor="appl-name" className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      <input 
                        type="text"
                        id="appl-name"
                        required
                        value={applicationData.name}
                        onChange={handleInputChange}
                        name="name"
                        placeholder="e.g. Alexis Harrington"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e4e1db] focus:ring-4 focus:ring-brand-gold/20 focus:outline-none transition-all bg-brand-cream text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="appl-email" className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      <input 
                        type="email"
                        id="appl-email"
                        required
                        value={applicationData.email}
                        onChange={handleInputChange}
                        name="email"
                        placeholder="e.g. alexis@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e4e1db] focus:ring-4 focus:ring-brand-gold/20 focus:outline-none transition-all bg-brand-cream text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="appl-phone" className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Phone Coordinates *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      <input 
                        type="text"
                        id="appl-phone"
                        required
                        value={applicationData.phone}
                        onChange={handleInputChange}
                        name="phone"
                        placeholder="e.g. 310-555-0199"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e4e1db] focus:ring-4 focus:ring-brand-gold/20 focus:outline-none transition-all bg-brand-cream text-sm"
                      />
                    </div>
                  </div>

                  {/* Resume upload */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Resume File (PDF/Word) *</label>
                    <div className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                      fileUploaded 
                        ? "border-emerald-500 bg-emerald-50/20" 
                        : "border-[#e4e1db] bg-brand-cream hover:border-gray-400"
                    }`}>
                      <input 
                        type="file" 
                        id="resume-upload" 
                        accept=".pdf,.doc,.docx"
                        className="hidden" 
                        onChange={handleFileUpload}
                      />
                      <label htmlFor="resume-upload" className="cursor-pointer space-y-2 block">
                        <div className="w-10 h-10 rounded-full bg-white border border-[#e4e1db] flex items-center justify-center mx-auto shadow-sm">
                          {fileUploaded ? (
                            <FileText className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <Upload className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div className="text-xs font-medium text-gray-700">
                          {fileUploaded ? "Resume file uploaded" : "Click to select a document file"}
                        </div>
                        <p className="text-[10px] text-gray-400">PDF, DOC, DOCX up to 5MB</p>
                      </label>
                    </div>
                    {fileUploaded && (
                      <p className="text-[10px] text-emerald-600 font-semibold mt-1 bg-emerald-100/40 p-2 rounded-md border border-emerald-200/40 truncate">
                        ✓ Loaded: {fileName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="appl-message" className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Brief Cover Statement</label>
                    <textarea 
                      id="appl-message"
                      rows="3"
                      value={applicationData.message}
                      onChange={handleInputChange}
                      name="message"
                      placeholder="Detail your kitchen passion in a few brief sentences..."
                      className="w-full px-4 py-3 rounded-xl border border-[#e4e1db] focus:ring-4 focus:ring-brand-gold/20 focus:outline-none transition-all bg-brand-cream text-sm resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3.5 bg-brand-gold text-brand-charcoal hover:bg-brand-gold/90 text-xs font-semibold tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all font-bold shadow-md"
                  >
                    Submit Application
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Careers;
