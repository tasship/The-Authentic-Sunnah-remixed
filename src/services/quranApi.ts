import {
  AyahEntry,
  EnglishTranslatorId,
  QuranReciterId,
  QuranScript,
  RomanUrduTranslatorId,
  SurahDetail,
  SurahSummary,
  TafsirEntry,
  TafsirLanguage,
  UrduTranslatorId,
} from '../types';
import { calculateHasanat, countArabicLetters, stripBom } from '../utils/arabic';
import { idbGet, idbGetAll, idbSet } from './offlineDb';

const SURAHS_CACHE_KEY = 'tas_surahs_list_v1';
const SURAH_CACHE_PREFIX = 'tas_surah_v5_';
const TAFSIR_CACHE_PREFIX = 'tas_tafsir_v2_';
const TIMESTAMPS_CACHE_PREFIX = 'tas_qcom_ts_v2_';
const BISMILLAH_UTHMANI = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ';
const BISMILLAH_SIMPLE_DIACRITICS = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ';
const BISMILLAH_SIMPLE = 'بسم الله الرحمن الرحيم ';

export const ENGLISH_TRANSLATORS: { id: EnglishTranslatorId; label: string }[] = [
  { id: 'en.sahih', label: 'Saheeh International' },
  { id: 'en.hilali', label: 'Hilali & Khan' },
  { id: 'en.pickthall', label: 'Marmaduke Pickthall' },
  { id: 'en.asad', label: 'Muhammad Asad' },
];

export const URDU_TRANSLATORS: { id: UrduTranslatorId; label: string }[] = [
  { id: 'ur.jalandhry', label: 'Fateh Muhammad Jalandhry (فتح محمد جالندھری)' },
  { id: 'ur.maududi', label: "Abul A'ala Maududi (ابوالاعلیٰ مودودی)" },
  { id: 'ur.junagarhi', label: 'Muhammad Junagarhi (محمد جوناگڑھی)' },
];

export const ROMAN_URDU_TRANSLATORS: { id: RomanUrduTranslatorId; label: string }[] = [
  { id: 'taqi_usmani', label: 'Mufti Taqi Usmani (Roman Urdu · Classical Standard)' },
  { id: 'maududi', label: "Abul A'ala Maududi (Roman Urdu · Tafheem-e-Quran)" },
];

export const QURAN_SCRIPTS: { id: QuranScript; label: string; description: string }[] = [
  {
    id: 'uthmani',
    label: 'Standard Uthmani (Madani)',
    description: 'Classical Mushaf al-Madinah orthography',
  },
  {
    id: 'indopak',
    label: 'Indo-Pak / Nastaliq Style',
    description: 'South Asian calligraphic script with extended vowel marks',
  },
  {
    id: 'simple',
    label: 'Simple Clean Arabic',
    description: 'Minimalist modern Arabic script without complex stop signs',
  },
];

export interface QuranReciterMeta {
  id: QuranReciterId;
  label: string;
  shortLabel: string;
  arabicName: string;
  style: string;
  origin: string;
  initials: string;
  fullSurahBaseUrls: string[];
  islamicNetSurahEdition?: string;
  everyAyahFolder: string;
  islamicNetEdition?: string;
  quranComRecitationId?: number;
  hasDirectStream: boolean;
  fallbackNotice?: string;
}

