# CHANGELOG.md — T. Baumann Group Website
_Session: 2026-02-28 | First build session_

---

## Files Created This Session

### `c:\Github4claude\ClaudeWebsite\index.html`
**Created from scratch** — single-file landing page, ~1100 lines.

- All CSS embedded in `<style>` block using CSS custom properties
- Google Fonts loaded: Cormorant Garamond (display) + DM Sans (body)
- Tailwind CDN included with minimal custom config (font families only)
- Grain texture via embedded SVG data URI (`feTurbulence` filter)
- Scroll reveal system: `IntersectionObserver` with `.reveal` / `.visible` classes
- Hero entrance animations: CSS keyframes on `.he` class with staggered delays

**Sections built (in order):**
1. Fixed nav — logo (full-height, flush-left) + single CTA button
2. Hero — full-viewport, headline, subtext, CTA, 3-stat row
3. Problem / Diagnosis — two-column: copy + 4 client quote cards
4. What We Are — heading + two-column comparison grid (Others vs TBG)
5. Consult-to-Member Engine — two-column: features + pipeline visualization
6. DIOT Methodology — 4-cell grid (Diagnose, Install, Optimize, Track)
7. Metrics — 4-cell grid with large Cormorant gold numbers
8. Who It's For — two-column: copy + fit checklist card
9. CTA section — centered, diagnostic framing, single button
10. Footer — logo + geography + copyright

**Design tokens (CSS custom properties):**
- `--c-bg: #09152A`, `--c-bg-2: #0D1C35`, `--c-bg-3: #112040`
- `--c-surface: #15294C`, `--c-elevated: #1A3055`
- `--c-gold: #C2A050`, `--c-gold-lt: #D4B46A`
- `--c-text: #EBE4D8`, `--c-text-2: #8FA4BE`, `--c-text-3: #4D6880`

**Modifications made after initial build:**
- `.card-elevated` — added `border-top: 2px solid rgba(194,160,80,0.55)` gold accent
- `.diot-cell` — added `border-top: 1px solid rgba(194,160,80,0.18)` gold accent
- `.metric-cell` — added `border-top: 1px solid rgba(194,160,80,0.15)` gold accent
- `.nav` — changed `align-items: center` → `align-items: stretch`
- Added `.nav-logo-link` class for full-height logo anchor
- `.nav-logo` — changed from `height: 44px` → `height: 100%` (fills nav)
- Nav HTML — removed `padding-left` from `.wrap` so logo sits flush-left
- All 3 CTA buttons — text changed from "Book a Strategy Call" to "See Where Revenue Is Leaking"

---

### `c:\Github4claude\ClaudeWebsite\serve.mjs`
**Created from scratch** — simple Node.js HTTP server.

- Serves project root at `http://localhost:3000`
- Handles `.html`, `.css`, `.js`, `.png`, `.jpg`, `.svg`, `.webp`, `.woff`, `.woff2` MIME types
- No dependencies (uses built-in `http`, `fs`, `path` modules)

---

### `c:\Github4claude\ClaudeWebsite\screenshot.mjs`
**Created from scratch** — full-page Puppeteer screenshot utility.

- Viewport: 1440×900, `deviceScaleFactor: 2`
- Waits for `networkidle2` before capturing
- Injects CSS to force `.reveal` elements visible before capture
- Scrolls through full page to trigger JS-based reveals, then returns to top
- Auto-increments output filename: `./temporary screenshots/screenshot-N[-label].png`
- Usage: `node screenshot.mjs http://localhost:3000 [label]`

---

### `c:\Github4claude\ClaudeWebsite\screenshot-sections.mjs`
**Created from scratch** — viewport-level section screenshots via Puppeteer.

- Viewport: 1440×900, `deviceScaleFactor: 2`
- Injects CSS to force `.reveal` and `.he` elements visible
- Scrolls to predefined Y offsets and captures viewport (not full page, not clipped)
- Saves: `sec-hero.png`, `sec-problem.png`, `sec-compare.png`, `sec-engine.png`, `sec-diot.png`, `sec-metrics.png`, `sec-cta.png`
- All output to `./temporary screenshots/`

---

### `c:\Github4claude\ClaudeWebsite\CLAUDE.md`
**Modified** (pre-existing file, one patch):
- Line 40: Fixed filename reference from `CRO reference framework.md/` → `CRO-reference-framework.md`

---

### `c:\Github4claude\ClaudeWebsite\PROJECT_STATE.md`
**Created this session** — project handover document.

---

### `c:\Github4claude\ClaudeWebsite\CHANGELOG.md`
**Created this session** — this file.

---

### `C:\Users\bauma\.claude\projects\c--Github4claude-ClaudeWebsite\memory\MEMORY.md`
**Created this session** — Claude's persistent memory for this project.

- Design tokens, font choices, section list
- Brand rules summary
- Infrastructure notes (serve.mjs, screenshot.mjs)
- Known constraints

---

## Commands Run That Matter

