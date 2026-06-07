import React from "react";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "./ui";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="page-container py-12 sm:py-16 pb-20 relative bg-cover bg-center overflow-hidden rounded-none sm:rounded-3xl sm:mt-6 shadow-2xl"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(253, 251, 247, 0.95) 30%, rgba(253, 251, 247, 0.6) 100%), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1600')`,
      }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8 relative z-10">
        
        {/* Left Content */}
        <div className="flex-1 flex flex-col gap-6 text-center lg:text-left animate-fade-in z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 text-brand-gold border border-brand-gold/20 w-fit mx-auto lg:mx-0">
            <Star fill="currentColor" size={14} />
            <span className="text-sm font-semibold tracking-wide uppercase">Top Rated in Bamenda</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-serif text-brand-charcoal leading-[1.1]">
            Artisan <span className="text-brand-gold relative inline-block">Flavors<svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 10 Q 50 20 100 10" fill="transparent" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-brand-gold/30"/></svg></span><br />
            Delivered Fast.
          </h1>
          
          <p className="text-brand-charcoal/70 text-lg max-w-xl mx-auto lg:mx-0">
            Experience gourmet meals prepared daily by our executive chefs. 
            From wood-fired artisan rolls to fresh signature bowls, 
            we bring the restaurant directly to your dining table.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 justify-center lg:justify-start">
            <Button onClick={() => navigate('/menu')} size="lg" className="rounded-full w-full sm:w-auto min-h-[54px] text-base px-8 shadow-card-hover group">
              Explore Our Menu
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="rounded-full w-full sm:w-auto min-h-[54px] text-base px-8"
              onClick={() => {
                const appSection = document.getElementById("app-download");
                if (appSection) appSection.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get the App
            </Button>
          </div>
          
          <div className="flex items-center gap-4 mt-6 justify-center lg:justify-start">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Customer" className="w-10 h-10 rounded-full border-2 border-brand-surface object-cover" />
              ))}
            </div>
            <div className="text-sm">
              <p className="font-bold text-brand-charcoal">2,000+ Happy Customers</p>
              <p className="text-brand-charcoal/60 flex items-center gap-1">
                <Star size={14} className="text-brand-gold" fill="currentColor" /> 4.9/5 Average Rating
              </p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 relative w-full max-w-lg lg:max-w-none mx-auto animate-scale-in mt-10 lg:mt-0">
          <img 
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1200" 
            alt="Gourmet Bowl" 
            className="relative z-10 w-full h-auto object-cover rounded-[2rem] shadow-card-hover transform lg:rotate-2 hover:rotate-0 transition-transform duration-500"
          />
          
          {/* Floating badge */}
          <div className="absolute -left-6 bottom-12 z-20 bg-brand-cream p-4 rounded-2xl shadow-card-hover border border-brand-charcoal/5 flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl font-bold">
              🌿
            </div>
            <div>
              <p className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">Fresh Daily</p>
              <p className="text-xs text-brand-charcoal/60">Local ingredients</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Hero;
