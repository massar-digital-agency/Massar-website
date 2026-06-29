import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export function useDirection() {
  const { i18n } = useTranslation()
  const dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
  const lang = i18n.language

  useEffect(() => {
    document.documentElement.dir = dir
    document.documentElement.lang = lang
  }, [dir, lang])

  return { dir, lang, isRTL: dir === 'rtl' }
}
