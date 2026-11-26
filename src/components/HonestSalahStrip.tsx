import React from 'react';
import { Calendar, Check } from 'lucide-react';
import { DailySalahLog, SalahPrayerId, SalahPrayerRecord, TranslationDisplay } from '../types';

export interface HonestSalahStripProps {
  todayLog: DailySalahLog;
  todayKey: string;
  translationDisplay: TranslationDisplay;
  onSavePrayer: (dateKey: string, prayerId: SalahPrayerId, record: SalahPrayerRecord) => Promise<void>;
  onDeletePrayer: (dateKey: string, prayerId: SalahPrayerId) => Promise<void>;
  onOpenHistory: () => void;
}

interface PrayerItem {
  id: SalahPrayerId;
  english: string;
  arabic: string;
}

const FIVE_PRAYERS: PrayerItem[] = [
  { id: 'fajr', english: 'Fajr', arabic: 'الفجر' },
  { id: 'dhuhr', english: 'Dhuhr', arabic: 'الظهر' },
  { id: 'asr', english: 'Asr', arabic: 'العصر' },
  { id: 'maghrib', english: 'Maghrib', arabic: 'المغرب' },
  { id: 'isha', english: 'Isha', arabic: 'العشاء' },
];

export const HonestSalahStrip: React.FC<HonestSalahStripProps> = ({
  todayLog,
  todayKey,
  translationDisplay,
  onSavePrayer,
  onDeletePrayer,
  onOpenHistory,
}) => {
  const completedCount = FIVE_PRAYERS.filter((p) => {
    const st = todayLog?.prayers?.[p.id]?.status;
    return st === 'on_time' || st === 'late';
  }).length;

  const isUrdu = translationDisplay === 'urdu';
  const isRomanUrdu = translationDisplay === 'roman_urdu';

  const bannerTitle = isUrdu
    ? 'یاد رکھیں، اللہ دیکھ رہا ہے'
    : isRomanUrdu
      ? 'Yaad Rakhein, Allah Dekh Raha Hai'
      : 'Remember, Allah is Watching';

  const bannerSubtitle = isUrdu
    ? 'اپنے رب کے حضور سچائی سے اپنی نماز کا اندراج کریں'
    : isRomanUrdu
      ? 'Apne Rab ke huzoor sachai se apni farz namaz darj karein'
      : 'Tap any prayer to record it honestly before your Lord';

  const handleTogglePrayer = async (prayerId: SalahPrayerId) => {
    const current = todayLog?.prayers?.[prayerId];
    const isPrayed = current?.status === 'on_time' || current?.status === 'late';

    if (isPrayed) {
      // 1-Tap Toggle: Uncheck/Remove
      await onDeletePrayer(todayKey, prayerId);
    } else {
      // 1-Tap Toggle: Check/Mark Prayed immediately with zero dialog
      await onSavePrayer(todayKey, prayerId, {
        status: 'on_time',
        updatedAt: Date.now(),
      });
    }
  };

  return (
    <section
      aria-label="Honest Five Daily Salah Tracker"
      className="theme-surface rounded-3xl border border-[#B0891E]/30 dark:border-[#D4AF37]/40 p-4 sm:p-5 shadow-lg space-y-4 relative overflow-hidden"
    >
      {/* Subtle gold radial ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 w-44 h-44 rounded-full bg-[#D4AF37]/10 blur-3xl"
      />

      {/* 1. "Remember, Allah is Watching" Gold Banner & History Icon */}
      <div className="relative flex items-center justify-between gap-3">
        <div className="min-w-0 space-y-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h2
              className={`font-display text-base sm:text-lg font-bold tracking-tight text-[#B0891E] dark:text-[#D4AF37] ${
                isUrdu ? 'font-serif text-lg sm:text-xl' : ''
              }`}
            >
              {bannerTitle}
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#D4AF37]/15 text-[#B0891E] dark:text-[#F3E5AB] border border-[#D4AF37]/35 tabular-nums">
              {completedCount}/5 Prayed
            </span>
          </div>
          <p
            className={`text-xs text-[#365645] dark:text-[#C6C1B5] leading-relaxed truncate ${
              isUrdu ? 'font-serif' : ''
            }`}
          >
            {bannerSubtitle}
          </p>
        </div>

        {/* Premium Gold-Rimmed Salah History Calendar Icon */}
        <button
          type="button"
          onClick={onOpenHistory}
          title="Open Salah Consistency History Calendar"
          aria-label="Open Salah Consistency History Calendar"
          className="shrink-0 p-2.5 sm:px-3 sm:py-2 rounded-2xl border border-[#D4AF37] bg-[#141417]/80 dark:bg-[#09090B] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#09090B] shadow-[0_0_12px_rgba(212,175,55,0.18)] hover:shadow-[0_0_18px_rgba(212,175,55,0.45)] transition-all cursor-pointer flex items-center gap-2 group active:scale-95"
        >
          <Calendar className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span className="text-xs font-semibold hidden sm:inline">History</span>
        </button>
      </div>

      {/* 2. Horizontal Sequence of 5 Luxury Obsidian-and-Gold Square Check-Toggle Buttons */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {FIVE_PRAYERS.map((prayer) => {
          const record = todayLog?.prayers?.[prayer.id];
          const isPrayed = record?.status === 'on_time' || record?.status === 'late';

          return (
            <button
              key={prayer.id}
              type="button"
              role="checkbox"
              aria-checked={isPrayed}
              aria-label={`${prayer.english} prayer, ${isPrayed ? 'Prayed' : 'Unprayed'}. Single tap to toggle.`}
              onClick={() => handleTogglePrayer(prayer.id)}
              className={`group relative rounded-2xl p-2.5 sm:p-3 text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-1.5 aspect-square sm:aspect-auto sm:min-h-[96px] select-none active:scale-95 ${
                isPrayed
                  ? 'border border-[#D4AF37] bg-gradient-to-b from-[#D4AF37]/15 to-[#D4AF37]/5 dark:from-[#D4AF37]/20 dark:to-[#141417] shadow-[0_0_14px_rgba(212,175,55,0.22)]'
                  : 'border border-[#B0891E]/20 dark:border-[#D4AF37]/25 bg-white/60 dark:bg-[#141417]/60 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/5'
              }`}
            >
              {/* Top row: Checkbox Indicator */}
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg border flex items-center justify-center transition-all ${
                  isPrayed
                    ? 'border-[#D4AF37] bg-[#D4AF37] text-[#09090B] shadow-[0_0_10px_rgba(212,175,55,0.6)]'
                    : 'border-[#B0891E]/35 dark:border-[#D4AF37]/40 bg-transparent text-transparent group-hover:border-[#D4AF37]'
                }`}
              >
                <Check
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] transition-transform ${
                    isPrayed ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                  }`}
                />
              </div>

              {/* Middle: Prayer Name & Arabic */}
              <div className="min-w-0 w-full space-y-0.5">
                <p
                  className={`text-xs sm:text-sm font-bold truncate ${
                    isPrayed
                      ? 'text-[#B0891E] dark:text-[#FAF6EB]'
                      : 'text-[#092A1B] dark:text-[#C6C1B5]'
                  }`}
                >
                  {prayer.english}
                </p>
                <p
                  className={`text-[10px] sm:text-[11px] font-arabic font-medium truncate ${
                    isPrayed
                      ? 'text-[#D4AF37]'
                      : 'text-[#365645] dark:text-[#A09A8B]'
                  }`}
                >
                  {prayer.arabic}
                </p>
              </div>

              {/* Bottom: Explicit Status String */}
              <span
                className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider truncate ${
                  isPrayed
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : 'text-[#365645]/70 dark:text-[#A09A8B]/70'
                }`}
              >
                {isPrayed ? 'Prayed' : 'Unprayed'}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
