"use client";

import React, { useState } from "react";
import { Sparkles, MessageCircle, X, Send, ArrowRight, Check } from "lucide-react";
import { ROSELLE_SHADES, Shade } from "@/data/shades";
import { useCart } from "@/context/CartContext";

interface Message {
  sender: "user" | "concierge";
  text: string;
  recommendedShade?: Shade;
}

export default function ConciergeChat() {
  const { addItem, openBag } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "concierge",
      text: "Bonjour. I am your Roselle Atelier Formulation Concierge. How may I assist you with shade matching, undertones, or our clean botanical formulation today?"
    }
  ]);

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    const userMsg: Message = { sender: "user", text: q };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput("");

    setTimeout(() => {
      let reply = "";
      let shade: Shade | undefined = undefined;

      const lower = q.toLowerCase();
      if (lower.includes("red") || lower.includes("bold") || lower.includes("evening") || lower.includes("classic")) {
        shade = ROSELLE_SHADES[0]; // Cherry Kiss
        reply = "For an iconic statement mouth, I recommend Shade 01 Cherry Kiss. It is formulated with black cherry and vitamin E in our signature velvet finish for a feather-proof cushion.";
      } else if (lower.includes("nude") || lower.includes("everyday") || lower.includes("subtle") || lower.includes("natural")) {
        shade = ROSELLE_SHADES[1]; // Barely Blush
        reply = "For effortless Parisian elegance, Shade 02 Barely Blush is our most requested satin nude, kissed with pearl powder and nourishing jojoba.";
      } else if (lower.includes("dark") || lower.includes("noir") || lower.includes("gothic") || lower.includes("berry") || lower.includes("autumn")) {
        shade = ROSELLE_SHADES[7]; // Berry Noir
        reply = "Shade 08 Berry Noir delivers profound architectural drama. A deep blackberry matte infused with rare camellia seed oil.";
      } else if (lower.includes("pink") || lower.includes("gloss") || lower.includes("shine") || lower.includes("bright")) {
        shade = ROSELLE_SHADES[4]; // Hot Flamingo
        reply = "For luminous mirror gloss and volume plumping, Shade 05 Hot Flamingo features micro-spheres of hyaluronic acid in a vibrant electric pop.";
      } else if (lower.includes("sale") || lower.includes("black friday") || lower.includes("discount") || lower.includes("price") || lower.includes("code")) {
        reply = "Our Black Friday Atelier Private Sale grants 30% off all lipsticks with complimentary insured courier on orders over $50. Use code BF30 at checkout.";
      } else {
        shade = ROSELLE_SHADES[2]; // Ruby Rouge
        reply = "Based on your preferences, Shade 03 Ruby Rouge offers the definitive vintage screen-siren matte finish with zero feathering.";
      }

      setMessages(prev => [...prev, {
        sender: "concierge",
        text: reply,
        recommendedShade: shade
      }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-roselle-ruby to-[#8F1023] hover:from-[#d12448] hover:to-roselle-ruby text-white shadow-2xl shadow-roselle-ruby/40 border border-white/20 transition-all transform hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-roselle-gold" />
            <span className="text-xs uppercase font-semibold tracking-wider">Atelier Concierge</span>
          </button>
        )}
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[92vw] h-[520px] bg-[#1E040B] border border-roselle-gold/25 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-roselle-cream">
          {/* Header */}
          <div className="p-4 bg-black/40 border-b border-roselle-gold/15 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-roselle-gold/20 flex items-center justify-center text-roselle-gold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-white">Shade Concierge</h4>
                <span className="text-[10px] text-roselle-gold uppercase tracking-wider">Online • Parisian Atelier</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-roselle-cream/60 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === "user"
                      ? "bg-roselle-ruby text-white rounded-br-sm"
                      : "bg-white/5 border border-roselle-gold/10 text-roselle-cream/90 rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>

                {/* If there's a recommended shade */}
                {m.recommendedShade && (
                  <div className="mt-2 p-3 bg-black/40 border border-roselle-gold/20 rounded-xl flex items-center gap-3 w-[85%]">
                    <div
                      className="w-10 h-10 rounded-lg flex-shrink-0 shadow-sm"
                      style={{ backgroundColor: m.recommendedShade.hex }}
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-serif text-xs font-semibold text-white truncate">
                        {m.recommendedShade.name}
                      </h5>
                      <span className="text-[10px] text-roselle-gold font-mono">
                        ${m.recommendedShade.salePrice.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        addItem(m.recommendedShade!.id, 1);
                        openBag();
                      }}
                      className="px-2.5 py-1.5 rounded-full bg-roselle-ruby hover:bg-[#d12448] text-white text-[10px] uppercase font-semibold tracking-wider flex-shrink-0"
                    >
                      Add +
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Questions Pills */}
          <div className="px-4 py-2 bg-black/20 border-t border-white/5 flex gap-2 overflow-x-auto scrollbar-none">
            {["Find My Red", "Everyday Nude", "30% Sale Code"].map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-white/5 border border-roselle-gold/20 hover:border-roselle-gold text-[10px] text-roselle-cream/80 hover:text-white transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-black/40 border-t border-roselle-gold/15 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about shades or ingredients..."
              className="flex-1 bg-white/5 border border-roselle-gold/20 rounded-full px-4 py-2 text-xs text-white placeholder-roselle-cream/40 focus:outline-none focus:border-roselle-gold"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-full bg-roselle-ruby text-white flex items-center justify-center hover:bg-[#d12448] transition-colors flex-shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