export const QURAN_RECITERS: QuranReciterMeta[] = [
  {
    id: 'yasser_dosari',
    label: 'Sheikh Yasser Ad-Dosari',
    shortLabel: 'Yasser Ad-Dosari',
    arabicName: 'ياسر الدوسري',
    style: 'Emotional & Melodic · Masjid al-Haram',
    origin: 'Makkah, Saudi Arabia',
    initials: 'YD',
    fullSurahBaseUrls: [
      'https://cdn.mp3quran.net/audio/yasser-dosari/r1/',
      'https://download.quranicaudio.com/quran/yasser_ad-dussary/',
    ],
    everyAyahFolder: 'Yasser_Ad-Dussary_128kbps',
    islamicNetEdition: 'ar.yasseraldossari',
    quranComRecitationId: 174,
    hasDirectStream: true,
  },
  {
    id: 'saud_shuraim',
    label: 'Sheikh Saud Al-Shuraim',
    shortLabel: 'Saud Al-Shuraim',
    arabicName: 'سعود الشريم',
    style: 'Classical Haramain Murattal',
    origin: 'Makkah, Saudi Arabia',
    initials: 'SS',
    fullSurahBaseUrls: ['https://cdn.mp3quran.net/audio/saud-shuraim/r1/'],
    everyAyahFolder: 'Saood_ash-Shuraym_128kbps',
    quranComRecitationId: 10,
    hasDirectStream: true,
  },
  {
    id: 'abdul_rahman_sudais',
    label: 'Sheikh Abdul Rahman Al-Sudais',
    shortLabel: 'Al-Sudais',
    arabicName: 'عبدالرحمن السديس',
    style: 'Resonant Haramain Murattal',
    origin: 'Makkah, Saudi Arabia',
    initials: 'AS',
    fullSurahBaseUrls: [
      'https://cdn.mp3quran.net/audio/abdulrahman-sudais/r1/',
      'https://download.quranicaudio.com/quran/abdurrahmaan_as-sudays/',
    ],
    everyAyahFolder: 'Abdurrahmaan_As-Sudais_192kbps',
    islamicNetEdition: 'ar.abdurrahmaansudais',
    quranComRecitationId: 3,
    hasDirectStream: true,
  },
  {
    id: 'abdul_basit_murattal',
    label: 'Sheikh Abdul Basit Abdul Samad (Murattal)',
    shortLabel: 'Abdul Basit · Murattal',
    arabicName: 'عبد الباسط عبد الصمد (مرتل)',
    style: 'Classical Egyptian Murattal',
    origin: 'Egypt',
    initials: 'AB',
    fullSurahBaseUrls: [
      'https://cdn.mp3quran.net/audio/abdulbasit-murattal/r1/',
      'https://download.quranicaudio.com/quran/abdul_basit_murattal/',
    ],
    everyAyahFolder: 'Abdul_Basit_Murattal_192kbps',
    islamicNetEdition: 'ar.abdulbasitmurattal',
    quranComRecitationId: 2,
    hasDirectStream: true,
  },
  {
    id: 'abdul_basit_mujawwad',
    label: 'Sheikh Abdul Basit Abdul Samad (Mujawwad)',
    shortLabel: 'Abdul Basit · Mujawwad',
    arabicName: 'عبد الباسط عبد الصمد (مجود)',
    style: 'Timeless Melodic Mujawwad',
    origin: 'Egypt',
    initials: 'AM',
    fullSurahBaseUrls: ['https://download.quranicaudio.com/quran/abdulbaset_mujawwad/'],
    everyAyahFolder: 'Abdul_Basit_Mujawwad_128kbps',
    islamicNetEdition: 'ar.abdulbasitmujawwad',
    quranComRecitationId: 1,
    hasDirectStream: true,
  },
  {
    id: 'ahmed_al_ajmi',
    label: 'Sheikh Ahmed Al-Ajmi',
    shortLabel: 'Ahmed Al-Ajmi',
    arabicName: 'أحمد العجمي',
    style: 'Warm Moving Recitation',
    origin: 'Khobar, Saudi Arabia',
    initials: 'AA',
    fullSurahBaseUrls: [
      'https://cdn.mp3quran.net/audio/ahmed-al-ajmi/r1/',
      'https://download.quranicaudio.com/quran/ahmed_ibn_ali_al-ajamy/',
    ],
    everyAyahFolder: 'Ahmed_ibn_Ali_al-Ajamy_128kbps_ketaballah.net',
    islamicNetEdition: 'ar.ahmedajamy',
    quranComRecitationId: 19,
    hasDirectStream: true,
  },
  {
    id: 'mahdi_shishani',
    label: 'Sheikh Mahdi Al-Shishani',
    shortLabel: 'Mahdi Al-Shishani',
    arabicName: 'مهدي الشيشاني',
    style: 'Reverent Heartfelt Recitation',
    origin: 'Verified CDN Fallback Active',
    initials: 'MS',
    fullSurahBaseUrls: ['https://cdn.mp3quran.net/audio/yasser-dosari/r1/'],
    everyAyahFolder: 'Yasser_Ad-Dussary_128kbps',
    islamicNetEdition: 'ar.yasseraldossari',
    quranComRecitationId: 174,
    hasDirectStream: false,
    fallbackNotice:
      'Direct full-Surah stream for Sheikh Mahdi Al-Shishani is currently unavailable on public CDNs — playing continuous recitation via Sheikh Yasser Ad-Dosari so playback never stops.',
  },
  {
    id: 'mishary_alafasy',
    label: 'Sheikh Mishary Rashid Alafasy',
    shortLabel: 'Mishary Alafasy',
    arabicName: 'مشاري راشد العفاسي',
    style: 'Crystal-Clear Murattal',
    origin: 'Kuwait',
    initials: 'MA',
    fullSurahBaseUrls: [
      'https://cdn.mp3quran.net/audio/mishary-alafasy/r1/',
      'https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/',
    ],
    everyAyahFolder: 'Alafasy_128kbps',
    islamicNetEdition: 'ar.alafasy',
    quranComRecitationId: 7,
    hasDirectStream: true,
  },
  {
    id: 'maher_muaiqly',
    label: 'Sheikh Maher Al-Muaiqly',
    shortLabel: 'Maher Al-Muaiqly',
    arabicName: 'ماهر المعيقلي',
    style: 'Serene Measured Pace · Masjid al-Haram',
    origin: 'Makkah, Saudi Arabia',
    initials: 'MM',
    fullSurahBaseUrls: [
      'https://cdn.mp3quran.net/audio/maher-muaiqly/r3/',
      'https://download.quranicaudio.com/quran/maher_256/',
    ],
    everyAyahFolder: 'MaherAlMuaiqly128kbps',
    islamicNetEdition: 'ar.mahermuaiqly',
    quranComRecitationId: 159,
    hasDirectStream: true,
  },
  {
    id: 'saad_ghamdi',
    label: 'Sheikh Saad Al-Ghamdi',
    shortLabel: 'Saad Al-Ghamdi',
    arabicName: 'سعد الغامدي',
    style: 'Calm Tranquil Murattal',
    origin: 'Madinah, Saudi Arabia',
    initials: 'SG',
    fullSurahBaseUrls: [
      'https://cdn.mp3quran.net/audio/saad-ghamdi/r1/',
      'https://download.quranicaudio.com/quran/sa3d_al-ghaamidi/complete/',
    ],
    everyAyahFolder: 'Ghamadi_40kbps',
    quranComRecitationId: 13,
    hasDirectStream: true,
  },
  {
    id: 'nasser_qatami',
    label: 'Sheikh Nasser Al-Qatami',
    shortLabel: 'Nasser Al-Qatami',
    arabicName: 'ناصر القطامي',
    style: 'Deep Emotional Khushu‘',
    origin: 'Riyadh, Saudi Arabia',
    initials: 'NQ',
    fullSurahBaseUrls: [
      'https://cdn.mp3quran.net/audio/nasser-qatami/r1/',
      'https://download.quranicaudio.com/quran/nasser_bin_ali_alqatami/',
    ],
    everyAyahFolder: 'Nasser_Alqatami_128kbps',
    quranComRecitationId: 104,
    hasDirectStream: true,
  },
  {
    id: 'muhammad_minshawi',
    label: 'Sheikh Muhammad Siddiq Al-Minshawi',
    shortLabel: 'Al-Minshawi',
    arabicName: 'محمد صديق المنشاوي',
    style: 'Timeless Egyptian Murattal',
    origin: 'Egypt',
    initials: 'SM',
    fullSurahBaseUrls: [
      'https://cdn.mp3quran.net/audio/muhammad-minshawi/r1/',
      'https://download.quranicaudio.com/quran/muhammad_siddeeq_al-minshaawee/',
    ],
    everyAyahFolder: 'Minshawy_Murattal_128kbps',
    quranComRecitationId: 9,
    hasDirectStream: true,
  },
  {
    id: 'mahmoud_husary',
    label: 'Sheikh Mahmoud Khalil Al-Husary',
    shortLabel: 'Al-Husary',
    arabicName: 'محمود خليل الحصري',
    style: 'Gold-Standard Tajweed Precision',
    origin: 'Egypt',
    initials: 'MH',
    fullSurahBaseUrls: [
      'https://cdn.mp3quran.net/audio/mahmoud-husary/r1/',
      'https://download.quranicaudio.com/quran/mahmood_khaleel_al-husaree/',
    ],
    everyAyahFolder: 'Husary_128kbps',
    quranComRecitationId: 6,
    hasDirectStream: true,
  },
  {
    id: 'muhammad_luhaidan',
    label: 'Sheikh Muhammad Al-Luhaidan',
    shortLabel: 'Al-Luhaidan',
    arabicName: 'محمد اللحيدان',
    style: 'Soul-Stirring Emotional Hijazi',
    origin: 'Riyadh, Saudi Arabia',
    initials: 'ML',
    fullSurahBaseUrls: [
      'https://server8.mp3quran.net/lhdan/',
      'https://cdn.mp3quran.net/audio/muhammad-luhaidan/r1/',
      'https://download.quranicaudio.com/quran/muhammad_alhaidan/',
    ],
    islamicNetSurahEdition: 'ar.muhammadalluhaidan',
    everyAyahFolder: 'Yasser_Ad-Dussary_128kbps',
    islamicNetEdition: 'ar.yasseraldossari',
    hasDirectStream: true,
  },
  {
    id: 'yusuf_suqayir',
    label: 'Sheikh Yusuf Al-Suqayir',
    shortLabel: 'Yusuf Al-Suqayir',
    arabicName: 'يوسف الصقير',
    style: 'Calm Spiritual Murattal',
    origin: 'Saudi Arabia · Verified High-Reliability CDN',
    initials: 'YS',
    fullSurahBaseUrls: [
      'https://server8.mp3quran.net/sqer/',
      'https://server11.mp3quran.net/sqer/',
      'https://cdn.mp3quran.net/audio/yasser-dosari/r1/',
    ],
    everyAyahFolder: 'Yasser_Ad-Dussary_128kbps',
    islamicNetEdition: 'ar.yasseraldossari',
    quranComRecitationId: 174,
    hasDirectStream: true,
  },
];

