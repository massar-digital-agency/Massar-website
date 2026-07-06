# Massar Agency — Website TODO (Phase 2, Codebase-Grounded)

Based on actual audit of `App.tsx`, `SEOHead.tsx`, `StructuredData`, `sections/`, `legal/`.
Stack confirmed: **Vite + React + Tailwind** (not Next.js — adjust build-time tooling accordingly).

---

## 🔴 Critical

- [X] **Convert hash-based routes to real routes** — `/about`, `/contact`, `/privacy-policy`, `/terms-of-service`, `/cookies` currently render via modal/hash, not as crawlable URLs.
  Stack: React Router (add if not present) or Vite's file-based routing plugin. Each route needs its own `<SEOHead>` call with unique meta.

- [X] **`/case-studies` index page** — listing with thumbnail cards, filters, pagination.
  Stack: React component + static JSON/MDX per case study. Est. 6h.

- [X] **Fix canonical tags on hash-based routes** — current canonical likely resolves incorrectly since routes aren't real URLs yet (depends on item above).

- [X] **Implement `hreflang` annotations** across all pages (AR/FR/EN) — add to `SEOHead.tsx` component so every page inherits it.

- [X] **Language switcher exposes `hreflang` links** — tie into the same `SEOHead.tsx` update above.

- [X] **Fix contrast ratio ≥ 4.5:1** on hero gradient background — check muted text specifically.

 

- [X] **Case study summaries** (150–200 words each) — client name, challenge, solution, results with metrics. This is content work, not code — do in parallel with dev tasks.

---

## 🟠 High

- [X] **`Organization` JSON-LD** in `StructuredData` component — add address, phone, logo (you likely have `LocalBusiness` already; `Organization` is separate schema type).
- [X] **FAQ accordion accessibility** — `aria-controls` / `aria-expanded` on each panel.
- [X] **Contact form validation** — enable `novalidate` properly, add `aria-describedby` for error messages, real-time inline validation.
- [X] **`meta robots: noindex, nofollow`** on legal pages — avoid thin-content SEO penalty.
- [X] **Alt text audit** — logo, client logos, portfolio screenshots — descriptive, keyword-rich.
- [X] **Heading hierarchy audit** — single `<h1>` per page/route, logical `<h2>`–`<h3>` across all components.
- [X] **Duplicate meta description check** — every page/route needs a unique description ≤160 chars.
- [X] **LCP image optimization** — hero background to WebP/AVIF + `<link rel="preload">`.
- [X] **`font-display: swap`** on Google Fonts (or self-hosted font).
- [X] **`rel=preconnect` / `dns-prefetch`** for `fonts.googleapis.com`, `fonts.gstatic.com`, any CDN.
- [X] **JS bundle audit** — split vendor chunks (react, tailwind) via Vite's `build.rollupOptions.output.manualChunks`. Est. 6h, high impact.
- [X] **Eliminate CLS** — explicit width/height on all images, reserve space for fonts.
- [X] **Skip-navigation link** — focusable, hidden until tab, jumps to main content.
- [X] **Keyboard-only navigation test** — every interactive element reachable, visible focus ring.
- [X] **Language switcher ARIA label** — accessible name/description.
- [X] **Multilingual copy keyword audit** — AR/FR/EN each target actual localized search terms (e.g. "développement web Algérie" not literal translation).
- [X] **Meta description per case study** — unique, keyword-rich, ≤155 chars.

---

## 🟡 Medium

- [X] **`/blog`** — content hub, SEO-friendly URLs, schema. Stack: MDX-in-repo (fits Vite well via `vite-plugin-mdx` or similar) or headless CMS if non-devs will publish.
- [X] **`/contact` as full page** (not just home section) — dedicated analytics/conversion tracking.
- [X] **Testimonials carousel** with ARIA live region.
- [X] **Sticky mobile CTA** ("Schedule a call").
- [X] **Service cards** — add `role="article"` + proper heading hierarchy.
- [X] **Process stepper** — `aria-current` + keyboard navigation.
- [X] **Breadcrumb navigation** (Home > Service > Detail).
- [X] **Structured data per case study** — `Article` + `CreativeWork` schema for rich results.
- [X] **Generate sitemap.xml via build script** — since this is Vite (not Next.js), use a script like `vite-plugin-sitemap` or a custom Node script run at build time, including multilingual URLs.
- [ ] **`robots.txt`** — allow `/`, disallow any `/api/`, point to sitemap.
- [ ] **Open Graph images per language** — localized `og:locale` + images.
- [ ] **Lazy-load below-fold images/iframes** — `loading="lazy"`.
- [ ] **Cache-Control headers** for static assets — configure at hosting layer (Vercel/Netlify config, not app code).
- [ ] **Lighthouse CI on every PR** — set failure thresholds (LCP < 2.5s, TBT < 300ms).
- [ ] **Font subsetting** — Arabic + Latin character sets only, in build pipeline.
- [ ] **`role="alert"`** on form validation messages.
- [ ] **`aria-live="polite"`** on `FloatingContact` widget when it appears.
- [ ] **Screen-reader test** (NVDA/VoiceOver) — document missing announcements.
- [ ] **Exit-intent modal** — lead capture (email + phone).
- [ ] **Scroll-depth/heatmap tracking** — Hotjar or Plausible custom events, in addition to GA4.
- [ ] **A/B test hero copy** — benefit-focused headline variant, measure CTR.
- [ ] **FAQ content per language** — answer objections (pricing, timeline, stack).
- [ ] **"Our Process" copy** — map each step to a client benefit, not just a bullet list.
- [ ] **Client testimonials in Arabic & French** — currently English-only.

---

## 🟢 Low

- [ ] **`/careers`** — static page, job openings, culture, apply CTA.
- [ ] **Dynamic "Trusted by" logos** — lazy-loaded.
- [ ] **Dark-mode toggle** — respect `prefers-color-scheme`, persist via React state (not `localStorage` per artifact rules — but fine for your actual deployed site, just not inside Claude-built artifacts).
- [ ] **Compress SVGs** — SVGO or inline minimal SVGs.
- [ ] **All icons `aria-hidden="true"`** unless informative.
- [ ] **Transcripts for video/animation** — hero animation alt text if applicable.
- [ ] **"Back to top" button** — appears after scroll.
- [ ] **Micro-animations on hover** — CTA/service cards via `framer-motion`.
- [ ] **Social proof counter** — "+200 projects delivered", fetched from static JSON.
- [ ] **Proofread & unify tone** across languages.

---

## Execution Order (Recommended)

1. Real routing (unblocks canonical, hreflang, per-page meta — everything else depends on this)
2. Contact form (validation + real page) + case study index page
3. Critical SEO items (Organization schema, alt text, heading hierarchy)
4. Performance pass (LCP, font-display, bundle splitting) — run Lighthouse baseline before/after
5. Accessibility pass (skip-nav, contrast, keyboard nav)
6. Medium items in parallel with content work (blog, testimonials, FAQ)
7. Low-priority polish before public launch push
