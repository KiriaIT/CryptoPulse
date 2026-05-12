import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, resource } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { firstValueFrom } from 'rxjs';

import { DASHBOARD_STAT_LABELS } from '../../../../core/constants/dashboard-ui.constants';
import { MarketTickerRow } from '../../../../core/models/market-ticker-row.model';
import { MarketDataService } from '../../../../core/services/market-data.service';
import { StatCardComponent } from '../../../../shared/ui/stat-card/stat-card.component';

@Component({
  selector: 'app-market-overview',
  imports: [DecimalPipe, MatButtonModule, MatProgressSpinnerModule, StatCardComponent],
  templateUrl: './market-overview.component.html',
  styleUrl: './market-overview.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketOverviewComponent {
  private readonly marketData = inject(MarketDataService);
  readonly watchlistSize = input(0);
  protected readonly labels = DASHBOARD_STAT_LABELS;

  readonly snapshot = resource<MarketTickerRow[], unknown>({
    loader: () => firstValueFrom(this.marketData.getTickerSnapshot()),
  });

  readonly marketsLabel = computed(() => {
    if (this.snapshot.isLoading()) {
      return '…';
    }
    if (this.snapshot.error()) {
      return '—';
    }
    return String(this.snapshot.value()?.length ?? 0);
  });

  readonly linkLabel = computed(() => {
    if (this.snapshot.isLoading()) {
      return 'Syncing';
    }
    if (this.snapshot.error()) {
      return 'Issue';
    }
    return 'Live';
  });

  readonly linkSuffix = computed(() => {
    if (this.snapshot.error()) {
      return 'retry';
    }
    return '';
  });
}
