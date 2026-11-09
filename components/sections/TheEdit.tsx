"use client";

import React, { useState } from "react";
import { ROSELLE_SHADES, Shade } from "@/data/shades";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Plus, Sparkles, Check } from "lucide-react";

// Pedestal layout matching screenshot 11
interface PedestalConfig {
  id: string;
  shadeId: string;
  numberTag: string;
  height: string; // CSS height
  width: string;  // CSS width
  yOffset: string;
  xOffset: string;
  order: number;
}

const PEDESTALS: PedestalConfig[] = [
  { id: "p-03", shadeId: "03", numberTag: "№ 03", height: "h-32", width: "w-32 sm:w-36", yOffset: "mt-32", xOffset: "", order: 1 },
  { id: "p-08", shadeId: "04", numberTag: "№ 08", height: "h-44", width: "w-32 sm:w-36", yOffset: "mt-20", xOffset: "", order: 2 },
  { id: "p-01", shadeId: "01", numberTag: "№ 01", height: "h-64", width: "w-36 sm:w-44", yOffset: "mt-0", xOffset: "", order: 3 },
  { id: "p-04", shadeId: "02", numberTag: "№ 04", height: "h-36", width: "w-32 sm:w-36", yOffset: "mt-28", xOffset: "", order: 4 },
  { id: "p-05", shadeId: "05", numberTag: "№ 05", height: "h-52", width: "w-32 sm:w-36", yOffset: "mt-12", xOffset: "", order: 5 },
  { id: "p-07", shadeId: "06", numberTag: "№ 07", height: "h-40", width: "w-32 sm:w-36", yOffset: "mt-24", xOffset: "", order: 6 },
];

