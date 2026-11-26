import { useCallback, useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  Compass,
  Flame,
  Home,
  Moon,
  ScrollText,
  Settings,
  Sparkles,
  Sun,
} from 'lucide-react';
import { DailyMemorizationModal } from './components/DailyMemorizationModal';
import { ExploreHub } from './components/ExploreHub';
import { FloatingAudioCapsule } from './components/FloatingAudioCapsule';
import { HadithLibrary } from './components/HadithLibrary';
import { HomeDashboard } from './components/HomeDashboard';
import { MiniQuranPlayer } from './components/MiniQuranPlayer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PWAInstallButton } from './components/PWAInstallButton';
import { QuranReader, ReaderAudioMiniState } from './components/QuranReader';
import { SavedSettings } from './components/SavedSettings';
import { SeerahFocusTarget } from './components/SeerahCompanionsHub';
import { SplashScreen } from './components/SplashScreen';
import { SunnahAIHub } from './components/SunnahAIHub';
import { isDarkThemeId, resolveEffectiveTheme } from './config/themes';
import { getTodayKey } from './utils/arabic';
import { useAppStore } from './hooks/useAppStore';
import { useNotifications } from './hooks/useNotifications';
import { useQuranAudioPlayer } from './hooks/useQuranAudioPlayer';
import { useSalahTracker } from './hooks/useSalahTracker';
import { SpaNavState, useSpaHistoryRouter } from './hooks/useSpaHistoryRouter';
import {
  GlobalUmmahStats,
  recordGlobalVersesRecited,
  registerAnonymousSession,
  subscribeGlobalUmmahStats,
  trackFeatureUsage,
} from './services/firebaseTelemetry';
import { prefetchCoreOfflineData } from './services/quranApi';
import { AppTab, ExploreModule, QuranSubMode, SeerahEra } from './types';

