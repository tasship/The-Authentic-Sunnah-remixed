import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  BookOpenCheck,
  CheckCircle2,
  Compass,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { PILLAR_SECTIONS, PILLAR_TOPICS } from '../data/pillarsAndBeliefs';
import { PillarSectionType, ReaderSettings } from '../types';
import { getLanguageFlags } from '../utils/languageDisplay';

export interface PillarsFocusTarget {
  section?: PillarSectionType;
  topicId?: string;
}

interface PillarsBeliefsHubProps {
  settings: ReaderSettings;
  initialFocus?: PillarsFocusTarget | null;
  onClearInitialFocus?: () => void;
}

const SECTION_ICONS: Record<PillarSectionType, typeof ShieldCheck> = {
  muslim_aqeedah: BookOpenCheck,
  islam_pillars: ShieldCheck,
  iman_pillars: Sparkles,
  akhirah_guide: Compass,
};

export const PillarsBeliefsHub: React.FC<PillarsBeliefsHubProps> = ({
  settings,
  initialFocus,
  onClearInitialFocus,
}) => {
  const [activeSection, setActiveSection] = useState<PillarSectionType>('muslim_aqeedah');
  const [highlightedTopicId, setHighlightedTopicId] = useState<string | null>(null);

  useEffect(() => {
    if (!initialFocus) return;
    if (initialFocus.section) {
      setActiveSection(initialFocus.section);
    }
    if (initialFocus.topicId) {
      const found = PILLAR_TOPICS.find((t) => t.id === initialFocus.topicId);
      if (found) {
        setActiveSection(found.section);
        setHighlightedTopicId(found.id);
      }
    }
    onClearInitialFocus?.();
  }, [initialFocus, onClearInitialFocus]);

  const { showEnglish, showUrdu, showRomanUrdu } = getLanguageFlags(settings.translationDisplay);
  const displayEnglish = showEnglish || showRomanUrdu;

  const sectionMeta = useMemo(
    () => PILLAR_SECTIONS.find((s) => s.id === activeSection) || PILLAR_SECTIONS[0],
    [activeSection]
  );

  const topics = useMemo(
    () =>
      PILLAR_TOPICS.filter((t) => t.section === activeSection).sort(
        (a, b) => a.order - b.order
      ),
    [activeSection]
  );

  return (
    <div className="space-y-6 pb-10">
      {/* Header Banner */}
      <section className="theme-hero rounded-3xl border border-[#D4AF37]/35 p-6 space-y-5">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-[#FAF6EB]">
            Who is a Muslim, Core Aqeedah &amp; Pillars
          </h1>
          <p className="text-xs sm:text-sm text-[#CEC5AD] mt-1">
            Tawheed, La ilaha illallah, the 5 Pillars of Islam, the 6 Pillars of Iman, and a clear
            Quran-and-Sunnah guide to the Day of Judgment &amp; Hereafter
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {PILLAR_SECTIONS.map((sec) => {
            const Icon = SECTION_ICONS[sec.id];
            const isSelected = activeSection === sec.id;
            const count = PILLAR_TOPICS.filter((t) => t.section === sec.id).length;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveSection(sec.id);
                  setHighlightedTopicId(null);
                }}
                className={`min-h-[54px] px-3.5 py-2.5 rounded-2xl text-left border transition-colors flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-[#D4AF37] border-[#D4AF37] text-[#09090B]'
                    : 'bg-black/30 border-[#D4AF37]/25 text-[#FAF6EB] hover:border-[#D4AF37]/60'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate">{sec.title}</p>
                  <p className="text-[11px] opacity-85 tabular-nums">{count} Guides</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Section Banner */}
      <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#F9F6EE] dark:bg-[#141417] px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          {displayEnglish && (
            <>
              <h2 className="font-display text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                {sectionMeta.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#365645] dark:text-[#CEC5AD] mt-0.5">
                {sectionMeta.subtitle}
              </p>
            </>
          )}
        </div>
        {showUrdu && (
          <p
            dir="rtl"
            className="font-urdu text-xl text-right font-semibold text-[#092A1B] dark:text-[#F3E5AB] shrink-0"
          >
            {sectionMeta.urduTitle}
          </p>
        )}
      </div>

      {/* Topic Cards */}
      <div className="space-y-4">
        {topics.map((topic) => {
          const isHighlighted = highlightedTopicId === topic.id;
          return (
            <article
              key={topic.id}
              className={`rounded-2xl border p-5 sm:p-6 space-y-4 transition-colors ${
                isHighlighted
                  ? 'border-[#D4AF37] bg-[#D4AF37]/[0.08] dark:bg-[#1D1D22]'
                  : 'border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#141417]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-[#B0891E]/15 dark:border-[#D4AF37]/15">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-[#B0891E] dark:text-[#D4AF37] flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 shrink-0" />
                    <span>{topic.reference}</span>
                  </p>
                  {displayEnglish && (
                    <h3 className="font-display text-base sm:text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                      {topic.titleEn}
                    </h3>
                  )}
                  {showUrdu && (
                    <h4
                      dir="rtl"
                      className="font-urdu text-lg sm:text-xl font-semibold text-[#092A1B] dark:text-[#F3E5AB] text-right"
                    >
                      {topic.titleUr}
                    </h4>
                  )}
                </div>

                {settings.showArabic && topic.arabicTerm && (
                  <p
                    dir="rtl"
                    style={{ fontSize: `${Math.max(19, settings.arabicFontSize - 6)}px` }}
                    className={`${
                      settings.arabicFont === 'scheherazade'
                        ? 'font-arabic-scheherazade'
                        : 'font-arabic-quran'
                    } text-right text-[#B0891E] dark:text-[#F3E5AB] leading-relaxed sm:max-w-md`}
                  >
                    {topic.arabicTerm}
                  </p>
                )}
              </div>

              <div
                className={`gap-5 ${
                  displayEnglish && showUrdu
                    ? 'grid grid-cols-1 lg:grid-cols-2'
                    : 'space-y-4'
                }`}
              >
                {displayEnglish && (
                  <div className="space-y-3">
                    <div className="space-y-2.5">
                      {topic.summaryEn.map((para, idx) => (
                        <p
                          key={idx}
                          style={{ fontSize: `${settings.englishFontSize}px` }}
                          className="leading-relaxed text-[#092A1B] dark:text-[#FAF6EB] whitespace-pre-line"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                    <div className="rounded-xl bg-[#F9F6EE] dark:bg-[#0D0D10] border border-[#B0891E]/15 dark:border-[#D4AF37]/15 p-3.5 space-y-2">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#B0891E] dark:text-[#D4AF37]">
                        Essential Takeaways
                      </p>
                      <ul className="space-y-1.5">
                        {topic.pointsEn.map((pt, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs sm:text-sm text-[#365645] dark:text-[#CEC5AD]"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {showUrdu && (
                  <div
                    dir="rtl"
                    className={`space-y-3 ${
                      displayEnglish
                        ? 'lg:border-l lg:border-[#B0891E]/15 dark:lg:border-[#D4AF37]/15 lg:pl-5'
                        : ''
                    }`}
                  >
                    <div className="space-y-2.5">
                      {topic.summaryUr.map((para, idx) => (
                        <p
                          key={idx}
                          style={{ fontSize: `${settings.urduFontSize}px` }}
                          className="font-urdu leading-loose text-right text-[#092A1B] dark:text-[#FAF6EB] whitespace-pre-line"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                    <div className="rounded-xl bg-[#F9F6EE] dark:bg-[#0D0D10] border border-[#B0891E]/15 dark:border-[#D4AF37]/15 p-3.5 space-y-2">
                      <p className="text-xs font-bold text-[#B0891E] dark:text-[#D4AF37]">
                        بنیادی نکات
                      </p>
                      <ul className="space-y-1.5">
                        {topic.pointsUr.map((pt, idx) => (
                          <li
                            key={idx}
                            style={{ fontSize: `${Math.max(15, settings.urduFontSize - 1)}px` }}
                            className="font-urdu leading-loose text-right text-[#365645] dark:text-[#F3E5AB]"
                          >
                            • {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
