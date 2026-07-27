import Link from 'next/link'
import { ArrowRight, Droplets, Zap } from 'lucide-react'
import { CountUp } from '@/components/shell/count-up'
import {
  ADMIN,
  CYCLE,
  FLAG,
  REVIEWS,
  flaggedCount,
  moneyShort,
  type ReviewItem,
} from '@/components/admin/data'

export default function AdminDashboard() {
  const readPct = Math.round((CYCLE.metersRead / CYCLE.metersTotal) * 100)
  const preview = REVIEWS.slice(0, 4)

  return (
    <div className="space-y-5 p-5 sm:p-8">
      <div className="animate-fade-rise">
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--ink)' }}>
          Hello, {ADMIN.name.split(' ')[0]}.
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
          Estate utilities · {ADMIN.cycle} billing cycle
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Outstanding reviews" value={<CountUp value={REVIEWS.length} />} hint="Readings awaiting sign-off" color="var(--accent-strong)" tint="var(--accent)" href="/admin/reviews" delay={0} />
        <Kpi label="Flagged anomalies" value={<CountUp value={flaggedCount} />} hint="Need a closer look" color="var(--warn)" tint="var(--warn)" href="/admin/reviews" delay={70} />
        <Kpi label="Meters read" value={`${CYCLE.metersRead.toLocaleString()} / ${CYCLE.metersTotal.toLocaleString()}`} hint={`${readPct}% of the cycle`} color="var(--ink)" delay={140} />
        <Kpi label="Est. billing" value={moneyShort(CYCLE.billingEstimate)} hint="This cycle, once approved" color="var(--ink)" delay={210} />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {/* Review queue preview */}
        <section
          className="animate-fade-rise rounded-2xl border p-5 xl:col-span-2"
          style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)', animationDelay: '280ms' }}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
              Needs review
            </h3>
            <Link
              href="/admin/reviews"
              className="inline-flex items-center gap-1 text-xs font-semibold"
              style={{ color: 'var(--accent-strong)' }}
            >
              Open queue
              <ArrowRight className="size-3.5" strokeWidth={2.25} />
            </Link>
          </div>
          <ul className="space-y-2">
            {preview.map((r) => (
              <QueueRow key={r.id} r={r} />
            ))}
          </ul>
        </section>

        {/* Billing cycle */}
        <section
          className="animate-fade-rise rounded-2xl border p-5"
          style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)', animationDelay: '340ms' }}
        >
          <h3 className="font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
            Billing cycle
          </h3>
          <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
            {ADMIN.cycle}
          </p>
          <span
            className="mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold"
            style={{ background: 'var(--warn-wash)', color: 'var(--warn)' }}
          >
            Open · readings in review
          </span>
          <p className="mt-3 text-xs" style={{ color: 'var(--muted)' }}>
            Bills can&rsquo;t be finalised until every reading in the queue is approved.
          </p>
          <div className="mt-4 space-y-2">
            <Link
              href="/admin/cycle"
              className="block w-full rounded-xl px-4 py-2.5 text-center text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: 'var(--brand)' }}
            >
              Open billing cycle
            </Link>
            <Link
              href="/admin/reports"
              className="block w-full rounded-xl border px-4 py-2.5 text-center text-sm font-semibold"
              style={{ borderColor: 'var(--line)', color: 'var(--ink-2)' }}
            >
              Generate reports
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

function Kpi({
  label,
  value,
  hint,
  color,
  tint,
  href,
  delay = 0,
}: {
  label: string
  value: React.ReactNode
  hint: string
  color: string
  tint?: string
  href?: string
  delay?: number
}) {
  const style: React.CSSProperties = {
    borderColor: tint ? `color-mix(in srgb, ${tint} 20%, var(--line))` : 'var(--line)',
    background: tint
      ? `linear-gradient(140deg, color-mix(in srgb, ${tint} 11%, var(--surface)) 0%, var(--surface) 60%)`
      : 'var(--surface)',
    boxShadow: 'var(--shadow)',
    animationDelay: `${delay}ms`,
  }
  const inner = (
    <>
      {tint && (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-10 size-28 rounded-full opacity-30 blur-2xl"
          style={{ background: tint }}
        />
      )}
      <p className="relative text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
        {label}
      </p>
      <p className="relative mt-2 text-3xl font-bold tracking-tight lnum" style={{ color }}>
        {value}
      </p>
      <p className="relative mt-1 text-xs" style={{ color: 'var(--muted)' }}>
        {hint}
      </p>
    </>
  )
  return href ? (
    <Link href={href} className="animate-fade-rise relative overflow-hidden rounded-2xl border p-5 transition-transform duration-200 hover:-translate-y-0.5" style={style}>
      {inner}
    </Link>
  ) : (
    <div className="animate-fade-rise relative overflow-hidden rounded-2xl border p-5" style={style}>
      {inner}
    </div>
  )
}

function QueueRow({ r }: { r: ReviewItem }) {
  const Icon = r.utility === 'electricity' ? Zap : Droplets
  const color = r.utility === 'electricity' ? 'var(--elec)' : 'var(--water)'
  const uname = r.utility === 'electricity' ? 'Electricity' : 'Water'
  const f = FLAG[r.flag]

  return (
    <li>
      <Link
        href={`/admin/reviews/${r.id}`}
        className="flex items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
        style={{ borderColor: 'var(--line)' }}
      >
        <span
          className="grid size-9 shrink-0 place-items-center rounded-lg"
          style={{ background: `color-mix(in srgb, ${color} 16%, transparent)` }}
        >
          <Icon className="size-4" strokeWidth={1.9} style={{ color }} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
            {r.code} · {uname}
          </p>
          <p className="text-xs lnum" style={{ color: 'var(--muted)' }}>
            {r.capturedBy} · {r.capturedOn}
          </p>
        </div>
        <span
          className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold"
          style={{ background: f.wash, color: f.color }}
        >
          {f.label}
        </span>
      </Link>
    </li>
  )
}
