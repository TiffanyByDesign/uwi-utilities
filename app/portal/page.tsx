import Link from 'next/link'
import { AlertTriangle, ArrowRight, Droplets, Info, Zap } from 'lucide-react'
import { CountUp } from '@/components/shell/count-up'
import { ALERTS, BILL, CLIENT, USAGE, money } from '@/components/portal/data'

export default function PortalHome() {
  const prev = USAGE[USAGE.length - 2]
  const cur = USAGE[USAGE.length - 1]
  const first = CLIENT.name.split(' ')[0]

  return (
    <div className="space-y-5 p-5 sm:p-8">
      <div className="animate-fade-rise">
        <h2
          className="font-display text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ color: 'var(--ink)' }}
        >
          Hello, {first}.
        </h2>
        <p className="mt-1 text-sm lnum" style={{ color: 'var(--ink-2)' }}>
          {CLIENT.property} · Account {CLIENT.accountNo}
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {/* Current bill hero */}
        <section
          className="animate-fade-rise relative overflow-hidden rounded-2xl border p-5 sm:p-6 xl:col-span-2"
          style={{
            borderColor: 'color-mix(in srgb, var(--accent) 20%, var(--line))',
            background:
              'linear-gradient(140deg, color-mix(in srgb, var(--accent) 10%, var(--surface)) 0%, var(--surface) 62%)',
            boxShadow: 'var(--shadow)',
            animationDelay: '60ms',
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-12 size-40 rounded-full opacity-30 blur-3xl"
            style={{ background: 'var(--accent)' }}
          />
          <div className="relative flex flex-wrap items-start justify-between gap-3">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--muted)' }}
              >
                Current bill · {BILL.period}
              </p>
              <p className="mt-2 text-5xl font-bold tracking-tight lnum" style={{ color: 'var(--ink)' }}>
                <CountUp value={BILL.total} prefix="J$" />
              </p>
              <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
                Due {BILL.due}
              </p>
            </div>
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: 'var(--accent-wash)', color: 'var(--accent-strong)' }}
            >
              {BILL.status}
            </span>
          </div>

          <div className="relative mt-5 grid gap-3 sm:grid-cols-2">
            <Split
              icon={Zap}
              color="var(--elec)"
              label="Electricity"
              value={money(BILL.electricity.total)}
              sub={`${BILL.electricity.consumption.toLocaleString()} kWh`}
            />
            <Split
              icon={Droplets}
              color="var(--water)"
              label="Water"
              value={money(BILL.water.total)}
              sub={`${BILL.water.consumption.toLocaleString()} gal`}
            />
          </div>

          <Link
            href="/portal/bill"
            className="group relative mt-5 inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            style={{ background: 'var(--brand)' }}
          >
            View full bill
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={2.25}
            />
          </Link>
        </section>

        {/* Right column */}
        <div className="space-y-5">
          <section
            className="animate-fade-rise rounded-2xl border p-5"
            style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)', animationDelay: '140ms' }}
          >
            <h3 className="font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
              This month vs last
            </h3>
            <div className="mt-4 space-y-4">
              <UsageRow icon={Zap} color="var(--elec)" label="Electricity" unit="kWh" cur={cur.electricity} prev={prev.electricity} />
              <UsageRow icon={Droplets} color="var(--water)" label="Water" unit="gal" cur={cur.water} prev={prev.water} />
            </div>
            <Link
              href="/portal/usage"
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold"
              style={{ color: 'var(--accent-strong)' }}
            >
              See full trends
              <ArrowRight className="size-3.5" strokeWidth={2.25} />
            </Link>
          </section>

          <section
            className="animate-fade-rise rounded-2xl border p-5"
            style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)', animationDelay: '220ms' }}
          >
            <h3 className="font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
              Notifications
            </h3>
            <ul className="mt-3 space-y-3">
              {ALERTS.map((a) => {
                const warn = a.kind === 'warn'
                const Icon = warn ? AlertTriangle : Info
                const c = warn ? 'var(--warn)' : 'var(--accent-strong)'
                const w = warn ? 'var(--warn-wash)' : 'var(--accent-wash)'
                return (
                  <li key={a.id} className="flex gap-2.5">
                    <span
                      className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg"
                      style={{ background: w }}
                    >
                      <Icon className="size-4" strokeWidth={2} style={{ color: c }} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                        {a.title}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--ink-2)' }}>
                        {a.detail}
                      </p>
                    </div>
                    <span className="ml-auto shrink-0 text-[11px]" style={{ color: 'var(--muted)' }}>
                      {a.when}
                    </span>
                  </li>
                )
              })}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

function Split({
  icon: Icon,
  color,
  label,
  value,
  sub,
}: {
  icon: typeof Zap
  color: string
  label: string
  value: string
  sub: string
}) {
  return (
    <div className="rounded-xl border p-3.5" style={{ borderColor: 'var(--line)', background: 'var(--raised)' }}>
      <div className="flex items-center gap-2">
        <span
          className="grid size-7 place-items-center rounded-lg"
          style={{ background: `color-mix(in srgb, ${color} 16%, transparent)` }}
        >
          <Icon className="size-4" strokeWidth={2} style={{ color }} />
        </span>
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
          {label}
        </p>
      </div>
      <p className="mt-2 text-lg font-bold lnum" style={{ color: 'var(--ink)' }}>
        {value}
      </p>
      <p className="text-xs lnum" style={{ color: 'var(--muted)' }}>
        {sub}
      </p>
    </div>
  )
}

function UsageRow({
  icon: Icon,
  color,
  label,
  unit,
  cur,
  prev,
}: {
  icon: typeof Zap
  color: string
  label: string
  unit: string
  cur: number
  prev: number
}) {
  const pct = Math.round(((cur - prev) / prev) * 100)
  const up = pct >= 0
  const max = Math.max(cur, prev)
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--ink-2)' }}>
          <Icon className="size-4" strokeWidth={2} style={{ color }} />
          {label}
        </span>
        <span className="text-sm font-semibold lnum" style={{ color: 'var(--ink)' }}>
          {cur.toLocaleString()}{' '}
          <span className="text-xs font-normal" style={{ color: 'var(--muted)' }}>
            {unit}
          </span>
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full" style={{ background: 'var(--line)' }}>
        <div className="h-full rounded-full" style={{ width: `${(cur / max) * 100}%`, background: color }} />
      </div>
      <p className="mt-1 text-[11px] lnum" style={{ color: up ? 'var(--warn)' : 'var(--ok)' }}>
        {up ? '▲' : '▼'} {Math.abs(pct)}% vs last month
      </p>
    </div>
  )
}
