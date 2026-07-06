import { trackEvent } from '@/lib/analytics'

type Variant = 'A' | 'B'

interface ABTestConfig {
  testName: string
  variants: [Variant, Variant]
  weights?: [number, number]
}

const STORAGE_PREFIX = 'ab_test_'

function getStoredVariant(testName: string): Variant | null {
  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}${testName}`)
    if (stored === 'A' || stored === 'B') return stored
  } catch {
    return null
  }
  return null
}

function assignVariant(testName: string, weights: [number, number] = [0.5, 0.5]): Variant {
  const roll = Math.random()
  const variant: Variant = roll < weights[0] ? 'A' : 'B'
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${testName}`, variant)
  } catch {
  }
  return variant
}

export function useABTest(
  testName: string,
  config?: Partial<ABTestConfig>
): { variant: Variant; trackEvent: (eventName: string, params?: Record<string, string | number | boolean | undefined>) => void } {
  const weights = config?.weights ?? [0.5, 0.5]

  let variant = getStoredVariant(testName)
  if (!variant) {
    variant = assignVariant(testName, weights)
    trackEvent('ab_test_assignment', {
      test_name: testName,
      variant,
    })
  }

  const trackABEvent = (
    eventName: string,
    params?: Record<string, string | number | boolean | undefined>
  ) => {
    trackEvent(eventName, {
      ...params,
      test_name: testName,
      variant,
    })
  }

  return { variant, trackEvent: trackABEvent }
}
