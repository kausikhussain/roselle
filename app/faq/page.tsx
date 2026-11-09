import React from "react";
import { Metadata } from "next";
import { Sparkles, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions & Care | ROSELLE",
  description:
    "Everything you need to know about Roselle formulations, refillable zinc casings, clean ingredients, shipping, and returns.",
};

const FAQS = [
  {
    q: "How does the refillable zinc case work?",
    a: "Every Roselle case is forged from die-cast zinc with an acoustic magnetic closure. When your bullet is finished, pull upward on the gold collar to release the cartridge. Insert any of our 8 shade refills until you feel the magnetic click.",
  },
  {
    q: "Are Roselle formulations 100% vegan and cruelty-free?",
    a: "Yes. We never test on animals, nor do we sell in markets that require animal testing. Our formulas replace animal tallow and beeswax with cold-pressed French Damask rose oil, organic raw shea butter, and olive squalane.",
  },
  {
    q: "What makes the Black Friday 30% discount special?",
    a: "Our Black Friday early access code 'BF30' grants 30% off every single shade in the archive, bringing our signature $28 lipsticks down to $19.60, with complimentary shipping on orders over $50.",
  },
  {
    q: "How does the custom case engraving service work?",
    a: "On each shade page or in your shopping bag, you can request custom diamond-cut engraving of up to 10 uppercase characters. This service is complimentary during the Black Friday launch.",
  },
  {
    q: "What is your shipping and returns policy?",
    a: "We ship internationally via carbon-neutral courier from Paris. If a shade does not perfectly suit your complexion, we offer 30-day complimentary exchanges or full refunds.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#3a040b] text-white pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/25 border border-roselle-gold/25 text-[10px] font-semibold uppercase tracking-ultra text-roselle-gold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Atelier Concierge Care</span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto">
            Everything you need to know regarding our French botanical formulations, acoustic magnetic hardware, and order fulfilment.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#220206] border border-roselle-gold/20 shadow-lg space-y-2"
            >
              <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                <span className="text-roselle-gold font-mono text-sm">0{idx + 1}.</span>
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
