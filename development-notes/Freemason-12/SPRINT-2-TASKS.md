# Sprint 2 — Freemason-12 Task Card

Hey! KiriaIT set up the skeleton files for you. Your job is to fill in the TODO blocks.
Read this file from top to bottom — each task builds on the previous one.

---

## Your tasks at a glance

| # | What | File(s) |
|---|------|---------|
| F1 | Market Explorer page (route + component) | `src/app/features/markets/` |
| F2 | `unsavedFormGuard` | `src/app/core/guards/unsaved-form.guard.ts` |
| F3 | `MockApiService` — `getMarkets()` method | `src/app/core/services/mock-api.service.ts` |
| F4 | Signals in `MarketsPageComponent` | Already stubbed in F1's component |
| F5 | Sprint 1 catch-up diary + Sprint 2 diary | `development-notes/Freemason-12/` |

---

## F1 — Market Explorer page

**What it looks like:** open `pictures/03-market-explorer.png` in the repo root.
It's a page with a search box and a table showing cryptocurrency data.

**Files already created for you:**
- `src/app/features/markets/markets.routes.ts` — route config (do not change)
- `src/app/features/markets/pages/markets-page.component.ts` — component skeleton
- `src/app/features/markets/pages/markets-page.component.html` — table template

**What you need to do:**

### Step 1 — Create the MarketRow model

Create a new file: `src/app/core/models/market-row.model.ts`

```ts
export interface MarketRow {
  symbol: string;    // e.g. 'BTC'
  name: string;      // e.g. 'Bitcoin'
  price: number;
  change24h: number; // percentage, e.g. 2.45 or -1.23
  change7d: number;
  marketCap: string; // e.g. '$1.32T'
}
```

Also export it from `src/app/core/models/index.ts`.

### Step 2 — Create mock data

Create `src/app/core/constants/mock-markets.constants.ts` with 7 coins from the mockup:

```ts
import { MarketRow } from '../models/market-row.model';

export const MOCK_MARKETS: MarketRow[] = [
  { symbol: 'BTC', name: 'Bitcoin',   price: 67230, change24h: 2.45,  change7d: 5.67,  marketCap: '$1.32T' },
  { symbol: 'ETH', name: 'Ethereum',  price: 3460,  change24h: -1.23, change7d: 3.21,  marketCap: '$415B'  },
  { symbol: 'SOL', name: 'Solana',    price: 178.92, change24h: 4.56, change7d: 12.34, marketCap: '$78B'   },
  { symbol: 'ADA', name: 'Cardano',   price: 0.62,  change24h: -2.34, change7d: -5.67, marketCap: '$22B'   },
  { symbol: 'AVAX', name: 'Avalanche', price: 42.15, change24h: 3.21, change7d: 8.76,  marketCap: '$16B'   },
  { symbol: 'LINK', name: 'Chainlink', price: 18.45, change24h: 1.89, change7d: 6.54,  marketCap: '$10.8B' },
  { symbol: 'UNI',  name: 'Uniswap',  price: 12.34, change24h: -0.56, change7d: 2.34, marketCap: '$7.4B'  },
];
```

### Step 3 — Fill in MockApiService

Open `src/app/core/services/mock-api.service.ts` and implement `getMarkets()`.
Uncomment the imports and the method body (instructions are inside the file).

### Step 4 — Connect the service in MarketsPageComponent

Open `src/app/features/markets/pages/markets-page.component.ts`.
Replace the `PLACEHOLDER_MARKETS` signal with a real call to `MockApiService.getMarkets()`.

Use `toSignal()` to convert the Observable to a signal:
```ts
import { toSignal } from '@angular/core/rxjs-interop';

private readonly mockApi = inject(MockApiService);
protected readonly markets = toSignal(this.mockApi.getMarkets(), { initialValue: [] });
```

### Step 5 — Fill in the filter logic

In the same component file, find `filteredMarkets` and complete the `filter()` call:
```ts
protected readonly filteredMarkets = computed(() => {
  const query = this._filter().toLowerCase().trim();
  if (!query) return this.markets();
  return this.markets().filter(
    m => m.symbol.toLowerCase().includes(query) || m.name.toLowerCase().includes(query)
  );
});
```

---

## F2 — unsavedFormGuard

**File:** `src/app/core/guards/unsaved-form.guard.ts` (already created)

Open the file and read the instructions inside. The simplest implementation uses
`confirm('You have unsaved changes. Leave anyway?')`.

This guard is your Sprint 2 **canDeactivate** requirement.

---

## F3 — MockApiService

Already covered in F1 Step 3. Just implement `getMarkets()`.
The `getHoldings()` method is OgOqro's task — leave it commented out.

---

## F4 — Signals in MarketsPageComponent

Already done as part of F1:
- `_filter = signal<string>('')` — filter state
- `filteredMarkets = computed(...)` — derived filtered list

Both count toward your **"signals in ≥2 components"** requirement.
For the second component: use signals in your `MarketsPageComponent` template interactions
OR create a second small component (e.g. a coin row component) that uses `input()`.

---

## F5 — Diaries

### Sprint 1 catch-up
Your Sprint 1 diary (`Freemason-12-sprint-1-2026-05-18.md`) exists but describes only 1 component.
The requirement is **≥2 feature components**.

Fix: create a second small component (e.g. a `MarketRowComponent` standalone component that
shows one row of the market table using `input()`) and mention both in your diary.

Update the diary to describe both:
1. `ClickerCoin` — what you built, how it works
2. `MarketRowComponent` (or whatever you name it) — what it does

### Sprint 2 diary
Create: `development-notes/Freemason-12/Freemason-12-sprint-2-YYYY-MM-DD.md`
(use today's date)

Use the diary template in `development-notes/Freemason-12/README.md`.
It must cover: `MarketsPageComponent`, `unsavedFormGuard`, and your Sprint 2 plan for Sprint 3.

**Important rules:**
- Commit the diary with YOUR GitHub account (Freemason-12)
- Open a PR — do NOT push directly to main
- Do NOT squash-merge the diary PR

---

## How to open a PR

```bash
git checkout -b feat/freemason-markets-route
# ... make your changes ...
git add .
git commit -m "feat(markets): add MarketsPageComponent and MockApiService"
git push origin feat/freemason-markets-route
# then open a PR on GitHub, link the sprint-2 issue
```

---

## If you get stuck

- Ask KiriaIT — he built `MarketDataService` which follows the same pattern as `MockApiService`.
- Look at `src/app/features/dashboard/pages/dashboard-page.component.ts` for a working signals example.
- All conventions are in `.cursor/rules/rule.mdc`.
