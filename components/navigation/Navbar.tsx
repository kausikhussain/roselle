"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Sparkles, Menu, X, ArrowRight, Flower2 } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "sale", label: "Sale", href: "/#sale" },
  { id: "inside", label: "Inside", href: "/#inside" },
  { id: "shop", label: "Shop", href: "/#shop" },
  { id: "reels", label: "Reels", href: "/#reels" },
  { id: "finder", label: "Finder", href: "/#finder" },
  { id: "edit", label: "Edit", href: "/#edit" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { totalItemCount, openBag, addItem } = useCart();
  const [activeSection, setActiveSection] = useState("sale");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll for header background & active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Section spy on homepage
      if (pathname === "/") {
        const sections = ["sale", "inside", "swirl", "muses", "film", "shop", "reels", "finder", "edit"];
        for (const s of sections) {
          const el = document.getElementById(s);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) {
              setActiveSection(s === "film" || s === "muses" ? "inside" : s);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleSealAKiss = () => {
    // Quick adds the #01 Cherry Kiss bestseller and opens the bag
    addItem("01", 1);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-[#42050e]/85 backdrop-blur-md border-b border-roselle-gold/20 shadow-luxury-md"
            : "py-5 bg-gradient-to-b from-[#38030b]/80 via-transparent to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer"
            aria-label="Roselle Homepage"
          >
            {/* Rose Botanical Crest */}
            <Flower2 className="w-6 h-6 text-roselle-gold group-hover:rotate-12 transition-transform duration-500 flex-shrink-0" />
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-roselle-gold transition-colors">
              Roselle
            </span>
          </Link>

          {/* Desktop Floating Pill Navigation */}
          <nav
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill border border-roselle-gold/25 shadow-luxury-sm"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                activeSection === item.id ||
                (pathname === item.href && pathname !== "/");

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-white text-roselle-dark font-semibold shadow-sm scale-105"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Black Friday Offer Tag */}
            <Link
              href="/#sale"
              className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider text-roselle-gold border border-roselle-gold/40 hover:bg-roselle-gold/15 transition-all"
            >
              <Sparkles className="w-3 h-3 text-roselle-gold" />
              <span>30% OFF</span>
            </Link>

            {/* Shopping Bag Button */}
            <button
              onClick={openBag}
              className="relative p-2.5 rounded-full glass-pill border border-roselle-gold/30 hover:border-roselle-gold text-white hover:text-roselle-gold transition-all duration-300 group"
              aria-label={`Shopping Bag (${totalItemCount} items)`}
            >
              <ShoppingBag className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-roselle-petal to-roselle-crimson text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#42050e] animate-pulse">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Seal A Kiss CTA Button */}
            <button
              onClick={handleSealAKiss}
              className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#e62e6b] to-[#b21d3b] hover:from-[#f04580] hover:to-[#c72547] text-white text-xs uppercase tracking-widest font-bold shadow-luxury-md hover:shadow-ruby-glow transition-all duration-300 hover:scale-105"
            >
              <span>Seal a kiss</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full glass-pill text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 mx-4 p-5 rounded-2xl glass-card border border-roselle-gold/30 shadow-luxury-lg space-y-3 animate-fadeIn">
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium tracking-wider uppercase text-white/90 hover:bg-roselle-gold/15 hover:text-roselle-gold flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSealAKiss();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#e62e6b] to-[#b21d3b] text-white text-xs uppercase tracking-widest font-bold text-center shadow-luxury-md"
              >
                Seal a kiss (Quick Add)
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
