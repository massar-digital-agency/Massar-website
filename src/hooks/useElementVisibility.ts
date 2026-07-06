import { useEffect, useRef } from 'react'
import { trackEvent } from '@/lib/analytics'

export function useElementVisibility(
  elementId: string,
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>
): void {
  const tracked = useRef(false)

  useEffect(() => {
    tracked.current = false
    const el = document.getElementById(elementId)
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !tracked.current) {
            tracked.current = true
            trackEvent(eventName, { element_id: elementId, ...params })
            observer.disconnect()
          }
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [elementId, eventName, params])
}
