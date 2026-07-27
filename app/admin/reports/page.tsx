'use client'

import { useState } from 'react'
import { Download, FileText, Printer } from 'lucide-react'
import { PERIODS, PREVIEW, REPORT_KINDS } from '@/components/admin/reports'

export default function ReportsPage() {
  const [kind, setKind] = useState(REPORT_KINDS[0].id)
  const [period, setPeriod] = useState(PERIODS[0])

  const preview = PREVIEW[kind]
  const label = REPORT_KINDS.find((k) => k.id === kind)?.label ?? 'Report'

  function exportCsv() {
    const rows = [preview.columns, ...preview.rows]
    const csv = rows.map((r) => r.map((f) => `"${f}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `${kind}-${period.replace(/\s+/g, '-')}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-5 p-5 sm:p-8">
      <div className="print:hidden">
        <h2 className="font-display text-2xl font-bold tracking-tight" style={{ color: 'var(--ink)' }}>
          Reports &amp; exports
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
          Build a report for the Bursary, Payroll, Housing or management.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {/* Builder */}
        <div className="space-y-4 print:hidden">
          <section
            className="rounded-2xl border p-5"
            style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
              Report
            </p>
            <div className="mt-2 space-y-2">
              {REPORT_KINDS.map((k) => {
                const on = kind === k.id
                return (
                  <button
                    key={k.id}
                    type="button"
                    onClick={() => setKind(k.id)}
                    aria-pressed={on}
                    className="w-full rounded-xl border p-3 text-left transition-colors"
                    style={{
                      borderColor: on ? 'var(--accent)' : 'var(--line)',
                      background: on ? 'var(--accent-wash)' : 'transparent',
                    }}
                  >
                    <span className="block text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                      {k.label}
                    </span>
                    <span className="block text-xs" style={{ color: 'var(--muted)' }}>
                      {k.blurb}
                    </span>
                  </button>
                )
              })}
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
              Period
            </p>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              aria-label="Reporting period"
              className="mt-2 w-full rounded-xl border px-3 py-2.5 text-sm font-medium outline-none"
              style={{ borderColor: 'var(--line)', background: 'var(--raised)', color: 'var(--ink)' }}
            >
              {PERIODS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            <div className="mt-5 space-y-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-semibold text-white"
                style={{ background: 'var(--brand)' }}
              >
                <Printer className="size-4" strokeWidth={2.25} />
                Export PDF
              </button>
              <button
                type="button"
                onClick={exportCsv}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-semibold"
                style={{ borderColor: 'var(--line)', color: 'var(--ink-2)' }}
              >
                <Download className="size-4" strokeWidth={2} />
                Export CSV
              </button>
            </div>
          </section>
        </div>

        {/* Preview */}
        <div className="min-w-0 xl:col-span-2">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider print:hidden" style={{ color: 'var(--muted)' }}>
            Live preview
          </p>
          <section
            id="report"
            className="rounded-2xl border p-5 sm:p-6"
            style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
          >
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-lg" style={{ background: 'var(--accent-wash)' }}>
                <FileText className="size-5" strokeWidth={1.9} style={{ color: 'var(--accent-strong)' }} />
              </span>
              <div>
                <h3 className="font-display text-base font-bold" style={{ color: 'var(--ink)' }}>
                  {label}
                </h3>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>
                  {period} · {preview.note}
                </p>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ color: 'var(--muted)' }}>
                    {preview.columns.map((c, i) => (
                      <th
                        key={c}
                        className={`border-b pb-2 text-xs font-semibold uppercase tracking-wider ${i === 0 ? 'text-left' : 'text-right'}`}
                        style={{ borderColor: 'var(--line)' }}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.rows.map((row, ri) => (
                    <tr key={ri} className="border-b" style={{ borderColor: 'var(--line)' }}>
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={`py-2.5 lnum ${ci === 0 ? 'text-left font-semibold' : 'text-right'}`}
                          style={{ color: ci === 0 ? 'var(--ink)' : 'var(--ink-2)' }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
