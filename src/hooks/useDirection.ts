import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export function useDirection() {
  const { i18n } = useTranslation()
  // Layout direction is always kept LTR so the page structure (logo on the
  // left, nav order, grids, etc.) never mirrors when switching languages —
  // only the text content is translated. `isRTL` is still exposed for
  // components that need to flip an icon (e.g. an arrow) for Arabic.
  const dir = 'ltr'
  const lang = i18n.language

  useEffect(() => {
    document.documentElement.dir = dir
    document.documentElement.lang = lang
  }, [dir, lang])

  return { dir, lang, isRTL: lang === 'ar' }
}
