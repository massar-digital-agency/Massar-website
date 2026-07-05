import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { stagger } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function Testimonials() {
  const { t } = useTranslation()
  const items = t('testimonials.items', { returnObjects: true }) as Array<{
    text: string
    author: string
    role: string
    company: string
    rating: number
    placeholder?: boolean
  }>

  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const next = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % items.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + items.length) % items.length)
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  }

  if (!items || items.length === 0) return null

  return (
    <Section className="bg-white border-y border-[#E4E4E7]">
      <Container>
        <SectionHeader
          label={t('testimonials.label')}
          title={t('testimonials.title')}
          subtitle={t('testimonials.subtitle')}
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto max-w-[700px]"
        >
          <div className="relative min-h-[280px] sm:min-h-[240px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-[#E4E4E7] bg-[#FAFAF9] p-8 sm:p-10"
              >
                <Quote className="mb-4 h-8 w-8 text-[#8B5CF6]/20" aria-hidden="true" />

                <div className="mb-5 flex items-center gap-1">
                  {Array.from({ length: items[current].rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                  ))}
                </div>

                <blockquote className="text-[15px] leading-[1.8] text-[#52525B] sm:text-[17px]">
                  &ldquo;{items[current].text}&rdquo;
                </blockquote>

                <div className="mt-6 flex items-center gap-3 border-t border-[#E4E4E7] pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B5CF6]/10 text-[14px] font-bold text-[#8B5CF6]">
                    {items[current].author.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-[14px] font-bold text-[#0A0A0A]">
                        {items[current].author}
                      </h4>
                      {items[current].placeholder && (
                        <span className="rounded bg-[#F3F0FF] px-2 py-0.5 text-[10px] font-medium text-[#8B5CF6]">
                          Placeholder
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] text-[#71717A]">
                      {items[current].role}, {items[current].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {items.length > 1 && (
            <div
              className="mt-6 flex items-center justify-center gap-3"
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
                if (e.key === 'ArrowRight') { e.preventDefault(); next() }
              }}
            >
              <button
                type="button"
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E4E7] bg-white text-[#71717A] transition-all duration-200 hover:border-[#8B5CF6] hover:text-[#8B5CF6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial indicators">
                {items.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                    className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 ${
                      i === current ? 'w-6 bg-[#8B5CF6]' : 'w-2 bg-[#D4D4D8]'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E4E7] bg-white text-[#71717A] transition-all duration-200 hover:border-[#8B5CF6] hover:text-[#8B5CF6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </motion.div>
      </Container>
    </Section>
  )
}
