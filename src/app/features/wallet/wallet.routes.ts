import { Routes } from '@angular/router';

export const WALLET_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/connect-page.component').then((m) => m.ConnectPageComponent),
  },
];
