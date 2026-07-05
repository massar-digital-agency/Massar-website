import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { SEO_CONFIG, getCaseStudySEO } from '@/lib/seo'
import { StructuredData } from '@/components/layout/StructuredData'
import { buildCaseStudyStructuredData } from '@/lib/structured-data'

interface CaseStudySEOProps {
  slug: string
}

export function CaseStudySEO({ slug }: CaseStudySEOProps) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  const project = t(`projects.items.${slug}`, { returnObjects: true }) as {
    title: string
    category: string
    description: string
  }

  const cs = t(`caseStudies.items.${slug}`, { returnObjects: true }) as {
    challenge: string
    solution: string
    technologies: string[]
    outcomes: string
    summary?: string
  }

  const seoMeta = t(`caseStudies.seo.${slug}`, { returnObjects: true }) as {
    title: string
    description: string
  }

  const seo = getCaseStudySEO(slug, lang, seoMeta, project.title, project.description)

  const caseStudySchema = buildCaseStudyStructuredData({
    slug,
    lang,
    headline: seo.title,
    description: seo.description,
    projectTitle: project.title,
    projectCategory: project.category,
    projectDescription: project.description,
    technologies: cs.technologies,
    summary: cs.summary,
  })

  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.canonical} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={seo.canonical} />
        <meta property="og:site_name" content={SEO_CONFIG.siteName} />

        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
      </Helmet>
      <StructuredData includeDefaults={false} additionalSchemas={[caseStudySchema]} />
    </>
  )
}
