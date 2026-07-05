'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote, Pause, Play } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { trackEvent } from '@/lib/analytics'

const AUTOPLAY_INTERVAL = 6000

export function TestimonialsCarousel() {
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
  const [isPaused, setIsPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const liveRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const shouldAutoPlay = !isPaused && !isHovered && !isFocused

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % items.length)
    trackEvent('testimonial_nav', { action: 'next', index: current })
  }, [items.length, current])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + items.length) % items.length)
    trackEvent('testimonial_nav', { action: 'prev', index: current })
  }, [items.length, current])

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
    trackEvent('testimonial_nav', { action: 'dot', index })
  }

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (shouldAutoPlay && items.length > 1) {
      intervalRef.current = setInterval(next, reducedMotion ? AUTOPLAY_INTERVAL * 2 : AUTOPLAY_INTERVAL)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [shouldAutoPlay, next, items.length, reducedMotion])

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? (reducedMotion ? 0 : 200) : reducedMotion ? 0 : -200,
      opacity: reducedMotion ? 1 : 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? (reducedMotion ? 0 : -200) : reducedMotion ? 0 : 200,
      opacity: reducedMotion ? 1 : 0,
    }),
  }

  if (!items || items.length === 0) return null

  return (
    <Section
      className="bg-white border-y border-[#E4E4E7]"
      id="testimonials-carousel"
    >
      <Container>
        <SectionHeader
          label={t('testimonials.label')}
          title={t('testimonials.title')}
          subtitle={t('testimonials.subtitle')}
        />

        <div
          ref={containerRef}
          className="mx-auto max-w-[700px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          role="region"
          aria-label={t('testimonials.title')}
          aria-roledescription="carousel"
          tabIndex={-1}
        >
          <div className="relative min-h-[300px] sm:min-h-[260px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={reducedMotion ? { duration: 0 } : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-[#E4E4E7] bg-[#FAFAF9] p-8 sm:p-10"
                role="group"
                aria-roledescription="slide"
                aria-label={`${t('blog.index.testimonial')} ${current + 1} ${t('blog.index.of')} ${items.length}`}
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
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B5CF6]/10 text-[14px] font-bold text-[#8B5CF6]"
                    aria-hidden="true"
                  >
                    {items[current].author.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-[14px] font-bold text-[#0A0A0A]">
                        {items[current].author}
                      </h3>
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

          <div
            className="mt-6 flex items-center justify-center gap-3"
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
              if (e.key === 'ArrowRight') { e.preventDefault(); next() }
              if (e.key === 'Home') { e.preventDefault(); goTo(0) }
              if (e.key === 'End') { e.preventDefault(); goTo(items.length - 1) }
            }}
          >
            <button
              type="button"
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E4E7] bg-white text-[#71717A] transition-all duration-200 hover:border-[#8B5CF6] hover:text-[#8B5CF6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2"
              aria-label={t('blog.index.previous')}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label={t('blog.index.testimonialIndicators')}>
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`${t('blog.index.goToTestimonial')} ${i + 1}`}
                  onClick={() => goTo(i)}
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
              aria-label={t('blog.index.next')}
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPaused((p) => !p)
                trackEvent('testimonial_autoplay_toggle', { paused: String(!isPaused) })
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E4E4E7] bg-white text-[#71717A] transition-all duration-200 hover:border-[#8B5CF6] hover:text-[#8B5CF6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2"
              aria-label={isPaused ? t('blog.index.resumeAutoplay') : t('blog.index.pauseAutoplay')}
            >
              {isPaused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
            </button>
          </div>

          <div
            ref={liveRef}
            className="sr-only"
            aria-live="polite"
            aria-atomic="true"
          >
            {t('blog.index.showingTestimonial')} {current + 1} {t('blog.index.of')} {items.length}. {items[current].text}
          </div>
        </div>
      </Container>
    </Section>
  )
}
