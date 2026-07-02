import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/hooks/useAnimationVariants'
import { ArrowLeft, ArrowRight, Sparkles, Target, Shield, Eye, Heart, Code2, Star, MapPin, Clock, Mail, Phone, Users, CheckCircle2, Zap, Layers } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingContact } from '@/components/layout/FloatingContact'
import { navigateToSection } from '@/lib/navigate'
import { trackPageView, trackEvent } from '@/lib/analytics'
import Logo3D from '@/assets/images/logo3d.jpg'

const SITE_URL = 'https://massardigital.com'
const SITE_NAME = 'Massar Digital Studio'

const valueIcons: Record<string, React.ReactNode> = {
  craft: <Sparkles className="h-5 w-5" strokeWidth={1.75} />,
  strategy: <Target className="h-5 w-5" strokeWidth={1.75} />,
  transparency: <Eye className="h-5 w-5" strokeWidth={1.75} />,
  performance: <Zap className="h-5 w-5" strokeWidth={1.75} />,
  reliability: <Shield className="h-5 w-5" strokeWidth={1.75} />,
}

const whyIcons: React.ReactNode[] = [
  <Layers className="h-5 w-5" strokeWidth={1.75} />,
  <Code2 className="h-5 w-5" strokeWidth={1.75} />,
  <Zap className="h-5 w-5" strokeWidth={1.75} />,
  <Heart className="h-5 w-5" strokeWidth={1.75} />,
  <Eye className="h-5 w-5" strokeWidth={1.75} />,
  <Shield className="h-5 w-5" strokeWidth={1.75} />,
]

const processKeys = ['discover', 'plan', 'design', 'develop', 'launch', 'support'] as const

/* ───── Hero ───── */

