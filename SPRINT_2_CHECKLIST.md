# Sprint 2 checklist — Routing & signals (40 pts)

Two-week sprint. Scoring is binary: all requirements met → 40 points, any single miss → 0.

## Team requirements (20 pts)

- [x] **Deployment.** README links to a working frontend URL that returns HTTP 200. Plan: GitHub Pages via the same Actions workflow (see below). Vercel / Netlify also fine.
- [x] **GitHub Actions workflow.** `.github/workflows/ci.yml` runs on push and PR. Steps: `yarn install --frozen-lockfile` + `yarn lint` + `yarn build --configuration production` + `actions/deploy-pages@v4`.
- [x] **At least 6 issues.** GitHub Issues, each with title + description + label. Drafts ready to paste at the bottom of this file.
- [x] **Linter configured.** `eslint.config.mjs` already in repo (Angular plugin + type-checked TS rules).

## Individual — KiriaIT

- [x] **≥3 routes** — `app.routes.ts` has root redirect, `/dashboard` (lazy), wildcard 404. By end of sprint we'll grow this to 4 with `/connect`.
- [x] **Lazy loading** — `loadChildren` for dashboard, `loadComponent` for 404. `/connect` will add a third.
- [x] **At least one route guard** — functional `walletConnectedGuard: CanActivateFn` at `src/app/core/guards/wallet-connected.guard.ts`. Returns `UrlTree` for redirects. Applied to `/portfolio`.
- [x] **Signals in ≥2 components** — `DashboardPageComponent` (`signal` + `effect`), `MarketOverviewComponent` (`computed` over `resource()`).
- [x] **≥2 services with `@Injectable()` + `inject()`** — `MarketDataService`, `ConsoleLoggerService`, `SnackBarNotifierService`, `GlobalErrorHandler` already meet this. `WalletService` will be the new showcase.
- [x] **Sprint 2 diary entry** — `development-notes/KiriaIT/KiriaIT-sprint-2-2026-05-13.md` — full retrospective written.

## Individual — OgOqro

OgOqro must author these commits himself for the auto-parser to attribute credit. Task card: [`development-notes/OgOqro/SPRINT-2-TASKS.md`](./development-notes/OgOqro/SPRINT-2-TASKS.md).

- [ ] `/portfolio` route + `PortfolioPageComponent` — mockup 04-05 (stat cards + holdings table). Stub at `src/app/features/portfolio/`.
- [ ] `/about` route + `AboutPageComponent` — RS School logo (mandatory `[P-05]`). Stub at `src/app/features/about/`.
- [ ] `PortfolioService` — `signal(MOCK_HOLDINGS)` + `computed` (totalValue, bestAsset, change7d). Stub at `src/app/core/services/portfolio.service.ts`.
- [ ] Signal usage in ≥2 components (`PortfolioPageComponent` + `AboutPageComponent`).
- [ ] Diary entry at `development-notes/OgOqro/OgOqro-sprint-2-YYYY-MM-DD.md`.

## Individual — Freemason-12

Freemason-12 must author these commits himself for the auto-parser to attribute credit. Task card: [`development-notes/Freemason-12/SPRINT-2-TASKS.md`](./development-notes/Freemason-12/SPRINT-2-TASKS.md).

- [ ] `/markets` route + `MarketsPageComponent` — mockup 03 table (Name / Price / 24h / 7d / Trade). Stub at `src/app/features/markets/`.
- [ ] `MockApiService.getMarkets()` — `of(MOCK_MARKETS).pipe(delay(600))`. Stub at `src/app/core/services/mock-api.service.ts`.
- [ ] `unsavedFormGuard: CanDeactivateFn` — functional guard. Stub at `src/app/core/guards/unsaved-form.guard.ts`.
- [ ] Signal usage in ≥2 components (`MarketsPageComponent` filter signal + computed filtered list).
- [ ] Sprint 1 catch-up diary (≥2 components) + Sprint 2 diary at `development-notes/Freemason-12/`.

## Implementation notes for Sprint 2

### WalletService skeleton

The single piece of code that turns most of the Sprint 2 individual items green. Goes at `src/app/core/services/wallet.service.ts`:

- `private readonly _status = signal<WalletStatus>('idle')`, exposed as `readonly status = this._status.asReadonly()`.
- `private readonly _session = signal<WalletSession | null>(null)`, exposed via `asReadonly()`.
- `readonly isConnected = computed(() => this._status() === 'connected')`.
- `readonly shortAddress = computed(() => /* 0x742d…2a1A */)`.
- `connect(provider: WalletProvider)` returns `Observable<WalletSession>` from `MockBlockchainService.createSession(provider)`, piped through `delay(800)` + `tap(set signals)` + `catchError(set error status, rethrow)`.
- Constructor rehydrates from `WalletStorageService.read()` and registers an `effect()` that re-persists on every session change.

