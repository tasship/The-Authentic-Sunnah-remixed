import React from 'react';
import {
  Check,
  Clock,
  Compass,
  History,
  Loader2,
  MapPin,
  MinusCircle,
  SlidersHorizontal,
  XCircle,
} from 'lucide-react';
import {
  formatPrayerTime12h,
  OBLIGATORY_PRAYER_IDS,
  SALAH_CALCULATION_METHODS,
  SALAH_PRAYER_META,
} from '../services/salahApi';
import {
  DailySalahLog,
  DailySalahTimings,
  SalahPrayerId,
  SalahSettings,
  SalahStatus,
} from '../types';

interface SalahTrackerStripProps {
  todayLog: DailySalahLog;
  dailyTimings: DailySalahTimings | null;
  timingsLoading: boolean;
  locatingGps: boolean;
  salahSettings: SalahSettings;
  nextPrayerInfo: {
    nextPrayerId: SalahPrayerId;
    nextPrayerLabel: string;
    nextPrayerTime12h: string;
    minutesRemaining: number;
    countdownLabel: string;
    currentActiveWindowId: SalahPrayerId;
  } | null;
  onSelectPrayer: (prayerId: SalahPrayerId) => void;
  onDetectGps: () => void;
  onOpenSettings: () => void;
}

function getStatusVisuals(status?: SalahStatus): {
  label: string;
  dotClass: string;
  badgeTextClass: string;
  cardAccentClass: string;
  Icon: typeof Check | null;
} {
  switch (status) {
    case 'on_time':
      return {
        label: 'On time',
        dotClass: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.75)]',
        badgeTextClass: 'text-emerald-700 dark:text-emerald-300',
        cardAccentClass: 'border-emerald-500/45 bg-emerald-500/8',
        Icon: Check,
      };
    case 'late':
      return {
        label: 'Late',
        dotClass: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.65)]',
        badgeTextClass: 'text-amber-700 dark:text-amber-300',
        cardAccentClass: 'border-amber-500/45 bg-amber-500/8',
        Icon: Clock,
      };
    case 'missed':
      return {
        label: 'Missed',
        dotClass: 'bg-rose-400',
        badgeTextClass: 'text-rose-700 dark:text-rose-300',
        cardAccentClass: 'border-rose-500/40 bg-rose-500/8',
        Icon: XCircle,
      };
    case 'not_applicable':
      return {
        label: 'N/A',
        dotClass: 'bg-[#C6C1B5]/70',
        badgeTextClass: 'text-[#365645] dark:text-[#C6C1B5]',
        cardAccentClass: 'border-[#B0891E]/30 dark:border-[#D4AF37]/30 bg-[#D4AF37]/6',
        Icon: MinusCircle,
      };
    default:
      return {
        label: 'Tap to log',
        dotClass: 'bg-[#B0891E]/40 dark:bg-[#D4AF37]/40',
        badgeTextClass: 'text-[#365645] dark:text-[#C6C1B5]',
        cardAccentClass: '',
        Icon: null,
      };
  }
}

