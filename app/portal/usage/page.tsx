import { Droplets, Zap } from 'lucide-react'
import { AreaChart } from '@/components/charts/area-chart'
import { USAGE } from '@/components/portal/data'

export default function UsagePage() {
  const elec = USAGE.map((u) => ({ label: u.label, value: u.electricity }))
  const water = USAGE.map((u) => ({ label: u.label, value: u.water }))

  return (
    <div className="space-y-5 p-5 sm:p-8">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--ink)' }}>
          Usage &amp; trends
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
          Your last six months of electricity and water.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <UsageCard icon={Zap} color="var(--elec)" name="Electricity" unit="kWh" data={elec} />
        <UsageCard icon={Droplets} color="var(--water)" name="Water" unit="gal" data={water} />
      </div>
    </div>
  )
}

function UsageCard({
  icon: Icon,
  color,
  name,
  unit,
  data,
}: {
  icon: typeof Zap
  color: string
  name: string
  unit: string
  data: { label: string; value: number }[]
}) {
  const latest = data[data.length - 1].value
  const avg = Math.round(data.reduce((s, d) => s + d.value, 0) / data.length)
  const diff = Math.round(((latest - avg) / avg) * 100)
  const up = diff >= 0

  return (
    <section
      className="animate-fade-rise rounded-2xl border p-5"
      style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className="grid size-9 place-items-center rounded-lg"
            style={{ background: `color-mix(in srgb, ${color} 16%, transparent)` }}
          >
            <Icon className="size-5" strokeWidth={1.9} style={{ color }} />
          </span>
          <div>
            <h3 className="font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
              {name}
            </h3>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              This month vs six-month average
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold lnum" style={{ color: 'var(--ink)' }}>
            {latest.toLocaleString()}{' '}
            <span className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>
              {unit}
            </span>
          </p>
          <p className="text-xs font-semibold lnum" style={{ color: up ? 'var(--warn)' : 'var(--ok)' }}>
            {up ? '▲' : '▼'} {Math.abs(diff)}% vs avg
          </p>
        </div>
      </div>

      <AreaChart data={data} color={color} unit={unit} />
    </section>
  )
}
