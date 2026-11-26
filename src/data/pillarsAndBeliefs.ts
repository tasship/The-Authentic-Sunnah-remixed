import { PillarSectionType, PillarTopicItem } from '../types';

export const PILLAR_SECTIONS: {
  id: PillarSectionType;
  title: string;
  urduTitle: string;
  subtitle: string;
}[] = [
  {
    id: 'muslim_aqeedah',
    title: 'Who is a Muslim & Core Aqeedah',
    urduTitle: 'مسلمان کی تعریف اور بنیادی عقیدہ',
    subtitle: 'Submission, La ilaha illallah & the Three Categories of Tawheed',
  },
  {
    id: 'islam_pillars',
    title: '5 Pillars of Islam',
    urduTitle: 'ارکانِ اسلام (پانچ بنیادی ارکان)',
    subtitle: 'Arkan al-Islam — Practical foundations of worship & submission',
  },
  {
    id: 'iman_pillars',
    title: '6 Pillars of Iman',
    urduTitle: 'ارکانِ ایمان (ایمان کے چھ اصول)',
    subtitle: 'Articles of Faith — Core convictions of every believer’s heart',
  },
  {
    id: 'akhirah_guide',
    title: 'Day of Judgment & Akhirah',
    urduTitle: 'قیامت اور آخرت کے مراحل',
    subtitle: 'Signs of the Hour, Barzakh, Resurrection, Mizan, Sirat, Jannah & Jahannam',
  },
];

