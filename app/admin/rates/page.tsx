'use client'

import { useState } from 'react'
import { AlertTriangle, Check, Droplets, Pencil, Zap } from 'lucide-react'
import { RATES } from '@/components/admin/rates'

type UtilityId = 'electricity' | 'water'

function initialValues() {
  const v: Record<string, string> = {}
  for (const u of ['electricity', 'water'] as UtilityId[]) {
    for (const g of RATES[u].groups) {
      for (const l of g.lines) v[`${u}.${l.key}`] = String(l.amount)
    }
  }
  return v
}

export default function RatesPage() {
  const [id, setId] = useState<UtilityId>('electricity')
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const [values, setValues] = useState<Record<string, string>>(initialValues)

  const u = RATES[id]
  const color = id === 'electricity' ? 'var(--elec)' : 'var(--water)'
  const Icon = id === 'electricity' ? Zap : Droplets

  function pick(next: UtilityId) {
    setId(next)
    setEditing(false)
    setSaved(false)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5 p-4 sm:p-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight" style={{ color: 'var(--ink)' }}>
          Rate management
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
          The charges every bill is calculated from.
        </p>
      </div>

      {/* Utility selector */}
      <div className="flex gap-2">
        {(['electricity', 'water'] as UtilityId[]).map((x) => {
          const on = id === x
          const c = x === 'electricity' ? 'var(--elec)' : 'var(--water)'
          const XIcon = x === 'electricity' ? Zap : Droplets
          return (
            <button
              key={x}
              type="button"
              onClick={() => pick(x)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-colors"
              style={{
                borderColor: on ? c : 'var(--line)',
                background: on ? `color-mix(in srgb, ${c} 10%, var(--surface))` : 'var(--surface)',
                color: 'var(--ink)',
                boxShadow: 'var(--shadow)',
              }}
            >
              <XIcon className="size-4" strokeWidth={2} style={{ color: c }} />
              {RATES[x].name}
            </button>
          )
        })}
      </div>

      {/* Rate card */}
      <section
        className="rounded-2xl border p-5"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span
              className="grid size-9 place-items-center rounded-lg"
              style={{ background: `color-mix(in srgb, ${color} 16%, transparent)` }}
            >
              <Icon className="size-5" strokeWidth={1.9} style={{ color }} />
            </span>
            <div>
              <p className="font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
                {u.name} rates
              </p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>
                {u.provider} · effective {u.effective}
              </p>
            </div>
          </div>

          {editing ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setValues(initialValues())
                  setEditing(false)
                }}
                className="rounded-lg border px-3 py-1.5 text-xs font-semibold"
                style={{ borderColor: 'var(--line)', color: 'var(--ink-2)' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false)
                  setSaved(true)
                }}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white"
                style={{ background: 'var(--ok)' }}
              >
                <Check className="size-3.5" strokeWidth={2.5} />
                Save
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setEditing(true)
                setSaved(false)
              }}
              className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold"
              style={{ borderColor: 'var(--line)', color: 'var(--ink-2)' }}
            >
              <Pencil className="size-3.5" strokeWidth={2} />
              Edit rates
            </button>
          )}
        </div>

        {saved && (
          <p
            className="mt-4 flex items-center gap-2 rounded-xl border p-3 text-sm font-medium"
            style={{ borderColor: 'color-mix(in srgb, var(--ok) 40%, transparent)', background: 'var(--ok-wash)', color: 'var(--ok)' }}
          >
            <Check className="size-4" strokeWidth={2.5} />
            Rates saved. New bills this cycle will use them.
          </p>
        )}

        {u.placeholder && (
          <p
            className="mt-4 flex items-start gap-2 rounded-xl border p-3 text-xs"
            style={{ borderColor: 'color-mix(in srgb, var(--warn) 40%, transparent)', background: 'var(--warn-wash)', color: 'var(--ink-2)' }}
          >
            <AlertTriangle className="mt-px size-3.5 shrink-0" strokeWidth={2} style={{ color: 'var(--warn)' }} />
            These water rates are placeholders — replace them with the approved NWC tariff before billing.
          </p>
        )}

        <div className="mt-5 space-y-5">
          {u.groups.map((g) => (
            <div key={g.title}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
                {g.title}
              </p>
              <div className="space-y-1.5">
                {g.lines.map((l) => {
                  const k = `${id}.${l.key}`
                  return (
                    <div
                      key={l.key}
                      className="flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5"
                      style={{ borderColor: 'var(--line)', background: 'var(--raised)' }}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                          {l.label}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--muted)' }}>
                          {l.detail}
                        </p>
                      </div>
                      {editing ? (
                        <div
                          className="flex items-center gap-1 rounded-lg border px-2.5 py-1.5"
                          style={{ borderColor: 'var(--line-2)', background: 'var(--surface)' }}
                        >
                          <span className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>
                            J$
                          </span>
                          <input
                            inputMode="decimal"
                            value={values[k] ?? ''}
                            onChange={(e) =>
                              setValues((v) => ({ ...v, [k]: e.target.value.replace(/[^\d.]/g, '') }))
                            }
                            className="w-20 bg-transparent text-right text-sm font-semibold outline-none lnum"
                            style={{ color: 'var(--ink)' }}
                            aria-label={`${l.label} rate`}
                          />
                        </div>
                      ) : (
                        <span className="shrink-0 text-sm font-bold lnum" style={{ color: 'var(--ink)' }}>
                          J${values[k]}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
