import { Routes } from '@angular/router';

import { ROUTE_PATHS } from './core/constants/route-paths.constants';
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
        path: ROUTE_PATHS.WILDCARD,
        loadComponent: () =>
          import('./features/not-found/not-found-page.component').then(
            (m) => m.NotFoundPageComponent,
          ),
      },
    ],
  },
];
