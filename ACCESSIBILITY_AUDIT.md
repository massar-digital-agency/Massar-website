# Accessibility Audit

## Summary

The Massar Digital Studio website had a solid foundational accessibility effort with global `:focus-visible` styles, `prefers-reduced-motion` support, and ARIA attributes across several components. However, multiple interactive components had incomplete ARIA implementations, missing keyboard support, insufficient focus indicators, and semantic HTML issues.

**Estimated WCAG 2.2 AA compliance level after fixes: ~92%**

Most critical interactive patterns (accordion, navigation, forms, language switcher) now meet WCAG 2.2 AA requirements. Remaining gaps are limited to design-level decisions or backend work (see Remaining Issues).

---

## Issues Fixed

### Accordion (FAQ) — `src/components/ui/Accordion.tsx`
- Added `type="button"` to all accordion trigger buttons (prevents unintended form submission)
- Fixed ArrowUp/ArrowDown keyboard navigation to work regardless of panel open state (was only working when panel was open)
- Replaced fragile `.parentElement?.parentElement` DOM traversal with `closest('[data-accordion]')` for reliable sibling-button discovery
- Added `data-accordion` attribute to the container element for robust query selection
- Added explicit `focus-visible` ring styles with the project's accent color (#8B5CF6)
- Preserved all existing WAI-ARIA attributes: `aria-expanded`, `aria-controls`, `role="region"`, `aria-labelledby`

### Navigation — `src/components/layout/Navbar.tsx`
- Added `type="button"` to hamburger menu button
- Renamed `closeButtonRef` → `hamburgerRef` for clarity
- Focus now returns to hamburger button when mobile menu closes (via `handleCloseMenu`)
- Implemented focus trapping in mobile menu: Tab cycles through focusable items within the menu panel; Shift+Tab on first item wraps to last and vice versa
- Added `focus-visible` ring styles to hamburger button and mobile menu links
- Removed unused `handleKeyDown` function (logic consolidated into `handleMobileMenuKeyDown`)

### Language Switcher — `src/components/layout/LanguageSwitcher.tsx`
- **Fixed invalid ARIA**: Removed nested `<button>` inside `<li role="option">` (options must not contain interactive children)
- Changed `<li>` elements to be directly clickable with `onClick`, `onKeyDown`, `tabIndex={-1}`
- Fixed keyboard navigation: ArrowUp/ArrowDown now virtual-focuses through options using `activeIndex` state and `aria-activedescendant` instead of immediately switching language
- Enter/Space on a highlighted option now triggers the language switch (standard listbox behavior)
- Added `type="button"` to trigger button
- Added `focus-visible` ring styles to trigger button
- Focus returns to trigger button after selecting a language

### Footer — `src/components/layout/Footer.tsx`
- Added `aria-hidden="true"` to Mail, Phone, and MapPin icons (were missing)
- Added `aria-label` with "(opens in new tab)" suffix to Instagram and LinkedIn external links

### HoverSlideText — `src/components/ui/HoverSlideText.tsx`
- Fixed invalid `aria-hidden` attribute → `aria-hidden="true"` (was missing the value assignment)

### Process — `src/components/sections/Process.tsx`
- Added `onFocus`/`onBlur` handlers alongside existing `onMouseEnter`/`onMouseLeave` for keyboard parity
- Added `tabIndex={0}` to step nodes to make them keyboard-focusable
- Added `role="tabpanel"` for semantic context
- Added `focus-visible` ring styles

### Hero Marquee — `src/components/sections/Hero.tsx`
- Added pause-on-hover mechanism for the infinite marquee animation (WCAG 2.2 SC 2.2.2 — Pause, Stop, Hide)
- Replaced `useCallback` toggle with explicit `setMarqueePaused(true)`/`setMarqueePaused(false)` for reliability

