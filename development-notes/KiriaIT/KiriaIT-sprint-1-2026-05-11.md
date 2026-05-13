# Sprint 1 — KiriaIT

Week 1 of the Crypto Pulse build. The goal for this sprint was just to get the skeleton up: Angular CLI project, strict TS, a couple of standalone components, and enough folder discipline to not regret it later.

## What I built

Spun up the project with `ng new crypto-pulse` (Angular 21), strict mode on, no NgModules — the whole thing is standalone. Went straight for the signal-based component API (`input()`, `output()`, `model()`) because the legacy `@Input()` / `@Output()` decorators are explicitly called out as "legacy" in the course spec.

Folder structure follows our team's KHACHAPURI.JS conventions:

```
src/app/
├── core/        (services, abstractions, tokens, constants, models, providers)
├── shared/      (cross-feature UI + utils)
├── features/    (dashboard, not-found)
└── layout/      (shell)
```

Concrete components landed:

- `StatCardComponent` — first real signal-based component. `input.required<string>()` for label/value, `input<string>()` for optional detail/suffix, `model(false)` for the expanded state, and an `output<void>()` pulse. Click handler flips the model and emits.
- `MarketOverviewComponent` — wires `MarketDataService` via `resource()` and exposes a few `computed()` selectors so the template can stay dumb.
- `WatchlistFormComponent` — first reactive form. One control for now (`symbol`), with `required` + a regex pattern validator. Sprint 3 will turn this into a 3-field form.
- `DashboardPageComponent` — `signal<string[]>` watchlist + `effect()` syncing it to `sessionStorage`.

On the service side I set up an abstract `LoggerService` with a `ConsoleLoggerService` implementation (provided via `useExisting`) — gives me one place to swap output later without touching consumers. Same pattern for `NotifierService` → `SnackBarNotifierService`. A `GlobalErrorHandler` rounds it out. The `APP_CONFIG` `InjectionToken` is already in place so Sprint 3's "InjectionToken" checkpoint item is half-done.

For HTTP I went with the Binance Spot Testnet public ticker endpoint — `forkJoin` over a small symbol set, mapped into a typed `MarketTickerRow`, wrapped in `catchError` that translates `HttpErrorResponse` codes into messages from `user-feedback.constants.ts`. No API key needed since we're using public endpoints only.

Styling is Tailwind v4 (`@tailwindcss/postcss` plugin), Angular Material on top, ngx-charts for the charts we'll need in Sprint 2-3, Lucide icons. ESLint 9 flat config with `angular-eslint` + type-checked `typescript-eslint`.

## What I struggled with

- Tailwind v4 setup. The docs changed a lot since v3 — the `@import "tailwindcss"` directive replaces the old layer setup. Spent maybe 40 minutes figuring out why my classes weren't applying.
- Resisting the urge to mix `@Input()` with `input()` in the same component. Decided to standardise on the signal-based API everywhere; rule [O-04] in our `.cursor/rules/rule.mdc` enforces it.
- Choosing between class-based services and abstract-then-concrete. Went abstract for `Logger` / `Notifier` because Sprint 3's `useExisting` provider requirement maps onto it cleanly — kill two birds.

## Feature Components written personally (≥2 for diary)

The course requires at least 2 Feature Components developed personally. So far:

1. `StatCardComponent` — described above. Concepts used: standalone, OnPush, `input.required`, `input`, `model`, `output`, `protected` template-accessed members.
2. `MarketOverviewComponent` — described above. Concepts: `inject()` DI, `resource()`, `computed()` selectors, `DecimalPipe`, OnPush, three-state UI (loading / error / loaded).

## Plan for Sprint 2

- `/coins/:symbol` detail route with lazy `loadComponent` + `paramMap`.
- `/portfolio` and `/connect` routes (wallet-mock path).
- Functional `walletConnectedGuard` (`CanActivateFn` returning `UrlTree` on redirect).
- `WalletService` showcase — `signal` / `computed` / `effect` / RxJS `delay` + `tap` / persistence — single file that demos most of Sprint 2's concept list.
- Migrate watchlist count to `linkedSignal` (gets me hands-on with linked state).
- GitHub Actions CI (lint + build) and a GitHub Pages deployment.
- Split the placeholder mega-issue on GitHub into 6–8 proper sprint-2 tickets.
- Write the Sprint 2 diary entry as I go, not on the last day.

## Time spent

Roughly 14 hours over the week. Bulk went into Tailwind v4 wrangling and getting the layered folder conventions right.
