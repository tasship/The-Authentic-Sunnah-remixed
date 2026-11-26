import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DARK_THEME_IDS,
  getThemeColor,
  isDarkThemeId,
  LIGHT_THEME_IDS,
  METALLIC_THEME_IDS,
  resolveEffectiveTheme,
} from '../config/themes';
import { YOUTUBE_CONFIG } from '../config/youtubeConfig';
import { idbGet, idbSet } from '../services/offlineDb';
import {
  CompanionBookmark,
  DailyGoals,
  DailyHabitRecord,
  DarkThemeId,
  DuaBookmark,
  FastingCategory,
  FastingLogEntry,
  HadithBookmark,
  HifzStatus,
  LightThemeId,
  MetallicThemeId,
  NotificationSettings,
  QuranBookmark,
  ReaderSettings,
  SalahSettings,
  SeerahBookmark,
  SurahHifzProgress,
  ThemeChoice,
  ThemeMode,
} from '../types';
import { getTodayKey } from '../utils/arabic';

const STORAGE_KEYS = {
  SETTINGS: 'tas_settings_v5',
  GOALS: 'tas_goals_v2',
  HABITS: 'tas_habits_v2',
  QURAN_BOOKMARKS: 'tas_quran_bookmarks_v1',
  HADITH_BOOKMARKS: 'tas_hadith_bookmarks_v2',
  DUA_BOOKMARKS: 'tas_dua_bookmarks_v1',
  SEERAH_BOOKMARKS: 'tas_seerah_bookmarks_v1',
  COMPANION_BOOKMARKS: 'tas_companion_bookmarks_v1',
  DHIKR_COUNTS: 'tas_dhikr_counts_v1',
  LAST_READ: 'tas_last_read_v2',
  SEERAH_COMPLETED: 'tas_seerah_completed_v1',
  SUNNAH_HABITS: 'tas_sunnah_habits_v1',
  FIRST_USED_DATE: 'tas_first_used_date_v1',
  HIFZ_PROGRESS: 'tas_hifz_v1',
  FASTING_LOG: 'tas_fasting_v1',
} as const;

const DEFAULT_NOTIFICATIONS: NotificationSettings = {
  enabled: false,
  dailyVerseEnabled: true,
  dailyVerseTime: '08:00',
  sadaqahReminderEnabled: true,
};

export const DEFAULT_SALAH_SETTINGS: SalahSettings = {
  locationMode: 'auto',
  city: '',
  country: '',
  calculationMethod: 2,
  asrSchool: 0,
  offsets: {
    fajr: 0,
    sunrise: 0,
    dhuhr: 0,
    asr: 0,
    maghrib: 0,
    isha: 0,
  },
  notificationsEnabled: true,
  alertLeadMinutes: 10,
  enabledPrayers: {
    fajr: true,
    dhuhr: true,
    asr: true,
    maghrib: true,
    isha: true,
  },
};

const DEFAULT_SETTINGS: ReaderSettings = {
  theme: 'obsidian_black',
  lastDarkTheme: 'obsidian_black',
  lastLightTheme: 'royal_ivory',
  arabicFont: 'amiri',
  quranScript: 'uthmani',
  quranReaderMode: 'card',
  quranReciter: 'yasser_dosari',
  autoAdvanceAudio: true,
  showArabic: true,
  showTransliteration: true,
  translationDisplay: 'english',
  englishTranslator: 'en.sahih',
  urduTranslator: 'ur.jalandhry',
  romanUrduTranslator: 'taqi_usmani',
  tafsirLanguage: 'en',
  arabicFontSize: 30,
  englishFontSize: 16,
  urduFontSize: 18,
  autoTrackScroll: true,
  youtubeChannelId: YOUTUBE_CONFIG.DEFAULT_YOUTUBE_CHANNEL_ID,
  notifications: DEFAULT_NOTIFICATIONS,
  salah: DEFAULT_SALAH_SETTINGS,
};

const DEFAULT_GOALS: DailyGoals = {
  pagesPerDay: 2,
  versesPerDay: 10,
  minutesPerDay: 15,
  hasanatPerDay: 1000,
  hadithsPerDay: 3,
};

export interface LastReadPosition {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  totalAyahsInSurah: number;
  juz: number;
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) };
  } catch {
    return fallback;
  }
}

