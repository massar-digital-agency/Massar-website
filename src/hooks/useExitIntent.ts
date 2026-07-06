import { useState, useEffect, useCallback, useRef } from 'react'

const SESSION_KEY = 'massar_exit_intent_shown'

function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
}

function isSessionDismissed(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === 'true'
  } catch {
    return false
  }
}

function markSessionDismissed(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, 'true')
  } catch {
  }
}

export function useExitIntent(): { show: boolean; dismiss: () => void } {
  const [show, setShow] = useState(false)
  const listenerAttached = useRef(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const dismiss = useCallback(() => {
    setShow(false)
    markSessionDismissed()
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    if (isSessionDismissed() || listenerAttached.current) return

    listenerAttached.current = true
    const isOnMobile = isMobile()

    if (isOnMobile) {
      let scrollTriggered = false
      let timerTriggered = false

      const checkScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
        if (scrollHeight <= 0) return
        const percent = Math.round((window.scrollY / scrollHeight) * 100)
        if (percent >= 50 && !scrollTriggered) {
          scrollTriggered = true
          if (timerTriggered) {
            setShow(true)
          }
        }
      }

      const timer = setTimeout(() => {
        timerTriggered = true
        if (scrollTriggered) {
          setShow(true)
        }
      }, 30000)

      timeoutRef.current = timer

      window.addEventListener('scroll', checkScroll, { passive: true })

      return () => {
        window.removeEventListener('scroll', checkScroll)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
      }
    }

    let exitFired = false

    const handleMouseLeave = (e: MouseEvent) => {
      if (exitFired) return
      if (e.clientY > 0) return
      exitFired = true
      setShow(true)
    }

    document.documentElement.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return { show, dismiss }
}
