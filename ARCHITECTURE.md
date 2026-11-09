# ROSELLE — Technical Architecture & Systems Engineering

**Version:** 1.0.0 Production Blueprint  
**System:** High-Performance Luxury Commerce & 3D Interactive Web Platform  
**Target Environment:** Node.js v20+ / Next.js 14+ / Modern Evergreen Browsers  

---

## 1. System Overview

ROSELLE is architected as an ultra-premium, full-stack digital flagship experience combining:
1. **An Interactive 3D WebGL Canvas Layer:** Running Three.js to render procedural lathed lipsticks, PBR materials, ribbon swirls, and dynamic pedestal compositions.
2. **A Choreographed Motion & DOM Presentation Layer:** Powered by Lenis smooth scrolling, GSAP ScrollTrigger, and Tailwind CSS.
3. **A Full-Stack Commerce & Application Layer:** Next.js App Router providing SSR/SSG for SEO, API Route Handlers, client state management for bag/cart, and multi-step checkout.
4. **An Interactive Virtual Lab Layer:** Photorealistic SVG + Canvas try-on studio and vertical video stories viewer.

```mermaid
graph TD
    Client[Browser Client: Desktop / Tablet / Mobile] --> Edge[Edge CDN / Next.js Routing]
    
    subgraph Frontend Architecture
        Lenis[Lenis Smooth Scroll Engine] --> GSAP[GSAP ScrollTrigger Timeline]
        GSAP --> State[Shared Reactive Scene State: story, step, storm, shop]
        State --> WebGL[Three.js WebGL Procedural 3D Canvas]
        State --> DOM[Editorial DOM UI & Hotspot Overlay]
        DOM --> TryOn[SVG / Canvas Virtual Try-On Lab]
        DOM --> Reels[Vertical Reel Video Player & Modal]
        DOM --> CartUI[Slide-Over Bag & Checkout Flow]
    end

    subgraph Backend & API Layer
        Edge --> NextAPI[Next.js API Route Handlers]
        NextAPI --> CatalogAPI[/api/shades]
        NextAPI --> CartAPI[/api/cart]
        NextAPI --> OrdersAPI[/api/orders]
        NextAPI --> AdvisorAPI[/api/consultation]
        NextAPI --> NewsletterAPI[/api/newsletter]
        NextAPI --> Storage[(Local File/JSON Persistent Store)]
    end
```

---

## 2. Frontend Engineering Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Core Framework** | Next.js (App Router, React 18/19, TypeScript) | SSR, SSG, file-based routing, server components, and API routes. |
| **Styling & Design Tokens** | Tailwind CSS + Custom CSS Variables | Custom typography scales, luxury color palettes, glassmorphism, responsive grid. |
| **Typography** | `next/font` (Bodoni Moda + Inter) | Self-hosted, zero layout shift, optimal font loading. |
| **3D Graphics Engine** | Three.js (Procedural geometries, PBR Shaders) | Ultra-lightweight, high-fidelity procedural lipstick models with no heavy glTF downloads. |
| **Smooth Scrolling** | @studio-freight/lenis (or modern Lenis) | Normalized momentum scrolling across macOS, Windows, iOS, and Android. |
| **Motion Choreography** | GSAP 3 + ScrollTrigger | Scrubbed timelines, text mask reveals, pinned editorial sections, and hotspot leader lines. |
| **Client State Management** | React Context + LocalStorage Persistence | Cart/Bag items, VIP discount codes, try-on shade/skin-tone selections, sound preferences. |
| **Icons & UI Accents** | Lucide React | Clean, scalable vector micro-icons. |

---

## 3. WebGL Procedural 3D Lipstick Pipeline

