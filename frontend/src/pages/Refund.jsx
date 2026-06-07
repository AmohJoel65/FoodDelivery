import React from "react";

const Refund = () => {
  return (
    <div className="page-container py-16 max-w-4xl mx-auto min-h-[60vh] animate-fade-in">
      <h1 className="text-3xl sm:text-4xl font-bold font-serif text-brand-charcoal mb-6">Refund Policy</h1>
      <div className="space-y-6 text-brand-charcoal/80 leading-relaxed">
        <p>
          At Joel's Kitchen, we want you to be completely satisfied with your order. Our refund policy is outlined below.
        </p>
        <h2 className="text-xl font-bold font-serif text-brand-charcoal mt-8">1. Order Cancellations</h2>
        <p>
          You may cancel your order for a full refund if it is still in the "Food Processing" stage. Once the order has been prepared or dispatched, cancellations may not be eligible for a refund.
        </p>
        <h2 className="text-xl font-bold font-serif text-brand-charcoal mt-8">2. Quality Issues</h2>
        <p>
          If you receive an incorrect order or if the quality of the food does not meet our standards, please contact us immediately upon delivery. We will issue a replacement or a refund to your Mobile Money account after verification.
        </p>
        <h2 className="text-xl font-bold font-serif text-brand-charcoal mt-8">3. Processing Refunds</h2>
        <p>
          Approved refunds will be processed and sent back to the original Mobile Money number used for the transaction within 2-3 business days.
        </p>
      </div>
    </div>
  );
};

export default Refund;
