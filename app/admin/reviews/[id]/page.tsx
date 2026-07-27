'use client'

import { useState } from 'react'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import {
  AlertTriangle,
  ArrowLeft,
  Camera,
  Check,
  Droplets,
  RotateCcw,
  X,
  Zap,
} from 'lucide-react'
import { FLAG, reviewById } from '@/components/admin/data'

type Decision = 'approved' | 'correction' | 'rejected'

const OUTCOME: Record<Decision, { title: string; body: (by: string) => string; color: string; wash: string; icon: typeof Check }> = {
  approved: {
    title: 'Reading approved',
    body: () => 'Moved to billing for this cycle.',
    color: 'var(--ok)',
    wash: 'var(--ok-wash)',
    icon: Check,
  },
  correction: {
    title: 'Sent back for correction',
    body: (by) => `Returned to ${by} to re-read the meter.`,
    color: 'var(--warn)',
    wash: 'var(--warn-wash)',
    icon: RotateCcw,
  },
  rejected: {
    title: 'Reading rejected',
    body: () => 'Kept out of billing — it will not go on a bill.',
    color: 'var(--bad)',
    wash: 'var(--bad-wash)',
    icon: X,
  },
}

export default function ReviewDetail() {
  const params = useParams<{ id: string }>()
  const r = reviewById(params.id)
  if (!r) notFound()

  const [decision, setDecision] = useState<Decision | null>(null)
  const [comment, setComment] = useState('')

  const Icon = r.utility === 'electricity' ? Zap : Droplets
  const color = r.utility === 'electricity' ? 'var(--elec)' : 'var(--water)'
  const uname = r.utility === 'electricity' ? 'Electricity' : 'Water'
  const f = FLAG[r.flag]
  const consumption = r.flag === 'below' ? null : r.submitted - r.previous

  if (decision) {
    const o = OUTCOME[decision]
    const OIcon = o.icon
    return (
      <div className="mx-auto max-w-lg p-4 sm:p-6">
        <div
          className="rounded-2xl border p-6 text-center"
          style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
        >
          <span className="mx-auto grid size-14 place-items-center rounded-full" style={{ background: o.wash }}>
            <OIcon className="size-7" strokeWidth={2.5} style={{ color: o.color }} />
          </span>
          <h2 className="mt-4 font-display text-xl font-bold" style={{ color: 'var(--ink)' }}>
            {o.title}
          </h2>
          <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
            {r.code} · {uname} — {o.body(r.capturedBy)}
          </p>
          <Link
            href="/admin/reviews"
            className="mt-6 inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white"
            style={{ background: 'var(--brand)' }}
          >
            Back to queue
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg space-y-4 p-4 sm:p-6">
      <Link href="/admin/reviews" className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--ink-2)' }}>
        <ArrowLeft className="size-4" strokeWidth={2} />
        Reviews
      </Link>

      {/* Meter header */}
      <div className="rounded-2xl border p-4" style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}>
        <div className="flex items-center gap-3">
          <span
            className="grid size-11 shrink-0 place-items-center rounded-xl"
            style={{ background: `color-mix(in srgb, ${color} 16%, transparent)` }}
          >
            <Icon className="size-6" strokeWidth={1.9} style={{ color }} />
          </span>
          <div className="min-w-0">
            <p className="font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
              {uname} · {r.code}
            </p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              {r.hall} · {r.property}
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs lnum" style={{ color: 'var(--muted)' }}>
          Meter {r.meterNo} · submitted by {r.capturedBy} on {r.capturedOn}
        </p>
      </div>

      {/* Why it's here */}
      {r.flag !== 'none' && (
        <div className="rounded-2xl border p-4" style={{ borderColor: `color-mix(in srgb, ${f.color} 40%, transparent)`, background: f.wash }}>
          <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: f.color }}>
            <AlertTriangle className="size-4 shrink-0" strokeWidth={2.25} />
            {f.label}
          </p>
          <p className="mt-1.5 text-sm" style={{ color: 'var(--ink-2)' }}>
            {f.note}
          </p>
          {r.reason && (
            <p className="mt-2 text-sm" style={{ color: 'var(--ink-2)' }}>
              Reader&rsquo;s reason: <strong style={{ color: 'var(--ink)' }}>{r.reason}</strong>
            </p>
          )}
        </div>
      )}

      {/* The reading */}
      <div className="rounded-2xl border p-4" style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}>
        <dl className="grid grid-cols-3 gap-3 text-center">
          <Cell label="Previous" value={`${r.previous.toLocaleString()}`} unit={r.unit} />
          <Cell label="Submitted" value={`${r.submitted.toLocaleString()}`} unit={r.unit} strong />
          <Cell label="Usage" value={consumption === null ? '—' : consumption.toLocaleString()} unit={consumption === null ? '' : r.unit} />
        </dl>
        <p className="mt-3 border-t pt-3 text-xs" style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}>
          Typical for this meter: {r.typical.toLocaleString()} {r.unit} a cycle.
        </p>

        {(r.note || r.photo) && (
          <div className="mt-3 space-y-2">
            {r.note && (
              <p className="rounded-xl border p-3 text-sm italic" style={{ borderColor: 'var(--line)', background: 'var(--raised)', color: 'var(--ink-2)' }}>
                &ldquo;{r.note}&rdquo;
              </p>
            )}
            {r.photo && (
              <p className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--ok)' }}>
                <Camera className="size-4" strokeWidth={2} />
                Photo attached
              </p>
            )}
          </div>
        )}
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={2}
        placeholder="Add a comment (kept on the audit trail)"
        className="w-full resize-none rounded-xl border px-3.5 py-2.5 text-sm outline-none"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}
      />

      {/* Actions */}
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => setDecision('rejected')}
          className="flex items-center justify-center gap-1.5 rounded-xl border py-3 text-sm font-semibold"
          style={{ borderColor: 'color-mix(in srgb, var(--bad) 45%, transparent)', color: 'var(--bad)' }}
        >
          <X className="size-4" strokeWidth={2.25} />
          Reject
        </button>
        <button
          type="button"
          onClick={() => setDecision('correction')}
          className="flex items-center justify-center gap-1.5 rounded-xl border py-3 text-sm font-semibold"
          style={{ borderColor: 'color-mix(in srgb, var(--warn) 45%, transparent)', color: 'var(--warn)' }}
        >
          <RotateCcw className="size-4" strokeWidth={2.25} />
          Correct
        </button>
        <button
          type="button"
          onClick={() => setDecision('approved')}
          className="flex items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-semibold text-white"
          style={{ background: 'var(--ok)' }}
        >
          <Check className="size-4" strokeWidth={2.5} />
          Approve
        </button>
      </div>
    </div>
  )
}

function Cell({ label, value, unit, strong }: { label: string; value: string; unit: string; strong?: boolean }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
        {label}
      </dt>
      <dd className="mt-1 text-lg font-bold lnum" style={{ color: strong ? 'var(--ink)' : 'var(--ink-2)' }}>
        {value}
        {unit && <span className="ml-0.5 text-xs font-semibold" style={{ color: 'var(--muted)' }}>{unit}</span>}
      </dd>
    </div>
  )
}
