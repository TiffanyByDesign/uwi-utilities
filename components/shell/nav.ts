import {
  Activity,
  Building2,
  Calendar,
  ClipboardCheck,
  ClipboardList,
  FileText,
  History,
  Home,
  LayoutGrid,
  MessageSquare,
  Receipt,
  SlidersHorizontal,
  TrendingUp,
  Upload,
  User,
  Users,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = { label: string; href: string; icon: LucideIcon }

/** Resident portal — single-account self-service. */
export const CLIENT_NAV: NavItem[] = [
  { label: 'Home', href: '/portal', icon: Home },
  { label: 'Current bill', href: '/portal/bill', icon: Receipt },
  { label: 'Bill history', href: '/portal/history', icon: History },
  { label: 'Usage', href: '/portal/usage', icon: TrendingUp },
  { label: 'Queries', href: '/portal/messages', icon: MessageSquare },
  { label: 'Account', href: '/portal/account', icon: User },
]

/** Business Unit portal — commercial tenants with multiple campus connections. */
export const COMPANY_NAV: NavItem[] = [
  { label: 'Portfolio', href: '/company', icon: LayoutGrid },
  { label: 'Bills', href: '/company/bills', icon: Receipt },
  { label: 'Usage', href: '/company/usage', icon: TrendingUp },
  { label: 'Connections', href: '/company/connections', icon: Building2 },
  { label: 'Queries', href: '/company/messages', icon: MessageSquare },
  { label: 'Account', href: '/company/account', icon: User },
]

/** Meter Reader — mobile-first field capture. */
export const READER_NAV: NavItem[] = [
  { label: "Today's route", href: '/reader', icon: ClipboardList },
  { label: 'Batch upload', href: '/reader/batch', icon: Upload },
  { label: 'History', href: '/reader/history', icon: History },
  { label: 'Account', href: '/reader/account', icon: User },
]

/** Administrator — runs users, rates, cycles, reviews and reports. */
export const ADMIN_NAV: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutGrid },
  { label: 'Reviews', href: '/admin/reviews', icon: ClipboardCheck },
  { label: 'Billing cycle', href: '/admin/cycle', icon: Calendar },
  { label: 'Rates', href: '/admin/rates', icon: SlidersHorizontal },
  { label: 'Reports', href: '/admin/reports', icon: FileText },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Properties', href: '/admin/properties', icon: Home },
  { label: 'Business Units', href: '/admin/business-units', icon: Building2 },
  { label: 'Audit log', href: '/admin/audit', icon: Activity },
]
