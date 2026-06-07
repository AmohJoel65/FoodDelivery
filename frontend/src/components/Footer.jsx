import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Instagram, ArrowUp, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-brand-charcoal text-brand-cream border-t border-brand-gold/10 pt-14 pb-8 scroll-mt-20">
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/5">
          <div className="flex flex-col gap-4">
            <Link to="/" className="text-2xl font-bold font-serif tracking-tight">
              Joel<span className="text-brand-gold">.</span>
            </Link>
            <p className="text-xs text-brand-cream/60 leading-relaxed">
              Joel&apos;s Kitchen delivers fresh, homemade meals across Bamenda. Order online and pay with Mobile Money.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 hover:border-brand-gold flex items-center justify-center text-brand-cream/60 hover:text-brand-gold transition-colors"
              >
                <Instagram size={14} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 hover:border-brand-gold flex items-center justify-center text-brand-cream/60 hover:text-brand-gold transition-colors"
              >
                <Linkedin size={14} />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="brand-label">Company</h4>
            <ul className="flex flex-col gap-2 text-xs text-brand-cream/60">
              <li><Link to="/" className="hover:text-brand-gold transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-gold transition-colors">About Us</Link></li>
              <li><Link to="/catering" className="hover:text-brand-gold transition-colors">Catering</Link></li>
              <li><Link to="/careers" className="hover:text-brand-gold transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="brand-label">Legal</h4>
            <ul className="flex flex-col gap-2 text-xs text-brand-cream/60">
              <li><Link to="/terms" className="hover:text-brand-gold transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refund" className="hover:text-brand-gold transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="brand-label">Contact</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-brand-cream/60">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-brand-gold shrink-0" />
                <span>237673184599</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-brand-gold shrink-0" />
                <span>joelamoh65@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-brand-gold shrink-0" />
                <span>Bamenda, North West Region, Cameroon</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 text-[11px] text-brand-cream/40 gap-3">
          <p>© {new Date().getFullYear()} Joel&apos;s Kitchen. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-brand-gold transition-colors border border-white/10 hover:border-brand-gold/30 px-3 py-1.5 rounded-full"
          >
            Back to top
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
