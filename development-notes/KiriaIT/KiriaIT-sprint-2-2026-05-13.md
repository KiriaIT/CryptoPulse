# Sprint 2 — KiriaIT

Living document. I'll keep updating this as Sprint 2 PRs land. The goal is routing, signals, lazy loading, guards, and getting a deployment + CI out the door.

## Status checklist

The auto-parser only cares about a handful of binary items; here's the per-item state.

- [x] At least 3 routes configured — `src/app/app.routes.ts` has root redirect, `/dashboard` (lazy), wildcard 404 (lazy). Will grow to 9 routes by end of sprint.
- [x] Lazy loading — both `loadChildren` (dashboard) and `loadComponent` (404) in use.
- [ ] Route guard — `walletConnectedGuard: CanActivateFn` is next on my list. Will protect `/trade/:symbol`, `/portfolio`, `/transactions`, `/settings`.
- [x] Signals in ≥2 components — `DashboardPageComponent` uses `signal` + `effect`; `MarketOverviewComponent` uses `computed` over `resource()`. Sprint 3 will add a third via the new pages.
- [x] ≥2 services with `@Injectable()` + `inject()` — already have `MarketDataService`, `ConsoleLoggerService`, `SnackBarNotifierService`, `GlobalErrorHandler`. `WalletService` will join them this sprint as the centrepiece.
- [x] Diary entry — this file.

## What I've worked on

### Wallet domain (in progress)

The big architectural decision for Sprint 2 was that we're not implementing a NestJS backend or HMAC-signed Binance trading. The course README FAQ allows mock data and we want to keep the focus on Angular reactive patterns rather than backend infra.

The path: `WalletService` exposes signal-based session state (`status`, `session`, `isConnected`, `shortAddress`), and a `connect(provider)` method that returns `Observable<WalletSession>` from a `MockBlockchainService` piped through `delay(800)`. The service hydrates from `localStorage` on construction and re-persists via an `effect()`. A `walletConnectedGuard` returns `UrlTree` for the redirect path so I'm using the recommended functional-guard pattern from the spec.

This one service ends up touching: `signal`, `computed`, `effect`, readonly encapsulation (`asReadonly`), `inject`, RxJS `delay` / `tap` / `catchError` / `throwError`, error state handling, and persistence. Whole concept list for Sprint 2 in one file — good for the mentor interview.

### Routing growth

Plan is to grow the route table from 3 to 9:

| Path | Lazy | Guard | Notes |
|------|------|-------|-------|
| `/` | — | — | redirect to `/dashboard` (`pathMatch: 'full'` — needed so it doesn't intercept every URL) |
| `/dashboard` | yes | — | existing |
| `/connect` | yes | — | wallet provider list |
| `/markets` | yes | — | Sprint 3 |
| `/trade/:symbol` | yes | `walletConnectedGuard` | Sprint 3–4 |
| `/portfolio` | yes | `walletConnectedGuard` | Sprint 3 |
| `/settings` | yes | `walletConnectedGuard` | Sprint 3 |
| `/about` | yes | — | Sprint 3 |
| `**` | yes | — | existing 404 |

### CI + deploy

Still pending. Plan: a single `.github/workflows/ci.yml` that does `yarn install --frozen-lockfile`, `yarn lint`, `yarn build --configuration production`, then publishes the `dist/crypto-pulse/browser` output via `actions/deploy-pages@v4`. README will get the live URL once it's green.

## What I've struggled with so far

- `computed()` vs `effect()` — kept reaching for `effect()` to derive labels and had to remind myself "no side effects, no DOM, just pure function → computed". Once that clicked the `marketsLabel`, `linkLabel`, `linkSuffix` chain in `MarketOverviewComponent` fell out naturally.
- Functional guard return types. The course spec calls out returning `UrlTree` instead of `boolean` for redirects, which is cleaner because the router does the navigation for you instead of you having to inject `Router` and call `navigateByUrl` from inside the guard. Good design choice.
- `linkedSignal()` is genuinely new to me — it's not just sugar over `computed` + `effect`, it allows the derived value to be reassigned without breaking the link. Useful for the watchlist count + manual override case.

## Plan for the rest of Sprint 2

- Land `WalletService` + `walletConnectedGuard` in two PRs (small, reviewable).
- Add `/connect` page + `WalletConnectModalComponent` with `WALLET_CONFIG` `InjectionToken` driving the provider list.
- Ship the GitHub Actions workflow + Pages deploy.
- Split issue #1 (the mega-issue) into 6+ atomic tickets with `sprint-2` label.
- Final retrospective + Sprint 3 plan in this file before the deadline.

## Time so far

~6 hours into Sprint 2.
