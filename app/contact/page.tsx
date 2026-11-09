"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, MapPin, Send, Check } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#3a040b] text-white pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h1 className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-white">
            Client Concierge &amp; Press
          </h1>
          <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto">
            Our beauty advisors and atelier specialists in Paris are available for shade matching inquiries, bespoke gifting, and editorial partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Contact Details */}
          <div className="md:col-span-5 p-6 rounded-3xl bg-[#220206] border border-roselle-gold/25 shadow-xl space-y-6 text-xs">
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-white">Roselle Atelier Paris</h3>
              <p className="text-white/60">Haute Formulation Laboratory</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-roselle-gold flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Atelier Address</div>
                  <div className="text-white/60">18 Rue du Faubourg Saint-Honoré, 75008 Paris, France</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-roselle-gold flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Client Concierge</div>
                  <div className="text-white/60">concierge@roselleliplab.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-roselle-gold flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Press &amp; Partnerships</div>
                  <div className="text-white/60">press@roselleliplab.com</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-[11px] text-white/50">
              Operating Hours: Monday – Saturday, 09:00 to 19:00 CET.
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#220206] border border-roselle-gold/25 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-roselle-ruby/60 border border-roselle-gold flex items-center justify-center text-roselle-gold">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Message Transmitted</h3>
                <p className="text-xs text-white/70 max-w-sm mx-auto">
                  Merci. A Roselle concierge specialist will review your request and reply within 12 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-white/70 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Elena Laurent"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:border-roselle-gold"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="elena@paris.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:border-roselle-gold"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Inquiry Type</label>
                  <select className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:border-roselle-gold">
                    <option>Shade Matching Consultation</option>
                    <option>Order &amp; Delivery Inquiries</option>
                    <option>Bespoke Case Engraving</option>
                    <option>Press &amp; Editorial Loan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How may our atelier assist your beauty ritual?"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:border-roselle-gold"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-full bg-white text-roselle-dark font-bold text-xs uppercase tracking-widest hover:bg-roselle-gold transition-all shadow-luxury-sm"
                >
                  {loading ? "Transmitting..." : "Send to Concierge"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
