# Screen & Tab List

Every screen in the design — **29 in total**: 1 sign-in, 25 menu tabs across
the four kinds of user, and 3 screens you reach by tapping a row.

For each one: **what's on the page** (what a person can see and do) and
**what it still needs** before it works for real.

Everything you see on screen today is made-up sample content. What's finished
is the look, the layout, the menus, and how it behaves on a phone versus a
computer.

---

## Sign in — 1 screen

| # | Screen | Where | On the page | Still needs |
|---|---|---|---|---|
| 0.1 | Sign in | `/` | A full-screen photograph behind a white sign-in card. UWI crest and department name across the top, with language and support buttons. The card takes an ID number and password, has a show-password eye, a "Forgot password?" link, a keep-me-signed-in tick box and a Log in button | **Real sign-in.** Right now the button lets anyone straight in without checking anything. Also needs a way to recover a forgotten password, and to send each person to the right place after logging in |

> **Nothing has been designed yet for:** signing up for an account, the
> forgot-password and reset steps, two-step verification, or what someone sees
> when their account is locked or they type the wrong password. These aren't
> missing from the list — they haven't been designed, so they'd need design
> work before anyone can build them.

---

## 1. Residents — 6 tabs (`/portal`)

Someone living in campus housing, managing their own single account.

| # | Tab | Where | On the page | Still needs |
|---|---|---|---|---|
| 1.1 | Home | `/portal` | A greeting with their property and account number. A large card showing this month's bill — the amount, when it's due, whether it's paid, and how it splits between electricity and water. Below that, this month's usage against last month's, and a short list of notices | Their actual bill, their last two months of usage, and real notices |
| 1.2 | Current bill | `/portal/bill` | The full bill: when it was issued and when it's due, the total owed, and a card each for electricity and water. Each shows the meter reading it was worked out from, when the meter was read, who checked it, and an itemised list of every charge | Real bill figures, and the ability to **download the bill as a PDF** — the button is there but doesn't do anything yet |
| 1.3 | Bill history | `/portal/history` | How much they've paid in total, then a list of past bills — the month, the reference number, whether it's paid or still owing, and the amount. Unpaid ones open the current bill | Their real bill history, and a way to page through it once there's a lot of it |
| 1.4 | Usage | `/portal/usage` | Two graphs — electricity and water — showing six months of consumption. Each says how this month compares to their average, and hovering a point shows the exact figure | At least six months of real monthly readings for each meter |
| 1.5 | Queries | `/portal/messages` | A form to ask a question about a bill or a reading, and a list of previous questions marked Open or Resolved. **Nothing is actually sent** — a message typed here disappears on refresh | Somewhere for messages to go, a way for staff to reply, and a notice to the resident when someone does. Attachments too, if people are expected to send photos |
| 1.6 | Account | `/portal/account` | Their name, ID, email, phone and move-in date, with an "Edit details" button. Below, their property and both meter numbers | Their real details. **The edit form doesn't exist** — the button looks finished but there's no screen behind it, so it has to be designed first |

---

## 2. Business Units — 6 tabs (`/company`)

A commercial tenant — a café, a shop, a kiosk — with several locations across
campus on one account.

| # | Tab | Where | On the page | Still needs |
|---|---|---|---|---|
| 2.1 | Portfolio | `/company` | Four summary figures across the top — what's outstanding, this month's total, how many sites they have, how many are unpaid. Below, each site listed with its electricity and water use, its amount, and whether it's paid | Real totals added up across all their sites |
| 2.2 | Bills | `/company/bills` | One combined statement covering every site, with the total and due date at the top, then a card per site showing how its electricity and water charges break down | Real combined billing across multiple sites, and the PDF download |
| 2.3 | Usage | `/company/usage` | Two bar charts comparing their sites against each other — electricity by site, water by site — with the month's totals | Real consumption figures for each site |
| 2.4 | Connections | `/company/connections` | A row of buttons to switch between "All sites" and each individual site. Picking one shows its address and both meters, with the previous and current readings and the difference between them | A real record of which properties and meters belong to each company |
| 2.5 | Queries | `/company/messages` | The same as the resident version, plus a drop-down to say which site the question is about, and a tag on each message showing it. Nothing is sent yet | The same as 1.5, but able to tell which site a question relates to |
| 2.6 | Account | `/company/account` | The company name, account number, billing contact and how many sites they hold, with an "Edit details" button and a list of connected sites | Their real details. The edit form hasn't been designed |

---

## 3. Meter Readers — 4 tabs + 1 screen (`/reader`)

Staff walking the halls recording meters, working on a phone. These screens are
narrow on purpose — they were designed for a hand, not a desk.

| # | Tab | Where | On the page | Still needs |
|---|---|---|---|---|
| 3.1 | Today's route | `/reader` | How many meters they've done out of today's total, with a progress bar. Then every meter on the route, grouped by house and hall, each showing its last reading and whether it's done or still to do. Tapping one that's due opens the reading screen | A real route assigned to each reader for each round of readings |
| 3.2 | **Taking a reading** | Tap a meter on the route | The meter's details and its last reading, then a large number pad to type the new one. Usage works itself out as they type. Two safety checks are built in: if the new number is **lower than last time** it won't let them submit until they say why (meter replaced, meter reset, or the old reading was wrong), and if it's **far higher than usual** it asks for a photo or a note. Then a photo button, an optional note, and submit — followed by a confirmation offering the next meter | Somewhere for readings to actually be saved. The ability to **take a photo with the phone camera**. And, importantly, a way to **keep working with no signal** and send everything once back in range — the design currently assumes the phone is always online |
| 3.3 | Batch upload | `/reader/batch` | For entering a whole round at once from a spreadsheet. Download the template, drop the file in, and every row is checked before anything is sent — each marked Ready, Below previous, Out of range, or Bad format. Only the good rows can be submitted; problem ones are held back to be fixed. **At the moment, dropping a file just shows a fixed example** | Real reading of the spreadsheet and the four checks, the template file itself, and somewhere to send the good rows |
| 3.4 | History | `/reader/history` | Everything they've submitted, with the time, the value, and where it's got to — Approved, In review, or Correction asked | Their real submissions, kept up to date as the office reviews them |
| 3.5 | Account | `/reader/account` | Their name, contact details, which route they're on, which halls it covers, and how far through it they are | Real staff details and route assignments |

