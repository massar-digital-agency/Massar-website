import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

export function MobileStickyCTA() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 bottom-0 z-30 sm:hidden"
    >
      <div
        className="flex items-center justify-center border-t border-[#E4E4E7] bg-[#F8F7F4]/95 backdrop-blur-xl px-4"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <a
          href="#contact"
          onClick={() => trackEvent('cta_click', { cta_location: 'mobile_sticky', cta_text: t('mobileStickyCta.label') })}
          className="flex w-full items-center justify-center gap-2.5 my-3 h-12 min-h-[44px] rounded-xl bg-[#8B5CF6] text-white text-[15px] font-semibold shadow-lg transition-all duration-200 hover:bg-[#7C3AED] active:bg-[#6D28D9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2"
          aria-label={t('mobileStickyCta.label')}
        >
          <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
          {t('mobileStickyCta.label')}
        </a>
      </div>
    </motion.div>
  )
}
