'use client'

import { useMemo, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import {
  ROLE_LABEL,
  STATUS_META,
  USERS,
  initials,
  type Role,
} from '@/components/admin/users'

const ROLE_FILTERS: ('all' | Role)[] = ['all', 'admin', 'officer', 'reader', 'housing', 'bursary']

export default function UsersPage() {
  const [role, setRole] = useState<'all' | Role>('all')
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return USERS.filter((u) => {
      const matchesRole = role === 'all' || u.role === role
      const matchesQuery = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      return matchesRole && matchesQuery
    })
  }, [role, query])

  return (
    <div className="mx-auto max-w-3xl space-y-5 p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight" style={{ color: 'var(--ink)' }}>
            Users &amp; roles
          </h2>
          <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
            Who can sign in, and what they can do.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
          style={{ background: 'var(--brand)' }}
        >
          <Plus className="size-4" strokeWidth={2.5} />
          Add user
        </button>
      </div>

      {/* Search + role filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div
          className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl border px-3.5 py-2.5"
          style={{ borderColor: 'var(--line)', background: 'var(--raised)' }}
        >
          <Search className="size-4 shrink-0" strokeWidth={2} style={{ color: 'var(--muted)' }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email…"
            aria-label="Search users"
            className="w-full min-w-0 bg-transparent text-sm outline-none"
            style={{ color: 'var(--ink)' }}
          />
        </div>
        <div
          className="flex shrink-0 items-center gap-1 overflow-x-auto rounded-xl border p-1"
          style={{ borderColor: 'var(--line)', background: 'var(--raised)' }}
        >
          {ROLE_FILTERS.map((r) => {
            const on = role === r
            return (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                aria-pressed={on}
                className="shrink-0 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors"
                style={{
                  color: on ? 'var(--ink)' : 'var(--muted)',
                  background: on ? 'var(--surface)' : 'transparent',
                  boxShadow: on ? 'var(--shadow)' : 'none',
                }}
              >
                {r === 'all' ? 'All' : ROLE_LABEL[r]}
              </button>
            )
          })}
        </div>
      </div>

      {rows.length === 0 ? (
        <p
          className="rounded-xl border border-dashed py-12 text-center text-sm"
          style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}
        >
          Nobody matches that.
        </p>
      ) : (
        <ul className="space-y-2">
          {rows.map((u) => {
            const s = STATUS_META[u.status]
            return (
              <li
                key={u.id}
                className="animate-fade-rise flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border p-3.5"
                style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
              >
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-lg text-xs font-bold"
                  style={{ background: 'color-mix(in srgb, var(--accent) 14%, transparent)', color: 'var(--accent-strong)' }}
                >
                  {initials(u.name)}
                </span>
                <div className="min-w-[10rem] flex-1">
                  <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                    {u.name}
                  </p>
                  <p className="truncate text-xs" style={{ color: 'var(--muted)' }}>
                    {u.email}
                  </p>
                </div>
                <span
                  className="rounded-full border px-2.5 py-1 text-xs font-semibold"
                  style={{ borderColor: 'var(--line)', color: 'var(--ink-2)' }}
                >
                  {ROLE_LABEL[u.role]}
                </span>
                <span
                  className="rounded-full px-2.5 py-1 text-xs font-semibold"
                  style={{ background: s.wash, color: s.color }}
                >
                  {s.label}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
