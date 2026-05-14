# Project tracker

Single source of truth for the Crypto Pulse build. Per-sprint detail lives in the dedicated checklist files; this document captures the cross-cutting concerns and the architecture decisions.

## Snapshot

We have chosen the **CryptoTrade** project (locked in Sprint 1) on Angular 21, signal-based, standalone, OnPush throughout. We're going with a frontend-only mock-wallet path instead of email/password + NestJS backend, and the divergence is documented in the [README](./README.md#project-notes). Public Binance Spot Testnet market data is real; trading-side flows are mocked.

Per-sprint checklists:

- [SPRINT_1_CHECKLIST.md](./SPRINT_1_CHECKLIST.md) — Project setup, components (20 pts)
- [SPRINT_2_CHECKLIST.md](./SPRINT_2_CHECKLIST.md) — Routing & signals (40 pts)
- [SPRINT_3_CHECKLIST.md](./SPRINT_3_CHECKLIST.md) — Directives, pipes, forms (40 pts)
- [SPRINT_4_CHECKLIST.md](./SPRINT_4_CHECKLIST.md) — HTTP, RxJS, testing (40 pts)

## Baseline (CODE_STANDARDS.md)

These are checked across the whole project — not tied to a single sprint.

- [x] Angular CLI bootstrap (`ng new`), Angular 21
- [x] Standalone API everywhere, no NgModules
- [x] New control flow `@if` / `@for` / `@switch` in every template
- [x] OnPush change detection in every component
- [x] Signals for state, `input()` / `output()` / `model()` for component APIs
- [x] Lazy loading on routes
- [x] `tsconfig.json` `strict: true`, no `any` / `as any` / `@ts-ignore`
- [x] ESLint + Prettier configured
- [/] One reactive form exists, but Sprint 3 needs ≥3 fields — see [SPRINT_3_CHECKLIST.md](./SPRINT_3_CHECKLIST.md)
- [/] Deployment URL in README — CI + Vercel docs landed; add the live HTTPS link in README `Deployment` when the production domain is final (Sprint 2 deliverable)

## Architecture decisions

### Wallet-mock path

