import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTransparentImage } from '@/hooks/useTransparentImage'
import FrameASrc from '@/assets/images/logo-3d-alt.png'
import FrameBSrc from '@/assets/images/logo3d.jpg'

const FRAME_DURATION = 420
const MIN_VISIBLE = 1600

export function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [frame, setFrame] = useState(0)
  const [exiting, setExiting] = useState(false)
  const frameA = useTransparentImage(FrameASrc)
  const frameB = useTransparentImage(FrameBSrc)
  const frames = [frameA, frameB]

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % frames.length)
    }, FRAME_DURATION)

    const ready = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') resolve()
      else window.addEventListener('load', () => resolve(), { once: true })
    })

    const minTimer = new Promise<void>((resolve) => setTimeout(resolve, MIN_VISIBLE))

    Promise.all([ready, minTimer]).then(() => {
      clearInterval(interval)
      setExiting(true)
      setTimeout(onFinish, 500)
    })

    return () => clearInterval(interval)
  }, [onFinish])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-[#F8F7F4]"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            className="relative h-24 w-24 sm:h-28 sm:w-28"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={frame}
                src={frames[frame]}
                alt="Massar"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 h-full w-full object-contain"
              />
            </AnimatePresence>
          </motion.div>

          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6]"
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  delay: i * 0.18,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
