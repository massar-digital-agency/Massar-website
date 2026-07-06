---
name: massar-seo-routing
description: Use when working on Massar Agency's website — migrating from hash-based routing to React Router, or implementing canonical tags, hreflang, per-page SEO metadata, GA4 tracking, or Core Web Vitals optimizations. Applies to any file under the Massar Agency frontend repo.
---

# Massar Agency — SEO & Routing Migration

## Stack
- **Build tool:** Vite
- **Framework:** React
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Routing (current):** Hash-based routing (e.g. `/#/services`)
- **Routing (target):** React Router (browser history routing, e.g. `/services`)
- **Analytics:** GA4
- **SEO targets:** Canonical tags, hreflang, per-page metadata (title, description, OG tags)

## Why this migration matters
Hash-based routing (`/#/route`) is invisible to search engine crawlers as distinct pages — everything resolves to `/`. This blocks:
1. Canonical tags per page (all pages canonicalize to the same URL)
2. hreflang alternates for multi-language targeting (Algerian FR/AR/EN audiences)
3. Per-page metadata injection (title/description differ per route but crawlers only see the root)

This is the current top-priority blocker for Massar Agency's SEO strategy.

## Migration approach
1. Replace `HashRouter` with `BrowserRouter` from `react-router-dom`.
2. Audit all internal `<a href="#/...">` and programmatic hash navigation — convert to `<Link to="/...">` or `useNavigate()`.
3. Confirm hosting/server config supports SPA fallback (rewrite all routes to `index.html`) — required for browser routing to survive page refresh/direct URL access. Check Vercel/Netlify/Nginx config depending on where Massar Agency is hosted.
4. Add a metadata solution per route (e.g. `react-helmet-async` or manual `document.title`/meta tag updates in each page component).
5. Add canonical `<link rel="canonical">` per page, generated from the route.
6. Add hreflang tags if multiple language versions exist or are planned.
7. Re-verify GA4 pageview tracking still fires correctly on route change (SPA route changes don't trigger a full page load, so GA4 needs manual `page_view` events on navigation).
8. Re-check Core Web Vitals after migration (route change behavior can affect CLS/LCP if not handled carefully with Framer Motion transitions).

## Constraints / conventions to preserve
- Keep Framer Motion page transition animations working across route changes (test `AnimatePresence` behavior with React Router's `useLocation` key).
- Don't break existing Tailwind class structure or component organization during the router swap — this should be a routing-layer change, not a redesign.
- Maintain any existing multi-language content structure when adding hreflang.

## Testing checklist before considering this done
- [ ] Direct URL access to a non-root route works (no 404) after a hard refresh
- [ ] Each page has a unique, correct `<title>` and meta description
- [ ] Canonical tag present and correct on every page
- [ ] GA4 registers a pageview on every route change, not just initial load
- [ ] Framer Motion transitions still animate correctly between routes
- [ ] No remaining `#/` links anywhere in the codebase
