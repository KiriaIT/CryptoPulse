import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

import { MockBlockchainService } from './mock-blockchain.service';
import { WalletStorageService } from './wallet-storage.service';
import { WalletProvider, WalletSession, WalletStatus } from '../models/wallet.model';

/**
 * WalletService — Sprint 2 centerpiece [P-04].
 *
 * Demonstrates: signal() · computed() · effect() · RxJS boundary · DI · localStorage persistence.
 *
 * Public surface:
 *  - status       — 'idle' | 'connecting' | 'connected' | 'error'
 *  - session      — current WalletSession or null
 *  - isConnected  — derived boolean
 *  - shortAddress — '0x742d…a1A' format
 *  - connect()    — initiates mock connection, returns Observable<WalletSession>
 *  - disconnect() — clears session and storage
 */
@Injectable({ providedIn: 'root' })
export class WalletService {
  private readonly blockchain = inject(MockBlockchainService);
  private readonly storage = inject(WalletStorageService);

  private readonly _status = signal<WalletStatus>('idle');
  private readonly _session = signal<WalletSession | null>(null);

  /** Read-only wallet status. */
  readonly status = this._status.asReadonly();

  /** Read-only current session (null if not connected). */
  readonly session = this._session.asReadonly();

  /** True when wallet is connected. */
  readonly isConnected = computed(() => this._status() === 'connected');

  /** Abbreviated address for display: '0x742d…a1A'. */
  readonly shortAddress = computed(() => {
    const addr = this._session()?.address;
    if (!addr) return null;
    return `${addr.slice(0, 6)}…${addr.slice(-3)}`;
  });

  constructor() {
    const saved = this.storage.read();
    if (saved) {
      this._session.set(saved);
      this._status.set('connected');
    }

    effect(() => {
      const session = this._session();
      if (session) {
        this.storage.write(session);
      } else {
        this.storage.clear();
      }
    });
  }

  /**
   * Initiates a mock wallet connection via the given provider.
   * Sets status to 'connecting' immediately, then 'connected' on success or 'error' on failure.
   */
  connect(provider: WalletProvider): Observable<WalletSession> {
    this._status.set('connecting');
    return this.blockchain.createSession(provider).pipe(
      tap((session) => {
        this._session.set(session);
        this._status.set('connected');
      }),
      catchError((err: unknown) => {
        this._status.set('error');
        return throwError(() => err);
      }),
    );
  }

  /** Disconnects the wallet and clears all session state. */
  disconnect(): void {
    this._session.set(null);
    this._status.set('idle');
  }
}
