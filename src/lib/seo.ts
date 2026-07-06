const SITE_URL = 'https://massardigital.com'
const SITE_NAME = 'Massar Digital Studio'
const OG_IMAGE = `${SITE_URL}/og-image.jpg`
const OG_IMAGE_EN = `${SITE_URL}/og-image.jpg`
const OG_IMAGE_FR = `${SITE_URL}/og-image.jpg`
const OG_IMAGE_AR = `${SITE_URL}/og-image.jpg`
const OG_IMAGE_WIDTH = '3027'
const OG_IMAGE_HEIGHT = '2439'
const TWITTER_HANDLE = '@massardigital'

export const META_DESCRIPTION_MAX_LENGTH = 155

export const LOCALE_MAP: Record<string, string> = {
  en: 'en_US',
  fr: 'fr_FR',
  ar: 'ar_DZ',
}

export const OG_IMAGE_MAP: Record<string, string> = {
  en: OG_IMAGE_EN,
  fr: OG_IMAGE_FR,
  ar: OG_IMAGE_AR,
}

export const ALTERNATE_LOCALES = Object.values(LOCALE_MAP)

export function getLocale(lang: string): string {
  return LOCALE_MAP[lang] || 'fr_FR'
}

export function getOgImage(lang: string): string {
  return OG_IMAGE_MAP[lang] || OG_IMAGE
}

export function getAlternateLocales(currentLocale: string): string[] {
  return ALTERNATE_LOCALES.filter((l) => l !== currentLocale)
}

export function truncateMetaDescription(description: string, maxLength = META_DESCRIPTION_MAX_LENGTH): string {
  if (description.length <= maxLength) return description
  const truncated = description.slice(0, maxLength - 1).trimEnd()
  const lastSpace = truncated.lastIndexOf(' ')
  if (lastSpace > maxLength * 0.6) {
    return `${truncated.slice(0, lastSpace)}…`
  }
  return `${truncated}…`
}

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

export function getBlogSEO(
  slug: string,
  translations?: { title?: string; description?: string }
): PageSEO {
  const title = translations?.title || `Blog | ${SITE_NAME}`
  const description = translations?.description || 'Read expert articles about web development, SEO, design, and digital strategy.'

  return {
    title,
    description: truncateMetaDescription(description),
    canonical: `${SITE_URL}/blog/${slug}`,
    ogType: 'article',
  }
}

export function getBlogIndexSEO(): PageSEO {
  return {
    title: `Blog | ${SITE_NAME}`,
    description: 'Read expert articles about web development, SEO, design, and digital strategy from Massar Digital Studio.',
    canonical: `${SITE_URL}/blog`,
    ogType: 'website',
  }
}

export function getCaseStudySEO(
  slug: string,
  _lang: string,
  translations?: { title?: string; description?: string },
  projectTitle?: string,
  projectDescription?: string
): PageSEO {
  const title = translations?.title || `${projectTitle || slug} | ${SITE_NAME}`
  const description = truncateMetaDescription(
    translations?.description || projectDescription || ''
  )

  return {
    title,
    description,
    canonical: `${SITE_URL}/#/case-studies/${slug}`,
    ogType: 'article',
  }
}

export { CASE_STUDY_SLUGS } from '@/lib/routes'

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
