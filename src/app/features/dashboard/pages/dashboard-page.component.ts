import { ChangeDetectionStrategy, Component, computed } from '@angular/core';

import {
  MOCK_DASHBOARD_STATS,
  MOCK_PORTFOLIO_ALLOCATION,
  MOCK_PORTFOLIO_CHART,
  MOCK_TOP_MOVERS,
} from '../../../core/constants/mock-portfolio.constants';
import { PortfolioChartComponent } from '../components/portfolio-chart/portfolio-chart.component';
import { AssetAllocationComponent } from '../components/asset-allocation/asset-allocation.component';
import { TopMoversComponent } from '../components/top-movers/top-movers.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    PortfolioChartComponent,
    AssetAllocationComponent,
    TopMoversComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  protected readonly stats = computed(() => MOCK_DASHBOARD_STATS);
  protected readonly chartPoints = computed(() => MOCK_PORTFOLIO_CHART);
  protected readonly allocationSlices = computed(() => MOCK_PORTFOLIO_ALLOCATION);
  protected readonly topMovers = computed(() => MOCK_TOP_MOVERS);
}
