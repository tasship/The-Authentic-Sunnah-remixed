import React from 'react';
import { Loader2, Pause, Play } from 'lucide-react';

interface FloatingAudioCapsuleProps {
  isVisible: boolean;
  isPlaying: boolean;
  isBuffering?: boolean;
  progressPct: number;
  onTogglePlayPause: () => void;
}

export const FloatingAudioCapsule: React.FC<FloatingAudioCapsuleProps> = ({
  isVisible,
  isPlaying,
  isBuffering = false,
  progressPct,
  onTogglePlayPause,
}) => {
  if (!isVisible) return null;

  const clampedPct = Math.max(0, Math.min(100, Number.isFinite(progressPct) ? progressPct : 0));
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (clampedPct / 100) * circumference;

  return (
    <button
      type="button"
      onClick={onTogglePlayPause}
      aria-label={isPlaying ? 'Pause Quran recitation' : 'Play Quran recitation'}
      title={isPlaying ? 'Pause Recitation' : 'Play Recitation'}
      className="fixed top-[54px] right-3 lg:top-4 lg:right-5 z-40 w-11 h-11 rounded-full backdrop-blur-md bg-zinc-950/65 border border-[#D4AF37]/45 shadow-lg flex items-center justify-center text-[#F3E5AB] hover:border-[#D4AF37] hover:bg-zinc-900/80 active:scale-95 transition-all cursor-pointer"
    >
      <svg
        viewBox="0 0 44 44"
        className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
        aria-hidden="true"
      >
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="rgba(212, 175, 55, 0.18)"
          strokeWidth="2"
        />
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-[stroke-dashoffset] duration-200"
        />
      </svg>

      {isBuffering ? (
        <Loader2 className="relative w-4 h-4 animate-spin text-[#D4AF37]" />
      ) : isPlaying ? (
        <Pause className="relative w-3.5 h-3.5 fill-current text-[#F3E5AB]" />
      ) : (
        <Play className="relative w-3.5 h-3.5 fill-current ml-0.5 text-[#F3E5AB]" />
      )}
    </button>
  );
};
