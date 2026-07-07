import { useTranslation } from 'react-i18next'
import { motion } from '@/lib/motion'
import { fadeUp } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { Code2, Zap } from 'lucide-react'

interface CaseStudyTechStackProps {
  slug: string
}

export function CaseStudyTechStack({ slug }: CaseStudyTechStackProps) {
  const { t } = useTranslation()
  const cs = t(`caseStudies.items.${slug}`, { returnObjects: true }) as {
    challenge: string
    solution: string
    technologies: string[]
    outcomes: string
  }

  const techLogoUrls: Record<string, string> = {
    'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
    'Figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    'React Native': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    'Google Maps API': '',
    'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    'Stripe': '',
    'Shopify': '',
    'Vercel': '',
    'React Native (Expo)': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Google OAuth': '',
    'Cloudinary': '',
  }

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
            <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
            {t('caseStudy.technologyStack')}
          </span>
          <h2 className="text-[22px] font-bold leading-[1.25] tracking-[-0.015em] text-[#0A0A0A] sm:text-[26px] lg:text-[32px]">
            {t('caseStudy.toolsAndTechnologies')}
          </h2>

          <div className="mt-8">
            <div className="flex flex-wrap gap-2">
              {cs.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#E4E4E7] bg-white px-3 py-1.5 text-[13px] font-medium text-[#52525B] transition-colors hover:border-[#8B5CF6]/30 hover:bg-[#F3F0FF]"
                >
                  {techLogoUrls[tech] && (
                    <img
                      src={techLogoUrls[tech]}
                      alt=""
                      className="h-4 w-4"
                      aria-hidden="true"
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                  )}
                  {tech}
                </span>
              ))}
            </div>
            <p className="mt-4 text-[13px] leading-[1.7] text-[#71717A]">
              {cs.solution}
            </p>
          </div>

          {/* Architecture placeholder */}
          <div className="mt-8 rounded-xl border border-dashed border-[#E4E4E7] bg-[#FAFAF9] p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Zap className="mt-0.5 h-5 w-5 shrink-0 text-[#A1A1AA]" aria-hidden="true" />
              <div>
                <h3 className="text-[14px] font-bold text-[#0A0A0A]">
                  {t('caseStudy.architectureOverview')}
                </h3>
                <p className="mt-1 text-[13px] leading-[1.7] text-[#A1A1AA] italic">
                  {/* TODO: Add architecture diagram or description */}
                  TODO: Add architecture diagram and explain key technical decisions
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
