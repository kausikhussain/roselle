"use client";

import React, { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { ROSELLE_SHADES, Shade } from "@/data/shades";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import {
  Sparkles,
  ShieldCheck,
  Plus,
  Minus,
  Check,
  Heart,
  RotateCw,
  Gift,
  ArrowRight,
  Star,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const shade = ROSELLE_SHADES.find((s) => s.slug === slug);

  const [quantity, setQuantity] = useState(1);
  const [engraving, setEngraving] = useState("");
  const [showEngravingInput, setShowEngravingInput] = useState(false);
  const [activeTab, setActiveTab] = useState<"formula" | "sensory" | "reviews">("formula");
  const [justAdded, setJustAdded] = useState(false);

  const { addItem, openBag } = useCart();

  if (!shade) {
    return (
      <div className="min-h-screen bg-[#42050e] text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h1 className="font-serif text-4xl font-bold">Shade Not Found</h1>
        <p className="text-white/60">The requested lipstick shade is not in the archive.</p>
        <Link href="/shop" className="px-6 py-2.5 rounded-full bg-roselle-gold text-roselle-dark font-bold text-xs uppercase tracking-widest">
          Return to Archive
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    addItem(shade.id, quantity, engraving.trim() || undefined);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div className="min-h-screen bg-[#3a040b] text-white pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/50">
          <Link href="/" className="hover:text-roselle-gold">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-roselle-gold">Archive</Link>
          <span>/</span>
          <span className="text-roselle-gold font-bold">{shade.name}</span>
        </div>

        {/* Product Visual & Configurator Split Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Visual Product Staging & 3D Engraving Preview */}
          <div className="lg:col-span-6 space-y-6">
            <div
              className="relative aspect-square rounded-[36px] overflow-hidden p-8 flex flex-col justify-between items-center border border-roselle-gold/25 shadow-2xl"
              style={{
                background: `radial-gradient(circle at 50% 40%, ${shade.secondaryHex}95 0%, #170104 100%)`,
              }}
            >
              {/* Top Tags */}
              <div className="w-full flex justify-between items-center z-10">
                <span className="font-mono text-sm font-bold text-white/80">
                  № {shade.number} / 08
                </span>
                <span className="px-3 py-1 rounded-full bg-black/40 border border-white/20 text-xs font-semibold uppercase tracking-widest text-roselle-gold">
                  {shade.finish} Finish
                </span>
              </div>

              {/* Centered High-Res Realistic 3D Lipstick Simulation */}
              <div className="relative my-auto flex flex-col items-center">
                {/* Cap with Custom Live Monogram Engraving */}
                <div
                  className="w-16 h-28 rounded-t-2xl border-2 border-roselle-gold/50 shadow-2xl flex items-center justify-center relative overflow-hidden transition-transform duration-500"
                  style={{ backgroundColor: shade.hex }}
                >
                  {engraving ? (
                    <span className="font-serif italic font-bold text-sm tracking-widest text-roselle-gold drop-shadow px-2 -rotate-90">
                      {engraving}
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono tracking-widest text-white/40 -rotate-90">
                      ROSELLE
                    </span>
                  )}
                </div>

                {/* Rose Gold Collar Trim */}
                <div className="w-16 h-4 bg-gradient-to-r from-roselle-gold via-roselle-gilt to-roselle-gold border-y border-white/40 shadow-sm" />

                {/* Solid Zinc Weighted Base */}
                <div
                  className="w-16 h-28 rounded-b-2xl border-2 border-roselle-gold/50 shadow-2xl flex items-center justify-center"
                  style={{ backgroundColor: shade.secondaryHex }}
                >
                  <span className="text-[9px] font-mono tracking-widest text-white/40 -rotate-90">
                    ATELIER
                  </span>
                </div>
              </div>

              {/* Bottom Badge */}
              <div className="z-10 flex items-center gap-2 text-xs text-roselle-gold font-mono uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Solid Zinc Acoustic Magnetic Cap</span>
              </div>
            </div>

            {/* Other Shades Quick Switcher Thumbnails */}
            <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-white/60">
                Switch Shade:
              </span>
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {ROSELLE_SHADES.map((s) => (
                  <Link
                    key={s.id}
                    href={`/product/${s.slug}`}
                    className={`w-9 h-9 rounded-full flex-shrink-0 transition-all flex items-center justify-center text-[10px] font-bold ${
                      s.id === shade.id
                        ? "ring-2 ring-roselle-gold ring-offset-2 ring-offset-[#3a040b] scale-110"
                        : "opacity-60 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: s.hex }}
                    title={s.name}
                  >
                    {s.number}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Engraving Tool, Pricing, and Cart Controls */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-ultra text-roselle-gold font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Black Friday Exclusive • 30% Off</span>
              </div>
              <h1 className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-white">
                {shade.name}
              </h1>
              <p className="font-serif italic text-xl text-roselle-gold font-light">
                &ldquo;{shade.tagline}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="font-serif text-3xl font-bold text-white">
                  {formatPrice(shade.salePrice)}
                </span>
                <span className="font-serif text-lg line-through text-white/40">
                  {formatPrice(shade.price)}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-roselle-ruby text-roselle-gold text-xs font-bold uppercase tracking-wider">
                  Save 30%
                </span>
              </div>
            </div>

            <p className="text-sm text-white/80 leading-relaxed font-light">
              {shade.description}
            </p>

            {/* Custom Case Engraving Option Tool */}
            <div className="p-4 rounded-2xl bg-black/30 border border-roselle-gold/25 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-roselle-gold">
                  <Gift className="w-4 h-4" />
                  <span>Complimentary Atelier Case Engraving</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEngravingInput(!showEngravingInput)}
                  className="text-xs text-white/70 hover:text-white underline"
                >
                  {showEngravingInput ? "Remove" : "+ Add Monogram"}
                </button>
              </div>

              {showEngravingInput && (
                <div className="space-y-1.5 pt-1">
                  <input
                    type="text"
                    maxLength={10}
                    value={engraving}
                    onChange={(e) => setEngraving(e.target.value.toUpperCase())}
                    placeholder="Enter up to 10 characters (e.g. ELENA)"
                    className="w-full px-3.5 py-2 rounded-lg bg-black/50 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-roselle-gold uppercase tracking-widest font-serif"
                  />
                  <p className="text-[10px] text-white/50">
                    Precision diamond-cut directly onto the solid zinc case in our Paris atelier.
                  </p>
                </div>
              )}
            </div>

            {/* Quantity & Add to Bag Row */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                {/* Quantity selector */}
                <div className="flex items-center border border-white/25 rounded-full bg-black/40 px-3 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:text-roselle-gold"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-mono font-bold text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:text-roselle-gold"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Add to Bag CTA */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-4 rounded-full text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-luxury-md transition-all ${
                    justAdded
                      ? "bg-green-500 text-white"
                      : "bg-gradient-to-r from-[#e62e6b] to-[#b21d3b] hover:from-[#f04580] hover:to-[#c72547] text-white hover:scale-102"
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Bag • {formatPrice(shade.salePrice * quantity)}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-white/60 pt-2 border-t border-white/10">
                <span>✓ In Stock • Dispatches in 24 Hours</span>
                <span>✓ Complimentary Gift Packaging Included</span>
              </div>
            </div>

            {/* Tabbed Specs: Formula, Sensory, Reviews */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="flex gap-6 text-xs uppercase tracking-wider border-b border-white/10 pb-2">
                <button
                  onClick={() => setActiveTab("formula")}
                  className={`font-semibold transition-colors pb-2 -mb-2 border-b-2 ${
                    activeTab === "formula"
                      ? "text-roselle-gold border-roselle-gold"
                      : "text-white/60 border-transparent hover:text-white"
                  }`}
                >
                  Formula &amp; Ingredients
                </button>
                <button
                  onClick={() => setActiveTab("sensory")}
                  className={`font-semibold transition-colors pb-2 -mb-2 border-b-2 ${
                    activeTab === "sensory"
                      ? "text-roselle-gold border-roselle-gold"
                      : "text-white/60 border-transparent hover:text-white"
                  }`}
                >
                  Sensory Metrics
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`font-semibold transition-colors pb-2 -mb-2 border-b-2 ${
                    activeTab === "reviews"
                      ? "text-roselle-gold border-roselle-gold"
                      : "text-white/60 border-transparent hover:text-white"
                  }`}
                >
                  Verified Reviews (4.9/5)
                </button>
              </div>

              {activeTab === "formula" && (
                <div className="space-y-2 text-xs text-white/70 leading-relaxed animate-fadeIn">
                  <p>
                    <strong>Key Botanical Actives:</strong> {shade.keyIngredients.join(", ")}.
                  </p>
                  <p>
                    Clean, cruelty-free, paraben-free, silicone-free, and formulated with 100%
                    sustainably wild-harvested French Damask Rose petal essence.
                  </p>
                </div>
              )}

              {activeTab === "sensory" && (
                <div className="grid grid-cols-2 gap-4 text-xs font-mono animate-fadeIn">
                  <div className="space-y-1">
                    <div className="flex justify-between text-white/80">
                      <span>Hydration Cushion</span>
                      <span className="text-roselle-gold">{shade.sensory.hydration}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                      <div className="h-full bg-roselle-gold rounded-full" style={{ width: `${shade.sensory.hydration}%` }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-white/80">
                      <span>Pigment Opacity</span>
                      <span className="text-roselle-gold">{shade.sensory.pigment}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                      <div className="h-full bg-roselle-gold rounded-full" style={{ width: `${shade.sensory.pigment}%` }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-white/80">
                      <span>Reflective Shine</span>
                      <span className="text-roselle-gold">{shade.sensory.shine}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                      <div className="h-full bg-roselle-gold rounded-full" style={{ width: `${shade.sensory.shine}%` }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-white/80">
                      <span>Wear Longevity</span>
                      <span className="text-roselle-gold">{shade.sensory.wear}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                      <div className="h-full bg-roselle-gold rounded-full" style={{ width: `${shade.sensory.wear}%` }} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-3 text-xs text-white/80 animate-fadeIn">
                  <div className="p-3 rounded-xl bg-black/20 border border-white/10 space-y-1">
                    <div className="flex items-center gap-1 text-amber-400">
                      {"★".repeat(5)}
                      <span className="text-white/60 ml-2 font-mono">Camille D. — Paris</span>
                    </div>
                    <p className="font-light italic text-white/90">
                      &ldquo;The magnetic snap of the zinc case is pure haute couture, but the formula is what stole my heart. Weightless velvet that stayed flawless through dinner.&rdquo;
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
