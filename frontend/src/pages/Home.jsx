import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import AppDownload from "../components/AppDownload";
import Testimonials from "../components/Testimonials";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { StoreContext } from "../context/StoreContext";
import FoodItemCard from "../components/FoodItemCard";
import { Button } from "../components/ui";
import { ArrowRight, Clock, MapPin, CheckCircle } from "lucide-react";
import FoodDetailsModal from "../components/FoodDetailsModal";

import SkeletonLoader from "../components/SkeletonLoader";

const Home = () => {
  const { food_list, cartItems, addToCart, removeFromCart, favorites, toggleFavorite, loading } = useContext(StoreContext);
  const [selectedItem, React_setSelectedItem] = React.useState(null);
  const navigate = useNavigate();

  const [featuredRef, featuredVisible] = useScrollAnimation(0.1);
  const [howRef, howVisible] = useScrollAnimation(0.1);
  const [appRef, appVisible] = useScrollAnimation(0.1);

  // Take the first 4 items as featured (or sort by a popularity score if existed)
  const featuredFoods = food_list.slice(0, 4);

  return (
    <div className="animate-fade-in">
      <Hero />

      {/* Featured Items Section */}
      <div className="bg-brand-cream py-16 sm:py-24">
        <div ref={featuredRef} className={`page-container transition-all duration-700 ${featuredVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-charcoal">Featured Delights</h2>
              <p className="text-brand-charcoal/60 mt-2">Chef's special selections for today.</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/menu')} className="rounded-full">
              View All Menu <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>

          {loading ? (
            <SkeletonLoader count={4} />
          ) : featuredFoods.length === 0 ? (
            <div className="text-center py-12 bg-brand-charcoal/5 rounded-3xl border border-dashed border-brand-charcoal/10">
              <p className="text-lg font-serif text-brand-charcoal/60 italic">Connecting to database, please wait...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredFoods.map((item, index) => (
                  <FoodItemCard
                    key={item._id}
                    item={item}
                    index={index}
                    cartItems={cartItems}
                    favorites={favorites}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    toggleFavorite={toggleFavorite}
                    setSelectedItem={React_setSelectedItem}
                  />
                ))}
              </div>
              <div className="flex justify-center mt-12">
                <Button onClick={() => navigate('/menu')} className="rounded-full px-8 py-6 text-base font-medium shadow-md hover:shadow-lg transition-all gap-2">
                  View More Dishes <ArrowRight size={18} />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* How it Works Section */}
      <div className="py-16 sm:py-24">
        <div ref={howRef} className={`page-container transition-all duration-700 ${howVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-charcoal">How It Works</h2>
            <p className="text-brand-charcoal/60 mt-4 text-lg">Your favorite meals delivered in three simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Hidden on Mobile) */}
            <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-brand-charcoal/10 -z-10"></div>

            <div className="bg-brand-cream p-8 rounded-3xl shadow-card text-center relative">
              <div className="w-16 h-16 mx-auto bg-brand-charcoal text-brand-cream rounded-full flex items-center justify-center mb-6 shadow-soft">
                <MapPin size={28} />
              </div>
              <h3 className="text-xl font-bold font-serif mb-3">1. Select Location</h3>
              <p className="text-brand-charcoal/60">Choose your exact location in Bamenda for fast, accurate delivery.</p>
            </div>

            <div className="bg-brand-cream p-8 rounded-3xl shadow-card text-center relative border-b-4 border-brand-gold transform md:-translate-y-4">
              <div className="w-16 h-16 mx-auto bg-brand-gold text-white rounded-full flex items-center justify-center mb-6 shadow-soft">
                <CheckCircle size={28} />
              </div>
              <h3 className="text-xl font-bold font-serif mb-3">2. Choose Your Meal</h3>
              <p className="text-brand-charcoal/60">Browse our artisanal menu and customize your order to your taste.</p>
            </div>

            <div className="bg-brand-cream p-8 rounded-3xl shadow-card text-center relative">
              <div className="w-16 h-16 mx-auto bg-brand-charcoal text-brand-cream rounded-full flex items-center justify-center mb-6 shadow-soft">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold font-serif mb-3">3. Fast Delivery</h3>
              <p className="text-brand-charcoal/60">Your food is prepared fresh and delivered piping hot within 45 minutes.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <Testimonials />

      {/* App store promotion */}
      <div ref={appRef} className={`bg-brand-cream py-12 transition-all duration-700 ${appVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <AppDownload />
      </div>

      {/* Modal for featured items */}
      {selectedItem && (
        <FoodDetailsModal 
          item={selectedItem}
          onClose={() => React_setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default Home;
