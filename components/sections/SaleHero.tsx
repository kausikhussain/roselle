"use client";

import React from "react";
import { ROSELLE_SHADES, Shade } from "@/data/shades";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, ArrowRight, ShoppingBag, Sparkles, ChevronDown } from "lucide-react";

interface SaleHeroProps {
  currentShadeIndex: number;
  onSelectShade?: (index: number) => void;
  onSelectShadeIndex?: (index: number) => void;
}

export default function SaleHero({ currentShadeIndex, onSelectShade, onSelectShadeIndex }: SaleHeroProps) {
  const { addItem, openBag } = useCart();
  const currentShade: Shade = ROSELLE_SHADES[currentShadeIndex] || ROSELLE_SHADES[0];

  const selectShade = (idx: number) => {
    if (onSelectShade) onSelectShade(idx);
    if (onSelectShadeIndex) onSelectShadeIndex(idx);
  };

  const handlePrev = () => {
    const nextIdx = (currentShadeIndex - 1 + ROSELLE_SHADES.length) % ROSELLE_SHADES.length;
    selectShade(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentShadeIndex + 1) % ROSELLE_SHADES.length;
    selectShade(nextIdx);
  };

  const handleAddToBag = () => {
    addItem(currentShade.id, 1);
    openBag();
  };

  return (
    <section id="sale" className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 overflow-hidden">
      {/* Editorial Campaign Atmosphere Backdrop */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <img
          src="/assets/images/hero-campaign.jpg"
          alt="Roselle Campaign Visual"
          className="w-full h-full object-cover object-top opacity-20 filter brightness-75 contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#5c0612]/80 to-[#130206]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#130206]/60 via-transparent to-[#130206]" />
      </div>

      {/* Background Glowing "BLACK FRIDAY" Lightboxes */}
      <div className="absolute top-28 left-6 md:left-16 pointer-events-none select-none z-0">
        <span className="font-serif text-5xl md:text-8xl font-black uppercase tracking-tighter text-white/[0.04] drop-shadow-[0_0_60px_rgba(255,255,255,0.08)]">
          BLACK
        </span>
      </div>
      <div className="absolute top-28 right-6 md:right-16 pointer-events-none select-none z-0">
        <span className="font-serif text-5xl md:text-8xl font-black uppercase tracking-tighter text-white/[0.04] drop-shadow-[0_0_60px_rgba(255,255,255,0.08)]">
          FRIDAY
        </span>
      </div>

      {/* Top Banner Tag */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-roselle-ruby/20 border border-roselle-ruby/50 text-roselle-cream text-xs uppercase tracking-widest backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-roselle-ruby animate-ping" />
          <span>Atelier Private Access • 30% Off Everything</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white leading-tight">
          Velvet on the mouth. <br />
          <span className="italic font-light text-roselle-gold">Sculpted in code.</span>
        </h1>
      </div>

      {/* Center 3D Staging Area Spacer */}
      <div className="relative z-10 h-72 sm:h-80 md:h-96 pointer-events-none" />

      {/* Bottom Product Details & Actions */}
      <div className="relative z-20 max-w-4xl mx-auto w-full">
        <div className="p-6 md:p-8 rounded-3xl bg-[#1D040A]/85 border border-roselle-gold/25 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Shade Info */}
          <div className="flex items-center gap-5">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white/5 border border-roselle-gold/20 hover:border-roselle-gold flex items-center justify-center text-roselle-cream/80 hover:text-white transition-all"
              aria-label="Previous Shade"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Shade Swatch Preview */}
            <div
              className="w-14 h-14 rounded-2xl flex-shrink-0 shadow-lg flex items-center justify-center relative border border-white/20"
              style={{ backgroundColor: currentShade.hex }}
            >
              <span className="font-serif text-xs font-bold text-white drop-shadow">
                {currentShade.number}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white">
                  {currentShade.name}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 uppercase tracking-wider text-roselle-gold font-mono">
                  {currentShade.finish}
                </span>
              </div>
              <p className="text-xs text-roselle-cream/60 mt-0.5">
                {currentShade.subheadline}
              </p>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white/5 border border-roselle-gold/20 hover:border-roselle-gold flex items-center justify-center text-roselle-cream/80 hover:text-white transition-all"
              aria-label="Next Shade"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Pricing & Add to Cart */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-xs line-through text-roselle-cream/40 block">
                ${currentShade.price.toFixed(2)}
              </span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-roselle-gold font-mono">
                ${currentShade.salePrice.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleAddToBag}
              className="px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-roselle-ruby to-[#8F1023] hover:from-[#d12448] hover:to-roselle-ruby text-white text-xs uppercase font-semibold tracking-widest shadow-xl shadow-roselle-ruby/30 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Vanity</span>
            </button>
          </div>
        </div>

        {/* Shade Swatch Dots Row */}
        <div className="flex items-center justify-center gap-2.5 mt-5">
          {ROSELLE_SHADES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => selectShade(idx)}
              className={`w-4 h-4 rounded-full transition-all transform ${
                idx === currentShadeIndex
                  ? "scale-125 ring-2 ring-roselle-gold ring-offset-2 ring-offset-[#130206]"
                  : "opacity-60 hover:opacity-100 hover:scale-110"
              }`}
              style={{ backgroundColor: s.hex }}
              title={`${s.name} (${s.finish})`}
            />
          ))}
        </div>
      </div>

      {/* Down Indicator */}
      <div className="relative z-10 flex flex-col items-center text-center mt-6 text-roselle-cream/40 text-[10px] uppercase tracking-widest">
        <span>Scroll to Explore Anatomy</span>
        <ChevronDown className="w-4 h-4 mt-1 animate-bounce" />
      </div>
    </section>
  );
}