### walletConnectedGuard

Functional, at `src/app/core/guards/wallet-connected.guard.ts`:

```ts
export const walletConnectedGuard: CanActivateFn = (_route, state) => {
  const wallet = inject(WalletService);
  const router = inject(Router);
  return wallet.isConnected()
    ? true
    : router.parseUrl(`/connect?return=${encodeURIComponent(state.url)}`);
};
```

Returning a `UrlTree` is the spec-recommended pattern for redirects (no need to inject `Router.navigate` from inside the guard).

### `/connect` route

Lazy-loaded `ConnectPageComponent` displaying a provider list. Each provider tile shows the name, a short subtitle, and emits a `WalletProvider` value on click. The list itself is injected from a `WALLET_CONFIG` `InjectionToken` (Sprint 3 has the InjectionToken requirement; introducing the token this sprint gets us a head start).

### CI workflow draft

`.github/workflows/ci.yml`:

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: yarn
      - run: yarn install --frozen-lockfile
      - run: yarn lint
      - run: yarn build --configuration production
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/crypto-pulse/browser

  deploy:
    needs: lint-build
    if: github.ref == 'refs/heads/main'
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Enable Pages first in **Settings → Pages → Source: GitHub Actions**. Then paste the live URL into the README "Deployment" section.

### GitHub issues to create (≥6)

Paste each block into a new Issue on GitHub, apply the `sprint-2` label, assign yourself or Freemason-12 accordingly.

#### 1. `feat(wallet): add WalletService with signal-based session state`

**Scope:** `src/app/core/services/wallet.service.ts`, supporting `WalletStorageService`, `MockBlockchainService`, models in `core/models/`.

**Acceptance:**
- Service uses `signal()`, `computed()`, `effect()` per `[O-03]`.
- Exposes read-only signals via `asReadonly()`.
- `connect(provider)` returns Observable with simulated latency via `delay(800)`.
- Session persists to `localStorage` and rehydrates on construction.

#### 2. `feat(guards): functional walletConnectedGuard`

**Scope:** `src/app/core/guards/wallet-connected.guard.ts`.

**Acceptance:**
- `CanActivateFn` returning `UrlTree` for redirects.
- Uses `inject()` for `WalletService` and `Router`.
- Redirects unauthenticated users to `/connect?return=<originalUrl>`.

#### 3. `feat(routing): add /connect route with WalletConnectModalComponent`

**Scope:** `src/app/features/wallet/`.

**Acceptance:**
- New lazy route via `loadComponent`.
- Provider list driven by `WALLET_CONFIG` `InjectionToken`.
- Includes an "RS Demo Wallet" entry clearly labeled as a course demo.

#### 4. `chore(ci): GitHub Actions workflow — lint + build + Pages deploy`

**Scope:** `.github/workflows/ci.yml`, GitHub Pages settings.

**Acceptance:**
- Workflow runs on push and PR to `main`.
- Lint + build steps gate the deploy step.
- Deployment URL added to README.

#### 5. `docs(readme): add deployment URL and CI badge`

**Scope:** `README.md`.

**Acceptance:**
- Deployment section linked to live URL (HTTP 200).
- CI status badge near the top.

#### 6. `chore(github): branch protection on main + repo labels`

**Scope:** GitHub UI only.

**Acceptance:**
- `main` requires PR + at least one review + passing CI.
- Labels added: `sprint-1`, `sprint-2`, `sprint-3`, `sprint-4`, `feature`, `bug`, `chore`, `ci`, `docs`, `beyond-api`.

#### 7. `feat(signals): WalletStatusBadge component in the shell header`

**Scope:** `src/app/layout/shell/`, new `WalletStatusBadgeComponent` under `src/app/features/wallet/components/`.

**Acceptance:**
- Reads `WalletService.shortAddress()` and `isConnected()` via signals.
- OnPush; uses `@if` for connected / disconnected branches.

#### 8. `feat(signals): linkedSignal for watchlist derived count`

**Scope:** `src/app/features/dashboard/pages/dashboard-page.component.ts`.

**Acceptance:**
- Watchlist count is exposed via `linkedSignal` so it stays in sync with the source array but can be manually overridden (e.g. for animations / pulse).

## Study self-check

Before the mentor interview be ready to answer these without notes.

- Difference between `loadComponent` and `loadChildren`. (Which one for a single page, which for a route group.)
- Why `pathMatch: 'full'` matters for the root redirect.
- Why functional guards (`CanActivateFn`) are preferred over class-based.
- `signal()` vs a plain class field — what changes for change detection.
- `computed()` vs `effect()` — when to reach for each and what to avoid inside `computed`.
- `providedIn: 'root'` vs a component's `providers` array.
