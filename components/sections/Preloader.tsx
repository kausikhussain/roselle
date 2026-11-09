"use client";

import React, { useState, useEffect } from "react";

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDismissed(true);
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        return prev + 4;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (isDismissed) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D0104] text-roselle-cream transition-opacity duration-700 ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Liquid Lip Shimmer Effect */}
      <div className="absolute inset-0 bg-radial-gradient from-roselle-ruby/30 via-transparent to-transparent blur-3xl opacity-60 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <span className="text-xs uppercase tracking-[0.3em] text-roselle-gold font-mono mb-4 animate-pulse">
          Roselle Lip Lab • Paris
        </span>

        <h1 className="font-serif text-5xl sm:text-7xl font-light tracking-widest uppercase mb-3 bg-gradient-to-b from-white via-roselle-cream to-roselle-gold bg-clip-text text-transparent">
          ROSELLE
        </h1>

        <p className="text-xs sm:text-sm font-light text-roselle-cream/70 tracking-widest uppercase mb-10">
          The Architectural Lip • Haute Formulation
        </p>

        {/* Loading Progress Bar */}
        <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-roselle-ruby via-roselle-gold to-white transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-[10px] font-mono text-roselle-gold/80 mt-3 tracking-widest">
          {progress}%
        </span>
      </div>
    </div>
  );
}

