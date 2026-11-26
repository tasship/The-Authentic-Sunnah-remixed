import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Headphones,
  HeartHandshake,
  HelpCircle,
  Mic,
  Moon,
  Settings,
  Sparkles,
  TrendingUp,
  Users,
  WifiOff,
  X,
} from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { LastReadPosition } from '../hooks/useAppStore';
import { GlobalUmmahStats } from '../services/firebaseTelemetry';
import {
  DailyGoals,
  DailyHabitRecord,
  DailySalahLog,
  DailySalahTimings,
  ReaderSettings,
  SalahPrayerId,
  SalahPrayerRecord,
} from '../types';
import {
  formatDurationMMSS,
  getTodayKey,
} from '../utils/arabic';
import { computeRamadanCountdown, trackLocationForRamadan } from '../utils/ramadanCountdown';
import { AnimatedCounter } from './AnimatedCounter';
import { HonestSalahStrip } from './HonestSalahStrip';
import { SalahHistoryModal } from './SalahHistoryModal';

export interface DailyHistoryPoint {
  date: string;
  shortLabel: string;
  hasanat: number;
  verses: number;
  readingMinutes: number;
  readingSeconds: number;
  pages: number;
  listeningMinutes: number;
  listeningSeconds: number;
  isActive: boolean;
}

interface HomeDashboardProps {
  settings: ReaderSettings;
  goals: DailyGoals;
  onUpdateGoals: (patch: Partial<DailyGoals>) => void;
  todayRecord: DailyHabitRecord;
  stats: {
    firstUsedDate: string;
    totalHasanat: number;
    totalVerses: number;
    totalPages: number;
    totalHadiths: number;
    totalSeconds: number;
    totalSecondsListened: number;
    weekHasanat: number;
    weekVerses: number;
    weekPages: number;
    weekSeconds: number;
    weekSecondsListened: number;
    streak: number;
    longestStreak: number;
    weekCalendar: {
      date: string;
      dayLabel: string;
      shortChar: string;
      dayNumber: number;
      completed: boolean;
      isToday: boolean;
      hasanat: number;
    }[];
    activeDates: string[];
    dailyHistory: DailyHistoryPoint[];
  };
  lastRead: LastReadPosition;
  onUpdateLastRead: (pos: LastReadPosition) => void;
  onOpenQuran: (surahNumber?: number, ayahNumber?: number) => void;
  onOpenListenQuran: (surahNumber?: number) => void;
  onOpenSettings: () => void;
  onOpenVideos: () => void;
  onOpenDuas: () => void;
  onOpenDhikr: () => void;
  onOpenHifz: () => void;
  onOpenSeerah: () => void;
  onOpenSahabah: () => void;
  onOpenQuiz: () => void;
  sadaqahHighlightNonce?: number;
  globalUmmahStats?: GlobalUmmahStats;
  salahState: {
    todayKey: string;
    logsMap: Record<string, DailySalahLog>;
    todayLog: DailySalahLog;
    dailyTimings: DailySalahTimings | null;
    timingsLoading: boolean;
    locatingGps: boolean;
    nextPrayerInfo: {
      nextPrayerId: SalahPrayerId;
      nextPrayerLabel: string;
      nextPrayerTime12h: string;
      minutesRemaining: number;
      countdownLabel: string;
      currentActiveWindowId: SalahPrayerId;
    } | null;
    onSavePrayer: (
      dateKey: string,
      prayerId: SalahPrayerId,
      record: SalahPrayerRecord
    ) => Promise<void>;
    onDeletePrayer: (dateKey: string, prayerId: SalahPrayerId) => Promise<void>;
    onDetectGps: () => Promise<unknown>;
  };
}

type StatsPeriod = 'today' | 'week' | 'all';
type ChartMetric = 'hasanat' | 'verses' | 'reading' | 'pages' | 'listening';
type ChartRange = '7d' | '30d' | 'all';

