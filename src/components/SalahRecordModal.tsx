import React, { useEffect, useMemo, useState } from 'react';
import {
  Building2,
  Check,
  Clock,
  MinusCircle,
  Sparkles,
  Sun,
  Trash2,
  User,
  Users,
  X,
  XCircle,
} from 'lucide-react';
import {
  formatPrayerTime12h,
  OBLIGATORY_PRAYER_IDS,
  SALAH_PRAYER_META,
} from '../services/salahApi';
import {
  DailySalahLog,
  DailySalahTimings,
  SalahCongregation,
  SalahPrayerId,
  SalahPrayerRecord,
  SalahStatus,
} from '../types';
import { getTodayKey } from '../utils/arabic';

interface SalahRecordModalProps {
  isOpen: boolean;
  initialPrayerId: SalahPrayerId;
  todayKey: string;
  logsMap: Record<string, DailySalahLog>;
  dailyTimings: DailySalahTimings | null;
  onSave: (dateKey: string, prayerId: SalahPrayerId, record: SalahPrayerRecord) => Promise<void>;
  onDelete: (dateKey: string, prayerId: SalahPrayerId) => Promise<void>;
  onClose: () => void;
}

const STATUS_OPTIONS: {
  id: SalahStatus;
  label: string;
  shortLabel: string;
  icon: typeof Check;
  activeClass: string;
  dotClass: string;
}[] = [
  {
    id: 'on_time',
    label: 'Prayed on time',
    shortLabel: 'On time',
    icon: Check,
    activeClass:
      'border-emerald-500/70 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200',
    dotClass: 'bg-emerald-400',
  },
  {
    id: 'late',
    label: 'Prayed late',
    shortLabel: 'Late',
    icon: Clock,
    activeClass:
      'border-amber-500/70 bg-amber-500/15 text-amber-800 dark:text-amber-200',
    dotClass: 'bg-amber-400',
  },
  {
    id: 'missed',
    label: 'Missed',
    shortLabel: 'Missed',
    icon: XCircle,
    activeClass:
      'border-rose-500/70 bg-rose-500/15 text-rose-800 dark:text-rose-200',
    dotClass: 'bg-rose-400',
  },
  {
    id: 'not_applicable',
    label: 'Not applicable',
    shortLabel: 'N/A',
    icon: MinusCircle,
    activeClass:
      'border-[#D4AF37]/60 bg-[#D4AF37]/15 text-[#092A1B] dark:text-[#F3E5AB]',
    dotClass: 'bg-[#C6C1B5]',
  },
];

const CONGREGATION_OPTIONS: {
  id: SalahCongregation;
  label: string;
  icon: typeof Users;
}[] = [
  {
    id: 'masjid_congregation',
    label: 'Masjid with Congregation',
    icon: Building2,
  },
  {
    id: 'elsewhere_congregation',
    label: 'Elsewhere with Congregation',
    icon: Users,
  },
  {
    id: 'individual',
    label: 'Prayed Individually',
    icon: User,
  },
  {
    id: 'prefer_not_to_specify',
    label: 'Prefer not to specify',
    icon: MinusCircle,
  },
];

function buildRecentDayTabs(todayKey: string): { key: string; label: string }[] {
  const [y, m, d] = todayKey.split('-').map(Number);
  const base = new Date(y, m - 1, d);
  const items: { key: string; label: string }[] = [];
  for (let offset = 0; offset < 7; offset++) {
    const dt = new Date(base);
    dt.setDate(base.getDate() - offset);
    const dk = getTodayKey(dt);
    let label = dt.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' });
    if (offset === 0) label = 'Today';
    else if (offset === 1) label = 'Yesterday';
    items.push({ key: dk, label });
  }
  return items;
}

