import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Cookie, X } from 'lucide-react'
import { updateConsent } from '@/lib/analytics'
import type { ConsentStatus } from '@/lib/analytics'

const CONSENT_KEY = 'analytics_consent'

export function CookieConsent() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentStatus | null
    if (stored !== 'granted' && stored !== 'denied') {
      const timer = setTimeout(() => setVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    updateConsent('granted')
    setVisible(false)
  }

  const handleReject = () => {
    updateConsent('denied')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 inset-x-0 z-[60] p-4 sm:p-6"
        >
          <div className="mx-auto max-w-3xl rounded-2xl border border-[#E4E4E7] bg-white/95 backdrop-blur-xl shadow-xl shadow-black/5 p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3F0FF] text-[#8B5CF6]">
                <Cookie className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[15px] font-semibold text-[#0A0A0A]">
                    {t('cookie.title', '🍪 We value your privacy')}
                  </h3>
                  <button
                    type="button"
                    onClick={handleReject}
                    className="h-8 w-8 flex items-center justify-center rounded-lg text-[#A1A1AA] hover:text-[#52525B] hover:bg-[#F4F4F5] transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <p className="mt-1.5 text-[13px] leading-[1.7] text-[#71717A] max-w-[500px]">
                  {t('cookie.description', 'We use cookies and similar technologies to improve your browsing experience, analyze traffic, and understand how you use our site. You can choose to accept or reject non-essential cookies.')}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleAccept}
                    className="h-10 px-5 rounded-xl bg-[#0A0A0A] text-white text-[13px] font-medium hover:bg-[#1A1A1A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2"
                  >
                    {t('cookie.accept', 'Accept All')}
                  </button>
                  <button
                    type="button"
                    onClick={handleReject}
                    className="h-10 px-5 rounded-xl border border-[#E4E4E7] text-[#52525B] text-[13px] font-medium hover:bg-[#F4F4F5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2"
                  >
                    {t('cookie.reject', 'Reject All')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
