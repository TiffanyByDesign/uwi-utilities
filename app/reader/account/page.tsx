import { CalendarClock, Mail, MapPin, Phone } from 'lucide-react'
import { ASSIGNED, READER, routeProgress } from '@/components/reader/data'

export default function ReaderAccount() {
  const { done, total } = routeProgress()
  const halls = [...new Set(ASSIGNED.map((r) => r.hall))]

  return (
    <div className="mx-auto max-w-2xl space-y-5 p-4 sm:p-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--ink)' }}>
          Account
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
          Your reader profile and today&rsquo;s assignment.
        </p>
      </div>

      <section
        className="rounded-2xl border p-5"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
      >
        <div className="flex items-center gap-3">
          <span
            className="grid size-12 place-items-center rounded-2xl text-base font-bold"
            style={{ background: 'color-mix(in srgb, var(--accent) 14%, transparent)', color: 'var(--accent-strong)' }}
          >
            CF
          </span>
          <div>
            <p className="font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
              {READER.name}
            </p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              Meter Reader · Estate Management
            </p>
          </div>
        </div>
        <dl className="mt-4 space-y-3">
          <Row label="Email">
            <span className="flex items-center justify-end gap-1.5">
              <Mail className="size-3.5 shrink-0" strokeWidth={2} />
              carl.francis@uwimona.edu.jm
            </span>
          </Row>
          <Row label="Phone">
            <span className="flex items-center justify-end gap-1.5">
              <Phone className="size-3.5 shrink-0" strokeWidth={2} />
              (876) 555-0188
            </span>
          </Row>
        </dl>
      </section>

      <section
        className="rounded-2xl border p-5"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
      >
        <h3 className="font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
          Current assignment
        </h3>
        <dl className="mt-3 space-y-3">
          <Row label="Route">
            <span className="flex items-center justify-end gap-1.5">
              <MapPin className="size-3.5 shrink-0" strokeWidth={2} />
              {READER.route}
            </span>
          </Row>
          <Row label="Cycle">
            <span className="flex items-center justify-end gap-1.5">
              <CalendarClock className="size-3.5 shrink-0" strokeWidth={2} />
              {READER.cycle}
            </span>
          </Row>
          <Row label="Halls">{halls.join(', ')}</Row>
          <Row label="Progress">
            <span className="lnum">
              {done} / {total} meters read
            </span>
          </Row>
        </dl>
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
