"use client";

import React, { useState } from "react";
import { Sparkles, Wind, ArrowDown } from "lucide-react";

interface RibbonSwirlSectionProps {
  swirlProgress?: number;
  onSwirlScrub?: (val: number) => void;
}

export default function RibbonSwirlSection({
  swirlProgress = 0.5,
  onSwirlScrub,
}: RibbonSwirlSectionProps) {
  const [localProgress, setLocalProgress] = useState(swirlProgress);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setLocalProgress(val);
    if (onSwirlScrub) onSwirlScrub(val);
  };

  return (
    <section id="swirl" className="relative min-h-[120vh] py-32 px-6 flex flex-col items-center justify-between text-center overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-radial-gradient from-roselle-ruby/20 via-transparent to-transparent blur-3xl opacity-70 pointer-events-none" />

      {/* Top Editorial Headline */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-4 pt-10">
        <span className="text-xs uppercase font-mono tracking-[0.25em] text-roselle-gold flex items-center justify-center gap-2">
          <Wind className="w-3.5 h-3.5" /> Procedural S-Curve Geometry • 120 Orbiting Petals
        </span>

        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white leading-tight">
          Spun in Velvet. <br />
          <span className="italic font-normal text-roselle-gold">Draped in Silk.</span>
        </h2>

        <p className="text-sm text-roselle-cream/70 max-w-lg mx-auto leading-relaxed">
          As the flacon closes, a continuous glossy ribbon of liquid carmine pours across the 3D stage while a whirlwind of botanical petals orbits in kinetic harmony.
        </p>
      </div>

      {/* Interactive Ribbon Scrub Control */}
      <div className="relative z-20 max-w-md w-full mx-auto p-6 rounded-3xl bg-[#1A0307]/80 border border-roselle-gold/20 backdrop-blur-xl shadow-2xl space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="uppercase tracking-widest text-roselle-gold font-mono">
            Scrub Ribbon Swirl
          </span>
          <span className="font-mono text-roselle-cream/70">
            {Math.round(localProgress * 100)}%
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={localProgress}
          onChange={handleSlider}
          className="w-full accent-roselle-ruby bg-white/10 h-1.5 rounded-full cursor-pointer"
        />

        <div className="flex justify-between text-[10px] text-roselle-cream/40 uppercase tracking-wider">
          <span>0% Latent Core</span>
          <span>50% Helical Pour</span>
          <span>100% Full Wrap</span>
        </div>
      </div>

      {/* Down prompt to muse arc */}
      <div className="relative z-10 flex flex-col items-center gap-2 text-roselle-cream/40 text-[10px] uppercase tracking-widest pb-8">
        <span>Enter the Muse Arc</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}

