"use client";

import React from "react";
import { Lock, RefreshCw, Droplet, Sparkles, CheckCircle2, Flower2, Droplets, ShieldCheck, CircleDot } from "lucide-react";

interface InsideChaptersProps {
  currentChapter: number;
  onSelectChapter: (chapter: number) => void;
}

interface ChapterData {
  number: string;
  id: number;
  label: string;
  sublabel: string;
  tagline: string;
  headline: string;
  description: string;
  hotspots: {
    title: string;
    subtitle: string;
    top: string;
    left: string;
  }[];
  ingredients?: {
    name: string;
    benefit: string;
    icon: string;
    top: string;
    left: string;
  }[];
}

const CHAPTERS: ChapterData[] = [
  {
    number: "01",
    id: 1,
    label: "THE CASE",
    sublabel: "Rose-gold core",
    tagline: "CHAPTER 01 — THE CASE",
    headline: "DRESSED IN GOLD",
    description:
      "A weighted rose-gold case, lacquered in the shade it holds. The cap shuts with an acoustic magnetic click you can feel in your fingertips. Seven coats of hand-polished enamel protect a solid zinc core.",
    hotspots: [
      {
        title: "MAGNETIC CLICK",
        subtitle: "NO SNAP, NO WEAR",
        top: "40%",
        left: "14%",
      },
      {
        title: "LACQUER",
        subtitle: "SEVEN COATS, HAND-POLISHED",
        top: "60%",
        left: "16%",
      },
      {
        title: "WEIGHTED BASE",
        subtitle: "SOLID ZINC CORE",
        top: "78%",
        left: "18%",
      },
    ],
  },
  {
    number: "02",
    id: 2,
    label: "THE TWIST",
    sublabel: "Twist it up",
    tagline: "CHAPTER 02 — THE TWIST",
    headline: "TACTILE GLIDE",
    description:
      "Engineered with a micro-calibrated helical swivel track. Smooth resistance ensures the bullet will never collapse or wobble during application. Perfectly balanced in the hand.",
    hotspots: [
      {
        title: "HELICAL TRACK",
        subtitle: "ZERO-FRICTION BRASS",
        top: "35%",
        left: "15%",
      },
      {
        title: "TORQUE TUNED",
        subtitle: "CONTROLLED ROTATION",
        top: "55%",
        left: "18%",
      },
      {
        title: "AIRTIGHT SEAL",
        subtitle: "PRESERVES BOTANICAL OIL",
        top: "72%",
        left: "15%",
      },
    ],
  },
  {
    number: "03",
    id: 3,
    label: "THE FORMULA",
    sublabel: "Ruby Rouge",
    tagline: "CHAPTER 03 — THE FORMULA",
    headline: "RUBY ROUGE",
    description:
      "Old Hollywood, new formula. A blue-based red matte that sets like silk and refuses to budge. Formulated with cold-pressed rose-hip oil, antioxidant vitamin E, and 12% whipped shea butter cushion.",
    hotspots: [],
    ingredients: [
      {
        name: "PURE PIGMENT",
        benefit: "ONE-SWIPE COLOUR",
        icon: "pigment",
        top: "24%",
        left: "12%",
      },
      {
        name: "SHEA BUTTER",
        benefit: "12% CUSHION",
        icon: "shea",
        top: "44%",
        left: "14%",
      },
      {
        name: "VITAMIN E",
        benefit: "ANTIOXIDANT",
        icon: "vit-e",
        top: "32%",
        left: "38%",
      },
      {
        name: "ROSE-HIP OIL",
        benefit: "SOFTENS",
        icon: "rose-hip",
        top: "54%",
        left: "40%",
      },
    ],
  },
  {
    number: "04",
    id: 4,
    label: "THE FINISH",
    sublabel: "Matte to gloss",
    tagline: "CHAPTER 04 — THE FINISH",
    headline: "SENSORY COUTURE",
    description:
      "From ultra-powdery velvet to high-gloss mirror shine. Every Roselle shade is sculpted with our signature 30-degree teardrop contour tip that hugs the cupid's bow with surgical precision.",
    hotspots: [
      {
        title: "TEARDROP TIP",
        subtitle: "30° CUPID'S BOW CONTOUR",
        top: "30%",
        left: "20%",
      },
      {
        title: "12-HOUR WEAR",
        subtitle: "FEATHERLIGHT COMFORT",
        top: "52%",
        left: "22%",
      },
      {
        title: "BOTANICAL MATRIX",
        subtitle: "CLEAN & REFILLABLE",
        top: "70%",
        left: "18%",
      },
    ],
  },
];

