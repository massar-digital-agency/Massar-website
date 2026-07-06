import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  Briefcase,
  MapPin,
  Clock,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Target,
  Heart,
  Lightbulb,
  Users,
  GraduationCap,
  Sparkles,
  Zap,
  Globe,
  DollarSign,
  Calendar,
  BookOpen,
  Crosshair,
  Layers,
  Mail,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { SEO_CONFIG } from '@/lib/seo'
import { trackPageView } from '@/lib/analytics'

const cultureIcons = [
  <Users className="h-5 w-5" strokeWidth={1.75} />,
  <GraduationCap className="h-5 w-5" strokeWidth={1.75} />,
  <Heart className="h-5 w-5" strokeWidth={1.75} />,
  <Sparkles className="h-5 w-5" strokeWidth={1.75} />,
]

const whyIcons = [
  <Target className="h-5 w-5" strokeWidth={1.75} />,
  <Zap className="h-5 w-5" strokeWidth={1.75} />,
  <Lightbulb className="h-5 w-5" strokeWidth={1.75} />,
  <Globe className="h-5 w-5" strokeWidth={1.75} />,
]

const benefitIcons = [
  <DollarSign className="h-5 w-5" strokeWidth={1.75} />,
  <Calendar className="h-5 w-5" strokeWidth={1.75} />,
  <Clock className="h-5 w-5" strokeWidth={1.75} />,
  <BookOpen className="h-5 w-5" strokeWidth={1.75} />,
  <Crosshair className="h-5 w-5" strokeWidth={1.75} />,
  <Layers className="h-5 w-5" strokeWidth={1.75} />,
]

