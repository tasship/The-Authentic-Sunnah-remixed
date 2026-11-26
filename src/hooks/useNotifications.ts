import { useCallback, useEffect, useState } from 'react';
import { fetchVerseOfTheDay } from '../services/quranApi';
import {
  addMinutesToHHMM,
  formatPrayerTime12h,
  OBLIGATORY_PRAYER_IDS,
  SALAH_PRAYER_META,
} from '../services/salahApi';
import { DailySalahTimings, ReaderSettings } from '../types';
import { getTodayKey } from '../utils/arabic';

const FIRED_KEY = 'tas_notifications_fired_v1';
export const LOCKED_SADAQAH_TIME = '06:00';
export const SADAQAH_NOTIFICATION_TITLE = 'Share The Authentic Sunnah — Sadaqah Jariyah 🌙';
export const SADAQAH_NOTIFICATION_BODY =
  'Start your morning with continuous reward! Invite a friend or family member to The Authentic Sunnah today.';

async function dispatchBrowserNotification(
  title: string,
  body: string,
  actionType?: 'share-sadaqah',
  customTag?: string
) {
  if (typeof window === 'undefined' || !('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;

  try {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready;
      await reg.showNotification(title, {
        body,
        icon: '/pwa-192x192.png',
        badge: '/pwa-192x192.png',
        tag:
          customTag ||
          (actionType === 'share-sadaqah' ? 'tas-sadaqah-6am' : `tas-${Date.now()}`),
        data: actionType
          ? { action: actionType, url: `/?action=${actionType}` }
          : { url: '/' },
      });
      return;
    }
  } catch {
    // fallback to standard Notification
  }

  try {
    const notif = new Notification(title, {
      body,
      icon: '/pwa-192x192.png',
    });
    if (actionType === 'share-sadaqah') {
      notif.onclick = () => {
        window.focus();
        window.dispatchEvent(new CustomEvent('tas-open-sadaqah-share'));
      };
    }
  } catch {
    // ignore if blocked in iframe
  }
}

export function useNotifications(
  settings: ReaderSettings,
  onUpdateNotifications: (patch: Partial<ReaderSettings['notifications']>) => void,
  salahTimings?: DailySalahTimings | null
) {
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
    return Notification.permission;
  });

  const requestPermission = useCallback(async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setPermission('unsupported');
      return 'unsupported' as const;
    }
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === 'granted') {
      onUpdateNotifications({ enabled: true });
    }
    return result;
  }, [onUpdateNotifications]);

  const sendTestNotification = useCallback(async () => {
    let body = 'Remember Allah today — keep your Quran reading streak alive.';
    try {
      const verse = await fetchVerseOfTheDay(settings.englishTranslator);
      body = `Verse of the Day (${verse.surahName} ${verse.key}): "${verse.translation}"`;
    } catch {
      // use concise fallback prompt
    }
    await dispatchBrowserNotification('The Authentic Sunnah · Daily Reminder', body);
  }, [settings.englishTranslator]);

  const sendSadaqahPreviewNotification = useCallback(async () => {
    await dispatchBrowserNotification(
      SADAQAH_NOTIFICATION_TITLE,
      SADAQAH_NOTIFICATION_BODY,
      'share-sadaqah'
    );
  }, []);

  const sendSalahTestNotification = useCallback(async () => {
    const lead = settings.salah.alertLeadMinutes;
    const body =
      lead === 0
        ? 'Salah alert active: You will receive a gentle notification right when prayer time enters.'
        : `Salah alert active: You will be reminded ${lead} minutes before each enabled prayer.`;
    await dispatchBrowserNotification(
      'The Authentic Sunnah · Salah Alert Active',
      body,
      undefined,
      'tas-salah-test'
    );
  }, [settings.salah.alertLeadMinutes]);

  // Scheduled check every 20s for Daily Verse, Locked 06:00 AM Sadaqah Jariyah, & Five Daily Salah Alerts
  useEffect(() => {
    if (permission !== 'granted') return;
    if (!settings.notifications.enabled && !settings.salah.notificationsEnabled) return;

    const checkSchedule = async () => {
      const now = new Date();
      const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const today = getTodayKey(now);

      let firedToday: Record<string, boolean> = {};
      try {
        const raw = localStorage.getItem(FIRED_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed.date === today) firedToday = parsed.keys || {};
        }
      } catch {
        // ignore
      }

      const markFired = (k: string) => {
        firedToday[k] = true;
        try {
          localStorage.setItem(FIRED_KEY, JSON.stringify({ date: today, keys: firedToday }));
        } catch {
          // ignore
        }
      };

      if (settings.notifications.enabled) {
        // 1. Strictly locked 6:00 AM Daily Sadaqah Jariyah Notification
        if (
          settings.notifications.sadaqahReminderEnabled !== false &&
          hhmm === LOCKED_SADAQAH_TIME &&
          !firedToday['sadaqah_6am']
        ) {
          markFired('sadaqah_6am');
          await dispatchBrowserNotification(
            SADAQAH_NOTIFICATION_TITLE,
            SADAQAH_NOTIFICATION_BODY,
            'share-sadaqah'
          );
        }

        // 2. Daily Verse Notification
        if (
          settings.notifications.dailyVerseEnabled &&
          settings.notifications.dailyVerseTime === hhmm &&
          !firedToday['daily_verse']
        ) {
          markFired('daily_verse');
          try {
            const verse = await fetchVerseOfTheDay(settings.englishTranslator);
            await dispatchBrowserNotification(
              `Verse of the Day · ${verse.surahName} (${verse.key})`,
              `${verse.translation} — Open The Authentic Sunnah to continue your streak.`
            );
          } catch {
            await dispatchBrowserNotification(
              'The Authentic Sunnah · Daily Quran Reminder',
              'Take a few peaceful minutes to read the Quran and earn Hasanat today.'
            );
          }
        }
      }

      // 3. Five Daily Salah PWA Alerts
      if (settings.salah.notificationsEnabled && salahTimings?.timings) {
        const lead = settings.salah.alertLeadMinutes || 0;
        for (const prayerId of OBLIGATORY_PRAYER_IDS) {
          if (!settings.salah.enabledPrayers[prayerId]) continue;
          const prayerTime24 = salahTimings.timings[prayerId];
          if (!prayerTime24) continue;
          const triggerTime24 = addMinutesToHHMM(prayerTime24, -lead);
          const fireKey = `salah_${prayerId}_${lead}_${triggerTime24}`;

          if (triggerTime24 === hhmm && !firedToday[fireKey]) {
            markFired(fireKey);
            const meta = SALAH_PRAYER_META.find((m) => m.id === prayerId);
            const prayerLabel = meta?.label || prayerId;
            const formatted12 = formatPrayerTime12h(prayerTime24);
            const title =
              lead === 0
                ? `${prayerLabel} Prayer Time (${formatted12})`
                : `${prayerLabel} in ${lead} minutes (${formatted12})`;
            const body =
              lead === 0
                ? `Hayya 'ala as-Salah — ${prayerLabel} time has entered in ${salahTimings.locationLabel}.`
                : `Prepare for ${prayerLabel} (${formatted12}) in ${salahTimings.locationLabel}.`;
            await dispatchBrowserNotification(title, body, undefined, `tas-salah-${prayerId}-${today}`);
          }
        }
      }
    };

    checkSchedule();
    const interval = window.setInterval(checkSchedule, 20000);
    return () => window.clearInterval(interval);
  }, [
    settings.notifications,
    settings.englishTranslator,
    settings.salah,
    salahTimings,
    permission,
  ]);

  return {
    permission,
    requestPermission,
    sendTestNotification,
    sendSadaqahPreviewNotification,
    sendSalahTestNotification,
  };
}

