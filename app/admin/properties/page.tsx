'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Droplets, Info, Search, Zap } from 'lucide-react'
import { PROPERTIES } from '@/components/admin/properties'

export default function PropertiesPage() {
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PROPERTIES.filter(
      (p) =>
        !q ||
        p.code.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.hall.toLowerCase().includes(q) ||
        (p.resident?.toLowerCase().includes(q) ?? false),
    )
  }, [query])

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4 sm:p-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--ink)' }}>
          Properties
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
          Every house, its meters, and who lives there.
        </p>
      </div>

      <div
        className="flex items-start gap-2 rounded-xl border p-3 text-xs"
        style={{ borderColor: 'var(--line)', background: 'var(--accent-wash)', color: 'var(--ink-2)' }}
      >
        <Info className="mt-px size-3.5 shrink-0" strokeWidth={2} style={{ color: 'var(--accent-strong)' }} />
        <span>
          Meters belong to the <strong style={{ color: 'var(--ink)' }}>property</strong>, not the resident — when
          someone moves, the meters stay and the next reading is the handover baseline.
        </span>
      </div>

      <div
        className="flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5"
        style={{ borderColor: 'var(--line)', background: 'var(--raised)' }}
      >
        <Search className="size-4 shrink-0" strokeWidth={2} style={{ color: 'var(--muted)' }} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by code, address, hall or resident…"
          aria-label="Search properties"
          className="w-full min-w-0 bg-transparent text-sm outline-none"
          style={{ color: 'var(--ink)' }}
        />
      </div>

      {rows.length === 0 ? (
        <p
          className="rounded-xl border border-dashed py-12 text-center text-sm"
          style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}
        >
          Nothing matches that.
        </p>
      ) : (
        <ul className="space-y-2">
          {rows.map((p) => {
            const occ = p.occupancy === 'occupied'
            return (
              <li key={p.code}>
                <Link
                  href={`/admin/properties/${p.code}`}
                  className="animate-fade-rise flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border p-3.5 transition-transform duration-200 hover:-translate-y-0.5"
                  style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
                >
                  <div className="min-w-[10rem] flex-1">
                    <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                      {p.hall} · {p.address}
                    </p>
                    <p className="text-xs lnum" style={{ color: 'var(--muted)' }}>
                      {p.code} · {occ ? p.resident : 'Vacant'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2" style={{ color: 'var(--muted)' }}>
                    <Zap className="size-3.5" strokeWidth={2} style={{ color: 'var(--elec)' }} />
                    <Droplets className="size-3.5" strokeWidth={2} style={{ color: 'var(--water)' }} />
                  </div>
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={
                      occ
                        ? { background: 'color-mix(in srgb, var(--ink) 8%, transparent)', color: 'var(--ink)' }
                        : { background: 'var(--warn-wash)', color: 'var(--warn)' }
                    }
                  >
                    {occ ? 'Occupied' : 'Vacant'}
                  </span>
                  <ArrowRight className="size-4 shrink-0" strokeWidth={2} style={{ color: 'var(--muted)' }} />
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
