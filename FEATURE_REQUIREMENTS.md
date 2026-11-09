# ROSELLE — Detailed Feature Requirements & Experience Specifications

**Brand:** ROSELLE (Roselle Lip Lab)  
**Status:** Canonical Engineering Specification  
**Design Reference:** `lipstick-3d-site-notes/screenshots/` (01 to 11)

---

## 1. Experiential Section Specifications

### Section 01: Preloader & Cinematic Intro
- **Visuals:** Full-screen wine/ruby stage (`#5C0612`). Fluid liquid lipstick effect floods the screen, Roselle crest logo emerges with golden sheen, then drains or splits smoothly as arches reveal the site.
- **Interactivity:** Fluid WebGL / CSS canvas shader animation. Logo transitions smoothly into the sticky navigation header.
- **Performance:** Instant fallback if WebGL is unavailable or on low-power devices.

### Section 02: Sale Hero ("30% Off Everything")
- **Layout:**
  - Top: "BLACK FRIDAY • EARLY ACCESS" uppercase micro-header.
  - Headline: "30% off everything" in high-contrast Bodoni Moda with decorative horizontal lines.
  - Staged 3D Scene: Warm spotlit chamber with illuminated "BLACK FRIDAY" vertical lightboxes. Central circular pedestal holding the hero lipstick uncapped with hovering cap and raised bullet.
  - Flanking lipsticks fanning out with interactive carousel controls (`<` and `>`).
  - Active shade indicator: `05 / 08 • VELVET / Cherry Kiss`.
  - Price: Original `$28` struck-through, highlighted sale price `$19.60`.
  - Actions: Outlined pill button `SHOP THE SALE →` and quick-add to bag.
  - Editorial corner registration marks `+`.

### Section 03: Inside (The 4 Anatomical Chapters)
- **Concept:** Pinning the section while scroll scrubs the 3D model through 4 detailed chapters:
  - **Chapter 01 — The Case:** "DRESSED IN GOLD". Weighted rose-gold case, 7 coats of hand-polished lacquer. Dynamic hotspot leader lines pointing to:
    - *Magnetic Click:* No snap, no wear.
    - *Lacquer:* Seven coats, hand-polished.
    - *Weighted Base:* Solid zinc core.
  - **Chapter 02 — The Twist:** Ergonomic internal helix sleeve, smooth tactile glide.
  - **Chapter 03 — The Formula:** "RUBY ROUGE". Uncapped lipstick bullet with 3D orbital ingredient cutouts:
    - *Pure Pigment:* One-swipe colour.
    - *Shea Butter:* 12% cushion.
    - *Vitamin E:* Antioxidant barrier.
    - *Rose-Hip Oil:* Deep softening.
  - **Chapter 04 — The Finish:** Matte to gloss sensory profile.
- **Navigation Controls:** Chapter buttons with interactive progress rings (`01 The Case`, `02 The Twist`, `03 The Formula`, `04 The Finish`).

### Section 04: The Ribbon Swirl
- **Visuals:** The lipstick caps and spins gently while an S-shaped procedural ribbon wraps spirally around it.
- **Mechanics:** Ribbon drawn dynamically as the user scrolls. A flurry of 120+ 3D rose petals whirl in a dynamic vortex.
- **Background:** Subtle oversized Roselle monogram watermark. Smooth cross-fade into the next section.

### Section 05: Muse Arc ("Worn By Muses")
- **Layout:**
  - Header: "WORN BY muses" with editorial subline: "Ten faces, eight Roselle shades - from nudes to noir, the way they're meant to be worn."
  - Indicator: `<-> DRAG TO EXPLORE`.
  - 3D curved arc carousel of portrait cards:
    - Card 01: Off Duty • Satin — Bare, with bite ($24)
    - Card 02: Evening • Velvet — Red carpet, red mouth ($28)
    - Card 03: Macro • Matte — Hush ($28)
    - Card 04: Play • Gloss — Loud & glossy ($26)
    - Each card includes interactive `ADD +` button.
  - Bottom Banner: Continuous scrolling curved editorial ticker:
    `Kiss often. Stay bold. ✦ One swipe. All eyes. ✦ Ten muses. Eight shades.`
  - Call to Action: `Shop all shades` & `Find your match` buttons.

### Section 06: Muse Film ("Feel the Velvet")
- **Visuals:** Dark luxury theater stage with thin gold corner brackets `┌ ┐ └ ┘`.
- **Media:** Central video with ambient color-spill glow blurred in the background. Two drifting vertical columns of editorial still photography.
- **Interactions:** Sound toggle chip (`ıı,ı SOUND ON / MUTE`), auto-pause when scrolled out of view, and `SHOP THE COLLECTION ↗` CTA.

### Section 07: The Swatch Bar ("Pick Your Pout")
- **Layout:**
  - Header: "THE SWATCH BAR • EIGHT SHADES" / "PICK YOUR pout".
  - Subline: "Tilt a card, hover to paint a swatch, press it. Hit + to drop a shade into your bag."
  - 3D Tilted Cards: One tall card per shade with 3D pointer tilt effect.
  - Card Details:
    - Shade title in bold serif.
    - Real 3D procedural lipstick uncapped.
    - Floating 3D props popping out on hover (cherries, glossy heart, powder puff, rose blossom).
    - Sensory rating meters: `Hydration`, `Pigment`, `Shine`, `Wear`.
    - Price & round `+` Add to Bag button.

