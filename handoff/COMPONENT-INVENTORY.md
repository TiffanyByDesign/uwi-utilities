# Component Inventory

> **This is the technical file.** If you're writing the task list rather than
> the code, `SCREEN-INVENTORY.md` and `BUILD-TASKLIST.md` cover the same ground
> in plain language — this one is for whoever picks up the codebase.

What already exists as a component, and what's currently inlined in a page but
would be worth extracting.

---

## Shared — `components/shell/`

These are used across every role. Treat them as the app's core layout layer.

| Component | File | What it does |
|---|---|---|
| `AppShell` | `shell/app-shell.tsx` | The whole signed-in frame — desktop sidebar, mobile drawer, sticky header, notifications dropdown, theme toggle, main content slot. Takes `role`, `portal`, `user`, `children`. **277 lines — the single biggest component; worth splitting into Sidebar / Header / NotificationPanel when wiring it up.** |
| Nav config | `shell/nav.ts` | `CLIENT_NAV`, `COMPANY_NAV`, `READER_NAV`, `ADMIN_NAV` — label + href + lucide icon per item. Adding a tab means adding one line here. |
| Notifications data | `shell/notifications.ts` | Per-role notification seed data (`title`, `detail`, `when`, `kind`, `unread`). Replace with a feed. |
| `ThemeToggle` | `shell/theme-toggle.tsx` | Light/System/Dark radiogroup + the pre-paint `themeInitScript` injected in `app/layout.tsx`. |
| `CountUp` | `shell/count-up.tsx` | Animates a number to its value on mount. SSR-safe, respects `prefers-reduced-motion`. Used on the hero/KPI figures. |
| `RoleSwitcher` | `shell/role-switcher.tsx` | Demo-only bottom bar. **Delete once auth exists.** |
| `Placeholder` | `shell/placeholder.tsx` | "This screen is part of a later design phase" card. Currently unreferenced — keep it for stubbing new nav entries. |

## Charts — `components/charts/`

Hand-rolled SVG. **No chart library is installed** — if you swap in Recharts or
similar, these two are the only things to replace.

| Component | File | Used on |
|---|---|---|
| `AreaChart` | `charts/area-chart.tsx` | Resident usage — single series over time, hover crosshair + tooltip, latest point marked |
| `BarChart` | `charts/bar-chart.tsx` | Company usage — single measure by category, hover tooltip |

Both take `{ data: {label, value}[], color, unit }`.

## Login — `components/login/`

| Component | File | Notes |
|---|---|---|
| `ConceptGlass` | `login/concept-glass.tsx` | Composes the whole login page |
| `LoginForm` | `login/login-form.tsx` | Fields + submit. Has three visual tones (`light` / `glass` / `dark`) — only `light` is used. **Submit is a `router.push('/portal')` stub; this is where auth goes.** |
| `GlassBackdrop` | `login/glass-backdrop.tsx` | Photo + gradient scrims |
| `SiteHeader` | `login/site-header.tsx` | Crest, department block, language + support buttons |
| `Logo` | `login/logo.tsx` | UWI crest lockup |

## Data modules — replace with API calls

Each role has one file of static sample data. These are the seams where the
back end plugs in.

| File | Exports |
|---|---|
| `components/portal/data.ts` | `CLIENT`, `BILL`, `BILL_HISTORY`, `USAGE`, `ALERTS`, `money()` — models real JPS electricity tariff tiers (energy + fuel/IPP) |
| `components/company/data.ts` | `COMPANY`, `PORTFOLIO`, `SITE_BILLS`, `money()` |
| `components/reader/data.ts` | `READER`, `ASSIGNED`, `readingById()`, `routeProgress()` |
| `components/admin/data.ts` | `ADMIN`, `CYCLE`, `REVIEWS`, `FLAG`, `reviewById()`, `flaggedCount`, `moneyShort()` |
| `components/admin/rates.ts` | `RATES` — electricity + water rate groups. **Water rates are placeholders.** |
| `components/admin/users.ts` | `USERS`, `ROLE_LABEL`, `STATUS_META`, `initials()` |
| `components/admin/properties.ts` | `PROPERTIES`, `propertyByCode()`, `Tenancy` type |
| `components/admin/business-units.ts` | `BIZ_UNITS`, `money()` |
| `components/admin/reports.ts` | `REPORT_KINDS`, `PERIODS`, `PREVIEW` |
| `components/admin/audit.ts` | `AUDIT`, `KIND`, `initials()` |

