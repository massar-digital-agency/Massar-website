import { useEffect, useRef } from 'react'
import { trackEvent } from '@/lib/analytics'

const DEPTHS = [25, 50, 75, 100] as const

export function useScrollDepth(): void {
  const tracked = useRef<Set<number>>(new Set())

  useEffect(() => {
    tracked.current.clear()
    const handler = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return

      const percent = Math.round((window.scrollY / scrollHeight) * 100)

      for (const depth of DEPTHS) {
        if (percent >= depth && !tracked.current.has(depth)) {
          tracked.current.add(depth)
          trackEvent('scroll_depth', { depth })
        }
      }
    }

    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
}
