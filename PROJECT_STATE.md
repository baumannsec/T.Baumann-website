# PROJECT_STATE.md — T. Baumann Group Website
_Last updated: 2026-03-01 | Updated by: Claude (session 3)_

---

## 1. Project Purpose & Success Criteria

**What this is:** A single-page marketing landing page for T. Baumann Group — a conversion infrastructure provider for King County medical aesthetics practices.

**Success criteria:**
- Communicates the brand positioning precisely (conversion infrastructure, NOT a marketing agency)
- All copy uses exact vocabulary from `brand_assets/brand-guidelines.md`
- Visual design is premium, data-forward, and credible — not startup/agency aesthetic
- Single primary CTA throughout (no competing calls to action)
- Fully responsive (mobile-first)
- Passes brand, CRO, and design quality checks

**This is NOT:** a multi-page site, a CMS, or a React app. It is one `index.html` file with all CSS embedded.

---

## 2. Current Status

### ✅ Done
- `index.html` — full landing page, production-ready, ~1200 lines
- `serve.mjs` — local HTTP dev server on port 3000 (with `decodeURIComponent` for filenames with spaces)
- `screenshot.mjs` — full-page Puppeteer screenshot tool
- `screenshot-sections.mjs` — section-by-section viewport screenshots
- `CLAUDE.md` — patched (CRO filename corrected)
- **Logo:** Nav and footer use `brand_assets/raindrop icon.svg` (actual brand asset, transparent) stacked above Cormorant Garamond text wordmark
  - Nav: 32px icon + 26px text, flex-column centered in 76px nav height
  - Footer: 20px icon + 16px text, opacity 0.65
  - Background rects removed from SVG so icon sits transparently against page background
- **Hover interactions** on 5 component types:
  - Pipeline steps: `translateX(5px)` + dot glow + inner dot scale + label color
  - DIOT cells: bg shift to `--c-elevated` + border-top brighten + badge glow
  - Metric cells: bg shift to `--c-surface` + border-top brighten + number glow
  - Hero stat items: `translateY(-4px)` + number glow
  - Quote cards: `translateX(4px)` + border-left brighten + bg shift + text color
- **CTA language:** "Book a Strategy Call" → "Revenue Diagnostic"; paragraph reworded to diagnostic framing
- **Copyright year:** © 2026

### 🔲 Not Done / Open Tasks (see Section 5)
- Real booking/calendar URL for CTA buttons (currently `href="#"` on the final CTA)
- Mobile review pass (only desktop viewport has been screenshotted)
- Favicon
- OG/social share tags
- Analytics (GTM or similar)

---

## 3. Decisions Made & Why

### Design
| Decision | Choice | Reason |
|---|---|---|
| Primary font | Cormorant Garamond (serif) | Refined, authoritative — brand guideline says "geometric serifs or high-contrast display fonts" |
| Body font | DM Sans | Clean, legible, NOT Inter/Roboto/Arial (explicitly forbidden in CLAUDE.md) |
| Primary color | `#09152A` deep navy | Brand guideline: "navy, slate, or charcoal" |
| Accent color | `#C2A050` warm gold | Single precise accent; brand says "muted teal, warm gold, or clinical blue — one accent" |
| Layout | Single HTML file | Per CLAUDE.md Output Defaults |
| CTA text | "See Where Revenue Is Leaking →" | User changed from "Book a Strategy Call" — more diagnostic, less sales |
| Nav logo | `raindrop icon.svg` (32px) + Cormorant Garamond 26px text, stacked | Actual brand asset; SVG background rects removed so icon is transparent |
| Footer logo | Same SVG (20px) + 16px text, opacity 0.65 | Matches nav treatment, subdued for footer |
| Hover animations | `transform` + `opacity`/`color`/`box-shadow` only, spring easing | CLAUDE.md: never `transition-all`, spring-style easing `cubic-bezier(0.22,1,0.36,1)` |

### SVG Logo Icon — `brand_assets/raindrop icon.svg`
The file is a raster-tracing SVG (exported from design tool) with an embedded base64 PNG image inside a luminance-mask. The SVG originally included two full-canvas background rectangles (`fill="#ffffff"` and `fill="#242426"`) which caused a visible box. These were removed — the SVG now renders as transparent/alpha-only matching whatever background is behind it.

The SVG `viewBox` is `0 0 631.5 329.25` (wide landscape canvas). The actual raindrop content occupies approximately x:48–560 of that canvas. Icon is sized via CSS height, not the SVG's `width`/`height` attributes.

### Copy
- All section copy written from brand guidelines sample voice and messaging hierarchy
- Forbidden language avoided throughout (no "crushing it", no "guaranteed", no hype)
- DIOT spelled out in full: Diagnose, Install, Optimize, Track
- "Consult-to-Member Engine" always capitalized, never shortened
- All benchmark numbers match brand guidelines exactly: 1–5 min, 2–3 weeks, 60–90 days, 20–40%, $80K–$300K+