const NAV_ITEMS: { id: AppTab; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'quran', label: 'Quran', icon: BookOpen },
  { id: 'hadith', label: 'Hadith', icon: ScrollText },
  { id: 'sunnah_ai', label: 'Sunnah AI', icon: Sparkles },
  { id: 'explore', label: 'Explore', icon: Compass },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const MOBILE_NAV_ITEMS = NAV_ITEMS.filter((item) => item.id !== 'settings');

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [exploreModule, setExploreModule] = useState<ExploreModule>('hub');
  const [quranSubMode, setQuranSubMode] = useState<QuranSubMode>('read');
  const [pendingQuranTarget, setPendingQuranTarget] = useState<{
    surahNumber: number;
    ayahNumber?: number;
  } | null>(null);
  const [pendingCollection, setPendingCollection] = useState<string | null>(null);
  const [pendingSeerahFocus, setPendingSeerahFocus] = useState<SeerahFocusTarget | null>(null);
  const [sadaqahHighlightNonce, setSadaqahHighlightNonce] = useState(0);
  const [readerAudioState, setReaderAudioState] = useState<ReaderAudioMiniState>(null);
  const [globalUmmahStats, setGlobalUmmahStats] = useState<GlobalUmmahStats>({
    activeNowCount: 1,
    versesRecitedToday: 0,
    totalVersesAllTime: 0,
    dayKey: new Date().toISOString().slice(0, 10),
    isLiveSynced: false,
  });

  const [showDailyMemorization, setShowDailyMemorization] = useState(() => {
    try {
      const todayKey = getTodayKey();
      const lastPopup =
        localStorage.getItem('tas_last_popup_date') ||
        localStorage.getItem('last_popup_date');
      return lastPopup !== todayKey;
    } catch {
      return false;
    }
  });

  const handleCloseDailyMemorization = useCallback(() => {
    try {
      const todayKey = getTodayKey();
      localStorage.setItem('tas_last_popup_date', todayKey);
      localStorage.setItem('last_popup_date', todayKey);
    } catch {
      // ignore
    }
    setShowDailyMemorization(false);
  }, []);

  const store = useAppStore();
  const salahTracker = useSalahTracker(store.settings.salah, store.updateSalahSettings);
  const notificationsState = useNotifications(
    store.settings,
    store.updateNotifications,
    salahTracker.dailyTimings
  );
  const quranAudioPlayer = useQuranAudioPlayer(
    store.settings,
    store.updateSettings,
    store.addListeningSeconds
  );

  const handleRestoreSpaState = useCallback((nav: SpaNavState) => {
    setActiveTab(nav.tab);
    setExploreModule(nav.exploreModule);
    setQuranSubMode(nav.quranSubMode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { pushNavState } = useSpaHistoryRouter(
    { tab: activeTab, exploreModule, quranSubMode },
    handleRestoreSpaState
  );

  // Anonymous telemetry heartbeat, Live Ummah subscription & core IndexedDB prefetch
  useEffect(() => {
    void registerAnonymousSession(
      resolveEffectiveTheme(store.settings.theme),
      store.settings.quranReciter
    );
    const unsubscribe = subscribeGlobalUmmahStats(setGlobalUmmahStats);
    void prefetchCoreOfflineData(
      store.settings.quranScript,
      store.settings.englishTranslator,
      store.settings.urduTranslator,
      store.settings.romanUrduTranslator
    );
    return () => {
      unsubscribe();
    };
  }, [
    store.settings.theme,
    store.settings.quranReciter,
    store.settings.quranScript,
    store.settings.englishTranslator,
    store.settings.urduTranslator,
    store.settings.romanUrduTranslator,
  ]);

  // Increment global Ummah verses recited counter strictly on positive verse-count increments
  const prevTodayVersesRef = useRef<number>(store.todayRecord.versesReadIds.length);
  useEffect(() => {
    const curr = store.todayRecord.versesReadIds.length;
    const delta = curr - prevTodayVersesRef.current;
    prevTodayVersesRef.current = curr;
    if (delta > 0) {
      void recordGlobalVersesRecited(Math.min(50, delta));
    }
  }, [store.todayRecord.versesReadIds.length]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'share-sadaqah') {
      setActiveTab('home');
      setSadaqahHighlightNonce((n) => n + 1);
      params.delete('action');
      const nextSearch = params.toString();
      const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}${window.location.hash}`;
      window.history.replaceState({}, '', nextUrl);
    }

    const handleSadaqahDeepLink = () => {
      pushNavState({ tab: 'home', exploreModule: 'hub', quranSubMode });
      setActiveTab('home');
      setSadaqahHighlightNonce((n) => n + 1);
    };

    window.addEventListener('tas-open-sadaqah-share', handleSadaqahDeepLink);
    return () => {
      window.removeEventListener('tas-open-sadaqah-share', handleSadaqahDeepLink);
    };
  }, [pushNavState, quranSubMode]);

  const handleOpenQuran = useCallback(
    (surahNumber?: number, ayahNumber?: number) => {
      if (surahNumber !== undefined) {
        setPendingQuranTarget({ surahNumber, ayahNumber });
      }
      pushNavState({ tab: 'quran', exploreModule, quranSubMode: 'read' });
      setQuranSubMode('read');
      setActiveTab('quran');
      void trackFeatureUsage('tab_quran_read', 'navigation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [exploreModule, pushNavState]
  );

  const handleOpenListenQuran = useCallback(
    (surahNumber?: number) => {
      if (typeof surahNumber === 'number') {
        quranAudioPlayer.selectSurah(surahNumber, { autoPlay: true });
      }
      pushNavState({ tab: 'quran', exploreModule, quranSubMode: 'listen' });
      setQuranSubMode('listen');
      setActiveTab('quran');
      void trackFeatureUsage('tab_quran_listen', 'audio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [exploreModule, pushNavState, quranAudioPlayer]
  );

  const handleClearPendingQuran = useCallback(() => setPendingQuranTarget(null), []);
  const handleClearPendingCollection = useCallback(() => setPendingCollection(null), []);
  const handleClearPendingSeerahFocus = useCallback(() => setPendingSeerahFocus(null), []);

  const handleSwitchTab = useCallback(
    (tab: AppTab) => {
      const nextExplore = tab === 'explore' ? 'hub' : exploreModule;
      if (tab === 'explore') {
        setExploreModule('hub');
      }
      pushNavState({ tab, exploreModule: nextExplore, quranSubMode });
      setActiveTab(tab);
      void trackFeatureUsage(`tab_${tab}`, tab === 'sunnah_ai' ? 'ai' : 'navigation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [exploreModule, pushNavState, quranSubMode]
  );

  const handleSelectExploreModule = useCallback(
    (mod: ExploreModule) => {
      pushNavState({ tab: 'explore', exploreModule: mod, quranSubMode });
      setExploreModule(mod);
      if (mod !== 'hub') {
        void trackFeatureUsage(`explore_${mod}`, mod === 'hifz' ? 'hifz' : 'explore');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [pushNavState, quranSubMode]
  );

  const handleChangeQuranSubMode = useCallback(
    (mode: QuranSubMode) => {
      pushNavState({ tab: 'quran', exploreModule, quranSubMode: mode });
      setQuranSubMode(mode);
      void trackFeatureUsage(
        `quran_mode_${mode}`,
        mode === 'listen' ? 'audio' : mode === 'hifz' ? 'hifz' : 'navigation'
      );
    },
    [exploreModule, pushNavState]
  );

  const handleOpenVideosFromHome = useCallback(() => {
    pushNavState({ tab: 'explore', exploreModule: 'videos', quranSubMode });
    setExploreModule('videos');
    setActiveTab('explore');
    void trackFeatureUsage('explore_videos', 'explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pushNavState, quranSubMode]);

  const handleOpenDuasFromHome = useCallback(() => {
    pushNavState({ tab: 'explore', exploreModule: 'duas', quranSubMode });
    setExploreModule('duas');
    setActiveTab('explore');
    void trackFeatureUsage('explore_duas', 'explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pushNavState, quranSubMode]);

  const handleOpenDhikrFromHome = useCallback(() => {
    pushNavState({ tab: 'explore', exploreModule: 'dhikr', quranSubMode });
    setExploreModule('dhikr');
    setActiveTab('explore');
    void trackFeatureUsage('explore_dhikr', 'explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pushNavState, quranSubMode]);

  const handleOpenHifzFromHome = useCallback(() => {
    pushNavState({ tab: 'quran', exploreModule, quranSubMode: 'hifz' });
    setQuranSubMode('hifz');
    setActiveTab('quran');
    void trackFeatureUsage('tab_quran_hifz', 'hifz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [exploreModule, pushNavState]);

  const handleOpenSeerahFromHome = useCallback(() => {
    pushNavState({ tab: 'explore', exploreModule: 'seerah', quranSubMode });
    setPendingSeerahFocus({ category: 'seerah' });
    setExploreModule('seerah');
    setActiveTab('explore');
    void trackFeatureUsage('explore_seerah', 'explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pushNavState, quranSubMode]);

  const handleOpenSahabahFromHome = useCallback(() => {
    pushNavState({ tab: 'explore', exploreModule: 'seerah', quranSubMode });
    setPendingSeerahFocus({ category: 'sahabah' });
    setExploreModule('seerah');
    setActiveTab('explore');
    void trackFeatureUsage('explore_companions', 'explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pushNavState, quranSubMode]);

  const handleOpenQuizFromHome = useCallback(() => {
    pushNavState({ tab: 'explore', exploreModule: 'quiz', quranSubMode });
    setExploreModule('quiz');
    setActiveTab('explore');
    void trackFeatureUsage('explore_quiz', 'explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pushNavState, quranSubMode]);

  const handleOpenSeerahChapter = useCallback(
    (era: SeerahEra) => {
      pushNavState({ tab: 'explore', exploreModule: 'seerah', quranSubMode });
      setPendingSeerahFocus({ category: 'seerah', era });
      setExploreModule('seerah');
      setActiveTab('explore');
      void trackFeatureUsage('explore_seerah', 'explore');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [pushNavState, quranSubMode]
  );

  const handleOpenCompanion = useCallback(
    (sahabiId: string) => {
      pushNavState({ tab: 'explore', exploreModule: 'seerah', quranSubMode });
      setPendingSeerahFocus({ category: 'sahabah', sahabiId });
      setExploreModule('seerah');
      setActiveTab('explore');
      void trackFeatureUsage('explore_companions', 'explore');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [pushNavState, quranSubMode]
  );

  const isDarkTheme = isDarkThemeId(resolveEffectiveTheme(store.settings.theme));

  return (
    <div
      data-section={activeTab}
      className="min-h-screen theme-canvas transition-colors duration-200"
    >
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      <div className="flex min-h-screen">
        {/* Desktop Sidebar Navigation (Clean 5-Tab Architecture) */}
        <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 lg:left-0 z-30 border-r border-[#B0891E]/20 dark:border-[#D4AF37]/20 theme-nav">
          <div className="p-6 border-b border-[#B0891E]/15 dark:border-[#D4AF37]/15">
            <button
              onClick={() => handleSwitchTab('home')}
              className="flex items-center gap-3.5 text-left w-full cursor-pointer"
            >
              <img
                src="/assets/aistudio/tas_logo_b0f8b87c.jpeg"
                onError={(e) => {
                  e.currentTarget.src = '/pwa-192x192.png';
                }}
                alt="The Authentic Sunnah Logo"
                className="w-12 h-12 rounded-full border border-[#D4AF37]/60 object-cover shrink-0 shadow-sm"
              />
              <div className="min-w-0">
                <span className="block font-display text-base font-bold tracking-wide text-[#092A1B] dark:text-[#FAF6EB] truncate">
                  The Authentic Sunnah
                </span>
                <span
                  dir="rtl"
                  className="block font-arabic-calligraphy text-sm text-[#B0891E] dark:text-[#F3E5AB]"
                >
                  السُّنَّةُ النَّبَوِيَّةُ
                </span>
              </div>
            </button>
          </div>

          <nav className="flex-1 px-4 py-5 space-y-1.5 overflow-y-auto" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSwitchTab(item.id)}
                  className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl flex items-center gap-3 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#D4AF37] text-[#04180F] font-semibold shadow-sm'
                      : 'text-[#365645] dark:text-[#CEC5AD] hover:bg-[#D4AF37]/10 hover:text-[#092A1B] dark:hover:text-[#FAF6EB]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-[#B0891E]/15 dark:border-[#D4AF37]/15 space-y-3">
            <div className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-[#F9F6EE] dark:bg-[#04180F]/70 p-3.5 flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#365645] dark:text-[#CEC5AD]">
                  Today&apos;s Hasanat
                </p>
                <p className="text-base font-bold tabular-nums text-[#B0891E] dark:text-[#F3E5AB]">
                  {store.todayRecord.hasanat.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold tabular-nums text-[#092A1B] dark:text-[#FAF6EB]">
                <Flame className="w-4 h-4 text-[#D4AF37]" />
                <span>{store.stats.streak}d</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <button
                onClick={store.toggleTheme}
                className="flex-1 min-h-[40px] px-3 py-2 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-xs font-semibold text-[#092A1B] dark:text-[#FAF6EB] hover:bg-[#D4AF37]/10 inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                {isDarkTheme ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-[#0A3321]" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
              <PWAInstallButton variant="compact" />
            </div>
          </div>
        </aside>

        {/* Main Content Wrapper */}
        <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
          {/* Mobile Compact Top App Bar (48px) */}
          <header className="lg:hidden sticky top-0 z-30 h-12 px-4 border-b border-[#B0891E]/20 dark:border-[#D4AF37]/20 theme-nav flex items-center justify-between gap-3">
            <button
              onClick={() => handleSwitchTab('home')}
              className="flex items-center gap-2.5 min-w-0 cursor-pointer"
            >
              <img
                src="/assets/aistudio/tas_logo_b0f8b87c.jpeg"
                onError={(e) => {
                  e.currentTarget.src = '/pwa-192x192.png';
                }}
                alt="The Authentic Sunnah"
                className="w-8 h-8 rounded-full border border-[#D4AF37]/60 object-cover shrink-0"
              />
              <span className="font-display text-sm font-bold tracking-wide text-[#092A1B] dark:text-[#FAF6EB] truncate whitespace-nowrap">
                The Authentic Sunnah
              </span>
            </button>

            <div className="flex items-center gap-1 shrink-0">
              <PWAInstallButton variant="compact" />
              <button
                onClick={store.toggleTheme}
                aria-label="Toggle Light or Dark Mode"
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-[#092A1B] dark:text-[#F3E5AB] hover:bg-[#D4AF37]/15 transition-colors cursor-pointer"
              >
                {isDarkTheme ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => handleSwitchTab('settings')}
                aria-label="Open Settings"
                className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-[#D4AF37] text-[#04180F]'
                    : 'text-[#092A1B] dark:text-[#F3E5AB] hover:bg-[#D4AF37]/15'
                }`}
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Page Content Canvas */}
          <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-20 lg:pb-10">
            {activeTab === 'home' && (
              <HomeDashboard
                settings={store.settings}
                goals={store.goals}
                onUpdateGoals={store.updateGoals}
                todayRecord={store.todayRecord}
                stats={store.stats}
                lastRead={store.lastRead}
                onUpdateLastRead={store.updateLastRead}
                onOpenQuran={handleOpenQuran}
                onOpenListenQuran={handleOpenListenQuran}
                onOpenSettings={() => handleSwitchTab('settings')}
                onOpenVideos={handleOpenVideosFromHome}
                onOpenDuas={handleOpenDuasFromHome}
                onOpenDhikr={handleOpenDhikrFromHome}
                onOpenHifz={handleOpenHifzFromHome}
                onOpenSeerah={handleOpenSeerahFromHome}
                onOpenSahabah={handleOpenSahabahFromHome}
                onOpenQuiz={handleOpenQuizFromHome}
                sadaqahHighlightNonce={sadaqahHighlightNonce}
                globalUmmahStats={globalUmmahStats}
                salahState={{
                  todayKey: salahTracker.todayKey,
                  logsMap: salahTracker.logsMap,
                  todayLog: salahTracker.todayLog,
                  dailyTimings: salahTracker.dailyTimings,
                  timingsLoading: salahTracker.timingsLoading,
                  locatingGps: salahTracker.locatingGps,
                  nextPrayerInfo: salahTracker.nextPrayerInfo,
                  onSavePrayer: salahTracker.savePrayerRecord,
                  onDeletePrayer: salahTracker.deletePrayerRecord,
                  onDetectGps: salahTracker.detectAndSaveLocation,
                }}
              />
            )}

            {activeTab === 'quran' && (
              <QuranReader
                initialSurahNumber={pendingQuranTarget?.surahNumber ?? null}
                initialAyahNumber={pendingQuranTarget?.ayahNumber ?? null}
                onClearInitialTarget={handleClearPendingQuran}
                settings={store.settings}
                onUpdateSettings={store.updateSettings}
                goals={store.goals}
                todayRecord={store.todayRecord}
                lastRead={store.lastRead}
                quranBookmarks={store.quranBookmarks}
                onToggleBookmark={store.toggleQuranBookmark}
                onMarkVerseRead={store.markVerseRead}
                onToggleVerseRead={store.toggleVerseRead}
                onMarkVersesBatchRead={store.markVersesBatchRead}
                onAddReadingSeconds={store.addReadingSeconds}
                onUpdateLastRead={store.updateLastRead}
                onOpenSettings={() => handleSwitchTab('settings')}
                subMode={quranSubMode}
                onChangeSubMode={handleChangeQuranSubMode}
                audioPlayer={quranAudioPlayer}
                hifzProgress={store.hifzProgress}
                onUpdateSurahHifz={store.updateSurahHifz}
                onReaderAudioStateChange={setReaderAudioState}
              />
            )}

            {activeTab === 'hadith' && (
              <HadithLibrary
                initialCollectionId={pendingCollection}
                onClearInitialCollection={handleClearPendingCollection}
                settings={store.settings}
                todayRecord={store.todayRecord}
                hadithBookmarks={store.hadithBookmarks}
                onToggleHadithBookmark={store.toggleHadithBookmark}
                onToggleHadithRead={store.toggleHadithRead}
              />
            )}

            {activeTab === 'sunnah_ai' && <SunnahAIHub settings={store.settings} />}

            {activeTab === 'explore' && (
              <ExploreHub
                activeModule={exploreModule}
                onSelectModule={handleSelectExploreModule}
                settings={store.settings}
                dhikrCounts={store.dhikrCounts}
                onIncrementDhikr={store.incrementDhikr}
                onResetDhikr={store.resetDhikr}
                duaBookmarks={store.duaBookmarks}
                onToggleDuaBookmark={store.toggleDuaBookmark}
                completedSeerahIds={store.completedSeerahIds}
                onToggleSeerahEvent={store.toggleSeerahEvent}
                onSetSeerahChapterCompleted={store.setSeerahChapterCompleted}
                seerahBookmarks={store.seerahBookmarks}
                onToggleSeerahBookmark={store.toggleSeerahBookmark}
                companionBookmarks={store.companionBookmarks}
                onToggleCompanionBookmark={store.toggleCompanionBookmark}
                completedSunnahIds={store.completedSunnahIds}
                onToggleSunnahHabit={store.toggleSunnahHabit}
                initialSeerahFocus={pendingSeerahFocus}
                onClearInitialSeerahFocus={handleClearPendingSeerahFocus}
                onOpenSettings={() => handleSwitchTab('settings')}
                onOpenListenQuran={handleOpenListenQuran}
                hifzProgress={store.hifzProgress}
                onUpdateSurahHifz={store.updateSurahHifz}
                fastingLog={store.fastingLog}
                onToggleFastingDate={store.toggleFastingDate}
              />
            )}

            {activeTab === 'settings' && (
              <SavedSettings
                settings={store.settings}
                onUpdateSettings={store.updateSettings}
                onUpdateNotifications={store.updateNotifications}
                onUpdateSalahSettings={store.updateSalahSettings}
                goals={store.goals}
                onUpdateGoals={store.updateGoals}
                quranBookmarks={store.quranBookmarks}
                hadithBookmarks={store.hadithBookmarks}
                duaBookmarks={store.duaBookmarks}
                seerahBookmarks={store.seerahBookmarks}
                companionBookmarks={store.companionBookmarks}
                onRemoveQuranBookmark={store.toggleQuranBookmark}
                onRemoveHadithBookmark={store.toggleHadithBookmark}
                onRemoveDuaBookmark={store.toggleDuaBookmark}
                onRemoveSeerahBookmark={store.toggleSeerahBookmark}
                onRemoveCompanionBookmark={store.toggleCompanionBookmark}
                onOpenQuran={handleOpenQuran}
                onOpenSeerahChapter={handleOpenSeerahChapter}
                onOpenCompanion={handleOpenCompanion}
                notificationsState={notificationsState}
                salahState={{
                  dailyTimings: salahTracker.dailyTimings,
                  locatingGps: salahTracker.locatingGps,
                  timingsError: salahTracker.timingsError,
                  onDetectGps: salahTracker.detectAndSaveLocation,
                }}
              />
            )}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Thumb-Zone Navigation Bar (Clean 5 Tabs, 100% Fit Without Clipping) */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 w-full max-w-full overflow-hidden border-t border-[#B0891E]/25 dark:border-[#D4AF37]/25 theme-nav pb-safe"
      >
        <div className="w-full grid grid-cols-5 items-center h-[62px] px-1">
          {MOBILE_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isSunnahAI = item.id === 'sunnah_ai';
            return (
              <button
                key={item.id}
                onClick={() => handleSwitchTab(item.id)}
                className={`min-w-0 w-full min-h-[44px] px-0.5 flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#B0891E] dark:text-[#F3E5AB]'
                    : 'text-[#365645] dark:text-[#CEC5AD]'
                }`}
              >
                {isSunnahAI ? (
                  <span
                    className={`w-8 h-6 rounded-xl border flex items-center justify-center transition-all shrink-0 ${
                      isActive
                        ? 'bg-[#D4AF37] border-[#D4AF37] text-[#04180F] shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                        : 'bg-[#D4AF37]/12 border-[#D4AF37]/45 text-[#B0891E] dark:text-[#F3E5AB]'
                    }`}
                  >
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </span>
                ) : (
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'stroke-[2.3]' : 'stroke-[1.75]'}`} />
                )}
                <span className="w-full text-center text-[10px] sm:text-[11px] font-medium tracking-tight truncate leading-tight">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {activeTab === 'quran' ? (
        (() => {
          const useReaderAudio = Boolean(readerAudioState);
          const activeCapsule =
            useReaderAudio && readerAudioState
              ? {
                  isVisible: true,
                  isPlaying: readerAudioState.isPlaying,
                  isBuffering: false,
                  progressPct: readerAudioState.progressPct,
                  onTogglePlayPause: readerAudioState.toggle,
                }
              : quranAudioPlayer.isPlaying || quranAudioPlayer.isBuffering
                ? {
                    isVisible: true,
                    isPlaying: quranAudioPlayer.isPlaying,
                    isBuffering: quranAudioPlayer.isBuffering,
                    progressPct:
                      quranAudioPlayer.duration > 0
                        ? (quranAudioPlayer.currentTime / quranAudioPlayer.duration) * 100
                        : 0,
                    onTogglePlayPause: quranAudioPlayer.togglePlayPause,
                  }
                : null;

          return activeCapsule ? (
            <FloatingAudioCapsule
              isVisible={activeCapsule.isVisible}
              isPlaying={activeCapsule.isPlaying}
              isBuffering={activeCapsule.isBuffering}
              progressPct={activeCapsule.progressPct}
              onTogglePlayPause={activeCapsule.onTogglePlayPause}
            />
          ) : null;
        })()
      ) : (
        <MiniQuranPlayer player={quranAudioPlayer} onExpand={() => handleOpenListenQuran()} />
      )}

      <DailyMemorizationModal
        isOpen={showDailyMemorization}
        onClose={handleCloseDailyMemorization}
        onOpenQuran={handleOpenQuran}
        settings={store.settings}
      />

      <OfflineIndicator />
    </div>
  );
}
