"use client";

import React, { useRef, useState, useEffect } from "react";
import { ROSELLE_MUSES } from "@/data/muses";
import { useCart } from "@/context/CartContext";
import { Plus, Sparkles, ArrowRight, Compass } from "lucide-react";
import Link from "next/link";

export default function MuseArcSection() {
  const { addItem, openBag } = useCart();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-drift sideways animation
  useEffect(() => {
    let animId: number;
    const track = trackRef.current;
    if (!track) return;

    const scrollSpeed = 0.6;
    const step = () => {
      if (!isPaused && track) {
        track.scrollLeft += scrollSpeed;
        // Infinite wrap
        if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 10) {
          track.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  return (
    <section id="muses" className="relative py-28 overflow-hidden bg-[#120205] text-roselle-cream">
      {/* Section Head */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-16 space-y-3">
        <span className="text-xs uppercase font-mono tracking-[0.25em] text-roselle-gold flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" /> Editorial Portraits • The 10 Roselle Muses
        </span>
        <h2 className="font-serif text-4xl sm:text-6xl font-light text-white">
          The Muse Arc
        </h2>
        <p className="text-sm text-roselle-cream/70 max-w-lg mx-auto">
          Ten portraits captured across Tokyo, Paris, and Milan. Each muse wears their signature shade with unapologetic poise.
        </p>
      </div>

      {/* Draggable & Auto-drifting Card Carousel */}
      <div
        ref={trackRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex gap-6 overflow-x-auto scrollbar-none px-6 md:px-12 py-4 cursor-grab active:cursor-grabbing select-none"
      >
        {ROSELLE_MUSES.map((muse) => (
          <div
            key={muse.id}
            className="w-80 flex-shrink-0 p-6 rounded-3xl bg-[#20040B]/85 border border-roselle-gold/20 backdrop-blur-xl shadow-xl flex flex-col justify-between h-[420px] transition-all transform hover:-translate-y-2 hover:border-roselle-gold/50 group relative overflow-hidden"
          >
            {/* Top Muse Header */}
            <div>
              <div className="flex justify-between items-center text-xs text-roselle-cream/60 mb-2">
                <span className="font-mono text-roselle-gold text-sm font-bold">№ {muse.number}</span>
                <span className="uppercase tracking-widest text-[10px] bg-white/10 px-2 py-0.5 rounded-full">
                  {muse.finish}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-normal text-white group-hover:text-roselle-gold transition-colors">
                "{muse.title}"
              </h3>
            </div>

            {/* Middle Quote & Swatch accent */}
            <div className="my-auto space-y-4">
              <p className="text-xs text-roselle-cream/75 leading-relaxed italic">
                {muse.blurb}
              </p>

              {/* Dynamic color chip */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/40 border border-white/5">
                <div
                  className="w-8 h-8 rounded-full shadow-inner flex-shrink-0 border border-white/20"
                  style={{ backgroundColor: muse.shadeHex }}
                />
                <div className="min-w-0">
                  <span className="text-[10px] text-roselle-cream/50 uppercase tracking-widest block">
                    Worn Shade
                  </span>
                  <span className="text-xs font-semibold text-white font-serif truncate block">
                    {muse.shadeName}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-roselle-gold/15">
              <div>
                <span className="text-[10px] text-roselle-cream/40 uppercase tracking-wider block">Atelier Price</span>
                <span className="font-serif font-bold text-lg text-white font-mono">
                  ${muse.price.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => {
                  addItem(muse.shadeId, 1);
                  openBag();
                }}
                className="px-4 py-2 rounded-full bg-roselle-ruby hover:bg-[#d12448] text-white text-xs uppercase font-semibold tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-roselle-ruby/20"
              >
                <span>Add</span>
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Looping Mixed Bold & Italic Marquee Ribbon */}
      <div className="my-16 py-4 border-y border-roselle-gold/20 bg-black/40 overflow-hidden whitespace-nowrap select-none">
        <div className="inline-block animate-marquee uppercase tracking-[0.2em] text-sm sm:text-base font-serif text-roselle-cream/80">
          <span className="mx-6 font-bold text-white">CHERRY KISS</span> • 
          <span className="mx-6 italic font-light text-roselle-gold">BARELY BLUSH</span> • 
          <span className="mx-6 font-bold text-white">RUBY ROUGE</span> • 
          <span className="mx-6 italic font-light text-roselle-gold">ROSE PETAL</span> • 
          <span className="mx-6 font-bold text-white">HOT FLAMINGO</span> • 
          <span className="mx-6 italic font-light text-roselle-gold">MAUVE VELVET</span> • 
          <span className="mx-6 font-bold text-white">CORAL CRUSH</span> • 
          <span className="mx-6 italic font-light text-roselle-gold">BERRY NOIR</span> • 
        </div>
      </div>

      {/* Dual Row Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-6">
        <Link
          href="#shop"
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-roselle-ruby to-[#8F1023] hover:from-[#d12448] hover:to-roselle-ruby text-white text-xs uppercase font-semibold tracking-widest transition-all shadow-lg shadow-roselle-ruby/30 flex items-center justify-center gap-2"
        >
          <span>Shop All 8 Shades</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="#finder"
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-roselle-gold/30 hover:border-roselle-gold text-roselle-cream text-xs uppercase font-semibold tracking-widest transition-all flex items-center justify-center gap-2"
        >
          <Compass className="w-4 h-4 text-roselle-gold" />
          <span>Find Your Match</span>
        </Link>
      </div>
    </section>
  );
}

