'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Droplets, Zap } from 'lucide-react'
import { FLAG, REVIEWS, type ReviewItem } from '@/components/admin/data'

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'flagged', label: 'Needs a look' },
  { id: 'routine', label: 'Routine' },
] as const
type Tab = (typeof TABS)[number]['id']

export default function ReviewsQueue() {
  const [tab, setTab] = useState<Tab>('all')

  const rows = REVIEWS.filter((r) =>
    tab === 'all' ? true : tab === 'flagged' ? r.flag !== 'none' : r.flag === 'none',
  )

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4 sm:p-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight" style={{ color: 'var(--ink)' }}>
          Reviews
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
          Approve readings before they can be billed.
        </p>
      </div>

      <div className="flex gap-1 rounded-xl border p-1" style={{ borderColor: 'var(--line)', background: 'var(--raised)' }}>
        {TABS.map((t) => {
          const on = tab === t.id
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              aria-pressed={on}
              className="flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
              style={{
                background: on ? 'var(--surface)' : 'transparent',
                color: on ? 'var(--ink)' : 'var(--muted)',
                boxShadow: on ? 'var(--shadow)' : 'none',
              }}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      {rows.length === 0 ? (
        <p
          className="rounded-xl border border-dashed py-12 text-center text-sm"
          style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}
        >
          Nothing here.
        </p>
      ) : (
        <ul className="space-y-2">
          {rows.map((r) => (
            <Row key={r.id} r={r} />
          ))}
        </ul>
      )}
    </div>
  )
}

function Row({ r }: { r: ReviewItem }) {
  const Icon = r.utility === 'electricity' ? Zap : Droplets
  const color = r.utility === 'electricity' ? 'var(--elec)' : 'var(--water)'
  const uname = r.utility === 'electricity' ? 'Electricity' : 'Water'
  const f = FLAG[r.flag]

  return (
    <li>
      <Link
        href={`/admin/reviews/${r.id}`}
        className="animate-fade-rise flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border p-3.5 transition-transform duration-200 hover:-translate-y-0.5"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
      >
        <span
          className="grid size-10 shrink-0 place-items-center rounded-xl"
          style={{ background: `color-mix(in srgb, ${color} 16%, transparent)` }}
        >
          <Icon className="size-5" strokeWidth={1.9} style={{ color }} />
        </span>
        <div className="min-w-[9rem] flex-1">
          <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
            {r.code} · {uname}
          </p>
          <p className="text-xs lnum" style={{ color: 'var(--muted)' }}>
            {r.hall} · {r.property}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold lnum" style={{ color: 'var(--ink)' }}>
            {r.submitted.toLocaleString()} {r.unit}
          </p>
          <p className="text-xs lnum" style={{ color: 'var(--muted)' }}>
            by {r.capturedBy}
          </p>
        </div>
        <span
          className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold"
          style={{ background: f.wash, color: f.color }}
        >
          {f.label}
        </span>
        <ChevronRight className="size-4 shrink-0" strokeWidth={2} style={{ color: 'var(--muted)' }} />
      </Link>
    </li>
  )
}