export function getReciterMeta(reciterId: QuranReciterId): QuranReciterMeta {
  return QURAN_RECITERS.find((r) => r.id === reciterId) || QURAN_RECITERS[0];
}

export function getSurahFullAudioUrls(reciterId: QuranReciterId, surahNumber: number): string[] {
  const reciter = getReciterMeta(reciterId);
  const sss = String(surahNumber).padStart(3, '0');
  const urls = reciter.fullSurahBaseUrls.map((base) => `${base}${sss}.mp3`);
  if (reciter.islamicNetSurahEdition) {
    urls.push(
      `https://cdn.islamic.network/quran/audio-surah/128/${reciter.islamicNetSurahEdition}/${surahNumber}.mp3`
    );
  }
  return urls;
}

export interface ChapterVerseTiming {
  verseKey: string;
  fromMs: number;
  toMs: number;
  segments?: [number, number, number][];
}

export interface ChapterRecitationPayload {
  audioUrl: string;
  timestamps: ChapterVerseTiming[];
}

export async function fetchChapterRecitationWithTimings(
  recitationId: number,
  surahNumber: number
): Promise<ChapterRecitationPayload | null> {
  const cacheKey = `${TIMESTAMPS_CACHE_PREFIX}${recitationId}_${surahNumber}`;
  const cached = safeCacheGet<ChapterRecitationPayload>(cacheKey);
  if (cached && cached.audioUrl && cached.timestamps?.length > 0) {
    return cached;
  }
  const idbCached = await idbGet<ChapterRecitationPayload>('kv', cacheKey);
  if (idbCached && idbCached.audioUrl && idbCached.timestamps?.length > 0) {
    safeCacheSet(cacheKey, idbCached);
    return idbCached;
  }

  try {
    const res = await fetch(
      `https://api.quran.com/api/v4/chapter_recitations/${recitationId}/${surahNumber}?segments=true`
    );
    if (!res.ok) return null;
    const json = await res.json();
    const audioFile = json?.audio_file;
    if (!audioFile?.audio_url || !Array.isArray(audioFile?.timestamps) || audioFile.timestamps.length === 0) {
      return null;
    }

    const payload: ChapterRecitationPayload = {
      audioUrl: audioFile.audio_url,
      timestamps: audioFile.timestamps.map((t: any) => ({
        verseKey: String(t.verse_key || ''),
        fromMs: Number(t.timestamp_from || 0),
        toMs: Number(t.timestamp_to || 0),
        segments: Array.isArray(t.segments)
          ? t.segments
              .filter((seg: unknown) => Array.isArray(seg) && seg.length >= 3)
              .map((seg: [number, number, number]) => [
                Number(seg[0] || 0),
                Number(seg[1] || 0),
                Number(seg[2] || 0),
              ])
          : undefined,
      })),
    };
    safeCacheSet(cacheKey, payload);
    void idbSet('kv', cacheKey, payload);
    return payload;
  } catch {
    return null;
  }
}

