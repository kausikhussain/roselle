import React from "react";
import ShadeFinder from "@/components/sections/ShadeFinder";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Shade Finder & Try-On Lab | ROSELLE",
  description:
    "Test all 8 Roselle shades across 6 realistic skin tones. Experience the virtual lip try-on lab with specular gloss, creasing simulation, and arm swatch comparisons.",
};

export default function FinderPage() {
  return (
    <div className="pt-20 min-h-screen bg-[#240308]">
      <ShadeFinder />
    </div>
  );
}
