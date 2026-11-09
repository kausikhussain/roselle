"use client";

import React from "react";
import { Sparkles, Check, ChevronRight } from "lucide-react";

interface InsideSectionProps {
  activeChapter: number; // 1 to 4
  onChapterChange: (chapter: number) => void;
}

const CHAPTERS_DATA = [
  {
    num: "01",
    id: 1,
    title: "The Case",
    subtitle: "Fluted Flacon & 400g Neodymium Snap",
    body: "Machined from a single solid billet of aerospace aluminum, hand-polished and coated in triple-layer deep burgundy lacquer. Engineered with a precision 400g magnetic closure that produces an iconic, satisfying hermetic acoustic click.",
    specs: ["Weight: 42g Solid Balanced Core", "Acoustic: 400g Hermetic Magnetic Snap", "Finish: 7-Coat Piano Lacquer"],
    hotspots: [
      { label: "Triple-Dip Lacquer Cap", position: "Top Cap" },
      { label: "Neodymium Magnetic Core", position: "Base Collar" }
    ]
  },
  {
    num: "02",
    id: 2,
    title: "The Twist",
    subtitle: "Helical Brass Rifling",
    body: "Engineered in Geneva, our dual-track helical glide mechanism guarantees whisper-silent, hydraulic-damped extension with zero lateral wobble or mechanical backlash across 10,000 rotations.",
    specs: ["Tolerance: 0.02mm Micrometric Fit", "Material: 18k Spun Rose Gold Collar", "Glide: Hydraulic Damped Rifling"],
    hotspots: [
      { label: "18k Spun Rose Gold Ring", position: "Mid Band" },
      { label: "Micro-Helical Barrel", position: "Inner Core" }
    ]
  },
  {
    num: "03",
    id: 3,
    title: "The Formula",
    subtitle: "Clean Botanical Micro-Infusion",
    body: "Suspended in organic cold-pressed wild rose-hip seed oil, West African fair-trade shea butter, and antioxidant vitamin E. Triple-milled mineral pigments melt upon lip temperature contact for effortless, non-dragging glide.",
    specs: ["100% Clean, Vegan & Cruelty-Free", "Omega 3, 6, 9 Barrier Repair", "Triple-Milled 4-Micron Pigment"],
    hotspots: [
      { label: "Cold-Pressed Rosehip Seed", position: "Left Orbit" },
      { label: "Triple-Milled Pigment", position: "Right Orbit" }
    ]
  },
  {
    num: "04",
    id: 4,
    title: "The Finish",
    subtitle: "Architectural 30° Teardrop Bevel",
    body: "The lipstick bullet is sculpted with a proprietary 30° ergonomic angle that naturally mirrors the Cupid's bow contour. Provides razor-sharp edge precision and full opaque saturation in a single uninterrupted stroke.",
    specs: ["Bevel: 30° Anatomical Contour", "Coverage: Single-Stroke Opaque Saturation", "Finish: Light-Diffusing Velvet Mesh"],
    hotspots: [
      { label: "30° Teardrop Contour", position: "Bullet Tip" },
      { label: "Velvet Cushion Matrix", position: "Facet Surface" }
    ]
  }
];

export default function InsideSection({ activeChapter, onChapterChange }: InsideSectionProps) {
  const currentChapter = CHAPTERS_DATA[activeChapter - 1] || CHAPTERS_DATA[0];

  return (
    <section id="inside" className="relative min-h-screen py-24 px-6 md:px-12 flex items-center overflow-hidden">
      {/* Background Arch Frame Ambient Glow */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[700px] rounded-t-full border border-roselle-gold/20 pointer-events-none opacity-40 shadow-[0_0_100px_rgba(229,169,149,0.1)]" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left: Spacer reserved for the 3D Canvas Lipstick & Arch */}
        <div className="lg:col-span-6 h-[400px] sm:h-[500px] lg:h-[600px] pointer-events-none relative">
          {/* Visual Hotspots Overlay */}
          <div className="absolute inset-0 flex flex-col justify-around p-8">
            {currentChapter.hotspots.map((spot, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2 p-2 px-3 rounded-xl bg-black/60 border border-roselle-gold/30 backdrop-blur-md text-[11px] text-roselle-cream max-w-max shadow-lg transform hover:scale-105 transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-roselle-gold animate-ping" />
                <span className="font-semibold text-white">{spot.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Chapter Narrative Card */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#1F040A]/85 border border-roselle-gold/25 backdrop-blur-2xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-roselle-gold/15 pb-4">
              <span className="text-xs uppercase font-mono tracking-widest text-roselle-gold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" /> Inside the Atelier • Chapter {currentChapter.num}
              </span>
              <span className="font-serif text-3xl font-light text-roselle-gold/60">
                {currentChapter.num} / 04
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
                {currentChapter.title}
              </h2>
              <p className="font-serif text-lg italic text-roselle-gold font-light">
                {currentChapter.subtitle}
              </p>
            </div>

            <p className="text-sm text-roselle-cream/80 leading-relaxed">
              {currentChapter.body}
            </p>

            {/* Technical Specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentChapter.specs.map((spec, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-roselle-cream/90"
                >
                  <Check className="w-3.5 h-3.5 text-roselle-gold flex-shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            {/* Chapter Navigation Tabs */}
            <div className="pt-6 border-t border-roselle-gold/15 grid grid-cols-4 gap-2">
              {CHAPTERS_DATA.map((ch) => {
                const isActive = ch.id === activeChapter;
                return (
                  <button
                    key={ch.id}
                    onClick={() => onChapterChange(ch.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isActive
                        ? "bg-roselle-gold/20 border-roselle-gold text-white shadow-lg"
                        : "bg-white/5 border-white/10 text-roselle-cream/60 hover:border-white/30"
                    }`}
                  >
                    <span className="block text-[10px] font-mono text-roselle-gold font-bold">
                      {ch.num}
                    </span>
                    <span className="block text-xs font-semibold truncate mt-0.5">
                      {ch.title.replace("The ", "")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

