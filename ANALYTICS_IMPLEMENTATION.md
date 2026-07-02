# Analytics Implementation Report

## Overview

Production-ready analytics and conversion tracking system implemented across the Massar Digital Studio website.

---

## Files Changed / Created

### New Files

| File | Purpose |
|---|---|
| `src/lib/analytics.ts` | Core analytics service: GA4/GTM initialization, event tracking, consent management |
| `src/hooks/useScrollDepth.ts` | Scroll depth tracking hook (25%, 50%, 75%, 90%, 100%) |
| `src/components/layout/CookieConsent.tsx` | GDPR/cookie consent banner with Accept/Reject |
| `.env` | Environment variable template for GA4 and GTM IDs |

### Modified Files

| File | Change |
|---|---|
| `src/main.tsx` | Initialize analytics on app boot with env vars |
| `src/App.tsx` | SPA page view tracking on hash change, scroll depth hook, CookieConsent |
| `src/components/layout/Navbar.tsx` | Nav link clicks, logo clicks, CTA clicks |
| `src/components/layout/Footer.tsx` | Footer nav clicks, social links, email/phone, logo click, CTAs |
| `src/components/layout/FloatingContact.tsx` | WhatsApp & email outbound tracking |
| `src/components/layout/LanguageSwitcher.tsx` | Language change tracking |
| `src/components/sections/Hero.tsx` | Primary & secondary CTA tracking |
| `src/components/sections/Services.tsx` | Service card clicks, CTA tracking |
| `src/components/sections/Projects.tsx` | Project card clicks, CTA tracking |
| `src/components/sections/PortfolioFilters.tsx` | Filter change tracking |
| `src/components/sections/Results.tsx` | CTA tracking |
| `src/components/sections/Pricing.tsx` | Package CTA clicks, custom project CTA, schedule call (conversion) |
| `src/components/sections/Contact.tsx` | Form start, field interactions, validation errors, submit success/error, schedule call, copy to clipboard |
| `src/components/sections/FAQ.tsx` | CTA tracking |
| `src/components/sections/CTA.tsx` | CTA tracking |
| `src/components/sections/AboutPage.tsx` | Page view tracking, CTA clicks, outbound tracking |
| `src/components/ui/Accordion.tsx` | FAQ open/close toggle tracking |
| `src/components/case-studies/CaseStudyPage.tsx` | Case study page view tracking |
| `src/components/case-studies/CaseStudyCTA.tsx` | CTA click tracking |
| `src/components/case-studies/CaseStudyNav.tsx` | Previous/next navigation tracking |
| `src/components/case-studies/CaseStudyHero.tsx` | Breadcrumb navigation tracking |

---

## Architecture

### Data Flow

```
User Action → Component onClick/onChange
    → trackEvent(eventName, params)
        → window.dataLayer.push({ event: eventName, ...params })  [GTM]
        → window.gtag('event', eventName, params)                 [GA4 fallback]
```

- **Primary**: GTM (Google Tag Manager) — push events to `dataLayer`
- **Fallback**: Direct GA4 via `gtag.js` (when GTM is not configured)
- Events always push to `dataLayer` regardless of which service is active

### File: `src/lib/analytics.ts`

Core API:

| Function | Purpose |
|---|---|
| `initAnalytics({ gaMeasurementId?, gtmId? })` | Initialize analytics with IDs from env vars |
| `trackPageView(page, title?)` | Track SPA page views |
| `trackEvent(eventName, params?)` | Track custom events |
| `updateConsent('granted' | 'denied')` | Update consent mode v2 status |
| `getConsent()` | Get current consent status |

---

## Events Tracked

### Navigation Events

| Event | Params | Trigger |
|---|---|---|
| `nav_click` | `nav_section`, `nav_label` | Navbar link clicks |
| `logo_click` | `location` | Logo clicks (navbar & footer) |
| `footer_link_click` | `link_type`, `link_text` | Footer navigation & legal links |
| `language_switch` | `language` | Language switcher |

### CTA Events

