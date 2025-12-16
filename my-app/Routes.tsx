export const ROUTES = {
  HOME: '/',
  MATERIALS: '/materials',
  MaterialDetails: '/materials/:id',
} as const;
export type RouteKeyType = keyof typeof ROUTES;

