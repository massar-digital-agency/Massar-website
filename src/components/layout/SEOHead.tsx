import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { SEO_CONFIG, HERO_MASCOT, getHreflangLinks, getLocale, getOgImage, getAlternateLocales } from '@/lib/seo'

const RESOURCE_HINTS = [
  { href: 'https://cdn.jsdelivr.net', rel: 'preconnect' as const },
  { href: 'https://www.googletagmanager.com', rel: 'preconnect' as const, crossOrigin: 'anonymous' as const },
] as const

export function SEOHead() {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const location = useLocation()

  const pagePath = location.pathname === '/' ? '' : `/#${location.pathname}`
  const hreflangLinks = getHreflangLinks(pagePath)
  const locale = getLocale(lang)
  const alternateLocales = getAlternateLocales(locale)
  const ogImage = getOgImage(lang)
  const legalPaths = ['/privacy', '/terms', '/cookies']
  const isLegalPage = legalPaths.includes(location.pathname)
  const isHome = location.pathname === '/'

  return (
    <Helmet>
      <html lang={lang} />
      {isLegalPage && <meta name="robots" content="noindex, nofollow" />}

      <link rel="icon" type="image/png" href="/images/og-imageFavIcon.png" />
      <link rel="apple-touch-icon" href="/images/og-imageFavIcon.png" />

      {isHome && (
        <link
          rel="preload"
          as="image"
          href={HERO_MASCOT.avif}
          type="image/avif"
          imageSrcSet={HERO_MASCOT.srcset.avif}
          imageSizes={HERO_MASCOT.sizes}
        />
      )}

      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={SEO_CONFIG.ogImageWidth} />
      <meta property="og:image:height" content={SEO_CONFIG.ogImageHeight} />
      <meta property="og:locale" content={locale} />
      {alternateLocales.map((al) => (
        <meta key={al} property="og:locale:alternate" content={al} />
      ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SEO_CONFIG.twitterHandle} />
      <meta name="twitter:image" content={ogImage} />

      {RESOURCE_HINTS.map((hint) => (
        <link key={hint.href} rel={hint.rel} href={hint.href} {...('crossOrigin' in hint ? { crossOrigin: hint.crossOrigin } : {})} />
      ))}

      <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

      {hreflangLinks.map((link) => (
        <link key={link.lang} rel="alternate" hrefLang={link.lang} href={link.href} />
      ))}
    </Helmet>
  )
}
