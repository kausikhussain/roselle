"use client";

import React, { useState } from "react";
import { ROSELLE_SHADES, Shade } from "@/data/shades";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, Plus, Sparkles, Check } from "lucide-react";

interface SkinTone {
  id: string;
  name: string;
  baseHex: string;
  shadowHex: string;
  highlightHex: string;
}

const SKIN_TONES: SkinTone[] = [
  { id: "fair", name: "Fair Porcelain", baseHex: "#FCE7DC", shadowHex: "#E5C2B4", highlightHex: "#FFF5EF" },
  { id: "light", name: "Light Sand", baseHex: "#F2D3BE", shadowHex: "#D8AB92", highlightHex: "#FDF0E7" },
  { id: "honey", name: "Honey", baseHex: "#DEB088", shadowHex: "#BE885C", highlightHex: "#EED0B4" },
  { id: "tan", name: "Warm Tan", baseHex: "#B88358", shadowHex: "#945F34", highlightHex: "#CDA07A" },
  { id: "deep-tan", name: "Deep Bronze", baseHex: "#8C5835", shadowHex: "#673A1B", highlightHex: "#A97652" },
  { id: "rich-deep", name: "Rich Espresso", baseHex: "#52321D", shadowHex: "#371E0E", highlightHex: "#6F4B32" },
];

interface ShadeFinderProps {
  onSeeIn3D?: (shadeId: string) => void;
}

