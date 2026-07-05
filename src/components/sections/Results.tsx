import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeUp, stagger } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { trackEvent } from '@/lib/analytics'

export function Results() {
  const { t } = useTranslation()
  const items = t('results.items', { returnObjects: true }) as Array<{
    metric: string
    label: string
    description: string
    placeholder?: boolean
  }>

  if (!items || items.length === 0) return null

  return (
    <Section className="bg-[#F8F7F4]">
      <Container>
        <SectionHeader
          label={t('results.label')}
          title={t('results.title')}
          subtitle={t('results.subtitle')}
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6"
        >
          {items.map((item) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              className="relative rounded-2xl border border-[#E4E4E7] bg-white p-7 sm:p-8 text-center transition-all duration-200 hover:border-[#D4D4D8] hover:shadow-lg hover:shadow-black/[0.04]"
            >
              {item.placeholder && (
                <span className="absolute -top-2 -end-2 rounded bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                  Placeholder
                </span>
              )}
              <span className="block text-[32px] font-extrabold leading-none tracking-[-0.02em] text-[#8B5CF6] sm:text-[38px]">
                {item.metric}
              </span>
              <h3 className="mt-3 text-[14px] font-bold text-[#0A0A0A] sm:text-[15px]">
                {item.label}
              </h3>
              <p className="mt-1.5 text-[13px] leading-[1.6] text-[#71717A]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 sm:mt-16 text-center"
        >
          <p className="text-[14px] leading-[1.7] text-[#71717A] mb-5 sm:text-[15px]">
            {t('results.ctaMicro')}
          </p>
          <Button size="lg" variant="secondary" href="#projects" onClick={() => trackEvent('cta_click', { cta_location: 'results', cta_text: t('results.cta') })}>
            {t('results.cta')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </motion.div>
      </Container>
    </Section>
  )
}