### Section 08: Lip Reels ("On The Lips")
- **Layout:**
  - Header: "LIP REELS • 06 FILMS" / "ON THE lips".
  - Film-strip perforated dashed sprocket line across the top.
  - 9:16 vertical coverflow cards angled in 3D perspective.
  - Controls: Prev `< `, Play/Pause `||`, Next `>`.
  - Indicators: Time elapsed, shade tag pill, title, subtitle.
  - Status Bar: Real-time scroll percentage and 3D lipstick twist degree indicator (`SCROLL 073% • SHADE 05/08 • TWIST 880°`).

### Section 09: Fullscreen Reel Viewer Modal
- **Trigger:** Tapping any reel in the filmstrip opens an Instagram-stories style luxury viewer.
- **Experience:**
  - Dynamic blurred backdrop of the current video.
  - Segmented story progress bar at top.
  - Roselle avatar crest, sound toggle, and close `X` button.
  - Side peek preview of adjacent reels.
  - Bottom drawer: Shade name, price, `Add to bag` button, and `All shades` link.
  - Gestures: Tap left/right to skip, press & hold to pause, swipe down / ESC to dismiss.

### Section 10: Virtual Try-On Lab ("Find Your Match")
- **Visuals:** Photorealistic SVG + Canvas lips simulation with pores, subtle texture grain, lip creases, and specular highlight.
- **Controls:**
  - 6 Skin Tone selectors: Fair, Light, Honey, Tan, Deep Tan, Rich Deep.
  - 8 Shade pills with live swatch dots.
  - Interactive "ARM SWATCH" chip with organic creamy lipstick swipe.
  - `SEE IT IN 3D →` sync button that scrolls to and animates the 3D lipstick in that exact shade.

### Section 11: The Edit ("Top 7 Roselle Shades for Winter 2026")
- **Visuals:** Editorial still life with cream pedestals at staggered heights, dry winter branches, and slanted sunlight cast.
- **Interactions:**
  - Upright 3D lipsticks standing on numbered pedestals (`№ 01`, `№ 08`, `№ 03`, etc.).
  - Hovering a shade pops up a refined glassmorphic detail card: Shade number, name, finish, key ingredients, price, and `+` add-to-bag button.

---

## 2. Navigation & Site-Wide Systems

### Global Navigation Header
- **Left:** Roselle script serif logo + rose crest.
- **Center:** Floating frosted glass pill navigation with active section indicator:
  `[Sale] [Inside] [Shop] [Reels] [Finder] [Edit] [Atelier]`
- **Right:**
  - Black Friday promo pill (`30% OFF`).
  - Search trigger icon.
  - Shopping Bag trigger with live animated badge count.
  - Primary CTA pill button: `Seal a kiss`.

### Shopping Bag & Cart Drawer
- Slide-over glassmorphic drawer from the right.
- Real-time item list with shade swatches, quantities, finish tags, and removal actions.
- Free shipping progress bar (e.g. "Add $15 more for complimentary luxury gift packaging & shipping").
- Promo code input with instant validation (`BF30` applies 30% discount).
- Complimentary sample selector (choose 2 deluxe formulation minis).
- Subtotal, discount, shipping, and estimated tax calculation.
- Direct link to multi-step checkout.

### Multi-Step Checkout Workflow
- Step 1: Customer details & shipping destination with form validation.
- Step 2: Shipping method (Complimentary Standard vs. Priority Courier).
- Step 3: Payment simulation (Credit Card, Apple Pay, Google Pay).
- Step 4: Order confirmation screen with unique order number and delivery timeline.

### AI Shade Concierge & Advisor
- Interactive chat drawer accessible from the navigation or footer.
- Intelligent conversational assistant trained on Roselle formulations, skin undertone matching, and gifting advice.

---

## 3. Dedicated Inner Pages Architecture

1. `/shop` — Comprehensive product catalog with facet filters (Finish, Tone, Benefit, Price) and sorting.
2. `/product/[slug]` — High-resolution 3D customizer page with 360° rotation, custom case engraving preview, ingredient glossary, and verified customer reviews.
3. `/finder` — Fullscreen dedicated Virtual Try-On Studio with camera try-on option and procedural canvas.
4. `/reels` — Fullscreen video lookbook and backstage tutorials.
5. `/about` — The Roselle Atelier: French craftsmanship, clean formulations, and zinc-refill sustainability.
6. `/edit` — Winter 2026 Curated Capsule Edit.
7. `/checkout` — Frictionless checkout workflow.
8. `/faq` — Formulation, clean beauty certification, shipping, and returns.
9. `/contact` — Client concierge, bespoke gifting, and press inquiries.
10. `/privacy`, `/terms`, `/shipping` — Comprehensive legal and compliance policies.