function normalizeThemeChoice(raw: unknown): ThemeChoice {
  if (typeof raw !== 'string') return DEFAULT_SETTINGS.theme;
  if (raw === 'system_default') return 'system_default';
  if (raw === 'dark') return 'obsidian_black';
  if (raw === 'light' || raw === 'warm_alabaster') return 'royal_ivory';
  if (raw === 'midnight_sapphire' || raw === 'midnight_charcoal') return 'storm_sovereign';
  if (raw === 'cosmic_nebula') return 'cosmic_amethyst';
  if (raw === 'emerald_shadow') return 'emerald_dynasty';
  if (METALLIC_THEME_IDS.has(raw)) return raw as MetallicThemeId;
  if (DARK_THEME_IDS.has(raw as DarkThemeId)) return raw as DarkThemeId;
  if (LIGHT_THEME_IDS.has(raw as LightThemeId)) return raw as LightThemeId;
  return DEFAULT_SETTINGS.theme;
}

function readSettings(): ReaderSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);

    const normalizedTheme = normalizeThemeChoice(parsed.theme);

    let lastDarkTheme: DarkThemeId = 'obsidian_black';
    if (parsed.lastDarkTheme && DARK_THEME_IDS.has(parsed.lastDarkTheme)) {
      lastDarkTheme = parsed.lastDarkTheme;
    } else if (DARK_THEME_IDS.has(normalizedTheme as DarkThemeId)) {
      lastDarkTheme = normalizedTheme as DarkThemeId;
    }

    let lastLightTheme: LightThemeId = 'royal_ivory';
    if (parsed.lastLightTheme && LIGHT_THEME_IDS.has(parsed.lastLightTheme)) {
      lastLightTheme = parsed.lastLightTheme;
    } else if (LIGHT_THEME_IDS.has(normalizedTheme as LightThemeId)) {
      lastLightTheme = normalizedTheme as LightThemeId;
    }

    const translationDisplay =
      parsed.translationDisplay === 'english' ||
      parsed.translationDisplay === 'urdu' ||
      parsed.translationDisplay === 'roman_urdu' ||
      parsed.translationDisplay === 'both'
        ? parsed.translationDisplay
        : DEFAULT_SETTINGS.translationDisplay;

    const romanUrduTranslator =
      parsed.romanUrduTranslator === 'taqi_usmani' || parsed.romanUrduTranslator === 'maududi'
        ? parsed.romanUrduTranslator
        : DEFAULT_SETTINGS.romanUrduTranslator;

    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      theme: normalizedTheme,
      lastDarkTheme,
      lastLightTheme,
      translationDisplay,
      romanUrduTranslator,
      showTransliteration:
        typeof parsed.showTransliteration === 'boolean'
          ? parsed.showTransliteration
          : DEFAULT_SETTINGS.showTransliteration,
      quranReciter: parsed.quranReciter || DEFAULT_SETTINGS.quranReciter,
      autoAdvanceAudio:
        typeof parsed.autoAdvanceAudio === 'boolean'
          ? parsed.autoAdvanceAudio
          : DEFAULT_SETTINGS.autoAdvanceAudio,
      notifications: {
        enabled: Boolean(parsed.notifications?.enabled),
        dailyVerseEnabled:
          typeof parsed.notifications?.dailyVerseEnabled === 'boolean'
            ? parsed.notifications.dailyVerseEnabled
            : DEFAULT_NOTIFICATIONS.dailyVerseEnabled,
        dailyVerseTime:
          typeof parsed.notifications?.dailyVerseTime === 'string'
            ? parsed.notifications.dailyVerseTime
            : DEFAULT_NOTIFICATIONS.dailyVerseTime,
        sadaqahReminderEnabled:
          typeof parsed.notifications?.sadaqahReminderEnabled === 'boolean'
            ? parsed.notifications.sadaqahReminderEnabled
            : DEFAULT_NOTIFICATIONS.sadaqahReminderEnabled,
      },
      salah: {
        ...DEFAULT_SALAH_SETTINGS,
        ...(parsed.salah || {}),
        offsets: {
          ...DEFAULT_SALAH_SETTINGS.offsets,
          ...(parsed.salah?.offsets || {}),
        },
        enabledPrayers: {
          ...DEFAULT_SALAH_SETTINGS.enabledPrayers,
          ...(parsed.salah?.enabledPrayers || {}),
        },
      },
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function readArray<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readHabitsMap(): Record<string, DailyHabitRecord> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HABITS) || localStorage.getItem('tas_habits_v1');
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function readDhikrToday(todayKey: string): Record<string, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DHIKR_COUNTS);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed?.date === todayKey && parsed.counts) {
      return parsed.counts;
    }
    return {};
  } catch {
    return {};
  }
}

