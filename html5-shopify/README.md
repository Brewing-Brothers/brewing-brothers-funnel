# HTML5 / Shopify Intelligence Layer
## Brewing Brothers — Template Research Domain

This folder contains HTML5 template patterns and Shopify eCommerce
architecture converted into Next.js/Tailwind implementation guidance.

Templates in `templates-raw/` (Phase 4) feed this folder.
All patterns extracted here are used by the code generator.

---

## Folder Structure

| Folder | Purpose |
|--------|---------|
| `shopify/` | Shopify theme patterns → Next.js equivalents |
| `bootstrap/` | Bootstrap component → Tailwind migration map |
| `patterns/` | Extracted reusable eCommerce patterns |
| `templates/` | Template metadata index |
| `snippets/` | Reusable HTML5/Shopify UI snippets |

---

## Key Sources (Phase 4 to download)
- **HTML5UP** — CCA 3.0 licensed, free to use
- **ThemeWagon** — Free tier templates
- **Landingi** — 400+ landing pages, free plan for browsing
- **GetResponse** — Study eCommerce funnel templates (free account)

---

## Integration with BB System
HTML5/Shopify patterns feed:
1. `patterns/` — added to the master pattern library
2. `templates-index/templates_index.json` — indexed for AI access
3. `system/template_scorecard.csv` — scored against BB criteria

---

## Marcus Rule
Study → Extract → Implement in Next.js.
Never deploy HTML5/Bootstrap/Shopify code directly into production.
The BB production stack is: Next.js App Router + Tailwind CSS only.
