# The Peaceful Mind Method — Landing Page

**Style:** Warm & Trustworthy (Style A) — Cream/Sage/Amber · Lora serif + Raleway sans  
**Design System:** Soft UI Evolution · Lora/Raleway · Trust & Authority pattern  
**Stack:** Next.js 15 · React 19 · Tailwind CSS 3 · TypeScript

---

## Run Locally

```bash
cd output/peaceful-mind-method/landing-page
npm install
npm run dev
# → http://localhost:3000
```

## Build

```bash
npm run build
npm run lint
```

---

## Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `cream` | #FDF8F0 | Background |
| `sage` | #5A7A5C | Primary / CTA |
| `amber` | #C4965A | Accent / highlights |
| `forest` | #2C3A2C | Dark text |
| `muted` | #6B7B6B | Secondary text |

**Fonts:** Lora (headings, serif) + Raleway (body, sans)  
**Base font size:** 18px (optimized for 60+ readability)

---

## Page Structure (Hormozi-style)

1. **Nav** — sticky, minimal (logo + CTA)
2. **Hero** — dream outcome + CTA + trust badges
3. **Trust Bar** — Mayo Clinic / Harvard / NIH backing
4. **Problem** — 3 pain cards
5. **Agitation** — "Why nothing has worked"
6. **Mechanism** — 3-Breath Anchor Method (3 steps)
7. **Offer Stack** — Core + 4 Bonuses + value summary
8. **Testimonials** — 3 cards with 5-star reviews
9. **Guarantee** — 90-Day Peace Promise
10. **Pricing** — 3-tier decoy + Lead Form
11. **Urgency** — launch price deadline
12. **FAQ** — accordion (5 questions)
13. **Final CTA** — repeat
14. **Footer** — minimal + disclaimer

---

## Files

```
app/
├── globals.css          ← Design tokens + utilities
├── layout.tsx           ← SEO metadata + font preconnect
├── page.tsx             ← Full landing page (server component)
└── api/lead/route.ts    ← Lead capture API (stub)

components/
├── LeadForm.tsx         ← Client: form with loading/success states
├── FAQAccordion.tsx     ← Client: expand/collapse FAQ
└── StickyMobileCTA.tsx  ← Client: sticky bottom bar on mobile (after 600px scroll)
```

---

## Env Vars (add to `.env.local`)

```
# Wire via /biz-email-setup
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
MAIL_FROM=
OWNER_EMAIL=

# Wire via /biz-setup-sepay-payment (if needed)
# KV_REST_API_URL=
# KV_REST_API_TOKEN=
```

---

## Next Steps in Pipeline

```
1. npm run dev → test locally at localhost:3000
2. /biz-email-setup → wire SMTP auto-responder into /api/lead
3. /biz-deploy-vercel → deploy to production (ONCE, after all wired)
4. /biz-nextjs-chatbot-openrouter → optional chatbot widget
```
