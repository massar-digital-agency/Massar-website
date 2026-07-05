import { useState, useCallback, useEffect } from 'react'
import { updateConsent } from '@/lib/analytics'

type ConsentCategory = 'essential' | 'analytics' | 'marketing' | 'functional'

interface ConsentPreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

const STORAGE_KEY = 'massar_cookie_consent'

const defaultPreferences: ConsentPreferences = {
  essential: true,
  analytics: false,
  marketing: false,
  functional: false,
}

function loadPreferences(): ConsentPreferences | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null
    return JSON.parse(stored) as ConsentPreferences
  } catch {
    return null
  }
}

function savePreferences(prefs: ConsentPreferences) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
}

export function useCookieConsent() {
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(
    () => loadPreferences(),
  )
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('analytics_consent')
    const loaded = loadPreferences()
    if (stored === 'granted' || stored === 'denied') {
      setShowBanner(false)
      if (!loaded) {
        const prefs: ConsentPreferences = {
          essential: true,
          analytics: stored === 'granted',
          marketing: stored === 'granted',
          functional: stored === 'granted',
        }
        savePreferences(prefs)
        setPreferences(prefs)
      }
    } else if (!loaded) {
      const timer = setTimeout(() => setShowBanner(true), 800)
      return () => clearTimeout(timer)
    } else {
      setShowBanner(false)
    }
  }, [])

  const acceptAll = useCallback(() => {
    updateConsent('granted')
    const all: ConsentPreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    savePreferences(all)
    setPreferences(all)
    setShowBanner(false)
    setShowPreferences(false)
  }, [])

  const rejectNonEssential = useCallback(() => {
    updateConsent('denied')
    savePreferences(defaultPreferences)
    setPreferences(defaultPreferences)
    setShowBanner(false)
    setShowPreferences(false)
  }, [])

  const saveCustomPreferences = useCallback(
    (custom: Omit<ConsentPreferences, 'essential'>) => {
      const prefs: ConsentPreferences = {
        essential: true,
        ...custom,
      }
      updateConsent(prefs.analytics ? 'granted' : 'denied')
      savePreferences(prefs)
      setPreferences(prefs)
      setShowBanner(false)
      setShowPreferences(false)
    },
    [],
  )

  const isCategoryAllowed = useCallback(
    (category: ConsentCategory): boolean => {
      if (!preferences) return false
      return preferences[category]
    },
    [preferences],
  )

  const openPreferences = useCallback(() => {
    setShowPreferences(true)
  }, [])

  const dismissBanner = useCallback(() => {
    setShowBanner(false)
  }, [])

  return {
    preferences,
    showBanner,
    showPreferences,
    acceptAll,
    rejectNonEssential,
    saveCustomPreferences,
    isCategoryAllowed,
    openPreferences,
    setShowPreferences,
    dismissBanner,
  }
}
