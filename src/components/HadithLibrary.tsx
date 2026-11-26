import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Image as ImageIcon,
  RefreshCw,
  ScrollText,
  Search,
  Share2,
  X,
} from 'lucide-react';
import {
  fetchChapterHadiths,
  fetchCollectionChapters,
  HADITH_COLLECTIONS,
} from '../services/hadithApi';
import {
  DailyHabitRecord,
  HadithBookmark,
  HadithChapter,
  HadithCollectionMeta,
  HadithItem,
  ReaderSettings,
} from '../types';
import { getLanguageFlags } from '../utils/languageDisplay';
import { ShareCardPayload } from '../utils/shareCardGenerator';
import { ShareCardModal } from './ShareCardModal';

const HADITH_PAGE_SIZE = 20;

interface HadithLibraryProps {
  initialCollectionId: string | null;
  onClearInitialCollection: () => void;
  settings: ReaderSettings;
  todayRecord: DailyHabitRecord;
  hadithBookmarks: HadithBookmark[];
  onToggleHadithBookmark: (b: Omit<HadithBookmark, 'savedAt'>) => void;
  onToggleHadithRead: (hadithKey: string) => void;
}

export const HadithLibrary: React.FC<HadithLibraryProps> = ({
  initialCollectionId,
  onClearInitialCollection,
  settings,
  todayRecord,
  hadithBookmarks,
  onToggleHadithBookmark,
  onToggleHadithRead,
}) => {
  const [selectedCollection, setSelectedCollection] = useState<HadithCollectionMeta | null>(() =>
    initialCollectionId ? HADITH_COLLECTIONS.find((c) => c.id === initialCollectionId) || null : null
  );
  const [chapters, setChapters] = useState<HadithChapter[]>([]);
  const [chaptersLoading, setChaptersLoading] = useState(false);
  const [chaptersError, setChaptersError] = useState<string | null>(null);

  const [selectedChapter, setSelectedChapter] = useState<HadithChapter | null>(null);
  const [hadiths, setHadiths] = useState<HadithItem[]>([]);
  const [hadithsLoading, setHadithsLoading] = useState(false);
  const [hadithsError, setHadithsError] = useState<string | null>(null);

  const [chapterSearch, setChapterSearch] = useState('');
  const [hadithSearch, setHadithSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [shareCardPayload, setShareCardPayload] = useState<ShareCardPayload | null>(null);

  const { showEnglish, showUrdu, showRomanUrdu } = getLanguageFlags(settings.translationDisplay);

  useEffect(() => {
    if (initialCollectionId) {
      const found = HADITH_COLLECTIONS.find((c) => c.id === initialCollectionId) || null;
      setSelectedCollection(found);
      setSelectedChapter(null);
      onClearInitialCollection();
    }
  }, [initialCollectionId, onClearInitialCollection]);

  const loadChapters = useCallback(async (col: HadithCollectionMeta) => {
    setChaptersLoading(true);
    setChaptersError(null);
    setSelectedChapter(null);
    setHadiths([]);
    try {
      const list = await fetchCollectionChapters(col.id);
      setChapters(list);
      if (list.length === 1) {
        setSelectedChapter(list[0]);
      }
    } catch (e) {
      setChaptersError(e instanceof Error ? e.message : 'Unable to load chapters.');
    } finally {
      setChaptersLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedCollection) {
      loadChapters(selectedCollection);
    }
  }, [selectedCollection, loadChapters]);

  const loadChapterHadiths = useCallback(async (colId: string, ch: HadithChapter) => {
    setHadithsLoading(true);
    setHadithsError(null);
    setHadithSearch('');
    setCurrentPage(1);
    try {
      const list = await fetchChapterHadiths(colId, ch.id, ch.title);
      setHadiths(list);
    } catch (e) {
      setHadithsError(e instanceof Error ? e.message : 'Unable to load Hadiths.');
    } finally {
      setHadithsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedCollection && selectedChapter) {
      loadChapterHadiths(selectedCollection.id, selectedChapter);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedCollection, selectedChapter, loadChapterHadiths]);

  const filteredChapters = useMemo(() => {
    if (!chapterSearch.trim()) return chapters;
    const q = chapterSearch.trim().toLowerCase();
    return chapters.filter(
      (c) => c.title.toLowerCase().includes(q) || c.number.includes(q)
    );
  }, [chapters, chapterSearch]);

  const filteredHadiths = useMemo(() => {
    if (!hadithSearch.trim()) return hadiths;
    const q = hadithSearch.trim().toLowerCase();
    return hadiths.filter(
      (h) =>
        h.englishText.toLowerCase().includes(q) ||
        h.urduText.includes(hadithSearch.trim()) ||
        h.hadithNumber.toLowerCase().includes(q) ||
        (h.narrator && h.narrator.toLowerCase().includes(q))
    );
  }, [hadiths, hadithSearch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [hadithSearch]);

  const totalPages = Math.max(1, Math.ceil(filteredHadiths.length / HADITH_PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedHadiths = useMemo(() => {
    const start = (safePage - 1) * HADITH_PAGE_SIZE;
    return filteredHadiths.slice(start, start + HADITH_PAGE_SIZE);
  }, [filteredHadiths, safePage]);

  const visiblePageNumbers = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: number[] = [1];
    const start = Math.max(2, safePage - 1);
    const end = Math.min(totalPages - 1, safePage + 1);
    if (start > 2) pages.push(-1);
    for (let p = start; p <= end; p++) pages.push(p);
    if (end < totalPages - 1) pages.push(-2);
    pages.push(totalPages);
    return pages;
  }, [safePage, totalPages]);

  const handleChangePage = (nextPage: number) => {
    const clamped = Math.max(1, Math.min(totalPages, nextPage));
    setCurrentPage(clamped);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const readSet = useMemo(() => new Set(todayRecord.hadithsReadIds), [todayRecord.hadithsReadIds]);
  const bookmarkSet = useMemo(() => new Set(hadithBookmarks.map((b) => b.key)), [hadithBookmarks]);

  const handleCopyOrShare = async (item: HadithItem, mode: 'copy' | 'share') => {
    const parts: string[] = [];
    if (item.narrator) parts.push(item.narrator);
    if (item.englishText) parts.push(item.englishText);
    if (item.urduText) parts.push(item.urduText);
    const text = `${parts.join('\n\n')}\n— ${item.collectionName} (${item.reference || item.hadithNumber})`;
    if (mode === 'share' && navigator.share) {
      try {
        await navigator.share({ title: `${item.collectionName} #${item.hadithNumber}`, text });
        return;
      } catch {
        // fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(item.id);
      window.setTimeout(() => setCopiedId((c) => (c === item.id ? null : c)), 1800);
    } catch {
      // ignore
    }
  };

  // LEVEL 3: HADITH READER INSIDE A CHAPTER (ENGLISH & URDU ONLY — NO ARABIC)
  if (selectedCollection && selectedChapter) {
    return (
      <div className="space-y-5 pb-20 lg:pb-12">
        {/* Sticky Top Fast-Navigation & Filter Bar */}
        <div className="sticky top-12 lg:top-0 z-20 rounded-2xl border border-[#D4AF37]/35 bg-white/95 dark:bg-[#062115]/95 backdrop-blur-md p-3.5 sm:p-4 shadow-lg space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                type="button"
                onClick={() => {
                  if (chapters.length <= 1) {
                    setSelectedCollection(null);
                  } else {
                    setSelectedChapter(null);
                  }
                }}
                className="min-h-[40px] px-3 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-xs font-semibold text-[#092A1B] dark:text-[#FAF6EB] hover:bg-[#D4AF37]/15 inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{chapters.length <= 1 ? 'Collections' : 'Chapters'}</span>
              </button>
              <div className="min-w-0">
                <h2 className="font-display text-sm sm:text-base font-bold text-[#092A1B] dark:text-[#FAF6EB] truncate">
                  {selectedCollection.title} · {selectedChapter.title}
                </h2>
                <p className="text-[11px] sm:text-xs text-[#365645] dark:text-[#CEC5AD] tabular-nums">
                  {filteredHadiths.length} of {hadiths.length} narrations
                  {totalPages > 1 ? ` · Page ${safePage} of ${totalPages}` : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Sleek Single-Row Navigation & Filter Bar: Chapter Dropdown + Keyword Search */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
            {chapters.length > 1 && (
              <div className="sm:col-span-5">
                <label className="sr-only" htmlFor="hadith-chapter-jump">
                  Switch Book or Chapter
                </label>
                <select
                  id="hadith-chapter-jump"
                  value={selectedChapter.id}
                  onChange={(e) => {
                    const next = chapters.find((c) => c.id === e.target.value);
                    if (next) setSelectedChapter(next);
                  }}
                  className="w-full min-h-[42px] px-3 rounded-xl border border-[#B0891E]/30 dark:border-[#D4AF37]/30 bg-[#F9F6EE] dark:bg-[#04180F] text-xs font-semibold text-[#092A1B] dark:text-[#F3E5AB] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                >
                  {chapters.map((ch) => (
                    <option key={ch.id} value={ch.id}>
                      Book {ch.number}: {ch.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className={`relative ${chapters.length > 1 ? 'sm:col-span-7' : 'sm:col-span-12'}`}>
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#365645] dark:text-[#CEC5AD]" />
              <input
                type="text"
                value={hadithSearch}
                onChange={(e) => setHadithSearch(e.target.value)}
                placeholder="Search by keyword, narrator, or Hadith number..."
                aria-label="Search narrations in this chapter"
                className="w-full min-h-[42px] pl-9 pr-9 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-[#F9F6EE] dark:bg-[#04180F] text-xs sm:text-sm text-[#092A1B] dark:text-[#FAF6EB] focus:outline-none focus:border-[#D4AF37]"
              />
              {hadithSearch && (
                <button
                  type="button"
                  onClick={() => setHadithSearch('')}
                  aria-label="Clear Hadith search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg flex items-center justify-center text-[#365645] dark:text-[#CEC5AD] hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {((!selectedCollection.hasUrdu && showUrdu) || showRomanUrdu) && (
          <div className="rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2.5 text-xs text-[#092A1B] dark:text-[#F3E5AB]">
            {showRomanUrdu
              ? `Certified Roman Urdu edition is not published in the verified Hadith archive for ${selectedCollection.title}; displaying verified English narrations.`
              : `Urdu edition is not published in the verified archive for ${selectedCollection.title}; displaying verified English narrations.`}
          </div>
        )}

        {hadithsLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#D4AF37]/15 bg-white dark:bg-[#062115] p-6 animate-pulse space-y-4"
              >
                <div className="h-4 bg-[#F2EDE0] dark:bg-[#0A3321] rounded w-1/3" />
                <div className="h-4 bg-[#F2EDE0] dark:bg-[#0A3321] rounded w-full" />
                <div className="h-4 bg-[#F2EDE0] dark:bg-[#0A3321] rounded w-5/6" />
              </div>
            ))}
          </div>
        ) : hadithsError ? (
          <div className="rounded-2xl border border-[#D4AF37]/30 bg-white dark:bg-[#062115] p-6 text-center space-y-3">
            <p className="text-sm text-[#365645] dark:text-[#CEC5AD]">{hadithsError}</p>
            <button
              onClick={() => loadChapterHadiths(selectedCollection.id, selectedChapter)}
              className="min-h-[44px] px-5 py-2 rounded-xl bg-[#D4AF37] text-[#04180F] text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Retry Chapter
            </button>
          </div>
        ) : filteredHadiths.length === 0 ? (
          <div className="rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#062115] p-8 text-center text-sm text-[#365645] dark:text-[#CEC5AD]">
            No Hadiths matched your search query in this chapter.
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedHadiths.map((item) => {
              const isRead = readSet.has(item.id);
              const isBookmarked = bookmarkSet.has(item.id);
              const hasUrduForItem = Boolean(item.urduText && item.urduText.trim().length > 0);
              const hasEnglishForItem = Boolean(item.englishText && item.englishText.trim().length > 0);
              const displayUrdu = showUrdu && hasUrduForItem;
              const displayEnglish =
                ((showEnglish || showRomanUrdu) && hasEnglishForItem) ||
                (!displayUrdu && hasEnglishForItem);
              const fellBackToEnglish =
                showUrdu && !hasUrduForItem && hasEnglishForItem && !showEnglish;

              return (
                <article
                  key={item.id}
                  className={`rounded-2xl border p-5 sm:p-6 transition-all ${
                    isRead
                      ? 'border-[#D4AF37]/50 bg-[#D4AF37]/[0.05] dark:bg-[#0A3321]/70'
                      : 'border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#062115]'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#B0891E]/10 dark:border-[#D4AF37]/10">
                    <div className="text-xs text-[#365645] dark:text-[#CEC5AD] tabular-nums">
                      <strong className="text-[#092A1B] dark:text-[#FAF6EB]">
                        Hadith #{item.hadithNumber}
                      </strong>
                      {item.reference ? ` · ${item.reference}` : ''}
                      {item.grades.length > 0 && (
                        <>
                          {' · '}
                          <span className="text-[#B0891E] dark:text-[#F3E5AB] font-semibold">
                            {item.grades
                              .map((g) => `${g.grade}${g.scholar ? ` (${g.scholar})` : ''}`)
                              .join(' · ')}
                          </span>
                        </>
                      )}
                    </div>

                    <button
                      onClick={() => onToggleHadithRead(item.id)}
                      className={`min-h-[36px] px-3 py-1 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isRead
                          ? 'bg-[#D4AF37] text-[#04180F]'
                          : 'border border-[#D4AF37]/30 text-[#092A1B] dark:text-[#F3E5AB] hover:bg-[#D4AF37]/15'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isRead ? 'Read Today' : 'Mark Read'}</span>
                    </button>
                  </div>

                  {/* English & Urdu (NO Arabic in Hadith) */}
                  <div
                    className={`mt-4 gap-6 items-start ${
                      displayEnglish && displayUrdu
                        ? 'grid grid-cols-1 lg:grid-cols-2'
                        : 'space-y-3'
                    }`}
                  >
                    {displayEnglish && (
                      <div className="space-y-2">
                        {fellBackToEnglish && (
                          <p className="text-[11px] font-medium text-[#B0891E] dark:text-[#D4AF37]">
                            Urdu edition unavailable for this narration — displaying verified English:
                          </p>
                        )}
                        {item.narrator && (
                          <p className="text-xs font-semibold text-[#B0891E] dark:text-[#D4AF37]">
                            {item.narrator}
                          </p>
                        )}
                        <p
                          style={{ fontSize: `${settings.englishFontSize}px` }}
                          className="leading-relaxed text-[#092A1B] dark:text-[#FAF6EB] whitespace-pre-line"
                        >
                          {item.englishText}
                        </p>
                      </div>
                    )}

                    {displayUrdu && (
                      <div
                        className={`space-y-3 ${
                          displayEnglish
                            ? 'lg:border-l lg:border-[#B0891E]/15 dark:lg:border-[#D4AF37]/15 lg:pl-6'
                            : ''
                        }`}
                      >
                        <p
                          dir="rtl"
                          style={{ fontSize: `${settings.urduFontSize}px` }}
                          className="font-urdu leading-loose text-right text-[#092A1B] dark:text-[#F3E5AB] whitespace-pre-line"
                        >
                          {item.urduText}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#B0891E]/10 dark:border-[#D4AF37]/10 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() =>
                        onToggleHadithBookmark({
                          key: item.id,
                          collectionId: item.collectionId,
                          collectionName: item.collectionName,
                          hadithNumber: item.hadithNumber,
                          chapterTitle: item.chapterTitle,
                          englishText: item.englishText,
                          urduText: item.urduText,
                          gradeSummary: item.grades.map((g) => g.grade).join(' · '),
                        })
                      }
                      className="min-h-[40px] px-3 py-1.5 rounded-xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 text-xs font-medium text-[#365645] dark:text-[#CEC5AD] hover:text-[#092A1B] dark:hover:text-[#FAF6EB] inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      {isBookmarked ? (
                        <>
                          <BookmarkCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Saved</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-3.5 h-3.5" />
                          <span>Bookmark</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleCopyOrShare(item, 'copy')}
                      className="min-h-[40px] px-3 py-1.5 rounded-xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 text-xs font-medium text-[#365645] dark:text-[#CEC5AD] hover:text-[#092A1B] dark:hover:text-[#FAF6EB] inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      onClick={() => handleCopyOrShare(item, 'share')}
                      className="min-h-[40px] px-3 py-1.5 rounded-xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 text-xs font-medium text-[#365645] dark:text-[#CEC5AD] hover:text-[#092A1B] dark:hover:text-[#FAF6EB] inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setShareCardPayload({
                          categoryLabel: 'Sahih Hadith · Authentic Narration',
                          title: `${item.collectionName} · #${item.hadithNumber}`,
                          translationText: item.englishText || item.urduText,
                          urduText: showUrdu && item.urduText ? item.urduText : undefined,
                          reference: `${item.collectionName} (${item.reference || `#${item.hadithNumber}`})`,
                          filenameSlug: `${item.collectionId}-${item.hadithNumber}`,
                        })
                      }
                      className="min-h-[40px] px-3 py-1.5 rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-xs font-semibold text-[#B0891E] dark:text-[#F3E5AB] hover:bg-[#D4AF37] hover:text-[#09090B] inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Share Card</span>
                    </button>
                  </div>
                </article>
              );
            })}

            {/* Clean Pagination Bar (20 Hadiths per Page) */}
            {totalPages > 1 && (
              <nav
                aria-label="Hadith Pagination"
                className="pt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] p-3.5"
              >
                <button
                  type="button"
                  onClick={() => handleChangePage(safePage - 1)}
                  disabled={safePage <= 1}
                  className="min-h-[40px] px-3.5 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 text-xs font-semibold text-[#092A1B] dark:text-[#FAF6EB] disabled:opacity-40 inline-flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex flex-wrap items-center gap-1.5">
                  {visiblePageNumbers.map((pg) =>
                    pg < 0 ? (
                      <span
                        key={`ellipsis-${pg}`}
                        className="px-2 text-xs text-[#365645] dark:text-[#CEC5AD]"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={pg}
                        type="button"
                        onClick={() => handleChangePage(pg)}
                        className={`min-h-[36px] min-w-[36px] px-2.5 rounded-xl text-xs font-bold tabular-nums cursor-pointer transition-colors ${
                          pg === safePage
                            ? 'bg-[#D4AF37] text-[#09090B]'
                            : 'border border-[#B0891E]/20 dark:border-[#D4AF37]/20 text-[#365645] dark:text-[#CEC5AD] hover:border-[#D4AF37]'
                        }`}
                      >
                        {pg}
                      </button>
                    )
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleChangePage(safePage + 1)}
                  disabled={safePage >= totalPages}
                  className="min-h-[40px] px-3.5 rounded-xl bg-[#D4AF37] text-[#09090B] text-xs font-bold disabled:opacity-40 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Next Page</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </nav>
            )}
          </div>
        )}

        <ShareCardModal payload={shareCardPayload} onClose={() => setShareCardPayload(null)} />
      </div>
    );
  }

  // LEVEL 2: CHAPTER DIRECTORY FOR SELECTED COLLECTION
  if (selectedCollection) {
    return (
      <div className="space-y-6 pb-8">
        <div className="theme-hero rounded-3xl border border-[#D4AF37]/30 text-[#FAF6EB] p-6">
          <button
            onClick={() => setSelectedCollection(null)}
            className="min-h-[36px] px-3 py-1 rounded-xl border border-[#D4AF37]/35 text-xs font-semibold text-[#F3E5AB] hover:bg-white/10 inline-flex items-center gap-1.5 mb-3 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Hadith Collections</span>
          </button>
          <h1 className="font-display text-2xl font-bold">{selectedCollection.title}</h1>
          <p className="text-xs sm:text-sm text-[#CEC5AD] mt-1">
            {selectedCollection.author} · {selectedCollection.description}
          </p>
        </div>

        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#365645] dark:text-[#CEC5AD]" />
          <input
            type="search"
            value={chapterSearch}
            onChange={(e) => setChapterSearch(e.target.value)}
            placeholder="Filter books & chapters..."
            className="w-full min-h-[44px] pl-10 pr-4 rounded-xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] text-sm text-[#092A1B] dark:text-[#FAF6EB] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {chaptersLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-20 rounded-2xl border border-[#D4AF37]/15 bg-white dark:bg-[#062115] animate-pulse"
              />
            ))}
          </div>
        ) : chaptersError ? (
          <div className="rounded-2xl border border-[#D4AF37]/30 bg-white dark:bg-[#062115] p-6 text-center space-y-3">
            <p className="text-sm text-[#365645] dark:text-[#CEC5AD]">{chaptersError}</p>
            <button
              onClick={() => loadChapters(selectedCollection)}
              className="min-h-[44px] px-5 py-2 rounded-xl bg-[#D4AF37] text-[#04180F] text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Retry Chapters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredChapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setSelectedChapter(ch)}
                className="group text-left rounded-2xl border border-[#B0891E]/20 dark:border-[#D4AF37]/20 bg-white dark:bg-[#062115] hover:border-[#D4AF37] p-4 transition-colors flex items-center justify-between gap-3 cursor-pointer"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#B0891E] dark:text-[#D4AF37] tabular-nums">
                    Book {ch.number}
                    {ch.hadithCount ? ` · ${ch.hadithCount} narrations` : ''}
                  </p>
                  <h3 className="text-sm font-semibold text-[#092A1B] dark:text-[#FAF6EB] mt-0.5 line-clamp-2 group-hover:text-[#B0891E] dark:group-hover:text-[#F3E5AB]">
                    {ch.title}
                  </h3>
                </div>
                <ChevronRight className="w-4 h-4 text-[#B0891E] dark:text-[#D4AF37] shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // LEVEL 1: 9 VERIFIED HADITH COLLECTIONS LIBRARY (ENGLISH, URDU & ROMAN URDU)
  const kutubSittah = HADITH_COLLECTIONS.filter((c) => c.group === 'kutub_sittah');
  const curated = HADITH_COLLECTIONS.filter((c) => c.group === 'curated');

  return (
    <div className="space-y-8 pb-8">
      <section className="theme-hero rounded-3xl border border-[#D4AF37]/30 text-[#FAF6EB] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold">
            Authentic Hadith Collections
          </h1>
          <p className="text-xs sm:text-sm text-[#CEC5AD] mt-1">
            9 Verified Collections · Al-Kutub al-Sittah &amp; Curated Compendiums in English, Urdu &amp; Roman Urdu with authenticity gradings
          </p>
        </div>
        <div className="text-right tabular-nums shrink-0">
          <p className="text-xs text-[#F3E5AB]">Today&apos;s Hadiths Read</p>
          <p className="text-2xl font-bold">{todayRecord.hadithsReadIds.length}</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB]">
          Al-Kutub al-Sittah · The Six Canonical Books
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kutubSittah.map((col) => (
            <CollectionCard key={col.id} col={col} onSelect={() => setSelectedCollection(col)} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-lg font-bold text-[#092A1B] dark:text-[#FAF6EB]">
          Curated Compendiums
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {curated.map((col) => (
            <CollectionCard key={col.id} col={col} onSelect={() => setSelectedCollection(col)} />
          ))}
        </div>
      </section>
    </div>
  );
};

const CollectionCard: React.FC<{ col: HadithCollectionMeta; onSelect: () => void }> = ({
  col,
  onSelect,
}) => (
  <button
    onClick={onSelect}
    className="group text-left rounded-2xl border border-[#B0891E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#062115] hover:border-[#D4AF37] p-5 transition-colors flex flex-col justify-between gap-4 cursor-pointer"
  >
    <div>
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-base font-bold text-[#092A1B] dark:text-[#FAF6EB] group-hover:text-[#B0891E] dark:group-hover:text-[#F3E5AB]">
          {col.title}
        </h3>
        <span className="text-[11px] font-semibold text-[#B0891E] dark:text-[#D4AF37] shrink-0">
          {col.hasUrdu ? 'EN + اردو' : 'English'}
        </span>
      </div>
      <p className="text-xs text-[#B0891E] dark:text-[#D4AF37] mt-0.5">{col.author}</p>
    </div>
    <p className="text-xs sm:text-sm text-[#365645] dark:text-[#CEC5AD] leading-relaxed">
      {col.description}
    </p>
    <div className="flex items-center justify-between pt-2 border-t border-[#B0891E]/10 dark:border-[#D4AF37]/10 text-xs font-semibold text-[#B0891E] dark:text-[#D4AF37]">
      <span className="inline-flex items-center gap-1.5">
        <ScrollText className="w-3.5 h-3.5" />
        Explore Books
      </span>
      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
    </div>
  </button>
);
