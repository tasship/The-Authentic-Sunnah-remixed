import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckSquare,
  ChevronRight,
  Crown,
  Flame,
  Headphones,
  HeartHandshake,
  HelpCircle,
  Mic,
  Scale,
  ScrollText,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  WifiOff,
  X,
  Youtube,
} from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { ISLAMIC_QUIZ_QUESTIONS, PROPHETIC_MEDICINE_ITEMS } from '../data/adabAndQuiz';
import { ASMA_UL_HUSNA } from '../data/asmaAndSeerah';
import { CALIPHS_DATA, SAHABAH_DATA } from '../data/caliphsAndSahabah';
import { DHIKR_ITEMS, DUA_ITEMS } from '../data/dhikrAndDuas';
import { PILLAR_TOPICS } from '../data/pillarsAndBeliefs';
import { PROPHET_STORIES } from '../data/prophetsStories';
import { GREAT_IMAMS, SALAF_QUOTES, SALAF_TOPICS } from '../data/salafAndImams';
import { SEERAH_COMPLETE_ERAS, SEERAH_COMPLETE_EVENTS } from '../data/seerahComplete';
import { SUNNAH_HABITS } from '../data/sunnahHabits';
import {
  CompanionBookmark,
  DuaBookmark,
  ExploreModule,
  FastingCategory,
  FastingLogEntry,
  HifzStatus,
  ReaderSettings,
  SeerahBookmark,
  SurahHifzProgress,
} from '../types';
import { AsmaUlHusna } from './AsmaUlHusna';
import { DhikrHub } from './DhikrHub';
import { DuasHub } from './DuasHub';
import { HifzTrackerHub } from './HifzTrackerHub';
import { IslamicQuizHub } from './IslamicQuizHub';
import { PillarsBeliefsHub, PillarsFocusTarget } from './PillarsBeliefsHub';
import { ProphetsStoriesHub } from './ProphetsStoriesHub';
import { SalafAndImamsHub } from './SalafAndImamsHub';
import { SeerahCompanionsHub, SeerahFocusTarget } from './SeerahCompanionsHub';
import { SunnahFastingHub } from './SunnahFastingHub';
import { SunnahHabitsHub } from './SunnahHabitsHub';
import { VideosHub } from './VideosHub';

interface ExploreHubProps {
  activeModule: ExploreModule;
  onSelectModule: (mod: ExploreModule) => void;
  settings: ReaderSettings;
  dhikrCounts: Record<string, number>;
  onIncrementDhikr: (dhikrId: string, targetCount: number) => void;
  onResetDhikr: (dhikrId: string) => void;
  duaBookmarks: DuaBookmark[];
  onToggleDuaBookmark: (b: Omit<DuaBookmark, 'savedAt'>) => void;
  completedSeerahIds: string[];
  onToggleSeerahEvent: (eventId: string) => void;
  onSetSeerahChapterCompleted: (eventIds: string[], markComplete: boolean) => void;
  seerahBookmarks: SeerahBookmark[];
  onToggleSeerahBookmark: (b: Omit<SeerahBookmark, 'savedAt'>) => void;
  companionBookmarks: CompanionBookmark[];
  onToggleCompanionBookmark: (b: Omit<CompanionBookmark, 'savedAt'>) => void;
  completedSunnahIds: string[];
  onToggleSunnahHabit: (id: string) => void;
  initialSeerahFocus?: SeerahFocusTarget | null;
  onClearInitialSeerahFocus?: () => void;
  onOpenSettings: () => void;
  onOpenListenQuran?: () => void;
  hifzProgress: Record<number, SurahHifzProgress>;
  onUpdateSurahHifz: (
    surahNumber: number,
    status: HifzStatus,
    memorizedAyahs: number,
    markReviewed?: boolean
  ) => void;
  fastingLog: FastingLogEntry[];
  onToggleFastingDate: (date: string, category: FastingCategory, hijriLabel?: string) => void;
}

interface HubItemCard {
  id: string;
  module: Exclude<ExploreModule, 'hub'>;
  title: string;
  subtitle: string;
  meta: string;
  icon: typeof Sun;
  onClick: () => void;
}

