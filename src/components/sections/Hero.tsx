import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { fadeUp } from '@/hooks/useAnimationVariants'

export function Hero() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const Arrow = isRTL ? ArrowLeft : ArrowRight

  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28 lg:pt-48 lg:pb-32">
      <Container>
        <div className="mx-auto max-w-[640px] text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#E4E4E7] bg-white px-5 py-2 shadow-sm shadow-black/[0.04]">
              <span className="h-2 w-2 rounded-full bg-[#8B5CF6]" />
              <span className="text-[13px] font-medium text-[#52525B]">
                {t('hero.badge')}
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.05 }}
            className="text-[24px] font-bold leading-[1.25] tracking-[-0.015em] text-[#0A0A0A] sm:text-[32px] lg:text-[40px]"
          >
            {t('hero.title')}{' '}
            <span className="text-[#8B5CF6]">{t('hero.titleAccent')}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="mx-auto mt-5 max-w-[480px] text-[14px] leading-[1.8] text-[#71717A] sm:text-[16px] sm:mt-6"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10"
          >
            <Button size="lg" href="#contact">
              {t('hero.cta')}
              <Arrow className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="lg" href="#projects">
              {t('hero.ctaSecondary')}
            </Button>
          </motion.div>
        </div>
      </Container>

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#8B5CF6]/[0.03] blur-[120px]" />
      </div>
    </section>
  )
}
