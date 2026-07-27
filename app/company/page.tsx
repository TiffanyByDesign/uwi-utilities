import Link from 'next/link'
import { ArrowRight, Droplets, Zap } from 'lucide-react'
import { CountUp } from '@/components/shell/count-up'
import { COMPANY, PORTFOLIO, SITE_BILLS, money, type SiteBill } from '@/components/company/data'

export default function CompanyPortfolio() {
  return (
    <div className="space-y-5 p-5 sm:p-8">
      <div className="animate-fade-rise">
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--ink)' }}>
          {COMPANY.short}
        </h2>
        <p className="mt-1 text-sm lnum" style={{ color: 'var(--ink-2)' }}>
          Account {COMPANY.accountNo} · {COMPANY.period} cycle
        </p>
      </div>

      {/* Portfolio summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Tile label="Outstanding" value={<CountUp value={PORTFOLIO.outstanding} prefix="J$" />} hint={`Across ${PORTFOLIO.dueSites} sites`} color="var(--accent-strong)" tint="var(--accent)" delay={0} />
        <Tile label="This cycle" value={<CountUp value={PORTFOLIO.total} prefix="J$" />} hint="All sites combined" color="var(--ink)" delay={70} />
        <Tile label="Sites" value={<CountUp value={PORTFOLIO.sites} />} hint="Connected on campus" color="var(--ink)" delay={140} />
        <Tile label="Due" value={<CountUp value={PORTFOLIO.dueSites} />} hint="Awaiting payment" color="var(--warn)" tint="var(--warn)" delay={210} />
      </div>

      {/* Sites */}
      <section className="animate-fade-rise" style={{ animationDelay: '280ms' }}>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
            Your sites
          </h3>
          <Link
            href="/company/bills"
            className="inline-flex items-center gap-1 text-xs font-semibold"
            style={{ color: 'var(--accent-strong)' }}
          >
            View all bills
            <ArrowRight className="size-3.5" strokeWidth={2.25} />
          </Link>
        </div>
        <div className="space-y-2">
          {SITE_BILLS.map((b, i) => (
            <SiteRow key={b.site.id} b={b} delay={320 + i * 60} />
          ))}
        </div>
      </section>
    </div>
  )
}

function Tile({
  label,
  value,
  hint,
  color,
  tint,
  delay = 0,
}: {
  label: string
  value: React.ReactNode
  hint: string
  color: string
  tint?: string
  delay?: number
}) {
  return (
    <div
      className="animate-fade-rise relative overflow-hidden rounded-2xl border p-5"
      style={{
        borderColor: tint ? `color-mix(in srgb, ${tint} 20%, var(--line))` : 'var(--line)',
        background: tint
          ? `linear-gradient(140deg, color-mix(in srgb, ${tint} 11%, var(--surface)) 0%, var(--surface) 60%)`
          : 'var(--surface)',
        boxShadow: 'var(--shadow)',
        animationDelay: `${delay}ms`,
      }}
    >
      {tint && (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-10 size-28 rounded-full opacity-30 blur-2xl"
          style={{ background: tint }}
        />
      )}
      <p className="relative text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
        {label}
      </p>
      <p className="relative mt-2 text-3xl font-bold tracking-tight lnum" style={{ color }}>
        {value}
      </p>
      <p className="relative mt-1 text-xs" style={{ color: 'var(--muted)' }}>
        {hint}
      </p>
    </div>
  )
}

function SiteRow({ b, delay }: { b: SiteBill; delay: number }) {
  const due = b.site.status === 'due'
  return (
    <Link
      href="/company/bills"
      className="animate-fade-rise flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border p-4 transition-transform duration-200 hover:-translate-y-0.5"
      style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)', animationDelay: `${delay}ms` }}
    >
      <div className="min-w-[10rem] flex-1">
        <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
          {b.site.name}
        </p>
        <p className="text-xs lnum" style={{ color: 'var(--muted)' }}>
          {b.site.code}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Mini icon={Zap} color="var(--elec)" value={`${b.elecUse.toLocaleString()} kWh`} />
        <Mini icon={Droplets} color="var(--water)" value={`${b.waterUse.toLocaleString()} gal`} />
      </div>

      <div className="ml-auto text-right">
        <p className="text-sm font-bold lnum" style={{ color: 'var(--ink)' }}>
          {money(b.total)}
        </p>
        <span className="text-xs font-semibold" style={{ color: due ? 'var(--warn)' : 'var(--ok)' }}>
          {due ? 'Due' : 'Paid'}
        </span>
      </div>
    </Link>
  )
}

function Mini({ icon: Icon, color, value }: { icon: typeof Zap; color: string; value: string }) {
  return (
    <span className="flex items-center gap-1.5 text-xs lnum" style={{ color: 'var(--ink-2)' }}>
      <Icon className="size-3.5" strokeWidth={2} style={{ color }} />
      {value}
    </span>
  )
}
