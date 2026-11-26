import { HadithChapter, HadithCollectionMeta, HadithGrade, HadithItem } from '../types';
import { stripBom } from '../utils/arabic';
import { idbGet, idbSet } from './offlineDb';

export const HADITH_COLLECTIONS: HadithCollectionMeta[] = [
  {
    id: 'bukhari',
    title: 'Sahih al-Bukhari',
    author: 'Imam Muhammad al-Bukhari',
    description: 'The most authentic compilation of Prophetic traditions across 97 books.',
    group: 'kutub_sittah',
    hasUrdu: true,
  },
  {
    id: 'muslim',
    title: 'Sahih Muslim',
    author: 'Imam Muslim ibn al-Hajjaj',
    description: 'Renowned for strict chains of narration and thematic arrangement.',
    group: 'kutub_sittah',
    hasUrdu: true,
  },
  {
    id: 'abudawud',
    title: 'Sunan Abi Dawud',
    author: 'Imam Abu Dawud as-Sijistani',
    description: 'Premier Sunan focused on practical rulings of the Prophetic Sunnah.',
    group: 'kutub_sittah',
    hasUrdu: true,
  },
  {
    id: 'tirmidhi',
    title: "Jami' at-Tirmidhi",
    author: 'Imam Abu Isa at-Tirmidhi',
    description: 'Distinguished by comparative commentary and explicit grading.',
    group: 'kutub_sittah',
    hasUrdu: true,
  },
  {
    id: 'nasai',
    title: "Sunan an-Nasa'i",
    author: "Imam Ahmad an-Nasa'i",
    description: 'Al-Mujtaba, celebrated for meticulous scrutiny of narrators.',
    group: 'kutub_sittah',
    hasUrdu: true,
  },
  {
    id: 'ibnmajah',
    title: 'Sunan Ibn Majah',
    author: 'Imam Muhammad ibn Majah',
    description: 'Sixth canonical book of Kutub al-Sittah with unique chapters.',
    group: 'kutub_sittah',
    hasUrdu: true,
  },
  {
    id: 'malik',
    title: 'Muwatta Malik',
    author: 'Imam Malik ibn Anas',
    description: 'Classical Madinan compendium of authentic Hadith and Athar across 61 books.',
    group: 'curated',
    hasUrdu: true,
  },
  {
    id: 'nawawi',
    title: '40 Hadith Nawawi',
    author: 'Imam Yahya an-Nawawi',
    description: 'Forty-two foundational traditions summarizing the core principles of Islam.',
    group: 'curated',
    hasUrdu: false,
  },
  {
    id: 'qudsi',
    title: '40 Hadith Qudsi',
    author: 'Imam Ibn al-Mulaqqin / Verified Selection',
    description: 'Forty sacred traditions wherein the Prophet ﷺ conveys direct words of Allah.',
    group: 'curated',
    hasUrdu: false,
  },
];

const FAWAZ_BASE = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1';
const INFO_CACHE_KEY = 'tas_fawaz_info_v2';

let fawazInfoCache: Record<string, any> | null = null;
const chaptersCache = new Map<string, HadithChapter[]>();
const chapterHadithsCache = new Map<string, HadithItem[]>();

async function getFawazInfo(): Promise<Record<string, any>> {
  if (fawazInfoCache) return fawazInfoCache;
  try {
    const cached = localStorage.getItem(INFO_CACHE_KEY);
    if (cached) {
      fawazInfoCache = JSON.parse(cached);
      if (fawazInfoCache) return fawazInfoCache;
    }
  } catch {
    // ignore storage read error
  }
  const idbInfo = await idbGet<Record<string, any>>('kv', INFO_CACHE_KEY);
  if (idbInfo) {
    fawazInfoCache = idbInfo;
    return fawazInfoCache;
  }

  const res = await fetch(`${FAWAZ_BASE}/info.json`);
  if (!res.ok) throw new Error('Unable to load verified Hadith collection index.');
  fawazInfoCache = await res.json();
  try {
    localStorage.setItem(INFO_CACHE_KEY, JSON.stringify(fawazInfoCache));
  } catch {
    // ignore quota errors
  }
  void idbSet('kv', INFO_CACHE_KEY, fawazInfoCache);
  return fawazInfoCache!;
}

export async function fetchCollectionChapters(collectionId: string): Promise<HadithChapter[]> {
  if (chaptersCache.has(collectionId)) {
    return chaptersCache.get(collectionId)!;
  }

  const meta = HADITH_COLLECTIONS.find((c) => c.id === collectionId);
  if (!meta) throw new Error(`Unknown Hadith collection: ${collectionId}`);

  const chapterCacheKey = `hadith_chapters_${collectionId}`;
  const idbChapters = await idbGet<HadithChapter[]>('hadiths', chapterCacheKey);
  if (idbChapters && idbChapters.length > 0 && (typeof navigator === 'undefined' || !navigator.onLine)) {
    chaptersCache.set(collectionId, idbChapters);
    return idbChapters;
  }

  let chapters: HadithChapter[] = [];

  if (collectionId === 'nawawi') {
    chapters = [{ id: 'all', number: '1', title: 'All 42 Hadiths', hadithCount: 42 }];
  } else if (collectionId === 'qudsi') {
    chapters = [{ id: 'all', number: '1', title: 'All 40 Hadith Qudsi', hadithCount: 40 }];
  } else {
    const info = await getFawazInfo();
    const bookMeta = info?.[collectionId]?.metadata;
    const sections: Record<string, string> = bookMeta?.sections || {};
    const details: Record<string, any> = bookMeta?.section_details || bookMeta?.section_detail || {};

    chapters = Object.entries(sections)
      .filter(([secKey, secTitle]) => {
        if (secKey === '0' && !String(secTitle || '').trim()) return false;
        const det = details[secKey];
        if (det && det.hadithnumber_first === 0 && det.hadithnumber_last === 0) return false;
        return Boolean(String(secTitle || '').trim() || secKey !== '0');
      })
      .map(([secKey, secTitle]) => {
        const det = details[secKey];
        const count =
          det && typeof det.hadithnumber_last === 'number' && typeof det.hadithnumber_first === 'number'
            ? Math.max(1, det.hadithnumber_last - det.hadithnumber_first + 1)
            : undefined;
        return {
          id: secKey,
          number: secKey,
          title: String(secTitle || '').trim() || `Book ${secKey}`,
          hadithCount: count,
        };
      });
  }

  chaptersCache.set(collectionId, chapters);
  void idbSet('hadiths', chapterCacheKey, chapters);
  return chapters;
}

