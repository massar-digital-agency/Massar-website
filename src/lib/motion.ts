import {
  createElement,
  forwardRef,
  Fragment,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'

type FM = typeof import('framer-motion')

let _mod: FM | null = null

const _promise = import('framer-motion').then((m) => {
  _mod = m as FM
})

function useFramerReady(): boolean {
  const [, rerender] = useReducer((x: number) => x + 1, 0)
  const mounted = useRef(true)

  useEffect(() => {
    if (!_mod) {
      _promise.then(() => {
        if (mounted.current) rerender()
      })
    }
    return () => {
      mounted.current = false
    }
  }, [])

  return !!_mod
}

/* ------------------------------------------------------------------ */
/*  motion proxy                                                      */
/* ------------------------------------------------------------------ */

const _cache = new Map<string, ReturnType<typeof forwardRef>>()

export const motion = new Proxy({} as FM['motion'], {
  get(_, tag: string | symbol) {
    if (typeof tag === 'symbol') return
    if (!_cache.has(tag)) {
      _cache.set(
        tag,
        forwardRef(function Motion(props: Record<string, unknown>, ref) {
          const ready = useFramerReady()

          if (_mod) {
            const RealComp = _mod.motion[tag as keyof FM['motion']] as any
            return createElement(RealComp, { ...props, ref })
          }

          const {
            initial: _i,
            animate: _a,
            exit: _e,
            variants: _v,
            layout: _l,
            transition: _t,
            whileInView: _wiv,
            whileHover: _wh,
            whileTap: _wt,
            onAnimationStart: _oas,
            onAnimationComplete: _oac,
            viewport: _vp,
            layoutId: _li,
            ...htmlProps
          } = props

          return createElement(tag as string, { ...htmlProps, ref })
        }),
      )
    }
    return _cache.get(tag)
  },
})

/* ------------------------------------------------------------------ */
/*  AnimatePresence                                                    */
/* ------------------------------------------------------------------ */

export function AnimatePresence(props: Record<string, unknown>) {
  const ready = useFramerReady()
  const Comp = ready ? (_mod!.AnimatePresence as any) : Fragment
  return createElement(Comp, ready ? props : undefined, props.children)
}

/* ------------------------------------------------------------------ */
/*  useReducedMotion                                                   */
/* ------------------------------------------------------------------ */

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}

/* ------------------------------------------------------------------ */
/*  Re-exported types                                                  */
/* ------------------------------------------------------------------ */

export type { Variants } from 'framer-motion'