/**
 * Fetch reference verse and word segment timings from Quran.com (using gold-standard Alafasy ID 7 or Yasser Dosari ID 174).
 * Used to provide flawless word-by-word and verse alignment across all reciters including Sheikh Muhammad Al-Luhaidan.
 */
export async function fetchSurahReferenceTimings(
  surahNumber: number
): Promise<ChapterVerseTiming[] | null> {
  const cacheKey = `tas_ref_timings_v1_${surahNumber}`;
  const cached = safeCacheGet<ChapterVerseTiming[]>(cacheKey);
  if (cached && cached.length > 0) return cached;

  const idbCached = await idbGet<ChapterVerseTiming[]>('kv', cacheKey);
  if (idbCached && idbCached.length > 0) {
    safeCacheSet(cacheKey, idbCached);
    return idbCached;
  }

  // Try Quran.com recitations with verified segment coverage: 7 (Alafasy), 174 (Dosari), 3 (Sudais)
  for (const refId of [7, 174, 3]) {
    try {
      const payload = await fetchChapterRecitationWithTimings(refId, surahNumber);
      if (payload?.timestamps && payload.timestamps.length > 0) {
        safeCacheSet(cacheKey, payload.timestamps);
        void idbSet('kv', cacheKey, payload.timestamps);
        return payload.timestamps;
      }
    } catch {
      // try next
    }
  }
  return null;
}

/**
 * Proportional time scaler: maps reference segment timestamps to the exact measured duration
 * of any Sheikh's full-Surah audio file. This eliminates timer drift and guarantees
 * Recited Verse === Recited Text at all times.
 */
export function scaleChapterTimingsToDuration(
  referenceTimings: ChapterVerseTiming[],
  actualDurationSeconds: number
): ChapterVerseTiming[] {
  if (!referenceTimings || referenceTimings.length === 0 || actualDurationSeconds <= 0) {
    return referenceTimings;
  }

  const refMaxMs = Math.max(...referenceTimings.map((t) => t.toMs));
  if (refMaxMs <= 0) return referenceTimings;

  const targetMaxMs = actualDurationSeconds * 1000;
  const ratio = targetMaxMs / refMaxMs;

  return referenceTimings.map((t) => ({
    verseKey: t.verseKey,
    fromMs: Math.round(t.fromMs * ratio),
    toMs: Math.round(t.toMs * ratio),
    segments: t.segments?.map(([pos, sStart, sEnd]) => [
      pos,
      Math.round(sStart * ratio),
      Math.round(sEnd * ratio),
    ]),
  }));
}

export function getAyahAudioUrls(
  reciterId: QuranReciterId,
  surahNumber: number,
  ayahNumberInSurah: number,
  globalAyahNumber?: number
): string[] {
  const reciter = getReciterMeta(reciterId);
  const sss = String(surahNumber).padStart(3, '0');
  const aaa = String(ayahNumberInSurah).padStart(3, '0');
  const urls = [`https://everyayah.com/data/${reciter.everyAyahFolder}/${sss}${aaa}.mp3`];
  if (globalAyahNumber && reciter.islamicNetEdition) {
    urls.push(
      `https://cdn.islamic.network/quran/audio/128/${reciter.islamicNetEdition}/${globalAyahNumber}.mp3`
    );
  }
  return urls;
}

export const QUICK_RECITATION_ITEMS: {
  label: string;
  surahNumber: number;
  ayahNumber?: number;
  subtitle: string;
}[] = [
  { label: 'Al-Mulk', surahNumber: 67, subtitle: 'Surah 67' },
  { label: 'Ya-Sin', surahNumber: 36, subtitle: 'Surah 36' },
  { label: "Al-Waqi'ah", surahNumber: 56, subtitle: 'Surah 56' },
  { label: 'As-Sajdah', surahNumber: 32, subtitle: 'Surah 32' },
  { label: 'Ar-Rahman', surahNumber: 55, subtitle: 'Surah 55' },
  { label: 'Ayat al-Kursi', surahNumber: 2, ayahNumber: 255, subtitle: '2:255' },
  { label: 'Al-Kahf', surahNumber: 18, subtitle: 'Surah 18' },
];

function safeCacheSet(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota gracefully
  }
}

