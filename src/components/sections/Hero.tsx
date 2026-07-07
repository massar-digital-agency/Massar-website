import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { fadeUp } from '@/hooks/useAnimationVariants'
import { HERO_MASCOT } from '@/lib/seo'
import { useABTest } from '@/lib/ab-testing'

const marqueeKeys = ['web', 'apps', 'branding', 'uiux', 'automation', 'ai'] as const
const HERO_AB_TEST = 'hero_headline'

export function Hero() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const Arrow = isRTL ? ArrowLeft : ArrowRight
  const [marqueePaused, setMarqueePaused] = useState(false)
  const { variant, trackEvent: trackABEvent } = useABTest(HERO_AB_TEST)
  const shouldReduceMotion = useReducedMotion()

  const heroContent = useMemo(() => {
    if (variant === 'B' && t(`hero.variantB.title`, { defaultValue: '' })) {
      return {
        badge: t('hero.variantB.badge'),
        title: t('hero.variantB.title'),
        titleAccent: t('hero.variantB.titleAccent'),
        subtitle: t('hero.variantB.subtitle'),
        cta: t('hero.variantB.cta'),
        ctaSecondary: t('hero.variantB.ctaSecondary'),
        trustStatement: t('hero.variantB.trustStatement'),
        ctaMicro: t('hero.variantB.ctaMicro'),
        process: {
          discovery: t('hero.variantB.process.discovery'),
          delivery: t('hero.variantB.process.delivery'),
          support: t('hero.variantB.process.support'),
        },
      }
    }
    return {
      badge: t('hero.badge'),
      title: t('hero.title'),
      titleAccent: t('hero.titleAccent'),
      subtitle: t('hero.subtitle'),
      cta: t('hero.cta'),
      ctaSecondary: t('hero.ctaSecondary'),
      trustStatement: t('hero.trustStatement'),
      ctaMicro: t('hero.ctaMicro'),
      process: {
        discovery: t('hero.process.discovery'),
        delivery: t('hero.process.delivery'),
        support: t('hero.process.support'),
      },
    }
  }, [variant, t])

  return (
    <section className="relative flex min-h-[100svh] flex-col pt-24 pb-8 sm:pt-28">
      <Container className="flex flex-1 items-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div className="mx-auto max-w-[640px] text-center lg:mx-0 lg:max-w-none lg:text-start">
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <span className="mb-6 inline-flex items-center gap-2 text-[13px] font-medium text-[#52525B]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6]" />
                {heroContent.badge}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.05 }}
              className="text-[30px] font-bold leading-[1.15] tracking-[-0.02em] text-[#0A0A0A] sm:text-[40px] lg:text-[52px]"
            >
              {heroContent.title}{' '}
              <span className="text-[#8B5CF6]">{heroContent.titleAccent}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="mx-auto mt-5 max-w-[460px] text-[14px] leading-[1.8] text-[#52525B] sm:text-[16px] lg:mx-0"
            >
              {heroContent.subtitle}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 lg:justify-start"
            >
              <Button variant="accent" size="lg" href="#contact" onClick={() => trackABEvent('cta_click', { cta_location: 'hero', cta_text: heroContent.cta, cta_type: 'accent' })}>
                {heroContent.cta}
                <Arrow className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button variant="secondary" size="lg" href="#projects" onClick={() => trackABEvent('cta_click', { cta_location: 'hero', cta_text: heroContent.ctaSecondary, cta_type: 'secondary' })}>
                {heroContent.ctaSecondary}
              </Button>
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.18 }}
              className="mt-6 text-center text-[13px] text-[#52525B] lg:text-start"
            >
              {heroContent.trustStatement}
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="mt-4 text-center text-[12px] text-[#52525B] lg:text-start"
            >
              {heroContent.ctaMicro}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.22 }}
              className="mt-5 flex flex-wrap items-center justify-center gap-6 lg:justify-start"
            >
              <div className="flex items-center gap-2 text-[13px] text-[#52525B]">
                <span className="flex h-1.5 w-1.5 rounded-full bg-sky-500" />
                {heroContent.process.discovery}
              </div>
              <div className="flex items-center gap-2 text-[13px] text-[#52525B]">
                <span className="flex h-1.5 w-1.5 rounded-full bg-sky-500" />
                {heroContent.process.delivery}
              </div>
              <div className="flex items-center gap-2 text-[13px] text-[#52525B]">
                <span className="flex h-1.5 w-1.5 rounded-full bg-sky-500" />
                {heroContent.process.support}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mx-auto w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[400px]"
          >
            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={shouldReduceMotion ? undefined : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative block aspect-square w-full"
            >
              <picture>
                <source srcSet={HERO_MASCOT.avif} type="image/avif" />
                <source srcSet={HERO_MASCOT.webp} type="image/webp" />
                <img
                  src={HERO_MASCOT.webp}
                  alt="Massar Digital Studio brand mascot"
                  width={HERO_MASCOT.width}
                  height={HERO_MASCOT.height}
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </picture>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      <div
        className="mt-12 overflow-hidden border-t border-[#E4E4E7] py-6 sm:mt-16"
        onMouseEnter={() => setMarqueePaused(true)}
        onMouseLeave={() => setMarqueePaused(false)}
        aria-hidden="true"
      >
        <motion.div
          initial={false}
          animate={marqueePaused ? { x: 0 } : { x: isRTL ? ['0%', '50%'] : ['0%', '-50%'] }}
          transition={marqueePaused ? { duration: 0 } : { duration: 22, repeat: Infinity, ease: 'linear' }}
          className="flex w-max items-center gap-10 whitespace-nowrap"
        >
          {[...marqueeKeys, ...marqueeKeys, ...marqueeKeys, ...marqueeKeys].map((key, i) => (
            <span
              key={`${key}-${i}`}
              className="flex items-center gap-10 text-[14px] font-medium text-[#52525B]"
            >
              {t(`services.items.${key}.title`)}
              <span className="h-1 w-1 rounded-full bg-[#D4D4D8]" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
