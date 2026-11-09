# ROSELLE — Owner Actions & Decision Log

**Status:** Living Document  
**Maintained by:** Lead Development Team  

This document tracks all owner responsibilities, credentials required for production deployment, business approvals, and development completions.

---

## 1. Completed by Engineering Team
- [x] Initialized Git repository and cataloged all 11 design benchmark screenshots.
- [x] Performed comprehensive forensic repository audit (`PROJECT_AUDIT.md`).
- [x] Formulated architectural blueprint (`ARCHITECTURE.md`).
- [x] Specified detailed feature requirements for all 11 sections and commerce flows (`FEATURE_REQUIREMENTS.md`).
- [x] Created implementation tracking matrix (`IMPLEMENTATION_STATUS.md`).
- [x] Defined phased delivery roadmap (`MASTER_ROADMAP.md`).
- [x] Drafted asset requirements and API integration specifications (`docs/`).

---

## 2. Required from Owner (When Ready for Production)

The following items are optional during local development (mock fallbacks are provided) but will be required when deploying the live commercial store:

| Item | Purpose | Where to Obtain | Status / Blocker Level |
|------|---------|-----------------|------------------------|
| **Stripe Live Secret Key & Webhook Secret** | Live payment processing for credit card and mobile wallet transactions. | Stripe Dashboard (`dashboard.stripe.com/apikeys`) | Non-blocking for dev; required for live sales. |
| **Resend / SendGrid API Key** | Transactional order confirmation emails and VIP newsletter welcome notes. | Resend (`resend.com`) or SendGrid | Non-blocking for dev; required for email dispatch. |
| **Supabase / PostgreSQL Connection URI** | Production persistent relational database for customers, orders, and inventory. | Supabase (`supabase.com`) or Neon / AWS RDS | Non-blocking for dev (local store provided). |
| **Custom Domain DNS Records** | Pointing `roselleliplab.com` or custom brand domain to Vercel/Cloudflare. | Domain Registrar (Cloudflare, GoDaddy, Namecheap) | Non-blocking for dev; required for custom domain launch. |
| **Google Analytics 4 / PostHog Tag** | Client-side traffic and e-commerce conversion analytics. | Google Analytics / PostHog | Non-blocking. |

---

## 3. Awaiting Credentials or External Service
- None currently blocking development. The engineering architecture is designed with self-contained, high-fidelity mock services so the entire application, 3D engine, and checkout pipeline can be fully run, tested, and verified locally without external dependencies.

---

## 4. Awaiting Approval
- **Final Product Catalog & Pricing:** Confirming the 8 signature shades, ingredients, and Black Friday promotional pricing ($19.60 sale price on $28 hero items). *(Defaulted to the canonical specification from `lipstick-3d-site-notes`)*.
- **Copy & Brand Voice:** Tone confirmed as ultra-luxe, sensorial, editorial French couture beauty.

---

## 5. Production Blockers
- **Zero current blockers.** Development is proceeding through Milestone 2.
