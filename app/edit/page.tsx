import React from "react";
import TheEdit from "@/components/sections/TheEdit";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Winter 2026 Edit — Curated Capsule | ROSELLE",
  description:
    "Top 7 Roselle shades curated for Winter 2026. Staged on architectural cream pedestals with interactive hover inspections.",
};

export default function EditPage() {
  return (
    <div className="pt-20 min-h-screen bg-[#38040a]">
      <TheEdit />
    </div>
  );
}
