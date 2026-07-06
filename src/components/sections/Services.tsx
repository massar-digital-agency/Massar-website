import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, stagger } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import {
  Globe, Smartphone, Palette, Layers,
  Zap, Brain, ArrowRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const serviceKeys = ['web', 'apps', 'branding', 'uiux', 'automation', 'ai'] as const

const icons: Record<string, LucideIcon> = {
  web: Globe,
  apps: Smartphone,
  branding: Palette,
  uiux: Layers,
  automation: Zap,
  ai: Brain,
}

export function Services() {
  const { t } = useTranslation()
  const reducedMotion = useReducedMotion()

  return (
    <Section id="services">
      <Container>
        <SectionHeader
          label={t('services.label')}
          title={t('services.title')}
          subtitle={t('services.subtitle')}
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {serviceKeys.map((key) => {
            const Icon = icons[key]
            return (
              <motion.div
                key={key}
                variants={fadeUp}
                whileHover={reducedMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
                whileTap={reducedMotion ? {} : { scale: 0.98 }}
                onClick={() => trackEvent('service_card_click', { service: t(`services.items.${key}.title`) })}
                role="article"
                className="group rounded-2xl border border-[#E4E4E7] bg-white p-7 sm:p-8 transition-all duration-300 hover:border-[#D4D4D8] hover:shadow-lg hover:shadow-black/[0.04] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:rounded-xl"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3F0FF] text-[#8B5CF6]">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-[16px] font-semibold text-[#0A0A0A] sm:text-[17px]">
                  {t(`services.items.${key}.title`)}
                </h3>
                <p className="text-[14px] leading-[1.75] text-[#71717A] sm:text-[15px]">
                  {t(`services.items.${key}.description`)}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 sm:mt-16 text-center"
        >
          <p className="text-[14px] leading-[1.7] text-[#71717A] mb-5 sm:text-[15px]">
            {t('services.ctaMicro')}
          </p>
          <Button size="lg" href="#contact" onClick={() => trackEvent('cta_click', { cta_location: 'services', cta_text: t('services.cta') })}>
            {t('services.cta')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </motion.div>
      </Container>
    </Section>
  )
}
