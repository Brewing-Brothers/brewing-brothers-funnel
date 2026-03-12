# ClickFunnels Pattern Research
## Brewing Brothers — Phase 2 Research Notes

**Research Method:** Live browser analysis + platform comparison (March 2026)
**Source:** emailvendorselection.com/clickfunnels-alternatives + 10 platform landing pages
**Rule:** Extract principles only — no proprietary code or layouts

---

## Platform Decision Table

| Platform | Price/Mo | Free? | Funnel Builder | BB Decision |
|----------|---------|-------|---------------|-------------|
| ClickFunnels | $81+ | 14-day trial | YES | ❌ TOO EXPENSIVE — study only |
| GetResponse | $13.30 | Free plan | YES | 📖 STUDY + screenshot for patterns |
| Landingi | $29 | 1 page free | YES — 400+ templates | 📖 BROWSE + download HTML for templates-raw/ |
| Brevo | $9 | Free plan | Landing pages | ✅ USE FREE TIER for email sequences |
| MailerLite | $9 | Free plan | Landing pages | ✅ USE FREE TIER for email list |
| HubSpot | $20+ | Free CRM | Limited | ✅ USE FREE CRM for lead pipeline |
| **BB Next.js** | **$0** | **YES** | **YOU BUILD IT** | ✅✅ **THIS IS THE ANSWER** |

---

## CF Squeeze Funnel Mechanics (Extracted)
ClickFunnels core mechanism = squeeze funnel:
One page → one offer → one CTA → lead capture → immediate conversion or nurture sequence.

### 8 Structural Patterns

**CF-P1 — Squeeze Page Hero**
Single headline + subhead + ONE CTA above fold. No nav. No escape routes. Forces decision.
BB status: ✅ LIVE

**CF-P2 — Lead Magnet Gate**
Offer incentive (discount/guide) to capture email BEFORE showing price.
BB status: 🔵 Phase 4

**CF-P3 — Offer Stack**
Core product + bonus + guarantee stacked visually. Increases perceived value.
BB status: ⚠️ PARTIAL — structure built, prices needed

**CF-P4 — Social Proof Block**
3-5 testimonials with name, location, photo. Placed BEFORE price reveal.
BB status: ✅ LIVE — placeholder quotes

**CF-P5 — Urgency Element**
Countdown timer OR limited batch notice.
BB status: 🔵 Phase 4

**CF-P6 — Order Bump**
Checkbox at checkout: "Add X for $Y". 10-30% take rate.
BB status: 🔵 Phase 4

**CF-P7 — Thank-You Upsell**
After payment, offer related product. One-click accept.
BB status: 🔵 Phase 4

**CF-P8 — Sticky CTA Bar**
Floating header/footer bar with CTA visible at all scroll positions on mobile.
BB status: ✅ LIVE

---

## Abandon Cart Email Data (2024 Industry Benchmarks)

| Subject Line | Metric |
|-------------|--------|
| "Oops, did something go wrong?" | 66.28% open rate |
| "Forgot something?" | 47.67% open rate |
| "Your Brewing Brothers Basket" | 32.73% conversion |
| "Get them for 15% off!" | High conversion |

BB priority: "Oops, did something go wrong?" — implement Phase 3 via Brevo

---

## Automation Triggers Extracted from CF
- `form.submitted` → send confirmation email (LIVE via Apps Script)
- `page.visit > 30s` → show email popup (Phase 4)
- `exit-intent` → show email popup (Phase 4)
- `stripe.payment.succeeded` → send order confirmation (Phase 2 M7)
- `no_order.21d` → send win-back email (Phase 4)
