import { Droplets, Mail, Phone, Zap } from 'lucide-react'
import { CLIENT } from '@/components/portal/data'

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-5 p-4 sm:p-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--ink)' }}>
          Account
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
          Your details and the property you&rsquo;re billed for.
        </p>
      </div>

      <section
        className="animate-fade-rise rounded-2xl border p-5"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
      >
        <h3 className="font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
          Your details
        </h3>
        <dl className="mt-3 space-y-3">
          <Row label="Name">{CLIENT.name}</Row>
          <Row label="ID">{CLIENT.id}</Row>
          <Row label="Email">
            <span className="flex items-center justify-end gap-1.5">
              <Mail className="size-3.5 shrink-0" strokeWidth={2} />
              <span className="truncate">{CLIENT.email}</span>
            </span>
          </Row>
          <Row label="Phone">
            <span className="flex items-center justify-end gap-1.5">
              <Phone className="size-3.5 shrink-0" strokeWidth={2} />
              {CLIENT.phone}
            </span>
          </Row>
          <Row label="Moved in">{CLIENT.movedIn}</Row>
        </dl>
        <button
          type="button"
          className="mt-5 w-full rounded-xl border py-2.5 text-sm font-semibold"
          style={{ borderColor: 'var(--line)', color: 'var(--ink-2)' }}
        >
          Edit details
        </button>
      </section>

      <section
        className="animate-fade-rise rounded-2xl border p-5"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
      >
        <h3 className="font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
          Property &amp; meters
        </h3>
        <p className="mt-2 text-sm" style={{ color: 'var(--ink)' }}>
          {CLIENT.property}
        </p>
        <p className="text-xs lnum" style={{ color: 'var(--muted)' }}>
          Account {CLIENT.accountNo}
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <MeterRow icon={Zap} color="var(--elec)" name="Electricity meter" number={CLIENT.elecMeter} />
          <MeterRow icon={Droplets} color="var(--water)" name="Water meter" number={CLIENT.waterMeter} />
        </div>
      </section>
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="shrink-0 text-xs" style={{ color: 'var(--muted)' }}>
        {label}
      </dt>
      <dd className="min-w-0 text-right text-sm font-semibold" style={{ color: 'var(--ink)' }}>
        {children}
      </dd>
    </div>
  )
}

function MeterRow({
  icon: Icon,
  color,
  name,
  number,
}: {
  icon: typeof Zap
  color: string
  name: string
  number: string
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border p-3" style={{ borderColor: 'var(--line)', background: 'var(--raised)' }}>
      <span
        className="grid size-8 shrink-0 place-items-center rounded-lg"
        style={{ background: `color-mix(in srgb, ${color} 16%, transparent)` }}
      >
        <Icon className="size-4" strokeWidth={2} style={{ color }} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold" style={{ color: 'var(--ink)' }}>
          {name}
        </p>
        <p className="truncate text-xs lnum" style={{ color: 'var(--muted)' }}>
          {number}
        </p>
      </div>
    </div>
  )
}
