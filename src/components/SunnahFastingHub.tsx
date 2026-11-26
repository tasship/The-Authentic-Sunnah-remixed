import React, { useMemo } from 'react';
import { CalendarDays, Check, Moon, Sparkles, Sun } from 'lucide-react';
import { FastingCategory, FastingLogEntry, ReaderSettings } from '../types';
import { getTodayKey } from '../utils/arabic';
import { getLanguageFlags } from '../utils/languageDisplay';

interface SunnahFastingHubProps {
  settings: ReaderSettings;
  fastingLog: FastingLogEntry[];
  onToggleFastingDate: (date: string, category: FastingCategory, hijriLabel?: string) => void;
}

interface HijriParts {
  day: number;
  monthName: string;
  year: number;
  label: string;
}

function getHijriParts(date: Date): HijriParts | null {
  try {
    const fmt = new Intl.DateTimeFormat('en-TN-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const parts = fmt.formatToParts(date);
    const dayStr = parts.find((p) => p.type === 'day')?.value || '1';
    const monthName = parts.find((p) => p.type === 'month')?.value || '';
    const yearStr = parts.find((p) => p.type === 'year')?.value || '';
    const day = Number(dayStr.replace(/[^\d]/g, '')) || 1;
    const year = Number(yearStr.replace(/[^\d]/g, '')) || 1447;
    return {
      day,
      monthName,
      year,
      label: `${day} ${monthName} ${year}`,
    };
  } catch {
    return null;
  }
}

const FASTING_VIRTUES = [
  {
    id: 'fv-1',
    title: 'Mondays & Thursdays',
    reference: 'Sunan at-Tirmidhi 747 · Sahih Muslim 1162',
    english:
      'Deeds are presented to Allah on Mondays and Thursdays, and the Prophet (ﷺ) loved that his deeds be presented while he was fasting.',
    urdu: 'سوموار اور جمعرات کو اعمال اللہ کے حضور پیش کیے جاتے ہیں، اور نبی کریم ﷺ پسند فرماتے تھے کہ آپ کا عمل اس حال میں پیش ہو کہ آپ روزے سے ہوں۔',
  },
  {
    id: 'fv-2',
    title: 'Ayyam al-Beed (The White Days: 13th, 14th, 15th)',
    reference: 'Sunan an-Nasa’i 2424 · Sahih Muslim 1162',
    english:
      'Fasting three days of every Hijri month (the 13th, 14th, and 15th) is equivalent in reward to fasting the entire year continuously.',
    urdu: 'ہر قمری مہینے کی تیرہ، چودہ اور پندرہ تاریخ (ایامِ بیض) کے تین روزے رکھنا گویا پورے سال کے روزوں کے برابر ہے۔',
  },
  {
    id: 'fv-3',
    title: 'Ramadan Faith & Reward',
    reference: 'Sahih al-Bukhari 1901 · Sahih Muslim 760',
    english:
      'Whoever fasts the month of Ramadan out of sincere faith and hoping for reward from Allah will have all of his previous sins forgiven.',
    urdu: 'جو شخص ایمان اور ثواب کی نیت سے رمضان کے روزے رکھے، اس کے پچھلے تمام گناہ معاف کر دیے جاتے ہیں۔',
  },
  {
    id: 'fv-4',
    title: 'Gate of Ar-Rayyan in Paradise',
    reference: 'Sahih al-Bukhari 1896 · Sahih Muslim 1152',
    english:
      'Indeed, there is a gate in Paradise called Ar-Rayyan, through which those who fast will enter on the Day of Resurrection, and none other than them.',
    urdu: 'جنت میں ایک دروازہ ہے جس کا نام ریان ہے، قیامت کے دن اس سے صرف روزہ دار ہی داخل ہوں گے، ان کے سوا کوئی اور داخل نہ ہو سکے گا۔',
  },
];

const CATEGORY_OPTIONS: { id: FastingCategory; label: string }[] = [
  { id: 'monday_thursday', label: 'Monday / Thursday' },
  { id: 'ayyam_al_beed', label: 'Ayyam al-Beed (13-15)' },
  { id: 'ramadan', label: 'Ramadan' },
  { id: 'voluntary', label: 'Voluntary Sunnah' },
];

export const SunnahFastingHub: React.FC<SunnahFastingHubProps> = ({
  settings,
  fastingLog,
  onToggleFastingDate,
}) => {
  const { showEnglish, showUrdu, showRomanUrdu } = getLanguageFlags(settings.translationDisplay);

  const today = useMemo(() => new Date(), []);
  const todayKey = getTodayKey(today);
  const todayHijri = useMemo(() => getHijriParts(today), [today]);

  const isTodayMonOrThu = today.getDay() === 1 || today.getDay() === 4;
  const isTodayAyyamAlBeed = todayHijri ? [13, 14, 15].includes(todayHijri.day) : false;
  const isTodayRamadan = todayHijri
    ? todayHijri.monthName.toLowerCase().includes('ramadan') ||
      todayHijri.monthName.toLowerCase().includes('ramadhan')
    : false;

  const suggestedTodayCategory: FastingCategory = isTodayRamadan
    ? 'ramadan'
    : isTodayAyyamAlBeed
      ? 'ayyam_al_beed'
      : isTodayMonOrThu
        ? 'monday_thursday'
        : 'voluntary';

  const logByDate = useMemo(() => {
    const map = new Map<string, FastingLogEntry>();
    for (const entry of fastingLog) {
      map.set(entry.date, entry);
    }
    return map;
  }, [fastingLog]);

  const todayEntry = logByDate.get(todayKey);

  // Recent 14 days for quick visual logging
  const recentDays = useMemo(() => {
    const items: {
      dateKey: string;
      dayShort: string;
      dayNum: number;
      hijriDay?: number;
      isSunnahDay: boolean;
      logged?: FastingLogEntry;
    }[] = [];
    for (let offset = 13; offset >= 0; offset--) {
      const dt = new Date(today);
      dt.setDate(today.getDate() - offset);
      const dk = getTodayKey(dt);
      const hijri = getHijriParts(dt);
      const isMonThu = dt.getDay() === 1 || dt.getDay() === 4;
      const isBeed = hijri ? [13, 14, 15].includes(hijri.day) : false;
      items.push({
        dateKey: dk,
        dayShort: dt.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: dt.getDate(),
        hijriDay: hijri?.day,
        isSunnahDay: isMonThu || isBeed,
        logged: logByDate.get(dk),
      });
    }
    return items;
  }, [today, logByDate]);

  // Upcoming 35-day scan for next Monday/Thursday and next Ayyam al-Beed
  const upcomingFasts = useMemo(() => {
    let nextMon: string | null = null;
    let nextThu: string | null = null;
    const nextBeedDates: { dateLabel: string; hijriLabel: string }[] = [];

    for (let i = 0; i <= 35; i++) {
      const dt = new Date(today);
      dt.setDate(today.getDate() + i);
      const formatted = dt.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      if (!nextMon && dt.getDay() === 1) {
        nextMon = i === 0 ? `Today (${formatted})` : formatted;
      }
      if (!nextThu && dt.getDay() === 4) {
        nextThu = i === 0 ? `Today (${formatted})` : formatted;
      }
      const hijri = getHijriParts(dt);
      if (hijri && [13, 14, 15].includes(hijri.day) && nextBeedDates.length < 3) {
        nextBeedDates.push({
          dateLabel: i === 0 ? `Today (${formatted})` : formatted,
          hijriLabel: hijri.label,
        });
      }
    }
    return { nextMon, nextThu, nextBeedDates };
  }, [today]);

  const counts = useMemo(() => {
    return {
      total: fastingLog.length,
      monThu: fastingLog.filter((f) => f.category === 'monday_thursday').length,
      ayyam: fastingLog.filter((f) => f.category === 'ayyam_al_beed').length,
      ramadan: fastingLog.filter((f) => f.category === 'ramadan').length,
    };
  }, [fastingLog]);

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Banner & Today's Hijri / Sunnah Status */}
      <section className="rounded-3xl border border-[#D4AF37]/35 bg-gradient-to-br from-[#141417] via-[#09090B] to-[#121614] text-[#FAF6EB] p-5 sm:p-7 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#F3E5AB] flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{todayHijri ? todayHijri.label : 'Hijri Calendar Active'}</span>
            </p>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-[#FAF6EB] mt-1">
              Sunnah Fasting Tracker (Sawm)
            </h1>
            <p className="text-xs sm:text-sm text-[#CEC5AD] mt-1">
              Mondays &amp; Thursdays, Ayyam al-Beed (13th, 14th &amp; 15th Hijri), and Ramadan fasts
            </p>
          </div>

          <div className="rounded-2xl border border-[#D4AF37]/35 bg-[#1B1B20] px-4 py-3 text-right tabular-nums shrink-0">
            <p className="text-[11px] uppercase tracking-wider text-[#F3E5AB]">Total Fasts Logged</p>
            <p className="font-display text-2xl font-bold text-[#FAF6EB]">{counts.total}</p>
          </div>
        </div>

        {/* Special Today Notice */}
        {(isTodayMonOrThu || isTodayAyyamAlBeed || isTodayRamadan) && (
          <div className="rounded-2xl border border-[#D4AF37]/45 bg-[#D4AF37]/12 px-4 py-3 flex items-center gap-2.5 text-xs sm:text-sm text-[#F3E5AB]">
            <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>
              Today is a recommended fasting day:{' '}
              <strong>
                {isTodayRamadan
                  ? 'Blessed Month of Ramadan'
                  : isTodayAyyamAlBeed
                    ? `Ayyam al-Beed (${todayHijri?.day}th ${todayHijri?.monthName})`
                    : today.getDay() === 1
                      ? 'Sunnah Monday Fast'
                      : 'Sunnah Thursday Fast'}
              </strong>
            </span>
          </div>
        )}

        {/* Log Today's Fast Buttons */}
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-semibold text-[#F3E5AB]">
              {todayEntry
                ? `Logged today as ${
                    CATEGORY_OPTIONS.find((c) => c.id === todayEntry.category)?.label ||
                    todayEntry.category
                  }`
                : 'Log Today’s Fast:'}
            </p>
            {todayEntry && (
              <button
                type="button"
                onClick={() =>
                  onToggleFastingDate(todayKey, todayEntry.category, todayHijri?.label)
                }
                className="text-xs font-semibold text-[#CEC5AD] hover:text-[#FAF6EB] underline cursor-pointer"
              >
                Remove Today&apos;s Entry
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CATEGORY_OPTIONS.map((opt) => {
              const isSelected = todayEntry?.category === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onToggleFastingDate(todayKey, opt.id, todayHijri?.label)}
                  className={`min-h-[42px] px-3 py-2 rounded-xl border text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#D4AF37] bg-[#D4AF37] text-[#09090B] shadow-md'
                      : 'border-[#D4AF37]/30 bg-[#1B1B20] text-[#F3E5AB] hover:border-[#D4AF37]'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Summary Metrics + Upcoming Dates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <section className="lg:col-span-5 rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#141417] p-5 space-y-4">
          <h2 className="font-display text-base font-bold text-[#092A1B] dark:text-[#FAF6EB] flex items-center gap-2">
            <Sun className="w-4 h-4 text-[#B0891E] dark:text-[#D4AF37]" />
            <span>Upcoming Sunnah Fasts</span>
          </h2>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="rounded-xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-[#F9F6EE] dark:bg-[#09090B] p-3.5 flex items-center justify-between gap-2">
              <span className="font-semibold text-[#092A1B] dark:text-[#FAF6EB]">Next Monday</span>
              <span className="font-bold text-[#B0891E] dark:text-[#F3E5AB] tabular-nums">
                {upcomingFasts.nextMon}
              </span>
            </div>
            <div className="rounded-xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-[#F9F6EE] dark:bg-[#09090B] p-3.5 flex items-center justify-between gap-2">
              <span className="font-semibold text-[#092A1B] dark:text-[#FAF6EB]">Next Thursday</span>
              <span className="font-bold text-[#B0891E] dark:text-[#F3E5AB] tabular-nums">
                {upcomingFasts.nextThu}
              </span>
            </div>
            <div className="rounded-xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-[#F9F6EE] dark:bg-[#09090B] p-3.5 space-y-1.5">
              <p className="font-semibold text-[#092A1B] dark:text-[#FAF6EB]">
                Next Ayyam al-Beed (13th, 14th, 15th Hijri)
              </p>
              {upcomingFasts.nextBeedDates.map((d) => (
                <div
                  key={d.hijriLabel}
                  className="flex items-center justify-between text-xs text-[#365645] dark:text-[#CEC5AD] tabular-nums"
                >
                  <span>{d.hijriLabel}</span>
                  <span className="font-semibold text-[#B0891E] dark:text-[#F3E5AB]">
                    {d.dateLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Past 14 Days Interactive Log Strip */}
        <section className="lg:col-span-7 rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#141417] p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-display text-base font-bold text-[#092A1B] dark:text-[#FAF6EB] flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-[#B0891E] dark:text-[#D4AF37]" />
                <span>Last 14 Days Fasting Log</span>
              </h2>
              <p className="text-xs text-[#365645] dark:text-[#CEC5AD]">
                Tap any date to mark or unmark a completed fast
              </p>
            </div>
            <div className="text-xs text-[#B0891E] dark:text-[#F3E5AB] font-semibold tabular-nums">
              Mon/Thu: {counts.monThu} · White Days: {counts.ayyam} · Ramadan: {counts.ramadan}
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {recentDays.map((item) => {
              const isLogged = Boolean(item.logged);
              return (
                <button
                  key={item.dateKey}
                  type="button"
                  onClick={() =>
                    onToggleFastingDate(
                      item.dateKey,
                      item.logged?.category || suggestedTodayCategory,
                      item.hijriDay ? `Hijri Day ${item.hijriDay}` : undefined
                    )
                  }
                  className={`rounded-xl border p-2 flex flex-col items-center gap-0.5 tabular-nums cursor-pointer transition-all ${
                    isLogged
                      ? 'border-[#D4AF37] bg-gradient-to-br from-[#F3E5AB] to-[#D4AF37] text-[#09090B] font-bold shadow-sm'
                      : item.isSunnahDay
                        ? 'border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#092A1B] dark:text-[#F3E5AB]'
                        : 'border-[#B0891E]/15 dark:border-[#D4AF37]/15 bg-[#F9F6EE] dark:bg-[#09090B] text-[#365645] dark:text-[#CEC5AD]'
                  }`}
                >
                  <span className="text-[10px] uppercase">{item.dayShort}</span>
                  <span className="text-sm font-bold">{item.dayNum}</span>
                  <span className="text-[10px] opacity-75">
                    {isLogged ? 'Fast' : item.hijriDay ? `${item.hijriDay}H` : ''}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* Authentic Hadith Virtues of Fasting */}
      <section className="space-y-3.5">
        <h2 className="font-display text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB]">
          Authentic Virtues of Sunnah Fasting
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FASTING_VIRTUES.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#141417] p-5 space-y-2.5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-base font-bold text-[#B0891E] dark:text-[#F3E5AB]">
                  {item.title}
                </h3>
                <span className="text-[11px] font-semibold text-[#365645] dark:text-[#CEC5AD]">
                  {item.reference}
                </span>
              </div>
              {(showEnglish || showRomanUrdu) && (
                <p className="text-xs sm:text-sm leading-relaxed text-[#092A1B] dark:text-[#FAF6EB]">
                  {item.english}
                </p>
              )}
              {showUrdu && (
                <p
                  dir="rtl"
                  className="font-urdu text-base leading-loose text-right text-[#092A1B] dark:text-[#F3E5AB]"
                >
                  {item.urdu}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
