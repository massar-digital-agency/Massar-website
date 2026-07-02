import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { LanguageSwitcher } from './LanguageSwitcher'
import { HoverSlideText } from '@/components/ui/HoverSlideText'
import Logo from '@/assets/images/Logo.svg'

const navLinks = ['services', 'projects', 'about', 'contact'] as const

export function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

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
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && mobileOpen) {
      handleCloseMenu()
    }
  }

  useEffect(() => {
    if (mobileOpen) {
      closeButtonRef.current?.focus()
    }
  }, [mobileOpen])

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
          <a href="#" className="flex items-center gap-2.5 shrink-0" aria-label="Massar Digital Studio">
            <img src={Logo} alt="" className="h-8 w-auto" />
            <span className="text-[17px] font-bold tracking-tight text-[#0A0A0A]">Massar</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="group text-[14px] font-medium text-[#71717A]"
              >
                <HoverSlideText>{t(`nav.${key}`)}</HoverSlideText>
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <Button size="sm" href="#contact">
              {t('nav.cta')}
            </Button>
          </div>

          <button
            ref={closeButtonRef}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#0A0A0A] transition-colors hover:bg-[#F4F4F5] md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu-panel"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            onKeyDown={handleKeyDown}
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
                    className="rounded-xl px-4 py-3 text-[15px] font-medium text-[#52525B] transition-colors hover:bg-[#F4F4F5] hover:text-[#0A0A0A]"
                    onClick={handleCloseMenu}
                  >
                    {t(`nav.${key}`)}
                  </a>
                ))}
                <div className="mt-4 flex items-center gap-3 border-t border-[#E4E4E7] pt-5">
                  <LanguageSwitcher />
                  <Button size="sm" href="#contact" className="flex-1" onClick={handleCloseMenu}>
                    {t('nav.cta')}
                  </Button>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
