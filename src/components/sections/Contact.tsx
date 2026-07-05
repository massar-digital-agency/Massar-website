import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Calendar, CheckCircle2, AlertCircle, Copy, Check, Star, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { fadeUp, stagger } from '@/hooks/useAnimationVariants'
import { trackEvent } from '@/lib/analytics'

interface FormState {
  name: string
  email: string
  company: string
  website: string
  service: string
  budget: string
  description: string
}

const initialFormState: FormState = {
  name: '',
  email: '',
  company: '',
  website: '',
  service: '',
  budget: '',
  description: '',
}

export function Contact() {
  const { t } = useTranslation()

  const [form, setForm] = useState<FormState>(initialFormState)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)
  const formStarted = useRef(false)

  const trackFormStarted = () => {
    if (!formStarted.current) {
      formStarted.current = true
      trackEvent('form_started', { form_name: 'contact' })
    }
  }

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text)
    if (type === 'email') {
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } else {
      setCopiedPhone(true)
      setTimeout(() => setCopiedPhone(false), 2000)
    }
    trackEvent('copy_to_clipboard', { field: type })
  }

  const validateField = (field: keyof FormState, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return t('contact.form.errors.name')
        return undefined
      case 'email':
        if (!value.trim()) return t('contact.form.errors.email')
        if (!/\S+@\S+\.\S+/.test(value)) return t('contact.form.errors.emailInvalid')
        return undefined
      case 'service':
        if (!value) return t('contact.form.errors.service')
        return undefined
      case 'description':
        if (!value.trim()) return t('contact.form.errors.description')
        return undefined
      default:
        return undefined
    }
  }

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const error = validateField(field, form[field])
    setErrors((prev) => {
      const next = { ...prev }
      if (error) {
        next[field] = error
      } else {
        delete next[field]
      }
      return next
    })
  }

  const handleChange = (field: keyof FormState, value: string) => {
    trackFormStarted()
    setForm((prev) => ({ ...prev, [field]: value }))
    if (touched[field]) {
      const error = validateField(field, value)
      setErrors((prev) => {
        const next = { ...prev }
        if (error) {
          next[field] = error
        } else {
          delete next[field]
        }
        return next
      })
    }
  }

  const validate = () => {
    const requiredFields: (keyof FormState)[] = ['name', 'email', 'service', 'description']
    const allTouched = requiredFields.reduce((acc, field) => ({ ...acc, [field]: true }), {} as Partial<Record<keyof FormState, boolean>>)
    setTouched((prev) => ({ ...prev, ...allTouched }))

    const tempErrors: Partial<FormState> = {}
    requiredFields.forEach((field) => {
      const error = validateField(field, form[field])
      if (error) tempErrors[field] = error
    })

    setErrors(tempErrors)
    const hasErrors = Object.keys(tempErrors).length > 0
    if (hasErrors) {
      trackEvent('form_validation_error', { form_name: 'contact', error_count: Object.keys(tempErrors).length })
    }
    return !hasErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    trackEvent('form_submit_attempt', { form_name: 'contact' })
    if (!validate()) return

    setStatus('loading')

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStatus('success')
      setForm(initialFormState)
      trackEvent('generate_lead', { lead_type: 'contact_form', lead_source: 'organic' })
      trackEvent('form_submit_success', { form_name: 'contact' })
    } catch {
      setStatus('error')
      trackEvent('form_submit_error', { form_name: 'contact' })
    }
  }

  const servicesList = ['web', 'apps', 'branding', 'uiux', 'automation', 'ai'] as const
  const budgetList = ['under_5k', '5k_10k', '10k_25k', 'above_25k'] as const

  const getInputClassName = (field: keyof FormState) => {
    const base = 'w-full h-11 px-4 text-[14px] rounded-lg border bg-[#FAFAF9] transition-all duration-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8B5CF6]/20'
    if (errors[field]) {
      return `${base} border-red-500 focus:border-red-500`
    }
    return `${base} border-[#E4E4E7] focus:border-[#8B5CF6]`
  }

  const getErrorId = (field: keyof FormState) => `error-${field}`

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute top-1/4 start-1/4 -z-10 h-72 w-72 rounded-full bg-[#8B5CF6]/5 blur-[80px]" />
      <div className="absolute bottom-1/4 end-1/4 -z-10 h-96 w-96 rounded-full bg-[#8B5CF6]/5 blur-[100px]" />

      <Container>
        <div className="mx-auto max-w-[800px] text-center mb-16 sm:mb-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="mb-4 inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.1em] text-[#8B5CF6] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6]" />
              {t('contact.hero.badge')}
            </span>
            <h2 className="text-[32px] font-bold leading-[1.15] tracking-[-0.02em] text-[#0A0A0A] sm:text-[44px] lg:text-[56px] mb-6">
              {t('contact.hero.title')}{' '}
              <span className="text-[#8B5CF6]">{t('contact.hero.titleAccent')}</span>
            </h2>
            <p className="mx-auto max-w-[600px] text-[15px] leading-[1.75] text-[#52525B] sm:text-[18px]">
              {t('contact.hero.subtitle')}
            </p>
          </motion.div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-[#E4E4E7] bg-white p-6 sm:p-10 shadow-sm"
          >
            <h3 className="text-[20px] font-bold text-[#0A0A0A] sm:text-[24px] mb-8">
              {t('contact.form.title')}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-[13px] font-semibold text-[#0A0A0A] mb-2">
                    {t('contact.form.name')} <span className="text-[#8B5CF6]" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? getErrorId('name') : undefined}
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    className={getInputClassName('name')}
                    placeholder={t('contact.form.namePlaceholder')}
                  />
                  {errors.name && (
                    <span id={getErrorId('name')} className="mt-1.5 flex items-center gap-1.5 text-[12px] text-red-500" role="alert">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      {errors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-[13px] font-semibold text-[#0A0A0A] mb-2">
                    {t('contact.form.email')} <span className="text-[#8B5CF6]" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? getErrorId('email') : undefined}
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={getInputClassName('email')}
                    placeholder="you@company.com"
                  />
                  {errors.email && (
                    <span id={getErrorId('email')} className="mt-1.5 flex items-center gap-1.5 text-[12px] text-red-500" role="alert">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="company" className="block text-[13px] font-semibold text-[#0A0A0A] mb-2">
                    {t('contact.form.company')}
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={form.company}
                    onChange={(e) => { trackFormStarted(); setForm((prev) => ({ ...prev, company: e.target.value })) }}
                    className="w-full h-11 px-4 text-[14px] rounded-lg border border-[#E4E4E7] bg-[#FAFAF9] transition-all duration-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8B5CF6]/20 focus:border-[#8B5CF6]"
                    placeholder="Acme Corp"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-[13px] font-semibold text-[#0A0A0A] mb-2">
                    {t('contact.form.website')}
                  </label>
                  <input
                    type="text"
                    id="website"
                    value={form.website}
                    onChange={(e) => { trackFormStarted(); setForm((prev) => ({ ...prev, website: e.target.value })) }}
                    className="w-full h-11 px-4 text-[14px] rounded-lg border border-[#E4E4E7] bg-[#FAFAF9] transition-all duration-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8B5CF6]/20 focus:border-[#8B5CF6]"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="service" className="block text-[13px] font-semibold text-[#0A0A0A] mb-2">
                    {t('contact.form.service')} <span className="text-[#8B5CF6]" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="service"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.service}
                    aria-describedby={errors.service ? getErrorId('service') : undefined}
                    value={form.service}
                    onChange={(e) => { trackEvent('form_field_interaction', { form_name: 'contact', field_name: 'service' }); handleChange('service', e.target.value) }}
                    onBlur={() => handleBlur('service')}
                    className={getInputClassName('service')}
                  >
                    <option value="" disabled>{t('contact.form.serviceSelect')}</option>
                    {servicesList.map((key) => (
                      <option key={key} value={key}>
                        {t(`services.items.${key}.title`)}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <span id={getErrorId('service')} className="mt-1.5 flex items-center gap-1.5 text-[12px] text-red-500" role="alert">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      {errors.service}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="budget" className="block text-[13px] font-semibold text-[#0A0A0A] mb-2">
                    {t('contact.form.budget')}
                  </label>
                  <select
                    id="budget"
                    value={form.budget}
                    onChange={(e) => { trackFormStarted(); trackEvent('form_field_interaction', { form_name: 'contact', field_name: 'budget' }); setForm((prev) => ({ ...prev, budget: e.target.value })) }}
                    className="w-full h-11 px-4 text-[14px] rounded-lg border border-[#E4E4E7] bg-[#FAFAF9] transition-all duration-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8B5CF6]/20 focus:border-[#8B5CF6]"
                  >
                    <option value="" disabled>{t('contact.form.budgetSelect')}</option>
                    {budgetList.map((key) => (
                      <option key={key} value={key}>
                        {t(`contact.form.budgets.${key}`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-[13px] font-semibold text-[#0A0A0A] mb-2">
                  {t('contact.form.description')} <span className="text-[#8B5CF6]" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="description"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.description}
                  aria-describedby={errors.description ? getErrorId('description') : undefined}
                  rows={4}
                    value={form.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    onBlur={() => handleBlur('description')}
                    className={getInputClassName('description')}
                  placeholder={t('contact.form.descriptionPlaceholder')}
                />
                {errors.description && (
                  <span id={getErrorId('description')} className="mt-1.5 flex items-center gap-1.5 text-[12px] text-red-500" role="alert">
                    <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    {errors.description}
                  </span>
                )}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full justify-center"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? t('contact.form.submitting') : t('contact.form.submit')}
                </Button>
                <p className="mt-2 text-center text-[12px] text-[#71717A]">
                  {t('contact.form.submitMicro')}
                </p>
              </div>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-start gap-3 rounded-lg bg-emerald-50 border border-emerald-200 p-4 mt-4"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h4 className="text-[14px] font-bold text-emerald-900">{t('contact.form.successTitle')}</h4>
                      <p className="text-[13px] text-emerald-700 mt-1">{t('contact.form.successDesc')}</p>
                    </div>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    role="alert"
                    aria-live="assertive"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-start gap-3 rounded-lg bg-red-50 border border-red-200 p-4 mt-4"
                  >
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h4 className="text-[14px] font-bold text-red-900">{t('contact.form.errorTitle')}</h4>
                      <p className="text-[13px] text-red-700 mt-1">{t('contact.form.errorDesc')}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"
            >
              <motion.div
                variants={fadeUp}
                className="group relative rounded-xl border border-[#E4E4E7] bg-white p-5 transition-all duration-200 hover:border-[#D4D4D8]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F3F0FF] text-[#8B5CF6]">
                      <Mail className="h-4.5 w-4.5" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-[12px] font-semibold tracking-[0.08em] text-[#52525B] uppercase">
                        {t('contact.info.emailLabel')}
                      </span>
                      <p className="text-[14px] font-semibold text-[#0A0A0A] mt-1 break-all">
                        massar.digital.studio@gmail.com
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('massar.digital.studio@gmail.com', 'email')}
                    className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-[#F4F4F5] text-[#52525B] hover:text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2"
                    aria-label={copiedEmail ? 'Email copied to clipboard' : 'Copy email address'}
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                  </button>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="group relative rounded-xl border border-[#E4E4E7] bg-white p-5 transition-all duration-200 hover:border-[#D4D4D8]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E8F8EE] text-[#25D366]">
                      <Phone className="h-4.5 w-4.5" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-[12px] font-semibold tracking-[0.08em] text-[#52525B] uppercase">
                        {t('contact.info.phoneLabel')}
                      </span>
                      <p className="text-[14px] font-semibold text-[#0A0A0A] mt-1" dir="ltr">
                        +213 555 123 456
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('+213 555 123 456', 'phone')}
                    className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-[#F4F4F5] text-[#52525B] hover:text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2"
                    aria-label={copiedPhone ? 'Phone number copied to clipboard' : 'Copy phone number'}
                    title="Copy Phone Number"
                  >
                    {copiedPhone ? <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                  </button>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="group relative rounded-xl border border-[#E4E4E7] bg-white p-5 transition-all duration-200 hover:border-[#D4D4D8]"
              >
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFF2E8] text-[#EA580C]">
                    <MapPin className="h-4.5 w-4.5" aria-hidden="true" />
                  </div>
                  <div>
                      <span className="text-[12px] font-semibold tracking-[0.08em] text-[#52525B] uppercase">
                        {t('contact.info.locationLabel')}
                      </span>
                    <p className="text-[14px] font-semibold text-[#0A0A0A] mt-1">
                      {t('footer.location')}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="group relative rounded-xl border border-[#E4E4E7] bg-white p-5 transition-all duration-200 hover:border-[#D4D4D8]"
              >
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EBF5FF] text-[#2563EB]">
                    <Clock className="h-4.5 w-4.5" aria-hidden="true" />
                  </div>
                  <div>
                      <span className="text-[12px] font-semibold tracking-[0.08em] text-[#52525B] uppercase">
                        {t('contact.info.hoursLabel')}
                      </span>
                      <p className="text-[14px] font-semibold text-[#0A0A0A] mt-1">
                        {t('contact.info.hoursVal')}
                      </p>
                      <p className="text-[12px] text-[#52525B] mt-0.5">
                        {t('contact.info.responseExpected')}
                      </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border border-[#E4E4E7] bg-[#FAFAF9] p-6 sm:p-8"
            >
              <div className="flex items-center gap-1.5 text-amber-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
                <span className="text-[13px] font-bold text-[#0A0A0A] ms-2">5.0 / 5.0</span>
              </div>
              <p className="text-[14px] italic leading-[1.7] text-[#52525B] mb-6">
                "{t('contact.social.testimonialText')}"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center text-[14px] font-bold text-[#8B5CF6]" aria-hidden="true">
                  A
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-[#0A0A0A]">
                    {t('contact.social.testimonialAuthor')}
                  </h3>
                  <p className="text-[12px] text-[#52525B]">
                    {t('contact.social.testimonialCompany')}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#E4E4E7] pt-6 text-center">
                <div>
                  <span className="block text-[22px] font-extrabold text-[#8B5CF6]">15+</span>
                  <span className="text-[11px] font-medium text-[#52525B] uppercase tracking-wider">
                    {t('contact.social.projectsLabel')}
                  </span>
                </div>
                <div>
                  <span className="block text-[22px] font-extrabold text-[#8B5CF6]">3+</span>
                  <span className="text-[11px] font-medium text-[#52525B] uppercase tracking-wider">
                    {t('contact.social.experienceLabel')}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-24 sm:mt-32">
          <div className="text-center mb-12 sm:mb-16">
            <span className="mb-3 inline-block text-[13px] font-semibold tracking-[0.1em] text-[#8B5CF6] uppercase">
              {t('contact.why.label')}
            </span>
            <h3 className="text-[24px] font-bold leading-[1.25] text-[#0A0A0A] sm:text-[32px]">
              {t('contact.why.title')}
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {['communication', 'process', 'outcomes'].map((key) => (
              <div
                key={key}
                className="rounded-xl border border-[#E4E4E7] bg-white p-6 transition-all duration-200 hover:border-[#D4D4D8] hover:shadow-sm"
              >
                <h4 className="text-[16px] font-bold text-[#0A0A0A]">
                  {t(`contact.why.items.${key}.title`)}
                </h4>
                <p className="mt-3 text-[14px] leading-[1.7] text-[#52525B]">
                  {t(`contact.why.items.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 sm:mt-32 rounded-3xl border border-[#E4E4E7] bg-[#0A0A0A] text-white p-8 sm:p-14 lg:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(ellipse_at_center,#8B5CF6_0%,transparent_70%)]" />
          <h3 className="text-[24px] font-bold tracking-tight sm:text-[36px] lg:text-[42px] max-w-[600px] mx-auto leading-tight">
            {t('contact.cta.title')}
          </h3>
          <p className="mt-5 max-w-[500px] mx-auto text-[14px] text-[#A1A1AA] sm:text-[16px] leading-[1.75]">
            {t('contact.cta.subtitle')}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-[#0A0A0A] hover:bg-neutral-100 border-none shadow-md"
              href="https://calendly.com"
              onClick={() => trackEvent('schedule_call_click', { source: 'contact_cta' })}
            >
              <Calendar className="h-4.5 w-4.5" aria-hidden="true" />
              {t('contact.cta.schedule')}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
