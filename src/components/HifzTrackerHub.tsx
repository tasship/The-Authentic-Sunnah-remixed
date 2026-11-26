import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Eye,
  EyeOff,
  Flame,
  Mic,
  MicOff,
  RefreshCw,
  RotateCcw,
  Search,
  Sparkles,
  Volume2,
  WifiOff,
} from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import {
  fetchAllSurahs,
  fetchSurahDetail,
  getAyahAudioUrls,
  getReciterMeta,
} from '../services/quranApi';
import { trackFeatureUsage } from '../services/firebaseTelemetry';
import {
  HifzStatus,
  ReaderSettings,
  SurahDetail,
  SurahHifzProgress,
  SurahSummary,
} from '../types';
import { toArabicIndic } from '../utils/arabic';
import { ProgressRing } from './ProgressRing';

interface HifzTrackerHubProps {
  settings: ReaderSettings;
  hifzProgress: Record<number, SurahHifzProgress>;
  onUpdateSurahHifz: (
    surahNumber: number,
    status: HifzStatus,
    memorizedAyahs: number,
    markReviewed?: boolean
  ) => void;
  initialSurahNumber?: number | null;
  initialAyahNumber?: number | null;
}

type HifzTab = 'voice' | 'progress';
type ProgressFilter = 'all' | 'memorizing' | 'memorized' | 'not_started';
type WordState = 'pending' | 'correct' | 'mistake';

interface ContinuousWordItem {
  globalIndex: number;
  ayahIndex: number;
  ayahNumberInSurah: number;
  globalAyahNumber: number;
  wordIndexInAyah: number;
  rawWord: string;
  isLastWordOfAyah: boolean;
  transliterationHint?: string;
  translationSnippet?: string;
}

interface MistakeInfo {
  globalWordIndex: number;
  expectedArabic: string;
  spokenWord: string;
  transliterationHint?: string;
  reason: 'wrong' | 'skipped' | 'hesitation';
}

interface SpeechRecognitionAlternativeLike {
  transcript: string;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  length: number;
  0: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((ev: SpeechRecognitionEventLike) => void) | null;
  onerror: ((ev: { error?: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

const TOTAL_QURAN_AYAHS = 6236;
const QUIET_CORRECTION_DELAY_MS = 5000; // Strict 5 continuous seconds

function normalizeArabicWord(word: string): string {
  return word
    .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/[^\u0621-\u064A]/g, '')
    .trim();
}

function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const dp: number[] = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const temp = dp[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + cost);
      prev = temp;
    }
  }
  return dp[b.length];
}

function wordsMatch(spoken: string, expected: string): boolean {
  const s = normalizeArabicWord(spoken);
  const e = normalizeArabicWord(expected);
  if (!s || !e) return false;
  if (s === e) return true;
  if (e.length >= 4 && s.length >= 3 && editDistance(s, e) <= 1) return true;
  if (e.length >= 5 && (e.endsWith(s) || s.endsWith(e)) && Math.abs(e.length - s.length) <= 1) {
    return true;
  }
  return false;
}

function formatLastReviewed(iso?: string): string {
  if (!iso) return 'Not reviewed yet';
  const diffDays = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (diffDays <= 0) return 'Reviewed today';
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
}

