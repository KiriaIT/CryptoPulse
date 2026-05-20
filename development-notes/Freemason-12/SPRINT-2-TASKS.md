# Sprint 2 — Freemason-12 Task Card

Hey! KiriaIT prepared the skeleton files. Your job is to fill in the TODO blocks.
Read this file top to bottom — each step builds on the previous one.

---

## Project context (read first)

These are **already implemented by KiriaIT**. Do not change them — your work plugs into them only.

| Area | Status | Your interaction |
|------|--------|------------------|
| **Crypto prices** | Live Binance Spot Testnet via `MarketDataService` **[P-02]** | **Read-only** — inject and call `getTickerSnapshot()` |
| **Login / session** | Supabase `AuthService` + `authGuard` | Do not touch `auth/`, `supabase.service.ts` |
| **Wallet connect** | `WalletService` + `/connect` (demo Web3 session, separate from login) | Do not touch `wallet/`, `wallet.service.ts`, `mock-blockchain.service.ts` |
| **Dashboard** | `MarketOverviewComponent` already uses live tickers | Use as a **pattern reference** only |
| **Mock markets** | `MockApiService` / `MOCK_MARKETS` | **Do not create or implement** |

> **Update (2026-05):** Market prices are **not mock**. Auth and wallet are owned by KiriaIT.
> Your scope: **Markets page** + `unsavedFormGuard` + diaries.

---

## Your tasks at a glance

| # | What | File(s) |
|---|------|---------|
| F1 | Market Explorer page (route + component) | `src/app/features/markets/` |
| F2 | Display row model + symbol→name map | `market-row.model.ts`, `market-display.constants.ts` ← **new** |
| F3 | Load live tickers via `MarketDataService` | `markets-page.component.ts` (read-only service) |
| F4 | Map `MarketTickerRow` → table rows + loading/error UI | `markets-page.component.ts` + `.html` |
| F5 | Filter signal + `filteredMarkets` computed | `markets-page.component.ts` |
| F6 | `unsavedFormGuard: CanDeactivateFn` | `src/app/core/guards/unsaved-form.guard.ts` |
| F7 | Sprint 1 catch-up diary + Sprint 2 diary | `development-notes/Freemason-12/` |

### Do NOT touch (will break team work or duplicate KiriaIT)

`auth/`, `portfolio/`, `about/`, `wallet/`, `shell/`, `dashboard/`, `app.routes.ts`,
`market-data.service.ts`, `auth.service.ts`, `supabase.service.ts`, `wallet.service.ts`,
`mock-api.service.ts`, `mock-blockchain.service.ts`

---

## F1 — Market Explorer page

**What it looks like:** open `pictures/03-market-explorer.png`.
Search box + table with cryptocurrency data.

**Files already created for you:**

- `src/app/features/markets/markets.routes.ts` — route config (do not change)
- `src/app/features/markets/pages/markets-page.component.ts` — component skeleton
- `src/app/features/markets/pages/markets-page.component.html` — table template

You only need to fill in the TODO blocks.

---

## F2 — Display model and symbol labels

**New file:** `src/app/core/models/market-row.model.ts`

View model for the Markets table (mapped from Binance data, not raw API DTO):

```ts
export interface MarketRow {
  symbol: string;       // display ticker, e.g. 'BTC' (strip USDT from pair)
  name: string;         // human label from constants map
  price: number;
  change24h: number;    // from Binance priceChangePercent
  change7d: number | null;   // not on 24h ticker — null → template shows '—'
  marketCap: string | null;  // not on 24h ticker — null → template shows '—'
}
```

Also export from `src/app/core/models/index.ts`.

**New file:** `src/app/core/constants/market-display.constants.ts`

Map `BTCUSDT` → `{ symbol: 'BTC', name: 'Bitcoin' }` for symbols in `BINANCE_TESTNET.SNAPSHOT_SYMBOLS` (`market-api.constants.ts`). Names only — **no fake prices**.

---

## F3 — Load data with `MarketDataService` (real Binance)

**Reference (copy the pattern, do not edit the file):**
`src/app/features/dashboard/components/market-overview/market-overview.component.ts`

In `MarketsPageComponent`:

```ts
import { inject, resource } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MarketDataService } from '../../../core/services/market-data.service';

private readonly marketData = inject(MarketDataService);

protected readonly snapshot = resource({
  loader: () => firstValueFrom(this.marketData.getTickerSnapshot()),
});
```

- **Do not** call `HttpClient` from the component ([O-11]).
- **Do not** use `MockApiService` or create `mock-markets.constants.ts`.

---

## F4 — Map API rows + template states

1. Add a private mapper: `MarketTickerRow` → `MarketRow` (price, `change24h` from `changePct24h`, name from `market-display.constants.ts`).
2. Expose table data as `computed(() => …)` from `snapshot.value()`.
3. Template **[O-12]** — three branches:
   - **loading:** spinner or skeleton row
   - **error:** message from `NETWORK_ERROR_MESSAGES` in `user-feedback.constants.ts`
   - **success:** existing `@for` over `filteredMarkets()`

For **7d** and **Market Cap**: Binance 24h ticker does not provide them in Sprint 2. Show `—` when `null` — do not invent mock values.

Optional: `MarketRowComponent` (one row, `input.required<MarketRow>()`) for Sprint 1 diary catch-up (≥2 components).

---

## F5 — Search filter (signals)

**File:** `src/app/features/markets/pages/markets-page.component.ts`

1. Keep `_filter` signal (already stubbed).
2. Complete `filteredMarkets`:

```ts
protected readonly filteredMarkets = computed(() => {
  const query = this._filter().toLowerCase().trim();
  const rows = this.displayRows(); // your computed list from F4
  if (!query) return rows;
  return rows.filter(
    (m) => m.symbol.toLowerCase().includes(query) || m.name.toLowerCase().includes(query),
  );
});
```

3. Remove `PLACEHOLDER_MARKETS` and any `MockApiService` TODO comments in this file.

---

## F6 — unsavedFormGuard

**File:** `src/app/core/guards/unsaved-form.guard.ts` (stub created)

```ts
export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

export const unsavedFormGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
```

Sprint 2 **canDeactivate** requirement. Route registration happens later (Sprint 3) — you only implement the guard.

---

## F7 — Diaries

### Sprint 1 catch-up

Your Sprint 1 diary lists only 1 component. Requirement is **≥2**.

Add a second small component (e.g. `MarketRowComponent`) and mention both in the diary:

1. `ClickerCoin`
2. `MarketRowComponent` (or your name)

### Sprint 2 diary

Create: `development-notes/Freemason-12/Freemason-12-sprint-2-YYYY-MM-DD.md`

Use the template in `development-notes/Freemason-12/README.md`.
Cover: `MarketsPageComponent`, live `MarketDataService`, `unsavedFormGuard`, signals, Sprint 3 plan.

**Rules:**

- Commit with **your** account (Freemason-12).
- Open a PR — do NOT push directly to `main`.
- Do NOT squash-merge the diary PR.

---

## How to open a PR

```bash
git checkout -b feat/freemason-markets
git add .
git commit -m "feat(markets): wire MarketsPage to MarketDataService and filter signals"
git push origin feat/freemason-markets
# open PR on GitHub and link the sprint-2 issue
```

---

## If you get stuck

- **Live prices pattern:** `MarketOverviewComponent` + `MarketDataService.getTickerSnapshot()`
- **Signals pattern:** `AuthService` (read-only reference)
- **Conventions:** `.cursor/rules/rule.mdc` — **[P-02]**, **[O-12]**
