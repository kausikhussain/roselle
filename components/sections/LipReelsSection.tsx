"use client";

import React, { useState } from "react";
import { ROSELLE_REELS, Reel } from "@/data/reels";
import { Play, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import ReelViewerModal from "./ReelViewerModal";

export default function LipReelsSection() {
  const [selectedReelIndex, setSelectedReelIndex] = useState<number | null>(null);

  const handleOpenReel = (index: number) => {
    setSelectedReelIndex(index);
  };

  const handleClose = () => {
    setSelectedReelIndex(null);
  };

  return (
    <section id="reels" className="relative py-28 bg-[#100104] text-roselle-cream overflow-hidden">
      {/* Dashed Film Sprocket Line Top */}
      <div className="w-full flex items-center justify-between px-4 py-2 border-y border-roselle-gold/20 bg-black/40 overflow-hidden mb-12 select-none opacity-60">
        {Array.from({ length: 32 }).map((_, i) => (
          <div key={i} className="w-4 h-2.5 rounded-sm bg-roselle-gold/20 flex-shrink-0 mx-2" />
        ))}
      </div>

      {/* Head */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-16 space-y-3">
        <span className="text-xs uppercase font-mono tracking-[0.25em] text-roselle-gold flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" /> 9:16 Vertical Coverflow • The Lip Reels
        </span>
        <h2 className="font-serif text-4xl sm:text-6xl font-light text-white">
          Lip Reels
        </h2>
        <p className="text-sm text-roselle-cream/70 max-w-md mx-auto">
          Tap any reel to launch our full-screen stories masterclass. Swatches, macro texture glides, and Cupid's bow application secrets.
        </p>
      </div>

      {/* 9:16 Vertical Card Filmstrip Track */}
      <div className="flex gap-6 overflow-x-auto scrollbar-none px-6 md:px-12 py-4">
        {ROSELLE_REELS.map((reel, idx) => (
          <div
            key={reel.id}
            onClick={() => handleOpenReel(idx)}
            className="w-64 sm:w-72 aspect-[9/16] flex-shrink-0 rounded-3xl overflow-hidden bg-[#1E040B] border border-roselle-gold/20 shadow-2xl relative cursor-pointer group transform hover:-translate-y-2 hover:border-roselle-gold/50 transition-all"
          >
            {/* Ambient Swatch Gradient */}
            <div
              className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity"
              style={{
                background: `linear-gradient(135deg, ${reel.shadeHex} 0%, #150206 100%)`
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50 p-6 flex flex-col justify-between z-10">
              {/* Top Meta */}
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-roselle-gold text-sm font-bold">
                  № {reel.number}
                </span>
                <span className="font-mono text-[10px] bg-black/60 px-2 py-0.5 rounded-full text-white/80">
                  {reel.duration}
                </span>
              </div>

              {/* Center Play Button Overlay */}
              <div className="w-14 h-14 rounded-full bg-white/15 border border-white/30 text-white flex items-center justify-center mx-auto group-hover:scale-110 group-hover:bg-roselle-ruby group-hover:border-roselle-ruby transition-all shadow-xl">
                <Play className="w-6 h-6 ml-0.5 fill-current" />
              </div>

              {/* Bottom Title & Shade */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-roselle-gold block">
                  {reel.shadeName}
                </span>
                <h3 className="font-serif text-lg font-medium text-white group-hover:text-roselle-gold transition-colors">
                  {reel.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dashed Film Sprocket Line Bottom */}
      <div className="w-full flex items-center justify-between px-4 py-2 border-y border-roselle-gold/20 bg-black/40 overflow-hidden mt-12 select-none opacity-60">
        {Array.from({ length: 32 }).map((_, i) => (
          <div key={i} className="w-4 h-2.5 rounded-sm bg-roselle-gold/20 flex-shrink-0 mx-2" />
        ))}
      </div>

      {/* Full-Screen Stories Modal */}
      {selectedReelIndex !== null && (
        <ReelViewerModal
          currentReel={ROSELLE_REELS[selectedReelIndex]}
          onClose={handleClose}
          onNavigateNext={() => setSelectedReelIndex((selectedReelIndex + 1) % ROSELLE_REELS.length)}
          onNavigatePrev={() => setSelectedReelIndex((selectedReelIndex - 1 + ROSELLE_REELS.length) % ROSELLE_REELS.length)}
        />
      )}
    </section>
  );
}