---

## 4. Administrators — 9 tabs + 2 screens (`/admin`)

By far the biggest section. This is the office side: checking readings, running
the monthly billing, managing rates, properties, tenants, staff and reports.

| # | Tab | Where | On the page | Still needs |
|---|---|---|---|---|
| 4.1 | Dashboard | `/admin` | Four figures at a glance — readings waiting to be checked, ones flagged as odd, how many meters have been read, and what this month is likely to bill. Then a preview of what needs checking, and a card showing where the month's billing has got to | Those figures worked out from real data |
| 4.2 | Reviews | `/admin/reviews` | The queue of readings waiting for sign-off, filtered by All, Needs a look, or Routine. Each row shows the property, the value submitted, who took it, and why it's been flagged | The real queue — and agreement on **what counts as an odd reading**, since that's what decides which ones get flagged |
| 4.3 | **Checking one reading** | Tap a row in Reviews | Everything needed to make the call: the meter, who submitted it and when, why it was flagged, the reader's explanation, the previous and new readings side by side with what's typical for that meter, and any note or photo attached. A comment box, then three buttons — **Reject, Ask for a correction, or Approve** — each with its own confirmation | The decision actually recorded, the reader told about it, and the photo viewable |
| 4.4 | Billing cycle | `/admin/cycle` | The month's billing run as five steps — readings taken, reviews cleared, bills worked out, bills published, files exported — with the right action offered at each stage. It won't let bills be calculated while readings are still unchecked. **Clicking through the steps is only a demonstration; nothing happens behind it** | The whole billing run: working out every bill from the readings and rates, publishing them, and producing the Bursary and Payroll files. **This is the single biggest piece of work in the project** — the screen makes it look simple, but everything it stands for has to be built from scratch |
| 4.5 | Rates | `/admin/rates` | The charges every bill is worked out from, split between electricity and water, with the provider and the date they took effect. "Edit rates" makes the amounts editable, with save and cancel | Rates that can genuinely be changed, with a record of what they were before and when each version applied. **The water rates on screen are invented placeholders** and must be replaced with the approved NWC tariff — there's a warning on the screen saying so |
| 4.6 | Reports | `/admin/reports` | Pick a report — billing summary, consumption by hall, Bursary export, or payroll deductions — pick a month, and see it preview before exporting to PDF or spreadsheet | Real figures behind all four. The spreadsheet export genuinely works already; the PDF currently just opens the browser's print dialog |
| 4.7 | Users & roles | `/admin/users` | Everyone who can sign in, searchable by name or email and filterable by role — Admin, Officer, Reader, Housing, Bursary. Each row shows their role and whether their account is active | Real staff accounts, a way to invite people, and — the important one — **a decision on what each role is actually allowed to do**. **The "Add user" form hasn't been designed**, so the button leads nowhere |
| 4.8 | Properties | `/admin/properties` | Every house on campus, searchable by code, address, hall or resident, showing who lives there or whether it's vacant. A note at the top explains the key rule: meters belong to the property, not the person | The real list of properties and their meters |
| 4.9 | **One property** | Tap a row in Properties | The property's meters and current readings, who lives there now, and a handover step for when someone moves out — enter the new resident and their move-in date, and the current readings become the new tenant's starting point. Underneath, a timeline of everyone who's held the tenancy | Real tenancy records, and a decision on **how a bill is split when someone moves out halfway through a month** — the design shows the handover but not who pays for which part |
| 4.10 | Business Units | `/admin/business-units` | All the commercial accounts, with how many are overdue. Tapping one opens it out to show this month's charge, what's outstanding, their contact, and a link to see the account as they see it | The real list of commercial accounts, and the ability for staff to view an account as its owner sees it — which should itself be recorded |
| 4.11 | Audit log | `/admin/audit` | A running record of every change — who did it, what they changed, and when — filtered by readings, bills, rates, users or billing runs | Every action across the whole system recording itself here as it happens, plus filtering by date and paging back through it |

---

## On every screen

These pieces appear on all 27 signed-in screens, so they're built once and
reused everywhere.

| Element | What it does |
|---|---|
| Side menu | Down the left on a computer — UWI crest, the tabs for whichever kind of user is signed in, and their name with a log-out button |
| Phone menu | On a narrow screen the side menu becomes a bar at the top with a menu button that slides the same list in from the left |
| Top bar | Stays visible while scrolling. Shows which tab you're on, the notifications bell, and the light/dark switch |
| Notifications | A bell with a count of unread items, opening a panel of notices — different ones for each kind of user — with a "Mark all read" option |
| Light / dark mode | Three settings: light, dark, or follow the device. The choice is remembered between visits |
| Demo switcher | The bar at the bottom for jumping between the four kinds of user. **It exists only so the prototype can be shown — it comes out as soon as real sign-in works** |
