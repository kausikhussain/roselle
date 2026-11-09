"use client";

import React from "react";
import { Sparkles, ArrowDown } from "lucide-react";

interface RibbonSwirlProps {
  scrollProgress: number;
  onScrubProgress?: (val: number) => void;
}

export default function RibbonSwirl({
  scrollProgress,
  onScrubProgress,
}: RibbonSwirlProps) {
  return (
    <section
      id="swirl"
      className="relative min-h-[90vh] flex flex-col justify-between py-20 px-4 sm:px-8 select-none overflow-hidden"
    >
      {/* Corner Registration Marks */}
      <div className="absolute top-6 left-6 text-white/30 text-sm font-mono">+</div>
      <div className="absolute top-6 right-6 text-white/30 text-sm font-mono">+</div>
      <div className="absolute bottom-6 left-6 text-white/30 text-sm font-mono">+</div>
      <div className="absolute bottom-6 right-6 text-white/30 text-sm font-mono">+</div>

      {/* Large Roselle Monogram Watermark in Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 select-none">
        <span className="font-serif text-[42vw] leading-none text-white tracking-tighter">
          R
        </span>
      </div>

      {/* Top Editorial Subtext */}
      <div className="relative text-center z-20 space-y-2 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 border border-roselle-gold/25 text-[10px] font-semibold uppercase tracking-ultra text-roselle-gold">
          <Sparkles className="w-3 h-3" />
          <span>The Ribbon Choreography</span>
        </div>
        <p className="font-serif italic text-2xl sm:text-3xl text-white/90">
          Enveloped in liquid crimson silk
        </p>
      </div>

      {/* Center 3D Clearance (Three.js WebGL canvas renders the ribbon & petal flurry) */}
      <div className="flex-1 h-[450px] pointer-events-none" />

      {/* Bottom Interactive Ribbon Scrubber & Scroll Prompt */}
      <div className="w-full max-w-md mx-auto z-20 space-y-3 text-center">
        {onScrubProgress && (
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-roselle-gold font-mono">
              <span>Ribbon Pour</span>
              <span>{Math.round(scrollProgress * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={scrollProgress}
              onChange={(e) => onScrubProgress(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-roselle-gold"
              aria-label="Scrub Ribbon Swirl Progress"
            />
          </div>
        )}

        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-ultra text-white/60 pt-2 animate-bounce">
          <span>Scroll to uncover the muses</span>
          <ArrowDown className="w-3.5 h-3.5 text-roselle-gold" />
        </div>
      </div>
    </section>
  );
}
