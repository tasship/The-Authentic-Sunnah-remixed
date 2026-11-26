import { logEvent, setUserId, setUserProperties } from 'firebase/analytics';
import {
  doc,
  getDoc,
  getDocFromServer,
  increment,
  onSnapshot,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db, getAnalyticsClient, handleFirestoreError, OperationType } from '../firebase';
import { QuranReciterId, ThemeMode } from '../types';

const ANON_INSTALL_KEY = 'tas_anon_uid_v1';
const ALLOWED_THEMES = new Set<string>([
  'system_default',
  'royal_ivory',
  'sage_serenity',
  'pearl_majesty',
  'celestial_blue',
  'desert_sand',
  'lavender_grace',
  'rose_quartz',
  'andalusian_pearl',
  'mint_oasis',
  'scholars_manuscript',
  'obsidian_black',
  'imperial_burgundy',
  'emerald_dynasty',
  'graphite_titanium',
  'cosmic_amethyst',
  'obsidian_leather',
  'abyssal_teal',
  'black_copper',
  'storm_sovereign',
  'arabian_dusk',
  'warm_alabaster',
  'cosmic_nebula',
  'midnight_charcoal',
  'emerald_shadow',
  'full_shining_gold',
  'full_shining_silver',
]);

export type TelemetryCategory = 'navigation' | 'reciter' | 'explore' | 'audio' | 'hifz' | 'ai';

export interface GlobalUmmahStats {
  activeNowCount: number;
  versesRecitedToday: number;
  totalVersesAllTime: number;
  dayKey: string;
  isLiveSynced: boolean;
}

function isOfflineNetworkError(error: unknown): boolean {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return true;
  const msg = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  return (
    msg.includes('offline') ||
    msg.includes('unavailable') ||
    msg.includes('network') ||
    msg.includes('failed to get document because the client is offline')
  );
}

async function emitAnalyticsEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): Promise<void> {
  try {
    const analytics = await getAnalyticsClient();
    if (!analytics) return;
    logEvent(analytics, eventName, params);
  } catch {
    // Non-blocking analytics fallback when blocked by privacy extensions or offline
  }
}

async function syncAnonymousAnalyticsProfile(
  installId: string,
  preferredTheme: ThemeMode,
  preferredReciter: string,
  platform: 'pwa' | 'web'
): Promise<void> {
  try {
    const analytics = await getAnalyticsClient();
    if (!analytics) return;
    setUserId(analytics, installId);
    setUserProperties(analytics, {
      preferred_theme: preferredTheme,
      preferred_reciter: preferredReciter,
      app_platform: platform,
    });
    logEvent(analytics, 'session_heartbeat', {
      platform,
      preferred_theme: preferredTheme,
      preferred_reciter: preferredReciter,
    });
  } catch {
    // Ignore ad-blocker or storage restrictions on optional analytics
  }
}

function getUtcDayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function sanitizeId(raw: string, maxLen = 64): string {
  const cleaned = raw.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, maxLen);
  return cleaned.length >= 2 ? cleaned : `id_${cleaned}`;
}

export function getOrCreateAnonymousInstallId(): string {
  try {
    const existing = localStorage.getItem(ANON_INSTALL_KEY);
    if (existing && /^[a-zA-Z0-9_-]{8,64}$/.test(existing)) {
      return existing;
    }
    const generated =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? `tas_${crypto.randomUUID().replace(/-/g, '').slice(0, 28)}`
        : `tas_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}`;
    localStorage.setItem(ANON_INSTALL_KEY, generated);
    return generated;
  } catch {
    return `tas_ephem_${Date.now().toString(36)}`;
  }
}

function inferRegionAndTimezone(): { region: string; timezone: string } {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    const locale = typeof navigator !== 'undefined' ? navigator.language || 'en-US' : 'en-US';
    const regionPart = locale.includes('-') ? locale.split('-')[1] : tz.split('/')[0] || 'Global';
    return {
      region: (regionPart || 'Global').slice(0, 64),
      timezone: tz.slice(0, 64),
    };
  } catch {
    return { region: 'Global', timezone: 'UTC' };
  }
}

