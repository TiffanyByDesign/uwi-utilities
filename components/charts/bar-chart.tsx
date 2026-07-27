'use client'

import { useState } from 'react'

export type Point = { label: string; value: number }

/**
 * Single-measure vertical bars by category (e.g. usage by site). One colour —
 * the measure's identity — with categories told apart by position and label.
 * 4px rounded data-ends on the baseline, a recessive peak track, hover tooltip.
 */
export function BarChart({ data, color, unit }: { data: Point[]; color: string; unit: string }) {
  const [hover, setHover] = useState<number | null>(null)
  const max = Math.max(...data.map((d) => d.value))

  return (
    <div>
      <div className="flex h-40 items-end gap-2">
        {data.map((d, i) => {
          const pct = (d.value / max) * 100
          const active = hover === i
          return (
            <div
              key={d.label}
              className="group relative flex h-full flex-1 cursor-default flex-col justify-end"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              {/* Recessive peak track */}
              <div
                className="absolute inset-x-0 bottom-0 top-0 mx-auto w-[62%] max-w-[40px] rounded-t-[4px]"
                style={{ background: 'color-mix(in srgb, var(--line) 55%, transparent)' }}
              />
              {/* Data mark */}
              <div
                className="animate-bar-grow relative mx-auto w-[62%] max-w-[40px] rounded-t-[4px] transition-[filter,opacity] duration-200"
                style={{
                  height: `${pct}%`,
                  background: color,
                  opacity: hover === null || active ? 1 : 0.5,
                  filter: active ? 'brightness(1.08)' : undefined,
                  animationDelay: `${i * 90}ms`,
                }}
              />

              {active && (
                <div
                  className="pointer-events-none absolute inset-x-0 -top-1 z-20 mx-auto w-max -translate-y-full rounded-lg border px-2.5 py-1.5 text-center"
                  style={{ background: 'var(--surface)', borderColor: 'var(--line)', boxShadow: 'var(--shadow)' }}
                >
                  <p className="text-[11px] font-medium" style={{ color: 'var(--muted)' }}>
                    {d.label}
                  </p>
                  <p className="whitespace-nowrap text-xs font-semibold lnum" style={{ color: 'var(--ink)' }}>
                    {d.value.toLocaleString()} <span style={{ color: 'var(--ink-2)' }}>{unit}</span>
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-2.5 flex gap-2">
        {data.map((d, i) => (
          <span
            key={d.label}
            className="flex-1 truncate text-center text-[11px] font-medium transition-colors"
            style={{ color: hover === i ? 'var(--ink)' : 'var(--muted)' }}
          >
            {d.label}
          </span>
        ))}
      </div>
    </div>
  )
}
