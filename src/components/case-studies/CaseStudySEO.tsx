import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { SEO_CONFIG, getCaseStudySEO } from '@/lib/seo'

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
  }

  const seo = getCaseStudySEO(slug, lang, project.title, project.description)
  const locale = lang === 'ar' ? 'ar_DZ' : lang === 'fr' ? 'fr_DZ' : 'en_US'

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: seo.title,
    description: seo.description,
    image: SEO_CONFIG.ogImage,
    author: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      logo: `${SEO_CONFIG.siteUrl}/favicon.svg`,
    },
    url: seo.canonical,
    about: {
      '@type': 'Thing',
      name: project.title,
      description: project.category,
    },
    keywords: [...cs.technologies, project.category, 'case study', 'portfolio'].join(', '),
  }

  return (
    <Helmet prioritizeSeoTags>
      <html lang={lang} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.canonical} />

      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      <meta property="og:type" content="article" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={SEO_CONFIG.ogImage} />
      <meta property="og:image:width" content={SEO_CONFIG.ogImageWidth} />
      <meta property="og:image:height" content={SEO_CONFIG.ogImageHeight} />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta property="og:locale" content={locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={SEO_CONFIG.ogImage} />
      <meta name="twitter:site" content={SEO_CONFIG.twitterHandle} />

      <link rel="alternate" hrefLang="ar" href={seo.canonical} />
      <link rel="alternate" hrefLang="fr" href={seo.canonical} />
      <link rel="alternate" hrefLang="en" href={seo.canonical} />
      <link rel="alternate" hrefLang="x-default" href={seo.canonical} />

      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
    </Helmet>
  )
}
