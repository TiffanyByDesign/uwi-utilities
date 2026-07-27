/** Admin — business units (commercial accounts) the campus bills.
 *  Design-only prototype. */

export { money } from '@/components/portal/data'

export type BizUnit = {
  id: string
  name: string
  accountNo: string
  sites: number
  total: number
  outstanding: number
  status: 'current' | 'overdue'
  contact: string
  portal?: string
}

export const BIZ_UNITS: BizUnit[] = [
  { id: 'kfc', name: 'Kingston Fried Chicken — Campus', accountNo: 'UWI-CO-3310', sites: 3, total: 155_739, outstanding: 118_900, status: 'overdue', contact: 'accounts@kfc-campus.jm', portal: '/company' },
  { id: 'store', name: 'Campus Bookstore', accountNo: 'UWI-CO-3311', sites: 1, total: 42_300, outstanding: 0, status: 'current', contact: 'admin@campusbooks.jm' },
  { id: 'coffee', name: 'The Coffee Kiosk Co.', accountNo: 'UWI-CO-3312', sites: 2, total: 31_500, outstanding: 31_500, status: 'overdue', contact: 'billing@coffeekiosk.jm' },
  { id: 'gym', name: 'Campus Fitness Ltd.', accountNo: 'UWI-CO-3313', sites: 1, total: 88_400, outstanding: 0, status: 'current', contact: 'accounts@campusfitness.jm' },
]
