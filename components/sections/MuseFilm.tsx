"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Volume2, VolumeX, Play, Pause, ArrowUpRight, Sparkles } from "lucide-react";

export default function MuseFilm() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section
      id="film"
      className="relative min-h-screen py-24 px-4 sm:px-8 flex flex-col justify-between items-center overflow-hidden select-none bg-[#1d0205]"
    >
      {/* Corner Registration Marks */}
      <div className="absolute top-6 left-6 text-white/30 text-sm font-mono">+</div>
      <div className="absolute top-6 right-6 text-white/30 text-sm font-mono">+</div>
      <div className="absolute bottom-6 left-6 text-white/30 text-sm font-mono">+</div>
      <div className="absolute bottom-6 right-6 text-white/30 text-sm font-mono">+</div>

      {/* Section Title */}
      <div className="text-center z-20 space-y-2 mb-8">
        <h2 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-white">
          Feel the{" "}
          <span className="font-serif italic font-normal gold-gradient-text">
            velvet
          </span>
        </h2>
        <p className="text-xs uppercase tracking-ultra text-roselle-gold/80 font-medium">
          Haute Formulation • The 2026 Atelier Film
        </p>
      </div>

      {/* Main Stage with Gold Corner Brackets and Ambient Glow */}
      <div className="relative w-full max-w-5xl my-auto z-20 flex items-center justify-center">
        {/* Left Column of Drifting Stills */}
        <div className="hidden lg:flex flex-col gap-4 absolute -left-28 w-36 opacity-75 hover:opacity-100 transition-opacity animate-float-slow z-30">
          <div className="relative h-44 rounded-2xl bg-black/40 border border-roselle-gold/30 overflow-hidden shadow-luxury-md p-2 flex flex-col justify-end group">
            <img
              src="/assets/images/muse-nude.jpg"
              alt="Backstage nude application"
              className="absolute inset-0 w-full h-full object-cover filter brightness-90 group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <span className="relative z-10 text-[10px] font-serif italic text-white/90 drop-shadow">
              Backstage application
            </span>
          </div>
          <div className="relative h-44 rounded-2xl bg-black/40 border border-roselle-gold/30 overflow-hidden shadow-luxury-md p-2 flex flex-col justify-end group">
            <img
              src="/assets/images/muse-cherry.jpg"
              alt="Cherry Kiss Red Velvet"
              className="absolute inset-0 w-full h-full object-cover filter brightness-90 group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <span className="relative z-10 text-[10px] font-serif italic text-white/90 drop-shadow">
              The Velvet Bullet
            </span>
          </div>
        </div>

        {/* Center Stage Enclosure */}
        <div className="relative w-full aspect-video max-w-4xl rounded-3xl overflow-hidden p-3 bg-black/40 shadow-2xl border border-roselle-gold/30">
          {/* Gold Decorative Corner Brackets */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-roselle-gold z-30 pointer-events-none" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-roselle-gold z-30 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-roselle-gold z-30 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-roselle-gold z-30 pointer-events-none" />

          {/* Ambient Video Light Spill (Blurred Backdrop) */}
          <div className="absolute inset-0 -m-8 bg-gradient-to-r from-roselle-ruby via-roselle-petal to-roselle-crimson blur-3xl opacity-35 pointer-events-none animate-pulse-subtle" />

          {/* Actual Video Container */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
            {/* Ambient Animated Luxury Poster / Video Simulation */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <img
                src="/assets/images/hero-campaign.jpg"
                alt="Roselle Atelier Campaign Film"
                className="absolute inset-0 w-full h-full object-cover filter brightness-75 contrast-110 scale-105 animate-pulse-subtle"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d0205] via-[#1d0205]/40 to-black/30" />
              <div className="relative z-10 text-center space-y-4 p-8">
                <button
                  onClick={togglePlay}
                  className="w-20 h-20 mx-auto rounded-full bg-roselle-ruby/80 border border-roselle-gold/60 flex items-center justify-center shadow-gold-glow hover:scale-110 transition-transform group cursor-pointer backdrop-blur-md"
                  aria-label={isPlaying ? "Pause Atelier Film" : "Play Atelier Film"}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white group-hover:text-roselle-gold" />
                  ) : (
                    <Play className="w-8 h-8 text-white group-hover:text-roselle-gold ml-1" />
                  )}
                </button>
                <div className="space-y-1">
                  <h3 className="font-serif italic text-3xl sm:text-5xl text-white drop-shadow-lg">
                    Sensory Weightless Glaze
                  </h3>
                  <p className="text-xs uppercase tracking-ultra text-roselle-gold drop-shadow font-mono">
                    Captured on 35mm in Paris Atelier • 24fps
                  </p>
                </div>
              </div>
            </div>

            {/* Sound Chip Toggle on bottom center */}
            <div className="absolute bottom-6 z-30 flex items-center gap-3">
              <button
                onClick={toggleSound}
                className="px-4 py-1.5 rounded-full glass-pill border border-roselle-gold/40 hover:border-roselle-gold text-white text-[11px] font-semibold tracking-wider uppercase flex items-center gap-2 shadow-luxury-md hover:scale-105 transition-all"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-roselle-gold" />
                    <span>Sound On</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-roselle-gold" />
                    <span>Sound Off</span>
                  </>
                )}
              </button>

              <button
                onClick={togglePlay}
                className="p-2 rounded-full glass-pill border border-roselle-gold/40 text-white hover:text-roselle-gold transition-colors"
                aria-label={isPlaying ? "Pause film" : "Play film"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column of Drifting Stills */}
        <div className="hidden lg:flex flex-col gap-4 absolute -right-28 w-36 opacity-60 hover:opacity-100 transition-opacity animate-float-slow [animation-delay:2s]">
          <div className="h-44 rounded-2xl bg-black/40 border border-roselle-gold/20 overflow-hidden shadow-luxury-md p-2 flex flex-col justify-end">
            <span className="text-[10px] font-serif italic text-white/80">
              Zinc Refill Core
            </span>
          </div>
          <div className="h-44 rounded-2xl bg-black/40 border border-roselle-gold/20 overflow-hidden shadow-luxury-md p-2 flex flex-col justify-end">
            <span className="text-[10px] font-serif italic text-white/80">
              Macro Swatch
            </span>
          </div>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="z-20 pt-8">
        <Link
          href="/shop"
          className="px-8 py-3.5 rounded-full border border-roselle-gold/40 hover:border-roselle-gold hover:bg-roselle-gold/15 text-white font-semibold text-xs uppercase tracking-ultra flex items-center gap-2 shadow-luxury-sm hover:scale-105 transition-all"
        >
          <span>Shop the collection</span>
          <ArrowUpRight className="w-4 h-4 text-roselle-gold" />
        </Link>
      </div>
    </section>
  );
}