function inferPlatform(): 'pwa' | 'web' {
  if (typeof window === 'undefined') return 'web';
  const standalone =
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (window.navigator as { standalone?: boolean }).standalone === true;
  return standalone ? 'pwa' : 'web';
}

export async function registerAnonymousSession(
  preferredTheme: ThemeMode,
  preferredReciter: QuranReciterId
): Promise<void> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return;

  const installId = getOrCreateAnonymousInstallId();
  const { region, timezone } = inferRegionAndTimezone();
  const safeTheme: ThemeMode = ALLOWED_THEMES.has(preferredTheme)
    ? preferredTheme
    : 'obsidian_black';
  const safeReciter = sanitizeId(preferredReciter, 48);
  const platform = inferPlatform();
  const installPath = `installations/${installId}`;

  try {
    const ref = doc(db, 'installations', installId);
    const snap = await getDoc(ref);
    const payload = {
      installId,
      region,
      timezone,
      preferredTheme: safeTheme,
      preferredReciter: safeReciter,
      platform,
      lastActiveAt: serverTimestamp(),
    };

    if (!snap.exists()) {
      await setDoc(ref, payload);
    } else {
      await updateDoc(ref, {
        region,
        timezone,
        preferredTheme: safeTheme,
        preferredReciter: safeReciter,
        platform,
        lastActiveAt: serverTimestamp(),
      });
    }
  } catch (error) {
    if (!isOfflineNetworkError(error)) {
      handleFirestoreError(error, OperationType.WRITE, installPath);
    }
  }

  void syncAnonymousAnalyticsProfile(installId, safeTheme, safeReciter, platform);

  // Ensure singleton community_stats/global doc is initialized & bump heartbeat softly
  const globalPath = 'community_stats/global';
  try {
    const globalRef = doc(db, 'community_stats', 'global');
    const utcDayKey = getUtcDayKey();
    await runTransaction(db, async (tx) => {
      const snap = await tx.get(globalRef);
      if (!snap.exists()) {
        tx.set(globalRef, {
          activeNowCount: 1,
          versesRecitedToday: 0,
          totalVersesAllTime: 0,
          dayKey: utcDayKey,
          updatedAt: serverTimestamp(),
        });
      } else {
        const data = snap.data() as Partial<GlobalUmmahStats>;
        const prevDay = typeof data.dayKey === 'string' ? data.dayKey : utcDayKey;
        const nextDayKey = utcDayKey > prevDay ? utcDayKey : prevDay;
        const nextToday = nextDayKey > prevDay ? 0 : Math.max(0, Number(data.versesRecitedToday || 0));
        const currActive = Math.max(1, Number(data.activeNowCount || 1));
        const nextActive = Math.min(100000, Math.max(1, currActive));
        tx.update(globalRef, {
          activeNowCount: nextActive,
          versesRecitedToday: nextToday,
          totalVersesAllTime: Math.max(0, Number(data.totalVersesAllTime || 0)),
          dayKey: nextDayKey,
          updatedAt: serverTimestamp(),
        });
      }
    });
  } catch (error) {
    if (!isOfflineNetworkError(error)) {
      handleFirestoreError(error, OperationType.WRITE, globalPath);
    }
  }
}

