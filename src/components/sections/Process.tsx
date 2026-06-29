import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'

const stepKeys = ['discover', 'plan', 'design', 'develop', 'launch', 'support'] as const

export function Process() {
  const { t } = useTranslation()

  return (
    <Section>
      <Container>
        <SectionHeader
          label={t('process.label')}
          title={t('process.title')}
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {stepKeys.map((key, i) => (
            <motion.div
              key={key}
              variants={fadeUp}
              className="group rounded-2xl border border-[#E4E4E7] bg-white p-7 transition-all duration-300 hover:border-[#D4D4D8] hover:shadow-lg hover:shadow-black/[0.04]"
            >
              <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3F0FF] text-[14px] font-bold text-[#8B5CF6]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mb-2 text-[16px] font-semibold text-[#0A0A0A]">
                {t(`process.steps.${key}.title`)}
              </h3>
              <p className="text-[14px] leading-[1.75] text-[#71717A] sm:text-[15px]">
                {t(`process.steps.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  )
}
