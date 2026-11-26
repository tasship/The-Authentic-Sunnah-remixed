import React, { useEffect, useState } from 'react';
import {
  Bell,
  BellRing,
  BookOpen,
  Check,
  Clock,
  Compass,
  Loader2,
  Lock,
  MapPin,
  Monitor,
  Moon,
  Palette,
  RotateCcw,
  Sparkles,
  Sun,
  Trash2,
  Volume2,
} from 'lucide-react';
import { DARK_THEMES, LIGHT_THEMES, METALLIC_THEMES, ThemeMeta } from '../config/themes';
import { YOUTUBE_CONFIG } from '../config/youtubeConfig';
import {
  ENGLISH_TRANSLATORS,
  QURAN_RECITERS,
  QURAN_SCRIPTS,
  ROMAN_URDU_TRANSLATORS,
  URDU_TRANSLATORS,
} from '../services/quranApi';
import {
  CURATED_SALAH_CITIES,
  formatPrayerTime12h,
  OBLIGATORY_PRAYER_IDS,
  SALAH_CALCULATION_METHODS,
  SALAH_PRAYER_META,
} from '../services/salahApi';
import {
  CompanionBookmark,
  DailyGoals,
  DarkThemeId,
  DailySalahTimings,
  DuaBookmark,
  EnglishTranslatorId,
  HadithBookmark,
  LightThemeId,
  MetallicThemeId,
  NotificationSettings,
  QuranBookmark,
  QuranReaderMode,
  QuranReciterId,
  QuranScript,
  ReaderSettings,
  RomanUrduTranslatorId,
  SalahAlertLeadMinutes,
  SalahPrayerId,
  SalahSettings,
  SeerahBookmark,
  SeerahEra,
  TafsirLanguage,
  ThemeChoice,
  ThemeMode,
  TranslationDisplay,
  UrduTranslatorId,
} from '../types';
import { getLanguageFlags } from '../utils/languageDisplay';
import { PWAInstallButton } from './PWAInstallButton';

interface SavedSettingsProps {
  settings: ReaderSettings;
  onUpdateSettings: (patch: Partial<ReaderSettings>) => void;
  onUpdateNotifications: (patch: Partial<NotificationSettings>) => void;
  onUpdateSalahSettings: (patch: Partial<SalahSettings>) => void;
  goals: DailyGoals;
  onUpdateGoals: (patch: Partial<DailyGoals>) => void;
  quranBookmarks: QuranBookmark[];
  hadithBookmarks: HadithBookmark[];
  duaBookmarks: DuaBookmark[];
  seerahBookmarks: SeerahBookmark[];
  companionBookmarks: CompanionBookmark[];
  onRemoveQuranBookmark: (b: Omit<QuranBookmark, 'savedAt'>) => void;
  onRemoveHadithBookmark: (b: Omit<HadithBookmark, 'savedAt'>) => void;
  onRemoveDuaBookmark: (b: Omit<DuaBookmark, 'savedAt'>) => void;
  onRemoveSeerahBookmark: (b: Omit<SeerahBookmark, 'savedAt'>) => void;
  onRemoveCompanionBookmark: (b: Omit<CompanionBookmark, 'savedAt'>) => void;
  onOpenQuran: (surahNumber: number, ayahNumber?: number) => void;
  onOpenSeerahChapter: (era: SeerahEra) => void;
  onOpenCompanion: (sahabiId: string) => void;
  notificationsState: {
    permission: NotificationPermission | 'unsupported';
    requestPermission: () => Promise<NotificationPermission | 'unsupported'>;
    sendTestNotification: () => Promise<void>;
    sendSadaqahPreviewNotification: () => Promise<void>;
    sendSalahTestNotification: () => Promise<void>;
  };
  salahState: {
    dailyTimings: DailySalahTimings | null;
    locatingGps: boolean;
    timingsError: string | null;
    onDetectGps: () => Promise<unknown>;
  };
}

