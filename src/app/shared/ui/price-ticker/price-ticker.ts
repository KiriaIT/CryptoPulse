import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

// Direction of the 24h price change - drives colour theming.
type ChangeDirection = 'positive' | 'negative' | 'neutral';

/**
 * Displays a last price and its 24h percentage change as a two-line ticker.
 * Colour-codes that change badge greent (positive), red (negative), or mmuted
 * (flat / unavailable). Designed for use in market list rows and future
 * the 'currency' input defaults to 'USDT' but is overridable for any quote asset.
 */

@Component({
  selector: 'app-price-ticker',
  imports: [DecimalPipe],
  templateUrl: './price-ticker.html',
  styleUrl: './price-ticker.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceTicker {
  // Last traded price. Pass 'null' to render an em-dash placeholder.
  readonly price = input<number | null>(null);

  // 24h price change as a percentage (e.g '2.34' means +2.34 %)
  readonly changePct = input<number | null>(null);

  readonly currency = input('USDT');

  /**
   * Direction derived from 'changePct'.
   * Drive the BEM modifier class on the change badge.
   */
  protected readonly direction = computed<ChangeDirection>(() => {
    const change = this.changePct();
    if (change === null || change === 0) return 'neutral';
    return change > 0 ? 'positive' : 'negative';
  });

  /**
   * Explicit '+' prefix for positive changes so the sign is always visible.
   * Returns as empty string for negative values (the minus is part of the number).
   */
  protected readonly changeSign = computed(() => {
    const change = this.changePct();
    return change !== null && change > 0 ? '+' : '';
  });
}