function readSunnahHabitsToday(todayKey: string): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SUNNAH_HABITS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (parsed?.date === todayKey && Array.isArray(parsed.ids)) {
      return parsed.ids;
    }
    return [];
  } catch {
    return [];
  }
}

function emptyRecord(date: string): DailyHabitRecord {
  return {
    date,
    versesReadIds: [],
    pagesReadIds: [],
    hadithsReadIds: [],
    lettersCount: 0,
    hasanat: 0,
    secondsRead: 0,
    secondsListened: 0,
  };
}

function readOrInitFirstUsedDate(
  todayKey: string,
  habitsMap: Record<string, DailyHabitRecord>
): string {
  const habitDates = Object.keys(habitsMap).filter((k) => /^\d{4}-\d{2}-\d{2}$/.test(k)).sort();
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FIRST_USED_DATE);
    const earliestHabit = habitDates[0];
    let resolved = stored && /^\d{4}-\d{2}-\d{2}$/.test(stored) ? stored : todayKey;
    if (earliestHabit && earliestHabit < resolved) {
      resolved = earliestHabit;
    }
    if (resolved !== stored) {
      localStorage.setItem(STORAGE_KEYS.FIRST_USED_DATE, resolved);
    }
    return resolved;
  } catch {
    return habitDates[0] || todayKey;
  }
}

