import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useDirection } from '@/hooks/useDirection'
import { useCookieConsent } from '@/hooks/useCookieConsent'
import { SEOHead } from '@/components/layout/SEOHead'
import { StructuredData } from '@/components/layout/StructuredData'
import { LoadingScreen } from '@/components/layout/LoadingScreen'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingContact } from '@/components/layout/FloatingContact'
import { CookieBanner } from '@/components/layout/CookieBanner'
import { PrivacyPolicy } from '@/components/legal/PrivacyPolicy'
import { TermsOfService } from '@/components/legal/TermsOfService'
import { CookiePolicy } from '@/components/legal/CookiePolicy'
import { Hero } from '@/components/sections/Hero'
import { TrustedBy } from '@/components/sections/TrustedBy'
import { Services } from '@/components/sections/Services'
import { WhyUs } from '@/components/sections/WhyUs'
import { Process } from '@/components/sections/Process'
import { Projects } from '@/components/sections/Projects'
import { Pricing } from '@/components/sections/Pricing'
import { Testimonials } from '@/components/sections/Testimonials'
import { Results } from '@/components/sections/Results'
import { FAQ } from '@/components/sections/FAQ'
import { Contact } from '@/components/sections/Contact'
import { CaseStudyPage } from '@/components/case-studies/CaseStudyPage'
import { AboutPage } from '@/components/sections/AboutPage'
import { trackPageView } from '@/lib/analytics'
import { useScrollDepth } from '@/hooks/useScrollDepth'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import { SEO_CONFIG } from '@/lib/seo'

function HomePage() {
  const { t, i18n } = useTranslation()
  const [loading, setLoading] = useState(true)

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

        <meta name="twitter:title" content={t('seo.twitterTitle')} />
        <meta name="twitter:description" content={t('seo.description')} />
        <meta name="twitter:image" content={SEO_CONFIG.ogImage} />
      </Helmet>
      <StructuredData />
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Services />
        <WhyUs />
        <Process />
        <Testimonials />
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
  const [loading, setLoading] = useState(true)
  const [activeCaseStudy, setActiveCaseStudy] = useState<string | null>(null)

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
        <Route
          path="/case-studies/:slug"
          element={<CaseStudyPageWrapper setLoading={setLoading} setActiveCaseStudy={setActiveCaseStudy} />}
        />
      </Routes>
      <FloatingContact />
      <CookieBanner consent={consent} />
    </BrowserRouter>
  )
}

function CaseStudyPageWrapper({ setLoading, setActiveCaseStudy }: { setLoading: (v: boolean) => void; setActiveCaseStudy: (s: string | null) => void }) {
  const { slug } = useParams<{ slug: string }>()
  useEffect(() => {
    setActiveCaseStudy(slug || null)
    setLoading(false)
    trackPageView(`/case-studies/${slug}`, `${slug} - Massar Digital Studio`)
  }, [slug])
  return <CaseStudyPage key={slug} slug={slug as string} />
}
