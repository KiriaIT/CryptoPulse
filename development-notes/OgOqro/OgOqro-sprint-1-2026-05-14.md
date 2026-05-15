# Sprint 1 — OgOqro

First sprint of the Crypto Pulse project. I joined the team mid-sprint after the
initial scaffolding was already in place, so my focus was on reading the
architecture, understanding the conventions, and shipping components
that fit naturally into what KiriaIT had already built.

## What I built

- **`WatchlistChipComponent`** (`src/app/shared/ui/watchlist-chip/`) — a
  standalone, OnPush chip that renders a single watchlist symbol with a remove
  button. Uses `input.required<string>()` for the symbol and `output<string>()`
  for the remove event. Wired into `DashboardPageComponent` in place of the
  plain `<li>` tags; added `onSymbolRemoved()` to filter the `watchlist` signal.

- **`PriceTickerComponent`** (`src/app/shared/ui/price-ticker/`) — a two-line
  price display showing last price and a colour-coded 24 h change badge.
  Accepts `price: input<number | null>`, `changePct: input<number | null>`, and
  `currency: input<string>` (defaults to `'USDT'`). Replaced the two inline
  `<span>` elements in `MarketOverviewComponent` and took ownership of
  `DecimalPipe` internally, which let me remove it from the parent's import list.

## What I struggled with

The biggest challenge for me this sprint was Git. Every project I had worked on
before was solo, so I had never needed to think about branching, pull requests,
or merge conflicts. Working in a shared repository for the first time meant I
had to learn all of that at once while also getting up to speed with the
codebase itself.

KiriaIT (Team Leader) walked me through the basic workflow — how to pull the latest changes, create a branch, push my work, and open a PR without stepping on his commits.

## Plan for Sprint 2

- Add at least one lazy-loaded route most likely the `/about`page with the RS School logo.
- Create a signal-based `ThemeService` that persists dark/light preference to
  `localStorage` via a `signal` + `effect` pair, and wire it into the shell
  header as a toggle button.
- Write my Sprint 2 diary entry.

## Time spent

~12 hours total
~6 hours - Reading through the existing codebase and getting familiar with what KiriaIT had already built before i joined the team. This took longer than expected because I was getting familiar with how GitHub works. Setting up the repo locally, understanding the branch workflow and figuring out how to pull changes without breaking anything.

~6 hours - The rest of the time i spent was doing the research and deepening my knowledge about the angular concepts that were required for working on this sprint and creating 2 custom components for individual work.
