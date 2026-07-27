import { AppShell } from '@/components/shell/app-shell'
import { RoleSwitcher } from '@/components/shell/role-switcher'
import { ADMIN } from '@/components/admin/data'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="app" style={{ background: 'var(--bg)' }}>
      <AppShell
        role="admin"
        portal="Administrator"
        user={{ name: ADMIN.name, sub: 'Estate Management' }}
      >
        {children}
      </AppShell>
      <RoleSwitcher />
    </div>
  )
}
