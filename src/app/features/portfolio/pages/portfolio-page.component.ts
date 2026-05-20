import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { DecimalPipe } from '@angular/common';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { PortfolioHolding } from '../../../core';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioPageComponent {
  private readonly portfolioService = inject(PortfolioService);

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
