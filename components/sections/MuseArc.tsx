"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ROSELLE_MUSES, Muse } from "@/data/muses";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { MoveLeft, MoveRight, Plus, Sparkles, ArrowRight } from "lucide-react";

export default function MuseArc() {
  const { addItem } = useCart();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll left/right helper
  const handleScrollBy = (amount: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section
      id="muses"
      className="relative min-h-screen py-24 px-4 sm:px-8 flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Editorial Corner Plus Marks */}
      <div className="absolute top-6 left-6 text-white/30 text-sm font-mono">+</div>
      <div className="absolute top-6 right-6 text-white/30 text-sm font-mono">+</div>

      {/* Top Editorial Header */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6 z-20">
        <div>
          <div className="text-xs uppercase tracking-ultra text-roselle-gold font-semibold mb-2">
            Ten Portraits • Eight Shades
          </div>
          <h2 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-white">
            WORN BY{" "}
            <span className="font-serif italic font-normal gold-gradient-text">
              muses
            </span>
          </h2>
        </div>

        <div className="max-w-md text-left md:text-right space-y-2">
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            Ten faces, eight Roselle shades — from nudes to noir, the way they&apos;re meant to be
            worn. Pause on a portrait, add its shade to your bag.
          </p>
          <div className="text-[10px] uppercase tracking-ultra text-roselle-gold flex items-center md:justify-end gap-2">
            <MoveLeft className="w-3 h-3" />
            <span>Drag or flick to explore</span>
            <MoveRight className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Center: Draggable Curved Arc Carousel */}
      <div
        ref={carouselRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="my-10 overflow-x-auto flex gap-6 px-4 sm:px-12 py-6 no-scrollbar cursor-grab active:cursor-grabbing z-20"
      >
        {ROSELLE_MUSES.map((muse: Muse, index: number) => {
          // Subtle arc rotation based on position
          const rotationAngle = (index % 2 === 0 ? -1.5 : 1.5);

          return (
            <div
              key={muse.id}
              style={{ transform: `rotate(${rotationAngle}deg)` }}
              className="w-[280px] sm:w-[320px] flex-shrink-0 rounded-3xl bg-[#2a0309] border border-roselle-gold/25 p-5 shadow-luxury-md hover:shadow-ruby-glow transition-all duration-500 hover:-translate-y-3 group flex flex-col justify-between"
            >
              {/* Top Meta */}
              <div className="flex justify-between items-center mb-4">
                <span className="w-8 h-8 rounded-full bg-black/40 border border-white/20 flex items-center justify-center font-mono text-xs font-bold text-white">
                  {muse.number}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-roselle-gold">
                  {muse.category} • {muse.finish}
                </span>
              </div>

              {/* Portrait Visual Representation */}
              <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-b from-[#3d040c] to-[#1a0205] border border-white/10 flex items-center justify-center mb-4 group-hover:scale-[1.02] transition-transform duration-500">
                {muse.image ? (
                  <>
                    <img
                      src={muse.image}
                      alt={muse.title}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2a0309] via-transparent to-black/20" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="font-serif italic text-sm text-white drop-shadow-md">
                        {muse.title}
                      </span>
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/60 shadow-sm"
                        style={{ backgroundColor: muse.shadeHex }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Editorial Model Aesthetic Graphic */}
                    <div
                      className="w-24 h-24 rounded-full blur-2xl opacity-40 group-hover:opacity-75 transition-opacity"
                      style={{ backgroundColor: muse.shadeHex }}
                    />
                    {/* Lip Silhouette / Portrait Center Motif */}
                    <div className="relative text-center p-4">
                      <div
                        className="w-16 h-8 mx-auto rounded-full border border-white/40 mb-3 shadow-inner group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: muse.shadeHex }}
                      />
                      <span className="font-serif italic text-lg text-white/90 drop-shadow">
                        {muse.title}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Card Body */}
              <div className="space-y-2 mb-4">
                <h3 className="font-serif font-bold text-lg text-white group-hover:text-roselle-gold transition-colors">
                  {muse.title}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  {muse.blurb}
                </p>
              </div>

              {/* Card Footer: Shade Tag & Add Button */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full border border-white/40"
                    style={{ backgroundColor: muse.shadeHex }}
                  />
                  <div>
                    <div className="text-[10px] font-bold text-white uppercase tracking-wider">
                      {muse.shadeName}
                    </div>
                    <div className="text-xs font-serif text-roselle-gold">
                      {formatPrice(muse.price)}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => addItem(muse.shadeId, 1)}
                  className="px-3 py-1.5 rounded-full bg-white text-roselle-dark hover:bg-roselle-gold text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm transition-all hover:scale-105"
                  aria-label={`Add ${muse.shadeName} to bag`}
                >
                  <span>Add</span>
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Looping Editorial Ticker Ribbon */}
      <div className="w-full overflow-hidden border-y border-roselle-gold/25 py-3 my-4 bg-black/20 z-20">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="font-serif text-lg sm:text-xl tracking-wider text-white/90 mx-6">
            <span className="font-bold">Kiss often.</span> <span className="italic font-light text-roselle-gold">Stay bold.</span> ✦ <span className="font-bold">One swipe.</span> <span className="italic font-light text-roselle-gold">All eyes.</span> ✦ <span className="font-bold">Ten muses.</span> <span className="italic font-light text-roselle-gold">Eight shades.</span> ✦ <span className="font-bold">Kiss often.</span> <span className="italic font-light text-roselle-gold">Stay bold.</span> ✦ <span className="font-bold">One swipe.</span> <span className="italic font-light text-roselle-gold">All eyes.</span>
          </span>
          <span className="font-serif text-lg sm:text-xl tracking-wider text-white/90 mx-6">
            <span className="font-bold">Kiss often.</span> <span className="italic font-light text-roselle-gold">Stay bold.</span> ✦ <span className="font-bold">One swipe.</span> <span className="italic font-light text-roselle-gold">All eyes.</span> ✦ <span className="font-bold">Ten muses.</span> <span className="italic font-light text-roselle-gold">Eight shades.</span> ✦ <span className="font-bold">Kiss often.</span> <span className="italic font-light text-roselle-gold">Stay bold.</span> ✦ <span className="font-bold">One swipe.</span> <span className="italic font-light text-roselle-gold">All eyes.</span>
          </span>
        </div>
      </div>

      {/* Bottom CTA Row: Shop All Shades & Find Your Match */}
      <div className="max-w-md mx-auto flex items-center justify-center gap-4 z-20 pt-4">
        <Link
          href="/shop"
          className="px-6 py-3 rounded-full bg-white text-roselle-dark font-semibold text-xs uppercase tracking-ultra hover:bg-roselle-gold transition-all shadow-luxury-md hover:scale-105"
        >
          Shop all shades
        </Link>
        <a
          href="#finder"
          className="px-6 py-3 rounded-full border border-roselle-gold/40 hover:border-roselle-gold text-white font-semibold text-xs uppercase tracking-ultra hover:bg-roselle-gold/15 transition-all shadow-luxury-sm hover:scale-105"
        >
          Find your match
        </a>
      </div>
    </section>
  );
}
