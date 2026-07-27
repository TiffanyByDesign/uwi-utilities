import { Download, Droplets, Zap } from 'lucide-react'
import { COMPANY, PORTFOLIO, SITE_BILLS, money, type SiteBill } from '@/components/company/data'

export default function CompanyBills() {
  return (
    <div className="space-y-5 p-5 sm:p-8">
      {/* Consolidated header */}
      <section
        className="rounded-2xl border p-5 sm:p-6"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight" style={{ color: 'var(--ink)' }}>
              Bills · {COMPANY.period}
            </h2>
            <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
              One consolidated statement across {PORTFOLIO.sites} sites · due {COMPANY.due}
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-semibold"
            style={{ borderColor: 'var(--line)', color: 'var(--ink-2)' }}
          >
            <Download className="size-4" strokeWidth={2} />
            Download PDF
          </button>
        </div>
        <div className="mt-5 flex items-baseline justify-between gap-3 border-t pt-4" style={{ borderColor: 'var(--line)' }}>
          <span className="text-sm font-semibold" style={{ color: 'var(--ink-2)' }}>
            Total this cycle
          </span>
          <span className="text-3xl font-bold lnum" style={{ color: 'var(--ink)' }}>
            {money(PORTFOLIO.total)}
          </span>
        </div>
      </section>

      {/* Per-site breakdown */}
      <section>
        <h3 className="mb-3 font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
          By site
        </h3>
        <div className="space-y-3">
          {SITE_BILLS.map((b) => (
            <SiteBillCard key={b.site.id} b={b} />
          ))}
        </div>
      </section>

      <p className="text-xs" style={{ color: 'var(--muted)' }}>
        Each site&rsquo;s charge is calculated from its own metered readings, then combined into the
        statement above. Electricity follows the JPS tariff; the water rates shown are indicative.
      </p>
    </div>
  )
}

function SiteBillCard({ b }: { b: SiteBill }) {
  const due = b.site.status === 'due'
  return (
    <div
      className="animate-fade-rise rounded-2xl border p-4"
      style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
            {b.site.name}
          </p>
          <p className="text-xs lnum" style={{ color: 'var(--muted)' }}>
            {b.site.code}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold lnum" style={{ color: 'var(--ink)' }}>
            {money(b.total)}
          </span>
          <span
            className="rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{
              background: due ? 'var(--warn-wash)' : 'var(--ok-wash)',
              color: due ? 'var(--warn)' : 'var(--ok)',
            }}
          >
            {due ? 'Due' : 'Paid'}
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <Line icon={Zap} color="var(--elec)" label="Electricity" use={`${b.elecUse.toLocaleString()} kWh`} amount={money(b.electricity)} />
        <Line icon={Droplets} color="var(--water)" label="Water" use={`${b.waterUse.toLocaleString()} gal`} amount={money(b.water)} />
      </div>
    </div>
  )
}

function Line({
  icon: Icon,
  color,
  label,
  use,
  amount,
}: {
  icon: typeof Zap
  color: string
  label: string
  use: string
  amount: string
}) {
  return (
    <div className="rounded-xl border p-3" style={{ borderColor: 'var(--line)', background: 'var(--raised)' }}>
      <div className="flex items-center gap-1.5">
        <Icon className="size-4" strokeWidth={2} style={{ color }} />
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
          {label}
        </span>
      </div>
      <p className="mt-1.5 text-sm font-bold lnum" style={{ color: 'var(--ink)' }}>
        {amount}
      </p>
      <p className="text-xs lnum" style={{ color: 'var(--muted)' }}>
        {use}
      </p>
    </div>
  )
}
