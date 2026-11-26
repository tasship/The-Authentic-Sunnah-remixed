import { GreatImamProfile, SalafQuoteItem, SalafTopicItem } from '../types';

export const SALAF_TOPICS: SalafTopicItem[] = [
  {
    id: 'salaf-definition',
    order: 1,
    titleEn: '1. Who are the Salaf as-Salih? (The Pious Predecessors)',
    titleUr: '۱۔ سلفِ صالحین کون ہیں؟ (خیرالقرون کے تین مبارک ادوار)',
    reference: 'Sahih al-Bukhari 2652 · Sahih Muslim 2533',
    summaryEn: [
      'Linguistically, "As-Salaf" means those who preceded us in time and status. In Islamic scholarship, "As-Salaf as-Salih" (the Pious Predecessors) specifically denotes the first three blessed generations praised by the Prophet Muhammad ﷺ when he declared: "The best of people are my generation, then those who follow them, then those who follow them."',
      'These three generations are: First, the Sahabah (Companions who met the Prophet ﷺ in faith and died upon Islam); Second, the Tabi‘un (Successors who learned directly from the Companions); and Third, the Atba‘ at-Tabi‘in (Followers of the Successors), alongside the towering early scholars of Hadith and Fiqh who preserved their unified methodology.',
    ],
    summaryUr: [
      'لغت میں "سلف" کے معنی پیشرو اور گزرے ہوئے بزرگوں کے ہیں۔ شرعی اصطلاح میں "سلفِ صالحین" سے مراد اسلام کے وہ ابتدائی تین مبارک ادوار ہیں جن کی فضیلت کی گواہی خود رسول اللہ ﷺ نے دی: "سب سے بہترین لوگ میرے زمانے (صحابہ) کے ہیں، پھر وہ جو ان کے بعد آئیں گے (تابعین)، پھر وہ جو ان کے بعد آئیں گے (تبع تابعین)۔"',
      'ان تینوں نسلوں نے قرآن و سنت کو براہِ راست نبوی تربیت اور خالص فہم کے ساتھ محفوظ کیا، اور بعد کی تمام صدیوں کے ائمہ محدثین و فقہاء ان ہی کے منہج پر چلتے رہے۔',
    ],
    keyPointsEn: [
      'First Generation (Sahabah): Direct students of revelation who sacrificed everything for Islam.',
      'Second & Third Generations (Tabi‘un & Atba‘ at-Tabi‘in): Preserved the Sunnah chains, Tafsir, and Arabic eloquence.',
      'Following the Salaf is not an added sect; it is anchoring our understanding of Quran and Sunnah to the Prophet’s own students.',
    ],
    keyPointsUr: [
      'صحابہ کرام رضوان اللہ علیہم اجمعین: وحی کے براہِ راست شاگرد اور دین کے اولین محافظ۔',
      'تابعین اور تبع تابعین: اسنادِ حدیث، تفسیر اور فقہِ اسلامی کی تدوین کرنے والے ائمہ۔',
      'منہجِ سلف کوئی الگ فرقہ نہیں بلکہ قرآن و سنت کو صحابہ کے فہم کے مطابق سمجھنے کا نام ہے۔',
    ],
  },
  {
    id: 'salaf-why-follow',
    order: 2,
    titleEn: '2. Why Understanding Islam Like the Salaf Matters',
    titleUr: '۲۔ قرآن و سنت کو فہمِ سلف کے مطابق سمجھنے کی اہمیت',
    reference: 'An-Nisa 4:115 · At-Tawbah 9:100 · Al-Baqarah 2:137 · Sunan Abi Dawud 4607',
    summaryEn: [
      'Allah Himself made the faith of the Companions the benchmark of true guidance when He revealed in Surah al-Baqarah (2:137): "So if they believe in the same as you believe in, then they have been rightly guided." And in Surah at-Tawbah (9:100), Allah declared His eternal pleasure with the Muhajirun, the Ansar, and "those who follow them with excellence (bi-Ihsan)."',
      'In Surah an-Nisa (4:115), Allah warns against opposing the Messenger ﷺ and "following a path other than the path of the believers." When later disputes and philosophical sects emerged, adhering to the authentic chains and consensus of the Salaf protected Muslims from misinterpreting verses out of personal desire.',
    ],
    summaryUr: [
      'اللہ تعالیٰ نے خود صحابہ کرامؓ کے ایمان کو ہدایت کا معیار قرار دیا: "اگر وہ اسی طرح ایمان لائیں جیسے تم ایمان لائے ہو تو یقیناً ہدایت پا جائیں گے" (البقرہ 2:137)۔ اور سورہ توبہ (9:100) میں مہاجرین، انصار اور "احسان کے ساتھ ان کی پیروی کرنے والوں" سے اپنی رضا کا اعلان فرمایا۔',
      'رسول اللہ ﷺ نے بھی امت کو وصیت فرمائی کہ اختلافات کے وقت میری سنت اور میرے ہدایت یافتہ خلفائے راشدین کی سنت کو مضبوطی سے تھامے رکھنا اور نئی بدعات سے بچنا۔',
    ],
    keyPointsEn: [
      'The Companions witnessed the occasions of revelation (Asbab an-Nuzul) and saw how the Prophet ﷺ practiced every command.',
      'Hadith al-‘Irbad ibn Sariyah instructs clinging to the Sunnah and the Rightly Guided Caliphs during later disagreements.',
    ],
    keyPointsUr: [
      'صحابہ کرامؓ نے نزولِ وحی کے حالات اور نبی کریم ﷺ کے عملی اسوہ کا براہِ راست مشاہدہ کیا۔',
      'حدیثِ عرباض بن ساریہؓ میں اختلاف کے وقت سنتِ نبوی اور خلفائے راشدین کے طریقے پر جمنے کا حکم ہے۔',
    ],
  },
  {
    id: 'salaf-manhaj-principles',
    order: 3,
    titleEn: '3. Five Core Principles of the Manhaj of the Salaf',
    titleUr: '۳۔ منہجِ سلف کے پانچ بنیادی اصول',
    reference: 'Al-An‘am 6:153 · Al-Ahzab 33:21 · Ali ‘Imran 3:103 · Sahih al-Bukhari 2697',
    summaryEn: [
      'First: Pure Tawheed and Aqeedah — affirming Allah’s Names and Attributes as He revealed them without twisting meanings or comparing Him to creation, and dedicating every worship act exclusively to Him. Second: Strict adherence to the authentic Sunnah — verifying reports with unbroken chains (Isnad) and rejecting religious innovations (Bid‘ah) introduced without proof.',
      'Third: Reverence for authentic scholarship without blind fanaticism — honoring the Four Imams and jurists while holding every human opinion subordinate to clear Quran and Sahih Hadith. Fourth: Purifying the soul (Tazkiyah) through Quran, night prayer, humility, and fear of Allah. Fifth: Unity upon truth and noble Adab in correcting errors with wisdom and mercy.',
    ],
    summaryUr: [
      'پہلا اصول: خالص توحید اور عقیدۂ صحیحہ—اللہ کی صفات کو بغیر تاویل و تشبیہ کے ماننا اور عبادت کو شرک سے پاک رکھنا۔ دوسرا اصول: اتباعِ سنت اور بدعات سے اجتناب—دین میں صرف صحیح اسناد سے ثابت شدہ طریقے پر عمل کرنا۔',
      'تیسرا اصول: ائمہ مجتہدین اور علماء کا احترام مگر ہر قول کو قرآن و حدیث کی کسوٹی پر پرکھنا۔ چوتھا اصول: تزکیۂ نفس، اخلاص اور خشیتِ الٰہی۔ پانچواں اصول: امت کی وحدت، خیرخواہی اور حکمت و ادب کے ساتھ دعوت۔',
    ],
    keyPointsEn: [
      'Verification via Isnad (chain of narration) was pioneered by the Salaf as part of safeguarding religion.',
      'Heart-softening piety (Zuhd & Ikhlas) went hand-in-hand with rigorous Hadith and Fiqh mastery.',
    ],
    keyPointsUr: [
      'سلفِ صالحین نے سند کی تحقیق کو دین کی حفاظت کا بنیادی ستون قرار دیا۔',
      'ان کے ہاں علمِ حدیث و فقہ کے ساتھ زہد، تقویٰ اور اخلاص لازم و ملزوم تھے۔',
    ],
  },
];

