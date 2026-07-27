'use client'

import { useId, useRef, useState } from 'react'

export type Point = { label: string; value: number }

const W = 600
const H = 180
const PAD_Y = 18

/**
 * Single-series area + line over time. One axis, one unit — electricity and
 * water each get their own chart rather than sharing a dishonest dual axis.
 * Hover gives a crosshair + tooltip; the latest point stays marked.
 */
export function AreaChart({ data, color, unit }: { data: Point[]; color: string; unit: string }) {
  const gradientId = useId()
  const svgRef = useRef<SVGSVGElement>(null)
  const [hover, setHover] = useState<number | null>(null)

  const max = Math.max(...data.map((d) => d.value))
  const min = Math.min(...data.map((d) => d.value))
  const span = max - min || 1

  const x = (i: number) => (i / (data.length - 1)) * W
  const y = (v: number) => PAD_Y + (1 - (v - min) / span) * (H - PAD_Y * 2)
  const yPct = (v: number) => (y(v) / H) * 100

  const line = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(d.value)}`).join(' ')
  const area = `${line} L ${W} ${H} L 0 ${H} Z`
  const last = data.length - 1

  function onMove(e: React.PointerEvent<SVGSVGElement>) {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return
    const ratio = (e.clientX - rect.left) / rect.width
    const i = Math.round(ratio * (data.length - 1))
    setHover(Math.min(data.length - 1, Math.max(0, i)))
  }

  const active = hover === null ? null : data[hover]
  const marker = hover === null ? last : hover

  return (
    <div>
      {/* Plot box — markers/tooltip position as a % of THIS box (= the SVG),
          so the axis labels below can't skew their placement. */}
      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="block h-40 w-full touch-none"
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
          role="img"
          aria-label={`${unit} over ${data.length} periods, from ${data[0].label} to ${data[last].label}`}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.24" />
              <stop offset="100%" stopColor={color} stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {[0.25, 0.5, 0.75].map((g) => (
            <line
              key={g}
              x1="0"
              x2={W}
              y1={PAD_Y + g * (H - PAD_Y * 2)}
              y2={PAD_Y + g * (H - PAD_Y * 2)}
              stroke="var(--line)"
              strokeWidth="1"
            />
          ))}

          <path
            d={area}
            fill={`url(#${gradientId})`}
            className="animate-fade-rise"
            style={{ animationDelay: '260ms' }}
          />
          <path
            d={line}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className="animate-draw-line"
            style={{ strokeDasharray: 2000, strokeDashoffset: 2000 }}
          />

          {hover !== null && (
            <line
              x1={x(hover)}
              x2={x(hover)}
              y1="0"
              y2={H}
              stroke="var(--muted)"
              strokeWidth="1"
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
            />
          )}
        </svg>

        {/* Marker + tooltip in HTML so preserveAspectRatio="none" can't stretch them.
            left is clamped so the endpoint dot isn't half-cut at the edges. */}
        <span
          className="pointer-events-none absolute z-10 block size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: `clamp(5px, ${(marker / (data.length - 1)) * 100}%, calc(100% - 5px))`,
            top: `${yPct(data[marker].value)}%`,
            background: color,
            boxShadow: '0 0 0 2px var(--surface)',
          }}
        />

        {hover !== null && active && (
          <div
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-lg border px-2.5 py-1.5 text-center"
            style={{
              left: `clamp(48px, ${(hover / (data.length - 1)) * 100}%, calc(100% - 48px))`,
              top: `calc(${yPct(active.value)}% - 10px)`,
              background: 'var(--surface)',
              borderColor: 'var(--line)',
              boxShadow: 'var(--shadow)',
            }}
          >
            <p className="text-[11px] font-medium" style={{ color: 'var(--muted)' }}>
              {active.label}
            </p>
            <p className="whitespace-nowrap text-xs font-semibold lnum" style={{ color: 'var(--ink)' }}>
              {active.value.toLocaleString()} <span style={{ color: 'var(--ink-2)' }}>{unit}</span>
            </p>
          </div>
        )}
      </div>

      <div className="mt-2.5 flex justify-between">
        {data.map((d, i) => (
          <span
            key={d.label}
            className="text-[10px] font-medium tabular-nums transition-colors"
            style={{ color: hover === i ? 'var(--ink)' : 'var(--muted)' }}
          >
            {d.label}
          </span>
        ))}
      </div>
    </div>
  )
}
