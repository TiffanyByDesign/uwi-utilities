/** Admin — sample audit trail. Design-only prototype. */

export type AuditKind = 'reading' | 'bill' | 'rate' | 'user' | 'cycle'

export type AuditEntry = {
  id: string
  actor: string
  action: string
  target: string
  kind: AuditKind
  when: string
}

export const KIND: Record<AuditKind, { label: string; color: string }> = {
  reading: { label: 'Reading', color: 'var(--accent-strong)' },
  bill: { label: 'Bill', color: 'var(--gold)' },
  rate: { label: 'Rate', color: 'var(--warn)' },
  user: { label: 'User', color: 'var(--ink-2)' },
  cycle: { label: 'Cycle', color: 'var(--ok)' },
}

export const AUDIT: AuditEntry[] = [
  { id: '1', actor: 'Paula Simms', action: 'approved reading', target: 'IRV-A10-E', kind: 'reading', when: 'Today · 09:20' },
  { id: '2', actor: 'Emmellia Hayden', action: 'updated electricity rates', target: 'JPS tariff', kind: 'rate', when: 'Today · 08:55' },
  { id: '3', actor: 'Carl Francis', action: 'submitted 6 readings', target: 'Irvine & Preston route', kind: 'reading', when: 'Today · 08:10' },
  { id: '4', actor: 'Rudolf McDonald', action: 'rejected reading', target: 'PRE-D05-E (estimate)', kind: 'reading', when: 'Yesterday · 16:40' },
  { id: '5', actor: 'Emmellia Hayden', action: 'added user', target: 'Marcia Bell (Meter Reader)', kind: 'user', when: 'Yesterday · 14:05' },
  { id: '6', actor: 'Paula Simms', action: 'published bills', target: 'June 2026 cycle', kind: 'cycle', when: '03 Jul · 10:15' },
  { id: '7', actor: 'Rudolf McDonald', action: 'exported Bursary report', target: 'June 2026', kind: 'bill', when: '01 Jul · 15:00' },
  { id: '8', actor: 'Emmellia Hayden', action: 'suspended user', target: 'Keino Bailey', kind: 'user', when: '28 Jun · 11:30' },
]

export function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