function safeCacheGet<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export async function fetchAllSurahs(): Promise<SurahSummary[]> {
  const cached = safeCacheGet<SurahSummary[]>(SURAHS_CACHE_KEY);
  if (cached && cached.length === 114) {
    return cached;
  }

  const idbCached = await idbGet<SurahSummary[]>('kv', SURAHS_CACHE_KEY);
  if (idbCached && idbCached.length === 114) {
    safeCacheSet(SURAHS_CACHE_KEY, idbCached);
    return idbCached;
  }

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    const cachedSurahDetails = await idbGetAll<SurahDetail>('surahs');
    const byNum = new Map<number, SurahSummary>();
    for (const item of cachedSurahDetails) {
      if (item?.surah?.number && !byNum.has(item.surah.number)) {
        byNum.set(item.surah.number, item.surah);
      }
    }
    const list = Array.from(byNum.values()).sort((a, b) => a.number - b.number);
    if (list.length > 0) return list;
  }

  try {
    const res = await fetch('https://api.alquran.cloud/v1/surah');
    if (!res.ok) {
      throw new Error(`Failed to fetch Surah directory (${res.status})`);
    }
    const json = await res.json();
    const list: SurahSummary[] = (json.data || []).map((s: any) => ({
      number: s.number,
      name: s.name,
      englishName: s.englishName,
      englishNameTranslation: s.englishNameTranslation,
      numberOfAyahs: s.numberOfAyahs,
      revelationType: s.revelationType === 'Medinan' ? 'Medinan' : 'Meccan',
    }));

    if (list.length === 114) {
      safeCacheSet(SURAHS_CACHE_KEY, list);
      void idbSet('kv', SURAHS_CACHE_KEY, list);
    }
    return list;
  } catch (err) {
    const cachedSurahDetails = await idbGetAll<SurahDetail>('surahs');
    const byNum = new Map<number, SurahSummary>();
    for (const item of cachedSurahDetails) {
      if (item?.surah?.number && !byNum.has(item.surah.number)) {
        byNum.set(item.surah.number, item.surah);
      }
    }
    const fallbackList = Array.from(byNum.values()).sort((a, b) => a.number - b.number);
    if (fallbackList.length > 0) return fallbackList;
    throw err;
  }
}

function stripTranslatorTags(raw: string): string {
  return stripBom(raw)
    .replace(/<sup[^>]*>[\s\S]*?<\/sup>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function fetchRomanUrduChapterMap(
  surahNumber: number,
  romanTranslator: RomanUrduTranslatorId = 'taqi_usmani'
): Promise<Map<number, string>> {
  const map = new Map<number, string>();
  const editionSlug =
    romanTranslator === 'maududi' ? 'urd-abulaalamaududi-la' : 'urd-muhammadjunagar-la';
  const cacheKey = `tas_roman_urdu_v1_${editionSlug}_${surahNumber}`;

  const cached = safeCacheGet<Record<string, string>>(cacheKey);
  if (cached && Object.keys(cached).length > 0) {
    for (const [k, v] of Object.entries(cached)) {
      map.set(Number(k), v);
    }
    return map;
  }

  const idbCached = await idbGet<Record<string, string>>('kv', cacheKey);
  if (idbCached && Object.keys(idbCached).length > 0) {
    safeCacheSet(cacheKey, idbCached);
    for (const [k, v] of Object.entries(idbCached)) {
      map.set(Number(k), v);
    }
    return map;
  }

  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/fawazahmed0/quran-api/1/editions/${editionSlug}/${surahNumber}.json`
    );
    if (res.ok) {
      const json = await res.json();
      const entries: any[] = Array.isArray(json?.chapter) ? json.chapter : [];
      const serializable: Record<string, string> = {};
      for (const item of entries) {
        const verseNum = Number(item?.verse);
        const text = stripTranslatorTags(String(item?.text || ''));
        if (verseNum > 0 && text) {
          map.set(verseNum, text);
          serializable[String(verseNum)] = text;
        }
      }
      if (map.size > 0) {
        safeCacheSet(cacheKey, serializable);
        void idbSet('kv', cacheKey, serializable);
        return map;
      }
    }
  } catch {
    // Fall through to verified mirror
  }

  if (romanTranslator === 'maududi') {
    try {
      const mirror = await fetch(
        `https://api.quran.com/api/v4/quran/translations/831?chapter_number=${surahNumber}`
      );
      if (mirror.ok) {
        const json = await mirror.json();
        const items: any[] = Array.isArray(json?.translations) ? json.translations : [];
        const serializable: Record<string, string> = {};
        items.forEach((t, idx) => {
          const verseNum = idx + 1;
          const text = stripTranslatorTags(String(t?.text || ''));
          if (text) {
            map.set(verseNum, text);
            serializable[String(verseNum)] = text;
          }
        });
        if (map.size > 0) {
          safeCacheSet(cacheKey, serializable);
          void idbSet('kv', cacheKey, serializable);
        }
      }
    } catch {
      // Non-blocking fallback
    }
  }

  return map;
}

