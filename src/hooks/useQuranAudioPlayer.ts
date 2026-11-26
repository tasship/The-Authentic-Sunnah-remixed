import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ChapterVerseTiming,
  fetchAllSurahs,
  fetchChapterRecitationWithTimings,
  fetchSurahDetail,
  fetchSurahReferenceTimings,
  getAyahAudioUrls,
  getReciterMeta,
  getSurahFullAudioUrls,
  QuranReciterMeta,
  scaleChapterTimingsToDuration,
} from '../services/quranApi';
import { trackFeatureUsage } from '../services/firebaseTelemetry';
import {
  PlaybackSpeed,
  QuranReciterId,
  ReaderSettings,
  SleepTimerMode,
  SurahDetail,
  SurahSummary,
} from '../types';

export interface QuranAudioPlayerController {
  surahs: SurahSummary[];
  surahsLoading: boolean;
  selectedSurahNumber: number;
  surahDetail: SurahDetail | null;
  detailLoading: boolean;
  detailError: string | null;
  reciterId: QuranReciterId;
  reciterMeta: QuranReciterMeta;
  isPlaying: boolean;
  isBuffering: boolean;
  hasActiveSession: boolean;
  currentTime: number;
  duration: number;
  activeAyahIndex: number;
  activeWordIndex: number | null;
  playbackRate: PlaybackSpeed;
  repeatSurah: boolean;
  autoPlayNextSurah: boolean;
  sleepTimerMode: SleepTimerMode;
  sleepRemainingSeconds: number | null;
  isVerseFallbackMode: boolean;
  fallbackNotice: string | null;
  error: string | null;
  selectSurah: (surahNumber: number, options?: { autoPlay?: boolean; startAyah?: number }) => void;
  togglePlayPause: () => void;
  seekToTime: (seconds: number) => void;
  seekToAyah: (ayahIndex: number, autoPlay?: boolean) => void;
  playPrevSurah: () => void;
  playNextSurah: () => void;
  setPlaybackRate: (rate: PlaybackSpeed) => void;
  toggleRepeatSurah: () => void;
  toggleAutoPlayNext: () => void;
  setSleepTimer: (mode: SleepTimerMode) => void;
  setReciter: (reciterId: QuranReciterId) => void;
  closeMiniPlayer: () => void;
}

function findTimingFromMedia(
  timestamps: ChapterVerseTiming[],
  currentTimeSec: number
): { ayahIndex: number; wordIndex: number | null } {
  const ms = currentTimeSec * 1000;
  let matchedTiming: ChapterVerseTiming | null = null;
  let ayahIndex = 0;

  for (let i = 0; i < timestamps.length; i++) {
    const t = timestamps[i];
    if (ms >= t.fromMs && ms < t.toMs) {
      const verseNum = Number(t.verseKey.split(':')[1]);
      ayahIndex = Number.isFinite(verseNum) && verseNum > 0 ? verseNum - 1 : i;
      matchedTiming = t;
      break;
    }
  }

  if (!matchedTiming) {
    for (let i = 0; i < timestamps.length; i++) {
      if (timestamps[i].fromMs <= ms) {
        const verseNum = Number(timestamps[i].verseKey.split(':')[1]);
        ayahIndex = Number.isFinite(verseNum) && verseNum > 0 ? verseNum - 1 : i;
        matchedTiming = timestamps[i];
      } else {
        break;
      }
    }
  }

  let wordIndex: number | null = null;
  if (matchedTiming?.segments && matchedTiming.segments.length > 0) {
    for (const seg of matchedTiming.segments) {
      const [wordPos, segStart, segEnd] = seg;
      if (ms >= segStart && ms <= segEnd && wordPos > 0) {
        wordIndex = wordPos - 1;
        break;
      }
    }
  }

  return { ayahIndex, wordIndex };
}

