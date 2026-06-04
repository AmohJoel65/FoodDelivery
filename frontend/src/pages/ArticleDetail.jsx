import React, { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, User, Share2, BookOpen } from "lucide-react";
import { StoreContext } from "../context/StoreContext";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showAlert } = useContext(StoreContext);

  // Import articles data (in a real app, this would come from an API)
  const articles = [
    {
      id: 1,
      category: "Sourcing",
      title: "The Sacred Saffron of Kashmir: Sourcing Our Signature Gold",
      excerpt: "Deep in the Pampore region, multi-generational farming cooperatives harvest Kashmiri saffron. Learn how we secure this rare ingredient for our signature Panna Cotta.",
      readTime: "6 min read",
      author: "Joel Savarin",
      date: "May 12, 2026",
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=1200",
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
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=1200",
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
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200",
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
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1200",
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
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=1200",
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

  const article = articles.find(a => a.id === parseInt(id));

  if (!article) {
    return (
      <div className="min-h-screen bg-[#f5f0e6] flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-[#d4af37] mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold mb-2">Article Not Found</h2>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/journal" className="text-[#d4af37] font-semibold hover:underline">
            Return to Journal
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showAlert("Link copied to clipboard!", "success", "Link Copied");
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f0e6]">
      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-[#1a1a1a]/40 to-transparent" />
        
        {/* Back Button */}
        <Link
          to="/journal"
          className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-[#1a1a1a] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-white transition-all"
        >
          <ArrowLeft size={16} />
          Back to Journal
        </Link>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 py-12 -mt-20 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {/* Article Header */}
          <header className="mb-8">
            <span className="text-[#d4af37] text-xs font-semibold uppercase tracking-widest block mb-4">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1a1a1a] leading-tight mb-6">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 border-b border-gray-200 pb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] text-[#d4af37] flex items-center justify-center font-serif text-sm font-bold">
                  {article.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-[#1a1a1a]">{article.author}</p>
                  <p className="text-xs text-gray-400">{article.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock size={16} />
                {article.readTime}
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-gray-400 hover:text-[#d4af37] transition-colors ml-auto"
              >
                <Share2 size={16} />
                Share
              </button>
            </div>
          </header>

          {/* Article Body */}
          <div 
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <Link
                to="/journal"
                className="text-[#d4af37] font-semibold flex items-center gap-2 hover:underline"
              >
                <ArrowLeft size={16} />
                Read More Articles
              </Link>
            </div>
          </footer>
        </div>

        {/* Related Articles */}
        <section className="mt-12">
          <h2 className="text-2xl font-serif font-bold mb-6">More from {article.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles
              .filter(a => a.category === article.category && a.id !== article.id)
              .slice(0, 2)
              .map(relatedArticle => (
                <Link
                  key={relatedArticle.id}
                  to={`/journal/${relatedArticle.id}`}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all group"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif font-bold text-lg group-hover:text-[#d4af37] transition-colors line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {relatedArticle.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </article>
    </main>
  );
};

export default ArticleDetail;
