import { SEO_CONFIG } from '@/lib/seo'

export interface CaseStudySchemaInput {
  slug: string
  lang: string
  headline: string
  description: string
  projectTitle: string
  projectCategory: string
  projectDescription: string
  technologies: string[]
  clientName: string
  industry: string
  summary?: string
  datePublished?: string
  dateModified?: string
  image?: string
}

const CASE_STUDY_DATES: Record<string, { published: string; modified: string }> = {
  journeya: { published: '2024-03-01', modified: '2024-06-15' },
  wafr: { published: '2024-04-01', modified: '2024-07-01' },
  darlink: { published: '2024-05-01', modified: '2024-08-01' },
}

const organizationRef = {
  '@type': 'Organization' as const,
  name: SEO_CONFIG.siteName,
  url: SEO_CONFIG.siteUrl,
}

const publisherRef = {
  '@type': 'Organization' as const,
  name: SEO_CONFIG.siteName,
  logo: {
    '@type': 'ImageObject' as const,
    url: `${SEO_CONFIG.siteUrl}/favicon.svg`,
  },
}

export function buildCaseStudyStructuredData(input: CaseStudySchemaInput): Record<string, unknown> {
  const canonical = `${SEO_CONFIG.siteUrl}/#/case-studies/${input.slug}`
  const articleId = `${canonical}#article`
  const creativeWorkId = `${canonical}#creativework`
  const image = input.image ?? SEO_CONFIG.ogImage
  const dates = CASE_STUDY_DATES[input.slug] ?? {
    published: input.datePublished ?? '2024-01-01',
    modified: input.dateModified ?? '2024-06-01',
  }
  const keywords = [
    ...input.technologies,
    input.projectCategory,
    input.projectTitle,
    input.industry,
    'case study',
    'portfolio',
    'web development',
    'Algeria',
  ]

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': articleId,
        headline: input.headline,
        description: input.description,
        image,
        author: organizationRef,
        publisher: publisherRef,
        datePublished: dates.published,
        dateModified: dates.modified,
        url: canonical,
        inLanguage: input.lang,
        keywords: keywords.join(', '),
        about: {
          '@type': 'Thing',
          name: input.clientName,
          description: `${input.projectTitle} – ${input.industry}`,
        },
        mainEntityOfPage: { '@id': creativeWorkId },
      },
      {
        '@type': 'CreativeWork',
        '@id': creativeWorkId,
        name: input.projectTitle,
        headline: input.projectTitle,
        description: input.summary ?? input.projectDescription ?? input.description,
        image,
        creator: organizationRef,
        publisher: publisherRef,
        url: canonical,
        inLanguage: input.lang,
        keywords: keywords.join(', '),
        about: {
          '@type': 'Thing',
          name: input.industry,
        },
        genre: input.industry,
        contributor: {
          '@type': 'Organization',
          name: input.clientName,
        },
        datePublished: dates.published,
        dateModified: dates.modified,
        ...(input.technologies.length > 0 && {
          material: input.technologies.join(', '),
        }),
      },
    ],
  }
}
