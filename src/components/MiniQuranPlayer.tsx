import React from 'react';
import { Headphones, Loader2, Pause, Play, SkipForward, X } from 'lucide-react';
import { QuranAudioPlayerController } from '../hooks/useQuranAudioPlayer';

interface MiniQuranPlayerProps {
  player: QuranAudioPlayerController;
  onExpand: () => void;
}

function formatCompactCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export const MiniQuranPlayer: React.FC<MiniQuranPlayerProps> = ({ player, onExpand }) => {
  if (!player.hasActiveSession) return null;

  const surah =
    player.surahDetail?.surah ||
    player.surahs.find((s) => s.number === player.selectedSurahNumber);

  const surahTitle = surah ? `${surah.number}. ${surah.englishName}` : `Surah ${player.selectedSurahNumber}`;
  const totalAyahs = surah?.numberOfAyahs;
  const progressPct =
    player.duration > 0 ? Math.min(100, (player.currentTime / player.duration) * 100) : 0;

  return (
    <div
      role="region"
      aria-label="Quran Audio Mini-Player"
      className="fixed left-3 right-3 bottom-[calc(68px+env(safe-area-inset-bottom,0px))] lg:bottom-4 lg:left-[calc(18rem+1.5rem)] lg:right-6 z-40 max-w-2xl lg:mx-auto rounded-2xl border border-[#D4AF37]/50 bg-[#141417]/95 backdrop-blur-md text-[#FAF6EB] shadow-[0_12px_36px_rgba(0,0,0,0.65)] overflow-hidden"
    >
      {/* Slim Gold Progress Bar */}
      <div className="h-0.5 w-full bg-[#27272A]">
        <div
          className="h-full bg-gradient-to-r from-[#B0891E] via-[#D4AF37] to-[#F3E5AB] transition-all duration-200"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="px-3 py-2 flex items-center justify-between gap-2.5">
        {/* Tap left side to expand straight into Listen Quran */}
        <button
          type="button"
          onClick={onExpand}
          className="flex items-center gap-3 min-w-0 flex-1 text-left cursor-pointer py-0.5"
        >
          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37]/25 to-[#B0891E]/15 border border-[#D4AF37]/50 flex items-center justify-center text-[#F3E5AB] shrink-0">
            <Headphones className="w-4 h-4" />
          </span>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-bold text-[#FAF6EB] truncate">
              {surahTitle}
              {totalAyahs ? (
                <span className="text-[#D4AF37] font-semibold tabular-nums">
                  {' '}
                  · v.{player.activeAyahIndex + 1}/{totalAyahs}
                </span>
              ) : null}
            </p>
            <p className="text-[11px] text-[#CEC5AD] truncate tabular-nums">
              {player.reciterMeta.shortLabel}
              {player.sleepRemainingSeconds !== null
                ? ` · Sleep ${formatCompactCountdown(player.sleepRemainingSeconds)}`
                : player.sleepTimerMode === 'end_of_surah'
                  ? ' · Sleep at end'
                  : ''}
            </p>
          </div>
        </button>

        {/* Transport Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={player.togglePlayPause}
            aria-label={player.isPlaying ? 'Pause Quran recitation' : 'Play Quran recitation'}
            className="min-h-[44px] min-w-[44px] rounded-xl bg-[#D4AF37] text-[#09090B] hover:bg-[#F3E5AB] flex items-center justify-center transition-colors cursor-pointer"
          >
            {player.isBuffering ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : player.isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={player.playNextSurah}
            aria-label="Next Surah"
            className="min-h-[44px] min-w-[40px] rounded-xl text-[#FAF6EB] hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={player.closeMiniPlayer}
            aria-label="Close Quran mini-player"
            className="min-h-[44px] min-w-[40px] rounded-xl text-[#CEC5AD] hover:text-[#FAF6EB] hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
