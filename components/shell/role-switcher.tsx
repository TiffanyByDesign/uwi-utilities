'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/** Demo-only helper: hop between the portals without editing the URL.
 *  There's no auth/role routing in the prototype, so this stands in for it. */
const ROLES = [
  { label: 'Resident', href: '/portal' },
  { label: 'Business Unit', href: '/company' },
  { label: 'Meter Reader', href: '/reader' },
  { label: 'Admin', href: '/admin' },
]

export function RoleSwitcher() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 print:hidden">
      <div
        className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border p-1"
        style={{ borderColor: 'var(--line-2)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
      >
        <span
          className="hidden shrink-0 px-2 text-[10px] font-bold uppercase tracking-wider sm:inline"
          style={{ color: 'var(--muted)' }}
        >
          Demo
        </span>
        {ROLES.map((r) => {
          const on = pathname === r.href || pathname.startsWith(`${r.href}/`)
          return (
            <Link
              key={r.href}
              href={r.href}
              className="shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors"
              style={{ background: on ? 'var(--brand)' : 'transparent', color: on ? '#fff' : 'var(--ink-2)' }}
            >
              {r.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
