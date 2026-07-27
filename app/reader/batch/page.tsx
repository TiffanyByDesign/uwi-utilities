'use client'

import { useState } from 'react'
import { AlertTriangle, Check, Download, FileSpreadsheet, Upload } from 'lucide-react'

type RowStatus = 'ready' | 'below' | 'range' | 'format'
type Row = {
  code: string
  property: string
  utility: 'electricity' | 'water'
  value: string
  unit: string
  status: RowStatus
}

const STATUS: Record<RowStatus, { label: string; color: string; wash: string; ok: boolean }> = {
  ready: { label: 'Ready', color: 'var(--ok)', wash: 'var(--ok-wash)', ok: true },
  below: { label: 'Below previous', color: 'var(--bad)', wash: 'var(--bad-wash)', ok: false },
  range: { label: 'Out of range', color: 'var(--warn)', wash: 'var(--warn-wash)', ok: false },
  format: { label: 'Bad format', color: 'var(--bad)', wash: 'var(--bad-wash)', ok: false },
}

const SAMPLE: Row[] = [
  { code: 'IRV-A11', property: 'Block A, House 11', utility: 'electricity', value: '10,265', unit: 'kWh', status: 'ready' },
  { code: 'IRV-A11', property: 'Block A, House 11', utility: 'water', value: '170,050', unit: 'gal', status: 'ready' },
  { code: 'PRE-C01', property: 'Block C, House 1', utility: 'electricity', value: '7,720', unit: 'kWh', status: 'ready' },
  { code: 'IRV-B03', property: 'Block B, House 3', utility: 'water', value: '214,320', unit: 'gal', status: 'range' },
  { code: 'TAY-A01', property: 'Block A, House 1', utility: 'electricity', value: '480', unit: 'kWh', status: 'below' },
  { code: 'CHA-B02', property: 'Block B, House 2', utility: 'electricity', value: '12A45', unit: 'kWh', status: 'format' },
]

export default function BatchUpload() {
  const [rows, setRows] = useState<Row[] | null>(null)
  const [fileName, setFileName] = useState('')

  const ready = rows?.filter((r) => STATUS[r.status].ok).length ?? 0
  const flagged = (rows?.length ?? 0) - ready

  function loadSample() {
    setFileName('july-readings.csv')
    setRows(SAMPLE)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5 p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--ink)' }}>
            Batch upload
          </h2>
          <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
            Upload a cycle of readings from the approved template.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-semibold"
          style={{ borderColor: 'var(--line)', color: 'var(--ink-2)' }}
        >
          <Download className="size-4" strokeWidth={2} />
          Template
        </button>
      </div>

      {!rows ? (
        <button
          type="button"
          onClick={loadSample}
          className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed py-14 text-center transition-colors"
          style={{ borderColor: 'var(--line-2)', background: 'var(--surface)' }}
        >
          <span className="grid size-12 place-items-center rounded-2xl" style={{ background: 'var(--accent-wash)' }}>
            <Upload className="size-6" strokeWidth={1.9} style={{ color: 'var(--accent-strong)' }} />
          </span>
          <span className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
            Drop a CSV here or choose a file
          </span>
          <span className="text-xs" style={{ color: 'var(--muted)' }}>
            Readings are validated before anything is submitted
          </span>
        </button>
      ) : (
        <>
          {/* Summary */}
          <div
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4"
            style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
          >
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-lg" style={{ background: 'var(--accent-wash)' }}>
                <FileSpreadsheet className="size-5" strokeWidth={1.9} style={{ color: 'var(--accent-strong)' }} />
              </span>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                  {fileName}
                </p>
                <p className="text-xs lnum" style={{ color: 'var(--muted)' }}>
                  {rows.length} rows · <span style={{ color: 'var(--ok)' }}>{ready} ready</span> ·{' '}
                  <span style={{ color: 'var(--warn)' }}>{flagged} flagged</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setRows(null)}
              className="text-xs font-semibold"
              style={{ color: 'var(--accent-strong)' }}
            >
              Upload another
            </button>
          </div>

          {/* Results */}
          <div
            className="overflow-hidden rounded-2xl border"
            style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
          >
            <ul>
              {rows.map((r, i) => {
                const s = STATUS[r.status]
                const uname = r.utility === 'electricity' ? 'Electricity' : 'Water'
                return (
                  <li
                    key={i}
                    className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b px-4 py-3 last:border-b-0"
                    style={{ borderColor: 'var(--line)', background: s.ok ? 'transparent' : s.wash }}
                  >
                    <div className="min-w-[9rem] flex-1">
                      <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                        {r.code} · {uname}
                      </p>
                      <p className="text-xs lnum" style={{ color: 'var(--muted)' }}>
                        {r.property}
                      </p>
                    </div>
                    <p className="text-sm font-semibold lnum" style={{ color: s.ok ? 'var(--ink)' : s.color }}>
                      {r.value} {r.unit}
                    </p>
                    <span
                      className="flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                      style={{ background: s.wash, color: s.color }}
                    >
                      {s.ok ? <Check className="size-3" strokeWidth={3} /> : <AlertTriangle className="size-3" strokeWidth={2.5} />}
                      {s.label}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={ready === 0}
              className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-opacity"
              style={{ background: 'var(--brand)', opacity: ready ? 1 : 0.5, cursor: ready ? 'pointer' : 'not-allowed' }}
            >
              <Check className="size-4" strokeWidth={2.5} />
              Submit {ready} ready {ready === 1 ? 'reading' : 'readings'}
            </button>
            {flagged > 0 && (
              <p className="flex items-center text-xs" style={{ color: 'var(--muted)' }}>
                {flagged} flagged {flagged === 1 ? 'row is' : 'rows are'} held back for a fix.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
