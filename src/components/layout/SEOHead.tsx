import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { SEO_CONFIG } from '@/lib/seo'

export function SEOHead() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  const title = t('seo.title')
  const description = t('seo.description')
  const ogTitle = t('seo.ogTitle')
  const ogDescription = t('seo.ogDescription')
  const twitterTitle = t('seo.twitterTitle')

  const locale = lang === 'ar' ? 'ar_DZ' : lang === 'fr' ? 'fr_DZ' : 'en_US'

  return (
    <Helmet prioritizeSeoTags>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={SEO_CONFIG.siteUrl} />

      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/favicon.svg" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={SEO_CONFIG.ogImage} />
      <meta property="og:image:width" content={SEO_CONFIG.ogImageWidth} />
      <meta property="og:image:height" content={SEO_CONFIG.ogImageHeight} />
      <meta property="og:url" content={SEO_CONFIG.siteUrl} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta property="og:locale" content={locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={SEO_CONFIG.ogImage} />
      <meta name="twitter:site" content={SEO_CONFIG.twitterHandle} />

      <link rel="alternate" hrefLang="ar" href={SEO_CONFIG.siteUrl} />
      <link rel="alternate" hrefLang="fr" href={SEO_CONFIG.siteUrl} />
      <link rel="alternate" hrefLang="en" href={SEO_CONFIG.siteUrl} />
      <link rel="alternate" hrefLang="x-default" href={SEO_CONFIG.siteUrl} />
    </Helmet>
  )
}
