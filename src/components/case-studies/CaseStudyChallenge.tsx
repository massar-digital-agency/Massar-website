import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeUp } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { AlertTriangle, Target, Clock, Gauge } from 'lucide-react'

interface CaseStudyChallengeProps {
  slug: string
}

export function CaseStudyChallenge({ slug }: CaseStudyChallengeProps) {
  const { t } = useTranslation()
  const cs = t(`caseStudies.items.${slug}`, { returnObjects: true }) as {
    challenge: string
    solution: string
    technologies: string[]
    outcomes: string
  }

  const details = t(`caseStudy.challengeDetails.${slug}`, { returnObjects: true }) as {
    clientGoal: string
    userPain: string
    constraints: string[]
  } | undefined

  return (
    <section className="scroll-mt-24 border-t border-[#E4E4E7] bg-white py-16 sm:py-20 lg:py-24">
      <Container narrow>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <span className="mb-4 inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.12em] text-[#8B5CF6] uppercase">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            {t('caseStudy.theChallenge')}
          </span>
          <h2 className="text-[22px] font-bold leading-[1.25] tracking-[-0.015em] text-[#0A0A0A] sm:text-[26px] lg:text-[32px]">
            {t('caseStudy.understandingProblem')}
          </h2>

          <div className="mt-8 space-y-8">
            <p className="text-[14px] leading-[1.8] text-[#52525B] sm:text-[16px]">
              {cs.challenge}
            </p>

            {details && (
              <>
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-[15px] font-bold text-[#0A0A0A] sm:text-[17px]">
                    <Target className="h-4 w-4 text-[#8B5CF6]" aria-hidden="true" />
                    {t('caseStudy.clientGoal')}
                  </h3>
                  <p className="text-[14px] leading-[1.8] text-[#52525B] sm:text-[16px]">
                    {details.clientGoal}
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-[15px] font-bold text-[#0A0A0A] sm:text-[17px]">
                    <Target className="h-4 w-4 text-[#8B5CF6]" aria-hidden="true" />
                    {t('caseStudy.userPainPoints')}
                  </h3>
                  <p className="text-[14px] leading-[1.8] text-[#52525B] sm:text-[16px]">
                    {details.userPain}
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-[15px] font-bold text-[#0A0A0A] sm:text-[17px]">
                    <AlertTriangle className="h-4 w-4 text-[#8B5CF6]" aria-hidden="true" />
                    {t('caseStudy.keyConstraints')}
                  </h3>
                  <ul className="space-y-2">
                    {details.constraints.map((constraint, i) => (
                      <li key={i} className="flex items-start gap-3 text-[14px] leading-[1.7] text-[#52525B] sm:text-[16px]">
                        <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#8B5CF6]/40" aria-hidden="true" />
                        {constraint}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-[#E4E4E7] bg-[#FAFAF9] p-5 sm:p-6">
                  <h3 className="mb-3 text-[14px] font-bold text-[#0A0A0A]">
                    {t('caseStudy.timelineSuccess')}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#A1A1AA]" aria-hidden="true" />
                      <div>
                        <span className="text-[12px] font-semibold tracking-[0.05em] text-[#A1A1AA] uppercase">{t('caseStudy.timeline')}</span>
                        <p className="text-[14px] text-[#52525B]">{slug === 'journeya' ? '~24 weeks (6 months)' : '8–12 weeks'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Gauge className="mt-0.5 h-4 w-4 shrink-0 text-[#A1A1AA]" aria-hidden="true" />
                      <div>
                        <span className="text-[12px] font-semibold tracking-[0.05em] text-[#A1A1AA] uppercase">{t('caseStudy.successCriteria')}</span>
                        <p className="text-[14px] text-[#52525B]">On-time launch, cross-platform consistency, user adoption & conversion</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