export const SalahTrackerStrip: React.FC<SalahTrackerStripProps> = ({
  todayLog,
  dailyTimings,
  timingsLoading,
  locatingGps,
  salahSettings,
  nextPrayerInfo,
  onSelectPrayer,
  onDetectGps,
  onOpenSettings,
}) => {
  const fulfilledCount = OBLIGATORY_PRAYER_IDS.filter((id) => {
    const st = todayLog.prayers[id]?.status;
    return st === 'on_time' || st === 'late';
  }).length;

  const methodShort =
    SALAH_CALCULATION_METHODS.find((m) => m.id === salahSettings.calculationMethod)?.shortName ||
    'ISNA';

  return (
    <section
      aria-label="Five Daily Salah Tracker"
      className="theme-surface rounded-3xl border border-[#B0891E]/25 dark:border-[#D4AF37]/35 p-3.5 sm:p-5 shadow-md space-y-3"
    >
      {/* Top Strip Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0 space-y-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-display text-sm sm:text-base font-bold text-[#092A1B] dark:text-[#FAF6EB]">
              Five Daily Salah
            </h2>
            <span className="text-xs font-semibold text-[#B0891E] dark:text-[#F3E5AB] tabular-nums">
              · {fulfilledCount}/5 Today
            </span>
            {nextPrayerInfo && (
              <span className="text-xs text-[#365645] dark:text-[#C6C1B5] tabular-nums">
                · Next:{' '}
                <strong className="text-[#092A1B] dark:text-[#FAF6EB]">
                  {nextPrayerInfo.nextPrayerLabel}
                </strong>{' '}
                {nextPrayerInfo.countdownLabel}
              </span>
            )}
          </div>

          <p className="text-[11px] text-[#365645] dark:text-[#C6C1B5] flex items-center gap-1.5 flex-wrap">
            <MapPin className="w-3 h-3 text-[#B0891E] dark:text-[#D4AF37] shrink-0" />
            <span className="truncate max-w-[200px] sm:max-w-xs">
              {dailyTimings?.locationLabel || 'Detecting location...'}
            </span>
            <span>·</span>
            <span>
              {methodShort} ({salahSettings.asrSchool === 1 ? 'Hanafi' : 'Standard'})
            </span>
          </p>
        </div>

        {/* Compact Strip Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onDetectGps}
            disabled={locatingGps}
            title="Auto-detect GPS location for exact prayer times"
            className="min-h-[36px] px-2.5 py-1.5 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/30 theme-elevated text-[11px] font-semibold text-[#092A1B] dark:text-[#F3E5AB] hover:border-[#D4AF37] inline-flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60"
          >
            {locatingGps ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
            ) : (
              <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            )}
            <span>{locatingGps ? 'Locating' : 'GPS Sync'}</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectPrayer(nextPrayerInfo?.currentActiveWindowId || 'fajr')}
            title="Review or edit Salah history"
            className="min-h-[36px] px-2.5 py-1.5 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/30 theme-elevated text-[11px] font-semibold text-[#092A1B] dark:text-[#FAF6EB] hover:border-[#D4AF37] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <History className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>History</span>
          </button>

          <button
            type="button"
            onClick={onOpenSettings}
            aria-label="Configure Salah calculation method & alerts"
            title="Prayer Timings & Alerts Settings"
            className="min-h-[36px] min-w-[36px] rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/30 theme-elevated text-[#365645] dark:text-[#C6C1B5] hover:border-[#D4AF37] hover:text-[#D4AF37] inline-flex items-center justify-center transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 6 Micro-Cards Horizontal / Responsive Grid: Fajr · Sunrise · Dhuhr · Asr · Maghrib · Isha */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {SALAH_PRAYER_META.map((prayer) => {
          const record = todayLog.prayers[prayer.id];
          const time24 = dailyTimings?.timings?.[prayer.id];
          const time12 = time24 ? formatPrayerTime12h(time24) : timingsLoading ? '...' : '--:--';
          const isNext = nextPrayerInfo?.nextPrayerId === prayer.id;
          const isSunrise = !prayer.isObligatory;
          const visuals = getStatusVisuals(record?.status);
          const StatusIcon = visuals.Icon;

          return (
            <button
              key={prayer.id}
              type="button"
              onClick={() => onSelectPrayer(prayer.id)}
              className={`min-h-[76px] rounded-2xl border p-2.5 text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                record
                  ? visuals.cardAccentClass
                  : isNext
                    ? 'border-[#D4AF37] bg-[#D4AF37]/12 shadow-[0_0_16px_rgba(212,175,55,0.16)]'
                    : 'border-[#B0891E]/20 dark:border-[#D4AF37]/20 theme-elevated hover:border-[#D4AF37]/60'
              }`}
            >
              {/* Top row: Name + Status Dot */}
              <div className="flex items-center justify-between gap-1 w-full">
                <span
                  className={`text-[11px] sm:text-xs font-bold truncate ${
                    isNext && !record
                      ? 'text-[#B0891E] dark:text-[#F3E5AB]'
                      : 'text-[#092A1B] dark:text-[#FAF6EB]'
                  }`}
                >
                  {prayer.label}
                </span>
                <span
                  aria-hidden="true"
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    isSunrise
                      ? record?.notes
                        ? 'bg-[#D4AF37]'
                        : 'bg-[#D4AF37]/45'
                      : record
                        ? visuals.dotClass
                        : isNext
                          ? 'bg-[#D4AF37] animate-pulse'
                          : visuals.dotClass
                  }`}
                />
              </div>

              {/* Middle: Crisp Timing */}
              <p className="text-xs sm:text-[13px] font-bold tabular-nums text-[#092A1B] dark:text-[#FAF6EB] leading-none">
                {time12}
              </p>

              {/* Bottom: Explicit Text + Icon State (Never hue-only) */}
              <div className="flex items-center gap-1 min-w-0">
                {isSunrise ? (
                  <span className="text-[10px] font-medium text-[#365645] dark:text-[#C6C1B5] truncate">
                    {record?.notes ? 'Duha noted' : 'Shuruq'}
                  </span>
                ) : (
                  <>
                    {StatusIcon && (
                      <StatusIcon className={`w-3 h-3 shrink-0 ${visuals.badgeTextClass}`} />
                    )}
                    <span
                      className={`text-[10px] font-semibold truncate ${
                        record
                          ? visuals.badgeTextClass
                          : isNext
                            ? 'text-[#B0891E] dark:text-[#F3E5AB]'
                            : 'text-[#365645] dark:text-[#C6C1B5]'
                      }`}
                    >
                      {record ? visuals.label : isNext ? 'Upcoming' : 'Log'}
                    </span>
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
