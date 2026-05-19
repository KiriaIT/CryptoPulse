import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
// TODO(Freemason-12) STEP 4: add inject to the import above when you're ready to inject MockApiService

// TODO(Freemason-12) STEP 3 — import MockApiService once you create it:
// import { MockApiService } from '../../../core/services/mock-api.service';

/**
 * TODO(Freemason-12) — YOUR TASKS FOR THIS FILE (read top to bottom):
 *
 * STEP 1 — Create the MarketRow model:
 *   File: src/app/core/models/market-row.model.ts
 *   Fields needed (look at pictures/03-market-explorer.png for reference):
 *     symbol: string        e.g. 'BTC'
 *     name: string          e.g. 'Bitcoin'
 *     price: number
 *     change24h: number     percentage, can be negative
 *     change7d: number      percentage, can be negative
 *     marketCap: string     e.g. '$1.32T'
 *
 * STEP 2 — Create MOCK_MARKETS constant:
 *   File: src/app/core/constants/mock-markets.constants.ts
 *   Copy the 7 coins shown in pictures/03-market-explorer.png:
 *   BTC, ETH, SOL, ADA, AVAX, LINK, UNI
 *   Export it as: export const MOCK_MARKETS: MarketRow[] = [ ... ]
 *
 * STEP 3 — Create MockApiService:
 *   File: src/app/core/services/mock-api.service.ts
 *   (Stub is already created there — just fill in the TODO blocks)
 *
 * STEP 4 — Inject MockApiService here and load the markets:
 *   Replace the TODO below with:
 *   private readonly mockApi = inject(MockApiService);
 *   Then wire it into the resource() call.
 *
 * STEP 5 — Fill in the _filter signal (already stubbed below).
 *   It should store the current search input text.
 *
 * STEP 6 — Fill in the filteredMarkets computed (already stubbed below).
 *   Filter the markets list by checking if symbol or name contains _filter() (case-insensitive).
 *
 * STEP 7 — Fill in the template (markets-page.component.html).
 *   It already has the correct structure — just make it compile by providing the right data.
 *
 * STEP 8 — Register the route in app.routes.ts (KiriaIT will do this for you — just PR your feature).
 *
 * CONVENTIONS to follow (or you will fail lint):
 *   - standalone: true           ← already set
 *   - OnPush                     ← already set
 *   - inject() not constructor   ← use inject() for services
 *   - protected for template members, private for everything else
 *   - No console.log — use LoggerService if you need logging
 */

// TODO(Freemason-12): replace this placeholder type with the real MarketRow import from core/models/
interface MarketRow {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  change7d: number;
  marketCap: string;
}

// TODO(Freemason-12): replace this empty array with real data from MockApiService
const PLACEHOLDER_MARKETS: MarketRow[] = [];

@Component({
  selector: 'app-markets-page',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './markets-page.component.html',
  styleUrl: './markets-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketsPageComponent {
  // TODO(Freemason-12) STEP 4: inject MockApiService
  // private readonly mockApi = inject(MockApiService);

  // TODO(Freemason-12) STEP 4: replace PLACEHOLDER_MARKETS with a toSignal() or resource() call
  protected readonly markets = signal<MarketRow[]>(PLACEHOLDER_MARKETS);

  /** Filter text — bound to the search input in the template */
  // TODO(Freemason-12) STEP 5: this signal is already wired — just make sure your template
  // calls onFilterChange($event.target.value) on the search input
  protected readonly _filter = signal<string>('');

  /**
   * Derived list — filters markets by symbol or name containing _filter().
   * TODO(Freemason-12) STEP 6: fill in the filter logic inside computed().
   * Hint: use .toLowerCase() + .includes() on symbol and name fields.
   */
  protected readonly filteredMarkets = computed<MarketRow[]>(() => {
    const query = this._filter().toLowerCase().trim();
    if (!query) return this.markets();
    // TODO: return this.markets().filter(m => m.symbol.toLowerCase().includes(query) || ...)
    return this.markets();
  });

  protected onFilterChange(value: string): void {
    this._filter.set(value);
  }
}
