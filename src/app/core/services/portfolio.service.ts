import { computed, Injectable, signal } from '@angular/core';
import { PortfolioHolding } from '../models/portfolio.model';
import { MarketTickerRow } from '../models';
import { PORTFOLIO_SEED } from '../constants/portfolio-seed.constants';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly _holdings = signal<PortfolioHolding[]>([]);

  readonly holdings = this._holdings.asReadonly();

  readonly totalValue = computed(() => this._holdings().reduce((sum, h) => sum + h.value, 0));

  readonly bestAsset = computed(() => {
    const sorted = [...this._holdings()].sort((a, b) => b.changePct24h - a.changePct24h);
    return sorted[0]?.symbol ?? '—';
  });

  readonly change7d = computed(() => '+14.05%');

  setHoldingsFromTickers(tickers: MarketTickerRow[]): void {
    const byPair = new Map(tickers.map((row) => [row.symbol, row]));

    const merged: PortfolioHolding[] = PORTFOLIO_SEED.map((entry) => {
      const pair = `${entry.symbol}USDT`;
      const row = byPair.get(pair);
      const price = row?.lastPrice ?? 0;
      const changePct24h = row?.changePct24h ?? 0;

      return {
        symbol: entry.symbol,
        name: entry.name,
        amount: entry.amount,
        price,
        value: entry.amount * price,
        changePct24h,
      };
    });

    this._holdings.set(merged);
  }

  clearHoldings(): void {
    this._holdings.set([]);
  }
}
