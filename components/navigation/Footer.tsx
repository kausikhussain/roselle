"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-[#1A0307] text-roselle-cream border-t border-roselle-gold/20 pt-20 pb-12 overflow-hidden z-20">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-roselle-ruby/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Top Newsletter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-roselle-gold/15">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-roselle-gold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Roselle Private Atelier
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              Enter the Velvet Archive
            </h3>
            <p className="text-sm text-roselle-cream/70 max-w-md leading-relaxed">
              Receive private invitations to confidential formulation drops, private salon previews, and early access to our seasonal shade editions.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            {subscribed ? (
              <div className="flex items-center gap-3 p-4 bg-roselle-gold/10 border border-roselle-gold/30 rounded-2xl text-sm text-roselle-gold">
                <Check className="w-5 h-5 flex-shrink-0" />
                <span>You are now enrolled in the Roselle Private Atelier archive.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-5 py-3.5 rounded-full bg-white/5 border border-roselle-gold/20 text-white placeholder-roselle-cream/40 text-sm focus:outline-none focus:border-roselle-gold transition-colors"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-roselle-ruby to-[#8F1023] hover:from-[#d12448] hover:to-roselle-ruby text-white text-xs uppercase font-semibold tracking-widest transition-all shadow-lg shadow-roselle-ruby/20 flex items-center justify-center gap-2"
                >
                  <span>Join Archive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <span className="text-[11px] text-roselle-cream/40 mt-3">
              By subscribing, you accept our Privacy Policy. You can withdraw consent at any time.
            </span>
          </div>
        </div>

        {/* Brand Navigation Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 text-sm border-b border-roselle-gold/15">
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-white">The Collection</h4>
            <ul className="space-y-2.5 text-xs text-roselle-cream/70">
              <li><Link href="/#sale" className="hover:text-roselle-gold transition-colors">Black Friday Sale</Link></li>
              <li><Link href="/#shop" className="hover:text-roselle-gold transition-colors">The 8 Signature Shades</Link></li>
              <li><Link href="/#inside" className="hover:text-roselle-gold transition-colors">Anatomy of The Case</Link></li>
              <li><Link href="/#edit" className="hover:text-roselle-gold transition-colors">Winter 2026 Edit</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-lg text-white">Interactive Labs</h4>
            <ul className="space-y-2.5 text-xs text-roselle-cream/70">
              <li><Link href="/#finder" className="hover:text-roselle-gold transition-colors">Virtual Lip Try-On</Link></li>
              <li><Link href="/#reels" className="hover:text-roselle-gold transition-colors">Editorial Lip Reels</Link></li>
              <li><Link href="/#muses" className="hover:text-roselle-gold transition-colors">The Muse Arc</Link></li>
              <li><Link href="/#film" className="hover:text-roselle-gold transition-colors">Cinematic Film Stage</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-lg text-white">Craft & Standards</h4>
            <ul className="space-y-2.5 text-xs text-roselle-cream/70">
              <li className="text-roselle-cream/60">Cold-Pressed Rosehip Oil</li>
              <li className="text-roselle-cream/60">400g Neodymium Magnetic Snap</li>
              <li className="text-roselle-cream/60">30° Ergonomic Teardrop Bevel</li>
              <li className="text-roselle-cream/60">100% Clean, Vegan & Cruelty-Free</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-lg text-white">Atelier Concierge</h4>
            <ul className="space-y-2.5 text-xs text-roselle-cream/70">
              <li className="text-roselle-cream/60">Paris Flagship • Rue Saint-Honoré</li>
              <li className="text-roselle-cream/60">Tokyo Studio • Ginza 6-chome</li>
              <li className="text-roselle-cream/60">New York Salon • Madison Avenue</li>
              <li className="text-roselle-cream/60">concierge@roselleliplab.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-roselle-cream/50">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg text-white tracking-widest uppercase">ROSELLE</span>
            <span>© 2026 Roselle Lip Lab Inc. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <span className="hover:text-roselle-gold transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-roselle-gold transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-roselle-gold transition-colors cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
