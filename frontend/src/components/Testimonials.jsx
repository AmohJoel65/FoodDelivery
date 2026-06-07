import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { Star, Quote, X, MessageCircle } from "lucide-react";

const Testimonials = () => {
  const { url, token, user } = useContext(StoreContext);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ rating: 5, message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState("");

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${url}/api/testimonial/list`);
      const data = await res.json();
      if (data.success) setTestimonials(data.data);
    } catch (e) {
      console.error("Failed to load testimonials:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.message.trim()) {
      setError("Please write something before submitting.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`${url}/api/testimonial/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify({ userId: user._id, rating: form.rating, message: form.message }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitSuccess(true);
        fetchTestimonials();
        setTimeout(() => {
          setShowModal(false);
          setSubmitSuccess(false);
          setForm({ rating: 5, message: "" });
        }, 2000);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const StarPicker = () => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button key={s} type="button" onClick={() => setForm({ ...form, rating: s })} className="p-1 transition-transform hover:scale-110">
          <Star size={24} className={s <= form.rating ? "fill-brand-gold text-brand-gold" : "text-gray-300"} />
        </button>
      ))}
    </div>
  );

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <Star key={i} size={13} className={i < rating ? "fill-brand-gold text-brand-gold" : "text-gray-200"} />
    ));

  return (
    <section className="py-16 sm:py-24 bg-brand-charcoal text-brand-cream overflow-hidden">
      <div className="page-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center sm:text-left">
            <p className="text-[11px] font-bold uppercase tracking-widest text-brand-gold mb-2">What Our Customers Say</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold">Customer Testimonials</h2>
            <p className="text-brand-cream/60 mt-2 text-sm">Real feedback from real Bamenda food lovers.</p>
          </div>
          {token ? (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-brand-gold hover:bg-brand-gold/90 text-brand-charcoal font-bold text-sm rounded-full transition-all shadow-lg shrink-0"
            >
              <MessageCircle size={16} />
              Share Your Experience
            </button>
          ) : (
            <p className="text-brand-cream/40 text-xs italic">Sign in to leave a review</p>
          )}
        </div>

        {/* Testimonial Cards */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-16 border border-white/10 rounded-3xl">
            <Quote size={40} className="text-brand-gold/30 mx-auto mb-4" />
            <p className="text-brand-cream/50 text-sm">No testimonials yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t._id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/8 hover:border-brand-gold/30 transition-all duration-300"
              >
                <Quote size={24} className="text-brand-gold/40 shrink-0" />
                <p className="text-brand-cream/85 text-sm leading-relaxed font-light flex-grow">"{t.message}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div>
                    <p className="text-sm font-bold text-brand-cream">{t.userName}</p>
                    <p className="text-[10px] text-brand-cream/40 mt-0.5">
                      {new Date(t.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                  <div className="flex gap-0.5">{renderStars(t.rating)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Testimonial Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-brand-cream text-brand-charcoal w-full max-w-md rounded-3xl shadow-2xl p-8 relative animate-scale-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-brand-charcoal/40 hover:text-brand-charcoal transition-colors"
            >
              <X size={20} />
            </button>

            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Star size={32} className="fill-brand-gold text-brand-gold" />
                </div>
                <h3 className="text-xl font-bold font-serif">Thank you!</h3>
                <p className="text-sm text-brand-charcoal/60 mt-2">Your testimonial has been shared.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-bold font-serif mb-1">Share Your Experience</h3>
                <p className="text-xs text-brand-charcoal/50 mb-6">Your honest feedback helps us serve Bamenda better.</p>

                <div className="mb-5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-brand-charcoal/50 block mb-2">Your Rating</label>
                  <StarPicker />
                </div>

                <div className="mb-5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-brand-charcoal/50 block mb-2">Your Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your experience with Joel's Kitchen..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-brand-charcoal/10 focus:border-brand-gold outline-none text-sm resize-none"
                  />
                  {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-brand-charcoal hover:bg-brand-gold text-brand-cream hover:text-brand-charcoal font-bold text-sm rounded-xl transition-all"
                >
                  {submitting ? "Submitting..." : "Submit Testimonial"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
