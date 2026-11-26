import React, { useMemo, useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
} from 'lucide-react';
import { DailySalahLog, SalahPrayerId } from '../types';

interface SalahHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  logsMap: Record<string, DailySalahLog>;
  todayKey: string;
}

const PRAYERS: { id: SalahPrayerId; label: string; initial: string }[] = [
  { id: 'fajr', label: 'Fajr', initial: 'F' },
  { id: 'dhuhr', label: 'Dhuhr', initial: 'D' },
  { id: 'asr', label: 'Asr', initial: 'A' },
  { id: 'maghrib', label: 'Maghrib', initial: 'M' },
  { id: 'isha', label: 'Isha', initial: 'I' },
];

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const SalahHistoryModal: React.FC<SalahHistoryModalProps> = ({
  isOpen,
  onClose,
  logsMap,
  todayKey,
}) => {
  // Calendar viewing month/year state
  const [currentYear, setCurrentYear] = useState(() => {
    const [y] = todayKey.split('-').map(Number);
    return Number.isFinite(y) ? y : new Date().getFullYear();
  });
  const [currentMonth, setCurrentMonth] = useState(() => {
    const [, m] = todayKey.split('-').map(Number);
    return Number.isFinite(m) ? m - 1 : new Date().getMonth();
  });

  const [selectedDateKey, setSelectedDateKey] = useState<string>(todayKey);

  // Month metadata
  const monthName = useMemo(() => {
    return new Date(currentYear, currentMonth, 1).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  }, [currentYear, currentMonth]);

  const daysInMonth = useMemo(() => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  }, [currentYear, currentMonth]);

  // First day of month weekday index (0 = Mon, 6 = Sun)
  const firstDayWeekday = useMemo(() => {
    const day = new Date(currentYear, currentMonth, 1).getDay();
    // JS getDay(): 0 = Sun, 1 = Mon ... convert to Mon = 0, Sun = 6
    return (day + 6) % 7;
  }, [currentYear, currentMonth]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleJumpToToday = () => {
    const [y, m] = todayKey.split('-').map(Number);
    setCurrentYear(y);
    setCurrentMonth(m - 1);
    setSelectedDateKey(todayKey);
  };

  // Compute month statistics
  const monthStats = useMemo(() => {
    let totalPrayersLogged = 0;
    let perfectDays = 0;
    let loggedDays = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const log = logsMap[dateKey];
      if (!log || !log.prayers) continue;

      let dayCount = 0;
      for (const p of PRAYERS) {
        const st = log.prayers[p.id]?.status;
        if (st === 'on_time' || st === 'late') {
          dayCount++;
          totalPrayersLogged++;
        }
      }

      if (dayCount > 0) loggedDays++;
      if (dayCount === 5) perfectDays++;
    }

    return { totalPrayersLogged, perfectDays, loggedDays };
  }, [currentMonth, currentYear, daysInMonth, logsMap]);

  const selectedLog = logsMap[selectedDateKey];
  const selectedDayCompletedPrayers = useMemo(() => {
    if (!selectedLog?.prayers) return [];
    return PRAYERS.filter((p) => {
      const st = selectedLog.prayers[p.id]?.status;
      return st === 'on_time' || st === 'late';
    });
  }, [selectedLog]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="salah-history-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div
        className="relative w-full max-w-lg rounded-3xl border border-[#D4AF37]/40 bg-[#09090B] text-[#FAF6EB] shadow-2xl p-5 sm:p-6 space-y-4 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#D4AF37]">
              <CalendarIcon className="w-5 h-5" />
            </span>
            <div>
              <h2
                id="salah-history-title"
                className="font-display text-base sm:text-lg font-bold text-[#FAF6EB]"
              >
                Salah Consistency Matrix
              </h2>
              <p className="text-[11px] text-[#C6C1B5]">
                Full-month history with 5-prayer completion mapping
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Salah history"
            className="p-2 rounded-xl text-[#C6C1B5] hover:text-[#FAF6EB] hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Month Navigation Controls */}
        <div className="flex items-center justify-between gap-2 px-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label="Previous month"
            className="p-2 rounded-xl border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <h3 className="font-display text-sm sm:text-base font-bold text-[#FAF6EB] tracking-wide">
              {monthName}
            </h3>
            <button
              type="button"
              onClick={handleJumpToToday}
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors cursor-pointer"
            >
              Today
            </button>
          </div>

          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Next month"
            className="p-2 rounded-xl border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Month Quick Summary Stats */}
        <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl border border-[#D4AF37]/20 bg-[#141417]/90 text-center">
          <div>
            <span className="block text-[10px] text-[#C6C1B5] uppercase font-semibold">
              Prayers Logged
            </span>
            <span className="text-sm sm:text-base font-bold text-[#D4AF37] tabular-nums">
              {monthStats.totalPrayersLogged}
            </span>
          </div>
          <div className="border-x border-white/10">
            <span className="block text-[10px] text-[#C6C1B5] uppercase font-semibold">
              Perfect 5/5 Days
            </span>
            <span className="text-sm sm:text-base font-bold text-emerald-400 tabular-nums">
              {monthStats.perfectDays}
            </span>
          </div>
          <div>
            <span className="block text-[10px] text-[#C6C1B5] uppercase font-semibold">
              Active Days
            </span>
            <span className="text-sm sm:text-base font-bold text-[#FAF6EB] tabular-nums">
              {monthStats.loggedDays}/{daysInMonth}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-[11px] text-[#C6C1B5] px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
            <span>Prayed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/15" />
            <span>Unprayed</span>
          </div>
          <span className="text-[10px] text-[#A09A8B]">F · D · A · M · I</span>
        </div>

        {/* Calendar Grid */}
        <div className="space-y-1">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[#A09A8B] uppercase tracking-wider py-1">
            {WEEKDAYS.map((wd) => (
              <div key={wd}>{wd}</div>
            ))}
          </div>

          {/* Day Cells */}
          <div className="grid grid-cols-7 gap-1.5">
            {/* Empty slots before first day */}
            {Array.from({ length: firstDayWeekday }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[58px] rounded-xl opacity-0" />
            ))}

            {/* Days of current month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              const isToday = dateKey === todayKey;
              const isSelected = dateKey === selectedDateKey;
              const log = logsMap[dateKey];

              let completedForDay = 0;
              const marks = PRAYERS.map((p) => {
                const st = log?.prayers?.[p.id]?.status;
                const isPrayed = st === 'on_time' || st === 'late';
                if (isPrayed) completedForDay++;
                return { id: p.id, isPrayed };
              });

              return (
                <button
                  key={dateKey}
                  type="button"
                  onClick={() => setSelectedDateKey(dateKey)}
                  className={`min-h-[58px] p-1.5 rounded-xl border flex flex-col justify-between items-center transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-[#D4AF37] bg-[#D4AF37]/15 shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                      : isToday
                        ? 'border-[#D4AF37]/60 bg-white/5'
                        : 'border-white/10 bg-[#141417]/60 hover:border-white/30 hover:bg-white/5'
                  }`}
                >
                  {/* Top: Day Number + Today Marker */}
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-xs font-bold tabular-nums ${
                        isToday
                          ? 'text-[#D4AF37]'
                          : isSelected
                            ? 'text-[#FAF6EB]'
                            : 'text-[#C6C1B5]'
                      }`}
                    >
                      {dayNum}
                    </span>
                    {completedForDay === 5 && (
                      <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
                    )}
                  </div>

                  {/* Bottom: 5 Tiny Glowing Indicator Marks (F, D, A, M, I) */}
                  <div className="flex items-center justify-center gap-1 w-full pt-1">
                    {marks.map((m) => (
                      <span
                        key={m.id}
                        title={`${m.id}: ${m.isPrayed ? 'Prayed' : 'Unprayed'}`}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          m.isPrayed
                            ? 'bg-[#D4AF37] shadow-[0_0_5px_rgba(212,175,55,0.9)]'
                            : 'bg-white/15'
                        }`}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Detail Drawer */}
        <div className="p-3.5 rounded-2xl border border-[#D4AF37]/25 bg-[#141417] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#FAF6EB]">
              Details for {selectedDateKey} {selectedDateKey === todayKey && '(Today)'}
            </span>
            <span className="text-xs font-semibold text-[#D4AF37] tabular-nums">
              {selectedDayCompletedPrayers.length}/5 Completed
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 pt-1">
            {PRAYERS.map((p) => {
              const st = selectedLog?.prayers?.[p.id]?.status;
              const isPrayed = st === 'on_time' || st === 'late';
              return (
                <div
                  key={p.id}
                  className={`p-2 rounded-xl text-center border ${
                    isPrayed
                      ? 'border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37]'
                      : 'border-white/10 bg-white/5 text-[#A09A8B]'
                  }`}
                >
                  <p className="text-[10px] font-bold">{p.label}</p>
                  <p className="text-[11px] font-bold mt-0.5">
                    {isPrayed ? '✓' : '—'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full min-h-[44px] rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37] text-[#09090B] font-bold text-sm hover:bg-[#F3E5AB] transition-colors cursor-pointer"
        >
          Close History
        </button>
      </div>
    </div>
  );
};
