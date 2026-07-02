import { useState, useEffect } from 'react'
import { useDirection } from '@/hooks/useDirection'
import { SEOHead } from '@/components/layout/SEOHead'
import { StructuredData } from '@/components/layout/StructuredData'
import { LoadingScreen } from '@/components/layout/LoadingScreen'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingContact } from '@/components/layout/FloatingContact'
import { Hero } from '@/components/sections/Hero'
import { TrustedBy } from '@/components/sections/TrustedBy'
import { Services } from '@/components/sections/Services'
import { WhyUs } from '@/components/sections/WhyUs'
import { Process } from '@/components/sections/Process'
import { Projects } from '@/components/sections/Projects'
import { Pricing } from '@/components/sections/Pricing'
import { Testimonials } from '@/components/sections/Testimonials'
import { Results } from '@/components/sections/Results'
import { FAQ } from '@/components/sections/FAQ'
import { Contact } from '@/components/sections/Contact'
import { CaseStudyPage } from '@/components/case-studies/CaseStudyPage'
import { getActiveCaseStudySlug } from '@/lib/navigate'

const validSlugs = ['journeya', 'wafr', 'darlink', 'nextgen']

export default function App() {
  useDirection()
  const [loading, setLoading] = useState(true)
  const [activeCaseStudy, setActiveCaseStudy] = useState<string | null>(null)

  useEffect(() => {
    const handleHashChange = () => {
      const slug = getActiveCaseStudySlug()
      if (slug && validSlugs.includes(slug)) {
        setActiveCaseStudy(slug)
      } else {
        setActiveCaseStudy(null)
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (activeCaseStudy) {
    return <CaseStudyPage key={activeCaseStudy} slug={activeCaseStudy} />
  }

  return (
    <>
      <SEOHead />
      <StructuredData />
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Services />
        <WhyUs />
        <Process />
        <Testimonials />
        <Results />
        <Projects />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
