/** Public case study slugs — keep in sync with locale content and sitemap generation. */
export const CASE_STUDY_SLUGS = ['journeya', 'wafr', 'darlink'] as const

export type CaseStudySlug = (typeof CASE_STUDY_SLUGS)[number]

export const LEGAL_PAGES = ['privacy', 'terms', 'cookies'] as const

export type LegalPage = (typeof LEGAL_PAGES)[number]

/** Homepage section anchors included in the sitemap. */
export const HOME_SECTION_ANCHORS = ['services', 'projects', 'contact'] as const
