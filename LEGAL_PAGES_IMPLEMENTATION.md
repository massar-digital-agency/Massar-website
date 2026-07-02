# Legal Pages Implementation

## Pages Created

### 1. Privacy Policy (`#/privacy`)
- **File:** `src/components/legal/PrivacyPolicy.tsx`
- **Locales:** `src/locales/{en,ar,fr}.json` — `legal.privacy.*`
- **Route:** `#/privacy`
- **Covers:** Who we are, information collected (contact form: name, email, company, website, service, budget, description), automatically collected data (IP, browser, device, pages), legal basis (GDPR), cookies, third-party services, data retention, security measures, user rights (access, rectification, erasure, restriction, portability, objection, withdrawal, complaint), international data transfers, children's privacy, policy changes, contact information.
- **Languages:** English, Arabic, French (language-aware content switching).

### 2. Terms of Service (`#/terms`)
- **File:** `src/components/legal/TermsOfService.tsx`
- **Locales:** `src/locales/{en,ar,fr}.json` — `legal.terms.*`
- **Route:** `#/terms`
- **Covers:** Introduction, services offered, client responsibilities, payments and fees (pricing, payment terms, late payments, expenses), intellectual property rights (deliverables, Massar IP, client materials, portfolio rights), warranties and disclaimers, limitation of liability, termination (by either party, by client, by Massar), confidentiality, website use, third-party links, governing law and dispute resolution, changes to terms, contact information.
- **Languages:** English, Arabic, French (language-aware content switching).

### 3. Cookie Policy (`#/cookies`)
- **File:** `src/components/legal/CookiePolicy.tsx`
- **Locales:** `src/locales/{en,ar,fr}.json` — `legal.cookies.*`
- **Route:** `#/cookies`
- **Covers:** What are cookies, types of cookies (essential, analytics, functional, marketing), specific cookies table (`massar_cookie_consent`, `i18nextLng`), third-party cookies, cookie consent and management, how consent is obtained, policy updates, contact information.
- **Languages:** English, Arabic, French (language-aware content switching).

## Placeholder Information Requiring Owner Review

> ⚠️ **All placeholders are marked with square brackets `[LIKE THIS]` throughout the legal pages.** These must be completed with accurate business-specific information before going live. Consult a qualified legal professional.

### Privacy Policy Placeholders
| Placeholder | Location | Description |
|---|---|---|
| `[DATE — REVIEW AND UPDATE REGULARLY]` | Top of all 3 legal pages | Last updated date |
| `[COMPANY NAME — Insert official legal entity name...]` | Section 1 | Official registered company name, registration number, registered address |
| `[RETENTION PERIOD — e.g., 2 years]` | Section 7 | Actual data retention periods |
| `[ANALYTICS PROVIDER...]` | Section 6 | Name of analytics service and link to its privacy policy |
| `[EMAIL SERVICE PROVIDER...]` | Section 6 | Name of email service used |
| `[HOSTING PROVIDER...]` | Section 6 | Web hosting provider name |
| `[ADDITIONAL THIRD-PARTY SERVICES...]` | Section 6 | Any other integrated services |
| `[SPECIFY ACTUAL RETENTION PERIODS...]` | Section 7 | Data retention specifics |
| `[SPECIFY COUNTRIES WHERE DATA MAY BE TRANSFERRED...]` | Section 10 | International transfer locations and safeguards |
| `[MAILING ADDRESS...]` | Section 13 | Physical business address |
| `[DATA PROTECTION OFFICER CONTACT...]` | Section 13 | DPO contact if applicable |

### Terms of Service Placeholders
| Placeholder | Location | Description |
|---|---|---|
| `[WEBSITE URL]` | Section 1 | Full website URL |
| `[COMPANY NAME — Insert official legal entity name]` | Section 1 | Registered legal entity |
| `[ADDITIONAL SERVICES...]` | Section 2 | Any unlisted services |
| `[CURRENCY — e.g., USD]` | Section 4.1 | Pricing currency |
| `[DEPOSIT PERCENTAGE — e.g., 50%]` | Section 4.2 | Required deposit before work |
| `[LATE PAYMENT GRACE PERIOD — e.g., 15 days]` | Section 4.3 | Days before late fees apply |
| `[LATE FEE PERCENTAGE — e.g., 1.5%]` | Section 4.3 | Monthly late fee rate |
| `[SPECIFY PAYMENT CURRENCY...]` | Section 4 | Payment policy specifics |
| `[WARRANTY PERIOD — e.g., 30 days]` | Section 6.1 | Post-delivery defect warranty |
| `[LIABILITY PERIOD — e.g., 12 MONTHS]` | Section 7 | Liability limitation period |
| `[REVIEW WITH LEGAL COUNSEL...]` | Section 7 | Liability limitation disclaimer |
| `[TERMINATION NOTICE PERIOD — e.g., 30 days]` | Section 8.1 | Notice period for termination |
| `[CURE PERIOD — e.g., 15 days]` | Section 8.1 | Time to cure a breach |
| `[CONFIDENTIALITY PERIOD — e.g., 2 years]` | Section 9 | Confidentiality obligation duration |
| `[JURISDICTION — e.g., Algeria]` | Section 12 | Governing law jurisdiction |
| `[NEGOTIATION PERIOD — e.g., 30 days]` | Section 12 | Dispute negotiation period |
| `[DISPUTE RESOLUTION METHOD...]` | Section 12 | Binding arbitration or court venue |

