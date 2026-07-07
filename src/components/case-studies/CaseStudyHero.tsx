import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeUp } from '@/hooks/useAnimationVariants'
import { ArrowLeft, ArrowRight, Clock, Users } from 'lucide-react'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'

interface CaseStudyHeroProps {
  slug: string
  color: { bg: string; text: string }
}

const projectMeta: Record<string, { year: string; teamSize: string }> = {
  journeya: { year: '2025', teamSize: '2 developers + 1 designer' },
  wafr: { year: '2025', teamSize: '1 developer + 1 designer' },
}

export function CaseStudyHero({ slug, color }: CaseStudyHeroProps) {
  const { t, i18n } = useTranslation()
  const Arrow = i18n.language === 'ar' ? ArrowLeft : ArrowRight
  const project = t(`projects.items.${slug}`, { returnObjects: true }) as {
    title: string
    category: string
    description: string
  }
  const meta = projectMeta[slug]

  return (
    <section className="relative overflow-hidden border-b border-[#E4E4E7] bg-white pt-[72px]">
      <div className="absolute inset-0 opacity-[0.03]" style={{ background: `radial-gradient(ellipse at top center, ${color.text} 0%, transparent 70%)` }} />
      <div className="mx-auto w-full max-w-[1180px] px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-28">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="max-w-[800px]"
        >
          <Breadcrumbs />

          <div
            className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-[22px] font-bold"
            style={{ backgroundColor: color.bg, color: color.text }}
          >
            {project.title.charAt(0)}
          </div>

          <span className="mb-3 inline-block text-[12px] font-semibold tracking-[0.08em] text-[#8B5CF6] uppercase">
            {project.category}
          </span>

          <h1 className="text-[30px] font-bold leading-[1.15] tracking-[-0.02em] text-[#0A0A0A] sm:text-[40px] lg:text-[52px]">
            {project.title}
          </h1>

          <p className="mt-5 max-w-[600px] text-[15px] leading-[1.8] text-[#52525B] sm:text-[17px]">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5 text-[13px] text-[#52525B]">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[#52525B]" aria-hidden="true" />
              <span>{t('caseStudies.label')} — {meta?.year || '2024'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4 text-[#71717A]" aria-hidden="true" />
              <span>{meta?.teamSize || '3–4 team members'}</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
