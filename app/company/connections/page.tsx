'use client'

import { useState } from 'react'
import { Droplets, MapPin, Zap } from 'lucide-react'
import { SITE_BILLS, money, type SiteBill } from '@/components/company/data'

export default function Connections() {
  const [active, setActive] = useState<string>('all')
  const current = SITE_BILLS.find((b) => b.site.id === active)

  return (
    <div className="mx-auto max-w-3xl space-y-5 p-4 sm:p-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight" style={{ color: 'var(--ink)' }}>
          Connections
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
          Every property and meter your company holds. Pick one to focus on it.
        </p>
      </div>

      {/* Account switcher */}
      <div
        className="flex items-center gap-1 overflow-x-auto rounded-xl border p-1"
        style={{ borderColor: 'var(--line)', background: 'var(--raised)' }}
      >
        <Pill on={active === 'all'} onClick={() => setActive('all')}>
          All sites
        </Pill>
        {SITE_BILLS.map((b) => (
          <Pill key={b.site.id} on={active === b.site.id} onClick={() => setActive(b.site.id)}>
            {b.site.name.split(' ')[0]}
          </Pill>
        ))}
      </div>

      {current ? (
        <SiteDetail b={current} />
      ) : (
        <div className="space-y-2">
          {SITE_BILLS.map((b) => (
            <button
              key={b.site.id}
              type="button"
              onClick={() => setActive(b.site.id)}
              className="animate-fade-rise flex w-full flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border p-4 text-left transition-transform duration-200 hover:-translate-y-0.5"
              style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
            >
              <div className="min-w-[10rem] flex-1">
                <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                  {b.site.name}
                </p>
                <p className="flex items-center gap-1 text-xs lnum" style={{ color: 'var(--muted)' }}>
                  <MapPin className="size-3" strokeWidth={2} />
                  {b.site.address}
                </p>
              </div>
              <span className="text-sm font-bold lnum" style={{ color: 'var(--ink)' }}>
                {money(b.total)}
              </span>
              <span
                className="rounded-full px-2.5 py-1 text-xs font-semibold"
                style={{
                  background: b.site.status === 'due' ? 'var(--warn-wash)' : 'var(--ok-wash)',
                  color: b.site.status === 'due' ? 'var(--warn)' : 'var(--ok)',
                }}
              >
                {b.site.status === 'due' ? 'Due' : 'Paid'}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Pill({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className="shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
      style={{
        color: on ? 'var(--ink)' : 'var(--muted)',
        background: on ? 'var(--surface)' : 'transparent',
        boxShadow: on ? 'var(--shadow)' : 'none',
      }}
    >
      {children}
    </button>
  )
}

function SiteDetail({ b }: { b: SiteBill }) {
  const s = b.site
  return (
    <div className="space-y-4">
      <div
        className="rounded-2xl border p-5"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
              {s.name}
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-xs lnum" style={{ color: 'var(--muted)' }}>
              <MapPin className="size-3" strokeWidth={2} />
              {s.address} · {s.code}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold lnum" style={{ color: 'var(--ink)' }}>
              {money(b.total)}
            </p>
            <span className="text-xs font-semibold" style={{ color: s.status === 'due' ? 'var(--warn)' : 'var(--ok)' }}>
              {s.status === 'due' ? 'Due' : 'Paid'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <MeterCard
          icon={Zap}
          color="var(--elec)"
          name="Electricity"
          unit="kWh"
          meter={s.elecMeter}
          previous={s.elecPrev}
          current={s.elecCur}
          use={b.elecUse}
          amount={b.electricity}
        />
        <MeterCard
          icon={Droplets}
          color="var(--water)"
          name="Water"
          unit="gal"
          meter={s.waterMeter}
          previous={s.waterPrev}
          current={s.waterCur}
          use={b.waterUse}
          amount={b.water}
        />
      </div>
    </div>
  )
}

function MeterCard({
  icon: Icon,
  color,
  name,
  unit,
  meter,
  previous,
  current,
  use,
  amount,
}: {
  icon: typeof Zap
  color: string
  name: string
  unit: string
  meter: string
  previous: number
  current: number
  use: number
  amount: number
}) {
  return (
    <section
      className="rounded-2xl border p-4"
      style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span
            className="grid size-9 place-items-center rounded-lg"
            style={{ background: `color-mix(in srgb, ${color} 16%, transparent)` }}
          >
            <Icon className="size-5" strokeWidth={1.9} style={{ color }} />
          </span>
          <p className="font-display text-sm font-bold" style={{ color: 'var(--ink)' }}>
            {name}
          </p>
        </div>
        <span className="text-sm font-bold lnum" style={{ color: 'var(--ink)' }}>
          {money(amount)}
        </span>
      </div>
      <p className="mt-3 text-xs lnum" style={{ color: 'var(--muted)' }}>
        Meter {meter}
      </p>
      <p className="mt-2 text-sm lnum" style={{ color: 'var(--ink-2)' }}>
        {current.toLocaleString()} − {previous.toLocaleString()} ={' '}
        <strong style={{ color: 'var(--ink)' }}>
          {use.toLocaleString()} {unit}
        </strong>
      </p>
    </section>
  )
}
