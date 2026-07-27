'use client'

import { useEffect, useState } from 'react'

/** Animates a number up to its value on mount (eased). SSR-safe — it renders the
 *  final value first, then animates once hydrated. Respects reduced-motion. */
export function CountUp({
  value,
  prefix = '',
  suffix = '',
  duration = 900,
}: {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(value * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return (
    <>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </>
  )
}
