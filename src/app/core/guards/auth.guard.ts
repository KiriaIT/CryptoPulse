import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { ROUTE_PATHS } from '../constants/route-paths.constants';

/**
 * Protects routes that require an authenticated user.
 * Redirects to /login?return=<originalUrl> when no session.
 */
export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isAuthed()
    ? true
    : router.parseUrl(
        `/${ROUTE_PATHS.LOGIN}?return=${encodeURIComponent(state.url)}`,
      );
};
