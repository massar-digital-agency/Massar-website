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
  avif: '/images/hero-mascot/400w.avif',
  webp: '/images/hero-mascot/400w.webp',
  srcset: {
    avif: '/images/hero-mascot/260w.avif 260w, /images/hero-mascot/320w.avif 320w, /images/hero-mascot/400w.avif 400w, /images/hero-mascot.avif 800w',
    webp: '/images/hero-mascot/260w.webp 260w, /images/hero-mascot/320w.webp 320w, /images/hero-mascot/400w.webp 400w, /images/hero-mascot.webp 800w',
  },
  sizes: '(max-width: 640px) 260px, (max-width: 1024px) 320px, 400px',
  width: 400,
  height: 400,
} as const

/** Responsive 3D logo variants for the About hero image. */
export const LOGO_3D = {
  avif: '/images/logo3d/340w.avif',
  webp: '/images/logo3d/340w.webp',
  jpg: '/images/logo3d/340w.jpg',
  srcset: {
    avif: '/images/logo3d/240w.avif 240w, /images/logo3d/340w.avif 340w, /images/logo3d/480w.avif 480w, /images/logo3d/680w.avif 680w',
    webp: '/images/logo3d/240w.webp 240w, /images/logo3d/340w.webp 340w, /images/logo3d/480w.webp 480w, /images/logo3d/680w.webp 680w',
    jpg: '/images/logo3d/240w.jpg 240w, /images/logo3d/340w.jpg 340w, /images/logo3d/480w.jpg 480w, /images/logo3d/680w.jpg 680w',
  },
  sizes: '(min-width: 1024px) 340px, 0px',
  width: 340,
  height: 293,
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
