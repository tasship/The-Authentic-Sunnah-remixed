import React, { useMemo, useState } from 'react';
import {
  Bookmark,
  BookmarkCheck,
  BookOpen,
  Copy,
  Image as ImageIcon,
  ScrollText,
  Search,
  Share2,
  X,
} from 'lucide-react';
import {
  QURAN_DUA_CATEGORIES,
  QURAN_DUA_ITEMS,
  SUNNAH_DUA_CATEGORIES,
  SUNNAH_DUA_ITEMS,
} from '../data/duasExpanded';
import {
  DuaBookmark,
  DuaCategory,
  DuaItem,
  DuaSourceGroup,
  ReaderSettings,
} from '../types';
import { getLanguageFlags } from '../utils/languageDisplay';
import { ShareCardPayload } from '../utils/shareCardGenerator';
import { ShareCardModal } from './ShareCardModal';

interface DuasHubProps {
  settings: ReaderSettings;
  duaBookmarks: DuaBookmark[];
  onToggleDuaBookmark: (b: Omit<DuaBookmark, 'savedAt'>) => void;
}

export const DuasHub: React.FC<DuasHubProps> = ({
  settings,
  duaBookmarks,
  onToggleDuaBookmark,
}) => {
  const [sourceGroup, setSourceGroup] = useState<DuaSourceGroup>('quran');
  const [activeCategory, setActiveCategory] = useState<'All' | DuaCategory>('All');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [shareCardPayload, setShareCardPayload] = useState<ShareCardPayload | null>(null);

  const { showEnglish, showUrdu, showRomanUrdu } = getLanguageFlags(settings.translationDisplay);

  const bookmarkSet = useMemo(() => new Set(duaBookmarks.map((b) => b.key)), [duaBookmarks]);

  const activeCategories: DuaCategory[] = useMemo(
    () => (sourceGroup === 'quran' ? QURAN_DUA_CATEGORIES : SUNNAH_DUA_CATEGORIES),
    [sourceGroup]
  );

  const activePool: DuaItem[] = useMemo(
    () => (sourceGroup === 'quran' ? QURAN_DUA_ITEMS : SUNNAH_DUA_ITEMS),
    [sourceGroup]
  );

  const handleSelectSourceGroup = (next: DuaSourceGroup) => {
    setSourceGroup(next);
    setActiveCategory('All');
  };

  const filteredDuas = useMemo(() => {
    const raw = search.trim();
    const q = raw.toLowerCase();
    return activePool.filter((d) => {
      if (activeCategory !== 'All' && d.category !== activeCategory) return false;
      if (raw) {
        return (
          d.title.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q) ||
          d.reference.toLowerCase().includes(q) ||
          d.english.toLowerCase().includes(q) ||
          (d.romanUrdu && d.romanUrdu.toLowerCase().includes(q)) ||
          d.transliteration.toLowerCase().includes(q) ||
          d.arabic.includes(raw) ||
          d.urdu.includes(raw)
        );
      }
      return true;
    });
  }, [activePool, activeCategory, search]);

  const handleCopyOrShare = async (dua: DuaItem, mode: 'copy' | 'share') => {
    const payload = `${dua.title}\n\n${dua.arabic}\n\n${dua.transliteration}\n\n${dua.english}\n\n${dua.urdu}\n— ${dua.reference}`;
    if (mode === 'share' && navigator.share) {
      try {
        await navigator.share({ title: dua.title, text: payload });
        return;
      } catch {
        // fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(payload);
      setCopiedId(dua.id);
      window.setTimeout(() => setCopiedId((c) => (c === dua.id ? null : c)), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Banner + Strictly Two Distinct Top Tabs */}
      <section className="rounded-3xl border border-[#D4AF37]/35 bg-gradient-to-br from-[#0A3321] via-[#062115] to-[#04180F] text-[#FAF6EB] p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold">
              Supplications from Quran &amp; Sunnah
            </h1>
            <p className="text-xs sm:text-sm text-[#CEC5AD] mt-1">
              {QURAN_DUA_ITEMS.length} Quranic Duas (Rabbana &amp; Rabbi) and{' '}
              {SUNNAH_DUA_ITEMS.length} Authentic Prophetic Duas (Hisn al-Muslim)
            </p>
          </div>

          <div className="text-left sm:text-right shrink-0 tabular-nums">
            <p className="text-xs text-[#F3E5AB]">Saved Duas</p>
            <p className="text-2xl font-bold">{duaBookmarks.length}</p>
          </div>
        </div>

        {/* Strictly Two Top Source Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="tablist" aria-label="Dua Source">
          <button
            type="button"
            role="tab"
            aria-selected={sourceGroup === 'quran'}
            onClick={() => handleSelectSourceGroup('quran')}
            className={`min-h-[52px] px-4 py-3 rounded-2xl border text-left transition-colors flex items-center gap-3 cursor-pointer ${
              sourceGroup === 'quran'
                ? 'bg-[#D4AF37] border-[#D4AF37] text-[#04180F]'
                : 'bg-[#04180F]/60 border-[#D4AF37]/25 text-[#FAF6EB] hover:border-[#D4AF37]/60'
            }`}
          >
            <BookOpen className="w-5 h-5 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold truncate">
                Duas from the Holy Quran
              </p>
              <p className="text-[11px] opacity-85 tabular-nums">
                {QURAN_DUA_ITEMS.length} Rabbana &amp; Rabbi Supplications
              </p>
            </div>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={sourceGroup === 'sunnah'}
            onClick={() => handleSelectSourceGroup('sunnah')}
            className={`min-h-[52px] px-4 py-3 rounded-2xl border text-left transition-colors flex items-center gap-3 cursor-pointer ${
              sourceGroup === 'sunnah'
                ? 'bg-[#D4AF37] border-[#D4AF37] text-[#04180F]'
                : 'bg-[#04180F]/60 border-[#D4AF37]/25 text-[#FAF6EB] hover:border-[#D4AF37]/60'
            }`}
          >
            <ScrollText className="w-5 h-5 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold truncate">
                Duas from the Authentic Sunnah
              </p>
              <p className="text-[11px] opacity-85 tabular-nums">
                {SUNNAH_DUA_ITEMS.length} Prophetic Duas (Hisn al-Muslim)
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#365645] dark:text-[#CEC5AD]" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              sourceGroup === 'quran'
                ? 'Search Quranic Duas by Surah, Rabbana, English, or Urdu...'
                : 'Search Sunnah Duas by topic, Hadith, English, or Urdu...'
            }
            className="w-full min-h-[44px] pl-10 pr-9 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] text-sm text-[#092A1B] dark:text-[#FAF6EB] focus:outline-none focus:border-[#D4AF37]"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[34px] min-w-[34px] flex items-center justify-center text-[#365645] dark:text-[#CEC5AD] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <p className="text-xs font-semibold text-[#B0891E] dark:text-[#D4AF37] tabular-nums">
          Showing {filteredDuas.length} of {activePool.length}{' '}
          {sourceGroup === 'quran' ? 'Quranic Duas' : 'Sunnah Duas'}
        </p>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveCategory('All')}
          className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            activeCategory === 'All'
              ? 'bg-[#D4AF37] text-[#04180F]'
              : 'bg-white dark:bg-[#062115] border border-[#B0891E]/20 dark:border-[#D4AF37]/20 text-[#365645] dark:text-[#CEC5AD]'
          }`}
        >
          All ({activePool.length})
        </button>
        {activeCategories.map((cat) => {
          const catCount = activePool.filter((d) => d.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors tabular-nums cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#D4AF37] text-[#04180F]'
                  : 'bg-white dark:bg-[#062115] border border-[#B0891E]/20 dark:border-[#D4AF37]/20 text-[#365645] dark:text-[#CEC5AD]'
              }`}
            >
              {cat} ({catCount})
            </button>
          );
        })}
      </div>

      {/* Duas List */}
      {filteredDuas.length === 0 ? (
        <div className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#062115] p-8 text-center text-sm text-[#365645] dark:text-[#CEC5AD]">
          No Duas matched your search in this tab.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDuas.map((dua) => {
            const isBookmarked = bookmarkSet.has(dua.id);
            return (
              <article
                key={dua.id}
                className="rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] p-5 sm:p-6 space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-[#B0891E]/15 dark:border-[#D4AF37]/15">
                  <div>
                    <p className="text-xs font-semibold text-[#B0891E] dark:text-[#D4AF37]">
                      {dua.category} · {dua.reference}
                    </p>
                    <h2 className="font-display text-base sm:text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB] mt-0.5">
                      {dua.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() =>
                        onToggleDuaBookmark({
                          key: dua.id,
                          sourceGroup: dua.sourceGroup,
                          title: dua.title,
                          category: dua.category,
                          arabic: dua.arabic,
                          english: dua.english,
                          urdu: dua.urdu,
                          reference: dua.reference,
                        })
                      }
                      className="min-h-[40px] px-3 py-1.5 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-xs font-semibold text-[#092A1B] dark:text-[#F3E5AB] hover:bg-[#D4AF37]/15 inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      {isBookmarked ? (
                        <>
                          <BookmarkCheck className="w-4 h-4 text-[#D4AF37]" />
                          <span>Saved</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-4 h-4" />
                          <span>Bookmark</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

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
                    {dua.arabic}
                  </p>
                )}

                {settings.showTransliteration && dua.transliteration && (
                  <p className="text-xs sm:text-sm italic text-[#B0891E] dark:text-[#D4AF37]/90 leading-relaxed">
                    {dua.transliteration}
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
                      {dua.english}
                    </p>
                  )}
                  {showUrdu && (
                    <p
                      dir="rtl"
                      style={{ fontSize: `${settings.urduFontSize}px` }}
                      className="font-urdu leading-loose text-right text-[#092A1B] dark:text-[#FAF6EB]"
                    >
                      {dua.urdu}
                    </p>
                  )}
                  {showRomanUrdu && (
                    <p
                      style={{ fontSize: `${settings.englishFontSize}px` }}
                      className="leading-relaxed text-[#365645] dark:text-[#F3E5AB]"
                    >
                      {dua.romanUrdu || dua.english}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleCopyOrShare(dua, 'copy')}
                    className="min-h-[38px] px-3 py-1 rounded-xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 text-xs font-medium text-[#365645] dark:text-[#CEC5AD] inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedId === dua.id ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => handleCopyOrShare(dua, 'share')}
                    className="min-h-[38px] px-3 py-1 rounded-xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 text-xs font-medium text-[#365645] dark:text-[#CEC5AD] inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setShareCardPayload({
                        categoryLabel:
                          dua.sourceGroup === 'quran'
                            ? 'Supplication from the Holy Quran'
                            : 'Prophetic Dua · Authentic Sunnah',
                        title: dua.title,
                        arabicText: settings.showArabic ? dua.arabic : undefined,
                        translationText:
                          showRomanUrdu ? dua.romanUrdu || dua.english : dua.english,
                        urduText: showUrdu && dua.urdu ? dua.urdu : undefined,
                        reference: `${dua.category} · ${dua.reference}`,
                        filenameSlug: dua.id,
                      })
                    }
                    className="min-h-[38px] px-3 py-1 rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-xs font-semibold text-[#B0891E] dark:text-[#F3E5AB] hover:bg-[#D4AF37] hover:text-[#09090B] inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Share Card</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <ShareCardModal payload={shareCardPayload} onClose={() => setShareCardPayload(null)} />
    </div>
  );
};
