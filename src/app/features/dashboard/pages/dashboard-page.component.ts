import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';

import { STORAGE_KEYS } from '../../../core/constants/storage-keys.constants';
import { APP_CONFIG } from '../../../core/tokens/app-config.token';
import { MarketOverviewComponent } from '../components/market-overview/market-overview.component';
import { WatchlistFormComponent } from '../components/watchlist-form/watchlist-form.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [MarketOverviewComponent, WatchlistFormComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  protected readonly appName = inject(APP_CONFIG).appName;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageReady = signal(false);
  readonly watchlist = signal<string[]>([]);

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        this.storageReady.set(true);
        return;
      }
      const raw = sessionStorage.getItem(STORAGE_KEYS.WATCHLIST_PREVIEW);
      if (raw) {
        try {
          const parsed: unknown = JSON.parse(raw);
          if (this.isStringArray(parsed)) {
            this.watchlist.set(parsed);
          }
        } catch {
          sessionStorage.removeItem(STORAGE_KEYS.WATCHLIST_PREVIEW);
        }
      }
      this.storageReady.set(true);
    });

    effect(() => {
      if (!this.storageReady() || !isPlatformBrowser(this.platformId)) {
        return;
      }
      sessionStorage.setItem(STORAGE_KEYS.WATCHLIST_PREVIEW, JSON.stringify(this.watchlist()));
    });
  }

  protected onSymbolAdded(symbol: string): void {
    this.watchlist.update((list) => (list.includes(symbol) ? list : [...list, symbol]));
  }

  private isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item) => typeof item === 'string');
  }
}
