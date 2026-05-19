# Sprint 2 — OgOqro-ს დავალებები

გამარჯობა! KiriaIT-მა skeleton ფაილები გამოგიმზადა.
**შენი ფაილები მხოლოდ შენია** — სხვის კოდში არ გჭირდება შეხება.

---

## შენი დავალებები — მოკლე სია

| # | რა | ფაილი (შენი) |
|---|-----|--------------|
| O1 | `PortfolioHolding` model | `src/app/core/models/portfolio.model.ts` |
| O2 | `MOCK_HOLDINGS` constant | `src/app/core/constants/mock-holdings.constants.ts` ← **შენ ქმნი** |
| O3 | `PortfolioService` — signal + computed | `src/app/core/services/portfolio.service.ts` |
| O4 | `PortfolioPageComponent` template wiring | `src/app/features/portfolio/pages/portfolio-page.component.ts` |
| O5 | About გვერდი — RS School ლოგო | `src/app/features/about/pages/about-page.component.html` |
| O6 | Sprint 2 diary | `development-notes/OgOqro/OgOqro-sprint-2-YYYY-MM-DD.md` |

> **MockApiService-ს ნუ შეეხები** — ის Freemason-12-ის ფაილია.
> Portfolio მონაცემები პირდაპირ signal(MOCK_HOLDINGS)-იდან მოდის, HTTP არ სჭირდება.

---

## ნაბიჯ-ნაბიჯ

### ნაბიჯი 1 — PortfolioHolding model

**ფაილი:** `src/app/core/models/portfolio.model.ts` (stub გახსნილია)

შეავსე interface:
```ts
export interface PortfolioHolding {
  symbol: string;        // მაგ: 'BTC'
  name: string;          // მაგ: 'Bitcoin'
  amount: number;        // მაგ: 0.5
  price: number;         // მაგ: 67230
  value: number;         // amount * price
  changePct24h: number;  // 24 საათის %, შეიძლება უარყოფითი
}
```

---

### ნაბიჯი 2 — MOCK_HOLDINGS constant

**შექმენი ახალი ფაილი:** `src/app/core/constants/mock-holdings.constants.ts`

```ts
import { PortfolioHolding } from '../models/portfolio.model';

export const MOCK_HOLDINGS: PortfolioHolding[] = [
  { symbol: 'BTC',  name: 'Bitcoin',   amount: 0.5,  price: 67230,  value: 33615,  changePct24h: 2.45  },
  { symbol: 'ETH',  name: 'Ethereum',  amount: 5.2,  price: 3460,   value: 17992,  changePct24h: -1.23 },
  { symbol: 'SOL',  name: 'Solana',    amount: 45,   price: 178.92, value: 8051,   changePct24h: 4.56  },
  { symbol: 'LINK', name: 'Chainlink', amount: 200,  price: 18.45,  value: 3690,   changePct24h: 1.89  },
  { symbol: 'UNI',  name: 'Uniswap',  amount: 100,  price: 12.34,  value: 1234,   changePct24h: -0.56 },
];
```

---

### ნაბიჯი 3 — PortfolioService

**ფაილი:** `src/app/core/services/portfolio.service.ts` (stub გახსნილია)

1. import-ები uncomment-ი გააკეთე (ფაილის თავში)
2. შეავსე 4 TODO ბლოკი — ინსტრუქცია ფაილის შიგნით გიწერია

---

### ნაბიჯი 4 — PortfolioPageComponent wiring

**ფაილი:** `src/app/features/portfolio/pages/portfolio-page.component.ts`

1. import-ში `inject` დაამატე
2. `inject(PortfolioService)` uncomment-ი გააკეთე
3. placeholder `computed(() => ...)`-ები შეცვალე სერვისის რეალური computed-ებით:

```ts
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { PortfolioService } from '../../../core/services/portfolio.service';
// ...
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

**ფაილი:** `src/app/features/portfolio/pages/portfolio-page.component.html`

hardcoded ტექსტები (`$147.34K`, `12`, `BTC` და ა.შ.) შეცვალე `{{ totalValue() }}` და ა.შ.-თ.
ყველა TODO კომენტარი გეტყვის სად რა.

---

### ნაბიჯი 5 — About გვერდი (RS School ლოგო — სავალდებულო)

**ფაილი:** `src/app/features/about/pages/about-page.component.html`

ნახე TODO კომენტარი "RS SCHOOL LOGO" ბლოკში.
შეცვალე placeholder `<div>` ამით:

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

**ლოგო სავალდებულოა** — გარეშე ჩათვლა ვერ მოხდება ([P-05]).

---

### ნაბიჯი 6 — Sprint 2 diary

შექმენი: `development-notes/OgOqro/OgOqro-sprint-2-2026-05-XX.md`

ფორმატი: Sprint 1 diary-ს ანალოგი. სავალდებულო:
- რა ააშენე: `PortfolioPageComponent`, `AboutPageComponent`, `PortfolioService`
- რა გაგიჭირდა
- Sprint 3-ის გეგმა
- `≥2 feature components` — PortfolioPageComponent + AboutPageComponent

**PR წესები:**
- შენი GitHub ანგარიშიდან (OgOqro)
- PR-ით, main-ზე პირდაპირ არ დაპუშო
- diary PR squash-merge არ გააკეთო

---

## PR-ის გახსნა

```bash
git checkout -b feat/ogoqro-portfolio-page
# ... ცვლილებები ...
git add .
git commit -m "feat(portfolio): add PortfolioPageComponent and PortfolioService"
git push origin feat/ogoqro-portfolio-page
# GitHub-ზე PR, sprint-2 issue-ს დაუკავშირე
```

---

## დახმარება?

- KiriaIT — `WalletService` (სიგნალების reference, `src/app/core/services/wallet.service.ts`)
- `.cursor/rules/rule.mdc` — ყველა convention
