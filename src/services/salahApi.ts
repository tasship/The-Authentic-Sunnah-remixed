import { idbGet, idbSet } from './offlineDb';
import {
  DailySalahTimings,
  ObligatoryPrayerId,
  SalahPrayerId,
  SalahSettings,
} from '../types';
import { getTodayKey } from '../utils/arabic';

export const SALAH_PRAYER_META: {
  id: SalahPrayerId;
  label: string;
  arabicLabel: string;
  isObligatory: boolean;
}[] = [
  { id: 'fajr', label: 'Fajr', arabicLabel: 'الفجر', isObligatory: true },
  { id: 'sunrise', label: 'Sunrise', arabicLabel: 'الشروق', isObligatory: false },
  { id: 'dhuhr', label: 'Dhuhr', arabicLabel: 'الظهر', isObligatory: true },
  { id: 'asr', label: 'Asr', arabicLabel: 'العصر', isObligatory: true },
  { id: 'maghrib', label: 'Maghrib', arabicLabel: 'المغرب', isObligatory: true },
  { id: 'isha', label: 'Isha', arabicLabel: 'العشاء', isObligatory: true },
];

export const OBLIGATORY_PRAYER_IDS: ObligatoryPrayerId[] = [
  'fajr',
  'dhuhr',
  'asr',
  'maghrib',
  'isha',
];

export const SALAH_CALCULATION_METHODS: {
  id: number;
  name: string;
  shortName: string;
  regionHint: string;
}[] = [
  {
    id: 2,
    name: 'ISNA — Islamic Society of North America',
    shortName: 'ISNA',
    regionHint: 'North America (15° / 15°)',
  },
  {
    id: 3,
    name: 'MWL — Muslim World League',
    shortName: 'MWL',
    regionHint: 'Europe, Far East & Global (18° / 17°)',
  },
  {
    id: 1,
    name: 'Karachi — University of Islamic Sciences',
    shortName: 'Karachi',
    regionHint: 'Pakistan, India, South Asia (18° / 18°)',
  },
  {
    id: 4,
    name: 'Umm Al-Qura University, Makkah',
    shortName: 'Makkah',
    regionHint: 'Saudi Arabia & Arabian Peninsula',
  },
  {
    id: 5,
    name: 'Egyptian General Authority of Survey',
    shortName: 'Egypt',
    regionHint: 'Egypt, Africa, Levant (19.5° / 17.5°)',
  },
  {
    id: 13,
    name: 'Diyanet İşleri Başkanlığı, Turkey',
    shortName: 'Diyanet',
    regionHint: 'Turkey & Balkans',
  },
  {
    id: 11,
    name: 'MUIS — Majlis Ugama Islam Singapura',
    shortName: 'MUIS',
    regionHint: 'Singapore & Southeast Asia',
  },
  {
    id: 15,
    name: 'Moonsighting Committee Worldwide',
    shortName: 'Moonsighting',
    regionHint: 'Global Shafaq General',
  },
];

export const CURATED_SALAH_CITIES: { city: string; country: string; label: string }[] = [
  { city: 'Makkah', country: 'Saudi Arabia', label: 'Makkah, Saudi Arabia' },
  { city: 'Madinah', country: 'Saudi Arabia', label: 'Madinah, Saudi Arabia' },
  { city: 'London', country: 'United Kingdom', label: 'London, United Kingdom' },
  { city: 'New York', country: 'United States', label: 'New York, United States' },
  { city: 'Los Angeles', country: 'United States', label: 'Los Angeles, United States' },
  { city: 'Chicago', country: 'United States', label: 'Chicago, United States' },
  { city: 'Toronto', country: 'Canada', label: 'Toronto, Canada' },
  { city: 'Karachi', country: 'Pakistan', label: 'Karachi, Pakistan' },
  { city: 'Lahore', country: 'Pakistan', label: 'Lahore, Pakistan' },
  { city: 'Islamabad', country: 'Pakistan', label: 'Islamabad, Pakistan' },
  { city: 'Delhi', country: 'India', label: 'Delhi, India' },
  { city: 'Hyderabad', country: 'India', label: 'Hyderabad, India' },
  { city: 'Dhaka', country: 'Bangladesh', label: 'Dhaka, Bangladesh' },
  { city: 'Kuala Lumpur', country: 'Malaysia', label: 'Kuala Lumpur, Malaysia' },
  { city: 'Jakarta', country: 'Indonesia', label: 'Jakarta, Indonesia' },
  { city: 'Istanbul', country: 'Turkey', label: 'Istanbul, Turkey' },
  { city: 'Cairo', country: 'Egypt', label: 'Cairo, Egypt' },
  { city: 'Dubai', country: 'United Arab Emirates', label: 'Dubai, UAE' },
  { city: 'Riyadh', country: 'Saudi Arabia', label: 'Riyadh, Saudi Arabia' },
  { city: 'Sydney', country: 'Australia', label: 'Sydney, Australia' },
];