export function useQuranAudioPlayer(
  settings: ReaderSettings,
  onUpdateSettings: (patch: Partial<ReaderSettings>) => void,
  onAddListeningSeconds?: (seconds: number) => void
): QuranAudioPlayerController {
  const [surahs, setSurahs] = useState<SurahSummary[]>([]);
  const [surahsLoading, setSurahsLoading] = useState(true);

  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number>(1);
  const [surahDetail, setSurahDetail] = useState<SurahDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasActiveSession, setHasActiveSession] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeAyahIndex, setActiveAyahIndex] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);

  const [playbackRate, setPlaybackRateState] = useState<PlaybackSpeed>(1);
  const [repeatSurah, setRepeatSurah] = useState(false);
  const [autoPlayNextSurah, setAutoPlayNextSurah] = useState(true);
  const [sleepTimerMode, setSleepTimerMode] = useState<SleepTimerMode>('off');
  const [sleepRemainingSeconds, setSleepRemainingSeconds] = useState<number | null>(null);

  const [isVerseFallbackMode, setIsVerseFallbackMode] = useState(false);
  const [streamNotice, setStreamNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reciterId = settings.quranReciter;
  const reciterMeta = useMemo(() => getReciterMeta(reciterId), [reciterId]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const preloadAudioRef = useRef<HTMLAudioElement | null>(null);
  const timestampsRef = useRef<ChapterVerseTiming[] | null>(null);
  const qcomAudioUrlRef = useRef<string | null>(null);
  const loadGenRef = useRef(0);
  const pendingSeekAyahRef = useRef<number | null>(null);

  // Latest state refs for event callbacks
  const surahDetailRef = useRef<SurahDetail | null>(null);
  surahDetailRef.current = surahDetail;
  const durationRef = useRef(0);
  durationRef.current = duration;
  const activeAyahIndexRef = useRef(0);
  activeAyahIndexRef.current = activeAyahIndex;
  const activeWordIndexRef = useRef<number | null>(null);
  activeWordIndexRef.current = activeWordIndex;
  const isVerseFallbackRef = useRef(false);
  isVerseFallbackRef.current = isVerseFallbackMode;
  const playbackRateRef = useRef<PlaybackSpeed>(1);
  playbackRateRef.current = playbackRate;
  const repeatSurahRef = useRef(false);
  repeatSurahRef.current = repeatSurah;
  const autoPlayNextRef = useRef(true);
  autoPlayNextRef.current = autoPlayNextSurah;
  const sleepModeRef = useRef<SleepTimerMode>('off');
  sleepModeRef.current = sleepTimerMode;
  const selectedSurahRef = useRef(1);
  selectedSurahRef.current = selectedSurahNumber;
  const reciterIdRef = useRef<QuranReciterId>(reciterId);
  reciterIdRef.current = reciterId;
  const isPlayingRef = useRef(false);
  isPlayingRef.current = isPlaying;

  // Load 114 Surah directory once
  useEffect(() => {
    let mounted = true;
    setSurahsLoading(true);
    fetchAllSurahs()
      .then((list) => {
        if (mounted) setSurahs(list);
      })
      .catch(() => {
        // Keep resilient if offline
      })
      .finally(() => {
        if (mounted) setSurahsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Load Surah text/translations matching Settings
  useEffect(() => {
    let mounted = true;
    setDetailLoading(true);
    setDetailError(null);
    fetchSurahDetail(selectedSurahNumber, {
      script: settings.quranScript,
      englishTranslator: settings.englishTranslator,
      urduTranslator: settings.urduTranslator,
      romanUrduTranslator: settings.romanUrduTranslator,
    })
      .then((detail) => {
        if (!mounted) return;
        setSurahDetail(detail);
      })
      .catch((e) => {
        if (!mounted) return;
        setDetailError(e instanceof Error ? e.message : 'Unable to load Surah text.');
      })
      .finally(() => {
        if (mounted) setDetailLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [
    selectedSurahNumber,
    settings.quranScript,
    settings.englishTranslator,
    settings.urduTranslator,
    settings.romanUrduTranslator,
  ]);

  const cleanupAudioElement = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.ontimeupdate = null;
      audioRef.current.onloadedmetadata = null;
      audioRef.current.onwaiting = null;
      audioRef.current.onplay = null;
      audioRef.current.onplaying = null;
      audioRef.current.onseeked = null;
      audioRef.current.onpause = null;
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.src = '';
      audioRef.current = null;
    }
    if (preloadAudioRef.current) {
      preloadAudioRef.current.src = '';
      preloadAudioRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => cleanupAudioElement();
  }, [cleanupAudioElement]);

  // Helper: Preload next ayah during verse-by-verse fallback
  const preloadNextAyah = useCallback((nextIdx: number, detail: SurahDetail, recId: QuranReciterId) => {
    if (nextIdx >= detail.ayahs.length) return;
    const nextAyah = detail.ayahs[nextIdx];
    const urls = getAyahAudioUrls(
      recId,
      detail.surah.number,
      nextAyah.numberInSurah,
      nextAyah.number
    );
    if (urls[0]) {
      const pre = new Audio();
      pre.preload = 'auto';
      pre.src = urls[0];
      preloadAudioRef.current = pre;
    }
  }, []);

  const playVerseFallbackAtRef = useRef<(ayahIdx: number, autoPlay: boolean) => void>(() => {});
  const startSurahAudioRef = useRef<
    (surahNum: number, recId: QuranReciterId, autoPlay: boolean, startAyah?: number) => void
  >(() => {});

  const handleSurahFinished = useCallback(() => {
    // Sleep Timer: End of Surah pauses cleanly
    if (sleepModeRef.current === 'end_of_surah') {
      setIsPlaying(false);
      setSleepTimerMode('off');
      setSleepRemainingSeconds(null);
      return;
    }

    if (repeatSurahRef.current) {
      if (isVerseFallbackRef.current) {
        playVerseFallbackAtRef.current(0, true);
      } else if (audioRef.current) {
        audioRef.current.currentTime = 0;
        setActiveAyahIndex(0);
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
      return;
    }

    if (autoPlayNextRef.current && selectedSurahRef.current < 114) {
      const nextNum = selectedSurahRef.current + 1;
      setSelectedSurahNumber(nextNum);
      setActiveAyahIndex(0);
      setCurrentTime(0);
      setDuration(0);
      startSurahAudioRef.current(nextNum, reciterIdRef.current, true, 1);
      return;
    }

    setIsPlaying(false);
  }, []);

  // Verse-by-verse gapless fallback engine
  const playVerseFallbackAt = useCallback(
    (ayahIdx: number, autoPlay: boolean) => {
      const detail = surahDetailRef.current;
      if (!detail || detail.ayahs.length === 0) return;

      const clampedIdx = Math.max(0, Math.min(detail.ayahs.length - 1, ayahIdx));
      const ayah = detail.ayahs[clampedIdx];
      const recId = reciterIdRef.current;
      const urls = getAyahAudioUrls(
        recId,
        detail.surah.number,
        ayah.numberInSurah,
        ayah.number
      );

      cleanupAudioElement();
      setIsVerseFallbackMode(true);
      setActiveAyahIndex(clampedIdx);
      setActiveWordIndex(null);
      setError(null);

      let urlIdx = 0;
      const audio = new Audio(urls[urlIdx]);
      audio.playbackRate = playbackRateRef.current;
      audioRef.current = audio;

      preloadNextAyah(clampedIdx + 1, detail, recId);

      audio.onloadedmetadata = () => {
        setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
      };
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime || 0);
      };
      audio.onwaiting = () => setIsBuffering(true);
      audio.onplaying = () => {
        setIsBuffering(false);
        setIsPlaying(true);
      };
      audio.onended = () => {
        const latestDetail = surahDetailRef.current;
        if (!latestDetail) return;
        if (clampedIdx + 1 < latestDetail.ayahs.length) {
          playVerseFallbackAtRef.current(clampedIdx + 1, true);
        } else {
          handleSurahFinished();
        }
      };
      audio.onerror = () => {
        urlIdx += 1;
        if (urlIdx < urls.length) {
          audio.src = urls[urlIdx];
          if (autoPlay) audio.play().catch(() => {});
        } else {
          setIsBuffering(false);
          setIsPlaying(false);
          setError('Unable to stream verse audio. Please check your connection.');
        }
      };

      if (autoPlay) {
        setHasActiveSession(true);
        setIsBuffering(true);
        audio.play().catch(() => {
          setIsBuffering(false);
          setIsPlaying(false);
        });
      }
    },
    [cleanupAudioElement, handleSurahFinished, preloadNextAyah]
  );
  playVerseFallbackAtRef.current = playVerseFallbackAt;

  // Compute exact target seconds from verified millisecond timestamps when jumping to an Ayah
  const computeAyahStartSeconds = useCallback((ayahIdx: number): number | null => {
    const timestamps = timestampsRef.current;
    if (!timestamps || timestamps.length === 0) return null;
    const match =
      timestamps.find((t) => Number(t.verseKey.split(':')[1]) === ayahIdx + 1) ||
      timestamps[ayahIdx];
    return match ? match.fromMs / 1000 : null;
  }, []);

  const syncActiveAyahFromMedia = useCallback((audio: HTMLAudioElement) => {
    const t = audio.currentTime || 0;
    setCurrentTime(t);
    const ts = timestampsRef.current;
    if (ts && ts.length > 0) {
      const { ayahIndex, wordIndex } = findTimingFromMedia(ts, t);
      if (ayahIndex !== activeAyahIndexRef.current) {
        setActiveAyahIndex(ayahIndex);
      }
      if (wordIndex !== activeWordIndexRef.current) {
        setActiveWordIndex(wordIndex);
      }
    }
  }, []);

  // Ensure exact SurahDetail is ready before verse-by-verse gapless playback starts
  const enterVerifiedVerseMode = useCallback(
    async (surahNum: number, startIdx: number, autoPlay: boolean, gen: number) => {
      if (surahDetailRef.current?.surah.number !== surahNum) {
        try {
          const loadedDetail = await fetchSurahDetail(surahNum, {
            script: settings.quranScript,
            englishTranslator: settings.englishTranslator,
            urduTranslator: settings.urduTranslator,
            romanUrduTranslator: settings.romanUrduTranslator,
          });
          if (gen !== loadGenRef.current) return;
          surahDetailRef.current = loadedDetail;
          setSurahDetail(loadedDetail);
        } catch {
          if (gen !== loadGenRef.current) return;
          setIsBuffering(false);
          setIsPlaying(false);
          setError('Unable to load Surah verses for audio playback.');
          return;
        }
      }
      if (gen !== loadGenRef.current) return;
      playVerseFallbackAt(startIdx, autoPlay);
    },
    [
      playVerseFallbackAt,
      settings.englishTranslator,
      settings.quranScript,
      settings.romanUrduTranslator,
      settings.urduTranslator,
    ]
  );

  // Primary event-driven full-Surah stream initializer (strictly paired with verified ms timestamps)
  const startSurahAudio = useCallback(
    async (
      surahNum: number,
      recId: QuranReciterId,
      autoPlay: boolean,
      startAyah: number = 1
    ) => {
      const gen = ++loadGenRef.current;
      const meta = getReciterMeta(recId);
      cleanupAudioElement();

      timestampsRef.current = null;
      qcomAudioUrlRef.current = null;
      pendingSeekAyahRef.current = startAyah > 1 ? startAyah - 1 : null;
      setIsVerseFallbackMode(false);
      setStreamNotice(meta.fallbackNotice || null);
      setError(null);
      setCurrentTime(0);
      setDuration(0);
      setActiveAyahIndex(Math.max(0, startAyah - 1));
      setActiveWordIndex(null);

      if (autoPlay) {
        setHasActiveSession(true);
        setIsBuffering(true);
      } else {
        setIsPlaying(false);
        setIsBuffering(false);
      }

      // 1. Fetch verified chapter recitation audio + verse millisecond timestamps
      let qcomPayload: { audioUrl: string; timestamps: ChapterVerseTiming[] } | null = null;
      if (meta.quranComRecitationId) {
        qcomPayload = await fetchChapterRecitationWithTimings(meta.quranComRecitationId, surahNum);
        if (gen !== loadGenRef.current) return;
      }

      // 2. Full-Surah stream or verse mode fallback:
      // If Quran.com timestamps are unavailable (e.g. Sheikh Muhammad Al-Luhaidan),
      // pull precise reference segment metadata from Quran API and scale proportionally
      // to the active audio duration, locking audio element hooks with zero timer drift.
      if (!qcomPayload?.audioUrl || !qcomPayload.timestamps || qcomPayload.timestamps.length === 0) {
        const candidateUrls = getSurahFullAudioUrls(recId, surahNum);
        if (candidateUrls.length > 0) {
          let candidateIdx = 0;
          const audio = new Audio();
          audio.preload = 'metadata';
          audio.src = candidateUrls[candidateIdx];
          audio.volume = 1;
          audio.playbackRate = playbackRateRef.current;
          audioRef.current = audio;

          // Fetch reference chapter segment metadata for flawless word and ayah alignment
          const refTimings = await fetchSurahReferenceTimings(surahNum);
          if (gen !== loadGenRef.current) return;

          // Hydrate Surah detail for verse calculation
          if (!surahDetailRef.current || surahDetailRef.current.surah.number !== surahNum) {
            fetchSurahDetail(surahNum, {
              script: settings.quranScript,
              englishTranslator: settings.englishTranslator,
              urduTranslator: settings.urduTranslator,
              romanUrduTranslator: settings.romanUrduTranslator,
            })
              .then((loaded) => {
                if (gen === loadGenRef.current) {
                  surahDetailRef.current = loaded;
                  setSurahDetail(loaded);
                }
              })
              .catch(() => {});
          }

          audio.onloadedmetadata = () => {
            if (gen !== loadGenRef.current) return;
            const dur = Number.isFinite(audio.duration) ? audio.duration : 0;
            setDuration(dur);
            if (refTimings && refTimings.length > 0 && dur > 0) {
              timestampsRef.current = scaleChapterTimingsToDuration(refTimings, dur);
            }
            if (pendingSeekAyahRef.current !== null && dur > 0) {
              const targetSec = computeAyahStartSeconds(pendingSeekAyahRef.current);
              pendingSeekAyahRef.current = null;
              if (targetSec !== null && targetSec >= 0 && targetSec < dur) {
                audio.currentTime = targetSec;
                syncActiveAyahFromMedia(audio);
              }
            }
          };

          audio.ontimeupdate = () => {
            if (gen !== loadGenRef.current) return;
            syncActiveAyahFromMedia(audio);
          };

          audio.onplay = () => {
            if (gen !== loadGenRef.current) return;
            syncActiveAyahFromMedia(audio);
          };

          audio.onseeked = () => {
            if (gen !== loadGenRef.current) return;
            syncActiveAyahFromMedia(audio);
          };

          audio.onwaiting = () => {
            if (gen === loadGenRef.current) setIsBuffering(true);
          };

          audio.onplaying = () => {
            if (gen === loadGenRef.current) {
              setIsBuffering(false);
              setIsPlaying(true);
            }
          };

          audio.onpause = () => {
            if (gen === loadGenRef.current && !audio.ended) {
              setIsPlaying(false);
            }
          };

          audio.onended = () => {
            if (gen === loadGenRef.current) {
              handleSurahFinished();
            }
          };

          audio.onerror = () => {
            if (gen !== loadGenRef.current) return;
            candidateIdx++;
            if (candidateIdx < candidateUrls.length) {
              audio.src = candidateUrls[candidateIdx];
              if (autoPlay || isPlayingRef.current) {
                audio.play().catch(() => {});
              }
            } else {
              void enterVerifiedVerseMode(
                surahNum,
                Math.max(0, startAyah - 1),
                autoPlay || isPlayingRef.current,
                gen
              );
            }
          };

          if (autoPlay) {
            audio
              .play()
              .then(() => {
                if (gen === loadGenRef.current) {
                  setIsBuffering(false);
                  setIsPlaying(true);
                }
              })
              .catch(() => {
                if (gen === loadGenRef.current) {
                  setIsBuffering(false);
                  setIsPlaying(false);
                }
              });
          }
          return;
        }

        await enterVerifiedVerseMode(surahNum, Math.max(0, startAyah - 1), autoPlay, gen);
        return;
      }

      timestampsRef.current = qcomPayload.timestamps;
      qcomAudioUrlRef.current = qcomPayload.audioUrl;

      const audio = new Audio();
      audio.preload = 'metadata';
      audio.src = qcomPayload.audioUrl;
      audio.volume = 1;
      audio.playbackRate = playbackRateRef.current;
      audioRef.current = audio;

      audio.onloadedmetadata = () => {
        if (gen !== loadGenRef.current) return;
        const dur = Number.isFinite(audio.duration) ? audio.duration : 0;
        setDuration(dur);
        if (pendingSeekAyahRef.current !== null && dur > 0) {
          const targetSec = computeAyahStartSeconds(pendingSeekAyahRef.current);
          pendingSeekAyahRef.current = null;
          if (targetSec !== null && targetSec >= 0 && targetSec < dur) {
            audio.currentTime = targetSec;
            syncActiveAyahFromMedia(audio);
          }
        }
      };

      audio.ontimeupdate = () => {
        if (gen !== loadGenRef.current) return;
        syncActiveAyahFromMedia(audio);
      };

      audio.onplay = () => {
        if (gen !== loadGenRef.current) return;
        syncActiveAyahFromMedia(audio);
      };

      audio.onseeked = () => {
        if (gen !== loadGenRef.current) return;
        syncActiveAyahFromMedia(audio);
      };

      audio.onwaiting = () => {
        if (gen === loadGenRef.current) setIsBuffering(true);
      };
      audio.onplaying = () => {
        if (gen === loadGenRef.current) {
          setIsBuffering(false);
          setIsPlaying(true);
          syncActiveAyahFromMedia(audio);
        }
      };
      audio.onpause = () => {
        if (gen === loadGenRef.current && !audio.ended) {
          setIsPlaying(false);
        }
      };
      audio.onended = () => {
        if (gen === loadGenRef.current) {
          handleSurahFinished();
        }
      };
      audio.onerror = () => {
        if (gen !== loadGenRef.current) return;
        timestampsRef.current = null;
        qcomAudioUrlRef.current = null;
        void enterVerifiedVerseMode(
          surahNum,
          Math.max(0, startAyah - 1),
          autoPlay || isPlayingRef.current,
          gen
        );
      };

      if (autoPlay) {
        audio
          .play()
          .then(() => {
            if (gen === loadGenRef.current) {
              setIsBuffering(false);
              setIsPlaying(true);
              syncActiveAyahFromMedia(audio);
            }
          })
          .catch(() => {
            if (gen === loadGenRef.current) {
              setIsBuffering(false);
              setIsPlaying(false);
            }
          });
      }
    },
    [
      cleanupAudioElement,
      computeAyahStartSeconds,
      enterVerifiedVerseMode,
      handleSurahFinished,
      syncActiveAyahFromMedia,
    ]
  );
  startSurahAudioRef.current = startSurahAudio;

  // Sleep Timer countdown interval with smooth 5-second fade-out before pausing
  useEffect(() => {
    if (
      sleepTimerMode === 'off' ||
      sleepTimerMode === 'end_of_surah' ||
      sleepRemainingSeconds === null
    ) {
      if (audioRef.current) {
        audioRef.current.volume = 1;
      }
      return;
    }

    const id = window.setInterval(() => {
      setSleepRemainingSeconds((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.volume = 1;
          }
          setIsPlaying(false);
          setSleepTimerMode('off');
          return null;
        }
        const nextRemaining = prev - 1;
        if (audioRef.current) {
          if (nextRemaining <= 5) {
            audioRef.current.volume = Math.max(0.05, nextRemaining / 5);
          } else if (audioRef.current.volume < 1) {
            audioRef.current.volume = 1;
          }
        }
        return nextRemaining;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [sleepTimerMode, sleepRemainingSeconds !== null]); // eslint-disable-line react-hooks/exhaustive-deps

  // Track live listening seconds whenever audio is actively playing
  const onAddListeningSecondsRef = useRef(onAddListeningSeconds);
  onAddListeningSecondsRef.current = onAddListeningSeconds;
  useEffect(() => {
    if (!isPlaying) return;
    const id = window.setInterval(() => {
      onAddListeningSecondsRef.current?.(1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [isPlaying]);

  const selectSurah = useCallback(
    (surahNumber: number, options?: { autoPlay?: boolean; startAyah?: number }) => {
      const clamped = Math.max(1, Math.min(114, surahNumber));
      const autoPlay = options?.autoPlay ?? true;
      const startAyah = options?.startAyah ?? 1;
      setSelectedSurahNumber(clamped);
      startSurahAudio(clamped, reciterIdRef.current, autoPlay, startAyah);
    },
    [startSurahAudio]
  );

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) {
      startSurahAudio(selectedSurahRef.current, reciterIdRef.current, true, activeAyahIndexRef.current + 1);
      return;
    }

    if (isPlayingRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 1;
      setHasActiveSession(true);
      setIsBuffering(true);
      audioRef.current
        .play()
        .then(() => {
          setIsBuffering(false);
          setIsPlaying(true);
        })
        .catch(() => {
          setIsBuffering(false);
          setIsPlaying(false);
        });
    }
  }, [startSurahAudio]);

  const seekToTime = useCallback(
    (seconds: number) => {
      if (!audioRef.current) return;
      const dur = Number.isFinite(audioRef.current.duration)
        ? audioRef.current.duration
        : durationRef.current;
      const clamped = Math.max(0, Math.min(dur || seconds, seconds));
      audioRef.current.currentTime = clamped;
      syncActiveAyahFromMedia(audioRef.current);
    },
    [syncActiveAyahFromMedia]
  );

  const seekToAyah = useCallback(
    (ayahIndex: number, autoPlay: boolean = true) => {
      const detail = surahDetailRef.current;
      const safeIdx = detail
        ? Math.max(0, Math.min(detail.ayahs.length - 1, ayahIndex))
        : Math.max(0, ayahIndex);

      if (isVerseFallbackRef.current) {
        playVerseFallbackAt(safeIdx, autoPlay);
        return;
      }

      if (!audioRef.current) {
        startSurahAudio(selectedSurahRef.current, reciterIdRef.current, autoPlay, safeIdx + 1);
        return;
      }

      const dur = Number.isFinite(audioRef.current.duration)
        ? audioRef.current.duration
        : durationRef.current;

      const targetSec = computeAyahStartSeconds(safeIdx);
      if (dur > 0 && targetSec !== null) {
        audioRef.current.currentTime = targetSec;
        syncActiveAyahFromMedia(audioRef.current);
        if (autoPlay && !isPlayingRef.current) {
          setHasActiveSession(true);
          audioRef.current.play().catch(() => {});
        }
      } else if (dur > 0 && detail && detail.ayahs.length > 0) {
        const propSec = (safeIdx / detail.ayahs.length) * dur;
        audioRef.current.currentTime = propSec;
        setActiveAyahIndex(safeIdx);
        if (autoPlay && !isPlayingRef.current) {
          setHasActiveSession(true);
          audioRef.current.play().catch(() => {});
        }
      } else {
        startSurahAudio(selectedSurahRef.current, reciterIdRef.current, autoPlay, safeIdx + 1);
      }
    },
    [computeAyahStartSeconds, playVerseFallbackAt, startSurahAudio, syncActiveAyahFromMedia]
  );

  const playPrevSurah = useCallback(() => {
    const prev = selectedSurahRef.current <= 1 ? 114 : selectedSurahRef.current - 1;
    selectSurah(prev, { autoPlay: true, startAyah: 1 });
  }, [selectSurah]);

  const playNextSurah = useCallback(() => {
    const next = selectedSurahRef.current >= 114 ? 1 : selectedSurahRef.current + 1;
    selectSurah(next, { autoPlay: true, startAyah: 1 });
  }, [selectSurah]);

  const setPlaybackRate = useCallback((rate: PlaybackSpeed) => {
    setPlaybackRateState(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  }, []);

  const toggleRepeatSurah = useCallback(() => {
    setRepeatSurah((r) => !r);
  }, []);

  const toggleAutoPlayNext = useCallback(() => {
    setAutoPlayNextSurah((a) => !a);
  }, []);

  const setSleepTimer = useCallback((mode: SleepTimerMode) => {
    if (audioRef.current) {
      audioRef.current.volume = 1;
    }
    setSleepTimerMode(mode);
    if (mode === 'off' || mode === 'end_of_surah') {
      setSleepRemainingSeconds(null);
    } else if (mode === '15m') {
      setSleepRemainingSeconds(15 * 60);
    } else if (mode === '30m') {
      setSleepRemainingSeconds(30 * 60);
    } else if (mode === '60m') {
      setSleepRemainingSeconds(60 * 60);
    }
  }, []);

  const setReciter = useCallback(
    (nextReciterId: QuranReciterId) => {
      onUpdateSettings({ quranReciter: nextReciterId });
      void trackFeatureUsage(`reciter_${nextReciterId}`, 'reciter');
      const keepPlaying = isPlayingRef.current || hasActiveSession;
      const currentAyahNum = activeAyahIndexRef.current + 1;
      startSurahAudio(selectedSurahRef.current, nextReciterId, keepPlaying, currentAyahNum);
    },
    [hasActiveSession, onUpdateSettings, startSurahAudio]
  );

  const closeMiniPlayer = useCallback(() => {
    loadGenRef.current += 1;
    cleanupAudioElement();
    setIsPlaying(false);
    setIsBuffering(false);
    setHasActiveSession(false);
    setCurrentTime(0);
    setDuration(0);
    setSleepTimerMode('off');
    setSleepRemainingSeconds(null);
  }, [cleanupAudioElement]);

  // Browser Media Session API integration (Lock Screen / Notification Tray Controls)
  useEffect(() => {
    if (!hasActiveSession || typeof navigator === 'undefined' || !('mediaSession' in navigator)) {
      return;
    }
    const surahSummary =
      surahDetail?.surah || surahs.find((s) => s.number === selectedSurahNumber);
    const title = surahSummary
      ? `Surah ${surahSummary.englishName} (${surahSummary.number})`
      : `Surah ${selectedSurahNumber}`;

    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title,
        artist: reciterMeta.label,
        album: 'The Authentic Sunnah · Holy Quran',
        artwork: [{ src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' }],
      });
      navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
      navigator.mediaSession.setActionHandler('play', () => togglePlayPause());
      navigator.mediaSession.setActionHandler('pause', () => togglePlayPause());
      navigator.mediaSession.setActionHandler('previoustrack', () => playPrevSurah());
      navigator.mediaSession.setActionHandler('nexttrack', () => playNextSurah());
    } catch {
      // Ignore unsupported mediaSession actions
    }
  }, [
    hasActiveSession,
    isPlaying,
    playNextSurah,
    playPrevSurah,
    reciterMeta.label,
    selectedSurahNumber,
    surahDetail,
    surahs,
    togglePlayPause,
  ]);

  return {
    surahs,
    surahsLoading,
    selectedSurahNumber,
    surahDetail,
    detailLoading,
    detailError,
    reciterId,
    reciterMeta,
    isPlaying,
    isBuffering,
    hasActiveSession,
    currentTime,
    duration,
    activeAyahIndex,
    activeWordIndex,
    playbackRate,
    repeatSurah,
    autoPlayNextSurah,
    sleepTimerMode,
    sleepRemainingSeconds,
    isVerseFallbackMode,
    fallbackNotice: streamNotice,
    error,
    selectSurah,
    togglePlayPause,
    seekToTime,
    seekToAyah,
    playPrevSurah,
    playNextSurah,
    setPlaybackRate,
    toggleRepeatSurah,
    toggleAutoPlayNext,
    setSleepTimer,
    setReciter,
    closeMiniPlayer,
  };
}
