import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Instagram, ArrowUp, Mail, Phone, MapPin, MessageSquare, Utensils, Send } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-brand-charcoal text-brand-cream border-t border-brand-gold/10 pt-16 pb-8 scroll-mt-20">
      <div className="page-container">
        
        {/* Row 1: Premium Interactive Contact & Custom Orders Section */}
        <div className="mb-16 border-b border-white/5 pb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold block">Get in Touch</span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-2">Place Custom Orders & Chat</h3>
            <p className="text-brand-cream/60 text-xs sm:text-sm mt-3 leading-relaxed">
              Have a special request, event, or customized craving? Connect with Joel's Kitchen instantly through your preferred channel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: WhatsApp Chat */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between items-start hover:border-brand-gold/40 hover:bg-white/[0.07] transition-all duration-300 group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare size={20} className="fill-[#25D366]/20" />
                </div>
                <div className="text-left mb-6">
                  <h5 className="font-bold text-sm text-white">WhatsApp Chat</h5>
                  <p className="text-xs text-brand-cream/60 mt-1.5 leading-relaxed">
                    Chat instantly with our chefs for custom inquiries and real-time order updates.
                  </p>
                </div>
              </div>
              <a
                href="https://wa.me/237673184599?text=Hello%20Joel,%20I'd%20like%20to%20chat%20about%20a%20menu%20item%20or%20inquire%20about%20my%20order!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 text-center shadow-md flex items-center justify-center gap-1.5"
              >
                Chat Now
              </a>
            </div>

            {/* Card 2: Custom Orders */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between items-start hover:border-brand-gold/40 hover:bg-white/[0.07] transition-all duration-300 group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-4 group-hover:scale-110 transition-transform">
                  <Utensils size={20} />
                </div>
                <div className="text-left mb-6">
                  <h5 className="font-bold text-sm text-white">Custom Orders</h5>
                  <p className="text-xs text-brand-cream/60 mt-1.5 leading-relaxed">
                    Craving something off-menu or a specific quantity? Send us your request.
                  </p>
                </div>
              </div>
              <a
                href="https://wa.me/237673184599?text=Hello%20Joel,%20I'd%20like%20to%20place%20a%20custom%20order%20for%20a%20dish%20or%20tailored%20menu!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-charcoal font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 text-center shadow-md flex items-center justify-center gap-1.5"
              >
                Request Custom Order
              </a>
            </div>

            {/* Card 3: Email Us */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between items-start hover:border-brand-gold/40 hover:bg-white/[0.07] transition-all duration-300 group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <div className="text-left mb-6">
                  <h5 className="font-bold text-sm text-white">Email Us</h5>
                  <p className="text-xs text-brand-cream/60 mt-1.5 leading-relaxed">
                    Send catering requests, feedback, or business inquiries directly to our inbox.
                  </p>
                </div>
              </div>
              <a
                href="mailto:joelamoh65@gmail.com?subject=Custom%20Order%20or%20Catering%20Inquiry%20-%20Joel%20Kitchen"
                className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 text-center border border-white/10 flex items-center justify-center gap-1.5"
              >
                Send Email
              </a>
            </div>

            {/* Card 4: Call Direct */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between items-start hover:border-brand-gold/40 hover:bg-white/[0.07] transition-all duration-300 group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-4 group-hover:scale-110 transition-transform">
                  <Phone size={20} />
                </div>
                <div className="text-left mb-6">
                  <h5 className="font-bold text-sm text-white">Call Direct</h5>
                  <p className="text-xs text-brand-cream/60 mt-1.5 leading-relaxed">
                    Urgent order changes or questions? Call our direct hotline for immediate help.
                  </p>
                </div>
              </div>
              <a
                href="tel:+237673184599"
                className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 text-center border border-white/10 flex items-center justify-center gap-1.5"
              >
                Call Hotline
              </a>
            </div>

          </div>
        </div>

        {/* Row 2: Standard Footer Directory Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/5">
          <div className="flex flex-col gap-4">
            <Link to="/" className="text-2xl font-bold font-serif tracking-tight text-white hover:text-brand-gold transition-colors">
              Joel<span className="text-brand-gold">.</span>
            </Link>
            <p className="text-xs text-brand-cream/60 leading-relaxed text-left">
              Joel&apos;s Kitchen delivers fresh, homemade meals across Bamenda. Order online and pay with Mobile Money.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/237673184599"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 hover:border-[#25D366] flex items-center justify-center text-brand-cream/60 hover:text-[#25D366] hover:bg-[#25D366]/5 transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageSquare size={14} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 hover:border-brand-gold flex items-center justify-center text-brand-cream/60 hover:text-brand-gold hover:bg-brand-gold/5 transition-colors"
                title="Instagram Profile"
              >
                <Instagram size={14} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 hover:border-brand-gold flex items-center justify-center text-brand-cream/60 hover:text-brand-gold hover:bg-brand-gold/5 transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin size={14} />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-left">
            <h4 className="brand-label">Company</h4>
            <ul className="flex flex-col gap-2 text-xs text-brand-cream/60">
              <li><Link to="/" className="hover:text-brand-gold transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-gold transition-colors">About Us</Link></li>
              <li><Link to="/catering" className="hover:text-brand-gold transition-colors">Catering</Link></li>
              <li><Link to="/careers" className="hover:text-brand-gold transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 text-left">
            <h4 className="brand-label">Legal</h4>
            <ul className="flex flex-col gap-2 text-xs text-brand-cream/60">
              <li><Link to="/terms" className="hover:text-brand-gold transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refund" className="hover:text-brand-gold transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 text-left">
            <h4 className="brand-label">Contact</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-brand-cream/60">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-brand-gold shrink-0" />
                <a href="tel:+237673184599" className="hover:text-brand-gold transition-colors">+237 673 184 599</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-brand-gold shrink-0" />
                <a href="mailto:joelamoh65@gmail.com" className="hover:text-brand-gold transition-colors">joelamoh65@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-brand-gold shrink-0" />
                <a href="https://maps.google.com/?q=Bamenda,+North+West+Region,+Cameroon" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors leading-relaxed">
                  Bamenda, North West, Cameroon
                </a>
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
