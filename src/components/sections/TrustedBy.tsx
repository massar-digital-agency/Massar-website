import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { stagger, fadeUp } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { Building2 } from 'lucide-react'

const logoKeys = ['placeholder1', 'placeholder2', 'placeholder3', 'placeholder4', 'placeholder5', 'placeholder6'] as const

export function TrustedBy() {
  const { t } = useTranslation()

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <p className="text-[12px] font-semibold tracking-[0.12em] text-[#A1A1AA] uppercase">
            {t('trusted.title')}
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
        >
          {logoKeys.map((key) => {
            const logo = t(`trusted.logos.${key}`, { returnObjects: true }) as { name: string; alt: string } | undefined
            if (!logo) return null

            return (
              <motion.div
                key={key}
                variants={fadeUp}
                className="group relative flex h-14 items-center gap-3 rounded-xl border border-[#E4E4E7] bg-white px-5 transition-all duration-200 hover:border-[#D4D4D8] hover:shadow-sm"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F3F0FF] text-[#8B5CF6]">
                  <Building2 className="h-4 w-4" aria-hidden="true" />
                </div>
                <span className="text-[14px] font-semibold text-[#A1A1AA]">
                  {logo.name}
                </span>
                <span className="absolute -top-2 -end-2 rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-medium text-amber-700">
                  TODO
                </span>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}
