"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, Sparkles, Check, ArrowRight, ShieldCheck, Gift } from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeBag,
    updateQuantity,
    removeItem,
    subtotal,
    discountAmount,
    shippingAmount,
    totalAmount,
    freeShippingQualified,
    freeShippingProgress,
    promoCode,
    setPromoCode,
    appliedDiscountPercent,
    applyPromo,
    removePromo,
    selectedSamples,
    toggleSample,
    clearCart
  } = useCart();

  const [promoInput, setPromoInput] = useState(promoCode);
  const [promoFeedback, setPromoFeedback] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const res = applyPromo(promoInput);
    setPromoFeedback(res.message);
  };

  const handleSimulateCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutComplete(true);
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={closeBag}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#25050C] border-l border-roselle-gold/20 text-roselle-cream flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-roselle-gold/15 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-serif text-2xl tracking-wide uppercase">Your Vanity Bag</span>
              <span className="text-xs bg-roselle-gold/20 text-roselle-gold px-2 py-0.5 rounded-full font-mono">
                {items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={closeBag}
              className="text-roselle-cream/60 hover:text-roselle-cream transition-colors p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Complimentary Shipping Banner */}
          <div className="px-6 py-3 bg-roselle-dark/60 border-b border-roselle-gold/10">
            <div className="flex justify-between text-xs mb-1.5">
              <span>{freeShippingQualified ? "✨ Complimentary Insured Courier unlocked" : "Add for Complimentary Courier"}</span>
              <span className="font-mono text-roselle-gold">
                {freeShippingQualified ? "FREE" : `$${(50 - subtotal).toFixed(2)} to go`}
              </span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-roselle-ruby to-roselle-gold h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Scrollable Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {checkoutComplete ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 mx-auto flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl">Thank you for your order</h3>
                <p className="text-sm text-roselle-cream/70 max-width-xs mx-auto">
                  Your Roselle formulation is being prepared with white-glove packaging in our Parisian atelier.
                </p>
                <div className="p-4 bg-white/5 rounded-xl text-xs font-mono text-roselle-gold">
                  Order № RSL-2026-BF98
                </div>
                <button
                  onClick={() => {
                    setCheckoutComplete(false);
                    closeBag();
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-roselle-ruby text-white text-xs uppercase tracking-widest font-semibold"
                >
                  Return to Atelier
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 text-roselle-gold mx-auto flex items-center justify-center">
                  <Gift className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-serif text-xl">Your vanity is empty</h3>
                <p className="text-sm text-roselle-cream/60 max-w-xs mx-auto">
                  Select your signature Roselle formulation from our Black Friday collection.
                </p>
                <button
                  onClick={closeBag}
                  className="mt-2 px-6 py-2.5 rounded-full border border-roselle-gold/30 hover:border-roselle-gold text-xs uppercase tracking-widest"
                >
                  Explore Shades
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.shadeId}
                  className="flex gap-4 p-4 rounded-xl bg-white/5 border border-roselle-gold/10 hover:border-roselle-gold/25 transition-all"
                >
                  {/* Swatch preview */}
                  <div
                    className="w-16 h-20 rounded-lg flex-shrink-0 shadow-inner flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: item.shade.hex }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/20" />
                    <span className="font-serif text-xs font-bold text-white drop-shadow-md">
                      {item.shade.number}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-base font-semibold">{item.shade.name}</h4>
                        <button
                          onClick={() => removeItem(item.shadeId)}
                          className="text-roselle-cream/40 hover:text-roselle-ruby transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-roselle-cream/60">
                        {item.shade.finish} • {item.shade.subheadline.split("•")[0]}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-2 border border-roselle-gold/20 rounded-full px-2 py-0.5 bg-black/20">
                        <button
                          onClick={() => updateQuantity(item.shadeId, -1)}
                          className="hover:text-roselle-gold transition-colors p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.shadeId, 1)}
                          className="hover:text-roselle-gold transition-colors p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs line-through text-roselle-cream/40 mr-1.5">
                          ${(item.shade.price * item.quantity).toFixed(2)}
                        </span>
                        <span className="font-serif font-semibold text-roselle-gold">
                          ${(item.shade.salePrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Complimentary Atelier Samples Selection */}
            {items.length > 0 && !checkoutComplete && (
              <div className="mt-6 pt-6 border-t border-roselle-gold/15">
                <span className="text-xs font-medium uppercase tracking-wider text-roselle-gold flex items-center gap-1.5 mb-3">
                  <Sparkles className="w-3.5 h-3.5" /> Select 2 Complimentary Samples
                </span>
                <div className="space-y-2">
                  {[
                    "Damask Rose Lip Elixir Mini",
                    "Pure Velvet Micro-Scrub 5ml",
                    "24k Spun Gold Lip Mask"
                  ].map((sample) => {
                    const isSelected = selectedSamples.includes(sample);
                    return (
                      <button
                        key={sample}
                        onClick={() => toggleSample(sample)}
                        className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center justify-between transition-colors ${
                          isSelected
                            ? "bg-roselle-gold/10 border-roselle-gold text-roselle-cream"
                            : "bg-white/5 border-white/10 text-roselle-cream/70 hover:border-white/20"
                        }`}
                      >
                        <span>{sample}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-roselle-gold" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && !checkoutComplete && (
            <div className="p-6 border-t border-roselle-gold/15 bg-black/40 space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="VIP CODE (e.g. BF30)"
                  className="flex-1 bg-white/5 border border-roselle-gold/20 rounded-full px-4 py-2 text-xs uppercase tracking-wider text-white focus:outline-none focus:border-roselle-gold"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-roselle-gold/20 text-roselle-gold hover:bg-roselle-gold hover:text-roselle-dark text-xs uppercase font-semibold tracking-wider transition-colors"
                >
                  Apply
                </button>
              </form>
              {promoFeedback && (
                <p className="text-xs text-roselle-gold/80 italic">{promoFeedback}</p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-roselle-cream/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-roselle-cream">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-roselle-gold">
                    <span>Black Friday VIP Discount ({appliedDiscountPercent}%)</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Atelier Courier</span>
                  <span className="font-mono text-roselle-cream">
                    {shippingAmount === 0 ? "COMPLIMENTARY" : `$${shippingAmount.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-roselle-gold/15 text-sm font-semibold text-roselle-cream">
                  <span className="font-serif text-base">Estimated Total</span>
                  <span className="font-serif text-lg text-roselle-gold font-mono">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleSimulateCheckout}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-roselle-ruby to-[#8F1023] hover:from-[#d12448] hover:to-roselle-ruby text-white text-xs uppercase font-semibold tracking-widest shadow-lg shadow-roselle-ruby/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Proceed to Atelier Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-roselle-cream/50 uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5 text-roselle-gold" />
                <span>Encrypted 256-Bit SSL Atelier Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
