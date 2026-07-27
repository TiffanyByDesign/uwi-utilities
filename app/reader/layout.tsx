import { AppShell } from '@/components/shell/app-shell'
import { RoleSwitcher } from '@/components/shell/role-switcher'
import { READER } from '@/components/reader/data'

export default function ReaderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="app" style={{ background: 'var(--bg)' }}>
      <AppShell
        role="reader"
        portal="Meter Reader"
        user={{ name: READER.name, sub: `Route · ${READER.route}` }}
      >
        {children}
      </AppShell>
      <RoleSwitcher />
    </div>
  )
}
