import { useTranslation } from 'react-i18next'

export function SkipNav() {
  const { t } = useTranslation()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const main = document.getElementById('main-content')
    if (main) {
      main.setAttribute('tabindex', '-1')
      main.focus()
      setTimeout(() => main.removeAttribute('tabindex'), 100)
    }
  }

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className="fixed left-4 top-2 z-[9999] -translate-y-full rounded-lg bg-[#0A0A0A] px-4 py-2.5 text-[14px] font-medium text-white shadow-lg transition-transform duration-200 focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2"
    >
      {t('skipNav.label', { defaultValue: 'Skip to main content' })}
    </a>
  )
}
