export type AppTab = 'home' | 'quran' | 'hadith' | 'sunnah_ai' | 'explore' | 'settings';

export type ExploreModule =
  | 'hub'
  | 'pillars'
  | 'salaf'
  | 'imams'
  | 'seerah'
  | 'prophets'
  | 'dhikr'
  | 'duas'
  | 'asma'
  | 'sunnah_habits'
  | 'fasting'
  | 'hifz'
  | 'quiz'
  | 'videos';

export type LightThemeId =
  | 'royal_ivory'
  | 'sage_serenity'
  | 'pearl_majesty'
  | 'celestial_blue'
  | 'desert_sand'
  | 'lavender_grace'
  | 'rose_quartz'
  | 'andalusian_pearl'
  | 'mint_oasis'
  | 'scholars_manuscript';

export type DarkThemeId =
  | 'obsidian_black'
  | 'imperial_burgundy'
  | 'emerald_dynasty'
  | 'graphite_titanium'
  | 'cosmic_amethyst'
  | 'obsidian_leather'
  | 'abyssal_teal'
  | 'black_copper'
  | 'storm_sovereign'
  | 'arabian_dusk';

export type MetallicThemeId =
  | 'full_shining_gold'
  | 'full_shining_silver';

export type LegacyThemeId =
  | 'warm_alabaster'
  | 'cosmic_nebula'
  | 'midnight_charcoal'
  | 'emerald_shadow';

export type ThemeMode = LightThemeId | DarkThemeId | MetallicThemeId | LegacyThemeId;
export type ThemeChoice = 'system_default' | ThemeMode;

export type ArabicFontChoice = 'amiri' | 'scheherazade';

export type QuranScript = 'uthmani' | 'indopak' | 'simple';
export type QuranReaderMode = 'card' | 'scroll';
export type QuranSubMode = 'read' | 'listen' | 'hifz';
export type PlaybackSpeed = 0.75 | 1 | 1.25;
export type SleepTimerMode = 'off' | '15m' | '30m' | '60m' | 'end_of_surah';
export type QuranReciterId =
  | 'yasser_dosari'
  | 'saud_shuraim'
  | 'abdul_rahman_sudais'
  | 'abdul_basit_murattal'
  | 'abdul_basit_mujawwad'
  | 'ahmed_al_ajmi'
  | 'mahdi_shishani'
  | 'mishary_alafasy'
  | 'maher_muaiqly'
  | 'saad_ghamdi'
  | 'nasser_qatami'
  | 'muhammad_minshawi'
  | 'mahmoud_husary'
  | 'muhammad_luhaidan'
  | 'yusuf_suqayir';
export type TranslationDisplay = 'both' | 'english' | 'urdu' | 'roman_urdu';
export type EnglishTranslatorId = 'en.sahih' | 'en.hilali' | 'en.pickthall' | 'en.asad';
export type UrduTranslatorId = 'ur.jalandhry' | 'ur.maududi' | 'ur.junagarhi';
export type RomanUrduTranslatorId = 'taqi_usmani' | 'maududi';
export type TafsirLanguage = 'en' | 'ur';