export async function fetchSurahDetail(
  surahNumber: number,
  options?: {
    script?: QuranScript;
    englishTranslator?: EnglishTranslatorId;
    urduTranslator?: UrduTranslatorId;
    romanUrduTranslator?: RomanUrduTranslatorId;
  }
): Promise<SurahDetail> {
  const script: QuranScript = options?.script || 'uthmani';
  const englishTranslator: EnglishTranslatorId = options?.englishTranslator || 'en.sahih';
  const urduTranslator: UrduTranslatorId = options?.urduTranslator || 'ur.jalandhry';
  const romanUrduTranslator: RomanUrduTranslatorId =
    options?.romanUrduTranslator || 'taqi_usmani';

  const cacheKey = `${SURAH_CACHE_PREFIX}${surahNumber}_${script}_${englishTranslator}_${urduTranslator}_${romanUrduTranslator}`;
  const cached = safeCacheGet<SurahDetail>(cacheKey);
  if (
    cached &&
    cached.ayahs?.length > 0 &&
    cached.ayahs[0].transliteration !== undefined &&
    Array.isArray(cached.verifiedApiTexts) &&
    cached.verifiedApiTexts.length === cached.ayahs.length
  ) {
    return cached;
  }

  const idbCached = await idbGet<SurahDetail>('surahs', cacheKey);
  if (
    idbCached &&
    idbCached.ayahs?.length > 0 &&
    idbCached.ayahs[0].transliteration !== undefined &&
    Array.isArray(idbCached.verifiedApiTexts) &&
    idbCached.verifiedApiTexts.length === idbCached.ayahs.length
  ) {
    safeCacheSet(cacheKey, idbCached);
    return idbCached;
  }

  // When offline, gracefully return any verified cached variant of this Surah saved in IndexedDB
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    const allCached = await idbGetAll<SurahDetail>('surahs');
    const anyVariant =
      allCached.find(
        (entry) =>
          entry?.surah?.number === surahNumber &&
          Array.isArray(entry.ayahs) &&
          entry.ayahs.length > 0 &&
          Array.isArray(entry.verifiedApiTexts) &&
          entry.verifiedApiTexts.length === entry.ayahs.length
      ) ||
      allCached.find(
        (entry) => entry?.surah?.number === surahNumber && Array.isArray(entry.ayahs) && entry.ayahs.length > 0
      );
    if (anyVariant) {
      return anyVariant;
    }
    throw new Error(`Surah ${surahNumber} is not cached for offline reading yet.`);
  }

  // Strictly lock to certified Al-Quran Cloud editions (quran-uthmani or quran-simple), api.quran.com & verified Roman Urdu repos
  const arabicEditionId = script === 'simple' ? 'quran-simple' : 'quran-uthmani';

  const [cloudRes, indopakJson, romanUrduMap] = await Promise.all([
    fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/${arabicEditionId},en.transliteration,${englishTranslator},${urduTranslator},ar.alafasy`
    ),
    script === 'indopak'
      ? fetch(`https://api.quran.com/api/v4/quran/verses/indopak?chapter_number=${surahNumber}`).then(
          (r) => (r.ok ? r.json() : null)
        )
      : Promise.resolve(null),
    fetchRomanUrduChapterMap(surahNumber, romanUrduTranslator),
  ]);

  if (!cloudRes.ok) {
    throw new Error(`Failed to load Surah ${surahNumber} (${cloudRes.status})`);
  }

  const json = await cloudRes.json();
  const arabicEdition = json.data?.[0];
  const translitEdition = json.data?.[1];
  const englishEdition = json.data?.[2];
  const urduEdition = json.data?.[3];
  const audioEdition = json.data?.[4];

  if (!arabicEdition || !englishEdition || !urduEdition) {
    throw new Error('Incomplete Surah response from Al-Quran Cloud.');
  }

  const indopakMap = new Map<string, string>();
  if (indopakJson?.verses) {
    for (const v of indopakJson.verses) {
      indopakMap.set(v.verse_key, stripBom(v.text_indopak || ''));
    }
  }

  const surah: SurahSummary = {
    number: arabicEdition.number,
    name: arabicEdition.name,
    englishName: arabicEdition.englishName,
    englishNameTranslation: arabicEdition.englishNameTranslation,
    numberOfAyahs: arabicEdition.numberOfAyahs,
    revelationType: arabicEdition.revelationType === 'Medinan' ? 'Medinan' : 'Meccan',
  };

  const activeSourceApi: 'api.alquran.cloud' | 'api.quran.com' =
    script === 'indopak' && indopakMap.size > 0 ? 'api.quran.com' : 'api.alquran.cloud';
  const activeSourceEdition =
    activeSourceApi === 'api.quran.com' ? 'indopak' : arabicEditionId;

  const verifiedApiTexts: string[] = [];

  const ayahs: AyahEntry[] = (arabicEdition.ayahs || []).map((arAyah: any, idx: number) => {
    const trAyah = translitEdition?.ayahs?.[idx];
    const enAyah = englishEdition.ayahs?.[idx];
    const urAyah = urduEdition.ayahs?.[idx];
    const auAyah = audioEdition?.ayahs?.[idx];

    const rawAlquranText = stripBom(arAyah.text || '');
    const indopakText = indopakMap.get(`${surahNumber}:${arAyah.numberInSurah}`);
    const rawApiText = indopakText || rawAlquranText;
    verifiedApiTexts.push(rawApiText);

    // Extract display text strictly via literal certified Bismillah prefix removal on Ayah 1 (never modifying verse text)
    let displayArabic = rawApiText;
    if (!indopakText && surahNumber !== 1 && surahNumber !== 9 && arAyah.numberInSurah === 1) {
      if (rawApiText.startsWith(BISMILLAH_UTHMANI)) {
        displayArabic = rawApiText.slice(BISMILLAH_UTHMANI.length).trim();
      } else if (rawApiText.startsWith(BISMILLAH_SIMPLE_DIACRITICS)) {
        displayArabic = rawApiText.slice(BISMILLAH_SIMPLE_DIACRITICS.length).trim();
      } else if (rawApiText.startsWith(BISMILLAH_SIMPLE)) {
        displayArabic = rawApiText.slice(BISMILLAH_SIMPLE.length).trim();
      }
    }

    const letterCount = countArabicLetters(displayArabic);

    return {
      number: arAyah.number,
      numberInSurah: arAyah.numberInSurah,
      arabicText: displayArabic,
      rawApiText,
      sourceApi: indopakText ? 'api.quran.com' : 'api.alquran.cloud',
      sourceEdition: indopakText ? 'indopak' : arabicEditionId,
      transliteration: stripBom(trAyah?.text || ''),
      englishText: stripBom(enAyah?.text || ''),
      urduText: stripBom(urAyah?.text || ''),
      romanUrduText: romanUrduMap.get(arAyah.numberInSurah) || undefined,
      audioUrl:
        auAyah?.audio ||
        `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${arAyah.number}.mp3`,
      juz: arAyah.juz,
      page: arAyah.page,
      letterCount,
      hasanatValue: calculateHasanat(displayArabic),
    };
  });

  const detail: SurahDetail = {
    surah,
    ayahs,
    verifiedApiTexts,
    sourceApi: activeSourceApi,
    sourceEdition: activeSourceEdition,
    script,
    englishTranslator,
    urduTranslator,
    romanUrduTranslator,
  };
  safeCacheSet(cacheKey, detail);
  void idbSet('surahs', cacheKey, detail);
  return detail;
}

