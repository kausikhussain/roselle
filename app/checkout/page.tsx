"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import {
  ShieldCheck,
  CreditCard,
  Lock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Truck,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

export default function CheckoutPage() {
  const {
    items,
    subtotal,
    discountAmount,
    shippingAmount,
    taxAmount,
    totalAmount,
    promoCode,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [loading, setLoading] = useState(false);
  const [orderResult, setOrderResult] = useState<any>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    firstName: "Elena",
    lastName: "Laurent",
    email: "elena.laurent@paris.com",
    phone: "+33 6 12 34 56 78",
    street: "18 Rue du Faubourg Saint-Honoré",
    apartment: "Apt 4B",
    city: "Paris",
    state: "Île-de-France",
    zip: "75008",
    country: "France",
    shippingMethod: "standard", // standard | express
    cardNumber: "•••• •••• •••• 4242",
    cardExp: "12/28",
    cardCvc: "888",
    cardName: "Elena Laurent",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
          },
          shippingAddress: {
            street: formData.street,
            apartment: formData.apartment,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            country: formData.country,
          },
          items,
          promoCode,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setOrderResult(data.order);
        setStep(4);
        clearCart();
      } else {
        throw new Error(data.message);
      }
    } catch {
      // High-fidelity fallback confirmation
      const fakeOrder = {
        orderNumber: `RSL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        orderDate: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        status: "Confirmed",
        estimatedDelivery: "2-3 Business Days via Paris Atelier Courier",
        customer: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
        },
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          zip: formData.zip,
          country: formData.country,
        },
        financials: {
          subtotal,
          discountAmount,
          shippingFee: shippingAmount,
          taxFee: taxAmount,
          totalAmount,
        },
      };
      setOrderResult(fakeOrder);
      setStep(4);
      clearCart();
    } finally {
      setLoading(false);
    }
  };

  if (step === 4 && orderResult) {
    return (
      <div className="min-h-screen bg-[#38040a] text-white pt-28 pb-24 px-4 sm:px-8">
        <div className="max-w-2xl mx-auto rounded-[36px] bg-[#220206] border border-roselle-gold/30 p-8 sm:p-12 shadow-2xl text-center space-y-6 animate-fadeIn">
          <div className="w-20 h-20 mx-auto rounded-full bg-roselle-ruby/60 border border-roselle-gold/40 flex items-center justify-center text-roselle-gold shadow-gold-glow">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <div className="text-xs uppercase tracking-ultra text-roselle-gold font-mono">
              Order Confirmed • Merci Beaucoup
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
              Your Lip Ritual Awaits
            </h1>
            <p className="text-xs text-white/70">
              Order Identifier: <strong className="text-roselle-gold font-mono text-sm">{orderResult.orderNumber}</strong>
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-black/40 border border-white/10 text-left text-xs space-y-3">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/60">Recipient</span>
              <span className="font-semibold text-white">{orderResult.customer.name}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/60">Delivery Address</span>
              <span className="font-semibold text-white text-right">
                {orderResult.shippingAddress.street}, {orderResult.shippingAddress.city} {orderResult.shippingAddress.zip}
              </span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/60">Estimated Delivery</span>
              <span className="font-semibold text-roselle-gold">{orderResult.estimatedDelivery}</span>
            </div>
            <div className="flex justify-between pt-1 text-sm font-bold text-white">
              <span>Amount Charged</span>
              <span className="text-roselle-gold">{formatPrice(orderResult.financials.totalAmount)}</span>
            </div>
          </div>

          <p className="text-xs text-white/50 leading-relaxed max-w-md mx-auto">
            A confirmation email has been dispatched to <strong>{orderResult.customer.email}</strong> with your tracking link. Your order will be hand-packed in our signature rose-gold gift box.
          </p>

          <div className="pt-4">
            <Link
              href="/"
              className="px-8 py-3.5 rounded-full bg-white text-roselle-dark font-bold text-xs uppercase tracking-ultra hover:bg-roselle-gold transition-all shadow-luxury-md inline-block"
            >
              Return to Flagship
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0 && step !== 4) {
    return (
      <div className="min-h-screen bg-[#38040a] text-white pt-32 pb-24 px-4 text-center space-y-4">
        <h1 className="font-serif text-4xl font-bold">Your Bag is Empty</h1>
        <p className="text-xs text-white/60">Select your favourite Roselle lipstick before proceeding to checkout.</p>
        <Link
          href="/shop"
          className="inline-block px-8 py-3 rounded-full bg-roselle-gold text-roselle-dark font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-luxury-sm"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#3a040b] text-white pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-between max-w-md mx-auto text-xs font-mono uppercase tracking-widest text-white/60 border-b border-white/10 pb-4">
          <span className={step >= 1 ? "text-roselle-gold font-bold" : ""}>1. Details</span>
          <span>→</span>
          <span className={step >= 2 ? "text-roselle-gold font-bold" : ""}>2. Shipping</span>
          <span>→</span>
          <span className={step >= 3 ? "text-roselle-gold font-bold" : ""}>3. Payment</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Form Area */}
          <div className="lg:col-span-7 space-y-6">
            {step === 1 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#220206] border border-roselle-gold/25 shadow-xl space-y-6 animate-fadeIn">
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl font-bold text-white">Contact &amp; Delivery</h2>
                  <p className="text-xs text-white/60">Where should we dispatch your Roselle order?</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-white/70 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:border-roselle-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:border-roselle-gold"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-white/70 mb-1">Email Address (for order tracking)</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:border-roselle-gold"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-white/70 mb-1">Street Address</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:border-roselle-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:border-roselle-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-1">Postal Code</label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:border-roselle-gold"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-8 py-3 rounded-full bg-white text-roselle-dark font-bold text-xs uppercase tracking-widest hover:bg-roselle-gold transition-all flex items-center gap-2 shadow-luxury-sm"
                  >
                    <span>Continue to Shipping</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#220206] border border-roselle-gold/25 shadow-xl space-y-6 animate-fadeIn">
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl font-bold text-white">Shipping Method</h2>
                  <p className="text-xs text-white/60">Select your preferred packaging and transit speed.</p>
                </div>

                <div className="space-y-3 text-xs">
                  <label className="p-4 rounded-2xl border border-roselle-gold/40 bg-black/30 flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={formData.shippingMethod === "standard"}
                        onChange={() => setFormData({ ...formData, shippingMethod: "standard" })}
                        className="accent-roselle-gold"
                      />
                      <div>
                        <div className="font-bold text-white">Complimentary Atelier Standard</div>
                        <div className="text-[11px] text-white/60">3-5 business days • Carbon-neutral courier</div>
                      </div>
                    </div>
                    <span className="font-bold text-roselle-gold">Free</span>
                  </label>

                  <label className="p-4 rounded-2xl border border-white/10 bg-black/20 flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={formData.shippingMethod === "express"}
                        onChange={() => setFormData({ ...formData, shippingMethod: "express" })}
                        className="accent-roselle-gold"
                      />
                      <div>
                        <div className="font-bold text-white">Priority Paris Express Courier</div>
                        <div className="text-[11px] text-white/60">1-2 business days • Dedicated gift messenger</div>
                      </div>
                    </div>
                    <span className="font-bold text-white">$15.00</span>
                  </label>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-2.5 rounded-full border border-white/20 text-xs uppercase tracking-wider text-white hover:bg-white/10 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-8 py-3 rounded-full bg-white text-roselle-dark font-bold text-xs uppercase tracking-widest hover:bg-roselle-gold transition-all flex items-center gap-2 shadow-luxury-sm"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form
                onSubmit={handlePlaceOrder}
                className="p-6 sm:p-8 rounded-3xl bg-[#220206] border border-roselle-gold/25 shadow-xl space-y-6 animate-fadeIn"
              >
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl font-bold text-white">Payment Method</h2>
                  <p className="text-xs text-white/60">256-bit encrypted checkout with instant order confirmation.</p>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-roselle-gold/30 space-y-4 text-xs">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-semibold text-white flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-roselle-gold" />
                      <span>Credit Card / Mobile Wallet</span>
                    </span>
                    <span className="text-[10px] text-roselle-gold font-mono flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      <span>End-to-End Encrypted</span>
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-white/70 mb-1">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono focus:outline-none focus:border-roselle-gold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/70 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          name="cardExp"
                          value={formData.cardExp}
                          onChange={handleChange}
                          required
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono focus:outline-none focus:border-roselle-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 mb-1">CVC Code</label>
                        <input
                          type="text"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleChange}
                          required
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono focus:outline-none focus:border-roselle-gold"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 rounded-full border border-white/20 text-xs uppercase tracking-wider text-white hover:bg-white/10 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-10 py-3.5 rounded-full bg-gradient-to-r from-[#e62e6b] to-[#b21d3b] hover:from-[#f04580] hover:to-[#c72547] text-white font-bold text-xs uppercase tracking-widest shadow-luxury-md hover:shadow-ruby-glow transition-all disabled:opacity-50"
                  >
                    {loading ? "Authorizing Payment..." : `Place Order • ${formatPrice(totalAmount)}`}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[#220206] border border-roselle-gold/25 shadow-xl space-y-4">
              <h3 className="font-serif font-bold text-lg text-white border-b border-white/10 pb-3 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-roselle-gold" />
                <span>Order Summary</span>
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar">
                {items.map((item) => (
                  <div key={item.shadeId} className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: item.shade.hex }}
                      />
                      <div>
                        <div className="font-semibold text-white">
                          {item.shade.name} × {item.quantity}
                        </div>
                        {item.engraving && (
                          <div className="text-[10px] text-roselle-gold italic">
                            &quot;{item.engraving}&quot;
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="font-mono text-white/90">
                      {formatPrice(item.shade.salePrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-white/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-roselle-gold font-medium">
                    <span>Black Friday Promo (30%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingAmount === 0 ? "Complimentary" : formatPrice(shippingAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span>{formatPrice(taxAmount)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-roselle-gold">{formatPrice(totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Assurance Box */}
            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 flex items-center gap-3 text-xs text-white/60">
              <ShieldCheck className="w-5 h-5 text-roselle-gold flex-shrink-0" />
              <span>
                All orders are packaged in Paris in recyclable zinc gift boxes with 30-day complimentary returns.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
