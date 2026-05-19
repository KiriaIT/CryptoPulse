import { Routes } from '@angular/router';

import { ROUTE_PATHS } from './core/constants/route-paths.constants';
import { walletConnectedGuard } from './core/guards/wallet-connected.guard';
import { ShellComponent } from './layout/shell/shell.component';

export const routes: Routes = [
  {
    path: ROUTE_PATHS.ROOT,
    component: ShellComponent,
    children: [
      {
        path: ROUTE_PATHS.ROOT,
        pathMatch: 'full',
        redirectTo: ROUTE_PATHS.DASHBOARD,
      },
      {
        path: ROUTE_PATHS.DASHBOARD,
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
      },
      {
        path: ROUTE_PATHS.MARKETS,
        loadChildren: () =>
          import('./features/markets/markets.routes').then((m) => m.MARKETS_ROUTES),
      },
      {
        path: ROUTE_PATHS.PORTFOLIO,
        canActivate: [walletConnectedGuard],
        loadChildren: () =>
          import('./features/portfolio/portfolio.routes').then((m) => m.PORTFOLIO_ROUTES),
      },
      {
        path: ROUTE_PATHS.ABOUT,
        loadChildren: () =>
          import('./features/about/about.routes').then((m) => m.ABOUT_ROUTES),
      },
      {
        path: ROUTE_PATHS.SETTINGS,
        loadChildren: () =>
          import('./features/settings/settings.routes').then((m) => m.SETTINGS_ROUTES),
      },
      {
        path: ROUTE_PATHS.CONNECT,
        loadChildren: () =>
          import('./features/wallet/wallet.routes').then((m) => m.WALLET_ROUTES),
      },
      {
        path: ROUTE_PATHS.WILDCARD,
        loadComponent: () =>
          import('./features/not-found/not-found-page.component').then(
            (m) => m.NotFoundPageComponent,
          ),
      },
    ],
  },
];
