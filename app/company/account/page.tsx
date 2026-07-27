import Link from 'next/link'
import { ArrowRight, Building2, Mail, MapPin } from 'lucide-react'
import { COMPANY, SITE_BILLS } from '@/components/company/data'

export default function CompanyAccount() {
  return (
    <div className="mx-auto max-w-2xl space-y-5 p-4 sm:p-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--ink)' }}>
          Account
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
          Your business unit&rsquo;s details and connected sites.
        </p>
      </div>

      <section
        className="rounded-2xl border p-5"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
      >
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl" style={{ background: 'var(--accent-wash)' }}>
            <Building2 className="size-6" strokeWidth={1.8} style={{ color: 'var(--accent-strong)' }} />
          </span>
          <div>
            <p className="font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
              {COMPANY.name}
            </p>
            <p className="text-xs lnum" style={{ color: 'var(--muted)' }}>
              Account {COMPANY.accountNo}
            </p>
          </div>
        </div>
        <dl className="mt-4 space-y-3">
          <Row label="Billing contact">
            <span className="flex items-center justify-end gap-1.5">
              <Mail className="size-3.5 shrink-0" strokeWidth={2} />
              <span className="truncate">{COMPANY.contact}</span>
            </span>
          </Row>
          <Row label="Connections">{SITE_BILLS.length} sites</Row>
          <Row label="Billing period">{COMPANY.period}</Row>
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
        className="rounded-2xl border p-5"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
            Connected sites
          </h3>
          <Link href="/company/connections" className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--accent-strong)' }}>
            Manage
            <ArrowRight className="size-3.5" strokeWidth={2.25} />
          </Link>
        </div>
        <ul className="space-y-2">
          {SITE_BILLS.map((b) => (
            <li
              key={b.site.id}
              className="flex items-center gap-2.5 rounded-xl border p-3"
              style={{ borderColor: 'var(--line)', background: 'var(--raised)' }}
            >
              <MapPin className="size-4 shrink-0" strokeWidth={2} style={{ color: 'var(--muted)' }} />
              <div className="min-w-0">
                <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                  {b.site.name}
                </p>
                <p className="truncate text-xs lnum" style={{ color: 'var(--muted)' }}>
                  {b.site.address} · {b.site.code}
                </p>
              </div>
            </li>
          ))}
        </ul>
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