export default function InsideChapters({
  currentChapter,
  onSelectChapter,
}: InsideChaptersProps) {
  const chapter = CHAPTERS.find((c) => c.id === currentChapter) || CHAPTERS[0];

  return (
    <section
      id="inside"
      className="relative min-h-screen flex flex-col justify-between py-24 px-4 sm:px-8 select-none overflow-hidden"
    >
      {/* Decorative Arch Outline behind the 3D space */}
      <div className="absolute left-6 md:left-[18%] top-1/2 -translate-y-1/2 w-[320px] md:w-[480px] h-[580px] rounded-t-full border border-roselle-gold/20 pointer-events-none opacity-40" />

      {/* Main Chapter Content Grid */}
      <div className="relative max-w-7xl mx-auto w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 z-20 my-auto">
        {/* Left Side: Space for 3D Lipstick Canvas & Dynamic Hotspot Leader Lines */}
        <div className="relative w-full lg:w-1/2 h-[420px] lg:h-[580px]">
          {/* Chapter Hotspots with Leader Lines (Chapter 1, 2, 4) */}
          {chapter.hotspots.map((h, idx) => (
            <div
              key={idx}
              className="absolute hidden md:flex items-center gap-3 transition-all duration-700 animate-fadeIn"
              style={{ top: h.top, left: h.left }}
            >
              {/* Glassmorphic Hotspot Card */}
              <div className="px-3.5 py-2 rounded-xl glass-card border border-roselle-gold/30 shadow-luxury-sm text-left">
                <div className="text-[11px] font-bold text-white tracking-wider">
                  {h.title}
                </div>
                <div className="text-[9px] text-roselle-gold uppercase tracking-widest font-medium">
                  {h.subtitle}
                </div>
              </div>

              {/* Leader Dot with Pulse */}
              <div className="relative flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-white shadow-gold-glow" />
                <span className="absolute w-5 h-5 rounded-full border border-roselle-gold/60 animate-ping" />
              </div>
            </div>
          ))}

          {/* Chapter 03 Orbital Ingredient Cards */}
          {chapter.ingredients &&
            chapter.ingredients.map((ing, idx) => (
              <div
                key={idx}
                className="absolute hidden md:flex items-center gap-2.5 transition-all duration-700 animate-fadeIn"
                style={{ top: ing.top, left: ing.left }}
              >
                <div className="px-3.5 py-2 rounded-xl glass-card border border-roselle-gold/30 shadow-luxury-md flex items-center gap-3 text-left">
                  <div className="w-8 h-8 rounded-full bg-roselle-ruby/60 border border-roselle-gold/40 flex items-center justify-center flex-shrink-0 shadow-inner">
                    {ing.icon === "pigment" && <CircleDot className="w-4 h-4 text-roselle-petal" />}
                    {ing.icon === "shea" && <Droplets className="w-4 h-4 text-amber-200" />}
                    {ing.icon === "vit-e" && <Sparkles className="w-4 h-4 text-roselle-gilt" />}
                    {ing.icon === "rose-hip" && <Flower2 className="w-4 h-4 text-roselle-gold" />}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-white tracking-wider">
                      {ing.name}
                    </div>
                    <div className="text-[8px] text-roselle-gold uppercase tracking-widest font-semibold">
                      {ing.benefit}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Right Side: Editorial Narrative & Progress Indicator */}
        <div className="w-full lg:w-1/2 max-w-xl space-y-6 text-center lg:text-left">
          {/* Chapter Progress Number Bar */}
          <div className="flex items-center justify-center lg:justify-start gap-4 text-xs font-mono text-roselle-gold">
            <span className="font-bold">{chapter.number}</span>
            <div className="w-24 sm:w-36 h-[2px] bg-white/20 relative overflow-hidden">
              <div
                className="h-full bg-roselle-gold transition-all duration-500"
                style={{ width: `${(chapter.id / 4) * 100}%` }}
              />
            </div>
            <span className="text-white/40">04</span>
          </div>

          {/* Chapter Tagline */}
          <div className="text-xs uppercase tracking-ultra font-semibold text-roselle-gold">
            {chapter.tagline}
          </div>

          {/* Headline in High-Contrast Bodoni Moda Display */}
          <h2 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-white uppercase drop-shadow-luxury-md">
            {chapter.headline}
          </h2>

          {/* Editorial Description */}
          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
            {chapter.description}
          </p>
        </div>
      </div>

      {/* Bottom Chapter Selector Bar */}
      <div className="w-full max-w-4xl mx-auto z-20 pt-8 border-t border-white/10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CHAPTERS.map((ch) => {
            const isActive = ch.id === currentChapter;
            return (
              <button
                key={ch.id}
                onClick={() => onSelectChapter(ch.id)}
                className={`p-3 rounded-2xl transition-all duration-300 flex items-center gap-3 text-left ${
                  isActive
                    ? "glass-card border-roselle-gold shadow-luxury-md scale-105 bg-roselle-ruby/60"
                    : "bg-black/20 border border-white/10 hover:border-white/20 text-white/60 hover:text-white"
                }`}
              >
                {/* Icon or Progress Ring */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isActive
                      ? "bg-roselle-gold text-roselle-dark font-bold"
                      : "bg-white/10 text-white/70"
                  }`}
                >
                  {ch.id === 1 && <Lock className="w-4 h-4" />}
                  {ch.id === 2 && <RefreshCw className="w-4 h-4" />}
                  {ch.id === 3 && <Droplet className="w-4 h-4" />}
                  {ch.id === 4 && <Sparkles className="w-4 h-4" />}
                </div>

                {/* Labels */}
                <div className="min-w-0">
                  <div
                    className={`text-[10px] font-bold uppercase tracking-wider truncate ${
                      isActive ? "text-white" : "text-white/70"
                    }`}
                  >
                    {ch.number} {ch.label}
                  </div>
                  <div className="text-[9px] text-roselle-gold/80 truncate">
                    {ch.sublabel}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
