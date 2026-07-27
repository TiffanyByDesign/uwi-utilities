'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AlertTriangle, Bell, Check, Info, LogOut, Menu, X } from 'lucide-react'
import { ADMIN_NAV, CLIENT_NAV, COMPANY_NAV, READER_NAV, type NavItem } from './nav'
import { NOTIFS } from './notifications'
import { ThemeToggle } from './theme-toggle'

type Props = {
  role: 'client' | 'company' | 'reader' | 'admin'
  portal: string
  user: { name: string; sub: string }
  children: React.ReactNode
}

const NAVS: Record<Props['role'], NavItem[]> = {
  client: CLIENT_NAV,
  company: COMPANY_NAV,
  reader: READER_NAV,
  admin: ADMIN_NAV,
}

/**
 * The shared app frame for every signed-in role. Desktop gets a fixed sidebar;
 * below `lg` it collapses to a top bar with a slide-over drawer. Colours come
 * from the `.app` theme tokens, so the whole thing follows the theme toggle.
 *
 * `role` picks the nav here on the client — the nav items carry icon components,
 * which can't be serialised across the server→client boundary as props.
 */
export function AppShell({ role, portal, user, children }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifs, setNotifs] = useState(NOTIFS[role])
  const unread = notifs.filter((n) => n.unread).length
  const nav = NAVS[role]
  const rootHref = nav[0]?.href

  const isActive = (href: string) =>
    href === pathname || (href !== rootHref && pathname.startsWith(`${href}/`))

  const active = nav.find((n) => isActive(n.href))

  const Brand = () => (
    <div className="flex items-center gap-3 px-5 py-5">
      <span
        className="grid size-10 shrink-0 place-items-center rounded-xl border bg-white p-1"
        style={{ borderColor: 'var(--line)' }}
      >
        <Image
          src="/uwi-crest.png"
          alt="The University of the West Indies"
          width={36}
          height={36}
          className="size-full object-contain"
        />
      </span>
      <div className="min-w-0">
        <p className="font-display text-sm font-bold leading-tight" style={{ color: 'var(--ink)' }}>
          UWI Utilities
        </p>
        <p className="text-[11px]" style={{ color: 'var(--muted)' }}>
          {portal}
        </p>
      </div>
    </div>
  )

  const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
      {nav.map(({ label, href, icon: Icon }) => {
        const on = isActive(href)
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={on ? 'page' : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
              on
                ? 'font-semibold'
                : 'font-medium hover:translate-x-0.5 hover:bg-[color-mix(in_srgb,var(--ink)_5%,transparent)]'
            }`}
            style={{
              color: on ? 'var(--accent-strong)' : 'var(--ink-2)',
              background: on ? 'color-mix(in srgb, var(--accent) 14%, transparent)' : 'transparent',
              boxShadow: on ? 'inset 0 0 0 1px color-mix(in srgb, var(--accent) 22%, transparent)' : 'none',
            }}
          >
            <Icon
              className="size-[18px] shrink-0"
              strokeWidth={1.9}
              style={{ color: on ? 'var(--accent-strong)' : 'var(--muted)' }}
            />
            {label}
          </Link>
        )
      })}
    </nav>
  )

  const Account = () => (
    <div className="flex items-center gap-2 border-t px-4 py-3.5" style={{ borderColor: 'var(--line)' }}>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold" style={{ color: 'var(--ink)' }}>
          {user.name}
        </p>
        <p className="truncate text-[11px]" style={{ color: 'var(--muted)' }}>
          {user.sub}
        </p>
      </div>
      <Link
        href="/"
        aria-label="Log out"
        title="Log out"
        className="grid size-8 shrink-0 place-items-center rounded-lg transition-colors hover:bg-black/5"
        style={{ color: 'var(--muted)' }}
      >
        <LogOut className="size-4" strokeWidth={1.9} />
      </Link>
    </div>
  )

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside
        className="hidden w-64 shrink-0 flex-col border-r lg:flex"
        style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
      >
        <Brand />
        <NavLinks />
        <Account />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <aside
            className="absolute inset-y-0 left-0 flex w-72 max-w-[82%] flex-col border-r"
            style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}
          >
            <div className="flex items-center justify-between pr-2">
              <Brand />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-9 place-items-center rounded-lg"
                style={{ color: 'var(--muted)' }}
              >
                <X className="size-5" strokeWidth={2} />
              </button>
            </div>
            <NavLinks onNavigate={() => setOpen(false)} />
            <Account />
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b px-4 sm:px-6"
          style={{
            borderColor: 'var(--line)',
            background: 'color-mix(in srgb, var(--surface) 86%, transparent)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid size-9 place-items-center rounded-lg lg:hidden"
            style={{ color: 'var(--ink-2)' }}
          >
            <Menu className="size-5" strokeWidth={2} />
          </button>
          <h1 className="font-display text-lg font-bold" style={{ color: 'var(--ink)' }}>
            {active?.label ?? portal}
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotifOpen((o) => !o)}
                aria-label="Notifications"
                aria-expanded={notifOpen}
                className="relative grid size-9 place-items-center rounded-lg transition-colors hover:bg-black/5"
                style={{ color: 'var(--ink-2)' }}
              >
                <Bell className="size-[18px]" strokeWidth={1.9} />
                {unread > 0 && (
                  <span
                    className="absolute -right-0.5 -top-0.5 grid min-w-[15px] place-items-center rounded-full px-1 text-[9px] font-bold text-white"
                    style={{ background: 'var(--bad)' }}
                  >
                    {unread}
                  </span>
                )}
              </button>

              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} aria-hidden="true" />
                  <div
                    className="absolute right-0 z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border"
                    style={{ borderColor: 'var(--line)', background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
                  >
                    <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: 'var(--line)' }}>
                      <p className="font-display text-sm font-bold" style={{ color: 'var(--ink)' }}>
                        Notifications
                      </p>
                      {unread > 0 && (
                        <button
                          type="button"
                          onClick={() => setNotifs((ns) => ns.map((n) => ({ ...n, unread: false })))}
                          className="text-xs font-semibold"
                          style={{ color: 'var(--accent-strong)' }}
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                    <ul className="max-h-[60vh] overflow-y-auto">
                      {notifs.map((n) => {
                        const c = n.kind === 'warn' ? 'var(--warn)' : n.kind === 'ok' ? 'var(--ok)' : 'var(--accent-strong)'
                        const w = n.kind === 'warn' ? 'var(--warn-wash)' : n.kind === 'ok' ? 'var(--ok-wash)' : 'var(--accent-wash)'
                        const NIcon = n.kind === 'warn' ? AlertTriangle : n.kind === 'ok' ? Check : Info
                        return (
                          <li
                            key={n.id}
                            className="flex gap-3 border-b px-4 py-3 last:border-b-0"
                            style={{ borderColor: 'var(--line)', background: n.unread ? 'color-mix(in srgb, var(--accent) 5%, transparent)' : 'transparent' }}
                          >
                            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg" style={{ background: w }}>
                              <NIcon className="size-4" strokeWidth={2} style={{ color: c }} />
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                                {n.title}
                              </p>
                              <p className="text-xs" style={{ color: 'var(--ink-2)' }}>
                                {n.detail}
                              </p>
                              <p className="mt-0.5 text-[11px]" style={{ color: 'var(--muted)' }}>
                                {n.when}
                              </p>
                            </div>
                            {n.unread && <span className="mt-1.5 size-2 shrink-0 rounded-full" style={{ background: 'var(--accent)' }} />}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </>
              )}
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  )
}