export const SALAF_QUOTES: SalafQuoteItem[] = [
  {
    id: 'sq-ibn-masud',
    scholar: '‘Abdullah ibn Mas‘ud (RA)',
    scholarUrdu: 'حضرت عبداللہ بن مسعود رضی اللہ عنہ',
    era: 'd. 32 AH · Senior Companion & Jurist',
    quoteEn:
      'Follow and do not innovate, for you have been sufficed. Every matter of guidance is the Book of Allah and the example of His Prophet ﷺ.',
    quoteUr:
      'اتباع کرو اور دین میں نئی چیزیں ایجاد نہ کرو، کیونکہ تمہارے لیے (سنت) کافی کر دی گئی ہے؛ ہر خیر اللہ کی کتاب اور نبی ﷺ کے طریقے کی پیروی میں ہے۔',
    source: 'Al-Lalika’i, Sharh Usul I‘tiqad Ahl as-Sunnah (104)',
  },
  {
    id: 'sq-malik',
    scholar: 'Imam Malik ibn Anas',
    scholarUrdu: 'امام مالک بن انس رحمہ اللہ',
    era: '93–179 AH · Imam of Dar al-Hijrah (Madinah)',
    quoteEn:
      'The Sunnah is like the Ark of Nuh: whoever boards it is saved, and whoever stays behind from it drowns. And the latter part of this Ummah will never be rectified except by that which rectified its beginning.',
    quoteUr:
      'سنتِ نبوی حضرت نوحؑ کی کشتی کی مانند ہے؛ جو اس پر سوار ہو گیا وہ نجات پا گیا اور جو پیچھے رہ گیا وہ ہلاک ہو گیا۔ اس امت کے آخری حصے کی اصلاح بھی صرف اسی چیز سے ہو گی جس سے اس کے اولین حصے کی اصلاح ہوئی تھی۔',
    source: 'Tarikh Baghdad & Ash-Shifa by Qadi ‘Iyad',
  },
  {
    id: 'sq-awzai',
    scholar: 'Imam ‘Abd ar-Rahman al-Awza‘i',
    scholarUrdu: 'امام عبد الرحمٰن اوزاعی رحمہ اللہ',
    era: '88–157 AH · Great Imam of Ash-Sham',
    quoteEn:
      'Patiently restrict yourself to the Sunnah, stop where the Companions stopped, say what they said, refrain from what they refrained from, and tread the path of your Pious Predecessors (As-Salaf as-Salih), for surely what sufficed them will suffice you.',
    quoteUr:
      'اپنے آپ کو سنت پر صبر کے ساتھ روکے رکھو، جہاں صحابہ رکے وہیں رک جاؤ، جو انہوں نے کہا وہی کہو، جس سے وہ رکے اس سے رک جاؤ، اور اپنے سلفِ صالحین کے راستے پر چلو، کیونکہ جو چیز ان کے لیے کافی تھی وہ تمہارے لیے بھی کافی ہے۔',
    source: 'Al-Ajurri, Ash-Shari‘ah (1/445)',
  },
  {
    id: 'sq-thawri',
    scholar: 'Imam Sufyan ath-Thawri',
    scholarUrdu: 'امام سفیان ثوری رحمہ اللہ',
    era: '97–161 AH · Amir al-Mu’minin fil-Hadith',
    quoteEn:
      'No word is accepted except with action, and neither word nor action is valid without sincere intention, and neither word, action, nor intention is accepted unless it accords with the Sunnah.',
    quoteUr:
      'کوئی قول عمل کے بغیر قبول نہیں، کوئی قول و عمل نیت کے بغیر درست نہیں، اور قول، عمل اور نیت سب اس وقت تک مقبول نہیں جب تک سنت کے مطابق نہ ہوں۔',
    source: 'Al-Lalika’i, Sharh Usul I‘tiqad Ahl as-Sunnah (1/57)',
  },
  {
    id: 'sq-ahmad',
    scholar: 'Imam Ahmad ibn Hanbal',
    scholarUrdu: 'امام احمد بن حنبل رحمہ اللہ',
    era: '164–241 AH · Imam of Ahl as-Sunnah',
    quoteEn:
      'The foundations of the Sunnah with us are: holding fast to what the Companions of the Messenger of Allah ﷺ were upon, following their example, and abandoning innovations—for every innovation in religion is misguidance.',
    quoteUr:
      'ہمارے نزدیک سنت کی بنیاد یہ ہے کہ جس راستے پر رسول اللہ ﷺ کے صحابہ کرامؓ تھے اس کو مضبوطی سے تھاما جائے، ان کی اقتدا کی جائے اور ہر بدعت کو چھوڑ دیا جائے۔',
    source: 'Usul as-Sunnah by Imam Ahmad (1)',
  },
  {
    id: 'sq-ibn-mubarak',
    scholar: 'Imam ‘Abdullah ibn al-Mubarak',
    scholarUrdu: 'امام عبداللہ بن مبارک رحمہ اللہ',
    era: '118–181 AH · Scholar, Mujahid & Ascetic',
    quoteEn:
      'The chain of narration (Al-Isnad) is part of the religion. Were it not for the chain of narration, anyone could say whatever they wished.',
    quoteUr:
      'اسناد (روایت کی مستند زنجیر) دین کا حصہ ہے؛ اگر اسناد نہ ہوتیں تو جو شخص جو چاہتا دین کے نام پر کہہ دیتا۔',
    source: 'Introduction to Sahih Muslim (1/15)',
  },
  {
    id: 'sq-fudayl',
    scholar: 'Imam Al-Fudayl ibn ‘Iyad',
    scholarUrdu: 'امام فضیل بن عیاض رحمہ اللہ',
    era: '107–187 AH · Devout Scholar of Makkah',
    quoteEn:
      'Allah asks for deeds that are both Khalis (purely sincere for Him) and Sawab (in accordance with the Sunnah of His Messenger ﷺ). If a deed is sincere yet lacks Sunnah, or matches Sunnah yet lacks sincerity, it is rejected until both unite.',
    quoteUr:
      'اللہ کے ہاں وہی عمل مقبول ہے جو خالص (صرف اللہ کی رضا کے لیے) اور صواب (نبی کریم ﷺ کی سنت کے مطابق) ہو؛ ان میں سے ایک شرط بھی کم ہو تو عمل قبول نہیں ہوتا۔',
    source: 'Hilyat al-Awliya & Tafsir Ibn Kathir on Al-Mulk 67:2',
  },
  {
    id: 'sq-ibn-kathir',
    scholar: 'Hafiz Ibn Kathir',
    scholarUrdu: 'حافظ ابنِ کثیر رحمہ اللہ',
    era: '701–774 AH · Master Exegete & Historian',
    quoteEn:
      'The soundest method of Tafsir is explaining the Quran by the Quran itself, then by the authentic Sunnah of the Messenger ﷺ, then by the statements of the Companions who witnessed the revelation, and then by the upright Tabi‘un.',
    quoteUr:
      'تفسیر کا سب سے صحیح طریقہ یہ ہے کہ پہلے قرآن کی تفسیر قرآن سے کی جائے، پھر صحیح سنتِ نبوی سے، پھر صحابہ کرامؓ کے اقوال سے اور اس کے بعد اکابر تابعین کی تشریح سے رہنمائی لی جائے۔',
    source: 'Muqaddimah Tafsir al-Qur’an al-‘Azim',
  },
];

