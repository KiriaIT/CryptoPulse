import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/**
 * Displays a single watchlist symbol as a removable chip.
 * Emits `removed` with the symbol string when the user clicks x.
 * Designed for use inside the dashboard watchlist list.
 */

@Component({
  selector: 'app-watchlist-chip',
  imports: [],
  templateUrl: './watchlist-chip.html',
  styleUrl: './watchlist-chip.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WatchlistChip {
  // The trading-pair symbol to display (e.g. "BTCUSDT").
  readonly symbol = input.required<string>();

  // Emits the symbol string when the remove button is activated.
  readonly removed = output<string>();

  protected onRemove(): void {
    this.removed.emit(this.symbol());
  }
}
