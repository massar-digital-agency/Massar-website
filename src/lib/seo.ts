const SITE_URL = 'https://massardigital.com'
const SITE_NAME = 'Massar Digital Studio'
const OG_IMAGE = `${SITE_URL}/og-image.jpg`
const OG_IMAGE_WIDTH = '3027'
const OG_IMAGE_HEIGHT = '2439'
const TWITTER_HANDLE = '@massardigital'

export const META_DESCRIPTION_MAX_LENGTH = 160

/** Pre-optimized hero mascot (LCP image) — AVIF preferred, WebP fallback. */
export const HERO_MASCOT = {
  avif: '/images/hero-mascot.avif',
  webp: '/images/hero-mascot.webp',
  width: 800,
  height: 800,
} as const

export const SEO_CONFIG = {
  siteUrl: SITE_URL,
  siteName: SITE_NAME,
  ogImage: OG_IMAGE,
  ogImageWidth: OG_IMAGE_WIDTH,
  ogImageHeight: OG_IMAGE_HEIGHT,
  twitterHandle: TWITTER_HANDLE,
} as const

export interface PageSEO {
  title: string
  description: string
  canonical: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  noindex?: boolean
}

export function getPageSEO(
  page: string,
  _lang: string,
  translations?: { title?: string; description?: string }
): PageSEO {
  const base = SITE_URL

  const pages: Record<string, PageSEO> = {
    home: {
      title: translations?.title || `${SITE_NAME} | Digital Agency`,
      description: translations?.description || 'Digital agency specializing in web development, mobile apps, and brand identity.',
      canonical: base,
      ogType: 'website',
    },
    about: {
      title: translations?.title || `About - ${SITE_NAME}`,
      description: translations?.description || `Learn about ${SITE_NAME} - our team, values, and mission.`,
      canonical: `${base}/#/about`,
      ogType: 'website',
    },
    privacy: {
      title: translations?.title || `Privacy Policy - ${SITE_NAME}`,
      description: translations?.description || `Privacy Policy for ${SITE_NAME}.`,
      canonical: `${base}/#/privacy`,
      ogType: 'website',
    },
    terms: {
      title: translations?.title || `Terms of Service - ${SITE_NAME}`,
      description: translations?.description || `Terms of Service for ${SITE_NAME}.`,
      canonical: `${base}/#/terms`,
      ogType: 'website',
    },
    cookies: {
      title: translations?.title || `Cookie Policy - ${SITE_NAME}`,
      description: translations?.description || `Cookie Policy for ${SITE_NAME}.`,
      canonical: `${base}/#/cookies`,
      ogType: 'website',
    },
  }

  return pages[page] || pages.home
}

export function getCaseStudySEO(
  slug: string,
  _lang: string,
  projectTitle?: string,
  projectDescription?: string
): PageSEO {
  const titles: Record<string, string> = {
    journeya: 'Journeya — Tourism Booking Platform',
    wafr: 'Wafr — Food Waste Reduction App',
    darlink: 'DarLink — Real Estate Platform',
    nextgen: 'NextGen — E-Commerce Store',
  }

  const descriptions: Record<string, string> = {
    journeya:
      'How Massar built Journeya\u2019s tourism ecosystem \u2014 booking platform, mobile app, and brand identity \u2014 for seamless web and mobile experiences.',
    wafr:
      'How Massar built Wafr, a food waste app in Algeria connecting consumers to surplus food deals via geolocation and real-time alerts.',
    darlink:
      'How Massar created DarLink, an Algerian real estate platform with 200+ listings, advanced search, and direct messaging for buyers and sellers.',
    nextgen:
      'How Massar delivered NextGen\u2019s premium e-commerce store with 90+ Lighthouse scores, optimized checkout, and performance-first architecture.',
  }

  const title = `${titles[slug] || projectTitle || slug} | ${SITE_NAME}`
  const description = descriptions[slug] || projectDescription || ''

  return {
    title,
    description,
    canonical: `${SITE_URL}/#/case-studies/${slug}`,
    ogType: 'article',
  }
}

export function getHreflangLinks(pagePath: string): Array<{ lang: string; href: string }> {
  const absoluteUrl = `${SITE_URL}${pagePath}`
  const separator = absoluteUrl.includes('?') ? '&' : '?'
  return [
    { lang: 'x-default', href: absoluteUrl },
    { lang: 'en', href: `${absoluteUrl}${separator}lang=en` },
    { lang: 'fr', href: `${absoluteUrl}${separator}lang=fr` },
    { lang: 'ar', href: `${absoluteUrl}${separator}lang=ar` },
  ]
}
