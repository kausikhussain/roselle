"use client";

import React, { useState } from "react";
import { ROSELLE_SHADES, Shade } from "@/data/shades";
import { useCart } from "@/context/CartContext";
import { Sparkles, ShoppingBag, Eye, Check } from "lucide-react";

interface SkinTone {
  id: string;
  name: string;
  hex: string;
  undertone: string;
}

const SKIN_TONES: SkinTone[] = [
  { id: "fair", name: "Fair 01", hex: "#F7D8CA", undertone: "Cool Rose" },
  { id: "light", name: "Light 02", hex: "#ECC4AF", undertone: "Warm Peach" },
  { id: "medium", name: "Medium 03", hex: "#D6A37F", undertone: "Golden Honey" },
  { id: "tan", name: "Tan 04", hex: "#B87F58", undertone: "Warm Amber" },
  { id: "deep", name: "Deep 05", hex: "#875338", undertone: "Rich Bronze" },
  { id: "rich", name: "Rich 06", hex: "#482619", undertone: "Deep Espresso" },
];

interface ShadeFinderSectionProps {
  onSelect3DShade?: (index: number) => void;
}

export default function ShadeFinderSection({ onSelect3DShade }: ShadeFinderSectionProps) {
  const { addItem, openBag } = useCart();
  const [selectedSkin, setSelectedSkin] = useState<SkinTone>(SKIN_TONES[1]);
  const [selectedShadeIndex, setSelectedShadeIndex] = useState<number>(0);

  const activeShade = ROSELLE_SHADES[selectedShadeIndex] || ROSELLE_SHADES[0];

  const handleSeeIn3D = () => {
    if (onSelect3DShade) {
      onSelect3DShade(selectedShadeIndex);
    }
    const saleEl = document.getElementById("sale");
    if (saleEl) {
      saleEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAddToBag = () => {
    addItem(activeShade.id, 1);
    openBag();
  };

  return (
    <section id="finder" className="relative py-32 px-6 md:px-12 bg-[#190308] text-roselle-cream overflow-hidden">
      {/* Head */}
      <div className="max-w-4xl mx-auto text-center mb-16 space-y-3">
        <span className="text-xs uppercase font-mono tracking-[0.25em] text-roselle-gold flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" /> Virtual Try-On Atelier • Photoreal SVG Lab
        </span>
        <h2 className="font-serif text-4xl sm:text-6xl font-light text-white">
          The Shade Finder
        </h2>
        <p className="text-sm text-roselle-cream/70 max-w-md mx-auto">
          Calibrated across six global skin undertones. Watch the botanical pigment blend against your skin tone in real-time.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Photoreal Lip SVG & Arm Swatch */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden bg-[#100104] border border-roselle-gold/25 shadow-2xl p-6 flex flex-col justify-between">
            {/* SVG Photoreal Lip Canvas */}
            <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
              <defs>
                {/* Skin radial gradient */}
                <radialGradient id="skinGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={selectedSkin.hex} />
                  <stop offset="100%" stopColor="#25040B" stopOpacity="0.8" />
                </radialGradient>

                {/* Lip color fill gradient */}
                <linearGradient id="lipFillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={activeShade.hex} />
                  <stop offset="100%" stopColor={activeShade.secondaryHex} />
                </linearGradient>

                {/* Gloss Reflection Highlight */}
                <linearGradient id="lipGloss" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
                  <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Skin Base */}
              <rect width="400" height="400" rx="30" fill="url(#skinGrad)" />

              {/* Philtrum Ridge Shadows */}
              <path d="M 190 100 L 195 180 M 210 100 L 205 180" stroke="rgba(0,0,0,0.06)" strokeWidth="3" />

              {/* Upper Lip Contour (Distinct Cupid's Bow) */}
              <path
                d="M 100 200 
                   C 130 170, 170 160, 190 170 
                   C 196 174, 200 180, 200 180 
                   C 200 180, 204 174, 210 170 
                   C 230 160, 270 170, 300 200 
                   C 270 210, 230 204, 210 202
                   C 204 201, 200 203, 200 203
                   C 200 203, 196 201, 190 202
                   C 170 204, 130 210, 100 200 Z"
                fill="url(#lipFillGrad)"
                className="transition-all duration-300"
              />

              {/* Lower Lip Contour */}
              <path
                d="M 100 200
                   C 130 210, 170 204, 200 204
                   C 230 204, 270 210, 300 200
                   C 285 260, 245 285, 200 285
                   C 155 285, 115 260, 100 200 Z"
                fill="url(#lipFillGrad)"
                className="transition-all duration-300"
              />

              {/* Central Aperture Crease */}
              <path
                d="M 102 200 C 150 208, 180 202, 200 205 C 220 202, 250 208, 298 200"
                stroke="rgba(0,0,0,0.6)"
                strokeWidth="2"
                fill="none"
              />

              {/* Lip Creases */}
              <g opacity="0.3" stroke="rgba(0,0,0,0.4)" strokeWidth="1" strokeLinecap="round">
                <path d="M 160 215 L 165 255" />
                <path d="M 185 210 L 187 270" />
                <path d="M 200 210 L 200 274" />
                <path d="M 215 210 L 213 270" />
                <path d="M 240 215 L 235 255" />
              </g>

              {/* Specular Plump Gloss Highlight */}
              <ellipse
                cx="200"
                cy="245"
                rx="45"
                ry="14"
                fill="url(#lipGloss)"
                opacity={activeShade.finish === "Gloss" ? "0.9" : activeShade.finish === "Satin" ? "0.5" : "0.2"}
              />
            </svg>

            {/* Floating Live Arm Swatch Chip */}
            <div className="absolute bottom-6 right-6 p-3 rounded-2xl bg-black/80 border border-roselle-gold/25 backdrop-blur-md shadow-xl flex items-center gap-3">
              <div
                className="w-12 h-6 rounded-md shadow-inner transition-colors duration-300"
                style={{ backgroundColor: activeShade.hex }}
              />
              <div className="text-[10px]">
                <span className="text-roselle-cream/60 uppercase tracking-wider block">Arm Swatch</span>
                <span className="font-semibold text-white block">{selectedSkin.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Selectors & Product Details */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#20040B]/85 border border-roselle-gold/25 backdrop-blur-2xl shadow-2xl space-y-6">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-serif text-3xl font-normal text-white">
                  {activeShade.name}
                </h3>
                <span className="font-serif text-2xl font-bold text-roselle-gold font-mono">
                  ${activeShade.salePrice.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-roselle-cream/60 mt-1">
                {activeShade.finish} Finish • {activeShade.subheadline}
              </p>
            </div>

            {/* 1. Skin Tone Dots */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="uppercase tracking-wider text-roselle-cream font-semibold">Select Skin Tone</span>
                <span className="text-roselle-gold font-mono">{selectedSkin.name} ({selectedSkin.undertone})</span>
              </div>
              <div className="flex gap-3">
                {SKIN_TONES.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => setSelectedSkin(tone)}
                    className={`w-9 h-9 rounded-full transition-all transform ${
                      tone.id === selectedSkin.id
                        ? "scale-125 ring-2 ring-roselle-gold ring-offset-2 ring-offset-[#190308]"
                        : "opacity-70 hover:opacity-100 hover:scale-110"
                    }`}
                    style={{ backgroundColor: tone.hex }}
                    title={`${tone.name} • ${tone.undertone}`}
                  />
                ))}
              </div>
            </div>

            {/* 2. Formulation Shade Pills */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="uppercase tracking-wider text-roselle-cream font-semibold">Choose Formulation</span>
                <span className="text-roselle-gold font-mono">Shade {activeShade.number} of 08</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ROSELLE_SHADES.map((shade, idx) => (
                  <button
                    key={shade.id}
                    onClick={() => setSelectedShadeIndex(idx)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      idx === selectedShadeIndex
                        ? "bg-roselle-gold/20 border-roselle-gold text-white shadow-md"
                        : "bg-white/5 border-white/10 text-roselle-cream/70 hover:border-white/30"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: shade.hex }}
                    />
                    <span className="text-xs font-semibold truncate">{shade.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-roselle-gold/15 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSeeIn3D}
                className="flex-1 py-3.5 rounded-full bg-white/5 border border-roselle-gold/30 hover:border-roselle-gold text-roselle-cream text-xs uppercase font-semibold tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <Eye className="w-4 h-4 text-roselle-gold" />
                <span>See It in 3D Atelier</span>
              </button>

              <button
                onClick={handleAddToBag}
                className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-roselle-ruby to-[#8F1023] hover:from-[#d12448] hover:to-roselle-ruby text-white text-xs uppercase font-semibold tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-roselle-ruby/30 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Vanity</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

