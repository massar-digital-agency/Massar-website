import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeUp } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { navigateToSection } from '@/lib/navigate'

export function CaseStudyCTA() {
  const { t, i18n } = useTranslation()
  const Arrow = i18n.language === 'ar' ? ArrowLeft : ArrowRight

  return (
    <section className="border-t border-[#E4E4E7] bg-white py-16 sm:py-20 lg:py-24">
      <Container narrow>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="rounded-3xl border border-[#E4E4E7] bg-[#FAFAF9] px-8 py-14 sm:px-14 sm:py-20 lg:px-20 lg:py-24 text-center"
        >
          <h2 className="text-[22px] font-bold leading-[1.25] tracking-[-0.015em] text-[#0A0A0A] sm:text-[26px] lg:text-[32px]">
            {t('caseStudies.cta')}
          </h2>
          <p className="mx-auto mt-5 max-w-[480px] text-[15px] leading-[1.75] text-[#71717A] sm:text-[17px]">
            {t('caseStudies.ctaMicro')}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 sm:mt-10">
            <Button size="lg" href="#contact">
              Start Your Project
              <Arrow className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigateToSection('projects')}>
              View All Projects
            </Button>
          </div>
          <p className="mt-4 text-[12px] text-[#A1A1AA]">
            Free discovery call &bull; Response within 24h &bull; No obligation
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
