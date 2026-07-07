import { motion } from '@/lib/motion'
import { fadeUp } from '@/hooks/useAnimationVariants'

interface SectionHeaderProps {
  label?: string
  title: string
  subtitle?: string
  align?: 'center' | 'start'
}

export function SectionHeader({ label, title, subtitle, align = 'center' }: SectionHeaderProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-start'

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={`mb-12 sm:mb-16 max-w-[560px] ${alignment}`}
    >
      {label && (
        <span className="mb-4 inline-block text-[12px] font-semibold tracking-[0.12em] text-[#8B5CF6] uppercase">
          {label}
        </span>
      )}
      <h2 className="text-[22px] font-bold leading-[1.25] tracking-[-0.015em] text-[#0A0A0A] sm:text-[26px] lg:text-[32px]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[14px] leading-[1.8] text-[#71717A] sm:text-[16px]">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