const MODULE_HEADERS: Record<Exclude<ExploreModule, 'hub'>, string> = {
  pillars: 'Who is a Muslim, Aqeedah & Pillars',
  salaf: 'Who are the Salaf as-Salih?',
  imams: 'The Four Great Imams',
  seerah: 'The Sealed Nectar & Noble Companions',
  prophets: 'Stories of the Prophets (Qasas al-Anbiya)',
  dhikr: 'Complete Adhkar & Digital Tasbih',
  duas: 'Duas from Quran & Authentic Sunnah',
  asma: 'Asma-ul-Husna (99 Names of Allah)',
  hifz: 'Quran Hifz & Voice Mistake Correction',
  fasting: 'Sunnah Fasting Tracker (Sawm)',
  sunnah_habits: 'Muslim Etiquettes & Prophetic Medicine',
  quiz: 'Islamic Knowledge Quiz',
  videos: 'The Authentic Sunnah Videos',
};

interface SearchHit {
  id: string;
  kind: string;
  title: string;
  subtitle: string;
  onSelect: () => void;
}

export const ExploreHub: React.FC<ExploreHubProps> = ({
  activeModule,
  onSelectModule,
  settings,
  dhikrCounts,
  onIncrementDhikr,
  onResetDhikr,
  duaBookmarks,
  onToggleDuaBookmark,
  completedSeerahIds,
  onToggleSeerahEvent,
  onSetSeerahChapterCompleted,
  seerahBookmarks,
  onToggleSeerahBookmark,
  companionBookmarks,
  onToggleCompanionBookmark,
  completedSunnahIds,
  onToggleSunnahHabit,
  initialSeerahFocus,
  onClearInitialSeerahFocus,
  onOpenSettings,
  onOpenListenQuran,
  hifzProgress,
  onUpdateSurahHifz,
  fastingLog,
  onToggleFastingDate,
}) => {
  const isOnline = useOnlineStatus();
  const [globalQuery, setGlobalQuery] = useState('');
  const [localSeerahFocus, setLocalSeerahFocus] = useState<SeerahFocusTarget | null>(null);
  const [localPillarsFocus, setLocalPillarsFocus] = useState<PillarsFocusTarget | null>(null);

  const effectiveSeerahFocus = initialSeerahFocus || localSeerahFocus;

  const sections = useMemo<{ heading: string; description: string; items: HubItemCard[] }[]>(
    () => [
      {
        heading: 'Section 1 · Creed, Salaf & Classical Scholarship',
        description:
          'Foundational Islamic Aqeedah, the Pious Predecessors, and biographies of the Four Great Imams',
        items: [
          {
            id: 'card-pillars',
            module: 'pillars',
            title: 'Who is a Muslim & Core Aqeedah',
            subtitle:
              'Tawheed, La ilaha illallah conditions, 5 Pillars of Islam, 6 Articles of Faith & stages of Akhirah.',
            meta: 'Aqeedah · Islam · Iman',
            icon: ShieldCheck,
            onClick: () => onSelectModule('pillars'),
          },
          {
            id: 'card-salaf',
            module: 'salaf',
            title: 'Who are the Salaf as-Salih?',
            subtitle:
              'Understanding the three praised generations, preservation of Sunnah & verified scholar statements.',
            meta: `${SALAF_TOPICS.length} Topics · ${SALAF_QUOTES.length} Quotes`,
            icon: Users,
            onClick: () => onSelectModule('salaf'),
          },
          {
            id: 'card-imams',
            module: 'imams',
            title: 'The Four Great Imams',
            subtitle:
              'Complete profiles & methodologies of Imams Abu Hanifah, Malik, ash-Shafi‘i, and Ahmad ibn Hanbal.',
            meta: '4 Classical Schools',
            icon: Scale,
            onClick: () => onSelectModule('imams'),
          },
        ],
      },
      {
        heading: 'Section 2 · Seerah, Prophets & Companions',
        description:
          'Chronological Prophetic history, Noble Companions & Caliphs, and Quranic Stories of the Prophets',
        items: [
          {
            id: 'card-seerah',
            module: 'seerah',
            title: 'The Sealed Nectar (Complete Seerah)',
            subtitle:
              'All 12 chronological chapters from Pre-Islamic Arabia through the Farewell Sermon & Ash-Shama’il.',
            meta: '12 Chapters · Ar-Raheeq',
            icon: BookOpen,
            onClick: () => {
              setLocalSeerahFocus({ category: 'seerah' });
              onSelectModule('seerah');
            },
          },
          {
            id: 'card-companions',
            module: 'seerah',
            title: 'Lives of the Companions & Caliphs',
            subtitle:
              'Complete biographies of the 4 Rightly Guided Caliphs and noble Sahabah & Mothers of Believers.',
            meta: `4 Caliphs · ${SAHABAH_DATA.length} Sahabah`,
            icon: Crown,
            onClick: () => {
              setLocalSeerahFocus({ category: 'caliphs' });
              onSelectModule('seerah');
            },
          },
          {
            id: 'card-prophets',
            module: 'prophets',
            title: 'Stories of the Prophets (Qasas al-Anbiya)',
            subtitle:
              'Authentic Quranic & Hadith narratives of Adam, Nuh, Ibrahim, Yusuf, Musa, Dawud, Sulayman, Yunus & ‘Isa.',
            meta: `${PROPHET_STORIES.length} Prophets · Lessons`,
            icon: ScrollText,
            onClick: () => onSelectModule('prophets'),
          },
        ],
      },
      {
        heading: 'Section 3 · Daily Worship, Manners & Media',
        description:
          'Daily Adhkar, Quranic & Sunnah Duas, Divine Names, Adab & Prophetic Medicine, Quiz & Video Reminders',
        items: [
          {
            id: 'card-listen-quran',
            module: 'dhikr',
            title: 'Listen Quran (Audio Player)',
            subtitle:
              'Continuous full-Surah MP3 streaming by 10 world-renowned reciters with synchronized Ayah text, speed & sleep timer.',
            meta: '114 Surahs · 10 Reciters',
            icon: Headphones,
            onClick: () => onOpenListenQuran?.(),
          },
          {
            id: 'card-hifz',
            module: 'hifz',
            title: 'Quran Hifz & Voice Correction',
            subtitle:
              'Track 30 Juz & 114 Surahs memorization, Muraja‘ah queue, hide-and-reveal mode & live Arabic recitation mistake checker.',
            meta: '30 Juz · Voice AI',
            icon: Mic,
            onClick: () => onSelectModule('hifz'),
          },
          {
            id: 'card-fasting',
            module: 'fasting',
            title: 'Sunnah Fasting Tracker',
            subtitle:
              'Track Mondays & Thursdays, Hijri Ayyam al-Beed (13th–15th), and Ramadan fasts with authentic Hadith virtues.',
            meta: `${fastingLog.length} Logged Fasts`,
            icon: CalendarDays,
            onClick: () => onSelectModule('fasting'),
          },
          {
            id: 'card-dhikr',
            module: 'dhikr',
            title: 'Complete Adhkar & Digital Tasbih',
            subtitle:
              'Full Morning, Evening, Post-Salah, Sleeping, Istighfar, Durood & Ruqyah with haptic counters.',
            meta: '9 Categories · Arabic',
            icon: Sparkles,
            onClick: () => onSelectModule('dhikr'),
          },
          {
            id: 'card-duas',
            module: 'duas',
            title: 'Duas from Quran & Authentic Sunnah',
            subtitle:
              'Dedicated tabs for 37 Quranic Rabbana prayers and 60 authentic Hisn al-Muslim supplications.',
            meta: `${DUA_ITEMS.length} Supplications`,
            icon: HeartHandshake,
            onClick: () => onSelectModule('duas'),
          },
          {
            id: 'card-asma',
            module: 'asma',
            title: '99 Names of Allah (Asma-ul-Husna)',
            subtitle:
              'Reflect upon all 99 Beautiful Names with Arabic calligraphy, English meanings, Urdu & Roman Urdu.',
            meta: '99 Names · Reflections',
            icon: Sun,
            onClick: () => onSelectModule('asma'),
          },
          {
            id: 'card-sunnah-habits',
            module: 'sunnah_habits',
            title: 'Etiquettes of a Muslim & Prophetic Medicine',
            subtitle:
              'Daily Sunnah etiquette checklist plus Tibb an-Nabawi remedies (Black Seed, Honey, Zamzam, Cupping).',
            meta: `${completedSunnahIds.length}/${SUNNAH_HABITS.length} · ${PROPHETIC_MEDICINE_ITEMS.length} Remedies`,
            icon: CheckSquare,
            onClick: () => onSelectModule('sunnah_habits'),
          },
          {
            id: 'card-quiz',
            module: 'quiz',
            title: 'Islamic Knowledge Quiz',
            subtitle:
              'Test your understanding of Quran, Seerah, Salaf Aqeedah, Companions & the 4 Imams with references.',
            meta: `${ISLAMIC_QUIZ_QUESTIONS.length} Questions`,
            icon: HelpCircle,
            onClick: () => onSelectModule('quiz'),
          },
          ...(isOnline
            ? [
                {
                  id: 'card-videos',
                  module: 'videos' as const,
                  title: 'The Authentic Sunnah Videos',
                  subtitle:
                    'Watch Quran Tafsir, Authentic Hadith reminders, and Shorts from @TheAuthenticSunnah.',
                  meta: 'Official YouTube Feed',
                  icon: Youtube,
                  onClick: () => onSelectModule('videos'),
                },
              ]
            : []),
        ],
      },
    ],
    [completedSunnahIds.length, fastingLog.length, isOnline, onOpenListenQuran, onSelectModule]
  );

  const searchHits = useMemo<SearchHit[]>(() => {
    const raw = globalQuery.trim();
    if (raw.length < 2) return [];
    const q = raw.toLowerCase();
    const hits: SearchHit[] = [];

    for (const topic of SALAF_TOPICS) {
      if (
        topic.titleEn.toLowerCase().includes(q) ||
        topic.titleUr.includes(raw) ||
        topic.summaryEn.some((p) => p.toLowerCase().includes(q))
      ) {
        hits.push({
          id: `salaf-${topic.id}`,
          kind: 'Salaf as-Salih',
          title: topic.titleEn,
          subtitle: topic.reference,
          onSelect: () => onSelectModule('salaf'),
        });
      }
    }

    for (const sq of SALAF_QUOTES) {
      if (
        sq.scholar.toLowerCase().includes(q) ||
        sq.quoteEn.toLowerCase().includes(q) ||
        sq.quoteUr.includes(raw)
      ) {
        hits.push({
          id: `sq-${sq.id}`,
          kind: 'Statement of the Salaf',
          title: sq.scholar,
          subtitle: sq.quoteEn,
          onSelect: () => onSelectModule('salaf'),
        });
      }
    }

    for (const imam of GREAT_IMAMS) {
      if (
        imam.name.toLowerCase().includes(q) ||
        imam.fullName.toLowerCase().includes(q) ||
        imam.schoolName.toLowerCase().includes(q) ||
        imam.biographyEn.some((b) => b.toLowerCase().includes(q))
      ) {
        hits.push({
          id: `imam-${imam.id}`,
          kind: `Four Imams · ${imam.schoolName}`,
          title: imam.name,
          subtitle: imam.title,
          onSelect: () => onSelectModule('imams'),
        });
      }
    }

    for (const prophet of PROPHET_STORIES) {
      if (
        prophet.name.toLowerCase().includes(q) ||
        prophet.titleEn.toLowerCase().includes(q) ||
        prophet.nameUrdu.includes(raw) ||
        prophet.storyEn.some((s) => s.toLowerCase().includes(q))
      ) {
        hits.push({
          id: `pr-${prophet.id}`,
          kind: 'Story of the Prophets',
          title: `${prophet.name} — ${prophet.titleEn}`,
          subtitle: prophet.quranMentions,
          onSelect: () => onSelectModule('prophets'),
        });
      }
    }

    for (const ch of SEERAH_COMPLETE_ERAS) {
      if (
        ch.id.toLowerCase().includes(q) ||
        ch.shortTitle.toLowerCase().includes(q) ||
        ch.overviewEn.toLowerCase().includes(q) ||
        ch.urduTitle.includes(raw)
      ) {
        hits.push({
          id: `ch-${ch.id}`,
          kind: `Seerah Ch ${ch.chapterNumber}`,
          title: ch.id,
          subtitle: ch.span,
          onSelect: () => {
            setLocalSeerahFocus({ category: 'seerah', era: ch.id });
            onSelectModule('seerah');
          },
        });
      }
    }

    for (const ev of SEERAH_COMPLETE_EVENTS) {
      if (
        ev.title.toLowerCase().includes(q) ||
        ev.titleUrdu.includes(raw) ||
        ev.summaryEn.some((p) => p.toLowerCase().includes(q))
      ) {
        hits.push({
          id: `ev-${ev.id}`,
          kind: 'Seerah Event',
          title: ev.title,
          subtitle: `${ev.era} · ${ev.yearLabel}`,
          onSelect: () => {
            setLocalSeerahFocus({ category: 'seerah', era: ev.era });
            onSelectModule('seerah');
          },
        });
      }
    }

    for (const caliph of CALIPHS_DATA) {
      if (
        caliph.name.toLowerCase().includes(q) ||
        caliph.nameUrdu.includes(raw) ||
        caliph.shortIntroEn.toLowerCase().includes(q)
      ) {
        hits.push({
          id: `cal-${caliph.id}`,
          kind: 'Rightly Guided Caliph',
          title: caliph.name,
          subtitle: caliph.titleBadge,
          onSelect: () => {
            setLocalSeerahFocus({ category: 'caliphs', caliphId: caliph.id });
            onSelectModule('seerah');
          },
        });
      }
    }

    for (const sahabi of SAHABAH_DATA) {
      if (
        sahabi.name.toLowerCase().includes(q) ||
        sahabi.nameUrdu.includes(raw) ||
        sahabi.honorific.toLowerCase().includes(q)
      ) {
        hits.push({
          id: `sah-${sahabi.id}`,
          kind: sahabi.category,
          title: sahabi.name,
          subtitle: sahabi.honorific,
          onSelect: () => {
            setLocalSeerahFocus({ category: 'sahabah', sahabiId: sahabi.id });
            onSelectModule('seerah');
          },
        });
      }
    }

    for (const topic of PILLAR_TOPICS) {
      if (
        topic.titleEn.toLowerCase().includes(q) ||
        topic.titleUr.includes(raw) ||
        topic.summaryEn.some((p) => p.toLowerCase().includes(q))
      ) {
        hits.push({
          id: `pil-${topic.id}`,
          kind: 'Aqeedah & Pillars',
          title: topic.titleEn,
          subtitle: topic.reference,
          onSelect: () => {
            setLocalPillarsFocus({ section: topic.section, topicId: topic.id });
            onSelectModule('pillars');
          },
        });
      }
    }

    for (const d of DHIKR_ITEMS) {
      if (
        d.title.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.english.toLowerCase().includes(q) ||
        d.urdu.includes(raw)
      ) {
        hits.push({
          id: `dh-${d.id}`,
          kind: `Dhikr · ${d.category}`,
          title: d.title,
          subtitle: `${d.targetCount}x · ${d.reference}`,
          onSelect: () => onSelectModule('dhikr'),
        });
      }
    }

    for (const dua of DUA_ITEMS) {
      if (
        dua.title.toLowerCase().includes(q) ||
        dua.category.toLowerCase().includes(q) ||
        dua.english.toLowerCase().includes(q) ||
        dua.urdu.includes(raw)
      ) {
        hits.push({
          id: `dua-${dua.id}`,
          kind: `${dua.sourceGroup === 'quran' ? 'Quran Dua' : 'Sunnah Dua'} · ${dua.category}`,
          title: dua.title,
          subtitle: dua.reference,
          onSelect: () => onSelectModule('duas'),
        });
      }
    }

    for (const habit of SUNNAH_HABITS) {
      if (
        habit.titleEn.toLowerCase().includes(q) ||
        habit.titleUr.includes(raw) ||
        habit.descriptionEn.toLowerCase().includes(q)
      ) {
        hits.push({
          id: `sh-${habit.id}`,
          kind: `Muslim Etiquettes · ${habit.timeOfDay}`,
          title: habit.titleEn,
          subtitle: habit.reference,
          onSelect: () => onSelectModule('sunnah_habits'),
        });
      }
    }

    for (const med of PROPHETIC_MEDICINE_ITEMS) {
      if (
        med.nameEn.toLowerCase().includes(q) ||
        med.nameUr.includes(raw) ||
        med.benefitEn.toLowerCase().includes(q)
      ) {
        hits.push({
          id: `med-${med.id}`,
          kind: 'Prophetic Medicine',
          title: med.nameEn,
          subtitle: med.reference,
          onSelect: () => onSelectModule('sunnah_habits'),
        });
      }
    }

    for (const name of ASMA_UL_HUSNA) {
      if (
        name.transliteration.toLowerCase().includes(q) ||
        name.english.toLowerCase().includes(q) ||
        name.urdu.includes(raw)
      ) {
        hits.push({
          id: `asma-${name.number}`,
          kind: 'Asma-ul-Husna',
          title: `${name.number}. ${name.transliteration} — ${name.english}`,
          subtitle: name.urdu,
          onSelect: () => onSelectModule('asma'),
        });
      }
    }

    return hits.slice(0, 18);
  }, [globalQuery, onSelectModule]);

  if (activeModule !== 'hub') {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => onSelectModule('hub')}
            className="min-h-[42px] px-3.5 py-2 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/30 bg-white dark:bg-[#062115] text-xs font-semibold text-[#092A1B] dark:text-[#F3E5AB] hover:border-[#D4AF37] inline-flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Explore</span>
          </button>
          <span className="text-xs font-semibold text-[#B0891E] dark:text-[#D4AF37] truncate">
            {MODULE_HEADERS[activeModule]}
          </span>
        </div>

        {activeModule === 'asma' && <AsmaUlHusna settings={settings} />}
        {(activeModule === 'salaf' || activeModule === 'imams') && (
          <SalafAndImamsHub
            key={activeModule}
            settings={settings}
            initialTab={activeModule === 'imams' ? 'imams' : 'salaf'}
          />
        )}
        {activeModule === 'prophets' && <ProphetsStoriesHub settings={settings} />}
        {activeModule === 'quiz' && <IslamicQuizHub settings={settings} />}
        {activeModule === 'seerah' && (
          <SeerahCompanionsHub
            settings={settings}
            completedSeerahIds={completedSeerahIds}
            onToggleSeerahEvent={onToggleSeerahEvent}
            onSetSeerahChapterCompleted={onSetSeerahChapterCompleted}
            seerahBookmarks={seerahBookmarks}
            onToggleSeerahBookmark={onToggleSeerahBookmark}
            companionBookmarks={companionBookmarks}
            onToggleCompanionBookmark={onToggleCompanionBookmark}
            initialFocus={effectiveSeerahFocus}
            onClearInitialFocus={() => {
              setLocalSeerahFocus(null);
              onClearInitialSeerahFocus?.();
            }}
          />
        )}
        {activeModule === 'pillars' && (
          <PillarsBeliefsHub
            settings={settings}
            initialFocus={localPillarsFocus}
            onClearInitialFocus={() => setLocalPillarsFocus(null)}
          />
        )}
        {activeModule === 'dhikr' && (
          <DhikrHub
            settings={settings}
            dhikrCounts={dhikrCounts}
            onIncrementDhikr={onIncrementDhikr}
            onResetDhikr={onResetDhikr}
          />
        )}
        {activeModule === 'duas' && (
          <DuasHub
            settings={settings}
            duaBookmarks={duaBookmarks}
            onToggleDuaBookmark={onToggleDuaBookmark}
          />
        )}
        {activeModule === 'sunnah_habits' && (
          <SunnahHabitsHub
            settings={settings}
            completedSunnahIds={completedSunnahIds}
            onToggleSunnahHabit={onToggleSunnahHabit}
          />
        )}
        {activeModule === 'hifz' && (
          <HifzTrackerHub
            settings={settings}
            hifzProgress={hifzProgress}
            onUpdateSurahHifz={onUpdateSurahHifz}
          />
        )}
        {activeModule === 'fasting' && (
          <SunnahFastingHub
            settings={settings}
            fastingLog={fastingLog}
            onToggleFastingDate={onToggleFastingDate}
          />
        )}
        {activeModule === 'videos' && (
          <VideosHub settings={settings} onOpenSettings={onOpenSettings} />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <section className="theme-hero rounded-3xl border border-[#D4AF37]/30 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#F3E5AB] flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>14 Authentic Modules · English · Urdu · Roman Urdu</span>
            </p>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-[#FAF6EB] mt-1">
              Explore Islamic Knowledge
            </h1>
            <p className="text-xs sm:text-sm text-[#CEC5AD] mt-1">
              Aqeedah &amp; Salaf Scholarship, The Four Great Imams, Seerah, Prophets, Companions,
              Hifz Voice Correction, Sunnah Fasting, Adhkar, Duas, Adab &amp; Prophetic Medicine, Quiz &amp; Videos
            </p>
          </div>

          <button
            onClick={onOpenSettings}
            className="min-h-[42px] px-4 py-2 rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/12 text-xs font-semibold text-[#F3E5AB] hover:bg-[#D4AF37]/25 transition-colors inline-flex items-center gap-2 shrink-0 self-start cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            <span>Language &amp; Theme Settings</span>
          </button>
        </div>

        {!isOnline && (
          <div className="rounded-xl border border-[#D4AF37]/30 bg-[#09090B]/70 px-3.5 py-2.5 text-xs text-[#F3E5AB] flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>
              Offline Mode — External video feeds are hidden; Adhkar, Duas, Seerah, Aqeedah, Prophets, Hifz &amp; Cached Quran work seamlessly offline.
            </span>
          </div>
        )}

        {/* Instant Global Search Bar */}
        <div className="relative max-w-2xl">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#F3E5AB]" />
          <input
            type="search"
            value={globalQuery}
            onChange={(e) => setGlobalQuery(e.target.value)}
            placeholder="Search Aqeedah, Salaf, Four Imams, Prophets, Seerah, Companions, Duas, or Medicine..."
            className="w-full min-h-[44px] pl-10 pr-10 rounded-xl border border-[#D4AF37]/35 bg-[#04180F]/80 text-sm text-[#FAF6EB] placeholder:text-[#CEC5AD]/70 focus:outline-none focus:border-[#D4AF37]"
          />
          {globalQuery && (
            <button
              type="button"
              onClick={() => setGlobalQuery('')}
              aria-label="Clear global search"
              className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg text-[#CEC5AD] hover:text-[#FAF6EB] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {globalQuery.trim().length >= 2 && (
          <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#04180F]/90 p-3 space-y-1.5 max-h-80 overflow-y-auto">
            {searchHits.length === 0 ? (
              <p className="text-xs text-[#CEC5AD] px-2 py-2">
                No topics matched &ldquo;{globalQuery.trim()}&rdquo;.
              </p>
            ) : (
              searchHits.map((hit) => (
                <button
                  key={hit.id}
                  onClick={hit.onSelect}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#0A3321] transition-colors flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-[#D4AF37]">{hit.kind}</p>
                    <p className="text-xs sm:text-sm font-semibold text-[#FAF6EB] truncate">
                      {hit.title}
                    </p>
                    <p className="text-[11px] text-[#CEC5AD] truncate">{hit.subtitle}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37] shrink-0" />
                </button>
              ))
            )}
          </div>
        )}
      </section>

      {/* 3 Systematic Category Sections (12 Modules) */}
      {sections.map((section) => (
        <section key={section.heading} className="space-y-4">
          <div className="px-1">
            <h2 className="font-display text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB]">
              {section.heading}
            </h2>
            <p className="text-xs sm:text-sm text-[#365645] dark:text-[#CEC5AD]">
              {section.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  className="group text-left rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] hover:border-[#D4AF37] p-5 sm:p-6 transition-colors flex flex-col justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/35 flex items-center justify-center text-[#B0891E] dark:text-[#F3E5AB] shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#B0891E] dark:text-[#D4AF37] tabular-nums">
                      {item.meta}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB] group-hover:text-[#B0891E] dark:group-hover:text-[#F3E5AB] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#365645] dark:text-[#CEC5AD] mt-1.5 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#B0891E]/10 dark:border-[#D4AF37]/10 flex items-center justify-between text-xs font-semibold text-[#B0891E] dark:text-[#D4AF37]">
                    <span>Open Section</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

