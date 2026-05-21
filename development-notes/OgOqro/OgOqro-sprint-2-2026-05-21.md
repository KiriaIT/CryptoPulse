# Sprint 2 — OgOqro

Today I completed and refined all of my Sprint 2 individual work. The changes fall into three groups: the initial portfolio and about page implementation, a storage-service layer added to strengthen the signal/service requirements, and a final architectural fix that replaced hardcoded mock prices with live Binance ticker data.

---

## What I built

### 1. `PortfolioHolding` model (`src/app/core/models/portfolio.model.ts`)

Typed interface with six fields: `symbol`, `name`, `amount`, `price`, `value`, `changePct24h`. Exported through `src/app/core/models/index.ts` so it is available project-wide without deep import paths.

---

### 2. `portfolio-seed.constants.ts` (`src/app/core/constants/portfolio-seed.constants.ts`)

Created a `PortfolioSeedEntry` interface and a `PORTFOLIO_SEED` array containing **only** `symbol`, `name`, and `amount` for five coins (BTC, ETH, SOL, ADA, BNB). Prices and 24h changes are intentionally absent — they come from the live Binance Spot Testnet ticker at runtime.

This file replaces the earlier `mock-holdings.constants.ts` which contained hardcoded prices. Hardcoded prices are incorrect in Sprint 2 because the project already has a real market-data service — the two should be connected.

---

### 3. `PortfolioService` (`src/app/core/services/portfolio.service.ts`)

Fully rewritten to work with live data instead of hardcoded values.

Signal primitives used:

- `signal<PortfolioHolding[]>([])` — starts empty; populated once the Binance snapshot loads
- `computed()` — `totalValue` (sum of all holding values), `bestAsset` (highest `changePct24h`), `change7d` (mock label)

Two public methods added:

- `setHoldingsFromTickers(tickers: MarketTickerRow[])` — builds a `Map` from the ticker array keyed by symbol pair (e.g. `BTCUSDT`), then maps over `PORTFOLIO_SEED` to produce a full `PortfolioHolding` for each entry. Coins with no matching ticker row get `price = 0` and `changePct24h = 0` rather than throwing.
- `clearHoldings()` — resets `_holdings` to `[]`. Called from the component while a request is in flight or has errored, preventing stale data from showing.

The private/read-only signal split (`private _holdings` + `readonly holdings = _holdings.asReadonly()`) consumers cannot mutate the signal directly.

---

### 4. `PortfolioPageComponent` (`src/app/features/portfolio/pages/`)

**Two services injected via `inject()`** — `PortfolioService` and `MarketDataService` — satisfying Sprint 2 requirement #5 entirely from OgOqro's own component.

`resource()` added to load the Binance 24h ticker snapshot:

```ts
protected readonly snapshot = resource<MarketTickerRow[], unknown>({
  loader: () => firstValueFrom(this.marketData.getTickerSnapshot()),
});
```

`effect()` registered in the constructor — reacts to every change in `snapshot` state

- While loading or on error → calls `portfolioService.clearHoldings()` so no stale data is shown
- On success → calls `portfolioService.setHoldingsFromTickers(snapshot.value())` to merge live prices with seed amounts

`effect()` is the right primitive here (not `computed()`) because calling a service method is a side effect, not a derived value.

Computed signals on the component:

- `totalValue` — formats the service value as `'$63.58K'`
- `change7d`, `totalAssets`, `bestAsset` — pass-through from service
- `holdings` — read from service signal for the table

Template changes:

1. **Loading block** above the table — `mat-progress-spinner` + message while `snapshot.isLoading()`
2. **Error block** — destructive-styled card with a "Try again" button that calls `snapshot.reload()`
3. **Four-state `<tbody>`** — `loading → error → empty → data` using `@if / @else if / @else` and `@for`; empty-state text updated to "No holdings to display. Sign in and wait for live prices to load."

---

### 5. `AboutPageComponent` (`src/app/features/about/pages/`)

**`about-page.component.ts`** — added `teamExpanded = signal(false)` and `toggleLabel = computed(...)` to drive an expandable team details section. Uses `signal()` + `computed()` which satisfies Sprint 2 requirement #4 as the second component alongside `PortfolioPageComponent`.

**`about-page.component.html`** — two changes:

1. RS School logo `src` corrected to `[src]="'/favicon.png'"` (width `120`)
2. OgOqro bio text updated to: _"PortfolioService and portfolio page with live Binance prices"_

---

## What I struggled with

**`effect()` placement** — my first attempt put side-effect logic inside a computed, which Angular does not allow (computed must be pure). Re-reading KiriaIT's `WalletService` constructor showed the correct pattern: register `effect()` inside the constructor so Angular ties its lifetime to the component instance.

**Separating seed amounts from live prices** — the earlier `mock-holdings.constants.ts` had hardcoded `price` and `value` fields which made `PortfolioService` self-contained but disconnected from the real `MarketDataService`. The fix was to split the data into a seed file (amounts only) and let the service merge prices at runtime via `setHoldingsFromTickers()`.

**`resource()` + `effect()` interaction** — `resource()` is reactive; its state signals (`isLoading`, `error`, `hasValue`) update asynchronously. Wrapping the service calls inside `effect()` ensures they fire every time any of those state signals change, not just once.

---

## Plan for Sprint 3

- Implement `CurrencyCompactPipe` — pure pipe for formatting large USD values
- Build the Profile Settings reactive form: `NonNullableFormBuilder`, ≥3 fields, ≥2 validator types, a custom `ValidatorFn`, and inline error messages from `user-feedback.constants.ts`
- Write the Sprint 3 diary entry

---

## Time spent

Approximately 6–7 hours total across two days.
~1 hour reading codebase, understanding `WalletService` / `WalletStorageService` patterns and `MarketDataService` before writing anything.
~2 hours building `PortfolioService`, `PortfolioStorageService`, seed constant, and the model.
~2 hours wiring `PortfolioPageComponent` with `resource()` + `effect()`, updating the template with all three state blocks.
~1 hour updating `AboutPageComponent`, fixing the RS School logo, and writing this diary entry.
