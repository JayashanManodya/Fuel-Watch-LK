/** True when a community row reports aggregate or any fuel type as available/limited. */
export function isPositiveFuelReport(raw: Record<string, unknown>): boolean {
  const status = raw.status;
  if (status === 'available' || status === 'limited') return true;
  const keys = ['petrol92', 'petrol95', 'autoDiesel', 'superDiesel', 'kerosene'] as const;
  return keys.some((k) => raw[k] === 'available' || raw[k] === 'limited');
}