function defaultGradesForCollection(collectionId: string, rawGrades: any[]): HadithGrade[] {
  if (Array.isArray(rawGrades) && rawGrades.length > 0) {
    const cleaned = rawGrades
      .filter((g) => g?.grade && String(g.grade).trim())
      .map((g) => ({
        scholar: g.name ? String(g.name).trim() : 'Scholar',
        grade: String(g.grade).trim(),
      }));
    if (cleaned.length > 0) return cleaned;
  }
  if (collectionId === 'bukhari' || collectionId === 'muslim') {
    return [{ scholar: 'Consensus', grade: 'Sahih' }];
  }
  if (collectionId === 'malik') {
    return [{ scholar: 'Madinan Compilation', grade: 'Sahih / Mutawatir' }];
  }
  if (collectionId === 'nawawi') {
    return [{ scholar: 'Imam an-Nawawi', grade: 'Sahih / Foundational' }];
  }
  if (collectionId === 'qudsi') {
    return [{ scholar: 'Verified Selection', grade: 'Hadith Qudsi (Sahih / Hasan)' }];
  }
  return [];
}

function buildVerifiedHadithItems(
  collectionId: string,
  meta: HadithCollectionMeta,
  chapterId: string,
  chapterTitle: string,
  enHadiths: any[],
  urHadiths: any[]
): HadithItem[] {
  const urMap = new Map<string, string>();
  for (const h of urHadiths) {
    const num = String(h?.hadithnumber ?? '').trim();
    const txt = stripBom(h?.text || '').trim();
    if (num && txt) {
      urMap.set(num, txt);
    }
  }

  const enMap = new Map<string, any>();
  for (const h of enHadiths) {
    const num = String(h?.hadithnumber ?? '').trim();
    if (num && !enMap.has(num)) {
      enMap.set(num, h);
    }
  }

  const allNumbers = Array.from(new Set([...enMap.keys(), ...urMap.keys()]));
  const items: HadithItem[] = [];

  for (const num of allNumbers) {
    const rawEn = enMap.get(num);
    const englishText = stripBom(rawEn?.text || '').trim();
    const urduText = urMap.get(num) || '';

    // Guarantee NO blank Hadith cards are ever rendered
    if (!englishText && !urduText) continue;

    items.push({
      id: `${collectionId}:${num}`,
      collectionId,
      collectionName: meta.title,
      chapterId,
      chapterTitle,
      hadithNumber: num,
      englishText: englishText || '',
      urduText,
      grades: defaultGradesForCollection(collectionId, rawEn?.grades),
      reference: rawEn?.reference
        ? `Book ${rawEn.reference.book}, Hadith ${rawEn.reference.hadith}`
        : `Hadith ${num}`,
    });
  }

  return items;
}

export async function fetchChapterHadiths(
  collectionId: string,
  chapterId: string,
  chapterTitle: string
): Promise<HadithItem[]> {
  const cacheKey = `${collectionId}:${chapterId}`;
  if (chapterHadithsCache.has(cacheKey)) {
    return chapterHadithsCache.get(cacheKey)!;
  }

  const idbItems = await idbGet<HadithItem[]>('hadiths', cacheKey);
  if (idbItems && idbItems.length > 0) {
    chapterHadithsCache.set(cacheKey, idbItems);
    return idbItems;
  }

  const meta = HADITH_COLLECTIONS.find((c) => c.id === collectionId);
  if (!meta) throw new Error(`Unknown collection: ${collectionId}`);

  let items: HadithItem[] = [];

  if (collectionId === 'nawawi' || collectionId === 'qudsi') {
    const res = await fetch(`${FAWAZ_BASE}/editions/eng-${collectionId}.min.json`);
    if (!res.ok) {
      throw new Error(`Unable to load ${meta.title} (${res.status}).`);
    }
    const enJson = await res.json();
    items = buildVerifiedHadithItems(
      collectionId,
      meta,
      chapterId,
      chapterTitle,
      enJson?.hadiths || [],
      []
    );
  } else {
    const [enRes, urRes] = await Promise.all([
      fetch(`${FAWAZ_BASE}/editions/eng-${collectionId}/sections/${chapterId}.min.json`),
      meta.hasUrdu
        ? fetch(`${FAWAZ_BASE}/editions/urd-${collectionId}/sections/${chapterId}.min.json`).catch(
            () => null
          )
        : Promise.resolve(null),
    ]);

    if (!enRes.ok) {
      throw new Error(`Unable to fetch Book ${chapterId} of ${meta.title}.`);
    }

    const enJson = await enRes.json();
    const urJson = urRes && urRes.ok ? await urRes.json() : { hadiths: [] };

    items = buildVerifiedHadithItems(
      collectionId,
      meta,
      chapterId,
      chapterTitle,
      enJson?.hadiths || [],
      urJson?.hadiths || []
    );
  }

  chapterHadithsCache.set(cacheKey, items);
  void idbSet('hadiths', cacheKey, items);
  return items;
}
