/*
 * Bloom — Cycle Tracker
 * Helper functions for date math and cycle calculations.
 */

// Uses local calendar date parts (not UTC) so date keys always match what the
// user sees on their device, regardless of timezone. toISOString() was
// intentionally avoided because it returns UTC dates, which shift by a day for
// users in UTC+ timezones near midnight.
export const toKey = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const todayKey = (): string => toKey(new Date());

export const daysBetween = (a: string, b: string): number =>
  Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);

export const formatDate = (str: string): string => {
  const d = new Date(str + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
};

export const monthLabel = (d: Date): string =>
  d.toLocaleDateString("en-US", { month: "long", year: "numeric" });

export const getCycleDay = (
  dateStr: string,
  lastPeriod: string | undefined,
  cycleLength: number
): number | null => {
  if (!lastPeriod) return null;
  const diff = daysBetween(lastPeriod, dateStr);
  if (diff < 0) return null;
  return (diff % cycleLength) + 1;
};

export const getPhaseIndex = (
  dateStr: string,
  lastPeriod: string | undefined,
  cycleLength: number,
  periodLength: number
): number | null => {
  const cd = getCycleDay(dateStr, lastPeriod, cycleLength);
  if (!cd) return null;
  if (cd <= periodLength) return 0; // Menstrual
  if (cd <= Math.floor(cycleLength * 0.45)) return 1; // Follicular
  if (cd <= Math.floor(cycleLength * 0.55)) return 2; // Ovulation
  return 3; // Luteal
};

export const getDaysUntilPeriod = (
  lastPeriod: string | undefined,
  cycleLength: number
): number | null => {
  if (!lastPeriod) return null;
  const diff = daysBetween(lastPeriod, todayKey());
  if (diff < 0) return null;
  const inCycle = diff % cycleLength;
  return cycleLength - inCycle;
};
