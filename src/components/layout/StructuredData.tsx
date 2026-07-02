import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const SITE_URL = 'https://massardigital.com'
const SITE_NAME = 'Massar Digital Studio'

export function StructuredData() {
  const { t } = useTranslation()

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description: t('seo.description'),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+213-555-123-456',
      contactType: 'customer service',
      email: 'massar.digital.studio@gmail.com',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DZ',
    },
    sameAs: [],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: t('seo.description'),
    inLanguage: [t('seo.title').includes('مسار') ? 'ar' : 'en'],
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    image: `${SITE_URL}/og-image.jpg`,
    url: SITE_URL,
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

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>
  )
}
