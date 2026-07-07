import { useTranslation } from 'react-i18next'
import { motion } from '@/lib/motion'
import { fadeUp } from '@/hooks/useAnimationVariants'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { trackEvent } from '@/lib/analytics'

export function CTA() {
  const { t, i18n } = useTranslation()
  const Arrow = i18n.language === 'ar' ? ArrowLeft : ArrowRight

  return (
    <section id="contact" className="py-24 sm:py-32 lg:py-40">
      <Container narrow>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="rounded-3xl border border-[#E4E4E7] bg-white px-8 py-14 sm:px-14 sm:py-20 lg:px-20 lg:py-24 text-center"
        >
          <h2 className="text-[22px] font-bold leading-[1.25] tracking-[-0.015em] text-[#0A0A0A] sm:text-[26px] lg:text-[32px]">
            {t('cta.title')}
          </h2>
          <p className="mx-auto mt-5 max-w-[440px] text-[15px] leading-[1.75] text-[#71717A] sm:text-[17px]">
            {t('cta.subtitle')}
          </p>
          <div className="mt-9 sm:mt-10">
            <Button size="lg" href="mailto:massar.digital.studio@gmail.com" onClick={() => trackEvent('cta_click', { cta_location: 'cta_section', cta_text: t('cta.button') })}>
              {t('cta.button')}
              <Arrow className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
