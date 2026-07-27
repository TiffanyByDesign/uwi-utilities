import Link from 'next/link'
import { ChevronRight, Droplets, Zap } from 'lucide-react'
import { ASSIGNED, READER, routeProgress, type Reading } from '@/components/reader/data'

export default function ReaderRoute() {
  const { done, total } = routeProgress()
  const pct = Math.round((done / total) * 100)

  // Group the flat list back into properties, preserving route order.
  const groups: { code: string; property: string; hall: string; items: Reading[] }[] = []
  for (const r of ASSIGNED) {
    let g = groups.find((x) => x.code === r.code)
    if (!g) {
      g = { code: r.code, property: r.property, hall: r.hall, items: [] }
      groups.push(g)
    }
    g.items.push(r)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5 p-4 sm:p-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight" style={{ color: 'var(--ink)' }}>
          Today&rsquo;s route
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
          {READER.name} · {READER.cycle} cycle
        </p>
      </div>

      {/* Progress */}
      <div
        className="rounded-2xl border p-4"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
      >
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
            {done} of {total} meters read
          </p>
          <p className="text-sm font-bold lnum" style={{ color: 'var(--accent-strong)' }}>
            {pct}%
          </p>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full" style={{ background: 'var(--line)' }}>
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'var(--accent)' }} />
        </div>
      </div>

      {groups.map((g) => (
        <section key={g.code} className="space-y-2">
          <p className="px-1 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
            {g.hall} · {g.property}{' '}
            <span className="lnum" style={{ color: 'var(--ink-2)' }}>
              ({g.code})
            </span>
          </p>
          {g.items.map((r) => (
            <MeterRow key={r.id} r={r} />
          ))}
        </section>
      ))}
    </div>
  )
}

function MeterRow({ r }: { r: Reading }) {
  const Icon = r.utility === 'electricity' ? Zap : Droplets
  const color = r.utility === 'electricity' ? 'var(--elec)' : 'var(--water)'
  const uname = r.utility === 'electricity' ? 'Electricity' : 'Water'
  const done = r.status === 'done'

  const inner = (
    <>
      <span
        className="grid size-10 shrink-0 place-items-center rounded-xl"
        style={{ background: `color-mix(in srgb, ${color} 16%, transparent)` }}
      >
        <Icon className="size-5" strokeWidth={1.9} style={{ color }} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
          {uname}
        </p>
        <p className="text-xs lnum" style={{ color: 'var(--muted)' }}>
          {done
            ? `Read ${r.captured?.toLocaleString()} ${r.unit}`
            : `Prev ${r.previous.toLocaleString()} ${r.unit} · ${r.previousDate}`}
        </p>
      </div>
      {done ? (
        <span
          className="rounded-full px-2.5 py-1 text-xs font-semibold"
          style={{ background: 'var(--ok-wash)', color: 'var(--ok)' }}
        >
          Done
        </span>
      ) : (
        <span
          className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
          style={{ background: 'var(--warn-wash)', color: 'var(--warn)' }}
        >
          Due
          <ChevronRight className="size-3.5" strokeWidth={2.5} />
        </span>
      )}
    </>
  )

  const cls = 'animate-fade-rise flex items-center gap-3 rounded-2xl border p-3.5'
  const style: React.CSSProperties = {
    borderColor: 'var(--line)',
    background: 'var(--surface)',
    boxShadow: 'var(--shadow)',
  }

  return done ? (
    <div className={cls} style={style}>
      {inner}
    </div>
  ) : (
    <Link
      href={`/reader/capture/${r.id}`}
      className={`${cls} transition-transform duration-200 hover:-translate-y-0.5`}
      style={style}
    >
      {inner}
    </Link>
  )
}
