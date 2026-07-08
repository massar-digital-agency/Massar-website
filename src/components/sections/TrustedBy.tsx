import { useTranslation } from 'react-i18next'
import { motion } from '@/lib/motion'
import type { Variants } from '@/lib/motion'
import { Container } from '@/components/ui/Container'

const logoKeys = ['journeya', 'wafr', 'darlink', 'nestcode', 'datasphere'] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

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
                className="flex h-12 items-center rounded-lg px-5"
              >
                <span className="text-[16px] font-bold tracking-tight text-[#A1A1AA] transition-colors duration-200 hover:text-[#8B5CF6]">
                  {logo.name}
                </span>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}
