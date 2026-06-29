import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeUp } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Accordion } from '@/components/ui/Accordion'

export function FAQ() {
  const { t } = useTranslation()
  const items = t('faq.items', { returnObjects: true }) as Array<{
    question: string
    answer: string
  }>

  return (
    <Section>
      <Container narrow>
        <SectionHeader
          label={t('faq.label')}
          title={t('faq.title')}
        />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="rounded-2xl border border-[#E4E4E7] bg-white px-7 py-2 sm:px-10"
        >
          <Accordion items={items} />
        </motion.div>
      </Container>
    </Section>
  )
}