export interface SurahSummary {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

export interface AyahEntry {
  number: number; // global ayah number 1..6236
  numberInSurah: number;
  arabicText: string;
  rawApiText?: string;
  sourceApi?: 'api.alquran.cloud' | 'api.quran.com';
  sourceEdition?: string;
  transliteration: string;
  englishText: string;
  urduText: string;
  romanUrduText?: string;
  audioUrl: string;
  juz: number;
  page: number;
  letterCount: number;
  hasanatValue: number;
}

export interface SurahDetail {
  surah: SurahSummary;
  ayahs: AyahEntry[];
  verifiedApiTexts?: string[];
  sourceApi?: 'api.alquran.cloud' | 'api.quran.com';
  sourceEdition?: string;
  script: QuranScript;
  englishTranslator: EnglishTranslatorId;
  urduTranslator: UrduTranslatorId;
  romanUrduTranslator?: RomanUrduTranslatorId;
}

export interface TafsirEntry {
  ayahKey: string;
  resourceName: string;
  language: TafsirLanguage;
  text: string;
}

export type HadithCategoryGroup = 'kutub_sittah' | 'curated';

export interface HadithCollectionMeta {
  id: string;
  title: string;
  author: string;
  description: string;
  group: HadithCategoryGroup;
  hasUrdu: boolean;
}

export interface HadithChapter {
  id: string;
  number: string;
  title: string;
  hadithCount?: number;
}

export interface HadithGrade {
  scholar: string;
  grade: string;
}

export interface HadithItem {
  id: string;
  collectionId: string;
  collectionName: string;
  chapterId: string;
  chapterTitle: string;
  hadithNumber: string;
  englishText: string;
  urduText: string;
  narrator?: string;
  grades: HadithGrade[];
  reference?: string;
}

export interface AsmaNameItem {
  number: number;
  arabic: string;
  transliteration: string;
  english: string;
  urdu: string;
  reflectionEn: string;
  reflectionUr: string;
}

export type SeerahEra =
  | 'Arabia Before Islam'
  | 'Birth & Early Life'
  | 'Revelation & Secret Call'
  | 'Makkah Persecution & Abyssinia'
  | 'Boycott, Year of Sorrow & Taif'
  | 'Al-Isra wal-Mi‘raj'
  | 'Pledges of Aqabah & Great Hijrah'
  | 'Founding Madinah, Badr & Uhud'
  | 'Khandaq, Hudaybiyyah & Khaybar'
  | 'Mu‘tah, Conquest of Makkah, Hunayn & Tabuk'
  | 'Year of Delegations & Farewell Sermon'
  | 'Passing & Noble Character (Ash-Shama’il)';

export interface SeerahChapterMeta {
  id: SeerahEra;
  chapterNumber: number;
  shortTitle: string;
  span: string;
  urduTitle: string;
  overviewEn: string;
  overviewUr: string;
}

export interface SeerahEvent {
  id: string;
  era: SeerahEra;
  yearLabel: string;
  title: string;
  titleUrdu: string;
  summaryEn: string[];
  summaryUr: string[];
  takeawaysEn: string[];
  takeawaysUr: string[];
}

export interface SeerahBookmark {
  key: string; // chapter id (era)
  chapterNumber: number;
  title: string;
  urduTitle: string;
  span: string;
  savedAt: string;
}

export interface CaliphSubTabContent {
  earlyLifeEn: string[];
  earlyLifeUr: string[];
  companionshipEn: string[];
  companionshipUr: string[];
  caliphateEn: string[];
  caliphateUr: string[];
  characterAndPassingEn: string[];
  characterAndPassingUr: string[];
}

export interface CaliphProfile {
  id: string;
  order: number;
  name: string;
  honorific: string;
  nameUrdu: string;
  reignYears: string;
  titleBadge: string;
  shortIntroEn: string;
  shortIntroUr: string;
  tabs: CaliphSubTabContent;
}

export type SahabiCategory =
  | 'Ten Promised Paradise'
  | 'Mothers of the Believers'
  | 'Prominent Companions & Scholars';

export interface SahabiProfile {
  id: string;
  name: string;
  nameUrdu: string;
  honorific: string;
  category: SahabiCategory;
  eraNote: string;
  earlyLifeEn: string[];
  earlyLifeUr: string[];
  eventsEn: string[];
  eventsUr: string[];
  virtuesEn: string[];
  virtuesUr: string[];
  legacyEn: string[];
  legacyUr: string[];
}

export interface CompanionBookmark {
  key: string;
  name: string;
  nameUrdu: string;
  honorific: string;
  category: string;
  savedAt: string;
}

export type PillarSectionType =
  | 'muslim_aqeedah'
  | 'islam_pillars'
  | 'iman_pillars'
  | 'akhirah_guide';

export interface PillarTopicItem {
  id: string;
  section: PillarSectionType;
  order: number;
  titleEn: string;
  titleUr: string;
  arabicTerm?: string;
  reference: string;
  summaryEn: string[];
  summaryUr: string[];
  pointsEn: string[];
  pointsUr: string[];
}

export type DhikrCategory =
  | 'Morning Adhkar'
  | 'Evening Adhkar'
  | 'Post-Salah Adhkar'
  | 'Sleeping & Waking'
  | 'Istighfar & Repentance'
  | 'Durood & Salawat'
  | 'Tasbih, Tahmid, Tahlil & Takbir'
  | 'Anxiety, Debt & Protection'
  | 'Ruqyah Shariyyah';

export interface DhikrItem {
  id: string;
  category: DhikrCategory;
  title: string;
  arabic: string;
  transliteration: string;
  english: string;
  urdu: string;
  romanUrdu?: string;
  reference: string;
  targetCount: number;
  virtue?: string;
}

export type DuaSourceGroup = 'quran' | 'sunnah';

export type QuranDuaCategory =
  | 'Guidance & Steadfastness'
  | 'Forgiveness & Mercy'
  | 'Family & Righteous Progeny'
  | 'Protection & Patience'
  | 'Knowledge, Gratitude & Akhirah';

export type SunnahDuaCategory =
  | 'Waking Up'
  | 'Morning & Evening'
  | 'Home & Masjid'
  | 'Travel'
  | 'Rain & Wind'
  | 'Anxiety & Grief'
  | 'Forgiveness'
  | 'Illness & Ruqyah'
  | 'Istikharah'
  | 'Parents & Family';

export type DuaCategory = QuranDuaCategory | SunnahDuaCategory;

export interface DuaItem {
  id: string;
  sourceGroup: DuaSourceGroup;
  category: DuaCategory;
  title: string;
  arabic: string;
  transliteration: string;
  english: string;
  urdu: string;
  romanUrdu?: string;
  reference: string;
}

export interface DuaBookmark {
  key: string;
  sourceGroup?: DuaSourceGroup;
  title: string;
  category: DuaCategory;
  arabic: string;
  english: string;
  urdu: string;
  reference: string;
  savedAt: string;
}

export type SunnahHabitTime =
  | 'Morning Sunnahs'
  | 'Prayer & Masjid'
  | 'Meals & Hydration'
  | 'Character & Social'
  | 'Evening & Sleep';

export interface SunnahHabitItem {
  id: string;
  timeOfDay: SunnahHabitTime;
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
  reference: string;
}

export interface SalafTopicItem {
  id: string;
  order: number;
  titleEn: string;
  titleUr: string;
  reference: string;
  summaryEn: string[];
  summaryUr: string[];
  keyPointsEn: string[];
  keyPointsUr: string[];
}

export interface SalafQuoteItem {
  id: string;
  scholar: string;
  scholarUrdu: string;
  era: string;
  quoteEn: string;
  quoteUr: string;
  source: string;
}

export interface GreatImamProfile {
  id: string;
  order: number;
  name: string;
  nameUrdu: string;
  fullName: string;
  title: string;
  dates: string;
  birthplace: string;
  schoolName: string;
  biographyEn: string[];
  biographyUr: string[];
  teachersAndStudentsEn: string;
  teachersAndStudentsUr: string;
  methodologyEn: string[];
  methodologyUr: string[];
  famousWorks: string[];
  statementOnSunnahEn: string;
  statementOnSunnahUr: string;
}

export interface ProphetStoryItem {
  id: string;
  order: number;
  name: string;
  nameArabic: string;
  nameUrdu: string;
  titleEn: string;
  eraAndRegion: string;
  quranMentions: string;
  storyEn: string[];
  storyUr: string[];
  lessonsEn: string[];
  lessonsUr: string[];
  references: string;
}

export interface QuizQuestion {
  id: string;
  topic: 'Quran' | 'Seerah' | 'Salaf & Aqeedah' | 'Companions & 4 Imams';
  questionEn: string;
  questionUr: string;
  options: string[];
  correctIndex: number;
  explanationEn: string;
  explanationUr: string;
  reference: string;
}

export interface SunnahAIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isOfflineVerified?: boolean;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  views: string;
  type: 'video' | 'short';
  category: 'Quran Tafsir' | 'Authentic Hadith' | 'Reminders' | 'Shorts';
  url: string;
}

