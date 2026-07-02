import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeUp } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { Quote, Star, MessageSquare } from 'lucide-react'

interface CaseStudyTestimonialProps {
  slug: string
}

const testimonialMap: Record<string, { text: string; author: string; role: string; company: string; rating: number; placeholder?: boolean }> = {
  journeya: {
    text: 'Massar delivered our web app ahead of schedule and with incredible attention to detail. Their communication was flawless throughout.',
    author: 'Amine Rahmani',
    role: 'Co-founder',
    company: 'Journeya',
    rating: 5,
  },
  wafr: {
    text: 'The team at Massar understood our vision for Wafr from day one. The mobile app they built is intuitive, fast, and beautifully designed.',
    author: 'Wafr Team',
    role: 'Founder',
    company: 'Wafr',
    rating: 5,
    placeholder: true,
  },
  darlink: {
    text: 'Working with Massar on DarLink was a seamless experience. They delivered a robust real estate platform that exceeded our expectations.',
    author: 'DarLink Team',
    role: 'CEO',
    company: 'DarLink',
    rating: 5,
    placeholder: true,
  },
}

export function CaseStudyTestimonial({ slug }: CaseStudyTestimonialProps) {
  const { t } = useTranslation()
  const testimonials = t('testimonials.items', { returnObjects: true }) as Array<{
    text: string
    author: string
    role: string
    company: string
    rating: number
    placeholder?: boolean
  }>

  // Try to find a matching testimonial
  const project = t(`projects.items.${slug}`, { returnObjects: true }) as { title: string }
  const matchingTestimonial = testimonials.find(
    (test) => test.company.toLowerCase() === project.title.toLowerCase()
  )

  const testimonial = matchingTestimonial || testimonialMap[slug]

  if (!testimonial) {
    return (
      <section className="scroll-mt-24 border-t border-[#E4E4E7] bg-white py-16 sm:py-20 lg:py-24">
        <Container narrow>
          <div className="rounded-xl border border-dashed border-[#E4E4E7] bg-[#FAFAF9] p-6 text-center">
            <MessageSquare className="mx-auto h-8 w-8 text-[#A1A1AA]" aria-hidden="true" />
            <h3 className="mt-3 text-[15px] font-bold text-[#0A0A0A]">
              Client Testimonial
            </h3>
            <p className="mt-2 text-[13px] text-[#A1A1AA] italic">
              {/* TODO: Add verified client testimonial for this project */}
              TODO: Add client testimonial
            </p>
          </div>
        </Container>
      </section>
    )
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
            <Quote className="h-3.5 w-3.5" aria-hidden="true" />
            Client Testimonial
          </span>

          <div className="rounded-2xl border border-[#E4E4E7] bg-[#FAFAF9] p-8 sm:p-10">
            <Quote className="mb-4 h-8 w-8 text-[#8B5CF6]/20" aria-hidden="true" />

            <div className="mb-5 flex items-center gap-1">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              ))}
            </div>

            <blockquote className="text-[15px] leading-[1.8] text-[#52525B] sm:text-[17px]">
              &ldquo;{testimonial.text}&rdquo;
            </blockquote>

            <div className="mt-6 flex items-center gap-3 border-t border-[#E4E4E7] pt-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B5CF6]/10 text-[14px] font-bold text-[#8B5CF6]">
                {testimonial.author.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-[14px] font-bold text-[#0A0A0A]">
                    {testimonial.author}
                  </h4>
                  {testimonial.placeholder && (
                    <span className="rounded bg-[#F3F0FF] px-2 py-0.5 text-[10px] font-medium text-[#8B5CF6]">
                      Placeholder
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-[#71717A]">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
