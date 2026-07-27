/**
 * Admin — sample users for the access-management screen.
 * Design-only prototype: invented people.
 */

export type Role = 'admin' | 'officer' | 'reader' | 'housing' | 'bursary'
export type Status = 'active' | 'invited' | 'suspended'

export type UserRow = {
  id: string
  name: string
  email: string
  role: Role
  status: Status
}

export const ROLE_LABEL: Record<Role, string> = {
  admin: 'Administrator',
  officer: 'E&U Officer',
  reader: 'Meter Reader',
  housing: 'Housing',
  bursary: 'Bursary',
}

export const STATUS_META: Record<Status, { label: string; color: string; wash: string }> = {
  active: { label: 'Active', color: 'var(--ok)', wash: 'var(--ok-wash)' },
  invited: { label: 'Invited', color: 'var(--warn)', wash: 'var(--warn-wash)' },
  suspended: { label: 'Suspended', color: 'var(--bad)', wash: 'var(--bad-wash)' },
}

export const USERS: UserRow[] = [
  { id: 'u1', name: 'Emmellia Hayden', email: 'emmellia.hayden@uwimona.edu.jm', role: 'admin', status: 'active' },
  { id: 'u2', name: 'Rudolf McDonald', email: 'rudolf.mcdonald@uwimona.edu.jm', role: 'officer', status: 'active' },
  { id: 'u3', name: 'Paula Simms', email: 'paula.simms@uwimona.edu.jm', role: 'officer', status: 'active' },
  { id: 'u4', name: 'Carl Francis', email: 'carl.francis@uwimona.edu.jm', role: 'reader', status: 'active' },
  { id: 'u5', name: 'Devon Wright', email: 'devon.wright@uwimona.edu.jm', role: 'reader', status: 'active' },
  { id: 'u6', name: 'Marcia Bell', email: 'marcia.bell@uwimona.edu.jm', role: 'reader', status: 'invited' },
  { id: 'u7', name: 'Tanya Green', email: 'tanya.green@uwimona.edu.jm', role: 'housing', status: 'active' },
  { id: 'u8', name: 'Roydel Palmer', email: 'roydel.palmer@uwimona.edu.jm', role: 'bursary', status: 'active' },
  { id: 'u9', name: 'Keino Bailey', email: 'keino.bailey@uwimona.edu.jm', role: 'reader', status: 'suspended' },
]

export function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