| Event | Params | Trigger |
|---|---|---|
| `cta_click` | `cta_location`, `cta_text`, `cta_type?` | All CTA buttons across the site |

Locations tracked: `hero`, `navbar`, `navbar_mobile`, `services`, `projects`, `results`, `faq`, `cta_section`, `footer_banner`, `footer_cta_row`, `case_study`, `case_study_nav`, `about_hero`, `about_cta`

### Engagement Events

| Event | Params | Trigger |
|---|---|---|
| `service_card_click` | `service` | Service card clicks |
| `project_card_click` | `project_name`, `project_category` | Portfolio project card clicks |
| `project_filter_click` | `filter_name` | Portfolio filter toggle |
| `case_study_nav` | `direction`, `case_study`, `label` | Previous/next case study |
| `scroll_depth` | `depth`, `percent` | Scroll at 25%, 50%, 75%, 90%, 100% |
| `faq_toggle` | `accordion_id`, `question_index`, `action` | FAQ accordion open/close |

### Form Events (Contact Form)

| Event | Params | Trigger |
|---|---|---|
| `form_started` | `form_name` | First interaction with any form field |
| `form_field_interaction` | `form_name`, `field_name` | Service/budget dropdown changes |
| `form_validation_error` | `form_name`, `error_count` | Validation fails on submit |
| `form_submit_attempt` | `form_name` | Form submit button clicked |
| `form_submit_success` | `form_name` | Form submitted successfully |
| `form_submit_error` | `form_name` | Form submission failed |
| `copy_to_clipboard` | `field` | Email/phone copy button |

### Pricing Events

| Event | Params | Trigger |
|---|---|---|
| `pricing_cta_click` | `package_name`, `package_price?`, `cta_type?` | Package CTA buttons |
| `schedule_call_click` | `source` | "Book Discovery Call" buttons |

### Outbound Events

| Event | Params | Trigger |
|---|---|---|
| `outbound_click` | `outbound_type`, `outbound_label` | External links |

Types tracked: `whatsapp`, `email`, `phone`, `instagram`, `linkedin`, `github`, `behance`, `dribbble`, `social`, `calendly`

### Page Views

| Path | Title |
|---|---|
| `/` | Massar Digital Studio |
| `/about` | About - Massar Digital Studio |
| `/case-studies/{slug}` | {name} Case Study - Massar Digital Studio |

---

## Conversion Events

These events should be marked as **conversions** in GA4:

| Event | Conversion Type | Trigger |
|---|---|---|
| `generate_lead` | Lead | Contact form successfully submitted |
| `form_submit_success` | Form Submission | Form data sent successfully |
| `schedule_call_click` | Discovery Call | "Book Discovery Call" buttons clicked |
| `pricing_cta_click` | Quote Request | Pricing package "Get Started" clicked |
| `cta_click` | CTA Click (secondary) | Any CTA button click (with `cta_location` param for filtering) |

### GA4 Setup Instructions

1. Go to GA4 Admin → Events → Conversions
2. Add `generate_lead`, `form_submit_success`, `schedule_call_click`, and `pricing_cta_click` as conversion events
3. Create custom dimensions for: `lead_type`, `lead_source`, `cta_location`, `package_name`

### GTM Setup Instructions

1. Create tags for each conversion event using the `dataLayer` push
2. Recommended triggers:
   - Custom Event trigger: `generate_lead`
   - Custom Event trigger: `schedule_call_click`
   - Custom Event trigger: `pricing_cta_click`
   - Custom Event trigger: `form_submit_success`
3. Enable Consent Mode v2 in GTM: Tag → Consent Settings → Use consent signals

---

## Funnel

```
Homepage  →  Services  →  Portfolio  →  Pricing  →  Contact  →  Form Submit
   │            │            │             │            │
   │            │            │             │            └── form_started
   │            │            │             │            └── form_submit_success (conversion)
   │            │            │             │
   │            │            │             └── pricing_cta_click (conversion)
   │            │            │             └── schedule_call_click (conversion)
   │            │            │
   │            │            └── project_card_click → case_study_view → case_study_nav
   │            │
   │            └── service_card_click
   │
   ├── nav_click
   ├── cta_click
   └── scroll_depth
```

