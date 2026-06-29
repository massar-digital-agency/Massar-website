import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { fadeUp } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'

export function TrustedBy() {
  const { t } = useTranslation()

  return (
    <section className="py-10 sm:py-14">
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-6"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#E4E4E7]" />
          <p className="text-[13px] font-medium tracking-[0.08em] text-[#A1A1AA] uppercase whitespace-nowrap">
            {t('trusted.title')}
          </p>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#E4E4E7]" />
        </motion.div>
      </Container>
    </section>
  )
}
