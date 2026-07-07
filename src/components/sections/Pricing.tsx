import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, ArrowRight, ArrowUpRight, Calendar, Star, Layout, Zap, Settings } from 'lucide-react'
import { fadeUp, stagger, scaleUp } from '@/hooks/useAnimationVariants'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { Accordion } from '@/components/ui/Accordion'
import { trackEvent } from '@/lib/analytics'

const packages = ['website', 'growth', 'custom'] as const

const packageIcons = [Layout, Zap, Settings] as const

export function Pricing() {
  const { t } = useTranslation()
  const reducedMotion = useReducedMotion()

  const features = t('pricing.comparison.features', { returnObjects: true }) as Array<{
    feature: string
    starter: string
    growth: string
    custom: string
  }>

  const customFactors = t('pricing.custom.factors', { returnObjects: true }) as string[]

  const faqItems = t('pricing.faq.items', { returnObjects: true }) as Array<{
    question: string
    answer: string
  }>

  return (
    <Section id="pricing" className="pb-12 sm:pb-16 lg:pb-20">
      <Container>
        <SectionHeader
          label={t('pricing.label')}
          title={t('pricing.title')}
          subtitle={t('pricing.subtitle')}
        />

        {/* Trust Signals Strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mb-12 sm:mb-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-[#E4E4E7] bg-white px-6 py-4 sm:px-10 sm:py-5"
        >
          <div className="flex items-center gap-2 text-[13px] font-medium text-[#52525B] sm:text-[14px]">
            <span className="flex items-center justify-center rounded-md bg-[#F3F0FF] px-2 py-0.5 text-[12px] font-bold text-[#8B5CF6]">
              15+
            </span>
            {t('pricing.trust.projects')}
          </div>
          <div className="hidden h-4 w-px bg-[#E4E4E7] sm:block" aria-hidden="true" />
          <div className="flex items-center gap-2 text-[13px] font-medium text-[#52525B] sm:text-[14px]">
            <span className="flex items-center justify-center rounded-md bg-emerald-50 px-2 py-0.5 text-[12px] font-bold text-emerald-600">
              98%
            </span>
            {t('pricing.trust.satisfaction')}
            <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
              TODO
            </span>
          </div>
          <div className="hidden h-4 w-px bg-[#E4E4E7] sm:block" aria-hidden="true" />
          <div className="flex items-center gap-2 text-[13px] font-medium text-[#52525B] sm:text-[14px]">
            <span className="flex items-center justify-center rounded-md bg-[#EBF5FF] px-2 py-0.5 text-[12px] font-bold text-blue-600">
              24h
            </span>
            {t('pricing.trust.response')}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 lg:grid-cols-3"
        >
          {packages.map((pkg, index) => {
            const Icon = packageIcons[index]
            const addons = t(`pricing.packages.${pkg}.addons`, { returnObjects: true }) as string[]
            const highlighted = pkg === 'growth'

            return (
              <motion.div
                key={pkg}
                variants={fadeUp}
                whileHover={reducedMotion ? {} : { y: -3, transition: { duration: 0.2 } }}
                className={`relative flex flex-col rounded-2xl border bg-white p-8 transition-all duration-300 ${
                  highlighted
                    ? 'border-[#8B5CF6] shadow-lg shadow-[#8B5CF6]/10 ring-1 ring-[#8B5CF6]/20'
                    : 'border-[#E4E4E7] hover:border-[#D4D4D8] hover:shadow-lg hover:shadow-black/[0.04]'
                }`}
              >
                {highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#8B5CF6] px-4 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
                    {t('pricing.packages.popular')}
                  </span>
                )}

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    highlighted ? 'bg-[#8B5CF6] text-white' : 'bg-[#F3F0FF] text-[#8B5CF6]'
                  }`}
                >
                  <Icon className="h-5.5 w-5.5" strokeWidth={1.75} aria-hidden="true" />
                </div>

                <h3 className="mt-5 text-[20px] font-bold text-[#0A0A0A]">
                  {t(`pricing.packages.${pkg}.name`)}
                </h3>

                <p className="mt-4 text-[12px] font-semibold tracking-[0.08em] text-[#71717A] uppercase">
                  {t('pricing.packages.fromLabel')}
                </p>
                <span className="mt-1 block text-[36px] font-extrabold leading-none tracking-[-0.02em] text-[#0A0A0A]">
                  {t(`pricing.packages.${pkg}.price`)}
                </span>

                <p className="mt-4 text-[14px] leading-[1.7] text-[#71717A]">
                  {t(`pricing.packages.${pkg}.description`)}
                </p>

                <div className="mt-5 rounded-lg bg-[#FAFAF9] px-4 py-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#71717A]">
                    {t('pricing.packages.idealLabel')}
                  </span>
                  <p className="mt-0.5 text-[14px] font-semibold text-[#0A0A0A]">
                    {t(`pricing.packages.${pkg}.ideal`)}
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-2 text-[13px] text-[#52525B]">
                  <Calendar className="h-3.5 w-3.5 text-[#8B5CF6]" aria-hidden="true" />
                  {t('pricing.packages.timelineLabel')}:{' '}
                  <span className="font-semibold text-[#0A0A0A]">
                    {t(`pricing.packages.${pkg}.timeline`)}
                  </span>
                </div>

                <div className="mt-6 flex-1">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#0A0A0A]">
                    {t('pricing.packages.includesLabel')}
                  </span>
                  <ul className="mt-3 space-y-2.5">
                    {(t(`pricing.packages.${pkg}.features`, { returnObjects: true }) as string[]).map(
                      (feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#52525B]">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8B5CF6]" aria-hidden="true" />
                          {feature}
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                {addons.length > 0 && (
                  <div className="mt-5 border-t border-[#E4E4E7] pt-5">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#71717A]">
                      {t('pricing.packages.addonsLabel')}
                    </span>
                    <ul className="mt-2 space-y-1.5">
                      {addons.map((addon: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-[13px] text-[#71717A]">
                          <span className="h-1 w-1 rounded-full bg-[#D4D4D8]" aria-hidden="true" />
                          {addon}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 space-y-3">
                  <Button
                    variant={highlighted ? 'primary' : 'secondary'}
                    size="lg"
                    className="w-full justify-center"
                    href="#contact"
                    onClick={() => trackEvent('pricing_cta_click', { package_name: t(`pricing.packages.${pkg}.name`), package_price: t(`pricing.packages.${pkg}.price`) })}
                  >
                    {t('pricing.packages.cta')}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-center text-[13px]"
                    href="#contact"
                    onClick={() => trackEvent('pricing_cta_click', { package_name: t(`pricing.packages.${pkg}.name`), cta_type: 'custom' })}
                  >
                    {t('pricing.packages.ctaCustom')}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-20 sm:mt-28"
        >
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-[12px] font-semibold tracking-[0.12em] text-[#8B5CF6] uppercase">
              {t('pricing.comparison.label')}
            </span>
            <h3 className="text-[22px] font-bold leading-[1.25] tracking-[-0.015em] text-[#0A0A0A] sm:text-[26px] lg:text-[32px]">
              {t('pricing.comparison.title')}
            </h3>
            <p className="mt-3 text-[14px] leading-[1.8] text-[#71717A] sm:text-[15px]">
              {t('pricing.comparison.subtitle')}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#E4E4E7] bg-white">
            <table className="w-full min-w-[640px] border-collapse text-left text-[14px]">
              <thead>
                <tr className="border-b border-[#E4E4E7] bg-[#FAFAF9]">
                  <th scope="col" className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#71717A] sm:px-6">
                    {t('pricing.comparison.headers.feature')}
                  </th>
                  <th scope="col" className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#71717A] sm:px-6">
                    {t('pricing.packages.website.name')}
                  </th>
                  <th scope="col" className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8B5CF6] sm:px-6">
                    {t('pricing.packages.growth.name')}
                  </th>
                  <th scope="col" className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#71717A] sm:px-6">
                    {t('pricing.packages.custom.name')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-[#E4E4E7] last:border-b-0 ${
                      i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF9]'
                    }`}
                  >
                    <th scope="row" className="px-5 py-3.5 text-[13px] font-semibold text-[#0A0A0A] sm:px-6 sm:text-[14px]">
                      {row.feature}
                    </th>
                    <td className="px-5 py-3.5 text-[13px] text-[#52525B] sm:px-6">
                      {renderCellValue(row.starter)}
                    </td>
                    <td className="px-5 py-3.5 text-[13px] font-medium text-[#52525B] sm:px-6">
                      {renderCellValue(row.growth)}
                    </td>
                    <td className="px-5 py-3.5 text-[13px] text-[#52525B] sm:px-6">
                      {renderCellValue(row.custom)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Custom Project Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-20 sm:mt-28"
        >
          <div className="rounded-2xl border border-[#E4E4E7] bg-white p-8 sm:p-12">
            <div className="mx-auto max-w-[640px] text-center">
              <span className="mb-3 inline-block text-[12px] font-semibold tracking-[0.12em] text-[#8B5CF6] uppercase">
                {t('pricing.custom.label')}
              </span>
              <h3 className="text-[22px] font-bold leading-[1.25] tracking-[-0.015em] text-[#0A0A0A] sm:text-[26px] lg:text-[32px]">
                {t('pricing.custom.title')}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.8] text-[#71717A] sm:text-[15px]">
                {t('pricing.custom.description')}
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {customFactors.map((factor, i) => (
                <motion.div
                  key={i}
                  whileHover={reducedMotion ? {} : { y: -2, transition: { duration: 0.2 } }}
                  className="rounded-xl border border-[#E4E4E7] bg-[#FAFAF9] p-5 transition-all duration-200 hover:border-[#D4D4D8]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3F0FF] text-[#8B5CF6]">
                    <span className="text-[13px] font-bold">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="mt-3 text-[14px] font-semibold text-[#0A0A0A]">{factor}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="mb-5 text-[14px] text-[#52525B]">
                {t('pricing.custom.ctaSubtitle')}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button size="lg" href="#contact" onClick={() => trackEvent('pricing_cta_click', { package_name: 'custom', cta_type: 'custom_project' })}>
                  {t('pricing.custom.cta')}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button variant="accent" size="lg" href="https://calendly.com/massar-digital-studio/30min" className="shadow-lg shadow-[#8B5CF6]/30" onClick={() => trackEvent('schedule_call_click', { source: 'pricing_custom' })}>
                  <Calendar className="h-4.5 w-4.5" aria-hidden="true" />
                  {t('pricing.custom.ctaSchedule')}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pricing FAQ */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 sm:mt-20"
        >
          <div className="text-center">
            <span className="mb-3 inline-block text-[12px] font-semibold tracking-[0.12em] text-[#8B5CF6] uppercase">
              {t('pricing.faq.label')}
            </span>
            <h3 className="text-[22px] font-bold leading-[1.25] tracking-[-0.015em] text-[#0A0A0A] sm:text-[26px] lg:text-[32px]">
              {t('pricing.faq.title')}
            </h3>
          </div>

          <div className="mx-auto mt-10 max-w-[800px] rounded-2xl border border-[#E4E4E7] bg-white px-7 py-2 sm:px-10">
            {faqItems.length > 0 && <Accordion items={faqItems} />}
          </div>

          <p className="mt-6 text-center text-[13px] text-[#71717A]">
            {t('pricing.faq.moreQuestions')}{' '}
            <a
              href="#faq"
              className="font-semibold text-[#8B5CF6] underline underline-offset-2 transition-colors hover:text-[#7C3AED]"
            >
              {t('pricing.faq.contactLink')}
            </a>
          </p>
        </motion.div>
      </Container>
    </Section>
  )
}

function renderCellValue(value: string) {
  if (value === '✓' || value === '✔') {
    return <Check className="h-4.5 w-4.5 text-emerald-600" aria-hidden="true" />
  }
  if (value === '—' || value === '-') {
    return <span className="text-[#A1A1AA]">&mdash;</span>
  }
  return value
}
