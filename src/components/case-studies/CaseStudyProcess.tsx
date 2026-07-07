import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeUp } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { Search, PenTool, Code2, FileText, Layers } from 'lucide-react'

interface CaseStudyProcessProps {
  slug: string
}

const processItems = [
  { icon: <Search className="h-5 w-5" aria-hidden="true" />, phaseKey: 'caseStudy.phaseDiscovery', titleKey: 'caseStudy.stepResearch' },
  { icon: <PenTool className="h-5 w-5" aria-hidden="true" />, phaseKey: 'caseStudy.phaseDesign', titleKey: 'caseStudy.stepDesign' },
  { icon: <Code2 className="h-5 w-5" aria-hidden="true" />, phaseKey: 'caseStudy.phaseDevelopment', titleKey: 'caseStudy.stepBuild' },
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
            {t('caseStudy.ourProcess')}
          </span>
          <h2 className="text-[22px] font-bold leading-[1.25] tracking-[-0.015em] text-[#0A0A0A] sm:text-[26px] lg:text-[32px]">
            {t('caseStudy.howWeApproached')}
          </h2>

          <div className="mt-10 space-y-10">
            {processItems.map((item, i) => {
              const detail = t(`caseStudy.processSteps.${slug}.step${i}`, { defaultValue: '' })

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
                      {t(item.phaseKey)}
                    </span>
                    <h3 className="mt-1 text-[17px] font-bold text-[#0A0A0A] sm:text-[19px]">
                      {t(item.titleKey)}
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
                    {item.phaseKey === 'caseStudy.phaseDesign' && (
                      <div className="mt-5">
                        <div className="flex items-center gap-2 rounded-lg border border-dashed border-[#E4E4E7] bg-[#FAFAF9] px-4 py-6 sm:py-8">
                          <FileText className="h-5 w-5 text-[#A1A1AA]" aria-hidden="true" />
                          <span className="text-[13px] text-[#A1A1AA] italic">
                            {t('caseStudy.placeholder')}
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
