import React from "react";
import { ChefHat, MapPin, Clock, Heart } from "lucide-react";
import { Card } from "../components/ui";

const About = () => {
  const values = [
    {
      icon: ChefHat,
      title: "Made fresh daily",
      description: "Every dish is prepared to order in our Bamenda kitchen — not reheated from a warehouse.",
    },
    {
      icon: MapPin,
      title: "Local delivery",
      description: "We deliver across Bamenda and surrounding areas. Pay easily with Mobile Money at checkout.",
    },
    {
      icon: Clock,
      title: "Reliable timing",
      description: "Choose your delivery window and track your order from kitchen to doorstep.",
    },
    {
      icon: Heart,
      title: "Homemade quality",
      description: "From signature bowls to local favorites — honest portions, real ingredients, fair prices.",
    },
  ];

  return (
    <main className="min-h-screen bg-brand-surface text-brand-charcoal pb-20">
      <section className="bg-brand-charcoal text-brand-cream py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="brand-label text-brand-gold block mb-3">About Joel&apos;s Kitchen</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-5">
            Good food, delivered in Bamenda
          </h1>
          <p className="text-brand-cream/75 text-base leading-relaxed">
            Joel&apos;s Kitchen started with a simple idea: bring fresh, homemade meals to people&apos;s doors
            across Bamenda. No fuss, no pretense — just food you&apos;d be happy to serve at your own table.
          </p>
        </div>
      </section>

      <section className="page-container section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-5">
            <h2 className="text-2xl md:text-3xl brand-heading">Our story</h2>
            <div className="w-10 h-0.5 bg-brand-gold" />
            <p className="text-sm brand-muted leading-relaxed">
              Amoh Joel runs Joel&apos;s Kitchen from Bamenda, North West Region. What began as cooking for
              friends and family grew into a full delivery service — bowls, sandwiches, pasta, desserts, and
              African-inspired dishes made with care.
            </p>
            <p className="text-sm brand-muted leading-relaxed">
              We source ingredients locally where we can, cook in small batches, and deliver while food is
              still fresh and hot. Whether you&apos;re ordering lunch for the office or dinner for the family,
              we treat every order the same way we&apos;d cook for our own.
            </p>
          </div>

          <Card accent className="p-6 md:p-8">
            <h3 className="text-lg font-serif font-bold mb-4">Get in touch</h3>
            <ul className="space-y-3 text-sm brand-muted">
              <li><span className="font-semibold text-brand-charcoal">Phone:</span> 237673184599</li>
              <li><span className="font-semibold text-brand-charcoal">Email:</span> joelamoh65@gmail.com</li>
              <li><span className="font-semibold text-brand-charcoal">Location:</span> Bamenda, North West Region, Cameroon</li>
            </ul>
          </Card>
        </div>
      </section>

      <section className="bg-brand-cream border-y border-brand-charcoal/5 py-16">
        <div className="page-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl brand-heading">What we stand for</h2>
            <p className="text-sm brand-muted mt-2 max-w-md mx-auto">Four things that guide every order we prepare.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item) => (
              <Card key={item.title} className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                  <item.icon size={20} />
                </div>
                <h3 className="font-serif font-bold text-brand-charcoal">{item.title}</h3>
                <p className="text-xs brand-muted leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
