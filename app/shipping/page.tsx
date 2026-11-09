import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns Policy | ROSELLE",
  description: "Global delivery timelines, packaging details, and complimentary 30-day returns.",
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#3a040b] text-white pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">Shipping &amp; Returns</h1>
        <p className="text-xs text-roselle-gold font-mono uppercase">Paris Atelier Dispatch</p>

        <div className="space-y-6 text-xs sm:text-sm text-white/80 leading-relaxed font-light">
          <h2 className="font-serif text-xl font-bold text-white">1. Worldwide Delivery Timelines</h2>
          <p>
            All Roselle orders are prepared and dispatched within 24 hours directly from our atelier in Paris.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-white/70">
            <li><strong>France &amp; European Union:</strong> 2–4 business days via DHL Green Carbon-Neutral.</li>
            <li><strong>United States &amp; Canada:</strong> 3–5 business days via Express Priority Air.</li>
            <li><strong>United Kingdom &amp; Switzerland:</strong> 2–4 business days (duties pre-cleared).</li>
            <li><strong>Asia-Pacific &amp; Middle East:</strong> 4–7 business days.</li>
          </ul>

          <h2 className="font-serif text-xl font-bold text-white pt-4">2. Complimentary Shipping Threshold</h2>
          <p>
            Orders over $50 receive complimentary standard courier delivery. Orders below $50 incur a flat $8.00 shipping fee.
          </p>

          <h2 className="font-serif text-xl font-bold text-white pt-4">3. 30-Day Complimentary Exchanges &amp; Returns</h2>
          <p>
            If a shade does not harmonize with your natural complexion, return it within 30 days of delivery in original condition for an exchange or full refund to your original payment method.
          </p>
        </div>
      </div>
    </div>
  );
}
