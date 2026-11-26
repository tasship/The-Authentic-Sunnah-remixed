import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  HeartHandshake,
  ScrollText,
  Sparkles,
  X,
} from 'lucide-react';
import { DAILY_SAHIH_HADITHS } from '../data/dailyHadiths';
import { DHIKR_ITEMS, DUA_ITEMS } from '../data/dhikrAndDuas';
import { fetchVerseOfTheDay } from '../services/quranApi';
import { ReaderSettings } from '../types';
import { getLanguageFlags } from '../utils/languageDisplay';

interface DailyMemorizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuran: (surahNumber: number, ayahNumber: number) => void;
  settings: ReaderSettings;
}

export const DailyMemorizationModal: React.FC<DailyMemorizationModalProps> = ({
  isOpen,
  onClose,
  onOpenQuran,
  settings,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [dailyVerse, setDailyVerse] = useState<{
    surahNumber: number;
    surahName: string;
    ayahNumber: number;
    key: string;
    translation: string;
    urdu?: string;
    romanUrdu?: string;
  } | null>(null);
  const [loadingVerse, setLoadingVerse] = useState(true);

  const { showEnglish, showUrdu, showRomanUrdu } = getLanguageFlags(settings.translationDisplay);

  // Day index for rotating 24h content
  const dayIndex = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }, []);

  const dailyHadith = useMemo(() => {
    return DAILY_SAHIH_HADITHS[dayIndex % DAILY_SAHIH_HADITHS.length] || DAILY_SAHIH_HADITHS[0];
  }, [dayIndex]);

  const dailyDhikr = useMemo(() => {
    return DHIKR_ITEMS[dayIndex % DHIKR_ITEMS.length] || DHIKR_ITEMS[0];
  }, [dayIndex]);

  const dailyDua = useMemo(() => {
    return DUA_ITEMS[dayIndex % DUA_ITEMS.length] || DUA_ITEMS[0];
  }, [dayIndex]);

  // Load verse of the day
  useEffect(() => {
    if (!isOpen) return;
    let mounted = true;
    setLoadingVerse(true);
    fetchVerseOfTheDay(settings.englishTranslator, settings.urduTranslator, settings.romanUrduTranslator)
      .then((res) => {
        if (!mounted || !res) return;
        setDailyVerse({
          surahNumber: res.surahNumber,
          surahName: res.surahName,
          ayahNumber: res.ayahNumber,
          key: res.key,
          translation: res.translation,
          urdu: res.urdu,
          romanUrdu: res.romanUrdu,
        });
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoadingVerse(false);
      });

    return () => {
      mounted = false;
    };
  }, [isOpen, settings.englishTranslator, settings.urduTranslator, settings.romanUrduTranslator]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 4) {
      setStep((s) => (s + 1) as 1 | 2 | 3 | 4);
    } else {
      onClose();
    }
  };

  const handleOpenVerseInQuran = () => {
    if (dailyVerse) {
      onOpenQuran(dailyVerse.surahNumber, dailyVerse.ayahNumber);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-[fadeIn_200ms_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-label="Daily Memorization & Inspiration"
    >
      <div
        className="w-full max-w-lg rounded-3xl border border-[#D4AF37]/50 bg-gradient-to-b from-[#18181D] via-[#141417] to-[#0D0D10] text-[#FAF6EB] p-6 sm:p-8 space-y-6 shadow-[0_0_50px_rgba(212,175,55,0.25)] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle radial ambient atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-60 rounded-full bg-[#D4AF37]/12 blur-3xl"
        />

        {/* Top Header: Title, Step Progress & Skip */}
        <div className="relative flex items-center justify-between gap-3 border-b border-[#D4AF37]/25 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F3E5AB] to-[#D4AF37] text-[#09090B] flex items-center justify-center font-bold text-xs shadow-sm">
              {step}
            </span>
            <div>
              <p className="font-display text-sm font-bold text-[#F3E5AB]">
                Daily Memorization
              </p>
              <p className="text-[10px] uppercase tracking-wider text-[#CEC5AD]">
                Step {step} of 4 · 24-Hour Cycle
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Skip to Dashboard"
            className="text-xs text-[#CEC5AD] hover:text-[#FAF6EB] px-2.5 py-1.5 rounded-lg border border-transparent hover:border-[#D4AF37]/35 hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Skip</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Segmented Glowing Progress Bars */}
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s <= step
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] shadow-[0_0_8px_rgba(212,175,55,0.5)]'
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        {/* Knowledge Card Content Stream (Fading Step Sequence - Translation Only, ZERO Arabic) */}
        <div className="min-h-[220px] flex flex-col justify-between space-y-4 py-2">
          {step === 1 && (
            <div className="space-y-4 animate-[fadeIn_250ms_ease-out]">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Card 1: Verse of the Day</span>
                </span>
                <h3 className="font-display text-base font-bold text-[#FAF6EB]">
                  {dailyVerse
                    ? `Surah ${dailyVerse.surahName} (${dailyVerse.key})`
                    : 'Daily Quranic Inspiration'}
                </h3>
              </div>

              {loadingVerse ? (
                <div className="space-y-2 animate-pulse py-4">
                  <div className="h-4 bg-white/10 rounded w-full" />
                  <div className="h-4 bg-white/10 rounded w-5/6" />
                  <div className="h-4 bg-white/10 rounded w-4/6" />
                </div>
              ) : dailyVerse ? (
                <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#09090B]/80 p-4 space-y-3">
                  {showEnglish && (
                    <p className="text-sm sm:text-base leading-relaxed text-[#FAF6EB] italic">
                      &ldquo;{dailyVerse.translation}&rdquo;
                    </p>
                  )}
                  {showUrdu && dailyVerse.urdu && (
                    <p dir="rtl" className="font-urdu text-base text-right leading-loose text-[#F3E5AB]">
                      {dailyVerse.urdu}
                    </p>
                  )}
                  {showRomanUrdu && (
                    <p className="text-sm leading-relaxed text-[#F3E5AB]/95">
                      {dailyVerse.romanUrdu || dailyVerse.translation}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-[#CEC5AD]">Verse loaded for your contemplation.</p>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-[fadeIn_250ms_ease-out]">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                  <ScrollText className="w-3.5 h-3.5" />
                  <span>Card 2: Hadith of the Day</span>
                </span>
                <h3 className="font-display text-base font-bold text-[#FAF6EB]">
                  {dailyHadith.narratorEn}
                </h3>
                <p className="text-xs font-semibold text-[#D4AF37]">
                  Source: {dailyHadith.reference}
                </p>
              </div>

              <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#09090B]/80 p-4 space-y-3">
                {showEnglish && (
                  <p className="text-sm sm:text-base leading-relaxed text-[#FAF6EB]">
                    &ldquo;{dailyHadith.english}&rdquo;
                  </p>
                )}
                {showUrdu && dailyHadith.urdu && (
                  <p dir="rtl" className="font-urdu text-base text-right leading-loose text-[#F3E5AB]">
                    {dailyHadith.urdu}
                  </p>
                )}
                {showRomanUrdu && (
                  <p className="text-sm leading-relaxed text-[#F3E5AB]/95">
                    {dailyHadith.romanUrdu || dailyHadith.english}
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-[fadeIn_250ms_ease-out]">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Card 3: Dhikr of the Day</span>
                </span>
                <h3 className="font-display text-base font-bold text-[#FAF6EB]">
                  {dailyDhikr.title}
                </h3>
                <p className="text-xs text-[#CEC5AD]">{dailyDhikr.reference}</p>
              </div>

              <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#09090B]/80 p-4 space-y-3">
                {showEnglish && (
                  <p className="text-sm sm:text-base leading-relaxed text-[#FAF6EB]">
                    &ldquo;{dailyDhikr.english}&rdquo;
                  </p>
                )}
                {showUrdu && dailyDhikr.urdu && (
                  <p dir="rtl" className="font-urdu text-base text-right leading-loose text-[#F3E5AB]">
                    {dailyDhikr.urdu}
                  </p>
                )}
                {showRomanUrdu && (
                  <p className="text-sm leading-relaxed text-[#F3E5AB]/95">
                    {dailyDhikr.romanUrdu || dailyDhikr.english}
                  </p>
                )}

                {dailyDhikr.virtue && (
                  <div className="pt-2 border-t border-[#D4AF37]/20">
                    <p className="text-xs text-[#F3E5AB] leading-relaxed">
                      <strong>Reward Virtue:</strong> {dailyDhikr.virtue}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-[fadeIn_250ms_ease-out]">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Card 4: Dua of the Day</span>
                </span>
                <h3 className="font-display text-base font-bold text-[#FAF6EB]">
                  {dailyDua.title}
                </h3>
                <p className="text-xs text-[#CEC5AD]">
                  Category: {dailyDua.category} · {dailyDua.reference}
                </p>
              </div>

              <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#09090B]/80 p-4 space-y-3">
                {showEnglish && (
                  <p className="text-sm sm:text-base leading-relaxed text-[#FAF6EB]">
                    &ldquo;{dailyDua.english}&rdquo;
                  </p>
                )}
                {showUrdu && dailyDua.urdu && (
                  <p dir="rtl" className="font-urdu text-base text-right leading-loose text-[#F3E5AB]">
                    {dailyDua.urdu}
                  </p>
                )}
                {showRomanUrdu && (
                  <p className="text-sm leading-relaxed text-[#F3E5AB]/95">
                    {dailyDua.romanUrdu || dailyDua.english}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          {step === 1 && dailyVerse ? (
            <button
              type="button"
              onClick={handleOpenVerseInQuran}
              className="w-full sm:w-auto min-h-[44px] px-4 py-2 rounded-xl border border-[#D4AF37]/45 bg-[#D4AF37]/15 text-xs font-bold text-[#F3E5AB] hover:bg-[#D4AF37] hover:text-[#09090B] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Open in Quran</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3 | 4)}
                className="min-h-[44px] px-4 py-2 rounded-xl border border-white/20 hover:border-white/40 text-xs font-semibold text-[#CEC5AD] cursor-pointer"
              >
                Back
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="flex-1 sm:flex-initial min-h-[44px] px-6 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C665] to-[#D4AF37] text-[#09090B] font-display text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer shadow-md"
            >
              {step < 4 ? (
                <>
                  <span>Next Card</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Done · Open Dashboard</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
