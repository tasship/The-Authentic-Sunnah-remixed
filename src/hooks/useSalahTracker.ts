import { useCallback, useEffect, useMemo, useState } from 'react';
import { idbGetAll, idbSet } from '../services/offlineDb';
import {
  detectLocationViaBrowser,
  fetchDailySalahTimings,
  getNextPrayerInfo,
  isGeolocationAlreadyGranted,
} from '../services/salahApi';
import {
  DailySalahLog,
  DailySalahTimings,
  SalahPrayerId,
  SalahPrayerRecord,
  SalahSettings,
} from '../types';
import { getTodayKey } from '../utils/arabic';

const SALAH_LS_FALLBACK_KEY = 'tas_salah_logs_v1';

function readFallbackLogs(): Record<string, DailySalahLog> {
  try {
    const raw = localStorage.getItem(SALAH_LS_FALLBACK_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function useSalahTracker(
  salahSettings: SalahSettings,
  onUpdateSalahSettings: (patch: Partial<SalahSettings>) => void
) {
  const [logsMap, setLogsMap] = useState<Record<string, DailySalahLog>>(() => readFallbackLogs());
  const [logsLoaded, setLogsLoaded] = useState(false);
  const [dailyTimings, setDailyTimings] = useState<DailySalahTimings | null>(null);
  const [timingsLoading, setTimingsLoading] = useState(true);
  const [timingsError, setTimingsError] = useState<string | null>(null);
  const [locatingGps, setLocatingGps] = useState(false);
  const [nowTick, setNowTick] = useState(() => new Date());

  // 1. Hydrate all DailySalahLog entries from IndexedDB ('salah' store)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const records = await idbGetAll<DailySalahLog>('salah');
        if (!mounted) return;
        if (records.length > 0) {
          const merged: Record<string, DailySalahLog> = { ...readFallbackLogs() };
          for (const rec of records) {
            if (rec?.date) {
              merged[rec.date] = rec;
            }
          }
          setLogsMap(merged);
          try {
            localStorage.setItem(SALAH_LS_FALLBACK_KEY, JSON.stringify(merged));
          } catch {
            // ignore quota
          }
        }
      } finally {
        if (mounted) setLogsLoaded(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // 2. Refresh clock tick every 30s so next-prayer indicator & countdown stay accurate
  useEffect(() => {
    const timer = window.setInterval(() => setNowTick(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  // 3. Silently pick up browser GPS coords if geolocation permission was already granted
  useEffect(() => {
    let mounted = true;
    if (
      salahSettings.locationMode === 'auto' &&
      (typeof salahSettings.latitude !== 'number' || typeof salahSettings.longitude !== 'number')
    ) {
      (async () => {
        const granted = await isGeolocationAlreadyGranted();
        if (!mounted || !granted) return;
        try {
          const geo = await detectLocationViaBrowser();
          if (!mounted) return;
          onUpdateSalahSettings({
            locationMode: 'auto',
            latitude: geo.latitude,
            longitude: geo.longitude,
            ...(geo.city ? { city: geo.city } : {}),
            ...(geo.country ? { country: geo.country } : {}),
          });
        } catch {
          // silently fall back to timezone city
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [
    salahSettings.locationMode,
    salahSettings.latitude,
    salahSettings.longitude,
    onUpdateSalahSettings,
  ]);

  // 4. Fetch & cache daily timings from Aladhan API whenever settings or day change
  const todayKey = getTodayKey(nowTick);
  const loadTimings = useCallback(async () => {
    setTimingsLoading(true);
    setTimingsError(null);
    try {
      const result = await fetchDailySalahTimings(salahSettings, new Date());
      setDailyTimings(result);
    } catch (err) {
      setTimingsError(
        err instanceof Error ? err.message : 'Unable to sync prayer times right now.'
      );
    } finally {
      setTimingsLoading(false);
    }
  }, [salahSettings]);

  useEffect(() => {
    void loadTimings();
  }, [loadTimings, todayKey]);

  const detectAndSaveLocation = useCallback(async () => {
    setLocatingGps(true);
    setTimingsError(null);
    try {
      const geo = await detectLocationViaBrowser();
      onUpdateSalahSettings({
        locationMode: 'auto',
        latitude: geo.latitude,
        longitude: geo.longitude,
        city: geo.city || '',
        country: geo.country || '',
      });
      return geo;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Location permission declined. Select a manual city below.';
      setTimingsError(message);
      throw err;
    } finally {
      setLocatingGps(false);
    }
  }, [onUpdateSalahSettings]);

  const savePrayerRecord = useCallback(
    async (dateKey: string, prayerId: SalahPrayerId, record: SalahPrayerRecord) => {
      setLogsMap((prev) => {
        const existing = prev[dateKey] || { date: dateKey, prayers: {} };
        const updatedDay: DailySalahLog = {
          date: dateKey,
          prayers: {
            ...existing.prayers,
            [prayerId]: record,
          },
        };
        const nextMap = { ...prev, [dateKey]: updatedDay };
        void idbSet('salah', dateKey, updatedDay);
        try {
          localStorage.setItem(SALAH_LS_FALLBACK_KEY, JSON.stringify(nextMap));
        } catch {
          // ignore
        }
        return nextMap;
      });
    },
    []
  );

  const deletePrayerRecord = useCallback(async (dateKey: string, prayerId: SalahPrayerId) => {
    setLogsMap((prev) => {
      const existing = prev[dateKey];
      if (!existing) return prev;
      const nextPrayers = { ...existing.prayers };
      delete nextPrayers[prayerId];
      const updatedDay: DailySalahLog = {
        date: dateKey,
        prayers: nextPrayers,
      };
      const nextMap = { ...prev, [dateKey]: updatedDay };
      void idbSet('salah', dateKey, updatedDay);
      try {
        localStorage.setItem(SALAH_LS_FALLBACK_KEY, JSON.stringify(nextMap));
      } catch {
        // ignore
      }
      return nextMap;
    });
  }, []);

  const todayLog: DailySalahLog = useMemo(
    () => logsMap[todayKey] || { date: todayKey, prayers: {} },
    [logsMap, todayKey]
  );

  const nextPrayerInfo = useMemo(
    () => getNextPrayerInfo(dailyTimings?.timings || null, nowTick),
    [dailyTimings, nowTick]
  );

  return {
    todayKey,
    logsMap,
    logsLoaded,
    todayLog,
    dailyTimings,
    timingsLoading,
    timingsError,
    locatingGps,
    nextPrayerInfo,
    savePrayerRecord,
    deletePrayerRecord,
    detectAndSaveLocation,
    refreshTimings: loadTimings,
  };
}
