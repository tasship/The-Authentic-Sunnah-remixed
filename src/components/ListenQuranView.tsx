import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  Check,
  ChevronDown,
  Headphones,
  ListMusic,
  Loader2,
  Moon,
  Pause,
  Play,
  Repeat,
  RotateCcw,
  RotateCw,
  Search,
  SkipBack,
  SkipForward,
  Sparkles,
  WifiOff,
  X,
} from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { QuranAudioPlayerController } from '../hooks/useQuranAudioPlayer';
import { QURAN_RECITERS, QUICK_RECITATION_ITEMS, verifyAyahTextIntegrity } from '../services/quranApi';
import { PlaybackSpeed, ReaderSettings, SleepTimerMode } from '../types';
import { toArabicIndic } from '../utils/arabic';
import { getLanguageFlags } from '../utils/languageDisplay';

interface ListenQuranViewProps {
  player: QuranAudioPlayerController;
  settings: ReaderSettings;
}

function formatAudioClock(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const total = Math.floor(seconds);
  const hrs = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  if (hrs > 0) {
    return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

const SLEEP_OPTIONS: { id: SleepTimerMode; label: string }[] = [
  { id: 'off', label: 'Off' },
  { id: '15m', label: '15 min' },
  { id: '30m', label: '30 min' },
  { id: '60m', label: '60 min' },
  { id: 'end_of_surah', label: 'End of Surah' },
];

const SPEED_OPTIONS: PlaybackSpeed[] = [0.75, 1, 1.25];

export const ListenQuranView: React.FC<ListenQuranViewProps> = ({ player, settings }) => {
  const isOnline = useOnlineStatus();
  const [showReciterModal, setShowReciterModal] = useState(false);
  const [showSurahModal, setShowSurahModal] = useState(false);
  const [showSleepMenu, setShowSleepMenu] = useState(false);
  const [sleepModeActive, setSleepModeActive] = useState(false);
  const [surahQuery, setSurahQuery] = useState('');
  const [jumpAyahInput, setJumpAyahInput] = useState('');
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  const ayahRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const lastScrolledAyahRef = useRef<number>(-1);

  const arabicFontClass =
    settings.arabicFont === 'scheherazade' ? 'font-arabic-scheherazade' : 'font-arabic-quran';

  const { showEnglish, showUrdu, showRomanUrdu } = getLanguageFlags(settings.translationDisplay);

  const activeSurah =
    player.surahDetail?.surah ||
    player.surahs.find((s) => s.number === player.selectedSurahNumber) ||
    null;

  const filteredSurahs = useMemo(() => {
    const q = surahQuery.trim().toLowerCase();
    if (!q) return player.surahs;
    return player.surahs.filter(
      (s) =>
        s.englishName.toLowerCase().includes(q) ||
        s.englishNameTranslation.toLowerCase().includes(q) ||
        s.name.includes(surahQuery.trim()) ||
        String(s.number) === q
    );
  }, [player.surahs, surahQuery]);

  // Smoothly scroll synchronized Ayah into view during playback & verse transitions
  useEffect(() => {
    if (!autoScrollEnabled || (!player.isPlaying && !player.hasActiveSession)) return;
    if (!player.isPlaying && lastScrolledAyahRef.current === player.activeAyahIndex) return;
    lastScrolledAyahRef.current = player.activeAyahIndex;

    const node = ayahRefs.current.get(player.activeAyahIndex);
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [autoScrollEnabled, player.activeAyahIndex, player.isPlaying, player.hasActiveSession]);

  const handleJumpToAyah = (e: React.FormEvent) => {
    e.preventDefault();
    const total = player.surahDetail?.ayahs.length || activeSurah?.numberOfAyahs || 1;
    const parsed = Number(jumpAyahInput.trim());
    if (!Number.isFinite(parsed) || parsed < 1) return;
    const clampedIndex = Math.min(total, Math.max(1, Math.floor(parsed))) - 1;
    player.seekToAyah(clampedIndex, player.isPlaying);
    const node = ayahRefs.current.get(clampedIndex);
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const effectiveNotice = player.fallbackNotice || player.reciterMeta.fallbackNotice || null;
  const remainingAudioSec = Math.max(0, (player.duration || 0) - (player.currentTime || 0));
  const progressRatio =
    player.duration > 0 ? Math.min(100, (player.currentTime / player.duration) * 100) : 0;

  return (
    <div className="space-y-6 pb-24 lg:pb-14">
      {!isOnline && (
        <div className="rounded-2xl border border-[#D4AF37]/35 bg-[#141417] px-4 py-3 text-xs text-[#F3E5AB] flex items-center gap-2.5">
          <WifiOff className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span>
            You are currently offline. External reciter audio streaming is paused until connectivity returns, while cached Surah verses in IndexedDB remain readable below.
          </span>
        </div>
      )}

      {/* 1. Continuous Audio Player Card */}
      <section className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/40 theme-hero text-[#FAF6EB] p-5 sm:p-7 shadow-2xl space-y-6">
        {/* Subtle Gold Radial Atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-56 rounded-full bg-[#D4AF37]/10 blur-3xl"
        />

        {/* Player Header: Surah Selector & Reciter Selector */}
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setShowSurahModal(true)}
            className="min-h-[44px] px-4 py-2 rounded-2xl border border-[#D4AF37]/35 bg-[#1B1B20]/90 hover:border-[#D4AF37] transition-colors flex items-center justify-between gap-3 text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <ListMusic className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <div className="min-w-0">
                <span className="block text-[10px] uppercase tracking-wider text-[#CEC5AD]">
                  Selected Surah
                </span>
                <span className="block text-sm font-semibold text-[#FAF6EB] truncate tabular-nums">
                  {activeSurah
                    ? `${activeSurah.number}. ${activeSurah.englishName}`
                    : `Surah ${player.selectedSurahNumber}`}
                </span>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-[#D4AF37] shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => setShowReciterModal(true)}
            className="min-h-[44px] px-4 py-2 rounded-2xl border border-[#D4AF37]/35 bg-[#1B1B20]/90 hover:border-[#D4AF37] transition-colors flex items-center justify-between gap-3 text-left cursor-pointer"
          >
            <div className="min-w-0">
              <span className="block text-[10px] uppercase tracking-wider text-[#CEC5AD]">
                Reciter (Qari)
              </span>
              <span className="block text-sm font-semibold text-[#F3E5AB] truncate">
                {player.reciterMeta.label}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-[#D4AF37] shrink-0" />
          </button>
        </div>

        {/* Centerpiece Surah & Reciter Typography Display */}
        <div className="relative flex flex-col items-center text-center py-2 space-y-2.5">
          {player.isPlaying && (
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10"
              aria-hidden="true"
            >
              <span className="w-1 h-2.5 bg-[#D4AF37] rounded-full animate-pulse" />
              <span className="w-1 h-3.5 bg-[#F3E5AB] rounded-full animate-pulse" />
              <span className="w-1 h-2.5 bg-[#D4AF37] rounded-full animate-pulse" />
            </div>
          )}

          <div className="space-y-1 max-w-xl">
            {activeSurah?.name && (
              <p
                dir="rtl"
                className="font-arabic-quran text-2xl sm:text-3xl text-[#F3E5AB] leading-relaxed"
              >
                {activeSurah.name}
              </p>
            )}
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#FAF6EB]">
              {activeSurah
                ? `Surah ${activeSurah.englishName} · ${activeSurah.englishNameTranslation}`
                : `Surah ${player.selectedSurahNumber}`}
            </h2>
            <p className="text-xs sm:text-sm text-[#CEC5AD] tabular-nums">
              {player.reciterMeta.label}
              {activeSurah ? ` · Verse ${player.activeAyahIndex + 1} of ${activeSurah.numberOfAyahs}` : ''}
            </p>
          </div>
        </div>

        {/* Graceful Fallback Notice / Audio Error Banner */}
        {effectiveNotice && (
          <div className="relative rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2.5 flex items-start gap-2.5 text-xs text-[#F3E5AB]">
            <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <p className="leading-relaxed">{effectiveNotice}</p>
          </div>
        )}

        {player.error && (
          <div className="relative rounded-2xl border border-amber-400/40 bg-amber-500/10 px-4 py-2.5 flex items-start gap-2.5 text-xs text-amber-200">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>{player.error}</p>
          </div>
        )}

        {/* Interactive Timeline / Seek Bar */}
        <div className="relative space-y-2">
          <div className="relative flex items-center">
            <input
              type="range"
              aria-label="Seek Surah playback position"
              min={0}
              max={player.duration > 0 ? player.duration : 100}
              step={0.5}
              value={player.duration > 0 ? player.currentTime : 0}
              disabled={!player.duration}
              onChange={(e) => player.seekToTime(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[#D4AF37] bg-[#27272A]"
              style={{
                background:
                  player.duration > 0
                    ? `linear-gradient(to right, #D4AF37 0%, #F3E5AB ${progressRatio}%, #27272A ${progressRatio}%, #27272A 100%)`
                    : '#27272A',
              }}
            />
          </div>

          <div className="flex items-center justify-between text-xs font-medium text-[#CEC5AD] tabular-nums">
            <span>{formatAudioClock(player.currentTime)}</span>
            <span>
              {player.isVerseFallbackMode
                ? 'Verse-by-Verse Continuous'
                : player.duration > 0
                  ? `-${formatAudioClock(remainingAudioSec)}`
                  : 'Full Surah Stream'}
            </span>
          </div>
        </div>

        {/* Main Transport Controls */}
        <div className="relative flex items-center justify-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={player.playPrevSurah}
            aria-label="Previous Surah"
            title="Previous Surah"
            className="min-h-[44px] min-w-[44px] rounded-full border border-[#D4AF37]/25 bg-[#1B1B20] text-[#FAF6EB] hover:border-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => {
              if (player.isVerseFallbackMode) {
                player.seekToAyah(Math.max(0, player.activeAyahIndex - 1));
              } else {
                player.seekToTime(Math.max(0, player.currentTime - 15));
              }
            }}
            aria-label={player.isVerseFallbackMode ? 'Previous Ayah' : 'Rewind 15 seconds'}
            title={player.isVerseFallbackMode ? 'Previous Ayah' : 'Rewind 15s'}
            className="min-h-[44px] px-3 rounded-full border border-[#D4AF37]/25 bg-[#1B1B20] text-[#CEC5AD] hover:text-[#FAF6EB] hover:border-[#D4AF37] inline-flex items-center gap-1 text-xs font-semibold tabular-nums cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{player.isVerseFallbackMode ? 'Prev' : '15s'}</span>
          </button>

          <button
            type="button"
            onClick={player.togglePlayPause}
            aria-label={player.isPlaying ? 'Pause Recitation' : 'Play Recitation'}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#B0891E] text-[#09090B] shadow-[0_0_26px_rgba(212,175,55,0.45)] hover:brightness-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          >
            {player.isBuffering ? (
              <Loader2 className="w-7 h-7 animate-spin" />
            ) : player.isPlaying ? (
              <Pause className="w-7 h-7 fill-current" />
            ) : (
              <Play className="w-7 h-7 fill-current ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              if (player.isVerseFallbackMode) {
                player.seekToAyah(player.activeAyahIndex + 1);
              } else {
                player.seekToTime(player.currentTime + 15);
              }
            }}
            aria-label={player.isVerseFallbackMode ? 'Next Ayah' : 'Forward 15 seconds'}
            title={player.isVerseFallbackMode ? 'Next Ayah' : 'Forward 15s'}
            className="min-h-[44px] px-3 rounded-full border border-[#D4AF37]/25 bg-[#1B1B20] text-[#CEC5AD] hover:text-[#FAF6EB] hover:border-[#D4AF37] inline-flex items-center gap-1 text-xs font-semibold tabular-nums cursor-pointer"
          >
            <span>{player.isVerseFallbackMode ? 'Next' : '15s'}</span>
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={player.playNextSurah}
            aria-label="Next Surah"
            title="Next Surah"
            className="min-h-[44px] min-w-[44px] rounded-full border border-[#D4AF37]/25 bg-[#1B1B20] text-[#FAF6EB] hover:border-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Utility Controls Row: Speed · Repeat · Auto-Play Next · Sleep Timer */}
        <div className="relative pt-3 border-t border-[#D4AF37]/15 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {/* Speed Control */}
          <div
            className="inline-flex rounded-xl p-1 bg-[#1B1B20] border border-[#D4AF37]/25"
            role="group"
            aria-label="Playback Speed"
          >
            {SPEED_OPTIONS.map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => player.setPlaybackRate(spd)}
                className={`min-h-[34px] px-2.5 rounded-lg text-xs font-semibold tabular-nums whitespace-nowrap transition-colors cursor-pointer ${
                  player.playbackRate === spd
                    ? 'bg-[#D4AF37] text-[#09090B]'
                    : 'text-[#CEC5AD] hover:text-[#FAF6EB]'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Repeat Surah */}
          <button
            type="button"
            onClick={player.toggleRepeatSurah}
            className={`min-h-[42px] px-3.5 rounded-xl border text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
              player.repeatSurah
                ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#F3E5AB]'
                : 'border-[#D4AF37]/25 bg-[#1B1B20] text-[#CEC5AD] hover:text-[#FAF6EB]'
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>Repeat</span>
          </button>

          {/* Auto-Play Next Surah */}
          <button
            type="button"
            onClick={player.toggleAutoPlayNext}
            className={`min-h-[42px] px-3.5 rounded-xl border text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
              player.autoPlayNextSurah
                ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#F3E5AB]'
                : 'border-[#D4AF37]/25 bg-[#1B1B20] text-[#CEC5AD] hover:text-[#FAF6EB]'
            }`}
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>Auto-Next: {player.autoPlayNextSurah ? 'ON' : 'OFF'}</span>
          </button>

          {/* Sleep Timer */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSleepMenu((s) => !s)}
              className={`min-h-[42px] px-3.5 rounded-xl border text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap tabular-nums transition-colors cursor-pointer ${
                player.sleepTimerMode !== 'off'
                  ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#F3E5AB]'
                  : 'border-[#D4AF37]/25 bg-[#1B1B20] text-[#CEC5AD] hover:text-[#FAF6EB]'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>
                {player.sleepTimerMode === 'off'
                  ? 'Sleep Timer'
                  : player.sleepTimerMode === 'end_of_surah'
                    ? 'Stop: End of Surah'
                    : `Sleep: ${formatAudioClock(player.sleepRemainingSeconds || 0)}`}
              </span>
            </button>

            {showSleepMenu && (
              <div className="absolute right-0 bottom-full mb-2 w-44 rounded-2xl border border-[#D4AF37]/40 bg-[#141417] p-1.5 shadow-2xl z-30 space-y-1">
                {SLEEP_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      player.setSleepTimer(opt.id);
                      setShowSleepMenu(false);
                    }}
                    className={`w-full min-h-[38px] px-3 rounded-xl text-left text-xs font-semibold flex items-center justify-between cursor-pointer ${
                      player.sleepTimerMode === opt.id
                        ? 'bg-[#D4AF37] text-[#09090B]'
                        : 'text-[#FAF6EB] hover:bg-[#D4AF37]/15'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {player.sleepTimerMode === opt.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Night / Sleep OLED Screen Mode */}
          <button
            type="button"
            onClick={() => setSleepModeActive(true)}
            className="min-h-[42px] px-3.5 rounded-xl border border-[#D4AF37]/45 bg-[#09090B] text-xs font-semibold text-[#F3E5AB] hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 inline-flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer"
          >
            <Moon className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Sleep Mode</span>
          </button>
        </div>

        {/* Quick Surah Shortcuts inside Player */}
        <div className="relative flex flex-wrap items-center justify-center gap-2 pt-1">
          {QUICK_RECITATION_ITEMS.filter((item) => !item.ayahNumber).map((item) => (
            <button
              key={item.surahNumber}
              type="button"
              onClick={() => player.selectSurah(item.surahNumber, { autoPlay: true })}
              className={`min-h-[36px] px-3 py-1 rounded-xl border text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                player.selectedSurahNumber === item.surahNumber
                  ? 'border-[#D4AF37] bg-[#D4AF37] text-[#09090B]'
                  : 'border-[#D4AF37]/25 bg-[#1B1B20]/80 text-[#F3E5AB] hover:border-[#D4AF37]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Synchronized Clean Reading View (No Habit Buttons / Zero Clutter) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-2 flex-wrap">
            <BookOpen className="w-4 h-4 text-[#B0891E] dark:text-[#D4AF37]" />
            <h3 className="font-display text-base sm:text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB]">
              Synchronized Text &amp; Meaning
            </h3>
            <span className="text-xs text-[#365645] dark:text-[#CEC5AD]">
              · Tap any Ayah to listen from there
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <form onSubmit={handleJumpToAyah} className="inline-flex items-center gap-1.5">
              <input
                type="number"
                min={1}
                max={player.surahDetail?.ayahs.length || activeSurah?.numberOfAyahs || 286}
                value={jumpAyahInput}
                onChange={(e) => setJumpAyahInput(e.target.value)}
                placeholder="Ayah #"
                aria-label="Quick jump to Ayah number"
                className="w-24 min-h-[38px] px-3 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#141417] text-xs font-semibold text-[#092A1B] dark:text-[#FAF6EB] tabular-nums focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="min-h-[38px] px-3 rounded-xl bg-[#D4AF37] text-[#09090B] text-xs font-bold hover:brightness-105 whitespace-nowrap cursor-pointer"
              >
                Go
              </button>
            </form>

            <button
              type="button"
              onClick={() => setAutoScrollEnabled((v) => !v)}
              className={`min-h-[38px] px-3 rounded-xl border text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                autoScrollEnabled
                  ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#B0891E] dark:text-[#F3E5AB]'
                  : 'border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-[#365645] dark:text-[#CEC5AD]'
              }`}
            >
              Auto-Follow Reciter: {autoScrollEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {player.detailLoading ? (
          <div className="rounded-3xl border border-[#D4AF37]/20 bg-white dark:bg-[#141417] p-8 animate-pulse space-y-4">
            <div className="h-7 bg-[#F2EDE0] dark:bg-[#27272A] rounded w-3/4 ml-auto" />
            <div className="h-4 bg-[#F2EDE0] dark:bg-[#27272A] rounded w-full" />
            <div className="h-4 bg-[#F2EDE0] dark:bg-[#27272A] rounded w-5/6" />
          </div>
        ) : player.detailError || !player.surahDetail ? (
          <div className="rounded-2xl border border-[#D4AF37]/30 bg-white dark:bg-[#141417] p-6 text-center text-sm text-[#365645] dark:text-[#CEC5AD]">
            {player.detailError || 'Unable to load Surah verses right now.'}
          </div>
        ) : (
          <div className="space-y-3.5">
            {player.surahDetail.surah.number !== 1 && player.surahDetail.surah.number !== 9 && settings.showArabic && (
              <div className="rounded-2xl border border-[#D4AF37]/20 bg-white dark:bg-[#141417] py-4 px-5 text-center">
                <p
                  dir="rtl"
                  className={`${arabicFontClass} text-2xl sm:text-3xl text-[#B0891E] dark:text-[#F3E5AB]`}
                >
                  بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                </p>
              </div>
            )}

            {player.surahDetail.ayahs.map((ayah, idx) => {
              const isActive = idx === player.activeAyahIndex;
              const verseCheck = verifyAyahTextIntegrity(player.surahDetail!, idx);
              return (
                <button
                  key={ayah.number}
                  type="button"
                  ref={(el) => {
                    if (el) ayahRefs.current.set(idx, el);
                    else ayahRefs.current.delete(idx);
                  }}
                  onClick={() => player.seekToAyah(idx, true)}
                  className={`w-full text-left rounded-2xl border p-5 sm:p-6 transition-all space-y-3.5 cursor-pointer ${
                    isActive
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10 dark:bg-[#D4AF37]/12 shadow-[0_0_24px_rgba(212,175,55,0.12)]'
                      : 'border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#141417] hover:border-[#D4AF37]/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span
                      className={`font-bold tabular-nums ${
                        isActive
                          ? 'text-[#B0891E] dark:text-[#F3E5AB]'
                          : 'text-[#365645] dark:text-[#CEC5AD]'
                      }`}
                    >
                      {player.surahDetail?.surah.number}:{ayah.numberInSurah}
                    </span>
                    <span className="text-[11px] font-medium text-[#B0891E] dark:text-[#D4AF37]">
                      {isActive && player.isPlaying ? 'Now Reciting' : 'Tap to Play'}
                    </span>
                  </div>

                  {settings.showArabic && (
                    <p
                      dir="rtl"
                      data-quran-text="true"
                      data-verified-source={`${verseCheck.sourceApi}:${verseCheck.sourceEdition}`}
                      style={{ fontSize: `${settings.arabicFontSize}px` }}
                      className={`${arabicFontClass} leading-[2.15] text-right ${
                        isActive
                          ? 'text-[#092A1B] dark:text-[#FAF6EB]'
                          : 'text-[#092A1B] dark:text-[#FAF6EB]'
                      }`}
                    >
                      {isActive && player.isPlaying && player.activeWordIndex !== null
                        ? verseCheck.verifiedText.split(/\s+/).map((word, wIdx, arr) => (
                            <React.Fragment key={wIdx}>
                              <span
                                className={
                                  wIdx === player.activeWordIndex
                                    ? 'text-[#B0891E] dark:text-[#F3E5AB] bg-[#D4AF37]/18 rounded px-1 transition-colors duration-100'
                                    : wIdx < (player.activeWordIndex ?? 0)
                                      ? 'text-[#092A1B] dark:text-[#F3E5AB]/85'
                                      : ''
                                }
                              >
                                {word}
                              </span>
                              {wIdx < arr.length - 1 ? ' ' : ''}
                            </React.Fragment>
                          ))
                        : verseCheck.verifiedText}{' '}
                      <span className="text-[#B0891E] dark:text-[#D4AF37] text-[0.78em] mx-1">
                        ﴿{toArabicIndic(ayah.numberInSurah)}﴾
                      </span>
                    </p>
                  )}

                  {settings.showTransliteration && ayah.transliteration && (
                    <p className="text-sm italic leading-relaxed text-[#B0891E] dark:text-[#F3E5AB]/90">
                      {ayah.transliteration}
                    </p>
                  )}

                  {showEnglish && (
                    <p
                      style={{ fontSize: `${settings.englishFontSize}px` }}
                      className="leading-relaxed text-[#365645] dark:text-[#CEC5AD]"
                    >
                      {ayah.englishText}
                    </p>
                  )}

                  {showUrdu && ayah.urduText && (
                    <p
                      dir="rtl"
                      style={{ fontSize: `${settings.urduFontSize}px` }}
                      className="font-urdu leading-loose text-right text-[#092A1B] dark:text-[#FAF6EB]"
                    >
                      {ayah.urduText}
                    </p>
                  )}

                  {showRomanUrdu && (
                    <p
                      style={{ fontSize: `${settings.englishFontSize}px` }}
                      className="leading-relaxed text-[#365645] dark:text-[#F3E5AB]/95"
                    >
                      {ayah.romanUrduText || ayah.englishText}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Modal 1: Famous Reciters Selector */}
      {showReciterModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4"
          onClick={() => setShowReciterModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Choose Quran Reciter"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-lg max-h-[84vh] flex flex-col rounded-t-3xl sm:rounded-3xl border border-[#D4AF37]/40 bg-[#F9F6EE] dark:bg-[#141417] text-[#092A1B] dark:text-[#FAF6EB] shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#B0891E]/20 dark:border-[#D4AF37]/20">
              <div>
                <h3 className="font-display text-lg font-bold">Select Qari (Reciter)</h3>
                <p className="text-xs text-[#365645] dark:text-[#CEC5AD]">
                  {QURAN_RECITERS.length} Renowned Reciters · Synced with Settings
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowReciterModal(false)}
                aria-label="Close reciter selector"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-2">
              {QURAN_RECITERS.map((rec) => {
                const selected = rec.id === player.reciterId;
                return (
                  <button
                    key={rec.id}
                    type="button"
                    onClick={() => {
                      player.setReciter(rec.id);
                      setShowReciterModal(false);
                    }}
                    className={`w-full text-left rounded-2xl border px-4 py-3.5 transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      selected
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 shadow-sm'
                        : 'border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#09090B]/80 hover:border-[#D4AF37]/60'
                    }`}
                  >
                    <span className="text-sm font-semibold text-[#092A1B] dark:text-[#FAF6EB] truncate min-w-0">
                      {rec.label}
                    </span>

                    <div className="flex items-center gap-2 shrink-0">
                      {rec.id === 'yasser_dosari' && (
                        <span className="text-[11px] font-semibold text-[#B0891E] dark:text-[#D4AF37]">
                          Default
                        </span>
                      )}
                      {selected && <Check className="w-4 h-4 text-[#D4AF37]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: 114 Surah Picker */}
      {showSurahModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4"
          onClick={() => setShowSurahModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Choose Surah to Listen"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-lg max-h-[84vh] flex flex-col rounded-t-3xl sm:rounded-3xl border border-[#D4AF37]/40 bg-[#F9F6EE] dark:bg-[#141417] text-[#092A1B] dark:text-[#FAF6EB] shadow-2xl"
          >
            <div className="px-6 py-4 border-b border-[#B0891E]/20 dark:border-[#D4AF37]/20 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold">Choose Surah (1–114)</h3>
                <button
                  type="button"
                  onClick={() => setShowSurahModal(false)}
                  aria-label="Close Surah selector"
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#365645] dark:text-[#CEC5AD]" />
                <input
                  type="search"
                  value={surahQuery}
                  onChange={(e) => setSurahQuery(e.target.value)}
                  placeholder="Search Surah by name or number..."
                  className="w-full min-h-[42px] pl-10 pr-4 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#09090B] text-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="p-4 overflow-y-auto space-y-2">
              {filteredSurahs.map((s) => {
                const selected = s.number === player.selectedSurahNumber;
                return (
                  <button
                    key={s.number}
                    type="button"
                    onClick={() => {
                      player.selectSurah(s.number, { autoPlay: true });
                      setShowSurahModal(false);
                    }}
                    className={`w-full text-left rounded-2xl border p-3.5 transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                      selected
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15'
                        : 'border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#09090B]/80 hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-9 h-9 rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/10 flex items-center justify-center text-xs font-bold tabular-nums text-[#B0891E] dark:text-[#F3E5AB] shrink-0">
                        {s.number}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{s.englishName}</p>
                        <p className="text-xs text-[#365645] dark:text-[#CEC5AD] truncate">
                          {s.englishNameTranslation} · {s.numberOfAyahs} Ayahs
                        </p>
                      </div>
                    </div>
                    <span dir="rtl" className="font-arabic-quran text-lg text-[#B0891E] dark:text-[#F3E5AB] shrink-0">
                      {s.name.replace('سُورَةُ ', '')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Night / Sleep OLED Black Screen Overlay */}
      {sleepModeActive && (
        <div
          className="fixed inset-0 z-[60] bg-[#000000] text-[#FAF6EB] flex flex-col items-center justify-between p-6 sm:p-10 select-none"
          role="dialog"
          aria-modal="true"
          aria-label="Night Sleep Audio Mode"
        >
          <div className="w-full max-w-md flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-widest text-[#D4AF37]/80 font-semibold">
              OLED Sleep Mode
            </span>
            <button
              type="button"
              onClick={() => setSleepModeActive(false)}
              className="min-h-[40px] px-3.5 rounded-xl border border-[#D4AF37]/30 bg-[#0B0B0D] text-xs font-semibold text-[#F3E5AB] hover:border-[#D4AF37] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Exit Sleep Mode</span>
            </button>
          </div>

          <div className="flex flex-col items-center text-center space-y-5 max-w-sm">
            <div className="w-24 h-24 rounded-full border border-[#D4AF37]/40 bg-[#0A0905] flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.18)]">
              <Moon className="w-10 h-10 text-[#D4AF37] animate-pulse" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#F3E5AB]/90">
                {activeSurah ? `Surah ${activeSurah.englishName}` : `Surah ${player.selectedSurahNumber}`}
              </h3>
              <p className="text-xs text-[#9E9680]">{player.reciterMeta.label}</p>
            </div>

            <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#09090B] px-6 py-4 space-y-1 min-w-[220px]">
              <p className="text-[10px] uppercase tracking-widest text-[#9E9680]">
                Sleep Countdown
              </p>
              <p className="font-display text-3xl font-bold text-[#D4AF37] tabular-nums">
                {player.sleepTimerMode === 'off'
                  ? 'No Timer'
                  : player.sleepTimerMode === 'end_of_surah'
                    ? 'End of Surah'
                    : formatAudioClock(player.sleepRemainingSeconds || 0)}
              </p>
              <p className="text-[11px] text-[#9E9680]">
                Smooth 5-second audio fade-out before pause
              </p>
            </div>

            <button
              type="button"
              onClick={player.togglePlayPause}
              aria-label={player.isPlaying ? 'Pause Recitation' : 'Play Recitation'}
              className="w-16 h-16 rounded-full border border-[#D4AF37]/60 bg-[#141417] text-[#F3E5AB] hover:bg-[#D4AF37] hover:text-[#09090B] transition-colors flex items-center justify-center cursor-pointer"
            >
              {player.isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-0.5" />
              )}
            </button>
          </div>

          <div className="w-full max-w-md space-y-2 text-center">
            <p className="text-[11px] text-[#9E9680]">Quick Sleep Timer</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {SLEEP_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => player.setSleepTimer(opt.id)}
                  className={`min-h-[36px] px-3 rounded-xl border text-xs font-semibold cursor-pointer ${
                    player.sleepTimerMode === opt.id
                      ? 'border-[#D4AF37] bg-[#D4AF37]/25 text-[#F3E5AB]'
                      : 'border-[#D4AF37]/20 bg-[#0A0A0C] text-[#9E9680] hover:text-[#F3E5AB]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
