import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import {
  Globe, Smartphone, Palette, Layers,
  Zap, Brain,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

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
                className="group rounded-2xl border border-[#E4E4E7] bg-white p-7 sm:p-8 transition-all duration-300 hover:border-[#D4D4D8] hover:shadow-lg hover:shadow-black/[0.04]"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3F0FF] text-[#8B5CF6]">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
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
      </Container>
    </Section>
  )
}
