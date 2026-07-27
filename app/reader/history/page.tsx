import { Check, Clock, Droplets, RotateCcw, Zap } from 'lucide-react'

type Utility = 'electricity' | 'water'
type Status = 'approved' | 'pending' | 'correction'

type Entry = {
  id: string
  code: string
  property: string
  utility: Utility
  value: number
  unit: string
  date: string
  status: Status
}

const STATUS_META: Record<Status, { label: string; color: string; wash: string; icon: typeof Check }> = {
  approved: { label: 'Approved', color: 'var(--ok)', wash: 'var(--ok-wash)', icon: Check },
  pending: { label: 'In review', color: 'var(--warn)', wash: 'var(--warn-wash)', icon: Clock },
  correction: { label: 'Correction asked', color: 'var(--bad)', wash: 'var(--bad-wash)', icon: RotateCcw },
}

const ENTRIES: Entry[] = [
  { id: 'e1', code: 'IRV-A10', property: 'Block A, House 10', utility: 'electricity', value: 12_475, unit: 'kWh', date: '18 Jul · 09:14', status: 'approved' },
  { id: 'e2', code: 'IRV-A10', property: 'Block A, House 10', utility: 'water', value: 187_900, unit: 'gal', date: '18 Jul · 09:15', status: 'approved' },
  { id: 'e3', code: 'IRV-B03', property: 'Block B, House 3', utility: 'water', value: 214_320, unit: 'gal', date: '18 Jul · 10:02', status: 'pending' },
  { id: 'e4', code: 'TAY-A01', property: 'Block A, House 1', utility: 'electricity', value: 480, unit: 'kWh', date: '17 Jul · 14:30', status: 'correction' },
  { id: 'e5', code: 'PRE-C01', property: 'Block C, House 1', utility: 'electricity', value: 7_720, unit: 'kWh', date: '18 Jul · 11:20', status: 'approved' },
]

export default function ReaderHistory() {
  return (
    <div className="mx-auto max-w-2xl space-y-5 p-4 sm:p-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--ink)' }}>
          Reading history
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--ink-2)' }}>
          Readings you&rsquo;ve submitted and where they are in review.
        </p>
      </div>

      <ul className="space-y-2">
        {ENTRIES.map((e) => {
          const Icon = e.utility === 'electricity' ? Zap : Droplets
          const color = e.utility === 'electricity' ? 'var(--elec)' : 'var(--water)'
          const uname = e.utility === 'electricity' ? 'Electricity' : 'Water'
          const s = STATUS_META[e.status]
          const SIcon = s.icon
          return (
            <li
              key={e.id}
              className="animate-fade-rise flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border p-3.5"
              style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
            >
              <span
                className="grid size-10 shrink-0 place-items-center rounded-xl"
                style={{ background: `color-mix(in srgb, ${color} 16%, transparent)` }}
              >
                <Icon className="size-5" strokeWidth={1.9} style={{ color }} />
              </span>
              <div className="min-w-[9rem] flex-1">
                <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                  {e.code} · {uname}
                </p>
                <p className="text-xs lnum" style={{ color: 'var(--muted)' }}>
                  {e.property} · {e.date}
                </p>
              </div>
              <p className="text-sm font-semibold lnum" style={{ color: 'var(--ink)' }}>
                {e.value.toLocaleString()} {e.unit}
              </p>
              <span
                className="flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                style={{ background: s.wash, color: s.color }}
              >
                <SIcon className="size-3" strokeWidth={2.5} />
                {s.label}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
