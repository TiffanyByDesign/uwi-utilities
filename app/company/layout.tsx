import { AppShell } from '@/components/shell/app-shell'
import { RoleSwitcher } from '@/components/shell/role-switcher'
import { COMPANY } from '@/components/company/data'

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="app" style={{ background: 'var(--bg)' }}>
      <AppShell
        role="company"
        portal="Business Unit"
        user={{ name: COMPANY.short, sub: `Account ${COMPANY.accountNo}` }}
      >
        {children}
      </AppShell>
      <RoleSwitcher />
    </div>
  )
}
