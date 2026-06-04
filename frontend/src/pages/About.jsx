import React from "react";
import { ChefHat, Sparkles, Compass, ShieldCheck, Heart, Mail, Twitter, Instagram } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Chef Joel Savarin",
      role: "Founder & Culinary Architect",
      specialty: "Sourdough Fermentation & Plate Composition",
      bio: "With over 18 years in Michelin-starred Parisian bistros, Joel founded our culinary studio to deliver uncompromised gastronomy directly to private estates. He personally curates all sourdough levains and saffron infusions.",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Chef Elena Rostova",
      role: "Pastry & Chocolate Sculptress",
      specialty: "Sugar Art & Single-Origin Cacao Custards",
      bio: "Trained under Viennese masters, Elena treats pastry as dimensional poetry. Her signature creations feature Valrhona single-origin chocolates, molecular sugar domes, and delicate Kashmiri saffron overlays.",
      image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Marcus Vance",
      role: "Beverage & Mixology Director",
      specialty: "Coastal Chardonnay & Floral Infusions",
      bio: "A certified Master Sommelier, Marcus coordinates clean coastal chardonnay pairings and botanical mocktails crafted from organic lavender, rosemary smoke, and wild ocean sea salts.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Chef Kaito Tanaka",
      role: "Master of Hearth & Wood-Fire",
      specialty: "High-Heat Searing & Wild Hydration Doughs",
      bio: "Kaito manages the core brick ovens. He specializes in 36-hour slow-rise levains and high-heat searing techniques that preserve the natural juices of prime organic pork belly and coastal catches.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const partners = [
    { name: "Ojai Saffron Meadows", location: "Ojai, CA", crop: "Organic Saffron & Florals" },
    { name: "Pacific Fjord Harvest", location: "Seattle, WA", crop: "Cold-Water Salmon & Seaweed" },
    { name: "Beverly Terraces Microgreens", location: "Los Angeles, CA", crop: "Aromatic Herbs & Microgreens" }
  ];

  return (
    <main className="min-h-screen bg-[#fdfbf7] text-[#1a1a1a] pb-24" aria-label="Joel About and Culinary Team Page">
      {/* 1. Luxurious Banner Header */}
      <section className="relative bg-[#1a1a1a] text-[#fdfbf7] py-28 md:py-36 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#d4af37] blur-3xl"></div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-[#d4af37] font-medium tracking-[0.2em] text-xs uppercase block mb-3">
            Our Story & Legacy
          </span>
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight mb-6 text-[#fdfbf7]">
            Crafting Gastronomic Theater
          </h1>
          <p className="max-w-2xl mx-auto text-[#fdfbf7]/80 text-base md:text-lg font-light leading-relaxed">
            **Joel.** was born out of a simple, uncompromised promise: to bridge the gap between elite, multi-course Michelin fine-dining and home delivery convenience.
          </p>
        </div>
      </section>

      {/* 2. Philosophy Section */}
      <section className="max-w-7xl mx-auto px-6 py-20" aria-label="Our Culinary Philosophy">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[#d4af37] text-xs tracking-widest uppercase font-semibold block">Sourcing & Craft</span>
            <h2 className="text-3xl md:text-4xl font-serif leading-tight">Sourced Sustainably. Plated Artfully. Delivered Immaculately.</h2>
            <div className="w-12 h-[2px] bg-[#d4af37]"></div>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              We do not compromise. We build active partnerships with boutique farmers and cold-fjord fishers. 
              Our kitchen operates with absolute precision, holding ingredients at optimal moisture percentages 
              and wood-searing using specific oaks to lock in aromatic profiles.
            </p>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              Every package is constructed with heat-retaining technology, accompanied by fresh rosemary sprigs 
              and individual instructions on how to frame the plate to replicate our kitchen's plating composition.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-[#e4e1db]/60 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#fdfbf7] border border-[#e4e1db] flex items-center justify-center text-[#d4af37]">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold">Provenance Focus</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                We trace every harvest. You can view the exact microgreen farm coordinates and wheat fields on your receipt.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#e4e1db]/60 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#fdfbf7] border border-[#e4e1db] flex items-center justify-center text-[#d4af37]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold">Immaculate Delivery</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Meals travel in custom sealed temperature compartments to ensure that hot remains sizzling and crisp remains crunchy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Culinary Team Section (Requested!) */}
      <section className="bg-white border-y border-[#e4e1db]/60 py-20" aria-label="Our Master Culinary Team">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#d4af37] text-xs tracking-widest uppercase font-semibold block mb-2">The Artists</span>
            <h2 className="text-3xl md:text-4xl font-serif">Meet the Culinary Leaders</h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto mt-2">The highly precise minds coordinating sourdough ferments, molecular pastries, and sommelier selections.</p>
            <div className="w-12 h-[2px] bg-[#d4af37] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="bg-[#fdfbf7] rounded-3xl border border-[#e4e1db]/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                      <div className="flex gap-4">
                        <a href="#instagram" className="w-8 h-8 rounded-full bg-white/20 hover:bg-[#d4af37] text-white hover:text-[#1a1a1a] flex items-center justify-center backdrop-blur-sm transition-all duration-200">
                          <Instagram className="w-4 h-4" />
                        </a>
                        <a href="#twitter" className="w-8 h-8 rounded-full bg-white/20 hover:bg-[#d4af37] text-white hover:text-[#1a1a1a] flex items-center justify-center backdrop-blur-sm transition-all duration-200">
                          <Twitter className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <span className="text-[9px] tracking-wider uppercase font-bold text-[#d4af37] block">{member.role}</span>
                    <h3 className="text-lg font-serif font-bold text-gray-900">{member.name}</h3>
                    <p className="text-[10px] text-gray-400 font-medium italic block mb-3">Specialty: {member.specialty}</p>
                    <div className="w-full h-[1px] bg-gray-100 mb-3"></div>
                    <p className="text-xs text-gray-500 font-light leading-relaxed">{member.bio}</p>
                  </div>
                </div>
                
                <div className="p-6 pt-0">
                  <a href={`mailto:${member.name.toLowerCase().replace(/ /g, ".")}@joel.com`} className="text-[10px] font-semibold tracking-wider uppercase flex items-center gap-1 hover:text-[#d4af37] transition-all" aria-label={`Email ${member.name}`}>
                    <Mail className="w-3.5 h-3.5" /> Contact Chef
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Sourcing Partners Section */}
      <section className="max-w-7xl mx-auto px-6 py-20" aria-label="Our Sourcing Partners">
        <div className="text-center mb-16">
          <span className="text-[#d4af37] text-xs tracking-widest uppercase font-semibold block mb-2">Our Network</span>
          <h2 className="text-3xl md:text-4xl font-serif">Boutique Sourcing Partners</h2>
          <div className="w-12 h-[2px] bg-[#d4af37] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partners.map((partner, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-[#e4e1db]/80 text-center space-y-2">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">{partner.location}</span>
              <h3 className="text-lg font-serif font-bold text-gray-900">{partner.name}</h3>
              <p className="text-xs text-[#d4af37] font-medium">Yields: {partner.crop}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default About;
