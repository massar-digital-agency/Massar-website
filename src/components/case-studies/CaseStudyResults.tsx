import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeUp } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { TrendingUp, Gauge, CheckCircle2 } from 'lucide-react'

interface CaseStudyResultsProps {
  slug: string
}

const projectResults: Record<string, { metrics: Array<{ metric: string; label: string; description: string; verified?: boolean }> }> = {
  journeya: {
    metrics: [
      { metric: 'On schedule', label: 'Timely Launch', description: 'All three deliverables (web, app, branding) launched simultaneously on schedule', verified: true },
      { metric: 'Unified', label: 'Brand Consistency', description: 'Cohesive brand experience across web and mobile platforms', verified: true },
      // TODO: Add verified metrics — conversion rate, user acquisition, engagement data
      { metric: '—', label: 'Conversion Rate', description: 'TODO: Add verified conversion improvement data', verified: false },
      { metric: '—', label: 'User Adoption', description: 'TODO: Add verified user acquisition metrics', verified: false },
    ],
  },
  wafr: {
    metrics: [
      { metric: 'Beta live', label: 'Launch Status', description: 'Successfully launched with beta users in Algiers', verified: true },
      { metric: 'Positive', label: 'User Feedback', description: 'Received positive early feedback on usability and design', verified: true },
      // TODO: Add verified metrics — number of beta users, deals listed, engagement
      { metric: '—', label: 'Active Users', description: 'TODO: Add verified active user metrics', verified: false },
      { metric: '—', label: 'Deals Listed', description: 'TODO: Add verified deal listing data', verified: false },
    ],
  },
  darlink: {
    metrics: [
      { metric: '200+', label: 'Property Listings', description: 'Platform launched with over 200 property listings from early adopters', verified: true },
      { metric: 'Positive', label: 'Early Traction', description: 'Positive traction and engagement from early adopters in the market', verified: true },
      // TODO: Add verified metrics — active users, messages sent, conversion rate
      { metric: '—', label: 'Active Users', description: 'TODO: Add verified monthly active user data', verified: false },
      { metric: '—', label: 'Connection Rate', description: 'TODO: Add verified buyer-seller connection metrics', verified: false },
    ],
  },
  nextgen: {
    metrics: [
      { metric: '90+', label: 'Lighthouse Score', description: 'Achieved 90+ performance score on Google Lighthouse audit', verified: true },
      { metric: 'Aligned', label: 'Brand Experience', description: 'Delivered a brand-aligned shopping experience matching premium product positioning', verified: true },
      // TODO: Add verified metrics — conversion rate, page speed, revenue impact
      { metric: '—', label: 'Conversion Rate', description: 'TODO: Add verified conversion rate improvement data', verified: false },
      { metric: '—', label: 'Page Speed', description: 'TODO: Add verified Core Web Vitals data', verified: false },
    ],
  },
}

export function CaseStudyResults({ slug }: CaseStudyResultsProps) {
  const { t } = useTranslation()
  const cs = t(`caseStudies.items.${slug}`, { returnObjects: true }) as {
    challenge: string
    solution: string
    technologies: string[]
    outcomes: string
  }

  const results = projectResults[slug]

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
            Results
          </span>
          <h2 className="text-[22px] font-bold leading-[1.25] tracking-[-0.015em] text-[#0A0A0A] sm:text-[26px] lg:text-[32px]">
            Measurable outcomes
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

          {/* Performance placeholders */}
          <div className="mt-8 rounded-xl border border-dashed border-[#E4E4E7] bg-[#FAFAF9] p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Gauge className="mt-0.5 h-5 w-5 shrink-0 text-[#A1A1AA]" aria-hidden="true" />
              <div>
                <h3 className="text-[14px] font-bold text-[#0A0A0A]">
                  Performance &amp; SEO Metrics
                </h3>
                <p className="mt-1 text-[13px] leading-[1.7] text-[#A1A1AA] italic">
                  {/* TODO: Add Lighthouse scores, Core Web Vitals, and SEO metrics */}
                  TODO: Add verified performance metrics (Lighthouse, Core Web Vitals, SEO improvements)
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
