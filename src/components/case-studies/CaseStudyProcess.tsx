import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeUp } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { Search, PenTool, Code2, FileText, Layers } from 'lucide-react'

interface CaseStudyProcessProps {
  slug: string
}

const processItems: Array<{
  icon: React.ReactNode
  phase: string
  title: string
  descriptionKey: string
  details: Record<string, string>
}> = [
  {
    icon: <Search className="h-5 w-5" aria-hidden="true" />,
    phase: 'Discovery & Strategy',
    title: 'Research and planning',
    descriptionKey: 'process.steps.discover.title',
    details: {
      journeya: 'Conducted competitor analysis of existing tourism platforms, user interviews with potential travelers, and defined the information architecture for the booking ecosystem.',
      wafr: 'Researched food waste patterns in Algeria, analyzed competitor apps globally, and conducted user surveys to understand consumer behavior around food deals.',
      darlink: 'Analyzed the Algerian real estate market landscape, studied international real estate platforms, and defined user personas for buyers, sellers, and investors.',
      nextgen: 'Reviewed the existing brand presence, analyzed top-performing e-commerce stores, and identified conversion bottlenecks in the current customer journey.',
    },
  },
  {
    icon: <PenTool className="h-5 w-5" aria-hidden="true" />,
    phase: 'Design',
    title: 'UI/UX and brand design',
    descriptionKey: 'process.steps.design.title',
    details: {
      journeya: 'Designed a cohesive brand identity including logo, color palette, and typography. Created wireframes and high-fidelity prototypes for both web and mobile platforms.',
      wafr: 'Created a friendly, approachable brand identity focused on sustainability. Designed an intuitive mobile-first interface with emphasis on quick deal discovery.',
      darlink: 'Developed a professional, trustworthy brand identity suitable for the real estate market. Designed comprehensive wireframes for property search, listings, and messaging flows.',
      nextgen: 'Designed a premium, product-focused interface with emphasis on high-quality imagery, clear product presentation, and a streamlined checkout experience.',
    },
  },
  {
    icon: <Code2 className="h-5 w-5" aria-hidden="true" />,
    phase: 'Development',
    title: 'Build and integration',
    descriptionKey: 'process.steps.develop.title',
    details: {
      journeya: 'Built a responsive React web app with Node.js backend for real-time booking. Developed a companion mobile app and integrated the brand assets across all touchpoints.',
      wafr: 'Developed a cross-platform React Native application with Firebase backend for real-time data, geolocation services, and push notifications.',
      darlink: 'Architected a full-stack Next.js platform with PostgreSQL database, advanced search functionality, Stripe payment integration, and real-time messaging.',
      nextgen: 'Created a custom Shopify-based e-commerce solution with optimized product pages, fast checkout flow, and performance-first frontend architecture.',
    },
  },
]

export function CaseStudyProcess({ slug }: CaseStudyProcessProps) {
  const { t } = useTranslation()

  return (
    <section className="scroll-mt-24 border-b border-[#E4E4E7] bg-white py-16 sm:py-20 lg:py-24">
      <Container narrow>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <span className="mb-4 inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.12em] text-[#8B5CF6] uppercase">
            <Layers className="h-3.5 w-3.5" aria-hidden="true" />
            Our Process
          </span>
          <h2 className="text-[22px] font-bold leading-[1.25] tracking-[-0.015em] text-[#0A0A0A] sm:text-[26px] lg:text-[32px]">
            How we approached the project
          </h2>

          <div className="mt-10 space-y-10">
            {processItems.map((item, i) => {
              const detail = slug in item.details ? item.details[slug as keyof typeof item.details] : ''

              return (
                <div key={i} className="relative pl-10 sm:pl-12">
                  {/* Timeline line */}
                  {i < processItems.length - 1 && (
                    <div className="absolute left-[18px] top-14 bottom-0 w-px bg-[#E4E4E7]" aria-hidden="true" />
                  )}

                  {/* Step icon */}
                  <div className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-xl border border-[#E4E4E7] bg-white text-[#8B5CF6] shadow-sm">
                    {item.icon}
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold tracking-[0.1em] text-[#A1A1AA] uppercase">
                      {item.phase}
                    </span>
                    <h3 className="mt-1 text-[17px] font-bold text-[#0A0A0A] sm:text-[19px]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.8] text-[#52525B] sm:text-[16px]">
                      {detail || (
                        <>
                          {/* TODO: Add process details for this project */}
                          {t(`caseStudies.items.${slug}.solution`)}
                        </>
                      )}
                    </p>

                    {/* Placeholder for wireframes/prototype images */}
                    {item.phase === 'Design' && (
                      <div className="mt-5">
                        <div className="flex items-center gap-2 rounded-lg border border-dashed border-[#E4E4E7] bg-[#FAFAF9] px-4 py-6 sm:py-8">
                          <FileText className="h-5 w-5 text-[#A1A1AA]" aria-hidden="true" />
                          <span className="text-[13px] text-[#A1A1AA] italic">
                            {/* TODO: Add wireframes / UI mockup screenshots */}
                            TODO: Add wireframes and UI design mockups
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