const TIMEZONE_CITY_MAP: Record<string, { city: string; country: string }> = {
  'America/Los_Angeles': { city: 'Los Angeles', country: 'United States' },
  'America/New_York': { city: 'New York', country: 'United States' },
  'America/Chicago': { city: 'Chicago', country: 'United States' },
  'America/Denver': { city: 'Denver', country: 'United States' },
  'America/Toronto': { city: 'Toronto', country: 'Canada' },
  'America/Vancouver': { city: 'Vancouver', country: 'Canada' },
  'Europe/London': { city: 'London', country: 'United Kingdom' },
  'Europe/Paris': { city: 'Paris', country: 'France' },
  'Europe/Berlin': { city: 'Berlin', country: 'Germany' },
  'Europe/Istanbul': { city: 'Istanbul', country: 'Turkey' },
  'Asia/Riyadh': { city: 'Riyadh', country: 'Saudi Arabia' },
  'Asia/Dubai': { city: 'Dubai', country: 'United Arab Emirates' },
  'Asia/Karachi': { city: 'Karachi', country: 'Pakistan' },
  'Asia/Kolkata': { city: 'Delhi', country: 'India' },
  'Asia/Dhaka': { city: 'Dhaka', country: 'Bangladesh' },
  'Asia/Kuala_Lumpur': { city: 'Kuala Lumpur', country: 'Malaysia' },
  'Asia/Jakarta': { city: 'Jakarta', country: 'Indonesia' },
  'Asia/Singapore': { city: 'Singapore', country: 'Singapore' },
  'Africa/Cairo': { city: 'Cairo', country: 'Egypt' },
  'Australia/Sydney': { city: 'Sydney', country: 'Australia' },
};

const TIMINGS_CACHE_PREFIX = 'tas_salah_timings_';

function toAladhanDateParam(date: Date = new Date()): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

export function cleanHHMM(raw: string | undefined): string {
  if (!raw) return '00:00';
  const match = raw.match(/(\d{1,2}):(\d{2})/);
  if (!match) return '00:00';
  const hh = String(Math.min(23, Math.max(0, Number(match[1])))).padStart(2, '0');
  const mm = String(Math.min(59, Math.max(0, Number(match[2])))).padStart(2, '0');
  return `${hh}:${mm}`;
}

export function hhmmToMinutes(hhmm: string): number {
  const [h, m] = cleanHHMM(hhmm).split(':').map(Number);
  return h * 60 + m;
}

export function addMinutesToHHMM(hhmm: string, offsetMinutes: number): string {
  const base = hhmmToMinutes(hhmm);
  const shifted = ((base + offsetMinutes) % 1440 + 1440) % 1440;
  const hh = String(Math.floor(shifted / 60)).padStart(2, '0');
  const mm = String(shifted % 60).padStart(2, '0');
  return `${hh}:${mm}`;
}

export function formatPrayerTime12h(hhmm: string): string {
  const [hRaw, mRaw] = cleanHHMM(hhmm).split(':').map(Number);
  const period = hRaw >= 12 ? 'PM' : 'AM';
  const h12 = hRaw % 12 === 0 ? 12 : hRaw % 12;
  return `${h12}:${String(mRaw).padStart(2, '0')} ${period}`;
}

export function applyOffsetsToTimings(
  baseTimings: Record<SalahPrayerId, string>,
  offsets: Record<SalahPrayerId, number>
): Record<SalahPrayerId, string> {
  return {
    fajr: addMinutesToHHMM(baseTimings.fajr, offsets.fajr || 0),
    sunrise: addMinutesToHHMM(baseTimings.sunrise, offsets.sunrise || 0),
    dhuhr: addMinutesToHHMM(baseTimings.dhuhr, offsets.dhuhr || 0),
    asr: addMinutesToHHMM(baseTimings.asr, offsets.asr || 0),
    maghrib: addMinutesToHHMM(baseTimings.maghrib, offsets.maghrib || 0),
    isha: addMinutesToHHMM(baseTimings.isha, offsets.isha || 0),
  };
}

