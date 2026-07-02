import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/hooks/useAnimationVariants'
import { ArrowUpRight, Code2 } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'

const projectKeys = ['journeya', 'wafr', 'darlink', 'nextgen'] as const

const projectColors: Record<string, { bg: string; text: string }> = {
  journeya: { bg: '#ECFDF5', text: '#059669' },
  wafr: { bg: '#FEF3C7', text: '#D97706' },
  darlink: { bg: '#DBEAFE', text: '#2563EB' },
  nextgen: { bg: '#F3F0FF', text: '#8B5CF6' },
}

export function Projects() {
  const { t } = useTranslation()

  return (
    <Section id="projects" className="bg-white border-y border-[#E4E4E7]">
      <Container>
        <SectionHeader
          label={t('projects.label')}
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-5 sm:gap-6 sm:grid-cols-2"
        >
          {projectKeys.map((key) => {
            const color = projectColors[key]
            const cs = t(`caseStudies.items.${key}`, { returnObjects: true }) as {
              challenge: string
              solution: string
              technologies: string[]
              outcomes: string
            } | undefined

            return (
              <motion.a
                key={key}
                variants={fadeUp}
                href="#"
                className="group flex flex-col rounded-2xl border border-[#E4E4E7] bg-[#FAFAF9] transition-all duration-300 hover:border-[#D4D4D8] hover:shadow-lg hover:shadow-black/[0.04] overflow-hidden"
              >
                <div className="flex-1 p-7 sm:p-8">
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-[18px] font-bold"
                    style={{ backgroundColor: color.bg, color: color.text }}
                  >
                    {t(`projects.items.${key}.title`).charAt(0)}
                  </div>

                  <span className="mb-2 inline-block text-[12px] font-semibold tracking-[0.08em] text-[#8B5CF6] uppercase">
                    {t(`projects.items.${key}.category`)}
                  </span>
                  <h3 className="mb-2.5 text-[19px] font-bold text-[#0A0A0A] sm:text-[21px]">
                    {t(`projects.items.${key}.title`)}
                  </h3>
                  <p className="mb-4 text-[14px] leading-[1.75] text-[#71717A] sm:text-[15px]">
                    {t(`projects.items.${key}.description`)}
                  </p>

                  {cs?.outcomes && (
                    <p className="mb-4 text-[13px] leading-[1.6] text-[#52525B] border-s-2 border-[#8B5CF6]/30 ps-3">
                      {cs.outcomes}
                    </p>
                  )}

                  {cs?.technologies && cs.technologies.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Code2 className="h-3.5 w-3.5 text-[#A1A1AA]" aria-hidden="true" />
                      {cs.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-white border border-[#E4E4E7] px-2 py-0.5 text-[11px] font-medium text-[#71717A]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-[#E4E4E7] px-7 py-4 sm:px-8">
                  <span className="text-[14px] font-medium text-[#71717A] group-hover:text-[#8B5CF6] transition-colors">
                    {t('projects.viewProject')}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#A1A1AA] transition-all duration-300 group-hover:text-[#8B5CF6] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </div>
              </motion.a>
            )
          })}
        </motion.div>
      </Container>
    </Section>
  )
}