export const SavedSettings: React.FC<SavedSettingsProps> = ({
  settings,
  onUpdateSettings,
  onUpdateNotifications,
  onUpdateSalahSettings,
  goals,
  onUpdateGoals,
  quranBookmarks,
  hadithBookmarks,
  duaBookmarks,
  seerahBookmarks,
  companionBookmarks,
  onRemoveQuranBookmark,
  onRemoveHadithBookmark,
  onRemoveDuaBookmark,
  onRemoveSeerahBookmark,
  onRemoveCompanionBookmark,
  onOpenQuran,
  onOpenSeerahChapter,
  onOpenCompanion,
  notificationsState,
  salahState,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'settings' | 'bookmarks'>('settings');
  const [ytInput, setYtInput] = useState(settings.youtubeChannelId);
  const [ytSavedMsg, setYtSavedMsg] = useState(false);
  const [testSentMsg, setTestSentMsg] = useState(false);
  const [salahTestMsg, setSalahTestMsg] = useState(false);
  const [cityInput, setCityInput] = useState(settings.salah.city);
  const [countryInput, setCountryInput] = useState(settings.salah.country);
  const [citySavedMsg, setCitySavedMsg] = useState(false);
  const [gpsStatusMsg, setGpsStatusMsg] = useState<string | null>(null);
  const [themeTab, setThemeTab] = useState<'all' | 'metallic' | 'light' | 'dark'>('all');

  useEffect(() => {
    setCityInput(settings.salah.city);
    setCountryInput(settings.salah.country);
  }, [settings.salah.city, settings.salah.country]);

  const handleSaveChannel = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = ytInput.trim() || YOUTUBE_CONFIG.DEFAULT_YOUTUBE_CHANNEL_ID;
    onUpdateSettings({ youtubeChannelId: cleaned });
    setYtInput(cleaned);
    setYtSavedMsg(true);
    window.setTimeout(() => setYtSavedMsg(false), 2000);
  };

  const handleSendTest = async () => {
    if (notificationsState.permission !== 'granted') {
      const res = await notificationsState.requestPermission();
      if (res !== 'granted') return;
    }
    await notificationsState.sendTestNotification();
    setTestSentMsg(true);
    window.setTimeout(() => setTestSentMsg(false), 2500);
  };

  const handleSendSalahTest = async () => {
    if (notificationsState.permission !== 'granted') {
      const res = await notificationsState.requestPermission();
      if (res !== 'granted') return;
    }
    await notificationsState.sendSalahTestNotification();
    setSalahTestMsg(true);
    window.setTimeout(() => setSalahTestMsg(false), 2500);
  };

  const handleDetectGpsLocation = async () => {
    setGpsStatusMsg(null);
    try {
      await salahState.onDetectGps();
      setGpsStatusMsg('GPS coordinates synced successfully.');
      window.setTimeout(() => setGpsStatusMsg(null), 3000);
    } catch {
      setGpsStatusMsg('GPS permission unavailable — enter a manual city below.');
    }
  };

  const handleApplyManualCity = (e: React.FormEvent) => {
    e.preventDefault();
    const city = cityInput.trim();
    const country = countryInput.trim();
    if (!city) return;
    onUpdateSalahSettings({
      locationMode: 'manual',
      city,
      country,
      latitude: undefined,
      longitude: undefined,
    });
    setCitySavedMsg(true);
    window.setTimeout(() => setCitySavedMsg(false), 2000);
  };

  const totalBookmarks =
    quranBookmarks.length +
    hadithBookmarks.length +
    duaBookmarks.length +
    seerahBookmarks.length +
    companionBookmarks.length;
  const { showEnglish, showUrdu, showRomanUrdu } = getLanguageFlags(settings.translationDisplay);

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#092A1B] dark:text-[#FAF6EB]">
            Settings &amp; Bookmarks
          </h1>
          <p className="text-xs sm:text-sm text-[#365645] dark:text-[#CEC5AD] mt-0.5">
            Arabic script, Roman transliteration, English · Urdu · Roman Urdu, Tafsir, themes &amp; goals
          </p>
        </div>

        <div className="inline-flex rounded-xl p-1 bg-[#F2EDE0] dark:bg-[#0A3321] border border-[#B0891E]/20 dark:border-[#D4AF37]/20 self-start">
          <button
            onClick={() => setActiveSubTab('settings')}
            className={`min-h-[40px] px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeSubTab === 'settings'
                ? 'bg-[#D4AF37] text-[#04180F]'
                : 'text-[#365645] dark:text-[#CEC5AD]'
            }`}
          >
            Preferences
          </button>
          <button
            onClick={() => setActiveSubTab('bookmarks')}
            className={`min-h-[40px] px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeSubTab === 'bookmarks'
                ? 'bg-[#D4AF37] text-[#04180F]'
                : 'text-[#365645] dark:text-[#CEC5AD]'
            }`}
          >
            Bookmarks ({totalBookmarks})
          </button>
        </div>
      </div>

      <PWAInstallButton variant="card" />

      {activeSubTab === 'bookmarks' ? (
        <div className="space-y-8">
          {/* Saved Quran Verses */}
          <section className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-[#092A1B] dark:text-[#FAF6EB]">
              Saved Quran Verses ({quranBookmarks.length})
            </h2>
            {quranBookmarks.length === 0 ? (
              <div className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#062115] p-6 text-sm text-[#365645] dark:text-[#CEC5AD]">
                No Quran verses bookmarked yet.
              </div>
            ) : (
              <div className="space-y-3">
                {quranBookmarks.map((b) => (
                  <div
                    key={b.key}
                    className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#062115] p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[#B0891E] dark:text-[#D4AF37]">
                        Surah {b.surahName} ({b.key})
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onOpenQuran(b.surahNumber, b.ayahNumber)}
                          className="min-h-[36px] px-3 py-1 rounded-lg bg-[#D4AF37]/15 text-xs font-semibold text-[#B0891E] dark:text-[#F3E5AB] inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          Open Verse
                        </button>
                        <button
                          onClick={() => onRemoveQuranBookmark(b)}
                          aria-label="Remove bookmark"
                          className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-[#365645] dark:text-[#CEC5AD] hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {settings.showArabic && (
                      <p dir="rtl" className="font-arabic-quran text-2xl leading-[2] text-right">
                        {b.arabicText}
                      </p>
                    )}
                    {showEnglish && (
                      <p className="text-sm text-[#365645] dark:text-[#CEC5AD]">{b.englishText}</p>
                    )}
                    {showUrdu && b.urduText && (
                      <p dir="rtl" className="font-urdu text-base text-right leading-loose">
                        {b.urduText}
                      </p>
                    )}
                    {showRomanUrdu && b.englishText && (
                      <p className="text-sm text-[#365645] dark:text-[#F3E5AB]/95">
                        {b.englishText}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Saved Duas */}
          <section className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-[#092A1B] dark:text-[#FAF6EB]">
              Saved Duas ({duaBookmarks.length})
            </h2>
            {duaBookmarks.length === 0 ? (
              <div className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#062115] p-6 text-sm text-[#365645] dark:text-[#CEC5AD]">
                No Duas bookmarked yet.
              </div>
            ) : (
              <div className="space-y-3">
                {duaBookmarks.map((b) => (
                  <div
                    key={b.key}
                    className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#062115] p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[#B0891E] dark:text-[#D4AF37]">
                        {b.title} · {b.category}
                      </span>
                      <button
                        onClick={() => onRemoveDuaBookmark(b)}
                        aria-label="Remove saved Dua"
                        className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-[#365645] dark:text-[#CEC5AD] hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {settings.showArabic && (
                      <p dir="rtl" className="font-arabic-quran text-xl leading-[2] text-right">
                        {b.arabic}
                      </p>
                    )}
                    {showEnglish && (
                      <p className="text-sm text-[#365645] dark:text-[#CEC5AD]">{b.english}</p>
                    )}
                    {showUrdu && b.urdu && (
                      <p dir="rtl" className="font-urdu text-base text-right leading-loose">
                        {b.urdu}
                      </p>
                    )}
                    {showRomanUrdu && b.english && (
                      <p className="text-sm text-[#365645] dark:text-[#F3E5AB]/95">
                        {b.english}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Saved Hadiths (English & Urdu Only — No Arabic) */}
          <section className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-[#092A1B] dark:text-[#FAF6EB]">
              Saved Hadiths ({hadithBookmarks.length})
            </h2>
            {hadithBookmarks.length === 0 ? (
              <div className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#062115] p-6 text-sm text-[#365645] dark:text-[#CEC5AD]">
                No Hadiths bookmarked yet.
              </div>
            ) : (
              <div className="space-y-3">
                {hadithBookmarks.map((b) => (
                  <div
                    key={b.key}
                    className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#062115] p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[#B0891E] dark:text-[#D4AF37]">
                        {b.collectionName} · Hadith #{b.hadithNumber}
                      </span>
                      <button
                        onClick={() => onRemoveHadithBookmark(b)}
                        aria-label="Remove saved Hadith"
                        className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-[#365645] dark:text-[#CEC5AD] hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {showEnglish && (
                      <p className="text-sm text-[#365645] dark:text-[#CEC5AD] whitespace-pre-line">
                        {b.englishText}
                      </p>
                    )}
                    {showUrdu && b.urduText && (
                      <p dir="rtl" className="font-urdu text-base text-right leading-loose">
                        {b.urduText}
                      </p>
                    )}
                    {showRomanUrdu && b.englishText && (
                      <p className="text-sm text-[#365645] dark:text-[#F3E5AB]/95 whitespace-pre-line">
                        {b.englishText}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Saved Seerah Chapters */}
          <section className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-[#092A1B] dark:text-[#FAF6EB]">
              Saved Seerah Chapters ({seerahBookmarks.length})
            </h2>
            {seerahBookmarks.length === 0 ? (
              <div className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#062115] p-6 text-sm text-[#365645] dark:text-[#CEC5AD]">
                No Seerah chapters bookmarked yet.
              </div>
            ) : (
              <div className="space-y-3">
                {seerahBookmarks.map((b) => (
                  <div
                    key={b.key}
                    className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#062115] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-[#B0891E] dark:text-[#D4AF37] tabular-nums">
                        Chapter {b.chapterNumber} · {b.span}
                      </span>
                      {showEnglish && (
                        <p className="font-display text-base font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                          {b.title}
                        </p>
                      )}
                      {showUrdu && (
                        <p dir="rtl" className="font-urdu text-lg text-right text-[#B0891E] dark:text-[#F3E5AB]">
                          {b.urduTitle}
                        </p>
                      )}
                      {showRomanUrdu && !showEnglish && (
                        <p className="font-display text-base font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                          {b.title}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onOpenSeerahChapter(b.key as SeerahEra)}
                        className="min-h-[38px] px-3.5 py-1.5 rounded-lg bg-[#D4AF37]/15 text-xs font-semibold text-[#B0891E] dark:text-[#F3E5AB] inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        Open Chapter
                      </button>
                      <button
                        onClick={() => onRemoveSeerahBookmark(b)}
                        aria-label="Remove saved Seerah chapter"
                        className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg text-[#365645] dark:text-[#CEC5AD] hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Saved Companions */}
          <section className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-[#092A1B] dark:text-[#FAF6EB]">
              Saved Companions ({companionBookmarks.length})
            </h2>
            {companionBookmarks.length === 0 ? (
              <div className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#062115] p-6 text-sm text-[#365645] dark:text-[#CEC5AD]">
                No Companions bookmarked yet.
              </div>
            ) : (
              <div className="space-y-3">
                {companionBookmarks.map((b) => (
                  <div
                    key={b.key}
                    className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#062115] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-[#B0891E] dark:text-[#D4AF37]">
                        {b.category}
                      </span>
                      <p className="font-display text-base font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                        {b.name}
                      </p>
                      {showUrdu && (
                        <p dir="rtl" className="font-urdu text-lg text-right text-[#B0891E] dark:text-[#F3E5AB]">
                          {b.nameUrdu}
                        </p>
                      )}
                      {showRomanUrdu && (
                        <p className="text-xs font-medium text-[#B0891E] dark:text-[#F3E5AB]">
                          {b.name}
                        </p>
                      )}
                      <p className="text-xs text-[#365645] dark:text-[#CEC5AD]">{b.honorific}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onOpenCompanion(b.key)}
                        className="min-h-[38px] px-3.5 py-1.5 rounded-lg bg-[#D4AF37]/15 text-xs font-semibold text-[#B0891E] dark:text-[#F3E5AB] inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        Open Bio
                      </button>
                      <button
                        onClick={() => onRemoveCompanionBookmark(b)}
                        aria-label="Remove saved Companion"
                        className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg text-[#365645] dark:text-[#CEC5AD] hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 1. Reader Display, Script & Font Sliders */}
          <section className="rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] p-6 space-y-5">
            <h2 className="font-display text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB]">
              Quran Reader &amp; Typography
            </h2>

            {/* Arabic Script Visibility (Enable / Disable) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-[#F9F6EE]/70 dark:bg-[#04180F]/60 p-3.5">
              <div>
                <p className="text-sm font-semibold">Arabic Script Visibility</p>
                <p className="text-xs text-[#365645] dark:text-[#CEC5AD]">
                  Enable or disable Arabic script across Quran, Dhikr, Duas &amp; Asma-ul-Husna
                </p>
              </div>
              <div className="inline-flex rounded-xl p-1 bg-[#F2EDE0] dark:bg-[#0A3321] border border-[#D4AF37]/25 shrink-0 self-start sm:self-center">
                <button
                  type="button"
                  onClick={() => onUpdateSettings({ showArabic: true })}
                  className={`min-h-[36px] px-3.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    settings.showArabic
                      ? 'bg-[#D4AF37] text-[#04180F]'
                      : 'text-[#365645] dark:text-[#CEC5AD]'
                  }`}
                >
                  Enable
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateSettings({ showArabic: false })}
                  className={`min-h-[36px] px-3.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    !settings.showArabic
                      ? 'bg-[#D4AF37] text-[#04180F]'
                      : 'text-[#365645] dark:text-[#CEC5AD]'
                  }`}
                >
                  Disable
                </button>
              </div>
            </div>

            {/* Roman Arabic Transliteration (Enable / Disable) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-[#F9F6EE]/70 dark:bg-[#04180F]/60 p-3.5">
              <div>
                <p className="text-sm font-semibold">Roman Arabic Transliteration</p>
                <p className="text-xs text-[#365645] dark:text-[#CEC5AD]">
                  Show Latin/Romanized pronunciation (e.g. Qul huwallahu ahad) in Quran, Adhkar &amp; Duas
                </p>
              </div>
              <div className="inline-flex rounded-xl p-1 bg-[#F2EDE0] dark:bg-[#0A3321] border border-[#D4AF37]/25 shrink-0 self-start sm:self-center">
                <button
                  type="button"
                  onClick={() => onUpdateSettings({ showTransliteration: true })}
                  className={`min-h-[36px] px-3.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    settings.showTransliteration
                      ? 'bg-[#D4AF37] text-[#04180F]'
                      : 'text-[#365645] dark:text-[#CEC5AD]'
                  }`}
                >
                  Enable
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateSettings({ showTransliteration: false })}
                  className={`min-h-[36px] px-3.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    !settings.showTransliteration
                      ? 'bg-[#D4AF37] text-[#04180F]'
                      : 'text-[#365645] dark:text-[#CEC5AD]'
                  }`}
                >
                  Disable
                </button>
              </div>
            </div>

            {/* Default Quran Reader Layout */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">Default Quran Reader Mode</p>
                <p className="text-xs text-[#365645] dark:text-[#CEC5AD]">
                  Single-Ayah focus card or continuous scroll
                </p>
              </div>
              <div className="inline-flex rounded-xl p-1 bg-[#F2EDE0] dark:bg-[#0A3321] border border-[#D4AF37]/25 shrink-0">
                {(
                  [
                    { id: 'card', label: 'Card' },
                    { id: 'scroll', label: 'Scroll' },
                  ] as { id: QuranReaderMode; label: string }[]
                ).map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => onUpdateSettings({ quranReaderMode: mode.id })}
                    className={`min-h-[38px] px-3 rounded-lg text-xs font-semibold cursor-pointer ${
                      settings.quranReaderMode === mode.id
                        ? 'bg-[#D4AF37] text-[#04180F]'
                        : 'text-[#365645] dark:text-[#CEC5AD]'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quran Script */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-[#365645] dark:text-[#CEC5AD]">
                Quran Arabic Script
              </p>
              <div className="space-y-2">
                {QURAN_SCRIPTS.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => onUpdateSettings({ quranScript: sc.id as QuranScript })}
                    className={`w-full text-left rounded-xl border p-3 transition-colors cursor-pointer ${
                      settings.quranScript === sc.id
                        ? 'border-[#D4AF37] bg-[#D4AF37]/12'
                        : 'border-[#B0891E]/20 dark:border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <p className="text-sm font-semibold text-[#092A1B] dark:text-[#FAF6EB]">
                      {sc.label}
                    </p>
                    <p className="text-xs text-[#365645] dark:text-[#CEC5AD] mt-0.5">
                      {sc.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">Arabic Typeface</p>
                <p className="text-xs text-[#365645] dark:text-[#CEC5AD]">
                  Classical Naskh typography
                </p>
              </div>
              <div className="inline-flex rounded-xl p-1 bg-[#F2EDE0] dark:bg-[#0A3321] border border-[#D4AF37]/25">
                <button
                  onClick={() => onUpdateSettings({ arabicFont: 'amiri' })}
                  className={`min-h-[38px] px-3 rounded-lg text-xs font-semibold cursor-pointer ${
                    settings.arabicFont === 'amiri'
                      ? 'bg-[#D4AF37] text-[#04180F]'
                      : 'text-[#365645] dark:text-[#CEC5AD]'
                  }`}
                >
                  Amiri
                </button>
                <button
                  onClick={() => onUpdateSettings({ arabicFont: 'scheherazade' })}
                  className={`min-h-[38px] px-3 rounded-lg text-xs font-semibold cursor-pointer ${
                    settings.arabicFont === 'scheherazade'
                      ? 'bg-[#D4AF37] text-[#04180F]'
                      : 'text-[#365645] dark:text-[#CEC5AD]'
                  }`}
                >
                  Scheherazade
                </button>
              </div>
            </div>

            {/* Three Independent Font Size Sliders */}
            <div className="space-y-3.5 pt-1">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span>Arabic Font Size</span>
                  <span className="tabular-nums text-[#B0891E] dark:text-[#F3E5AB]">
                    {settings.arabicFontSize}px
                  </span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={44}
                  value={settings.arabicFontSize}
                  onChange={(e) => onUpdateSettings({ arabicFontSize: Number(e.target.value) })}
                  className="w-full accent-[#D4AF37]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span>English Font Size</span>
                  <span className="tabular-nums text-[#B0891E] dark:text-[#F3E5AB]">
                    {settings.englishFontSize}px
                  </span>
                </div>
                <input
                  type="range"
                  min={13}
                  max={22}
                  value={settings.englishFontSize}
                  onChange={(e) => onUpdateSettings({ englishFontSize: Number(e.target.value) })}
                  className="w-full accent-[#D4AF37]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span>Urdu Font Size (اردو)</span>
                  <span className="tabular-nums text-[#B0891E] dark:text-[#F3E5AB]">
                    {settings.urduFontSize}px
                  </span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={28}
                  value={settings.urduFontSize}
                  onChange={(e) => onUpdateSettings({ urduFontSize: Number(e.target.value) })}
                  className="w-full accent-[#D4AF37]"
                />
              </div>
            </div>

            {/* Quran Audio Reciter & Auto-Advance */}
            <div className="space-y-3 pt-1 border-t border-[#B0891E]/15 dark:border-[#D4AF37]/15">
              <label className="block space-y-1.5 pt-2">
                <span className="text-xs font-semibold text-[#365645] dark:text-[#CEC5AD] inline-flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Quran Audio Reciter</span>
                </span>
                <select
                  value={settings.quranReciter}
                  onChange={(e) =>
                    onUpdateSettings({ quranReciter: e.target.value as QuranReciterId })
                  }
                  className="w-full min-h-[44px] px-3.5 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-[#F9F6EE] dark:bg-[#04180F] text-sm"
                >
                  {QURAN_RECITERS.map((rec) => (
                    <option key={rec.id} value={rec.id}>
                      {rec.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex items-center justify-between gap-4 cursor-pointer">
                <div>
                  <p className="text-sm font-semibold">Auto-Advance Next Ayah Audio</p>
                  <p className="text-xs text-[#365645] dark:text-[#CEC5AD]">
                    Automatically advance and play the next verse after recitation finishes
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoAdvanceAudio}
                  onChange={(e) => onUpdateSettings({ autoAdvanceAudio: e.target.checked })}
                  className="w-5 h-5 accent-[#D4AF37]"
                />
              </label>
            </div>

            <label className="flex items-center justify-between gap-4 pt-1 cursor-pointer">
              <div>
                <p className="text-sm font-semibold">Auto-Track Scroll Reading</p>
                <p className="text-xs text-[#365645] dark:text-[#CEC5AD]">
                  Count Ayahs, Pages, and Hasanat automatically in Scroll Mode
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoTrackScroll}
                onChange={(e) => onUpdateSettings({ autoTrackScroll: e.target.checked })}
                className="w-5 h-5 accent-[#D4AF37]"
              />
            </label>
          </section>

          {/* 2. Translation & Language Preferences + Theme */}
          <div className="space-y-6">
            <section className="rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] p-6 space-y-4">
              <h2 className="font-display text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                Translations &amp; Languages
              </h2>

              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-[#365645] dark:text-[#CEC5AD]">
                  Global Language Preference (Quran, Hadith, Seerah, Salaf, Prophets, Dhikr, Duas &amp; Quiz)
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(
                    [
                      { id: 'english', label: 'English' },
                      { id: 'urdu', label: 'Urdu (اردو)' },
                      { id: 'roman_urdu', label: 'Roman Urdu' },
                      { id: 'both', label: 'Both (EN + اردو)' },
                    ] as { id: TranslationDisplay; label: string }[]
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => onUpdateSettings({ translationDisplay: opt.id })}
                      className={`min-h-[40px] px-2.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                        settings.translationDisplay === opt.id
                          ? 'bg-[#D4AF37] text-[#04180F]'
                          : 'border border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-[#365645] dark:text-[#CEC5AD]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-[#365645] dark:text-[#CEC5AD]">
                  English Quran Translator
                </span>
                <select
                  value={settings.englishTranslator}
                  onChange={(e) =>
                    onUpdateSettings({
                      englishTranslator: e.target.value as EnglishTranslatorId,
                    })
                  }
                  className="w-full min-h-[44px] px-3.5 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-[#F9F6EE] dark:bg-[#04180F] text-sm"
                >
                  {ENGLISH_TRANSLATORS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-[#365645] dark:text-[#CEC5AD]">
                  Urdu Quran Translator (اردو ترجمہ)
                </span>
                <select
                  value={settings.urduTranslator}
                  onChange={(e) =>
                    onUpdateSettings({ urduTranslator: e.target.value as UrduTranslatorId })
                  }
                  className="w-full min-h-[44px] px-3.5 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-[#F9F6EE] dark:bg-[#04180F] text-sm"
                >
                  {URDU_TRANSLATORS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-[#365645] dark:text-[#CEC5AD]">
                  Roman Urdu Quran Edition (Certified)
                </span>
                <select
                  value={settings.romanUrduTranslator}
                  onChange={(e) =>
                    onUpdateSettings({
                      romanUrduTranslator: e.target.value as RomanUrduTranslatorId,
                    })
                  }
                  className="w-full min-h-[44px] px-3.5 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-[#F9F6EE] dark:bg-[#04180F] text-sm"
                >
                  {ROMAN_URDU_TRANSLATORS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div>
                  <p className="text-sm font-semibold">Tafsir Language</p>
                  <p className="text-xs text-[#365645] dark:text-[#CEC5AD]">
                    English Ibn Kathir or Urdu Ibn Kathir / Bayan-ul-Quran inside Ayah drawer
                  </p>
                </div>
                <div className="inline-flex rounded-xl p-1 bg-[#F2EDE0] dark:bg-[#0A3321] border border-[#D4AF37]/25 shrink-0 self-start sm:self-center">
                  {(['en', 'ur'] as TafsirLanguage[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => onUpdateSettings({ tafsirLanguage: lang })}
                      className={`min-h-[36px] px-3 rounded-lg text-xs font-semibold cursor-pointer ${
                        settings.tafsirLanguage === lang
                          ? 'bg-[#D4AF37] text-[#04180F]'
                          : 'text-[#365645] dark:text-[#CEC5AD]'
                      }`}
                    >
                      {lang === 'en' ? 'English · Ibn Kathir' : 'اردو · Ibn Kathir / Bayan'}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Visual Theme & Appearance Hub (23 Handcrafted Sanctuary & Metallic Themes) */}
            <section className="rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] p-6 space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB] flex items-center gap-2">
                    <Palette className="w-5 h-5 text-[#D4AF37]" />
                    <span>Visual Theme &amp; Appearance</span>
                  </h2>
                  <p className="text-xs text-[#365645] dark:text-[#CEC5AD] mt-0.5">
                    Choose from 23 handcrafted aesthetics (2 Master Metallic Picks, 10 Light, 10 Dark, or System Default) persisted locally in IndexedDB
                  </p>
                </div>

                {/* Filter Tabs */}
                <div className="inline-flex p-1 rounded-xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-black/5 dark:bg-white/5 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setThemeTab('all')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      themeTab === 'all'
                        ? 'bg-[#D4AF37] text-[#09090B] font-bold shadow-sm'
                        : 'text-[#365645] dark:text-[#CEC5AD] hover:text-[#092A1B] dark:hover:text-[#FAF6EB]'
                    }`}
                  >
                    All (23)
                  </button>
                  <button
                    type="button"
                    onClick={() => setThemeTab('metallic')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      themeTab === 'metallic'
                        ? 'bg-[#D4AF37] text-[#09090B] font-bold shadow-sm'
                        : 'text-[#365645] dark:text-[#CEC5AD] hover:text-[#092A1B] dark:hover:text-[#FAF6EB]'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>2 Metallic</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setThemeTab('light')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      themeTab === 'light'
                        ? 'bg-[#D4AF37] text-[#09090B] font-bold shadow-sm'
                        : 'text-[#365645] dark:text-[#CEC5AD] hover:text-[#092A1B] dark:hover:text-[#FAF6EB]'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>10 Light</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setThemeTab('dark')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      themeTab === 'dark'
                        ? 'bg-[#D4AF37] text-[#09090B] font-bold shadow-sm'
                        : 'text-[#365645] dark:text-[#CEC5AD] hover:text-[#092A1B] dark:hover:text-[#FAF6EB]'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>10 Dark</span>
                  </button>
                </div>
              </div>

              {/* 1. System Default Card */}
              <button
                type="button"
                onClick={() => onUpdateSettings({ theme: 'system_default' })}
                className={`w-full text-left rounded-2xl border p-4 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  settings.theme === 'system_default'
                    ? 'border-[#D4AF37] bg-[#D4AF37]/12 shadow-[0_0_14px_rgba(212,175,55,0.22)]'
                    : 'border-[#B0891E]/20 dark:border-[#D4AF37]/20 hover:border-[#D4AF37]/50 bg-white/40 dark:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span
                    aria-hidden="true"
                    className="w-11 h-11 rounded-xl border border-[#D4AF37]/40 bg-gradient-to-br from-[#FAF8F5] to-[#09090B] flex items-center justify-center shrink-0 shadow-sm"
                  >
                    <Monitor className="w-5 h-5 text-[#D4AF37]" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                        System Default
                      </p>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#B0891E] dark:text-[#F3E5AB]">
                        · Auto Hardware Sync
                      </span>
                    </div>
                    <p className="text-xs text-[#365645] dark:text-[#CEC5AD] mt-0.5 leading-snug">
                      Automatically synchronizes with your device operating system setting
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {settings.theme === 'system_default' && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#D4AF37]">
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Active</span>
                    </span>
                  )}
                </div>
              </button>

              {/* 2. TAS Master Metallic Themes (2 Top Exclusive Picks) */}
              {(themeTab === 'all' || themeTab === 'metallic') && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#B0891E] dark:text-[#D4AF37] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>TAS Master Metallic Themes (2 Top Exclusive Picks)</span>
                    </h3>
                    <span className="text-[11px] text-[#365645] dark:text-[#CEC5AD]">
                      Liquid Gold &amp; Shimmering Platinum Chrome
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {METALLIC_THEMES.map((t) => {
                      const selected = settings.theme === t.id;
                      const isGold = t.id === 'full_shining_gold';
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() =>
                            onUpdateSettings({
                              theme: t.id,
                            })
                          }
                          className={`text-left rounded-xl border p-3.5 transition-all cursor-pointer flex items-start gap-3.5 group relative overflow-hidden ${
                            selected
                              ? isGold
                                ? 'border-[#D4AF37] bg-gradient-to-br from-[#FFF9E6]/80 to-[#FFF3CD]/60 shadow-[0_0_18px_rgba(212,175,55,0.35)] dark:from-[#332505]/50 dark:to-[#1a1303]/60'
                                : 'border-[#94A3B8] bg-gradient-to-br from-[#F1F5F9]/80 to-[#E2E8F0]/60 shadow-[0_0_18px_rgba(148,163,184,0.35)] dark:from-[#1E293B]/50 dark:to-[#0F172A]/60'
                              : 'border-[#B0891E]/25 dark:border-[#D4AF37]/25 hover:border-[#D4AF37]/70 bg-white/40 dark:bg-white/5'
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className="w-12 h-12 rounded-xl border shrink-0 p-1 flex flex-col justify-between shadow-sm relative overflow-hidden"
                            style={{
                              backgroundColor: t.previewBg,
                              borderColor: t.previewAccent,
                            }}
                          >
                            <span
                              className="w-full h-4 rounded-md border flex items-center px-1 text-[8px] font-bold"
                              style={{
                                backgroundColor: t.previewCard,
                                borderColor: t.previewAccent,
                                color: t.previewText,
                              }}
                            >
                              Aa
                            </span>
                            <span
                              className="w-2.5 h-2.5 rounded-full border self-end"
                              style={{
                                backgroundColor: t.previewAccent,
                                borderColor: '#FAF6EB',
                              }}
                            />
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <p className="text-xs font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                                {t.name}
                              </p>
                              <span className="text-[9px] font-extrabold uppercase tracking-wide text-[#B0891E] dark:text-[#F3E5AB]">
                                · TAS Top Pick
                              </span>
                              {selected && (
                                <Check className="w-3.5 h-3.5 text-[#D4AF37] ml-auto shrink-0 stroke-[3]" />
                              )}
                            </div>
                            <p className="text-[11px] text-[#365645] dark:text-[#CEC5AD] mt-1 leading-snug">
                              {t.subtitle}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 2. Light Themes (10 Handcrafted Aesthetics) */}
              {(themeTab === 'all' || themeTab === 'light') && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#B0891E] dark:text-[#D4AF37] flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5" />
                      <span>Light Themes (10 Handcrafted Aesthetics)</span>
                    </h3>
                    <span className="text-[11px] text-[#365645] dark:text-[#CEC5AD]">
                      Daylight Clarity &amp; Manuscript Parchment
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {LIGHT_THEMES.map((t) => {
                      const selected = settings.theme === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() =>
                            onUpdateSettings({
                              theme: t.id,
                              lastLightTheme: t.id as LightThemeId,
                            })
                          }
                          className={`text-left rounded-xl border p-3.5 transition-all cursor-pointer flex items-start gap-3.5 group ${
                            selected
                              ? 'border-[#D4AF37] bg-[#D4AF37]/12 shadow-[0_0_14px_rgba(212,175,55,0.2)]'
                              : 'border-[#B0891E]/20 dark:border-[#D4AF37]/20 hover:border-[#D4AF37]/60 bg-white/40 dark:bg-white/5'
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className="w-12 h-12 rounded-xl border shrink-0 p-1 flex flex-col justify-between shadow-sm relative overflow-hidden"
                            style={{
                              backgroundColor: t.previewBg,
                              borderColor: t.previewAccent,
                            }}
                          >
                            <span
                              className="w-full h-4 rounded-md border flex items-center px-1 text-[8px] font-bold"
                              style={{
                                backgroundColor: t.previewCard,
                                borderColor: t.previewAccent,
                                color: t.previewText,
                              }}
                            >
                              Aa
                            </span>
                            <span
                              className="w-2.5 h-2.5 rounded-full border self-end"
                              style={{
                                backgroundColor: t.previewAccent,
                                borderColor: '#FAF6EB',
                              }}
                            />
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <p className="text-xs font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                                {t.name}
                              </p>
                              {t.isTasPick && (
                                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-[#D4AF37]/20 text-[#B0891E] dark:text-[#F3E5AB] border border-[#D4AF37]/40">
                                  ★ TAS Pick
                                </span>
                              )}
                              {selected && (
                                <Check className="w-3.5 h-3.5 text-[#D4AF37] ml-auto shrink-0 stroke-[3]" />
                              )}
                            </div>
                            <p className="text-[11px] text-[#365645] dark:text-[#CEC5AD] mt-1 leading-snug">
                              {t.subtitle}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. Dark Themes (10 Handcrafted Sanctuary Atmospheres) */}
              {(themeTab === 'all' || themeTab === 'dark') && (
                <div className="space-y-3 pt-3 border-t border-[#B0891E]/15 dark:border-[#D4AF37]/20">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#B0891E] dark:text-[#D4AF37] flex items-center gap-1.5">
                      <Moon className="w-3.5 h-3.5" />
                      <span>Dark Themes (10 Handcrafted Atmospheres)</span>
                    </h3>
                    <span className="text-[11px] text-[#365645] dark:text-[#CEC5AD]">
                      OLED Pure Black &amp; Nocturnal Khushu‘
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {DARK_THEMES.map((t) => {
                      const selected = settings.theme === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() =>
                            onUpdateSettings({
                              theme: t.id,
                              lastDarkTheme: t.id as DarkThemeId,
                            })
                          }
                          className={`text-left rounded-xl border p-3.5 transition-all cursor-pointer flex items-start gap-3.5 group ${
                            selected
                              ? 'border-[#D4AF37] bg-[#D4AF37]/12 shadow-[0_0_14px_rgba(212,175,55,0.2)]'
                              : 'border-[#B0891E]/20 dark:border-[#D4AF37]/20 hover:border-[#D4AF37]/60 bg-white/40 dark:bg-white/5'
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className="w-12 h-12 rounded-xl border shrink-0 p-1 flex flex-col justify-between shadow-sm relative overflow-hidden"
                            style={{
                              backgroundColor: t.previewBg,
                              borderColor: t.previewAccent,
                            }}
                          >
                            <span
                              className="w-full h-4 rounded-md border flex items-center px-1 text-[8px] font-bold"
                              style={{
                                backgroundColor: t.previewCard,
                                borderColor: t.previewAccent,
                                color: t.previewText,
                              }}
                            >
                              Aa
                            </span>
                            <span
                              className="w-2.5 h-2.5 rounded-full border self-end"
                              style={{
                                backgroundColor: t.previewAccent,
                                borderColor: '#FAF6EB',
                              }}
                            />
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <p className="text-xs font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                                {t.name}
                              </p>
                              {t.id === 'obsidian_black' && (
                                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-[#D4AF37]/20 text-[#B0891E] dark:text-[#F3E5AB] border border-[#D4AF37]/40">
                                  Default
                                </span>
                              )}
                              {t.isTasPick && (
                                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-[#D4AF37]/20 text-[#B0891E] dark:text-[#F3E5AB] border border-[#D4AF37]/40">
                                  ★ TAS Pick
                                </span>
                              )}
                              {selected && (
                                <Check className="w-3.5 h-3.5 text-[#D4AF37] ml-auto shrink-0 stroke-[3]" />
                              )}
                            </div>
                            <p className="text-[11px] text-[#365645] dark:text-[#CEC5AD] mt-1 leading-snug">
                              {t.subtitle}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* 3. Custom Habit Goals */}
          <section className="rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB]">
              Custom Daily Habit Goals
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-[#365645] dark:text-[#CEC5AD]">
                  Daily Pages Goal
                </span>
                <input
                  type="number"
                  min={1}
                  max={604}
                  value={goals.pagesPerDay}
                  onChange={(e) =>
                    onUpdateGoals({ pagesPerDay: Math.max(1, Number(e.target.value) || 1) })
                  }
                  className="w-full min-h-[44px] px-3.5 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-[#F9F6EE] dark:bg-[#04180F] text-sm tabular-nums"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-[#365645] dark:text-[#CEC5AD]">
                  Daily Ayahs Goal
                </span>
                <input
                  type="number"
                  min={1}
                  value={goals.versesPerDay}
                  onChange={(e) =>
                    onUpdateGoals({ versesPerDay: Math.max(1, Number(e.target.value) || 1) })
                  }
                  className="w-full min-h-[44px] px-3.5 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-[#F9F6EE] dark:bg-[#04180F] text-sm tabular-nums"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-[#365645] dark:text-[#CEC5AD]">
                  Daily Reading Minutes
                </span>
                <input
                  type="number"
                  min={1}
                  value={goals.minutesPerDay}
                  onChange={(e) =>
                    onUpdateGoals({ minutesPerDay: Math.max(1, Number(e.target.value) || 1) })
                  }
                  className="w-full min-h-[44px] px-3.5 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-[#F9F6EE] dark:bg-[#04180F] text-sm tabular-nums"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-[#365645] dark:text-[#CEC5AD]">
                  Daily Hasanat Goal
                </span>
                <input
                  type="number"
                  min={100}
                  step={100}
                  value={goals.hasanatPerDay}
                  onChange={(e) =>
                    onUpdateGoals({
                      hasanatPerDay: Math.max(100, Number(e.target.value) || 100),
                    })
                  }
                  className="w-full min-h-[44px] px-3.5 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-[#F9F6EE] dark:bg-[#04180F] text-sm tabular-nums"
                />
              </label>
            </div>
          </section>

          {/* 4. Daily Verse Notification Center */}
          <section className="rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB] flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#D4AF37]" />
                  <span>Daily Verse Notifications</span>
                </h2>
                <p className="text-xs text-[#365645] dark:text-[#CEC5AD] mt-0.5">
                  Permission status: <strong className="capitalize">{notificationsState.permission}</strong>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {notificationsState.permission !== 'granted' ? (
                  <button
                    onClick={notificationsState.requestPermission}
                    className="min-h-[40px] px-4 py-2 rounded-xl bg-[#D4AF37] text-[#04180F] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <BellRing className="w-3.5 h-3.5" />
                    Enable Notifications
                  </button>
                ) : (
                  <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.enabled}
                      onChange={(e) => onUpdateNotifications({ enabled: e.target.checked })}
                      className="w-4 h-4 accent-[#D4AF37]"
                    />
                    <span>Active</span>
                  </label>
                )}

                <button
                  onClick={handleSendTest}
                  className="min-h-[40px] px-3.5 py-2 rounded-xl border border-[#D4AF37]/35 text-xs font-semibold text-[#B0891E] dark:text-[#F3E5AB] hover:bg-[#D4AF37]/10 cursor-pointer"
                >
                  {testSentMsg ? 'Test Sent!' : 'Send Test Notification'}
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-[#B0891E]/15 dark:border-[#D4AF37]/15 bg-[#F9F6EE]/70 dark:bg-[#04180F]/60 p-4 flex flex-wrap items-center justify-between gap-3">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.dailyVerseEnabled}
                  onChange={(e) =>
                    onUpdateNotifications({ dailyVerseEnabled: e.target.checked })
                  }
                  className="w-4 h-4 accent-[#D4AF37]"
                />
                <div>
                  <p className="text-sm font-semibold">Daily Verse of the Day</p>
                  <p className="text-xs text-[#365645] dark:text-[#CEC5AD]">
                    Peaceful reminder with today&apos;s Quran verse &amp; streak prompt
                  </p>
                </div>
              </label>

              <input
                type="time"
                aria-label="Daily Verse Notification Time"
                value={settings.notifications.dailyVerseTime}
                onChange={(e) => onUpdateNotifications({ dailyVerseTime: e.target.value })}
                className="min-h-[38px] px-3 rounded-lg border border-[#D4AF37]/30 bg-white dark:bg-[#062115] text-xs font-semibold tabular-nums"
              />
            </div>

            {/* Locked 6:00 AM Daily Sadaqah Jariyah Reminder (Non-Editable Time) */}
            <div className="rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/8 dark:bg-[#04180F]/80 p-4 flex flex-wrap items-center justify-between gap-3">
              <label className="flex items-start gap-2.5 cursor-pointer flex-1 min-w-[220px]">
                <input
                  type="checkbox"
                  checked={settings.notifications.sadaqahReminderEnabled !== false}
                  onChange={(e) =>
                    onUpdateNotifications({ sadaqahReminderEnabled: e.target.checked })
                  }
                  className="w-4 h-4 mt-0.5 accent-[#D4AF37]"
                />
                <div>
                  <p className="text-sm font-semibold text-[#092A1B] dark:text-[#F3E5AB]">
                    Daily Sadaqah Jariyah Reminder — Fixed at 6:00 AM
                  </p>
                  <p className="text-xs text-[#365645] dark:text-[#CEC5AD] mt-0.5">
                    Reminds you each morning at 6:00 AM to invite a friend or family member to The Authentic Sunnah.
                  </p>
                </div>
              </label>

              <div className="flex items-center gap-2 shrink-0">
                <span className="min-h-[36px] px-3 py-1.5 rounded-lg border border-[#D4AF37]/40 bg-white dark:bg-[#09090B] text-xs font-bold text-[#B0891E] dark:text-[#F3E5AB] inline-flex items-center gap-1.5 tabular-nums select-none">
                  <Lock className="w-3.5 h-3.5" />
                  <span>06:00 AM (Fixed)</span>
                </span>
                <button
                  type="button"
                  onClick={() => notificationsState.sendSadaqahPreviewNotification()}
                  className="min-h-[36px] px-3 py-1.5 rounded-lg border border-[#D4AF37]/35 text-xs font-semibold text-[#092A1B] dark:text-[#FAF6EB] hover:bg-[#D4AF37]/15 cursor-pointer"
                >
                  Preview
                </button>
              </div>
            </div>
          </section>

          {/* 4.5 Five Daily Salah Timings, Location, Calculation Methods, Offsets & PWA Alerts */}
          <section className="lg:col-span-2 rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/30 bg-white dark:bg-[#062115] p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>Five Daily Salah Timings &amp; PWA Alerts</span>
                </h2>
                <p className="text-xs text-[#365645] dark:text-[#CEC5AD] mt-0.5">
                  Active Location:{' '}
                  <strong className="text-[#092A1B] dark:text-[#F3E5AB]">
                    {salahState.dailyTimings?.locationLabel || 'Automatic Timezone Fallback'}
                  </strong>
                  {salahState.dailyTimings?.source === 'gps' &&
                  typeof settings.salah.latitude === 'number' &&
                  typeof settings.salah.longitude === 'number'
                    ? ` (${settings.salah.latitude.toFixed(2)}°, ${settings.salah.longitude.toFixed(2)}°)`
                    : ''}
                </p>
              </div>

              <button
                type="button"
                onClick={handleDetectGpsLocation}
                disabled={salahState.locatingGps}
                className="min-h-[40px] px-4 py-2 rounded-xl bg-[#D4AF37] text-[#04180F] text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer hover:brightness-105 disabled:opacity-60"
              >
                {salahState.locatingGps ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Compass className="w-3.5 h-3.5" />
                )}
                <span>{salahState.locatingGps ? 'Detecting GPS...' : 'Auto-Detect GPS'}</span>
              </button>
            </div>

            {(gpsStatusMsg || salahState.timingsError) && (
              <p className="text-xs font-medium text-[#B0891E] dark:text-[#F3E5AB]">
                {gpsStatusMsg || salahState.timingsError}
              </p>
            )}

            {/* Manual City Fallback + Curated Preset */}
            <div className="rounded-xl border border-[#B0891E]/15 dark:border-[#D4AF37]/20 bg-[#F9F6EE]/70 dark:bg-[#04180F]/60 p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-[#092A1B] dark:text-[#FAF6EB] inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Manual City Selector (Fallback / Custom Travel City)</span>
                </p>

                <select
                  aria-label="Quick select major city"
                  value=""
                  onChange={(e) => {
                    const chosen = CURATED_SALAH_CITIES.find((c) => c.label === e.target.value);
                    if (!chosen) return;
                    setCityInput(chosen.city);
                    setCountryInput(chosen.country);
                    onUpdateSalahSettings({
                      locationMode: 'manual',
                      city: chosen.city,
                      country: chosen.country,
                      latitude: undefined,
                      longitude: undefined,
                    });
                  }}
                  className="min-h-[38px] px-3 rounded-lg border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] text-xs font-medium"
                >
                  <option value="">Quick Select Popular City...</option>
                  {CURATED_SALAH_CITIES.map((c) => (
                    <option key={c.label} value={c.label}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <form onSubmit={handleApplyManualCity} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2.5">
                <input
                  type="text"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  placeholder="City (e.g. London, Karachi, Chicago)"
                  className="min-h-[44px] px-3.5 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] text-sm"
                />
                <input
                  type="text"
                  value={countryInput}
                  onChange={(e) => setCountryInput(e.target.value)}
                  placeholder="Country (e.g. United Kingdom)"
                  className="min-h-[44px] px-3.5 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] text-sm"
                />
                <button
                  type="submit"
                  className="min-h-[44px] px-4 rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/15 text-[#B0891E] dark:text-[#F3E5AB] text-xs font-bold hover:bg-[#D4AF37] hover:text-[#04180F] transition-colors cursor-pointer"
                >
                  {citySavedMsg ? 'City Applied' : 'Apply City'}
                </button>
              </form>
            </div>

            {/* Calculation Method & Asr Juristic School */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-[#365645] dark:text-[#CEC5AD]">
                  Prayer Calculation Method
                </span>
                <select
                  value={settings.salah.calculationMethod}
                  onChange={(e) =>
                    onUpdateSalahSettings({ calculationMethod: Number(e.target.value) })
                  }
                  className="w-full min-h-[44px] px-3.5 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-[#F9F6EE] dark:bg-[#04180F] text-sm"
                >
                  {SALAH_CALCULATION_METHODS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} — {m.regionHint}
                    </option>
                  ))}
                </select>
              </label>

              <div className="space-y-1.5">
                <span className="block text-xs font-semibold text-[#365645] dark:text-[#CEC5AD]">
                  Asr Juristic School (Madhhab)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      { id: 0, label: "Standard (Shafi'i / Maliki / Hanbali)" },
                      { id: 1, label: 'Hanafi (Later Asr)' },
                    ] as { id: 0 | 1; label: string }[]
                  ).map((school) => (
                    <button
                      key={school.id}
                      type="button"
                      onClick={() => onUpdateSalahSettings({ asrSchool: school.id })}
                      className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                        settings.salah.asrSchool === school.id
                          ? 'bg-[#D4AF37] text-[#04180F]'
                          : 'border border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-[#365645] dark:text-[#CEC5AD]'
                      }`}
                    >
                      {school.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Per-Prayer Minute Offsets */}
            <div className="space-y-3 pt-1 border-t border-[#B0891E]/15 dark:border-[#D4AF37]/15">
              <div className="flex items-center justify-between gap-2 pt-2">
                <div>
                  <p className="text-sm font-semibold text-[#092A1B] dark:text-[#FAF6EB]">
                    Per-Prayer Minute Adjustments
                  </p>
                  <p className="text-xs text-[#365645] dark:text-[#CEC5AD]">
                    Fine-tune local masjid congregation or horizon variance (-30 to +30 min)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSalahSettings({
                      offsets: {
                        fajr: 0,
                        sunrise: 0,
                        dhuhr: 0,
                        asr: 0,
                        maghrib: 0,
                        isha: 0,
                      },
                    })
                  }
                  className="min-h-[36px] px-3 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer hover:border-[#D4AF37]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Offsets</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {SALAH_PRAYER_META.map((prayer) => {
                  const val = settings.salah.offsets[prayer.id] || 0;
                  const adjusted = salahState.dailyTimings?.timings?.[prayer.id];
                  return (
                    <label
                      key={prayer.id}
                      className="rounded-xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-[#F9F6EE]/70 dark:bg-[#04180F]/60 p-3 space-y-1.5 block"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                          {prayer.label}
                        </span>
                        <span className="text-[11px] font-semibold text-[#B0891E] dark:text-[#F3E5AB] tabular-nums">
                          {adjusted ? formatPrayerTime12h(adjusted) : '--:--'}
                        </span>
                      </div>
                      <input
                        type="number"
                        min={-30}
                        max={30}
                        value={val}
                        onChange={(e) => {
                          const clamped = Math.max(-30, Math.min(30, Number(e.target.value) || 0));
                          onUpdateSalahSettings({
                            offsets: {
                              ...settings.salah.offsets,
                              [prayer.id]: clamped,
                            } as Record<SalahPrayerId, number>,
                          });
                        }}
                        className="w-full min-h-[38px] px-2.5 rounded-lg border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] text-xs font-semibold tabular-nums"
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            {/* PWA Salah Prayer Alerts */}
            <div className="space-y-4 pt-2 border-t border-[#B0891E]/15 dark:border-[#D4AF37]/15">
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.salah.notificationsEnabled}
                    onChange={async (e) => {
                      const nextVal = e.target.checked;
                      if (nextVal && notificationsState.permission !== 'granted') {
                        await notificationsState.requestPermission();
                      }
                      onUpdateSalahSettings({ notificationsEnabled: nextVal });
                    }}
                    className="w-4 h-4 accent-[#D4AF37]"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#092A1B] dark:text-[#FAF6EB]">
                      PWA Service Worker Salah Alerts
                    </p>
                    <p className="text-xs text-[#365645] dark:text-[#CEC5AD]">
                      Schedule local notifications when prayer time arrives or ahead of time
                    </p>
                  </div>
                </label>

                <button
                  type="button"
                  onClick={handleSendSalahTest}
                  className="min-h-[38px] px-3.5 py-1.5 rounded-xl border border-[#D4AF37]/35 text-xs font-semibold text-[#B0891E] dark:text-[#F3E5AB] hover:bg-[#D4AF37]/10 cursor-pointer"
                >
                  {salahTestMsg ? 'Salah Alert Sent!' : 'Send Salah Test Alert'}
                </button>
              </div>

              {/* Lead Time Selector */}
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-[#365645] dark:text-[#CEC5AD]">
                  Reminder Lead Time
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {(
                    [
                      { value: 0, label: 'At prayer time' },
                      { value: 5, label: '5 min before' },
                      { value: 10, label: '10 min before' },
                      { value: 15, label: '15 min before' },
                      { value: 30, label: '30 min before' },
                    ] as { value: SalahAlertLeadMinutes; label: string }[]
                  ).map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => onUpdateSalahSettings({ alertLeadMinutes: opt.value })}
                      className={`min-h-[40px] px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                        settings.salah.alertLeadMinutes === opt.value
                          ? 'bg-[#D4AF37] text-[#04180F]'
                          : 'border border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-[#365645] dark:text-[#CEC5AD]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Per-Prayer Enable Checkboxes */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {OBLIGATORY_PRAYER_IDS.map((pid) => {
                  const meta = SALAH_PRAYER_META.find((m) => m.id === pid)!;
                  const checked = settings.salah.enabledPrayers[pid];
                  return (
                    <label
                      key={pid}
                      className={`min-h-[42px] px-3 py-2 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                        checked
                          ? 'border-[#D4AF37]/60 bg-[#D4AF37]/10 text-[#092A1B] dark:text-[#F3E5AB]'
                          : 'border-[#B0891E]/20 dark:border-[#D4AF37]/20 text-[#365645] dark:text-[#CEC5AD]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) =>
                          onUpdateSalahSettings({
                            enabledPrayers: {
                              ...settings.salah.enabledPrayers,
                              [pid]: e.target.checked,
                            },
                          })
                        }
                        className="w-4 h-4 accent-[#D4AF37]"
                      />
                      <span className="text-xs font-semibold">{meta.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 5. YouTube Channel Configuration */}
          <section className="lg:col-span-2 rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] p-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB]">
              YouTube Channel Configuration
            </h2>
            <p className="text-xs text-[#365645] dark:text-[#CEC5AD]">
              Customize the Channel ID (<code>UC...</code>) or handle (<code>@TheAuthenticSunnah</code>)
              for the Videos hub.
            </p>
            <form onSubmit={handleSaveChannel} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                value={ytInput}
                onChange={(e) => setYtInput(e.target.value)}
                placeholder="UC9wKJbbywUez7MHYEjEsY1A"
                className="flex-1 min-h-[44px] px-3.5 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-[#F9F6EE] dark:bg-[#04180F] text-sm"
              />
              <button
                type="submit"
                className="min-h-[44px] px-4 py-2 rounded-xl bg-[#D4AF37] text-[#04180F] text-xs font-semibold hover:bg-[#F3E5AB] transition-colors cursor-pointer"
              >
                {ytSavedMsg ? 'Saved' : 'Apply Channel'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setYtInput(YOUTUBE_CONFIG.DEFAULT_YOUTUBE_CHANNEL_ID);
                  onUpdateSettings({
                    youtubeChannelId: YOUTUBE_CONFIG.DEFAULT_YOUTUBE_CHANNEL_ID,
                  });
                }}
                className="min-h-[44px] px-3 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-xs font-medium inline-flex items-center justify-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};
