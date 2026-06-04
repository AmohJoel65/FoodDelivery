import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Instagram, ArrowUp, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-[#1a1a1a] text-[#fdfbf7] border-t border-[#ebdcae]/10 pt-16 pb-8 scroll-mt-20 select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/5">
          
          {/* Logo & Description */}
          <div className="text-left flex flex-col gap-5">
            <Link to="/" className="text-3xl font-bold font-serif tracking-tight flex items-center gap-1">
              <span>Joel</span>
              <span className="text-[#d4af37]">.</span>
            </Link>
            <p className="text-xs text-[#fdfbf7]/60 leading-relaxed font-light">
              Crafting premium culinary collections. We coordinate directly with local bio-certified farming programs to deliver artisan gastronomical plates warm to your door. Experience true kitchen craftsmanship.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full border border-white/10 hover:border-[#d4af37] flex items-center justify-center text-[#fdfbf7]/65 hover:text-[#d4af37] transition-all duration-300"
              >
                <Instagram size={14} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full border border-white/10 hover:border-[#d4af37] flex items-center justify-center text-[#fdfbf7]/65 hover:text-[#d4af37] transition-all duration-300"
              >
                <Linkedin size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="text-left flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">Company</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#fdfbf7]/60 font-light">
              <li><Link to="/" className="hover:text-[#d4af37] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#d4af37] transition-colors">About Us</Link></li>
              <li><a href="#delivery" onClick={(e) => e.preventDefault()} className="hover:text-[#d4af37] transition-colors">Delivery Options</a></li>
              <li><Link to="/careers" className="hover:text-[#d4af37] transition-colors">Careers at Joel.</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="text-left flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">Legal Policies</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#fdfbf7]/60 font-light">
              <li><a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-[#d4af37] transition-colors">Terms of Service</a></li>
              <li><a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-[#d4af37] transition-colors">Privacy Policy</a></li>
              <li><a href="#refund" onClick={(e) => e.preventDefault()} className="hover:text-[#d4af37] transition-colors">Refund & Cancellation</a></li>
              <li><a href="#licensing" onClick={(e) => e.preventDefault()} className="hover:text-[#d4af37] transition-colors">Licensing & Regulatory</a></li>
            </ul>
          </div>

          {/* Column 4: Contact / Support */}
          <div className="text-left flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">Customer Support</h4>
            <ul className="flex flex-col gap-3 text-xs text-[#fdfbf7]/60 font-light">
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-[#d4af37]" />
                <span>237673184599</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#d4af37]" />
                <span>joelamoh65@gmail.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={14} className="text-[#d4af37]" />
                <span className="leading-tight">Bamenda, North West Region, Cameroon</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & scroll-to-top */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-[11px] text-[#fdfbf7]/40 font-light gap-4">
          <p>© {new Date().getFullYear()} Joel. Gastronomy LLC. All rights reserved.</p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#d4af37] transition-colors duration-200 border border-white/5 hover:border-[#d4af37]/30 px-3 py-1.5 rounded-full bg-white/5"
          >
            <span>Back to top</span>
            <ArrowUp size={12} />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
