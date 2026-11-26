import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BookOpenText,
  Bookmark,
  BookmarkCheck,
  Check,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Copy,
  Headphones,
  Image as ImageIcon,
  Mic,
  Pause,
  Play,
  RefreshCw,
  Repeat,
  Search,
  Settings,
  Share2,
  Sparkles,
  Volume2,
  X,
} from 'lucide-react';
import { LastReadPosition } from '../hooks/useAppStore';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { QuranAudioPlayerController } from '../hooks/useQuranAudioPlayer';
import {
  fetchAllSurahs,
  fetchSurahDetail,
  fetchTafsirIbnKathir,
  getAyahAudioUrls,
  QURAN_RECITERS,
  QUICK_RECITATION_ITEMS,
  verifyAyahTextIntegrity,
} from '../services/quranApi';
import {
  AyahEntry,
  DailyGoals,
  DailyHabitRecord,
  HifzStatus,
  QuranBookmark,
  QuranReaderMode,
  QuranScript,
  QuranSubMode,
  ReaderSettings,
  SurahDetail,
  SurahHifzProgress,
  SurahSummary,
  TafsirEntry,
  TafsirLanguage,
} from '../types';
import { formatDurationMMSS, toArabicIndic } from '../utils/arabic';
import { getLanguageFlags } from '../utils/languageDisplay';
import { ShareCardPayload } from '../utils/shareCardGenerator';
import { AnimatedCounter } from './AnimatedCounter';
import { HifzTrackerHub } from './HifzTrackerHub';
import { ListenQuranView } from './ListenQuranView';
import { ProgressRing } from './ProgressRing';
import { ShareCardModal } from './ShareCardModal';

export type ReaderAudioMiniState = {
  isPlaying: boolean;
  progressPct: number;
  toggle: () => void;
} | null;

interface QuranReaderProps {
  initialSurahNumber: number | null;
  initialAyahNumber: number | null;
  onClearInitialTarget: () => void;
  settings: ReaderSettings;
  onUpdateSettings: (patch: Partial<ReaderSettings>) => void;
  goals: DailyGoals;
  todayRecord: DailyHabitRecord;
  lastRead: LastReadPosition;
  quranBookmarks: QuranBookmark[];
  onToggleBookmark: (b: Omit<QuranBookmark, 'savedAt'>) => void;
  onMarkVerseRead: (
    verseKey: string,
    letterCount: number,
    page?: number,
    surahNumber?: number,
    surahName?: string,
    ayahNumber?: number,
    totalAyahsInSurah?: number,
    juz?: number
  ) => void;
  onToggleVerseRead: (
    verseKey: string,
    letterCount: number,
    page?: number,
    surahNumber?: number,
    surahName?: string,
    ayahNumber?: number,
    totalAyahsInSurah?: number,
    juz?: number
  ) => void;
  onMarkVersesBatchRead: (
    items: { key: string; letterCount: number; page?: number }[],
    surahNumber?: number,
    surahName?: string,
    lastAyah?: number,
    totalAyahsInSurah?: number,
    juz?: number
  ) => void;
  onAddReadingSeconds: (seconds: number) => void;
  onUpdateLastRead: (pos: LastReadPosition) => void;
  onOpenSettings: () => void;
  subMode: QuranSubMode;
  onChangeSubMode: (mode: QuranSubMode) => void;
  audioPlayer: QuranAudioPlayerController;
  hifzProgress: Record<number, SurahHifzProgress>;
  onUpdateSurahHifz: (
    surahNumber: number,
    status: HifzStatus,
    memorizedAyahs: number,
    markReviewed?: boolean
  ) => void;
  onReaderAudioStateChange?: (state: ReaderAudioMiniState) => void;
}

