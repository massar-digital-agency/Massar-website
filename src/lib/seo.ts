const SITE_URL = 'https://massardigital.com'
const SITE_NAME = 'Massar Digital Studio'
const OG_IMAGE = `${SITE_URL}/og-image.jpg`
const OG_IMAGE_WIDTH = '3027'
const OG_IMAGE_HEIGHT = '2439'
const TWITTER_HANDLE = '@massardigital'

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
    journeya: 'Discover how Massar built Journeya\'s complete tourism ecosystem \u2014 a booking platform, mobile app, and brand identity \u2014 launched on schedule for a seamless user experience across web and mobile.',
    wafr: 'See how Massar developed Wafr, a cross-platform food waste reduction app connecting consumers with surplus food deals through geolocation and real-time notifications in Algeria.',
    darlink: 'Explore how Massar created DarLink, a modern real estate platform connecting buyers, sellers, and investors in Algeria with 200+ property listings, advanced search, and direct messaging.',
    nextgen: 'Learn how Massar delivered a premium e-commerce experience for NextGen with 90+ Lighthouse scores, optimized checkout flow, and performance-first architecture built for conversions.',
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
