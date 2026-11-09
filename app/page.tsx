"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SaleHero from "@/components/sections/SaleHero";
import InsideChapters from "@/components/sections/InsideChapters";
import RibbonSwirl from "@/components/sections/RibbonSwirl";
import MuseArc from "@/components/sections/MuseArc";
import MuseFilm from "@/components/sections/MuseFilm";
import SwatchBar from "@/components/sections/SwatchBar";
import LipReels from "@/components/sections/LipReels";
import ShadeFinder from "@/components/sections/ShadeFinder";
import TheEdit from "@/components/sections/TheEdit";
import Preloader from "@/components/sections/Preloader";
import { ROSELLE_SHADES } from "@/data/shades";

// Dynamically import Three.js WebGL Canvas with SSR disabled
const LipstickCanvas = dynamic(
  () => import("@/components/webgl/LipstickCanvas"),
  { ssr: false }
);

export default function HomePage() {
  const [currentShadeIndex, setCurrentShadeIndex] = useState(0); // #01 Cherry Kiss
  const [currentChapter, setCurrentChapter] = useState(1); // 1 to 4
  const [activeSection, setActiveSection] = useState("sale");
  const [swirlProgress, setSwirlProgress] = useState(0.85);

  const selectedShade = ROSELLE_SHADES[currentShadeIndex] || ROSELLE_SHADES[0];

  // Scroll listener to update 3D WebGL camera and lipstick pose
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;

      // Section triggers based on scroll position
      const sections = [
        { id: "sale", name: "sale" },
        { id: "inside", name: "inside" },
        { id: "swirl", name: "swirl" },
        { id: "muses", name: "muses" },
        { id: "film", name: "film" },
        { id: "shop", name: "shop" },
        { id: "reels", name: "reels" },
        { id: "finder", name: "finder" },
        { id: "edit", name: "edit" },
      ];

      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.45) {
            setActiveSection(s.name);
            break;
          }
        }
      }

      // Check swirl section specifically for ribbon pour progress
      const swirlEl = document.getElementById("swirl");
      if (swirlEl) {
        const rect = swirlEl.getBoundingClientRect();
        const swirlTop = rect.top;
        const swirlHeight = rect.height;
        if (swirlTop <= window.innerHeight && rect.bottom >= 0) {
          const p = 1 - (swirlTop / (window.innerHeight + swirlHeight));
          setSwirlProgress(Math.min(1, Math.max(0, p * 1.5)));
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSeeIn3D = (shadeId: string) => {
    const idx = ROSELLE_SHADES.findIndex((s) => s.id === shadeId);
    if (idx !== -1) {
      setCurrentShadeIndex(idx);
    }
    const saleEl = document.getElementById("sale");
    if (saleEl) {
      saleEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#5c0612] text-white">
      {/* Cinematic Studio Preloader Entrance */}
      <Preloader />

      {/* 3D WebGL Procedural Canvas Layer */}
      <LipstickCanvas
        activeSection={activeSection}
        scrollProgress={swirlProgress}
        selectedShadeId={selectedShade.id}
        insideChapter={currentChapter}
      />

      {/* Flagship Experiential Sections */}
      <div className="relative z-20">
        {/* 01 · Sale Hero */}
        <SaleHero
          currentShadeIndex={currentShadeIndex}
          onSelectShade={(idx: number) => setCurrentShadeIndex(idx)}
        />

        {/* 02 · Inside the Case (4 Anatomical Chapters) */}
        <InsideChapters
          currentChapter={currentChapter}
          onSelectChapter={(chap) => setCurrentChapter(chap)}
        />

        {/* 03 · Ribbon Swirl */}
        <RibbonSwirl
          scrollProgress={swirlProgress}
          onScrubProgress={(val) => setSwirlProgress(val)}
        />

        {/* 04 · Muse Arc */}
        <MuseArc />

        {/* 05 · Muse Film */}
        <MuseFilm />

        {/* 06 · The Swatch Bar */}
        <SwatchBar />

        {/* 07 · Lip Reels (On the Lips) */}
        <LipReels />

        {/* 08 · Virtual Shade Finder */}
        <ShadeFinder onSeeIn3D={handleSeeIn3D} />

        {/* 09 · The Edit (Top 7 Shades for Winter 2026) */}
        <TheEdit />
      </div>
    </div>
  );
}
