import { lazy, Suspense, useEffect } from 'react'
import { useCookieConsent } from '@/hooks/useCookieConsent'
import { useExitIntent } from '@/hooks/useExitIntent'
import { useDirection } from '@/hooks/useDirection'
import { useScrollDepth } from '@/hooks/useScrollDepth'
import { SEOHead } from '@/components/layout/SEOHead'
import { BackToTop } from '@/components/layout/BackToTop'
import { MobileStickyCTA } from '@/components/layout/MobileStickyCTA'
import { FloatingContact } from '@/components/layout/FloatingContact'
import { CookieBanner } from '@/components/layout/CookieBanner'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import { trackPageView } from '@/lib/analytics'

const HomePage = lazy(() => import('@/pages/HomePage'))
const AboutPage = lazy(() => import('@/components/sections/AboutPage').then((m) => ({ default: m.AboutPage })))
const PrivacyPolicy = lazy(() => import('@/components/legal/PrivacyPolicy').then((m) => ({ default: m.PrivacyPolicy })))
const TermsOfService = lazy(() => import('@/components/legal/TermsOfService').then((m) => ({ default: m.TermsOfService })))
const CookiePolicy = lazy(() => import('@/components/legal/CookiePolicy').then((m) => ({ default: m.CookiePolicy })))
const CaseStudyPage = lazy(() => import('@/components/case-studies/CaseStudyPage').then((m) => ({ default: m.CaseStudyPage })))
const BlogIndex = lazy(() => import('@/pages/BlogIndex').then((m) => ({ default: m.BlogIndex })))
const BlogPost = lazy(() => import('@/pages/BlogPost').then((m) => ({ default: m.BlogPost })))
const ContactPage = lazy(() => import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const CareersPage = lazy(() => import('@/pages/CareersPage').then((m) => ({ default: m.CareersPage })))
const ExitIntentModal = lazy(() =>
  import('@/components/layout/ExitIntentModal').then((m) => ({ default: m.ExitIntentModal })),
)

function CaseStudyPageWrapper() {
  const { slug } = useParams<{ slug: string }>()
  useEffect(() => {
    trackPageView(`/case-studies/${slug}`, `${slug} - Massar Digital Studio`)
  }, [slug])
  return <CaseStudyPage key={slug} slug={slug as string} />
}

export default function App() {
  useDirection()
  const consent = useCookieConsent()
  const exitIntent = useExitIntent()

  useScrollDepth()

  return (
    <BrowserRouter>
      <SEOHead />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/case-studies/:slug" element={<CaseStudyPageWrapper />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
      <BackToTop />
      <MobileStickyCTA />
      <FloatingContact />
      <CookieBanner consent={consent} />
      <Suspense fallback={null}>
        <ExitIntentModal show={exitIntent.show} onDismiss={exitIntent.dismiss} />
      </Suspense>
    </BrowserRouter>
  )
}
