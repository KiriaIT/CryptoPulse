import { Injectable } from '@angular/core';
// TODO(Freemason-12): uncomment when your model and constants are ready
// import { Observable, of } from 'rxjs';
// import { delay } from 'rxjs/operators';
// import { MarketRow } from '../models/market-row.model';
// import { MOCK_MARKETS } from '../constants/mock-markets.constants';

/**
 * MockApiService — owned entirely by Freemason-12.
 *
 * Simulates market data API calls with a fake network delay.
 * OgOqro does NOT use this service — PortfolioService uses signal(MOCK_HOLDINGS) directly.
 *
 * YOUR TASK (Freemason-12):
 *   1. Create src/app/core/models/market-row.model.ts (see SPRINT-2-TASKS.md Step 1)
 *   2. Create src/app/core/constants/mock-markets.constants.ts (see Step 2)
 *   3. Uncomment the imports above and implement getMarkets() below
 */
@Injectable({ providedIn: 'root' })
export class MockApiService {
  /**
   * Returns mock market rows with a simulated 600ms network delay.
   * TODO(Freemason-12): implement this method.
   * Pattern: return of(MOCK_MARKETS).pipe(delay(600));
   */
  // getMarkets(): Observable<MarketRow[]> {
  //   return of(MOCK_MARKETS).pipe(delay(600));
  // }
}
