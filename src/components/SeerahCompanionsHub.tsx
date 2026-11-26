import React, { useEffect, useMemo, useState } from 'react';
import {
  Award,
  Bookmark,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  Crown,
  Search,
  Users,
  X,
} from 'lucide-react';
import {
  CALIPHS_DATA,
  SAHABAH_DATA,
  SAHABI_CATEGORIES,
} from '../data/caliphsAndSahabah';
import {
  SEERAH_COMPLETE_ERAS,
  SEERAH_COMPLETE_EVENTS,
} from '../data/seerahComplete';
import {
  CaliphProfile,
  CompanionBookmark,
  ReaderSettings,
  SahabiCategory,
  SahabiProfile,
  SeerahBookmark,
  SeerahEra,
} from '../types';
import { getLanguageFlags } from '../utils/languageDisplay';

export interface SeerahFocusTarget {
  category?: 'seerah' | 'caliphs' | 'sahabah';
  era?: SeerahEra;
  sahabiId?: string;
  caliphId?: string;
}

interface SeerahCompanionsHubProps {
  settings: ReaderSettings;
  completedSeerahIds: string[];
  onToggleSeerahEvent: (eventId: string) => void;
  onSetSeerahChapterCompleted: (eventIds: string[], markComplete: boolean) => void;
  seerahBookmarks: SeerahBookmark[];
  onToggleSeerahBookmark: (b: Omit<SeerahBookmark, 'savedAt'>) => void;
  companionBookmarks: CompanionBookmark[];
  onToggleCompanionBookmark: (b: Omit<CompanionBookmark, 'savedAt'>) => void;
  initialFocus?: SeerahFocusTarget | null;
  onClearInitialFocus?: () => void;
}

type HeritageCategory = 'seerah' | 'caliphs' | 'sahabah';
type CaliphSubTab = 'earlyLife' | 'companionship' | 'caliphate' | 'character';
type SahabiDetailTab = 'earlyLife' | 'events' | 'virtues' | 'legacy';

