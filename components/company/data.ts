/**
 * Company portal — a commercial tenant with several campus connections.
 * Design-only prototype: figures are invented. Reuses the same bill maths as the
 * resident portal so a company bill and a resident bill can never drift apart.
 */

import { electricityBill, waterBill } from '@/components/portal/data'

export { money } from '@/components/portal/data'

export type Site = {
  id: string
  name: string
  code: string
  address: string
  elecMeter: string
  waterMeter: string
  elecPrev: number
  elecCur: number
  waterPrev: number
  waterCur: number
  status: 'due' | 'paid'
}

export const COMPANY = {
  name: 'Kingston Fried Chicken — Campus',
  short: 'KFC Campus',
  accountNo: 'UWI-CO-3310',
  contact: 'accounts@kfc-campus.jm',
  period: 'July 2026',
  due: '15 Aug 2026',
}

export const SITES: Site[] = [
  { id: 'su', name: 'Student Union outlet', code: 'COM-SU-01', address: 'Ring Road, Student Union', elecMeter: 'E-990-11020-441', waterMeter: 'W-771-33110-208', elecPrev: 48_200, elecCur: 51_340, waterPrev: 612_400, waterCur: 640_100, status: 'due' },
  { id: 'lib', name: 'Library Café', code: 'COM-LB-02', address: 'Main Library, ground floor', elecMeter: 'E-990-11055-441', waterMeter: 'W-771-33145-208', elecPrev: 21_800, elecCur: 23_110, waterPrev: 288_900, waterCur: 301_200, status: 'due' },
  { id: 'sport', name: 'Sports Complex kiosk', code: 'COM-SP-03', address: 'Sports Complex, west wing', elecMeter: 'E-990-11071-441', waterMeter: 'W-771-33162-208', elecPrev: 15_400, elecCur: 16_050, waterPrev: 150_300, waterCur: 158_900, status: 'paid' },
]

export type SiteBill = {
  site: Site
  elecUse: number
  waterUse: number
  electricity: number
  water: number
  total: number
}

export function billFor(s: Site): SiteBill {
  const elecUse = s.elecCur - s.elecPrev
  const waterUse = s.waterCur - s.waterPrev
  const e = electricityBill(elecUse)
  const w = waterBill(waterUse)
  return { site: s, elecUse, waterUse, electricity: e.total, water: w.total, total: e.total + w.total }
}

export const SITE_BILLS: SiteBill[] = SITES.map(billFor)

export const PORTFOLIO = {
  total: SITE_BILLS.reduce((s, b) => s + b.total, 0),
  outstanding: SITE_BILLS.filter((b) => b.site.status === 'due').reduce((s, b) => s + b.total, 0),
  sites: SITES.length,
  dueSites: SITES.filter((s) => s.status === 'due').length,
}

export function siteById(id: string) {
  return SITE_BILLS.find((b) => b.site.id === id)
}
