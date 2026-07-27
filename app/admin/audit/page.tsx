'use client'

import { useState } from 'react'
import { AUDIT, KIND, initials, type AuditKind } from '@/components/admin/audit'

const FILTERS: ('all' | AuditKind)[] = ['all', 'reading', 'bill', 'rate', 'user', 'cycle']
const FILTER_LABEL: Record<'all' | AuditKind, string> = {
  all: 'All',
  reading: 'Readings',
  bill: 'Bills',
  rate: 'Rates',
  user: 'Users',
  cycle: 'Cycles',
}

export default function AuditLog() {
  const [filter, setFilter] = useState<'all' | AuditKind>('all')
  const rows = AUDIT.filter((a) => filter === 'all' || a.kind === filter)

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4 sm:p-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--ink)' }}>
          Audit log
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
          Every change in the system, who made it, and when.
        </p>
      </div>

      <div
        className="flex gap-1 overflow-x-auto rounded-xl border p-1"
        style={{ borderColor: 'var(--line)', background: 'var(--raised)' }}
      >
        {FILTERS.map((f) => {
          const on = filter === f
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={on}
              className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
              style={{
                color: on ? 'var(--ink)' : 'var(--muted)',
                background: on ? 'var(--surface)' : 'transparent',
                boxShadow: on ? 'var(--shadow)' : 'none',
              }}
            >
              {FILTER_LABEL[f]}
            </button>
          )
        })}
      </div>

      <ul className="space-y-2">
        {rows.map((a) => {
          const k = KIND[a.kind]
          return (
            <li
              key={a.id}
              className="animate-fade-rise flex flex-wrap items-center gap-x-4 gap-y-1 rounded-2xl border p-3.5"
              style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
            >
              <span
                className="grid size-9 shrink-0 place-items-center rounded-lg text-xs font-bold"
                style={{ background: 'color-mix(in srgb, var(--accent) 14%, transparent)', color: 'var(--accent-strong)' }}
              >
                {initials(a.actor)}
              </span>
              <p className="min-w-[12rem] flex-1 text-sm" style={{ color: 'var(--ink-2)' }}>
                <span className="font-semibold" style={{ color: 'var(--ink)' }}>
                  {a.actor}
                </span>{' '}
                {a.action}{' '}
                <span className="font-semibold" style={{ color: 'var(--ink)' }}>
                  {a.target}
                </span>
              </p>
              <span
                className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                style={{ background: `color-mix(in srgb, ${k.color} 14%, transparent)`, color: k.color }}
              >
                {k.label}
              </span>
              <span className="shrink-0 text-xs lnum" style={{ color: 'var(--muted)' }}>
                {a.when}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
