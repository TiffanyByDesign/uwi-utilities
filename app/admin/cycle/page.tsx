'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AlertTriangle, ArrowRight, Calculator, Check, Download, Send } from 'lucide-react'
import { ADMIN, CYCLE, REVIEWS } from '@/components/admin/data'

const PHASES = ['review', 'calculate', 'publish', 'export', 'done'] as const
type Phase = (typeof PHASES)[number]

const STAGES = [
  { label: 'Readings captured', sub: `${CYCLE.metersRead.toLocaleString()} of ${CYCLE.metersTotal.toLocaleString()} meters` },
  { label: 'Reviews cleared', sub: `${REVIEWS.length} awaiting sign-off` },
  { label: 'Bills calculated', sub: 'Draft bills generated' },
  { label: 'Bills published', sub: 'Visible to accounts' },
  { label: 'Exported', sub: 'Bursary & Payroll files' },
]

export default function CyclePage() {
  const [phase, setPhase] = useState<Phase>('review')
  const idx = PHASES.indexOf(phase)

  function statusOf(i: number): 'done' | 'current' | 'todo' {
    if (i === 0) return 'done' // readings are captured coming in
    const stagePhase = i - 1
    if (stagePhase < idx) return 'done'
    if (stagePhase === idx) return 'current'
    return 'todo'
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5 p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight" style={{ color: 'var(--ink)' }}>
            Billing cycle
          </h2>
          <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
            {ADMIN.cycle} · one pass from readings to exported files.
          </p>
        </div>
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={
            phase === 'done'
              ? { background: 'var(--ok-wash)', color: 'var(--ok)' }
              : { background: 'var(--warn-wash)', color: 'var(--warn)' }
          }
        >
          {phase === 'done' ? 'Complete' : 'Open'}
        </span>
      </div>

      {/* Stepper */}
      <section
        className="rounded-2xl border p-5"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
      >
        {STAGES.map((s, i) => {
          const st = statusOf(i)
          const done = st === 'done'
          const current = st === 'current'
          return (
            <div key={s.label} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className="grid size-7 shrink-0 place-items-center rounded-full border-2"
                  style={{
                    borderColor: done ? 'var(--ok)' : current ? 'var(--brand)' : 'var(--line-2)',
                    background: done ? 'var(--ok)' : 'var(--surface)',
                  }}
                >
                  {done ? (
                    <Check className="size-3.5 text-white" strokeWidth={3} />
                  ) : (
                    <span
                      className="size-2 rounded-full"
                      style={{ background: current ? 'var(--brand)' : 'var(--muted)' }}
                    />
                  )}
                </span>
                {i < STAGES.length - 1 && (
                  <span className="w-0.5 flex-1" style={{ background: 'var(--line)' }} />
                )}
              </div>
              <div className="pb-6">
                <p className="text-sm font-semibold" style={{ color: current || done ? 'var(--ink)' : 'var(--muted)' }}>
                  {s.label}
                </p>
                <p className="text-xs lnum" style={{ color: 'var(--muted)' }}>
                  {s.sub}
                </p>
              </div>
            </div>
          )
        })}
      </section>

      {/* Contextual action */}
      {phase === 'review' && (
        <section
          className="rounded-2xl border p-5"
          style={{ borderColor: 'color-mix(in srgb, var(--warn) 40%, transparent)', background: 'var(--warn-wash)' }}
        >
          <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--warn)' }}>
            <AlertTriangle className="size-4 shrink-0" strokeWidth={2.25} />
            {REVIEWS.length} readings still in review
          </p>
          <p className="mt-1.5 text-sm" style={{ color: 'var(--ink-2)' }}>
            Bills can&rsquo;t be calculated until every reading this cycle is approved.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/admin/reviews"
              className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
              style={{ background: 'var(--brand)' }}
            >
              Open reviews
              <ArrowRight className="size-4" strokeWidth={2.25} />
            </Link>
            <button
              type="button"
              onClick={() => setPhase('calculate')}
              className="rounded-xl border px-4 py-2.5 text-sm font-semibold"
              style={{ borderColor: 'var(--line-2)', color: 'var(--ink-2)' }}
            >
              Simulate: all approved
            </button>
          </div>
        </section>
      )}

      {phase === 'calculate' && (
        <ActionCard
          icon={Calculator}
          title="Run bill calculation"
          body="Apply the approved rates to every meter reading and generate this cycle's draft bills."
          cta="Run calculation"
          onClick={() => setPhase('publish')}
        />
      )}
      {phase === 'publish' && (
        <ActionCard
          icon={Send}
          title="Publish bills"
          body="Make the finalised bills visible to residents and companies in their portals."
          cta="Publish to accounts"
          onClick={() => setPhase('export')}
        />
      )}
      {phase === 'export' && (
        <ActionCard
          icon={Download}
          title="Export cycle files"
          body="Generate the Bursary and Payroll files for this cycle and hand them off."
          cta="Export files"
          onClick={() => setPhase('done')}
        />
      )}
      {phase === 'done' && (
        <section
          className="rounded-2xl border p-6 text-center"
          style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
        >
          <span className="mx-auto grid size-14 place-items-center rounded-full" style={{ background: 'var(--ok-wash)' }}>
            <Check className="size-7" strokeWidth={2.5} style={{ color: 'var(--ok)' }} />
          </span>
          <h3 className="mt-4 font-display text-xl font-bold" style={{ color: 'var(--ink)' }}>
            Cycle complete
          </h3>
          <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
            {ADMIN.cycle} bills are published and the export files are ready.
          </p>
        </section>
      )}
    </div>
  )
}

function ActionCard({
  icon: Icon,
  title,
  body,
  cta,
  onClick,
}: {
  icon: typeof Calculator
  title: string
  body: string
  cta: string
  onClick: () => void
}) {
  return (
    <section
      className="rounded-2xl border p-5"
      style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
    >
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-lg" style={{ background: 'var(--accent-wash)' }}>
          <Icon className="size-5" strokeWidth={1.9} style={{ color: 'var(--accent-strong)' }} />
        </span>
        <h3 className="font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
          {title}
        </h3>
      </div>
      <p className="mt-2 text-sm" style={{ color: 'var(--ink-2)' }}>
        {body}
      </p>
      <button
        type="button"
        onClick={onClick}
        className="mt-4 inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
        style={{ background: 'var(--brand)' }}
      >
        {cta}
        <ArrowRight className="size-4" strokeWidth={2.25} />
      </button>
    </section>
  )
}
