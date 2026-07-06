import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeUp } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Accordion } from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'
import { trackEvent } from '@/lib/analytics'
import { useElementVisibility } from '@/hooks/useElementVisibility'
import ChatShape from '@/assets/images/chatbulb3d.svg'

export function FAQ() {
  const { t } = useTranslation()
  useElementVisibility('faq', 'faq_section_visible')
  const items = t('faq.items', { returnObjects: true }) as Array<{
    question: string
    answer: string
  }>

  return (
    <Section id="faq" className="relative overflow-hidden">
      <img
        src={ChatShape}
        alt=""
        loading="lazy"
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

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-10 text-center"
        >
          <p className="text-[14px] leading-[1.7] text-[#71717A] mb-5 sm:text-[15px]">
            {t('faq.ctaMicro')}
          </p>
          <Button size="lg" variant="secondary" href="#contact" onClick={() => trackEvent('cta_click', { cta_location: 'faq', cta_text: t('faq.cta') })}>
            {t('faq.cta')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </motion.div>
      </Container>
    </Section>
  )
}
