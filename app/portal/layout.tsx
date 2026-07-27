import { AppShell } from '@/components/shell/app-shell'
import { RoleSwitcher } from '@/components/shell/role-switcher'
import { CLIENT } from '@/components/portal/data'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="app" style={{ background: 'var(--bg)' }}>
      <AppShell
        role="client"
        portal="Resident portal"
        user={{ name: CLIENT.name, sub: CLIENT.property }}
      >
        {children}
      </AppShell>
      <RoleSwitcher />
    </div>
  )
}