export const SeerahCompanionsHub: React.FC<SeerahCompanionsHubProps> = ({
  settings,
  completedSeerahIds,
  onToggleSeerahEvent,
  onSetSeerahChapterCompleted,
  seerahBookmarks,
  onToggleSeerahBookmark,
  companionBookmarks,
  onToggleCompanionBookmark,
  initialFocus,
  onClearInitialFocus,
}) => {
  const [activeCategory, setActiveCategory] = useState<HeritageCategory>('seerah');

  // Category A state
  const [selectedEra, setSelectedEra] = useState<SeerahEra>(SEERAH_COMPLETE_ERAS[0].id);

  // Category B state
  const [selectedCaliphId, setSelectedCaliphId] = useState<string>(CALIPHS_DATA[0].id);
  const [caliphSubTab, setCaliphSubTab] = useState<CaliphSubTab>('earlyLife');

  // Category C state
  const [sahabiFilter, setSahabiFilter] = useState<'All' | SahabiCategory>('All');
  const [sahabiSearch, setSahabiSearch] = useState('');
  const [selectedSahabi, setSelectedSahabi] = useState<SahabiProfile | null>(null);
  const [sahabiDetailTab, setSahabiDetailTab] = useState<SahabiDetailTab>('earlyLife');

  useEffect(() => {
    if (!initialFocus) return;
    if (initialFocus.category) {
      setActiveCategory(initialFocus.category);
    }
    if (initialFocus.era) {
      setActiveCategory('seerah');
      setSelectedEra(initialFocus.era);
    }
    if (initialFocus.caliphId) {
      setActiveCategory('caliphs');
      setSelectedCaliphId(initialFocus.caliphId);
    }
    if (initialFocus.sahabiId) {
      const found = SAHABAH_DATA.find((s) => s.id === initialFocus.sahabiId);
      if (found) {
        setActiveCategory('sahabah');
        setSelectedSahabi(found);
        setSahabiDetailTab('earlyLife');
      }
    }
    onClearInitialFocus?.();
  }, [initialFocus, onClearInitialFocus]);

  const { showEnglish, showUrdu, showRomanUrdu } = getLanguageFlags(settings.translationDisplay);
  const displayEnglish = showEnglish || showRomanUrdu;

  const completedSet = useMemo(() => new Set(completedSeerahIds), [completedSeerahIds]);
  const seerahBookmarkSet = useMemo(
    () => new Set(seerahBookmarks.map((b) => b.key)),
    [seerahBookmarks]
  );
  const companionBookmarkSet = useMemo(
    () => new Set(companionBookmarks.map((b) => b.key)),
    [companionBookmarks]
  );

  const totalSeerahCount = SEERAH_COMPLETE_EVENTS.length;
  const completedSeerahCount = useMemo(
    () => SEERAH_COMPLETE_EVENTS.filter((e) => completedSet.has(e.id)).length,
    [completedSet]
  );
  const seerahPct = Math.round((completedSeerahCount / Math.max(1, totalSeerahCount)) * 100);

  const completedChaptersCount = useMemo(() => {
    return SEERAH_COMPLETE_ERAS.filter((ch) => {
      const evs = SEERAH_COMPLETE_EVENTS.filter((e) => e.era === ch.id);
      return evs.length > 0 && evs.every((e) => completedSet.has(e.id));
    }).length;
  }, [completedSet]);

  const activeChapterMeta = useMemo(
    () => SEERAH_COMPLETE_ERAS.find((e) => e.id === selectedEra) || SEERAH_COMPLETE_ERAS[0],
    [selectedEra]
  );

  const eraEvents = useMemo(
    () => SEERAH_COMPLETE_EVENTS.filter((ev) => ev.era === selectedEra),
    [selectedEra]
  );

  const isChapterComplete = useMemo(
    () => eraEvents.length > 0 && eraEvents.every((ev) => completedSet.has(ev.id)),
    [eraEvents, completedSet]
  );

  const isChapterBookmarked = seerahBookmarkSet.has(activeChapterMeta.id);

  const activeCaliph: CaliphProfile = useMemo(
    () => CALIPHS_DATA.find((c) => c.id === selectedCaliphId) || CALIPHS_DATA[0],
    [selectedCaliphId]
  );

  const filteredSahabah = useMemo(() => {
    return SAHABAH_DATA.filter((s) => {
      if (sahabiFilter !== 'All' && s.category !== sahabiFilter) return false;
      if (sahabiSearch.trim()) {
        const q = sahabiSearch.trim().toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.honorific.toLowerCase().includes(q) ||
          s.nameUrdu.includes(sahabiSearch.trim()) ||
          s.earlyLifeEn.some((p) => p.toLowerCase().includes(q)) ||
          s.eventsEn.some((p) => p.toLowerCase().includes(q)) ||
          s.virtuesEn.some((p) => p.toLowerCase().includes(q)) ||
          s.legacyEn.some((p) => p.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [sahabiFilter, sahabiSearch]);

  const activeCaliphContent = useMemo(() => {
    switch (caliphSubTab) {
      case 'earlyLife':
        return { en: activeCaliph.tabs.earlyLifeEn, ur: activeCaliph.tabs.earlyLifeUr };
      case 'companionship':
        return { en: activeCaliph.tabs.companionshipEn, ur: activeCaliph.tabs.companionshipUr };
      case 'caliphate':
        return { en: activeCaliph.tabs.caliphateEn, ur: activeCaliph.tabs.caliphateUr };
      case 'character':
        return {
          en: activeCaliph.tabs.characterAndPassingEn,
          ur: activeCaliph.tabs.characterAndPassingUr,
        };
    }
  }, [activeCaliph, caliphSubTab]);

  const activeSahabiSection = useMemo(() => {
    if (!selectedSahabi) return null;
    switch (sahabiDetailTab) {
      case 'earlyLife':
        return {
          titleEn: 'Early Life & Conversion',
          titleUr: 'ابتدائی زندگی اور قبولِ اسلام',
          en: selectedSahabi.earlyLifeEn,
          ur: selectedSahabi.earlyLifeUr,
        };
      case 'events':
        return {
          titleEn: 'Major Events & Sacrifices',
          titleUr: 'اہم واقعات اور قربانیاں',
          en: selectedSahabi.eventsEn,
          ur: selectedSahabi.eventsUr,
        };
      case 'virtues':
        return {
          titleEn: 'Virtues & Hadith About Them',
          titleUr: 'فضائل اور احادیثِ مبارکہ',
          en: selectedSahabi.virtuesEn,
          ur: selectedSahabi.virtuesUr,
        };
      case 'legacy':
        return {
          titleEn: 'Legacy & Passing',
          titleUr: 'علمی و دینی ورثہ اور وصال',
          en: selectedSahabi.legacyEn,
          ur: selectedSahabi.legacyUr,
        };
    }
  }, [selectedSahabi, sahabiDetailTab]);

  return (
    <div className="space-y-6 pb-10">
      {/* Main Section Banner */}
      <section className="rounded-3xl border border-[#D4AF37]/35 bg-gradient-to-br from-[#0A3321] via-[#062115] to-[#04180F] text-[#FAF6EB] p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold">
              Seerah &amp; Noble Companions
            </h1>
            <p className="text-xs sm:text-sm text-[#CEC5AD] mt-1">
              Complete 12-chapter Seerah modeled on Ar-Raheeq Al-Makhtum, the 4 Rightly Guided Caliphs, and {SAHABAH_DATA.length} Sahabah &amp; Sahabiyat
            </p>
          </div>

          <div className="text-left sm:text-right shrink-0 tabular-nums">
            <p className="text-xs text-[#F3E5AB]">Ar-Raheeq Al-Makhtum Progress</p>
            <p className="text-lg font-bold">
              {completedChaptersCount} / {SEERAH_COMPLETE_ERAS.length} Chapters · {seerahPct}%
            </p>
          </div>
        </div>

        {/* 3 Distinct Category Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            onClick={() => setActiveCategory('seerah')}
            className={`min-h-[48px] px-4 py-2.5 rounded-2xl text-left border transition-colors flex items-center gap-3 cursor-pointer ${
              activeCategory === 'seerah'
                ? 'bg-[#D4AF37] border-[#D4AF37] text-[#04180F]'
                : 'bg-[#04180F]/60 border-[#D4AF37]/25 text-[#FAF6EB] hover:border-[#D4AF37]/60'
            }`}
          >
            <BookOpen className="w-5 h-5 shrink-0" />
            <div>
              <p className="text-xs font-bold">The Sealed Nectar (Seerah)</p>
              <p className="text-[11px] opacity-85">12 Complete Chapters</p>
            </div>
          </button>

          <button
            onClick={() => setActiveCategory('caliphs')}
            className={`min-h-[48px] px-4 py-2.5 rounded-2xl text-left border transition-colors flex items-center gap-3 cursor-pointer ${
              activeCategory === 'caliphs'
                ? 'bg-[#D4AF37] border-[#D4AF37] text-[#04180F]'
                : 'bg-[#04180F]/60 border-[#D4AF37]/25 text-[#FAF6EB] hover:border-[#D4AF37]/60'
            }`}
          >
            <Crown className="w-5 h-5 shrink-0" />
            <div>
              <p className="text-xs font-bold">4 Rightly Guided Caliphs</p>
              <p className="text-[11px] opacity-85">Al-Khulafa al-Rashidun</p>
            </div>
          </button>

          <button
            onClick={() => setActiveCategory('sahabah')}
            className={`min-h-[48px] px-4 py-2.5 rounded-2xl text-left border transition-colors flex items-center gap-3 cursor-pointer ${
              activeCategory === 'sahabah'
                ? 'bg-[#D4AF37] border-[#D4AF37] text-[#04180F]'
                : 'bg-[#04180F]/60 border-[#D4AF37]/25 text-[#FAF6EB] hover:border-[#D4AF37]/60'
            }`}
          >
            <Users className="w-5 h-5 shrink-0" />
            <div>
              <p className="text-xs font-bold">Lives of the Sahabah</p>
              <p className="text-[11px] opacity-85">{SAHABAH_DATA.length} Biographies</p>
            </div>
          </button>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* CATEGORY A: COMPLETE SEERAH (AR-RAHEEQ AL-MAKHTUM) */}
      {/* ===================================================================== */}
      {activeCategory === 'seerah' && (
        <div className="space-y-5">
          {/* Overall Completion Progress Bar */}
          <div className="rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] p-4 sm:p-5 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
              <span className="text-[#092A1B] dark:text-[#FAF6EB]">
                Ar-Raheeq Al-Makhtum Mastery Progress
              </span>
              <span className="text-[#B0891E] dark:text-[#F3E5AB] tabular-nums">
                {completedSeerahCount} / {totalSeerahCount} Sections · {completedChaptersCount} /{' '}
                {SEERAH_COMPLETE_ERAS.length} Chapters · {seerahPct}%
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-[#F2EDE0] dark:bg-[#04180F] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#B0891E] via-[#D4AF37] to-[#F3E5AB] transition-all duration-300"
                style={{ width: `${seerahPct}%` }}
              />
            </div>
          </div>

          {/* Chronological Chapter Selector Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {SEERAH_COMPLETE_ERAS.map((era) => {
              const eventsInEra = SEERAH_COMPLETE_EVENTS.filter((e) => e.era === era.id);
              const doneInEra = eventsInEra.filter((e) => completedSet.has(e.id)).length;
              const isSelected = selectedEra === era.id;
              const chapterDone = eventsInEra.length > 0 && doneInEra === eventsInEra.length;
              return (
                <button
                  key={era.id}
                  onClick={() => setSelectedEra(era.id)}
                  className={`rounded-2xl border p-3.5 text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-[#D4AF37] bg-[#D4AF37] text-[#04180F]'
                      : 'border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] text-[#092A1B] dark:text-[#FAF6EB] hover:border-[#D4AF37]/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold tabular-nums opacity-85">
                    <span>Chapter {era.chapterNumber}</span>
                    <span className="inline-flex items-center gap-1">
                      {chapterDone && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {doneInEra}/{eventsInEra.length}
                    </span>
                  </div>
                  <p className="font-display text-xs sm:text-sm font-bold mt-1 line-clamp-1">
                    {era.shortTitle}
                  </p>
                  <p className="text-[11px] opacity-80 mt-0.5 tabular-nums">{era.span}</p>
                </button>
              );
            })}
          </div>

          {/* Active Chapter Overview & Controls */}
          <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#F9F6EE] dark:bg-[#0A3321]/75 p-5 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <p className="text-xs font-bold text-[#B0891E] dark:text-[#D4AF37] tabular-nums">
                  Chapter {activeChapterMeta.chapterNumber} · {activeChapterMeta.span}
                </p>
                {displayEnglish && (
                  <h2 className="font-display text-lg sm:text-xl font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                    {activeChapterMeta.id}
                  </h2>
                )}
                {showUrdu && (
                  <p
                    dir="rtl"
                    className="font-urdu text-xl sm:text-2xl text-right font-semibold text-[#092A1B] dark:text-[#F3E5AB]"
                  >
                    {activeChapterMeta.urduTitle}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() =>
                    onToggleSeerahBookmark({
                      key: activeChapterMeta.id,
                      chapterNumber: activeChapterMeta.chapterNumber,
                      title: activeChapterMeta.id,
                      urduTitle: activeChapterMeta.urduTitle,
                      span: activeChapterMeta.span,
                    })
                  }
                  aria-label="Bookmark Seerah chapter"
                  className={`min-h-[42px] px-3.5 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isChapterBookmarked
                      ? 'bg-[#D4AF37]/20 border border-[#D4AF37] text-[#B0891E] dark:text-[#F3E5AB]'
                      : 'border border-[#B0891E]/30 dark:border-[#D4AF37]/30 text-[#092A1B] dark:text-[#FAF6EB] hover:border-[#D4AF37]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isChapterBookmarked ? 'fill-current' : ''}`} />
                  <span>{isChapterBookmarked ? 'Bookmarked' : 'Bookmark Chapter'}</span>
                </button>

                <button
                  onClick={() =>
                    onSetSeerahChapterCompleted(
                      eraEvents.map((e) => e.id),
                      !isChapterComplete
                    )
                  }
                  className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isChapterComplete
                      ? 'bg-[#D4AF37] text-[#04180F]'
                      : 'bg-[#0A3321] text-[#F3E5AB] border border-[#D4AF37]/40 hover:bg-[#0D3D28]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isChapterComplete ? 'Chapter Completed' : 'Mark Chapter Read'}</span>
                </button>
              </div>
            </div>

            <div
              className={`gap-4 pt-3 border-t border-[#B0891E]/15 dark:border-[#D4AF37]/15 ${
                displayEnglish && showUrdu ? 'grid grid-cols-1 lg:grid-cols-2' : 'space-y-2'
              }`}
            >
              {displayEnglish && (
                <p className="text-xs sm:text-sm leading-relaxed text-[#365645] dark:text-[#CEC5AD]">
                  {activeChapterMeta.overviewEn}
                </p>
              )}
              {showUrdu && (
                <div className="space-y-2">
                  <p
                    dir="rtl"
                    className="font-urdu text-base leading-loose text-right text-[#365645] dark:text-[#F3E5AB]/90"
                  >
                    {activeChapterMeta.overviewUr}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Section Cards inside Active Chapter */}
          <div className="space-y-4">
            {eraEvents.map((ev) => {
              const isCompleted = completedSet.has(ev.id);
              return (
                <article
                  key={ev.id}
                  className={`rounded-2xl border p-5 sm:p-6 space-y-4 transition-colors ${
                    isCompleted
                      ? 'border-[#D4AF37]/60 bg-[#D4AF37]/[0.06] dark:bg-[#0A3321]/80'
                      : 'border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115]'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-[#B0891E]/15 dark:border-[#D4AF37]/15">
                    <div>
                      <p className="text-xs font-semibold text-[#B0891E] dark:text-[#D4AF37] flex items-center gap-1.5 tabular-nums">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{ev.yearLabel}</span>
                      </p>
                      {displayEnglish && (
                        <h3 className="font-display text-base sm:text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB] mt-1">
                          {ev.title}
                        </h3>
                      )}
                      {showUrdu && (
                        <h4
                          dir="rtl"
                          className="font-urdu text-lg sm:text-xl font-semibold text-[#092A1B] dark:text-[#F3E5AB] text-right mt-1"
                        >
                          {ev.titleUrdu}
                        </h4>
                      )}
                    </div>

                    <button
                      onClick={() => onToggleSeerahEvent(ev.id)}
                      className={`min-h-[42px] px-3.5 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer ${
                        isCompleted
                          ? 'bg-[#D4AF37] text-[#04180F]'
                          : 'border border-[#D4AF37]/35 text-[#092A1B] dark:text-[#F3E5AB] hover:bg-[#D4AF37]/15'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      <span>{isCompleted ? 'Section Read' : 'Mark Section Read'}</span>
                    </button>
                  </div>

                  {/* Structured Summary Paragraphs */}
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
                          {ev.summaryEn.map((para, i) => (
                            <p
                              key={i}
                              style={{ fontSize: `${settings.englishFontSize}px` }}
                              className="leading-relaxed text-[#092A1B] dark:text-[#FAF6EB]"
                            >
                              {para}
                            </p>
                          ))}
                        </div>
                        <div className="rounded-xl bg-[#F9F6EE] dark:bg-[#04180F]/70 border border-[#B0891E]/15 dark:border-[#D4AF37]/15 p-3.5 space-y-2">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-[#B0891E] dark:text-[#D4AF37]">
                            Key Takeaways
                          </p>
                          <ul className="space-y-1.5">
                            {ev.takeawaysEn.map((t, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-xs sm:text-sm text-[#365645] dark:text-[#CEC5AD]"
                              >
                                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                                <span>{t}</span>
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
                          {ev.summaryUr.map((para, i) => (
                            <p
                              key={i}
                              style={{ fontSize: `${settings.urduFontSize}px` }}
                              className="font-urdu leading-loose text-right text-[#092A1B] dark:text-[#FAF6EB]"
                            >
                              {para}
                            </p>
                          ))}
                        </div>
                        <div className="rounded-xl bg-[#F9F6EE] dark:bg-[#04180F]/70 border border-[#B0891E]/15 dark:border-[#D4AF37]/15 p-3.5 space-y-2">
                          <p className="text-xs font-bold text-[#B0891E] dark:text-[#D4AF37]">
                            اہم اسباق
                          </p>
                          <ul className="space-y-1.5">
                            {ev.takeawaysUr.map((t, idx) => (
                              <li
                                key={idx}
                                style={{ fontSize: `${Math.max(15, settings.urduFontSize - 1)}px` }}
                                className="font-urdu leading-loose text-right text-[#365645] dark:text-[#F3E5AB]"
                              >
                                • {t}
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
      )}

      {/* ===================================================================== */}
      {/* CATEGORY B: THE FOUR RIGHTLY GUIDED CALIPHS */}
      {/* ===================================================================== */}
      {activeCategory === 'caliphs' && (
        <div className="space-y-5">
          {/* 4 Caliph Selector Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {CALIPHS_DATA.map((caliph) => {
              const isSelected = activeCaliph.id === caliph.id;
              return (
                <button
                  key={caliph.id}
                  onClick={() => {
                    setSelectedCaliphId(caliph.id);
                    setCaliphSubTab('earlyLife');
                  }}
                  className={`rounded-2xl border p-4 text-left transition-colors cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'border-[#D4AF37] bg-[#D4AF37]/15 dark:bg-[#0A3321]'
                      : 'border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] hover:border-[#D4AF37]/60'
                  }`}
                >
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#B0891E] dark:text-[#D4AF37] tabular-nums">
                    Caliph #{caliph.order}
                  </p>
                  <h2 className="font-display text-sm sm:text-base font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                    {caliph.name}
                  </h2>
                  {showUrdu && (
                    <p
                      dir="rtl"
                      className="font-urdu text-base text-right text-[#B0891E] dark:text-[#F3E5AB]"
                    >
                      {caliph.nameUrdu}
                    </p>
                  )}
                  <p className="text-[11px] text-[#365645] dark:text-[#CEC5AD] tabular-nums">
                    {caliph.reignYears}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Caliph Full Structured Profile */}
          <section className="rounded-3xl border border-[#D4AF37]/35 bg-white dark:bg-[#062115] p-5 sm:p-7 space-y-5">
            <div className="pb-4 border-b border-[#B0891E]/15 dark:border-[#D4AF37]/15 space-y-2">
              <p className="text-xs font-bold text-[#B0891E] dark:text-[#D4AF37]">
                {activeCaliph.titleBadge} · {activeCaliph.reignYears}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                  {activeCaliph.name}{' '}
                  <span className="text-sm font-normal text-[#B0891E] dark:text-[#F3E5AB]">
                    ({activeCaliph.honorific})
                  </span>
                </h2>
                {showUrdu && (
                  <p dir="rtl" className="font-urdu text-2xl text-[#B0891E] dark:text-[#F3E5AB]">
                    {activeCaliph.nameUrdu}
                  </p>
                )}
              </div>
              {displayEnglish && (
                <p className="text-xs sm:text-sm text-[#365645] dark:text-[#CEC5AD] leading-relaxed">
                  {activeCaliph.shortIntroEn}
                </p>
              )}
              {showUrdu && (
                <p
                  dir="rtl"
                  className="font-urdu text-base leading-loose text-right text-[#365645] dark:text-[#CEC5AD]"
                >
                  {activeCaliph.shortIntroUr}
                </p>
              )}
            </div>

            {/* 4 Clean Sub-Tabs inside Caliph Profile */}
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { id: 'earlyLife', label: 'Early Life & Acceptance of Islam' },
                  { id: 'companionship', label: 'Companionship with the Prophet ﷺ' },
                  { id: 'caliphate', label: 'Caliphate, Achievements & Governance' },
                  { id: 'character', label: 'Key Quotes, Character & Passing' },
                ] as { id: CaliphSubTab; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCaliphSubTab(tab.id)}
                  className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    caliphSubTab === tab.id
                      ? 'bg-[#D4AF37] text-[#04180F]'
                      : 'bg-[#F9F6EE] dark:bg-[#04180F] border border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-[#365645] dark:text-[#CEC5AD] hover:text-[#092A1B] dark:hover:text-[#FAF6EB]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sub-tab Bilingual Content */}
            <div
              className={`gap-6 ${
                displayEnglish && showUrdu
                  ? 'grid grid-cols-1 lg:grid-cols-2'
                  : 'space-y-4'
              }`}
            >
              {displayEnglish && (
                <div className="space-y-3">
                  {activeCaliphContent.en.map((para, idx) => (
                    <p
                      key={idx}
                      style={{ fontSize: `${settings.englishFontSize}px` }}
                      className="leading-relaxed text-[#092A1B] dark:text-[#FAF6EB]"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {showUrdu && (
                <div
                  dir="rtl"
                  className={`space-y-3 ${
                    displayEnglish
                      ? 'lg:border-l lg:border-[#B0891E]/15 dark:lg:border-[#D4AF37]/15 lg:pl-6'
                      : ''
                  }`}
                >
                  {activeCaliphContent.ur.map((para, idx) => (
                    <p
                      key={idx}
                      style={{ fontSize: `${settings.urduFontSize}px` }}
                      className="font-urdu leading-loose text-right text-[#092A1B] dark:text-[#F3E5AB]"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {/* ===================================================================== */}
      {/* CATEGORY C: LIVES OF THE NOBLE SAHABAH (36 BIOGRAPHIES) */}
      {/* ===================================================================== */}
      {activeCategory === 'sahabah' && (
        <div className="space-y-5">
          {/* Search + Category Filter Pills */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#365645] dark:text-[#CEC5AD]" />
              <input
                type="search"
                value={sahabiSearch}
                onChange={(e) => setSahabiSearch(e.target.value)}
                placeholder="Search Sahabah & Sahabiyat by name or story..."
                className="w-full min-h-[44px] pl-10 pr-4 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] text-sm text-[#092A1B] dark:text-[#FAF6EB] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSahabiFilter('All')}
                className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                  sahabiFilter === 'All'
                    ? 'bg-[#D4AF37] text-[#04180F]'
                    : 'bg-white dark:bg-[#062115] border border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-[#365645] dark:text-[#CEC5AD]'
                }`}
              >
                All ({SAHABAH_DATA.length})
              </button>
              {SAHABI_CATEGORIES.map((cat) => {
                const count = SAHABAH_DATA.filter((item) => item.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSahabiFilter(cat)}
                    className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                      sahabiFilter === cat
                        ? 'bg-[#D4AF37] text-[#04180F]'
                        : 'bg-white dark:bg-[#062115] border border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-[#365645] dark:text-[#CEC5AD]'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sahabah Cards Grid */}
          {filteredSahabah.length === 0 ? (
            <div className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#062115] p-8 text-center text-sm text-[#365645] dark:text-[#CEC5AD]">
              No Companions matched your search filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSahabah.map((s) => {
                const isSaved = companionBookmarkSet.has(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedSahabi(s);
                      setSahabiDetailTab('earlyLife');
                    }}
                    className="group text-left rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] hover:border-[#D4AF37] p-5 transition-colors flex flex-col justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-[#B0891E] dark:text-[#D4AF37]">
                          {s.category}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {isSaved && (
                            <Bookmark className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
                          )}
                          <Award className="w-4 h-4 text-[#D4AF37]" />
                        </div>
                      </div>
                      <h3 className="font-display text-base font-bold text-[#092A1B] dark:text-[#FAF6EB] group-hover:text-[#B0891E] dark:group-hover:text-[#F3E5AB]">
                        {s.name}
                      </h3>
                      {showUrdu && (
                        <p
                          dir="rtl"
                          className="font-urdu text-lg text-right text-[#B0891E] dark:text-[#F3E5AB]"
                        >
                          {s.nameUrdu}
                        </p>
                      )}
                      <p className="text-xs font-medium text-[#365645] dark:text-[#CEC5AD]">
                        {s.honorific}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#B0891E]/10 dark:border-[#D4AF37]/10 flex items-center justify-between text-xs font-semibold text-[#B0891E] dark:text-[#D4AF37]">
                      <span>Read Biography</span>
                      <span className="text-[11px] text-[#365645] dark:text-[#CEC5AD] font-normal">
                        {s.eraNote.split('·')[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Sahabi Full Detail Modal with 4 Structured Tabs + Bookmark */}
          {selectedSahabi && activeSahabiSection && (
            <div
              className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/70 backdrop-blur-sm p-0 lg:p-6"
              onClick={() => setSelectedSahabi(null)}
              role="dialog"
              aria-modal="true"
              aria-label={selectedSahabi.name}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full lg:max-w-3xl max-h-[88vh] flex flex-col rounded-t-3xl lg:rounded-3xl border border-[#D4AF37]/40 bg-[#F9F6EE] dark:bg-[#062115] text-[#092A1B] dark:text-[#FAF6EB] shadow-2xl"
              >
                <div className="lg:hidden w-10 h-1.5 bg-[#B0891E]/30 rounded-full mx-auto mt-3" />

                {/* Modal Header */}
                <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-[#B0891E]/20 dark:border-[#D4AF37]/20">
                  <div>
                    <p className="text-xs font-bold text-[#B0891E] dark:text-[#D4AF37]">
                      {selectedSahabi.category} · {selectedSahabi.eraNote}
                    </p>
                    <h3 className="font-display text-xl font-bold mt-0.5">
                      {selectedSahabi.name}{' '}
                      <span className="text-xs font-semibold text-[#B0891E] dark:text-[#F3E5AB]">
                        (رضي الله عنه/عنها)
                      </span>
                    </h3>
                    {showUrdu && (
                      <p
                        dir="rtl"
                        className="font-urdu text-xl text-right text-[#B0891E] dark:text-[#F3E5AB]"
                      >
                        {selectedSahabi.nameUrdu}
                      </p>
                    )}
                    <p className="text-xs text-[#365645] dark:text-[#CEC5AD] mt-0.5">
                      {selectedSahabi.honorific}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() =>
                        onToggleCompanionBookmark({
                          key: selectedSahabi.id,
                          name: selectedSahabi.name,
                          nameUrdu: selectedSahabi.nameUrdu,
                          honorific: selectedSahabi.honorific,
                          category: selectedSahabi.category,
                        })
                      }
                      aria-label="Bookmark Companion"
                      className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border transition-colors cursor-pointer ${
                        companionBookmarkSet.has(selectedSahabi.id)
                          ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#B0891E] dark:text-[#F3E5AB]'
                          : 'border-[#B0891E]/25 dark:border-[#D4AF37]/25 hover:bg-black/5 dark:hover:bg-white/10'
                      }`}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          companionBookmarkSet.has(selectedSahabi.id) ? 'fill-current' : ''
                        }`}
                      />
                    </button>

                    <button
                      onClick={() => setSelectedSahabi(null)}
                      aria-label="Close Companion biography"
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* 4 Structured Biography Tabs */}
                <div className="px-6 pt-3 pb-2 border-b border-[#B0891E]/15 dark:border-[#D4AF37]/15 flex flex-wrap items-center gap-2">
                  {(
                    [
                      { id: 'earlyLife', label: '1. Early Life & Conversion' },
                      { id: 'events', label: '2. Major Events & Sacrifices' },
                      { id: 'virtues', label: '3. Virtues & Hadith About Them' },
                      { id: 'legacy', label: '4. Legacy & Passing' },
                    ] as { id: SahabiDetailTab; label: string }[]
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSahabiDetailTab(tab.id)}
                      className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                        sahabiDetailTab === tab.id
                          ? 'bg-[#D4AF37] text-[#04180F]'
                          : 'bg-white dark:bg-[#04180F] border border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-[#365645] dark:text-[#CEC5AD]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Modal Tab Content */}
                <div className="p-6 overflow-y-auto space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#B0891E]/15 dark:border-[#D4AF37]/15">
                    {displayEnglish && (
                      <h4 className="font-display text-sm sm:text-base font-bold text-[#B0891E] dark:text-[#D4AF37]">
                        {activeSahabiSection.titleEn}
                      </h4>
                    )}
                    {showUrdu && (
                      <p
                        dir="rtl"
                        className="font-urdu text-base font-semibold text-[#B0891E] dark:text-[#F3E5AB]"
                      >
                        {activeSahabiSection.titleUr}
                      </p>
                    )}
                  </div>

                  <div
                    className={`gap-5 ${
                      displayEnglish && showUrdu
                        ? 'grid grid-cols-1 lg:grid-cols-2'
                        : 'space-y-3'
                    }`}
                  >
                    {displayEnglish && (
                      <div className="space-y-3">
                        {activeSahabiSection.en.map((p, idx) => (
                          <p
                            key={idx}
                            style={{ fontSize: `${settings.englishFontSize}px` }}
                            className="leading-relaxed text-[#092A1B] dark:text-[#FAF6EB]"
                          >
                            {p}
                          </p>
                        ))}
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
                        {activeSahabiSection.ur.map((p, idx) => (
                          <p
                            key={idx}
                            style={{ fontSize: `${settings.urduFontSize}px` }}
                            className="font-urdu leading-loose text-right text-[#092A1B] dark:text-[#F3E5AB]"
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
