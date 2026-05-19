import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { STORAGE_KEYS } from '../constants/storage-keys.constants';
import { WalletSession } from '../models/wallet.model';

/** Thin wrapper around localStorage for WalletSession persistence. */
@Injectable({ providedIn: 'root' })
export class WalletStorageService {
  private readonly platformId = inject(PLATFORM_ID);

  /** Reads the persisted session, or null if none / invalid. */
  read(): WalletSession | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    const raw = localStorage.getItem(STORAGE_KEYS.WALLET_SESSION);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as WalletSession;
    } catch {
      localStorage.removeItem(STORAGE_KEYS.WALLET_SESSION);
      return null;
    }
  }

  /** Persists the session to localStorage. */
  write(session: WalletSession): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(STORAGE_KEYS.WALLET_SESSION, JSON.stringify(session));
  }

  /** Clears the persisted session. */
  clear(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.removeItem(STORAGE_KEYS.WALLET_SESSION);
  }
}
