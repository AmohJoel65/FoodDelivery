import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { Search, BookOpen, Clock, User, ArrowRight, Sparkles, Filter, Newspaper } from "lucide-react";

const Journal = () => {
  const { showToast } = useContext(StoreContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Sourcing", "Recipes", "Chef's Secrets", "Wine & Pairings"];

  // Seeded Culinary Journal Articles
  const articles = [
    {
      id: 1,
      category: "Sourcing",
      title: "The Sacred Saffron of Kashmir: Sourcing Our Signature Gold",
      excerpt: "Deep in the Pampore region, multi-generational farming cooperatives harvest Kashmiri saffron. Learn how we secure this rare ingredient for our signature Panna Cotta.",
      readTime: "6 min read",
      author: "Joel Savarin",
      date: "May 12, 2026",
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800",
      featured: true,
      content: `
        <p class="mb-6">In the misty valleys of Pampore, Kashmir, there exists a tradition that spans over 3,000 years. Here, in fields painted purple by dawn's first light, families work in harmony with the seasons to harvest what many call "red gold" – saffron.</p>
        
        <h3 class="text-2xl font-serif font-bold mb-4 mt-8">The Harvest Ritual</h3>
        <p class="mb-6">Our journey begins before sunrise. The delicate Crocus sativus flowers bloom for only a few hours each day, and must be harvested immediately. Each flower yields just three crimson stigmas, which are hand-picked with painstaking precision.</p>
        
        <p class="mb-6">The farmers we work with have passed down their knowledge through generations. They know exactly when to harvest – when the flowers are fully open but before the sun's heat can degrade the delicate compounds that give saffron its distinctive aroma and color.</p>
        
        <h3 class="text-2xl font-serif font-bold mb-4 mt-8">Quality That Speaks</h3>
        <p class="mb-6">What sets Kashmiri saffron apart is its unique terroir. The valley's specific altitude, soil composition, and climate create conditions that produce saffron with higher concentrations of crocin (color), picrocrocin (flavor), and safranal (aroma) than any other variety in the world.</p>
        
        <p class="mb-6">Our partnership with the Pampore cooperative ensures fair compensation and sustainable practices. We pay above market rates, which allows these families to continue their traditional way of life while providing us with the world's finest saffron.</p>
        
        <h3 class="text-2xl font-serif font-bold mb-4 mt-8">From Field to Kitchen</h3>
        <p class="mb-6">Once harvested, the stigmas are carefully dried over a traditional fire of oak and almond wood. This slow drying process, taking 12-24 hours, preserves the complex flavor profile that makes our signature saffron panna cotta so extraordinary.</p>
        
        <p class="mb-6">When you taste our saffron-infused dishes, you're experiencing not just an ingredient, but a story of dedication, tradition, and the pursuit of excellence that spans millennia.</p>
      `
    },
    {
      id: 2,
      category: "Chef's Secrets",
      title: "Deciphering the Wood-Fire: Sourdough Fermentation Mechanics",
      excerpt: "Wild yeast hydration, 36-hour slow-rise levain cultivation, and intense direct-hearth radiation. Discover the secrets to baking the perfect artisanal crusty loaf.",
      readTime: "8 min read",
      author: "Chef de Boulangerie",
      date: "May 08, 2026",
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=800",
      featured: false,
      content: `
        <p class="mb-6">The perfect sourdough loaf is not merely bread – it's a living organism, a testament to patience, and a celebration of microbial alchemy. At Joel's kitchen, our wood-fired sourdough represents 48 hours of careful cultivation and precise timing.</p>
        
        <h3 class="text-2xl font-serif font-bold mb-4 mt-8">The Levain: Our Living Culture</h3>
        <p class="mb-6">Our sourdough starter, affectionately named "Bertha," has been alive for over seven years. Fed daily with a precise ratio of organic rye flour and filtered water, she maintains a stable ecosystem of wild yeast and lactic acid bacteria that give our bread its characteristic tang and open crumb structure.</p>
        
        <p class="mb-6">The fermentation process begins 24 hours before baking. We mix a portion of our mature starter with fresh flour and water, creating a levain that ferments at 75°F for 12 hours. This slow fermentation develops complex flavors that commercial yeast simply cannot replicate.</p>
        
        <h3 class="text-2xl font-serif font-bold mb-4 mt-8">The Autolyse: Building Structure</h3>
        <p class="mb-6">Before adding salt, we allow our dough to rest for 30-45 minutes in a process called autolyse. This crucial step allows the flour to fully hydrate and gluten networks to begin forming, creating the foundation for the bread's structure and chew.</p>
        
        <p class="mb-6">During this time, enzymes naturally present in the flour begin breaking down starches into simple sugars, which will later feed the yeast and contribute to the bread's caramelized crust and complex flavor profile.</p>
        
        <h3 class="text-2xl font-serif font-bold mb-4 mt-8">The Wood-Fire: Oven Spring</h3>
        <p class="mb-6">Our custom-built wood-fired oven reaches temperatures of 850°F. When we slide our proofed loaves onto the hearth, the intense heat causes rapid oven spring – the dramatic rise that creates the beautiful, airy crumb structure our customers love.</p>
        
        <p class="mb-6">The direct contact with the stone hearth creates a thick, caramelized crust with a distinctive char that only wood-fire can achieve. Meanwhile, the residual heat in the oven's dome continues cooking the bread evenly, ensuring a perfect bake every time.</p>
        
        <p class="mb-6">The result is a loaf with a dark, crackling crust, a moist and tender crumb, and a flavor that evolves with each bite – the culmination of ancient techniques and modern understanding.</p>
      `
    },
    {
      id: 3,
      category: "Recipes",
      title: "The Art of Plating: Culinary Architecture as Visual Poetry",
      excerpt: "A deep dive into asymmetrical composition, negative space margins, and contrasting organic color palettes to transform recipes into masterpieces before the first bite.",
      readTime: "5 min read",
      author: "Elena Rostova",
      date: "Apr 28, 2026",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
      featured: false,
      content: `
        <p class="mb-6">At Joel's, we believe that eating begins with the eyes. Before a single morsel touches your tongue, your brain has already formed expectations based on visual cues. This is why plating is not merely decoration – it's an integral part of the culinary experience.</p>
        
        <h3 class="text-2xl font-serif font-bold mb-4 mt-8">The Golden Ratio in Plating</h3>
        <p class="mb-6">We apply the principles of the golden ratio (1:1.618) to our plate compositions. The main element typically occupies approximately 60% of the visual space, with supporting elements arranged in harmonious proportion. This creates a sense of balance that feels natural and pleasing to the human eye.</p>
        
        <p class="mb-6">Asymmetry is key. Perfect symmetry can feel static and artificial. By placing elements slightly off-center, we create dynamic tension that draws the eye across the plate, encouraging the diner to explore each component.</p>
        
        <h3 class="text-2xl font-serif font-bold mb-4 mt-8">Negative Space as Design Element</h3>
        <p class="mb-6">The empty space on a plate is as important as the food itself. We use negative space to create breathing room, allowing each element to stand out. This technique, borrowed from Japanese minimalism, prevents visual clutter and guides the diner's focus to the most important components.</p>
        
        <p class="mb-6">The rule of thirds is our guide: imagine a tic-tac-toe grid over your plate. Placing key elements at the intersections creates more dynamic compositions than centering everything.</p>
        
        <h3 class="text-2xl font-serif font-bold mb-4 mt-8">Color Theory on the Plate</h3>
        <p class="mb-6">We consider color temperature, contrast, and harmony when designing plates. Warm colors (reds, oranges, yellows) stimulate appetite, while cool colors (greens, blues) provide visual relief and freshness.</p>
        
        <p class="mb-6">Contrasting colors create visual interest – a bright green herb sauce against deep red beet puree, or golden seared scallops on a bed of purple cabbage. However, we maintain color harmony by limiting our palette to 3-4 primary colors per dish.</p>
        
        <h3 class="text-2xl font-serif font-bold mb-4 mt-8">Height and Texture</h3>
        <p class="mb-6">Building verticality adds drama and sophistication. Stacking components, using ring molds, or creating towers creates visual interest and allows for layering of flavors. However, we ensure that height doesn't compromise accessibility – the diner must be able to easily access each element.</p>
        
        <p class="mb-6">Texture contrast is equally important. We pair crispy with smooth, creamy with crunchy, creating a multisensory experience that keeps the palate engaged throughout the meal.</p>
      `
    },
    {
      id: 4,
      category: "Wine & Pairings",
      title: "Uncorking the Coast: Chardonnay & Saffron Lobster Ravioli",
      excerpt: "Exploring the chemistry of acid-profile balancing. Why a crisp, buttery coastal Chardonnay elevates saffron-infused chardonnay cream ravioli so perfectly.",
      readTime: "7 min read",
      author: "Marcus Vance",
      date: "Apr 15, 2026",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800",
      featured: false,
      content: `
        <p class="mb-6">The marriage of wine and food is one of gastronomy's most sophisticated arts. At Joel's, our saffron lobster ravioli with chardonnay cream sauce represents a perfect pairing with coastal Chardonnay – a combination that elevates both elements beyond their individual excellence.</p>
        
        <h3 class="text-2xl font-serif font-bold mb-4 mt-8">The Dish: A Symphony of Flavors</h3>
        <p class="mb-6">Our lobster ravioli features hand-rolled pasta filled with sweet Maine lobster meat, enhanced by the earthy, floral notes of Kashmiri saffron. The sauce incorporates the same Chardonnay we recommend for pairing, creating a bridge between food and wine.</p>
        
        <p class="mb-6">The dish is rich, creamy, and luxurious – the lobster provides sweet, delicate protein, while the saffron adds complex floral and earthy notes. The chardonnay cream sauce ties everything together with buttery richness and subtle oak influence.</p>
        
        <h3 class="text-2xl font-serif font-bold mb-4 mt-8">The Wine: Coastal Chardonnay</h3>
        <p class="mb-6">We select Chardonnays from cool coastal regions like Sonoma Coast, Santa Barbara, or Burgundy. These wines are characterized by bright acidity, subtle oak influence, and notes of citrus, green apple, and mineral undertones.</p>
        
        <p class="mb-6">The cooler climate preserves the grape's natural acidity, which is crucial for cutting through the rich cream sauce. The moderate oak aging adds vanilla and butter notes that complement the dish without overwhelming it.</p>
        
        <h3 class="text-2xl font-serif font-bold mb-4 mt-8">The Chemistry of the Pairing</h3>
        <p class="mb-6">The key to this pairing is acid balance. The wine's acidity cuts through the fat of the cream sauce and lobster, cleansing the palate between bites. This prevents the dish from feeling heavy and allows each flavor to shine.</p>
        
        <p class="mb-6">The wine's buttery notes from malolactic fermentation mirror the cream sauce, creating a seamless transition from wine to food. Meanwhile, the citrus and mineral notes provide contrast to the saffron's earthiness, creating a complex flavor profile that evolves with each sip and bite.</p>
        
        <h3 class="text-2xl font-serif font-bold mb-4 mt-8">Serving Temperature and Technique</h3>
        <p class="mb-6">We serve the Chardonnay at 52-54°F (11-12°C) – cool enough to maintain acidity but not so cold that it masks flavors. The wine is decanted for 30 minutes to allow it to breathe, softening any harsh edges and allowing the complex aromatics to develop.</p>
        
        <p class="mb-6">The ravioli is served piping hot, creating a pleasant temperature contrast with the chilled wine. This temperature difference further enhances the sensory experience, making each element more distinct and enjoyable.</p>
      `
    },
    {
      id: 5,
      category: "Sourcing",
      title: "Cold Fjords: Harvesting Organic Atlantic Salmon",
      excerpt: "Journey with us to the crystal-clear fjords of Norway, where cold currents produce salmon of incomparable texture, wood-smoked gently over white oak chips.",
      readTime: "9 min read",
      author: "Joel Savarin",
      date: "Mar 30, 2026",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800",
      featured: false,
      content: `
        <p class="mb-6">The pristine fjords of Norway hold some of the world's purest waters, and it is here that we source our organic Atlantic salmon. The combination of cold Arctic currents, deep fjord geography, and sustainable farming practices creates salmon of exceptional quality and flavor.</p>
        
        <h3 class="text-2xl font-serif font-bold mb-4 mt-8">The Fjord Environment</h3>
        <p class="mb-6">Norwegian fjords are natural aquariums carved by glaciers over millions of years. The water is crystal clear, cold (4-8°C year-round), and rich in oxygen. These conditions are ideal for salmon, which require cold, oxygen-rich water to thrive.</p>
        
        <p class="mb-6">The deep waters provide natural protection from predators and extreme weather, while the constant exchange of water between the fjord and the open ocean ensures excellent water quality. The salmon swim freely in large pens, mimicking their natural migration patterns.</p>
        
        <h3 class="text-2xl font-serif font-bold mb-4 mt-8">Organic Certification Standards</h3>
        <p class="mb-6">Our salmon partner holds the highest organic certification, which means no antibiotics, no synthetic pesticides, and no GMO feed. The salmon are fed a diet of organic fish meal and fish oil derived from sustainable wild fish stocks, supplemented with organic vegetable proteins.</p>
        
        <p class="mb-6">The stocking density is strictly controlled – no more than 2% fish by volume in the water. This low density reduces stress on the fish and prevents the spread of disease naturally, eliminating the need for antibiotics.</p>
        
        <h3 class="text-2xl font-serif font-bold mb-4 mt-8">The Smoking Process</h3>
        <p class="mb-6">Once harvested, the salmon is transported to our smoking facility within 24 hours. We use a traditional cold-smoking process over white oak chips, which imparts a delicate, smoky flavor without overpowering the salmon's natural taste.</p>
        
        <p class="mb-6">The salmon is first dry-cured with a mixture of sea salt, brown sugar, and herbs for 12 hours. This draws out moisture and concentrates flavors. After curing, it's rinsed and dried to form a pellicle – a tacky surface that better absorbs smoke.</p>
        
        <p class="mb-6">The smoking takes place at temperatures below 80°F for 8-12 hours. The cold smoke penetrates slowly, creating a deep, complex smoky flavor while preserving the salmon's delicate texture. The white oak adds subtle vanilla and caramel notes that complement the fish's natural sweetness.</p>
        
        <h3 class="text-2xl font-serif font-bold mb-4 mt-8">From Fjord to Table</h3>
        <p class="mb-6">The result is salmon with a vibrant orange-pink color, firm texture, and clean, briny flavor. The smoking adds depth without masking the fish's natural qualities. Whether served in our smoked salmon tartare, as part of our seafood platter, or in our signature salmon Benedict, this ingredient represents the pinnacle of sustainable aquaculture.</p>
        
        <p class="mb-6">Every bite tells the story of cold Norwegian waters, careful stewardship, and traditional craftsmanship – a testament to our commitment to sourcing only the finest ingredients for our guests.</p>
      `
    }
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleReadArticle = (id) => {
    navigate(`/journal/${id}`);
  };

  // Filtered Articles Logic
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = activeCategory === "All" || article.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = articles.find(a => a.featured && activeCategory === "All");

  return (
    <main className="min-h-screen bg-brand-cream text-brand-charcoal pb-24" aria-label="Joel Culinary Journal Page">
      {/* 1. Magazine Banner Header */}
      <section className="relative bg-brand-charcoal text-brand-cream py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 w-[800px] h-[300px] rounded-full bg-brand-gold blur-3xl transform rotate-12"></div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          <div className="max-w-2xl text-center md:text-left">
            <span className="text-brand-gold font-medium tracking-[0.2em] text-xs uppercase block mb-3 animate-fade-in">
              The Culinary Gazette
            </span>
            <h1 className="text-4xl md:text-6xl font-serif tracking-tight mb-4 text-brand-cream">
              Culinary Journal
            </h1>
            <p className="text-brand-cream/80 text-sm md:text-base font-light leading-relaxed">
              Stories from our organic farm partners, artisan sourdough baking tips, culinary plating geometry, and chronicles from Chef Joel's private test kitchen.
            </p>
          </div>

          {/* Search Article Input */}
          <div className="w-full md:w-80 shrink-0">
            <label htmlFor="search-input" className="sr-only">Search Culinary Journal articles</label>
            <div className="relative">
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input 
                id="search-input"
                type="text"
                placeholder="Search articles, tags..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e4e1db]/30 bg-white/10 text-white focus:outline-none focus:bg-white focus:text-brand-charcoal focus:ring-4 focus:ring-brand-gold/20 placeholder-gray-400 transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Selection Tabs */}
      <section className="max-w-7xl mx-auto px-6 mt-10" aria-label="Article Filter Navigation">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-6 border-b border-[#e4e1db]/40 pb-4">
          <Filter className="w-4 h-4" /> Category Filters:
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase border transition-all ${
                activeCategory === cat 
                  ? "bg-brand-charcoal text-white border-brand-charcoal scale-105" 
                  : "bg-white text-gray-600 border-[#e4e1db] hover:border-gray-400 active:scale-95"
              }`}
              aria-label={`Filter articles by category ${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Magazine Spread (Only shows on 'All' and if not searching) */}
      {featuredArticle && searchQuery === "" && (
        <section className="max-w-7xl mx-auto px-6 mt-12" aria-label="Featured Journal Spread">
          <div className="bg-white rounded-3xl border border-[#e4e1db]/60 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative h-64 sm:h-96 lg:h-full overflow-hidden min-h-[350px]">
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <span className="absolute top-4 left-4 bg-brand-gold text-brand-charcoal text-[10px] tracking-widest uppercase font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <Sparkles className="w-3 h-3" /> Featured Article
                </span>
              </div>
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-brand-gold text-xs font-semibold uppercase tracking-widest block">
                    {featuredArticle.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-brand-charcoal leading-tight">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray-600 font-light leading-relaxed text-sm md:text-base">
                    {featuredArticle.excerpt}
                  </p>
                </div>
                
                <div className="border-t border-[#e4e1db]/60 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-charcoal text-brand-gold flex items-center justify-center font-serif text-sm font-bold border border-brand-gold/30">
                      JS
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{featuredArticle.author}</p>
                      <p className="text-[10px] text-gray-400">{featuredArticle.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <span className="text-gray-400 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredArticle.readTime}</span>
                    <button 
                      onClick={() => handleReadArticle(featuredArticle.id)}
                      className="text-brand-gold uppercase tracking-widest flex items-center gap-1.5 hover:text-brand-charcoal transition-colors"
                      aria-label={`Read Article: ${featuredArticle.title}`}
                    >
                      Read Article <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid of Journal Articles */}
      <section className="max-w-7xl mx-auto px-6 mt-16" aria-label="Journal Articles Feed">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles
            .filter((a) => searchQuery !== "" || activeCategory !== "All" || !a.featured)
            .map((article) => (
              <article 
                key={article.id} 
                className="bg-white rounded-2xl border border-[#e4e1db]/60 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <span className="absolute top-3 left-3 bg-brand-charcoal text-white text-[9px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-md">
                      {article.category}
                    </span>
                  </div>
                  
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="text-lg font-serif font-bold group-hover:text-brand-gold transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-light leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-brand-gold" /> By {article.author}
                  </span>
                  <button 
                    onClick={() => handleReadArticle(article.id)}
                    className="text-xs font-semibold text-brand-charcoal uppercase tracking-wider flex items-center gap-1 hover:text-brand-gold transition-colors"
                    aria-label={`Read Article: ${article.title}`}
                  >
                    Read <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
        </div>

        {/* Empty Search Result Fallback */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#e4e1db]/40 p-8 mt-10">
            <Newspaper className="w-12 h-12 text-brand-gold mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-serif mb-2">No Culinary Chronicles Found</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">We couldn't find any articles matching your search query. Try broadening your keywords or resetting filters.</p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="mt-6 px-6 py-2.5 bg-brand-charcoal text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-brand-charcoal/95 active:scale-95 transition-all"
            >
              Reset Search & Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Journal;
