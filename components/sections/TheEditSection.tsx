"use client";

import React, { useState } from "react";
import { ROSELLE_SHADES, Shade } from "@/data/shades";
import { useCart } from "@/context/CartContext";
import { Plus, Sparkles } from "lucide-react";

export default function TheEditSection() {
  const { addItem, openBag } = useCart();
  const [hoveredShade, setHoveredShade] = useState<Shade | null>(null);

  // Top 7 Shades for Winter 2026
  const top7Shades = ROSELLE_SHADES.slice(0, 7);

  // Staggered heights for pedestals
  const pedestalHeights = [
    "h-48",
    "h-64",
    "h-40",
    "h-72",
    "h-52",
    "h-60",
    "h-44",
  ];

  return (
    <section id="edit" className="relative py-32 px-6 md:px-12 bg-[#120205] text-roselle-cream overflow-hidden">
      {/* Slanted Window Light Shaft */}
      <div className="absolute -top-32 right-1/4 w-[600px] h-[900px] bg-gradient-to-b from-white/10 via-roselle-gold/5 to-transparent rotate-12 blur-3xl pointer-events-none" />

      {/* Head */}
      <div className="max-w-4xl mx-auto text-center mb-20 space-y-3 relative z-10">
        <span className="text-xs uppercase font-mono tracking-[0.25em] text-roselle-gold flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" /> Editorial Still Life • Paris Winter 2026
        </span>
        <h2 className="font-serif text-4xl sm:text-6xl font-light text-white">
          The Edit
        </h2>
        <p className="text-sm text-roselle-cream/70 max-w-lg mx-auto">
          The Top 7 Roselle Formulations staged on tiered sculptural cream pedestals under morning winter window light.
        </p>
      </div>

      {/* Staggered Pedestal Composition */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 items-end min-h-[460px] relative z-10 pb-8">
        {top7Shades.map((shade, idx) => {
          const isHovered = hoveredShade?.id === shade.id;

          return (
            <div
              key={shade.id}
              onMouseEnter={() => setHoveredShade(shade)}
              onMouseLeave={() => setHoveredShade(null)}
              className="flex flex-col items-center group relative cursor-pointer"
            >
              {/* Floating Tooltip Card on Hover */}
              {isHovered && (
                <div className="absolute -top-36 z-30 w-48 p-4 rounded-2xl bg-[#1E040B] border border-roselle-gold/40 shadow-2xl text-left space-y-1.5 animate-fadeIn">
                  <div className="flex justify-between items-center text-[10px] text-roselle-gold font-mono">
                    <span>№ {shade.number}</span>
                    <span className="uppercase">{shade.finish}</span>
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-white">
                    {shade.name}
                  </h4>
                  <p className="text-[10px] text-roselle-cream/60 truncate">
                    {shade.keyIngredients[0]}
                  </p>
                  <div className="flex justify-between items-center pt-2 border-t border-roselle-gold/15">
                    <span className="font-serif font-bold text-xs text-roselle-gold font-mono">
                      ${shade.salePrice.toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem(shade.id, 1);
                        openBag();
                      }}
                      className="w-6 h-6 rounded-full bg-roselle-ruby hover:bg-[#d12448] text-white flex items-center justify-center transition-colors shadow-md"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* Upright 3D Lipstick Bullet Graphic */}
              <div className="mb-4 flex flex-col items-center group-hover:-translate-y-3 transition-transform duration-300">
                {/* Bullet */}
                <div
                  className="w-5 h-10 rounded-t-sm shadow-md transition-all border border-white/20"
                  style={{ backgroundColor: shade.hex }}
                />
                {/* Gold Collar */}
                <div className="w-6 h-3 bg-gradient-to-r from-roselle-gold via-white to-roselle-gold rounded-sm shadow-sm" />
                {/* Deep Burgundy Base Flacon */}
                <div className="w-6 h-12 bg-gradient-to-r from-[#20040B] via-[#480816] to-[#20040B] rounded-b-md shadow-lg border border-white/5" />
              </div>

              {/* Cream Pedestal Block */}
              <div
                className={`w-full ${pedestalHeights[idx]} rounded-t-2xl bg-gradient-to-b from-[#EAE2D8] via-[#D8CEBF] to-[#B8AC9B] shadow-2xl flex flex-col justify-between p-3 border-t border-white/40 group-hover:from-white group-hover:to-[#D8CEBF] transition-all duration-300`}
              >
                <span className="font-serif text-xs font-bold text-[#3E2723] opacity-60">
                  0{idx + 1}
                </span>
                <span className="font-serif text-[11px] font-semibold text-[#2D1612] truncate text-center">
                  {shade.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

