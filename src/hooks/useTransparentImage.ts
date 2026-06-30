import { useEffect, useState } from 'react'

const cache = new Map<string, string>()

function stripWhiteBackground(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) return reject(new Error('Canvas not supported'))

      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      const threshold = 235
      const feather = 30

      for (let i = 0; i < data.length; i += 4) {
        const min = Math.min(data[i], data[i + 1], data[i + 2])
        if (min >= threshold) {
          data[i + 3] = 0
        } else if (min >= threshold - feather) {
          data[i + 3] = Math.round((data[i + 3] * (threshold - min)) / feather)
        }
      }

      ctx.putImageData(imageData, 0, 0)
      resolve(canvas.toDataURL('image/png'))
    }
    img.onerror = reject
    img.src = src
  })
}

// Loads a raster image (png/jpg) that has a flat white background baked
// into its pixels and returns a data URL with that background made
// transparent, so it composites cleanly over any page background.
export function useTransparentImage(src: string) {
  const [output, setOutput] = useState(() => cache.get(src) ?? src)

  useEffect(() => {
    const cached = cache.get(src)
    if (cached) {
      setOutput(cached)
      return
    }

    let cancelled = false
    stripWhiteBackground(src)
      .then((url) => {
        if (cancelled) return
        cache.set(src, url)
        setOutput(url)
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [src])

  return output
}
