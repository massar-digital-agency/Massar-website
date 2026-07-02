import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
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
import { getActiveCaseStudySlug, isOnAboutPage } from '@/lib/navigate'

const validSlugs = ['journeya', 'wafr', 'darlink', 'nextgen']

function getPagePath(): string {
  if (isOnAboutPage()) return '/about'
  const slug = getActiveCaseStudySlug()
  if (slug) return `/case-studies/${slug}`
  const hash = window.location.hash
  if (hash === '#/privacy') return '/privacy'
  if (hash === '#/terms') return '/terms'
  if (hash === '#/cookies') return '/cookies'
  return '/'
}

function getPageTitle(): string {
  if (isOnAboutPage()) return 'About - Massar Digital Studio'
  const slug = getActiveCaseStudySlug()
  if (slug) {
    const titles: Record<string, string> = {
      journeya: 'Journeya Case Study',
      wafr: 'Wafr Case Study',
      darlink: 'Darlink Case Study',
      nextgen: 'NextGen Case Study',
    }
    return `${titles[slug] || slug} - Massar Digital Studio`
  }
  return 'Massar Digital Studio'
}

function getActiveLegalPage(): string | null {
  const hash = window.location.hash
  if (hash === '#/privacy') return 'privacy'
  if (hash === '#/terms') return 'terms'
  if (hash === '#/cookies') return 'cookies'
  return null
}

export default function App() {
  useDirection()
  const { i18n } = useTranslation()
  const consent = useCookieConsent()
  const [loading, setLoading] = useState(true)
  const [activeCaseStudy, setActiveCaseStudy] = useState<string | null>(null)
  const [showAbout, setShowAbout] = useState(false)
  const [activeLegalPage, setActiveLegalPage] = useState<string | null>(null)

  useScrollDepth()

  const trackCurrentPage = useCallback(() => {
    trackPageView(getPagePath(), getPageTitle())
  }, [])

  useEffect(() => {
    const handleHashChange = () => {
      const legalPage = getActiveLegalPage()
      if (legalPage) {
        setActiveLegalPage(legalPage)
        setShowAbout(false)
        setActiveCaseStudy(null)
        return
      }

      if (isOnAboutPage()) {
        setShowAbout(true)
        setActiveCaseStudy(null)
        setActiveLegalPage(null)
        return
      }

      const slug = getActiveCaseStudySlug()
      if (slug && validSlugs.includes(slug)) {
        setActiveCaseStudy(slug)
        setShowAbout(false)
        setActiveLegalPage(null)
      } else {
        setActiveCaseStudy(null)
        setShowAbout(false)
        setActiveLegalPage(null)
      }
    }

    handleHashChange()
    trackCurrentPage()
    window.addEventListener('hashchange', () => {
      handleHashChange()
      trackCurrentPage()
    })
    return () => window.removeEventListener('hashchange', trackCurrentPage)
  }, [trackCurrentPage])

  // Track initial page view after language is known
  useEffect(() => {
    trackCurrentPage()
  }, [i18n.language, trackCurrentPage])

  if (activeLegalPage === 'privacy') {
    return <PrivacyPolicy />
  }

  if (activeLegalPage === 'terms') {
    return <TermsOfService />
  }

  if (activeLegalPage === 'cookies') {
    return <CookiePolicy />
  }

  if (activeCaseStudy) {
    return <CaseStudyPage key={activeCaseStudy} slug={activeCaseStudy} />
  }

  if (showAbout) {
    return <AboutPage />
  }

  return (
    <>
      <SEOHead />
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
      <CookieBanner consent={consent} />
    </>
  )
}
