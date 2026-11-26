import React, { useMemo, useState } from 'react';
import { Copy, Search, Sparkles } from 'lucide-react';
import { ASMA_UL_HUSNA } from '../data/asmaAndSeerah';
import { AsmaNameItem, ReaderSettings } from '../types';
import { getLanguageFlags } from '../utils/languageDisplay';

interface AsmaUlHusnaProps {
  settings: ReaderSettings;
}

export const AsmaUlHusna: React.FC<AsmaUlHusnaProps> = ({ settings }) => {
  const [search, setSearch] = useState('');
  const [selectedNumber, setSelectedNumber] = useState<number>(1);
  const [copiedNum, setCopiedNum] = useState<number | null>(null);

  const { showEnglish, showUrdu, showRomanUrdu } = getLanguageFlags(settings.translationDisplay);
  const displayEnglish = showEnglish || showRomanUrdu;

  const filteredNames = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return ASMA_UL_HUSNA;
    return ASMA_UL_HUSNA.filter(
      (item) =>
        String(item.number) === q ||
        item.transliteration.toLowerCase().includes(q) ||
        item.english.toLowerCase().includes(q) ||
        item.urdu.includes(search.trim()) ||
        item.arabic.includes(search.trim())
    );
  }, [search]);

  const activeItem: AsmaNameItem | undefined = useMemo(
    () => ASMA_UL_HUSNA.find((item) => item.number === selectedNumber) || filteredNames[0],
    [selectedNumber, filteredNames]
  );

  const handleCopy = async (item: AsmaNameItem) => {
    const text = `${item.number}. ${item.arabic} (${item.transliteration}) — ${item.english}\n${item.urdu}\n${item.reflectionEn}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedNum(item.number);
      window.setTimeout(() => setCopiedNum((c) => (c === item.number ? null : c)), 1800);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header Banner */}
      <section className="rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#0A3321] to-[#062115] text-[#FAF6EB] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold">
            Asma-ul-Husna · The 99 Beautiful Names of Allah
          </h1>
          <p className="text-xs sm:text-sm text-[#CEC5AD] mt-1">
            Tap any Name card to reflect on its meaning and draw closer to Allah through His attributes
          </p>
        </div>
        <div className="text-left sm:text-right shrink-0 tabular-nums">
          <p className="text-xs text-[#F3E5AB]">Prophetic Promise</p>
          <p className="text-sm font-semibold text-[#FAF6EB]">99 Names · Sahih al-Bukhari</p>
        </div>
      </section>

      {/* Active Reflection Spotlight */}
      {activeItem && (
        <section className="rounded-2xl border border-[#D4AF37]/40 bg-white dark:bg-[#062115] p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-[#B0891E]/15 dark:border-[#D4AF37]/15">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center font-bold text-sm tabular-nums text-[#B0891E] dark:text-[#F3E5AB] shrink-0">
                {activeItem.number}
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                  {activeItem.transliteration}
                </h2>
                <p className="text-xs font-semibold text-[#B0891E] dark:text-[#D4AF37]">
                  {activeItem.english}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {settings.showArabic && (
                <p
                  dir="rtl"
                  className="font-arabic-quran text-3xl text-[#B0891E] dark:text-[#F3E5AB]"
                >
                  {activeItem.arabic}
                </p>
              )}
              <button
                onClick={() => handleCopy(activeItem)}
                className="min-h-[40px] px-3 py-1.5 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-xs font-medium text-[#365645] dark:text-[#CEC5AD] hover:text-[#092A1B] dark:hover:text-[#FAF6EB] inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedNum === activeItem.number ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div
            className={`grid grid-cols-1 gap-4 ${
              displayEnglish && showUrdu ? 'lg:grid-cols-2' : ''
            }`}
          >
            {displayEnglish && (
              <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#B0891E] dark:text-[#D4AF37] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Reflection</span>
                </p>
                <p
                  style={{ fontSize: `${settings.englishFontSize}px` }}
                  className="leading-relaxed text-[#365645] dark:text-[#CEC5AD]"
                >
                  {activeItem.reflectionEn}
                </p>
              </div>
            )}
            {showUrdu && (
              <div className="space-y-2">
                <p dir="rtl" className="text-xs font-semibold text-[#B0891E] dark:text-[#D4AF37]">
                  {activeItem.urdu}
                </p>
                <p
                  dir="rtl"
                  style={{ fontSize: `${settings.urduFontSize}px` }}
                  className="font-urdu leading-loose text-right text-[#092A1B] dark:text-[#FAF6EB]"
                >
                  {activeItem.reflectionUr}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#365645] dark:text-[#CEC5AD]" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Name, meaning, Urdu, or number (1-99)..."
          className="w-full min-h-[44px] pl-10 pr-4 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] text-sm text-[#092A1B] dark:text-[#FAF6EB] focus:outline-none focus:border-[#D4AF37]"
        />
      </div>

      {/* 99 Names Flashcard Grid */}
      {filteredNames.length === 0 ? (
        <div className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#062115] p-8 text-center text-sm text-[#365645] dark:text-[#CEC5AD]">
          No Names matched your search.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {filteredNames.map((item) => {
            const isSelected = activeItem?.number === item.number;
            return (
              <button
                key={item.number}
                onClick={() => setSelectedNumber(item.number)}
                className={`text-left rounded-2xl border p-4 transition-colors flex flex-col justify-between gap-2.5 cursor-pointer ${
                  isSelected
                    ? 'border-[#D4AF37] bg-[#D4AF37]/12 dark:bg-[#0A3321]'
                    : 'border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#062115] hover:border-[#D4AF37]/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold tabular-nums text-[#B0891E] dark:text-[#D4AF37]">
                    #{item.number}
                  </span>
                  {settings.showArabic && (
                    <span
                      dir="rtl"
                      className="font-arabic-quran text-2xl text-[#092A1B] dark:text-[#F3E5AB]"
                    >
                      {item.arabic}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-display text-sm font-bold text-[#092A1B] dark:text-[#FAF6EB]">
                    {item.transliteration}
                  </h3>
                  {displayEnglish && (
                    <p className="text-xs text-[#365645] dark:text-[#CEC5AD] mt-0.5 line-clamp-2">
                      {item.english}
                    </p>
                  )}
                  {showUrdu && (
                    <p
                      dir="rtl"
                      className="font-urdu text-sm text-right text-[#B0891E] dark:text-[#F3E5AB] mt-1"
                    >
                      {item.urdu}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
