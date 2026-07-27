import { Download, Droplets, Zap } from 'lucide-react'
import { CountUp } from '@/components/shell/count-up'
import { BILL, money } from '@/components/portal/data'

type UtilityBill = (typeof BILL)['electricity']

export default function CurrentBillPage() {
  return (
    <div className="space-y-5 p-5 sm:p-8">
      {/* Header */}
      <section
        className="animate-fade-rise rounded-2xl border p-5 sm:p-6"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight" style={{ color: 'var(--ink)' }}>
              Bill for {BILL.period}
            </h2>
            <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
              Issued {BILL.issued} · due {BILL.due}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: 'var(--accent-wash)', color: 'var(--accent-strong)' }}
            >
              {BILL.status}
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-semibold"
              style={{ borderColor: 'var(--line)', color: 'var(--ink-2)' }}
            >
              <Download className="size-4" strokeWidth={2} />
              Download PDF
            </button>
          </div>
        </div>
        <div
          className="mt-5 flex items-baseline justify-between gap-3 border-t pt-4"
          style={{ borderColor: 'var(--line)' }}
        >
          <span className="text-sm font-semibold" style={{ color: 'var(--ink-2)' }}>
            Total due
          </span>
          <span className="text-4xl font-bold tracking-tight lnum" style={{ color: 'var(--ink)' }}>
            <CountUp value={BILL.total} prefix="J$" />
          </span>
        </div>
      </section>

      {/* Two utilities */}
      <div className="grid gap-5 lg:grid-cols-2">
        <UtilityCard icon={Zap} color="var(--elec)" name="Electricity" unit="kWh" u={BILL.electricity} />
        <UtilityCard icon={Droplets} color="var(--water)" name="Water" unit="gal" u={BILL.water} />
      </div>

      <p className="text-xs" style={{ color: 'var(--muted)' }}>
        Every charge is calculated from a meter reading taken on site and checked by a second officer
        before the bill was issued. Electricity follows the JPS tariff; the water rates shown here are
        indicative.
      </p>
    </div>
  )
}

function UtilityCard({
  icon: Icon,
  color,
  name,
  unit,
  u,
}: {
  icon: typeof Zap
  color: string
  name: string
  unit: string
  u: UtilityBill
}) {
  return (
    <section
      className="animate-fade-rise rounded-2xl border p-5"
      style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
    >
      <div className="flex items-center justify-between gap-3">
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
        <span className="text-xl font-bold lnum" style={{ color: 'var(--ink)' }}>
          {money(u.total)}
        </span>
      </div>

      {/* Reading basis */}
      <div
        className="mt-4 rounded-xl border p-3.5 text-sm lnum"
        style={{ borderColor: 'var(--line)', background: 'var(--raised)', color: 'var(--ink-2)' }}
      >
        {u.current.toLocaleString()} − {u.previous.toLocaleString()} ={' '}
        <strong style={{ color: 'var(--ink)' }}>
          {u.consumption.toLocaleString()} {unit}
        </strong>
        <span className="mt-0.5 block text-xs" style={{ color: 'var(--muted)' }}>
          Read {u.date} · checked by {u.checkedBy}
        </span>
      </div>

      {/* Line items */}
      <table className="mt-4 w-full text-sm">
        <tbody>
          {u.lines.map((l) => (
            <tr key={l.label}>
              <td className="py-1.5 align-top">
                <span className="font-medium" style={{ color: 'var(--ink)' }}>
                  {l.label}
                </span>
                <span className="block text-xs lnum" style={{ color: 'var(--muted)' }}>
                  {l.detail}
                </span>
              </td>
              <td
                className="py-1.5 pl-3 text-right align-top font-semibold lnum"
                style={{ color: 'var(--ink)' }}
              >
                {money(l.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
