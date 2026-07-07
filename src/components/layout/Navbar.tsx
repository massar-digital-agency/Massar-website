import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { LanguageSwitcher } from './LanguageSwitcher'
import { HoverSlideText } from '@/components/ui/HoverSlideText'
import { navigateToSection, navigateHome } from '@/lib/navigate'
import { trackEvent } from '@/lib/analytics'
import Logo from '@/assets/images/Logo.svg'

const navLinks = ['services', 'about', 'projects', 'pricing', 'faq', 'contact'] as const

export function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleCloseMenu = useCallback(() => {
    setMobileOpen(false)
    hamburgerRef.current?.focus()
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      hamburgerRef.current?.focus()
    }
  }, [mobileOpen])

  const handleMobileMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCloseMenu()
      return
    }
    if (e.key === 'Tab') {
      const menu = mobileMenuRef.current
      if (!menu) return
      const focusable = menu.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
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
    }
  }

  const handleNavClick = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    handleCloseMenu()
    trackEvent('nav_click', { nav_section: sectionId, nav_label: t(`nav.${sectionId}`) })
    navigateToSection(sectionId)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F8F7F4]/90 backdrop-blur-xl border-b border-[#E4E4E7]/50 shadow-sm shadow-black/[0.02]'
          : 'bg-transparent'
      }`}
    >
      <Container>
        <nav className="flex h-[72px] items-center justify-between gap-8" aria-label="Main navigation">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); handleCloseMenu(); navigateToSection('hero'); trackEvent('logo_click') }}
            className="flex items-center gap-2.5 shrink-0"
            aria-label="Massar Digital Studio — Home"
          >
            <img src={Logo} alt="Massar Digital Studio" className="h-8 w-auto" />
            <span className="text-[17px] font-bold tracking-tight text-[#0A0A0A]">Massar</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                onClick={handleNavClick(key)}
                className="group text-[14px] font-medium text-[#71717A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:rounded"
              >
                <HoverSlideText>{t(`nav.${key}`)}</HoverSlideText>
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <div className="flex flex-col items-end">
              <Button size="sm" href="#contact" onClick={() => trackEvent('cta_click', { cta_location: 'navbar', cta_text: t('nav.cta') })}>
                {t('nav.cta')}
              </Button>
              <span className="mt-1 text-[10px] text-[#A1A1AA] whitespace-nowrap">
                {t('nav.ctaMicro')}
              </span>
            </div>
          </div>

          <button
            ref={hamburgerRef}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#0A0A0A] transition-colors hover:bg-[#F4F4F5] md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu-panel"
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu-panel"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            onKeyDown={handleMobileMenuKeyDown}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-[#E4E4E7] bg-[#F8F7F4] md:hidden"
          >
            <Container className="py-4 pb-6">
              <div className="flex flex-col gap-1">
                {navLinks.map((key) => (
                  <a
                    key={key}
                    href={`#${key}`}
                    onClick={handleNavClick(key)}
                    className="rounded-xl px-4 py-3 text-[15px] font-medium text-[#52525B] transition-colors hover:bg-[#F4F4F5] hover:text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-inset"
                  >
                    {t(`nav.${key}`)}
                  </a>
                ))}
                <div className="mt-4 flex items-center gap-3 border-t border-[#E4E4E7] pt-5">
                  <LanguageSwitcher />
                  <div className="flex-1">
                    <Button size="sm" href="#contact" className="w-full justify-center" onClick={() => { handleCloseMenu(); trackEvent('cta_click', { cta_location: 'navbar_mobile', cta_text: t('nav.cta') }) }}>
                      {t('nav.cta')}
                    </Button>
                    <span className="mt-1 block text-center text-[10px] text-[#A1A1AA]">
                      {t('nav.ctaMicro')}
                    </span>
                  </div>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
