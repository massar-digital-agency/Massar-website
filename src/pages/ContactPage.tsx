import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Container } from '@/components/ui/Container'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Contact } from '@/components/sections/Contact'
import { SEO_CONFIG } from '@/lib/seo'
import { trackPageView } from '@/lib/analytics'

export function ContactPage() {
  const { t } = useTranslation()

  useEffect(() => {
    trackPageView('/contact', `Contact | ${SEO_CONFIG.siteName}`)
  }, [])

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${SEO_CONFIG.siteName}`,
    description: t('contact.hero.subtitle'),
    url: `${SEO_CONFIG.siteUrl}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      telephone: '+213-555-123-456',
      email: 'massar.digital.studio@gmail.com',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+213-555-123-456',
        contactType: 'customer service',
        email: 'massar.digital.studio@gmail.com',
        availableLanguage: ['English', 'French', 'Arabic'],
      },
    },
  }

  return (
    <>
      <Helmet>
        <title>{t('blog.contact.seo.title')}</title>
        <meta name="description" content={t('blog.contact.seo.description')} />
        <link rel="canonical" href={`${SEO_CONFIG.siteUrl}/contact`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('blog.contact.seo.ogTitle')} />
        <meta property="og:description" content={t('blog.contact.seo.ogDescription')} />
        <meta property="og:url" content={`${SEO_CONFIG.siteUrl}/contact`} />
        <meta name="twitter:title" content={t('blog.contact.seo.ogTitle')} />
        <meta name="twitter:description" content={t('blog.contact.seo.ogDescription')} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>
      </Helmet>

      <main id="main-content">
        <section className="pt-16 sm:pt-20 pb-0">
          <Container>
            <Breadcrumbs />
          </Container>
        </section>
        <Contact />
      </main>
    </>
  )
}
