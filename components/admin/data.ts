/**
 * Administrator — sample review queue and cycle summary.
 * Design-only prototype: figures are invented. These are the readings meter
 * readers have submitted this cycle, waiting to be approved before billing.
 */

export type Utility = 'electricity' | 'water'
export type Flag = 'high' | 'below' | 'estimate' | 'none'

export type ReviewItem = {
  id: string
  code: string
  property: string
  hall: string
  utility: Utility
  meterNo: string
  unit: 'kWh' | 'gal'
  previous: number
  submitted: number
  typical: number
  capturedBy: string
  capturedOn: string
  flag: Flag
  reason?: string
  note?: string
  photo?: boolean
}

export const ADMIN = { name: 'Emmellia Hayden', cycle: 'July 2026' }

export const CYCLE = {
  metersRead: 1_160,
  metersTotal: 1_208,
  billingEstimate: 124_300_000,
}

export const FLAG: Record<Flag, { label: string; color: string; wash: string; note: string }> = {
  high: {
    label: 'Unusually high',
    color: 'var(--warn)',
    wash: 'var(--warn-wash)',
    note: 'Well above this meter’s typical usage.',
  },
  below: {
    label: 'Below previous',
    color: 'var(--bad)',
    wash: 'var(--bad-wash)',
    note: 'The reading is lower than last cycle — only valid after a reset or replacement.',
  },
  estimate: {
    label: 'Estimated',
    color: 'var(--warn)',
    wash: 'var(--warn-wash)',
    note: 'No actual read was taken — estimated from history.',
  },
  none: {
    label: 'Routine',
    color: 'var(--muted)',
    wash: 'var(--raised)',
    note: 'Within the expected range for this meter.',
  },
}

export const REVIEWS: ReviewItem[] = [
  { id: 'IRV-B03-W', code: 'IRV-B03', property: 'Block B, House 3', hall: 'Irvine Hall', utility: 'water', meterNo: 'W-556-90213-087', unit: 'gal', previous: 201_780, submitted: 214_320, typical: 4_900, capturedBy: 'Carl Francis', capturedOn: '18 Jul', flag: 'high', note: 'Meter running fast, possible leak at the back of the house.', photo: true },
  { id: 'PRE-D05-E', code: 'PRE-D05', property: 'Block D, House 5', hall: 'Preston Hall', utility: 'electricity', meterNo: 'E-123-40155-124', unit: 'kWh', previous: 18_240, submitted: 18_240, typical: 360, capturedBy: 'Devon Wright', capturedOn: '18 Jul', flag: 'estimate', note: 'Could not access the meter — estimated from last cycle.' },
  { id: 'TAY-A01-E', code: 'TAY-A01', property: 'Block A, House 1', hall: 'Taylor Hall', utility: 'electricity', meterNo: 'E-123-40160-124', unit: 'kWh', previous: 22_010, submitted: 480, typical: 390, capturedBy: 'Marcia Bell', capturedOn: '17 Jul', flag: 'below', reason: 'Meter replaced', note: 'New meter fitted 15 Jul — this is the new unit’s count.' },
  { id: 'IRV-A11-E', code: 'IRV-A11', property: 'Block A, House 11', hall: 'Irvine Hall', utility: 'electricity', meterNo: 'E-123-40130-124', unit: 'kWh', previous: 9_820, submitted: 10_265, typical: 410, capturedBy: 'Carl Francis', capturedOn: '18 Jul', flag: 'none' },
  { id: 'IRV-A11-W', code: 'IRV-A11', property: 'Block A, House 11', hall: 'Irvine Hall', utility: 'water', meterNo: 'W-556-90212-087', unit: 'gal', previous: 164_500, submitted: 170_050, typical: 5_200, capturedBy: 'Carl Francis', capturedOn: '18 Jul', flag: 'none' },
  { id: 'PRE-C01-E', code: 'PRE-C01', property: 'Block C, House 1', hall: 'Preston Hall', utility: 'electricity', meterNo: 'E-123-40140-124', unit: 'kWh', previous: 7_410, submitted: 7_720, typical: 300, capturedBy: 'Carl Francis', capturedOn: '18 Jul', flag: 'none' },
]

export function reviewById(id: string) {
  return REVIEWS.find((r) => r.id === id)
}

export const flaggedCount = REVIEWS.filter((r) => r.flag !== 'none').length

export function moneyShort(n: number) {
  if (n >= 1_000_000) return `J$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `J$${(n / 1_000).toFixed(1)}K`
  return `J$${Math.round(n)}`
}