export const HifzTrackerHub: React.FC<HifzTrackerHubProps> = ({
  settings,
  hifzProgress,
  onUpdateSurahHifz,
  initialSurahNumber,
  initialAyahNumber,
}) => {
  const isOnline = useOnlineStatus();
  const [activeTab, setActiveTab] = useState<HifzTab>('voice');
  const [surahs, setSurahs] = useState<SurahSummary[]>([]);
  const [surahsLoading, setSurahsLoading] = useState(true);
  const [progressFilter, setProgressFilter] = useState<ProgressFilter>('all');
  const [surahSearch, setSurahSearch] = useState('');

  // Selected Surah for Continuous Hifz Flow
  const [voiceSurahNum, setVoiceSurahNum] = useState<number>(initialSurahNumber || 1);
  const [surahDetail, setSurahDetail] = useState<SurahDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Continuous Canvas State
  const [hideWordsMode, setHideWordsMode] = useState(true);
  const [wordStates, setWordStates] = useState<WordState[]>([]);
  const [cursorIndex, setCursorIndex] = useState(0);
  const [peekingIndices, setPeekingIndices] = useState<Record<number, boolean>>({});
  const [mistakeInfo, setMistakeInfo] = useState<MistakeInfo | null>(null);
  const [activeCorrectionWordIdx, setActiveCorrectionWordIdx] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [lastHeardText, setLastHeardText] = useState('');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // References for non-stop continuous mic & timer loops
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const sheikhAudioRef = useRef<HTMLAudioElement | null>(null);
  const silenceTimerRef = useRef<number | null>(null);
  const userWantsMicRef = useRef(false);
  const isPausedForCorrectionRef = useRef(false);
  const cursorIndexRef = useRef(0);
  cursorIndexRef.current = cursorIndex;
  const isMountedRef = useRef(true);
  const wordRefs = useRef<Map<number, HTMLElement>>(new Map());

  // Continuous Words Array built across all Ayahs of selected Surah
  const continuousWords = useMemo<ContinuousWordItem[]>(() => {
    if (!surahDetail || !surahDetail.ayahs || surahDetail.ayahs.length === 0) {
      return [];
    }

    const result: ContinuousWordItem[] = [];
    let globalIdx = 0;

    surahDetail.ayahs.forEach((ayah, aIdx) => {
      const rawTokens = ayah.arabicText.trim().split(/\s+/).filter(Boolean);
      const translitTokens = ayah.transliteration?.trim().split(/\s+/).filter(Boolean) || [];

      rawTokens.forEach((rawWord, wIdx) => {
        const isLast = wIdx === rawTokens.length - 1;
        const hint =
          translitTokens.length === rawTokens.length
            ? translitTokens[wIdx]
            : translitTokens[
                Math.min(
                  translitTokens.length - 1,
                  Math.round((wIdx / Math.max(1, rawTokens.length)) * translitTokens.length)
                )
              ] || undefined;

        result.push({
          globalIndex: globalIdx,
          ayahIndex: aIdx,
          ayahNumberInSurah: ayah.numberInSurah,
          globalAyahNumber: ayah.number,
          wordIndexInAyah: wIdx,
          rawWord,
          isLastWordOfAyah: isLast,
          transliterationHint: hint,
          translationSnippet: ayah.englishText,
        });

        globalIdx++;
      });
    });

    return result;
  }, [surahDetail]);

  const continuousWordsRef = useRef<ContinuousWordItem[]>([]);
  continuousWordsRef.current = continuousWords;
  const surahDetailRef = useRef<SurahDetail | null>(null);
  surahDetailRef.current = surahDetail;
  const voiceSurahNumRef = useRef(voiceSurahNum);
  voiceSurahNumRef.current = voiceSurahNum;
  const reciterIdRef = useRef(settings.quranReciter);
  reciterIdRef.current = settings.quranReciter;
  const reciterMeta = useMemo(() => getReciterMeta(settings.quranReciter), [settings.quranReciter]);

  // Lifecycle
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Load 114 Surahs Directory
  useEffect(() => {
    let mounted = true;
    setSurahsLoading(true);
    fetchAllSurahs()
      .then((list) => {
        if (mounted) setSurahs(list);
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setSurahsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Fetch Full Surah Detail for Continuous Reading
  useEffect(() => {
    let mounted = true;
    setDetailLoading(true);
    fetchSurahDetail(voiceSurahNum, {
      script: 'uthmani',
      englishTranslator: settings.englishTranslator,
      urduTranslator: settings.urduTranslator,
      romanUrduTranslator: settings.romanUrduTranslator,
    })
      .then((detail) => {
        if (!mounted) return;
        setSurahDetail(detail);
      })
      .catch(() => {
        if (mounted) setSurahDetail(null);
      })
      .finally(() => {
        if (mounted) setDetailLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [voiceSurahNum, settings.englishTranslator, settings.urduTranslator, settings.romanUrduTranslator]);

  // Reset words state on Surah change
  useEffect(() => {
    setWordStates(Array.from({ length: continuousWords.length }, () => 'pending'));
    setCursorIndex(0);
    cursorIndexRef.current = 0;
    setPeekingIndices({});
    setMistakeInfo(null);
    setActiveCorrectionWordIdx(null);
    setLastHeardText('');
    setShowCelebration(false);
  }, [voiceSurahNum, continuousWords.length]);

  const clearSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current !== null) {
      window.clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  const teardownRecognitionHardware = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.stop();
      } catch {
        // hardware stop race
      }
      recognitionRef.current = null;
    }
  }, []);

  const stopAudioPronunciation = useCallback(() => {
    if (sheikhAudioRef.current) {
      sheikhAudioRef.current.pause();
      sheikhAudioRef.current.onended = null;
      sheikhAudioRef.current.onerror = null;
      sheikhAudioRef.current = null;
    }
    setAudioPlaying(false);
    setActiveCorrectionWordIdx(null);
  }, []);

  const stopListening = useCallback(() => {
    userWantsMicRef.current = false;
    isPausedForCorrectionRef.current = false;
    clearSilenceTimer();
    teardownRecognitionHardware();
    stopAudioPronunciation();
    setIsListening(false);
  }, [clearSilenceTimer, stopAudioPronunciation, teardownRecognitionHardware]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearSilenceTimer();
      stopListening();
    };
  }, [clearSilenceTimer, stopListening]);

  // Auto-scroll continuous page to keep the active unblurring word in view
  const scrollWordIntoView = useCallback((index: number) => {
    const el = wordRefs.current.get(index);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  // 5-Second Silence Buffer: Play Sheikh Guidance Audio & Seamlessly Reactivate Continuous Mic
  const triggerSheikhCorrection = useCallback(
    (targetWordIdx: number, reason: 'wrong' | 'skipped' | 'hesitation') => {
      const words = continuousWordsRef.current;
      if (targetWordIdx < 0 || targetWordIdx >= words.length) return;

      const targetWord = words[targetWordIdx];
      const detail = surahDetailRef.current;
      if (!detail) return;

      setWordStates((prev) => {
        const next = [...prev];
        next[targetWordIdx] = 'mistake';
        return next;
      });

      setMistakeInfo({
        globalWordIndex: targetWordIdx,
        expectedArabic: targetWord.rawWord,
        spokenWord: '',
        transliterationHint: targetWord.transliterationHint,
        reason,
      });

      setActiveCorrectionWordIdx(targetWordIdx);
      scrollWordIntoView(targetWordIdx);

      // Temporarily pause mic while Sheikh voice guides
      isPausedForCorrectionRef.current = true;
      teardownRecognitionHardware();
      setIsListening(false);

      // Play Sheikh recitation for the current Ayah
      const audioUrls = getAyahAudioUrls(
        reciterIdRef.current,
        voiceSurahNumRef.current,
        targetWord.ayahNumberInSurah,
        targetWord.globalAyahNumber
      );

      const finishCorrectionAndReactivate = () => {
        stopAudioPronunciation();
        if (!isMountedRef.current) return;
        isPausedForCorrectionRef.current = false;

        // The moment the Sheikh finishes guiding, instantly reactivate continuous mic automatically!
        if (userWantsMicRef.current && cursorIndexRef.current < continuousWordsRef.current.length) {
          startListeningInstance();
        }
      };

      if (!isOnline || audioUrls.length === 0) {
        // Offline: show visual hint for 3 seconds then resume
        window.setTimeout(finishCorrectionAndReactivate, 3200);
        return;
      }

      let urlIndex = 0;
      const tryPlayback = (idx: number) => {
        if (idx >= audioUrls.length) {
          finishCorrectionAndReactivate();
          return;
        }

        const audio = new Audio(audioUrls[idx]);
        sheikhAudioRef.current = audio;
        setAudioPlaying(true);

        audio.onended = () => {
          finishCorrectionAndReactivate();
        };

        audio.onerror = () => {
          tryPlayback(idx + 1);
        };

        audio.play().catch(() => {
          tryPlayback(idx + 1);
        });
      };

      tryPlayback(0);
    },
    [isOnline, scrollWordIntoView, stopAudioPronunciation, teardownRecognitionHardware]
  );

  // 5-Second Silence Timer Scheduler
  const scheduleSilenceBuffer = useCallback(() => {
    clearSilenceTimer();
    if (
      !userWantsMicRef.current ||
      isPausedForCorrectionRef.current ||
      !isMountedRef.current ||
      continuousWordsRef.current.length === 0 ||
      cursorIndexRef.current >= continuousWordsRef.current.length
    ) {
      return;
    }

    silenceTimerRef.current = window.setTimeout(() => {
      if (
        !isMountedRef.current ||
        !userWantsMicRef.current ||
        isPausedForCorrectionRef.current ||
        cursorIndexRef.current >= continuousWordsRef.current.length
      ) {
        return;
      }

      // 5 seconds of silence elapsed at current cursor: trigger Sheikh guidance
      triggerSheikhCorrection(cursorIndexRef.current, 'hesitation');
    }, QUIET_CORRECTION_DELAY_MS);
  }, [clearSilenceTimer, triggerSheikhCorrection]);

  // Mark words correct as user recites through the continuous canvas
  const handleWordMatchSuccess = useCallback(
    (matchedIndex: number) => {
      setWordStates((prev) => {
        const next = [...prev];
        next[matchedIndex] = 'correct';
        return next;
      });

      const nextCursor = matchedIndex + 1;
      cursorIndexRef.current = nextCursor;
      setCursorIndex(nextCursor);
      setMistakeInfo(null);
      setActiveCorrectionWordIdx(null);
      scrollWordIntoView(nextCursor);

      // Check if an Ayah was completed
      const words = continuousWordsRef.current;
      const currentWord = words[matchedIndex];
      if (currentWord && currentWord.isLastWordOfAyah) {
        const completedAyahsCount = currentWord.ayahNumberInSurah;
        const totalAyahs = surahDetailRef.current?.ayahs.length || 1;
        const isCompleteSurah = completedAyahsCount >= totalAyahs;

        onUpdateSurahHifz(
          voiceSurahNumRef.current,
          isCompleteSurah ? 'memorized' : 'memorizing',
          completedAyahsCount,
          true
        );

        if (isCompleteSurah) {
          setShowCelebration(true);
          stopListening();
          void trackFeatureUsage('hifz_surah_completed', 'hifz');
        }
      }
    },
    [onUpdateSurahHifz, scrollWordIntoView, stopListening]
  );

  // Continuous Arabic Audio Tokenization Engine
  const startListeningInstance = useCallback(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError(
        'Continuous speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.'
      );
      return;
    }

    teardownRecognitionHardware();
    setSpeechError(null);

    try {
      const recognition: SpeechRecognitionLike = new SpeechRecognition();
      // Enforce Non-Stop Listening
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'ar-SA';

      recognitionRef.current = recognition;
      userWantsMicRef.current = true;
      isPausedForCorrectionRef.current = false;

      // Start 5-second pause buffer
      scheduleSilenceBuffer();

      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        // Reset 5s silence buffer on any acoustic input
        scheduleSilenceBuffer();

        let fullTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          fullTranscript += ' ' + event.results[i][0].transcript;
        }

        const spokenTokens = fullTranscript.trim().split(/\s+/).filter(Boolean);
        if (spokenTokens.length === 0) return;

        setLastHeardText(spokenTokens.slice(-3).join(' '));

        let cur = cursorIndexRef.current;
        const allWords = continuousWordsRef.current;

        // Token matching array loop: cross-check phonetics smoothly against continuous layout
        for (const token of spokenTokens) {
          if (cur >= allWords.length) break;

          // 1. Exact or phonetic fuzzy match on current expected word
          if (wordsMatch(token, allWords[cur].rawWord)) {
            handleWordMatchSuccess(cur);
            cur++;
            continue;
          }

          // 2. Lookahead (+1 or +2) if speaker skipped ahead
          let foundAhead = false;
          for (let lookahead = 1; lookahead <= 2 && cur + lookahead < allWords.length; lookahead++) {
            if (wordsMatch(token, allWords[cur + lookahead].rawWord)) {
              for (let k = cur; k < cur + lookahead; k++) {
                setWordStates((prev) => {
                  const next = [...prev];
                  next[k] = 'mistake';
                  return next;
                });
              }
              handleWordMatchSuccess(cur + lookahead);
              cur = cur + lookahead + 1;
              foundAhead = true;
              break;
            }
          }
          if (foundAhead) continue;

          // If mismatched, keep mic stream open continuously! Never interrupt.
        }
      };

      recognition.onerror = (ev) => {
        if (ev.error === 'no-speech') {
          // Normal ambient pause: keep listening
          return;
        }
        if (ev.error === 'not-allowed') {
          setSpeechError('Microphone access was denied. Please grant permission in your browser.');
          stopListening();
        }
      };

      // Auto-restart stream if browser cycles connection while user is actively reciting
      recognition.onend = () => {
        if (
          userWantsMicRef.current &&
          !isPausedForCorrectionRef.current &&
          isMountedRef.current &&
          cursorIndexRef.current < continuousWordsRef.current.length
        ) {
          try {
            recognition.start();
          } catch {
            // already active
          }
        } else {
          setIsListening(false);
        }
      };

      recognition.start();
      setIsListening(true);
      void trackFeatureUsage('hifz_continuous_recite_started', 'hifz');
    } catch (e) {
      setSpeechError('Unable to start continuous microphone. Please verify mic permissions.');
      stopListening();
    }
  }, [handleWordMatchSuccess, scheduleSilenceBuffer, stopListening, teardownRecognitionHardware]);

  const toggleContinuousMic = () => {
    if (isListening || audioPlaying) {
      stopListening();
    } else {
      startListeningInstance();
    }
  };

  const handleResetContinuousSurah = () => {
    stopListening();
    setWordStates(Array.from({ length: continuousWords.length }, () => 'pending'));
    setCursorIndex(0);
    cursorIndexRef.current = 0;
    setPeekingIndices({});
    setMistakeInfo(null);
    setActiveCorrectionWordIdx(null);
    setLastHeardText('');
    setShowCelebration(false);
    scrollWordIntoView(0);
  };

  const handleRevealAllWords = () => {
    setHideWordsMode(false);
    setWordStates(Array.from({ length: continuousWords.length }, () => 'correct'));
  };

  const handleHideAllWords = () => {
    setHideWordsMode(true);
    setWordStates(Array.from({ length: continuousWords.length }, () => 'pending'));
    setCursorIndex(0);
    cursorIndexRef.current = 0;
  };

  const handleWordClick = (index: number) => {
    // Reveal word on tap for quick peek
    setPeekingIndices((prev) => ({ ...prev, [index]: !prev[index] }));
    setCursorIndex(index);
    cursorIndexRef.current = index;
    scrollWordIntoView(index);
  };

  const completedWordsCount = wordStates.filter((s) => s === 'correct').length;
  const totalWordsCount = continuousWords.length;
  const progressPercent =
    totalWordsCount > 0 ? Math.round((completedWordsCount / totalWordsCount) * 100) : 0;

  // Progress Tab Stats
  const memorizedSurahsCount = Object.values(hifzProgress).filter(
    (p) => p.status === 'memorized'
  ).length;
  const totalMemorizedAyahs = Object.values(hifzProgress).reduce(
    (acc, p) => acc + (p.memorizedAyahs || 0),
    0
  );
  const totalQuranProgressPct = Math.round((totalMemorizedAyahs / TOTAL_QURAN_AYAHS) * 100);

  const filteredSurahs = useMemo(() => {
    return surahs.filter((s) => {
      const q = surahSearch.trim().toLowerCase();
      const matchesSearch =
        !q ||
        s.englishName.toLowerCase().includes(q) ||
        s.name.includes(q) ||
        String(s.number) === q;

      const progress = hifzProgress[s.number]?.status || 'not_started';
      if (progressFilter === 'all') return matchesSearch;
      return matchesSearch && progress === progressFilter;
    });
  }, [hifzProgress, progressFilter, surahSearch, surahs]);

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#092A1B] dark:text-[#FAF6EB] flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-[#D4AF37]" />
            <span>Continuous Hifz Canvas</span>
          </h2>
          <p className="text-xs text-[#365645] dark:text-[#CEC5AD] mt-1">
            Fluid vertical Mus&apos;haf page with non-stop Arabic microphone &amp; gold unblurring
          </p>
        </div>

        {/* Tab Buttons: Voice Recitation | Hifz Progress */}
        <div className="inline-flex rounded-xl p-1 bg-[#F2EDE0] dark:bg-[#09090B] border border-[#B0891E]/25 dark:border-[#D4AF37]/30 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('voice')}
            className={`min-h-[36px] px-3.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'voice'
                ? 'bg-[#D4AF37] text-[#09090B] shadow-sm'
                : 'text-[#365645] dark:text-[#CEC5AD] hover:text-[#092A1B] dark:hover:text-[#FAF6EB]'
            }`}
          >
            Continuous Recitation
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('progress')}
            className={`min-h-[36px] px-3.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'progress'
                ? 'bg-[#D4AF37] text-[#09090B] shadow-sm'
                : 'text-[#365645] dark:text-[#CEC5AD] hover:text-[#092A1B] dark:hover:text-[#FAF6EB]'
            }`}
          >
            Memorization Overview
          </button>
        </div>
      </div>

      {activeTab === 'voice' ? (
        <div className="space-y-6">
          {/* Controls Bar: Surah Picker & Reveal / Hide Toggle */}
          <div className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/25 bg-white dark:bg-[#141417] p-4 sm:p-5 shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-6">
                <label className="block text-xs font-semibold text-[#365645] dark:text-[#CEC5AD] mb-1.5">
                  Select Surah to Memorize
                </label>
                <select
                  value={voiceSurahNum}
                  onChange={(e) => {
                    stopListening();
                    setVoiceSurahNum(Number(e.target.value));
                  }}
                  className="w-full min-h-[44px] px-3.5 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-[#FAF8F5] dark:bg-[#09090B] text-sm font-semibold text-[#092A1B] dark:text-[#FAF6EB] focus:outline-none focus:border-[#D4AF37]"
                >
                  {surahs.map((s) => (
                    <option key={s.number} value={s.number}>
                      {s.number}. {s.englishName} ({s.name}) — {s.numberOfAyahs} Ayahs
                    </option>
                  ))}
                </select>
              </div>

              {/* Masking Toggle & Reset */}
              <div className="sm:col-span-6 flex items-center justify-end gap-2.5 pt-4 sm:pt-0">
                <button
                  type="button"
                  onClick={() => (hideWordsMode ? handleRevealAllWords() : handleHideAllWords())}
                  className={`min-h-[42px] px-3.5 rounded-xl border text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                    hideWordsMode
                      ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#B0891E] dark:text-[#F3E5AB]'
                      : 'border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-[#FAF8F5] dark:bg-[#09090B] text-[#365645] dark:text-[#CEC5AD]'
                  }`}
                >
                  {hideWordsMode ? <EyeOff className="w-4 h-4 text-[#D4AF37]" /> : <Eye className="w-4 h-4" />}
                  <span>{hideWordsMode ? 'Frosted Mask: Active' : 'Words Revealed'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetContinuousSurah}
                  title="Reset Surah Page"
                  className="min-h-[42px] px-3.5 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-[#FAF8F5] dark:bg-[#09090B] text-xs font-bold text-[#365645] dark:text-[#CEC5AD] hover:border-[#D4AF37] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Recitation Progress Bar */}
            <div className="pt-2 border-t border-[#B0891E]/15 dark:border-[#D4AF37]/15 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-[#365645] dark:text-[#CEC5AD]">
                <span>
                  Surah Progress: {completedWordsCount} / {totalWordsCount} Words Unblurred
                </span>
                <span className="tabular-nums font-bold text-[#B0891E] dark:text-[#F3E5AB]">
                  {progressPercent}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#E8E2D2] dark:bg-[#27272A] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#B0891E] via-[#D4AF37] to-[#F3E5AB] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Celebration Banner upon Full Surah Completion */}
          {showCelebration && (
            <div className="rounded-3xl border border-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/25 via-[#F3E5AB]/15 to-[#D4AF37]/25 p-6 text-center space-y-3 shadow-xl animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-[#09090B] mx-auto flex items-center justify-center shadow-lg">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                Masha&apos;Allah! Surah {surahDetail?.surah.englishName} Completed
              </h3>
              <p className="text-xs text-[#365645] dark:text-[#CEC5AD] max-w-md mx-auto">
                You have recited every verse accurately. Your memorization record has been saved and updated.
              </p>
              <button
                type="button"
                onClick={() => setShowCelebration(false)}
                className="min-h-[38px] px-5 rounded-xl bg-[#D4AF37] text-[#09090B] text-xs font-bold hover:brightness-105 cursor-pointer"
              >
                Continue Practice
              </button>
            </div>
          )}

          {/* 1. Continuous Vertical Reading Flow Canvas (No Single Cards) */}
          <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/35 bg-white/70 dark:bg-[#121216]/85 backdrop-blur-xl p-6 sm:p-10 md:p-12 shadow-2xl space-y-8 min-h-[520px]">
            {/* Ambient Gold Radial Atmosphere */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-96 h-56 rounded-full bg-[#D4AF37]/10 blur-3xl"
            />

            {/* Surah Header Block */}
            <div className="relative text-center space-y-2 border-b border-[#B0891E]/15 dark:border-[#D4AF37]/15 pb-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#B0891E] dark:text-[#D4AF37]">
                {surahDetail?.surah.revelationType} · Surah {voiceSurahNum} · {surahDetail?.surah.numberOfAyahs} Ayahs
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                {surahDetail?.surah.englishName}
              </h3>
              <p className="text-xs text-[#365645] dark:text-[#CEC5AD]">
                {surahDetail?.surah.englishNameTranslation}
              </p>

              {/* Bismillah Banner (Omitted on Surah 1 & 9) */}
              {voiceSurahNum !== 1 && voiceSurahNum !== 9 && (
                <div className="pt-4">
                  <p
                    dir="rtl"
                    className="font-arabic-quran text-2xl sm:text-3xl text-[#B0891E] dark:text-[#F3E5AB]"
                  >
                    بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                  </p>
                </div>
              )}
            </div>

            {/* Continuous Vertical Arabic Flow Layout */}
            {detailLoading ? (
              <div className="py-20 text-center space-y-3">
                <RefreshCw className="w-7 h-7 text-[#D4AF37] animate-spin mx-auto" />
                <p className="text-xs text-[#365645] dark:text-[#CEC5AD]">
                  Preparing fluid Mus&apos;haf page...
                </p>
              </div>
            ) : continuousWords.length === 0 ? (
              <div className="py-20 text-center text-sm text-[#365645] dark:text-[#CEC5AD]">
                Unable to load Surah words right now.
              </div>
            ) : (
              <div className="relative py-4 px-2 sm:px-6">
                <div
                  dir="rtl"
                  className="w-full text-center font-arabic-quran text-2xl sm:text-3xl md:text-4xl leading-[2.6] sm:leading-[3] tracking-wide"
                >
                  {continuousWords.map((item, idx) => {
                    const st = wordStates[idx] || 'pending';
                    const isCurrentCursor = idx === cursorIndex;
                    const isPeeking = Boolean(peekingIndices[idx]);
                    const isMasked = hideWordsMode && st === 'pending' && !isPeeking;
                    const isSheikhGuidingThis = activeCorrectionWordIdx === idx && audioPlaying;

                    return (
                      <React.Fragment key={idx}>
                        <span
                          ref={(node) => {
                            if (node) wordRefs.current.set(idx, node);
                            else wordRefs.current.delete(idx);
                          }}
                          onClick={() => handleWordClick(idx)}
                          title={`Ayah ${item.ayahNumberInSurah} · Tap to peek`}
                          className={`relative inline-block mx-1 sm:mx-1.5 transition-all duration-300 cursor-pointer select-none ${
                            st === 'correct'
                              ? 'text-[#D4AF37] dark:text-[#F3E5AB] drop-shadow-[0_0_14px_rgba(212,175,55,0.7)] font-bold scale-[1.03]'
                              : st === 'mistake'
                                ? 'text-rose-500 dark:text-rose-400 underline decoration-rose-500/80 decoration-2 font-semibold'
                                : isMasked
                                  ? 'blur-[7px] opacity-25 hover:opacity-75 transition-all duration-300'
                                  : 'text-[#092A1B] dark:text-[#FAF6EB]'
                          } ${
                            isCurrentCursor && isListening
                              ? 'ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-transparent rounded px-1 animate-pulse'
                              : isSheikhGuidingThis
                                ? 'ring-2 ring-[#F3E5AB] bg-[#D4AF37]/25 rounded px-1'
                                : ''
                          }`}
                        >
                          {item.rawWord}
                        </span>

                        {/* Ornate Gold Ayah End Marker */}
                        {item.isLastWordOfAyah && (
                          <span className="inline-flex items-center justify-center align-middle mx-1.5 sm:mx-2 text-[#B0891E] dark:text-[#D4AF37] font-sans text-[0.68em] select-none">
                            <span className="px-2 py-0.5 rounded-full border border-[#D4AF37]/60 bg-[#D4AF37]/15 text-xs font-bold tabular-nums shadow-xs">
                              {toArabicIndic(item.ayahNumberInSurah)}
                            </span>
                          </span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sheikh Guidance Visual Callout (5s silence or hesitation) */}
            {mistakeInfo && (
              <div className="rounded-2xl border border-[#D4AF37]/50 bg-[#D4AF37]/10 p-4 space-y-2 max-w-xl mx-auto animate-fade-in">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#B0891E] dark:text-[#F3E5AB] flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>
                      {audioPlaying
                        ? `${reciterMeta.shortLabel} Guiding Pronunciation...`
                        : mistakeInfo.reason === 'hesitation'
                          ? '5s Quiet Pause — Sheikh Guided Word'
                          : 'Word Assistance'}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setMistakeInfo(null);
                      setActiveCorrectionWordIdx(null);
                    }}
                    className="text-xs font-semibold text-[#B0891E] dark:text-[#F3E5AB] underline cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <p
                    dir="rtl"
                    className="font-arabic-quran text-2xl sm:text-3xl text-[#092A1B] dark:text-[#FAF6EB]"
                  >
                    {mistakeInfo.expectedArabic}
                  </p>
                  {mistakeInfo.transliterationHint && (
                    <span className="text-xs italic text-[#365645] dark:text-[#CEC5AD]">
                      &ldquo;{mistakeInfo.transliterationHint}&rdquo;
                    </span>
                  )}
                </div>
              </div>
            )}

            {speechError && (
              <div className="rounded-xl border border-rose-400/40 bg-rose-500/10 px-4 py-2.5 text-xs text-rose-800 dark:text-rose-200 text-center max-w-lg mx-auto">
                {speechError}
              </div>
            )}

            {lastHeardText && (
              <p dir="rtl" className="text-xs text-[#365645] dark:text-[#CEC5AD] text-center">
                Heard: <span className="font-arabic-quran text-base text-[#B0891E] dark:text-[#F3E5AB]">{lastHeardText}</span>
              </p>
            )}

            {/* Persistent Large Golden Microphone Toggle Anchored at Bottom Center */}
            <div className="pt-6 border-t border-[#B0891E]/15 dark:border-[#D4AF37]/15 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={toggleContinuousMic}
                aria-label={
                  audioPlaying
                    ? 'Sheikh assisting recitation'
                    : isListening
                      ? 'Stop non-stop recitation mic'
                      : 'Start non-stop recitation mic'
                }
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xl ${
                  audioPlaying
                    ? 'bg-[#D4AF37] text-[#09090B] ring-4 ring-[#D4AF37]/45 animate-pulse'
                    : isListening
                      ? 'bg-gradient-to-br from-rose-600 to-rose-700 text-white ring-4 ring-rose-500/40 shadow-rose-900/40'
                      : 'bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#B0891E] text-[#09090B] ring-4 ring-[#D4AF37]/30 shadow-[0_0_28px_rgba(212,175,55,0.45)] hover:brightness-105 active:scale-95'
                }`}
              >
                {audioPlaying ? (
                  <Volume2 className="w-8 h-8" />
                ) : isListening ? (
                  <MicOff className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </button>

              <div className="text-center space-y-0.5">
                <p className="text-xs font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                  {audioPlaying
                    ? `${reciterMeta.shortLabel} is guiding you · Mic auto-resumes`
                    : isListening
                      ? 'Non-Stop Listening · 5s quiet triggers Sheikh correction'
                      : 'Tap Golden Mic to Start Non-Stop Recitation'}
                </p>
                <p className="text-[11px] text-[#365645] dark:text-[#CEC5AD]">
                  Words unblur word-for-word and line-for-line across the continuous page
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Progress Tab: Memorization Overview & Surahs Directory */
        <div className="space-y-6 animate-fade-in">
          {/* Top Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/25 bg-white dark:bg-[#141417] p-5 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#365645] dark:text-[#CEC5AD]">
                  Surahs Memorized
                </p>
                <p className="font-display text-2xl font-bold text-[#092A1B] dark:text-[#FAF6EB] mt-1 tabular-nums">
                  {memorizedSurahsCount} / 114
                </p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#B0891E] dark:text-[#D4AF37]">
                <Award className="w-6 h-6" />
              </div>
            </div>

            <div className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/25 bg-white dark:bg-[#141417] p-5 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#365645] dark:text-[#CEC5AD]">
                  Verses Memorized
                </p>
                <p className="font-display text-2xl font-bold text-[#092A1B] dark:text-[#FAF6EB] mt-1 tabular-nums">
                  {totalMemorizedAyahs} / {TOTAL_QURAN_AYAHS}
                </p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#B0891E] dark:text-[#D4AF37]">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>

            <div className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/25 bg-white dark:bg-[#141417] p-5 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#365645] dark:text-[#CEC5AD]">
                  Total Quran Hifz
                </p>
                <p className="font-display text-2xl font-bold text-[#092A1B] dark:text-[#FAF6EB] mt-1 tabular-nums">
                  {totalQuranProgressPct}%
                </p>
              </div>
              <ProgressRing
                value={totalQuranProgressPct}
                max={100}
                size={46}
                strokeWidth={4}
              />
            </div>
          </div>

          {/* Surahs Search & Filter */}
          <div className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/25 bg-white dark:bg-[#141417] p-4 sm:p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#365645] dark:text-[#CEC5AD] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={surahSearch}
                  onChange={(e) => setSurahSearch(e.target.value)}
                  placeholder="Search by Surah name or number..."
                  className="w-full min-h-[42px] pl-10 pr-4 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-[#FAF8F5] dark:bg-[#09090B] text-xs font-semibold text-[#092A1B] dark:text-[#FAF6EB] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Status Segmented Filter */}
              <div className="inline-flex rounded-xl p-1 bg-[#F2EDE0] dark:bg-[#09090B] border border-[#B0891E]/25 dark:border-[#D4AF37]/25 self-start sm:self-auto">
                {(['all', 'memorized', 'memorizing', 'not_started'] as ProgressFilter[]).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setProgressFilter(f)}
                    className={`min-h-[34px] px-3 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                      progressFilter === f
                        ? 'bg-[#D4AF37] text-[#09090B] font-bold shadow-xs'
                        : 'text-[#365645] dark:text-[#CEC5AD]'
                    }`}
                  >
                    {f.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Surahs Directory List */}
            <div className="space-y-2.5 pt-2">
              {filteredSurahs.map((surah) => {
                const prog = hifzProgress[surah.number];
                const status = prog?.status || 'not_started';
                const count = prog?.memorizedAyahs || 0;
                const pct = Math.round((count / surah.numberOfAyahs) * 100);

                return (
                  <div
                    key={surah.number}
                    className="rounded-xl border border-[#B0891E]/15 dark:border-[#D4AF37]/20 bg-[#FAF8F5] dark:bg-[#09090B] p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#D4AF37]/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 text-[#B0891E] dark:text-[#D4AF37] text-xs font-bold flex items-center justify-center shrink-0 tabular-nums">
                        {surah.number}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-display text-sm font-bold text-[#092A1B] dark:text-[#FAF6EB] truncate">
                            {surah.englishName}
                          </p>
                          <span className="font-arabic text-sm text-[#B0891E] dark:text-[#D4AF37]">
                            {surah.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#365645] dark:text-[#CEC5AD]">
                          {count} / {surah.numberOfAyahs} Ayahs ({pct}%) ·{' '}
                          {formatLastReviewed(prog?.lastReviewedAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setVoiceSurahNum(surah.number);
                          setActiveTab('voice');
                        }}
                        className="min-h-[36px] px-3.5 rounded-lg bg-[#D4AF37] text-[#09090B] text-xs font-bold hover:brightness-105 inline-flex items-center gap-1 cursor-pointer transition-all"
                      >
                        <span>Recite</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
