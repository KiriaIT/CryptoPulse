import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  resource,
} from '@angular/core';

import { DecimalPipe } from '@angular/common';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { MarketDataService, MarketTickerRow, PortfolioHolding } from '../../../core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [DecimalPipe, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioPageComponent {
  private readonly portfolioService = inject(PortfolioService);
  private readonly marketData = inject(MarketDataService);

  protected readonly snapshot = resource<MarketTickerRow[], unknown>({
    loader: () => firstValueFrom(this.marketData.getTickerSnapshot()),
  });

  constructor() {
    effect(() => {
      if (this.snapshot.isLoading() || this.snapshot.error()) {
        this.portfolioService.clearHoldings();
        return;
      }
      if (this.snapshot.hasValue()) {
        this.portfolioService.setHoldingsFromTickers(this.snapshot.value() ?? []);
      }
    });
  }

  protected readonly totalValue = computed<string>(() => {
    const value = this.portfolioService.totalValue();
    return '$' + (value / 1_000).toFixed(2) + 'K';
  });

  protected readonly change7d = computed<string>(() => this.portfolioService.change7d());

  protected readonly totalAssets = computed<number>(() => this.portfolioService.holdings().length);

  protected readonly bestAsset = computed<string>(() => this.portfolioService.bestAsset());

  protected readonly holdings = computed<PortfolioHolding[]>(() =>
    this.portfolioService.holdings(),
  );
}
