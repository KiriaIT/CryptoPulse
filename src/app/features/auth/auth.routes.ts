import { Routes } from '@angular/router';

export const LOGIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/login-page.component').then((m) => m.LoginPageComponent),
  },
];

export const REGISTER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/register-page.component').then((m) => m.RegisterPageComponent),
  },
];
