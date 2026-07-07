import { useTranslation } from 'react-i18next'
import { motion } from '@/lib/motion'
import { fadeUp } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { Building2, Briefcase } from 'lucide-react'

interface CaseStudyOverviewProps {
  slug: string
}

export function CaseStudyOverview({ slug }: CaseStudyOverviewProps) {
  const { t } = useTranslation()
  const project = t(`projects.items.${slug}`, { returnObjects: true }) as {
    title: string
    category: string
    industry: string
    description: string
  }
  const cs = t(`caseStudies.items.${slug}`, { returnObjects: true }) as {
    challenge: string
    solution: string
    technologies: string[]
    outcomes: string
    summary?: string
  }

  const services = t(`caseStudy.defaultServices.${slug}`, { returnObjects: true }) as string[] | undefined

  const metaItems = [
    { label: t('caseStudy.client'), value: project.title },
    { label: t('caseStudy.industry'), value: project.industry || 'Technology', icon: <Building2 className="h-4 w-4 text-[#8B5CF6]" aria-hidden="true" /> },
    { label: t('caseStudy.services'), value: (services ?? []).join(', '), icon: <Briefcase className="h-4 w-4 text-[#8B5CF6]" aria-hidden="true" /> },
  ]

  return (
    <section id="case-study-overview" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
      <Container narrow>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <span className="mb-4 inline-block text-[12px] font-semibold tracking-[0.12em] text-[#8B5CF6] uppercase">
            {t('caseStudies.label')}
          </span>
          <h2 className="text-[22px] font-bold leading-[1.25] tracking-[-0.015em] text-[#0A0A0A] sm:text-[26px] lg:text-[32px]">
            {t('caseStudies.title')}
          </h2>

          {cs.summary && (
            <div className="mt-6 rounded-xl border border-[#E4E4E7] bg-white p-5 sm:p-6">
              <h3 className="mb-2 text-[14px] font-bold text-[#0A0A0A]">
                {t('caseStudy.executiveSummary')}
              </h3>
              <p className="text-[14px] leading-[1.8] text-[#52525B] sm:text-[15px]">
                {cs.summary}
              </p>
            </div>
          )}

          {/* Project Metadata Grid */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {metaItems.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-[#E4E4E7] bg-[#FAFAF9] p-4 sm:p-5"
              >
                <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold tracking-[0.05em] text-[#A1A1AA] uppercase">
                  {item.icon}
                  {item.label}
                </div>
                <p className="text-[14px] font-medium text-[#0A0A0A] sm:text-[15px]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Technology tags */}
          <div className="mt-6 rounded-xl border border-[#E4E4E7] bg-[#FAFAF9] p-4 sm:p-5">
            <span className="mb-2.5 block text-[12px] font-semibold tracking-[0.05em] text-[#A1A1AA] uppercase">
              {t('caseStudy.technologiesUsed')}
            </span>
            <div className="flex flex-wrap gap-2">
              {cs.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-white border border-[#E4E4E7] px-2.5 py-1 text-[12px] font-medium text-[#52525B]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Overview text */}
          <div className="mt-10">
            <h3 className="text-[18px] font-bold text-[#0A0A0A] sm:text-[20px]">
              {t('caseStudy.projectOverview')}
            </h3>
            <div className="mt-4 space-y-4 text-[14px] leading-[1.8] text-[#52525B] sm:text-[16px]">
              <p>{cs.challenge}</p>
              <p>{cs.solution}</p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
