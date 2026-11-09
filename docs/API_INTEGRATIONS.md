# ROSELLE — API & Third-Party Integrations Specification

**Document:** `docs/API_INTEGRATIONS.md`  
**Brand:** ROSELLE (Roselle Lip Lab)  

---

## 1. Internal Application APIs

All internal APIs are implemented as type-safe Next.js Route Handlers (`app/api/...`) with strict JSON schema validation.

### 1.1 Shade Catalog API
- **Endpoint:** `GET /api/shades`
- **Purpose:** Supplies client with the authoritative list of 8 Roselle shades, real-time inventory counts, price points, and sensory ratings.
- **Response Format:**
  ```json
  {
    "success": true,
    "count": 8,
    "shades": [
      {
        "id": "01",
        "slug": "cherry-kiss",
        "name": "Cherry Kiss",
        "finish": "Velvet",
        "price": 28.00,
        "salePrice": 19.60,
        "hex": "#B21D3B",
        "secondaryHex": "#7A0F24",
        "inStock": true,
        "sensory": { "hydration": 88, "pigment": 98, "shine": 45, "wear": 95 },
        "ingredients": ["Black Cherry Extract", "Vitamin E", "Organic Jojoba"],
        "headline": "Red carpet, red mouth",
        "description": "A deep black-cherry velvet matte that sets like silk and refuses to budge."
      }
    ]
  }
  ```

### 1.2 Cart Validation & Pricing API
- **Endpoint:** `POST /api/cart`
- **Purpose:** Server-side recalculation of cart totals, validation of promotional codes (`BF30` for 30% discount), and shipping thresholds.
- **Request Body:**
  ```json
  {
    "items": [
      { "id": "01", "quantity": 1 }
    ],
    "promoCode": "BF30"
  }
  ```
- **Response Format:**
  ```json
  {
    "success": true,
    "subtotal": 28.00,
    "discount": 8.40,
    "shipping": 0.00,
    "tax": 1.57,
    "total": 21.17,
    "freeShippingQualified": true
  }
  ```

### 1.3 Order Checkout API
- **Endpoint:** `POST /api/orders`
- **Purpose:** Records customer order, validates address, stores order line items, and returns unique tracking identifier.
- **Security:** Rate limited (max 5 submissions per minute per IP), sanitized inputs.

### 1.4 AI Shade Concierge & Consultation API
- **Endpoint:** `POST /api/consultation`
- **Purpose:** Answers user inquiries about skin undertone matching, recommended finishes, ingredient safety, and gifting.
- **Logic:** Semantic intent parser matching queries against Roselle product attributes with intelligent fallback to luxury beauty advisor persona.

### 1.5 VIP Newsletter Subscription API
- **Endpoint:** `POST /api/newsletter`
- **Purpose:** Enrolls clients into Roselle VIP Early Access list. Validates RFC 5322 email syntax.

---

## 2. External Third-Party Services (Production Configuration)

| Service | Provider | Dev Environment Handling | Production Setup Requirements |
|---------|----------|--------------------------|-------------------------------|
| **Payment Gateway** | Stripe / Apple Pay | Simulated instant success with mock token | `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` |
| **Email Dispatch** | Resend | Logged to console with preview link | `RESEND_API_KEY`, verified sending domain `atelier@roselleliplab.com` |
| **Database** | Supabase (PostgreSQL) | High-speed local structured store | `DATABASE_URL` / `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` |
| **Analytics** | PostHog / GA4 | Disabled in local dev mode | `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