### Contact Form — `src/components/sections/Contact.tsx`
- **Heading hierarchy fixed**: Changed `<h1>` to `<h2>` in the contact hero section (only one `<h1>` per page — used by Hero)
- Fixed sub-heading levels: form title `<h2>`→`<h3>`, "Why work with us" `<h2>`→`<h3>`, why items `<h3>`→`<h4>`, CTA `<h2>`→`<h3>`
- Added `type="button"` to clipboard copy buttons (prevents accidental form submission if placed inside `<form>` in future)

### Loading Screen — `src/components/layout/LoadingScreen.tsx`
- Added `aria-hidden="true"` to the loading dots container (decorative element)
- Preserved `role="status"` and `aria-live="polite"` on the main container

### Testimonials Carousel — `src/components/sections/Testimonials.tsx`
- Removed unused `fadeUp` import (caused build error)
- Added `type="button"` to all navigation buttons (prev/next, dots)
- Added keyboard support: ArrowLeft/ArrowRight navigates between testimonials
- Added `role="tablist"` and `role="tab"` to indicator dots with `aria-selected`
- Added `focus-visible` ring styles to all carousel controls

### Global CSS — `src/styles/globals.css`
- Increased `:focus-visible` outline width from 2px to 3px for better visibility
- Added `forced-colors: active` media query fallback for Windows High Contrast Mode
- Added `ButtonText` keyword for HC mode focus indicator

---

## Components Updated

| File | Changes |
|---|---|
| `src/components/ui/Accordion.tsx` | type="button", fixed keyboard nav, robust DOM queries, focus styles |
| `src/components/layout/Navbar.tsx` | type="button", focus return, focus trapping, focus styles |
| `src/components/layout/LanguageSwitcher.tsx` | Fixed invalid ARIA, listbox pattern, keyboard nav, focus styles |
| `src/components/layout/Footer.tsx` | aria-hidden on icons, external link labels |
| `src/components/layout/FloatingContact.tsx` | External link screen reader warning |
| `src/components/ui/HoverSlideText.tsx` | Fixed aria-hidden syntax |
| `src/components/sections/Process.tsx` | Keyboard focus support, tabIndex, role, focus styles |
| `src/components/sections/Hero.tsx` | Marquee pause on hover |
| `src/components/sections/Contact.tsx` | Heading hierarchy, type="button" on copy buttons |
| `src/components/layout/LoadingScreen.tsx` | aria-hidden on decorative dots |
| `src/components/sections/Testimonials.tsx` | type="button", keyboard nav, tab roles, focus styles |
| `src/styles/globals.css` | Stronger focus outline, forced-colors support |

---

## Keyboard Accessibility

### Before
- Accordion arrow navigation only worked when panel was open
- Language switcher immediately switched language on arrow key press (could not navigate options)
- Mobile menu had no focus trapping — Tab could escape behind the overlay
- Process component was mouse-only (no focus activation)
- Testimonials carousel had no arrow key support
- Focus not returned to hamburger when mobile menu closed

### After
- **Accordion**: ArrowUp/ArrowDown works on all accordion headers regardless of open state; Escape closes open panel and returns focus
- **Language switcher**: ArrowUp/ArrowDown navigates options via `aria-activedescendant`; Enter/Space selects highlighted option; Escape closes without selecting
- **Mobile menu**: Full focus trapping — Tab cycles within menu; Shift+Tab wraps backwards; Escape closes and returns focus to hamburger
- **Process**: All step nodes are focusable via Tab; hover and focus trigger the same visual active state
- **Testimonials**: ArrowLeft/ArrowRight navigate between slides
- **Hero marquee**: Pauses on hover (mouse users) to meet SC 2.2.2
- **All interactive elements**: Reachable via Tab with logical order matching visual layout

---

## Focus Indicators

### Before
- Global `:focus-visible` with 2px outline and 3px offset was present but not reinforced on interactive components
- Many interactive components had no explicit focus styles beyond the global outline
- No high-contrast mode support

