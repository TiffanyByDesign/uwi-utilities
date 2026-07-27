/**
 * Meter Reader — sample assigned route for one cycle.
 * Design-only prototype: figures are invented. A route is a list of meters the
 * reader has to visit; each property has an electricity and a water meter.
 */

export type Utility = 'electricity' | 'water'

export type Reading = {
  id: string
  code: string
  property: string
  hall: string
  utility: Utility
  meterNo: string
  unit: 'kWh' | 'gal'
  previous: number
  previousDate: string
  /** Typical consumption for this meter — used to flag an unusually high read. */
  typical: number
  status: 'due' | 'done'
  /** Present when already read this cycle. */
  captured?: number
}

export const READER = {
  name: 'Carl Francis',
  route: 'Irvine & Preston',
  cycle: 'July 2026',
}

export const ASSIGNED: Reading[] = [
  { id: 'IRV-A10-E', code: 'IRV-A10', property: 'Block A, House 10', hall: 'Irvine Hall', utility: 'electricity', meterNo: 'E-123-40129-124', unit: 'kWh', previous: 12_030, previousDate: '03 Jun', typical: 440, status: 'done', captured: 12_475 },
  { id: 'IRV-A10-W', code: 'IRV-A10', property: 'Block A, House 10', hall: 'Irvine Hall', utility: 'water', meterNo: 'W-556-90211-087', unit: 'gal', previous: 182_300, previousDate: '03 Jun', typical: 5_600, status: 'done', captured: 187_900 },
  { id: 'IRV-A11-E', code: 'IRV-A11', property: 'Block A, House 11', hall: 'Irvine Hall', utility: 'electricity', meterNo: 'E-123-40130-124', unit: 'kWh', previous: 9_820, previousDate: '03 Jun', typical: 410, status: 'due' },
  { id: 'IRV-A11-W', code: 'IRV-A11', property: 'Block A, House 11', hall: 'Irvine Hall', utility: 'water', meterNo: 'W-556-90212-087', unit: 'gal', previous: 164_500, previousDate: '03 Jun', typical: 5_200, status: 'due' },
  { id: 'IRV-B03-E', code: 'IRV-B03', property: 'Block B, House 3', hall: 'Irvine Hall', utility: 'electricity', meterNo: 'E-123-40131-124', unit: 'kWh', previous: 15_640, previousDate: '03 Jun', typical: 380, status: 'due' },
  { id: 'IRV-B03-W', code: 'IRV-B03', property: 'Block B, House 3', hall: 'Irvine Hall', utility: 'water', meterNo: 'W-556-90213-087', unit: 'gal', previous: 201_780, previousDate: '03 Jun', typical: 4_900, status: 'due' },
  { id: 'PRE-C01-E', code: 'PRE-C01', property: 'Block C, House 1', hall: 'Preston Hall', utility: 'electricity', meterNo: 'E-123-40140-124', unit: 'kWh', previous: 7_410, previousDate: '03 Jun', typical: 300, status: 'due' },
  { id: 'PRE-C01-W', code: 'PRE-C01', property: 'Block C, House 1', hall: 'Preston Hall', utility: 'water', meterNo: 'W-556-90220-087', unit: 'gal', previous: 233_050, previousDate: '03 Jun', typical: 5_100, status: 'due' },
]

export function readingById(id: string) {
  return ASSIGNED.find((r) => r.id === id)
}

export function routeProgress() {
  const done = ASSIGNED.filter((r) => r.status === 'done').length
  return { done, total: ASSIGNED.length }
}
