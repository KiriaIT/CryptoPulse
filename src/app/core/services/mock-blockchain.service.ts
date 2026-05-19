import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

import { WalletProvider, WalletSession } from '../models/wallet.model';

const MOCK_ADDRESS = '0x742d35Cc6634C0532925a3b8D4C9E2a1F3b2a1A';
const MOCK_ETH_BALANCE = 4.5328;
const MOCK_USD_VALUE = 15_864.8;
const SIMULATED_DELAY_MS = 800;
const FAIL_PROBABILITY = 0;

/**
 * Simulates a blockchain connection with a configurable delay.
 * Returns a mock WalletSession — no real Web3 calls are made.
 */
@Injectable({ providedIn: 'root' })
export class MockBlockchainService {
  /**
   * Simulates connecting to a wallet provider.
   * Resolves after SIMULATED_DELAY_MS with a mock session.
   */
  createSession(provider: WalletProvider): Observable<WalletSession> {
    if (Math.random() < FAIL_PROBABILITY) {
      return throwError(() => new Error('Connection rejected by wallet')).pipe(
        delay(SIMULATED_DELAY_MS),
      );
    }
    const session: WalletSession = {
      provider,
      address: MOCK_ADDRESS,
      ethBalance: MOCK_ETH_BALANCE,
      usdValue: MOCK_USD_VALUE,
      connectedAt: Date.now(),
    };
    return of(session).pipe(delay(SIMULATED_DELAY_MS));
  }
}
