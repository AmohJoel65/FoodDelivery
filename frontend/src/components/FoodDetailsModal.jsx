import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { X, Star, Clock, MapPin, Plus, Minus, Heart, ShieldAlert, MessageSquare } from "lucide-react";

const FoodDetailsModal = ({ item, onClose }) => {
  const { cartItems, addToCart, removeFromCart, favorites, toggleFavorite, url, token, user, formatPrice, showAlert } = useContext(StoreContext);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  if (!item) return null;

  const qty = cartItems[item._id] || 0;
  const isFav = favorites?.includes(item._id) || false;

  // Fetch reviews when modal opens
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${url}/api/review/food/${item._id}`);
        const data = await response.json();
        if (data.success) {
          setReviews(data.reviews);
          setAverageRating(data.averageRating);
          setTotalReviews(data.totalReviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [item._id, url]);

  // Handle review submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      showAlert("Please login to submit a review", "warning", "Authentication Required");
      return;
    }

    setIsSubmittingReview(true);
    try {
      const response = await fetch(`${url}/api/review/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token
        },
        body: JSON.stringify({
          foodId: item._id,
          userId: user._id,
          rating: reviewForm.rating,
          comment: reviewForm.comment
        })
      });

      const data = await response.json();
      if (data.success) {
        // Refresh reviews
        const reviewsResponse = await fetch(`${url}/api/review/food/${item._id}`);
        const reviewsData = await reviewsResponse.json();
        if (reviewsData.success) {
          setReviews(reviewsData.reviews);
          setAverageRating(reviewsData.averageRating);
          setTotalReviews(reviewsData.totalReviews);
        }
        setShowReviewForm(false);
        setReviewForm({ rating: 5, comment: "" });
      } else {
        showAlert(data.message || "Failed to submit review", "error", "Review Failed");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      showAlert("Failed to submit review", "error", "Review Error");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Default nutrients if not present
  const nutrients = item.nutrients || {
    calories: "380 kcal",
    protein: "14g",
    carbs: "45g",
    fats: "16g",
    sodium: "280mg"
  };

  // Convert nutrient values to percentages for beautiful gold bar representations
  const getNutrientPercentage = (value, max) => {
    const num = parseInt(value) || 0;
    return Math.min(Math.round((num / max) * 100), 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-label={`Details for ${item.name}`}>
      {/* 1. Backdrop Glass Overlay */}
      <div 
        className="absolute inset-0 bg-[#1a1a1a]/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* 2. Modal Core Container */}
      <div className="relative bg-[#fdfbf7] border border-[#1a1a1a]/10 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-300">
        
        {/* Close Button Trigger */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/80 backdrop-blur-md border border-[#1a1a1a]/10 p-2 rounded-full text-gray-700 hover:text-black hover:scale-105 active:scale-95 transition-all z-20"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Core Body */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Image, Tags, Metadata */}
            <div className="lg:col-span-5 space-y-5">
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-gray-100 border border-[#1a1a1a]/5">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800";
                  }}
                />
                
                {/* Category Pill Tag */}
                <span className="absolute top-4 left-4 bg-[#1a1a1a]/85 backdrop-blur-md text-[#fdfbf7] text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/10">
                  {item.category}
                </span>

                {/* Favorite Heart Trigger */}
                <button 
                  onClick={() => toggleFavorite(item._id)}
                  className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md border border-[#1a1a1a]/10 p-2.5 rounded-xl shadow-lg hover:scale-110 active:scale-95 transition-all"
                  aria-label="Bookmark dish"
                >
                  <Heart size={16} className={isFav ? "fill-red-500 text-red-500" : "text-gray-400"} />
                </button>
              </div>

              {/* Sourcing & Prep Coordinates */}
              <div className="bg-white rounded-2xl border border-[#e4e1db]/80 p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block">Farm Sourcing</span>
                    <span className="text-xs font-semibold text-gray-800">{item.sourcing || "Seasonal Organic Guild Farms"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block">Preparation Time</span>
                    <span className="text-xs font-semibold text-gray-800">{item.prepTime || "12 mins"} (Crafted Fresh)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dish Bio, Ingredients & Nutritional Facts */}
            <div className="lg:col-span-7 flex flex-col justify-between text-left space-y-6">
              <div className="space-y-4">
                {/* Title & Reviews */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex text-[#d4af37]">
                      {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="#d4af37" stroke="none" />)}
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Artisan Plate (5.0)</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 leading-tight">
                    {item.name}
                  </h2>
                </div>

                {/* Sourcing ingredients */}
                <p className="text-xs leading-relaxed text-gray-600 font-light">
                  {item.description}
                </p>

                {/* Sourced Ingredients bullet strings */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] block">Selected Ingredients</span>
                  <p className="text-xs text-gray-500 font-medium">
                    {item.ingredients || "Seasonal heirloom seeds, wild herbs, sea-salt sprinkles, garlic extracts."}
                  </p>
                </div>

                {/* 3. NUTRITIONAL PROFILE PANEL (Requested!) */}
                <div className="border border-[#e4e1db]/80 rounded-2xl bg-white p-5 space-y-3">
                  <div className="flex justify-between items-center border-b border-[#e4e1db]/60 pb-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800 font-serif">Nutritional Profile</h3>
                    <span className="text-[9px] uppercase tracking-widest font-semibold text-gray-400">Per Premium Serving</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    {/* Calories */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-medium text-gray-700">
                        <span>Energy (Calories)</span>
                        <span className="font-bold text-gray-900">{nutrients.calories}</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full gold-gradient-bg transition-all duration-500" 
                          style={{ width: `${getNutrientPercentage(nutrients.calories, 800)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Protein */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-medium text-gray-700">
                        <span>Protein</span>
                        <span className="font-bold text-gray-900">{nutrients.protein}</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 transition-all duration-500" 
                          style={{ width: `${getNutrientPercentage(nutrients.protein, 50)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Carbohydrates */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-medium text-gray-700">
                        <span>Carbohydrates</span>
                        <span className="font-bold text-gray-900">{nutrients.carbs}</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-500 transition-all duration-500" 
                          style={{ width: `${getNutrientPercentage(nutrients.carbs, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Fats */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-medium text-gray-700">
                        <span>Healthy Fats</span>
                        <span className="font-bold text-gray-900">{nutrients.fats}</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-rose-400 transition-all duration-500" 
                          style={{ width: `${getNutrientPercentage(nutrients.fats, 40)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Sodium */}
                    <div className="space-y-1 sm:col-span-2">
                      <div className="flex justify-between text-[11px] font-medium text-gray-700">
                        <span>Sodium Balance</span>
                        <span className="font-bold text-gray-900">{nutrients.sodium}</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyan-500 transition-all duration-500" 
                          style={{ width: `${getNutrientPercentage(nutrients.sodium, 800)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="pt-6 border-t border-[#1a1a1a]/5">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-bold font-serif text-[#1a1a1a]">Customer Reviews</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={star <= Math.round(averageRating) ? "fill-[#d4af37] text-[#d4af37]" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-[#1a1a1a]">{averageRating}</span>
                    <span className="text-xs text-[#1a1a1a]/50">({totalReviews} reviews)</span>
                  </div>
                </div>

                {/* Add Review Button */}
                {!showReviewForm && (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="mb-4 px-4 py-2 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 text-[#d4af37] rounded-xl text-xs font-bold transition-all flex items-center gap-2"
                  >
                    <MessageSquare size={14} /> Write a Review
                  </button>
                )}

                {/* Review Form */}
                {showReviewForm && (
                  <form onSubmit={handleReviewSubmit} className="mb-6 p-4 bg-[#1a1a1a]/5 rounded-xl">
                    <div className="mb-3">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/50 block mb-2">Your Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                            className="p-1 hover:scale-110 transition-transform"
                          >
                            <Star
                              size={24}
                              className={star <= reviewForm.rating ? "fill-[#d4af37] text-[#d4af37]" : "text-gray-300"}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/50 block mb-2">Your Review</label>
                      <textarea
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                        placeholder="Share your experience with this dish..."
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border border-[#1a1a1a]/10 focus:border-[#d4af37] outline-none text-xs resize-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={isSubmittingReview}
                        className="px-4 py-2 bg-[#d4af37] hover:bg-[#b88934] text-[#1a1a1a] rounded-lg text-xs font-bold transition-all"
                      >
                        {isSubmittingReview ? "Submitting..." : "Submit Review"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="px-4 py-2 border border-[#1a1a1a]/10 text-[#1a1a1a] rounded-lg text-xs font-bold transition-all hover:bg-[#1a1a1a]/5"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {reviews.length === 0 ? (
                    <p className="text-xs text-[#1a1a1a]/50 text-center py-4">No reviews yet. Be the first to review!</p>
                  ) : (
                    reviews.map((review) => (
                      <div key={review._id} className="p-3 bg-white rounded-xl border border-[#1a1a1a]/5">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-xs font-bold text-[#1a1a1a]">{review.userName}</p>
                            <div className="flex items-center gap-1 mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={12}
                                  className={star <= review.rating ? "fill-[#d4af37] text-[#d4af37]" : "text-gray-300"}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-[10px] text-[#1a1a1a]/40">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {review.comment && (
                          <p className="text-xs text-[#1a1a1a]/70 leading-relaxed">{review.comment}</p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Footer pricing & bag stepper */}
              <div className="pt-5 border-t border-[#1a1a1a]/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-left w-full sm:w-auto">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#1a1a1a]/40 block">Artisan Surcharge Price</span>
                  <span className="text-2xl font-bold font-serif text-[#1a1a1a]">{formatPrice(item.price)}</span>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                  {qty === 0 ? (
                    <button 
                      onClick={() => addToCart(item._id)}
                      className="flex-grow sm:flex-grow-0 px-8 py-3.5 bg-[#1a1a1a] hover:bg-[#d4af37] text-white hover:text-black rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 transform active:scale-95 shadow-md flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add To Bag
                    </button>
                  ) : (
                    <div className="flex items-center gap-4 bg-white border border-[#d4af37] px-4 py-2.5 rounded-full shadow-lg transition-all duration-300">
                      <button 
                        onClick={() => removeFromCart(item._id)}
                        className="w-8 h-8 rounded-full hover:bg-gray-100 text-[#1a1a1a] hover:text-[#d4af37] flex items-center justify-center transition-all active:scale-90"
                        title="Remove 1 item"
                      >
                        <Minus size={15} strokeWidth={2.5} />
                      </button>
                      <span className="text-sm font-extrabold text-[#1a1a1a] min-w-[20px] text-center">
                        {qty} in Bag
                      </span>
                      <button 
                        onClick={() => addToCart(item._id)}
                        className="w-8 h-8 rounded-full hover:bg-gray-100 text-[#1a1a1a] hover:text-[#d4af37] flex items-center justify-center transition-all active:scale-90"
                        title="Add 1 item"
                      >
                        <Plus size={15} strokeWidth={2.5} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default FoodDetailsModal;
