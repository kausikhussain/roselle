import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | ROSELLE",
  description: "Terms and conditions governing purchases and usage of Roselle Lip Lab.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#3a040b] text-white pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">Terms of Service</h1>
        <p className="text-xs text-roselle-gold font-mono uppercase">Last Updated: November 2026</p>

        <div className="space-y-6 text-xs sm:text-sm text-white/80 leading-relaxed font-light">
          <p>
            Welcome to ROSELLE Lip Lab. By browsing our website, placing an order, or utilizing our 3D interactive atelier tools, you agree to be bound by these Terms of Service.
          </p>

          <h2 className="font-serif text-xl font-bold text-white pt-4">1. Product Integrity &amp; Usage</h2>
          <p>
            All Roselle lip cosmetic formulations, weighted magnetic zinc casings, and shade refills are intended exclusively for personal cosmetic use. Reselling without authorized distributor agreements is strictly prohibited.
          </p>

          <h2 className="font-serif text-xl font-bold text-white pt-4">2. Black Friday Promotional Terms</h2>
          <p>
            The Black Friday 30% discount is applied using code &ldquo;BF30&rdquo; and applies sitewide across our 8 signature shades while inventory lasts. Free shipping applies automatically to all qualifying orders over $50 after discount.
          </p>

          <h2 className="font-serif text-xl font-bold text-white pt-4">3. Intellectual Property</h2>
          <p>
            All procedural 3D code, shaders, photography, brand trademarks, and editorial copy are the intellectual property of ROSELLE Lip Lab Atelier.
          </p>
        </div>
      </div>
    </div>
  );
}
