"use client";

import React, { useState } from "react";
import { ROSELLE_SHADES, Shade } from "@/data/shades";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Plus, Check, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

export default function SwatchBar() {
  const { addItem } = useCart();
  const [addedShadeId, setAddedShadeId] = useState<string | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleAdd = (shadeId: string) => {
    addItem(shadeId, 1);
    setAddedShadeId(shadeId);
    setTimeout(() => setAddedShadeId(null), 1800);
  };

  return (
    <section
      id="shop"
      className="relative min-h-screen py-24 px-4 sm:px-8 flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Editorial Corner Plus Marks */}
      <div className="absolute top-6 left-6 text-white/30 text-sm font-mono">+</div>
      <div className="absolute top-6 right-6 text-white/30 text-sm font-mono">+</div>

      {/* Top Section Header */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6 z-20">
        <div>
          <div className="text-xs uppercase tracking-ultra text-roselle-gold font-semibold mb-2">
            The Swatch Bar • Eight Shades
          </div>
          <h2 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-white">
            PICK YOUR{" "}
            <span className="font-serif italic font-normal gold-gradient-text">
              pout
            </span>
          </h2>
        </div>

        <p className="max-w-md text-xs sm:text-sm text-white/80 leading-relaxed font-light md:text-right">
          Tilt a card, hover to paint a swatch, press it. Hit <span className="text-roselle-gold font-bold">+</span> to drop a shade into your bag.
        </p>
      </div>

      {/* Horizontal Carousel of Tilted 3D Cards */}
      <div className="my-10 overflow-x-auto flex gap-6 px-4 sm:px-8 py-8 no-scrollbar z-20">
        {ROSELLE_SHADES.map((shade: Shade, index: number) => {
          // Dynamic tilt angle
          const tiltClass =
            index % 3 === 0
              ? "rotate-[-1.5deg]"
              : index % 3 === 1
              ? "rotate-[0deg]"
              : "rotate-[1.5deg]";

          const isJustAdded = addedShadeId === shade.id;

          return (
            <div
              key={shade.id}
              className={`w-[290px] sm:w-[330px] flex-shrink-0 rounded-[28px] p-6 shadow-luxury-md hover:shadow-ruby-glow transition-all duration-500 hover:-translate-y-4 hover:rotate-0 flex flex-col justify-between relative overflow-hidden group ${tiltClass}`}
              style={{
                background: `linear-gradient(180deg, ${shade.secondaryHex}ee 0%, #210206 100%)`,
                border: "1px solid rgba(229, 169, 149, 0.25)",
              }}
            >
              {/* Background Shade Typography Running Vertically */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 overflow-hidden select-none">
                <span className="font-serif font-black text-6xl text-white uppercase tracking-tighter leading-tight text-center break-words max-w-[200px]">
                  {shade.name}
                </span>
              </div>

              {/* Card Top: Number & Finish */}
              <div className="flex justify-between items-center relative z-10">
                <span className="font-mono text-xs font-bold text-white/80 tracking-wider">
                  {shade.number} / 08
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-black/40 border border-white/20 text-[10px] font-semibold uppercase tracking-widest text-roselle-gold">
                  {shade.finish}
                </span>
              </div>

              {/* Card Center: Visual Product Staging & Floating Props */}
              <div className="relative h-60 my-4 flex items-center justify-center z-10">
                {/* Floating 3D Prop (Cherries, Heart, Powder Puff) */}
                <div className="absolute top-2 right-4 text-2xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 filter drop-shadow">
                  {shade.propType === "cherry" && "🍒"}
                  {shade.propType === "heart" && "💖"}
                  {shade.propType === "powder" && "✨"}
                  {shade.propType === "rose" && "🌹"}
                  {shade.propType === "pearl" && "🦪"}
                </div>

                {/* Lipstick Visual Representation */}
                <div className="relative flex flex-col items-center">
                  {/* Floating Cap */}
                  <div
                    className="w-9 h-14 rounded-t-xl border border-roselle-gold/40 shadow-luxury-sm transform -translate-y-4 group-hover:-translate-y-8 transition-transform duration-500"
                    style={{ backgroundColor: shade.hex }}
                  />
                  {/* Exposed Bullet */}
                  <div
                    className="w-7 h-10 rounded-t-lg shadow-inner -my-1 border-t border-white/40"
                    style={{ backgroundColor: shade.hex }}
                  />
                  {/* Gold Ring Collar */}
                  <div className="w-9 h-2.5 bg-gradient-to-r from-roselle-gold via-roselle-gilt to-roselle-gold border-y border-white/40" />
                  {/* Base Casing */}
                  <div
                    className="w-9 h-16 rounded-b-xl border border-roselle-gold/40 shadow-luxury-md flex items-center justify-center"
                    style={{ backgroundColor: shade.secondaryHex }}
                  >
                    <span className="text-[8px] font-mono tracking-widest text-white/60 -rotate-90">
                      ROSELLE
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Ingredients Pill */}
              <div className="relative z-10 text-[10px] text-white/60 tracking-wider text-center uppercase mb-3 truncate">
                {shade.subheadline}
              </div>

              {/* Sensory Rating Meters */}
              <div className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] font-mono mb-4 pt-3 border-t border-white/10">
                {/* Hydration */}
                <div className="space-y-1">
                  <div className="flex justify-between text-white/80">
                    <span>Hydration</span>
                    <span className="text-roselle-gold">{shade.sensory.hydration}%</span>
                  </div>
                  <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-roselle-gold rounded-full"
                      style={{ width: `${shade.sensory.hydration}%` }}
                    />
                  </div>
                </div>

                {/* Pigment */}
                <div className="space-y-1">
                  <div className="flex justify-between text-white/80">
                    <span>Pigment</span>
                    <span className="text-roselle-gold">{shade.sensory.pigment}%</span>
                  </div>
                  <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-roselle-gold rounded-full"
                      style={{ width: `${shade.sensory.pigment}%` }}
                    />
                  </div>
                </div>

                {/* Shine */}
                <div className="space-y-1">
                  <div className="flex justify-between text-white/80">
                    <span>Shine</span>
                    <span className="text-roselle-gold">{shade.sensory.shine}%</span>
                  </div>
                  <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-roselle-gold rounded-full"
                      style={{ width: `${shade.sensory.shine}%` }}
                    />
                  </div>
                </div>

                {/* Wear */}
                <div className="space-y-1">
                  <div className="flex justify-between text-white/80">
                    <span>Wear</span>
                    <span className="text-roselle-gold">{shade.sensory.wear}%</span>
                  </div>
                  <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-roselle-gold rounded-full"
                      style={{ width: `${shade.sensory.wear}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Card Footer: Price & Add to Bag Circular Button */}
              <div className="relative z-10 pt-3 border-t border-white/15 flex items-center justify-between">
                <div>
                  <span className="font-serif text-2xl font-bold text-white">
                    {formatPrice(shade.salePrice)}
                  </span>
                  {shade.price > shade.salePrice && (
                    <span className="font-serif text-sm line-through text-white/40 ml-2">
                      {formatPrice(shade.price)}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleAdd(shade.id)}
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-luxury-md hover:scale-110 ${
                    isJustAdded
                      ? "bg-green-500 text-white"
                      : "bg-white text-roselle-dark hover:bg-roselle-gold"
                  }`}
                  aria-label={`Add ${shade.name} to bag`}
                >
                  {isJustAdded ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
