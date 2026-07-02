import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { fadeUp } from '@/hooks/useAnimationVariants'

interface LegalLayoutProps {
  title: string
  subtitle?: string
  children: ReactNode
  lastUpdated?: string
}

export function LegalLayout({ title, subtitle, children, lastUpdated }: LegalLayoutProps) {
  return (
    <main className="pt-[72px]">
      <article className="py-16 sm:py-20 lg:py-28">
        <Container narrow>
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <h1 className="text-[30px] font-bold leading-[1.15] tracking-[-0.02em] text-[#0A0A0A] sm:text-[40px] lg:text-[48px] mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[15px] leading-[1.75] text-[#52525B] sm:text-[17px] max-w-[640px]">
                {subtitle}
              </p>
            )}
            {lastUpdated && (
              <p className="mt-3 text-[13px] text-[#A1A1AA]">
                {lastUpdated}
              </p>
            )}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <hr className="my-10 border-[#E4E4E7]" />
            <div className="prose-custom">{children}</div>
          </motion.div>
        </Container>
      </article>
    </main>
  )
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-10 last:mb-0">
      <h2 className="text-[18px] font-bold leading-[1.3] text-[#0A0A0A] sm:text-[20px] mb-4">
        {title}
      </h2>
      {children}
    </section>
  )
}

export function LegalSubsection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-6 last:mb-0">
      <h3 className="text-[15px] font-semibold leading-[1.4] text-[#0A0A0A] mb-2">
        {title}
      </h3>
      {children}
    </div>
  )
}

export function LegalParagraph({ children }: { children: ReactNode }) {
  return (
    <p className="text-[14px] leading-[1.8] text-[#52525B] sm:text-[15px] mb-4 last:mb-0">
      {children}
    </p>
  )
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mb-4 last:mb-0 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[14px] leading-[1.7] text-[#52525B] sm:text-[15px]">
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#8B5CF6]" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function LegalNotice({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-[#E4E4E7] bg-[#FAFAF9] p-5 sm:p-6 mb-6 last:mb-0">
      <p className="text-[13px] leading-[1.7] text-[#71717A]">
        {children}
      </p>
    </div>
  )
}
