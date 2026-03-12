# Brewing Brothers — Implementation Notes
## Phase 2 — System Reference Document

---

## Stack
- **Framework:** Next.js 14 App Router + TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Google Apps Script → Google Sheet
- **Payments:** Stripe (Phase 2 M5-M8, blocked on M3)
- **Hosting:** Vercel (auto-deploy from GitHub master branch)
- **Repo:** https://github.com/Brewing-Brothers/brewing-brothers-funnel
- **Branch:** master (NEVER main)

---

## Environment Variables — Vercel Required

### Live Now (add immediately)
```
NEXT_PUBLIC_THEME = rustic
NEXT_PUBLIC_BASE_URL = https://brewing-brothers-funnel.vercel.app
NEXT_PUBLIC_STRIPE_ENABLED = false
APPS_SCRIPT_WEB_APP_URL = [your Apps Script URL]
```

### Stripe (after M3 prices confirmed)
```
STRIPE_SECRET_KEY = sk_test_...
STRIPE_WEBHOOK_SECRET = whsec_...
NEXT_PUBLIC_STRIPE_PRICE_SINGLE = price_...
NEXT_PUBLIC_STRIPE_PRICE_SIXPACK = price_...
NEXT_PUBLIC_STRIPE_PRICE_TWELVE = price_...
NEXT_PUBLIC_PRICE_SINGLE = $XX.XX
NEXT_PUBLIC_PRICE_SIXPACK = $XX.XX
NEXT_PUBLIC_PRICE_TWELVE = $XX.XX
NEXT_PUBLIC_STRIPE_ENABLED = true  ← flip this last
```

---

## Apps Script
- **URL:** https://script.google.com/macros/s/AKfycbwkBSnD_fOMKUAAC1c5NWe_f1z7_rNzuZX_mrhieeoCbeLTgC59XCLUsqvXRQ0g2qRsuw/exec
- **Account:** shamelessbrewingbrothers@gmail.com
- **Sheet ID:** 17A5PlAa_1z5BnbOhCJ1qc-i_cHC5CbNdc5go2q9X750
- **Risk:** Single Google account — migrate to primary account in Phase 3

---

## Theme System
Theme is set via `NEXT_PUBLIC_THEME` env var.
Options: `rustic` (amber/warm) | `bold` (dark/lime) | `minimal` (gray/white)
**Current production target: rustic**

---

## Stripe Setup Steps (M3-M8)
1. **M3:** Get real prices from client (Single / 6-Pack / 12-Pack)
2. **M4:** Create Stripe account → Create 3 products → Copy Price IDs
3. **M5:** `npm install stripe` in project
4. **M6:** Uncomment Stripe code in `app/api/checkout/route.ts`
5. **M6:** Add all Stripe env vars to Vercel (both test + live modes)
6. **M7:** Redeploy → verify
7. **M8:** Test purchase with card `4242 4242 4242 4242` exp `04/26` CVC `424`
8. **M8 webhook:** Register `https://brewing-brothers-funnel.vercel.app/api/webhook/stripe` in Stripe dashboard

---

## CF Patterns Status
| Pattern | Name | Status |
|---------|------|--------|
| CF-P1 | Squeeze Hero | ✅ LIVE |
| CF-P2 | Lead Magnet | 🔵 Phase 4 |
| CF-P3 | Offer Stack | ⚠️ PARTIAL — needs prices |
| CF-P4 | Social Proof | ✅ LIVE (placeholders) |
| CF-P5 | Urgency | 🔵 Phase 4 |
| CF-P6 | Order Bump | 🔵 Phase 4 |
| CF-P7 | Thank-You Upsell | 🔵 Phase 4 |
| CF-P8 | Sticky Mobile CTA | ✅ LIVE |

---

## Free Tool Stack
| Tool | Use | Phase | Status |
|------|-----|-------|--------|
| HubSpot Free CRM | Pickup lead pipeline | Phase 3 | Not connected |
| Brevo Free | Post-purchase email sequences | Phase 3 | Not connected |
| MailerLite Free | Email list + newsletters | Phase 4 | Not connected |
| Vercel Analytics | Traffic + conversion | Phase 3 | Not enabled |
| Google Sheets | Order/reservation log | Live | LIVE |

---

## Deployment Blockers (as of Phase 2)
| ID | Blocker | Severity |
|----|---------|---------|
| BN-1 | NEXT_PUBLIC_THEME not set in Vercel | BLOCKING |
| BN-2 | Production form unverified end-to-end | HIGH |
| BN-3 | No real prices from client | BLOCKING (M3) |
| BN-4 | Stripe not installed | Blocked on M3 |
| BN-5 | Apps Script on secondary Google account | MEDIUM |
| BN-6 | No Vercel Analytics enabled | MEDIUM |
| BN-7 | Placeholder testimonials in production | MEDIUM |
