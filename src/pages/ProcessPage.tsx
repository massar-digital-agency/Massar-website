import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from '@/lib/motion'
import type { Variants } from '@/lib/motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Process } from '@/components/sections/Process'
import { SEO_CONFIG } from '@/lib/seo'
import { trackPageView } from '@/lib/analytics'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
}

export function ProcessPage() {
  const { t } = useTranslation()

  useEffect(() => {
    trackPageView('/process', `Our Process | ${SEO_CONFIG.siteName}`)
  }, [])

  const seo = t('process.seo', { returnObjects: true }) as Record<string, string>

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={`${SEO_CONFIG.siteUrl}/process`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.ogTitle} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta property="og:url" content={`${SEO_CONFIG.siteUrl}/process`} />
        <meta name="twitter:title" content={seo.ogTitle} />
        <meta name="twitter:description" content={seo.ogDescription} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <main id="main-content">
        <section className="relative overflow-hidden border-b border-[#E4E4E7] bg-white pt-[88px]">
          <div className="absolute inset-0 opacity-[0.03]" style={{ background: 'radial-gradient(ellipse at top center, #8B5CF6 0%, transparent 70%)' }} />
          <Container>
            <div className="py-16 sm:py-20 lg:py-28">
              <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <Breadcrumbs />
                <span className="mb-4 mt-4 inline-block text-[12px] font-semibold tracking-[0.12em] text-[#8B5CF6] uppercase">
                  {t('process.label')}
                </span>
                <h1 className="text-[30px] font-bold leading-[1.15] tracking-[-0.02em] text-[#0A0A0A] sm:text-[40px] lg:text-[52px]">
                  {t('process.title')}
                </h1>
                <p className="mt-5 max-w-[560px] text-[15px] leading-[1.8] text-[#52525B] sm:text-[17px]">
                  {t('process.ctaMicro')}
                </p>
                <div className="mt-8">
                  <Button size="lg" href="/contact">
                    {t('process.cta')}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>
        <Process hideHeader ctaHref="/contact" />
      </main>
    </>
  )
}
