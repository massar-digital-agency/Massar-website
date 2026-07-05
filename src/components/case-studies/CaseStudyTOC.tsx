import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const sections = [
  { id: 'case-study-overview', labelKey: 'caseStudies.label' },
  { id: 'case-study-challenge', labelKey: 'Challenge' },
  { id: 'case-study-process', labelKey: 'Process' },
  { id: 'case-study-results', labelKey: 'Results' },
  { id: 'case-study-gallery', labelKey: 'Gallery' },
  { id: 'case-study-tech-stack', labelKey: 'Technologies' },
  { id: 'case-study-testimonial', labelKey: 'Testimonial' },
]

export function CaseStudyTOC() {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 400)

      const scrollPos = window.scrollY + 150
      let current = ''

      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (el && el.offsetTop <= scrollPos) {
          current = section.id
        }
      }

      if (current !== activeId) {
        setActiveId(current)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeId])

  if (!scrolled) return null

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
      aria-label="Case study sections"
    >
      <ul className="flex flex-col gap-3">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={handleClick(section.id)}
              className={`group flex items-center gap-3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:rounded-lg ${
                activeId === section.id ? 'opacity-100' : 'opacity-40 hover:opacity-70'
              }`}
              aria-current={activeId === section.id ? 'true' : undefined}
            >
              <span
                className={`block h-px w-6 transition-all duration-200 ${
                  activeId === section.id ? 'w-10 bg-[#8B5CF6]' : 'bg-[#D4D4D8] group-hover:w-8'
                }`}
                aria-hidden="true"
              />
              <span
                className={`text-[11px] font-medium tracking-wider uppercase transition-colors duration-200 ${
                  activeId === section.id ? 'text-[#8B5CF6]' : 'text-[#A1A1AA] group-hover:text-[#71717A]'
                }`}
              >
                {section.labelKey.includes('.') ? t(section.labelKey) : section.labelKey}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}