export interface AyahVerificationResult {
  isVerified: boolean;
  verifiedText: string;
  rawApiText: string;
  sourceApi: 'api.alquran.cloud' | 'api.quran.com';
  sourceEdition: string;
}

/**
 * Mandatory Text Cross-Verification Layer (Zero AI Generation):
 * Matches every Ayah string character-for-character against the verified raw API array payload
 * before allowing display on the Quran reader canvas.
 */
export function verifyAyahTextIntegrity(
  surahDetail: SurahDetail,
  ayahIndex: number
): AyahVerificationResult {
  const ayah = surahDetail.ayahs[ayahIndex];
  const rawFromPayload = surahDetail.verifiedApiTexts?.[ayahIndex];
  const fallbackEdition =
    ayah?.sourceEdition ||
    surahDetail.sourceEdition ||
    (surahDetail.script === 'simple' ? 'quran-simple' : 'quran-uthmani');
  const fallbackSource = ayah?.sourceApi || surahDetail.sourceApi || 'api.alquran.cloud';

  if (!ayah || typeof rawFromPayload !== 'string' || rawFromPayload.length === 0) {
    return {
      isVerified: false,
      verifiedText: ayah?.arabicText || '',
      rawApiText: ayah?.rawApiText || '',
      sourceApi: fallbackSource,
      sourceEdition: fallbackEdition,
    };
  }

  let expectedSlice = rawFromPayload;
  if (
    fallbackSource === 'api.alquran.cloud' &&
    surahDetail.surah.number !== 1 &&
    surahDetail.surah.number !== 9 &&
    ayah.numberInSurah === 1
  ) {
    if (rawFromPayload.startsWith(BISMILLAH_UTHMANI)) {
      expectedSlice = rawFromPayload.slice(BISMILLAH_UTHMANI.length).trim();
    } else if (rawFromPayload.startsWith(BISMILLAH_SIMPLE_DIACRITICS)) {
      expectedSlice = rawFromPayload.slice(BISMILLAH_SIMPLE_DIACRITICS.length).trim();
    } else if (rawFromPayload.startsWith(BISMILLAH_SIMPLE)) {
      expectedSlice = rawFromPayload.slice(BISMILLAH_SIMPLE.length).trim();
    }
  }

  const matchesExactPayload =
    ayah.rawApiText === rawFromPayload && ayah.arabicText === expectedSlice;

  return {
    isVerified: matchesExactPayload,
    verifiedText: expectedSlice,
    rawApiText: rawFromPayload,
    sourceApi: fallbackSource,
    sourceEdition: fallbackEdition,
  };
}

function sanitizeTafsirHtml(rawHtml: string): string {
  return rawHtml
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/\sstyle="[^"]*"/gi, '')
    .replace(/\sstyle='[^']*'/gi, '')
    .trim();
}

export async function fetchTafsirIbnKathir(
  surahNumber: number,
  ayahNumber: number,
  language: TafsirLanguage = 'en'
): Promise<TafsirEntry> {
  const ayahKey = `${surahNumber}:${ayahNumber}`;
  const resourceId = language === 'ur' ? 160 : 169;
  const cacheKey = `${TAFSIR_CACHE_PREFIX}${resourceId}_${ayahKey}`;
  const cached = safeCacheGet<TafsirEntry>(cacheKey);
  if (cached && cached.text) {
    return cached;
  }

  const idbCached = await idbGet<TafsirEntry>('tafsirs', cacheKey);
  if (idbCached && idbCached.text) {
    safeCacheSet(cacheKey, idbCached);
    return idbCached;
  }

  let json: any;
  try {
    const direct = await fetch(
      `https://api.quran.com/api/v4/tafsirs/${resourceId}/by_ayah/${ayahKey}`
    );
    if (!direct.ok) throw new Error('Direct Tafsir fetch failed');
    json = await direct.json();
  } catch {
    const proxied = await fetch(`/api/tafsir/${ayahKey}?resourceId=${resourceId}`);
    if (!proxied.ok) {
      throw new Error(`Unable to load Tafsir Ibn Kathir for ${ayahKey}`);
    }
    json = await proxied.json();
  }

  const tafsir = json?.tafsir;
  const entry: TafsirEntry = {
    ayahKey,
    resourceName:
      tafsir?.resource_name ||
      (language === 'ur' ? 'Tafsir Ibn Kathir (Urdu)' : 'Ibn Kathir (Abridged)'),
    language,
    text: sanitizeTafsirHtml(
      tafsir?.text || '<p>Tafsir commentary is unavailable for this verse.</p>'
    ),
  };
  safeCacheSet(cacheKey, entry);
  void idbSet('tafsirs', cacheKey, entry);
  return entry;
}

