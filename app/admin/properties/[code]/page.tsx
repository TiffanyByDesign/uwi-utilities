'use client'

import { useState } from 'react'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { ArrowLeft, Check, Droplets, Repeat, UserRound, Zap } from 'lucide-react'
import { propertyByCode, type Tenancy } from '@/components/admin/properties'

export default function PropertyDetail() {
  const params = useParams<{ code: string }>()
  const p = propertyByCode(params.code)
  if (!p) notFound()

  // Editable tenancy state — the meters are NOT part of this; they stay fixed.
  const [resident, setResident] = useState<string | null>(p.resident)
  const [since, setSince] = useState<string | null>(p.since)
  const [history, setHistory] = useState<Tenancy[]>(p.history)

  const [form, setForm] = useState(false)
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [doneMsg, setDoneMsg] = useState('')

  const occupied = resident !== null
  const canSubmit = name.trim() !== '' && date.trim() !== ''

  function handover() {
    if (!canSubmit) return
    setHistory((h) => {
      const next = h.map((t) => (t.to === null ? { ...t, to: date } : t))
      return [{ resident: name.trim(), from: date, to: null }, ...next]
    })
    const wasOccupied = occupied
    setResident(name.trim())
    setSince(date)
    setDoneMsg(
      wasOccupied
        ? `Handover complete. Meters unchanged — the new tenant starts from the current readings.`
        : `Resident assigned. Meters unchanged — readings carry straight over.`,
    )
    setForm(false)
    setName('')
    setDate('')
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4 sm:p-6">
      <Link href="/admin/properties" className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--ink-2)' }}>
        <ArrowLeft className="size-4" strokeWidth={2} />
        Properties
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight" style={{ color: 'var(--ink)' }}>
            {p.hall} · {p.address}
          </h2>
          <p className="mt-1 text-sm lnum" style={{ color: 'var(--ink-2)' }}>
            {p.code} · {p.rooms} rooms
          </p>
        </div>
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={
            occupied
              ? { background: 'color-mix(in srgb, var(--ink) 8%, transparent)', color: 'var(--ink)' }
              : { background: 'var(--warn-wash)', color: 'var(--warn)' }
          }
        >
          {occupied ? 'Occupied' : 'Vacant'}
        </span>
      </div>

      {doneMsg && (
        <p
          className="flex items-center gap-2 rounded-xl border p-3 text-sm font-medium"
          style={{ borderColor: 'color-mix(in srgb, var(--ok) 40%, transparent)', background: 'var(--ok-wash)', color: 'var(--ok)' }}
        >
          <Check className="size-4" strokeWidth={2.5} />
          {doneMsg}
        </p>
      )}

      {/* Meters — stay with the property */}
      <section className="rounded-2xl border p-5" style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}>
        <h3 className="font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
          Meters
        </h3>
        <p className="mt-0.5 text-xs" style={{ color: 'var(--muted)' }}>
          Fixed to this property — they don&rsquo;t move with the resident.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <MeterRow icon={Zap} color="var(--elec)" name="Electricity" number={p.elecMeter} reading={p.elecReading} unit="kWh" />
          <MeterRow icon={Droplets} color="var(--water)" name="Water" number={p.waterMeter} reading={p.waterReading} unit="gal" />
        </div>
      </section>

      {/* Occupant + handover */}
      <section className="rounded-2xl border p-5" style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
            Current occupant
          </h3>
          {!form && (
            <button
              type="button"
              onClick={() => setForm(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold"
              style={{ borderColor: 'var(--line)', color: 'var(--ink-2)' }}
            >
              <Repeat className="size-3.5" strokeWidth={2} />
              {occupied ? 'Change occupant' : 'Assign resident'}
            </button>
          )}
        </div>

        <div className="mt-3 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl" style={{ background: occupied ? 'color-mix(in srgb, var(--accent) 14%, transparent)' : 'var(--raised)' }}>
            <UserRound className="size-5" strokeWidth={1.9} style={{ color: occupied ? 'var(--accent-strong)' : 'var(--muted)' }} />
          </span>
          <div>
            <p className="text-sm font-semibold" style={{ color: occupied ? 'var(--ink)' : 'var(--muted)' }}>
              {resident ?? 'No resident attached'}
            </p>
            {since && (
              <p className="text-xs lnum" style={{ color: 'var(--muted)' }}>
                Since {since}
              </p>
            )}
          </div>
        </div>

        {form && (
          <div className="mt-4 space-y-3 rounded-xl border p-4" style={{ borderColor: 'var(--line-2)', background: 'var(--raised)' }}>
            {occupied && (
              <p className="text-xs" style={{ color: 'var(--ink-2)' }}>
                <strong style={{ color: 'var(--ink)' }}>{resident}</strong> moves out. Handover reading:{' '}
                <span className="lnum">{p.elecReading.toLocaleString()} kWh</span> /{' '}
                <span className="lnum">{p.waterReading.toLocaleString()} gal</span> — the new tenant starts from here.
              </p>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="New resident name"
                aria-label="New resident name"
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}
              />
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Move-in date (e.g. 15 Aug 2026)"
                aria-label="Move-in date"
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handover}
                disabled={!canSubmit}
                className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold text-white transition-opacity"
                style={{ background: 'var(--brand)', opacity: canSubmit ? 1 : 0.5, cursor: canSubmit ? 'pointer' : 'not-allowed' }}
              >
                <Check className="size-4" strokeWidth={2.5} />
                Complete handover
              </button>
              <button
                type="button"
                onClick={() => setForm(false)}
                className="rounded-lg border px-3.5 py-2 text-sm font-semibold"
                style={{ borderColor: 'var(--line)', color: 'var(--ink-2)' }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Residency history */}
      <section className="rounded-2xl border p-5" style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}>
        <h3 className="font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
          Residency history
        </h3>
        <p className="mb-4 mt-0.5 text-xs" style={{ color: 'var(--muted)' }}>
          Who held the tenancy, and when — kept for billing back to the right person.
        </p>
        <ol>
          {history.map((t, i) => {
            const current = t.to === null
            return (
              <li key={`${t.resident}-${t.from}`} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="mt-1.5 size-2.5 shrink-0 rounded-full" style={{ background: current ? 'var(--ok)' : 'var(--muted)' }} />
                  {i < history.length - 1 && <span className="w-px flex-1" style={{ background: 'var(--line)' }} />}
                </div>
                <div className="pb-5">
                  <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                    {t.resident}
                    {current && (
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide" style={{ background: 'color-mix(in srgb, var(--ok) 14%, transparent)', color: 'var(--ok)' }}>
                        Current
                      </span>
                    )}
                  </p>
                  <p className="text-xs lnum" style={{ color: 'var(--muted)' }}>
                    {t.from} — {t.to ?? 'present'}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </section>
    </div>
  )
}

function MeterRow({
  icon: Icon,
  color,
  name,
  number,
  reading,
  unit,
}: {
  icon: typeof Zap
  color: string
  name: string
  number: string
  reading: number
  unit: string
}) {
  return (
    <div className="rounded-xl border p-3" style={{ borderColor: 'var(--line)', background: 'var(--raised)' }}>
      <div className="flex items-center gap-2">
        <Icon className="size-4" strokeWidth={2} style={{ color }} />
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
          {name}
        </span>
      </div>
      <p className="mt-1.5 text-sm font-bold lnum" style={{ color: 'var(--ink)' }}>
        {reading.toLocaleString()} {unit}
      </p>
      <p className="text-xs lnum" style={{ color: 'var(--muted)' }}>
        {number}
      </p>
    </div>
  )
}
