import React from "react";

const Privacy = () => {
  return (
    <div className="page-container py-16 max-w-4xl mx-auto min-h-[60vh] animate-fade-in">
      <h1 className="text-3xl sm:text-4xl font-bold font-serif text-brand-charcoal mb-6">Privacy Policy</h1>
      <div className="space-y-6 text-brand-charcoal/80 leading-relaxed">
        <p>
          At Joel's Kitchen, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.
        </p>
        <h2 className="text-xl font-bold font-serif text-brand-charcoal mt-8">1. Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as your name, phone number, email address, and delivery address when you create an account or place an order.
        </p>
        <h2 className="text-xl font-bold font-serif text-brand-charcoal mt-8">2. How We Use Your Information</h2>
        <p>
          We use your information to process your orders, communicate with you about your deliveries, and improve our services. We do not sell your personal data to third parties.
        </p>
        <h2 className="text-xl font-bold font-serif text-brand-charcoal mt-8">3. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal data against unauthorized access or accidental loss.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
