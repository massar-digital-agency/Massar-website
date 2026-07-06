---
name: massar-frontend-conventions
description: Use when building or modifying frontend code for Massar Agency projects — component structure, styling conventions, animation patterns, and general React best practices. Applies to any .jsx/.tsx file in a Massar Agency frontend repo.
---

# Massar Agency — Frontend Conventions

## Stack
- **Build tool:** Vite
- **Framework:** React
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Routing:** React Router (post-migration)

## Component conventions
- Functional components with hooks only — no class components.
- One component per file, colocated with its styles (Tailwind utility classes inline, no separate CSS files unless truly global).
- Shared/reusable UI pieces live in a `components/` directory; page-level components live in `pages/` or `routes/`.
- Keep animation logic (Framer Motion variants) declared at the top of the component or in a shared `animations.js`/`motionVariants.js` file if reused across multiple components — don't inline complex variant objects repeatedly.

## Styling conventions
- Tailwind utility-first — avoid custom CSS unless Tailwind can't express it (e.g. complex keyframes).
- Use Tailwind's config for brand colors/fonts rather than hardcoding hex values in components.
- Responsive design is mobile-first: base classes for mobile, `sm:`/`md:`/`lg:` for larger breakpoints.

## Framer Motion conventions
- Wrap route-level transitions in `AnimatePresence` with `mode="wait"` unless overlapping transitions are intentional.
- Use `useLocation().key` as the animation key when animating page transitions with React Router.
- Keep entrance/exit animation durations short (200–400ms) for perceived performance — this is a client-facing agency site, snappy > flashy.

## Performance & SEO awareness
- Lazy-load route components with `React.lazy` + `Suspense` where reasonable, to keep initial bundle small (Core Web Vitals).
- Always set a unique `<title>` and meta description per page.
- Images: use appropriate `width`/`height` attributes to avoid layout shift (CLS), and prefer modern formats (WebP/AVIF) where the client's assets allow it.

## What NOT to do
- Don't introduce a new state management library (Redux, Zustand, etc.) without discussing it first — prefer React context/hooks for this scale of project unless a clear need is demonstrated.
- Don't hardcode client-specific copy/content directly in component logic — keep content easily editable (constants file or CMS-driven if applicable).
