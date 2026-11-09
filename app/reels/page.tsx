import React from "react";
import LipReels from "@/components/sections/LipReels";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "On The Lips — Film Lookbook & Reels | ROSELLE",
  description:
    "Six editorial lipstick films showing swatching, blotting, wear tests, and backstage moments across diverse muses.",
};

export default function ReelsPage() {
  return (
    <div className="pt-20 min-h-screen bg-[#1d0205]">
      <LipReels />
    </div>
  );
}