export const SalahRecordModal: React.FC<SalahRecordModalProps> = ({
  isOpen,
  initialPrayerId,
  todayKey,
  logsMap,
  dailyTimings,
  onSave,
  onDelete,
  onClose,
}) => {
  const [selectedDateKey, setSelectedDateKey] = useState(todayKey);
  const [selectedPrayerId, setSelectedPrayerId] = useState<SalahPrayerId>(initialPrayerId);
  const [status, setStatus] = useState<SalahStatus>('on_time');
  const [congregation, setCongregation] = useState<SalahCongregation>('individual');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const recentDays = useMemo(() => buildRecentDayTabs(todayKey), [todayKey]);

  useEffect(() => {
    if (isOpen) {
      setSelectedDateKey(todayKey);
      setSelectedPrayerId(initialPrayerId);
    }
  }, [isOpen, initialPrayerId, todayKey]);

  const existingRecord = logsMap[selectedDateKey]?.prayers?.[selectedPrayerId];

  useEffect(() => {
    if (!isOpen) return;
    if (existingRecord) {
      setStatus(existingRecord.status);
      setCongregation(existingRecord.congregation || 'prefer_not_to_specify');
      setNotes(existingRecord.notes || '');
    } else {
      setStatus('on_time');
      setCongregation('individual');
      setNotes('');
    }
  }, [isOpen, selectedDateKey, selectedPrayerId, existingRecord]);

  if (!isOpen) return null;

  const prayerMeta = SALAH_PRAYER_META.find((p) => p.id === selectedPrayerId)!;
  const rawTiming = dailyTimings?.timings?.[selectedPrayerId];
  const displayTiming = rawTiming ? formatPrayerTime12h(rawTiming) : '--:--';
  const isSunrise = selectedPrayerId === 'sunrise';
  const showCongregation = !isSunrise && (status === 'on_time' || status === 'late');

  const dayObligatoryCount = OBLIGATORY_PRAYER_IDS.filter((id) => {
    const s = logsMap[selectedDateKey]?.prayers?.[id]?.status;
    return s === 'on_time' || s === 'late';
  }).length;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: SalahPrayerRecord = {
        status: isSunrise ? 'on_time' : status,
        ...(showCongregation ? { congregation } : {}),
        ...(notes.trim() ? { notes: notes.trim() } : {}),
        updatedAt: Date.now(),
      };
      await onSave(selectedDateKey, selectedPrayerId, payload);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await onDelete(selectedDateKey, selectedPrayerId);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="salah-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl border border-[#B0891E]/30 dark:border-[#D4AF37]/40 theme-surface shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile bottom-sheet drag indicator */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1 shrink-0">
          <span className="w-10 h-1 rounded-full bg-[#B0891E]/35 dark:bg-[#D4AF37]/40" />
        </div>

        {/* Sheet Header */}
        <div className="px-5 pt-3 sm:pt-5 pb-3.5 border-b border-[#B0891E]/15 dark:border-[#D4AF37]/20 flex items-center justify-between gap-3 shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3
                id="salah-modal-title"
                className="font-display text-lg sm:text-xl font-bold text-[#092A1B] dark:text-[#FAF6EB] truncate"
              >
                {prayerMeta.label}
              </h3>
              <span className="font-arabic text-base text-[#B0891E] dark:text-[#D4AF37]">
                {prayerMeta.arabicLabel}
              </span>
            </div>
            <p className="text-xs text-[#365645] dark:text-[#C6C1B5] mt-0.5 tabular-nums">
              {selectedDateKey === todayKey ? 'Scheduled at ' : 'Day log · '}
              <strong className="text-[#092A1B] dark:text-[#F3E5AB]">{displayTiming}</strong>
              {' · '}
              <span>{dayObligatoryCount}/5 prayers fulfilled</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Salah sheet"
            className="min-h-[44px] min-w-[44px] rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 flex items-center justify-center text-[#365645] dark:text-[#C6C1B5] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Sheet Body */}
        <form onSubmit={handleSave} className="overflow-y-auto px-5 py-4 space-y-5">
          {/* Quick Date History Switcher (Edit / Correct past 7 days) */}
          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#365645] dark:text-[#C6C1B5]">
              Log or Edit History
            </p>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {recentDays.map((day) => {
                const active = day.key === selectedDateKey;
                return (
                  <button
                    key={day.key}
                    type="button"
                    onClick={() => setSelectedDateKey(day.key)}
                    className={`min-h-[36px] px-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                      active
                        ? 'bg-[#D4AF37] text-[#09090B]'
                        : 'border border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-[#365645] dark:text-[#C6C1B5] hover:border-[#D4AF37]/60'
                    }`}
                  >
                    {day.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prayer Switcher Tabs */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
            {SALAH_PRAYER_META.map((p) => {
              const isSelected = p.id === selectedPrayerId;
              const rec = logsMap[selectedDateKey]?.prayers?.[p.id];
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPrayerId(p.id)}
                  className={`min-h-[44px] px-2 py-1.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                    isSelected
                      ? 'border-[#D4AF37] bg-[#D4AF37]/18 text-[#092A1B] dark:text-[#F3E5AB] shadow-sm'
                      : 'border-[#B0891E]/20 dark:border-[#D4AF37]/20 text-[#365645] dark:text-[#C6C1B5] hover:border-[#D4AF37]/50'
                  }`}
                >
                  <span className="text-xs font-bold leading-tight">{p.label}</span>
                  <span className="text-[10px] opacity-80 leading-tight mt-0.5">
                    {rec
                      ? STATUS_OPTIONS.find((s) => s.id === rec.status)?.shortLabel || 'Saved'
                      : p.isObligatory
                        ? 'Unlogged'
                        : 'Time'}
                  </span>
                </button>
              );
            })}
          </div>

          {isSunrise ? (
            <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/8 p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Sun className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                    Sunrise (Shuruq) · {displayTiming}
                  </p>
                  <p className="text-xs text-[#365645] dark:text-[#C6C1B5] leading-relaxed">
                    Sunrise marks the end of the obligatory Fajr prayer time. Voluntary Ishraq /
                    Duha prayer begins roughly 15–20 minutes after sunrise.
                  </p>
                </div>
              </div>
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-[#365645] dark:text-[#C6C1B5]">
                  Optional Duha / Morning Reflection Note
                </span>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Prayed 2 rak'at Duha after sunrise..."
                  className="w-full min-h-[44px] px-3.5 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/30 theme-input text-sm"
                />
              </label>
            </div>
          ) : (
            <>
              {/* 1. Status Blocks */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#365645] dark:text-[#C6C1B5]">
                  Prayer Status
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {STATUS_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const active = status === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setStatus(opt.id)}
                        className={`min-h-[48px] px-3.5 py-2.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                          active
                            ? `${opt.activeClass} ring-1 ring-current/30 shadow-sm`
                            : 'border-[#B0891E]/20 dark:border-[#D4AF37]/20 theme-elevated text-[#365645] dark:text-[#C6C1B5] hover:border-[#D4AF37]/50'
                        }`}
                      >
                        <span
                          className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                            active ? opt.dotClass : 'bg-current opacity-35'
                          }`}
                        />
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="text-xs sm:text-sm font-semibold leading-tight">
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Congregation Sub-Selectors */}
              {showCongregation && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#365645] dark:text-[#C6C1B5]">
                    Congregation Details
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {CONGREGATION_OPTIONS.map((opt) => {
                      const Icon = opt.icon;
                      const active = congregation === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setCongregation(opt.id)}
                          className={`min-h-[48px] px-3.5 py-2.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                            active
                              ? 'border-[#D4AF37] bg-[#D4AF37]/16 text-[#092A1B] dark:text-[#F3E5AB] shadow-sm'
                              : 'border-[#B0891E]/20 dark:border-[#D4AF37]/20 theme-elevated text-[#365645] dark:text-[#C6C1B5] hover:border-[#D4AF37]/50'
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 shrink-0 ${
                              active ? 'text-[#B0891E] dark:text-[#D4AF37]' : 'opacity-75'
                            }`}
                          />
                          <span className="text-xs sm:text-sm font-semibold leading-tight">
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. Optional Notes Input */}
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#365645] dark:text-[#C6C1B5]">
                  Optional Notes
                </span>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Sunnah rawatib, reflection, or reason if delayed..."
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 theme-input text-sm resize-none focus:outline-none focus:border-[#D4AF37]"
                />
              </label>
            </>
          )}

          {/* Action Bar */}
          <div className="flex items-center gap-2.5 pt-1 pb-safe">
            {existingRecord && (
              <button
                type="button"
                disabled={saving}
                onClick={handleDelete}
                aria-label="Clear saved prayer entry"
                className="min-h-[48px] px-4 rounded-2xl border border-rose-500/35 text-rose-600 dark:text-rose-300 text-xs font-semibold hover:bg-rose-500/10 inline-flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear</span>
              </button>
            )}

            <button
              type="submit"
              disabled={saving}
              className="flex-1 min-h-[48px] px-5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E5C665] to-[#D4AF37] text-[#09090B] font-display font-bold text-sm hover:brightness-105 active:scale-[0.99] transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {saving
                  ? 'Saving...'
                  : existingRecord
                    ? `Update ${prayerMeta.label} Record`
                    : `Save ${prayerMeta.label} Record`}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
