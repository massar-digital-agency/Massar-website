import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from '@/lib/motion'
import { X, ChevronDown, ShieldCheck } from 'lucide-react'
import { useCookieConsent } from '@/hooks/useCookieConsent'

interface CookieBannerProps {
  consent: ReturnType<typeof useCookieConsent>
}

export function CookieBanner({ consent }: CookieBannerProps) {
  const { t } = useTranslation()
  const categories = [
    {
      id: 'essential' as const,
      label: t('cookieBanner.essentialLabel'),
      description: t('cookieBanner.essentialDesc'),
      alwaysOn: true,
    },
    {
      id: 'analytics' as const,
      label: t('cookieBanner.analyticsLabel'),
      description: t('cookieBanner.analyticsDesc'),
      alwaysOn: false,
    },
    {
      id: 'functional' as const,
      label: t('cookieBanner.functionalLabel'),
      description: t('cookieBanner.functionalDesc'),
      alwaysOn: false,
    },
    {
      id: 'marketing' as const,
      label: t('cookieBanner.marketingLabel'),
      description: t('cookieBanner.marketingDesc'),
      alwaysOn: false,
    },
  ]

  type CustomCategory = 'analytics' | 'functional' | 'marketing'

  const [customPrefs, setCustomPrefs] = useState<Record<CustomCategory, boolean>>({
    analytics: false,
    functional: false,
    marketing: false,
  })

  if (!consent.showBanner && !consent.showPreferences) {
    return null
  }

  const toggleCategory = (key: CustomCategory) => {
    setCustomPrefs((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSavePreferences = () => {
    consent.saveCustomPreferences(customPrefs)
  }

  const isMainBanner = consent.showBanner && !consent.showPreferences

  return (
    <AnimatePresence>
      {(consent.showBanner || consent.showPreferences) && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 inset-x-0 z-[100] p-4 sm:p-6"
          role="dialog"
          aria-modal={consent.showPreferences}
          aria-label={t('cookieBanner.title')}
        >
          <div className={`mx-auto max-w-[960px] rounded-2xl border border-[#E4E4E7] bg-white shadow-2xl ${
            consent.showPreferences ? 'shadow-black/10' : 'shadow-black/5'
          }`}>
            {/* Main Banner Content */}
            <div className="p-5 sm:p-6 lg:p-8">
              {isMainBanner ? (
                <>
                  <div className="flex items-start gap-3 mb-4">
                    <ShieldCheck className="h-6 w-6 text-[#8B5CF6] shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <h2 className="text-[15px] font-bold text-[#0A0A0A] sm:text-[16px]">
                        {t('cookieBanner.title')}
                      </h2>
                      <p className="mt-1.5 text-[13px] leading-[1.7] text-[#52525B] sm:text-[14px]">
                        {t('cookieBanner.description')}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={consent.dismissBanner}
                      className="h-8 w-8 flex items-center justify-center rounded-lg text-[#71717A] hover:text-[#0A0A0A] hover:bg-[#F4F4F5] shrink-0"
                      aria-label={t('cookieBanner.close')}
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-5">
                    <button
                      type="button"
                      onClick={consent.acceptAll}
                      className="inline-flex items-center justify-center h-10 px-5 text-[13px] font-medium rounded-lg bg-[#0A0A0A] text-white hover:bg-[#1A1A1A] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8B5CF6]"
                    >
                      {t('cookieBanner.acceptAll')}
                    </button>
                    <button
                      type="button"
                      onClick={consent.rejectNonEssential}
                      className="inline-flex items-center justify-center h-10 px-5 text-[13px] font-medium rounded-lg border border-[#E4E4E7] text-[#52525B] hover:border-[#A1A1AA] hover:text-[#0A0A0A] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8B5CF6]"
                    >
                      {t('cookieBanner.rejectAll')}
                    </button>
                    <button
                      type="button"
                      onClick={() => consent.setShowPreferences(true)}
                      className="inline-flex items-center justify-center gap-1.5 h-10 px-5 text-[13px] font-medium rounded-lg text-[#8B5CF6] hover:text-[#7C3AED] hover:bg-[#F3F0FF] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8B5CF6]"
                    >
                      {t('cookieBanner.managePrefs')}
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>

                  <p className="mt-3 text-[11px] leading-[1.6] text-[#A1A1AA]">
                    {t('cookieBanner.moreInfo')}{' '}
                    <a href="#/privacy" className="underline underline-offset-2 hover:text-[#71717A]">
                      {t('cookieBanner.privacyLink')}
                    </a>{' '}
                    <span aria-hidden="true">·</span>{' '}
                    <a href="#/cookies" className="underline underline-offset-2 hover:text-[#71717A]">
                      {t('cookieBanner.cookiesLink')}
                    </a>
                  </p>
                </>
              ) : null}

              {/* Preferences Panel */}
              {consent.showPreferences && (
                <div>
                  <h2 className="text-[16px] font-bold text-[#0A0A0A] mb-1">
                    {t('cookieBanner.prefsTitle')}
                  </h2>
                  <p className="text-[13px] text-[#52525B] mb-5">
                    {t('cookieBanner.prefsDesc')}
                  </p>

                  <div className="space-y-3">
                    {categories.map((cat) => (
                      <div
                        key={cat.id}
                        className="rounded-xl border border-[#E4E4E7] p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <span className="text-[13px] font-semibold text-[#0A0A0A]">
                              {cat.label}
                            </span>
                            {cat.alwaysOn && (
                              <span className="ml-2 inline-block text-[10px] font-medium text-[#71717A] bg-[#F4F4F5] px-2 py-0.5 rounded">
                                {t('cookieBanner.alwaysActive')}
                              </span>
                            )}
                          </div>
                          {cat.alwaysOn ? (
                            <span className="text-[11px] text-[#059669] font-medium shrink-0">
                              {t('cookieBanner.active')}
                            </span>
                          ) : (
                            <button
                              type="button"
                              role="switch"
                              aria-checked={customPrefs[cat.id as keyof typeof customPrefs]}
                              aria-label={`Toggle ${cat.label}`}
                              onClick={() => toggleCategory(cat.id as keyof typeof customPrefs)}
                              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8B5CF6] ${
                                customPrefs[cat.id as keyof typeof customPrefs] ? 'bg-[#8B5CF6]' : 'bg-[#D4D4D8]'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                                  customPrefs[cat.id as keyof typeof customPrefs] ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          )}
                        </div>
                        <p className="mt-1.5 text-[12px] leading-[1.6] text-[#71717A]">
                          {cat.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-[#E4E4E7]">
                    <button
                      type="button"
                      onClick={handleSavePreferences}
                      className="inline-flex items-center justify-center h-10 px-5 text-[13px] font-medium rounded-lg bg-[#0A0A0A] text-white hover:bg-[#1A1A1A] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8B5CF6]"
                    >
                      {t('cookieBanner.savePrefs')}
                    </button>
                    <button
                      type="button"
                      onClick={consent.acceptAll}
                      className="inline-flex items-center justify-center h-10 px-5 text-[13px] font-medium rounded-lg border border-[#E4E4E7] text-[#52525B] hover:border-[#A1A1AA] hover:text-[#0A0A0A] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8B5CF6]"
                    >
                      {t('cookieBanner.acceptAll')}
                    </button>
                    <button
                      type="button"
                      onClick={consent.rejectNonEssential}
                      className="inline-flex items-center justify-center h-10 px-5 text-[13px] font-medium rounded-lg text-[#71717A] hover:text-[#52525B] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8B5CF6]"
                    >
                      {t('cookieBanner.rejectAll')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