export function useAppStore() {
  const todayKey = getTodayKey();

  const [settings, setSettings] = useState<ReaderSettings>(() => readSettings());
  const [goals, setGoals] = useState<DailyGoals>(() => readJson(STORAGE_KEYS.GOALS, DEFAULT_GOALS));
  const [habitsMap, setHabitsMap] = useState<Record<string, DailyHabitRecord>>(() => readHabitsMap());
  const [quranBookmarks, setQuranBookmarks] = useState<QuranBookmark[]>(() =>
    readArray(STORAGE_KEYS.QURAN_BOOKMARKS)
  );
  const [hadithBookmarks, setHadithBookmarks] = useState<HadithBookmark[]>(() =>
    readArray(STORAGE_KEYS.HADITH_BOOKMARKS)
  );
  const [duaBookmarks, setDuaBookmarks] = useState<DuaBookmark[]>(() =>
    readArray(STORAGE_KEYS.DUA_BOOKMARKS)
  );
  const [seerahBookmarks, setSeerahBookmarks] = useState<SeerahBookmark[]>(() =>
    readArray(STORAGE_KEYS.SEERAH_BOOKMARKS)
  );
  const [companionBookmarks, setCompanionBookmarks] = useState<CompanionBookmark[]>(() =>
    readArray(STORAGE_KEYS.COMPANION_BOOKMARKS)
  );
  const [dhikrCounts, setDhikrCounts] = useState<Record<string, number>>(() =>
    readDhikrToday(todayKey)
  );
  const [lastRead, setLastRead] = useState<LastReadPosition>(() =>
    readJson(STORAGE_KEYS.LAST_READ, {
      surahNumber: 1,
      surahName: 'Al-Faatiha',
      ayahNumber: 1,
      totalAyahsInSurah: 7,
      juz: 1,
    })
  );
  const [completedSeerahIds, setCompletedSeerahIds] = useState<string[]>(() =>
    readArray(STORAGE_KEYS.SEERAH_COMPLETED)
  );
  const [completedSunnahIds, setCompletedSunnahIds] = useState<string[]>(() =>
    readSunnahHabitsToday(todayKey)
  );
  const [firstUsedDate] = useState<string>(() =>
    readOrInitFirstUsedDate(todayKey, habitsMap)
  );
  const [hifzProgress, setHifzProgress] = useState<Record<number, SurahHifzProgress>>(() =>
    readJson(STORAGE_KEYS.HIFZ_PROGRESS, {})
  );
  const [fastingLog, setFastingLog] = useState<FastingLogEntry[]>(() =>
    readArray(STORAGE_KEYS.FASTING_LOG)
  );

  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = () => {
      const effectiveTheme = resolveEffectiveTheme(settings.theme);
      const isDark = isDarkThemeId(effectiveTheme);
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      root.setAttribute('data-theme', effectiveTheme);

      const color = getThemeColor(settings.theme);
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) {
        metaTheme.setAttribute('content', color);
      }
    };

    applyTheme();

    if (settings.theme === 'system_default' && typeof window !== 'undefined' && window.matchMedia) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyTheme();
      mql.addEventListener('change', listener);
      return () => mql.removeEventListener('change', listener);
    }
  }, [settings.theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    void idbSet('kv', STORAGE_KEYS.SETTINGS, settings);
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habitsMap));
    void idbSet('kv', STORAGE_KEYS.HABITS, habitsMap);
  }, [habitsMap]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QURAN_BOOKMARKS, JSON.stringify(quranBookmarks));
    void idbSet('kv', STORAGE_KEYS.QURAN_BOOKMARKS, quranBookmarks);
  }, [quranBookmarks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HADITH_BOOKMARKS, JSON.stringify(hadithBookmarks));
    void idbSet('kv', STORAGE_KEYS.HADITH_BOOKMARKS, hadithBookmarks);
  }, [hadithBookmarks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DUA_BOOKMARKS, JSON.stringify(duaBookmarks));
    void idbSet('kv', STORAGE_KEYS.DUA_BOOKMARKS, duaBookmarks);
  }, [duaBookmarks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SEERAH_BOOKMARKS, JSON.stringify(seerahBookmarks));
  }, [seerahBookmarks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPANION_BOOKMARKS, JSON.stringify(companionBookmarks));
  }, [companionBookmarks]);

  useEffect(() => {
    const payload = { date: todayKey, counts: dhikrCounts };
    localStorage.setItem(STORAGE_KEYS.DHIKR_COUNTS, JSON.stringify(payload));
    void idbSet('kv', STORAGE_KEYS.DHIKR_COUNTS, payload);
  }, [dhikrCounts, todayKey]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LAST_READ, JSON.stringify(lastRead));
    void idbSet('kv', STORAGE_KEYS.LAST_READ, lastRead);
  }, [lastRead]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SEERAH_COMPLETED, JSON.stringify(completedSeerahIds));
  }, [completedSeerahIds]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.SUNNAH_HABITS,
      JSON.stringify({ date: todayKey, ids: completedSunnahIds })
    );
  }, [completedSunnahIds, todayKey]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HIFZ_PROGRESS, JSON.stringify(hifzProgress));
    void idbSet('kv', STORAGE_KEYS.HIFZ_PROGRESS, hifzProgress);
  }, [hifzProgress]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FASTING_LOG, JSON.stringify(fastingLog));
  }, [fastingLog]);

  // Recover settings, Hifz progress, or bookmarks from IndexedDB if localStorage was cleared
  useEffect(() => {
    let mounted = true;
    (async () => {
      const idbStoredSettings = await idbGet<ReaderSettings>('kv', STORAGE_KEYS.SETTINGS);
      if (mounted && idbStoredSettings && typeof idbStoredSettings === 'object') {
        setSettings((prev) => ({
          ...prev,
          ...idbStoredSettings,
          theme: normalizeThemeChoice(idbStoredSettings.theme),
        }));
      }
      if (Object.keys(hifzProgress).length === 0) {
        const idbHifz = await idbGet<Record<number, SurahHifzProgress>>('kv', STORAGE_KEYS.HIFZ_PROGRESS);
        if (mounted && idbHifz && Object.keys(idbHifz).length > 0) {
          setHifzProgress(idbHifz);
        }
      }
      if (duaBookmarks.length === 0) {
        const idbDuas = await idbGet<DuaBookmark[]>('kv', STORAGE_KEYS.DUA_BOOKMARKS);
        if (mounted && idbDuas && idbDuas.length > 0) {
          setDuaBookmarks(idbDuas);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const todayRecord: DailyHabitRecord = useMemo(() => {
    const raw = habitsMap[todayKey];
    if (!raw) return emptyRecord(todayKey);
    return {
      ...emptyRecord(todayKey),
      ...raw,
      pagesReadIds: raw.pagesReadIds || [],
    };
  }, [habitsMap, todayKey]);

  const updateSettings = useCallback((patch: Partial<ReaderSettings>) => {
    setSettings((prev) => {
      const nextTheme = patch.theme ?? prev.theme;
      let nextLastDark = prev.lastDarkTheme || 'obsidian_black';
      let nextLastLight = prev.lastLightTheme || 'royal_ivory';

      if (DARK_THEME_IDS.has(nextTheme as DarkThemeId)) {
        nextLastDark = nextTheme as DarkThemeId;
      }
      if (LIGHT_THEME_IDS.has(nextTheme as LightThemeId)) {
        nextLastLight = nextTheme as LightThemeId;
      }

      return {
        ...prev,
        ...patch,
        theme: nextTheme,
        lastDarkTheme: nextLastDark,
        lastLightTheme: nextLastLight,
      };
    });
  }, []);

  const updateNotifications = useCallback((patch: Partial<NotificationSettings>) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        ...patch,
      },
    }));
  }, []);

  const updateSalahSettings = useCallback((patch: Partial<SalahSettings>) => {
    setSettings((prev) => ({
      ...prev,
      salah: {
        ...prev.salah,
        ...patch,
        offsets: {
          ...prev.salah.offsets,
          ...(patch.offsets || {}),
        },
        enabledPrayers: {
          ...prev.salah.enabledPrayers,
          ...(patch.enabledPrayers || {}),
        },
      },
    }));
  }, []);

  const toggleTheme = useCallback(() => {
    setSettings((prev) => {
      const effective = resolveEffectiveTheme(prev.theme);
      const currentlyDark = isDarkThemeId(effective);
      if (currentlyDark) {
        const targetLight = prev.lastLightTheme || 'royal_ivory';
        return {
          ...prev,
          theme: targetLight,
          lastDarkTheme: DARK_THEME_IDS.has(effective as DarkThemeId)
            ? (effective as DarkThemeId)
            : prev.lastDarkTheme || 'obsidian_black',
        };
      } else {
        const targetDark = prev.lastDarkTheme || 'obsidian_black';
        return {
          ...prev,
          theme: targetDark,
          lastLightTheme: LIGHT_THEME_IDS.has(effective as LightThemeId)
            ? (effective as LightThemeId)
            : prev.lastLightTheme || 'royal_ivory',
        };
      }
    });
  }, []);

  const updateGoals = useCallback((patch: Partial<DailyGoals>) => {
    setGoals((prev) => ({ ...prev, ...patch }));
  }, []);

  const markVerseRead = useCallback(
    (
      verseKey: string,
      letterCount: number,
      page?: number,
      surahNumber?: number,
      surahName?: string,
      ayahNumber?: number,
      totalAyahsInSurah?: number,
      juz?: number
    ) => {
      const key = getTodayKey();
      setHabitsMap((prev) => {
        const current = { ...emptyRecord(key), ...(prev[key] || {}) };
        const alreadyVerse = current.versesReadIds.includes(verseKey);
        const alreadyPage = page ? current.pagesReadIds.includes(page) : true;
        if (alreadyVerse && alreadyPage) return prev;

        const nextVerses = alreadyVerse
          ? current.versesReadIds
          : [...current.versesReadIds, verseKey];
        const nextPages =
          page && !alreadyPage ? [...current.pagesReadIds, page] : current.pagesReadIds;
        const nextLetters = alreadyVerse ? current.lettersCount : current.lettersCount + letterCount;

        return {
          ...prev,
          [key]: {
            ...current,
            versesReadIds: nextVerses,
            pagesReadIds: nextPages,
            lettersCount: nextLetters,
            hasanat: nextLetters * 10,
          },
        };
      });
      if (surahNumber && surahName && ayahNumber) {
        setLastRead((prev) => ({
          surahNumber,
          surahName,
          ayahNumber,
          totalAyahsInSurah: totalAyahsInSurah || prev.totalAyahsInSurah,
          juz: juz || prev.juz,
        }));
      }
    },
    []
  );

  const toggleVerseRead = useCallback(
    (
      verseKey: string,
      letterCount: number,
      page?: number,
      surahNumber?: number,
      surahName?: string,
      ayahNumber?: number,
      totalAyahsInSurah?: number,
      juz?: number
    ) => {
      const key = getTodayKey();
      setHabitsMap((prev) => {
        const current = { ...emptyRecord(key), ...(prev[key] || {}) };
        const exists = current.versesReadIds.includes(verseKey);
        const deltaLetters = exists ? -letterCount : letterCount;
        const nextIds = exists
          ? current.versesReadIds.filter((id) => id !== verseKey)
          : [...current.versesReadIds, verseKey];
        const nextPages =
          !exists && page && !current.pagesReadIds.includes(page)
            ? [...current.pagesReadIds, page]
            : current.pagesReadIds;
        const nextLetters = Math.max(0, current.lettersCount + deltaLetters);
        return {
          ...prev,
          [key]: {
            ...current,
            versesReadIds: nextIds,
            pagesReadIds: nextPages,
            lettersCount: nextLetters,
            hasanat: nextLetters * 10,
          },
        };
      });
      if (surahNumber && surahName && ayahNumber) {
        setLastRead((prev) => ({
          surahNumber,
          surahName,
          ayahNumber,
          totalAyahsInSurah: totalAyahsInSurah || prev.totalAyahsInSurah,
          juz: juz || prev.juz,
        }));
      }
    },
    []
  );

  const markVersesBatchRead = useCallback(
    (
      items: { key: string; letterCount: number; page?: number }[],
      surahNumber?: number,
      surahName?: string,
      lastAyah?: number,
      totalAyahsInSurah?: number,
      juz?: number
    ) => {
      const dateKey = getTodayKey();
      setHabitsMap((prev) => {
        const current = { ...emptyRecord(dateKey), ...(prev[dateKey] || {}) };
        const existingSet = new Set(current.versesReadIds);
        const pageSet = new Set(current.pagesReadIds);
        let addedLetters = 0;
        const addedKeys: string[] = [];

        for (const item of items) {
          if (!existingSet.has(item.key)) {
            existingSet.add(item.key);
            addedKeys.push(item.key);
            addedLetters += item.letterCount;
          }
          if (item.page) {
            pageSet.add(item.page);
          }
        }
        if (addedKeys.length === 0 && pageSet.size === current.pagesReadIds.length) return prev;
        const nextLetters = current.lettersCount + addedLetters;
        return {
          ...prev,
          [dateKey]: {
            ...current,
            versesReadIds: [...current.versesReadIds, ...addedKeys],
            pagesReadIds: Array.from(pageSet),
            lettersCount: nextLetters,
            hasanat: nextLetters * 10,
          },
        };
      });
      if (surahNumber && surahName && lastAyah) {
        setLastRead((prev) => ({
          surahNumber,
          surahName,
          ayahNumber: lastAyah,
          totalAyahsInSurah: totalAyahsInSurah || prev.totalAyahsInSurah,
          juz: juz || prev.juz,
        }));
      }
    },
    []
  );

  const toggleHadithRead = useCallback((hadithKey: string) => {
    const key = getTodayKey();
    setHabitsMap((prev) => {
      const current = { ...emptyRecord(key), ...(prev[key] || {}) };
      const exists = current.hadithsReadIds.includes(hadithKey);
      const nextIds = exists
        ? current.hadithsReadIds.filter((id) => id !== hadithKey)
        : [...current.hadithsReadIds, hadithKey];
      return {
        ...prev,
        [key]: {
          ...current,
          hadithsReadIds: nextIds,
        },
      };
    });
  }, []);

  const addReadingSeconds = useCallback((seconds: number) => {
    if (seconds <= 0) return;
    const key = getTodayKey();
    setHabitsMap((prev) => {
      const current = { ...emptyRecord(key), ...(prev[key] || {}) };
      return {
        ...prev,
        [key]: {
          ...current,
          secondsRead: current.secondsRead + seconds,
        },
      };
    });
  }, []);

  const addListeningSeconds = useCallback((seconds: number) => {
    if (seconds <= 0) return;
    const key = getTodayKey();
    setHabitsMap((prev) => {
      const current = { ...emptyRecord(key), ...(prev[key] || {}) };
      return {
        ...prev,
        [key]: {
          ...current,
          secondsListened: (current.secondsListened || 0) + seconds,
        },
      };
    });
  }, []);

  const incrementDhikr = useCallback((dhikrId: string, targetCount: number) => {
    setDhikrCounts((prev) => {
      const curr = prev[dhikrId] || 0;
      const next = curr >= targetCount ? targetCount : curr + 1;
      return { ...prev, [dhikrId]: next };
    });
  }, []);

  const resetDhikr = useCallback((dhikrId: string) => {
    setDhikrCounts((prev) => ({ ...prev, [dhikrId]: 0 }));
  }, []);

  const toggleQuranBookmark = useCallback((bookmark: Omit<QuranBookmark, 'savedAt'>) => {
    setQuranBookmarks((prev) => {
      const exists = prev.some((b) => b.key === bookmark.key);
      if (exists) return prev.filter((b) => b.key !== bookmark.key);
      return [{ ...bookmark, savedAt: new Date().toISOString() }, ...prev];
    });
  }, []);

  const toggleHadithBookmark = useCallback((bookmark: Omit<HadithBookmark, 'savedAt'>) => {
    setHadithBookmarks((prev) => {
      const exists = prev.some((b) => b.key === bookmark.key);
      if (exists) return prev.filter((b) => b.key !== bookmark.key);
      return [{ ...bookmark, savedAt: new Date().toISOString() }, ...prev];
    });
  }, []);

  const toggleDuaBookmark = useCallback((bookmark: Omit<DuaBookmark, 'savedAt'>) => {
    setDuaBookmarks((prev) => {
      const exists = prev.some((b) => b.key === bookmark.key);
      if (exists) return prev.filter((b) => b.key !== bookmark.key);
      return [{ ...bookmark, savedAt: new Date().toISOString() }, ...prev];
    });
  }, []);

  const toggleSeerahBookmark = useCallback((bookmark: Omit<SeerahBookmark, 'savedAt'>) => {
    setSeerahBookmarks((prev) => {
      const exists = prev.some((b) => b.key === bookmark.key);
      if (exists) return prev.filter((b) => b.key !== bookmark.key);
      return [{ ...bookmark, savedAt: new Date().toISOString() }, ...prev];
    });
  }, []);

  const toggleCompanionBookmark = useCallback((bookmark: Omit<CompanionBookmark, 'savedAt'>) => {
    setCompanionBookmarks((prev) => {
      const exists = prev.some((b) => b.key === bookmark.key);
      if (exists) return prev.filter((b) => b.key !== bookmark.key);
      return [{ ...bookmark, savedAt: new Date().toISOString() }, ...prev];
    });
  }, []);

  const updateLastRead = useCallback((pos: LastReadPosition) => {
    setLastRead(pos);
  }, []);

  const toggleSeerahEvent = useCallback((eventId: string) => {
    setCompletedSeerahIds((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  }, []);

  const setSeerahChapterCompleted = useCallback((eventIds: string[], markComplete: boolean) => {
    setCompletedSeerahIds((prev) => {
      const set = new Set(prev);
      for (const id of eventIds) {
        if (markComplete) set.add(id);
        else set.delete(id);
      }
      return Array.from(set);
    });
  }, []);

  const toggleSunnahHabit = useCallback((habitId: string) => {
    setCompletedSunnahIds((prev) =>
      prev.includes(habitId) ? prev.filter((id) => id !== habitId) : [...prev, habitId]
    );
  }, []);

  const updateSurahHifz = useCallback(
    (
      surahNumber: number,
      status: HifzStatus,
      memorizedAyahs: number,
      markReviewed = false
    ) => {
      setHifzProgress((prev) => {
        const current = prev[surahNumber];
        return {
          ...prev,
          [surahNumber]: {
            surahNumber,
            status,
            memorizedAyahs: Math.max(0, memorizedAyahs),
            lastReviewedAt:
              status === 'not_started'
                ? undefined
                : markReviewed
                  ? new Date().toISOString()
                  : current?.lastReviewedAt,
          },
        };
      });
    },
    []
  );

  const toggleFastingDate = useCallback(
    (date: string, category: FastingCategory, hijriLabel?: string) => {
      setFastingLog((prev) => {
        const exists = prev.some((e) => e.date === date);
        if (exists) {
          return prev.filter((e) => e.date !== date);
        }
        return [{ date, category, hijriLabel }, ...prev].sort((a, b) =>
          b.date.localeCompare(a.date)
        );
      });
    },
    []
  );

  const stats = useMemo(() => {
    let totalHasanat = 0;
    let totalVerses = 0;
    let totalPages = 0;
    let totalHadiths = 0;
    let totalSeconds = 0;
    let totalSecondsListened = 0;

    let weekHasanat = 0;
    let weekVerses = 0;
    let weekPages = 0;
    let weekSeconds = 0;
    let weekSecondsListened = 0;

    const isDayActive = (rec?: DailyHabitRecord) =>
      Boolean(
        rec &&
          ((rec.versesReadIds?.length || 0) > 0 ||
            (rec.hadithsReadIds?.length || 0) > 0 ||
            (rec.secondsRead || 0) >= 30 ||
            (rec.secondsListened || 0) >= 30)
      );

    for (const rec of Object.values(habitsMap)) {
      totalHasanat += rec.hasanat || 0;
      totalVerses += rec.versesReadIds?.length || 0;
      totalPages += rec.pagesReadIds?.length || 0;
      totalHadiths += rec.hadithsReadIds?.length || 0;
      totalSeconds += rec.secondsRead || 0;
      totalSecondsListened += rec.secondsListened || 0;
    }

    let streak = 0;
    const cursor = new Date();
    if (!isDayActive(habitsMap[getTodayKey(cursor)])) {
      cursor.setDate(cursor.getDate() - 1);
    }
    while (isDayActive(habitsMap[getTodayKey(cursor)])) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }

    const activeDates = Object.values(habitsMap)
      .filter((r) => isDayActive(r))
      .map((r) => r.date)
      .sort();

    let longestStreak = streak;
    let run = 0;
    let prevDate: Date | null = null;
    for (const ds of activeDates) {
      const [y, m, d] = ds.split('-').map(Number);
      const currDate = new Date(y, m - 1, d);
      if (prevDate) {
        const diffDays = Math.round(
          (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        run = diffDays === 1 ? run + 1 : 1;
      } else {
        run = 1;
      }
      if (run > longestStreak) longestStreak = run;
      prevDate = currDate;
    }

    const now = new Date();
    const dayOfWeek = now.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(now);
    monday.setDate(now.getDate() + mondayOffset);

    const weekCalendar: {
      date: string;
      dayLabel: string;
      shortChar: string;
      dayNumber: number;
      completed: boolean;
      isToday: boolean;
      hasanat: number;
    }[] = [];

    const MON_TO_SUN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const MON_CHARS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const dk = getTodayKey(d);
      const rec = habitsMap[dk];
      if (rec) {
        weekHasanat += rec.hasanat || 0;
        weekVerses += rec.versesReadIds?.length || 0;
        weekPages += rec.pagesReadIds?.length || 0;
        weekSeconds += rec.secondsRead || 0;
        weekSecondsListened += rec.secondsListened || 0;
      }
      weekCalendar.push({
        date: dk,
        dayLabel: MON_TO_SUN[i],
        shortChar: MON_CHARS[i],
        dayNumber: d.getDate(),
        completed: isDayActive(rec),
        isToday: dk === todayKey,
        hasanat: rec?.hasanat || 0,
      });
    }

    // Build complete Day 1 -> Today daily history series for Progress Line Graphs
    const [fy, fm, fd] = firstUsedDate.split('-').map(Number);
    const startDt = new Date(fy, fm - 1, fd);
    const [ty, tm, td] = todayKey.split('-').map(Number);
    const endDt = new Date(ty, tm - 1, td);
    const diffTotalDays = Math.max(
      0,
      Math.min(365, Math.round((endDt.getTime() - startDt.getTime()) / (1000 * 60 * 60 * 24)))
    );

    const dailyHistory: {
      date: string;
      shortLabel: string;
      hasanat: number;
      verses: number;
      readingMinutes: number;
      readingSeconds: number;
      pages: number;
      listeningMinutes: number;
      listeningSeconds: number;
      isActive: boolean;
    }[] = [];

    for (let offset = diffTotalDays; offset >= 0; offset--) {
      const d = new Date(endDt);
      d.setDate(endDt.getDate() - offset);
      const dk = getTodayKey(d);
      const rec = habitsMap[dk];
      const readSec = rec?.secondsRead || 0;
      const listenSec = rec?.secondsListened || 0;
      dailyHistory.push({
        date: dk,
        shortLabel: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        hasanat: rec?.hasanat || 0,
        verses: rec?.versesReadIds?.length || 0,
        readingMinutes: Math.round((readSec / 60) * 10) / 10,
        readingSeconds: readSec,
        pages: rec?.pagesReadIds?.length || 0,
        listeningMinutes: Math.round((listenSec / 60) * 10) / 10,
        listeningSeconds: listenSec,
        isActive: isDayActive(rec),
      });
    }

    return {
      firstUsedDate,
      totalHasanat,
      totalVerses,
      totalPages,
      totalHadiths,
      totalSeconds,
      totalSecondsListened,
      weekHasanat,
      weekVerses,
      weekPages,
      weekSeconds,
      weekSecondsListened,
      streak,
      longestStreak,
      weekCalendar,
      activeDates,
      dailyHistory,
    };
  }, [firstUsedDate, habitsMap, todayKey]);

  return {
    settings,
    updateSettings,
    updateNotifications,
    updateSalahSettings,
    toggleTheme,
    goals,
    updateGoals,
    todayRecord,
    stats,
    markVerseRead,
    toggleVerseRead,
    markVersesBatchRead,
    toggleHadithRead,
    addReadingSeconds,
    addListeningSeconds,
    dhikrCounts,
    incrementDhikr,
    resetDhikr,
    quranBookmarks,
    hadithBookmarks,
    duaBookmarks,
    seerahBookmarks,
    companionBookmarks,
    toggleQuranBookmark,
    toggleHadithBookmark,
    toggleDuaBookmark,
    toggleSeerahBookmark,
    toggleCompanionBookmark,
    lastRead,
    updateLastRead,
    completedSeerahIds,
    toggleSeerahEvent,
    setSeerahChapterCompleted,
    completedSunnahIds,
    toggleSunnahHabit,
    hifzProgress,
    updateSurahHifz,
    fastingLog,
    toggleFastingDate,
  };
}