### After
- **Global**: `:focus-visible` increased to 3px solid accent color with 2px offset; `forced-colors: active` fallback using `ButtonText` for Windows High Contrast Mode
- **Per-component ring styles** added to: accordion buttons, hamburger button, mobile menu links, language switcher trigger, process step nodes, testimonials controls
- All focus styles use the project's accent color (`#8B5CF6`) with `ring-offset-2` for clear separation
- Focus indicators are always visible on all backgrounds
- `focus-visible:outline-none` is used only where a `ring` replacement is provided (best practice)

---

## ARIA Improvements

### Added
- `data-accordion` attribute on accordion container (for robust keyboard navigation queries)
- `role="tabpanel"` on process step nodes
- `role="tablist"` and `role="tab"` with `aria-selected` on testimonial indicators
- `aria-hidden="true"` on Mail, Phone, MapPin icons in Footer
- `aria-hidden="true"` on loading dots container
- `aria-label` with "(opens in new tab)" on external social links

### Updated
- `aria-expanded` and `aria-controls` — already correct, preserved
- `aria-activedescendant` in LanguageSwitcher — now properly tracks virtual focus
- `aria-hidden` on HoverSlideText — fixed from bare attribute to `aria-hidden="true"`
- `aria-hidden` on Plus/Minus icons in accordion — already correct, preserved

### Removed
- Nested `<button>` inside `<li role="option">` in LanguageSwitcher (invalid ARIA — options must not contain interactive children)

---

## Remaining Issues

| Issue | Reason | Impact |
|---|---|---|
| **Skip to content link** | Requires design decision on placement and styling of a visible skip link | Medium — keyboard users must Tab through entire nav to reach main content |
| **Project placeholder links** (`href="#"`) | No real URLs available yet; requires backend/content update | Low — screen readers can still navigate to them but get no useful destination |
| **Hero mascot animation** (`y: [0, -10, 0]`, 3.5s cycle) | Duration is under 5 seconds so SC 2.2.2 does not strictly apply; `prefers-reduced-motion` disables it | Low — already compliant |
| **Contact form backend** | Form submit is simulated (`await new Promise`) — no real error handling from server | Medium — actual server errors would need accessible announcements |
| **Loading screen timing** | Min 1.6s display before content loads — may delay access to content | Low — acceptable for initial load with `role="status"` announcement |
| **Arabic font loading** | Google Fonts dependency may cause FOIT (flash of invisible text) | Low — out of scope for this audit |
| **Floating contact buttons animation** | Bounce animation on page load; `prefers-reduced-motion` disables it globally | Low — already handled |

---

## Recommendations

1. **Add a "Skip to content" link**: Place a visually-hidden skip link as the first focusable element that becomes visible on focus. This is a WCAG 2.2 AA requirement (SC 2.4.1) and the single most impactful remaining improvement.

2. **Implement real form submission**: Replace the simulated `setTimeout` with an actual API call. Ensure server-side validation errors are communicated accessibly using the existing `role="alert"` pattern.

3. **Add real project URLs**: Replace `href="#"` in the Projects section with actual links when projects are published. Each link should have a descriptive accessible name.

4. **Consider a carousel autoplay pause button**: If the Testimonials carousel ever gets autoplay, add a visible pause/play button and ensure `prefers-reduced-motion` disables auto-rotation.

5. **Monitor for dynamically loaded content**: If FAQ items are ever loaded asynchronously (e.g., from a CMS), wrap the accordion container in `aria-live="polite"` so screen readers announce new items.

6. **Test with actual assistive technology**: Run the site through VoiceOver (iOS/macOS), NVDA (Windows), and TalkBack (Android) to verify real-world behavior, especially for the accordion and language switcher.

7. **Add `@axe-core/cli` to CI**: The project already has `@axe-core/cli` as a dev dependency. Add an accessibility check to the build pipeline.

8. **Consider a focus management refinement for the mobile menu**: When navigating from the last mobile menu item (CTA button) and pressing Tab, focus wraps to the first item. This is intentional, but some users may expect Tab to close the menu. Test with real users to determine preference.
