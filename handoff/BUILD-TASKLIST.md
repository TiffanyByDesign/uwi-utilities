# Task List

Grouped roughly in the order things need doing — the foundation has to come
first because everything else sits on it.

Items marked ⚠️ are the ones most likely to take longer than they look.

---

## A. Foundation

Nothing else can be finished until these are settled.

- [ ] **A1** — Decide how people sign in, and make sign-in actually work
- [ ] **A2** — Decide what each of the roles is allowed to see and do
- [ ] **A3** — Stop people reaching screens they shouldn't. *Every screen is open to anyone right now*
- [ ] **A4** — Send each person to the right home screen after they log in
- [ ] **A5** — Remove the demo switcher once sign-in works
- [ ] **A6** ⚠️ — Design how the information is stored: accounts, properties, meters, readings, bills, rates, tenancies, staff, and the audit record
- [ ] **A7** ⚠️ — Connect the screens to real data instead of the sample content they show today
- [ ] **A8** — Design and build the missing sign-up and password screens

## B. Shared groundwork

Worth doing before the individual screens, not after.

- [ ] **B1** — Tidy up the shared frame: menus, top bar, notifications panel
- [ ] **B2** — Build the repeated pieces once — cards, status labels, search boxes, forms, summary tiles — rather than rebuilding them on each screen
- [ ] **B3** — Make the notifications bell show real notices
- [ ] **B4** — Add loading states and error pages. *None exist, so a slow or broken page currently shows nothing*
- [ ] **B5** — Accessibility check: keyboard use, screen readers, and a text alternative to the graphs

## C. Residents (6 screens)

- [ ] **C1** — Home: current bill, usage comparison, notices
- [ ] **C2** — Current bill with the full breakdown of charges
- [ ] **C3** — Download the bill as a PDF
- [ ] **C4** — Bill history
- [ ] **C5** — Usage graphs with six months of real readings
- [ ] **C6** — Queries: send them, store them, let staff reply, notify the resident
- [ ] **C7** — Account details
- [ ] **C8** — Design and build the edit-details form

## D. Business Units (6 screens)

- [ ] **D1** — Portfolio totals across all their sites
- [ ] **D2** — Combined statement and per-site breakdown
- [ ] **D3** — Download the statement as a PDF
- [ ] **D4** — Usage figures for each site
- [ ] **D5** — Connections: their properties and meters
- [ ] **D6** — Queries, tagged by site
- [ ] **D7** — Account details and the edit form

## E. Meter Readers (5 screens)

Working without signal is the risk here.

- [ ] **E1** — Assign each reader a route for each round
- [ ] **E2** — Save submitted readings
- [ ] **E3** — Take and upload a photo of the meter
- [ ] **E4** — Re-check the two safety rules on the office side as well as on the phone
- [ ] **E5** ⚠️ — Work without a signal: hold readings on the phone and send them later. *The design assumes a connection the halls may not have*
- [ ] **E6** — Batch upload: read the spreadsheet, run the four checks, submit the good rows
- [ ] **E7** — Produce the spreadsheet template
- [ ] **E8** — History showing where each reading has got to
- [ ] **E9** — Reader profile and route

## F. Administrators (11 screens)

F6 on its own is bigger than most of the other groups.

- [ ] **F1** — Dashboard figures
- [ ] **F2** — Review queue, and the rules for what gets flagged as odd
- [ ] **F3** — Approve, reject and send-back-for-correction
- [ ] **F4** — Show the reader's photo, save the comment, tell the reader the outcome
- [ ] **F5** — Approve several readings at once. *Not designed, but likely wanted*
- [ ] **F6** ⚠️ — **The monthly billing run**: working out every bill, publishing them, producing the export files. Currently only a demonstration on screen
- [ ] **F7** ⚠️ — Confirm what the Bursary and Payroll files need to contain. *Needs a conversation with those departments*
- [ ] **F8** — Editable rates, with a history of previous versions
- [ ] **F9** ⚠️ — Replace the placeholder water rates with the approved NWC tariff
- [ ] **F10** — Real figures behind all four reports
- [ ] **F11** — Proper PDF export for reports
- [ ] **F12** — Add, edit and deactivate staff accounts
- [ ] **F13** — Design and build the add-user form
- [ ] **F14** — Property list and search
- [ ] **F15** — Tenancy handover and history
- [ ] **F16** ⚠️ — Decide who pays what when a resident moves mid-month
- [ ] **F17** — Business unit records
- [ ] **F18** — Let staff view an account as its owner sees it, and record when they do
- [ ] **F19** — Make every change across the system record itself in the audit log
- [ ] **F20** — Filter and page through the audit log

---

## G. Missing entirely — no design exists

These can't be estimated as tasks yet. They need designing first, so they're
worth raising early.

- [ ] **G1** ⚠️ — **Paying a bill.** There is no way to pay anywhere in the design. Residents and companies can see what they owe but not settle it. If paying online is expected, that's a whole feature area nobody has designed yet
- [ ] **G2** — Choosing how you're notified, and sending notices by email or text
- [ ] **G3** — What people see when something goes wrong, or when a list is empty
- [ ] **G4** — Every add or edit form: resident details, company details, adding staff
- [ ] **G5** — Signing up, forgotten passwords, and two-step verification

---

## Open questions

Six answers that change the size and shape of the build. Worth settling before
anyone puts numbers against the tasks.

1. Should people be able to **pay their bill in the app**? Nothing in the design covers it.
2. What are the **real water rates**? The ones on screen are invented, and the screen itself says so.
3. What exactly do the **Bursary and Payroll files** need to contain, and in what format?
4. When a resident **moves out halfway through a month**, who pays for which part of the bill?
5. Do meter readers need to be able to **work with no signal**? The design assumes they're always online.
6. Of the roles listed on the users screen — Admin, Officer, Reader, Housing, Bursary — **which ones actually log in, and what should each of them see**?
