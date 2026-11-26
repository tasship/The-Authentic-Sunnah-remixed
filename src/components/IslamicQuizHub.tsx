import React, { useMemo, useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Compass,
  RotateCcw,
  ScrollText,
  Sparkles,
  Trophy,
  XCircle,
} from 'lucide-react';
import {
  COMPREHENSIVE_QUIZ_BANK,
  ComprehensiveQuizQuestion,
  QUIZ_CATEGORIES,
  QuizCategoryKey,
} from '../data/expandedQuizData';
import { ReaderSettings } from '../types';
import { getLanguageFlags } from '../utils/languageDisplay';

interface IslamicQuizHubProps {
  settings: ReaderSettings;
}

export const IslamicQuizHub: React.FC<IslamicQuizHubProps> = ({ settings }) => {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategoryKey>('quranic_sciences');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [streakCount, setStreakCount] = useState(0);

  const { showEnglish, showUrdu, showRomanUrdu } = getLanguageFlags(settings.translationDisplay);

  const activeCategoryMeta = useMemo(() => {
    return (
      QUIZ_CATEGORIES.find((c) => c.key === selectedCategory) || QUIZ_CATEGORIES[0]
    );
  }, [selectedCategory]);

  const categoryQuestions = useMemo(() => {
    return COMPREHENSIVE_QUIZ_BANK.filter((q) => q.category === selectedCategory);
  }, [selectedCategory]);

  const activeQuestion: ComprehensiveQuizQuestion =
    categoryQuestions[currentIndex] || categoryQuestions[0];

  const handleSelectCategory = (catKey: QuizCategoryKey) => {
    if (catKey === selectedCategory) return;
    setSelectedCategory(catKey);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setAnsweredCount(0);
    setStreakCount(0);
    setFinished(false);
  };

  const handleAnswer = (optIdx: number) => {
    if (selectedOption !== null || !activeQuestion) return;
    setSelectedOption(optIdx);
    setAnsweredCount((c) => c + 1);

    if (optIdx === activeQuestion.correctIndex) {
      setScore((s) => s + 1);
      setStreakCount((st) => st + 1);
    } else {
      setStreakCount(0);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= categoryQuestions.length) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setAnsweredCount(0);
    setStreakCount(0);
    setFinished(false);
  };

  const pct = Math.round((score / Math.max(1, categoryQuestions.length)) * 100);

  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-4 h-4 shrink-0" />;
      case 'ScrollText':
        return <ScrollText className="w-4 h-4 shrink-0" />;
      case 'Compass':
        return <Compass className="w-4 h-4 shrink-0" />;
      case 'Award':
        return <Award className="w-4 h-4 shrink-0" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 shrink-0" />;
      default:
        return <BookOpen className="w-4 h-4 shrink-0" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header Banner */}
      <section className="theme-hero rounded-3xl border border-[#D4AF37]/35 p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#F3E5AB] flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Multi-Category Interactive Sacred Knowledge Center</span>
            </p>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-[#FAF6EB]">
              Islamic Knowledge Quiz
            </h1>
            <p className="text-xs sm:text-sm text-[#CEC5AD]">
              Test and reinforce traditional knowledge with verified citations across five sacred disciplines
            </p>
          </div>

          <div className="flex items-center gap-3">
            {streakCount > 1 && (
              <div className="px-3 py-1.5 rounded-xl border border-[#D4AF37]/45 bg-[#D4AF37]/15 text-xs font-bold text-[#F3E5AB] flex items-center gap-1.5 animate-pulse">
                <span>🔥</span>
                <span>{streakCount} In a Row</span>
              </div>
            )}
            <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#09090B]/60 px-4 py-2 text-left sm:text-right tabular-nums shrink-0">
              <p className="text-[10px] uppercase tracking-wider text-[#CEC5AD]">Category Score</p>
              <p className="text-xl sm:text-2xl font-bold text-[#F3E5AB]">
                {score} / {answeredCount || categoryQuestions.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Five Major Category Tabs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B0891E] dark:text-[#D4AF37]">
            Select Discipline (5 Major Categories)
          </span>
          <span className="text-xs text-[#365645] dark:text-[#CEC5AD]">
            {categoryQuestions.length} Practice Questions
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {QUIZ_CATEGORIES.map((cat) => {
            const isActive = cat.key === selectedCategory;
            const qCount = COMPREHENSIVE_QUIZ_BANK.filter((q) => q.category === cat.key).length;

            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => handleSelectCategory(cat.key)}
                className={`text-left rounded-2xl border p-3 sm:p-3.5 transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                  isActive
                    ? 'border-[#D4AF37] bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 dark:from-[#D4AF37]/25 dark:to-[#141417] shadow-[0_0_16px_rgba(212,175,55,0.25)]'
                    : 'border-[#B0891E]/20 dark:border-[#D4AF37]/25 bg-white dark:bg-[#141417] hover:border-[#D4AF37]/60'
                }`}
              >
                <div className="flex items-center justify-between gap-1.5">
                  <span
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs ${
                      isActive
                        ? 'border-[#D4AF37] bg-[#D4AF37] text-[#09090B]'
                        : 'border-[#B0891E]/30 dark:border-[#D4AF37]/35 text-[#B0891E] dark:text-[#D4AF37]'
                    }`}
                  >
                    {renderCategoryIcon(cat.iconName)}
                  </span>
                  <span className="text-[10px] font-bold text-[#B0891E] dark:text-[#F3E5AB]">
                    Cat. {cat.number}
                  </span>
                </div>

                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#092A1B] dark:text-[#FAF6EB] line-clamp-1">
                    {cat.titleEn}
                  </p>
                  <p className="font-arabic text-[11px] text-[#B0891E] dark:text-[#D4AF37] mt-0.5 truncate">
                    {cat.arabicTitle}
                  </p>
                  <span className="inline-block text-[10px] text-[#365645] dark:text-[#CEC5AD] mt-1">
                    {qCount} Questions
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Quiz Canvas or Results */}
      {finished ? (
        <section className="rounded-3xl border border-[#D4AF37]/40 bg-white dark:bg-[#141417] p-6 sm:p-10 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl mx-auto bg-gradient-to-br from-[#F3E5AB] to-[#D4AF37] text-[#09090B] flex items-center justify-center shadow-[0_0_24px_rgba(212,175,55,0.45)]">
            <Trophy className="w-8 h-8 stroke-[2.5]" />
          </div>

          <div className="space-y-1">
            <h2 className="font-display text-2xl font-bold text-[#092A1B] dark:text-[#FAF6EB]">
              Category Completed!
            </h2>
            <p className="text-xs sm:text-sm text-[#365645] dark:text-[#CEC5AD]">
              {activeCategoryMeta.titleEn} ({activeCategoryMeta.arabicTitle})
            </p>
          </div>

          <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#F9F6EE] dark:bg-[#09090B] p-5 max-w-sm mx-auto space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[#365645] dark:text-[#CEC5AD]">
              Final Mastery Score
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-[#B0891E] dark:text-[#F3E5AB] tabular-nums">
              {score} / {categoryQuestions.length} ({pct}%)
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#365645] dark:text-[#CEC5AD] max-w-md mx-auto leading-relaxed">
            {pct >= 80
              ? 'MashaAllah! Outstanding grasp of traditional Islamic knowledge and verified source references.'
              : 'BarakAllahu feek! Keep reviewing these verified Hadiths, Seerah milestones, and Quranic sciences.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="min-h-[46px] px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C59B27] text-[#09090B] text-sm font-bold inline-flex items-center gap-2 cursor-pointer shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Category</span>
            </button>
            <button
              type="button"
              onClick={() => {
                const nextCatIndex =
                  (QUIZ_CATEGORIES.findIndex((c) => c.key === selectedCategory) + 1) %
                  QUIZ_CATEGORIES.length;
                handleSelectCategory(QUIZ_CATEGORIES[nextCatIndex].key);
              }}
              className="min-h-[46px] px-6 py-2.5 rounded-xl border border-[#D4AF37]/40 bg-white dark:bg-[#141417] text-[#092A1B] dark:text-[#F3E5AB] text-sm font-bold inline-flex items-center gap-2 hover:border-[#D4AF37] cursor-pointer"
            >
              <span>Next Category</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      ) : (
        <section className="rounded-3xl border border-[#B0891E]/25 dark:border-[#D4AF37]/30 bg-white dark:bg-[#141417] p-5 sm:p-7 space-y-6 shadow-xl">
          {/* Progress Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 text-xs font-semibold text-[#B0891E] dark:text-[#D4AF37] tabular-nums">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span>
                  {activeCategoryMeta.titleEn} · Question {currentIndex + 1} of{' '}
                  {categoryQuestions.length}
                </span>
              </span>
              <span>{Math.round(((currentIndex + 1) / categoryQuestions.length) * 100)}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#B0891E]/15 dark:bg-black/50 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#B0891E] via-[#D4AF37] to-[#F3E5AB] transition-all duration-300"
                style={{
                  width: `${Math.round(((currentIndex + 1) / categoryQuestions.length) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2.5">
            {(showEnglish || showRomanUrdu) && (
              <h2 className="font-display text-lg sm:text-xl font-bold text-[#092A1B] dark:text-[#FAF6EB] leading-snug">
                {activeQuestion.questionEn}
              </h2>
            )}
            {showUrdu && (
              <p
                dir="rtl"
                className="font-urdu text-lg sm:text-xl text-right font-semibold text-[#092A1B] dark:text-[#F3E5AB] leading-loose"
              >
                {activeQuestion.questionUr}
              </p>
            )}
          </div>

          {/* Multiple Choice Options with Automated Flash Evaluation */}
          <div className="grid grid-cols-1 gap-3">
            {activeQuestion.optionsEn.map((optEn, idx) => {
              const optUr = activeQuestion.optionsUr?.[idx];
              const isPicked = selectedOption === idx;
              const isCorrect = idx === activeQuestion.correctIndex;
              const revealed = selectedOption !== null;

              // Color flash evaluation styles
              let btnClass =
                'border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-[#FBF9F5] dark:bg-[#0D0D10] hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 text-[#092A1B] dark:text-[#FAF6EB]';

              if (revealed) {
                if (isCorrect) {
                  btnClass =
                    'border-emerald-500 bg-emerald-500/20 text-emerald-900 dark:text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.35)] ring-1 ring-emerald-500';
                } else if (isPicked) {
                  btnClass =
                    'border-rose-500 bg-rose-500/20 text-rose-900 dark:text-rose-100 shadow-[0_0_18px_rgba(244,63,94,0.35)] ring-1 ring-rose-500';
                } else {
                  btnClass =
                    'border-[#B0891E]/15 dark:border-[#D4AF37]/15 bg-[#FBF9F5]/50 dark:bg-[#0D0D10]/50 text-[#365645]/60 dark:text-[#8E9B93]/60';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={revealed}
                  onClick={() => handleAnswer(idx)}
                  className={`min-h-[52px] p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 cursor-pointer ${btnClass}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold shrink-0 ${
                        revealed && isCorrect
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : revealed && isPicked && !isCorrect
                            ? 'border-rose-500 bg-rose-500 text-white'
                            : 'border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#B0891E] dark:text-[#F3E5AB]'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div className="min-w-0">
                      {(showEnglish || showRomanUrdu) && <span>{optEn}</span>}
                      {showUrdu && optUr && (
                        <span dir="rtl" className="block font-urdu text-sm mt-0.5 text-right">
                          {optUr}
                        </span>
                      )}
                    </div>
                  </div>

                  {revealed && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 animate-bounce" />
                  )}
                  {revealed && isPicked && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Illustrative Explanation Panel with Verified Source Citation */}
          {selectedOption !== null && (
            <div className="rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-br from-[#D4AF37]/12 to-[#D4AF37]/5 p-5 space-y-3.5 animate-[fadeIn_250ms_ease-out]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B0891E] dark:text-[#D4AF37] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Verified Classical Explanation &amp; Dalil</span>
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 text-[#B0891E] dark:text-[#F3E5AB]">
                  {selectedOption === activeQuestion.correctIndex ? 'Correct ✓' : 'Correction'}
                </span>
              </div>

              {(showEnglish || showRomanUrdu) && (
                <p className="text-xs sm:text-sm leading-relaxed text-[#092A1B] dark:text-[#FAF6EB]">
                  {activeQuestion.explanationEn}
                </p>
              )}

              {showUrdu && (
                <p
                  dir="rtl"
                  className="font-urdu text-sm sm:text-base leading-loose text-right text-[#092A1B] dark:text-[#F3E5AB]"
                >
                  {activeQuestion.explanationUr}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#D4AF37]/25">
                <div className="flex items-center gap-2 text-xs font-bold text-[#B0891E] dark:text-[#F3E5AB]">
                  <BookOpen className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Source: {activeQuestion.reference}</span>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="min-h-[44px] px-6 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C665] text-[#09090B] text-xs sm:text-sm font-bold inline-flex items-center gap-2 hover:brightness-105 transition-all cursor-pointer shadow-md"
                >
                  <span>
                    {currentIndex + 1 >= categoryQuestions.length
                      ? 'Complete & View Results'
                      : 'Next Question'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
