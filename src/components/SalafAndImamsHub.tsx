import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Quote, Scale, ShieldCheck, Users } from 'lucide-react';
import { GREAT_IMAMS, SALAF_QUOTES, SALAF_TOPICS } from '../data/salafAndImams';
import { ReaderSettings } from '../types';
import { getLanguageFlags } from '../utils/languageDisplay';

interface SalafAndImamsHubProps {
  settings: ReaderSettings;
  initialTab?: 'salaf' | 'imams';
}

export const SalafAndImamsHub: React.FC<SalafAndImamsHubProps> = ({
  settings,
  initialTab = 'salaf',
}) => {
  const [activeTab, setActiveTab] = useState<'salaf' | 'imams'>(initialTab);
  const [selectedImamId, setSelectedImamId] = useState<string>(GREAT_IMAMS[0].id);

  const { showEnglish, showUrdu, showRomanUrdu } = getLanguageFlags(settings.translationDisplay);
  const displayEnglish = showEnglish || showRomanUrdu;
  const selectedImam =
    GREAT_IMAMS.find((imam) => imam.id === selectedImamId) || GREAT_IMAMS[0];

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <section className="theme-hero rounded-3xl border border-[#D4AF37]/35 p-6 space-y-4">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#F3E5AB] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Classical Sunni Scholarship &amp; Jurisprudence</span>
          </p>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-[#FAF6EB]">
            As-Salaf as-Salih &amp; The Four Great Imams
          </h1>
          <p className="text-xs sm:text-sm text-[#CEC5AD] max-w-2xl">
            How the three praised generations preserved revelation, and the biographies,
            methodologies, and Sunnah principles of Abu Hanifah, Malik, ash-Shafi‘i, and Ahmad ibn
            Hanbal
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => setActiveTab('salaf')}
            className={`min-h-[48px] px-4 py-3 rounded-xl border text-left transition-colors cursor-pointer flex items-center gap-2.5 ${
              activeTab === 'salaf'
                ? 'bg-[#D4AF37] text-[#09090B] border-[#F3E5AB]'
                : 'bg-black/25 text-[#FAF6EB] border-[#D4AF37]/25 hover:border-[#D4AF37]/60'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <div>
              <p className="text-xs sm:text-sm font-bold">Who are the Salaf as-Salih?</p>
              <p
                className={`text-[11px] ${
                  activeTab === 'salaf' ? 'text-[#09090B]/80' : 'text-[#CEC5AD]'
                }`}
              >
                3 Praised Generations · Manhaj · Classical Quotes
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('imams')}
            className={`min-h-[48px] px-4 py-3 rounded-xl border text-left transition-colors cursor-pointer flex items-center gap-2.5 ${
              activeTab === 'imams'
                ? 'bg-[#D4AF37] text-[#09090B] border-[#F3E5AB]'
                : 'bg-black/25 text-[#FAF6EB] border-[#D4AF37]/25 hover:border-[#D4AF37]/60'
            }`}
          >
            <Scale className="w-4 h-4 shrink-0" />
            <div>
              <p className="text-xs sm:text-sm font-bold">The Four Great Imams</p>
              <p
                className={`text-[11px] ${
                  activeTab === 'imams' ? 'text-[#09090B]/80' : 'text-[#CEC5AD]'
                }`}
              >
                Abu Hanifah · Malik · ash-Shafi‘i · Ahmad ibn Hanbal
              </p>
            </div>
          </button>
        </div>
      </section>

      {activeTab === 'salaf' ? (
        <div className="space-y-6">
          {/* Salaf Topics */}
          <div className="space-y-4">
            {SALAF_TOPICS.map((topic) => (
              <article
                key={topic.id}
                className="rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#141417] p-5 sm:p-6 space-y-4"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    {displayEnglish && (
                      <h2 className="font-display text-base sm:text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                        {topic.titleEn}
                      </h2>
                    )}
                    <span className="text-xs font-semibold text-[#B0891E] dark:text-[#D4AF37]">
                      {topic.reference}
                    </span>
                  </div>
                  {showUrdu && (
                    <p
                      dir="rtl"
                      className="font-urdu text-lg text-right font-semibold text-[#092A1B] dark:text-[#F3E5AB]"
                    >
                      {topic.titleUr}
                    </p>
                  )}
                </div>

                <div className="space-y-3 pt-2 border-t border-[#B0891E]/15 dark:border-[#D4AF37]/15">
                  {displayEnglish && (
                    <div className="space-y-2">
                      {topic.summaryEn.map((para, idx) => (
                        <p
                          key={idx}
                          style={{ fontSize: `${settings.englishFontSize}px` }}
                          className="leading-relaxed text-[#365645] dark:text-[#FAF6EB]/90"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  )}

                  {showUrdu && (
                    <div className="space-y-2 pt-2 border-t border-[#B0891E]/10 dark:border-[#D4AF37]/10">
                      {topic.summaryUr.map((para, idx) => (
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

                <div className="rounded-xl bg-[#FBF9F5] dark:bg-[#0D0D10] border border-[#B0891E]/20 dark:border-[#D4AF37]/20 p-4 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#B0891E] dark:text-[#F3E5AB]">
                    Key Takeaways
                  </p>
                  {displayEnglish &&
                    topic.keyPointsEn.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#365645] dark:text-[#CEC5AD]">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  {showUrdu &&
                    topic.keyPointsUr.map((pt, i) => (
                      <p
                        key={i}
                        dir="rtl"
                        className="font-urdu text-sm sm:text-base text-right text-[#365645] dark:text-[#FAF6EB]/90"
                      >
                        • {pt}
                      </p>
                    ))}
                </div>
              </article>
            ))}
          </div>

          {/* Authentic Salaf Quotes */}
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB] px-1">
              Authentic Statements of the Salaf Scholars
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SALAF_QUOTES.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#141417] p-5 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-sm sm:text-base font-bold text-[#092A1B] dark:text-[#F3E5AB]">
                        {item.scholar}
                      </h3>
                      {showUrdu && (
                        <p className="text-xs text-[#B0891E] dark:text-[#D4AF37] mt-0.5">
                          {item.scholarUrdu}
                        </p>
                      )}
                      <p className="text-[11px] text-[#43574C] dark:text-[#CEC5AD] mt-0.5">
                        {item.era}
                      </p>
                    </div>
                    <Quote className="w-5 h-5 text-[#D4AF37]/60 shrink-0" />
                  </div>

                  {displayEnglish && (
                    <p className="text-sm leading-relaxed text-[#18201C] dark:text-[#FAF6EB]/92 italic">
                      &ldquo;{item.quoteEn}&rdquo;
                    </p>
                  )}

                  {showUrdu && (
                    <p
                      dir="rtl"
                      className="font-urdu text-base leading-loose text-right text-[#365645] dark:text-[#CEC5AD]"
                    >
                      {item.quoteUr}
                    </p>
                  )}

                  <p className="text-[11px] font-medium text-[#B0891E] dark:text-[#D4AF37] pt-2 border-t border-[#B0891E]/15 dark:border-[#D4AF37]/15">
                    Source: {item.source}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-5">
          {/* 4 Imams Selector Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {GREAT_IMAMS.map((imam) => {
              const active = imam.id === selectedImam.id;
              return (
                <button
                  key={imam.id}
                  type="button"
                  onClick={() => setSelectedImamId(imam.id)}
                  className={`min-h-[68px] p-4 rounded-2xl border text-left transition-colors cursor-pointer space-y-1 ${
                    active
                      ? 'bg-[#D4AF37] text-[#09090B] border-[#F3E5AB]'
                      : 'bg-white dark:bg-[#141417] border-[#B0891E]/25 dark:border-[#D4AF37]/25 hover:border-[#D4AF37]/65'
                  }`}
                >
                  <p
                    className={`text-[11px] font-bold uppercase tracking-wider ${
                      active ? 'text-[#09090B]/75' : 'text-[#B0891E] dark:text-[#D4AF37]'
                    }`}
                  >
                    {imam.schoolName}
                  </p>
                  <p className="font-display text-sm font-bold leading-snug">{imam.name}</p>
                  <p
                    className={`text-[11px] tabular-nums ${
                      active ? 'text-[#09090B]/80' : 'text-[#43574C] dark:text-[#CEC5AD]'
                    }`}
                  >
                    {imam.dates}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Selected Imam Detailed Profile */}
          <article className="rounded-3xl border border-[#D4AF37]/35 bg-white dark:bg-[#141417] p-5 sm:p-7 space-y-5">
            <div className="space-y-1.5 border-b border-[#B0891E]/20 dark:border-[#D4AF37]/20 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[#B0891E] dark:text-[#D4AF37]">
                  {selectedImam.schoolName} · {selectedImam.birthplace}
                </span>
                <span className="text-xs font-medium text-[#43574C] dark:text-[#CEC5AD] tabular-nums">
                  {selectedImam.dates}
                </span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                {selectedImam.name}
              </h2>
              <p className="text-xs text-[#43574C] dark:text-[#CEC5AD]">
                {selectedImam.fullName} — {selectedImam.title}
              </p>
              {showUrdu && (
                <p
                  dir="rtl"
                  className="font-urdu text-lg text-right font-semibold text-[#B0891E] dark:text-[#F3E5AB]"
                >
                  {selectedImam.nameUrdu}
                </p>
              )}
            </div>

            {/* Biography */}
            <div className="space-y-3">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#B0891E] dark:text-[#D4AF37]">
                Life &amp; Scholarly Legacy
              </h3>
              {displayEnglish &&
                selectedImam.biographyEn.map((para, i) => (
                  <p
                    key={i}
                    style={{ fontSize: `${settings.englishFontSize}px` }}
                    className="leading-relaxed text-[#18201C] dark:text-[#FAF6EB]/92"
                  >
                    {para}
                  </p>
                ))}
              {showUrdu &&
                selectedImam.biographyUr.map((para, i) => (
                  <p
                    key={i}
                    dir="rtl"
                    style={{ fontSize: `${settings.urduFontSize}px` }}
                    className="font-urdu leading-loose text-right text-[#365645] dark:text-[#CEC5AD]"
                  >
                    {para}
                  </p>
                ))}
            </div>

            {/* Teachers & Students + Works */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-[#FBF9F5] dark:bg-[#0D0D10] p-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#B0891E] dark:text-[#F3E5AB]">
                  Teachers &amp; Renowned Students
                </p>
                {displayEnglish && (
                  <p className="text-xs sm:text-sm leading-relaxed text-[#365645] dark:text-[#CEC5AD]">
                    {selectedImam.teachersAndStudentsEn}
                  </p>
                )}
                {showUrdu && (
                  <p
                    dir="rtl"
                    className="font-urdu text-sm sm:text-base leading-loose text-right text-[#365645] dark:text-[#FAF6EB]/90"
                  >
                    {selectedImam.teachersAndStudentsUr}
                  </p>
                )}
              </div>

              <div className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-[#FBF9F5] dark:bg-[#0D0D10] p-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#B0891E] dark:text-[#F3E5AB] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Foundational Books &amp; Works</span>
                </p>
                <ul className="space-y-1.5">
                  {selectedImam.famousWorks.map((work, i) => (
                    <li
                      key={i}
                      className="text-xs sm:text-sm text-[#18201C] dark:text-[#FAF6EB]/90 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                      <span>{work}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Methodology */}
            <div className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-[#FBF9F5] dark:bg-[#0D0D10] p-4 sm:p-5 space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#B0891E] dark:text-[#F3E5AB]">
                Usul Methodology (How Rulings Were Derived)
              </p>
              {displayEnglish &&
                selectedImam.methodologyEn.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs sm:text-sm text-[#365645] dark:text-[#CEC5AD]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              {showUrdu &&
                selectedImam.methodologyUr.map((step, i) => (
                  <p
                    key={i}
                    dir="rtl"
                    className="font-urdu text-sm sm:text-base text-right text-[#365645] dark:text-[#FAF6EB]/90"
                  >
                    • {step}
                  </p>
                ))}
            </div>

            {/* Statement Prioritizing Authentic Sunnah */}
            <div className="rounded-2xl border border-[#D4AF37]/45 bg-[#D4AF37]/[0.08] p-4 sm:p-5 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#B0891E] dark:text-[#F3E5AB]">
                Golden Principle on Following Authentic Hadith
              </p>
              {displayEnglish && (
                <p className="text-sm sm:text-base font-medium text-[#092A1B] dark:text-[#FAF6EB] leading-relaxed">
                  {selectedImam.statementOnSunnahEn}
                </p>
              )}
              {showUrdu && (
                <p
                  dir="rtl"
                  className="font-urdu text-base sm:text-lg leading-loose text-right text-[#092A1B] dark:text-[#F3E5AB]"
                >
                  {selectedImam.statementOnSunnahUr}
                </p>
              )}
            </div>
          </article>
        </div>
      )}
    </div>
  );
};
