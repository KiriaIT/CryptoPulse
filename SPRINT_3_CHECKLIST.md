# Sprint 3 checklist — Directives, pipes & forms (40 pts)

Two-week sprint. Scoring is binary: all requirements met → 40 points, any single miss → 0. There are no team-level items in Sprint 3 — everything is per-person.

## Individual — KiriaIT

- [ ] **At least one custom directive or pipe** with meaningful usage in the project, merged into `main`.
- [ ] **At least one reactive form** with `FormGroup` + `FormControl`, **≥3 fields**, merged into `main`.
- [ ] **Validation works** — at least two validator types, with errors displayed inline in the template.
- [ ] **Form is functional** — on submit the data is processed (sent to a service, navigation, persistence, etc.).
- [ ] **`InjectionToken` or custom provider** — one of `useValue` / `useFactory` / `useClass` / `useExisting`, merged into `main`.
- [ ] **At least 3 components use OnPush** — already met (we have ≥7). Sprint 3 adds Markets / Portfolio / Settings, which will be OnPush by default.
- [ ] **Sprint 3 diary entry** at `development-notes/KiriaIT/KiriaIT-sprint-3-YYYY-MM-DD.md`.

## Individual — OgOqro

Same list, all his own commits in `main`. Suggested split so we don't duplicate:

- [ ] `CurrencyCompactPipe` (KiriaIT does `PercentChangePipe`) — same Pipe requirement covered.
- [ ] Profile Settings reactive form (KiriaIT does Price Alert) — same form requirement covered.
- [ ] One of the other custom validators / `WALLET_CONFIG` provider (KiriaIT does another).
- [ ] Diary entry at `development-notes/OgOqro/OgOqro-sprint-3-YYYY-MM-DD.md`.

## Implementation notes for Sprint 3

### Custom directive — `PulseOnChangeDirective`

Attribute directive that briefly flashes a CSS class when its bound value changes. Used in `MarketOverviewComponent` and `StatCardComponent` for live price updates.

```ts
@Directive({ selector: '[appPulseOnChange]' })
export class PulseOnChangeDirective {
  readonly value = input.required<number | string>();
  @HostBinding('class.is-pulsing') protected pulsing = false;

  constructor() {
    let previous: number | string | undefined;
    effect(() => {
      const next = this.value();
      if (previous !== undefined && previous !== next) {
        this.pulsing = true;
        setTimeout(() => (this.pulsing = false), 350);
      }
      previous = next;
    });
  }
}
```

Concepts demonstrated: standalone `@Directive`, `input.required()`, `@HostBinding`, `effect()` for change detection on signal value, OnPush-friendly (no manual `markForCheck`).

### Custom pipes

#### `PercentChangePipe`

```ts
@Pipe({ name: 'percentChange', standalone: true, pure: true })
export class PercentChangePipe implements PipeTransform {
  transform(value: number | null | undefined, decimals = 2): string {
    if (value == null || Number.isNaN(value)) return '—';
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(decimals)}%`;
  }
}
```

#### `CurrencyCompactPipe`

```ts
@Pipe({ name: 'currencyCompact', standalone: true, pure: true })
export class CurrencyCompactPipe implements PipeTransform {
  transform(value: number | null | undefined, currency = 'USD'): string {
    if (value == null) return '—';
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      notation: 'compact',
      maximumFractionDigits: 2,
    });
    return formatter.format(value);
  }
}
```

Both are `pure: true` (no impure recompute on every CD cycle).

### Reactive form — Price Alert

Lives at `src/app/features/settings/components/price-alert-form/`. Three fields, two validators per field where it makes sense:

```ts
@Component({ /* OnPush, ReactiveFormsModule */ })
export class PriceAlertFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly alerts = inject(PriceAlertService);

  readonly form = this.fb.group({
    symbol: this.fb.control('', {
      validators: [Validators.required, Validators.pattern(/^[A-Z]{2,10}$/)],
    }),
    targetPrice: this.fb.control<number | null>(null, {
      validators: [Validators.required, priceMustBePositive()],
    }),
    direction: this.fb.control<'above' | 'below'>('above', {
      validators: [Validators.required],
    }),
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.alerts.create(this.form.getRawValue());
    this.form.reset({ symbol: '', targetPrice: null, direction: 'above' });
  }
}
```

Custom validator at `src/app/core/validators/price.validators.ts`:

```ts
export function priceMustBePositive(): ValidatorFn {
  return (control) => {
    const value = control.value;
    if (value == null) return null;
    return typeof value === 'number' && value > 0
      ? null
      : { priceMustBePositive: true };
  };
}
```

### InjectionToken — `WALLET_CONFIG`

```ts
export interface WalletConfig {
  readonly providers: readonly WalletProviderDescriptor[];
}

export const WALLET_CONFIG = new InjectionToken<WalletConfig>('WALLET_CONFIG');
```

Provided in `core.providers.ts` via `{ provide: WALLET_CONFIG, useValue: WALLET_CONFIG_VALUE }`. `WalletConnectModalComponent` injects it and exposes the list to the template.

### Pages introduced this sprint

These all ship in Sprint 3 (UI scaffolding + reactive forms wiring; deeper data flows come in Sprint 4):

- `/markets` — Market Explorer table (uses `MarketDataService` already in place; adds search input + filter chips + the new `PercentChangePipe`).
- `/portfolio` — Holdings table with `MOCK_PORTFOLIO` × real prices = realistic values.
- `/settings` — Profile sub-page + Notifications sub-page; the Price Alert form lives here.
- `/about` — Team profile cards + the mandatory clickable RS School logo.

### "Beyond API" hookup

Sprint 3 is when the Beyond-API trio formally lands:

- **Price alerts** — Price Alert form + `PriceAlertService` with `signal<PriceAlert[]>` and `localStorage` persistence via `effect()`. Visual notification when condition met (Sprint 4 wires the watcher).
- **Virtual deposit / withdraw** — Deposit and Withdraw modals on `/portfolio`, backed by `VirtualBalanceService`.
- **Mock wallet connect** — already live from Sprint 2.

## Study self-check

- Attribute vs structural directive — and how the new `@if` / `@for` differ from `*ngIf` / `*ngFor`.
- `pure: true` vs `pure: false` pipes — when each is appropriate.
- Template-driven vs Reactive Forms — why we go reactive.
- Sync validator (`ValidatorFn`) vs async validator (`AsyncValidatorFn`).
- Why `InjectionToken` is needed for non-class dependencies.
- `Default` vs `OnPush` change detection — what triggers a re-check under OnPush.
