/**
 * Client portal — sample data for one account.
 *
 * Design-only prototype: the figures are realistic but invented. Electricity
 * follows the real JPS tariff shape (tiered energy + flat fuel/IPP pass-throughs);
 * water rates are placeholders and should be swapped for the real NWC tariff.
 */

export type BillLine = { label: string; detail: string; amount: number }

export function money(n: number) {
  return `J$${Math.round(n).toLocaleString()}`
}

export function electricityBill(kwh: number): { lines: BillLine[]; total: number } {
  const first = Math.min(kwh, 100)
  const next = Math.max(0, kwh - 100)
  const lines: BillLine[] = [
    { label: 'Energy — first 100', detail: `${Math.round(first)} kWh @ J$8.310`, amount: first * 8.31 },
    { label: 'Energy — balance', detail: `${Math.round(next)} kWh @ J$23.860`, amount: next * 23.86 },
    { label: 'Fuel charge', detail: `${Math.round(kwh)} kWh @ J$24.335`, amount: kwh * 24.335 },
    { label: 'IPP charge', detail: `${Math.round(kwh)} kWh @ J$11.630`, amount: kwh * 11.63 },
  ]
  return { lines, total: lines.reduce((s, l) => s + l.amount, 0) }
}

export function waterBill(gal: number): { lines: BillLine[]; total: number } {
  const k = gal / 1000
  const b1 = Math.min(k, 3)
  const b2 = Math.min(Math.max(0, k - 3), 6)
  const b3 = Math.max(0, k - 9)
  const lines: BillLine[] = [
    { label: 'Meter rental', detail: 'Fixed, per month', amount: 1132 },
    { label: 'Band 1', detail: `${Math.round(b1 * 1000)} gal @ J$950 / 1,000`, amount: b1 * 950 },
    { label: 'Band 2', detail: `${Math.round(b2 * 1000)} gal @ J$1,890 / 1,000`, amount: b2 * 1890 },
    { label: 'Band 3', detail: `${Math.round(b3 * 1000)} gal @ J$2,640 / 1,000`, amount: b3 * 2640 },
    { label: 'X-Factor', detail: `${Math.round(gal)} gal @ J$210 / 1,000`, amount: k * 210 },
  ].filter((l) => l.amount > 0)
  return { lines, total: lines.reduce((s, l) => s + l.amount, 0) }
}

export const CLIENT = {
  name: 'Danielle Foster',
  kind: 'resident' as 'resident' | 'company',
  accountNo: 'UWI-4821-EL',
  id: 'S-2231045',
  property: 'Irvine Hall · Block A, House 11',
  email: 'danielle.foster@uwimona.edu.jm',
  phone: '(876) 555-0142',
  movedIn: '02 Sep 2025',
  elecMeter: 'E-123-40130-124',
  waterMeter: 'W-556-90212-087',
}

export const READINGS = {
  electricity: {
    previous: 12_030,
    current: 12_475,
    unit: 'kWh',
    date: '02 Jul 2026',
    checkedBy: 'Paula Simms',
  },
  water: {
    previous: 182_300,
    current: 187_900,
    unit: 'gal',
    date: '02 Jul 2026',
    checkedBy: 'Paula Simms',
  },
}

const elecUse = READINGS.electricity.current - READINGS.electricity.previous
const waterUse = READINGS.water.current - READINGS.water.previous
const eBill = electricityBill(elecUse)
const wBill = waterBill(waterUse)

export const BILL = {
  period: 'July 2026',
  issued: '05 Jul 2026',
  due: '15 Aug 2026',
  status: 'Published',
  electricity: { consumption: elecUse, lines: eBill.lines, total: eBill.total, ...READINGS.electricity },
  water: { consumption: waterUse, lines: wBill.lines, total: wBill.total, ...READINGS.water },
  total: eBill.total + wBill.total,
}

export type UsagePoint = { label: string; electricity: number; water: number }
export const USAGE: UsagePoint[] = [
  { label: 'Feb', electricity: 410, water: 5_200 },
  { label: 'Mar', electricity: 468, water: 5_400 },
  { label: 'Apr', electricity: 452, water: 5_600 },
  { label: 'May', electricity: 505, water: 5_350 },
  { label: 'Jun', electricity: 431, water: 5_900 },
  { label: 'Jul', electricity: elecUse, water: waterUse },
]

export type HistoryBill = {
  id: string
  period: string
  total: number
  status: 'Paid' | 'Due'
}
export const BILL_HISTORY: HistoryBill[] = [
  { id: 'BL-4821-07', period: 'July 2026', total: BILL.total, status: 'Due' },
  { id: 'BL-4821-06', period: 'June 2026', total: 33_640, status: 'Paid' },
  { id: 'BL-4821-05', period: 'May 2026', total: 34_910, status: 'Paid' },
  { id: 'BL-4821-04', period: 'April 2026', total: 32_180, status: 'Paid' },
  { id: 'BL-4821-03', period: 'March 2026', total: 33_050, status: 'Paid' },
  { id: 'BL-4821-02', period: 'February 2026', total: 31_720, status: 'Paid' },
]

export type Alert = {
  id: string
  kind: 'info' | 'warn'
  title: string
  detail: string
  when: string
}
export const ALERTS: Alert[] = [
  {
    id: 'a1',
    kind: 'info',
    title: 'Your July bill is ready',
    detail: `${money(BILL.total)} due ${BILL.due}.`,
    when: '05 Jul',
  },
  {
    id: 'a2',
    kind: 'warn',
    title: 'Water usage is trending up',
    detail: 'This cycle is about 12% above your six-month average.',
    when: '02 Jul',
  },
]
