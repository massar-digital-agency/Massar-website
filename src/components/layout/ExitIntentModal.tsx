'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from '@/lib/motion'
import { X, AlertCircle, CheckCircle2, ArrowRight, Mail, Phone } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

interface ExitIntentModalProps {
  show: boolean
  onDismiss: () => void
}

interface FormErrors {
  email?: string
  phone?: string
}

function validateEmail(value: string): string | undefined {
  if (!value.trim()) return
  if (!/\S+@\S+\.\S+/.test(value)) return 'exitIntentModal.errors.emailInvalid'
}

function validatePhone(value: string): string | undefined {
  if (!value.trim()) return
  const digits = value.replace(/[\s\-()]/g, '')
  if (digits.length < 7 || digits.length > 15) return 'exitIntentModal.errors.phoneInvalid'
}

export function ExitIntentModal({ show, onDismiss }: ExitIntentModalProps) {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<{ email?: boolean; phone?: boolean }>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [trackedShown, setTrackedShown] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const firstFocusableRef = useRef<HTMLInputElement>(null)

  const dialogId = 'exit-intent-dialog'
  const titleId = 'exit-intent-title'
  const descId = 'exit-intent-desc'

  useEffect(() => {
    if (show && !trackedShown) {
      setTrackedShown(true)
      trackEvent('exit_intent_modal_shown', {})
    }
  }, [show, trackedShown])

  useEffect(() => {
    if (!show) return
    const timer = setTimeout(() => {
      firstFocusableRef.current?.focus()
    }, 100)
    return () => clearTimeout(timer)
  }, [show])

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [show])

  const trapFocus = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onDismiss()
      trackEvent('exit_intent_modal_dismissed', { method: 'escape' })
      return
    }
    if (e.key !== 'Tab') return
    const modal = modalRef.current
    if (!modal) return
    const focusable = modal.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }, [onDismiss])

  useEffect(() => {
    if (!show) return
    document.addEventListener('keydown', trapFocus)
    return () => document.removeEventListener('keydown', trapFocus)
  }, [show, trapFocus])

  const handleClose = () => {
    onDismiss()
    trackEvent('exit_intent_modal_dismissed', { method: 'close_button' })
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onDismiss()
      trackEvent('exit_intent_modal_dismissed', { method: 'backdrop' })
    }
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    trackEvent('exit_intent_modal_form_started', { field: 'email' })
    if (touched.email) {
      const error = validateEmail(value)
      setErrors((prev) => {
        const next = { ...prev }
        if (error) next.email = error
        else delete next.email
        return next
      })
    }
  }

  const handlePhoneChange = (value: string) => {
    setPhone(value)
    trackEvent('exit_intent_modal_form_started', { field: 'phone' })
    if (touched.phone) {
      const error = validatePhone(value)
      setErrors((prev) => {
        const next = { ...prev }
        if (error) next.phone = error
        else delete next.phone
        return next
      })
    }
  }

  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }))
    const error = validateEmail(email)
    setErrors((prev) => {
      const next = { ...prev }
      if (error) next.email = error
      else delete next.email
      return next
    })
  }

  const handlePhoneBlur = () => {
    setTouched((prev) => ({ ...prev, phone: true }))
    const error = validatePhone(phone)
    setErrors((prev) => {
      const next = { ...prev }
      if (error) next.phone = error
      else delete next.phone
      return next
    })
  }

  const validate = (): boolean => {
    const emailError = validateEmail(email)
    const phoneError = validatePhone(phone)
    const newErrors: FormErrors = {}
    if (emailError) newErrors.email = emailError
    if (phoneError) newErrors.phone = phoneError
    setErrors(newErrors)
    setTouched({ email: true, phone: true })
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    trackEvent('exit_intent_modal_submitted', {})
    if (!validate()) {
      trackEvent('exit_intent_modal_validation_error', { error_count: Object.keys(errors).length })
      return
    }
    trackEvent('exit_intent_modal_cta_clicked', { email_provided: !!email, phone_provided: !!phone })
    setStatus('loading')
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStatus('success')
      trackEvent('exit_intent_modal_success', {})
      setTimeout(() => onDismiss(), 2500)
    } catch {
      setStatus('error')
      trackEvent('exit_intent_modal_error', {})
    }
  }

  const inputBaseClass = 'w-full h-11 px-4 text-[14px] rounded-lg border bg-[#FAFAF9] transition-all duration-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8B5CF6]/20'
  const getInputClass = (field: keyof FormErrors) => {
    if (errors[field]) return `${inputBaseClass} border-red-500 focus:border-red-500`
    return `${inputBaseClass} border-[#E4E4E7] focus:border-[#8B5CF6]`
  }

  const getErrorId = (field: keyof FormErrors) => `${dialogId}-error-${field}`

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/40 p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
          role="presentation"
        >
          <motion.div
            ref={modalRef}
            id={dialogId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[480px] overflow-hidden rounded-2xl border border-[#E4E4E7] bg-white shadow-2xl"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleClose}
              className="absolute top-4 end-4 z-10 flex h-8 w-8 items-center justify-center rounded-xl text-[#71717A] transition-colors hover:bg-[#F4F4F5] hover:text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2"
              aria-label={t('exitIntentModal.close')}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="p-6 sm:p-8">
              {status === 'success' ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-4" aria-hidden="true" />
                  <h3 className="text-[18px] font-bold text-[#0A0A0A]">
                    {t('exitIntentModal.successTitle')}
                  </h3>
                  <p className="mt-2 text-[14px] text-[#52525B]">
                    {t('exitIntentModal.successDesc')}
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 id={titleId} className="text-[22px] font-bold leading-[1.25] tracking-[-0.02em] text-[#0A0A0A] sm:text-[26px]">
                      {t('exitIntentModal.title')}
                    </h2>
                    <p id={descId} className="mt-2 text-[14px] leading-[1.6] text-[#52525B]">
                      {t('exitIntentModal.subtitle')}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div>
                      <label htmlFor="exit-email" className="block text-[13px] font-semibold text-[#0A0A0A] mb-2">
                        {t('exitIntentModal.emailLabel')}
                      </label>
                      <div className="relative">
                        <Mail className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A1A1AA]" aria-hidden="true" />
                        <input
                          ref={firstFocusableRef}
                          type="email"
                          id="exit-email"
                          autoComplete="email"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? getErrorId('email') : undefined}
                          value={email}
                          onChange={(e) => handleEmailChange(e.target.value)}
                          onBlur={handleEmailBlur}
                          className={`${getInputClass('email')} ps-10`}
                          placeholder="you@company.com"
                        />
                      </div>
                      {errors.email && (
                        <span id={getErrorId('email')} className="mt-1.5 flex items-center gap-1.5 text-[12px] text-red-500" role="alert">
                          <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                          {t(errors.email)}
                        </span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="exit-phone" className="block text-[13px] font-semibold text-[#0A0A0A] mb-2">
                        {t('exitIntentModal.phoneLabel')}
                      </label>
                      <div className="relative">
                        <Phone className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A1A1AA]" aria-hidden="true" />
                        <input
                          type="tel"
                          id="exit-phone"
                          autoComplete="tel"
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? getErrorId('phone') : undefined}
                          value={phone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          onBlur={handlePhoneBlur}
                          className={`${getInputClass('phone')} ps-10`}
                          placeholder="+213 699 284 128"
                        />
                      </div>
                      {errors.phone && (
                        <span id={getErrorId('phone')} className="mt-1.5 flex items-center gap-1.5 text-[12px] text-red-500" role="alert">
                          <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                          {t(errors.phone)}
                        </span>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="inline-flex w-full items-center justify-center gap-2 h-12 px-7 text-[15px] font-medium rounded-xl bg-[#0A0A0A] text-white hover:bg-[#1A1A1A] active:bg-[#2A2A2A] shadow-sm transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8B5CF6] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                        {status === 'loading' ? t('exitIntentModal.submitting') : t('exitIntentModal.cta')}
                        {status !== 'loading' && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                      </button>
                    </div>

                    <p className="text-center text-[12px] text-[#A1A1AA]">
                      {t('exitIntentModal.micro')}
                    </p>
                  </form>

                  {status === 'error' && (
                    <div role="alert" aria-live="assertive" className="mt-4 flex items-start gap-3 rounded-lg bg-red-50 border border-red-200 p-4">
                      <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <h4 className="text-[14px] font-bold text-red-900">{t('exitIntentModal.errorTitle')}</h4>
                        <p className="text-[13px] text-red-700 mt-1">{t('exitIntentModal.errorDesc')}</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
