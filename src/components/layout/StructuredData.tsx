import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { SEO_CONFIG } from '@/lib/seo'

interface StructuredDataProps {
  /** Additional JSON-LD objects rendered as separate script tags. */
  additionalSchemas?: Record<string, unknown>[]
  /** When false, skip default homepage schemas (for page-specific structured data). */
  includeDefaults?: boolean
}

export function StructuredData({
  additionalSchemas = [],
  includeDefaults = true,
}: StructuredDataProps = {}) {
  const { t } = useTranslation()

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}/images/og-imageFavIcon.png`,
    description: t('seo.description'),
    email: 'massar.digital.studio@gmail.com',
    telephone: '+213-555-123-456',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+213-555-123-456',
      contactType: 'customer service',
      email: 'massar.digital.studio@gmail.com',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '13 Rue Mohamed Khoudi, El Biar',
      addressLocality: 'Algiers',
      addressRegion: 'Algiers Province',
      postalCode: '16000',
      addressCountry: 'DZ',
    },
    sameAs: [
      'https://www.linkedin.com/company/massardigital',
      'https://twitter.com/massardigital',
      'https://www.facebook.com/massardigital',
      'https://www.instagram.com/massardigital',
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    description: t('seo.description'),
    inLanguage: ['ar', 'fr', 'en'],
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SEO_CONFIG.siteName,
    image: SEO_CONFIG.ogImage,
    url: SEO_CONFIG.siteUrl,
    telephone: '+213-555-123-456',
    email: 'massar.digital.studio@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DZ',
    },
    description: t('seo.description'),
    priceRange: '$$',
  }

  const faqItems = t('faq.items', { returnObjects: true }) as { question: string; answer: string }[]
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  const pricingSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Website Package - Massar Digital Studio',
      description: 'Professional responsive website package starting at $2,500.',
      offers: {
        '@type': 'Offer',
        price: '2500',
        priceCurrency: 'USD',
        priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        availability: 'https://schema.org/InStock',
        url: SEO_CONFIG.siteUrl,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Growth Bundle - Massar Digital Studio',
      description: 'Full-featured website with CMS starting at $5,000.',
      offers: {
        '@type': 'Offer',
        price: '5000',
        priceCurrency: 'USD',
        priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        availability: 'https://schema.org/InStock',
        url: SEO_CONFIG.siteUrl,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Custom Development - Massar Digital Studio',
      description: 'Fully custom web application starting at $10,000.',
      offers: {
        '@type': 'Offer',
        price: '10000',
        priceCurrency: 'USD',
        priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        availability: 'https://schema.org/InStock',
        url: SEO_CONFIG.siteUrl,
      },
    },
  ]

  const defaultSchemas = includeDefaults
    ? [organizationSchema, websiteSchema, localBusinessSchema, faqSchema, ...pricingSchemas]
    : []

  const allSchemas = [...defaultSchemas, ...additionalSchemas]

  if (allSchemas.length === 0) return null

  return (
    <Helmet>
      {allSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
      ))}
    </Helmet>
  )
}
