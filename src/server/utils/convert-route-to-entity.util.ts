const mapping: Record<string, string> = {
  bookings: 'booking',
  dormitories: 'dormitory',
  offers: 'offer',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