### Cookie Policy Placeholders
| Placeholder | Location | Description |
|---|---|---|
| `[ANALYTICS SERVICE NAME...]` | Section 2.2 | Name and link to analytics provider's cookie/privacy policy |
| `[RETENTION PERIOD — e.g., 26 months]` | Section 2.2 | Analytics data retention period |
| `[LIST ANY FUNCTIONAL COOKIES USED...]` | Section 2.3 | Functional cookies from third-party services |
| `[LIST ANY MARKETING COOKIES USED...]` | Section 2.4 | Marketing cookies (or state none currently used) |
| `[ADD ROWS FOR ANY OTHER COOKIES...]` | Cookies table | Additional cookies set by the website |
| `[ANALYTICS PROVIDER]` | Section 4 | Link to analytics provider's cookie policy |
| `[ADDITIONAL THIRD-PARTY SERVICES...]` | Section 4 | Other services that set cookies |
| `[COOKIE PREFERENCES BUTTON LABEL]` | Section 5 | Label for the "Manage Preferences" link |

## Cookie Categories

| Category | Description | Default State |
|---|---|---|
| **Essential** (1 cookie: `massar_cookie_consent`) | Required for basic website operation. Stores consent preferences. | Always active |
| **Functional** (1 cookie: `i18nextLng`) | Remembers language and UI preferences. | Rejected by default |
| **Analytics** | Collects anonymous usage data for improvement. Integrated with analytics module. | Rejected by default |
| **Marketing** | Tracks browsing habits for targeted advertising. | Rejected by default |

### Cookie Consent Storage
- **Storage Key:** `massar_cookie_consent`
- **Format:** JSON object with boolean values for `essential`, `analytics`, `functional`, `marketing`
- **Duration:** 1 year
- **Consent sync:** The cookie banner also calls `updateConsent()` from `src/lib/analytics.ts` which sets `analytics_consent` in localStorage and updates GCM (Google Consent Mode) if GA4/GTM is configured.

## Third-Party Services Referenced

The following third-party services are referenced in the legal pages as services used by Massar Digital Studio. Each reference is marked as a placeholder for the owner to verify actual usage:

| Service | Purpose | Referenced In |
|---|---|---|
| **Google Fonts** | Web typography | Privacy Policy, Cookie Policy |
| **Calendly** | Scheduling discovery calls | Privacy Policy, Cookie Policy |
| **WhatsApp** | Business communication | Privacy Policy |
| **Instagram** | Social media presence | Privacy Policy |
| **LinkedIn** | Professional networking | Privacy Policy |
| **[Analytics Provider]** | Website analytics | Privacy Policy, Cookie Policy (placeholder) |
| **[Email Service Provider]** | Business email communications | Privacy Policy (placeholder) |

## User Rights Coverage

The Privacy Policy addresses the following rights frameworks:

| Framework | Coverage | Sections |
|---|---|---|
| **GDPR (EEA/UK)** | Full coverage | Legal basis (Section 4), Rights (Section 9), Data transfers (Section 10) |
| **Algerian Law 18-07** | Specific reference | Rights (Section 9) — right to contact APDCP |
| **CCPA (California)** | Specific reference | Rights (Section 9) — right to know, delete, opt-out, non-discrimination |
| **Children's Privacy** | Age 16+ threshold | Section 11 |

## Accessibility (WCAG 2.2 AA)

All legal components follow the existing design system patterns:
- Semantic HTML (`<main>`, `<article>`, `<section>`, `<h1>`, `<h2>`, `<h3>`, `<nav>`)
- Proper heading hierarchy
- ARIA attributes where needed (`role="alert"`, `aria-live="polite"`, `aria-modal="true"`)
- Focus-visible ring styles on all interactive elements
- Sufficient color contrast ratios (following existing Tailwind theme)
- Reduced motion support (using existing `prefers-reduced-motion` media query in `globals.css`)
- Skip-link navigation (inherited from Navbar)
- Keyboard-operable cookie banner with proper focus management

