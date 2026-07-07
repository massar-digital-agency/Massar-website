import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeUp } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { TrendingUp, Gauge, CheckCircle2 } from 'lucide-react'

interface CaseStudyResultsProps {
  slug: string
}

interface Metric {
  metric: string
  label: string
  description: string
  verified?: boolean
}

export function CaseStudyResults({ slug }: CaseStudyResultsProps) {
  const { t } = useTranslation()
  const cs = t(`caseStudies.items.${slug}`, { returnObjects: true }) as {
    challenge: string
    solution: string
    technologies: string[]
    outcomes: string
  }

  const results = t(`caseStudy.projectResults.${slug}`, { returnObjects: true }) as { metrics: Metric[] } | undefined

  return (
    <section className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
      <Container narrow>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <span className="mb-4 inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.12em] text-[#8B5CF6] uppercase">
            <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
            {t('caseStudy.results')}
          </span>
          <h2 className="text-[22px] font-bold leading-[1.25] tracking-[-0.015em] text-[#0A0A0A] sm:text-[26px] lg:text-[32px]">
            {t('caseStudy.measurableOutcomes')}
          </h2>

          <p className="mt-4 text-[14px] leading-[1.8] text-[#52525B] sm:text-[16px]">
            {cs.outcomes}
          </p>

          {results && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {results.metrics.map((item) => (
                <div
                  key={item.label}
                  className={`rounded-xl border p-5 sm:p-6 transition-all duration-200 ${
                    item.verified
                      ? 'border-[#E4E4E7] bg-[#FAFAF9]'
                      : 'border-dashed border-[#E4E4E7] bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[28px] font-extrabold leading-none tracking-[-0.02em] text-[#0A0A0A] sm:text-[32px]">
                        {item.metric}
                      </div>
                      <span className="mt-1.5 block text-[13px] font-semibold text-[#52525B]">
                        {item.label}
                      </span>
                    </div>
                    {item.verified ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#059669]" aria-hidden="true" />
                    ) : (
                      <span className="shrink-0 rounded bg-[#F3F0FF] px-2 py-0.5 text-[10px] font-medium text-[#8B5CF6]">
                        TODO
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-[13px] leading-[1.6] text-[#71717A]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {slug === 'journeya' && (
            <div className="mt-8 rounded-xl border border-[#E4E4E7] bg-[#FAFAF9] p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Gauge className="mt-0.5 h-5 w-5 shrink-0 text-[#8B5CF6]" aria-hidden="true" />
                <div>
                  <h3 className="text-[14px] font-bold text-[#0A0A0A]">
                    {t('caseStudy.performanceSeo')}
                  </h3>
                  <p className="mt-1 text-[13px] leading-[1.7] text-[#52525B]">
                    {t(`caseStudy.performanceText.${slug}`, { defaultValue: '' })}
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
