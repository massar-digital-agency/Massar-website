import { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from '@/lib/motion'
import { fadeUp, stagger } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import metricsData from '@/content/social-proof.json'

interface Metric {
  id: string
  value: number
  suffix: string
  labelKey: string
  descriptionKey: string
}

interface SocialProofProps {
  className?: string
}

function AnimatedCounter({ value, suffix, reducedMotion }: { value: number; suffix: string; reducedMotion: boolean }) {
  const [count, setCount] = useState(reducedMotion ? value : 0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (hasAnimated) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          if (reducedMotion) {
            setCount(value)
            return
          }
          const duration = 1500
          const start = performance.now()
          const animate = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * value))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, reducedMotion, hasAnimated])

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="block text-[32px] font-extrabold leading-none tracking-[-0.02em] text-[#8B5CF6] sm:text-[38px]"
    >
      {count}
      {suffix}
    </span>
  )
}

export function SocialProof({ className = '' }: SocialProofProps) {
  const { t } = useTranslation()
  const reducedMotion = useReducedMotion()
  const metrics = metricsData.metrics as Metric[]

  const sectionHeader = t('socialProof.header', { returnObjects: true }) as {
    label?: string
    title?: string
    subtitle?: string
  } | null

  return (
    <Section className={`bg-[#F8F7F4] ${className}`.trim()}>
      <Container>
        {sectionHeader?.label && (
          <SectionHeader
            label={sectionHeader.label}
            title={sectionHeader.title || ''}
            subtitle={sectionHeader.subtitle}
          />
        )}

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6"
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric.id}
              variants={fadeUp}
              className="relative rounded-2xl border border-[#E4E4E7] bg-white p-7 sm:p-8 text-center"
            >
              <AnimatedCounter value={metric.value} suffix={metric.suffix} reducedMotion={!!reducedMotion} />
              <span className="sr-only">
                {metric.value}{metric.suffix} {t(metric.labelKey)}
              </span>
              <h3 className="mt-3 text-[14px] font-bold text-[#0A0A0A] sm:text-[15px]">
                {t(metric.labelKey)}
              </h3>
              <p className="mt-1.5 text-[13px] leading-[1.6] text-[#71717A]">
                {t(metric.descriptionKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  )
}