function formatStatTime(seconds: number): string {
  if (seconds < 3600) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}m:${String(secs).padStart(2, '0')}s`;
  }
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return `${hrs}h ${mins}m`;
}

function buildSmoothSvgPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const midX = (p0.x + p1.x) / 2;
    d += ` C ${midX.toFixed(2)} ${p0.y.toFixed(2)}, ${midX.toFixed(2)} ${p1.y.toFixed(2)}, ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`;
  }
  return d;
}

const METRIC_META: {
  id: ChartMetric;
  label: string;
  unit: string;
}[] = [
  { id: 'hasanat', label: 'Hasanat', unit: 'Hasanat' },
  { id: 'verses', label: 'Verses', unit: 'Ayahs' },
  { id: 'reading', label: 'Reading Time', unit: 'min' },
  { id: 'pages', label: 'Pages', unit: 'Pages' },
  { id: 'listening', label: 'Listening Time', unit: 'min' },
];

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  settings,
  goals,
  onUpdateGoals,
  todayRecord,
  stats,
  lastRead: _lastRead,
  onUpdateLastRead: _onUpdateLastRead,
  onOpenQuran: _onOpenQuran,
  onOpenListenQuran: _onOpenListenQuran,
  onOpenSettings,
  onOpenVideos: _onOpenVideos,
  onOpenDuas,
  onOpenDhikr,
  onOpenHifz,
  onOpenSeerah,
  onOpenSahabah,
  onOpenQuiz,
  sadaqahHighlightNonce: _sadaqahHighlightNonce = 0,
  globalUmmahStats,
  salahState,
}) => {
  const isOnline = useOnlineStatus();
  const [statsPeriod, setStatsPeriod] = useState<StatsPeriod>('today');
  const [chartMetric, setChartMetric] = useState<ChartMetric>('hasanat');
  const [chartRange, setChartRange] = useState<ChartRange>('7d');
  const [hoveredChartIdx, setHoveredChartIdx] = useState<number | null>(null);

  const [showSalahHistory, setShowSalahHistory] = useState(false);
  const [calendarMonthOffset, setCalendarMonthOffset] = useState(0);
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showGoalEditor, setShowGoalEditor] = useState(false);

  const [now, setNow] = useState<Date>(() => new Date());

  const todayKey = getTodayKey();

  // 60s clock tick + Ramadan location tracker
  useEffect(() => {
    trackLocationForRamadan();
    const id = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(id);
  }, []);

  const ramadanCountdown = useMemo(() => computeRamadanCountdown(now), [now]);

  const todayVerses = todayRecord.versesReadIds.length;
  const todayPages = todayRecord.pagesReadIds.length;
  const todayListened = todayRecord.secondsListened || 0;

  const activeStats =
    statsPeriod === 'today'
      ? {
          hasanat: todayRecord.hasanat,
          verses: todayVerses,
          readingSeconds: todayRecord.secondsRead,
          pages: todayPages,
          listeningSeconds: todayListened,
        }
      : statsPeriod === 'week'
        ? {
            hasanat: stats.weekHasanat,
            verses: stats.weekVerses,
            readingSeconds: stats.weekSeconds,
            pages: stats.weekPages,
            listeningSeconds: stats.weekSecondsListened,
          }
        : {
            hasanat: stats.totalHasanat,
            verses: stats.totalVerses,
            readingSeconds: stats.totalSeconds,
            pages: stats.totalPages,
            listeningSeconds: stats.totalSecondsListened,
          };

  // Chart data preparation
  const chartSeries = useMemo(() => {
    const raw =
      chartRange === '7d'
        ? stats.dailyHistory.slice(-7)
        : chartRange === '30d'
          ? stats.dailyHistory.slice(-30)
          : stats.dailyHistory;

    return raw.map((pt) => {
      let value = pt.hasanat;
      if (chartMetric === 'verses') value = pt.verses;
      else if (chartMetric === 'reading') value = pt.readingMinutes;
      else if (chartMetric === 'pages') value = pt.pages;
      else if (chartMetric === 'listening') value = pt.listeningMinutes;
      return {
        ...pt,
        value,
      };
    });
  }, [stats.dailyHistory, chartMetric, chartRange]);

  const activeMetricMeta = METRIC_META.find((m) => m.id === chartMetric) || METRIC_META[0];
  const chartMaxVal = useMemo(() => {
    const peak = chartSeries.reduce((m, p) => Math.max(m, p.value), 0);
    if (peak <= 0) return 10;
    return Math.ceil(peak * 1.15);
  }, [chartSeries]);

  const svgWidth = 640;
  const svgHeight = 200;
  const padLeft = 46;
  const padRight = 18;
  const padTop = 18;
  const padBottom = 30;
  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const svgPoints = useMemo(() => {
    if (chartSeries.length === 0) return [];
    if (chartSeries.length === 1) {
      const y = padTop + plotH - (chartSeries[0].value / Math.max(1, chartMaxVal)) * plotH;
      return [{ x: padLeft + plotW / 2, y, item: chartSeries[0], idx: 0 }];
    }
    return chartSeries.map((item, idx) => {
      const x = padLeft + (idx / (chartSeries.length - 1)) * plotW;
      const y = padTop + plotH - (item.value / Math.max(1, chartMaxVal)) * plotH;
      return { x, y, item, idx };
    });
  }, [chartSeries, chartMaxVal, plotW, plotH]);

  const linePath = useMemo(
    () => buildSmoothSvgPath(svgPoints.map((p) => ({ x: p.x, y: p.y }))),
    [svgPoints]
  );

  const areaPath = useMemo(() => {
    if (svgPoints.length < 2) return '';
    const baseY = padTop + plotH;
    return `${linePath} L ${svgPoints[svgPoints.length - 1].x.toFixed(2)} ${baseY} L ${svgPoints[0].x.toFixed(2)} ${baseY} Z`;
  }, [linePath, svgPoints, plotH]);

  const activeChartPoint =
    hoveredChartIdx !== null && svgPoints[hoveredChartIdx]
      ? svgPoints[hoveredChartIdx]
      : svgPoints[svgPoints.length - 1] || null;

  // Monthly Calendar computation
  const activeDateSet = useMemo(() => new Set(stats.activeDates), [stats.activeDates]);

  const monthView = useMemo(() => {
    const base = new Date();
    base.setDate(1);
    base.setMonth(base.getMonth() + calendarMonthOffset);
    const year = base.getFullYear();
    const month = base.getMonth();
    const monthTitle = base.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Monday-first grid: Mon=0 ... Sun=6
    const firstWeekday = new Date(year, month, 1).getDay();
    const leadingBlanks = firstWeekday === 0 ? 6 : firstWeekday - 1;

    const cells: {
      key: string;
      day: number | null;
      dateKey?: string;
      isActive?: boolean;
      isToday?: boolean;
    }[] = [];

    for (let b = 0; b < leadingBlanks; b++) {
      cells.push({ key: `blank-${b}`, day: null });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dt = new Date(year, month, d);
      const dk = getTodayKey(dt);
      cells.push({
        key: dk,
        day: d,
        dateKey: dk,
        isActive: activeDateSet.has(dk),
        isToday: dk === todayKey,
      });
    }

    const activeDaysThisMonth = cells.filter((c) => c.isActive).length;
    return { monthTitle, cells, activeDaysThisMonth };
  }, [calendarMonthOffset, activeDateSet, todayKey]);

  const formatChartReadout = (val: number) => {
    if (chartMetric === 'reading' || chartMetric === 'listening') {
      return `${val} min`;
    }
    return `${val.toLocaleString()} ${activeMetricMeta.unit}`;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. TOP HEADER: App Logo + Title (Left) | 7-Day Circular Consistency Row (Center) | Full-Month Calendar + Settings Gear (Far Right) */}
      <header className="rounded-3xl border border-[#B0891E]/25 dark:border-[#D4AF37]/30 bg-white dark:bg-[#141417] p-4 sm:p-5 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left: App Logo + Title */}
          <div className="flex items-center gap-3 min-w-0 shrink-0">
            <img
              src="/assets/aistudio/tas_logo_b0f8b87c.jpeg"
              onError={(e) => {
                e.currentTarget.src = '/pwa-192x192.png';
              }}
              alt="The Authentic Sunnah Logo"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-[#D4AF37]/75 object-cover shrink-0 shadow-sm bg-[#09090B]"
            />
            <div className="min-w-0">
              <h1 className="font-display text-base sm:text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB] truncate leading-tight">
                The Authentic Sunnah
              </h1>
              <p className="font-arabic text-xs text-[#B0891E] dark:text-[#D4AF37] truncate leading-tight mt-0.5">
                السُّنَّةُ النَّبَوِيَّةُ
              </p>
            </div>
          </div>

          {/* Center: Sleek Horizontal 7-Day Circular Streak Tracking Row */}
          <div className="flex-1 flex justify-center items-center py-1 md:py-0">
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5 items-center w-full max-w-sm">
              {stats.weekCalendar.map((day) => (
                <div key={day.date} className="flex flex-col items-center gap-1">
                  <span
                    className={`text-[10px] font-bold tracking-wide ${
                      day.isToday
                        ? 'text-[#B0891E] dark:text-[#F3E5AB]'
                        : 'text-[#365645] dark:text-[#CEC5AD]'
                    }`}
                  >
                    {day.shortChar}
                  </span>
                  <div
                    title={`${day.dayLabel}: ${day.completed ? 'Consistent Activity' : 'Not yet completed'}`}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                      day.completed
                        ? 'bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#B0891E] text-[#09090B] ring-2 ring-[#D4AF37]/50 shadow-[0_0_12px_rgba(212,175,55,0.45)]'
                        : day.isToday
                          ? 'border-2 border-[#D4AF37] bg-[#D4AF37]/12 text-[#B0891E] dark:text-[#F3E5AB]'
                          : 'border border-[#B0891E]/20 dark:border-[#D4AF37]/25 bg-[#F9F6EE] dark:bg-[#09090B]/70 text-[#365645]/60 dark:text-[#CEC5AD]/50'
                    }`}
                  >
                    {day.completed ? (
                      <Moon className="w-3.5 h-3.5 fill-current drop-shadow-[0_0_3px_rgba(9,9,11,0.35)]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-55" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Far Right: Streak Badge + Full-Month Calendar Icon + Settings Gear */}
          <div className="flex items-center gap-2 justify-end shrink-0">
            <div className="min-h-[38px] px-2.5 sm:px-3 py-1 rounded-xl border border-[#D4AF37]/60 bg-gradient-to-r from-[#D4AF37]/18 to-[#F3E5AB]/10 dark:from-[#D4AF37]/20 dark:to-[#1B1810] shadow-[0_0_14px_rgba(212,175,55,0.18)] flex items-center gap-1.5 tabular-nums">
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B0891E] dark:text-[#F3E5AB]" />
              <span className="text-xs font-bold text-[#092A1B] dark:text-[#F3E5AB] whitespace-nowrap">
                {stats.streak} {stats.streak === 1 ? 'Day' : 'Days'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowStreakModal(true)}
              aria-label="Open Monthly Consistency Calendar"
              title="Monthly Streak Calendar"
              className="min-h-[38px] min-w-[38px] rounded-xl border border-[#D4AF37]/40 bg-[#F9F6EE] dark:bg-[#09090B] text-[#B0891E] dark:text-[#F3E5AB] hover:bg-[#D4AF37] hover:text-[#09090B] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
            >
              <CalendarDays className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenSettings}
              aria-label="Open Settings"
              title="Settings"
              className="min-h-[38px] min-w-[38px] rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/30 bg-[#F9F6EE] dark:bg-[#09090B] text-[#092A1B] dark:text-[#F3E5AB] hover:border-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Offline Notice (shown strictly when offline) */}
      {!isOnline && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-2xl border border-[#D4AF37]/30 bg-[#141417] px-4 py-2.5 flex items-center gap-2 text-xs text-[#F3E5AB]"
        >
          <WifiOff className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span>
            Offline Mode Active — Adhkar, Duas, Cached Quran chapters &amp; Hifz progress work seamlessly without internet.
          </span>
        </div>
      )}

      {/* 2. HONEST SALAH STRIP: Directly below Header ("Remember, Allah is Watching") */}
      <HonestSalahStrip
        todayLog={salahState.todayLog}
        todayKey={salahState.todayKey}
        translationDisplay={settings.translationDisplay}
        onSavePrayer={salahState.onSavePrayer}
        onDeletePrayer={salahState.onDeletePrayer}
        onOpenHistory={() => setShowSalahHistory(true)}
      />

      {/* 3. THE 2x3 NAVIGATION GRID HUB: 6 Symmetric Gold-Contoured Square Selection Button Cards */}
      <section aria-label="Quick Navigation Hub" className="space-y-3">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Button 1: Adhkar */}
          <button
            type="button"
            onClick={onOpenDhikr}
            className="group relative rounded-3xl border border-[#B0891E]/30 dark:border-[#D4AF37]/35 bg-white dark:bg-[#141417] hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.22)] active:scale-[0.98] transition-all p-4 sm:p-5 flex flex-col justify-between items-start text-left cursor-pointer min-h-[120px] sm:min-h-[136px]"
          >
            <div className="w-full flex items-center justify-between">
              <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#B0891E] dark:text-[#F3E5AB] group-hover:bg-[#D4AF37] group-hover:text-[#09090B] transition-colors shrink-0 shadow-sm">
                <Sparkles className="w-5 h-5" />
              </span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]/50 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
            </div>
            <div className="w-full mt-2">
              <h3 className="font-display text-base sm:text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB] group-hover:text-[#B0891E] dark:group-hover:text-[#F3E5AB] leading-snug">
                Adhkar
              </h3>
              <p className="text-xs text-[#365645] dark:text-[#CEC5AD] mt-0.5 line-clamp-1">
                Morning &amp; Evening Remembrance
              </p>
            </div>
          </button>

          {/* Button 2: Duas */}
          <button
            type="button"
            onClick={onOpenDuas}
            className="group relative rounded-3xl border border-[#B0891E]/30 dark:border-[#D4AF37]/35 bg-white dark:bg-[#141417] hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.22)] active:scale-[0.98] transition-all p-4 sm:p-5 flex flex-col justify-between items-start text-left cursor-pointer min-h-[120px] sm:min-h-[136px]"
          >
            <div className="w-full flex items-center justify-between">
              <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#B0891E] dark:text-[#F3E5AB] group-hover:bg-[#D4AF37] group-hover:text-[#09090B] transition-colors shrink-0 shadow-sm">
                <HeartHandshake className="w-5 h-5" />
              </span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]/50 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
            </div>
            <div className="w-full mt-2">
              <h3 className="font-display text-base sm:text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB] group-hover:text-[#B0891E] dark:group-hover:text-[#F3E5AB] leading-snug">
                Duas
              </h3>
              <p className="text-xs text-[#365645] dark:text-[#CEC5AD] mt-0.5 line-clamp-1">
                Quranic &amp; Sunnah Supplications
              </p>
            </div>
          </button>

          {/* Button 3: Hifz */}
          <button
            type="button"
            onClick={onOpenHifz}
            className="group relative rounded-3xl border border-[#B0891E]/30 dark:border-[#D4AF37]/35 bg-white dark:bg-[#141417] hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.22)] active:scale-[0.98] transition-all p-4 sm:p-5 flex flex-col justify-between items-start text-left cursor-pointer min-h-[120px] sm:min-h-[136px]"
          >
            <div className="w-full flex items-center justify-between">
              <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#B0891E] dark:text-[#F3E5AB] group-hover:bg-[#D4AF37] group-hover:text-[#09090B] transition-colors shrink-0 shadow-sm">
                <Mic className="w-5 h-5" />
              </span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]/50 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
            </div>
            <div className="w-full mt-2">
              <h3 className="font-display text-base sm:text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB] group-hover:text-[#B0891E] dark:group-hover:text-[#F3E5AB] leading-snug">
                Hifz
              </h3>
              <p className="text-xs text-[#365645] dark:text-[#CEC5AD] mt-0.5 line-clamp-1">
                Continuous Voice Tracking Canvas
              </p>
            </div>
          </button>

          {/* Button 4: Life of Prophet */}
          <button
            type="button"
            onClick={onOpenSeerah}
            className="group relative rounded-3xl border border-[#B0891E]/30 dark:border-[#D4AF37]/35 bg-white dark:bg-[#141417] hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.22)] active:scale-[0.98] transition-all p-4 sm:p-5 flex flex-col justify-between items-start text-left cursor-pointer min-h-[120px] sm:min-h-[136px]"
          >
            <div className="w-full flex items-center justify-between">
              <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#B0891E] dark:text-[#F3E5AB] group-hover:bg-[#D4AF37] group-hover:text-[#09090B] transition-colors shrink-0 shadow-sm">
                <BookOpen className="w-5 h-5" />
              </span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]/50 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
            </div>
            <div className="w-full mt-2">
              <h3 className="font-display text-base sm:text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB] group-hover:text-[#B0891E] dark:group-hover:text-[#F3E5AB] leading-snug">
                Life of Prophet
              </h3>
              <p className="text-xs text-[#365645] dark:text-[#CEC5AD] mt-0.5 line-clamp-1">
                Chronological Seerah Timeline
              </p>
            </div>
          </button>

          {/* Button 5: Sahabah */}
          <button
            type="button"
            onClick={onOpenSahabah}
            className="group relative rounded-3xl border border-[#B0891E]/30 dark:border-[#D4AF37]/35 bg-white dark:bg-[#141417] hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.22)] active:scale-[0.98] transition-all p-4 sm:p-5 flex flex-col justify-between items-start text-left cursor-pointer min-h-[120px] sm:min-h-[136px]"
          >
            <div className="w-full flex items-center justify-between">
              <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#B0891E] dark:text-[#F3E5AB] group-hover:bg-[#D4AF37] group-hover:text-[#09090B] transition-colors shrink-0 shadow-sm">
                <Users className="w-5 h-5" />
              </span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]/50 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
            </div>
            <div className="w-full mt-2">
              <h3 className="font-display text-base sm:text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB] group-hover:text-[#B0891E] dark:group-hover:text-[#F3E5AB] leading-snug">
                Sahabah
              </h3>
              <p className="text-xs text-[#365645] dark:text-[#CEC5AD] mt-0.5 line-clamp-1">
                Profiles of the Noble Companions
              </p>
            </div>
          </button>

          {/* Button 6: Quiz */}
          <button
            type="button"
            onClick={onOpenQuiz}
            className="group relative rounded-3xl border border-[#B0891E]/30 dark:border-[#D4AF37]/35 bg-white dark:bg-[#141417] hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.22)] active:scale-[0.98] transition-all p-4 sm:p-5 flex flex-col justify-between items-start text-left cursor-pointer min-h-[120px] sm:min-h-[136px]"
          >
            <div className="w-full flex items-center justify-between">
              <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#B0891E] dark:text-[#F3E5AB] group-hover:bg-[#D4AF37] group-hover:text-[#09090B] transition-colors shrink-0 shadow-sm">
                <HelpCircle className="w-5 h-5" />
              </span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]/50 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
            </div>
            <div className="w-full mt-2">
              <h3 className="font-display text-base sm:text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB] group-hover:text-[#B0891E] dark:group-hover:text-[#F3E5AB] leading-snug">
                Quiz
              </h3>
              <p className="text-xs text-[#365645] dark:text-[#CEC5AD] mt-0.5 line-clamp-1">
                Multi-Category Islamic Knowledge Center
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* 4. RAMADAN COUNTDOWN BADGE: Clean minimal text token ("● [X] Days Left Until Ramadan") */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-[#B0891E]/30 dark:border-[#D4AF37]/35 bg-white dark:bg-[#141417] text-[#B0891E] dark:text-[#F3E5AB] text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
          <span className="text-[#D4AF37] text-xs animate-pulse">●</span>
          <span>{ramadanCountdown.badgeText.replace(/^●\s*/, '')}</span>
        </div>
      </div>

      {/* 5. FIVE LIVE STAT CARDS & PROGRESS ANALYTICS: Fully Intact at Base */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB]">
              Spiritual Metrics Overview
            </h2>
            <button
              type="button"
              onClick={() => setShowGoalEditor(true)}
              className="text-xs text-[#B0891E] dark:text-[#D4AF37] hover:underline cursor-pointer"
            >
              (Edit Goals)
            </button>
          </div>

          <div className="inline-flex rounded-xl p-1 bg-[#F2EDE0] dark:bg-[#141417] border border-[#B0891E]/25 dark:border-[#D4AF37]/25">
            {(
              [
                { id: 'today', label: 'Today' },
                { id: 'week', label: 'Week' },
                { id: 'all', label: 'All' },
              ] as { id: StatsPeriod; label: string }[]
            ).map((period) => (
              <button
                key={period.id}
                type="button"
                onClick={() => setStatsPeriod(period.id)}
                className={`min-h-[36px] px-4 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  statsPeriod === period.id
                    ? 'bg-[#D4AF37] text-[#09090B]'
                    : 'text-[#365645] dark:text-[#CEC5AD] hover:text-[#092A1B] dark:hover:text-[#FAF6EB]'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* 5 Live Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* 1. Hasanat Earned */}
          <div className="rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#141417] p-4 space-y-1.5 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#B0891E] dark:text-[#D4AF37] flex items-center gap-1.5 leading-snug">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Hasanat Earned</span>
            </p>
            <p className="text-xl sm:text-2xl font-bold text-[#092A1B] dark:text-[#FAF6EB] tabular-nums">
              <AnimatedCounter value={activeStats.hasanat} />
            </p>
            <p className="text-[11px] text-[#365645] dark:text-[#CEC5AD] leading-snug">
              {statsPeriod === 'today'
                ? `Goal: ${goals.hasanatPerDay.toLocaleString()}`
                : '10 per Arabic letter'}
            </p>
          </div>

          {/* 2. Verses Read */}
          <div className="rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#141417] p-4 space-y-1.5 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#B0891E] dark:text-[#D4AF37] flex items-center gap-1.5 leading-snug">
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span>Verses Read</span>
            </p>
            <p className="text-xl sm:text-2xl font-bold text-[#092A1B] dark:text-[#FAF6EB] tabular-nums">
              {activeStats.verses.toLocaleString()}
            </p>
            <p className="text-[11px] text-[#365645] dark:text-[#CEC5AD] leading-snug">
              {statsPeriod === 'today' ? `Goal: ${goals.versesPerDay} Ayahs` : 'Ayahs completed'}
            </p>
          </div>

          {/* 3. Reading Time */}
          <div className="rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#141417] p-4 space-y-1.5 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#B0891E] dark:text-[#D4AF37] flex items-center gap-1.5 leading-snug">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>Reading Time</span>
            </p>
            <p className="text-xl sm:text-2xl font-bold text-[#092A1B] dark:text-[#FAF6EB] tabular-nums">
              {statsPeriod === 'today'
                ? formatDurationMMSS(activeStats.readingSeconds)
                : formatStatTime(activeStats.readingSeconds)}
            </p>
            <p className="text-[11px] text-[#365645] dark:text-[#CEC5AD] leading-snug">
              {statsPeriod === 'today' ? `Goal: ${goals.minutesPerDay} mins` : 'Active recitation'}
            </p>
          </div>

          {/* 4. Pages Read */}
          <div className="rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#141417] p-4 space-y-1.5 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#B0891E] dark:text-[#D4AF37] leading-snug">
              Pages Read
            </p>
            <p className="text-xl sm:text-2xl font-bold text-[#092A1B] dark:text-[#FAF6EB] tabular-nums">
              {activeStats.pages.toLocaleString()}
            </p>
            <p className="text-[11px] text-[#365645] dark:text-[#CEC5AD] leading-snug">
              {statsPeriod === 'today' ? `Goal: ${goals.pagesPerDay} pages` : 'Mushaf pages read'}
            </p>
          </div>

          {/* 5. Quran Listened */}
          <div className="col-span-2 sm:col-span-1 rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#141417] p-4 space-y-1.5 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#B0891E] dark:text-[#D4AF37] flex items-center gap-1.5 leading-snug">
              <Headphones className="w-3.5 h-3.5 shrink-0" />
              <span>Quran Listened</span>
            </p>
            <p className="text-xl sm:text-2xl font-bold text-[#092A1B] dark:text-[#FAF6EB] tabular-nums">
              {statsPeriod === 'today'
                ? formatDurationMMSS(activeStats.listeningSeconds)
                : formatStatTime(activeStats.listeningSeconds)}
            </p>
            <p className="text-[11px] text-[#365645] dark:text-[#CEC5AD] leading-snug">
              Live audio player tracking
            </p>
          </div>
        </div>

        {/* Progress Analytics Line Graph */}
        <div className="rounded-3xl border border-[#B0891E]/25 dark:border-[#D4AF37]/30 bg-white dark:bg-[#141417] p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#B0891E] dark:text-[#D4AF37]" />
                <h3 className="font-display text-base sm:text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                  Progress Analytics From Day 1
                </h3>
              </div>
              <p className="text-xs text-[#365645] dark:text-[#CEC5AD] mt-0.5 tabular-nums">
                Daily Consistency Trend ·{' '}
                {activeChartPoint
                  ? `Day ${activeChartPoint.idx + 1}: ${formatChartReadout(activeChartPoint.item.value)}`
                  : 'Live daily trend'}
              </p>
            </div>

            <div className="inline-flex rounded-xl p-1 bg-[#F2EDE0] dark:bg-[#09090B] border border-[#B0891E]/20 dark:border-[#D4AF37]/25 self-start">
              {(
                [
                  { id: '7d', label: '7 Days' },
                  { id: '30d', label: '30 Days' },
                  { id: 'all', label: 'All Time From Start' },
                ] as { id: ChartRange; label: string }[]
              ).map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setChartRange(r.id);
                    setHoveredChartIdx(null);
                  }}
                  className={`min-h-[34px] px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    chartRange === r.id
                      ? 'bg-[#D4AF37] text-[#09090B]'
                      : 'text-[#365645] dark:text-[#CEC5AD] hover:text-[#092A1B] dark:hover:text-[#FAF6EB]'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5 Selectable Metric Tabs */}
          <div className="flex flex-wrap gap-2">
            {METRIC_META.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setChartMetric(m.id);
                  setHoveredChartIdx(null);
                }}
                className={`min-h-[36px] px-3.5 py-1 rounded-xl border text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  chartMetric === m.id
                    ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#B0891E] dark:text-[#F3E5AB]'
                    : 'border-[#B0891E]/20 dark:border-[#D4AF37]/20 text-[#365645] dark:text-[#CEC5AD] hover:border-[#D4AF37]/50'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* SVG Line Chart */}
          <div className="rounded-2xl border border-[#B0891E]/15 dark:border-[#D4AF37]/20 bg-[#F9F6EE] dark:bg-[#09090B]/80 p-3 sm:p-4">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-48 sm:h-56 overflow-visible"
              role="img"
              aria-label={`${activeMetricMeta.label} progress line graph`}
            >
              <defs>
                <linearGradient id="goldAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {/* Horizontal Dashed Gridlines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const y = padTop + plotH - ratio * plotH;
                const tickVal = Math.round(ratio * chartMaxVal);
                return (
                  <g key={ratio}>
                    <line
                      x1={padLeft}
                      y1={y}
                      x2={svgWidth - padRight}
                      y2={y}
                      stroke="#D4AF37"
                      strokeOpacity={0.16}
                      strokeDasharray="4 4"
                    />
                    <text
                      x={padLeft - 8}
                      y={y + 4}
                      textAnchor="end"
                      fontSize="10"
                      fill="#9E9680"
                      className="tabular-nums"
                    >
                      {tickVal}
                    </text>
                  </g>
                );
              })}

              {/* Area & Line */}
              {areaPath && <path d={areaPath} fill="url(#goldAreaGradient)" />}
              {svgPoints.length === 1 ? (
                <line
                  x1={padLeft}
                  y1={svgPoints[0].y}
                  x2={svgWidth - padRight}
                  y2={svgPoints[0].y}
                  stroke="#D4AF37"
                  strokeOpacity={0.45}
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />
              ) : (
                <path
                  d={linePath}
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Data Nodes + Interactive Hit Targets */}
              {svgPoints.map((pt) => {
                const isSelected = activeChartPoint?.idx === pt.idx;
                const colWidth = Math.max(14, plotW / Math.max(1, svgPoints.length));
                return (
                  <g key={pt.item.date}>
                    <rect
                      x={pt.x - colWidth / 2}
                      y={padTop}
                      width={colWidth}
                      height={plotH}
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredChartIdx(pt.idx)}
                      onClick={() => setHoveredChartIdx(pt.idx)}
                    />
                    {isSelected && (
                      <line
                        x1={pt.x}
                        y1={padTop}
                        x2={pt.x}
                        y2={padTop + plotH}
                        stroke="#F3E5AB"
                        strokeOpacity={0.4}
                        strokeWidth="1.5"
                      />
                    )}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? 6 : 3.5}
                      fill={isSelected ? '#F3E5AB' : '#D4AF37'}
                      stroke="#09090B"
                      strokeWidth="1.8"
                    />
                  </g>
                );
              })}

              {/* X-Axis Labels (Day Index — Zero Date Strings) */}
              {svgPoints
                .filter((_, i) => {
                  if (svgPoints.length <= 7) return true;
                  const step = Math.ceil(svgPoints.length / 6);
                  return i === 0 || i === svgPoints.length - 1 || i % step === 0;
                })
                .map((pt) => (
                  <text
                    key={`x-${pt.item.date}`}
                    x={pt.x}
                    y={svgHeight - 6}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#9E9680"
                  >
                    {`D${pt.idx + 1}`}
                  </text>
                ))}
            </svg>
          </div>
        </div>
      </section>

      {/* 6. LIVE ACTIVITY TICKER: Positioned at Absolute Bottom Margin ("● [X] Muslims Reciting Now") */}
      {isOnline && (
        <footer
          role="status"
          aria-live="polite"
          className="rounded-2xl border border-[#D4AF37]/30 bg-white dark:bg-[#141417] px-5 py-3.5 flex items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold text-[#092A1B] dark:text-[#F3E5AB] shadow-sm"
        >
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0 shadow-[0_0_8px_#10b981]" />
          <span className="tabular-nums">
            {(globalUmmahStats?.activeNowCount ?? 1).toLocaleString()} Muslims Reciting Now
          </span>
        </footer>
      )}

      {/* Modal 0: Full-Month Consistency Overlay Modal (Glowing Gold Crescent Icons) */}
      {showStreakModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
          onClick={() => setShowStreakModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Monthly Streak Consistency Calendar"
        >
          <div
            className="w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl border border-[#D4AF37]/40 bg-[#F9F6EE] dark:bg-[#141417] p-5 sm:p-6 space-y-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F3E5AB] to-[#D4AF37] text-[#09090B] flex items-center justify-center shadow-[0_0_16px_rgba(212,175,55,0.45)] shrink-0">
                  <Moon className="w-5 h-5 fill-current" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                    Monthly Streak Consistency
                  </h3>
                  <p className="text-xs text-[#365645] dark:text-[#CEC5AD] tabular-nums">
                    Current: <strong className="text-[#B0891E] dark:text-[#F3E5AB]">{stats.streak}d</strong> · Longest:{' '}
                    <strong className="text-[#B0891E] dark:text-[#F3E5AB]">{stats.longestStreak}d</strong>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowStreakModal(false)}
                aria-label="Close streak calendar"
                className="min-h-[42px] min-w-[42px] rounded-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setCalendarMonthOffset((m) => m - 1)}
                aria-label="Previous month"
                className="min-h-[38px] min-w-[38px] rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/30 flex items-center justify-center text-[#092A1B] dark:text-[#FAF6EB] hover:border-[#D4AF37] cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold text-[#092A1B] dark:text-[#F3E5AB] tabular-nums">
                {monthView.monthTitle}
              </span>
              <button
                type="button"
                onClick={() => setCalendarMonthOffset((m) => Math.min(0, m + 1))}
                disabled={calendarMonthOffset >= 0}
                aria-label="Next month"
                className="min-h-[38px] min-w-[38px] rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/30 flex items-center justify-center text-[#092A1B] dark:text-[#FAF6EB] hover:border-[#D4AF37] disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="grid grid-cols-7 text-center text-[11px] font-bold text-[#365645] dark:text-[#CEC5AD]">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((wd, i) => (
                  <span key={`${wd}-${i}`}>{wd}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {monthView.cells.map((cell) => {
                  if (!cell.day) {
                    return <div key={cell.key} className="h-10 sm:h-11" />;
                  }
                  return (
                    <div
                      key={cell.key}
                      title={
                        cell.isActive
                          ? `Day ${cell.day}: Quran Read / Listened`
                          : `Day ${cell.day}`
                      }
                      className={`h-10 sm:h-11 rounded-full flex flex-col items-center justify-center text-[11px] font-bold tabular-nums transition-all ${
                        cell.isActive
                          ? 'bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#B0891E] text-[#09090B] shadow-[0_0_16px_rgba(212,175,55,0.55)] ring-2 ring-[#F3E5AB]/50'
                          : cell.isToday
                            ? 'border-2 border-[#D4AF37] text-[#B0891E] dark:text-[#F3E5AB] bg-[#D4AF37]/12'
                            : 'border border-[#B0891E]/15 dark:border-[#D4AF37]/20 text-[#365645] dark:text-[#CEC5AD] bg-white dark:bg-[#09090B]/70'
                      }`}
                    >
                      {cell.isActive ? (
                        <>
                          <Moon className="w-3.5 h-3.5 fill-current drop-shadow-[0_0_4px_rgba(9,9,11,0.3)]" />
                          <span className="text-[9px] leading-none mt-0.5">{cell.day}</span>
                        </>
                      ) : (
                        <span>{cell.day}</span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between pt-2 text-[11px] text-[#365645] dark:text-[#CEC5AD] tabular-nums">
                <span className="inline-flex items-center gap-1.5 text-[#B0891E] dark:text-[#F3E5AB] font-semibold">
                  <Moon className="w-3.5 h-3.5 fill-current text-[#D4AF37]" />
                  <span>Glowing Crescent = Active Reading / Listening Day</span>
                </span>
                <span>
                  {monthView.activeDaysThisMonth} active {monthView.activeDaysThisMonth === 1 ? 'day' : 'days'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 1: Edit Daily Goal */}
      {showGoalEditor && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/65 backdrop-blur-sm p-0 sm:p-4"
          onClick={() => setShowGoalEditor(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Edit Daily Goal"
        >
          <div
            className="w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl border border-[#D4AF37]/35 bg-[#F9F6EE] dark:bg-[#141417] p-6 space-y-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                  Customize Your Daily Goals
                </h3>
                <p className="text-xs text-[#365645] dark:text-[#CEC5AD]">
                  Set targets that fit your daily schedule and consistency
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowGoalEditor(false)}
                aria-label="Close goal editor"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Daily Ayahs / Verses Goal</span>
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={goals.versesPerDay}
                    onChange={(e) =>
                      onUpdateGoals({ versesPerDay: Math.max(1, Number(e.target.value) || 1) })
                    }
                    className="w-20 px-2.5 py-1 rounded-lg border border-[#D4AF37]/30 bg-white dark:bg-[#09090B] text-right tabular-nums"
                  />
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={Math.min(100, goals.versesPerDay)}
                  onChange={(e) => onUpdateGoals({ versesPerDay: Number(e.target.value) })}
                  className="w-full accent-[#D4AF37]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Daily Pages Goal</span>
                  <input
                    type="number"
                    min={1}
                    max={604}
                    value={goals.pagesPerDay}
                    onChange={(e) =>
                      onUpdateGoals({ pagesPerDay: Math.max(1, Number(e.target.value) || 1) })
                    }
                    className="w-20 px-2.5 py-1 rounded-lg border border-[#D4AF37]/30 bg-white dark:bg-[#09090B] text-right tabular-nums"
                  />
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={Math.min(20, goals.pagesPerDay)}
                  onChange={(e) => onUpdateGoals({ pagesPerDay: Number(e.target.value) })}
                  className="w-full accent-[#D4AF37]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Daily Reading Minutes</span>
                  <input
                    type="number"
                    min={1}
                    max={240}
                    value={goals.minutesPerDay}
                    onChange={(e) =>
                      onUpdateGoals({ minutesPerDay: Math.max(1, Number(e.target.value) || 1) })
                    }
                    className="w-20 px-2.5 py-1 rounded-lg border border-[#D4AF37]/30 bg-white dark:bg-[#09090B] text-right tabular-nums"
                  />
                </div>
                <input
                  type="range"
                  min={1}
                  max={60}
                  value={Math.min(60, goals.minutesPerDay)}
                  onChange={(e) => onUpdateGoals({ minutesPerDay: Number(e.target.value) })}
                  className="w-full accent-[#D4AF37]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Daily Hasanat Goal</span>
                  <input
                    type="number"
                    min={100}
                    step={100}
                    value={goals.hasanatPerDay}
                    onChange={(e) =>
                      onUpdateGoals({
                        hasanatPerDay: Math.max(100, Number(e.target.value) || 100),
                      })
                    }
                    className="w-24 px-2.5 py-1 rounded-lg border border-[#D4AF37]/30 bg-white dark:bg-[#09090B] text-right tabular-nums"
                  />
                </div>
                <input
                  type="range"
                  min={500}
                  max={20000}
                  step={500}
                  value={Math.min(20000, goals.hasanatPerDay)}
                  onChange={(e) => onUpdateGoals({ hasanatPerDay: Number(e.target.value) })}
                  className="w-full accent-[#D4AF37]"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowGoalEditor(false)}
              className="w-full min-h-[44px] rounded-xl bg-[#D4AF37] text-[#09090B] font-semibold text-sm hover:bg-[#F3E5AB] transition-colors cursor-pointer"
            >
              Save Goals
            </button>
          </div>
        </div>
      )}

      {/* Salah History Modal */}
      <SalahHistoryModal
        isOpen={showSalahHistory}
        onClose={() => setShowSalahHistory(false)}
        logsMap={salahState.logsMap}
        todayKey={salahState.todayKey}
      />
    </div>
  );
};
