"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ROSELLE_SHADES, Shade } from "@/data/shades";
import { playMagneticClickSound } from "@/lib/soundEffects";

export interface CartItem {
  shadeId: string;
  shade: Shade;
  quantity: number;
  engraving?: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openBag: () => void;
  closeBag: () => void;
  addItem: (shadeId: string, quantity?: number, engraving?: string) => void;
  removeItem: (shadeId: string) => void;
  updateQuantity: (shadeId: string, delta: number) => void;
  clearCart: () => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  appliedDiscountPercent: number;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  subtotal: number;
  discountAmount: number;
  shippingAmount: number;
  taxAmount: number;
  totalAmount: number;
  freeShippingQualified: boolean;
  freeShippingProgress: number; // 0 to 100
  selectedSamples: string[];
  toggleSample: (sampleName: string) => void;
  totalItemCount: number;
}

const FREE_SHIPPING_THRESHOLD = 50.0;
const PROMO_CODES: Record<string, number> = {
  BF30: 30,
  ROSELLE30: 30,
  VIPACCESS: 25,
  ATELIER: 20,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("BF30");
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState(30);
  const [selectedSamples, setSelectedSamples] = useState<string[]>([
    "Damask Rose Lip Elixir Mini",
  ]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("roselle_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // Ignore fallback
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("roselle_cart", JSON.stringify(items));
    } catch {
      // Ignore
    }
  }, [items]);

  const openBag = () => setIsOpen(true);
  const closeBag = () => setIsOpen(false);

  const addItem = (shadeId: string, quantity = 1, engraving?: string) => {
    try {
      playMagneticClickSound();
    } catch {
      // Audio context might be restricted before user gesture
    }

    const shade = ROSELLE_SHADES.find((s) => s.id === shadeId);
    if (!shade) return;

    setItems((prev) => {
      const existing = prev.find((i) => i.shadeId === shadeId);
      if (existing) {
        return prev.map((i) =>
          i.shadeId === shadeId
            ? { ...i, quantity: i.quantity + quantity, engraving: engraving || i.engraving }
            : i
        );
      }
      return [...prev, { shadeId, shade, quantity, engraving }];
    });

    setIsOpen(true);
  };

  const removeItem = (shadeId: string) => {
    setItems((prev) => prev.filter((i) => i.shadeId !== shadeId));
  };

  const updateQuantity = (shadeId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.shadeId === shadeId) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (PROMO_CODES[clean]) {
      setPromoCode(clean);
      setAppliedDiscountPercent(PROMO_CODES[clean]);
      return {
        success: true,
        message: `Promo code ${clean} applied (${PROMO_CODES[clean]}% off)!`,
      };
    }
    return {
      success: false,
      message: "Invalid promotion code. Try 'BF30' for 30% off.",
    };
  };

  const removePromo = () => {
    setPromoCode("");
    setAppliedDiscountPercent(0);
  };

  const toggleSample = (sampleName: string) => {
    setSelectedSamples((prev) => {
      if (prev.includes(sampleName)) {
        return prev.filter((s) => s !== sampleName);
      }
      if (prev.length >= 2) {
        return [prev[1], sampleName];
      }
      return [...prev, sampleName];
    });
  };

  // Calculations
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => {
    // If Black Friday promotion is active, calculation uses the sale price or standard price with discount
    return sum + item.shade.price * item.quantity;
  }, 0);

  const discountAmount =
    appliedDiscountPercent > 0
      ? Number(((subtotal * appliedDiscountPercent) / 100).toFixed(2))
      : 0;

  const afterDiscount = subtotal - discountAmount;
  const freeShippingQualified = afterDiscount >= FREE_SHIPPING_THRESHOLD;
  const shippingAmount = freeShippingQualified || items.length === 0 ? 0 : 8.0;
  const taxAmount = Number((afterDiscount * 0.08).toFixed(2));
  const totalAmount = Number((afterDiscount + shippingAmount + taxAmount).toFixed(2));
  const freeShippingProgress = Math.min(
    100,
    Math.round((afterDiscount / FREE_SHIPPING_THRESHOLD) * 100)
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openBag,
        closeBag,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        promoCode,
        setPromoCode,
        appliedDiscountPercent,
        applyPromo,
        removePromo,
        subtotal,
        discountAmount,
        shippingAmount,
        taxAmount,
        totalAmount,
        freeShippingQualified,
        freeShippingProgress,
        selectedSamples,
        toggleSample,
        totalItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
