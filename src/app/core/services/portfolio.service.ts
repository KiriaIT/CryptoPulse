import { computed, Injectable, signal } from '@angular/core';
import { PortfolioHolding } from '../models/portfolio.model';
import { MOCK_HOLDINGS } from '../constants/mock-holdings.constants';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly _holdings = signal<PortfolioHolding[]>(MOCK_HOLDINGS);

  readonly holdings = this._holdings.asReadonly();

  readonly totalValue = computed(() => this._holdings().reduce((sum, h) => sum + h.value, 0));

  readonly bestAsset = computed(() => {
    const sorted = [...this._holdings()].sort((a, b) => b.changePct24h - a.changePct24h);
    return sorted[0]?.symbol ?? '—';
  });

  readonly change7d = computed(() => '+14.05%');
}
