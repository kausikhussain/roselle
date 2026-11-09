import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Sparkles, ShieldCheck, Heart, Leaf, Award, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "The Atelier Story — Craft & Clean Haute Formulation | ROSELLE",
  description:
    "The philosophy of Roselle Lip Lab: sculptural refillable zinc design, cold-pressed French Damask rose essence, and clean luxury formulation.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#3a040b] text-white pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/25 border border-roselle-gold/25 text-[10px] font-semibold uppercase tracking-ultra text-roselle-gold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Roselle Atelier Manifest</span>
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-white">
            Sculptural Design. Pure Botanical Nectar.
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-roselle-gold font-light">
            &ldquo;We created Roselle to bring the sensory grandeur of French haute perfumery into the architecture of modern lip colour.&rdquo;
          </p>
        </div>

        {/* Story Section 1: The Casing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-8 sm:p-12 rounded-[36px] bg-[#220206] border border-roselle-gold/25 shadow-2xl">
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-roselle-gold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Architectural Hardware</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              The Weighted Zinc Core
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
              Conventional lipsticks are made of disposable lightweight plastic that feels hollow.
              Every Roselle case is forged from solid die-cast zinc with an acoustic neodymium magnetic
              closure tuned to produce a clean, reassuring click. Finished with seven coats of
              hand-buffed piano lacquer and brushed rose-gold collar rings.
            </p>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
              The casing is designed to be kept for decades. When your shade finishes, simply pull
              out the spent bullet cartridge and click a fresh refill into place.
            </p>
          </div>

          <div className="relative aspect-square rounded-3xl bg-gradient-to-tr from-[#140103] to-[#45050f] border border-white/10 flex items-center justify-center p-8 shadow-inner">
            <div className="text-center space-y-3">
              <div className="w-20 h-20 mx-auto rounded-full bg-roselle-ruby/60 border border-roselle-gold/40 flex items-center justify-center shadow-gold-glow">
                <span className="font-serif text-3xl font-bold text-roselle-gold">7</span>
              </div>
              <h3 className="font-serif italic text-xl text-white">Coats of Lacquer</h3>
              <p className="text-xs text-white/60 max-w-xs">
                Hand-polished with micro-diamond paste for high-depth optical luster.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section 2: Clean Formulation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-8 sm:p-12 rounded-[36px] bg-[#220206] border border-roselle-gold/25 shadow-2xl">
          <div className="order-2 md:order-1 relative aspect-square rounded-3xl bg-gradient-to-tr from-[#140103] to-[#45050f] border border-white/10 flex items-center justify-center p-8 shadow-inner">
            <div className="text-center space-y-3">
              <div className="w-20 h-20 mx-auto rounded-full bg-roselle-ruby/60 border border-roselle-gold/40 flex items-center justify-center shadow-gold-glow">
                <Leaf className="w-8 h-8 text-roselle-gold" />
              </div>
              <h3 className="font-serif italic text-xl text-white">100% Clean &amp; Vegan</h3>
              <p className="text-xs text-white/60 max-w-xs">
                Zero parabens, phthalates, mineral oils, synthetic fragrances, or animal testing.
              </p>
            </div>
          </div>

          <div className="order-1 md:order-2 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-roselle-gold flex items-center gap-1.5">
              <Leaf className="w-4 h-4" />
              <span>Haute Formulation</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              French Damask Rose &amp; Shea Cushion
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
              We replace petroleum waxes with a nutrient-dense botanical cushion of 12% whipped
              raw organic shea butter, cold-pressed Damask rose-hip oil, golden jojoba, and plant-derived
              olive squalane.
            </p>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
              High-purity micronized mineral pigments are triple-milled to create intense one-swipe
              color payoff that diffuses the appearance of lip lines without feeling dry or sticky.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center pt-8 space-y-6">
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Experience the Roselle Velvet Touch
          </h3>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-3.5 rounded-full bg-white text-roselle-dark font-bold text-xs uppercase tracking-ultra hover:bg-roselle-gold transition-all shadow-luxury-md hover:scale-105"
            >
              Shop The 8 Shades
            </Link>
            <Link
              href="/finder"
              className="px-8 py-3.5 rounded-full border border-roselle-gold/40 hover:border-roselle-gold text-white font-bold text-xs uppercase tracking-ultra hover:bg-roselle-gold/15 transition-all shadow-luxury-sm hover:scale-105"
            >
              Virtual Try-On Lab
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
