import React, { useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, Search, Sparkles } from 'lucide-react';
import { PROPHET_STORIES } from '../data/prophetsStories';
import { ReaderSettings } from '../types';
import { getLanguageFlags } from '../utils/languageDisplay';

interface ProphetsStoriesHubProps {
  settings: ReaderSettings;
}

export const ProphetsStoriesHub: React.FC<ProphetsStoriesHubProps> = ({ settings }) => {
  const [selectedId, setSelectedId] = useState<string>(PROPHET_STORIES[0].id);
  const [query, setQuery] = useState('');

  const { showEnglish, showUrdu, showRomanUrdu } = getLanguageFlags(settings.translationDisplay);

  const filteredStories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PROPHET_STORIES;
    return PROPHET_STORIES.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.titleEn.toLowerCase().includes(q) ||
        p.nameUrdu.includes(q) ||
        p.storyEn.some((s) => s.toLowerCase().includes(q))
    );
  }, [query]);

  const activeStory =
    filteredStories.find((p) => p.id === selectedId) || filteredStories[0] || PROPHET_STORIES[0];

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <section className="theme-hero rounded-3xl border border-[#D4AF37]/35 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#F3E5AB] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Qasas al-Anbiya · Quran &amp; Authentic Sunnah</span>
            </p>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-[#FAF6EB]">
              Stories of the Prophets (عليهم السلام)
            </h1>
            <p className="text-xs sm:text-sm text-[#CEC5AD] max-w-2xl">
              Authentic narratives, trials, supplications, and enduring wisdom from the lives of
              Allah’s Noble Messengers
            </p>
          </div>
          <span className="text-xs font-semibold text-[#F3E5AB] tabular-nums shrink-0">
            {PROPHET_STORIES.length} Prophets Featured
          </span>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-[#F3E5AB]/80 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a Prophet (Adam, Nuh, Ibrahim, Yusuf, Musa, Yunus, Isa...)"
            className="w-full min-h-[44px] pl-10 pr-4 py-2.5 rounded-xl bg-black/30 border border-[#D4AF37]/30 text-sm text-[#FAF6EB] placeholder:text-[#CEC5AD]/70 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </section>

      {/* Prophet Selector Grid */}
      <div className="flex flex-wrap items-center gap-2">
        {filteredStories.map((prophet) => {
          const active = prophet.id === activeStory.id;
          return (
            <button
              key={prophet.id}
              type="button"
              onClick={() => setSelectedId(prophet.id)}
              className={`min-h-[42px] px-3.5 py-2 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                active
                  ? 'bg-[#D4AF37] text-[#09090B] border-[#F3E5AB]'
                  : 'bg-white dark:bg-[#141417] border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-[#365645] dark:text-[#CEC5AD] hover:border-[#D4AF37]/60'
              }`}
            >
              {prophet.name}
            </button>
          );
        })}
      </div>

      {/* Active Prophet Narrative Card */}
      <article className="rounded-3xl border border-[#D4AF37]/30 bg-white dark:bg-[#141417] p-5 sm:p-7 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[#B0891E]/20 dark:border-[#D4AF37]/20 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#B0891E] dark:text-[#D4AF37]">
              {activeStory.eraAndRegion} · {activeStory.quranMentions}
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#092A1B] dark:text-[#FAF6EB]">
              {activeStory.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#43574C] dark:text-[#CEC5AD]">
              {activeStory.titleEn}
            </p>
            {showUrdu && (
              <p
                dir="rtl"
                className="font-urdu text-lg text-right font-semibold text-[#B0891E] dark:text-[#F3E5AB]"
              >
                {activeStory.nameUrdu}
              </p>
            )}
          </div>

          {settings.showArabic && (
            <p
              dir="rtl"
              className="font-arabic-quran text-2xl sm:text-3xl text-[#B0891E] dark:text-[#F3E5AB] shrink-0"
            >
              {activeStory.nameArabic}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {(showEnglish || showRomanUrdu) &&
            activeStory.storyEn.map((para, idx) => (
              <p
                key={idx}
                style={{ fontSize: `${settings.englishFontSize}px` }}
                className="leading-relaxed text-[#18201C] dark:text-[#FAF6EB]/92"
              >
                {para}
              </p>
            ))}

          {showUrdu && (
            <div className="space-y-2.5 pt-2 border-t border-[#B0891E]/15 dark:border-[#D4AF37]/15">
              {activeStory.storyUr.map((para, idx) => (
                <p
                  key={idx}
                  dir="rtl"
                  style={{ fontSize: `${settings.urduFontSize}px` }}
                  className="font-urdu leading-loose text-right text-[#365645] dark:text-[#CEC5AD]"
                >
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Lessons & References */}
        <div className="rounded-2xl bg-[#FBF9F5] dark:bg-[#0D0D10] border border-[#B0891E]/20 dark:border-[#D4AF37]/20 p-4 sm:p-5 space-y-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#B0891E] dark:text-[#F3E5AB]">
            Enduring Faith Lessons
          </p>
          {(showEnglish || showRomanUrdu) &&
            activeStory.lessonsEn.map((lesson, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-xs sm:text-sm text-[#365645] dark:text-[#CEC5AD]"
              >
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{lesson}</span>
              </div>
            ))}
          {showUrdu &&
            activeStory.lessonsUr.map((lesson, i) => (
              <p
                key={i}
                dir="rtl"
                className="font-urdu text-sm sm:text-base text-right text-[#365645] dark:text-[#FAF6EB]/90"
              >
                • {lesson}
              </p>
            ))}
          <p className="text-[11px] font-semibold text-[#B0891E] dark:text-[#D4AF37] pt-2 border-t border-[#B0891E]/15 dark:border-[#D4AF37]/15 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Quranic References: {activeStory.references}</span>
          </p>
        </div>
      </article>
    </div>
  );
};