export const GREAT_IMAMS: GreatImamProfile[] = [
  {
    id: 'imam-abu-hanifah',
    order: 1,
    name: 'Imam Abu Hanifah',
    nameUrdu: 'امامِ اعظم ابوحنیفہ نعمان بن ثابت رحمہ اللہ',
    fullName: 'Al-Nu‘man ibn Thabit ibn Zuta al-Kufi',
    title: 'Imam al-A‘zam · Pioneer of Analytical Fiqh',
    dates: '80 AH – 150 AH (699 – 767 CE)',
    birthplace: 'Kufah, Iraq',
    schoolName: 'Hanafi Madhhab',
    biographyEn: [
      'Born in Kufah in 80 AH, Imam Abu Hanifah was privileged to live during the era of the junior Companions—narrating that he saw Anas ibn Malik (RA) in Kufah—and studied under towering Tabi‘un scholars including Hammad ibn Abi Sulayman, ‘Ata ibn Abi Rabah in Makkah, and Nafi‘ Mawla Ibn ‘Umar in Madinah.',
      'A pious silk merchant renowned for profound integrity, quiet night worship, and extraordinary analytical depth, he established a scholarly council of forty elite jurists and Hadith experts in Kufah to derive legal rulings systematically for both real and anticipated life situations. He died peacefully in Baghdad in 150 AH after enduring hardship for refusing political judgeship over his conscience.',
    ],
    biographyUr: [
      'امام ابوحنیفہؒ 80 ہجری میں کوفہ میں پیدا ہوئے۔ آپ کو بعض صغار صحابہ مثلاً حضرت انس بن مالکؓ کو دیکھنے کا شرف حاصل ہوا اور آپ نے حماد بن ابی سلیمان، عطاء بن ابی رباح اور نافع مولیٰ ابن عمر جیسے اکابر تابعین سے علم حاصل کیا۔',
      'آپ دیانت دار تاجر، شب بیدار عابد اور غیر معمولی فقہی بصیرت کے مالک تھے۔ آپ نے کوفہ میں چالیس جید فقہاء و محدثین کی شوریٰ قائم کی جو کتاب و سنت کی روشنی میں مسائل کا استنباط کرتی تھی۔ قضا کا منصب قبول نہ کرنے پر آزمائشیں برداشت کیں اور 150 ہجری میں بغداد میں وفات پائی۔',
    ],
    teachersAndStudentsEn:
      'Key Teachers: Hammad ibn Abi Sulayman, ‘Ata ibn Abi Rabah, Ja‘far as-Sadiq, Nafi‘. Prominent Students: Imam Abu Yusuf, Imam Muhammad ibn al-Hasan ash-Shaybani, Zufar ibn al-Hudhayl, ‘Abdullah ibn al-Mubarak.',
    teachersAndStudentsUr:
      'مشہور اساتذہ: حماد بن ابی سلیمان، عطاء بن ابی رباح، امام جعفر صادق، نافع۔ ممتاز شاگرد: امام ابویوسف، امام محمد بن حسن الشیبانی، امام زفر اور حضرت عبداللہ بن مبارکؒ۔',
    methodologyEn: [
      'First sought explicit ruling from the Holy Quran.',
      'Next relied upon authentic Sunnah and Mutawatir / Mashhur Prophetic traditions.',
      'Then gave precedence to consensus and verdicts of the Companions (Fatawa as-Sahabah).',
      'Applied careful Analogical Reasoning (Qiyas), Juristic Preference (Istihsan), and sound Custom (‘Urf) when no direct text existed.',
    ],
    methodologyUr: [
      'سب سے پہلے قرآن مجید سے صریح حکم تلاش کرتے تھے۔',
      'اس کے بعد مستند احادیث اور سنتِ نبوی کو مقدم رکھتے تھے۔',
      'اختلاف کی صورت میں صحابہ کرامؓ کے اقوال میں سے کسی ایک کو اختیار فرماتے تھے۔',
      'نئے مسائل میں قیاسِ صحیح، استحسان اور معروفِ شرعی سے استنباط فرماتے تھے۔',
    ],
    famousWorks: [
      'Al-Fiqh al-Akbar (on Sunni Aqeedah)',
      'Musnad Abi Hanifah (compiled by students)',
      'Kitab al-Athar (transmitted via Imam Muhammad & Abu Yusuf)',
    ],
    statementOnSunnahEn:
      '“When a Hadith is proven authentic (Sahih), that is my Madhhab. It is not permissible for anyone to adopt our opinion without knowing from where we derived it in the Book of Allah or the Sunnah.”',
    statementOnSunnahUr:
      '”جب حدیث صحیح ثابت ہو جائے تو وہی میرا مذہب ہے۔ کسی کے لیے جائز نہیں کہ ہماری دلیل جانے بغیر ہمارا قول اختیار کرے۔“',
  },
  {
    id: 'imam-malik',
    order: 2,
    name: 'Imam Malik ibn Anas',
    nameUrdu: 'امام مالک بن انس رحمہ اللہ',
    fullName: 'Abu ‘Abdullah Malik ibn Anas ibn Malik al-Asbahi',
    title: 'Imam Dar al-Hijrah (Scholar of Madinah)',
    dates: '93 AH – 179 AH (711 – 795 CE)',
    birthplace: 'Madinah al-Munawwarah',
    schoolName: 'Maliki Madhhab',
    biographyEn: [
      'Born and buried in the Illuminated City of Madinah, Imam Malik spent nearly his entire eighty-six years studying and teaching beside the Masjid of the Messenger ﷺ—refusing even to ride a mount inside Madinah out of reverence for the Prophet’s resting place.',
      'Possessing a photographic memory and legendary awe when narrating Hadith, he would make Wudu, wear his finest garments, and burn fragrance before sitting to teach Prophetic traditions. His monumental Al-Muwatta was among the very first written compilations uniting authentic Hadith, Companion verdicts, and continuous living practice of Madinah.',
    ],
    biographyUr: [
      'امام مالکؒ 93 ہجری میں مدینہ منورہ میں پیدا ہوئے اور زندگی بھر نبی کریم ﷺ کے شہر میں علم پھیلاتے رہے۔ مدینہ کی گلیوں میں اس ادب سے چلتے کہ سواری پر بیٹھنے سے گریز کرتے کہ یہاں رسول اللہ ﷺ کی قبرِ مبارک ہے۔',
      'آپ حدیث بیان کرنے سے پہلے باقاعدہ وضو کرتے، عمدہ لباس پہنتے اور خوشبو لگا کر انتہائی وقار سے درس دیتے۔ آپ کی کتاب "المؤطا" حدیث اور فقہ کا اولین مستند مجموعہ ہے جسے اکابر محدثین نے خراجِ تحسین پیش کیا۔',
    ],
    teachersAndStudentsEn:
      'Key Teachers: Nafi‘ Mawla Ibn ‘Umar, Ibn Shihab az-Zuhri, Rabi‘ah ar-Ra’y, Yahya ibn Sa‘id al-Ansari. Prominent Students: Imam ash-Shafi‘i, ‘Abdur-Rahman ibn al-Qasim, Yahya ibn Yahya al-Laythi, Ibn Wahb, ‘Abdullah ibn al-Mubarak.',
    teachersAndStudentsUr:
      'مشہور اساتذہ: نافع مولیٰ ابن عمر، امام زہری، ربیعہ الرائے۔ ممتاز شاگرد: امام شافعی، ابن القاسم، یحییٰ بن یحییٰ اللیثی اور ابن وہب رحمہم اللہ۔',
    methodologyEn: [
      'Absolute primacy of the Quran and authentic Hadith.',
      'Consensus and preserved unbroken practice of the People of Madinah (‘Amal Ahl al-Madinah).',
      'Statements of Companions, Public Welfare grounded in Shari‘ah (Maslahah Mursalah), and Blocking Means to Harm (Sadd adh-Dhara’i‘).',
    ],
    methodologyUr: [
      'قرآن کریم اور صحیح احادیثِ نبویہ کو اولین درجہ دینا۔',
      'اہلِ مدینہ کے تواتر سے چلے آنے والے متفقہ عمل (عملِ اہلِ مدینہ) کی حجیت۔',
      'مصالحِ مرسلہ (شریعت کے مقاصد کے مطابق عوامی بھلائی) اور سدِ ذرائع (برائی کے راستے بند کرنا)۔',
    ],
    famousWorks: [
      'Al-Muwatta Imam Malik (first major Hadith & Fiqh compilation)',
      'Al-Mudawwanah al-Kubra (recorded via Ibn al-Qasim & Sahnun)',
    ],
    statementOnSunnahEn:
      '“Everyone’s statement after the Messenger of Allah ﷺ can be accepted or rejected—except the occupant of this grave (pointing toward the Prophet ﷺ).”',
    statementOnSunnahUr:
      '”رسول اللہ ﷺ کے سوا دنیا میں ہر شخص کی بات لی بھی جا سکتی ہے اور چھوڑی بھی جا سکتی ہے، سوائے اس روضہ اقدس میں آرام فرمانے والے نبی ﷺ کے۔“',
  },
  {
    id: 'imam-shafii',
    order: 3,
    name: 'Imam Muhammad ibn Idris ash-Shafi‘i',
    nameUrdu: 'امام محمد بن ادریس الشافعی رحمہ اللہ',
    fullName: 'Abu ‘Abdullah Muhammad ibn Idris al-Qurashi ash-Shafi‘i',
    title: 'Nasir al-Hadith · Architect of Usul al-Fiqh',
    dates: '150 AH – 204 AH (767 – 820 CE)',
    birthplace: 'Gaza (raised in Makkah)',
    schoolName: 'Shafi‘i Madhhab',
    biographyEn: [
      'Born in 150 AH—the very year Imam Abu Hanifah passed away—into the noble Quraysh lineage of the Prophet’s clan, Imam ash-Shafi‘i memorized the entire Quran by age seven and memorized Imam Malik’s Al-Muwatta by age ten before traveling to Madinah to study directly at Malik’s feet.',
      'Studying both the Madinan Hadith school under Imam Malik and the Iraqi Fiqh tradition under Imam Muhammad ash-Shaybani, ash-Shafi‘i authored Ar-Risalah—the foundational masterpiece establishing the science of Islamic Legal Theory (Usul al-Fiqh). He passed away in Cairo, Egypt in 204 AH.',
    ],
    biographyUr: [
      'امام شافعیؒ 150 ہجری میں پیدا ہوئے۔ آپ کا نسب قریش کے خاندان بنو المطلب سے جا ملتا ہے۔ سات سال کی عمر میں قرآن مجید حفظ کیا اور دس سال کی عمر میں امام مالکؒ کی المؤطا زبانی یاد کر کے مدینہ جا کر امام مالکؒ سے براہِ راست درس لیا۔',
      'آپ نے اہلِ حدیث (مدینہ) اور اہلِ الرائے (عراق) دونوں مکاتبِ فکر کے علوم کو جمع کیا اور "الرسالہ" تصنیف فرما کر علمِ اصولِ فقہ کی باقاعدہ بنیاد رکھی۔ آپ کو "ناصر الحدیث" (حدیث کا مددگار) کا لقب ملا۔ 204 ہجری میں مصر میں وفات پائی۔',
    ],
    teachersAndStudentsEn:
      'Key Teachers: Imam Malik ibn Anas, Sufyan ibn ‘Uyaynah, Muslim ibn Khalid az-Zanji, Imam Muhammad ash-Shaybani. Prominent Students: Imam Ahmad ibn Hanbal, Al-Muzani, Ar-Rabi‘ ibn Sulayman, Al-Buwayti.',
    teachersAndStudentsUr:
      'مشہور اساتذہ: امام مالک بن انس، سفیان بن عیینہ، امام محمد بن حسن الشیبانی۔ ممتاز شاگرد: امام احمد بن حنبل، امام مزنی، ربیع بن سلیمان اور بویطی رحمہم اللہ۔',
    methodologyEn: [
      'Quran and authentic Sunnah stand side-by-side as binding divine revelation.',
      'Prioritized a clear Sahih Hadith even if transmitted by one reliable narrator (Khabar al-Wahid) over unverified custom or speculation.',
      'Structured Consensus (Ijma‘) and disciplined Qiyas strictly anchored to revealed texts.',
    ],
    methodologyUr: [
      'قرآن کریم اور صحیح سنتِ رسول ﷺ دونوں کو حجتِ شرعی قرار دیا۔',
      'اگر صحیح سند سے خبرِ واحد حدیث بھی ثابت ہو جائے تو اسے ہر رائے اور قیاس پر مقدم رکھا۔',
      'اجماع اور منضبط قیاس کے واضح علمی قواعد "الرسالہ" میں مدون فرمائے۔',
    ],
    famousWorks: [
      'Ar-Risalah (Founding text of Usul al-Fiqh)',
      'Kitab al-Umm (Encyclopedic Fiqh compendium)',
      'Musnad ash-Shafi‘i',
    ],
    statementOnSunnahEn:
      '“Muslims are unanimously agreed that whoever encounters a clear Sunnah from the Messenger of Allah ﷺ has no right to abandon it for the statement of any person.”',
    statementOnSunnahUr:
      '”امتِ مسلمہ کا اس پر اجماع ہے کہ جس شخص پر رسول اللہ ﷺ کی کوئی سنت واضح ہو جائے تو اس کے لیے حلال نہیں کہ کسی انسان کے قول کی خاطر اسے ترک کر دے۔“',
  },
  {
    id: 'imam-ahmad',
    order: 4,
    name: 'Imam Ahmad ibn Hanbal',
    nameUrdu: 'امام احمد بن حنبل رحمہ اللہ',
    fullName: 'Abu ‘Abdullah Ahmad ibn Muhammad ibn Hanbal ash-Shaybani',
    title: 'Imam Ahl as-Sunnah · Steadfast Champion of Creed',
    dates: '164 AH – 241 AH (780 – 855 CE)',
    birthplace: 'Baghdad, Iraq',
    schoolName: 'Hanbali Madhhab',
    biographyEn: [
      'Raised as a humble orphan in Baghdad, Imam Ahmad traveled on foot across Iraq, Hijaz, Yemen, and Syria collecting Prophetic traditions—memorizing nearly one million narrations with chains and authoring his monumental Al-Musnad containing over 27,000 Hadiths.',
      'During the fierce Inquisition (Al-Mihnah), when rulers imprisoned, chained, and lashed him to force declaring the Quran "created", Imam Ahmad stood unyielding upon pure Sunni Aqeedah: "Bring me one verse from the Book of Allah or one authentic Hadith!" When he passed away in 241 AH, hundreds of thousands mourned the defender of the Sunnah.',
    ],
    biographyUr: [
      'امام احمد بن حنبلؒ 164 ہجری میں بغداد میں پیدا ہوئے۔ آپ نے یتیمی کی حالت میں علم کا سفر شروع کیا اور مکہ، مدینہ، یمن، شام اور عراق کے طویل اسفار کر کے "المسند" جیسی عظیم الشان کتاب تالیف فرمائی جس میں تقریباً 27 ہزار احادیث شامل ہیں۔',
      'فتنہ خلقِ قرآن کے سخت دور میں جب قید و بند اور کوڑوں کی صعوبتیں دی گئیں تو آپ پہاڑ کی طرح ڈٹے رہے اور فرمایا: "مجھے کتاب اللہ اور سنتِ رسول ﷺ سے دلیل دو"۔ 241 ہجری میں وفات کے وقت لاکھوں افراد نے جنازے میں شرکت کی۔',
    ],
    teachersAndStudentsEn:
      'Key Teachers: Imam ash-Shafi‘i, Sufyan ibn ‘Uyaynah, Yahya ibn Sa‘id al-Qattan, ‘Abdur-Razzaq as-San‘ani, Waki‘ ibn al-Jarrah. Prominent Students: Imam al-Bukhari, Imam Muslim, Imam Abu Dawud, Salih & ‘Abdullah ibn Ahmad.',
    teachersAndStudentsUr:
      'مشہور اساتذہ: امام شافعی، سفیان بن عیینہ، یحییٰ بن سعید القطان، عبدالرزاق صنعانی، وکیع بن جراح۔ ممتاز شاگرد: امام بخاری، امام مسلم، امام ابوداؤد، اور آپ کے صاحبزادگان صالح و عبداللہ رحمہم اللہ۔',
    methodologyEn: [
      'Direct textual evidence from Quran and Marfu‘ Sunnah above all.',
      'Fatawa of Companions when unanimous, or selecting the closest Companion opinion to scripture.',
      'Accepted Mursal/Da‘if (lightly weak) reports over purely speculative Qiyas when no stronger narration existed, reserving Qiyas strictly for necessity.',
    ],
    methodologyUr: [
      'قرآن کریم اور مرفوع احادیثِ صحیحہ پر براہِ راست استدلال۔',
      'صحابہ کرامؓ کے فتاویٰ کو مقدم رکھنا اور اختلاف میں کتاب و سنت سے قریب تر قول لینا۔',
      'بے جا قیاس آرائی سے اجتناب کرتے ہوئے صرف انتہائی ضرورت کے وقت قیاس سے کام لینا۔',
    ],
    famousWorks: [
      'Al-Musnad (Largest classical Hadith collection)',
      'Usul as-Sunnah (Foundations of Sunni Creed)',
      'Kitab az-Zuhd',
    ],
    statementOnSunnahEn:
      '“Do not imitate me blindly, nor imitate Malik, nor ash-Shafi‘i, nor al-Awza‘i, nor ath-Thawri—take from where they took (the Book of Allah and the Sunnah).”',
    statementOnSunnahUr:
      '”میری اندھی تقلید نہ کرو، نہ مالک، نہ شافعی، نہ اوزاعی اور نہ ثوری کی؛ بلکہ وہاں سے علم حاصل کرو جہاں سے ان بزرگوں نے لیا (یعنی قرآن و سنت)۔“',
  },
];
