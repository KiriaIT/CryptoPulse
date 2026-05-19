import { Injectable } from '@angular/core';
// TODO(OgOqro) ნაბიჯი 1: uncomment the lines below after creating those files
// import { computed, signal } from '@angular/core';
// import { PortfolioHolding } from '../models/portfolio.model';
// import { MOCK_HOLDINGS } from '../constants/mock-holdings.constants';

/**
 * PortfolioService — owned entirely by OgOqro.
 *
 * Holds portfolio state as signals. No HTTP, no MockApiService needed —
 * mock data comes directly from MOCK_HOLDINGS constant per [P-03].
 *
 * YOUR TASK (OgOqro) — fill in the 4 TODO blocks below:
 *
 * TODO 1 — private holdings signal (source of truth):
 *   private readonly _holdings = signal<PortfolioHolding[]>(MOCK_HOLDINGS);
 *   readonly holdings = this._holdings.asReadonly();
 *
 * TODO 2 — total portfolio value:
 *   readonly totalValue = computed(() =>
 *     this._holdings().reduce((sum, h) => sum + h.value, 0)
 *   );
 *
 * TODO 3 — best performing asset (highest changePct24h):
 *   readonly bestAsset = computed(() => {
 *     const sorted = [...this._holdings()].sort((a, b) => b.changePct24h - a.changePct24h);
 *     return sorted[0]?.symbol ?? '—';
 *   });
 *
 * TODO 4 — 7-day change label (mock value is fine per [P-03]):
 *   readonly change7d = computed(() => '+14.05%');
 *
 * კონვენციები:
 *   private readonly _x = signal(...)  →  წერა (private, [Q-06])
 *   readonly x = this._x.asReadonly()  →  კითხვა (public)
 */
@Injectable({ providedIn: 'root' })
export class PortfolioService {
  // TODO(OgOqro): implement the 4 blocks described above
}
