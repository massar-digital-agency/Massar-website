import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'

const languages = [
  { code: 'ar', label: 'العربية' },
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
] as const

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const current = languages.find((l) => l.code === i18n.language) ?? languages[0]
  const currentIndex = languages.findIndex((l) => l.code === i18n.language)

  const switchLanguage = (code: string) => {
    i18n.changeLanguage(code)
    setOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Escape') {
      setOpen(false)
      return
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      const nextIndex =
        e.key === 'ArrowDown'
          ? (currentIndex + 1) % languages.length
          : (currentIndex - 1 + languages.length) % languages.length
      switchLanguage(languages[nextIndex].code)
      return
    }

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      setOpen((prev) => !prev)
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="language-listbox"
        aria-activedescendant={open ? `language-option-${current.code}` : undefined}
        onKeyDown={handleKeyDown}
        className="flex h-9 items-center gap-1.5 rounded-lg border border-[#E4E4E7] px-3 text-[13px] font-medium text-[#52525B] transition-all duration-200 hover:border-[#A1A1AA] hover:text-[#0A0A0A]"
      >
        <Globe className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span>{current.label}</span>
      </button>

      {open && (
        <ul
          id="language-listbox"
          role="listbox"
          aria-label="Select language"
          className="absolute end-0 top-full mt-1.5 min-w-[140px] overflow-hidden rounded-xl border border-[#E4E4E7] bg-white p-1 shadow-lg shadow-black/5"
        >
          {languages.map((lang) => (
            <li key={lang.code} role="option" id={`language-option-${lang.code}`} aria-selected={i18n.language === lang.code}>
              <button
                onClick={() => switchLanguage(lang.code)}
                className={`flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
                  i18n.language === lang.code
                    ? 'bg-[#F8F7F4] text-[#0A0A0A]'
                    : 'text-[#52525B] hover:bg-[#F8F7F4] hover:text-[#0A0A0A]'
                }`}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
