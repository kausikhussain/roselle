import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | ROSELLE",
  description: "Roselle Lip Lab privacy policy and data governance practices.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#3a040b] text-white pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">Privacy Policy</h1>
        <p className="text-xs text-roselle-gold font-mono uppercase">Last Updated: November 2026</p>

        <div className="space-y-6 text-xs sm:text-sm text-white/80 leading-relaxed font-light">
          <p>
            At ROSELLE Lip Lab (&ldquo;Roselle&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;), we respect your personal privacy and are committed to protecting the confidential information you share with our atelier.
          </p>

          <h2 className="font-serif text-xl font-bold text-white pt-4">1. Data We Collect</h2>
          <p>
            We collect information you explicitly provide when ordering lipsticks, signing up for VIP early access, or consulting our Shade Concierge advisor. This includes your name, shipping address, email, telephone number, and payment credentials.
          </p>

          <h2 className="font-serif text-xl font-bold text-white pt-4">2. Zero Sale of Personal Data</h2>
          <p>
            We never sell, rent, or trade your personal data to third-party data brokers or marketing networks. Information is utilized exclusively to fulfill orders, process payments, and improve your interactive atelier experience.
          </p>

          <h2 className="font-serif text-xl font-bold text-white pt-4">3. Virtual Try-On Camera Privacy</h2>
          <p>
            When utilizing our live shade try-on features, all face detection and lip color blending occurs locally on your client device using WebGL shaders. No biometric imagery or facial scans are ever transmitted to or stored on our servers.
          </p>
        </div>
      </div>
    </div>
  );
}
