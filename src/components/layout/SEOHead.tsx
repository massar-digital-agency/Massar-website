import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const SITE_NAME = 'Massar Digital Studio'
const SITE_URL = 'https://massardigital.com'
const OG_IMAGE = `${SITE_URL}/og-image.jpg`
const OG_IMAGE_WIDTH = '3027'
const OG_IMAGE_HEIGHT = '2439'
const TWITTER_HANDLE = '@massardigital'

export function SEOHead() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  const title = t('seo.title')
  const description = t('seo.description')
  const ogTitle = t('seo.ogTitle')
  const ogDescription = t('seo.ogDescription')
  const twitterTitle = t('seo.twitterTitle')

  return (
    <Helmet prioritizeSeoTags>
      {/* Primary Meta */}
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={SITE_URL} />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/favicon.svg" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content={OG_IMAGE_WIDTH} />
      <meta property="og:image:height" content={OG_IMAGE_HEIGHT} />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={lang === 'ar' ? 'ar_DZ' : lang === 'fr' ? 'fr_DZ' : 'en_US'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />

      {/* Hreflang */}
      <link rel="alternate" hrefLang="ar" href={SITE_URL} />
      <link rel="alternate" hrefLang="fr" href={SITE_URL} />
      <link rel="alternate" hrefLang="en" href={SITE_URL} />
      <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
    </Helmet>
  )
}