export const PILLAR_TOPICS: PillarTopicItem[] = [
  // =========================================================================
  // WHO IS A MUSLIM & CORE AQEEDAH
  // =========================================================================
  {
    id: 'aqeedah-who-is-muslim',
    section: 'muslim_aqeedah',
    order: 1,
    titleEn: '1. Who is a Muslim? (Islam, Iman & Ihsan)',
    titleUr: '۱۔ مسلمان کون ہے؟ (اسلام، ایمان اور احسان)',
    arabicTerm: 'إِنَّ الدِّينَ عِندَ اللَّهِ الْإِسْلَامُ',
    reference: 'Ali ‘Imran 3:19 · Sahih Muslim 8 (Hadith Jibril) · Sahih al-Bukhari 10',
    summaryEn: [
      'Linguistically, Islam means willing, wholehearted submission and surrender to the Creator. Technically, a Muslim is one who submits to Allah alone through Tawheed, obeys His commands, and frees themselves from every form of shirk (associating partners with Allah).',
      'As taught by the Prophet Muhammad ﷺ in the famous Hadith of Jibril, the religion encompasses three ascending levels: Islam (the outward pillars of worship), Iman (the inward certainty of the heart), and Ihsan (worshipping Allah as though you see Him, knowing that He sees you). A true Muslim also guards others from harm of their tongue and hand.',
    ],
    summaryUr: [
      'اسلام کے لغوی معنی خود کو اللہ کے سپرد کر دینے اور فرمانبرداری اختیار کرنے کے ہیں۔ شرعی طور پر مسلمان وہ ہے جو توحید کے ساتھ صرف اللہ کی اطاعت کرے، اس کے احکام کی پیروی کرے اور شرک و اس کے ماننے والوں سے براءت اختیار کرے۔',
      'حدیثِ جبرائیل کے مطابق دین کے تین مراتب ہیں: اسلام (ظاہری ارکان)، ایمان (قلبی یقین) اور احسان (اللہ کی عبادت اس طرح کرنا گویا تم اسے دیکھ رہے ہو)۔ سچا مسلمان وہ ہے جس کی زبان اور ہاتھ سے دوسرے مسلمان محفوظ رہیں۔',
    ],
    pointsEn: [
      'A Muslim affirms Allah as sole Lord and deity and Muhammad ﷺ as His final Messenger.',
      'True Islam balances sincere inner belief with consistent righteous character and mercy.',
    ],
    pointsUr: [
      'مسلمان اللہ کو اکیلا رب و معبود اور حضرت محمد ﷺ کو آخری رسول مانتا ہے۔',
      'سچا اسلام دل کے اخلاص کے ساتھ حسنِ اخلاق اور مخلوق کے ساتھ رحمت کا تقاضا کرتا ہے۔',
    ],
  },
  {
    id: 'aqeedah-kalimah-conditions',
    section: 'muslim_aqeedah',
    order: 2,
    titleEn: '2. Meaning & Seven Conditions of La ilaha illallah',
    titleUr: '۲۔ کلمہ لا الٰہ الا اللہ کا مفہوم اور سات شرائط',
    arabicTerm: 'لَا إِلَٰهَ إِلَّا اللَّهُ مُحَمَّدٌ رَّسُولُ اللَّهِ',
    reference: 'Muhammad 47:19 · Al-Bayyinah 98:5 · Sahih al-Bukhari 128 · Sahih Muslim 26',
    summaryEn: [
      '"La ilaha illallah" does not merely mean "there is no creator besides Allah"—even pagan tribes acknowledged Allah as Creator (Quran 29:61). Rather, it means: there is no deity worthy of worship in truth except Allah alone. It contains two pillars: negation (La ilaha — rejecting every false object of worship) and affirmation (illallah — dedicating all worship solely to Allah).',
      'Classical scholars derived seven essential conditions from the Quran and Sunnah for this testimony to benefit its speaker: Knowledge (‘Ilm) dispelling ignorance, Certainty (Yaqin) dispelling doubt, Acceptance (Qabul) without pride, Submission (Inqiyad) through action, Truthfulness (Sidq) free of hypocrisy, Sincerity (Ikhlas) free of show-off, and Love (Mahabbah) for Allah and His word.',
    ],
    summaryUr: [
      'لا الٰہ الا اللہ کا معنی صرف یہ نہیں کہ اللہ خالق ہے، بلکہ اس کا حقیقی معنی یہ ہے کہ اللہ کے سوا کوئی سچا معبود نہیں۔ اس کے دو رکن ہیں: نفی (ہر باطل معبود کا انکار) اور اثبات (ہر عبادت کو صرف اللہ کے لیے خاص کرنا)۔',
      'قرآن و سنت کی روشنی میں اس کلمے کے نفع مند ہونے کی سات شرائط ہیں: علم (جہالت کے مقابل)، یقین (شک کے مقابل)، قبولیت (تکبر کے بغیر)، اطاعت و عمل، سچائی (نفاق کے بغیر)، اخلاص (ریاکاری کے بغیر) اور اللہ و رسول ﷺ سے محبت۔',
    ],
    pointsEn: [
      'Testifying Muhammadun Rasulullah entails obeying his commands, believing his reports, avoiding his prohibitions, and worshipping only as he taught.',
      'Mere verbal utterance without heart conviction and sincerity does not fulfill the Shahadah.',
    ],
    pointsUr: [
      'محمد رسول اللہ کی گواہی کے چار تقاضے ہیں: حکم کی اطاعت، خبر کی تصدیق، منع کردہ کاموں سے اجتناب اور سنت کے مطابق عبادت۔',
      'بغیر دل کے یقین اور اخلاص کے صرف زبانی اقرار کافی نہیں ہے۔',
    ],
  },
  {
    id: 'aqeedah-three-tawheed',
    section: 'muslim_aqeedah',
    order: 3,
    titleEn: '3. The Three Categories of Tawheed (Islamic Monotheism)',
    titleUr: '۳۔ توحید کی تین اقسام (ربوبیت، الوہیت، اسماء و صفات)',
    arabicTerm: 'التَّوْحِيدُ: الرُّبُوبِيَّةُ وَالْأُلُوهِيَّةُ وَالْأَسْمَاءُ وَالصِّفَاتُ',
    reference: 'Al-Fatihah 1:2–5 · Maryam 19:65 · Ash-Shura 42:11',
    summaryEn: [
      '1. Tawheed ar-Rububiyyah (Oneness of Lordship): Affirming that Allah alone is the Creator, Sovereign Owner, Sustainer, giver of life and death, and Disposer of every affair in the universe.\n2. Tawheed al-Uluhiyyah (Oneness of Worship): Directing every act of worship—du‘a, Salah, sujud, sacrifice, vows, fear, hope, and ultimate reliance—exclusively to Allah alone with zero intermediaries.',
      '3. Tawheed al-Asma was-Sifat (Oneness of Divine Names & Attributes): Affirming for Allah all Names and Attributes He revealed in the Quran and authentic Sunnah in a manner befitting His Majesty—without distorting their meaning, denying them, asking "how" they are, or likening Allah to His creation ("There is nothing like unto Him, and He is the Hearing, the Seeing" — 42:11).',
    ],
    summaryUr: [
      '۱۔ توحیدِ ربوبیت: یہ ایمان رکھنا کہ اللہ ہی کائنات کا تنہا خالق، مالک، رازق، زندگی و موت دینے والا اور تمام امور کی تدبیر کرنے والا ہے۔\n۲۔ توحیدِ الوہیت: ہر قسم کی عبادت—دعا، نماز، سجدہ، نذر، قربانی، خوف، امید اور توکل—کو کسی واسطے کے بغیر صرف اللہ کے لیے خالص کرنا۔',
      '۳۔ توحیدِ اسماء و صفات: اللہ کے تمام ان ناموں اور صفات کو جو قرآن و صحیح حدیث میں بیان ہوئے ہیں، ان کے حقیقی معنی کے ساتھ بغیر تحریف، تعطیل، کیفیت بیان کیے یا مخلوق سے تشبیہ دیے تسلیم کرنا۔',
    ],
    pointsEn: [
      'All three categories appear together in Surah al-Fatihah and Surah an-Nas.',
      'The call of every Prophet from Nuh (AS) to Muhammad ﷺ centered on Tawheed al-Uluhiyyah: "Worship Allah; you have no deity other than Him."',
    ],
    pointsUr: [
      'توحید کی یہ تینوں اقسام سورہ فاتحہ اور سورہ الناس میں یکجا بیان ہوئی ہیں۔',
      'حضرت نوحؑ سے لے کر حضرت محمد ﷺ تک تمام انبیاء کی دعوت کا محور توحیدِ الوہیت تھا۔',
    ],
  },
  // =========================================================================
  // 5 PILLARS OF ISLAM
  // =========================================================================
  {
    id: 'islam-shahadah',
    section: 'islam_pillars',
    order: 1,
    titleEn: '1. Ash-Shahadah (Testimony of Faith)',
    titleUr: '۱۔ شہادتِ توحید و رسالت',
    arabicTerm: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ',
    reference: 'Sahih al-Bukhari 8 · Sahih Muslim 16 · Surah Muhammad 47:19',
    summaryEn: [
      'The Shahadah is the gateway to Islam and the supreme reality of existence: testifying with sincere conviction and speech that none has the right to be worshipped except Allah alone (Tawhid), and that Muhammad ﷺ is His final servant and Messenger.',
      'It carries two essential halves: purifying all worship, prayer, fear, hope, and reliance strictly for Allah, while taking the Prophet Muhammad ﷺ as the exclusive pattern for how Allah is worshipped.',
    ],
    summaryUr: [
      'کلمہ شہادت اسلام کی بنیاد اور کائنات کی سب سے بڑی حقیقت ہے: دل کے یقین اور زبان کے اقرار کے ساتھ گواہی دینا کہ اللہ کے سوا کوئی عبادت کے لائق نہیں اور حضرت محمد ﷺ اللہ کے آخری رسول ہیں۔',
      'اس کے دو بنیادی تقاضے ہیں: ہر قسم کی عبادت، دعا، خوف اور توکل کو صرف اللہ کے لیے خالص کرنا، اور عبادت کے طریقے میں صرف نبی کریم ﷺ کی سنت کی پیروی کرنا۔',
    ],
    pointsEn: [
      'Requires knowledge, certainty, acceptance, compliance, truthfulness, sincerity, and love.',
      'Negates every form of idolatry or assigning divine attributes to creation.',
    ],
    pointsUr: [
      'اس کلمے کے تقاضوں میں علم، یقین، قبولیت، اطاعت، سچائی اور اخلاص شامل ہیں۔',
      'ہر قسم کے شرک اور غیر اللہ کی عبادت کی نفی کرتا ہے۔',
    ],
  },
  {
    id: 'islam-salah',
    section: 'islam_pillars',
    order: 2,
    titleEn: '2. As-Salah (The Five Daily Prayers)',
    titleUr: '۲۔ اقامتِ صلاۃ (پانچ وقت کی نماز)',
    arabicTerm: 'إِقَامُ الصَّلَاةِ',
    reference: 'Al-‘Ankabut 29:45 · Sahih Muslim 82 · Al-Isra wal-Mi‘raj',
    summaryEn: [
      'Prescribed directly above the seven heavens during Al-Isra wal-Mi‘raj, the five daily prayers—Fajr, Dhuhr, Asr, Maghrib, and Isha—anchor the believer’s day in direct communion with Allah.',
      'Salah is the primary distinction between faith and neglect, the first deed examined on the Day of Judgment, and a spiritual shield that restrains indecency and wrongdoing.',
    ],
    summaryUr: [
      'پانچ وقت کی نماز (فجر، ظہر، عصر، مغرب اور عشاء) معراج کی شب براہِ راست آسمانوں پر فرض کی گئی، جو مومن کے دن کو اللہ کے ذکر اور قرب سے جوڑے رکھتی ہے۔',
      'نماز ایمان کی پہچان، قیامت کے دن سب سے پہلا حساب اور بے حیائی و برائی سے روکنے والی ڈھال ہے۔',
    ],
    pointsEn: [
      'Performed with Wudu (ritual purity), facing the Qiblah, with calm humility (Khushu‘).',
      'Establishing congregational Salah in the Masjid multiplies reward 27-fold.',
    ],
    pointsUr: [
      'طہارت (وضو)، استقبالِ قبلہ، وقت کی پابندی اور خشوع و خضوع کے ساتھ ادا کی جاتی ہے۔',
      'باجماعت نماز ادا کرنے کا اجر ستائیس گنا بڑھ جاتا ہے۔',
    ],
  },
  {
    id: 'islam-zakah',
    section: 'islam_pillars',
    order: 3,
    titleEn: '3. Az-Zakah (Obligatory Almsgiving & Purification)',
    titleUr: '۳۔ ادائیگیِ زکوٰۃ',
    arabicTerm: 'إِيتَاءُ الزَّكَاةِ',
    reference: 'At-Tawbah 9:60, 103 · Sahih al-Bukhari 1395',
    summaryEn: [
      'Meaning both purification and growth, Zakah requires Muslims possessing wealth above the Nisab threshold for one full lunar year (Hawl) to give 2.5% to the rightful categories named in Surah at-Tawbah (9:60).',
      'Far from reducing wealth, Zakah purifies the heart from greed, protects society from destitution, and brings divine blessing (Barakah) to remaining assets.',
    ],
    summaryUr: [
      'زکوٰۃ کے معنی پاکیزگی اور نشوونما کے ہیں۔ صاحبِ نصاب مسلمان پر ایک قمری سال گزرنے کے بعد اپنے قابلِ زکوٰۃ مال کا ڈھائی فیصد (2.5%) قرآن کے مقرر کردہ مستحقین کو دینا فرض ہے۔',
      'زکوٰۃ دل کو بخل سے پاک کرتی ہے، معاشرے سے غربت کم کرتی ہے اور باقی مال میں برکت کا سبب بنتی ہے۔',
    ],
    pointsEn: [
      'Nisab threshold equals 87.48g of gold or 612.36g of silver (or cash equivalent).',
      'Distributed to the poor, needy, indebted, travelers in need, and others in 9:60.',
    ],
    pointsUr: [
      'نصاب 87.48 گرام سونا یا 612.36 گرام چاندی (یا اس کی مساوی نقدی) ہے۔',
      'فقراء، مساکین، مقروض اور مسافر سمیت سورہ توبہ کی آٹھ مصارف میں خرچ کی جاتی ہے۔',
    ],
  },
  {
    id: 'islam-sawm',
    section: 'islam_pillars',
    order: 4,
    titleEn: '4. As-Sawm (Fasting the Month of Ramadan)',
    titleUr: '۴۔ صومِ رمضان (رمضان المبارک کے روزے)',
    arabicTerm: 'صَوْمُ رَمَضَانَ',
    reference: 'Al-Baqarah 2:183–185 · Sahih al-Bukhari 1901',
    summaryEn: [
      'Every healthy adult Muslim abstains from food, drink, and intimate relations from dawn (Fajr) until sunset (Maghrib) throughout the blessed month of Ramadan—the month in which the Holy Quran was revealed.',
      'Fasting cultivates Taqwa (God-consciousness), self-discipline, gratitude, and heartfelt empathy for the hungry, while guarding the tongue and eyes from harm.',
    ],
    summaryUr: [
      'رمضان المبارک وہ بابرکت مہینہ ہے جس میں قرآن مجید نازل ہوا۔ اس مہینے میں طلوعِ فجر سے غروبِ آفتاب تک کھانے، پینے اور جائز خواہشات سے رکے رہنا ہر عاقل بالغ تندرست مسلمان پر فرض ہے۔',
      'روزہ دل میں تقویٰ، نفس پر قابو، شکر گزاری اور بھوکوں کے لیے ہمدردی پیدا کرتا ہے۔',
    ],
    pointsEn: [
      'Includes Qiyam al-Layl (Tarawih), Suhoor blessing, timely Iftar, and seeking Laylat al-Qadr.',
      'Travelers and the ill make up missed days later; the chronically unable feed a needy person per day.',
    ],
    pointsUr: [
      'سحری میں برکت، افطار میں جلدی، تراویح اور شبِ قدر کی تلاش اس مہینے کی روح ہے۔',
      'مسافر اور عارضی مریض بعد میں قضا رکھیں گے، جبکہ دائمی معذور فدیہ ادا کریں گے۔',
    ],
  },
  {
    id: 'islam-hajj',
    section: 'islam_pillars',
    order: 5,
    titleEn: '5. Al-Hajj (Pilgrimage to Makkah)',
    titleUr: '۵۔ حجِ بیت اللہ',
    arabicTerm: 'حَجُّ الْبَيْتِ',
    reference: 'Ali ‘Imran 3:97 · Sahih al-Bukhari 1521',
    summaryEn: [
      'Obligatory once in a lifetime upon every Muslim who is physically and financially able, Hajj gathers millions in identical white Ihram garments at Makkah, Mina, Arafat, and Muzdalifah in Dhul-Hijjah.',
      'Re-enacting the devotion of Prophet Ibrahim (AS), Hajar, and Ismail (AS), an accepted Hajj (Hajj Mabrur) erases past sins so the pilgrim returns pure as the day they were born.',
    ],
    summaryUr: [
      'زندگی میں ایک بار ہر صاحبِ استطاعت مسلمان پر مکہ مکرمہ جا کر حج ادا کرنا فرض ہے۔ ذوالحجہ میں لاکھوں مسلمان ایک جیسے سفید احرام میں مکہ، منیٰ، عرفات اور مزدلفہ میں جمع ہوتے ہیں۔',
      'حضرت ابراہیمؑ، ہاجرہؑ اور اسماعیلؑ کی قربانیوں کی یاد تازہ کرنے والا مقبول حج گناہوں کو اس طرح مٹا دیتا ہے جیسے انسان آج ہی پیدا ہوا ہو۔',
    ],
    pointsEn: [
      'Essential rites: Ihram, Standing at ‘Arafat (the essence of Hajj), Tawaf al-Ifadah, and Sa‘i.',
      'Demonstrates complete equality of all races and classes before Allah.',
    ],
    pointsUr: [
      'اہم ارکان میں احرام، وقوفِ عرفہ، طوافِ زیارت اور سعی شامل ہیں۔',
      'رنگ و نسل اور امیری غریبی کے تمام امتیازات مٹا کر عالمگیر اخوت کا مظاہرہ ہے۔',
    ],
  },

  // =========================================================================
  // 6 PILLARS OF IMAN
  // =========================================================================
  {
    id: 'iman-allah',
    section: 'iman_pillars',
    order: 1,
    titleEn: '1. Belief in Allah (Tawhid)',
    titleUr: '۱۔ اللہ تعالیٰ پر ایمان',
    arabicTerm: 'الْإِيمَانُ بِاللَّهِ',
    reference: 'Al-Ikhlas 112:1–4 · Ash-Shura 42:11 · Hadith Jibril (Muslim 8)',
    summaryEn: [
      'Belief in Allah encompasses His existence, His sole Lordship (Tawhid ar-Rububiyyah) as Creator and Sustainer, His sole right to worship (Tawhid al-Uluhiyyah), and His 99 Most Beautiful Names and Perfect Attributes (Al-Asma was-Sifat) without comparison or distortion.',
      'Nothing resembles Him, and He is the All-Hearing, the All-Seeing, near to every caller who supplicates sincerely.',
    ],
    summaryUr: [
      'اللہ پر ایمان کا مطلب اس کے وجود، اس کی ربوبیت (خالق و مالک ہونے)، الوہیت (تنہا معبود ہونے) اور اس کے اسمائے حسنیٰ و صفاتِ کاملہ پر بغیر کسی تشبیہ یا تعطیل کے ایمان لانا ہے۔',
      'کوئی چیز اس کی مثل نہیں، وہ سب کچھ سننے اور دیکھنے والا اور پکارنے والوں کے بے حد قریب ہے۔',
    ],
    pointsEn: [
      'Worship, supplication, vows, and ultimate reliance belong strictly to Allah alone.',
      'Knowing Allah through His Names strengthens awe, love, and hope in the heart.',
    ],
    pointsUr: [
      'عبادت، دعا، نذر و نیاز اور حقیقی توکل صرف اللہ وحدہ لا شریک کے لیے خاص ہے۔',
      'اسمائے حسنیٰ کی معرفت دل میں محبت، امید اور خشیتِ الٰہی پیدا کرتی ہے۔',
    ],
  },
  {
    id: 'iman-angels',
    section: 'iman_pillars',
    order: 2,
    titleEn: '2. Belief in His Angels (Al-Mala’ikah)',
    titleUr: '۲۔ فرشتوں پر ایمان',
    arabicTerm: 'الْإِيمَانُ بِالْمَلَائِكَةِ',
    reference: 'Al-Baqarah 2:285 · At-Tahrim 66:6 · Sahih Muslim 2996',
    summaryEn: [
      'Angels are noble unseen beings created by Allah from light who never disobey Him and carry out every divine command faithfully without fatigue or pride.',
      'Key angels named in revelation include Jibril (carrier of revelation), Mika‘il (provision & rain), Israfil (blower of the Trumpet), Malik (guardian of Hellfire), and the Recording Angels (Kiraman Katibin) documenting every deed.',
    ],
    summaryUr: [
      'فرشتے اللہ کی نورانی مخلوق ہیں جو کبھی اس کی نافرمانی نہیں کرتے اور ہر حکم کی مکمل تعمیل کرتے ہیں۔',
      'ان میں حضرت جبرائیلؑ (امینِ وحی)، حضرت میکائیلؑ (بارش و رزق)، حضرت اسرافیلؑ (صور پھونکنے والے)، مالک (داروغہ جہنم) اور کراماً کاتبین (اعمال لکھنے والے) شامل ہیں۔',
    ],
    pointsEn: [
      'Awareness of Recording Angels nurtures inner integrity even in private moments.',
      'Angels seek forgiveness for believers and attend gatherings of Quran and Dhikr.',
    ],
    pointsUr: [
      'کراماً کاتبین کا احساس تنہائی میں بھی انسان کو گناہوں سے روکتا ہے۔',
      'فرشتے مومنوں کے لیے مغفرت کی دعا کرتے اور ذکر و قرآن کی مجالس میں حاضر ہوتے ہیں۔',
    ],
  },
  {
    id: 'iman-books',
    section: 'iman_pillars',
    order: 3,
    titleEn: '3. Belief in His Revealed Books',
    titleUr: '۳۔ آسمانی کتابوں پر ایمان',
    arabicTerm: 'الْإِيمَانُ بِالْكُتُبِ',
    reference: 'An-Nisa 4:136 · Al-Hijr 15:9',
    summaryEn: [
      'Muslims affirm that Allah sent divine scriptures to earlier nations as light and guidance—including the Suhuf of Ibrahim, Tawrah to Musa, Zabur to Dawud, and Injil to ‘Isa (peace be upon them all)—before sending the Holy Quran as the final, preserved, and universal Book.',
      'While earlier texts underwent human alteration over centuries, Allah Himself guaranteed the preservation of every letter of the Quran until the Day of Judgment.',
    ],
    summaryUr: [
      'مسلمان ایمان رکھتے ہیں کہ اللہ نے انسانوں کی ہدایت کے لیے صحیفے اور کتابیں نازل فرمائیں، جن میں تورات (حضرت موسیٰؑ)، زبور (حضرت داؤدؑ)، انجیل (حضرت عیسیٰؑ) اور آخری محفوظ کتاب قرآن مجید شامل ہیں۔',
      'سابقہ کتابوں میں وقت کے ساتھ انسانی تحریف ہوئی، مگر قرآن مجید کے ایک ایک حرف کی حفاظت کی ذمہ داری خود اللہ تعالیٰ نے لی ہے۔',
    ],
    pointsEn: [
      'The Quran confirms prior pure revelation while serving as the final criterion (Muhaymin).',
      'Guidance comes by reciting, understanding, and living by the Quran daily.',
    ],
    pointsUr: [
      'قرآن سابقہ آسمانی کتب کی تصدیق کرنے والا اور قیامت تک کے لیے حتمی کسوٹی ہے۔',
      'قرآن کی تلاوت، فہم اور اس پر عمل ہی دنیا و آخرت کی کامیابی ہے۔',
    ],
  },
  {
    id: 'iman-messengers',
    section: 'iman_pillars',
    order: 4,
    titleEn: '4. Belief in His Messengers (Al-Anbiya war-Rusul)',
    titleUr: '۴۔ تمام انبیاء اور رسولوں پر ایمان',
    arabicTerm: 'الْإِيمَانُ بِالرُّسُلِ',
    reference: 'Al-Baqarah 2:285 · An-Nahl 16:36 · Al-Ahzab 33:40',
    summaryEn: [
      'Allah dispatched Prophets and Messengers to every nation calling humanity to worship Allah alone and live righteously—from Adam, Nuh, Ibrahim, Musa, and ‘Isa (AS) to the Seal of all Prophets, Muhammad ﷺ.',
      'Muslims love, honor, and believe in every true Prophet without rejecting any of them, recognizing Muhammad ﷺ as the final universal Messenger after whom no prophet will come.',
    ],
    summaryUr: [
      'اللہ تعالیٰ نے ہر امت میں نبی اور رسول بھیجے جنہوں نے توحید اور نیکی کی دعوت دی—جن میں حضرت آدمؑ، نوحؑ، ابراہیمؑ، موسیٰؑ، عیسیٰؑ اور آخری نبی حضرت محمد ﷺ شامل ہیں۔',
      'مسلمان تمام انبیائے کرامؑ کا احترام کرتے اور ان پر ایمان لاتے ہیں، اور حضرت محمد ﷺ کو خاتم النبیین مانتے ہیں جن کے بعد کوئی نبی نہیں آئے گا۔',
    ],
    pointsEn: [
      'All Prophets shared one core creed (Tawhid) while laws matured until the final Shari‘ah.',
      'Respecting Jesus (‘Isa AS) and Moses (Musa AS) is an integral pillar of Islamic faith.',
    ],
    pointsUr: [
      'تمام انبیاءؑ کا بنیادی عقیدہ توحید ایک ہی تھا، جبکہ شریعت محمد ﷺ پر مکمل ہوئی۔',
      'حضرت عیسیٰؑ اور حضرت موسیٰؑ سمیت سب انبیاء پر ایمان رکھنا اسلام کا جزوِ لازم ہے۔',
    ],
  },
  {
    id: 'iman-last-day',
    section: 'iman_pillars',
    order: 5,
    titleEn: '5. Belief in the Day of Judgment (Al-Yawm al-Akhir)',
    titleUr: '۵۔ یومِ آخرت پر ایمان',
    arabicTerm: 'الْإِيمَانُ بِالْيَوْمِ الْآخِرِ',
    reference: 'Al-Zalzalah 99:7–8 · Al-Hajj 22:7',
    summaryEn: [
      'Life does not vanish into meaningless dust at death. Every soul tastes death, enters Barzakh, and is resurrected on a decisive Day when every atom’s weight of good or injustice is weighed fairly before Allah.',
      'Belief in the Last Day instills profound moral accountability, patience in hardship, and longing for Allah’s eternal Pleasure.',
    ],
    summaryUr: [
      'انسانی زندگی موت کے ساتھ ختم نہیں ہو جاتی بلکہ برزخ کے بعد ایک مقررہ دن سب کو دوبارہ اٹھایا جائے گا جہاں ذرہ برابر نیکی اور برائی کا مکمل عدل کے ساتھ حساب لیا جائے گا۔',
      'آخرت پر ایمان انسان میں ذمہ داری، صبر، تقویٰ اور ابدی کامیابی کی تڑپ پیدا کرتا ہے۔',
    ],
    pointsEn: [
      'Includes faith in the questioning in the grave, Resurrection, Scales, and eternal abode.',
      'Earthly oppression never goes unanswered in Allah’s supreme court.',
    ],
    pointsUr: [
      'اس میں قبر کے احوال، حشر، میزان، پل صراط اور جنت و جہنم پر ایمان شامل ہے۔',
      'دنیا کی ہر ناانصافی کا کامل بدلہ آخرت میں ضرور ملے گا۔',
    ],
  },
  {
    id: 'iman-qadr',
    section: 'iman_pillars',
    order: 6,
    titleEn: '6. Belief in Divine Decree (Al-Qadr)',
    titleUr: '۶۔ تقدیر کے اچھے اور برے پر ایمان',
    arabicTerm: 'الْإِيمَانُ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ',
    reference: 'Al-Qamar 54:49 · At-Taghabun 64:11 · Sahih Muslim 2653',
    summaryEn: [
      'Belief in Al-Qadr rests upon four pillars: Allah’s eternal Knowledge of everything, His recording of all decrees in the Preserved Tablet (Al-Lawh al-Mahfuz), His all-encompassing Will, and His Creation of all things.',
      'At the same time, Allah granted human beings genuine moral choice and responsibility: we strive diligently with permissible means and du‘a, then accept outcomes with gratitude in ease and patience in trial.',
    ],
    summaryUr: [
      'تقدیر پر ایمان کے چار مراتب ہیں: اللہ کا ازلی علم، لوحِ محفوظ میں تحریر، اللہ کی مشیت (ارادہ) اور ہر چیز کی تخلیق۔',
      'اس کے ساتھ اللہ نے انسان کو ارادہ و اختیار دیا ہے؛ لہٰذا بندہ جائز اسباب و دعا اختیار کرے اور نتیجے پر شکر یا صبر سے راضی رہے۔',
    ],
    pointsEn: [
      'Protects against arrogance in success and despair in calamity.',
      'Du‘a and righteousness remain real means decreed by Allah for blessing.',
    ],
    pointsUr: [
      'یہ عقیدہ کامیابی میں تکبر اور مصیبت میں مایوسی سے بچاتا ہے۔',
      'دعا اور نیک اعمال بھی اللہ کے مقرر کردہ اسباب میں شامل ہیں۔',
    ],
  },

  // =========================================================================
  // DAY OF JUDGMENT & THE HEREAFTER (AL-AKHIRAH)
  // =========================================================================
  {
    id: 'akhirah-signs',
    section: 'akhirah_guide',
    order: 1,
    titleEn: '1. Minor & Major Signs of the Hour (Ashrat as-Sa‘ah)',
    titleUr: '۱۔ قیامت کی چھوٹی اور بڑی نشانیاں',
    arabicTerm: 'أَشْرَاطُ السَّاعَةِ',
    reference: 'Muhammad 47:18 · Sahih Muslim 2901 · Sahih al-Bukhari 7121',
    summaryEn: [
      'Only Allah knows the exact timing of the Hour, yet His Messenger ﷺ described unmistakable signs heralding its approach. Minor signs include the Prophet’s own advent, widespread ignorance and bloodshed, entrusting authority to the unqualified, competing in tall buildings, and time feeling accelerated.',
      'Ten monumental Major Signs unfold sequentially near the end of time: the Ad-Dukhan (Smoke), Ad-Dajjal (False Messiah), the Descent of Prophet ‘Isa ibn Maryam (AS) establishing justice, Ya’juj and Ma’juj (Gog & Magog), the Beast (Dabbat al-Ard), the rising of the sun from the West, three major landslides, and the final fire gathering mankind.',
    ],
    summaryUr: [
      'قیامت کا حتمی علم صرف اللہ کو ہے، مگر رسول اللہ ﷺ نے اس کی علامات بیان فرمائیں۔ چھوٹی نشانیوں میں آپ ﷺ کی بعثت، علم کا اٹھ جانا، نااہلوں کو منصب ملنا، اونچی عمارتوں کا مقابلہ اور وقت میں بے برکتی شامل ہیں۔',
      'بڑی نشانیوں میں دجال کا خروج، حضرت عیسیٰؑ کا نزول اور عدل کا قیام، یاجوج ماجوج، دابۃ الارض، دھواں، سورج کا مغرب سے طلوع ہونا، تین خسوف اور آخری آگ شامل ہیں۔',
    ],
    pointsEn: [
      'Awareness of the Signs urges turning to repentance, Quran, and good deeds today.',
      'Protection from Dajjal’s fitnah includes memorizing the first ten verses of Surah al-Kahf.',
    ],
    pointsUr: [
      'نشانیوں کا علم ہمیں فوری توبہ، قرآن سے تعلق اور نیک اعمال کی طرف متوجہ کرتا ہے۔',
      'فتنہ دجال سے بچاؤ کے لیے سورہ کہف کی ابتدائی دس آیات کا حفظ اور دعا مسنون ہے۔',
    ],
  },
  {
    id: 'akhirah-barzakh',
    section: 'akhirah_guide',
    order: 2,
    titleEn: '2. Death & Life in the Grave (Al-Barzakh)',
    titleUr: '۲۔ موت اور عالمِ برزخ (قبر کی زندگی)',
    arabicTerm: 'الْبَرْزَخُ وَفِتْنَةُ الْقَبْرِ',
    reference: 'Al-Mu’minun 23:100 · Sahih al-Bukhari 1338 · Sunan Abi Dawud 4753',
    summaryEn: [
      'Al-Barzakh is the intermediate realm spanning from death until Resurrection. Upon burial, two angels—Munkar and Nakir—gently restore the soul to answer three decisive questions: "Who is your Lord? What is your religion? Who is this man sent among you?"',
      'For the believer, the grave expands as far as the eye can see, illuminated with a window opening onto Paradise; for the persistent wrongdoer, it becomes constriction and chastisement—making regular seeking of refuge from the torment of the grave a daily Prophetic Sunnah.',
    ],
    summaryUr: [
      'عالمِ برزخ موت سے لے کر قیامت تک کی درمیانی زندگی ہے۔ تدفین کے بعد فرشتے (منکر و نکیر) میت سے تین فیصلہ کن سوالات کرتے ہیں: تمہارا رب کون ہے؟ تمہارا دین کیا ہے؟ اور ان رسول ﷺ کے بارے میں تم کیا کہتے ہو؟',
      'مومن کے لیے قبر تاحدِ نظر کشادہ اور جنت کی کھڑکی سے روشن کر دی جاتی ہے، جبکہ نافرمان کے لیے تنگی اور عذاب ہوتا ہے؛ اسی لیے نبی کریم ﷺ روزانہ عذابِ قبر سے پناہ مانگا کرتے تھے۔',
    ],
    pointsEn: [
      'Only steadfast faith and righteous actions accompany a person into the grave.',
      'Surah al-Mulk intercedes for its regular reciter to protect from the grave’s punishment.',
    ],
    pointsUr: [
      'قبر میں انسان کے ساتھ صرف اس کا ایمان اور نیک عمل جاتے ہیں۔',
      'سورہ ملک کی باقاعدہ تلاوت عذابِ قبر سے حفاظت کا باعث بنتی ہے۔',
    ],
  },
  {
    id: 'akhirah-resurrection',
    section: 'akhirah_guide',
    order: 3,
    titleEn: '3. The Blowing of the Trumpet & Resurrection (Al-Ba‘th)',
    titleUr: '۳۔ صور پھونکا جانا اور دوبارہ زندہ ہونا (البعث)',
    arabicTerm: 'النَّفْخُ فِي الصُّورِ وَالْبَعْثُ',
    reference: 'Az-Zumar 39:68 · Yasin 36:51–52 · Sahih Muslim 2955',
    summaryEn: [
      'At Allah’s command, Angel Israfil will sound the First Blast (Nafkhat al-Faza‘ / as-Sa‘q), causing everything in the heavens and earth to perish except whom Allah wills, while mountains crumble into scattered dust and oceans surge.',
      'Following a period known to Allah, gentle rain will fall and Israfil will sound the Second Blast (Nafkhat al-Ba‘th), restoring every human soul from the preserved base of the spine (‘Ajab adh-Dhanab) to rise barefoot and accountable before the Creator.',
    ],
    summaryUr: [
      'اللہ کے حکم سے حضرت اسرافیلؑ پہلا صور پھونکیں گے جس سے آسمان و زمین کی ہر شے فنا ہو جائے گی، پہاڑ روئی کی طرح اڑ جائیں گے اور سمندر بھڑک اٹھیں گے۔',
      'پھر ایک مقررہ مدت کے بعد دوسرا صور پھونکا جائے گا اور تمام انسان قبروں سے ننگے پاؤں اور حساب کے لیے زندہ ہو کر اٹھ کھڑے ہوں گے۔',
    ],
    pointsEn: [
      'The One Who created humanity from a drop effortlessly restores them anew.',
      'Worldly status vanishes; only the soundness of the heart (Qalbun Salim) remains.',
    ],
    pointsUr: [
      'جس رب نے پہلی بار عدم سے پیدا فرمایا، اس کے لیے دوبارہ زندہ کرنا نہایت آسان ہے۔',
      'اس دن دنیاوی منصب ختم ہو جائیں گے اور صرف قلبِ سلیم کام آئے گا۔',
    ],
  },
  {
    id: 'akhirah-hashr-mizan-sirat',
    section: 'akhirah_guide',
    order: 4,
    titleEn: '4. The Gathering, Intercession, Scales & The Bridge',
    titleUr: '۴۔ میدانِ حشر، شفاعت، میزان اور پلِ صراط',
    arabicTerm: 'الْحَشْرُ وَالشَّفَاعَةُ وَالْمِيزَانُ وَالصِّرَاطُ',
    reference: 'Al-Anbiya 21:47 · Maryam 19:71 · Sahih al-Bukhari 7440, 6537',
    summaryEn: [
      'Humanity gathers on a vast white plain as the sun draws close—yet righteous servants stand peacefully beneath Allah’s Throne Shade, and believers drink from the Prophet’s blessed Pool (Al-Hawd al-Kawthar). Amid overwhelming awe, Prophet Muhammad ﷺ prostrates beneath the Throne and is granted the Great Intercession (Ash-Shafa‘ah al-‘Uzma) to commence Judgment.',
      'Deeds and books of record are weighed upon the true Scales (Al-Mizan) where good character and "SubhanAllahi wa bihamdihi" weigh heaviest. Finally, all cross As-Sirat—the bridge suspended over Hellfire—at speeds matching their faith and light, from flashing lightning to swift steeds.',
    ],
    summaryUr: [
      'تمام انسان ایک وسیع سفید میدان میں جمع ہوں گے جہاں سورج قریب ہو گا، مگر مومن عرش کے سائے میں ہوں گے اور حوضِ کوثر سے سیراب ہوں گے۔ نبی کریم ﷺ سجدہ کر کے شفاعتِ کبریٰ فرمائیں گے جس سے حساب کا آغاز ہو گا۔',
      'اعمال نامے دیے جائیں گے اور میزانِ عدل پر اعمال تولے جائیں گے جن میں حسنِ اخلاق اور کلماتِ تسبیح سب سے بھاری ہوں گے۔ پھر سب کو جہنم کے اوپر نصب پلِ صراط سے گزرنا ہو گا جہاں ہر کوئی اپنے ایمان کے نور کی رفتار سے گزرے گا۔',
    ],
    pointsEn: [
      'The seven shaded beneath Allah’s Throne include just leaders, youth in worship, and sincere brothers in faith.',
      'Consistent prayer and honoring rights of people illuminate one’s crossing over As-Sirat.',
    ],
    pointsUr: [
      'عرش کے سائے میں عادل حکمران، عبادت گزار نوجوان اور اللہ کے لیے محبت کرنے والے شامل ہوں گے۔',
      'نماز کی پابندی اور حقوق العباد کی ادائیگی پلِ صراط پر نور اور رفتار عطا کرتی ہے۔',
    ],
  },
  {
    id: 'akhirah-jannah-jahannam',
    section: 'akhirah_guide',
    order: 5,
    titleEn: '5. Eternal Abodes: Paradise (Al-Jannah) & Hellfire (Jahannam)',
    titleUr: '۵۔ ابدی ٹھکانے: جنت کی نعمتیں اور جہنم سے تنبیہ',
    arabicTerm: 'الْجَنَّةُ وَالنَّارُ',
    reference: 'As-Sajdah 32:17 · Al-Mulk 67:6–11 · Sahih Muslim 189, 2837',
    summaryEn: [
      'Al-Jannah is Allah’s everlasting gift prepared for sincere believers: gardens beneath which rivers of water, pure milk, honey, and crystal wine flow; palaces of gold and pearl; complete peace free of grief, fatigue, envy, or death; and above every delight—the beatific vision of gazing upon Allah’s Noble Countenance and hearing His Pleasure.',
      'Conversely, Jahannam is the terrifying warning against arrogance, shirk, and unrepented tyranny—a fire seventy times hotter than earthly fire where regret is endless. Remembering both inspires balanced worship combining hopeful love for Jannah with reverent awe seeking refuge from the Fire.',
    ],
    summaryUr: [
      'جنت اللہ کی وہ ابدی نعمت ہے جس کا تصور بھی انسانی عقل سے بالا ہے: دودھ، شہد اور صاف پانی کی نہریں، موتیوں کے محلات، غم و بیماری اور موت سے مکمل نجات—اور سب سے بڑھ کر اللہ کی رضا اور دیدارِ الٰہی۔',
      'اس کے برعکس جہنم کبر، شرک اور سرکشی کا خوفناک انجام ہے جس کی آگ دنیا کی آگ سے ستر گنا زیادہ سخت ہے۔ دونوں کا تذکرہ مومن کے دل میں امید اور خوف کا متوازن جذبہ پیدا کرتا ہے۔',
    ],
    pointsEn: [
      'Ask Allah for Al-Firdaws al-A‘la (the highest garden directly beneath Allah’s Throne).',
      'Allah’s mercy is ever open before death: a sincere tear of Tawbah turns sins into light.',
    ],
    pointsUr: [
      'نبی کریم ﷺ نے تعلیم دی کہ جب دعا کرو تو ہمیشہ "جنت الفردوس الاعلیٰ" مانگو۔',
      'موت سے پہلے توبہ کا دروازہ ہمیشہ کھلا ہے؛ سچی ندامت گناہوں کو مٹا دیتی ہے۔',
    ],
  },
];
