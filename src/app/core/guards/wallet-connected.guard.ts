import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { WalletService } from '../services/wallet.service';
import { ROUTE_PATHS } from '../constants/route-paths.constants';

/**
 * Protects routes that require a connected wallet.
 * Redirects to /connect?return=<originalUrl> when not connected.
 */
export const walletConnectedGuard: CanActivateFn = (_route, state) => {
  const wallet = inject(WalletService);
  const router = inject(Router);
  return wallet.isConnected()
    ? true
    : router.parseUrl(
        `/${ROUTE_PATHS.CONNECT}?return=${encodeURIComponent(state.url)}`,
      );
};
