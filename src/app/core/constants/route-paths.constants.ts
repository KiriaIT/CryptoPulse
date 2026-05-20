export const ROUTE_PATHS = {
  ROOT: '',
  DASHBOARD: 'dashboard',
  MARKETS: 'markets',
  PORTFOLIO: 'portfolio',
  CONNECT: 'connect',
  ABOUT: 'about',
  SETTINGS: 'settings',
  LOGIN: 'login',
  REGISTER: 'register',
  WILDCARD: '**',
} as const;

export type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];
