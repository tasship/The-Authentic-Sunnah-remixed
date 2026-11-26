export type QuizCategoryKey =
  | 'quranic_sciences'
  | 'hadith_studies'
  | 'seerah_timeline'
  | 'noble_sahabah'
  | 'duas_and_fiqh';

export interface ComprehensiveQuizQuestion {
  id: string;
  category: QuizCategoryKey;
  questionEn: string;
  questionUr: string;
  optionsEn: string[];
  optionsUr: string[];
  correctIndex: number;
  explanationEn: string;
  explanationUr: string;
  reference: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface QuizCategoryMeta {
  key: QuizCategoryKey;
  number: number;
  titleEn: string;
  titleUr: string;
  arabicTitle: string;
  subtitle: string;
  iconName: string;
}

export const QUIZ_CATEGORIES: QuizCategoryMeta[] = [
  {
    key: 'quranic_sciences',
    number: 1,
    titleEn: 'Quranic Sciences',
    titleUr: 'علوم القرآن',
    arabicTitle: 'عُلُومُ القُرْآنِ',
    subtitle: 'Revelation, Makki vs Madani, compilation, and preservation',
    iconName: 'BookOpen',
  },
  {
    key: 'hadith_studies',
    number: 2,
    titleEn: 'Hadith Studies',
    titleUr: 'علوم الحديث',
    arabicTitle: 'عُلُومُ الحَدِيثِ',
    subtitle: 'The Six Books, Sanad, Matn, and authentic narrations',
    iconName: 'ScrollText',
  },
  {
    key: 'seerah_timeline',
    number: 3,
    titleEn: 'Seerah & Timeline',
    titleUr: 'سیرت نبوی اور تاریخ',
    arabicTitle: 'السِّيرَةُ النَّبَوِيَّةُ',
    subtitle: 'Chronological life of Prophet Muhammad ﷺ from Makkah to Madinah',
    iconName: 'Compass',
  },
  {
    key: 'noble_sahabah',
    number: 4,
    titleEn: 'Noble Sahabah',
    titleUr: 'صحابہ کرامؓ کی سیرت',
    arabicTitle: 'الصَّحَابَةُ الكِرَامُ',
    subtitle: 'The Four Caliphs, Asharah Mubasharah, and blessed companions',
    iconName: 'Award',
  },
  {
    key: 'duas_and_fiqh',
    number: 5,
    titleEn: 'Duas & Fiqh',
    titleUr: 'مسنون دعائیں اور فقہ',
    arabicTitle: 'الأَدْعِيَةُ وَالفِقْهُ',
    subtitle: 'Pillars of Taharah, Salah, Zakah, Sawm, and authentic supplications',
    iconName: 'Sparkles',
  },
];

export const COMPREHENSIVE_QUIZ_BANK: ComprehensiveQuizQuestion[] = [
  // =========================================================================
  // 1. QURANIC SCIENCES (علوم القرآن)
  // =========================================================================
  {
    id: 'qs-1',
    category: 'quranic_sciences',
    questionEn: 'Which Caliph commissioned the definitive compilation of the Mushaf into standardized copies distributed to the major Islamic provinces?',
    questionUr: 'کس خلیفہ راشد نے قرآن مجید کے معیاری نسخے تیار کروا کر اسلامی دنیا کے مرکزی شہروں میں روانہ کیے؟',
    optionsEn: [
      'Umar ibn al-Khattab (RA)',
      'Uthman ibn Affan (RA)',
      'Ali ibn Abi Talib (RA)',
      'Abu Bakr as-Siddiq (RA)',
    ],
    optionsUr: [
      'حضرت عمر بن الخطاب رضی اللہ عنہ',
      'حضرت عثمان بن عفان رضی اللہ عنہ',
      'حضرت علی بن ابی طالب رضی اللہ عنہ',
      'حضرت ابوبکر صدیق رضی اللہ عنہ',
    ],
    correctIndex: 1,
    explanationEn:
      'Under the third Caliph Uthman ibn Affan (RA) in 25 AH, Hudhayfah ibn al-Yaman reported dialect divergences in recitation during the conquest of Armenia. Uthman assembled a committee led by Zayd ibn Thabit (RA) to produce the standard Uthmanic codex (Rasm Uthmani) based on the original sheets compiled during Abu Bakr\'s caliphate.',
    explanationUr:
      'حضرت عثمان غنی رضی اللہ عنہ نے 25 ہجری میں حضرت زید بن ثابتؓ کی قیادت میں کمیٹی بنا کر قریش کی قراءت پر مبنی معیاری مصحف عثمانی تیار کروایا اور تمام صوبوں میں بھجوایا۔',
    reference: 'Sahih al-Bukhari 4987',
  },
  {
    id: 'qs-2',
    category: 'quranic_sciences',
    questionEn: 'What is the primary defining characteristic of a "Makki" Surah according to the majority of scholars of Quranic Sciences?',
    questionUr: 'اکثر علمائے علومِ قرآن کے نزدیک "مکی سورت" کی بنیادی تعریف کیا ہے؟',
    optionsEn: [
      'Any verse revealed specifically inside the boundary of the Ka\'bah',
      'Any revelation received prior to the Prophet\'s ﷺ Hijrah to Madinah, regardless of location',
      'Any Surah containing fewer than 50 verses',
      'Any Surah that does not mention fasting or inheritance laws',
    ],
    optionsUr: [
      'وہ وحی جو صرف کعبہ کی حدود میں نازل ہوئی ہو',
      'وہ تمام وحی جو نبی کریم ﷺ کی ہجرتِ مدینہ سے قبل نازل ہوئی، چاہے جہاں بھی نازل ہوئی ہو',
      'وہ سورت جس میں 50 سے کم آیات ہوں',
      'وہ سورت جس میں روزے یا وراثت کے احکام نہ ہوں',
    ],
    correctIndex: 1,
    explanationEn:
      'The dominant chronological definition established by scholars such as Ibn Abbas, az-Zarkashi, and as-Suyuti is that Makki revelation encompasses everything revealed before the Prophet\'s ﷺ arrival in Madinah, while Madani revelation is everything revealed after the Hijrah, even if revealed in Makkah during the Conquest or at Arafat.',
    explanationUr:
      'جمہور مفسرین کے نزدیک مکی وحی سے مراد وہ تمام کلام ہے جو ہجرتِ مدینہ سے پہلے نازل ہوا، جبکہ ہجرت کے بعد نازل ہونے والی تمام وحی مدنی کہلاتی ہے چاہے وہ مکہ یا عرفات میں ہی کیوں نہ نازل ہوئی ہو۔',
    reference: 'Al-Burhan fi ‘Ulum al-Qur’an (az-Zarkashi) · Al-Itqan (as-Suyuti)',
  },
  {
    id: 'qs-3',
    category: 'quranic_sciences',
    questionEn: 'Which single Ayah is unanimously declared by the Prophet ﷺ to be the greatest verse in the entire Quran?',
    questionUr: 'نبی کریم ﷺ نے قرآن مجید کی کس آیت کو تمام آیات سے سب سے عظیم الشان قرار دیا؟',
    optionsEn: [
      'Ayat al-Dayn (The Verse of Debt, Al-Baqarah 2:282)',
      'Ayat al-Kursi (The Throne Verse, Al-Baqarah 2:255)',
      'The opening verse of Surah al-Fatihah',
      'The closing verse of Surah at-Tawbah',
    ],
    optionsUr: [
      'آیتِ دین (قرض والی آیت، البقرہ 2:282)',
      'آیت الکرسی (البقرہ 2:255)',
      'سورہ فاتحہ کی پہلی آیت',
      'سورہ توبہ کی آخری آیت',
    ],
    correctIndex: 1,
    explanationEn:
      'In Sahih Muslim, the Prophet ﷺ asked Ubayy ibn Ka\'b (RA): "O Abu al-Mundhir, do you know which verse from the Book of Allah with you is the greatest?" Ubayy replied: "Allahu la ilaha illa Huwal-Hayyul-Qayyum (Ayat al-Kursi)." The Prophet ﷺ patted his chest and said: "May knowledge be felicitous for you, O Abu al-Mundhir!"',
    explanationUr:
      'صحیح مسلم میں ہے کہ رسول اللہ ﷺ نے حضرت ابی بن کعبؓ سے پوچھا کہ قرآن کی سب سے عظیم آیت کون سی ہے؟ انہوں نے آیت الکرسی عرض کیا، تو آپ ﷺ نے ان کے سینے پر دستِ مبارک رکھ کر علم میں برکت کی دعا فرمائی۔',
    reference: 'Sahih Muslim 810',
  },
  {
    id: 'qs-4',
    category: 'quranic_sciences',
    questionEn: 'What was the historical catalyst that prompted Sayyiduna Abu Bakr as-Siddiq (RA) to execute the first initial compilation of the Quran into one collection?',
    questionUr: 'کس تاریخی واقعے نے حضرت ابوبکر صدیق رضی اللہ عنہ کو قرآن مجید کو ایک جگہ جمع کرنے پر آمادہ کیا؟',
    optionsEn: [
      'The burning of the library of Alexandria',
      'The martyrdom of dozens of Quran reciters (Qurra) at the Battle of Yamamah',
      'The request of the Roman Emperor Heraclius',
      'The departure of the Sahabah to distant conquests in Egypt',
    ],
    optionsUr: [
      'اسکندریہ کے کتب خانے کا جلنا',
      'جنگِ یمامہ میں کثیر تعداد میں حفاظ و قراء صحابہ کرامؓ کی شہادت',
      'رومی شہنشاہ ہرقل کی درخواست',
      'صحابہ کرام کا مصر کی فتوحات کے لیے روانہ ہونا',
    ],
    correctIndex: 1,
    explanationEn:
      'During the Riddah wars at the Battle of Yamamah (12 AH), approximately 70 Huffaz among the Sahabah were martyred. Umar ibn al-Khattab (RA) became deeply concerned that portions of the recited Quran might be lost with the demise of memorizers, and urged Abu Bakr (RA) to commission Zayd ibn Thabit (RA) to compile the verses from palm branches, stones, and memory into verified folios (Suhuf).',
    explanationUr:
      'جنگِ یمامہ (12 ہجری) میں تقریباً ستر حفاظ صحابہ کرام شہید ہو گئے۔ حضرت عمر فاروقؓ نے حضرت ابوبکر صدیقؓ کو قرآن کو تحریری صورت میں محفوظ کرنے کا مشورہ دیا اور حضرت زید بن ثابتؓ کو یہ ذمہ داری سونپی گئی۔',
    reference: 'Sahih al-Bukhari 4986',
  },
  {
    id: 'qs-5',
    category: 'quranic_sciences',
    questionEn: 'How many total Sujud al-Tilawah (prostrations of recitation) are explicitly found within the Holy Quran according to the verified classical positions?',
    questionUr: 'قرآن مجید میں تلاوت کے سجدے (سجود التلاوہ) کل کتنے ہیں؟',
    optionsEn: ['7', '11', '14 or 15', '20'],
    optionsUr: ['7', '11', '14 یا 15', '20'],
    correctIndex: 2,
    explanationEn:
      'The Quran contains 15 classical prostration places (Sajdah verses) across various Surahs (e.g. Al-A\'raf, Ar-Ra\'d, An-Nahl, Al-Isra, Maryam, two in Al-Hajj, Al-Furqan, An-Naml, As-Sajdah, Sad, Fussilat, An-Najm, Al-Inshiqaq, and Al-\'Alaq). Scholars agree on 14 while holding that Surah Sad or the second in Al-Hajj completes 15.',
    explanationUr:
      'قرآن مجید میں سجودِ تلاوت کے 14 متفقہ اور کل 15 مقامات ہیں جن میں سورہ حج کے دو سجدے بھی شامل ہیں۔',
    reference: 'Sunan Abi Dawud 1401 · Jami‘ at-Tirmidhi 577',
  },
  {
    id: 'qs-6',
    category: 'quranic_sciences',
    questionEn: 'Which Surah does not begin with Bismillahir-Rahmanir-Rahim at its opening, and why according to the Sahabah?',
    questionUr: 'قرآن مجید کی کون سی سورت بغیر "بسم اللہ الرحمن الرحیم" کے شروع ہوتی ہے؟',
    optionsEn: [
      'Surah al-Anfal',
      'Surah at-Tawbah (Bara\'ah)',
      'Surah al-Munafiqun',
      'Surah al-Jinn',
    ],
    optionsUr: [
      'سورہ انفال',
      'سورہ توبہ (براءۃ)',
      'سورہ منافقون',
      'سورہ جن',
    ],
    correctIndex: 1,
    explanationEn:
      'Surah at-Tawbah (Chapter 9) does not begin with Bismillah. Ali ibn Abi Talib (RA) explained that Bismillah conveys security and mercy, whereas Surah at-Tawbah was revealed with divine dissociation and severe warning regarding treaties violated by the pagan idolaters. Additionally, Uthman (RA) noted its thematic continuation with Surah al-Anfal.',
    explanationUr:
      'سورہ توبہ کے آغاز میں بسم اللہ نہیں ہے۔ حضرت علیؓ نے فرمایا کہ بسم اللہ امان و رحمت ہے جبکہ سورہ توبہ قریش کے معاہدہ شکنوں کے خلاف برأت و تلوار کے اعلان کے ساتھ نازل ہوئی۔',
    reference: 'Jami‘ at-Tirmidhi 3086 · Tafsir Ibn Kathir 4/104',
  },

  // =========================================================================
  // 2. HADITH STUDIES (علوم الحديث)
  // =========================================================================
  {
    id: 'hs-1',
    category: 'hadith_studies',
    questionEn: 'What are the two foundational constituents required for any transmitted Hadith narrative to exist?',
    questionUr: 'کسی بھی حدیثِ نبوی کے بنیادی طور پر کون سے دو اجزاء ہوتے ہیں؟',
    optionsEn: [
      'Fiqh (rulings) and Qiyas (analogy)',
      'Sanad (chain of transmitters) and Matn (the actual text)',
      'Tafsir (explanation) and Balaghah (eloquence)',
      'Tarikh (history) and Diwan (poetry)',
    ],
    optionsUr: [
      'فقہ اور قیاس',
      'سند (راویوں کا سلسلہ) اور متن (حدیث کے اصل الفاظ)',
      'تفسیر اور بلاغت',
      'تاریخ اور دیوان',
    ],
    correctIndex: 1,
    explanationEn:
      'Every Hadith is composed of two indispensable parts: (1) The Sanad (or Isnad), which is the unbroken chronological chain of transmitters tracing back to the Prophet ﷺ, and (2) The Matn, which is the verbatim statement, action, or tacit approval conveyed at the end of that transmission chain.',
    explanationUr:
      'حدیث کے دو بنیادی اجزاء ہیں: سند (وہ راویوں کا سلسلہ جو رسول اللہ ﷺ تک پہنچتا ہے) اور متن (حدیث کے اصل الفاظ یا مفہوم)۔',
    reference: 'Muqaddimah Ibn as-Salah fi ‘Ulum al-Hadith',
  },
  {
    id: 'hs-2',
    category: 'hadith_studies',
    questionEn: 'Which legendary Hadith master spent 16 years verifying more than 600,000 narrations to compile "Al-Jami\' as-Sahih"?',
    questionUr: 'کس عظیم محدث نے 16 سال کی محنت اور 6 لاکھ احادیث کی جانچ پڑتال کے بعد "الجامع الصحیح" مرتب فرمائی؟',
    optionsEn: [
      'Imam Abu Dawud as-Sijistani',
      'Imam Muhammad ibn Isma\'il al-Bukhari',
      'Imam Ahmad ibn Hanbal',
      'Imam at-Tirmidhi',
    ],
    optionsUr: [
      'امام ابوداؤد سجستانی رحمہ اللہ',
      'امام محمد بن اسماعیل بخاری رحمہ اللہ',
      'امام احمد بن حنبل رحمہ اللہ',
      'امام ترمذی رحمہ اللہ',
    ],
    correctIndex: 1,
    explanationEn:
      'Imam al-Bukhari (194–256 AH) traveled across Khurasan, Iraq, Hijaz, Syria, and Egypt for 16 years. He would perform Ghusl and pray two rak\'ahs of Istikharah before recording any Hadith in his Sahih, creating the most authentic book after the Quran.',
    explanationUr:
      'امیر المومنین فی الحدیث امام بخاریؒ نے 16 سال سفر اور تحقیق کے بعد ہر حدیث درج کرنے سے پہلے غسل فرما کر دو رکعت استخارہ ادا کیا اور صحیح بخاری مرتب فرمائی۔',
    reference: 'Tabaqat ash-Shafi‘iyyah · Siyar A‘lam an-Nubala',
  },
  {
    id: 'hs-3',
    category: 'hadith_studies',
    questionEn: 'What technical term describes a Hadith whose chain of narration has a missing link between the Successor (Tabi\'i) and the Prophet ﷺ?',
    questionUr: 'اصطلاحِ حدیث میں اس روایت کو کیا کہتے ہیں جس کی سند میں تابعی اور نبی کریم ﷺ کے درمیان صحابی کا ذکر چھوٹ گیا ہو؟',
    optionsEn: [
      'Hadith Mawdu\' (Fabricated)',
      'Hadith Mursal (Hurry / Dispatched)',
      'Hadith Mu\'allaq (Suspended)',
      'Hadith Mutawatir (Mass-transmitted)',
    ],
    optionsUr: [
      'حدیث موضوع (من گھڑت)',
      'حدیث مرسل',
      'حدیث معلق',
      'حدیث متواتر',
    ],
    correctIndex: 1,
    explanationEn:
      'A Hadith Mursal occurs when a Tabi\'i (Successor who never met the Prophet ﷺ directly) attributes a statement directly to the Prophet ﷺ without naming the Companion who narrated it to him. While Abu Hanifah and Malik accept Mursal narrations under specific strict conditions, ash-Shafi\'i and the mainstream Muhaddithun classify Mursal as a subdivision of Da\'if (weak) unless corroborated.',
    explanationUr:
      'حدیث مرسل وہ ہے جس میں تابعی براہِ راست رسول اللہ ﷺ سے روایت کرے اور درمیان میں صحابی کا واسطہ چھوڑ دے۔',
    reference: 'Nukhbat al-Fikar (Ibn Hajar al-Asqalani)',
  },
  {
    id: 'hs-4',
    category: 'hadith_studies',
    questionEn: 'Which Companion holds the absolute highest number of narrated Hadiths (over 5,300 narrations) recorded in the classical corpora?',
    questionUr: 'تمام صحابہ کرام میں سے سب سے زیادہ احادیث (5374 روایات) کس صحابی رسول سے مروی ہیں؟',
    optionsEn: [
      'Abdullah ibn Umar (RA)',
      'Abu Hurairah ad-Dawsi (RA)',
      'Anas ibn Malik (RA)',
      'Umm al-Mu\'minin Aisha (RA)',
    ],
    optionsUr: [
      'حضرت عبداللہ بن عمر رضی اللہ عنہ',
      'حضرت ابو ہریرہ دوسی رضی اللہ عنہ',
      'حضرت انس بن مالک رضی اللہ عنہ',
      'ام المومنین حضرت عائشہ صدیقہ رضی اللہ عنہا',
    ],
    correctIndex: 1,
    explanationEn:
      'Abu Hurairah (RA) accepted Islam in 7 AH and attached himself to the Prophet ﷺ night and day as one of the Ahl as-Suffah. The Prophet ﷺ made a special du\'a for him to never forget what he heard. Abu Hurairah transmitted 5,374 Hadiths, followed by Ibn Umar (2,630) and Anas ibn Malik (2,286).',
    explanationUr:
      'حضرت ابو ہریرہؓ نے اہل صفہ میں شامل ہو کر ہمہ وقت صحبتِ نبوی اختیار کی اور آپ ﷺ نے ان کے حافظے کے لیے خصوصی دعا فرمائی جس کی بدولت انہوں نے سب سے زیادہ 5374 احادیث روایت کیں۔',
    reference: 'Sahih al-Bukhari 118, 119 · Siyar A‘lam an-Nubala',
  },
  {
    id: 'hs-5',
    category: 'hadith_studies',
    questionEn: 'With which universally celebrated Hadith do Imam al-Bukhari in his Sahih and Imam an-Nawawi in his 40 Hadith choose to open their masterworks?',
    questionUr: 'امام بخاریؒ نے اپنی صحیح اور امام نوویؒ نے اپنے چالیس احادیث کے مجموعے کا آغاز کس مشہور حدیث سے کیا؟',
    optionsEn: [
      '"Religion is sincere advice (Ad-Deen an-Naseehah)"',
      '"Actions are judged only by intentions (Innama al-a\'malu bin-niyyat)"',
      '"The Muslim is the one from whose tongue and hand others are safe"',
      '"Whoever lies upon me deliberately, let him take his seat in Hellfire"',
    ],
    optionsUr: [
      '"دین خیر خواہی کا نام ہے"',
      '"اعمال کا دارومدار نیتوں پر ہے (انما الاعمال بالنیات)"',
      '"مسلمان وہ ہے جس کی زبان اور ہاتھ سے دوسرے مسلمان محفوظ رہیں"',
      '"جس نے مجھ پر جان بوجھ کر جھوٹ باندھا وہ اپنا ٹھکانہ جہنم بنا لے"',
    ],
    correctIndex: 1,
    explanationEn:
      'Narrated by Umar ibn al-Khattab (RA), "Innamal-a\'malu bin-niyyat..." establishes that any sacred work, seeking of knowledge, or worship is completely devoid of reward unless performed purely for the sake of Allah alone. Classical scholars termed it "one-third of Islam."',
    explanationUr:
      'حضرت عمر فاروقؓ سے مروی حدیث "انما الاعمال بالنیات" پر تمام فقہ و اخلاص کی بنیاد ہے۔ امام بخاریؒ اور امام نوویؒ نے قاری اور طالب علم کو خلوصِ نیت کی یاد دہانی کے لیے اسے آغاز میں رکھا۔',
    reference: 'Sahih al-Bukhari 1 · Sahih Muslim 1907',
  },

  // =========================================================================
  // 3. SEERAH & TIMELINE (السيرة النبوية)
  // =========================================================================
  {
    id: 'st-1',
    category: 'seerah_timeline',
    questionEn: 'How old was the Prophet Muhammad ﷺ when his beloved mother Aminah bint Wahb passed away at al-Abwa?',
    questionUr: 'جب نبی کریم ﷺ کی والدہ ماجدہ حضرت آمنہ کا مقامِ ابواء پر انتقال ہوا تو آپ ﷺ کی عمر مبارک کتنی تھی؟',
    optionsEn: ['2 years old', '4 years old', '6 years old', '12 years old'],
    optionsUr: ['2 سال', '4 سال', '6 سال', '12 سال'],
    correctIndex: 2,
    explanationEn:
      'The Prophet ﷺ was born orphaned as his father Abdullah passed away before his birth. When he was six years old, his mother Aminah took him to visit relatives in Yathrib (Madinah). On the journey back to Makkah, she fell ill and passed away at al-Abwa, after which his grandfather Abdul-Muttalib took him into his care.',
    explanationUr:
      'آپ ﷺ کی عمر مبارک 6 سال تھی جب آپ کی والدہ ماجدہ حضرت آمنہ مدینہ سے واپسی پر مقامِ ابواء پر انتقال فرما گئیں، جس کے بعد دادا عبدالمطلب نے آپ کی کفالت فرمائی۔',
    reference: 'Ar-Raheeq Al-Makhtum · Zad al-Ma‘ad (Ibn al-Qayyim)',
  },
  {
    id: 'st-2',
    category: 'seerah_timeline',
    questionEn: 'In what year of Prophethood did the brutal economic and social boycott of Banu Hashim in Shi\'b Abi Talib finally end?',
    questionUr: 'شعبِ ابی طالب میں بنو ہاشم کا ظالمانہ معاشی و سماجی بائیکاٹ نبوت کے کس سال ختم ہوا؟',
    optionsEn: [
      '5th Year of Prophethood',
      '7th Year of Prophethood',
      '10th Year of Prophethood',
      '1st Year of Hijrah',
    ],
    optionsUr: [
      'نبوت کا 5واں سال',
      'نبوت کا 7واں سال',
      'نبوت کا 10واں سال',
      'ہجرت کا پہلا سال',
    ],
    correctIndex: 2,
    explanationEn:
      'The Quraysh enforced an inhumane boycott starting in the 7th year of Prophethood that lasted three painful years until the 10th year of Prophethood. The treaty parchment hung inside the Ka\'bah was consumed by termites, sparing only the name of Allah, after which upright Makkan figures nullified the embargo.',
    explanationUr:
      'قریش کا یہ سخت بائیکاٹ نبوت کے ساتویں سال شروع ہوا اور تین سال تک جاری رہا، بالآخر دسویں سال نبوی میں دیمک نے دستاویز کو چاٹ لیا اور نیک دل مکی سرداروں نے اس معاہدے کو توڑ دیا۔',
    reference: 'Ibn Hisham · Ar-Raheeq Al-Makhtum',
  },
  {
    id: 'st-3',
    category: 'seerah_timeline',
    questionEn: 'During the historic Night of Miracles (Al-Isra wal-Mi\'raj), what mandatory pillar of Islam was gifted directly to the Ummah by Allah above the seven heavens?',
    questionUr: 'واقعۂ معراج کی رات ساتوں آسمانوں کے اوپر اللہ تعالیٰ نے امتِ محمدیہ پر براہِ راست کون سا بنیادی رکن فرض فرمایا؟',
    optionsEn: [
      'The Fasting of the month of Ramadan',
      'The Five Daily Obligatory Prayers (Salah)',
      'The Obligation of Zakat al-Fitr',
      'The Ritual Pilgrimage (Hajj)',
    ],
    optionsUr: [
      'رمضان المبارک کے روزے',
      'پانچ وقت کی فرض نمازیں (صلوٰۃ)',
      'زکوٰۃ الفطر کی فرضیت',
      'حج بیت اللہ کی ادائیگی',
    ],
    correctIndex: 1,
    explanationEn:
      'Unlike all other commandments revealed via Angel Jibril on earth, the Five Daily Prayers were gifted directly by Allah to the Prophet ﷺ during the Mi\'raj above the Lote Tree of the Utmost Boundary (Sidrat al-Muntaha). Initially decreed as 50 prayers, it was reduced to 5 in practice yet remains 50 in reward.',
    explanationUr:
      'نماز وہ واحد عبادت ہے جو فرشتے کے واسطے کے بغیر سدرۃ المنہیٰ کے اوپر معراج کی شب براہِ راست تحفہ کے طور پر فرض کی گئی، جو عمل میں پانچ اور اجر میں پچاس کے برابر ہے۔',
    reference: 'Sahih al-Bukhari 349 · Sahih Muslim 162',
  },
  {
    id: 'st-4',
    category: 'seerah_timeline',
    questionEn: 'Which landmark covenant concluded in 6 AH was celebrated in the Quran as "a manifest victory" (Fathan Mubeena)?',
    questionUr: '6 ہجری کا وہ کون سا صلح نامہ ہے جسے قرآن مجید میں "فتح مبین" قرار دیا گیا؟',
    optionsEn: [
      'The Charter of Madinah',
      'The Treaty of Hudaybiyyah',
      'The Pledge of the Tree (Bay\'at ar-Ridwan)',
      'The Conquest of Khaybar',
    ],
    optionsUr: [
      'میثاقِ مدینہ',
      'صلح حدیبیہ',
      'بیعتِ رضوان',
      'فتحِ خیبر',
    ],
    correctIndex: 1,
    explanationEn:
      'Surah al-Fath (48:1) opens: "Indeed, We have given you a manifest victory." Although some companions initially felt heartbroken by the concessions of the Treaty of Hudaybiyyah, the ten-year truce permitted peaceful dialogue, resulting in more people accepting Islam over the next two years than in the previous eighteen years combined.',
    explanationUr:
      'صلح حدیبیہ (6 ہجری) کو قرآن میں "فتح مبین" کہا گیا۔ اس صلح کے نتیجے میں قریش کے ساتھ جنگ بندی ہوئی اور امن کی فضا میں اگلے دو سال کے اندر اتنے لوگ مسلمان ہوئے جتنے پچھلے اٹھارہ سالوں میں نہیں ہوئے تھے۔',
    reference: 'Al-Fath 48:1 · Sahih al-Bukhari 2731',
  },
  {
    id: 'st-5',
    category: 'seerah_timeline',
    questionEn: 'In what year of the Hijrah did the Prophet Muhammad ﷺ perform his sole, comprehensive "Farewell Pilgrimage" (Hajjat al-Wida\')?',
    questionUr: 'نبی کریم ﷺ نے اپنا تاریخی اور آخری حج (حجۃ الوداع) کس ہجری سال میں ادا فرمایا؟',
    optionsEn: ['8 AH', '9 AH', '10 AH', '12 AH'],
    optionsUr: ['8 ہجری', '9 ہجری', '10 ہجری', '12 ہجری'],
    correctIndex: 2,
    explanationEn:
      'In Dhul-Hijjah of 10 AH, the Prophet ﷺ performed his only Hajj after the Hijrah accompanied by more than 100,000 companions. There on the plains of Arafat, he delivered his universal Farewell Sermon declaring human equality, the sanctity of life and wealth, women\'s rights, and the completion of the divine religion (Al-Ma\'idah 5:3).',
    explanationUr:
      '10 ہجری میں آپ ﷺ نے سوا لاکھ سے زائد صحابہ کے ساتھ حجۃ الوداع ادا فرمایا اور میدانِ عرفات میں خطبہ دیتے ہوئے مساوات، انسانی حقوق اور دین کی تکمیل کا اعلان فرمایا۔',
    reference: 'Sahih Muslim 1218 (Hadith of Jabir) · Al-Ma’idah 5:3',
  },

  // =========================================================================
  // 4. NOBLE SAHABAH (الصحابة الكرام)
  // =========================================================================
  {
    id: 'ns-1',
    category: 'noble_sahabah',
    questionEn: 'Which Companion was honored with the extraordinary title "Al-Faruq" for openly distinguishing truth from falsehood in Makkah?',
    questionUr: 'کس جلیل القدر صحابی کو حق اور باطل میں فرق واضح کرنے پر "فاروقِ اعظم" کا لقب عطا ہوا؟',
    optionsEn: [
      'Hamzah ibn Abdul-Muttalib (RA)',
      'Umar ibn al-Khattab (RA)',
      'Abu Ubaydah ibn al-Jarrah (RA)',
      'Sa\'d ibn Abi Waqqas (RA)',
    ],
    optionsUr: [
      'حضرت حمزہ بن عبدالمطلب رضی اللہ عنہ',
      'حضرت عمر بن الخطاب رضی اللہ عنہ',
      'حضرت ابو عبیدہ بن الجراح رضی اللہ عنہ',
      'حضرت سعد بن ابی وقاص رضی اللہ عنہ',
    ],
    correctIndex: 1,
    explanationEn:
      'Umar ibn al-Khattab (RA) embraced Islam in the 6th year of Prophethood following the du\'a of the Prophet ﷺ. His conversion brought tremendous public strength to the oppressed believers, allowing them to pray openly at the Ka\'bah in two rows led by Hamzah (RA) and Umar (RA).',
    explanationUr:
      'حضرت عمر فاروقؓ کے قبولِ اسلام سے مسلمانوں کو مکہ میں اعلانیہ کعبہ کے سامنے باجماعت نماز پڑھنے کی ہمت ملی اور نبی کریم ﷺ نے آپ کو "الفاروق" کا لقب عطا فرمایا۔',
    reference: 'Ibn Majah 105 · Siyar A‘lam an-Nubala',
  },
  {
    id: 'ns-2',
    category: 'noble_sahabah',
    questionEn: 'Why was the third Caliph, Sayyiduna Uthman ibn Affan (RA), blessed with the unique honorific "Dhun-Nurayn" (Possessor of the Two Lights)?',
    questionUr: 'تیسرے خلیفہ راشد حضرت عثمان بن عفان رضی اللہ عنہ کو "ذو النورین" (دو نوروں والا) کیوں کہا جاتا ہے؟',
    optionsEn: [
      'Because he prayed all of Fajr and Isha under two lanterns in the Prophet\'s Mosque',
      'Because he had the unmatched distinction of marrying two daughters of the Prophet ﷺ (Ruqayyah, then Umm Kulthum)',
      'Because he donated two golden wells in Madinah to the Muslims',
      'Because he was literate in both Arabic and Syriac scripts',
    ],
    optionsUr: [
      'کیونکہ وہ مسجد نبوی میں دو چراغوں کے سامنے نماز ادا کرتے تھے',
      'کیونکہ انہیں رسول اللہ ﷺ کی دو صاحبزادیوں (حضرت رقیہ اور ان کے وصال کے بعد حضرت ام کلثوم) سے یکے بعد دیگرے نکاح کا شرف ملا',
      'کیونکہ انہوں نے مدینہ میں دو میٹھے کنویں وقف کیے تھے',
      'کیونکہ وہ عربی اور سریانی دونوں زبانیں لکھنا جانتے تھے',
    ],
    correctIndex: 1,
    explanationEn:
      'No other human in recorded prophetic history married two daughters of a Prophet. Uthman (RA) married Ruqayyah (RA), and after her passing following the Battle of Badr, he married Umm Kulthum (RA). When Umm Kulthum passed away in 9 AH, the Prophet ﷺ remarked that if he had a third daughter, he would have married her to Uthman.',
    explanationUr:
      'حضرت عثمان غنیؓ نے رسول اللہ ﷺ کی دو صاحبزادیوں حضرت رقیہؓ اور ان کے بعد حضرت ام کلثومؓ سے یکے بعد دیگرے نکاح فرمایا، اسی لیے آپ کو تاریخ میں "ذوالنورین" کہا جاتا ہے۔',
    reference: 'Siyar A‘lam an-Nubala · Al-Bidayah wan-Nihayah',
  },
  {
    id: 'ns-3',
    category: 'noble_sahabah',
    questionEn: 'Which fearless Companion was named by the Prophet ﷺ as "Sayfullah" (The Drawn Sword of Allah) following his brilliant generalship at the Battle of Mu\'tah?',
    questionUr: 'غزوۂ موتہ میں شاندار عسکری حکمتِ عملی پر کس عظیم سپہ سالار صحابی کو نبی کریم ﷺ نے "سیف اللہ" کا خطاب دیا؟',
    optionsEn: [
      'Ali ibn Abi Talib (RA)',
      'Khalid ibn al-Walid (RA)',
      'Al-Qa\'qa\' ibn \'Amr (RA)',
      'Amr ibn al-\'As (RA)',
    ],
    optionsUr: [
      'حضرت علی بن ابی طالب رضی اللہ عنہ',
      'حضرت خالد بن ولید رضی اللہ عنہ',
      'حضرت قعقاع بن عمرو رضی اللہ عنہ',
      'حضرت عمرو بن العاص رضی اللہ عنہ',
    ],
    correctIndex: 1,
    explanationEn:
      'At the Battle of Mu\'tah (8 AH) against the Byzantine coalition, after the three designated commanders (Zayd, Ja\'far, and Ibn Rawahah) were martyred, Khalid ibn al-Walid (RA) took the banner, broke nine swords in battle, reorganized the lines, and safely withdrew the Muslim army. The Prophet ﷺ announced in Madinah: "...until the banner was taken by a sword from the swords of Allah."',
    explanationUr:
      'غزوۂ موتہ میں تینوں امراء کی شہادت کے بعد حضرت خالد بن ولیدؓ نے قیادت سنبھالی، نو تلواریں ٹوٹیں اور فوج کو محفوظ نکالا۔ مدینہ میں آپ ﷺ نے فرمایا: "یہاں تک کہ جھنڈا اللہ کی تلواروں میں سے ایک تلوار نے تھام لیا۔"',
    reference: 'Sahih al-Bukhari 3757',
  },
  {
    id: 'ns-4',
    category: 'noble_sahabah',
    questionEn: 'Which Companion served the Prophet ﷺ with utmost devotion for ten full years in Madinah without ever hearing a single word of rebuke or irritation?',
    questionUr: 'مدینہ منورہ میں کس صحابی نے دس سال تک رسول اللہ ﷺ کی خدمت کی اور کبھی کوئی ڈانٹ ڈپٹ یا ناراضگی کا لفظ نہیں سنا؟',
    optionsEn: [
      'Zayd ibn Harithah (RA)',
      'Anas ibn Malik (RA)',
      'Bilal ibn Rabah (RA)',
      'Abdullah ibn Abbas (RA)',
    ],
    optionsUr: [
      'حضرت زید بن حارثہ رضی اللہ عنہ',
      'حضرت انس بن مالک رضی اللہ عنہ',
      'حضرت بلال بن رباح رضی اللہ عنہ',
      'حضرت عبداللہ بن عباس رضی اللہ عنہ',
    ],
    correctIndex: 1,
    explanationEn:
      'Anas ibn Malik (RA) was brought by his mother Umm Sulaym to the Prophet ﷺ at age ten upon the Hijrah. Anas testified: "I served the Prophet ﷺ for ten years. By Allah, he never said to me \'Uff\' (an expression of annoyance), nor did he ever say about something I did, \'Why did you do that?\' or about something I did not do, \'Why did you not do that?\'"',
    explanationUr:
      'حضرت انس بن مالکؓ فرماتے ہیں کہ میں نے دس سال رسول اللہ ﷺ کی خدمت کی، اللہ کی قسم آپ نے کبھی مجھے اف تک نہیں فرمایا اور نہ کبھی کسی کام پر سرزنش فرمائی۔',
    reference: 'Sahih al-Bukhari 6038 · Sahih Muslim 2309',
  },
  {
    id: 'ns-5',
    category: 'noble_sahabah',
    questionEn: 'Who is the "Trustee of this Ummah" (Ameen haadheehil-Ummah) as designated by the Prophet Muhammad ﷺ?',
    questionUr: 'نبی کریم ﷺ نے کس جلیل القدر صحابی کو "امین الامۃ" (اس امت کا امانت دار) قرار دیا؟',
    optionsEn: [
      'Abu Ubaydah \'Amir ibn al-Jarrah (RA)',
      'Uthman ibn Maz\'un (RA)',
      'Hudhayfah ibn al-Yaman (RA)',
      'Sa\'id ibn Zayd (RA)',
    ],
    optionsUr: [
      'حضرت ابو عبیدہ عامر بن الجراح رضی اللہ عنہ',
      'حضرت عثمان بن مظعون رضی اللہ عنہ',
      'حضرت حذیفہ بن الیمان رضی اللہ عنہ',
      'حضرت سعید بن زید رضی اللہ عنہ',
    ],
    correctIndex: 0,
    explanationEn:
      'In Sahih al-Bukhari and Sahih Muslim, the Prophet ﷺ stated: "Every nation has an Ameen (trustee), and the Ameen of this nation is Abu Ubaydah ibn al-Jarrah." When the Christians of Najran requested an honest arbitrator, the Prophet ﷺ sent Abu Ubaydah.',
    explanationUr:
      'رسول اللہ ﷺ نے فرمایا: "ہر امت کا ایک امین ہوتا ہے اور اس امت کے امین ابو عبیدہ بن الجراح ہیں۔" جب نجران کے وفد نے امانت دار بھیجنے کا کہا تو آپ ﷺ نے انہی کو بھیجا۔',
    reference: 'Sahih al-Bukhari 3744 · Sahih Muslim 2419',
  },

  // =========================================================================
  // 5. DUAS & FIQH (الأدعية والفقه)
  // =========================================================================
  {
    id: 'df-1',
    category: 'duas_and_fiqh',
    questionEn: 'What is the master supplication for seeking forgiveness called by the Prophet ﷺ "Sayyid al-Istighfar"?',
    questionUr: 'نبی کریم ﷺ کی سکھائی ہوئی استغفار کی سب سے عظیم ترین دعا "سید الاستغفار" کے ابتدائی الفاظ کیا ہیں؟',
    optionsEn: [
      '"Rabbighfir li wa tub \'alayya innaka Antat-Tawwabur-Rahim"',
      '"Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana \'abduk..."',
      '"Astaghfirullah al-\'Adheem alladhi la ilaha illa Huwal-Hayyul-Qayyum"',
      '"Subhanallahi wa bihamdihi astaghfirullaha wa atoobu ilayh"',
    ],
    optionsUr: [
      '"رب اغفر لي وتب علي إنك أنت التواب الرحيم"',
      '"اللہم انت ربی لا الہ الا انت خلقتنی وانا عبدک..."',
      '"استغفر اللہ العظیم الذی لا الہ الا ہو الحی القیوم"',
      '"سبحان اللہ وبحمدہ استغفر اللہ واتوب الیہ"',
    ],
    correctIndex: 1,
    explanationEn:
      'In Sahih al-Bukhari, the Prophet ﷺ taught Sayyid al-Istighfar and said: "Whoever recites this during the day with firm conviction and dies before evening will be among the people of Paradise; and whoever recites it at night with conviction and dies before morning will be among the people of Paradise."',
    explanationUr:
      'صحیح بخاری میں شداد بن اوسؓ سے مروی "سید الاستغفار" کے بارے میں آپ ﷺ نے فرمایا کہ جو شخص یقین کے ساتھ صبح پڑھے اور شام سے پہلے فوت ہو جائے یا شام کو پڑھے اور صبح سے پہلے فوت ہو جائے وہ جنتی ہے۔',
    reference: 'Sahih al-Bukhari 6306',
  },
  {
    id: 'df-2',
    category: 'duas_and_fiqh',
    questionEn: 'If a praying person experiences doubt in Salah regarding whether they prayed three or four rak\'ahs, what is the Sunnah ruling for rectification?',
    questionUr: 'اگر نماز میں شک ہو جائے کہ تین رکعتیں پڑھی ہیں یا چار، تو شرعی سنت طریقہ کیا ہے؟',
    optionsEn: [
      'Break the prayer immediately and restart from Takbirat al-Ihram',
      'Build upon certainty (the lesser number, 3), complete the fourth, and make Sujud as-Sahw',
      'Ask the person praying next to you while in standing posture',
      'Always assume the higher number (4) without any prostrations',
    ],
    optionsUr: [
      'نماز فوراً توڑ کر تکبیر تحریمہ سے نئے سرے سے شروع کرے',
      'یقین پر بنیاد رکھے یعنی کم تعداد (3) مانے، چوتھی رکعت پوری کرے اور سجدہ سہو کرے',
      'قیام کی حالت میں برابر والے نمازی سے پوچھے',
      'ہمیشہ زیادہ تعداد (4) مان کر سجدہ سہو چھوڑ دے',
    ],
    correctIndex: 1,
    explanationEn:
      'In Sahih Muslim, the Prophet ﷺ instructed: "If any of you doubts in his prayer and does not know whether he prayed three or four, let him cast away doubt and build upon what is certain (the lesser number). Then let him prostrate two prostrations (Sujud as-Sahw) before Taslim."',
    explanationUr:
      'صحیح مسلم میں ابو سعید خدریؓ سے مروی ہے کہ اگر نماز میں رکعتوں کی تعداد میں شک ہو تو شک کو چھوڑ کر یقین (کم تعداد) پر بنیاد رکھے اور سلام سے پہلے دو سجدۂ سہو کرے۔',
    reference: 'Sahih Muslim 571',
  },
  {
    id: 'df-3',
    category: 'duas_and_fiqh',
    questionEn: 'What is the required lunar Nisab threshold for gold in Islamic Fiqh before the 2.5% Zakah obligation becomes due on surplus wealth held for one full Hawl?',
    questionUr: 'سونے پر زکوٰۃ فرض ہونے کا شرعی نصاب کیا ہے جس پر سال گزرنے کے بعد اڑھائی فیصد (2.5%) زکوٰۃ فرض ہوتی ہے؟',
    optionsEn: [
      '10 Mithqals (approximately 42.5 grams)',
      '20 Mithqals (approximately 85 grams of pure gold)',
      '50 Mithqals (approximately 212.5 grams)',
      '100 Mithqals (approximately 425 grams)',
    ],
    optionsUr: [
      '10 مثقال (تقریباً 42.5 گرام)',
      '20 مثقال (تقریباً 85 گرام خالص سونا)',
      '50 مثقال (تقریباً 212.5 گرام)',
      '100 مثقال (تقریباً 425 گرام)',
    ],
    correctIndex: 1,
    explanationEn:
      'Based on the Sunnah of the Prophet ﷺ and unanimous consensus (Ijma\'), the Nisab for gold is 20 Dinars/Mithqals, equivalent to approximately 85 grams of fine gold (or 200 Dirhams of silver, equivalent to 595 grams). Once surplus wealth reaches this Nisab for one complete lunar year (Hawl), 2.5% (one fortieth) is distributed to eligible recipients (Surah at-Tawbah 9:60).',
    explanationUr:
      'سونے کا شرعی نصاب بیس مثقال (تقریباً 85 گرام سونا) اور چاندی کا نصاب دو سو درہم (595 گرام چاندی) ہے۔ سال مکمل ہونے پر 2.5 فیصد زکوٰۃ مستحقین کو ادا کرنا فرض ہے۔',
    reference: 'Sunan Abi Dawud 1573 · Al-Majmu‘ (an-Nawawi)',
  },
  {
    id: 'df-4',
    category: 'duas_and_fiqh',
    questionEn: 'Which powerful morning and evening supplication guarantees safety from all sudden harm when recited three times?',
    questionUr: 'کون سی مسنون دعا صبح و شام تین تین مرتبہ پڑھنے سے زمین و آسمان کی ہر آفت اور نقصان سے حفاظت کی ضمانت ملتی ہے؟',
    optionsEn: [
      '"Bismillahilladhi la yadurru ma\'as-mihi shay\'un fil-ardi wa la fis-sama\'i wa Huwas-Sami\'ul-\'Alim"',
      '"Allahumma inni as\'aluka \'ilman nafi\'an wa rizqan tayyiban"',
      '"Subhanallahi \'adada khalqihi wa rida nafsihi"',
      '"Hasbiyallahu la ilaha illa Huwa \'alayhi tawakkaltu"',
    ],
    optionsUr: [
      '"بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم"',
      '"اللہم انی اسألک علماً نافعاً ورزقاً طیباً"',
      '"سبحان اللہ عدد خلقہ ورضا نفسہ"',
      '"حسبی اللہ لا الہ الا ہو علیہ توکلت"',
    ],
    correctIndex: 0,
    explanationEn:
      'Reported by Uthman ibn Affan (RA), the Prophet ﷺ said: "There is no servant who says three times each morning and each evening: \'In the Name of Allah with Whose Name nothing can cause harm in the earth nor in the heaven, and He is the All-Hearing, the All-Knowing,\' except that nothing will harm him."',
    explanationUr:
      'حضرت عثمان غنیؓ سے مروی ہے کہ نبی کریم ﷺ نے فرمایا جو شخص صبح اور شام تین بار "بسم اللہ الذی لا یضر..." پڑھے اسے کوئی بھی چیز نقصان نہیں پہنچا سکتی۔',
    reference: 'Jami‘ at-Tirmidhi 3388 · Sunan Abi Dawud 5088',
  },
  {
    id: 'df-5',
    category: 'duas_and_fiqh',
    questionEn: 'What essential action is obligatory if someone eats or drinks during a voluntary or mandatory fast out of sheer forgetfulness?',
    questionUr: 'اگر کوئی روزہ دار بھول چوک سے کچھ کھا پی لے تو شریعت کا کیا حکم ہے؟',
    optionsEn: [
      'The fast is completely broken and must be made up with 60 days of Kaffarah',
      'The fast remains completely valid; they should swallow what is in their mouth, stop immediately upon remembering, and complete the fast',
      'They must pay feeding for ten poor people',
      'They should continue eating until sunset as the fast is invalid',
    ],
    optionsUr: [
      'روزہ ٹوٹ گیا اور 60 دن کا کفارہ لازم ہوگا',
      'روزہ بالکل صحیح ہے، یاد آتے ہی فوراً رک جائے اور روزہ مکمل کرے، کیونکہ اللہ نے اسے کھلایا پلایا',
      'دس مسکینوں کو کھانا کھلانا ہوگا',
      'روزہ باطل ہو گیا اس لیے سارا دن کھاتا پیتا رہے',
    ],
    correctIndex: 1,
    explanationEn:
      'In Sahih al-Bukhari and Sahih Muslim, the Prophet ﷺ stated: "Whoever forgets while he is fasting and eats or drinks, let him complete his fast, for it was only Allah Who fed him and gave him drink." No Qada (makeup) or Kaffarah (expiation) is required.',
    explanationUr:
      'صحیح بخاری و مسلم میں حضرت ابو ہریرہؓ سے مروی ہے کہ نبی کریم ﷺ نے فرمایا: "جو بھول کر کھا پی لے وہ اپنا روزہ پورا کرے، کیونکہ اسے اللہ نے کھلایا اور پلایا ہے۔" اس پر کوئی قضا نہیں۔',
    reference: 'Sahih al-Bukhari 1933 · Sahih Muslim 1155',
  },
];
