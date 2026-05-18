# Sprint 4 checklist — HTTP, RxJS & testing (40 pts)

Two-week sprint. Scoring is binary: all requirements met → 40 points, any single miss → 0.

> No diary entry → 0 for the whole checkpoint. Don't forget [Q-08] from `.cursor/rules/rule.mdc`.

## Team requirements (20 pts)

- [x] **404 page.** `NotFoundPageComponent` already in place at `src/app/features/not-found/`. Returns user to dashboard via a CTA button.
- [x] **Loading state.** `MatProgressSpinner` + `resource().isLoading()` in `MarketOverviewComponent`. Sprint 4 generalises this through `loadingInterceptor`.
- [x] **API error handling.** `catchError` inside `MarketDataService` maps `HttpErrorResponse` codes to user-facing strings.
- [ ] **Video proof (~1 minute).** Screen recording showing the 404 page, a loading state, and an error message. Linked from the README.

## Individual — KiriaIT

- [ ] **HttpClient used** for at least two requests, one GET + one POST/PUT/DELETE. The POST/PUT/DELETE goes through `MockApiService` (see below).
- [ ] **At least one HTTP Interceptor.** Functional `HttpInterceptorFn` — `loadingInterceptor` is the canonical pick.
- [ ] **At least 5 personal tests.** `WalletService.spec.ts`, `walletConnectedGuard.spec.ts`, `PercentChangePipe.spec.ts`, `MarketDataService.spec.ts`, plus one component smoke test.
- [ ] **Code Review.** Either (A) ≥3 substantive comments left on Freemason-12's PRs, or (B) a diary entry analysing his code.
- [ ] **Sprint 4 diary entry** at `development-notes/KiriaIT/KiriaIT-sprint-4-YYYY-MM-DD.md`.

## Individual — Freemason-12

Same five items, his own commits in `main`. Suggested split:

- [ ] He writes `errorInterceptor` (KiriaIT writes `loadingInterceptor`) — both interceptors land in the chain.
- [ ] His 5 tests target the pieces he authored — directives, services, components from his Sprint 3 surface.
- [ ] Code review on KiriaIT's PRs.
- [ ] Diary entry at `development-notes/Freemason-12/Freemason-12-sprint-4-YYYY-MM-DD.md`.

## Implementation notes for Sprint 4

### `MockApiService` — the mutable-data backend

The Sprint 4 FAQ explicitly allows mock data: "JSON Server, in-memory-web-api, or hardcoded data with a `delay()` — all are acceptable." We use the latter, in a single service.

`src/app/core/services/mock-api.service.ts`:

```ts
@Injectable({ providedIn: 'root' })
export class MockApiService {
  private readonly storage = inject(MockStorageService);

  placeOrder(order: NewOrder): Observable<OrderReceipt> {
    return of({
      id: crypto.randomUUID(),
      status: 'FILLED' as const,
      placedAt: new Date().toISOString(),
      ...order,
    }).pipe(
      delay(600),
      tap((receipt) => this.storage.appendOrder(receipt)),
    );
  }

  cancelOrder(id: string): Observable<void> {
    return of(void 0).pipe(
      delay(300),
      tap(() => this.storage.removeOrder(id)),
    );
  }

  updateProfile(profile: ProfileUpdate): Observable<Profile> {
    return of({ ...profile, updatedAt: new Date().toISOString() }).pipe(delay(400));
  }
}
```

This single service covers POST (`placeOrder`), DELETE (`cancelOrder`), PUT (`updateProfile`) plus real GETs that still flow through `MarketDataService`. That's the two-request minimum already cleared.

### `loadingInterceptor`

Functional, at `src/app/core/interceptors/loading.interceptor.ts`:

```ts
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingService);
  loading.start();
  return next(req).pipe(finalize(() => loading.stop()));
};
```

`LoadingService` is a tiny signal-based counter:

```ts
@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly _count = signal(0);
  readonly isLoading = computed(() => this._count() > 0);
  start(): void { this._count.update((n) => n + 1); }
  stop(): void { this._count.update((n) => Math.max(0, n - 1)); }
}
```

Wired in `app.config.ts` via `provideHttpClient(withFetch(), withInterceptors([loadingInterceptor]))`.

### `errorInterceptor`

Freemason-12's counterpart:

```ts
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifier = inject(NotifierService);
  const logger = inject(LoggerService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = toUserMessage(error);
      notifier.error(message);
      logger.error('HTTP error', { url: req.url, status: error.status });
      return throwError(() => error);
    }),
  );
};
```

### Trade page (`/trade/:symbol`)

This is the last big piece of the wallet-mock spec coverage. Components:

- `TradePageComponent` — pulls `:symbol` from `ActivatedRoute.paramMap`, wires the chart + order book + order form.
- `PriceChartComponent` — wraps a `lightweight-charts` (TradingView) instance. Initial candle history via `MarketDataService.getKlines(symbol)` (Binance public `/api/v3/klines`). No WebSocket in Sprint 4 — periodic poll via `setInterval` is fine.
- `OrderBookComponent` — fetches `/api/v3/depth` snapshot. Bids green, asks red. Refresh every few seconds.
- `OrderFormComponent` — reactive form, 4 fields (side, type, amount, price). Submit calls `MockApiService.placeOrder()`. Updates virtual balance.

### Testing plan (≥5 per person)

Tests live next to source (`*.spec.ts`). Pick a balanced mix per [T-02]: services > guards > pipes > directives > components.

**KiriaIT (suggested):**

1. `wallet.service.spec.ts`
   - `connect(...)` flips status idle → connecting → connected.
   - `disconnect()` clears session + status.
   - Persists to and rehydrates from storage.
   - Error path sets status `error`.
2. `wallet-connected.guard.spec.ts`
   - Returns `true` when connected.
   - Returns `UrlTree` to `/connect?return=...` when not.
3. `percent-change.pipe.spec.ts`
   - `+1.23%` for positive, `-1.23%` for negative, `0.00%` for zero, `—` for null.
4. `market-data.service.spec.ts`
   - Maps DTO to `MarketTickerRow` correctly.
   - 4xx → "Server unavailable" message.
   - Network error (status 0) → "No connection" message.
5. `wallet-status-badge.component.spec.ts`
   - Renders short address when connected; renders "Connect" button when not.

Configure `TestBed` with `provideHttpClientTesting()` for HTTP tests. Mock services through `provide: ServiceClass, useValue: { ...spyMethods }`.

### Video script

About one minute. Order:

1. Navigate to a non-existent URL → show 404 page → click "Back to dashboard".
2. Reload `/dashboard` → spinner appears while data loads, then the cards.
3. Throttle network in DevTools to "Offline" → click refresh on Market Overview → toast appears with the error message.

Save as a short MP4 or GIF, push to a `/docs/` folder or a Loom link, drop the URL in the README.

## Study self-check

- `switchMap` vs `mergeMap` vs `concatMap` — what cancellation looks like for each.
- How a functional `HttpInterceptorFn` differs from the class-based `HttpInterceptor`.
- Why `takeUntilDestroyed()` is the modern unsubscribe pattern, and what it does differently from a manual `Subscription`.
- What `TestBed` does and why we need `provideHttpClientTesting()`.
- How to mock a service in a component test (`provide` + spy object).
- `fakeAsync` + `tick()` vs `waitForAsync` — when to reach for each.
