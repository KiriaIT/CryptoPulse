export const ROUTE_PATHS = {
  ROOT: '',
  DASHBOARD: 'dashboard',
  WILDCARD: '**',
} as const;

export type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];
