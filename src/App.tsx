import { useState, useEffect, lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useDirection } from '@/hooks/useDirection'
import { useCookieConsent } from '@/hooks/useCookieConsent'
import { useExitIntent } from '@/hooks/useExitIntent'
import { SEOHead } from '@/components/layout/SEOHead'
import { StructuredData } from '@/components/layout/StructuredData'
import { LoadingScreen } from '@/components/layout/LoadingScreen'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingContact } from '@/components/layout/FloatingContact'
import { MobileStickyCTA } from '@/components/layout/MobileStickyCTA'
import { CookieBanner } from '@/components/layout/CookieBanner'
import { BackToTop } from '@/components/layout/BackToTop'

const ExitIntentModal = lazy(() =>
  import('@/components/layout/ExitIntentModal').then((m) => ({ default: m.ExitIntentModal })),
)
import { PrivacyPolicy } from '@/components/legal/PrivacyPolicy'
import { TermsOfService } from '@/components/legal/TermsOfService'
import { CookiePolicy } from '@/components/legal/CookiePolicy'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { WhyUs } from '@/components/sections/WhyUs'
import { Process } from '@/components/sections/Process'
import { Projects } from '@/components/sections/Projects'
import { Pricing } from '@/components/sections/Pricing'
import { Results } from '@/components/sections/Results'
import { FAQ } from '@/components/sections/FAQ'
import { Contact } from '@/components/sections/Contact'
import { CaseStudyPage } from '@/components/case-studies/CaseStudyPage'
import { AboutPage } from '@/components/sections/AboutPage'
import { BlogIndex } from '@/pages/BlogIndex'
import { BlogPost } from '@/pages/BlogPost'
import { ContactPage } from '@/pages/ContactPage'
import { CareersPage } from '@/pages/CareersPage'
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel'
import { trackPageView } from '@/lib/analytics'
import { useScrollDepth } from '@/hooks/useScrollDepth'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import { SEO_CONFIG, getOgImage } from '@/lib/seo'

function HomePage() {
  const { t, i18n } = useTranslation()
  const [loading, setLoading] = useState(true)
  const ogImage = getOgImage(i18n.language)

  useEffect(() => {
    trackPageView('/', 'Massar Digital Studio')
  }, [i18n.language])

  return (
    <>
      <Helmet>
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
        <link rel="canonical" href={SEO_CONFIG.siteUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('seo.ogTitle')} />
        <meta property="og:description" content={t('seo.ogDescription')} />
        <meta property="og:url" content={SEO_CONFIG.siteUrl} />
        <meta property="og:site_name" content={SEO_CONFIG.siteName} />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:title" content={t('seo.twitterTitle')} />
        <meta name="twitter:description" content={t('seo.ogDescription')} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
      <StructuredData />
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <WhyUs />
        <Process />
        <TestimonialsCarousel />
        <Results />
        <Projects />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
      <CookieBanner consent={useCookieConsent()} />
    </>
  )
}

function LegalWrapper({ page }: { page: string }) {
  const ComponentMap: Record<string, React.ReactNode> = {
    privacy: <PrivacyPolicy />,
    terms: <TermsOfService />,
    cookies: <CookiePolicy />,
  }
  return <>{ComponentMap[page] ?? null}</>
}

export default function App() {
  useDirection()
  const consent = useCookieConsent()
  const exitIntent = useExitIntent()

  useScrollDepth()

  return (
    <BrowserRouter>
      <SEOHead />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<LegalWrapper page="privacy" />} />
        <Route path="/terms" element={<LegalWrapper page="terms" />} />
        <Route path="/cookies" element={<LegalWrapper page="cookies" />} />
        <Route path="/case-studies/:slug" element={<CaseStudyPageWrapper />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
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

function CaseStudyPageWrapper() {
  const { slug } = useParams<{ slug: string }>()
  useEffect(() => {
    trackPageView(`/case-studies/${slug}`, `${slug} - Massar Digital Studio`)
  }, [slug])
  return <CaseStudyPage key={slug} slug={slug as string} />
}