export function inferFallbackCityFromTimezone(): { city: string; country: string; timezone: string } {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    if (TIMEZONE_CITY_MAP[tz]) {
      return { ...TIMEZONE_CITY_MAP[tz], timezone: tz };
    }
    const parts = tz.split('/');
    const cityGuess = parts[parts.length - 1]?.replace(/_/g, ' ') || 'Makkah';
    if (tz.startsWith('America/')) return { city: cityGuess, country: 'United States', timezone: tz };
    if (tz.startsWith('Europe/')) return { city: cityGuess, country: 'United Kingdom', timezone: tz };
    if (tz.startsWith('Asia/')) return { city: cityGuess, country: 'Saudi Arabia', timezone: tz };
    return { city: 'Makkah', country: 'Saudi Arabia', timezone: tz };
  } catch {
    return { city: 'Makkah', country: 'Saudi Arabia', timezone: 'Asia/Riyadh' };
  }
}

export async function detectLocationViaBrowser(): Promise<{
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}> {
  if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
    throw new Error('Geolocation is not supported in this browser.');
  }

  const position = await new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 1000 * 60 * 30,
    });
  });

  const latitude = Number(position.coords.latitude.toFixed(4));
  const longitude = Number(position.coords.longitude.toFixed(4));

  // Lightweight reverse geocoding lookup for display label (non-blocking)
  let city: string | undefined;
  let country: string | undefined;
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=10`,
      { headers: { Accept: 'application/json' } }
    );
    if (res.ok) {
      const geo = await res.json();
      const addr = geo?.address || {};
      city = addr.city || addr.town || addr.village || addr.county || addr.state;
      country = addr.country;
    }
  } catch {
    // Graceful fallback to timezone / coordinates label
  }

  return { latitude, longitude, city, country };
}

export async function isGeolocationAlreadyGranted(): Promise<boolean> {
  try {
    if (typeof navigator === 'undefined' || !('permissions' in navigator)) return false;
    const status = await navigator.permissions.query({ name: 'geolocation' });
    return status.state === 'granted';
  } catch {
    return false;
  }
}

function buildCacheKey(dateKey: string, settings: SalahSettings): string {
  const loc =
    settings.locationMode === 'auto' &&
    typeof settings.latitude === 'number' &&
    typeof settings.longitude === 'number'
      ? `gps_${settings.latitude.toFixed(2)}_${settings.longitude.toFixed(2)}`
      : `city_${(settings.city || 'auto').toLowerCase()}_${(settings.country || '').toLowerCase()}`;
  return `${TIMINGS_CACHE_PREFIX}${dateKey}_${loc}_m${settings.calculationMethod}_s${settings.asrSchool}`;
}

export async function fetchDailySalahTimings(
  settings: SalahSettings,
  date: Date = new Date()
): Promise<DailySalahTimings> {
  const dateKey = getTodayKey(date);
  const dateParam = toAladhanDateParam(date);
  const cacheKey = buildCacheKey(dateKey, settings);

  const cached = await idbGet<DailySalahTimings>('kv', cacheKey);
  if (cached && cached.baseTimings) {
    return {
      ...cached,
      timings: applyOffsetsToTimings(cached.baseTimings, settings.offsets),
    };
  }

  const hasCoords =
    settings.locationMode === 'auto' &&
    typeof settings.latitude === 'number' &&
    typeof settings.longitude === 'number';

  let url = '';
  let locationLabel = '';
  let source: DailySalahTimings['source'] = 'city';

  if (hasCoords) {
    url = `https://api.aladhan.com/v1/timings/${dateParam}?latitude=${settings.latitude}&longitude=${settings.longitude}&method=${settings.calculationMethod}&school=${settings.asrSchool}`;
    locationLabel = settings.city
      ? `${settings.city}${settings.country ? `, ${settings.country}` : ''}`
      : `${settings.latitude?.toFixed(2)}°, ${settings.longitude?.toFixed(2)}°`;
    source = 'gps';
  } else if (settings.city.trim()) {
    const cityEnc = encodeURIComponent(settings.city.trim());
    const countryEnc = encodeURIComponent(settings.country.trim() || '');
    url = `https://api.aladhan.com/v1/timingsByCity/${dateParam}?city=${cityEnc}&country=${countryEnc}&method=${settings.calculationMethod}&school=${settings.asrSchool}`;
    locationLabel = settings.country.trim()
      ? `${settings.city.trim()}, ${settings.country.trim()}`
      : settings.city.trim();
    source = 'city';
  } else {
    const fallback = inferFallbackCityFromTimezone();
    url = `https://api.aladhan.com/v1/timingsByCity/${dateParam}?city=${encodeURIComponent(fallback.city)}&country=${encodeURIComponent(fallback.country)}&method=${settings.calculationMethod}&school=${settings.asrSchool}`;
    locationLabel = `${fallback.city} (Auto TZ)`;
    source = 'timezone_fallback';
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Aladhan API returned ${res.status}`);
    }
    const json = await res.json();
    const rawTimings = json?.data?.timings;
    const timezone = json?.data?.meta?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    if (!rawTimings) {
      throw new Error('Missing timings payload from Aladhan API');
    }

    if (source === 'gps' && !settings.city && timezone) {
      const tzCity = timezone.split('/').pop()?.replace(/_/g, ' ');
      if (tzCity) locationLabel = `${tzCity} (GPS)`;
    }

    const baseTimings: Record<SalahPrayerId, string> = {
      fajr: cleanHHMM(rawTimings.Fajr),
      sunrise: cleanHHMM(rawTimings.Sunrise),
      dhuhr: cleanHHMM(rawTimings.Dhuhr),
      asr: cleanHHMM(rawTimings.Asr),
      maghrib: cleanHHMM(rawTimings.Maghrib),
      isha: cleanHHMM(rawTimings.Isha),
    };

    const result: DailySalahTimings = {
      dateKey,
      baseTimings,
      timings: applyOffsetsToTimings(baseTimings, settings.offsets),
      locationLabel,
      timezone,
      methodId: settings.calculationMethod,
      asrSchool: settings.asrSchool,
      source,
      fetchedAt: Date.now(),
    };

    await idbSet('kv', cacheKey, result);
    await idbSet('kv', `${TIMINGS_CACHE_PREFIX}latest`, result);
    return result;
  } catch (err) {
    // Offline or network resilience: return latest cached timings re-adjusted with current offsets
    const latestCached = await idbGet<DailySalahTimings>('kv', `${TIMINGS_CACHE_PREFIX}latest`);
    if (latestCached && latestCached.baseTimings) {
      return {
        ...latestCached,
        timings: applyOffsetsToTimings(latestCached.baseTimings, settings.offsets),
        source: 'cached',
      };
    }
    throw err;
  }
}

export function getNextPrayerInfo(
  timings: Record<SalahPrayerId, string> | null,
  now: Date = new Date()
): {
  nextPrayerId: SalahPrayerId;
  nextPrayerLabel: string;
  nextPrayerTime12h: string;
  minutesRemaining: number;
  countdownLabel: string;
  currentActiveWindowId: SalahPrayerId;
} | null {
  if (!timings) return null;

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const ordered = SALAH_PRAYER_META.map((p) => ({
    ...p,
    minutes: hhmmToMinutes(timings[p.id]),
  }));

  let next = ordered.find((p) => p.minutes > nowMinutes);
  let minutesRemaining = 0;

  if (next) {
    minutesRemaining = next.minutes - nowMinutes;
  } else {
    next = ordered[0]; // Tomorrow's Fajr
    minutesRemaining = 1440 - nowMinutes + next.minutes;
  }

  let currentActiveWindowId: SalahPrayerId = 'isha';
  for (let i = ordered.length - 1; i >= 0; i--) {
    if (nowMinutes >= ordered[i].minutes) {
      currentActiveWindowId = ordered[i].id;
      break;
    }
  }

  const hrs = Math.floor(minutesRemaining / 60);
  const mins = minutesRemaining % 60;
  const countdownLabel = hrs > 0 ? `in ${hrs}h ${mins}m` : `in ${mins}m`;

  return {
    nextPrayerId: next.id,
    nextPrayerLabel: next.label,
    nextPrayerTime12h: formatPrayerTime12h(timings[next.id]),
    minutesRemaining,
    countdownLabel,
    currentActiveWindowId,
  };
}
