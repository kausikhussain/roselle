# ROSELLE — Master Engineering & Creative Direction Roadmap

**Project:** ROSELLE (Roselle Lip Lab)  
**Strategy:** Phased Delivery across 10 Milestones matching the Master Prompt  

---

## Milestone 1: Discovery & Comprehensive Audit
- [x] Forensic repository investigation of `E:\Roselle`.
- [x] Analysis of concept files (`how-we-made-it.md`, `prompts.md`, and 11 design screenshots).
- [x] Initialized Git repository and tracked all reference files.
- [x] Generated foundational documentation:
  - `PROJECT_AUDIT.md`
  - `ARCHITECTURE.md`
  - `FEATURE_REQUIREMENTS.md`
  - `IMPLEMENTATION_STATUS.md`
  - `MASTER_ROADMAP.md`
  - `OWNER_ACTIONS.md`
  - `docs/ASSET_REQUIREMENTS.md`
  - `docs/API_INTEGRATIONS.md`

## Milestone 2: Creative Direction & Engineering Foundation
- [ ] Initialize Next.js 14+ application with TypeScript, Tailwind CSS, and standard directory structure.
- [ ] Configure typography: Bodoni Moda (editorial display) and Inter (clean UI/sans).
- [ ] Configure custom Tailwind tokens: Roselle wine/ruby shades, rose golds, glassmorphic filters, and luxury borders.
- [ ] Create `.env.example` and Windows PowerShell local development scripts (`setup.ps1`, `start.ps1`, `check.ps1`).

## Milestone 3: Core UI & Editorial Design System
- [ ] Implement responsive sticky navigation with frosted glass pill, section indicators, cart badge, and CTAs.
- [ ] Build global layout and footer with luxury atelier aesthetics, newsletter subscription, and legal links.
- [ ] Build editorial DOM components for all 11 homepage sections:
  - Sale Hero overlay and pricing controls
  - Inside 4-chapter narrative cards and progress indicators
  - Ribbon Swirl background framing
  - Muse Arc 3D draggable portrait carousel
  - Muse Film theater stage with gold corner brackets and drifting stills
  - Swatch Bar interactive cards with sensory rating bars
  - Lip Reels filmstrip coverflow
  - Reel Viewer stories modal with sound and swipe controls
  - Virtual Try-On Lab UI
  - The Edit pedestal still life overlay

## Milestone 4: Three.js WebGL Procedural 3D Engine & Motion
- [ ] Implement procedural 3D lipstick in Three.js (lathed profiles, chamfered edges, metallic rose-gold rings, lacquer case, teardrop bullet).
- [ ] Implement bullet twist and cap lift mechanics.
- [ ] Build procedural S-curve ribbon geometry with dynamic draw range and instanced rose petal vortex.
- [ ] Implement Lenis smooth scrolling with GSAP ScrollTrigger timeline to bind scroll position directly to 3D camera and object poses.
- [ ] Implement mobile-responsive 3D scaling and Low Power Mode fallbacks.

## Milestone 5: Full-Stack Commerce & Backend APIs
- [ ] Build React state management for Shopping Bag (slide-over drawer, quantity adjustments, promo codes).
- [ ] Create Next.js API Route Handlers:
  - `GET /api/shades`
  - `POST /api/cart`
  - `POST /api/orders`
  - `POST /api/newsletter`
  - `POST /api/consultation`
- [ ] Build full multi-step checkout workflow with customer details, shipping options, and payment simulation.
- [ ] Implement dedicated pages: `/shop`, `/product/[slug]`, `/about`, `/finder`, `/reels`, `/edit`, `/faq`, `/contact`.

## Milestone 6: Advanced Interactive Experiences & AI Concierge
- [ ] Implement photorealistic SVG + Canvas Virtual Try-On engine with live color blending and skin tone selection.
- [ ] Implement AI Shade Concierge chat interface for interactive shade recommendations.
- [ ] Implement interactive product customizer (shade switching, cap engraving preview, finish selection).

## Milestone 7: Performance, Accessibility & SEO
- [ ] Implement image and asset optimization (WebP/AVIF, responsive variants).
- [ ] Ensure full keyboard accessibility (focus rings, ARIA labels, modal trap, reduced-motion queries).
- [ ] Add JSON-LD structured data (Product, Organization, Breadcrumbs).
- [ ] Generate dynamic `sitemap.xml` and `robots.txt`.

## Milestone 8: Testing & Quality Assurance
- [ ] Setup and run automated unit and component tests.
- [ ] Execute Playwright / automated browser checks for critical user journeys:
  - Homepage 3D scroll flow
  - Swatch Bar add-to-bag
  - Cart drawer promo code calculation
  - Multi-step checkout completion
  - Virtual Try-On shade selection
- [ ] Capture verified screenshots across desktop and mobile viewports.

## Milestone 9: Project Cleanup & Local Dev Documentation
- [ ] Remove any dead code or redundant styles.
- [ ] Write comprehensive `LOCAL_SETUP.md`.
- [ ] Verify PowerShell scripts on Windows (`scripts/setup.ps1`, `scripts/start.ps1`, `scripts/check.ps1`).

## Milestone 10: Production Deployment & Verification
- [ ] Execute full production build (`npm run build`).
- [ ] Validate zero TypeScript and ESLint errors.
- [ ] Prepare deployment configuration (Vercel / Cloudflare / Node).
- [ ] Deliver comprehensive final acceptance report with verified features and owner actions.