## Code Quality

- **No duplicated content:** Legal text exists in single source components with language-based conditional rendering
- **Modular components:** `LegalLayout`, `LegalSection`, `LegalSubsection`, `LegalParagraph`, `LegalList`, `LegalNotice` are reusable across all legal pages
- **Design system reuse:** Uses `Container`, existing color tokens, typography classes
- **Analytics integration:** Existing `trackEvent` and analytics module are used; cookie consent hooks integrate with `updateConsent()` for Google Consent Mode v2 support
- **SEO:** Each legal page has unique `<Helmet>` with canonical URLs, hreflang tags, OG meta, and Twitter Card meta

## Files Modified

| File | Change |
|---|---|
| `src/App.tsx` | Added legal page routing, integrated CookieBanner, added useCookieConsent hook |
| `src/lib/navigate.ts` | Added `isOnLegalPage()`, `navigateToLegalPage()` functions |
| `src/components/layout/Footer.tsx` | Updated legal links to use hash navigation with analytics tracking |
| `src/locales/en.json` | Added `cookieBanner.*` and `legal.*` translation keys |
| `src/locales/ar.json` | Added `cookieBanner.*` and `legal.*` translation keys |
| `src/locales/fr.json` | Added `cookieBanner.*` and `legal.*` translation keys |

## Files Created

| File | Purpose |
|---|---|
| `src/hooks/useCookieConsent.ts` | React hook for cookie consent state management |
| `src/components/layout/CookieBanner.tsx` | Cookie consent banner with Accept All, Reject, and Manage Preferences |
| `src/components/legal/LegalLayout.tsx` | Reusable legal page layout and typography components |
| `src/components/legal/PrivacyPolicy.tsx` | Privacy Policy page (EN/FR/AR) |
| `src/components/legal/TermsOfService.tsx` | Terms of Service page (EN/FR/AR) |
| `src/components/legal/CookiePolicy.tsx` | Cookie Policy page (EN/FR/AR) |

## Navigation Flow

```
Footer → Privacy Policy (#/privacy)  → layout/Navbar + Footer + FloatingContact
Footer → Terms of Service (#/terms)  → layout/Navbar + Footer + FloatingContact
Footer → Cookie Policy (#/cookies)   → layout/Navbar + Footer + FloatingContact
```

The Cookie Banner appears on all pages (including legal pages) when consent hasn't been given.

## Remaining Compliance Considerations

### High Priority (Before Go-Live)
1. **[REQUIRED] Complete all placeholders** marked with `[ ]` in the legal pages with accurate business information.
2. **[REQUIRED] Legal review:** Have all three legal documents reviewed by a qualified legal professional familiar with:
   - Algerian Law 18-07 on Personal Data Protection
   - GDPR (if serving EEA clients)
   - CCPA (if serving California residents)
   - Algerian e-commerce and contract law
3. **[REQUIRED] Verify third-party services:** Update the placeholder lists with the actual third-party services used (analytics provider, email service, hosting provider, etc.).
4. **[REQUIRED] Add real company registration details:** Legal entity name, registration number, registered address, VAT/TVA number if applicable.

### Medium Priority
5. **Configure analytics provider:** The analytics module in `src/lib/analytics.ts` supports GA4 and GTM but requires `initAnalytics()` to be called with actual measurement IDs. The cookie consent banner integrates with this module via `updateConsent()`.
6. **Review Calendly integration:** Currently points to `https://calendly.com` (placeholder). Update to actual Calendly link and review Calendly's data processing terms.
7. **Update social media links:** LinkedIn, GitHub, Behance, Dribbble links in Footer are `"#"` placeholders.

### Low Priority / Ongoing
8. **Cookie scanning:** Run a cookie scanning tool (e.g., Cookiebot, OneTrust, or open-source alternatives) to audit actual cookies set by the website and update the Cookie Policy tables accordingly.
9. **Regular reviews:** Schedule quarterly reviews of all legal pages to ensure continued accuracy.
10. **DPIA:** Consider conducting a Data Protection Impact Assessment (DPIA) if processing high-risk data.
11. **Consent records:** The current implementation stores consent in localStorage. For full GDPR compliance, consider implementing server-side consent logging.
12. **Privacy by design:** When adding new features (newsletter signup, user accounts, comments), ensure privacy considerations are integrated from the start.
13. **Data processing agreements:** If using third-party services that process personal data (Calendly, analytics), ensure appropriate Data Processing Agreements (DPAs) are in place.
14. **Cookie banner on subdomains:** If the website uses subdomains or separate applications, ensure the cookie banner is present on all of them.

## Current Date
This document was generated on **2026-07-02**. All date references in legal pages must be updated to reflect the actual effective date of the policies.