Rather than implement a NestJS backend with HMAC-signed Binance trading, we ship a frontend-only mock wallet flow. The reasoning is in [README "Project Notes"](./README.md#project-notes); the practical implications are:

- Public market data — real, via `MarketDataService` hitting Binance Spot Testnet public endpoints.
- Trading flows — mocked via `MockApiService` (`of(...).pipe(delay(N))`) plus `MOCK_*` constants for holdings, order history, etc.
- Auth — `WalletService` exposes signal-based session state. `connect(provider)` returns an Observable that delays 800ms then sets the connected signal. Session persists to `localStorage`.
- The reactive-form requirement (Sprint 3) is covered by the price-alert form / mock order form / settings profile form — not by a registration form.

### Folder layout

```
src/app/
├── core/            services, guards, interceptors, tokens, models, constants, providers, validators
├── shared/          cross-feature UI (StatCard etc.) + utils
├── features/        dashboard, wallet, markets, trade, portfolio, transactions, settings, about, not-found
└── layout/          shell (app frame, header, sidebar)
```

Imports flow strictly one direction: `core → shared → features → layout`. Cross-feature exports go through `features/<name>/index.ts` barrels.

### Routing

By end of Sprint 3 the route table will be:

| Path | Lazy | Guard | Introduced |
|------|------|-------|------------|
| `/` | — | — | S1 (redirect → `/dashboard`) |
| `/dashboard` | yes | — | S1 |
| `/connect` | yes | — | S2 |
| `/markets` | yes | — | S3 |
| `/trade/:symbol` | yes | `walletConnectedGuard` | S3–S4 |
| `/portfolio` | yes | `walletConnectedGuard` | S3 |
| `/transactions` | yes | `walletConnectedGuard` | S4 |
| `/settings` | yes | `walletConnectedGuard` | S3 |
| `/about` | yes | — | S3 |
| `**` | yes | — | S1 (404) |

Nine real routes, all lazy, four behind the wallet guard. That comfortably beats Sprint 2's "3 routes / 1 lazy / 1 guard" floor and the "5+ pages" common requirement.

### Reactive forms strategy

Three candidate forms cover the Sprint 3 requirement (`FormGroup`, ≥3 fields, ≥2 validators):

| Form | Fields | Validators | Lives at |
|------|--------|------------|----------|
| Price Alert | symbol, targetPrice, direction | `required` + `pattern` + custom `priceMustBePositive` | Settings → Alerts |
| Deposit (mock) | currency, amount, memo | `required` + `min` + custom `currencyAllowed` | Wallet → Deposit modal |
| Profile Settings | displayName, email, avatarUrl, themePref | `required` + `email` + custom `urlPattern` | `/settings/profile` |

The price-alert form doubles as the "Beyond-API" feature so it's the canonical example we'll point at during the mentor interview.

### Custom directive + pipe (Sprint 3)

- `PulseOnChangeDirective` — `@HostBinding('class.pulse')` toggles a CSS animation when the bound value changes. Uses signal-based `input()` for the watched value.
- `PercentChangePipe` — formats a number as `+1.23%` / `-0.45%`, with a second arg controlling whether to include colour-coding hints (`pos` / `neg`).

### Dependency injection

- `APP_CONFIG` — already in place, holds runtime config.
- `WALLET_CONFIG` — new in Sprint 3, holds the mock wallet provider list (used by `WalletConnectModalComponent`).
- Abstract `LoggerService` / `NotifierService` with concrete impls registered via `useExisting`.
- `GlobalErrorHandler` registered via `useClass`.

That gives us examples of `useValue`, `useExisting`, and `useClass` — covers the Sprint 3 InjectionToken-or-custom-provider requirement comfortably.

### HTTP layer (Sprint 4)

- `MarketDataService` — real public Binance endpoints, already in place.
- `MockApiService` — wraps in-memory data with `delay()` for POST / PUT / DELETE flows (orders, alerts, watchlist persistence).
- `loadingInterceptor` (functional) — global signal-based loading counter. Increment on each request, decrement on response.
- `errorInterceptor` (functional) — uniform `catchError` that maps `HttpErrorResponse` to user-facing strings.

### Testing plan (Sprint 4)

Five tests per contributor minimum. Priorities:

1. `WalletService` — connect / disconnect / persistence / error path.
2. `walletConnectedGuard` — pass-through when connected, redirect URL tree when not.
3. `PercentChangePipe` — positive / negative / edge cases (NaN, null).
4. `PulseOnChangeDirective` — host binding toggled on input change.
5. `MarketDataService` — happy path + 4xx + network error mapping.

Components themselves get smoke tests; logic-heavy units get the deeper coverage.

## Diary rules

The course evaluates the diary separately (50 pts max). The basics:

- One entry per week, committed on the same or next day. No backdating; the parser checks commit dates.
- Files live at `development-notes/<github-username>/<github-username>-sprint-N-YYYY-MM-DD.md`.
- Each contributor describes at least two Feature Components they built personally — what concepts they used (DI, CD, Forms…), what tripped them up, how they resolved it.
- Diary commits must not be squash-merged (squashes erase the original dates the parser checks).

## Team workflow

Counted under Team Score (260 pts total).

### Project management (80 pts)

- [ ] GitHub Project (Kanban) created and used through all four sprints, not built at the last minute.
- [ ] Each contributor has ≥3 tickets with description, assignee, label.
- [ ] ≥3 documented meeting notes linked from this file or the README.

### Git culture (80 pts)

- [ ] Branch protection on `main` (require PR + at least 1 review).
- [ ] Conventional Commits enforced (commitlint optional).
- [ ] Each contributor reviewed ≥3 of the other's PRs with substantive comments.

### Product integrity (100 pts)

- [x] Launchpad — local setup is `yarn install && yarn start`, documented in README.
- [/] Deployed (Sprint 2 deliverable) — Vercel from `main`; paste canonical URL into README `Deployment`.
- [x] CI/CD (Sprint 2 deliverable) — GitHub Actions `ci.yml` (lint + production build).
- [ ] UX/UI consistency across pages (judged at the team presentation).

## GitHub housekeeping (manual, done in the GitHub UI)

These items can't land via PR — the repo owner does them in Settings:

- [x] Invite `rollingscopes` (Read access) — **Settings → Collaborators** (pending acceptance from their side).
- [ ] Enable branch protection on `main` — **Settings → Branches → Add rule** → require PR + 1 review + status checks (CI workflow once it exists).
- [ ] Create a Project (Kanban board) under the **Projects** tab. Link the URL from this file once created.
- [ ] Add labels: `sprint-1`, `sprint-2`, `sprint-3`, `sprint-4`, `feature`, `bug`, `chore`, `ci`, `docs`, `beyond-api`.
- [ ] Update the repo description to something tight, e.g. "CryptoTrade clone on Angular 21 — signals, standalone, strict TS, OnPush, mock wallet, Binance Spot Testnet."
- [ ] Optional: rename repo `CryptoTracker` → `crypto-pulse` for slug consistency with `package.json`.

## OgOqro onboarding

`development-notes/OgOqro/` is ready for OgOqro's first commits. To pick up his Sprint 1 + Sprint 2 individual requirements he needs to author (himself, from his own GitHub account):

- At least one Feature Component in `main` using `input()` or `output()` — see Sprint 1 checklist.
- His own Sprint 1 diary entry (and Sprint 2 entry when the sprint ends) in `development-notes/OgOqro/`.
- A small Sprint 2 deliverable — most natural is one new lazy-loaded route or one signal-based component — so the auto-parser sees commits from his GitHub user.

Keep his commits separate (not as `Co-authored-by:` trailers) so contributor attribution is unambiguous.
