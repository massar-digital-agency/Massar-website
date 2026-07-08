import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useCookieConsent } from '@/hooks/useCookieConsent'
import { StructuredData } from '@/components/layout/StructuredData'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingContact } from '@/components/layout/FloatingContact'
import { CookieBanner } from '@/components/layout/CookieBanner'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { WhyUs } from '@/components/sections/WhyUs'
import { Process } from '@/components/sections/Process'
import { Projects } from '@/components/sections/Projects'
import { Pricing } from '@/components/sections/Pricing'
import { FAQ } from '@/components/sections/FAQ'
import { Contact } from '@/components/sections/Contact'
import { trackPageView } from '@/lib/analytics'
import { SEO_CONFIG, getOgImage } from '@/lib/seo'

export default function HomePage() {
  const { t, i18n } = useTranslation()
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
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <WhyUs />
        <Process />
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