export const QuranReader: React.FC<QuranReaderProps> = ({
  initialSurahNumber,
  initialAyahNumber,
  onClearInitialTarget,
  settings,
  onUpdateSettings,
  goals,
  todayRecord,
  lastRead,
  quranBookmarks,
  onToggleBookmark,
  onMarkVerseRead,
  onToggleVerseRead,
  onMarkVersesBatchRead,
  onAddReadingSeconds,
  onUpdateLastRead,
  onOpenSettings,
  subMode,
  onChangeSubMode,
  audioPlayer,
  hifzProgress,
  onUpdateSurahHifz,
  onReaderAudioStateChange,
}) => {
  const isOnline = useOnlineStatus();
  const [surahs, setSurahs] = useState<SurahSummary[]>([]);
  const [surahsLoading, setSurahsLoading] = useState(true);
  const [surahsError, setSurahsError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [revFilter, setRevFilter] = useState<'All' | 'Meccan' | 'Medinan'>('All');

  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number | null>(initialSurahNumber);
  const [targetAyahOnLoad, setTargetAyahOnLoad] = useState<number>(initialAyahNumber || 1);
  const [activeAyahIndex, setActiveAyahIndex] = useState<number>(0);

  const [surahDetail, setSurahDetail] = useState<SurahDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const [timerRunning, setTimerRunning] = useState(true);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [sessionVersesCount, setSessionVersesCount] = useState(0);
  const [sessionHasanatCount, setSessionHasanatCount] = useState(0);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  // Audio playback state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingAyahKey, setPlayingAyahKey] = useState<string | null>(null);
  const [repeatAudio, setRepeatAudio] = useState(false);
  const repeatAudioRef = useRef(repeatAudio);
  repeatAudioRef.current = repeatAudio;

  // Refs for seamless Auto-Advance Next Ayah callback inside HTMLAudioElement.onended
  const surahDetailRef = useRef<SurahDetail | null>(null);
  surahDetailRef.current = surahDetail;
  const autoAdvanceRef = useRef(settings.autoAdvanceAudio);
  autoAdvanceRef.current = settings.autoAdvanceAudio;
  const reciterRef = useRef(settings.quranReciter);
  reciterRef.current = settings.quranReciter;
  const readerModeRef = useRef(settings.quranReaderMode);
  readerModeRef.current = settings.quranReaderMode;
  const onUpdateLastReadRef = useRef(onUpdateLastRead);
  onUpdateLastReadRef.current = onUpdateLastRead;
  const onReaderAudioStateChangeRef = useRef(onReaderAudioStateChange);
  onReaderAudioStateChangeRef.current = onReaderAudioStateChange;

  // Tafsir drawer state
  const [tafsirTarget, setTafsirTarget] = useState<{ surah: SurahSummary; ayah: AyahEntry } | null>(
    null
  );
  const [tafsirData, setTafsirData] = useState<TafsirEntry | null>(null);
  const [tafsirLoading, setTafsirLoading] = useState(false);
  const [tafsirError, setTafsirError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [shareCardPayload, setShareCardPayload] = useState<ShareCardPayload | null>(null);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.ontimeupdate = null;
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current = null;
    }
    setPlayingAyahKey(null);
    onReaderAudioStateChangeRef.current?.(null);
  }, []);

  useEffect(() => {
    return () => stopAudio();
  }, [stopAudio]);

  useEffect(() => {
    if (subMode === 'listen') {
      stopAudio();
    }
  }, [subMode, stopAudio]);

  useEffect(() => {
    if (initialSurahNumber !== null) {
      setTargetAyahOnLoad(initialAyahNumber || 1);
      setSelectedSurahNumber(initialSurahNumber);
      onClearInitialTarget();
    }
  }, [initialSurahNumber, initialAyahNumber, onClearInitialTarget]);

  const loadSurahDirectory = useCallback(async () => {
    setSurahsLoading(true);
    setSurahsError(null);
    try {
      const list = await fetchAllSurahs();
      setSurahs(list);
    } catch (e) {
      setSurahsError(e instanceof Error ? e.message : 'Unable to load Surah list.');
    } finally {
      setSurahsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSurahDirectory();
  }, [loadSurahDirectory]);

  const loadSurah = useCallback(
    async (num: number, startAyah: number) => {
      stopAudio();
      setDetailLoading(true);
      setDetailError(null);
      try {
        const detail = await fetchSurahDetail(num, {
          script: settings.quranScript,
          englishTranslator: settings.englishTranslator,
          urduTranslator: settings.urduTranslator,
          romanUrduTranslator: settings.romanUrduTranslator,
        });
        setSurahDetail(detail);
        const safeIdx = Math.max(0, Math.min(detail.ayahs.length - 1, startAyah - 1));
        setActiveAyahIndex(safeIdx);
        const targetAyah = detail.ayahs[safeIdx];
        onUpdateLastRead({
          surahNumber: detail.surah.number,
          surahName: detail.surah.englishName,
          ayahNumber: targetAyah?.numberInSurah || 1,
          totalAyahsInSurah: detail.surah.numberOfAyahs,
          juz: targetAyah?.juz || 1,
        });
      } catch (e) {
        setDetailError(e instanceof Error ? e.message : 'Unable to load Surah text.');
      } finally {
        setDetailLoading(false);
      }
    },
    [
      settings.quranScript,
      settings.englishTranslator,
      settings.urduTranslator,
      settings.romanUrduTranslator,
      onUpdateLastRead,
      stopAudio,
    ]
  );

  useEffect(() => {
    if (selectedSurahNumber !== null) {
      loadSurah(selectedSurahNumber, targetAyahOnLoad);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      stopAudio();
      setSurahDetail(null);
    }
  }, [selectedSurahNumber, targetAyahOnLoad, loadSurah, stopAudio]);

  // Live session timer
  useEffect(() => {
    if (selectedSurahNumber === null || !timerRunning) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setSessionSeconds((s) => s + 1);
        onAddReadingSeconds(1);
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [selectedSurahNumber, timerRunning, onAddReadingSeconds]);

  // Scroll mode IntersectionObserver tracking
  const dwellTimersRef = useRef<Map<string, number>>(new Map());
  useEffect(() => {
    if (
      !surahDetail ||
      settings.quranReaderMode !== 'scroll' ||
      !settings.autoTrackScroll ||
      !timerRunning
    ) {
      return;
    }

    const ayahMap = new Map<string, AyahEntry>();
    for (const a of surahDetail.ayahs) {
      ayahMap.set(`${surahDetail.surah.number}:${a.numberInSurah}`, a);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const key = (entry.target as HTMLElement).dataset.ayahKey;
          if (!key) continue;
          if (entry.isIntersecting) {
            if (!dwellTimersRef.current.has(key)) {
              const t = window.setTimeout(() => {
                const ayah = ayahMap.get(key);
                if (ayah) {
                  onMarkVerseRead(
                    key,
                    ayah.letterCount,
                    ayah.page,
                    surahDetail.surah.number,
                    surahDetail.surah.englishName,
                    ayah.numberInSurah,
                    surahDetail.surah.numberOfAyahs,
                    ayah.juz
                  );
                }
              }, 2000);
              dwellTimersRef.current.set(key, t);
            }
          } else {
            const existing = dwellTimersRef.current.get(key);
            if (existing !== undefined) {
              window.clearTimeout(existing);
              dwellTimersRef.current.delete(key);
            }
          }
        }
      },
      { threshold: 0.65 }
    );

    const nodes = document.querySelectorAll('[data-ayah-key]');
    nodes.forEach((n) => observer.observe(n));

    return () => {
      observer.disconnect();
      dwellTimersRef.current.forEach((t) => window.clearTimeout(t));
      dwellTimersRef.current.clear();
    };
  }, [surahDetail, settings.quranReaderMode, settings.autoTrackScroll, timerRunning, onMarkVerseRead]);

  const playAyahEntry = useCallback(
    (surahNumber: number, ayah: AyahEntry) => {
      if (audioPlayer.isPlaying) {
        audioPlayer.togglePlayPause();
      }
      const verseKey = `${surahNumber}:${ayah.numberInSurah}`;
      const candidateUrls = Array.from(
        new Set([
          ...getAyahAudioUrls(
            reciterRef.current || 'yasser_dosari',
            surahNumber,
            ayah.numberInSurah,
            ayah.number
          ),
          ayah.audioUrl,
        ])
      ).filter(Boolean);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
        audioRef.current = null;
      }

      const tryIndex = (urlIdx: number) => {
        if (urlIdx >= candidateUrls.length) {
          setPlayingAyahKey(null);
          audioRef.current = null;
          onReaderAudioStateChangeRef.current?.(null);
          return;
        }
        const audio = new Audio(candidateUrls[urlIdx]);
        audioRef.current = audio;
        setPlayingAyahKey(verseKey);

        const emitState = (isPlayingNow: boolean) => {
          const pct =
            audio.duration && Number.isFinite(audio.duration) && audio.duration > 0
              ? (audio.currentTime / audio.duration) * 100
              : 0;
          onReaderAudioStateChangeRef.current?.({
            isPlaying: isPlayingNow,
            progressPct: pct,
            toggle: () => {
              if (!audioRef.current) return;
              if (audioRef.current.paused) {
                audioRef.current.play().catch(() => stopAudio());
              } else {
                audioRef.current.pause();
              }
            },
          });
        };

        emitState(true);

        audio.onplay = () => emitState(true);
        audio.onpause = () => {
          if (!audio.ended) emitState(false);
        };
        audio.ontimeupdate = () => {
          emitState(!audio.paused);
        };

        audio.onended = () => {
          if (repeatAudioRef.current) {
            audio.currentTime = 0;
            audio.play().catch(() => stopAudio());
            return;
          }
          const detail = surahDetailRef.current;
          if (autoAdvanceRef.current && detail && detail.surah.number === surahNumber) {
            const currIdx = detail.ayahs.findIndex(
              (a) => a.numberInSurah === ayah.numberInSurah
            );
            if (currIdx >= 0 && currIdx < detail.ayahs.length - 1) {
              const nextAyah = detail.ayahs[currIdx + 1];
              if (readerModeRef.current === 'card') {
                setActiveAyahIndex(currIdx + 1);
                onUpdateLastReadRef.current({
                  surahNumber: detail.surah.number,
                  surahName: detail.surah.englishName,
                  ayahNumber: nextAyah.numberInSurah,
                  totalAyahsInSurah: detail.surah.numberOfAyahs,
                  juz: nextAyah.juz,
                });
              } else {
                const el = document.querySelector(
                  `[data-ayah-key="${detail.surah.number}:${nextAyah.numberInSurah}"]`
                );
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }
              playAyahEntry(surahNumber, nextAyah);
              return;
            }
          }
          setPlayingAyahKey(null);
          audioRef.current = null;
          onReaderAudioStateChangeRef.current?.(null);
        };

        audio.onerror = () => {
          tryIndex(urlIdx + 1);
        };

        audio.play().catch(() => {
          tryIndex(urlIdx + 1);
        });
      };

      tryIndex(0);
    },
    [audioPlayer, stopAudio]
  );

  const toggleAyahAudio = useCallback(
    (surahNumber: number, ayah: AyahEntry) => {
      const verseKey = `${surahNumber}:${ayah.numberInSurah}`;
      if (playingAyahKey === verseKey && audioRef.current) {
        stopAudio();
        return;
      }
      playAyahEntry(surahNumber, ayah);
    },
    [playingAyahKey, playAyahEntry, stopAudio]
  );

  const effectiveTafsirLang: TafsirLanguage =
    settings.translationDisplay === 'urdu'
      ? 'ur'
      : settings.translationDisplay === 'english'
        ? 'en'
        : settings.tafsirLanguage;

  const openTafsir = async (surah: SurahSummary, ayah: AyahEntry) => {
    setTafsirTarget({ surah, ayah });
    setTafsirData(null);
    setTafsirLoading(true);
    setTafsirError(null);
    try {
      const data = await fetchTafsirIbnKathir(surah.number, ayah.numberInSurah, effectiveTafsirLang);
      setTafsirData(data);
    } catch (e) {
      setTafsirError(e instanceof Error ? e.message : 'Unable to fetch Tafsir Ibn Kathir.');
    } finally {
      setTafsirLoading(false);
    }
  };

  const handleCopyOrShare = async (surah: SurahSummary, ayah: AyahEntry, mode: 'copy' | 'share') => {
    const key = `${surah.number}:${ayah.numberInSurah}`;
    const verifiedArabic =
      surahDetail && surahDetail.surah.number === surah.number
        ? verifyAyahTextIntegrity(surahDetail, Math.max(0, ayah.numberInSurah - 1)).verifiedText
        : ayah.arabicText;
    const payload = `${verifiedArabic}\n\n"${ayah.englishText}"\n\n${ayah.urduText}\n— Surah ${surah.englishName} (${key})`;
    if (mode === 'share' && navigator.share) {
      try {
        await navigator.share({ title: `Quran ${key}`, text: payload });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(payload);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey((curr) => (curr === key ? null : curr)), 1800);
    } catch {
      // ignore
    }
  };

  const filteredSurahs = useMemo(() => {
    return surahs.filter((s) => {
      if (revFilter !== 'All' && s.revelationType !== revFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        return (
          s.englishName.toLowerCase().includes(q) ||
          s.englishNameTranslation.toLowerCase().includes(q) ||
          s.name.includes(searchQuery.trim()) ||
          String(s.number) === q
        );
      }
      return true;
    });
  }, [surahs, revFilter, searchQuery]);

  const readVersesSet = useMemo(
    () => new Set(todayRecord.versesReadIds),
    [todayRecord.versesReadIds]
  );

  const bookmarkSet = useMemo(
    () => new Set(quranBookmarks.map((b) => b.key)),
    [quranBookmarks]
  );

  const arabicFontClass =
    settings.quranScript === 'indopak'
      ? 'font-arabic-indopak'
      : settings.arabicFont === 'scheherazade'
        ? 'font-arabic-scheherazade'
        : 'font-arabic-quran';

  const { showEnglish, showUrdu, showRomanUrdu } = getLanguageFlags(settings.translationDisplay);

  // Card Mode Navigation Handlers
  const handleCardPrev = () => {
    if (!surahDetail) return;
    stopAudio();
    if (activeAyahIndex > 0) {
      const nextIdx = activeAyahIndex - 1;
      setActiveAyahIndex(nextIdx);
      const prevAyah = surahDetail.ayahs[nextIdx];
      onUpdateLastRead({
        surahNumber: surahDetail.surah.number,
        surahName: surahDetail.surah.englishName,
        ayahNumber: prevAyah.numberInSurah,
        totalAyahsInSurah: surahDetail.surah.numberOfAyahs,
        juz: prevAyah.juz,
      });
    } else if (surahDetail.surah.number > 1) {
      setTargetAyahOnLoad(1);
      setSelectedSurahNumber(surahDetail.surah.number - 1);
    }
  };

  const handleCardNextAndMark = () => {
    if (!surahDetail) return;
    stopAudio();
    const currentAyah = surahDetail.ayahs[activeAyahIndex];
    if (!currentAyah) return;

    const verseKey = `${surahDetail.surah.number}:${currentAyah.numberInSurah}`;
    const alreadyRead = readVersesSet.has(verseKey);

    onMarkVerseRead(
      verseKey,
      currentAyah.letterCount,
      currentAyah.page,
      surahDetail.surah.number,
      surahDetail.surah.englishName,
      currentAyah.numberInSurah,
      surahDetail.surah.numberOfAyahs,
      currentAyah.juz
    );

    if (!alreadyRead) {
      setSessionVersesCount((v) => v + 1);
      setSessionHasanatCount((h) => h + currentAyah.hasanatValue);
    }

    if (activeAyahIndex < surahDetail.ayahs.length - 1) {
      const nextIdx = activeAyahIndex + 1;
      setActiveAyahIndex(nextIdx);
      const nextAyah = surahDetail.ayahs[nextIdx];
      onUpdateLastRead({
        surahNumber: surahDetail.surah.number,
        surahName: surahDetail.surah.englishName,
        ayahNumber: nextAyah.numberInSurah,
        totalAyahsInSurah: surahDetail.surah.numberOfAyahs,
        juz: nextAyah.juz,
      });
    } else if (surahDetail.surah.number < 114) {
      setTargetAyahOnLoad(1);
      setSelectedSurahNumber(surahDetail.surah.number + 1);
    } else {
      setShowSummaryModal(true);
    }
  };

  const handleImDone = () => {
    stopAudio();
    if (surahDetail) {
      const currentAyah = surahDetail.ayahs[activeAyahIndex];
      if (currentAyah) {
        onUpdateLastRead({
          surahNumber: surahDetail.surah.number,
          surahName: surahDetail.surah.englishName,
          ayahNumber: currentAyah.numberInSurah,
          totalAyahsInSurah: surahDetail.surah.numberOfAyahs,
          juz: currentAyah.juz,
        });
      }
    }
    setShowSummaryModal(true);
  };

  const handleSwitchToListen = () => {
    stopAudio();
    if (selectedSurahNumber !== null && !audioPlayer.hasActiveSession) {
      audioPlayer.selectSurah(selectedSurahNumber, {
        autoPlay: false,
        startAyah: activeAyahIndex + 1,
      });
    }
    onChangeSubMode('listen');
  };

  const modeSwitcherBar = (
    <div className="w-full max-w-full space-y-2.5">
      {/* Row 1: Clean 50/50 Split Pill-Row (Read Quran | Listen Quran) */}
      <div
        role="tablist"
        aria-label="Quran Experience Mode"
        className="grid grid-cols-2 gap-1 w-full rounded-2xl p-1 bg-[#F2EDE0] dark:bg-[#141417] border border-[#B0891E]/25 dark:border-[#D4AF37]/30"
      >
        <button
          type="button"
          role="tab"
          aria-selected={subMode === 'read'}
          onClick={() => onChangeSubMode('read')}
          className={`w-full min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
            subMode === 'read'
              ? 'bg-[#D4AF37] text-[#04180F] shadow-sm'
              : 'text-[#365645] dark:text-[#CEC5AD] hover:text-[#092A1B] dark:hover:text-[#FAF6EB]'
          }`}
        >
          <BookOpen className="w-4 h-4 shrink-0" />
          <span>Read Quran</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={subMode === 'listen'}
          onClick={handleSwitchToListen}
          className={`w-full min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
            subMode === 'listen'
              ? 'bg-[#D4AF37] text-[#04180F] shadow-sm'
              : 'text-[#365645] dark:text-[#CEC5AD] hover:text-[#092A1B] dark:hover:text-[#FAF6EB]'
          }`}
        >
          <Headphones className="w-4 h-4 shrink-0" />
          <span>Listen Quran</span>
        </button>
      </div>

      {/* Row 2: Standalone Full-Width Hifz & Recite Block Underneath */}
      <button
        type="button"
        role="tab"
        aria-selected={subMode === 'hifz'}
        onClick={() => {
          stopAudio();
          onChangeSubMode('hifz');
        }}
        className={`w-full min-h-[46px] px-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
          subMode === 'hifz'
            ? 'border-[#D4AF37] bg-[#D4AF37] text-[#04180F] shadow-sm'
            : 'border-[#B0891E]/25 dark:border-[#D4AF37]/30 bg-[#F2EDE0] dark:bg-[#141417] text-[#092A1B] dark:text-[#F3E5AB] hover:border-[#D4AF37]'
        }`}
      >
        <Mic className="w-4 h-4 shrink-0" />
        <span>Hifz &amp; Recite</span>
        <span
          className={`text-[11px] font-normal hidden sm:inline ${
            subMode === 'hifz' ? 'text-[#04180F]/80' : 'text-[#365645] dark:text-[#CEC5AD]'
          }`}
        >
          · Voice Correction &amp; 30 Juz Tracker
        </span>
      </button>
    </div>
  );

  // =========================================================================
  // LISTEN QURAN MODE (QURANIFY-STYLE AUDIO PLAYER)
  // =========================================================================
  if (subMode === 'listen') {
    return (
      <div className="space-y-5">
        {modeSwitcherBar}
        <ListenQuranView player={audioPlayer} settings={settings} />
      </div>
    );
  }

  // =========================================================================
  // HIFZ & VOICE RECITATION CORRECTION MODE
  // =========================================================================
  if (subMode === 'hifz') {
    return (
      <div className="space-y-5">
        {modeSwitcherBar}
        <HifzTrackerHub
          settings={settings}
          hifzProgress={hifzProgress}
          onUpdateSurahHifz={onUpdateSurahHifz}
          initialSurahNumber={selectedSurahNumber || lastRead.surahNumber}
          initialAyahNumber={selectedSurahNumber ? activeAyahIndex + 1 : lastRead.ayahNumber}
        />
      </div>
    );
  }

  // =========================================================================
  // ACTIVE SURAH READER VIEW
  // =========================================================================
  if (selectedSurahNumber !== null) {
    const activeAyah = surahDetail?.ayahs[activeAyahIndex] || null;
    const totalAyahs = surahDetail?.ayahs.length || 0;
    const isCardMode = settings.quranReaderMode === 'card';

    return (
      <div
        className={
          isCardMode
            ? 'h-[calc(100dvh-134px)] lg:h-[calc(100dvh-56px)] -mt-2.5 -mb-16 lg:-mt-2 lg:-mb-4 max-w-2xl mx-auto w-full flex flex-col justify-between gap-2'
            : 'space-y-4 pb-10'
        }
      >
        {/* Minimal 1-line utility bar in Card Mode; full bar in Scroll Mode */}
        {isCardMode ? (
          <div
            className={`shrink-0 flex items-center justify-between gap-2 h-9 ${
              playingAyahKey || audioPlayer.isPlaying ? 'pr-14 lg:pr-0' : ''
            }`}
          >
            <button
              type="button"
              onClick={() => setSelectedSurahNumber(null)}
              className="min-h-[36px] px-2.5 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/30 bg-white/80 dark:bg-[#141417]/80 text-xs font-semibold text-[#092A1B] dark:text-[#FAF6EB] hover:border-[#D4AF37] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Surahs</span>
            </button>

            <div className="flex items-center gap-1.5">
              <div
                className="inline-flex rounded-lg p-0.5 bg-[#F2EDE0] dark:bg-[#141417] border border-[#B0891E]/20 dark:border-[#D4AF37]/25"
                role="group"
                aria-label="Reader Layout Mode"
              >
                {(
                  [
                    { id: 'card', label: 'Card' },
                    { id: 'scroll', label: 'Scroll' },
                  ] as { id: QuranReaderMode; label: string }[]
                ).map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => onUpdateSettings({ quranReaderMode: mode.id })}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                      settings.quranReaderMode === mode.id
                        ? 'bg-[#D4AF37] text-[#04180F]'
                        : 'text-[#365645] dark:text-[#CEC5AD]'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={onOpenSettings}
                aria-label="Open Reader Settings"
                className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/30 bg-white/80 dark:bg-[#141417]/80 text-[#092A1B] dark:text-[#F3E5AB] hover:border-[#D4AF37] cursor-pointer"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <>
            {modeSwitcherBar}
            {/* Top Live Session Bar (Scroll Mode) */}
            <div className="rounded-2xl border border-[#D4AF37]/30 bg-white dark:bg-[#062115] p-3.5 sm:p-4 shadow-sm space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedSurahNumber(null)}
                    className="min-h-[40px] px-3 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-xs font-semibold text-[#092A1B] dark:text-[#FAF6EB] hover:bg-[#D4AF37]/15 inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Surahs</span>
                  </button>

                  {surahDetail && (
                    <div className="min-w-0">
                      <h2 className="font-display text-sm sm:text-base font-bold text-[#092A1B] dark:text-[#FAF6EB] truncate">
                        {surahDetail.surah.number}. {surahDetail.surah.englishName}
                      </h2>
                      <p className="text-[11px] text-[#365645] dark:text-[#CEC5AD] truncate">
                        {surahDetail.surah.englishNameTranslation}
                      </p>
                    </div>
                  )}
                </div>

                {/* Live Session Stats: Hasanat | Verses | 00m:00s + Settings Gear */}
                <div className="flex items-center gap-2 sm:gap-3 ml-auto">
                  <div className="rounded-xl border border-[#D4AF37]/30 bg-[#F9F6EE] dark:bg-[#04180F] px-3 py-1.5 flex items-center gap-2.5 text-xs tabular-nums">
                    <span className="font-bold text-[#B0891E] dark:text-[#F3E5AB]">
                      <AnimatedCounter value={todayRecord.hasanat} />
                      <span className="hidden sm:inline font-medium text-[#365645] dark:text-[#CEC5AD]">
                        {' '}
                        Hasanat
                      </span>
                    </span>
                    <span className="text-[#B0891E]/40">|</span>
                    <span className="font-semibold text-[#092A1B] dark:text-[#FAF6EB]">
                      {todayRecord.versesReadIds.length}v
                    </span>
                    <span className="text-[#B0891E]/40">|</span>
                    <button
                      onClick={() => setTimerRunning((r) => !r)}
                      className="inline-flex items-center gap-1 font-semibold text-[#092A1B] dark:text-[#F3E5AB] cursor-pointer"
                      title={timerRunning ? 'Pause session timer' : 'Resume session timer'}
                    >
                      {timerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      <span>{formatDurationMMSS(sessionSeconds)}</span>
                    </button>
                  </div>

                  <button
                    onClick={onOpenSettings}
                    aria-label="Open Reader Settings"
                    className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-[#092A1B] dark:text-[#F3E5AB] hover:bg-[#D4AF37]/15 cursor-pointer"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Reader Mode Toggle (Card | Scroll), Script & Language Quick Bar */}
              <div className="pt-2.5 border-t border-[#B0891E]/15 dark:border-[#D4AF37]/15 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex rounded-lg p-0.5 bg-[#F2EDE0] dark:bg-[#04180F] border border-[#B0891E]/20 dark:border-[#D4AF37]/20">
                    {(
                      [
                        { id: 'card', label: 'Card' },
                        { id: 'scroll', label: 'Scroll' },
                      ] as { id: QuranReaderMode; label: string }[]
                    ).map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => onUpdateSettings({ quranReaderMode: mode.id })}
                        className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                          settings.quranReaderMode === mode.id
                            ? 'bg-[#D4AF37] text-[#04180F]'
                            : 'text-[#365645] dark:text-[#CEC5AD]'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>

                  <select
                    aria-label="Quran Arabic Script"
                    value={settings.quranScript}
                    onChange={(e) => onUpdateSettings({ quranScript: e.target.value as QuranScript })}
                    className="min-h-[32px] px-2.5 py-1 rounded-lg border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-[#F9F6EE] dark:bg-[#04180F] text-xs font-medium"
                  >
                    <option value="uthmani">Uthmani</option>
                    <option value="indopak">Indo-Pak</option>
                    <option value="simple">Simple</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => onUpdateSettings({ autoAdvanceAudio: !settings.autoAdvanceAudio })}
                    title="Automatically play next Ayah when recitation finishes"
                    className={`min-h-[32px] px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-colors cursor-pointer ${
                      settings.autoAdvanceAudio
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#B0891E] dark:text-[#F3E5AB]'
                        : 'border-[#B0891E]/20 dark:border-[#D4AF37]/20 text-[#365645] dark:text-[#CEC5AD]'
                    }`}
                  >
                    Auto-Next: {settings.autoAdvanceAudio ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={onOpenSettings}
                    className="text-[11px] text-[#365645] dark:text-[#CEC5AD] hover:text-[#B0891E] dark:hover:text-[#F3E5AB] cursor-pointer"
                    title="Change Quran reciter in Settings"
                  >
                    Reciter:{' '}
                    <strong className="text-[#B0891E] dark:text-[#F3E5AB]">
                      {(
                        QURAN_RECITERS.find((r) => r.id === settings.quranReciter) ||
                        QURAN_RECITERS[0]
                      ).label}
                    </strong>
                  </button>

                  {surahDetail && (
                    <button
                      onClick={() =>
                        onMarkVersesBatchRead(
                          surahDetail.ayahs.map((a) => ({
                            key: `${surahDetail.surah.number}:${a.numberInSurah}`,
                            letterCount: a.letterCount,
                            page: a.page,
                          })),
                          surahDetail.surah.number,
                          surahDetail.surah.englishName,
                          surahDetail.ayahs.length,
                          surahDetail.surah.numberOfAyahs,
                          surahDetail.ayahs[surahDetail.ayahs.length - 1]?.juz
                        )
                      }
                      className="text-xs font-semibold text-[#B0891E] dark:text-[#D4AF37] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Mark Surah read</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Loading / Error State */}
        {detailLoading ? (
          <div className="flex-1 rounded-3xl border border-[#D4AF37]/25 bg-white dark:bg-[#141417] p-6 sm:p-8 animate-pulse flex flex-col justify-between gap-5">
            <div className="h-5 bg-[#F2EDE0] dark:bg-[#27272A] rounded w-1/3 mx-auto" />
            <div className="h-14 bg-[#F2EDE0] dark:bg-[#27272A] rounded w-4/5 mx-auto" />
            <div className="space-y-2">
              <div className="h-3.5 bg-[#F2EDE0] dark:bg-[#27272A] rounded w-full" />
              <div className="h-3.5 bg-[#F2EDE0] dark:bg-[#27272A] rounded w-3/4 mx-auto" />
            </div>
          </div>
        ) : detailError || !surahDetail ? (
          <div className="rounded-2xl border border-[#D4AF37]/30 bg-white dark:bg-[#141417] p-8 text-center space-y-3">
            <p className="text-sm text-[#365645] dark:text-[#CEC5AD]">
              {detailError || 'Unable to load Surah.'}
            </p>
            <button
              onClick={() => loadSurah(selectedSurahNumber, targetAyahOnLoad)}
              className="min-h-[44px] px-5 py-2 rounded-xl bg-[#D4AF37] text-[#04180F] text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Retry Surah
            </button>
          </div>
        ) : isCardMode && activeAyah ? (
          // =================================================================
          // UNIFIED ZERO-SCROLL QURANLY SINGLE-CARD ERGONOMICS
          // =================================================================
          (() => {
            const verseKey = `${surahDetail.surah.number}:${activeAyah.numberInSurah}`;
            const isBookmarked = bookmarkSet.has(verseKey);
            const isPlaying = playingAyahKey === verseKey;
            const integrityCheck = verifyAyahTextIntegrity(surahDetail, activeAyahIndex);

            return (
              <>
                {/* Full-Height Unified Centered Reading Card */}
                <section className="flex-1 min-h-0 rounded-3xl border border-[#B0891E]/25 dark:border-[#D4AF37]/30 bg-white dark:bg-[#141417] px-4 py-4 sm:px-7 sm:py-6 shadow-2xl flex flex-col justify-between overflow-hidden">
                  {/* 1. Compact Card Header Row: Audio/Loop Left | Surah + Fraction Center | Share Card Icon Right */}
                  <div className="shrink-0 grid grid-cols-[1fr_auto_1fr] items-center gap-2 pb-3 border-b border-[#B0891E]/15 dark:border-[#D4AF37]/15">
                    {/* Left: Audio Reciter Toggle + Loop/Repeat */}
                    <div className="flex items-center gap-1.5 justify-start">
                      {isOnline && (
                        <>
                          <button
                            type="button"
                            onClick={() => toggleAyahAudio(surahDetail.surah.number, activeAyah)}
                            aria-label={isPlaying ? 'Pause Ayah Recitation' : 'Play Ayah Recitation'}
                            title={isPlaying ? 'Pause Recitation' : 'Play Recitation'}
                            className={`min-h-[40px] min-w-[40px] rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                              isPlaying
                                ? 'bg-[#D4AF37] text-[#09090B] shadow-sm'
                                : 'text-[#092A1B] dark:text-[#F3E5AB] hover:bg-[#D4AF37]/15'
                            }`}
                          >
                            {isPlaying ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Volume2 className="w-4 h-4" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => setRepeatAudio((r) => !r)}
                            aria-label="Toggle Loop Repeat"
                            aria-pressed={repeatAudio}
                            title="Repeat current Ayah audio"
                            className={`min-h-[40px] min-w-[40px] rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                              repeatAudio
                                ? 'bg-[#D4AF37]/20 text-[#B0891E] dark:text-[#F3E5AB]'
                                : 'text-[#365645] dark:text-[#CEC5AD] hover:bg-[#D4AF37]/15'
                            }`}
                          >
                            <Repeat className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Center: Surah Number & Name stacked over Progress Fraction */}
                    <div className="text-center min-w-0 px-1">
                      <p className="font-display text-xs sm:text-sm font-bold text-[#092A1B] dark:text-[#FAF6EB] truncate">
                        {surahDetail.surah.number}. {surahDetail.surah.englishName}
                      </p>
                      <p className="text-[11px] font-semibold text-[#B0891E] dark:text-[#D4AF37] tabular-nums">
                        {activeAyah.numberInSurah} / {totalAyahs}
                      </p>
                    </div>

                    {/* Right: Compact Line Icon to Generate Share Card */}
                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          setShareCardPayload({
                            categoryLabel: 'Holy Quran · Ayah Reflection',
                            title: `Surah ${surahDetail.surah.englishName} (${verseKey})`,
                            arabicText: settings.showArabic ? integrityCheck.verifiedText : undefined,
                            translationText:
                              showRomanUrdu
                                ? activeAyah.romanUrduText || activeAyah.englishText
                                : activeAyah.englishText,
                            urduText:
                              showUrdu && activeAyah.urduText ? activeAyah.urduText : undefined,
                            reference: `Quran ${verseKey} · Juz ${activeAyah.juz}`,
                            filenameSlug: `quran-${surahDetail.surah.number}-${activeAyah.numberInSurah}`,
                          })
                        }
                        aria-label="Create Shareable Gold Card"
                        title="Create Shareable Gold Card"
                        className="min-h-[40px] min-w-[40px] rounded-xl flex items-center justify-center text-[#365645] dark:text-[#CEC5AD] hover:text-[#B0891E] dark:hover:text-[#F3E5AB] hover:bg-[#D4AF37]/15 transition-colors cursor-pointer"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* 2. Vertically Centered Spacious Editorial Body (safe-scrolls on ultra-long verses without clipping) */}
                  <div className="flex-1 min-h-0 overflow-y-auto flex flex-col px-1 sm:px-4 py-3">
                    <div className="my-auto w-full flex flex-col items-center text-center gap-5 sm:gap-6">
                      {/* Zone A: Arabic Verse Display Core */}
                      {settings.showArabic && (
                        <div className="w-full flex flex-col items-center justify-center space-y-3">
                          {activeAyahIndex === 0 &&
                            surahDetail.surah.number !== 1 &&
                            surahDetail.surah.number !== 9 && (
                              <p
                                dir="rtl"
                                className={`${arabicFontClass} text-xl sm:text-2xl text-center text-[#B0891E] dark:text-[#F3E5AB]`}
                              >
                                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                              </p>
                            )}

                          <p
                            dir="rtl"
                            data-quran-text="true"
                            data-verified-source={`${integrityCheck.sourceApi}:${integrityCheck.sourceEdition}`}
                            style={{
                              fontSize: `clamp(26px, 6.6vw, ${Math.max(32, Math.min(42, settings.arabicFontSize + 6))}px)`,
                            }}
                            className={`${arabicFontClass} leading-[2.15] text-center text-[#092A1B] dark:text-[#FAF6EB]`}
                          >
                            {integrityCheck.verifiedText}{' '}
                            <span className="text-[#B0891E] dark:text-[#D4AF37] text-[0.82em] mx-1">
                              ﴿{toArabicIndic(activeAyah.numberInSurah)}﴾
                            </span>
                          </p>
                        </div>
                      )}

                      {/* Zone B: Enlarged Centered Transliteration & Translation Block */}
                      <div className="w-full max-w-lg mx-auto space-y-3 text-center">
                        {settings.showTransliteration && activeAyah.transliteration && (
                          <p
                            style={{
                              fontSize: `clamp(15px, 3.8vw, 17px)`,
                            }}
                            className="italic leading-relaxed text-[#43574C] dark:text-[#C8C3B4]"
                          >
                            {activeAyah.transliteration}
                          </p>
                        )}

                        {showEnglish && (
                          <p
                            style={{
                              fontSize: `clamp(17px, 4.4vw, ${Math.max(19, Math.min(22, settings.englishFontSize + 3))}px)`,
                            }}
                            className="leading-[1.65] font-medium text-[#18201C] dark:text-[#FAF6EB]"
                          >
                            {activeAyah.englishText}
                          </p>
                        )}

                        {showUrdu && activeAyah.urduText && (
                          <p
                            dir="rtl"
                            style={{
                              fontSize: `clamp(19px, 5vw, ${Math.max(22, Math.min(26, settings.urduFontSize + 2))}px)`,
                            }}
                            className="font-urdu leading-[2.2] text-center text-[#18201C] dark:text-[#F3E5AB]"
                          >
                            {activeAyah.urduText}
                          </p>
                        )}

                        {showRomanUrdu && (
                          <p
                            style={{
                              fontSize: `clamp(16px, 4.2vw, 19px)`,
                            }}
                            className="leading-[1.65] text-[#43574C] dark:text-[#F3E5AB]/95"
                          >
                            {activeAyah.romanUrduText || activeAyah.englishText}
                          </p>
                        )}
                      </div>

                      {/* Zone C: Clean Horizontal Line-Icon Utility Row Beneath Translation (Share, Copy, Bookmark, Tafsir) */}
                      <div className="pt-1 flex items-center justify-center gap-5 sm:gap-7">
                        <button
                          type="button"
                          onClick={() => handleCopyOrShare(surahDetail.surah, activeAyah, 'share')}
                          aria-label="Share Verse"
                          title="Share Verse"
                          className="min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center text-[#365645] dark:text-[#B8B5AA] hover:text-[#B0891E] dark:hover:text-[#F3E5AB] hover:bg-[#D4AF37]/10 transition-colors cursor-pointer"
                        >
                          <Share2 className="w-5 h-5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopyOrShare(surahDetail.surah, activeAyah, 'copy')}
                          aria-label={copiedKey === verseKey ? 'Copied' : 'Copy Verse'}
                          title="Copy Verse"
                          className="min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center text-[#365645] dark:text-[#B8B5AA] hover:text-[#B0891E] dark:hover:text-[#F3E5AB] hover:bg-[#D4AF37]/10 transition-colors cursor-pointer"
                        >
                          {copiedKey === verseKey ? (
                            <Check className="w-5 h-5 text-[#D4AF37]" />
                          ) : (
                            <Copy className="w-5 h-5" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            onToggleBookmark({
                              key: verseKey,
                              surahNumber: surahDetail.surah.number,
                              surahName: surahDetail.surah.englishName,
                              ayahNumber: activeAyah.numberInSurah,
                              arabicText: integrityCheck.verifiedText,
                              englishText: activeAyah.englishText,
                              urduText: activeAyah.urduText,
                            })
                          }
                          aria-label={isBookmarked ? 'Remove Bookmark' : 'Bookmark Verse'}
                          aria-pressed={isBookmarked}
                          title={isBookmarked ? 'Bookmarked' : 'Bookmark Verse'}
                          className={`min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                            isBookmarked
                              ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                              : 'text-[#365645] dark:text-[#B8B5AA] hover:text-[#B0891E] dark:hover:text-[#F3E5AB] hover:bg-[#D4AF37]/10'
                          }`}
                        >
                          <Bookmark
                            className={`w-5 h-5 ${
                              isBookmarked ? 'fill-[#D4AF37] text-[#D4AF37]' : ''
                            }`}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() => openTafsir(surahDetail.surah, activeAyah)}
                          aria-label="Open Tafsir Ibn Kathir"
                          title="Tafsir Ibn Kathir"
                          className="min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center text-[#365645] dark:text-[#B8B5AA] hover:text-[#B0891E] dark:hover:text-[#F3E5AB] hover:bg-[#D4AF37]/10 transition-colors cursor-pointer"
                        >
                          <BookOpenText className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Fixed Bottom Action Row Pinned Directly Below the Card Window */}
                <div className="shrink-0 pt-2">
                  <div className="rounded-2xl border border-[#D4AF37]/35 bg-white dark:bg-[#141417] p-2 shadow-lg grid grid-cols-3 items-stretch gap-2">
                    {/* Left: Previous (←) */}
                    <button
                      type="button"
                      onClick={handleCardPrev}
                      disabled={activeAyahIndex === 0 && surahDetail.surah.number <= 1}
                      aria-label="Previous Ayah"
                      className="min-h-[50px] rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-[#F9F6EE] dark:bg-[#09090B] text-[#092A1B] dark:text-[#FAF6EB] font-semibold text-xs sm:text-sm disabled:opacity-35 hover:border-[#D4AF37] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">Previous</span>
                    </button>

                    {/* Center: I'm Done */}
                    <button
                      type="button"
                      onClick={handleImDone}
                      className="min-h-[50px] rounded-xl border border-[#D4AF37]/40 bg-[#0A3321] dark:bg-[#1B1B20] text-[#F3E5AB] font-display font-bold text-xs sm:text-sm hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>I&apos;m Done</span>
                    </button>

                    {/* Right: Forward (→) with Permanently Attached +Hasanat Gold Micro-Badge */}
                    <div className="relative">
                      <span className="absolute -top-2.5 right-1.5 z-10 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] border border-[#09090B]/25 text-[10px] font-extrabold text-[#09090B] tabular-nums shadow-md pointer-events-none whitespace-nowrap">
                        +{activeAyah.hasanatValue} Hasanat
                      </span>
                      <button
                        type="button"
                        onClick={handleCardNextAndMark}
                        aria-label="Mark verse read and advance to next Ayah"
                        className="w-full h-full min-h-[50px] rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C665] text-[#09090B] font-bold text-xs sm:text-sm hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <span className="hidden sm:inline">
                          {activeAyahIndex >= totalAyahs - 1 ? 'Next Surah' : 'Next'}
                        </span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })()
        ) : (
          // =================================================================
          // CLASSIC FULL-SURAH SCROLL MODE
          // =================================================================
          <div className="space-y-4">
            <div className="rounded-3xl border border-[#D4AF37]/30 theme-hero text-[#FAF6EB] p-6 text-center">
              <p className="font-arabic-quran text-3xl sm:text-4xl text-[#F3E5AB]" dir="rtl">
                {surahDetail.surah.name}
              </p>
              <h1 className="font-display text-xl sm:text-2xl font-bold mt-2">
                Surah {surahDetail.surah.englishName}
              </h1>
              <p className="text-xs sm:text-sm text-[#CEC5AD] mt-1">
                {surahDetail.surah.englishNameTranslation} · {surahDetail.surah.revelationType} ·{' '}
                {surahDetail.surah.numberOfAyahs} Verses
              </p>
              {settings.showArabic &&
                surahDetail.surah.number !== 1 &&
                surahDetail.surah.number !== 9 && (
                  <p
                    dir="rtl"
                    className={`${arabicFontClass} text-2xl sm:text-3xl text-[#FAF6EB] mt-5 pt-4 border-t border-[#D4AF37]/20`}
                  >
                    بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                  </p>
                )}
            </div>

            {surahDetail.ayahs.map((ayah, idx) => {
              const verseKey = `${surahDetail.surah.number}:${ayah.numberInSurah}`;
              const isRead = readVersesSet.has(verseKey);
              const isBookmarked = bookmarkSet.has(verseKey);
              const isPlaying = playingAyahKey === verseKey;
              const verseCheck = verifyAyahTextIntegrity(surahDetail, idx);

              return (
                <article
                  key={ayah.number}
                  data-ayah-key={verseKey}
                  className={`rounded-2xl border transition-colors p-5 sm:p-6 ${
                    isRead
                      ? 'border-[#D4AF37]/50 bg-[#D4AF37]/[0.06] dark:bg-[#0A3321]/75'
                      : 'border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#062115]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#B0891E]/10 dark:border-[#D4AF37]/10">
                    <span className="text-xs font-medium text-[#365645] dark:text-[#CEC5AD] tabular-nums">
                      Ayah {verseKey} · Page {ayah.page} · Juz {ayah.juz} ·{' '}
                      <strong className="text-[#B0891E] dark:text-[#F3E5AB]">
                        +{ayah.hasanatValue.toLocaleString()} Hasanat
                      </strong>
                    </span>
                    <button
                      onClick={() =>
                        onToggleVerseRead(
                          verseKey,
                          ayah.letterCount,
                          ayah.page,
                          surahDetail.surah.number,
                          surahDetail.surah.englishName,
                          ayah.numberInSurah,
                          surahDetail.surah.numberOfAyahs,
                          ayah.juz
                        )
                      }
                      className={`min-h-[36px] px-3 py-1 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isRead
                          ? 'bg-[#D4AF37] text-[#04180F]'
                          : 'border border-[#D4AF37]/30 text-[#092A1B] dark:text-[#F3E5AB] hover:bg-[#D4AF37]/15'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isRead ? 'Read' : 'Mark Read'}</span>
                    </button>
                  </div>

                  {settings.showArabic && (
                    <button
                      onClick={() => openTafsir(surahDetail.surah, ayah)}
                      className="w-full text-right mt-4 cursor-pointer group"
                      title="Tap for Tafsir Ibn Kathir"
                    >
                      <p
                        dir="rtl"
                        data-quran-text="true"
                        data-verified-source={`${verseCheck.sourceApi}:${verseCheck.sourceEdition}`}
                        style={{ fontSize: `${settings.arabicFontSize}px` }}
                        className={`${arabicFontClass} leading-[2.25] text-[#092A1B] dark:text-[#FAF6EB] group-hover:text-[#B0891E] dark:group-hover:text-[#F3E5AB] transition-colors`}
                      >
                        {verseCheck.verifiedText}{' '}
                        <span className="text-[#B0891E] dark:text-[#D4AF37] text-[0.82em] mx-1">
                          ﴿{toArabicIndic(ayah.numberInSurah)}﴾
                        </span>
                      </p>
                    </button>
                  )}

                  {settings.showTransliteration && ayah.transliteration && (
                    <p className="mt-3 text-xs sm:text-sm italic text-[#B0891E] dark:text-[#D4AF37]/90 leading-relaxed">
                      {ayah.transliteration}
                    </p>
                  )}

                  <div
                    className={`mt-4 gap-5 ${
                      showEnglish && (showUrdu || showRomanUrdu)
                        ? 'grid grid-cols-1 lg:grid-cols-2'
                        : 'space-y-3'
                    }`}
                  >
                    {showEnglish && (
                      <p
                        style={{ fontSize: `${settings.englishFontSize}px` }}
                        className="leading-relaxed text-[#365645] dark:text-[#CEC5AD]"
                      >
                        {ayah.englishText}
                      </p>
                    )}

                    {showUrdu && (
                      <p
                        dir="rtl"
                        style={{ fontSize: `${settings.urduFontSize}px` }}
                        className={`font-urdu leading-loose text-right text-[#092A1B] dark:text-[#F3E5AB]/95 ${
                          showEnglish
                            ? 'lg:border-l lg:border-[#B0891E]/15 dark:lg:border-[#D4AF37]/15 lg:pl-5'
                            : ''
                        }`}
                      >
                        {ayah.urduText}
                      </p>
                    )}

                    {showRomanUrdu && (
                      <p
                        style={{ fontSize: `${settings.englishFontSize}px` }}
                        className="leading-relaxed text-[#365645] dark:text-[#F3E5AB]"
                      >
                        {ayah.romanUrduText || ayah.englishText}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#B0891E]/10 dark:border-[#D4AF37]/10 flex flex-wrap items-center gap-2">
                    {isOnline && (
                      <button
                        onClick={() => toggleAyahAudio(surahDetail.surah.number, ayah)}
                        className={`min-h-[40px] px-3 py-1.5 rounded-xl border text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer ${
                          isPlaying
                            ? 'border-[#D4AF37] bg-[#D4AF37] text-[#04180F]'
                            : 'border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-[#092A1B] dark:text-[#F3E5AB]'
                        }`}
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        <span>{isPlaying ? 'Pause' : 'Listen'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => openTafsir(surahDetail.surah, ayah)}
                      className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-[#0A3321]/8 dark:bg-[#0A3321] border border-[#D4AF37]/25 text-xs font-semibold text-[#092A1B] dark:text-[#F3E5AB] hover:border-[#D4AF37] inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <BookOpenText className="w-3.5 h-3.5 text-[#B0891E] dark:text-[#D4AF37]" />
                      <span>Tafsir Ibn Kathir</span>
                    </button>

                    <button
                      onClick={() =>
                        onToggleBookmark({
                          key: verseKey,
                          surahNumber: surahDetail.surah.number,
                          surahName: surahDetail.surah.englishName,
                          ayahNumber: ayah.numberInSurah,
                          arabicText: ayah.arabicText,
                          englishText: ayah.englishText,
                          urduText: ayah.urduText,
                        })
                      }
                      className="min-h-[40px] px-3 py-1.5 rounded-xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 text-xs font-medium text-[#365645] dark:text-[#CEC5AD] hover:text-[#092A1B] dark:hover:text-[#FAF6EB] inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      {isBookmarked ? (
                        <>
                          <BookmarkCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Saved</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-3.5 h-3.5" />
                          <span>Bookmark</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleCopyOrShare(surahDetail.surah, ayah, 'copy')}
                      className="min-h-[40px] px-3 py-1.5 rounded-xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 text-xs font-medium text-[#365645] dark:text-[#CEC5AD] hover:text-[#092A1B] dark:hover:text-[#FAF6EB] inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedKey === verseKey ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      onClick={() => handleCopyOrShare(surahDetail.surah, ayah, 'share')}
                      className="min-h-[40px] px-3 py-1.5 rounded-xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 text-xs font-medium text-[#365645] dark:text-[#CEC5AD] hover:text-[#092A1B] dark:hover:text-[#FAF6EB] inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setShareCardPayload({
                          categoryLabel: 'Holy Quran · Ayah Reflection',
                          title: `Surah ${surahDetail.surah.englishName} (${verseKey})`,
                          arabicText: settings.showArabic ? ayah.arabicText : undefined,
                          translationText:
                            showRomanUrdu
                              ? ayah.romanUrduText || ayah.englishText
                              : ayah.englishText,
                          urduText: showUrdu && ayah.urduText ? ayah.urduText : undefined,
                          reference: `Quran ${verseKey} · Juz ${ayah.juz}`,
                          filenameSlug: `quran-${surahDetail.surah.number}-${ayah.numberInSurah}`,
                        })
                      }
                      className="min-h-[40px] px-3 py-1.5 rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-xs font-semibold text-[#B0891E] dark:text-[#F3E5AB] hover:bg-[#D4AF37] hover:text-[#09090B] inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Share Card</span>
                    </button>
                  </div>
                </article>
              );
            })}

            <div className="flex items-center justify-between gap-4 pt-4">
              <button
                disabled={surahDetail.surah.number <= 1}
                onClick={() => {
                  setTargetAyahOnLoad(1);
                  setSelectedSurahNumber(surahDetail.surah.number - 1);
                }}
                className="min-h-[44px] px-4 py-2 rounded-xl border border-[#D4AF37]/30 text-xs sm:text-sm font-semibold text-[#092A1B] dark:text-[#FAF6EB] disabled:opacity-40 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Surah</span>
              </button>
              <button
                disabled={surahDetail.surah.number >= 114}
                onClick={() => {
                  setTargetAyahOnLoad(1);
                  setSelectedSurahNumber(surahDetail.surah.number + 1);
                }}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-[#D4AF37] text-[#04180F] text-xs sm:text-sm font-semibold disabled:opacity-40 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Next Surah</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Daily Session Summary Modal ("I'm Done") */}
        {showSummaryModal && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/65 backdrop-blur-sm p-0 sm:p-4"
            onClick={() => setShowSummaryModal(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Reading Session Summary"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl border border-[#D4AF37]/40 bg-[#F9F6EE] dark:bg-[#062115] p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#B0891E] dark:text-[#F3E5AB]">
                    <Sparkles className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                      Masha&apos;Allah! Progress Saved
                    </h3>
                    <p className="text-xs text-[#365645] dark:text-[#CEC5AD]">
                      Your reading bookmark &amp; Hasanat are updated
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSummaryModal(false)}
                  aria-label="Close summary"
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 tabular-nums">
                <div className="rounded-2xl border border-[#D4AF37]/30 bg-white dark:bg-[#04180F] p-4">
                  <p className="text-[11px] uppercase tracking-wider text-[#B0891E] dark:text-[#D4AF37] font-semibold">
                    Today&apos;s Hasanat
                  </p>
                  <p className="text-2xl font-bold text-[#092A1B] dark:text-[#FAF6EB] mt-1">
                    {todayRecord.hasanat.toLocaleString()}
                  </p>
                  {sessionHasanatCount > 0 && (
                    <p className="text-[11px] text-[#365645] dark:text-[#CEC5AD]">
                      +{sessionHasanatCount.toLocaleString()} this session
                    </p>
                  )}
                </div>

                <div className="rounded-2xl border border-[#D4AF37]/30 bg-white dark:bg-[#04180F] p-4">
                  <p className="text-[11px] uppercase tracking-wider text-[#B0891E] dark:text-[#D4AF37] font-semibold">
                    Today&apos;s Verses
                  </p>
                  <p className="text-2xl font-bold text-[#092A1B] dark:text-[#FAF6EB] mt-1">
                    {todayRecord.versesReadIds.length}/{goals.versesPerDay}
                  </p>
                  {sessionVersesCount > 0 && (
                    <p className="text-[11px] text-[#365645] dark:text-[#CEC5AD]">
                      +{sessionVersesCount} this session
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#04180F] p-3.5 flex items-center justify-between text-xs tabular-nums">
                <span className="text-[#365645] dark:text-[#CEC5AD]">Session Time</span>
                <strong className="text-[#092A1B] dark:text-[#F3E5AB]">
                  {formatDurationMMSS(sessionSeconds)}
                </strong>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setShowSummaryModal(false);
                    setSelectedSurahNumber(null);
                  }}
                  className="min-h-[44px] rounded-xl border border-[#B0891E]/30 dark:border-[#D4AF37]/30 text-xs font-semibold text-[#092A1B] dark:text-[#FAF6EB] cursor-pointer"
                >
                  Surah Directory
                </button>
                <button
                  onClick={() => setShowSummaryModal(false)}
                  className="min-h-[44px] rounded-xl bg-[#D4AF37] text-[#04180F] text-xs font-semibold cursor-pointer"
                >
                  Continue Reading
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tafsir Ibn Kathir Drawer (English & Urdu) */}
        {tafsirTarget && (
          <div
            className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/65 backdrop-blur-sm p-0 lg:p-6"
            onClick={() => setTafsirTarget(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="w-full lg:max-w-2xl max-h-[85vh] flex flex-col rounded-t-3xl lg:rounded-3xl border border-[#D4AF37]/35 bg-[#F9F6EE] dark:bg-[#062115] text-[#092A1B] dark:text-[#FAF6EB] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lg:hidden w-10 h-1.5 bg-[#B0891E]/30 rounded-full mx-auto mt-3" />
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-[#B0891E]/20 dark:border-[#D4AF37]/20">
                <div>
                  <h3 className="font-display text-lg font-bold">
                    Tafsir Ibn Kathir · {tafsirTarget.surah.englishName} ({tafsirTarget.surah.number}:
                    {tafsirTarget.ayah.numberInSurah})
                  </h3>
                  <p className="text-xs text-[#365645] dark:text-[#CEC5AD]">
                    {tafsirData?.resourceName || 'Tafsir Ibn Kathir'}
                  </p>
                </div>

                <button
                  onClick={() => setTafsirTarget(null)}
                  aria-label="Close Tafsir"
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-5">
                <div className="rounded-2xl border border-[#D4AF37]/25 bg-white dark:bg-[#0A3321]/70 p-4 space-y-2">
                  {settings.showArabic && (
                    <p
                      dir="rtl"
                      className={`${arabicFontClass} text-2xl leading-[2] text-right text-[#092A1B] dark:text-[#F3E5AB]`}
                    >
                      {tafsirTarget.ayah.arabicText}
                    </p>
                  )}
                  <p
                    dir={effectiveTafsirLang === 'ur' ? 'rtl' : 'ltr'}
                    className={`text-sm text-[#365645] dark:text-[#CEC5AD] ${
                      effectiveTafsirLang === 'ur' ? 'font-urdu text-right leading-loose' : ''
                    }`}
                  >
                    {effectiveTafsirLang === 'ur'
                      ? tafsirTarget.ayah.urduText
                      : tafsirTarget.ayah.englishText}
                  </p>
                </div>

                {tafsirLoading ? (
                  <div className="space-y-3 animate-pulse">
                    <div className="h-4 bg-[#F2EDE0] dark:bg-[#0A3321] rounded w-2/3" />
                    <div className="h-4 bg-[#F2EDE0] dark:bg-[#0A3321] rounded w-full" />
                    <div className="h-4 bg-[#F2EDE0] dark:bg-[#0A3321] rounded w-5/6" />
                  </div>
                ) : tafsirError ? (
                  <div className="text-sm text-[#365645] dark:text-[#CEC5AD] space-y-3">
                    <p>{tafsirError}</p>
                    <button
                      onClick={() => openTafsir(tafsirTarget.surah, tafsirTarget.ayah)}
                      className="min-h-[40px] px-4 py-2 rounded-xl bg-[#D4AF37] text-[#04180F] text-xs font-semibold cursor-pointer"
                    >
                      Retry Tafsir
                    </button>
                  </div>
                ) : (
                  <div
                    dir={effectiveTafsirLang === 'ur' ? 'rtl' : 'ltr'}
                    className={`prose prose-sm max-w-none text-[#092A1B] dark:text-[#FAF6EB] [&_h1]:font-display [&_h1]:text-lg [&_h1]:font-bold [&_h1]:text-[#B0891E] dark:[&_h1]:text-[#F3E5AB] [&_h1]:mt-4 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-3 [&_p]:leading-relaxed [&_p]:mt-2.5 [&_p]:text-[#365645] dark:[&_p]:text-[#CEC5AD] ${
                      effectiveTafsirLang === 'ur' ? 'font-urdu text-right text-base' : ''
                    }`}
                    dangerouslySetInnerHTML={{ __html: tafsirData?.text || '' }}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        <ShareCardModal payload={shareCardPayload} onClose={() => setShareCardPayload(null)} />
      </div>
    );
  }

  // =========================================================================
  // DIRECTORY VIEW (114 SURAHS, QUICK RECITATIONS, BOOKMARKS)
  // =========================================================================
  return (
    <div className="space-y-6 pb-8">
      {modeSwitcherBar}
      {/* The Large Main Qur'an Gateway Card Anchored at the Absolute Top */}
      <section className="theme-hero relative overflow-hidden rounded-3xl border border-[#D4AF37]/40 text-[#FAF6EB] p-5 sm:p-6 shadow-xl space-y-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 w-56 h-56 rounded-full bg-[#D4AF37]/12 blur-3xl"
        />

        <div className="relative flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-4">
            <ProgressRing
              value={todayRecord.hasanat}
              max={goals.hasanatPerDay}
              size={64}
              strokeWidth={5}
              label={`${Math.min(100, Math.round((todayRecord.hasanat / Math.max(1, goals.hasanatPerDay)) * 100))}%`}
            />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#F3E5AB]">
                Daily Recitation Target
              </p>
              <div className="flex items-baseline gap-2.5 mt-0.5">
                <span className="font-display text-2xl sm:text-3xl font-bold tabular-nums text-[#FAF6EB]">
                  {todayRecord.versesReadIds.length}/{goals.versesPerDay} Verses
                </span>
                <span className="text-xs font-semibold text-[#D4AF37] tabular-nums">
                  ({Math.min(100, Math.round((todayRecord.versesReadIds.length / Math.max(1, goals.versesPerDay)) * 100))}%)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#F3E5AB] font-semibold tabular-nums px-3 py-1.5 rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/15">
              {todayRecord.hasanat.toLocaleString()} Hasanat Earned
            </span>
          </div>
        </div>

        {/* Current Reading Bookmark + Juz Progress */}
        <div className="relative rounded-2xl border border-[#D4AF37]/25 bg-[#09090B]/75 p-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] text-[#CEC5AD] uppercase tracking-wider">
                Current Reading Bookmark
              </p>
              <p className="font-display text-base sm:text-lg font-bold text-[#FAF6EB] truncate mt-0.5 tabular-nums">
                Surah {lastRead.surahNumber}. {lastRead.surahName} · Ayah {lastRead.ayahNumber}/{lastRead.totalAyahsInSurah}
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-[#CEC5AD] tabular-nums">
              <span>Juz Progress</span>
              <span className="font-semibold text-[#F3E5AB]">
                {lastRead.juz}/30 Juz · {Math.min(100, Math.max(3, Math.round((lastRead.juz / 30) * 100)))}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#1B1B20] border border-[#D4AF37]/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#B0891E] via-[#D4AF37] to-[#F3E5AB] transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(3, Math.round((lastRead.juz / 30) * 100)))}%` }}
              />
            </div>
          </div>
        </div>

        {/* Dual Main Gateway Launch Buttons: Read / Listen */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              setTargetAyahOnLoad(lastRead.ayahNumber || 1);
              setSelectedSurahNumber(lastRead.surahNumber || 1);
            }}
            className="min-h-[48px] rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E5C665] to-[#D4AF37] text-[#09090B] font-display font-bold text-sm sm:text-base hover:brightness-105 active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Continue Reading ({lastRead.surahNumber}:{lastRead.ayahNumber})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleSwitchToListen}
            className="min-h-[48px] rounded-2xl border border-[#D4AF37]/45 bg-[#1B1B20] text-[#F3E5AB] font-display font-bold text-sm sm:text-base hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Headphones className="w-4 h-4 text-[#D4AF37]" />
            <span>Listen Quran Audio</span>
          </button>
        </div>
      </section>

      {/* Quick Recitation Pills */}
      <section className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#062115] p-4 space-y-2.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#B0891E] dark:text-[#D4AF37]">
          Quick Recitation
        </p>
        <div className="flex flex-wrap gap-2">
          {QUICK_RECITATION_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setTargetAyahOnLoad(item.ayahNumber || 1);
                setSelectedSurahNumber(item.surahNumber);
              }}
              className="min-h-[38px] px-3 py-1.5 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-[#F9F6EE] dark:bg-[#04180F] text-xs font-semibold text-[#092A1B] dark:text-[#F3E5AB] hover:border-[#D4AF37] cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      {/* Saved Bookmarks Strip */}
      {quranBookmarks.length > 0 && (
        <section className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#062115] p-4 space-y-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#B0891E] dark:text-[#D4AF37]">
            Saved Quran Bookmarks
          </p>
          <div className="flex flex-wrap gap-2">
            {quranBookmarks.slice(0, 6).map((b) => (
              <button
                key={b.key}
                onClick={() => {
                  setTargetAyahOnLoad(b.ayahNumber);
                  setSelectedSurahNumber(b.surahNumber);
                }}
                className="min-h-[38px] px-3 py-1.5 rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/10 text-xs font-semibold text-[#092A1B] dark:text-[#F3E5AB] hover:bg-[#D4AF37]/20 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <BookmarkCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>
                  {b.surahName} ({b.key})
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Search & Revelation Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#365645] dark:text-[#CEC5AD]" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Surah by name, meaning, or number..."
            className="w-full min-h-[44px] pl-10 pr-4 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] text-sm text-[#092A1B] dark:text-[#FAF6EB] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {(['All', 'Meccan', 'Medinan'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setRevFilter(tab)}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                revFilter === tab
                  ? 'bg-[#D4AF37] text-[#04180F]'
                  : 'bg-white dark:bg-[#062115] border border-[#B0891E]/20 dark:border-[#D4AF37]/20 text-[#365645] dark:text-[#CEC5AD]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 114 Surah Grid */}
      {surahsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-24 rounded-2xl border border-[#D4AF37]/15 bg-white dark:bg-[#062115] animate-pulse"
            />
          ))}
        </div>
      ) : surahsError ? (
        <div className="rounded-2xl border border-[#D4AF37]/30 bg-white dark:bg-[#062115] p-6 text-center space-y-3">
          <p className="text-sm text-[#365645] dark:text-[#CEC5AD]">{surahsError}</p>
          <button
            onClick={loadSurahDirectory}
            className="min-h-[44px] px-5 py-2 rounded-xl bg-[#D4AF37] text-[#04180F] text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredSurahs.map((s) => (
            <button
              key={s.number}
              onClick={() => {
                setTargetAyahOnLoad(1);
                setSelectedSurahNumber(s.number);
              }}
              className="group text-left rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#062115] hover:border-[#D4AF37] p-4 transition-colors flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/10 flex items-center justify-center text-sm font-bold tabular-nums text-[#B0891E] dark:text-[#F3E5AB] shrink-0">
                  {s.number}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#092A1B] dark:text-[#FAF6EB] truncate group-hover:text-[#B0891E] dark:group-hover:text-[#F3E5AB]">
                    {s.englishName}
                  </h3>
                  <p className="text-xs text-[#365645] dark:text-[#CEC5AD] truncate">
                    {s.englishNameTranslation} · {s.numberOfAyahs} Ayahs
                  </p>
                </div>
              </div>
              <span
                dir="rtl"
                className="font-arabic-quran text-xl text-[#B0891E] dark:text-[#F3E5AB] shrink-0"
              >
                {s.name.replace('سُورَةُ ', '')}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
