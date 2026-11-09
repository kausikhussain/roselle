"use client";

import React, { useState } from "react";
import { Volume2, VolumeX, Play, Pause, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MuseFilmSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section id="film" className="relative py-32 bg-[#0A0103] text-roselle-cream overflow-hidden">
      {/* Background Ambient Color Spill Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-roselle-ruby/25 rounded-full blur-[140px] pointer-events-none" />

      {/* Head */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-16 relative z-10 space-y-3">
        <span className="text-xs uppercase font-mono tracking-[0.25em] text-roselle-gold flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" /> Editorial Cinema • Paris Winter 2026
        </span>
        <h2 className="font-serif text-4xl sm:text-6xl font-light text-white">
          Feel the Velvet
        </h2>
        <p className="text-sm text-roselle-cream/70 max-w-md mx-auto">
          One uninterrupted take. The weight of the metal flacon. The glide of pure pigment across bare skin.
        </p>
      </div>

      {/* Main Cinema Theater Stage */}
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="relative aspect-video rounded-3xl overflow-hidden border border-roselle-gold/30 bg-[#160307] shadow-2xl group">
          {/* Gold Corner Brackets */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-roselle-gold pointer-events-none z-20" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-roselle-gold pointer-events-none z-20" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-roselle-gold pointer-events-none z-20" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-roselle-gold pointer-events-none z-20" />

          {/* Simulated High-Res Video Canvas / Visual Loop */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#3B0612] via-[#670B1A] to-[#25050C] flex items-center justify-center">
            {/* Cinematic overlay vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/80 pointer-events-none" />

            <div className="text-center relative z-10 space-y-4 px-6">
              <span className="font-serif text-3xl sm:text-5xl font-light tracking-widest uppercase text-white/90 drop-shadow-lg block">
                ROSELLE CINEMA
              </span>
              <span className="text-xs uppercase tracking-[0.3em] text-roselle-gold/80 block">
                01 : 24 • Direction Artistique
              </span>
            </div>
          </div>

          {/* Sound Chip Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute top-6 right-6 z-30 px-3.5 py-1.5 rounded-full bg-black/60 border border-roselle-gold/30 text-xs text-roselle-cream flex items-center gap-2 backdrop-blur-md hover:bg-black/80 transition-colors"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-roselle-gold" />}
            <span className="text-[10px] uppercase font-mono tracking-wider">
              {isMuted ? "Sound Off" : "Atelier Audio On"}
            </span>
          </button>

          {/* Center Play / Pause Indicator */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-roselle-ruby/80 border border-white/40 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all z-20"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>
        </div>

        {/* CTA underneath */}
        <div className="mt-12 text-center">
          <Link
            href="#shop"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-roselle-ruby to-[#8F1023] hover:from-[#d12448] hover:to-roselle-ruby text-white text-xs uppercase font-semibold tracking-widest shadow-xl shadow-roselle-ruby/30 transition-all transform hover:-translate-y-0.5"
          >
            <span>Shop the Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

