'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Building2, ChevronDown, Mail, Search } from 'lucide-react'
import { BIZ_UNITS, money } from '@/components/admin/business-units'

export default function BusinessUnitsPage() {
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return BIZ_UNITS.filter(
      (u) => !q || u.name.toLowerCase().includes(q) || u.accountNo.toLowerCase().includes(q),
    )
  }, [query])

  const overdue = BIZ_UNITS.filter((u) => u.status === 'overdue').length

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4 sm:p-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--ink)' }}>
          Business Units
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
          Commercial accounts on campus — {BIZ_UNITS.length} units, {overdue} overdue.
        </p>
      </div>

      <div
        className="flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5"
        style={{ borderColor: 'var(--line)', background: 'var(--raised)' }}
      >
        <Search className="size-4 shrink-0" strokeWidth={2} style={{ color: 'var(--muted)' }} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search business units by name or account…"
          aria-label="Search business units"
          className="w-full min-w-0 bg-transparent text-sm outline-none"
          style={{ color: 'var(--ink)' }}
        />
      </div>

      {rows.length === 0 ? (
        <p
          className="rounded-xl border border-dashed py-12 text-center text-sm"
          style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}
        >
          No business units match that.
        </p>
      ) : (
        <ul className="space-y-2">
          {rows.map((u) => {
            const open = openId === u.id
            const overdueUnit = u.status === 'overdue'
            return (
              <li
                key={u.id}
                className="animate-fade-rise overflow-hidden rounded-2xl border"
                style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : u.id)}
                  aria-expanded={open}
                  className="flex w-full flex-wrap items-center gap-x-4 gap-y-2 p-3.5 text-left"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl" style={{ background: 'var(--accent-wash)' }}>
                    <Building2 className="size-5" strokeWidth={1.9} style={{ color: 'var(--accent-strong)' }} />
                  </span>
                  <div className="min-w-[10rem] flex-1">
                    <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                      {u.name}
                    </p>
                    <p className="text-xs lnum" style={{ color: 'var(--muted)' }}>
                      {u.accountNo} · {u.sites} {u.sites === 1 ? 'site' : 'sites'}
                    </p>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{
                      background: overdueUnit ? 'var(--bad-wash)' : 'var(--ok-wash)',
                      color: overdueUnit ? 'var(--bad)' : 'var(--ok)',
                    }}
                  >
                    {overdueUnit ? 'Overdue' : 'Current'}
                  </span>
                  <ChevronDown
                    className="size-4 shrink-0 transition-transform duration-200"
                    strokeWidth={2}
                    style={{ color: 'var(--muted)', transform: open ? 'rotate(180deg)' : 'none' }}
                  />
                </button>

                {open && (
                  <div className="border-t px-4 py-4" style={{ borderColor: 'var(--line)' }}>
                    <div className="grid grid-cols-2 gap-3">
                      <Cell label="This cycle" value={money(u.total)} />
                      <Cell label="Outstanding" value={money(u.outstanding)} strong={overdueUnit} />
                    </div>
                    <p className="mt-3 flex items-center gap-1.5 text-xs" style={{ color: 'var(--ink-2)' }}>
                      <Mail className="size-3.5 shrink-0" strokeWidth={2} />
                      {u.contact}
                    </p>
                    {u.portal && (
                      <Link
                        href={u.portal}
                        className="group mt-3 inline-flex items-center gap-1.5 text-xs font-semibold"
                        style={{ color: 'var(--accent-strong)' }}
                      >
                        Open their portal view
                        <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.25} />
                      </Link>
                    )}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function Cell({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="rounded-xl border p-3" style={{ borderColor: 'var(--line)', background: 'var(--raised)' }}>
      <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
        {label}
      </p>
      <p className="mt-1 text-lg font-bold lnum" style={{ color: strong ? 'var(--bad)' : 'var(--ink)' }}>
        {value}
      </p>
    </div>
  )
}
