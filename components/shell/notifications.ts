/** Sample notifications per role, shown in the topbar bell dropdown.
 *  Design-only prototype: invented items. */

export type Notif = {
  id: string
  title: string
  detail: string
  when: string
  unread: boolean
  kind: 'info' | 'warn' | 'ok'
}

export const NOTIFS: Record<'client' | 'company' | 'reader' | 'admin', Notif[]> = {
  client: [
    { id: 'c1', title: 'Your July bill is ready', detail: 'J$35,139 due 15 Aug.', when: '5 Jul', unread: true, kind: 'info' },
    { id: 'c2', title: 'Water usage is trending up', detail: 'About 12% above your six-month average.', when: '2 Jul', unread: true, kind: 'warn' },
    { id: 'c3', title: 'Query resolved', detail: 'Your question about the X-Factor charge was answered.', when: '28 Jun', unread: false, kind: 'ok' },
  ],
  company: [
    { id: 'b1', title: 'July statement ready', detail: 'Consolidated across your 3 sites.', when: '5 Jul', unread: true, kind: 'info' },
    { id: 'b2', title: 'Library Café usage high', detail: 'Above its usual range this cycle.', when: '3 Jul', unread: true, kind: 'warn' },
    { id: 'b3', title: 'Sports Complex bill paid', detail: 'Payment received — thank you.', when: '20 Jun', unread: false, kind: 'ok' },
  ],
  reader: [
    { id: 'r1', title: 'New route assigned', detail: 'Irvine & Preston — July cycle.', when: 'Today', unread: true, kind: 'info' },
    { id: 'r2', title: 'Reading flagged by office', detail: 'IRV-B03 water needs a re-check.', when: 'Today', unread: true, kind: 'warn' },
    { id: 'r3', title: 'Reading approved', detail: 'TAY-A01 electricity was signed off.', when: 'Yesterday', unread: false, kind: 'ok' },
  ],
  admin: [
    { id: 'a1', title: '6 readings awaiting review', detail: 'Clear them to unblock this cycle.', when: 'Today', unread: true, kind: 'warn' },
    { id: 'a2', title: 'Suspected leak flagged', detail: 'Vacant house IRV-B03 drawing water.', when: 'Today', unread: true, kind: 'warn' },
    { id: 'a3', title: 'June cycle exported', detail: 'Bursary & Payroll files generated.', when: '3 Jul', unread: false, kind: 'ok' },
  ],
}
