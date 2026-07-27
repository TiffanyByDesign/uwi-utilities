import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BILL_HISTORY, money } from '@/components/portal/data'

export default function HistoryPage() {
  const paid = BILL_HISTORY.filter((b) => b.status === 'Paid').reduce((s, b) => s + b.total, 0)

  return (
    <div className="mx-auto max-w-2xl space-y-5 p-4 sm:p-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--ink)' }}>
          Bill history
        </h2>
        <p className="mt-1 text-sm lnum" style={{ color: 'var(--ink-2)' }}>
          {money(paid)} paid over the last {BILL_HISTORY.filter((b) => b.status === 'Paid').length} months.
        </p>
      </div>

      <ul className="space-y-2">
        {BILL_HISTORY.map((b) => {
          const due = b.status === 'Due'
          const inner = (
            <>
              <div className="min-w-[7rem] flex-1">
                <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                  {b.period}
                </p>
                <p className="text-xs lnum" style={{ color: 'var(--muted)' }}>
                  {b.id}
                </p>
              </div>
              <span
                className="rounded-full px-2.5 py-1 text-xs font-semibold"
                style={{
                  background: due ? 'var(--warn-wash)' : 'var(--ok-wash)',
                  color: due ? 'var(--warn)' : 'var(--ok)',
                }}
              >
                {b.status}
              </span>
              <span className="text-base font-bold lnum" style={{ color: 'var(--ink)' }}>
                {money(b.total)}
              </span>
              {due && <ArrowRight className="size-4 shrink-0" strokeWidth={2} style={{ color: 'var(--muted)' }} />}
            </>
          )

          const cls = 'animate-fade-rise flex flex-wrap items-center gap-x-4 gap-y-1 rounded-2xl border p-4'
          const style: React.CSSProperties = {
            borderColor: 'var(--line)',
            background: 'var(--surface)',
            boxShadow: 'var(--shadow)',
          }

          return (
            <li key={b.id}>
              {due ? (
                <Link href="/portal/bill" className={`${cls} transition-transform duration-200 hover:-translate-y-0.5`} style={style}>
                  {inner}
                </Link>
              ) : (
                <div className={cls} style={style}>
                  {inner}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
