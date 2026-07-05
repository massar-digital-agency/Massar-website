import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const languages = [
  { code: 'ar', label: 'العربية' },
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
] as const

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const currentIndex = languages.findIndex((l) => l.code === i18n.language)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setActiveIndex(-1)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const switchLanguage = useCallback((code: string) => {
    i18n.changeLanguage(code)
    trackEvent('language_switch', { language: code })
    setOpen(false)
    setActiveIndex(-1)
    triggerRef.current?.focus()
  }, [i18n])

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Escape') {
      setOpen(false)
      setActiveIndex(-1)
      return
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!open) {
        setOpen(true)
        const idx = e.key === 'ArrowDown' ? 0 : languages.length - 1
        setActiveIndex(idx)
        return
      }
      const nextIndex =
        e.key === 'ArrowDown'
          ? (activeIndex + 1) % languages.length
          : (activeIndex - 1 + languages.length) % languages.length
      setActiveIndex(nextIndex)
      return
    }

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      if (open && activeIndex >= 0) {
        switchLanguage(languages[activeIndex].code)
      } else {
        setOpen((prev) => !prev)
        if (!open) setActiveIndex(0)
      }
    }
  }

  const handleOptionKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, code: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      switchLanguage(code)
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => { setOpen(!open); if (!open) setActiveIndex(currentIndex); else setActiveIndex(-1) }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="language-listbox"
        aria-label={t('languageSwitcher.ariaLabel', { defaultValue: 'Select language' })}
        aria-activedescendant={open && activeIndex >= 0 ? `language-option-${languages[activeIndex].code}` : undefined}
        onKeyDown={handleTriggerKeyDown}
        className="flex h-9 items-center gap-1.5 rounded-lg border border-[#E4E4E7] px-3 text-[13px] font-medium text-[#52525B] transition-all duration-200 hover:border-[#A1A1AA] hover:text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2"
      >
        <Globe className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span>{languages[currentIndex]?.label ?? ''}</span>
      </button>

      {open && (
        <ul
          id="language-listbox"
          role="listbox"
          aria-label="Select language"
          className="absolute end-0 top-full mt-1.5 min-w-[140px] overflow-hidden rounded-xl border border-[#E4E4E7] bg-white p-1 shadow-lg shadow-black/5"
        >
          {languages.map((lang, i) => (
            <li
              key={lang.code}
              id={`language-option-${lang.code}`}
              role="option"
              aria-selected={i18n.language === lang.code}
              tabIndex={-1}
              onClick={() => switchLanguage(lang.code)}
              onKeyDown={(e) => handleOptionKeyDown(e, lang.code)}
              className={`flex cursor-pointer items-center rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
                i18n.language === lang.code
                  ? 'bg-[#F8F7F4] text-[#0A0A0A]'
                  : 'text-[#52525B] hover:bg-[#F8F7F4] hover:text-[#0A0A0A]'
              } ${activeIndex === i ? 'ring-2 ring-[#8B5CF6] ring-inset' : ''}`}
            >
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
