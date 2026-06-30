import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { fadeUp } from '@/hooks/useAnimationVariants'
import { useTransparentImage } from '@/hooks/useTransparentImage'
import MascotSrc from '@/assets/images/logo-3d-alt.png'

const marqueeKeys = ['web', 'apps', 'branding', 'uiux', 'automation', 'ai'] as const

export function Hero() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const Arrow = isRTL ? ArrowLeft : ArrowRight
  const Mascot = useTransparentImage(MascotSrc)

  return (
    <section className="relative flex min-h-[100svh] flex-col pt-24 pb-8 sm:pt-28">
      <Container className="flex flex-1 items-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div className="mx-auto max-w-[640px] text-center lg:mx-0 lg:max-w-none lg:text-start">
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <span className="mb-6 inline-flex items-center gap-2 text-[13px] font-medium text-[#71717A]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6]" />
                {t('hero.badge')}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.05 }}
              className="text-[30px] font-bold leading-[1.15] tracking-[-0.02em] text-[#0A0A0A] sm:text-[40px] lg:text-[52px]"
            >
              {t('hero.title')}{' '}
              <span className="text-[#8B5CF6]">{t('hero.titleAccent')}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="mx-auto mt-5 max-w-[460px] text-[14px] leading-[1.8] text-[#71717A] sm:text-[16px] lg:mx-0"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 lg:justify-start"
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

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mx-auto w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[400px]"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative block aspect-square w-full"
            >
              <img
                src={Mascot}
                alt="Massar"
                className="absolute inset-0 h-full w-full object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </Container>

      <div className="mt-12 overflow-hidden border-t border-[#E4E4E7] py-6 sm:mt-16">
        <motion.div
          animate={{ x: isRTL ? ['0%', '50%'] : ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="flex w-max items-center gap-10 whitespace-nowrap"
        >
          {[...marqueeKeys, ...marqueeKeys, ...marqueeKeys, ...marqueeKeys].map((key, i) => (
            <span
              key={`${key}-${i}`}
              className="flex items-center gap-10 text-[14px] font-medium text-[#A1A1AA]"
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