export default function ShadeFinder({ onSeeIn3D }: ShadeFinderProps) {
  const [selectedSkinToneId, setSelectedSkinToneId] = useState("honey");
  const [selectedShadeId, setSelectedShadeId] = useState("01");
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const skinTone = SKIN_TONES.find((s) => s.id === selectedSkinToneId) || SKIN_TONES[2];
  const shade: Shade = ROSELLE_SHADES.find((s) => s.id === selectedShadeId) || ROSELLE_SHADES[0];

  const handleAdd = () => {
    addItem(shade.id, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleSee3D = () => {
    if (onSeeIn3D) {
      onSeeIn3D(shade.id);
    } else {
      const el = document.getElementById("sale");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="finder"
      className="relative min-h-screen py-24 px-4 sm:px-8 flex flex-col justify-between overflow-hidden select-none bg-[#240308]"
    >
      {/* Corner Registration Marks */}
      <div className="absolute top-6 left-6 text-white/30 text-sm font-mono">+</div>
      <div className="absolute top-6 right-6 text-white/30 text-sm font-mono">+</div>
      <div className="absolute bottom-6 left-6 text-white/30 text-sm font-mono">+</div>
      <div className="absolute bottom-6 right-6 text-white/30 text-sm font-mono">+</div>

      {/* Top Header */}
      <div className="max-w-7xl mx-auto w-full z-20 space-y-2 mb-8">
        <div className="text-xs uppercase tracking-ultra text-roselle-gold font-semibold">
          Try It On • Virtual Atelier Lab
        </div>
        <h2 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-white">
          FIND YOUR{" "}
          <span className="font-serif italic font-normal gold-gradient-text">
            match
          </span>
        </h2>
      </div>

      {/* Main Studio Interactive Stage */}
      <div className="max-w-7xl mx-auto w-full flex-1 my-auto z-20 rounded-[36px] bg-[#1a0205] border border-roselle-gold/25 p-6 sm:p-10 shadow-2xl flex flex-col lg:flex-row items-center gap-10">
        {/* Left: Photorealistic SVG + Canvas Procedural Lip Try-On Box */}
        <div
          className="relative w-full lg:w-1/2 aspect-[4/3] rounded-3xl overflow-hidden shadow-inner border border-white/10 flex items-center justify-center"
          style={{
            background: `radial-gradient(ellipse at center, ${skinTone.highlightHex} 0%, ${skinTone.baseHex} 65%, ${skinTone.shadowHex} 100%)`,
          }}
        >
          {/* Subtle Skin Texture / Pore Noise Overlay */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(#000 1px, transparent 1px), radial-gradient(#000 1px, transparent 1px)",
              backgroundSize: "8px 8px",
              backgroundPosition: "0 0, 4px 4px",
            }}
          />

          {/* Anatomical Procedural SVG Lips */}
          <svg
            className="w-4/5 max-w-[420px] transition-all duration-700 drop-shadow-[0_15px_25px_rgba(0,0,0,0.45)]"
            viewBox="0 0 500 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Dynamic Lip Color Gradient */}
              <linearGradient id="lipGradient" x1="250" y1="50" x2="250" y2="250" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={shade.hex} stopOpacity="0.95" />
                <stop offset="50%" stopColor={shade.secondaryHex} />
                <stop offset="100%" stopColor={shade.hex} stopOpacity="0.9" />
              </linearGradient>

              {/* Lip Volume Crease Filter */}
              <linearGradient id="creaseGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#000" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#fff" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#000" stopOpacity="0.4" />
              </linearGradient>

              {/* Specular Gloss Highlight */}
              <radialGradient id="specularGloss" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff" stopOpacity={shade.finish === "Gloss" ? "0.75" : shade.finish === "Satin" ? "0.4" : "0.15"} />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Upper Lip Contour Path with Cupid's Bow */}
            <path
              d="M 60,150 C 120,110 190,95 235,115 C 245,120 255,120 265,115 C 310,95 380,110 440,150 C 390,165 310,175 250,172 C 190,175 110,165 60,150 Z"
              fill="url(#lipGradient)"
              className="transition-colors duration-500"
            />

            {/* Lower Lip Contour Path */}
            <path
              d="M 60,150 C 120,168 190,172 250,172 C 310,172 380,168 440,150 C 410,210 340,250 250,250 C 160,250 90,210 60,150 Z"
              fill="url(#lipGradient)"
              className="transition-colors duration-500"
            />

            {/* Natural Lip Center Oral Crease / Shadow */}
            <path
              d="M 60,150 C 150,170 350,170 440,150 C 350,162 150,162 60,150 Z"
              fill="#180104"
              opacity="0.85"
            />

            {/* Realistic Vertical Texture Micro-Creases */}
            <g stroke="#260206" strokeWidth="1.2" opacity="0.35">
              <line x1="160" y1="175" x2="158" y2="215" />
              <line x1="200" y1="176" x2="198" y2="230" />
              <line x1="230" y1="176" x2="228" y2="242" />
              <line x1="250" y1="177" x2="250" y2="246" />
              <line x1="270" y1="176" x2="272" y2="242" />
              <line x1="300" y1="176" x2="302" y2="230" />
              <line x1="340" y1="175" x2="342" y2="215" />
            </g>

            {/* Specular Lower Lip Volumetric Highlight */}
            <ellipse
              cx="250"
              cy="205"
              rx="90"
              ry="25"
              fill="url(#specularGloss)"
              className="transition-opacity duration-500"
            />
          </svg>

          {/* Realistic Arm Swatch Chip in Bottom Right Corner */}
          <div
            className="absolute bottom-4 right-4 p-3 rounded-2xl shadow-xl border border-white/20 flex flex-col items-center gap-1.5 transition-all duration-500"
            style={{ backgroundColor: `${skinTone.baseHex}f0` }}
          >
            {/* Wavy Lipstick Swipe */}
            <svg className="w-24 h-6" viewBox="0 0 100 24" fill="none">
              <path
                d="M 5,12 C 25,4 45,20 65,8 C 75,2 90,16 95,12"
                stroke={shade.hex}
                strokeWidth="7"
                strokeLinecap="round"
                className="transition-colors duration-500"
              />
            </svg>
            <span
              className="text-[9px] font-mono uppercase tracking-widest font-bold"
              style={{ color: skinTone.shadowHex }}
            >
              Arm Swatch
            </span>
          </div>
        </div>

        {/* Right: Controls, Skin Tone Palette & Shade Pills */}
        <div className="w-full lg:w-1/2 space-y-6">
          {/* Header Row: Shade Name & 3D Sync Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-roselle-petal">
                {shade.name}
              </h3>
              <p className="text-xs uppercase tracking-ultra text-white/70 mt-1">
                {shade.finish} • {shade.subheadline} • {formatPrice(shade.salePrice)}
              </p>
            </div>

            <button
              onClick={handleSee3D}
              className="px-5 py-2.5 rounded-full bg-white text-roselle-dark font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-roselle-gold transition-all shadow-luxury-sm hover:scale-105"
            >
              <span>See it in 3D</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Skin Tone Selection Row */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono uppercase tracking-widest text-roselle-gold font-bold">
                Skin Tone
              </span>
              <span className="text-white/60 font-serif italic">{skinTone.name}</span>
            </div>

            <div className="flex items-center gap-3">
              {SKIN_TONES.map((tone) => {
                const isSelected = tone.id === selectedSkinToneId;
                return (
                  <button
                    key={tone.id}
                    onClick={() => setSelectedSkinToneId(tone.id)}
                    style={{ backgroundColor: tone.baseHex }}
                    className={`w-9 h-9 rounded-full transition-all duration-300 relative flex items-center justify-center ${
                      isSelected
                        ? "ring-2 ring-roselle-gold ring-offset-2 ring-offset-[#1a0205] scale-110 shadow-gold-glow"
                        : "opacity-75 hover:opacity-100 hover:scale-105"
                    }`}
                    aria-label={`Select ${tone.name} skin tone`}
                  />
                );
              })}
            </div>
          </div>

          {/* Shade Selection Pills (All 8 Shades) */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono uppercase tracking-widest text-roselle-gold font-bold">
              Shade Archive
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {ROSELLE_SHADES.map((s) => {
                const isSelected = s.id === selectedShadeId;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedShadeId(s.id)}
                    className={`px-3 py-2 rounded-xl text-left border flex items-center gap-2 transition-all ${
                      isSelected
                        ? "bg-white text-roselle-dark font-bold border-white shadow-luxury-sm scale-102"
                        : "bg-black/30 text-white/80 border-white/10 hover:border-roselle-gold/40"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20 flex-shrink-0"
                      style={{ backgroundColor: s.hex }}
                    />
                    <span className="text-[10px] uppercase tracking-wider truncate">
                      {s.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Action: Add To Bag for Current Shade */}
          <div className="pt-4 flex items-center gap-4">
            <button
              onClick={handleAdd}
              className={`flex-1 py-3.5 rounded-full text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-luxury-md transition-all ${
                justAdded
                  ? "bg-green-500 text-white"
                  : "bg-gradient-to-r from-[#e62e6b] to-[#b21d3b] hover:from-[#f04580] hover:to-[#c72547] text-white hover:scale-102"
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add {shade.name} to Bag ({formatPrice(shade.salePrice)})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