export interface YouTubePlaylist {
  id: string;
  title: string;
  videoCount: string;
  thumbnail: string;
  url: string;
}

export interface YouTubeChannelFeed {
  channelId: string;
  channelTitle: string;
  channelHandle: string;
  channelUrl: string;
  videos: YouTubeVideo[];
  shorts: YouTubeVideo[];
  playlists: YouTubePlaylist[];
  fetchedAt: string;
}

export interface QuranBookmark {
  key: string;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  arabicText: string;
  englishText: string;
  urduText?: string;
  savedAt: string;
}

export interface HadithBookmark {
  key: string;
  collectionId: string;
  collectionName: string;
  hadithNumber: string;
  chapterTitle: string;
  englishText: string;
  urduText?: string;
  gradeSummary: string;
  savedAt: string;
}

export interface DailyHabitRecord {
  date: string;
  versesReadIds: string[];
  pagesReadIds: number[];
  hadithsReadIds: string[];
  lettersCount: number;
  hasanat: number;
  secondsRead: number;
  secondsListened?: number;
}

export interface DailyGoals {
  pagesPerDay: number;
  versesPerDay: number;
  minutesPerDay: number;
  hasanatPerDay: number;
  hadithsPerDay: number;
}

export interface NotificationSettings {
  enabled: boolean;
  dailyVerseEnabled: boolean;
  dailyVerseTime: string;
  sadaqahReminderEnabled: boolean;
}

