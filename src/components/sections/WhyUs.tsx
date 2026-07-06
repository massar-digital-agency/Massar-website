import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Target, Sparkles, Shield } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import FaceShape from '@/assets/images/face3d.svg'

const pillars: { key: string; icon: LucideIcon }[] = [
  { key: 'craft', icon: Sparkles },
  { key: 'strategy', icon: Target },
  { key: 'reliability', icon: Shield },
]

export function WhyUs() {
  const { t } = useTranslation()

  return (
    <Section id="about" className="relative overflow-hidden bg-white border-y border-[#E4E4E7]">
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="relative"
          >
            <img
              src={FaceShape}
              alt=""
              loading="lazy"
              className="pointer-events-none absolute -top-16 start-[-40px] -z-10 h-[320px] w-auto opacity-[0.06]"
            />
            <span className="mb-4 inline-block text-[13px] font-semibold tracking-[0.1em] text-[#8B5CF6] uppercase">
              {t('why.label')}
            </span>
            <h2 className="text-[22px] font-bold leading-[1.25] tracking-[-0.015em] text-[#0A0A0A] sm:text-[26px] lg:text-[32px]">
              {t('why.title')}
            </h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-[#71717A] sm:text-[17px]">
              {t('why.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col gap-5"
          >
            {pillars.map(({ key, icon: Icon }) => (
              <motion.div
                key={key}
                variants={fadeUp}
                className="flex gap-5 rounded-2xl border border-[#E4E4E7] bg-[#FAFAF9] p-6 sm:p-7"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#8B5CF6] border border-[#E4E4E7]">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#0A0A0A]">
                    {t(`why.pillars.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.75] text-[#71717A] sm:text-[15px]">
                    {t(`why.pillars.${key}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
