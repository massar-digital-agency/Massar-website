import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeUp } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { Image, Smartphone, Monitor, Layout } from 'lucide-react'

interface CaseStudyGalleryProps {
  slug: string
}

const gallerySlots: Array<{ icon: React.ReactNode; label: string; description: string }> = [
  { icon: <Monitor className="h-6 w-6" aria-hidden="true" />, label: 'Desktop View', description: 'Full-page desktop screenshot of the final design' },
  { icon: <Smartphone className="h-6 w-6" aria-hidden="true" />, label: 'Mobile View', description: 'Responsive mobile experience showcase' },
  { icon: <Layout className="h-6 w-6" aria-hidden="true" />, label: 'Key Features', description: 'Highlight of core features and interactions' },
  { icon: <Image className="h-6 w-6" aria-hidden="true" />, label: 'Brand Assets', description: 'Logo, color palette, and brand identity system' },
]

export function CaseStudyGallery({ slug }: CaseStudyGalleryProps) {
  const { t } = useTranslation()
  const project = t(`projects.items.${slug}`, { returnObjects: true }) as {
    title: string
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
            <Image className="h-3.5 w-3.5" aria-hidden="true" />
            Visual Gallery
          </span>
          <h2 className="text-[22px] font-bold leading-[1.25] tracking-[-0.015em] text-[#0A0A0A] sm:text-[26px] lg:text-[32px]">
            Visual overview of {project.title}
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {gallerySlots.map((slot) => (
              <div
                key={slot.label}
                className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#E4E4E7] bg-[#FAFAF9] px-6 py-12 sm:py-16 text-center transition-colors hover:border-[#D4D4D8]"
                role="img"
                aria-label={`Placeholder for ${slot.label}`}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F0FF] text-[#8B5CF6]">
                  {slot.icon}
                </div>
                <span className="text-[13px] font-semibold text-[#52525B]">
                  {slot.label}
                </span>
                <p className="mt-1.5 text-[12px] leading-[1.6] text-[#A1A1AA] italic">
                  {slot.description}
                </p>
                <p className="mt-3 text-[11px] font-medium text-[#A1A1AA] uppercase tracking-wider">
                  {/* TODO: Add screenshot image */}
                  TODO: Add screenshot
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
