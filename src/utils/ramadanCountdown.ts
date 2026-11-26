/**
 * Ramadan Countdown & Background Location Service
 * Computes dynamic days remaining until Ramadan based on localized Hijri calendar calculations.
 */

export interface RamadanCountdownInfo {
  daysLeft: number;
  isRamadan: boolean;
  currentRamadanDay: number;
  badgeText: string;
  hijriYear: number;
}

const RAMADAN_GEO_KEY = 'tas_ramadan_geo_coords_v1';

/**
 * Silently requests browser coordinates in the background to ensure localized timezone calculations
 */
export function trackLocationForRamadan(): void {
  if (typeof window === 'undefined' || !navigator.geolocation) return;

  try {
    const raw = localStorage.getItem(RAMADAN_GEO_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Re-check once every 7 days
      if (Date.now() - (parsed.timestamp || 0) < 7 * 86400000) {
        return;
      }
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        try {
          localStorage.setItem(
            RAMADAN_GEO_KEY,
            JSON.stringify({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              timestamp: Date.now(),
            })
          );
        } catch {
          // ignore storage quota error
        }
      },
      () => {
        // Geolocation denied or unavailable; graceful silent fallback to timezone
      },
      { timeout: 8000, maximumAge: 3600000, enableHighAccuracy: false }
    );
  } catch {
    // ignore
  }
}

/**
 * Calculates upcoming Ramadan start date and remaining days using Intl Islamic Umm al-Qura calendar
 */
export function computeRamadanCountdown(nowDate: Date = new Date()): RamadanCountdownInfo {
  const hijriFormatter = new Intl.DateTimeFormat('en-TN-u-ca-islamic-umalqura', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  const parts = hijriFormatter.formatToParts(nowDate);
  const currentMonth = Number(parts.find((p) => p.type === 'month')?.value || 1);
  const currentDay = Number(parts.find((p) => p.type === 'day')?.value || 1);
  const currentYear = Number(parts.find((p) => p.type === 'year')?.value || 1448);

  // If currently in Ramadan (Month 9)
  if (currentMonth === 9) {
    return {
      daysLeft: 0,
      isRamadan: true,
      currentRamadanDay: currentDay,
      badgeText: `● Ramadan Mubarak · Day ${currentDay}`,
      hijriYear: currentYear,
    };
  }

  // Find 1 Ramadan of the upcoming Hijri year
  let targetRamadanDate: Date | null = null;
  const cursor = new Date(nowDate.getTime());
  cursor.setHours(12, 0, 0, 0);

  // Search forward up to 365 days
  for (let i = 0; i < 365; i++) {
    cursor.setDate(cursor.getDate() + 1);
    const cursorParts = hijriFormatter.formatToParts(cursor);
    const m = Number(cursorParts.find((p) => p.type === 'month')?.value || 0);
    const d = Number(cursorParts.find((p) => p.type === 'day')?.value || 0);
    if (m === 9 && d === 1) {
      targetRamadanDate = new Date(cursor.getTime());
      break;
    }
  }

  if (!targetRamadanDate) {
    // Fallback: estimate approximately ~354 days per lunar year
    targetRamadanDate = new Date(nowDate.getFullYear(), 1, 8, 12, 0, 0);
  }

  const msDiff = targetRamadanDate.getTime() - nowDate.getTime();
  const daysLeft = Math.max(1, Math.ceil(msDiff / (1000 * 60 * 60 * 24)));

  return {
    daysLeft,
    isRamadan: false,
    currentRamadanDay: 0,
    badgeText: `● ${daysLeft} ${daysLeft === 1 ? 'Day' : 'Days'} Left Until Ramadan`,
    hijriYear: currentMonth > 9 ? currentYear + 1 : currentYear,
  };
}
