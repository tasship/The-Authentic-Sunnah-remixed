import React, { useMemo, useState } from 'react';
import { BookMarked, Check, CheckCircle2, HeartPulse, Sparkles } from 'lucide-react';
import { PROPHETIC_MEDICINE_ITEMS } from '../data/adabAndQuiz';
import { SUNNAH_HABIT_TIMES, SUNNAH_HABITS } from '../data/sunnahHabits';
import { ReaderSettings, SunnahHabitTime } from '../types';
import { getLanguageFlags } from '../utils/languageDisplay';

interface SunnahHabitsHubProps {
  settings: ReaderSettings;
  completedSunnahIds: string[];
  onToggleSunnahHabit: (id: string) => void;
}

export const SunnahHabitsHub: React.FC<SunnahHabitsHubProps> = ({
  settings,
  completedSunnahIds,
  onToggleSunnahHabit,
}) => {
  const [sectionTab, setSectionTab] = useState<'habits' | 'medicine'>('habits');
  const [selectedPeriod, setSelectedPeriod] = useState<'All' | SunnahHabitTime>('All');

  const { showEnglish, showUrdu, showRomanUrdu } = getLanguageFlags(settings.translationDisplay);
  const displayEnglish = showEnglish || showRomanUrdu;

  const completedSet = useMemo(() => new Set(completedSunnahIds), [completedSunnahIds]);
  const totalCount = SUNNAH_HABITS.length;
  const doneCount = useMemo(
    () => SUNNAH_HABITS.filter((h) => completedSet.has(h.id)).length,
    [completedSet]
  );
  const progressPct = Math.round((doneCount / Math.max(1, totalCount)) * 100);

  const visiblePeriods = useMemo(
    () =>
      selectedPeriod === 'All'
        ? SUNNAH_HABIT_TIMES
        : SUNNAH_HABIT_TIMES.filter((p) => p === selectedPeriod),
    [selectedPeriod]
  );

  return (
    <div className="space-y-6 pb-10">
      {/* Header Banner */}
      <section className="theme-hero rounded-3xl border border-[#D4AF37]/35 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#F3E5AB] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Etiquettes of a Muslim · Daily Sunnahs &amp; Prophetic Medicine</span>
            </p>
            <h1 className="font-display text-xl sm:text-2xl font-bold mt-1 text-[#FAF6EB]">
              Adab, Akhlaq &amp; Prophetic Medicine
            </h1>
            <p className="text-xs sm:text-sm text-[#CEC5AD] mt-1">
              Daily prophetic practices from dawn until sleep alongside authentic remedies from
              At-Tibb an-Nabawi
            </p>
          </div>

          <div className="text-left sm:text-right shrink-0 tabular-nums">
            <p className="text-xs text-[#F3E5AB]">Habits Completed Today</p>
            <p className="text-2xl font-bold text-[#FAF6EB]">
              {doneCount} / {totalCount} ({progressPct}%)
            </p>
          </div>
        </div>

        <div className="h-2.5 w-full rounded-full bg-black/35 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#B0891E] via-[#D4AF37] to-[#F3E5AB] transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => setSectionTab('habits')}
            className={`min-h-[44px] px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 ${
              sectionTab === 'habits'
                ? 'bg-[#D4AF37] text-[#09090B] border-[#F3E5AB]'
                : 'bg-black/25 text-[#FAF6EB] border-[#D4AF37]/25 hover:border-[#D4AF37]/60'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Daily Sunnah &amp; Adab Checklist ({totalCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setSectionTab('medicine')}
            className={`min-h-[44px] px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 ${
              sectionTab === 'medicine'
                ? 'bg-[#D4AF37] text-[#09090B] border-[#F3E5AB]'
                : 'bg-black/25 text-[#FAF6EB] border-[#D4AF37]/25 hover:border-[#D4AF37]/60'
            }`}
          >
            <HeartPulse className="w-4 h-4" />
            <span>Prophetic Medicine · Tibb an-Nabawi ({PROPHETIC_MEDICINE_ITEMS.length})</span>
          </button>
        </div>
      </section>

      {sectionTab === 'habits' ? (
        <>
          {/* Period Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedPeriod('All')}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedPeriod === 'All'
                  ? 'bg-[#D4AF37] text-[#09090B]'
                  : 'bg-white dark:bg-[#141417] border border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-[#365645] dark:text-[#CEC5AD]'
              }`}
            >
              All Times ({totalCount})
            </button>
            {SUNNAH_HABIT_TIMES.map((period) => {
              const items = SUNNAH_HABITS.filter((h) => h.timeOfDay === period);
              const doneInPeriod = items.filter((h) => completedSet.has(h.id)).length;
              return (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors tabular-nums cursor-pointer ${
                    selectedPeriod === period
                      ? 'bg-[#D4AF37] text-[#09090B]'
                      : 'bg-white dark:bg-[#141417] border border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-[#365645] dark:text-[#CEC5AD]'
                  }`}
                >
                  {period} ({doneInPeriod}/{items.length})
                </button>
              );
            })}
          </div>

          {/* Grouped Sunnah Habit Lists */}
          <div className="space-y-6">
            {visiblePeriods.map((period) => {
              const periodItems = SUNNAH_HABITS.filter((h) => h.timeOfDay === period);
              const periodDone = periodItems.filter((h) => completedSet.has(h.id)).length;
              return (
                <section key={period} className="space-y-3">
                  <div className="flex items-center justify-between gap-2 px-1">
                    <h2 className="font-display text-base sm:text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                      {period}
                    </h2>
                    <span className="text-xs font-semibold text-[#B0891E] dark:text-[#D4AF37] tabular-nums">
                      {periodDone} / {periodItems.length} Completed
                    </span>
                  </div>

                  <div className="space-y-3">
                    {periodItems.map((habit) => {
                      const isDone = completedSet.has(habit.id);
                      return (
                        <button
                          key={habit.id}
                          type="button"
                          onClick={() => onToggleSunnahHabit(habit.id)}
                          className={`w-full text-left rounded-2xl border p-4 sm:p-5 transition-colors flex items-start gap-3.5 cursor-pointer ${
                            isDone
                              ? 'border-[#D4AF37]/70 bg-[#D4AF37]/[0.08] dark:bg-[#1D1D22]'
                              : 'border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#141417] hover:border-[#D4AF37]/60'
                          }`}
                        >
                          <span
                            className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                              isDone
                                ? 'bg-[#D4AF37] border-[#D4AF37] text-[#09090B]'
                                : 'border-[#B0891E]/40 dark:border-[#D4AF37]/40 text-transparent'
                            }`}
                          >
                            <Check className="w-4 h-4 stroke-[2.75]" />
                          </span>

                          <div className="flex-1 min-w-0 space-y-2">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div className="space-y-1 flex-1 min-w-0">
                                {displayEnglish && (
                                  <h3
                                    className={`font-display text-sm sm:text-base font-bold ${
                                      isDone
                                        ? 'text-[#B0891E] dark:text-[#F3E5AB]'
                                        : 'text-[#092A1B] dark:text-[#FAF6EB]'
                                    }`}
                                  >
                                    {habit.titleEn}
                                  </h3>
                                )}
                                {showUrdu && (
                                  <p
                                    dir="rtl"
                                    className="font-urdu text-lg text-right font-semibold text-[#092A1B] dark:text-[#F3E5AB]"
                                  >
                                    {habit.titleUr}
                                  </p>
                                )}
                              </div>

                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B0891E] dark:text-[#D4AF37] shrink-0">
                                {isDone ? (
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                ) : (
                                  <BookMarked className="w-3.5 h-3.5" />
                                )}
                                <span>{habit.reference}</span>
                              </span>
                            </div>

                            <div className="space-y-2 pt-1.5 border-t border-[#B0891E]/10 dark:border-[#D4AF37]/10">
                              {displayEnglish && (
                                <p
                                  style={{ fontSize: `${Math.max(13, settings.englishFontSize - 1)}px` }}
                                  className="leading-relaxed text-[#365645] dark:text-[#CEC5AD]"
                                >
                                  {habit.descriptionEn}
                                </p>
                              )}
                              {showUrdu && (
                                <p
                                  dir="rtl"
                                  style={{ fontSize: `${Math.max(15, settings.urduFontSize - 1)}px` }}
                                  className="font-urdu leading-loose text-right text-[#365645] dark:text-[#FAF6EB]/90"
                                >
                                  {habit.descriptionUr}
                                </p>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROPHETIC_MEDICINE_ITEMS.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#141417] p-5 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  {displayEnglish && (
                    <h3 className="font-display text-base font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                      {item.nameEn}
                    </h3>
                  )}
                  {showUrdu && (
                    <p
                      dir="rtl"
                      className="font-urdu text-lg text-right font-semibold text-[#B0891E] dark:text-[#F3E5AB]"
                    >
                      {item.nameUr}
                    </p>
                  )}
                </div>

                {settings.showArabic && (
                  <p dir="rtl" className="font-arabic-quran text-xl text-[#B0891E] dark:text-[#F3E5AB] shrink-0">
                    {item.arabicName}
                  </p>
                )}
              </div>

              {displayEnglish && (
                <p className="text-sm leading-relaxed text-[#365645] dark:text-[#CEC5AD]">
                  {item.benefitEn}
                </p>
              )}
              {showUrdu && (
                <p
                  dir="rtl"
                  className="font-urdu text-base leading-loose text-right text-[#365645] dark:text-[#FAF6EB]/90"
                >
                  {item.benefitUr}
                </p>
              )}

              <p className="text-[11px] font-semibold text-[#B0891E] dark:text-[#D4AF37] pt-2 border-t border-[#B0891E]/15 dark:border-[#D4AF37]/15">
                Reference: {item.reference}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
