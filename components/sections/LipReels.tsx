"use client";

import React, { useState } from "react";
import { ROSELLE_REELS, Reel } from "@/data/reels";
import { Play, Pause, ChevronLeft, ChevronRight, Film } from "lucide-react";
import ReelViewerModal from "./ReelViewerModal";

export default function LipReels() {
  const [activeReelIndex, setActiveReelIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [modalReel, setModalReel] = useState<Reel | null>(null);

  const handlePrev = () => {
    setActiveReelIndex((prev) => (prev - 1 + ROSELLE_REELS.length) % ROSELLE_REELS.length);
  };

  const handleNext = () => {
    setActiveReelIndex((prev) => (prev + 1) % ROSELLE_REELS.length);
  };

  return (
    <>
      <section
        id="reels"
        className="relative min-h-screen py-24 px-4 sm:px-8 flex flex-col justify-between overflow-hidden select-none bg-[#1d0205]"
      >
        {/* Corner Registration Marks */}
        <div className="absolute top-6 left-6 text-white/30 text-sm font-mono">+</div>
        <div className="absolute top-6 right-6 text-white/30 text-sm font-mono">+</div>
        <div className="absolute bottom-6 left-6 text-white/30 text-sm font-mono">+</div>
        <div className="absolute bottom-6 right-6 text-white/30 text-sm font-mono">+</div>

        {/* Top Header & Coverflow Controls */}
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6 z-20">
          <div>
            <div className="text-xs uppercase tracking-ultra text-roselle-gold font-semibold mb-2">
              Lip Reels • 06 Films
            </div>
            <h2 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-white">
              ON THE{" "}
              <span className="font-serif italic font-normal gold-gradient-text">
                lips
              </span>
            </h2>
          </div>

          <div className="flex flex-col md:items-end gap-3">
            <p className="max-w-md text-xs sm:text-sm text-white/80 leading-relaxed font-light md:text-right">
              Six shades filmed the way they get worn: swatched, blotted, kissed, laughed in. Tap
              the centre reel to play full screen, with sound.
            </p>

            {/* Filmstrip Prev / Pause / Next Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full glass-pill border border-roselle-gold/30 hover:border-roselle-gold text-white flex items-center justify-center transition-all hover:scale-105"
                aria-label="Previous reel"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full glass-pill border border-roselle-gold/30 hover:border-roselle-gold text-white flex items-center justify-center transition-all hover:scale-105"
                aria-label={isPlaying ? "Pause reels" : "Play reels"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full glass-pill border border-roselle-gold/30 hover:border-roselle-gold text-white flex items-center justify-center transition-all hover:scale-105"
                aria-label="Next reel"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Perforated Filmstrip Sprocket Line Across the Section */}
        <div className="w-full my-6 filmstrip-sprocket opacity-60 z-20" />

        {/* Center: 3D Curved Coverflow of 9:16 Video Cards */}
        <div className="relative my-auto py-8 flex items-center justify-center overflow-x-hidden min-h-[480px] z-20">
          <div className="flex items-center justify-center gap-4 sm:gap-6 perspective-1000">
            {ROSELLE_REELS.map((reel, index) => {
              const diff = index - activeReelIndex;
              const isCenter = diff === 0;

              // 3D Coverflow positioning
              let transformStyle = "";
              let opacity = 1;
              let zIndex = 10 - Math.abs(diff);

              if (isCenter) {
                transformStyle = "scale(1.05) translateZ(50px)";
              } else if (diff < 0) {
                // Left cards angled back
                transformStyle = `translateX(${diff * 20}px) scale(${
                  0.85 - Math.abs(diff) * 0.05
                }) rotateY(25deg)`;
                opacity = Math.max(0.3, 1 - Math.abs(diff) * 0.35);
              } else {
                // Right cards angled back
                transformStyle = `translateX(${diff * 20}px) scale(${
                  0.85 - Math.abs(diff) * 0.05
                }) rotateY(-25deg)`;
                opacity = Math.max(0.3, 1 - Math.abs(diff) * 0.35);
              }

              // Hide far cards on mobile
              if (Math.abs(diff) > 2) return null;

              return (
                <div
                  key={reel.id}
                  onClick={() => {
                    if (isCenter) {
                      setModalReel(reel);
                    } else {
                      setActiveReelIndex(index);
                    }
                  }}
                  style={{
                    transform: transformStyle,
                    opacity,
                    zIndex,
                    transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
                  }}
                  className={`w-[220px] sm:w-[260px] h-[380px] sm:h-[450px] rounded-3xl p-4 flex flex-col justify-between relative cursor-pointer overflow-hidden border shadow-2xl group ${
                    isCenter
                      ? "border-roselle-gold bg-[#30030a] shadow-ruby-glow ring-2 ring-roselle-gold/40"
                      : "border-white/15 bg-[#1b0205]"
                  }`}
                >
                  {/* Card Background Gradient Spill */}
                  <div
                    className="absolute inset-0 opacity-25 group-hover:opacity-40 transition-opacity"
                    style={{
                      background: `radial-gradient(circle at 50% 30%, ${reel.shadeHex} 0%, transparent 70%)`,
                    }}
                  />

                  {/* Top Badges */}
                  <div className="flex justify-between items-center z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/50 border border-white/20 text-[10px] font-mono text-white">
                      • REEL {reel.number}
                    </span>
                    <span className="text-[10px] font-mono text-white/70">
                      {reel.duration}
                    </span>
                  </div>

                  {/* Play Button Center Trigger */}
                  <div className="my-auto mx-auto z-10">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-115 ${
                        isCenter
                          ? "bg-white text-roselle-dark shadow-gold-glow"
                          : "bg-white/20 text-white backdrop-blur-md"
                      }`}
                    >
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </div>
                  </div>

                  {/* Bottom Shade & Title Meta */}
                  <div className="space-y-1.5 z-10">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 border border-white/20 text-[9px] uppercase tracking-wider text-roselle-gold">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: reel.shadeHex }}
                      />
                      <span>{reel.shadeName}</span>
                    </div>

                    <h3 className="font-serif italic text-lg text-white truncate">
                      {reel.title}
                    </h3>
                    <p className="text-[11px] text-white/60 truncate">{reel.subtitle}</p>

                    {/* Progress Bar (active on center card) */}
                    {isCenter && (
                      <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-roselle-gold rounded-full w-2/3 animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Status Indicators: Scroll Percentage & Twist Degrees */}
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-[10px] uppercase font-mono tracking-widest text-white/50 pt-4 border-t border-white/10 z-20">
          <span>Scroll 073%</span>
          <span>Shade 05 / 08 • Twist 880°</span>
        </div>
      </section>

      {/* Full-Screen Stories-Style Reel Viewer Modal */}
      {modalReel && (
        <ReelViewerModal
          currentReel={modalReel}
          onClose={() => setModalReel(null)}
          onNavigateNext={() => {
            const nextIdx = (activeReelIndex + 1) % ROSELLE_REELS.length;
            setActiveReelIndex(nextIdx);
            setModalReel(ROSELLE_REELS[nextIdx]);
          }}
          onNavigatePrev={() => {
            const prevIdx =
              (activeReelIndex - 1 + ROSELLE_REELS.length) % ROSELLE_REELS.length;
            setActiveReelIndex(prevIdx);
            setModalReel(ROSELLE_REELS[prevIdx]);
          }}
        />
      )}
    </>
  );
}
