# UWI Utilities — Design Handoff

**Click through the design: https://uwiuiux.vercel.app**

**The same list as a web page: https://claude.ai/code/artifact/b0725ff4-1250-4367-9441-504760c247a9**

There's a small **"Demo" bar pinned to the bottom of every screen** — use it to
switch between the four kinds of user and see what each one sees. There's no
sign-in gate, so everything is reachable.

## What's in this folder

| File | What it's for |
|---|---|
| `SCREEN-INVENTORY.md` | Every screen, what a person can do on it, and what it still needs. **Build the task list from this one.** |
| `BUILD-TASKLIST.md` | The same thing already grouped into tasks with codes (A1, F9…), ready to paste into a tracker. Includes the open questions. |
| `COMPONENT-INVENTORY.md` | The technical version — file locations, naming, and the design system. For whoever writes the code. |
| `../HANDOFF.md` | Original notes on how the project is set up and how to run it locally. |

## The short version

- **29 screens**: 1 sign-in, 25 menu tabs across four kinds of user, and 3
  screens you reach by tapping a row.
- **Four kinds of user**: Residents, Business Units (commercial tenants),
  Meter Readers (field staff on phones), and Administrators (the office).
- The design is **finished and clickable**, but nothing behind it is built.
  Every name, number and figure on screen is made-up sample content.
- What *is* finished: the look, the layout, the menus, and how everything
  behaves on a phone versus a computer.

## Worth knowing before estimating

- **There's no way to pay a bill anywhere in the design.** People can see what
  they owe but not settle it. If paying online is expected, that's a whole
  missing feature area.
- Three buttons look finished but have no screen behind them — "Edit details"
  for residents and companies, and "Add user" for staff. Those forms need
  designing before they can be built.
- The admin billing run is the biggest single piece of work. On screen it's
  five tidy steps; underneath, all of it has to be built from scratch.
- The water rates shown are invented placeholders. The real NWC tariff has to
  replace them.
- Signing up, forgotten passwords and two-step verification haven't been
  designed at all.

Full detail on all of this in `SCREEN-INVENTORY.md` and `BUILD-TASKLIST.md`.
