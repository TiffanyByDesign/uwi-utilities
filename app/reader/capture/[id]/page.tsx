'use client'

import { useState } from 'react'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Droplets,
  AlertTriangle,
  Zap,
} from 'lucide-react'
import { ASSIGNED, readingById } from '@/components/reader/data'

const RESET_REASONS = [
  'Meter replaced',
  'Meter reset / rolled over',
  'Previous reading was wrong',
]

export default function CapturePage() {
  const params = useParams<{ id: string }>()
  const reading = readingById(params.id)
  if (!reading) notFound()

  const [value, setValue] = useState('')
  const [reason, setReason] = useState('')
  const [note, setNote] = useState('')
  const [photo, setPhoto] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const n = Number(value)
  const hasVal = value !== '' && Number.isFinite(n)
  const consumption = hasVal ? n - reading.previous : 0
  const below = hasVal && n < reading.previous
  const veryHigh = hasVal && !below && consumption > reading.typical * 3
  const canSubmit = hasVal && (!below || reason !== '')

  const Icon = reading.utility === 'electricity' ? Zap : Droplets
  const color = reading.utility === 'electricity' ? 'var(--elec)' : 'var(--water)'
  const uname = reading.utility === 'electricity' ? 'Electricity' : 'Water'

  const nextDue = ASSIGNED.find((r) => r.status === 'due' && r.id !== reading.id)

  if (submitted) {
    return (
      <div className="mx-auto max-w-md p-4 sm:p-6">
        <div
          className="rounded-2xl border p-6 text-center"
          style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
        >
          <span
            className="mx-auto grid size-14 place-items-center rounded-full"
            style={{ background: 'var(--ok-wash)' }}
          >
            <Check className="size-7" strokeWidth={2.5} style={{ color: 'var(--ok)' }} />
          </span>
          <h2 className="mt-4 font-display text-xl font-bold" style={{ color: 'var(--ink)' }}>
            Reading submitted
          </h2>
          <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
            {uname} · {reading.code} — sent to the office for review.
          </p>
          <p className="mt-3 text-2xl font-bold lnum" style={{ color: 'var(--ink)' }}>
            {n.toLocaleString()}{' '}
            <span className="text-base font-semibold" style={{ color: 'var(--muted)' }}>
              {reading.unit}
            </span>
          </p>
          <div className="mt-6 space-y-2">
            {nextDue && (
              <Link
                href={`/reader/capture/${nextDue.id}`}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-sm font-semibold text-white"
                style={{ background: 'var(--brand)' }}
              >
                Next meter
                <ArrowRight className="size-4" strokeWidth={2.25} />
              </Link>
            )}
            <Link
              href="/reader"
              className="flex w-full items-center justify-center rounded-xl border px-4 py-3 text-sm font-semibold"
              style={{ borderColor: 'var(--line)', color: 'var(--ink-2)' }}
            >
              Back to route
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md space-y-4 p-4 sm:p-6">
      <Link
        href="/reader"
        className="inline-flex items-center gap-1.5 text-sm font-semibold"
        style={{ color: 'var(--ink-2)' }}
      >
        <ArrowLeft className="size-4" strokeWidth={2} />
        Route
      </Link>

      {/* Meter header */}
      <div
        className="rounded-2xl border p-4"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
      >
        <div className="flex items-center gap-3">
          <span
            className="grid size-11 shrink-0 place-items-center rounded-xl"
            style={{ background: `color-mix(in srgb, ${color} 16%, transparent)` }}
          >
            <Icon className="size-6" strokeWidth={1.9} style={{ color }} />
          </span>
          <div className="min-w-0">
            <p className="font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
              {uname} · {reading.code}
            </p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              {reading.hall} · {reading.property}
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs lnum" style={{ color: 'var(--muted)' }}>
          Meter {reading.meterNo}
        </p>
      </div>

      {/* Previous reading */}
      <div
        className="flex items-center justify-between rounded-2xl border p-4"
        style={{ borderColor: 'var(--line)', background: 'var(--raised)' }}
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
            Previous reading
          </p>
          <p className="mt-0.5 text-xs" style={{ color: 'var(--muted)' }}>
            Read {reading.previousDate}
          </p>
        </div>
        <p className="text-lg font-bold lnum" style={{ color: 'var(--ink)' }}>
          {reading.previous.toLocaleString()}{' '}
          <span className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>
            {reading.unit}
          </span>
        </p>
      </div>

      {/* New reading input */}
      <div
        className="rounded-2xl border p-4"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
      >
        <label htmlFor="reading" className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
          New reading
        </label>
        <div
          className="mt-2 flex items-center gap-2 rounded-xl border px-4 py-3"
          style={{ borderColor: below ? 'var(--bad)' : 'var(--line-2)', background: 'var(--raised)' }}
        >
          <input
            id="reading"
            inputMode="numeric"
            autoComplete="off"
            value={value}
            onChange={(e) => setValue(e.target.value.replace(/[^\d]/g, ''))}
            placeholder="0"
            aria-invalid={below}
            className="w-full bg-transparent text-2xl font-bold outline-none lnum"
            style={{ color: 'var(--ink)' }}
          />
          <span className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>
            {reading.unit}
          </span>
        </div>

        {hasVal && !below && (
          <p className="mt-2 text-sm lnum" style={{ color: 'var(--ink-2)' }}>
            Usage this cycle:{' '}
            <strong style={{ color: 'var(--ink)' }}>
              {consumption.toLocaleString()} {reading.unit}
            </strong>
          </p>
        )}
      </div>

      {/* Below-previous guard */}
      {below && (
        <div
          className="rounded-2xl border p-4"
          style={{ borderColor: 'color-mix(in srgb, var(--bad) 40%, transparent)', background: 'var(--bad-wash)' }}
        >
          <p className="flex items-start gap-2 text-sm font-semibold" style={{ color: 'var(--bad)' }}>
            <AlertTriangle className="mt-0.5 size-4 shrink-0" strokeWidth={2.25} />
            Lower than the previous reading
          </p>
          <p className="mt-1.5 text-sm" style={{ color: 'var(--ink-2)' }}>
            A meter normally only counts up. If it was replaced or rolled over, pick a reason to
            continue — otherwise re-check the digits.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {RESET_REASONS.map((rr) => {
              const on = reason === rr
              return (
                <button
                  key={rr}
                  type="button"
                  onClick={() => setReason(on ? '' : rr)}
                  className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors"
                  style={{
                    borderColor: on ? 'var(--bad)' : 'var(--line-2)',
                    background: on ? 'var(--bad)' : 'transparent',
                    color: on ? '#fff' : 'var(--ink-2)',
                  }}
                >
                  {rr}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Unusually high — soft prompt, doesn't block */}
      {veryHigh && (
        <div
          className="rounded-2xl border p-4"
          style={{ borderColor: 'color-mix(in srgb, var(--warn) 40%, transparent)', background: 'var(--warn-wash)' }}
        >
          <p className="flex items-start gap-2 text-sm font-semibold" style={{ color: 'var(--warn)' }}>
            <AlertTriangle className="mt-0.5 size-4 shrink-0" strokeWidth={2.25} />
            Much higher than usual
          </p>
          <p className="mt-1.5 text-sm" style={{ color: 'var(--ink-2)' }}>
            This meter usually uses about {reading.typical.toLocaleString()} {reading.unit} a cycle.
            Please add a photo or a note so the office can check it.
          </p>
        </div>
      )}

      {/* Photo + note */}
      <div
        className="space-y-3 rounded-2xl border p-4"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
      >
        <button
          type="button"
          onClick={() => setPhoto((p) => !p)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed py-3 text-sm font-semibold transition-colors"
          style={{
            borderColor: photo ? 'var(--ok)' : 'var(--line-2)',
            color: photo ? 'var(--ok)' : 'var(--ink-2)',
            background: photo ? 'var(--ok-wash)' : 'transparent',
          }}
        >
          {photo ? (
            <>
              <Check className="size-4" strokeWidth={2.5} />
              Photo attached
            </>
          ) : (
            <>
              <Camera className="size-4" strokeWidth={2} />
              Add a photo
            </>
          )}
        </button>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          placeholder="Add a note (optional)"
          className="w-full resize-none rounded-xl border px-3.5 py-2.5 text-sm outline-none"
          style={{ borderColor: 'var(--line)', background: 'var(--raised)', color: 'var(--ink)' }}
        />
      </div>

      <p className="text-xs lnum" style={{ color: 'var(--muted)' }}>
        Reading date · today, 18 Jul 2026
      </p>

      <button
        type="button"
        disabled={!canSubmit}
        onClick={() => setSubmitted(true)}
        className="flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-3.5 text-sm font-semibold text-white transition-opacity"
        style={{
          background: 'var(--brand)',
          opacity: canSubmit ? 1 : 0.5,
          cursor: canSubmit ? 'pointer' : 'not-allowed',
        }}
      >
        Submit reading
      </button>
      {below && reason === '' && (
        <p className="text-center text-xs" style={{ color: 'var(--muted)' }}>
          Pick a reason above to submit a lower reading.
        </p>
      )}
    </div>
  )
}