---

## Repeated patterns worth extracting

These currently exist as **local functions inside page files**, re-declared in
several places. Pulling them into a shared UI layer would cut a lot of
duplication before the real build starts.

| Pattern | Where it repeats now | Suggested shared component |
|---|---|---|
| Rounded card — `rounded-2xl border`, `--surface` bg, `--shadow` | Essentially every screen | `<Card>` |
| Status pill (Paid/Due/Open/Resolved/Approved/Overdue/Occupied…) | ~12 screens, each hand-rolling background + colour from the same token pairs (`--ok`/`--ok-wash`, `--warn`/`--warn-wash`, `--bad`/`--bad-wash`) | `<StatusPill tone="ok\|warn\|bad\|neutral">` |
| KPI / stat tile with optional tint glow | `admin/page.tsx` (`Kpi`), `company/page.tsx` (`Tile`) — near-identical | `<StatTile>` |
| Label/value definition row | `portal/account`, `company/account`, `reader/account` — three copies of the same `Row` | `<DetailRow>` |
| Utility meter card (icon, meter no., `cur − prev = usage`) | `portal/account`, `portal/bill`, `company/connections`, `admin/properties/[code]` — four variants | `<MeterCard>` |
| Segmented tab / filter pill bar | `admin/reviews`, `admin/audit`, `admin/users`, `company/connections` | `<SegmentedControl>` |
| Search input with icon | `admin/users`, `admin/properties`, `admin/business-units` | `<SearchField>` |
| Empty state ("Nothing here", dashed border) | `admin/reviews`, `admin/users`, `admin/properties`, `admin/business-units` | `<EmptyState>` |
| Utility icon + colour lookup (`Zap`/`--elec`, `Droplets`/`--water`) | Repeated in ~10 files as inline ternaries | one `utilityMeta(utility)` helper |
| Confirmation / outcome screen (big circle icon, title, body, CTA) | `reader/capture/[id]`, `admin/reviews/[id]` | `<OutcomeScreen>` |
| Form field (input / textarea / select with token styling) | Every form screen, styled inline each time | `<Input>` `<Textarea>` `<Select>` |

> `shadcn` is in `package.json` and `components.json` is configured, but no
> shadcn primitives have been generated yet — `components/ui/` doesn't exist.
> The extraction list above is a natural first shadcn pass.

---

## Design tokens — `app/globals.css`

All colour is driven by CSS custom properties, so light/dark comes free. Don't
hardcode hex values in new components — use the tokens.

**Brand:** `--navy` `#0c2340` · `--gold` `#cba24b` · `--crimson` `#a11c20` · `--paper` `#f4f6fa`

**App semantic tokens** (defined under the `.app` scope, theme-aware):
`--bg` `--surface` `--raised` `--line` `--line-2` · `--ink` `--ink-2` `--muted` ·
`--brand` `--accent` `--accent-strong` `--accent-wash` ·
`--ok` `--ok-wash` `--warn` `--warn-wash` `--bad` `--bad-wash` ·
`--elec` (electricity) `--water` (water) · `--shadow`

**Type:** `--font-sans` = Open Sans · `--font-display` = PT Sans.
`.lnum` utility class forces lining/tabular figures — used on every number.

**Motion:** `animate-fade-rise` (staggered card entrance via `animationDelay`),
`animate-gradient-pan`, `btn-sheen`. All should respect `prefers-reduced-motion`.

**Radius:** `--radius` `0.75rem`, scaled `sm`→`4xl`. Cards are `rounded-2xl`,
controls `rounded-xl`, pills `rounded-full`.