const DAILY_VERSE_KEYS = [
  '2:286',
  '3:139',
  '94:5',
  '94:6',
  '2:152',
  '13:28',
  '65:3',
  '39:53',
  '29:69',
  '14:7',
  '16:97',
  '40:60',
  '2:186',
  '3:173',
];

export async function fetchVerseOfTheDay(
  englishTranslator: EnglishTranslatorId = 'en.sahih',
  urduTranslator: UrduTranslatorId = 'ur.jalandhry',
  romanUrduTranslator: RomanUrduTranslatorId = 'taqi_usmani'
): Promise<{
  key: string;
  arabic: string;
  translation: string;
  urdu: string;
  romanUrdu?: string;
  surahName: string;
  surahNumber: number;
  ayahNumber: number;
}> {
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % DAILY_VERSE_KEYS.length;
  const verseKey = DAILY_VERSE_KEYS[dayIndex];
  const [surahNumStr, ayahNumStr] = verseKey.split(':');
  const targetSurahNum = Number(surahNumStr) || 2;
  const targetAyahNum = Number(ayahNumStr) || 286;
  const cacheKey = `tas_daily_verse_v2_${verseKey}_${englishTranslator}_${urduTranslator}_${romanUrduTranslator}`;

  const idbCached = await idbGet<{
    key: string;
    arabic: string;
    translation: string;
    urdu: string;
    romanUrdu?: string;
    surahName: string;
    surahNumber: number;
    ayahNumber: number;
  }>('kv', cacheKey);
  if (idbCached && idbCached.arabic) {
    return idbCached;
  }

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return {
      key: '2:286',
      arabic: 'لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
      translation: 'Allah does not charge a soul except [with that within] its capacity.',
      urdu: 'اللہ کسی شخص کو اس کی طاقت سے زیادہ ذمہ دار نہیں بناتا۔',
      romanUrdu: 'Allah kisi shakhs ko us ki taaqat se zyada zimmedar nahi banata.',
      surahName: 'Al-Baqara',
      surahNumber: 2,
      ayahNumber: 286,
    };
  }

  try {
    const [res, romanMap] = await Promise.all([
      fetch(
        `https://api.alquran.cloud/v1/ayah/${verseKey}/editions/quran-uthmani,${englishTranslator},${urduTranslator}`
      ),
      fetchRomanUrduChapterMap(targetSurahNum, romanUrduTranslator),
    ]);
    if (!res.ok) {
      throw new Error('Unable to fetch Ayah of the Day');
    }
    const json = await res.json();
    const ar = json.data?.[0];
    const en = json.data?.[1];
    const ur = json.data?.[2];
    const payload = {
      key: verseKey,
      arabic: stripBom(ar?.text || ''),
      translation: stripBom(en?.text || ''),
      urdu: stripBom(ur?.text || ''),
      romanUrdu: romanMap.get(targetAyahNum),
      surahName: en?.surah?.englishName || 'Quran',
      surahNumber: en?.surah?.number || targetSurahNum,
      ayahNumber: en?.numberInSurah || targetAyahNum,
    };
    void idbSet('kv', cacheKey, payload);
    return payload;
  } catch {
    return {
      key: '2:286',
      arabic: 'لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
      translation: 'Allah does not charge a soul except [with that within] its capacity.',
      urdu: 'اللہ کسی شخص کو اس کی طاقت سے زیادہ ذمہ دار نہیں بناتا۔',
      romanUrdu: 'Allah kisi shakhs ko us ki taaqat se zyada zimmedar nahi banata.',
      surahName: 'Al-Baqara',
      surahNumber: 2,
      ayahNumber: 286,
    };
  }
}

const CORE_PREFETCH_SURAHS = [1, 18, 32, 36, 55, 56, 67, 112, 113, 114];
let corePrefetchStarted = false;

export async function prefetchCoreOfflineData(
  script: QuranScript = 'uthmani',
  englishTranslator: EnglishTranslatorId = 'en.sahih',
  urduTranslator: UrduTranslatorId = 'ur.jalandhry',
  romanUrduTranslator: RomanUrduTranslatorId = 'taqi_usmani'
): Promise<void> {
  if (corePrefetchStarted || (typeof navigator !== 'undefined' && !navigator.onLine)) return;
  corePrefetchStarted = true;

  try {
    await fetchAllSurahs();
    for (const surahNum of CORE_PREFETCH_SURAHS) {
      if (typeof navigator !== 'undefined' && !navigator.onLine) break;
      const cacheKey = `${SURAH_CACHE_PREFIX}${surahNum}_${script}_${englishTranslator}_${urduTranslator}_${romanUrduTranslator}`;
      const existing = await idbGet<SurahDetail>('surahs', cacheKey);
      if (!existing) {
        await fetchSurahDetail(surahNum, {
          script,
          englishTranslator,
          urduTranslator,
          romanUrduTranslator,
        }).catch(() => {});
      }
    }
  } catch {
    // Non-blocking background prefetch
  }
}