function AboutHero() {
  const { t, i18n } = useTranslation()
  const Arrow = i18n.language === 'ar' ? ArrowLeft : ArrowRight
  const about = t('aboutPage', { returnObjects: true }) as Record<string, unknown>
  const hero = about.hero as Record<string, string>

  return (
    <section className="relative overflow-hidden border-b border-[#E4E4E7] bg-white pt-[72px]">
      <div className="absolute inset-0 opacity-[0.03]" style={{ background: 'radial-gradient(ellipse at top center, #8B5CF6 0%, transparent 70%)' }} />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center py-16 sm:py-20 lg:py-28">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <span className="mb-4 inline-block text-[12px] font-semibold tracking-[0.12em] text-[#8B5CF6] uppercase">
              {hero.badge}
            </span>
            <h1 className="text-[30px] font-bold leading-[1.15] tracking-[-0.02em] text-[#0A0A0A] sm:text-[40px] lg:text-[52px]">
              {hero.title}{' '}
              <span className="text-[#8B5CF6]">{hero.titleAccent}</span>
            </h1>
            <p className="mt-5 max-w-[560px] text-[15px] leading-[1.8] text-[#52525B] sm:text-[17px]">
              {hero.subtitle}
            </p>
            <p className="mt-3 text-[13px] text-[#A1A1AA]">
              {hero.subtitleMicro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => { navigateToSection('projects'); trackEvent('cta_click', { cta_location: 'about_hero', cta_text: hero.cta }) }}>
                {hero.cta}
                <Arrow className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button size="lg" variant="secondary" href="mailto:massar.digital.studio@gmail.com" onClick={() => trackEvent('outbound_click', { outbound_type: 'email', outbound_label: 'about_hero' })}>
                {hero.ctaSecondary}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="hidden lg:block"
          >
            <img
              src={Logo3D}
              alt="Massar Digital Studio — 3D logo"
              className="w-full max-w-[340px] mx-auto rounded-2xl"
              loading="eager"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

/* ───── Story ───── */

function AboutStory() {
  const { t } = useTranslation()
  const about = t('aboutPage', { returnObjects: true }) as Record<string, unknown>
  const story = about.story as Record<string, unknown>
  const paragraphs = story.paragraphs as string[]

  return (
    <Section className="bg-white">
      <Container narrow>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <span className="mb-4 inline-block text-[12px] font-semibold tracking-[0.12em] text-[#8B5CF6] uppercase">
            {story.title as string}
          </span>
          <p className="text-[17px] font-medium leading-[1.7] text-[#52525B] sm:text-[19px]">
            {story.intro as string}
          </p>
          <div className="mt-8 space-y-5 text-[15px] leading-[1.8] text-[#71717A] sm:text-[16px]">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="mt-6 text-[13px] text-[#A1A1AA] italic">
            {story.note as string}
          </p>
        </motion.div>
      </Container>
    </Section>
  )
}

/* ───── Founder ───── */

function AboutFounder() {
  const { t } = useTranslation()
  const about = t('aboutPage', { returnObjects: true }) as Record<string, unknown>
  const founder = about.founder as Record<string, unknown>

  return (
    <Section className="border-y border-[#E4E4E7] bg-[#FAFAF9]">
      <Container narrow>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <SectionHeader
            label={founder.title as string}
            title={founder.subtitle as string}
            align="start"
          />

          <div className="rounded-2xl border border-dashed border-[#E4E4E7] bg-white p-8 sm:p-10 text-center">
            <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-[#D4D4D8] bg-[#FAFAF9]">
              <Users className="h-8 w-8 text-[#A1A1AA]" aria-hidden="true" />
            </div>
            <h3 className="text-[18px] font-bold text-[#A1A1AA]">
              Founder information
            </h3>
            <p className="mt-2 text-[14px] leading-[1.7] text-[#A1A1AA] italic max-w-[400px] mx-auto">
              {founder.placeholderNote as string}
            </p>
            <span className="mt-4 inline-block rounded bg-[#F3F0FF] px-3 py-1 text-[11px] font-medium text-[#8B5CF6]">
              Placeholder — update with real information
            </span>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}

/* ───── Mission, Vision & Values ───── */

function AboutMission() {
  const { t } = useTranslation()
  const about = t('aboutPage', { returnObjects: true }) as Record<string, unknown>
  const missionData = about.mission as Record<string, unknown>
  const mission = missionData.mission as Record<string, string>
  const vision = missionData.vision as Record<string, string>
  const values = missionData.values as Record<string, unknown>
  const valueItems = values.items as Array<{ title: string; description: string; icon: string }>

  return (
    <Section className="bg-white">
      <Container narrow>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <SectionHeader
            label={missionData.title as string}
            title={missionData.subtitle as string}
            align="start"
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#E4E4E7] bg-[#FAFAF9] p-6 sm:p-7">
              <Target className="mb-3 h-6 w-6 text-[#8B5CF6]" aria-hidden="true" />
              <h3 className="text-[13px] font-semibold tracking-[0.08em] text-[#A1A1AA] uppercase">
                {mission.label}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.7] text-[#52525B] sm:text-[16px]">
                {mission.text}
              </p>
            </div>
            <div className="rounded-2xl border border-[#E4E4E7] bg-[#FAFAF9] p-6 sm:p-7">
              <Eye className="mb-3 h-6 w-6 text-[#8B5CF6]" aria-hidden="true" />
              <h3 className="text-[13px] font-semibold tracking-[0.08em] text-[#A1A1AA] uppercase">
                {vision.label}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.7] text-[#52525B] sm:text-[16px]">
                {vision.text}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-[13px] font-semibold tracking-[0.08em] text-[#A1A1AA] uppercase mb-5">
              {values.label as string}
            </h3>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {valueItems.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="rounded-xl border border-[#E4E4E7] bg-white p-5 transition-all duration-200 hover:border-[#D4D4D8] hover:shadow-sm"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-[#E4E4E7] bg-white text-[#8B5CF6]">
                    {valueIcons[item.icon] || <Sparkles className="h-5 w-5" strokeWidth={1.75} />}
                  </div>
                  <h4 className="text-[14px] font-bold text-[#0A0A0A]">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 text-[13px] leading-[1.7] text-[#71717A]">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}

/* ───── Why Clients Choose Us ───── */

function AboutWhy() {
  const { t } = useTranslation()
  const about = t('aboutPage', { returnObjects: true }) as Record<string, unknown>
  const why = about.why as Record<string, unknown>
  const items = why.items as Array<{ title: string; description: string }>

  return (
    <Section className="border-y border-[#E4E4E7] bg-[#FAFAF9]">
      <Container>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <SectionHeader
            label={why.title as string}
            title={why.subtitle as string}
            align="start"
          />
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="rounded-2xl border border-[#E4E4E7] bg-white p-6 sm:p-7 transition-all duration-200 hover:border-[#D4D4D8] hover:shadow-sm"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#E4E4E7] bg-white text-[#8B5CF6]">
                {whyIcons[i % whyIcons.length]}
              </div>
              <h3 className="text-[16px] font-bold text-[#0A0A0A]">
                {item.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.75] text-[#71717A] sm:text-[15px]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  )
}

/* ───── How We Work ───── */

function AboutProcess() {
  const { t } = useTranslation()
  const about = t('aboutPage', { returnObjects: true }) as Record<string, unknown>
  const processData = about.process as Record<string, string>

  return (
    <Section className="bg-white">
      <Container>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <SectionHeader
            label={processData.title}
            title={processData.subtitle}
            align="start"
          />
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {processKeys.map((key, i) => (
            <motion.div
              key={key}
              variants={fadeUp}
              className="rounded-xl border border-[#E4E4E7] bg-[#FAFAF9] p-5 sm:p-6"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F0FF] text-[13px] font-bold text-[#8B5CF6]">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="text-[15px] font-bold text-[#0A0A0A]">
                {t(`process.steps.${key}.title`)}
              </h3>
              <p className="mt-1.5 text-[13px] leading-[1.7] text-[#71717A]">
                {t(`process.steps.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-6 text-[13px] text-[#A1A1AA] italic">
          {processData.note}
        </p>
      </Container>
    </Section>
  )
}

/* ───── Team ───── */

function AboutTeam() {
  const { t } = useTranslation()
  const about = t('aboutPage', { returnObjects: true }) as Record<string, unknown>
  const team = about.team as Record<string, unknown>

  return (
    <Section className="border-y border-[#E4E4E7] bg-[#FAFAF9]">
      <Container narrow>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <SectionHeader
            label={team.title as string}
            title={team.subtitle as string}
            align="start"
          />

          <div className="rounded-2xl border border-dashed border-[#E4E4E7] bg-white p-8 sm:p-10 text-center">
            <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-[#D4D4D8] bg-[#FAFAF9]">
              <Users className="h-8 w-8 text-[#A1A1AA]" aria-hidden="true" />
            </div>
            <h3 className="text-[18px] font-bold text-[#A1A1AA]">
              Team profiles
            </h3>
            <p className="mt-2 text-[14px] leading-[1.7] text-[#A1A1AA] italic max-w-[450px] mx-auto">
              {team.placeholderNote as string}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <span className="rounded bg-[#F3F0FF] px-3 py-1 text-[11px] font-medium text-[#8B5CF6]">
                Placeholder — add team member details
              </span>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}

/* ───── Achievements ───── */

function AboutAchievements() {
  const { t } = useTranslation()
  const about = t('aboutPage', { returnObjects: true }) as Record<string, unknown>
  const achievements = about.achievements as Record<string, unknown>
  const items = achievements.items as Array<{ metric: string; label: string; description: string; placeholder?: boolean }>

  return (
    <Section className="bg-white">
      <Container narrow>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <SectionHeader
            label={achievements.title as string}
            title={achievements.subtitle as string}
            align="start"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            {items.map((item) => (
              <div
                key={item.label}
                className={`rounded-xl border p-6 transition-all ${
                  item.placeholder
                    ? 'border-dashed border-[#E4E4E7] bg-white'
                    : 'border-[#E4E4E7] bg-[#FAFAF9]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-[32px] font-extrabold leading-none tracking-[-0.02em] text-[#0A0A0A] sm:text-[38px]">
                      {item.metric}
                    </div>
                    <span className="mt-1.5 block text-[14px] font-semibold text-[#52525B]">
                      {item.label}
                    </span>
                  </div>
                  {item.placeholder ? (
                    <span className="shrink-0 rounded bg-[#F3F0FF] px-2 py-0.5 text-[10px] font-medium text-[#8B5CF6]">
                      TODO
                    </span>
                  ) : (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#059669]" aria-hidden="true" />
                  )}
                </div>
                <p className="mt-2 text-[13px] leading-[1.6] text-[#71717A]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-[13px] text-[#A1A1AA] italic">
            {achievements.placeholderNote as string}
          </p>
        </motion.div>
      </Container>
    </Section>
  )
}

/* ───── Tech Stack ───── */

function AboutTechStack() {
  const { t } = useTranslation()
  const about = t('aboutPage', { returnObjects: true }) as Record<string, unknown>
  const techStack = about.techStack as Record<string, unknown>
  const categories = techStack.categories as Array<{ label: string; items: string[] }>

  return (
    <Section className="border-y border-[#E4E4E7] bg-[#FAFAF9]">
      <Container>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <SectionHeader
            label={techStack.title as string}
            title={techStack.subtitle as string}
            align="start"
          />
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.label}
              variants={fadeUp}
              className="rounded-xl border border-[#E4E4E7] bg-white p-5 sm:p-6"
            >
              <h3 className="text-[13px] font-semibold tracking-[0.08em] text-[#A1A1AA] uppercase mb-3">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-[#E4E4E7] bg-[#FAFAF9] px-2.5 py-1 text-[12px] font-medium text-[#52525B]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-6 text-[13px] text-[#A1A1AA] italic">
          {techStack.note as string}
        </p>
      </Container>
    </Section>
  )
}

/* ───── Testimonials ───── */

function AboutTestimonials() {
  const { t } = useTranslation()
  const testimonials = t('testimonials.items', { returnObjects: true }) as Array<{
    text: string
    author: string
    role: string
    company: string
    rating: number
    placeholder?: boolean
  }>

  return (
    <Section className="bg-white">
      <Container narrow>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <SectionHeader
            label={t('testimonials.label')}
            title={t('testimonials.subtitle')}
            align="start"
          />
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-5"
        >
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-2xl border border-[#E4E4E7] bg-[#FAFAF9] p-6 sm:p-7"
            >
              <div className="mb-3 flex items-center gap-1">
                {Array.from({ length: item.rating }).map((_, r) => (
                  <Star key={r} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="text-[15px] leading-[1.8] text-[#52525B] sm:text-[16px]">
                &ldquo;{item.text}&rdquo;
              </blockquote>
              <div className="mt-4 flex items-center gap-3 border-t border-[#E4E4E7] pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B5CF6]/10 text-[14px] font-bold text-[#8B5CF6]">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-[14px] font-bold text-[#0A0A0A]">
                      {item.author}
                    </h4>
                    {item.placeholder && (
                      <span className="rounded bg-[#F3F0FF] px-2 py-0.5 text-[10px] font-medium text-[#8B5CF6]">
                        Placeholder
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-[#71717A]">
                    {item.role}, {item.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  )
}

/* ───── Contact Info ───── */

function AboutContactInfo() {
  const { t } = useTranslation()

  const contactItems = [
    { icon: <Mail className="h-5 w-5" />, label: t('footer.email'), href: 'mailto:massar.digital.studio@gmail.com' },
    { icon: <Phone className="h-5 w-5" />, label: t('footer.phone'), href: 'tel:+213555123456' },
    { icon: <MapPin className="h-5 w-5" />, label: `${t('footer.location')} — ${t('contact.info.locationVal' as any) || ''}` },
    { icon: <Clock className="h-5 w-5" />, label: t('contact.info.hoursVal' as any) || 'Sunday - Thursday, 9:00 AM - 6:00 PM' },
  ]

  return (
    <Section className="border-t border-[#E4E4E7] bg-[#FAFAF9]">
      <Container narrow>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
          <h2 className="text-[13px] font-semibold tracking-[0.08em] text-[#8B5CF6] uppercase mb-6">
            Contact &amp; Location
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {contactItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-[#E4E4E7] bg-white p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F3F0FF] text-[#8B5CF6]">
                  {item.icon}
                </div>
                {'href' in item && item.href ? (
                  <a
                    href={item.href}
                    className="text-[14px] font-medium text-[#52525B] hover:text-[#8B5CF6] transition-colors underline-offset-2 hover:underline"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-[14px] font-medium text-[#52525B]">
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}

/* ───── CTA ───── */

function AboutPageCTA() {
  const { t, i18n } = useTranslation()
  const Arrow = i18n.language === 'ar' ? ArrowLeft : ArrowRight
  const about = t('aboutPage', { returnObjects: true }) as Record<string, unknown>
  const cta = about.cta as Record<string, string>

  return (
    <Section className="bg-white">
      <Container narrow>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="rounded-3xl border border-[#E4E4E7] bg-[#FAFAF9] px-8 py-14 sm:px-14 sm:py-20 lg:px-20 lg:py-24 text-center"
        >
          <h2 className="text-[22px] font-bold leading-[1.25] tracking-[-0.015em] text-[#0A0A0A] sm:text-[26px] lg:text-[32px]">
            {cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[480px] text-[15px] leading-[1.75] text-[#71717A] sm:text-[17px]">
            {cta.subtitle}
          </p>
          <p className="mt-3 text-[13px] text-[#A1A1AA]">
            {cta.micro}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 sm:mt-10">
            <Button size="lg" href="mailto:massar.digital.studio@gmail.com" onClick={() => trackEvent('cta_click', { cta_location: 'about_cta', cta_text: cta.button })}>
              {cta.button}
              <Arrow className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="secondary" onClick={() => { navigateToSection('projects'); trackEvent('cta_click', { cta_location: 'about_cta', cta_text: cta.buttonSecondary }) }}>
              {cta.buttonSecondary}
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}

/* ───── SEO ───── */

function AboutSEO() {
  const { t, i18n } = useTranslation()
  const about = t('aboutPage', { returnObjects: true }) as Record<string, unknown>
  const seo = about.seo as Record<string, string>
  const lang = i18n.language

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description: seo.description,
    foundingDate: '2022',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+213-555-123-456',
      contactType: 'customer service',
      email: 'massar.digital.studio@gmail.com',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DZ',
    },
    knowsAbout: ['Web Development', 'Mobile App Development', 'Brand Identity', 'UI/UX Design', 'AI Solutions'],
  }

  return (
    <Helmet prioritizeSeoTags>
      <html lang={lang} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={`${SITE_URL}/#/about`} />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
      <meta property="og:url" content={`${SITE_URL}/#/about`} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={lang === 'ar' ? 'ar_DZ' : lang === 'fr' ? 'fr_DZ' : 'en_US'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={`${SITE_URL}/og-image.jpg`} />

      <link rel="alternate" hrefLang="ar" href={`${SITE_URL}/#/about`} />
      <link rel="alternate" hrefLang="fr" href={`${SITE_URL}/#/about`} />
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}/#/about`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/#/about`} />

      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
    </Helmet>
  )
}

/* ───── Main About Page ───── */

export function AboutPage() {
  const { i18n } = useTranslation()

  useEffect(() => {
    window.scrollTo(0, 0)
    trackPageView('/about', 'About - Massar Digital Studio')
  }, [])

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <>
      <AboutSEO />
      <Navbar />
      <main>
        <AboutHero />
        <AboutStory />
        <AboutFounder />
        <AboutMission />
        <AboutWhy />
        <AboutProcess />
        <AboutTeam />
        <AboutAchievements />
        <AboutTechStack />
        <AboutTestimonials />
        <AboutContactInfo />
        <AboutPageCTA />
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