export type HifzStatus = 'not_started' | 'memorizing' | 'memorized';

export interface SurahHifzProgress {
  surahNumber: number;
  status: HifzStatus;
  memorizedAyahs: number;
  lastReviewedAt?: string;
}

export type FastingCategory = 'monday_thursday' | 'ayyam_al_beed' | 'ramadan' | 'voluntary';

export interface FastingLogEntry {
  date: string; // YYYY-MM-DD
  category: FastingCategory;
  hijriLabel?: string;
}

export type SalahPrayerId = 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
export type ObligatoryPrayerId = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
export type SalahStatus = 'on_time' | 'late' | 'missed' | 'not_applicable';
export type SalahCongregation =
  | 'masjid_congregation'
  | 'elsewhere_congregation'
  | 'individual'
  | 'prefer_not_to_specify';
export type SalahAlertLeadMinutes = 0 | 5 | 10 | 15 | 30;

export interface SalahPrayerRecord {
  status: SalahStatus;
  congregation?: SalahCongregation;
  notes?: string;
  updatedAt: number;
}

export interface DailySalahLog {
  date: string; // YYYY-MM-DD
  prayers: Partial<Record<SalahPrayerId, SalahPrayerRecord>>;
}

export interface SalahSettings {
  locationMode: 'auto' | 'manual';
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
  calculationMethod: number;
  asrSchool: 0 | 1;
  offsets: Record<SalahPrayerId, number>;
  notificationsEnabled: boolean;
  alertLeadMinutes: SalahAlertLeadMinutes;
  enabledPrayers: Record<ObligatoryPrayerId, boolean>;
}

export interface DailySalahTimings {
  dateKey: string; // YYYY-MM-DD
  baseTimings: Record<SalahPrayerId, string>; // "HH:MM" 24h
  timings: Record<SalahPrayerId, string>; // "HH:MM" 24h with user offsets applied
  locationLabel: string;
  timezone: string;
  methodId: number;
  asrSchool: 0 | 1;
  source: 'gps' | 'city' | 'timezone_fallback' | 'cached';
  fetchedAt: number;
}

export interface ReaderSettings {
  theme: ThemeChoice;
  lastDarkTheme?: DarkThemeId;
  lastLightTheme?: LightThemeId;
  arabicFont: ArabicFontChoice;
  quranScript: QuranScript;
  quranReaderMode: QuranReaderMode;
  quranReciter: QuranReciterId;
  autoAdvanceAudio: boolean;
  showArabic: boolean;
  showTransliteration: boolean;
  translationDisplay: TranslationDisplay;
  englishTranslator: EnglishTranslatorId;
  urduTranslator: UrduTranslatorId;
  romanUrduTranslator: RomanUrduTranslatorId;
  tafsirLanguage: TafsirLanguage;
  arabicFontSize: number;
  englishFontSize: number;
  urduFontSize: number;
  autoTrackScroll: boolean;
  youtubeChannelId: string;
  notifications: NotificationSettings;
  salah: SalahSettings;
}

