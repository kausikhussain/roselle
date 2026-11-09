"use client";

import React, { useState } from "react";
import { ROSELLE_SHADES, Shade } from "@/data/shades";
import { useCart } from "@/context/CartContext";
import { Plus, Sparkles, Check } from "lucide-react";

export default function SwatchBarSection() {
  const { addItem, openBag } = useCart();
  const [hoveredShadeId, setHoveredShadeId] = useState<string | null>(null);

  return (
    <section id="shop" className="relative py-32 px-6 md:px-12 bg-[#170308] text-roselle-cream overflow-hidden">
      {/* Head */}
      <div className="max-w-4xl mx-auto text-center mb-16 space-y-3">
        <span className="text-xs uppercase font-mono tracking-[0.25em] text-roselle-gold flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" /> Swatch Bar • The 8 Formulations
        </span>
        <h2 className="font-serif text-4xl sm:text-6xl font-light text-white">
          The Swatch Atelier
        </h2>
        <p className="text-sm text-roselle-cream/70 max-w-lg mx-auto">
          Every shade formulated with cold-pressed botanical oils. Tilt to inspect texture, sensory metrics, and our Black Friday 30% private offer.
        </p>
      </div>

      {/* Grid of Tall Luxury Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ROSELLE_SHADES.map((shade) => {
          const isHovered = hoveredShadeId === shade.id;

          return (
            <div
              key={shade.id}
              onMouseEnter={() => setHoveredShadeId(shade.id)}
              onMouseLeave={() => setHoveredShadeId(null)}
              className="p-6 rounded-3xl bg-[#22050E]/85 border border-roselle-gold/20 backdrop-blur-xl shadow-xl flex flex-col justify-between h-[520px] transition-all duration-300 transform hover:-translate-y-3 hover:border-roselle-gold/60 group relative overflow-hidden"
            >
              {/* Top Shade Number & Floating Prop Badge */}
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-roselle-gold text-sm font-bold block">
                    № {shade.number}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-roselle-cream/60">
                    {shade.finish}
                  </span>
                </div>
                <div className="text-xl transform group-hover:scale-125 transition-transform" title={shade.propName}>
                  {shade.propType === "cherry" && "🍒"}
                  {shade.propType === "heart" && "💖"}
                  {shade.propType === "powder" && "✨"}
                  {shade.propType === "rose" && "🌹"}
                  {shade.propType === "pearl" && "🦪"}
                  {shade.propType === "cocoa" && "🍫"}
                </div>
              </div>

              {/* Center Shade Name & Swatch Pill */}
              <div className="my-auto space-y-4 text-center">
                <h3 className="font-serif text-2xl font-normal text-white group-hover:text-roselle-gold transition-colors">
                  {shade.name}
                </h3>
                <p className="text-xs text-roselle-cream/70 italic px-2">
                  "{shade.tagline}"
                </p>

                {/* Swatch color core */}
                <div
                  className="w-20 h-28 mx-auto rounded-3xl shadow-2xl relative overflow-hidden transition-all transform group-hover:scale-110 border border-white/20"
                  style={{ backgroundColor: shade.hex }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/30" />
                  <div className="absolute bottom-2 inset-x-0 text-center font-serif text-[10px] font-bold text-white drop-shadow">
                    {shade.number}
                  </div>
                </div>
              </div>

              {/* Sensory Metric Performance Bars */}
              <div className="space-y-2 pt-4 border-t border-roselle-gold/15 text-[11px]">
                <div className="flex items-center justify-between text-roselle-cream/70">
                  <span>Hydration</span>
                  <div className="w-24 bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-roselle-gold h-full rounded-full"
                      style={{ width: `${shade.sensory.hydration}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-roselle-cream/70">
                  <span>Pigment</span>
                  <div className="w-24 bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-roselle-ruby h-full rounded-full"
                      style={{ width: `${shade.sensory.pigment}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-roselle-cream/70">
                  <span>Wear</span>
                  <div className="w-24 bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-white/60 h-full rounded-full"
                      style={{ width: `${shade.sensory.wear}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Card Footer: Price & Quick Add */}
              <div className="flex items-center justify-between pt-4 border-t border-roselle-gold/15 mt-3">
                <div>
                  <span className="text-[10px] line-through text-roselle-cream/40 block">
                    ${shade.price.toFixed(2)}
                  </span>
                  <span className="font-serif font-bold text-lg text-roselle-gold font-mono">
                    ${shade.salePrice.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => {
                    addItem(shade.id, 1);
                    openBag();
                  }}
                  className="w-10 h-10 rounded-full bg-roselle-ruby hover:bg-[#d12448] text-white flex items-center justify-center transition-all shadow-lg shadow-roselle-ruby/30 transform hover:scale-110"
                  aria-label={`Add ${shade.name} to vanity bag`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

