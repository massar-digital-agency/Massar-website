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
    journeya: 'Case study: How we built a complete tourism ecosystem with smart booking, mobile app, and brand identity for Journeya.',
    wafr: 'Case study: How we developed a cross-platform food waste reduction app connecting consumers with nearby deals.',
    darlink: 'Case study: How we created a modern real estate platform connecting buyers, sellers, and investors in Algeria.',
    nextgen: 'Case study: How we built a performant e-commerce store with premium design for NextGen.',
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
  const base = SITE_URL
  return [
    { lang: 'ar', href: `${base}${pagePath}` },
    { lang: 'fr', href: `${base}${pagePath}` },
    { lang: 'en', href: `${base}${pagePath}` },
    { lang: 'x-default', href: `${base}${pagePath}` },
  ]
}