```bash
# Start dev server (run in background before any screenshots)
cd c:/Github4claude/ClaudeWebsite && node serve.mjs

# Full-page screenshot
node screenshot.mjs http://localhost:3000 [label]

# Section-by-section screenshots
node screenshot-sections.mjs
```

---

## Files NOT Modified (Session 1)
- `brand_assets/TBG_logo.png` — untouched (deleted in session 3)
- `brand_assets/brand-guidelines.md` — untouched (read-only reference)
- `CRO-reference-framework.md` — untouched (read-only reference)
- `package.json` — untouched (only `puppeteer` dependency)
- `package-lock.json` — untouched
- `node_modules/` — untouched

---

# Session 2 — 2026-02-28

## Files Modified

### `c:\Github4claude\ClaudeWebsite\index.html`

**Nav logo — replaced `<img>` with inline SVG + text wordmark**
- Removed: `<img src="brand_assets/TBG_logo.png" class="nav-logo">`
- Added: hand-crafted water-drop SVG icon + "T. Baumann Group" text in a flex-column `.nav-wordmark` span
- SVG geometry: `viewBox="0 0 60 82"` — 3 concentric ellipses (graduated opacity 0.35/0.62/0.90), vertical stem, sphere with specular highlight, teardrop path below

**Footer logo — replaced `<img>` with same wordmark treatment**
- Same structure, smaller sizes, opacity 0.65

**New CSS classes added:**
- `.nav-wordmark` — Cormorant Garamond 28px, flex-column, centered in 76px nav height
- `.nav-drop-icon` — 24×33px, `color: var(--c-gold)`
- `.footer-wordmark` — 18px, inline-flex column, opacity 0.65
- `.footer-drop-icon` — 16×22px

**Hover interactions added (5 component types) — all inside HOVER INTERACTIONS CSS block:**
- Pipeline steps: `translateX(5px)` + dot glow + inner dot scale + label color
- DIOT cells: bg → `--c-elevated` + border-top brighten + badge glow
- Metric cells: bg → `--c-surface` + border-top brighten + number `text-shadow`
- Hero stat items: `translateY(-4px)` + number glow
- Quote cards: `translateX(4px)` + `border-left-color` brighten + bg shift + text brighten
- All transitions on specific properties only. Easing: `cubic-bezier(0.22,1,0.36,1)`

**Copy — diagnostic reframing:**
- CTA `t-label`: "Book a Strategy Call" → "Revenue Diagnostic"
- CTA paragraph: reworded to remove "strategy call" framing; now reads as a diagnostic conversation

### `c:\Github4claude\ClaudeWebsite\PROJECT_STATE.md`
- Fully rewritten to reflect session 2 state

---

# Session 3 — 2026-03-01

## Files Modified

### `c:\Github4claude\ClaudeWebsite\index.html`

**Nav + footer logo — replaced hand-crafted inline SVG with actual brand asset:**
- Replaced `<svg class="nav-drop-icon" ...>` (hand-crafted) with `<img src="brand_assets/raindrop icon.svg" class="nav-drop-icon" alt="">`
- Same in footer (`footer-drop-icon`)
- Updated `.nav-drop-icon` → `height: 32px`, `.footer-drop-icon` → `height: 20px`
- Updated `.nav-wordmark` font-size 28px → 26px, gap 5px → 4px

**Hover interactions added — hero stat items + quote cards:**
- `.stat-item` hover: `translateY(-4px)` + `.stat-num` glows gold
- `.quote-card` hover: `translateX(4px)` + border-left brightens + bg lifts + text brightens

**Copyright year:** `© 2025` → `© 2026`

**Dead CSS removed:** `.nav-logo { height: 100%; }` in `@media (max-width: 900px)` block

### `c:\Github4claude\ClaudeWebsite\serve.mjs`
- Added `decodeURIComponent()` to URL path handling so filenames with spaces (e.g., `raindrop icon.svg`) are served correctly

### `brand_assets/raindrop icon.svg`
- Removed two full-canvas background rectangles (`fill="#ffffff"` and `fill="#242426"`) that were causing a visible box around the icon
- Icon now renders transparently against whatever background is behind it

### `c:\Github4claude\ClaudeWebsite\PROJECT_STATE.md`
- Fully rewritten to reflect session 3 state

### `C:\Users\bauma\.claude\projects\c--Github4claude-ClaudeWebsite\memory\MEMORY.md`
- Updated to reflect new logo approach and serve.mjs fix

## Files Deleted
- `brand_assets/TBG_logo.png` — replaced by SVG-based logo in session 2; deleted per user request
- `brand_assets/T Baumann Group Logo Transparent.svg` — attempted as nav logo, incompatible with img tag approach; deleted per user request

## Files NOT Modified (Session 3)
- `brand_assets/brand-guidelines.md` — read-only reference
- `CRO-reference-framework.md` — read-only reference
- `screenshot.mjs` — unchanged
- `screenshot-sections.mjs` — unchanged
- `package.json`, `package-lock.json`, `node_modules/` — unchanged
