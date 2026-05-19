# Sprint 2 — KiriaIT

Sprint 2 goal: routing, lazy loading, guards, signals, DI, deployment + CI.
This file doubles as both a living working log and the final retrospective.

## Status checklist

- [x] At least 3 routes configured — grew from 3 to 7: `/`, `/dashboard`, `/markets`, `/portfolio`, `/about`, `/connect`, `/settings`, `**` (404).
- [x] Lazy loading — every shell child uses `loadChildren` (feature route groups) or `loadComponent` (404). Root `app.routes.ts` stays small and eager.
- [x] Route guard — `walletConnectedGuard: CanActivateFn` at `src/app/core/guards/wallet-connected.guard.ts`. Returns `UrlTree` to `/connect?return=<originalUrl>`. Applied to `/portfolio`.
- [x] Signals in ≥2 components — `WalletService` (`signal` + `computed` + `effect`), `WalletStatusBadgeComponent` (`showModal`, `copied`), `DashboardPageComponent` (`computed`), `ShellComponent` (`showNotifs`), `ConnectPageComponent` (`connectingId`, `errorMessage`).
- [x] ≥2 services with `@Injectable()` + `inject()` — `WalletService`, `MockBlockchainService`, `WalletStorageService`, `ThemeService`, plus existing `MarketDataService`, `ConsoleLoggerService`.
- [x] Diary entry — this file.

---

## What I built this sprint

### Wallet domain — the Sprint 2 centrepiece

The core deliverable is `WalletService` (`src/app/core/services/wallet.service.ts`). It's the reference implementation for Sprint 2's signal requirements:

- `private readonly _status = signal<WalletStatus>('idle')` + `readonly status = this._status.asReadonly()` — encapsulated writable/read split per `[Q-06]`.
- `private readonly _session = signal<WalletSession | null>(null)` — same pattern.
- `readonly isConnected = computed(() => this._status() === 'connected')` — derived boolean, no side effects.
- `readonly shortAddress = computed(() => ...)` — `0x742d…a1A` format for display.
- `connect(provider)` returns `Observable<WalletSession>` from `MockBlockchainService.createSession()` piped through `tap` (set signals) and `catchError` (set error status). The RxJS stream lives entirely inside the service — components only get signals at the boundary via `toSignal` or a manual subscribe with `takeUntilDestroyed(destroyRef)`.
- Constructor rehydrates from `WalletStorageService.read()` and registers an `effect()` that writes back on every session change. `effect()` is correct here — it's a side effect (localStorage write), not derived state.

Supporting services I built alongside:
- `WalletStorageService` — thin localStorage adapter, serializes/deserializes `WalletSession`.
- `MockBlockchainService` — `of(session).pipe(delay(800))` to simulate network latency.
- `ThemeService` — toggles `.dark` on `<html>`, persists to `localStorage`, exposes `isDark` read-only signal and `toggle()`.

Injection token: `WALLET_CONFIG: InjectionToken<WalletProvider[]>` at `src/app/core/tokens/wallet-config.token.ts` — the provider list (MetaMask, WalletConnect, Ledger, Trust Wallet, RS Demo Wallet) is bound in `core.providers.ts`. This separates configuration from the component so the list can be swapped per environment.

### Routing

`app.routes.ts` grew from 3 routes to 8. All shell children are lazy-loaded.
`walletConnectedGuard` uses the `UrlTree` pattern (not `Router.navigate`) — the router handles the redirect itself, which is the spec-recommended approach.

The `/connect` page receives a `?return=` query param from the guard so the user lands back on the original route after connecting.

### UI — shell, dashboard, connect page

Rebuilt the application shell with:
- Sidebar: `lucide-angular` icons (`LayoutDashboard`, `TrendingUp`, `Briefcase`, `Settings`, `Info`), Tailwind design tokens (`bg-card`, `border-border`, `text-muted-foreground`), `routerLinkActive`.
- Header: search bar, dark mode toggle (Sun/Moon icon, live via `ThemeService`), notifications bell with empty-state dropdown, `WalletStatusBadgeComponent`.

`WalletStatusBadgeComponent` has 3 states: idle (→ link to `/connect`), connecting (spinner), connected (short address → opens modal). The connected modal shows wallet address with a copy button (clipboard API + 2s confirmation tick), ETH balance, USD value, and a Disconnect button. Backdrop click closes it.

Dashboard was refactored into sub-components: `PortfolioChartComponent` (SVG polyline), `AssetAllocationComponent` (SVG donut), `TopMoversComponent`, and 4 stat cards — all fed from `MOCK_*` constants.

Global styles updated to oklch CSS variables (light + dark) in `styles.css`, Tailwind config extended with design tokens, Inter font via Google Fonts.

### CI / Deploy

`.github/workflows/ci.yml`: `yarn install --frozen-lockfile` → `yarn lint` → `yarn build --configuration production` → `actions/upload-pages-artifact@v3` (on main) → `actions/deploy-pages@v4`. Node version read from `.nvmrc` via `actions/setup-node`.

`vercel.json` already had `outputDirectory`, `buildCommand`, `installCommand`, and SPA `rewrites` — no changes needed.

---

## What was hard

- **`takeUntilDestroyed()` outside injection context.** I called it inside `onProviderClick()` in `ConnectPageComponent` instead of at construction time. The observable silently never completed. Fix: inject `DestroyRef` at construction and pass it as `takeUntilDestroyed(this.destroyRef)`.
- **`lucide-angular` icon types.** `LucideIconData` is not exported from a public path so the `NavItem` interface had to type `icon` as `typeof LayoutDashboard` — a `typeof` alias instead of an explicit import. Fine in practice but a bit ugly.
- **`routerLinkActive` conflict.** Settings and About both pointed to `/about` in the initial navItems, so both highlighted simultaneously. Fixed by adding a real `/settings` route with its own stub page.
- **oklch CSS variables.** Tailwind v4's `@import 'tailwindcss'` + `@config` pair replaces the old `@tailwind base/components/utilities` directives. The design tokens feed into Tailwind via `var(--*)` in `tailwind.config.js`, which means utilities like `bg-card` and `text-muted-foreground` work out of the box without custom CSS.

---

## Team coordination

- Wrote `SPRINT-2-TASKS.md` cards for OgOqro (Georgian) and Freemason-12 (English) with zero file overlap: OgOqro owns `portfolio.*` and `about.*`; Freemason-12 owns `markets.*` and `unsaved-form.guard.ts`.
- All stub files and templates are pre-built so teammates only fill in the logic.

---

## Sprint 3 plan

- `PercentChangePipe` and `CurrencyFormatPipe` — shared pipes for market tables.
- `PulseOnChangeDirective` — highlights a price cell when the value changes.
- Price alert reactive form (`ReactiveFormsModule`, `NonNullableFormBuilder`, custom `ValidatorFn`, inline error messages from `user-feedback.constants.ts`) per `[F-01]`–`[F-04]`.
- Virtual deposit / withdraw form.
- Real-time price polling via `MarketDataService` + RxJS `interval` + `switchMap`.
- `GlobalErrorHandler` + `NotifierService` wiring.

---

## Time log

Sprint 2 total: ~3 hours.
