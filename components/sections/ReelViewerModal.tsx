"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Reel, ROSELLE_REELS } from "@/data/reels";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { X, Volume2, VolumeX, Plus, ChevronLeft, ChevronRight } from "lucide-react";

interface ReelViewerModalProps {
  currentReel: Reel;
  onClose: () => void;
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
}

export default function ReelViewerModal({
  currentReel,
  onClose,
  onNavigateNext,
  onNavigatePrev,
}: ReelViewerModalProps) {
  const { addItem } = useCart();
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigateNext();
      if (e.key === "ArrowLeft") onNavigatePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNavigateNext, onNavigatePrev]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center select-none animate-fadeIn">
      {/* Dynamic Blurred Backdrop Spill */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-2xl transition-all duration-700"
        style={{
          backgroundImage: `radial-gradient(circle at center, ${currentReel.shadeHex}40 0%, rgba(10,2,4,0.92) 80%)`,
        }}
        onClick={onClose}
      />

      {/* Main Container */}
      <div className="relative w-full max-w-5xl h-full max-h-[92vh] flex items-center justify-center p-4 z-10 pointer-events-none">
        {/* Left Peeking Neighboring Card */}
        <div
          onClick={onNavigatePrev}
          className="hidden md:block w-48 h-[65vh] rounded-3xl bg-black/50 border border-white/10 opacity-40 hover:opacity-80 transition-all cursor-pointer transform -rotate-6 scale-90 pointer-events-auto p-4 flex flex-col justify-end"
        >
          <span className="text-xs font-serif italic text-white/80">Previous film</span>
        </div>

        {/* Center Active Reel Card (9:16 vertical ratio) */}
        <div
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="relative w-full max-w-sm sm:max-w-md h-[88vh] rounded-[32px] overflow-hidden bg-[#1f0206] border border-roselle-gold/30 shadow-[0_0_60px_rgba(0,0,0,0.8)] flex flex-col justify-between p-6 pointer-events-auto mx-auto"
        >
          {/* Top Story Header & Segmented Progress Bars */}
          <div className="space-y-3 z-20">
            {/* Segmented Progress Bars */}
            <div className="flex gap-1.5 w-full">
              {ROSELLE_REELS.map((r) => {
                const isCurrent = r.id === currentReel.id;
                return (
                  <div
                    key={r.id}
                    className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden"
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isCurrent
                          ? isPaused
                            ? "bg-roselle-gold w-2/3"
                            : "bg-white w-full animate-pulse"
                          : "bg-transparent"
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Roselle Monogram Avatar, Handle & Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-roselle-ruby to-roselle-petal border border-roselle-gold/40 flex items-center justify-center font-serif font-black text-sm text-white shadow-md">
                  R
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">roselle</h4>
                  <p className="text-[10px] text-white/60">Five muses</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                  className="p-2 rounded-full glass-pill border border-white/20 text-white hover:text-roselle-gold transition-colors"
                  aria-label="Toggle Sound"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full glass-pill border border-white/20 text-white hover:text-roselle-gold transition-colors"
                  aria-label="Close Viewer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Center Touch Skip Zones (Tap left to skip prev, tap right to skip next) */}
          <div className="absolute inset-y-24 inset-x-0 flex z-10">
            <div
              onClick={(e) => {
                e.stopPropagation();
                onNavigatePrev();
              }}
              className="w-1/3 h-full cursor-pointer"
              aria-label="Skip to previous story"
            />
            <div className="w-1/3 h-full" />
            <div
              onClick={(e) => {
                e.stopPropagation();
                onNavigateNext();
              }}
              className="w-1/3 h-full cursor-pointer"
              aria-label="Skip to next story"
            />
          </div>

          {/* Ambient Video Visual Presentation */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#3a040b]/70 via-[#1f0206]/50 to-[#120103] flex items-center justify-center">
            <div
              className="w-48 h-48 rounded-full blur-3xl opacity-30 animate-pulse"
              style={{ backgroundColor: currentReel.shadeHex }}
            />
          </div>

          {/* Bottom Card Content: Shade Tag, Headline, Quote, Add to Bag */}
          <div className="space-y-4 z-20 pt-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent -mx-6 -mb-6 p-6">
            <div className="space-y-1">
              <div className="text-[10px] uppercase font-mono tracking-widest text-roselle-gold">
                CAST • {currentReel.shadeName}
              </div>
              <h3 className="font-serif italic text-2xl sm:text-3xl text-white">
                {currentReel.title}
              </h3>
              <p className="text-xs text-white/80 font-light leading-relaxed">
                {currentReel.quote}
              </p>
            </div>

            {/* Action Row */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-5 h-5 rounded-full border border-white/40 shadow-inner"
                  style={{ backgroundColor: currentReel.shadeHex }}
                />
                <span className="font-serif text-lg font-bold text-white">
                  {formatPrice(currentReel.price)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => addItem(currentReel.shadeId, 1)}
                  className="px-5 py-2.5 rounded-full bg-white text-roselle-dark font-bold text-xs uppercase tracking-widest hover:bg-roselle-gold transition-all shadow-luxury-md hover:scale-105"
                >
                  Add to bag
                </button>
                <Link
                  href="/shop"
                  onClick={onClose}
                  className="text-xs text-white/70 hover:text-white underline"
                >
                  All shades
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Peeking Neighboring Card */}
        <div
          onClick={onNavigateNext}
          className="hidden md:block w-48 h-[65vh] rounded-3xl bg-black/50 border border-white/10 opacity-40 hover:opacity-80 transition-all cursor-pointer transform rotate-6 scale-90 pointer-events-auto p-4 flex flex-col justify-end"
        >
          <span className="text-xs font-serif italic text-white/80">Next film</span>
        </div>
      </div>

      {/* Bottom Subtitle / Helper Instruction */}
      <div className="absolute bottom-4 text-[10px] uppercase font-mono tracking-widest text-white/50 text-center pointer-events-none">
        TAP SIDES TO SKIP • HOLD TO PAUSE • ESC OR CLICK OUTSIDE TO CLOSE
      </div>
    </div>
  );
}
