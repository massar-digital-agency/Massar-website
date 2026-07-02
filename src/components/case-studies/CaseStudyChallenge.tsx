import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeUp } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { AlertTriangle, Target, Clock, Gauge } from 'lucide-react'

interface CaseStudyChallengeProps {
  slug: string
}

const challengeDetails: Record<string, { clientGoal: string; userPain: string; constraints: string[] }> = {
  journeya: {
    clientGoal: 'Launch a complete tourism startup ecosystem — web platform, mobile app, and brand identity — simultaneously within a tight timeframe.',
    userPain: 'Travelers in Algeria lacked a centralized platform for booking accommodations, discovering destinations, and planning trips efficiently.',
    constraints: [
      'Startup timeline required all three deliverables (web, app, branding) to launch simultaneously',
      'Limited initial budget typical of early-stage startups',
      'Need for real-time booking synchronization across web and mobile',
    ],
  },
  wafr: {
    clientGoal: 'Launch an impactful mobile application that helps reduce food waste by connecting consumers with discounted surplus food from local businesses.',
    userPain: 'Consumers were unaware of nearby food deals, leading to significant food waste from restaurants and shops that could have been sold at a discount.',
    constraints: [
      'Cross-platform launch required for both iOS and Android with limited resources',
      'Real-time geolocation and notification features demanded robust backend infrastructure',
      'User onboarding needed to be frictionless to drive adoption',
    ],
  },
  darlink: {
    clientGoal: 'Create a modern, trustworthy real estate platform that serves the unique needs of the Algerian property market.',
    userPain: 'Buyers, sellers, and investors in Algeria lacked a centralized, modern platform with reliable property listings, advanced search, and direct communication tools.',
    constraints: [
      'Property data in Algeria is often fragmented, requiring manual listing verification processes',
      'Payment integration complexity with local and international payment methods',
      'Platform needed to serve three distinct user types: buyers, sellers, and investors',
    ],
  },
  nextgen: {
    clientGoal: 'Build an e-commerce experience that reflects premium product quality and drives conversions through exceptional design and performance.',
    userPain: 'The existing brand presence did not match the premium quality of their products, resulting in lower conversion rates and brand perception.',
    constraints: [
      'Performance was critical — slow load times directly impact e-commerce revenue',
      'Checkout flow needed to be optimized for maximum conversion without sacrificing trust signals',
      'Design needed to convey premium quality while maintaining fast load times',
    ],
  },
}

export function CaseStudyChallenge({ slug }: CaseStudyChallengeProps) {
  const { t } = useTranslation()
  const cs = t(`caseStudies.items.${slug}`, { returnObjects: true }) as {
    challenge: string
    solution: string
    technologies: string[]
    outcomes: string
  }

  const details = challengeDetails[slug]

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
            The Challenge
          </span>
          <h2 className="text-[22px] font-bold leading-[1.25] tracking-[-0.015em] text-[#0A0A0A] sm:text-[26px] lg:text-[32px]">
            Understanding the problem
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
                    Client Goal
                  </h3>
                  <p className="text-[14px] leading-[1.8] text-[#52525B] sm:text-[16px]">
                    {details.clientGoal}
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-[15px] font-bold text-[#0A0A0A] sm:text-[17px]">
                    <Target className="h-4 w-4 text-[#8B5CF6]" aria-hidden="true" />
                    User Pain Points
                  </h3>
                  <p className="text-[14px] leading-[1.8] text-[#52525B] sm:text-[16px]">
                    {details.userPain}
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-[15px] font-bold text-[#0A0A0A] sm:text-[17px]">
                    <AlertTriangle className="h-4 w-4 text-[#8B5CF6]" aria-hidden="true" />
                    Key Constraints
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

                {/* TODO: Add actual timeline constraint and success criteria */}
                <div className="rounded-xl border border-[#E4E4E7] bg-[#FAFAF9] p-5 sm:p-6">
                  <h3 className="mb-3 text-[14px] font-bold text-[#0A0A0A]">
                    Timeline &amp; Success Criteria
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#A1A1AA]" aria-hidden="true" />
                      <div>
                        <span className="text-[12px] font-semibold tracking-[0.05em] text-[#A1A1AA] uppercase">Timeline</span>
                        <p className="text-[14px] text-[#52525B]">8–12 weeks</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Gauge className="mt-0.5 h-4 w-4 shrink-0 text-[#A1A1AA]" aria-hidden="true" />
                      <div>
                        <span className="text-[12px] font-semibold tracking-[0.05em] text-[#A1A1AA] uppercase">Success Criteria</span>
                        <p className="text-[14px] text-[#52525B]">Timely launch, brand consistency, user adoption</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-[12px] text-[#A1A1AA] italic">
                    {/* TODO: Replace with verified timeline and success criteria from client */}
                    TODO: Add verified timeline and success criteria
                  </p>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