### Architecture
- Scroll reveals use `IntersectionObserver` with `.reveal` / `.visible` classes
- Hero uses CSS keyframe animations (`.he` class) with staggered delays
- Grain texture via SVG `feTurbulence` filter embedded as data URI
- Tailwind CDN with minimal custom config (only font family extensions)
- CSS custom properties for all design tokens (not Tailwind palette)

---

## 4. Source-of-Truth Instructions

### Running the dev server
```bash
cd c:/Github4claude/ClaudeWebsite
node serve.mjs
# Serves at http://localhost:3000
# Run in background — check if already running before starting again
```

### Full-page screenshot
```bash
node screenshot.mjs http://localhost:3000
# Saves to: ./temporary screenshots/screenshot-N.png (auto-incremented)
# With label: node screenshot.mjs http://localhost:3000 mylabel
```

**Important:** `screenshot.mjs` forces `.reveal` elements visible via injected CSS before capturing, then scrolls through the page to trigger any JS-based reveals.

### Section-by-section screenshots
```bash
node screenshot-sections.mjs
# Saves: sec-hero.png, sec-problem.png, sec-compare.png,
#        sec-engine.png, sec-diot.png, sec-metrics.png, sec-cta.png
# All in ./temporary screenshots/
```

### Reading screenshots
After running either script, use the `Read` tool on the saved `.png` file. Claude can see the image directly and compare against intent.

### No reference image
This project was designed from scratch (no reference image provided). The brand guidelines (`brand_assets/brand-guidelines.md`) are the design authority.

---

## 5. Open Tasks (Prioritized)

| Priority | Task | File(s) |
|---|---|---|
| P1 | Wire up real booking URL on final CTA button | `index.html` (search `href="#"` on `btn-primary` in CTA section) |
| P1 | Mobile review — screenshot at 375px and 768px viewport, fix any breakage | `index.html` responsive CSS (`@media (max-width: 900px)` and `@media (max-width: 600px)`) |
| P2 | Add favicon | `index.html` `<head>` — use `brand_assets/raindrop icon.svg` |
| P2 | Add OG tags (title, description, image) for social sharing | `index.html` `<head>` |
| P3 | Add analytics (GTM snippet or similar) | `index.html` `<head>` / `<body>` |
| P3 | Consider adding a testimonial/social proof section | `index.html` new section |
| P3 | Consider adding a pricing/tier mention (DFY ~$1,500/mo, DIY ~$699/mo) | `index.html` new section or existing |

---

## 6. Immediate Next 3 Steps

**Step 1 — Wire real CTA URL**
In `index.html`, find the final CTA button:
```html
<a href="#" class="btn-primary" ...>
```
Change `href="#"` to the actual booking/calendar URL (Calendly, Cal.com, etc.).
User has not yet provided this URL.

**Step 2 — Mobile review pass**
In `screenshot-sections.mjs`, temporarily change the viewport:
```js
await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
```
Run `node screenshot-sections.mjs`, read each section screenshot, fix any layout breakage in the responsive CSS blocks near the bottom of the `<style>` block.

Key things to verify on mobile:
- Nav wordmark: flex-column icon + text may need font-size reduction at 375px
- DIOT grid goes 2-col at 900px, 1-col at 600px — confirm
- Metric grid stays 2-col at 600px — confirm no clipping

**Step 3 — Add favicon and OG tags**
In `index.html` `<head>`, after `<meta name="description">`:
```html
<link rel="icon" type="image/svg+xml" href="brand_assets/raindrop icon.svg">
<meta property="og:title" content="T. Baumann Group — Conversion Infrastructure for Medical Aesthetics">
<meta property="og:description" content="We install and manage the conversion infrastructure that turns your existing demand into predictable, growing revenue.">
<meta property="og:image" content="[URL to hosted OG image — not yet created]">
<meta property="og:type" content="website">
```

---

## 7. Known Bugs & Constraints

- **Scroll reveal in Puppeteer:** Full-page screenshots require forcing `.reveal` opacity to 1 via `page.addStyleTag()` before capture. This is already built into `screenshot.mjs` and `screenshot-sections.mjs`. Do NOT remove that injection.
- **Raindrop icon SVG has landscape viewBox:** `viewBox="0 0 631.5 329.25"` — this is wider than the visible icon content. Icon is sized via CSS `height` (32px nav, 20px footer); width auto-scales from the viewBox aspect ratio. There is inherent whitespace on the sides within the SVG canvas.
- **Final CTA `href="#"`:** The bottom CTA button links to `#` as a placeholder. Must be replaced with real URL before launch.
- **Nav wordmark untested on mobile:** The `.nav-wordmark` stacks icon + text at flex-column. Behavior at 375px has not been reviewed. May need a `@media` rule to reduce sizes.
- **No form on page:** The "Revenue Diagnostic" CTA relies on an external booking link. If a form is ever added, follow CRO framework friction-reduction rules.
- **`screenshot-sections.mjs` scroll offsets estimated:** Y offsets calibrated for 1440×900. If content height changes significantly, re-tune the offsets.
- **Tailwind CDN console warning:** Normal in development; acceptable for now.
- **`serve.mjs` decodes URLs:** `decodeURIComponent` was added to handle filenames with spaces (e.g., `raindrop icon.svg`). Do not remove this — it is required for the logo to load.
