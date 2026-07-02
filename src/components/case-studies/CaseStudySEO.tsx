import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const SITE_URL = 'https://massardigital.com'
const SITE_NAME = 'Massar Digital Studio'
const OG_IMAGE_WIDTH = '3027'
const OG_IMAGE_HEIGHT = '2439'

const projectSlugToTitle: Record<string, string> = {
  journeya: 'Journeya — Tourism Booking Platform',
  wafr: 'Wafr — Food Waste Reduction App',
  darlink: 'DarLink — Real Estate Platform',
  nextgen: 'NextGen — E-Commerce Store',
}

const projectSlugToDescription: Record<string, string> = {
  journeya: 'Case study: How we built a complete tourism ecosystem with smart booking, mobile app, and brand identity for Journeya.',
  wafr: 'Case study: How we developed a cross-platform food waste reduction app connecting consumers with nearby deals.',
  darlink: 'Case study: How we created a modern real estate platform connecting buyers, sellers, and investors in Algeria.',
  nextgen: 'Case study: How we built a performant e-commerce store with premium design for NextGen.',
}

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

  const title = `${projectSlugToTitle[slug] || project.title} | ${SITE_NAME}`
  const description = projectSlugToDescription[slug] || project.description
  const ogImage = `${SITE_URL}/og-image.jpg`
  const caseStudyUrl = `${SITE_URL}/#/case-studies/${slug}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: ogImage,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: `${SITE_URL}/favicon.svg`,
    },
    url: caseStudyUrl,
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
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={caseStudyUrl} />

      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={OG_IMAGE_WIDTH} />
      <meta property="og:image:height" content={OG_IMAGE_HEIGHT} />
      <meta property="og:url" content={caseStudyUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={lang === 'ar' ? 'ar_DZ' : lang === 'fr' ? 'fr_DZ' : 'en_US'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@massardigital" />

      <link rel="alternate" hrefLang="ar" href={caseStudyUrl} />
      <link rel="alternate" hrefLang="fr" href={caseStudyUrl} />
      <link rel="alternate" hrefLang="en" href={caseStudyUrl} />
      <link rel="alternate" hrefLang="x-default" href={caseStudyUrl} />

      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
    </Helmet>
  )
}
