export type ConsentStatus = 'granted' | 'denied'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

type ConsentParams = Record<string, string>

interface AnalyticsConfig {
  gaMeasurementId?: string
  gtmId?: string
}

let consent: ConsentStatus = 'denied'
let config: AnalyticsConfig = {}
let isInitialized = false

const CONSENT_KEY = 'analytics_consent'
const DEBUG = import.meta.env.DEV
const STORAGE_KEY = 'analytics_storage'

function debug(...args: unknown[]): void {
  if (DEBUG) console.log('[Analytics]', ...args)
}

function consentParams(): ConsentParams {
  if (consent === 'granted') {
    return {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
      functionality_storage: 'granted',
      personalization_storage: 'granted',
      security_storage: 'granted',
    }
  }
  return {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    personalization_storage: 'denied',
    security_storage: 'granted',
  }
}

function pushEvent(eventName: string, params?: Record<string, string | number | boolean | undefined>): void {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: eventName,
    ...params,
  })
  debug('pushEvent:', eventName, params)
}

function loadGA4(id: string): void {
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${id}"]`)) return

  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  script.async = true
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = (...args: unknown[]) => window.dataLayer.push(args)
  window.gtag('js', new Date())
  window.gtag('config', id, consentParams())
  localStorage.setItem(STORAGE_KEY, id)
}

function loadGTM(id: string): void {
  if (document.querySelector(`script[src*="googletagmanager.com/gtm.js?id=${id}"]`)) return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'gtm.js',
    'gtm.start': new Date().getTime(),
  })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`
  document.head.appendChild(script)

  const noscript = document.createElement('noscript')
  const iframe = document.createElement('iframe')
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${id}`
  iframe.height = '0'
  iframe.width = '0'
  iframe.style.display = 'none'
  iframe.style.visibility = 'hidden'
  noscript.appendChild(iframe)
  document.body.insertBefore(noscript, document.body.firstChild)

  localStorage.setItem(STORAGE_KEY, id)
}

export function initAnalytics(cfg: AnalyticsConfig): void {
  config = cfg

  const stored = localStorage.getItem(CONSENT_KEY) as ConsentStatus | null
  if (stored === 'granted' || stored === 'denied') {
    consent = stored
  }

  if (cfg.gtmId) {
    loadGTM(cfg.gtmId)
  } else if (cfg.gaMeasurementId) {
    loadGA4(cfg.gaMeasurementId)
  }

  isInitialized = true
  debug('initialized', cfg, { consent })
}

export function trackPageView(page: string, title?: string): void {
  if (!isInitialized) return
  pushEvent('page_view', {
    page_title: title || page,
    page_location: window.location.href,
    page_path: page,
  })
  debug('page_view:', page)
}

export function trackEvent(eventName: string, params?: Record<string, string | number | boolean | undefined>): void {
  if (!isInitialized) return
  pushEvent(eventName, params)
}

export function updateConsent(status: ConsentStatus): void {
  consent = status
  localStorage.setItem(CONSENT_KEY, status)

  if (window.gtag) {
    window.gtag('consent', 'update', consentParams())
  }

  pushEvent('consent_update', { consent_status: status })

  if (status === 'granted' && config.gaMeasurementId) {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored && !config.gtmId) {
      loadGA4(config.gaMeasurementId)
    }
  }

  debug('consent:', status)
}

export function getConsent(): ConsentStatus {
  return consent
}
