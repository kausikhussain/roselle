"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ROSELLE_SHADES, Shade } from "@/data/shades";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Sparkles, Plus, Check, Filter, ArrowRight } from "lucide-react";

export default function ShopPage() {
  const [selectedFinish, setSelectedFinish] = useState<string>("All");
  const [selectedUndertone, setSelectedUndertone] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addItem } = useCart();

  const handleAdd = (shadeId: string) => {
    addItem(shadeId, 1);
    setAddedId(shadeId);
    setTimeout(() => setAddedId(null), 1600);
  };

  // Filter & Sort Logic
  const filteredShades = ROSELLE_SHADES.filter((shade) => {
    if (selectedFinish !== "All" && shade.finish !== selectedFinish) return false;
    if (selectedUndertone !== "All" && shade.undertone !== selectedUndertone) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.salePrice - b.salePrice;
    if (sortBy === "price-high") return b.salePrice - a.salePrice;
    if (sortBy === "hydration") return b.sensory.hydration - a.sensory.hydration;
    return 0; // featured default
  });

  return (
    <div className="min-h-screen bg-[#42050e] text-white pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 border border-roselle-gold/25 text-[10px] font-semibold uppercase tracking-ultra text-roselle-gold">
            <Sparkles className="w-3 h-3" />
            <span>Black Friday Collection • 30% Off Sitewide</span>
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-white">
            The Haute Archive
          </h1>
          <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
            Eight sculptural lipsticks formulated with Damask rose nectar, 12% whipped shea cushion,
            and weighted zinc core magnetic cases. Hand-poured in Paris.
          </p>
        </div>

        {/* Filter & Sort Bar */}
        <div className="p-4 rounded-2xl glass-card border border-roselle-gold/20 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Finish Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar">
            <span className="text-xs font-mono uppercase text-roselle-gold mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              <span>Finish:</span>
            </span>
            {["All", "Velvet", "Satin", "Matte", "Cream", "Gloss"].map((finish) => (
              <button
                key={finish}
                onClick={() => setSelectedFinish(finish)}
                className={`px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase transition-all whitespace-nowrap ${
                  selectedFinish === finish
                    ? "bg-white text-roselle-dark font-bold shadow-sm"
                    : "bg-black/30 text-white/70 hover:text-white"
                }`}
              >
                {finish}
              </button>
            ))}
          </div>

          {/* Undertone & Sort Controls */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end text-xs">
            {/* Undertone */}
            <div className="flex items-center gap-1.5">
              <span className="text-roselle-gold font-mono uppercase">Tone:</span>
              <select
                value={selectedUndertone}
                onChange={(e) => setSelectedUndertone(e.target.value)}
                className="bg-black/40 border border-white/20 rounded-lg px-2.5 py-1 text-white focus:outline-none focus:border-roselle-gold uppercase text-[11px]"
              >
                <option value="All">All Tones</option>
                <option value="Cool">Cool</option>
                <option value="Warm">Warm</option>
                <option value="Neutral">Neutral</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-1.5">
              <span className="text-roselle-gold font-mono uppercase">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black/40 border border-white/20 rounded-lg px-2.5 py-1 text-white focus:outline-none focus:border-roselle-gold text-[11px]"
              >
                <option value="featured">Featured Archive</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="hydration">Highest Hydration</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid (All 8 Shades) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredShades.map((shade: Shade) => {
            const isJustAdded = addedId === shade.id;

            return (
              <div
                key={shade.id}
                className="rounded-3xl bg-[#260308] border border-roselle-gold/20 overflow-hidden shadow-luxury-md hover:shadow-ruby-glow transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between group"
              >
                {/* Visual Stage */}
                <Link
                  href={`/product/${shade.slug}`}
                  className="relative h-64 p-6 flex flex-col justify-between overflow-hidden cursor-pointer"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, ${shade.secondaryHex}80 0%, #1a0205 100%)`,
                  }}
                >
                  <div className="flex justify-between items-center z-10">
                    <span className="font-mono text-xs font-bold text-white/70">
                      № {shade.number}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-black/40 border border-white/20 text-[9px] font-semibold uppercase tracking-widest text-roselle-gold">
                      {shade.finish}
                    </span>
                  </div>

                  {/* 3D Lipstick Miniature Graphic */}
                  <div className="my-auto mx-auto flex flex-col items-center group-hover:scale-105 transition-transform duration-500">
                    <div
                      className="w-7 h-12 rounded-t-lg shadow-md border-t border-white/40"
                      style={{ backgroundColor: shade.hex }}
                    />
                    <div className="w-8 h-2 bg-gradient-to-r from-roselle-gold to-roselle-gilt border-y border-white/30" />
                    <div
                      className="w-8 h-14 rounded-b-lg shadow-xl flex items-center justify-center"
                      style={{ backgroundColor: shade.secondaryHex }}
                    >
                      <span className="text-[7px] font-mono tracking-widest text-white/40 -rotate-90">
                        ROSELLE
                      </span>
                    </div>
                  </div>

                  {/* Micro Sensory Meter */}
                  <div className="z-10 flex justify-between text-[10px] text-white/60 font-mono">
                    <span>Hydration: {shade.sensory.hydration}%</span>
                    <span>Wear: {shade.sensory.wear}%</span>
                  </div>
                </Link>

                {/* Card Info & Actions */}
                <div className="p-5 space-y-3 bg-[#1e0206] flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <Link
                      href={`/product/${shade.slug}`}
                      className="font-serif font-bold text-xl text-white hover:text-roselle-gold transition-colors block"
                    >
                      {shade.name}
                    </Link>
                    <p className="text-xs text-white/60 line-clamp-2 font-light">
                      {shade.description}
                    </p>
                  </div>

                  {/* Pricing & Add Button */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="font-serif text-xl font-bold text-white">
                        {formatPrice(shade.salePrice)}
                      </span>
                      <span className="font-serif text-xs line-through text-white/40 ml-2">
                        {formatPrice(shade.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAdd(shade.id)}
                      className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm ${
                        isJustAdded
                          ? "bg-green-500 text-white"
                          : "bg-white text-roselle-dark hover:bg-roselle-gold hover:scale-105"
                      }`}
                      aria-label={`Add ${shade.name} to bag`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
