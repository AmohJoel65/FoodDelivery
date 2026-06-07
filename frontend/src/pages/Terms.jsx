import React from "react";

const Terms = () => {
  return (
    <div className="page-container py-16 max-w-4xl mx-auto min-h-[60vh] animate-fade-in">
      <h1 className="text-3xl sm:text-4xl font-bold font-serif text-brand-charcoal mb-6">Terms of Service</h1>
      <div className="space-y-6 text-brand-charcoal/80 leading-relaxed">
        <p>
          Welcome to Joel's Kitchen. By accessing our application and placing an order, you agree to be bound by these Terms of Service.
        </p>
        <h2 className="text-xl font-bold font-serif text-brand-charcoal mt-8">1. Orders and Payments</h2>
        <p>
          All orders are subject to acceptance and availability. Prices are subject to change without notice. We currently accept payments exclusively via Mobile Money Transfer in Cameroon. You must confirm your payment within the app after completing the transfer.
        </p>
        <h2 className="text-xl font-bold font-serif text-brand-charcoal mt-8">2. Delivery</h2>
        <p>
          We strive to deliver all orders within our stated timeframes. However, delivery times are estimates and may be affected by factors outside our control (e.g., weather, traffic).
        </p>
        <h2 className="text-xl font-bold font-serif text-brand-charcoal mt-8">3. Modifications</h2>
        <p>
          We reserve the right to modify these terms at any time. Your continued use of the service constitutes acceptance of the new terms.
        </p>
      </div>
    </div>
  );
};

export default Terms;
