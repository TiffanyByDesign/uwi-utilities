import { Droplets, Zap } from 'lucide-react'
import { BarChart } from '@/components/charts/bar-chart'
import { SITE_BILLS } from '@/components/company/data'

export default function CompanyUsage() {
  const elec = SITE_BILLS.map((b) => ({ label: b.site.name.split(' ')[0], value: b.elecUse }))
  const water = SITE_BILLS.map((b) => ({ label: b.site.name.split(' ')[0], value: b.waterUse }))

  return (
    <div className="space-y-5 p-5 sm:p-8">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--ink)' }}>
          Usage across sites
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
          This cycle&rsquo;s consumption at each of your campus locations.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <UsageCard icon={Zap} color="var(--elec)" name="Electricity by site" unit="kWh" data={elec} />
        <UsageCard icon={Droplets} color="var(--water)" name="Water by site" unit="gal" data={water} />
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
  const total = data.reduce((s, d) => s + d.value, 0)

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
          <h3 className="font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
            {name}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold lnum" style={{ color: 'var(--ink)' }}>
            {total.toLocaleString()}{' '}
            <span className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>
              {unit}
            </span>
          </p>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            total this cycle
          </p>
        </div>
      </div>

      <BarChart data={data} color={color} unit={unit} />
    </section>
  )
}
