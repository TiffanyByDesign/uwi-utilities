/**
 * Admin — report builder options and sample preview data.
 * Design-only prototype: preview rows are illustrative.
 */

export type ReportKind = { id: string; label: string; blurb: string }

export const REPORT_KINDS: ReportKind[] = [
  { id: 'billing', label: 'Billing summary', blurb: 'Totals billed this cycle, by utility.' },
  { id: 'consumption', label: 'Consumption by hall', blurb: 'Electricity and water per hall.' },
  { id: 'bursary', label: 'Bursary export', blurb: 'Approved charges for the Bursary.' },
  { id: 'payroll', label: 'Payroll deductions', blurb: 'Staff utility deductions for Payroll.' },
]

export const PERIODS = ['July 2026', 'June 2026', 'May 2026']

export type Preview = { columns: string[]; rows: string[][]; note: string }

export const PREVIEW: Record<string, Preview> = {
  billing: {
    columns: ['Utility', 'Accounts', 'Consumption', 'Amount'],
    rows: [
      ['Electricity', '742', '2,000,129 kWh', 'J$118.5M'],
      ['Water', '466', '3,120,412 gal', 'J$5.8M'],
    ],
    note: '2 utilities · J$124.3M total',
  },
  consumption: {
    columns: ['Hall', 'Electricity', 'Water'],
    rows: [
      ['Irvine Hall', '412,300 kWh', '688,900 gal'],
      ['Preston Hall', '388,100 kWh', '642,400 gal'],
      ['Taylor Hall', '401,750 kWh', '655,120 gal'],
    ],
    note: 'By hall · this cycle',
  },
  bursary: {
    columns: ['Account', 'Property', 'Amount'],
    rows: [
      ['UWI-4821', 'Irvine A11', 'J$35,139'],
      ['UWI-4830', 'Preston C02', 'J$41,220'],
      ['UWI-4844', 'Taylor A02', 'J$29,880'],
    ],
    note: 'Approved charges only',
  },
  payroll: {
    columns: ['Staff ID', 'Name', 'Deduction'],
    rows: [
      ['E-2231', 'R. McDonald', 'J$18,400'],
      ['E-2245', 'P. Simms', 'J$22,150'],
    ],
    note: 'For salary deduction',
  },
}
