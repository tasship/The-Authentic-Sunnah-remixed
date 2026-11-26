import React, { useMemo, useState } from 'react';
import { Check, RotateCcw } from 'lucide-react';
import { DHIKR_CATEGORIES, DHIKR_ITEMS } from '../data/dhikrAndDuas';
import { DhikrCategory, ReaderSettings } from '../types';
import { getLanguageFlags } from '../utils/languageDisplay';

interface DhikrHubProps {
  settings: ReaderSettings;
  dhikrCounts: Record<string, number>;
  onIncrementDhikr: (dhikrId: string, targetCount: number) => void;
  onResetDhikr: (dhikrId: string) => void;
}

export const DhikrHub: React.FC<DhikrHubProps> = ({
  settings,
  dhikrCounts,
  onIncrementDhikr,
  onResetDhikr,
}) => {
  const [activeCategory, setActiveCategory] = useState<DhikrCategory>('Morning Adhkar');

  const { showEnglish, showUrdu, showRomanUrdu } = getLanguageFlags(settings.translationDisplay);

  const items = useMemo(
    () => DHIKR_ITEMS.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  const completedInCat = useMemo(
    () => items.filter((item) => (dhikrCounts[item.id] || 0) >= item.targetCount).length,
    [items, dhikrCounts]
  );

  const handleTap = (id: string, target: number) => {
    const curr = dhikrCounts[id] || 0;
    if (curr >= target) return;
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(curr + 1 >= target ? [30, 40, 30] : 20);
      } catch {
        // ignore unsupported vibrate
      }
    }
    onIncrementDhikr(id, target);
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header Banner */}
      <section className="rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#0A3321] to-[#062115] text-[#FAF6EB] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold">
            Daily Adhkar &amp; Tasbih
          </h1>
          <p className="text-xs sm:text-sm text-[#CEC5AD] mt-1">
            Authentic prophetic remembrance — tap each counter to track your daily Adhkar
          </p>
        </div>
        <div className="text-left sm:text-right shrink-0 tabular-nums">
          <p className="text-xs text-[#F3E5AB]">{activeCategory}</p>
          <p className="text-2xl font-bold">
            {completedInCat} / {items.length} Completed
          </p>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {DHIKR_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#D4AF37] text-[#04180F]'
                : 'bg-white dark:bg-[#062115] border border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-[#365645] dark:text-[#CEC5AD] hover:text-[#092A1B] dark:hover:text-[#FAF6EB]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dhikr Cards */}
      <div className="space-y-4">
        {items.map((item) => {
          const count = dhikrCounts[item.id] || 0;
          const isComplete = count >= item.targetCount;
          const pct = Math.min(100, Math.round((count / item.targetCount) * 100));

          return (
            <article
              key={item.id}
              className={`rounded-2xl border p-5 sm:p-6 transition-colors ${
                isComplete
                  ? 'border-[#D4AF37]/60 bg-[#D4AF37]/[0.07] dark:bg-[#0A3321]/85'
                  : 'border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#B0891E]/15 dark:border-[#D4AF37]/15">
                <div>
                  <h2 className="font-display text-base sm:text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                    {item.title}
                  </h2>
                  <p className="text-xs text-[#365645] dark:text-[#CEC5AD] mt-0.5">
                    {item.reference}
                    {item.virtue ? ` · ${item.virtue}` : ''}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {count > 0 && (
                    <button
                      onClick={() => onResetDhikr(item.id)}
                      aria-label={`Reset counter for ${item.title}`}
                      className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-[#365645] dark:text-[#CEC5AD] hover:text-[#092A1B] dark:hover:text-[#FAF6EB] cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => handleTap(item.id, item.targetCount)}
                    className={`min-h-[44px] px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm tabular-nums transition-transform active:scale-95 inline-flex items-center gap-2 cursor-pointer ${
                      isComplete
                        ? 'bg-[#D4AF37] text-[#04180F]'
                        : 'bg-[#0A3321] text-[#F3E5AB] border border-[#D4AF37]/40 hover:bg-[#0D3D28]'
                    }`}
                  >
                    {isComplete && <Check className="w-4 h-4" />}
                    <span>
                      {count} / {item.targetCount}x
                    </span>
                  </button>
                </div>
              </div>

              {/* Interactive Tap Surface */}
              <div
                onClick={() => handleTap(item.id, item.targetCount)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleTap(item.id, item.targetCount);
                  }
                }}
                className="mt-4 space-y-4 cursor-pointer select-none"
              >
                {settings.showArabic && (
                  <p
                    dir="rtl"
                    style={{ fontSize: `${Math.max(22, settings.arabicFontSize - 2)}px` }}
                    className={`${
                      settings.arabicFont === 'scheherazade'
                        ? 'font-arabic-scheherazade'
                        : 'font-arabic-quran'
                    } leading-[2.05] text-right text-[#092A1B] dark:text-[#F3E5AB]`}
                  >
                    {item.arabic}
                  </p>
                )}

                {settings.showTransliteration && item.transliteration && (
                  <p className="text-xs sm:text-sm italic text-[#B0891E] dark:text-[#D4AF37]/90 leading-relaxed">
                    {item.transliteration}
                  </p>
                )}

                <div
                  className={`gap-4 pt-2 border-t border-[#B0891E]/10 dark:border-[#D4AF37]/10 ${
                    showEnglish && (showUrdu || showRomanUrdu)
                      ? 'grid grid-cols-1 lg:grid-cols-2'
                      : 'space-y-2'
                  }`}
                >
                  {showEnglish && (
                    <p
                      style={{ fontSize: `${settings.englishFontSize}px` }}
                      className="leading-relaxed text-[#365645] dark:text-[#CEC5AD]"
                    >
                      {item.english}
                    </p>
                  )}
                  {showUrdu && (
                    <p
                      dir="rtl"
                      style={{ fontSize: `${settings.urduFontSize}px` }}
                      className="font-urdu leading-loose text-right text-[#092A1B] dark:text-[#FAF6EB]"
                    >
                      {item.urdu}
                    </p>
                  )}
                  {showRomanUrdu && (
                    <p
                      style={{ fontSize: `${settings.englishFontSize}px` }}
                      className="leading-relaxed text-[#365645] dark:text-[#F3E5AB]"
                    >
                      {item.romanUrdu || item.english}
                    </p>
                  )}
                </div>
              </div>

              {/* Thin Gold Progress Bar */}
              <div className="mt-4 h-1.5 w-full rounded-full bg-[#F2EDE0] dark:bg-[#04180F] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#B0891E] to-[#F3E5AB] transition-all duration-200"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
