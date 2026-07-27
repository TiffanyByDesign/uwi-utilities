# UWI Utilities — Design Handoff

Live, click-through prototype: **https://uwiuiux.vercel.app**
(auto-deploys from the `main` branch of this repo)

## What this is

A **design-only** front end for a campus utility billing web app, covering four
roles. There is no backend, database, or authentication — every screen renders
from static/sample data defined in the codebase.

Use the **"Demo" role switcher** pinned to the bottom of every screen to jump
between roles instantly — it stands in for real auth/role routing, which
doesn't exist yet.

## The four roles

| Role | Route | Purpose |
|---|---|---|
| Resident | `/portal` | Single-account self-service — bill, usage, history, queries |
| Business Unit | `/company` | Commercial tenant managing multiple campus connections |
| Meter Reader | `/reader` | Mobile-first field capture — routes, batch upload, history |
| Admin | `/admin` | Runs users, rates, billing cycles, reviews, reports, audit log |

Plus a login screen at `/` (visual only — it doesn't gate access to the routes
above; every page is reachable directly).

## What's real vs. what's mocked

- **Real:** layout, navigation, component structure, responsive behavior,
  visual design system (see below).
- **Mocked:** all figures. Notably, `components/portal/data.ts` models actual
  JPS electricity tariff tiers (energy + fuel/IPP pass-through) and a
  best-guess NWC water tariff — these aren't random placeholders, they're
  structured to match real bill logic, but the **water rates specifically
  should be verified/replaced** against the real NWC tariff before going further.
- **Not built:** auth, role-based routing/permissions, any API or persistence
  layer, form submission handling (forms are visual, not wired to anything).

## Stack

Next.js 16 (App Router) + React 19 + Tailwind v4 + shadcn/ui conventions.
Fonts: Open Sans (UI) + PT Sans (headings/display) via `next/font/google`.
Deployed on Vercel, connected to this GitHub repo for auto-deploy on push.

## Getting set up locally

```
pnpm install
pnpm dev
```

Note: this repo pins dependency build-script approvals in
`pnpm-workspace.yaml` (`allowBuilds`) for `sharp` and `msw` — needed for
`pnpm install` to succeed under pnpm's default script-blocking policy. Don't
remove that section.

## Open questions for whoever picks this up

- Confirm real NWC water tariff bands/rates.
- Decide on auth strategy and how role-based routing should actually gate
  `/portal`, `/company`, `/reader`, `/admin`.
- The login screen (`/`) needs to be wired to real auth once that's decided.