export default function TheEdit() {
  const [hoveredShadeId, setHoveredShadeId] = useState<string | null>("04"); // Default preview
  const [justAddedShadeId, setJustAddedShadeId] = useState<string | null>(null);
  const { addItem } = useCart();

  const handleAdd = (shadeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(shadeId, 1);
    setJustAddedShadeId(shadeId);
    setTimeout(() => setJustAddedShadeId(null), 1600);
  };

  const activeShade = ROSELLE_SHADES.find((s) => s.id === hoveredShadeId) || ROSELLE_SHADES[3];

  return (
    <section
      id="edit"
      className="relative min-h-screen py-24 px-4 sm:px-8 flex flex-col justify-between overflow-hidden select-none bg-[#38040a]"
    >
      {/* Corner Registration Marks */}
      <div className="absolute top-6 left-6 text-white/30 text-sm font-mono">+</div>
      <div className="absolute top-6 right-6 text-white/30 text-sm font-mono">+</div>
      <div className="absolute bottom-6 left-6 text-white/30 text-sm font-mono">+</div>
      <div className="absolute bottom-6 right-6 text-white/30 text-sm font-mono">+</div>

      {/* Top Editorial Header */}
      <div className="max-w-7xl mx-auto w-full text-center z-20 space-y-2 mb-4">
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
          Top 7 Roselle Shades for Winter 2026
        </h2>
        <p className="text-[11px] uppercase tracking-ultra text-roselle-gold/80 font-semibold">
          Hover a shade to meet it • + to bag
        </p>
      </div>

      {/* Staged Studio Pedestal Still Life Environment */}
      <div className="relative w-full max-w-6xl mx-auto my-auto z-20 flex flex-col items-center justify-center min-h-[500px]">
        {/* Architectural Atelier Still Life Photography Backdrop */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none select-none overflow-hidden rounded-3xl">
          <img
            src="/assets/images/still-life-pedestals.jpg"
            alt="Roselle Still Life Atelier Pedestals"
            className="w-full h-full object-cover filter brightness-75 contrast-125 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#38040a] via-[#38040a]/70 to-[#38040a]/40" />
        </div>

        {/* Hover Inspection Glass Tooltip Card */}
        {activeShade && (
          <div className="absolute top-4 left-6 sm:left-16 z-30 p-4 rounded-2xl bg-[#210206]/90 border border-roselle-gold/40 shadow-2xl backdrop-blur-md flex items-center gap-4 transition-all duration-300 animate-fadeIn">
            <div className="space-y-1">
              <div className="text-[9px] uppercase tracking-widest font-mono text-roselle-gold">
                № {activeShade.number} • {activeShade.finish}
              </div>
              <h4 className="font-serif italic text-xl text-white">
                {activeShade.name}
              </h4>
              <div className="text-[11px] text-white/70 flex items-center gap-3">
                <span>{activeShade.subheadline}</span>
                <span className="font-serif font-bold text-roselle-gold">
                  {formatPrice(activeShade.salePrice)}
                </span>
              </div>
            </div>

            <button
              onClick={(e) => handleAdd(activeShade.id, e)}
              className={`w-9 h-9 rounded-full flex items-center justify-center shadow-luxury-md transition-all ${
                justAddedShadeId === activeShade.id
                  ? "bg-green-500 text-white"
                  : "bg-roselle-petal hover:bg-white text-white hover:text-roselle-dark hover:scale-110"
              }`}
              aria-label={`Add ${activeShade.name} to bag`}
            >
              {justAddedShadeId === activeShade.id ? (
                <Check className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </button>
          </div>
        )}

        {/* Row of Staggered Cream Pedestals */}
        <div className="flex items-end justify-center gap-2 sm:gap-4 md:gap-6 pt-24 px-4 overflow-x-auto no-scrollbar w-full">
          {PEDESTALS.map((p) => {
            const shade = ROSELLE_SHADES.find((s) => s.id === p.shadeId) || ROSELLE_SHADES[0];
            const isHovered = hoveredShadeId === shade.id;

            return (
              <div
                key={p.id}
                onMouseEnter={() => setHoveredShadeId(shade.id)}
                onClick={() => setHoveredShadeId(shade.id)}
                className="flex flex-col items-center cursor-pointer group flex-shrink-0"
              >
                {/* 3D Lipstick on top of Pedestal */}
                <div
                  className={`flex flex-col items-center transition-transform duration-500 mb-2 ${
                    isHovered ? "-translate-y-4 scale-110" : "group-hover:-translate-y-2"
                  }`}
                >
                  {/* Exposed Bullet or Cap */}
                  <div
                    className="w-6 h-10 rounded-t-md shadow-md border-t border-white/40"
                    style={{ backgroundColor: shade.hex }}
                  />
                  {/* Gold Collar */}
                  <div className="w-8 h-2 bg-gradient-to-r from-roselle-gold to-roselle-gilt" />
                  {/* Casing Base */}
                  <div
                    className="w-8 h-14 rounded-b-md shadow-lg flex items-center justify-center"
                    style={{ backgroundColor: shade.secondaryHex }}
                  >
                    <span className="text-[7px] font-mono tracking-widest text-white/50 -rotate-90">
                      ROSELLE
                    </span>
                  </div>
                </div>

                {/* Pedestal Block (Warm Cream Concrete Architecture) */}
                <div
                  className={`${p.width} ${p.height} rounded-t-sm bg-gradient-to-b from-[#dfd7ca] to-[#c7bdae] border-t border-x border-[#f0eae1] shadow-2xl flex flex-col items-center justify-start pt-3 transition-colors duration-300 ${
                    isHovered ? "ring-2 ring-roselle-gold" : ""
                  }`}
                >
                  <span className="font-mono text-xs italic tracking-wider text-[#695d4e]">
                    {p.numberTag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-[10px] uppercase font-mono tracking-widest text-white/50 pt-4 border-t border-white/10 z-20">
        <span>Scroll 090%</span>
        <span>Shade 05 / 08 • Twist 540°</span>
      </div>
    </section>
  );
}
