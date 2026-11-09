import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import ConciergeChat from "@/components/ui/ConciergeChat";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
  adjustFontFallback: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ROSELLE — Haute Formulation Lip Atelier & 3D Interactive Lab",
  description:
    "Sculptural clean luxury lip cosmetics. 8 signature shades, weighted rose-gold magnetic casing, and one-swipe velvet payoff. Discover the Black Friday early access launch with 30% off everything.",
  keywords: [
    "Roselle",
    "Roselle Lip Lab",
    "luxury lipstick",
    "velvet lipstick",
    "clean beauty",
    "haute cosmetics",
    "rose gold lipstick",
    "virtual lip try on",
    "Black Friday lipstick sale",
  ],
  authors: [{ name: "Roselle Lip Lab Atelier" }],
  openGraph: {
    title: "ROSELLE — Ultra-Luxury Lip Atelier",
    description:
      "8 signature shades, weighted rose-gold magnetic casing, one-swipe velvet payoff. 30% off everything for Black Friday early access.",
    url: "https://roselleliplab.com",
    siteName: "ROSELLE",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ROSELLE — Ultra-Luxury Lip Atelier",
    description: "8 signature shades, weighted rose-gold magnetic casing, one-swipe velvet payoff.",
  },
};

export const viewport: Viewport = {
  themeColor: "#5C0612",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodoni.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[#5c0612] text-roselle-cream font-sans antialiased selection:bg-roselle-gold selection:text-roselle-dark">
        <CartProvider>
          {/* Top Global Navigation */}
          <Navbar />

          {/* Main Content Area */}
          <main className="relative min-h-screen">
            {children}
          </main>

          {/* Luxury Footer */}
          <Footer />

          {/* Global Slide-Over Shopping Bag Drawer */}
          <CartDrawer />

          {/* AI Shade Concierge Advisor */}
          <ConciergeChat />
        </CartProvider>
      </body>
    </html>
  );
}
