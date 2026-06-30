import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeUp } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Accordion } from '@/components/ui/Accordion'
import ChatShape from '@/assets/images/chatbulb3d.svg'

export function FAQ() {
  const { t } = useTranslation()
  const items = t('faq.items', { returnObjects: true }) as Array<{
    question: string
    answer: string
  }>

  return (
    <Section className="relative overflow-hidden">
      <img
        src={ChatShape}
        alt=""
        className="pointer-events-none absolute -top-10 end-[-80px] hidden h-[280px] w-auto opacity-[0.07] lg:block"
      />
      <Container narrow className="relative">
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