Attribution is handled via:
- `page_view` events with `page_location` and `page_path`
- GA4's built-in traffic source attribution (UTM parameters)
- `lead_source` param on `generate_lead` event

---

## Consent Mode v2

The system implements Google's **Consent Mode v2**:

| Consent Type | Default | After Accept | After Reject |
|---|---|---|---|
| `ad_storage` | `denied` | `granted` | `denied` |
| `ad_user_data` | `denied` | `granted` | `denied` |
| `ad_personalization` | `denied` | `granted` | `denied` |
| `analytics_storage` | `denied` | `granted` | `denied` |
| `functionality_storage` | `granted` | `granted` | `granted` |
| `personalization_storage` | `denied` | `granted` | `denied` |
| `security_storage` | `granted` | `granted` | `granted` |

- **No analytics fire until consent is granted**
- Consent stored in `localStorage` key `analytics_consent`
- CookieConsent banner appears on first visit
- Revisit logic: if consent was previously given, no banner is shown

---

## Environment Variables

| Variable | Purpose | Required |
|---|---|---|
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 Measurement ID | Yes (or GTM) |
| `VITE_GTM_ID` | Google Tag Manager Container ID | Yes (or GA4) |

Copy `.env` to `.env.local` and replace the placeholder values:

```bash
cp .env .env.local
# Edit .env.local with your real IDs
```

> `.env.local` is gitignored via the `*.local` pattern in `.gitignore`.

---

## Duplicate Event Prevention

- No duplicate imports or double-initialization
- GA4/GTM script loading includes guard checks for existing scripts
- SPA page views tracked via hash change listener (not on every render)
- Form `form_started` fires only once via `useRef` flag
- Scroll depth tracked once per threshold via `Set` in `useScrollDepth`

---

## Future Integrations

The data layer architecture (`window.dataLayer.push`) is ready for these integrations:

| Integration | Method | Notes |
|---|---|---|
| **Meta Pixel (Facebook)** | Add via GTM tag (Custom HTML or template) or `fbq()` calls | Use `trackEvent` or add directly to GTM |
| **LinkedIn Insight Tag** | Add via GTM tag (Custom HTML) | Use `dataLayer` push for conversion events |
| **Microsoft Clarity** | Add tracking code via GTM tag | Best as separate GTM tag |
| **Hotjar** | Add Hotjar snippet via GTM | Track rage clicks, session recordings |
| **HubSpot** | Add tracking code via GTM or direct script | Track form submissions as HubSpot contacts |
| **Mixpanel / Amplitude** | Add via GTM tag | Push `dataLayer` events to product analytics |

### GTM Recommended Tag Configuration

```
Container: Massar Digital Studio
├── Tag: GA4 Configuration → fires on All Pages (Consent Mode)
├── Tag: GA4 Event → fires on custom event triggers
├── Tag: Meta Pixel → fires on key conversion events
├── Tag: LinkedIn Insight → fires on All Pages
├── Tag: Hotjar → fires on All Pages
└── Tag: Clarity → fires on All Pages
```

---

## Testing Checklist

- [ ] Visit site, verify CookieConsent banner appears
- [ ] Accept cookies, verify `consent_update` event in dataLayer
- [ ] Navigate between pages (home, about, case studies), verify `page_view` events
- [ ] Click nav links, verify `nav_click` events
- [ ] Click CTA buttons, verify `cta_click` events
- [ ] Click pricing "Get Started", verify `pricing_cta_click` event
- [ ] Submit contact form (with and without errors), verify all form events
- [ ] Click WhatsApp/email, verify `outbound_click` events
- [ ] Change language, verify `language_switch` event
- [ ] Scroll to bottom, verify `scroll_depth` events
- [ ] Open/close FAQ items, verify `faq_toggle` events
- [ ] Open a case study, verify `page_view` with path `/case-studies/{slug}`
- [ ] Verify no events fire before consent is granted
- [ ] Verify consent persists across page reloads
