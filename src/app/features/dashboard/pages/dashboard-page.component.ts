import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DASHBOARD_CASH_LABELS } from '../../../core/constants/settings-ui.constants';
import { ROUTE_PATHS } from '../../../core/constants/route-paths.constants';
import {
  MOCK_DASHBOARD_STATS,
  MOCK_PORTFOLIO_ALLOCATION,
  MOCK_PORTFOLIO_CHART,
  MOCK_TOP_MOVERS,
} from '../../../core/constants/mock-portfolio.constants';
import { AuthService } from '../../../core/services/auth.service';
import { PortfolioChartComponent } from '../components/portfolio-chart/portfolio-chart.component';
import { AssetAllocationComponent } from '../components/asset-allocation/asset-allocation.component';
import { TopMoversComponent } from '../components/top-movers/top-movers.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    RouterLink,
    PortfolioChartComponent,
    AssetAllocationComponent,
    TopMoversComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  private readonly auth = inject(AuthService);

  protected readonly cashLabels = DASHBOARD_CASH_LABELS;
  protected readonly loginPath = `/${ROUTE_PATHS.LOGIN}`;
  protected readonly profile = this.auth.profile;
  protected readonly isAuthed = this.auth.isAuthed;
  protected readonly stats = computed(() => MOCK_DASHBOARD_STATS);
  protected readonly chartPoints = computed(() => MOCK_PORTFOLIO_CHART);
  protected readonly allocationSlices = computed(() => MOCK_PORTFOLIO_ALLOCATION);
  protected readonly topMovers = computed(() => MOCK_TOP_MOVERS);

  protected readonly cashValue = computed(() => {
    const balance = this.auth.profile()?.cashBalanceUsd;
    if (!this.isAuthed() || balance === undefined) {
      return this.cashLabels.GUEST;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(balance);
  });

  protected readonly cashDetail = computed(() =>
    this.isAuthed() && this.auth.profile()
      ? this.cashLabels.DETAIL
      : this.cashLabels.GUEST_DETAIL,
  );
}
