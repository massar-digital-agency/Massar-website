import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { SEO_CONFIG, getHreflangLinks } from '@/lib/seo'

export function SEOHead() {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const location = useLocation()

  const pagePath = location.pathname === '/' ? '' : `/#${location.pathname}`
  const hreflangLinks = getHreflangLinks(pagePath)
  const locale = lang === 'ar' ? 'ar_DZ' : lang === 'fr' ? 'fr_DZ' : 'en_US'

  return (
    <Helmet>
      <html lang={lang} />

      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/favicon.svg" />

      <meta property="og:image" content={SEO_CONFIG.ogImage} />
      <meta property="og:image:width" content={SEO_CONFIG.ogImageWidth} />
      <meta property="og:image:height" content={SEO_CONFIG.ogImageHeight} />
      <meta property="og:locale" content={locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SEO_CONFIG.twitterHandle} />

      {hreflangLinks.map((link) => (
        <link key={link.lang} rel="alternate" hrefLang={link.lang} href={link.href} />
      ))}
    </Helmet>
  )
}
