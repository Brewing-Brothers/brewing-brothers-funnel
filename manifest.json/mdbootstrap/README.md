# MDBootstrap Intelligence Layer
## Brewing Brothers — Admin / Analytics / CRM Reference Domain

This folder contains MDBootstrap component patterns converted into
implementation guidance for Brewing Brothers' internal tooling.

**MDBootstrap is NOT used in the production customer funnel.**
The customer-facing funnel uses: Next.js App Router + Tailwind CSS only.

MDBootstrap is used as a **reference source** for:
- Admin dashboard layouts (Phase 3+)
- Order management UI
- CRM pipeline views
- Analytics dashboard patterns

---

## Folder Structure

| Folder | Purpose |
|--------|---------|
| `dashboard/` | Admin dashboard layout patterns |
| `crm/` | CRM pipeline and lead management patterns |
| `ecommerce/` | Order management + product admin patterns |
| `analytics/` | Metrics / KPI dashboard patterns |
| `ui/` | Component library reference |
| `auth/` | Login / authentication patterns |
| `marketing/` | Email campaign management patterns |
| `plugins/` | MDBootstrap plugin reference |

---

## Usage Rule
Marcus Rule: Extract patterns → Rebuild in Tailwind.
MDBootstrap components are REFERENCE only, not production dependencies.
Any admin UI built for BB will use Tailwind CSS, not Bootstrap.

---

## Free Tools Used Instead
- HubSpot Free CRM → lead pipeline management (Phase 2/3)
- Vercel Analytics → traffic and conversion data (Phase 3)
- Google Sheets → order and reservation data (LIVE)