export async function trackFeatureUsage(
  featureId: string,
  category: TelemetryCategory
): Promise<void> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return;

  const safeId = sanitizeId(featureId, 64);
  const path = `feature_stats/${safeId}`;
  const ref = doc(db, 'feature_stats', safeId);

  void emitAnalyticsEvent('feature_used', {
    feature_id: safeId,
    category,
  });
  if (safeId.startsWith('tab_')) {
    void emitAnalyticsEvent('screen_view', {
      firebase_screen: safeId.replace(/^tab_/, ''),
      firebase_screen_class: 'TheAuthenticSunnah',
    });
  }

  try {
    const snap = await getDocFromServer(ref);
    if (!snap.exists()) {
      try {
        await setDoc(ref, {
          featureId: safeId,
          category,
          count: 1,
          updatedAt: serverTimestamp(),
        });
      } catch (createErr) {
        const createCode =
          typeof createErr === 'object' && createErr !== null && 'code' in createErr
            ? String((createErr as { code?: unknown }).code)
            : '';
        if (createCode === 'permission-denied' || createCode === 'already-exists') {
          await updateDoc(ref, {
            count: increment(1),
            updatedAt: serverTimestamp(),
          });
        } else {
          throw createErr;
        }
      }
    } else {
      await updateDoc(ref, {
        count: increment(1),
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    if (!isOfflineNetworkError(error)) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  }
}

export async function recordGlobalVersesRecited(deltaCount: number = 1): Promise<void> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return;
  const boundedDelta = Math.max(1, Math.min(50, Math.floor(deltaCount)));
  void emitAnalyticsEvent('quran_verses_recited', {
    verse_count: boundedDelta,
  });
  const path = 'community_stats/global';
  const utcDayKey = getUtcDayKey();

  try {
    const ref = doc(db, 'community_stats', 'global');
    await runTransaction(db, async (tx) => {
      const snap = await tx.get(ref);
      if (!snap.exists()) {
        tx.set(ref, {
          activeNowCount: 1,
          versesRecitedToday: boundedDelta,
          totalVersesAllTime: boundedDelta,
          dayKey: utcDayKey,
          updatedAt: serverTimestamp(),
        });
      } else {
        const data = snap.data() as Partial<GlobalUmmahStats>;
        const prevDay = typeof data.dayKey === 'string' ? data.dayKey : utcDayKey;
        const nextDayKey = utcDayKey > prevDay ? utcDayKey : prevDay;
        const prevToday = Math.max(0, Number(data.versesRecitedToday || 0));
        const nextToday = nextDayKey > prevDay ? boundedDelta : prevToday + boundedDelta;
        const prevAll = Math.max(0, Number(data.totalVersesAllTime || 0));
        const currActive = Math.max(1, Math.min(100000, Number(data.activeNowCount || 1)));
        tx.update(ref, {
          activeNowCount: currActive,
          versesRecitedToday: nextToday,
          totalVersesAllTime: prevAll + boundedDelta,
          dayKey: nextDayKey,
          updatedAt: serverTimestamp(),
        });
      }
    });
  } catch (error) {
    if (!isOfflineNetworkError(error)) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  }
}

export function subscribeGlobalUmmahStats(
  onUpdate: (stats: GlobalUmmahStats) => void
): () => void {
  const path = 'community_stats/global';
  const ref = doc(db, 'community_stats', 'global');

  const unsub = onSnapshot(
    ref,
    (snapshot) => {
      if (snapshot.exists()) {
        const d = snapshot.data();
        const todayUtc = getUtcDayKey();
        const docDay = typeof d.dayKey === 'string' ? d.dayKey : todayUtc;
        onUpdate({
          activeNowCount: Math.max(1, Number(d.activeNowCount || 1)),
          versesRecitedToday: docDay === todayUtc ? Math.max(0, Number(d.versesRecitedToday || 0)) : 0,
          totalVersesAllTime: Math.max(0, Number(d.totalVersesAllTime || 0)),
          dayKey: docDay,
          isLiveSynced: true,
        });
      } else {
        onUpdate({
          activeNowCount: 1,
          versesRecitedToday: 0,
          totalVersesAllTime: 0,
          dayKey: getUtcDayKey(),
          isLiveSynced: true,
        });
      }
    },
    (error) => {
      if (!isOfflineNetworkError(error)) {
        handleFirestoreError(error, OperationType.GET, path);
      }
    }
  );

  return unsub;
}
