# Sprint 2 — OgOqro Task Card

Hi! KiriaIT prepared the skeleton files.
**Only edit your files** — you do not need to change other contributors' code.

---

## Project context (read first)

These are **already implemented by KiriaIT**. Do not change them — your work plugs into them only.

| Area | Status | Your interaction |
|------|--------|------------------|
| **Crypto prices** | Live Binance Spot Testnet via `MarketDataService` **[P-02]** | **Read-only** — inject in `PortfolioService` |
| **Login / session** | Supabase `AuthService` + `authGuard` on `/portfolio` | Do not touch `auth/`; test portfolio while logged in |
| **Wallet connect** | `WalletService` + `/connect` (demo Web3 — **not** login) | Do not touch `wallet/` or wallet services |
| **Markets page** | Freemason-12's scope | Do not touch `markets/` |
| **Mock crypto prices** | Not used | Do not create `mock-holdings` with hardcoded `price: 67230` |

> **Update (2026-05):** Prices come from **Binance**. Portfolio uses a **seed** only for how many coins you hold (amounts) per **[P-03]** — not for market prices.
> Your scope: **portfolio** + **about** + diary.

### Mock vs live (your table only)

| Data | Sprint 2 source |
|------|-----------------|
| Holding **amounts** | `PORTFOLIO_SEED` constant — demo portfolio **[P-03]** |
| **Price**, **value**, **24h %** | `MarketDataService.getTickerSnapshot()` — live Binance |
| Email / password | Supabase Auth — KiriaIT (not in `public.profiles`) |

---

## Your tasks at a glance

| # | What | File(s) |
|---|------|---------|
| O1 | `PortfolioHolding` model | `src/app/core/models/portfolio.model.ts` |
| O2 | Seed data — `symbol` + `amount` only (no prices) | `src/app/core/constants/portfolio-seed.constants.ts` ← **you create** |
| O3 | `PortfolioService` — seed + `MarketDataService` → signals/computed | `src/app/core/services/portfolio.service.ts` |
| O4 | `PortfolioPageComponent` wiring + loading/error | `portfolio-page.component.ts` + `.html` |
| O5 | About page — RS School logo **[P-05]** | `about-page.component.html` |
| O6 | Sprint 2 diary | `development-notes/OgOqro/OgOqro-sprint-2-YYYY-MM-DD.md` |

### Do NOT touch (will break team work or duplicate KiriaIT)

`auth/`, `markets/`, `wallet/`, `shell/`, `dashboard/`, `app.routes.ts`,
`market-data.service.ts`, `auth.service.ts`, `supabase.service.ts`, `wallet.service.ts`,
`mock-api.service.ts`, `mock-blockchain.service.ts`

---

## O1 — PortfolioHolding model

**File:** `src/app/core/models/portfolio.model.ts`

```ts
export interface PortfolioHolding {
  symbol: string;        // e.g. 'BTC'
  name: string;          // e.g. 'Bitcoin' — from seed/map
  amount: number;        // e.g. 0.5
  price: number;         // from MarketDataService
  value: number;         // amount * price
  changePct24h: number;  // from ticker; may be negative
}
```

---

## O2 — PORTFOLIO_SEED (amounts only)

**New file:** `src/app/core/constants/portfolio-seed.constants.ts`

```ts
export interface PortfolioSeedEntry {
  symbol: string;   // must match Binance base, e.g. BTC from BTCUSDT
  name: string;
  amount: number;
}

export const PORTFOLIO_SEED: PortfolioSeedEntry[] = [
  { symbol: 'BTC',  name: 'Bitcoin',   amount: 0.5 },
  { symbol: 'ETH',  name: 'Ethereum',  amount: 5.2 },
  { symbol: 'SOL',  name: 'Solana',    amount: 45 },
  { symbol: 'ADA',  name: 'Cardano',   amount: 1200 },
  { symbol: 'BNB',  name: 'BNB',       amount: 3 },
];
```

Pick symbols that exist in `BINANCE_TESTNET.SNAPSHOT_SYMBOLS` (`market-api.constants.ts`).

**Do not** create `mock-holdings.constants.ts` with hardcoded prices.

---

## O3 — PortfolioService (seed + live prices)

**File:** `src/app/core/services/portfolio.service.ts`

1. `inject(MarketDataService)` — **read only**; do not edit `market-data.service.ts`.
2. Load tickers (`toSignal(...)`, or `resource()` — see `MarketOverviewComponent`).
3. Implement signals/computed:

```ts
private readonly _holdings = signal<PortfolioHolding[]>([]);

readonly holdings = this._holdings.asReadonly();
readonly totalValue = computed(() =>
  this._holdings().reduce((sum, h) => sum + h.value, 0),
);
readonly bestAsset = computed(() => {
  const sorted = [...this._holdings()].sort((a, b) => b.changePct24h - a.changePct24h);
  return sorted[0]?.symbol ?? '—';
});
readonly change7d = computed(() => '+14.05%'); // Sprint 2 demo label; real 7d in Sprint 3
```

4. After tickers load: merge `PORTFOLIO_SEED` + snapshot → fill `_holdings` (price/value/changePct24h from ticker).
5. Loading/error: `status` signal in the service **or** `resource()` in the component — at least one **[O-12]**.

> `/portfolio` is behind `authGuard` — log in via Supabase before testing.

> Sprint 3 may move seed data to Supabase; keep `PortfolioHolding` and public API stable.

---

## O4 — PortfolioPageComponent

**File:** `src/app/features/portfolio/pages/portfolio-page.component.ts`

```ts
private readonly portfolioService = inject(PortfolioService);

protected readonly totalValue = computed(() => {
  const v = this.portfolioService.totalValue();
  return '$' + (v / 1000).toFixed(2) + 'K';
});
protected readonly change7d    = computed(() => this.portfolioService.change7d());
protected readonly totalAssets = computed(() => this.portfolioService.holdings().length);
protected readonly bestAsset   = computed(() => this.portfolioService.bestAsset());
protected readonly holdings    = computed(() => this.portfolioService.holdings());
```

**HTML:** replace hardcoded `$147.34K`, `12`, `BTC` with `{{ totalValue() }}`, `{{ holdings().length }}`, etc.
Add loading/error UI when the service or `resource` reports an error.

---

## O5 — About page (RS School logo)

**File:** `src/app/features/about/pages/about-page.component.html`

```html
<a href="https://rs.school" target="_blank" rel="noopener noreferrer" aria-label="RS School">
  <img
    src="https://rs.school/images/rs_school_js.svg"
    alt="RS School"
    width="150"
    class="hover:opacity-80 transition-opacity"
  />
</a>
```

Required by **[P-05]**.

---

## O6 — Sprint 2 diary

Create: `development-notes/OgOqro/OgOqro-sprint-2-2026-05-XX.md`

Include:

- What you built: `PortfolioPageComponent`, `AboutPageComponent`, `PortfolioService`
- Seed amounts vs live prices (`MarketDataService`)
- What was hard, Sprint 3 plan
- **≥2** feature components (portfolio + about)

---

## How to open a PR

```bash
git checkout -b feat/ogoqro-portfolio
git add .
git commit -m "feat(portfolio): PortfolioService with live prices and portfolio page"
git push origin feat/ogoqro-portfolio
# open PR on GitHub and link the sprint-2 issue
```

---

## If you get stuck

- **Live prices:** `MarketOverviewComponent`, `MarketDataService`
- **Signals:** `AuthService` (read-only reference)
- **Conventions:** `.cursor/rules/rule.mdc` — **[P-02]**, **[P-03]**, **[O-12]**
