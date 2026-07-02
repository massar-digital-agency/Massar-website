import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeUp } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { navigateToCaseStudy, navigateToSection } from '@/lib/navigate'

interface CaseStudyNavProps {
  slug: string
}

const projectKeys = ['journeya', 'wafr', 'darlink', 'nextgen'] as const

export function CaseStudyNav({ slug }: CaseStudyNavProps) {
  const { t, i18n } = useTranslation()
  const currentIndex = projectKeys.indexOf(slug as typeof projectKeys[number])
  const prev = currentIndex > 0 ? projectKeys[currentIndex - 1] : null
  const next = currentIndex < projectKeys.length - 1 ? projectKeys[currentIndex + 1] : null
  const Arrow = i18n.language === 'ar' ? ArrowLeft : ArrowRight
  const ArrowBack = i18n.language === 'ar' ? ArrowRight : ArrowLeft

  return (
    <section className="border-t border-[#E4E4E7] bg-white py-12 sm:py-16">
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              {prev ? (
                <button
                  type="button"
                  onClick={() => navigateToCaseStudy(prev)}
                  className="group flex items-center gap-2 text-left"
                  aria-label={`Previous project: ${t(`projects.items.${prev}.title`)}`}
                >
                  <ArrowBack className="h-4 w-4 text-[#A1A1AA] transition-colors group-hover:text-[#8B5CF6]" aria-hidden="true" />
                  <div>
                    <span className="block text-[11px] font-semibold tracking-[0.08em] text-[#A1A1AA] uppercase">
                      Previous
                    </span>
                    <span className="block text-[14px] font-medium text-[#52525B] transition-colors group-hover:text-[#8B5CF6]">
                      {t(`projects.items.${prev}.title`)}
                    </span>
                  </div>
                </button>
              ) : (
                <div />
              )}
            </div>

            <button
              type="button"
              onClick={() => navigateToSection('projects')}
              className="hidden sm:block text-[13px] font-medium text-[#71717A] hover:text-[#8B5CF6] transition-colors underline-offset-2 hover:underline whitespace-nowrap"
            >
              {t('projects.viewProject')}
            </button>

            <div className="flex-1 flex justify-end">
              {next ? (
                <button
                  type="button"
                  onClick={() => navigateToCaseStudy(next)}
                  className="group flex items-center gap-2 text-right"
                  aria-label={`Next project: ${t(`projects.items.${next}.title`)}`}
                >
                  <div>
                    <span className="block text-[11px] font-semibold tracking-[0.08em] text-[#A1A1AA] uppercase">
                      Next
                    </span>
                    <span className="block text-[14px] font-medium text-[#52525B] transition-colors group-hover:text-[#8B5CF6]">
                      {t(`projects.items.${next}.title`)}
                    </span>
                  </div>
                  <Arrow className="h-4 w-4 text-[#A1A1AA] transition-colors group-hover:text-[#8B5CF6]" aria-hidden="true" />
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