Instead of relying on multi-megabyte 3D files that take seconds to load over 4G/5G mobile connections, Roselle's flagship product is **entirely generated in code**:
- **Outer Shell / Cap & Base:** Lathed cylinder with subtle chamfered bevels, coated with a 7-coat clearcoat lacquer shader (`MeshPhysicalMaterial` with `roughness: 0.15`, `clearcoat: 1.0`, `clearcoatRoughness: 0.1`).
- **Collar & Core Ring:** High-polish brushed rose gold (`color: 0xE5A995`, `metalness: 0.95`, `roughness: 0.18`).
- **Inner Twist Sleeve:** Inner mechanical barrel with realistic metallic reflection.
- **Lipstick Bullet:** Cylindrical bullet body cut with an exact 30° ergonomic teardrop bevel, formulated with velvet micro-roughness (`roughness: 0.55`, `subsurface` light scattering approximation).
- **Interactive Poses:** Single fixed WebGL canvas blended across scroll triggers:
  - *Pose 1 (Sale Hero):* Center pedestal, floating cap, raised bullet, fanned side lipsticks.
  - *Pose 2 (The Case):* Angled single lipstick inside rose-gold arch with hotspot leader lines.
  - *Pose 3 (The Formula):* Exploded view with floating ingredient nodes (pure pigment, shea butter, vitamin E, rose-hip oil).
  - *Pose 4 (The Swirl):* Closed lipstick spinning inside an S-curve procedural ribbon tube with 120 orbiting rose petals.
  - *Pose 5 (The Edit):* Upright display lipsticks on staggered cream pedestals with hover tooltips.

---

## 4. Virtual Try-On Engine (SVG + Canvas)

The Shade Finder is engineered as a hybrid photorealistic SVG & Canvas renderer:
- Multi-layer skin tone rendering with realistic undertone warm/cool mapping.
- Anatomical lip curvature paths with procedural lip creases and volume highlights.
- Dynamic pigment blend mode (`multiply` + `soft-light` overlays) allowing seamless color transitions between the 8 Roselle shades without redrawing raster images.
- Arm swatch simulation canvas with realistic creamy wax texture rendering.

---

## 5. Backend Architecture & Data Contracts

### 5.1 API Route Endpoints
- `GET /api/shades`: Returns the full catalog of 8 shades, inventory status, formulations, prices, and finish descriptors.
- `GET /api/shades/[id]`: Returns detailed ingredient breakdown, sensory profile, and recommended pairings.
- `POST /api/cart`: Validates client cart items, verifies prices against server catalog, checks promo codes (e.g. `BF30`), and calculates taxes/shipping.
- `POST /api/orders`: Processes guest and authenticated checkouts, generates unique order IDs, and records order status.
- `POST /api/consultation`: AI-powered beauty concierge answering shade recommendation prompts using rule-based and NLP semantic matching.
- `POST /api/newsletter`: Validates email submissions for the Roselle VIP Black Friday Early Access club.

### 5.2 Persistence Strategy
- In-memory / file-based JSON store for development and zero-configuration local runs.
- Production-ready schema design for PostgreSQL / Supabase migration when production database credentials are supplied.

---

## 6. Security, SEO, and Performance Guardrails

### 6.1 Performance Target
- **Lighthouse Performance Score:** 90+
- **First Contentful Paint (FCP):** < 1.2s
- **Time to Interactive (TTI):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.05
- Fallback mode for mobile devices with Low Power Mode (disabling high-sample shadows while retaining fluid visuals).

### 6.2 Security
- Strict input sanitization with Zod schema validation on all API endpoints.
- Content Security Policy (CSP) headers protecting against XSS.
- Rate limiting on public API endpoints (`/api/newsletter`, `/api/orders`).
- Zero frontend exposure of secret keys.

### 6.3 SEO & Metadata
- Open Graph and Twitter Card tags configured with rich luxury preview imagery.
- JSON-LD structured data for `Product`, `Offer`, `Brand`, and `Organization`.
- Canonical URLs, semantic HTML5 headings, descriptive alt text, and auto-generated `sitemap.xml` and `robots.txt`.
