import type { TFunction } from 'i18next'
import { SEO_CONFIG } from '@/lib/seo'
import { CASE_STUDY_SLUGS, LEGAL_PAGES, type LegalPage } from '@/lib/routes'

export interface BreadcrumbItem {
  label: string
  /** Router path (e.g. `/about`) — omit for current page or section-only links. */
  to?: string
  /** Homepage section id for in-page navigation (e.g. `projects`). */
  sectionId?: string
  /** Absolute canonical URL used in BreadcrumbList JSON-LD. */
  canonicalUrl: string
  isCurrent?: boolean
}

function homeCrumb(t: TFunction): BreadcrumbItem {
  return {
    label: t('breadcrumbs.home'),
    to: '/',
    canonicalUrl: SEO_CONFIG.siteUrl,
  }
}

/** Build canonical URL matching existing SEO conventions (hash routes for SPA pages). */
export function getCanonicalUrlForPath(pathname: string): string {
  if (pathname === '/' || pathname === '') return SEO_CONFIG.siteUrl
  return `${SEO_CONFIG.siteUrl}/#${pathname}`
}

export function getCanonicalUrlForSection(sectionId: string): string {
  return `${SEO_CONFIG.siteUrl}#${sectionId}`
}

export function buildBreadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.isCurrent
        ? { item: item.canonicalUrl }
        : { item: item.canonicalUrl }),
    })),
  }
}

export function getBreadcrumbsForRoute(
  pathname: string,
  params: Record<string, string | undefined>,
  t: TFunction,
  overrides?: { currentLabel?: string },
): BreadcrumbItem[] | null {
  if (pathname === '/') return null

  if (pathname === '/about') {
    return [
      homeCrumb(t),
      {
        label: t('breadcrumbs.about'),
        canonicalUrl: getCanonicalUrlForPath('/about'),
        isCurrent: true,
      },
    ]
  }

  if (pathname === '/contact') {
    return [
      homeCrumb(t),
      {
        label: t('breadcrumbs.contact'),
        canonicalUrl: `${SEO_CONFIG.siteUrl}/contact`,
        isCurrent: true,
      },
    ]
  }

  if (pathname === '/blog') {
    return [
      homeCrumb(t),
      {
        label: t('breadcrumbs.blog'),
        canonicalUrl: `${SEO_CONFIG.siteUrl}/blog`,
        isCurrent: true,
      },
    ]
  }

  const blogPostMatch = pathname.match(/^\/blog\/([^/]+)$/)
  if (blogPostMatch) {
    return [
      homeCrumb(t),
      {
        label: t('breadcrumbs.blog'),
        to: '/blog',
        canonicalUrl: `${SEO_CONFIG.siteUrl}/blog`,
      },
      {
        label: overrides?.currentLabel ?? t('breadcrumbs.caseStudy'),
        canonicalUrl: `${SEO_CONFIG.siteUrl}${pathname}`,
        isCurrent: true,
      },
    ]
  }

  if (LEGAL_PAGES.includes(pathname.slice(1) as LegalPage)) {
    const page = pathname.slice(1) as LegalPage
    return [
      homeCrumb(t),
      {
        label: t(`breadcrumbs.${page}`),
        canonicalUrl: getCanonicalUrlForPath(pathname),
        isCurrent: true,
      },
    ]
  }

  const caseStudyMatch = pathname.match(/^\/case-studies\/([^/]+)$/)
  if (caseStudyMatch) {
    const slug = params.slug ?? caseStudyMatch[1]
    if (!CASE_STUDY_SLUGS.includes(slug as (typeof CASE_STUDY_SLUGS)[number])) {
      return [
        homeCrumb(t),
        {
          label: t('breadcrumbs.portfolio'),
          sectionId: 'projects',
          canonicalUrl: getCanonicalUrlForSection('projects'),
        },
        {
          label: overrides?.currentLabel ?? slug,
          canonicalUrl: getCanonicalUrlForPath(pathname),
          isCurrent: true,
        },
      ]
    }

    const project = t(`projects.items.${slug}`, { returnObjects: true }) as { title: string }
    return [
      homeCrumb(t),
      {
        label: t('breadcrumbs.portfolio'),
        sectionId: 'projects',
        canonicalUrl: getCanonicalUrlForSection('projects'),
      },
      {
        label: overrides?.currentLabel ?? project.title,
        canonicalUrl: getCanonicalUrlForPath(pathname),
        isCurrent: true,
      },
    ]
  }

  return null
}

/** Build breadcrumbs for hierarchical section pages (e.g. Services → Web Development). */
export function buildSectionBreadcrumbs(
  t: TFunction,
  sectionId: string,
  sectionLabel: string,
  currentLabel?: string,
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    homeCrumb(t),
    {
      label: sectionLabel,
      sectionId,
      canonicalUrl: getCanonicalUrlForSection(sectionId),
      isCurrent: !currentLabel,
    },
  ]

  if (currentLabel) {
    items.push({
      label: currentLabel,
      canonicalUrl: `${getCanonicalUrlForSection(sectionId)}-${currentLabel.toLowerCase().replace(/\s+/g, '-')}`,
      isCurrent: true,
    })
  }

  return items
}
