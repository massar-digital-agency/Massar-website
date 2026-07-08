import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from '@/lib/motion'
import { ArrowRight } from 'lucide-react'
import { fadeUp } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'

const stepKeys = ['discover', 'plan', 'design', 'develop', 'launch', 'support'] as const

function Node({
  index,
  active,
  onEnter,
  onLeave,
}: {
  index: number
  active: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  const { t } = useTranslation()
  const key = stepKeys[index]

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      tabIndex={0}
      aria-current={active ? 'step' : undefined}
      className="flex flex-col items-center text-center lg:w-[150px] lg:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:rounded-xl"
    >
      <motion.div
        animate={{
          backgroundColor: active ? '#8B5CF6' : '#FFFFFF',
          color: active ? '#FFFFFF' : '#8B5CF6',
          scale: active ? 1.12 : 1,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E4E4E7] text-[15px] font-bold"
      >
        {String(index + 1).padStart(2, '0')}
      </motion.div>
      <h3 className="mt-4 text-[15px] font-semibold text-[#0A0A0A]">
        {t(`process.steps.${key}.title`)}
      </h3>
      <p className="mt-1.5 text-[13px] leading-[1.7] text-[#71717A]">
        {t(`process.steps.${key}.description`)}
      </p>
    </div>
  )
}

function HorizontalConnector({ active }: { active: boolean }) {
  return (
    <div className="relative mt-6 h-px flex-1 self-start bg-[#E4E4E7]">
      <motion.div
        initial={false}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'left' }}
        className="absolute inset-0 bg-[#8B5CF6] rtl:[transform-origin:right]"
      />
    </div>
  )
}

function VerticalConnector({ active }: { active: boolean }) {
  return (
    <div className="relative ms-6 h-8 w-px bg-[#E4E4E7]">
      <motion.div
        initial={false}
        animate={{ scaleY: active ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'top' }}
        className="absolute inset-0 bg-[#8B5CF6]"
      />
    </div>
  )
}

export function Process({ hideHeader = false, ctaHref }: { hideHeader?: boolean; ctaHref?: string }) {
  const { t } = useTranslation()
  const [hovered, setHovered] = useState<number | null>(null)

  const isLinkActive = (segmentIndex: number) =>
    hovered === segmentIndex || hovered === segmentIndex + 1

  return (
    <Section id="process">
      <Container>
        {!hideHeader && (
          <SectionHeader
            label={t('process.label')}
            title={t('process.title')}
          />
        )}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="hidden lg:flex lg:items-start"
        >
          {stepKeys.map((key, i) => (
            <Fragment key={key}>
              <Node
                index={i}
                active={hovered === i}
                onEnter={() => setHovered(i)}
                onLeave={() => setHovered(null)}
              />
              {i < stepKeys.length - 1 && <HorizontalConnector active={isLinkActive(i)} />}
            </Fragment>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col lg:hidden"
        >
          {stepKeys.map((key, i) => (
            <Fragment key={key}>
              <div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
                aria-current={hovered === i ? 'step' : undefined}
                className="flex items-start gap-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:rounded-xl"
              >
                <motion.div
                  animate={{
                    backgroundColor: hovered === i ? '#8B5CF6' : '#FFFFFF',
                    color: hovered === i ? '#FFFFFF' : '#8B5CF6',
                  }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E4E4E7] text-[15px] font-bold"
                >
                  {String(i + 1).padStart(2, '0')}
                </motion.div>
                <div className="pt-2.5">
                  <h3 className="text-[15px] font-semibold text-[#0A0A0A]">
                    {t(`process.steps.${key}.title`)}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-[1.7] text-[#71717A]">
                    {t(`process.steps.${key}.description`)}
                  </p>
                </div>
              </div>
              {i < stepKeys.length - 1 && <VerticalConnector active={isLinkActive(i)} />}
            </Fragment>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 sm:mt-20 text-center"
        >
          <p className="text-[14px] leading-[1.7] text-[#71717A] mb-5 sm:text-[15px]">
            {t('process.ctaMicro')}
          </p>
          <Button size="lg" href={ctaHref ?? '#contact'}>
            {t('process.cta')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </motion.div>
      </Container>
    </Section>
  )
}
