import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { CaseStudySEO } from './CaseStudySEO'
import { CaseStudyHero } from './CaseStudyHero'
import { CaseStudyTOC } from './CaseStudyTOC'
import { CaseStudyOverview } from './CaseStudyOverview'
import { CaseStudyChallenge } from './CaseStudyChallenge'
import { CaseStudyProcess } from './CaseStudyProcess'
import { CaseStudyResults } from './CaseStudyResults'
import { CaseStudyGallery } from './CaseStudyGallery'
import { CaseStudyTechStack } from './CaseStudyTechStack'
import { CaseStudyTestimonial } from './CaseStudyTestimonial'
import { CaseStudyCTA } from './CaseStudyCTA'
import { CaseStudyNav } from './CaseStudyNav'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingContact } from '@/components/layout/FloatingContact'
import { trackPageView } from '@/lib/analytics'

const projectColors: Record<string, { bg: string; text: string }> = {
  journeya: { bg: '#ECFDF5', text: '#059669' },
  wafr: { bg: '#FEF3C7', text: '#D97706' },
  darlink: { bg: '#DBEAFE', text: '#2563EB' },
  nextgen: { bg: '#F3F0FF', text: '#8B5CF6' },
}

interface CaseStudyPageProps {
  slug: string
}

export function CaseStudyPage({ slug }: CaseStudyPageProps) {
  const { i18n } = useTranslation()
  const color = projectColors[slug] || { bg: '#F3F0FF', text: '#8B5CF6' }

  useEffect(() => {
    window.scrollTo(0, 0)
    trackPageView(`/case-studies/${slug}`, `${slug} Case Study - Massar Digital Studio`)
  }, [slug])

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <>
      <CaseStudySEO slug={slug} />
      <Navbar />
      <main>
        <CaseStudyHero slug={slug} color={color} />
        <CaseStudyTOC />
        <CaseStudyOverview slug={slug} />
        <div id="case-study-challenge">
          <CaseStudyChallenge slug={slug} />
        </div>
        <div id="case-study-process">
          <CaseStudyProcess slug={slug} />
        </div>
        <div id="case-study-results">
          <CaseStudyResults slug={slug} />
        </div>
        <div id="case-study-gallery">
          <CaseStudyGallery slug={slug} />
        </div>
        <div id="case-study-tech-stack">
          <CaseStudyTechStack slug={slug} />
        </div>
        <div id="case-study-testimonial">
          <CaseStudyTestimonial slug={slug} />
        </div>
        <CaseStudyCTA />
        <CaseStudyNav slug={slug} />
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