const processStepIcons = [
  <Mail className="h-5 w-5" strokeWidth={1.75} />,
  <Users className="h-5 w-5" strokeWidth={1.75} />,
  <Target className="h-5 w-5" strokeWidth={1.75} />,
  <Briefcase className="h-5 w-5" strokeWidth={1.75} />,
  <Sparkles className="h-5 w-5" strokeWidth={1.75} />,
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

function CareersHero() {
  const { t, i18n } = useTranslation()
  const Arrow = i18n.language === 'ar' ? ArrowLeft : ArrowRight
  const careers = t('careers', { returnObjects: true }) as Record<string, unknown>
  const hero = careers.hero as Record<string, string>

  return (
    <section className="relative overflow-hidden border-b border-[#E4E4E7] bg-white pt-[72px]">
      <div className="absolute inset-0 opacity-[0.03]" style={{ background: 'radial-gradient(ellipse at top center, #8B5CF6 0%, transparent 70%)' }} />
      <Container>
        <div className="py-16 sm:py-20 lg:py-28">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <Breadcrumbs />
            <span className="mb-4 mt-4 inline-block text-[12px] font-semibold tracking-[0.12em] text-[#8B5CF6] uppercase">
              {hero.badge}
            </span>
            <h1 className="text-[30px] font-bold leading-[1.15] tracking-[-0.02em] text-[#0A0A0A] sm:text-[40px] lg:text-[52px]">
              {hero.title}{' '}
              <span className="text-[#8B5CF6]">{hero.titleAccent}</span>
            </h1>
            <p className="mt-5 max-w-[560px] text-[15px] leading-[1.8] text-[#52525B] sm:text-[17px]">
              {hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}>
                {t('careers.openings.apply')}
                <Arrow className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button size="lg" variant="secondary" href={`mailto:${t('careers.contact.email')}`}>
                {t('careers.cta.buttonSecondary')}
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

function CultureSection() {
  const { t } = useTranslation()
  const careers = t('careers', { returnObjects: true }) as Record<string, unknown>
  const culture = careers.culture as Record<string, unknown>
  const points = culture.points as Array<Record<string, string>>

  return (
    <Section>
      <Container>
        <SectionHeader
          label={culture.label as string}
          title={culture.title as string}
          subtitle={culture.subtitle as string}
          align="center"
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {points.map((point, i) => (
            <motion.div
              key={point.title}
              variants={fadeUp}
              className="group rounded-xl border border-[#E4E4E7] bg-white p-6 transition-all duration-200 hover:border-[#D4D4D8] hover:shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#F3F0FF] text-[#8B5CF6]">
                {cultureIcons[i]}
              </div>
              <h3 className="mb-2 text-[15px] font-bold text-[#0A0A0A]">{point.title}</h3>
              <p className="text-[14px] leading-[1.7] text-[#71717A]">{point.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  )
}

function WhyWorkSection() {
  const { t } = useTranslation()
  const careers = t('careers', { returnObjects: true }) as Record<string, unknown>
  const why = careers.whyWork as Record<string, unknown>
  const items = why.items as Array<Record<string, string>>

  return (
    <Section className="bg-[#F3F0FF]/40">
      <Container>
        <SectionHeader
          label={why.label as string}
          title={why.title as string}
          subtitle={why.subtitle as string}
          align="center"
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="flex gap-4 rounded-xl border border-[#E4E4E7] bg-white p-6"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F3F0FF] text-[#8B5CF6]">
                {whyIcons[i]}
              </div>
              <div>
                <h3 className="mb-1.5 text-[15px] font-bold text-[#0A0A0A]">{item.title}</h3>
                <p className="text-[14px] leading-[1.7] text-[#71717A]">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  )
}

function BenefitsSection() {
  const { t } = useTranslation()
  const careers = t('careers', { returnObjects: true }) as Record<string, unknown>
  const benefits = careers.benefits as Record<string, unknown>
  const items = benefits.items as Array<Record<string, string>>

  return (
    <Section>
      <Container>
        <SectionHeader
          label={benefits.label as string}
          title={benefits.title as string}
          subtitle={benefits.subtitle as string}
          align="center"
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="rounded-xl border border-[#E4E4E7] bg-white p-6 text-center transition-all duration-200 hover:border-[#D4D4D8] hover:shadow-sm"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3F0FF] text-[#8B5CF6]">
                {benefitIcons[i]}
              </div>
              <h3 className="mb-2 text-[15px] font-bold text-[#0A0A0A]">{item.title}</h3>
              <p className="text-[14px] leading-[1.7] text-[#71717A]">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  )
}

function OpeningsSection() {
  const { t } = useTranslation()
  const careers = t('careers', { returnObjects: true }) as Record<string, unknown>
  const openings = careers.openings as Record<string, unknown>
  const items = openings.items as Array<Record<string, unknown>>
  const types = openings.employmentType as Record<string, string>
  const locs = openings.location as Record<string, string>

  const jobSchema = items.map((job) => ({
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    employmentType: types[job.type as string] || types.fullTime,
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: locs[job.location as string] || locs.remote,
        addressCountry: 'DZ',
      },
    },
    hiringOrganization: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      sameAs: SEO_CONFIG.siteUrl,
    },
    datePosted: new Date().toISOString().split('T')[0],
  }))

  return (
    <Section id="openings" className="bg-[#F3F0FF]/40">
      <Container>
        <SectionHeader
          label={openings.label as string}
          title={openings.title as string}
          subtitle={openings.subtitle as string}
          align="center"
        />
        <Helmet>
          {items.length > 0 && (
            <script type="application/ld+json">{JSON.stringify(jobSchema)}</script>
          )}
        </Helmet>
        {items.length === 0 ? (
          <div className="rounded-xl border border-[#E4E4E7] bg-white p-12 text-center">
            <Briefcase className="mx-auto mb-4 h-10 w-10 text-[#A1A1AA]" aria-hidden="true" />
            <p className="text-[16px] font-semibold text-[#0A0A0A]">{openings.noOpenings as string}</p>
            <p className="mt-2 text-[14px] text-[#71717A]">{openings.noOpeningsDesc as string}</p>
          </div>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-6"
          >
            {items.map((job) => {
              const jobId = job.id as string
              const skills = job.skills as string[]
              return (
                <motion.div
                  key={jobId}
                  variants={fadeUp}
                  className="rounded-xl border border-[#E4E4E7] bg-white p-6 transition-all duration-200 hover:border-[#D4D4D8] hover:shadow-sm sm:p-8"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <h3 className="text-[18px] font-bold text-[#0A0A0A]">{job.title as string}</h3>
                      <div className="mt-3 flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4E7] bg-[#F8F7F4] px-3 py-1 text-[12px] font-medium text-[#52525B]">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          {types[job.type as string] || job.type}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4E7] bg-[#F8F7F4] px-3 py-1 text-[12px] font-medium text-[#52525B]">
                          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                          {locs[job.location as string] || job.location}
                        </span>
                      </div>
                      <p className="mt-4 text-[14px] leading-[1.7] text-[#71717A]">
                        {job.description as string}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-[#F3F0FF] px-2.5 py-1 text-[12px] font-medium text-[#7C3AED]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <Button
                        size="sm"
                        variant="accent"
                        href={`mailto:${t('careers.contact.email')}?subject=Application for ${job.title}`}
                      >
                        {openings.apply as string}
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </Container>
    </Section>
  )
}

function ProcessSection() {
  const { t } = useTranslation()
  const careers = t('careers', { returnObjects: true }) as Record<string, unknown>
  const process = careers.process as Record<string, unknown>
  const steps = process.steps as Array<Record<string, string>>

  const hiringProcessSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: steps.map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.title,
      description: step.description,
    })),
  }

  return (
    <Section>
      <Container>
        <SectionHeader
          label={process.label as string}
          title={process.title as string}
          subtitle={process.subtitle as string}
          align="center"
        />
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(hiringProcessSchema)}</script>
        </Helmet>
        <div className="relative">
          <div className="absolute left-[23px] top-0 hidden h-full w-px bg-[#E4E4E7] sm:block" aria-hidden="true" />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-8"
          >
            {steps.map((step, i) => (
              <motion.div key={step.title} variants={fadeUp} className="relative flex gap-6">
                <div className="relative z-10 flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl border border-[#E4E4E7] bg-white text-[#8B5CF6] shadow-sm">
                  {processStepIcons[i]}
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-semibold tracking-[0.08em] text-[#A1A1AA] uppercase">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-1 text-[16px] font-bold text-[#0A0A0A]">{step.title}</h3>
                  <p className="mt-1 text-[14px] leading-[1.7] text-[#71717A]">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}

function CtaSection() {
  const { t } = useTranslation()
  const cta = t('careers.cta', { returnObjects: true }) as Record<string, string>
  const contact = t('careers.contact', { returnObjects: true }) as Record<string, string>

  return (
    <Section className="bg-[#F3F0FF]/40">
      <Container>
        <div className="rounded-2xl border border-[#E4E4E7] bg-white px-8 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="text-[22px] font-bold text-[#0A0A0A] sm:text-[26px]">{cta.title}</h2>
          <p className="mx-auto mt-3 max-w-[500px] text-[14px] text-[#71717A] sm:text-[15px]">
            {cta.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" variant="accent" href={`mailto:${contact.email}`}>
              {cta.button}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="secondary" href="/contact">
              {cta.buttonSecondary}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function ContactSection() {
  const { t } = useTranslation()
  const contact = t('careers.contact', { returnObjects: true }) as Record<string, string>

  return (
    <Section className="border-b border-[#E4E4E7]">
      <Container className="text-center">
        <h2 className="text-[20px] font-bold text-[#0A0A0A] sm:text-[24px]">{contact.title}</h2>
        <p className="mx-auto mt-3 max-w-[500px] text-[14px] text-[#71717A] sm:text-[15px]">
          {contact.subtitle}
        </p>
        <div className="mt-8">
          <Button size="lg" variant="primary" href={`mailto:${contact.email}`}>
            <Mail className="h-4 w-4" aria-hidden="true" />
            {contact.button}
          </Button>
        </div>
        <p className="mt-3 text-[13px] text-[#A1A1AA]">{contact.email}</p>
      </Container>
    </Section>
  )
}

export function CareersPage() {
  const { t } = useTranslation()

  useEffect(() => {
    trackPageView('/careers', `Careers | ${SEO_CONFIG.siteName}`)
  }, [])

  const careers = t('careers', { returnObjects: true }) as Record<string, unknown>
  const seo = careers.seo as Record<string, string>

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={`${SEO_CONFIG.siteUrl}/careers`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.ogTitle} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta property="og:url" content={`${SEO_CONFIG.siteUrl}/careers`} />
        <meta name="twitter:title" content={seo.ogTitle} />
        <meta name="twitter:description" content={seo.ogDescription} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <main id="main-content">
        <CareersHero />
        <CultureSection />
        <WhyWorkSection />
        <BenefitsSection />
        <OpeningsSection />
        <ProcessSection />
        <CtaSection />
        <ContactSection />
      </main>
    </>
  )
}
