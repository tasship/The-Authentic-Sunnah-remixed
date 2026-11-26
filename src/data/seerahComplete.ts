import { SeerahChapterMeta, SeerahEvent } from '../types';

export const SEERAH_COMPLETE_ERAS: SeerahChapterMeta[] = [
  {
    id: 'Arabia Before Islam',
    chapterNumber: 1,
    shortTitle: 'Arabia Before Islam',
    span: 'Pre-570 CE',
    urduTitle: 'قبل از اسلام عرب کے حالات',
    overviewEn:
      'Geography, major Arab tribes, political rivalries, idolatry around the Ka‘bah, and the moral conditions preceding the Final Messenger ﷺ.',
    overviewUr:
      'جزیرۃ العرب کا جغرافیہ، قبائل، سیاسی و سماجی حالات اور بعثتِ نبوی ﷺ سے قبل کی دینی و اخلاقی کیفیت۔',
  },
  {
    id: 'Birth & Early Life',
    chapterNumber: 2,
    shortTitle: 'Birth & Early Life',
    span: '570–610 CE',
    urduTitle: 'ولادتِ باسعادت اور نبوت سے قبل چالیس سال',
    overviewEn:
      'Noble lineage, Year of the Elephant, foster care under Halimah, journey to Syria, Hilf al-Fudul, marriage to Khadijah (RA), and rebuilding the Ka‘bah.',
    overviewUr:
      'شجرہ نسب، عام الفیل، رضاعتِ حلیمہؓ، سفرِ شام، حلف الفضول، حضرت خدیجہؓ سے نکاح اور تعمیرِ کعبہ۔',
  },
  {
    id: 'Revelation & Secret Call',
    chapterNumber: 3,
    shortTitle: 'Revelation & Secret Call',
    span: '610–613 CE',
    urduTitle: 'بعثتِ نبوی اور خفیہ دعوت',
    overviewEn:
      'Contemplation in Cave Hira, the descent of Jibril (AS) with Surah al-‘Alaq, earliest believers, and silent gatherings in Dar al-Arqam.',
    overviewUr:
      'غارِ حرا میں غور و فکر، پہلی وحی کا نزول، اولین مومنین اور دارِ ارقم کی تربیت گاہ۔',
  },
  {
    id: 'Makkah Persecution & Abyssinia',
    chapterNumber: 4,
    shortTitle: 'Persecution & Abyssinia',
    span: '613–616 CE',
    urduTitle: 'اعلانیہ دعوت، مکی مصائب اور ہجرتِ حبشہ',
    overviewEn:
      'Proclamation from Mount Safa, persecution of Bilal, Yasir and Sumayyah (RA), migrations to Abyssinia, and Islam of Hamza & Umar (RA).',
    overviewUr:
      'کوہِ صفا سے دعوت، بلالؓ و آلِ یاسرؓ پر مظالم، ہجرتِ حبشہ اور حضرت حمزہؓ و عمرؓ کا قبولِ اسلام۔',
  },
  {
    id: 'Boycott, Year of Sorrow & Taif',
    chapterNumber: 5,
    shortTitle: 'Boycott, Sorrow & Ta’if',
    span: '616–620 CE',
    urduTitle: 'شعبِ ابی طالب، عام الحزن اور سفرِ طائف',
    overviewEn:
      'Three-year siege in Shi‘b Abi Talib, passing of Abu Talib & Khadijah (RA), and the Prophet’s merciful resilience amid rejection at Ta’if.',
    overviewUr:
      'تین سالہ بائیکاٹ، عام الحزن اور طائف کے صبر آزما سفر میں رحمت و استقامت کا بے مثال نمونہ۔',
  },
  {
    id: 'Al-Isra wal-Mi‘raj',
    chapterNumber: 6,
    shortTitle: 'Al-Isra wal-Mi‘raj',
    span: '620–621 CE · 11 BH',
    urduTitle: 'اسراء و معراج النبی ﷺ',
    overviewEn:
      'The miraculous Night Journey on Al-Buraq to Masjid al-Aqsa, leading all Prophets in prayer, ascending through the seven heavens, and receiving the five daily Salah.',
    overviewUr:
      'مسجدِ حرام سے مسجدِ اقصیٰ تک رات کا سفر، انبیاءؑ کی امامت، ساتوں آسمانوں کی سیر اور پنجگانہ نماز کا تحفہ۔',
  },
  {
    id: 'Pledges of Aqabah & Great Hijrah',
    chapterNumber: 7,
    shortTitle: 'Aqabah & Great Hijrah',
    span: '620–622 CE · 1 AH',
    urduTitle: 'بیعتِ عقبہ اور ہجرتِ مدینہ',
    overviewEn:
      'First & Second Pledges of Aqabah, Quraysh plot at Dar an-Nadwah, Cave Thawr, Suraqah’s pursuit, Quba, and joyous arrival in Madinah.',
    overviewUr:
      'بیعتِ عقبہ اولیٰ و ثانیہ، دارالندوہ کی سازش، غارِ ثور، سراقہ کا تعاقب اور مدینہ میں والہانہ استقبال۔',
  },
  {
    id: 'Founding Madinah, Badr & Uhud',
    chapterNumber: 8,
    shortTitle: 'Madinah, Badr & Uhud',
    span: '1–3 AH · 622–625 CE',
    urduTitle: 'قیامِ مدینہ، غزوہ بدر اور غزوہ احد',
    overviewEn:
      'Building Masjid an-Nabawi, Brotherhood (Mu’akhah), Charter of Madinah, Change of Qiblah, Great Victory of Badr, and the Discipline Test of Uhud.',
    overviewUr:
      'مسجدِ نبوی، مواخات و میثاقِ مدینہ، تحویلِ قبلہ، یومِ فرقان غزوہ بدر اور غزوہ احد کے اسباق۔',
  },
  {
    id: 'Khandaq, Hudaybiyyah & Khaybar',
    chapterNumber: 9,
    shortTitle: 'Khandaq, Hudaybiyyah & Khaybar',
    span: '4–7 AH · 625–629 CE',
    urduTitle: 'خندق، صلح حدیبیہ اور فتحِ خیبر',
    overviewEn:
      'Exile of Banu Nadir, Battle of the Trench (Al-Ahzab), Treaty of Hudaybiyyah, Letters to World Rulers, and the Conquest of Khaybar.',
    overviewUr:
      'بنو نضیر کی جلاوطنی، غزوہ خندق، صلح حدیبیہ، عالمی حکمرانوں کو خطوط اور فتحِ خیبر۔',
  },
  {
    id: 'Mu‘tah, Conquest of Makkah, Hunayn & Tabuk',
    chapterNumber: 10,
    shortTitle: 'Mu‘tah, Makkah & Tabuk',
    span: '8–9 AH · 629–631 CE',
    urduTitle: 'موتہ، فتحِ مکہ، حنین اور تبوک',
    overviewEn:
      'Heroism at Mu‘tah, the bloodless Conquest of Makkah and cleansing of the Ka‘bah, Victory at Hunayn, Siege of Ta’if, and the Expedition of Tabuk.',
    overviewUr:
      'معرکہ موتہ، فتحِ مکہ اور کعبہ کی تطہیر، غزوہ حنین، محاصرہ طائف اور غزوہ تبوک کی آزمائش۔',
  },
  {
    id: 'Year of Delegations & Farewell Sermon',
    chapterNumber: 11,
    shortTitle: 'Delegations & Farewell Sermon',
    span: '9–10 AH · 631–632 CE',
    urduTitle: 'عام الوفود اور خطبہ حجۃ الوداع',
    overviewEn:
      'Arabian tribes embracing Islam in multitudes, Hajj under Abu Bakr (RA), and the Prophet’s historic Farewell Pilgrimage and Charter of Human Equality at ‘Arafat.',
    overviewUr:
      'عام الوفود، حضرت ابوبکرؓ کی امارتِ حج اور میدانِ عرفات میں حجۃ الوداع کا مکمل عالمگیر خطبہ۔',
  },
  {
    id: 'Passing & Noble Character (Ash-Shama’il)',
    chapterNumber: 12,
    shortTitle: 'Passing & Ash-Shama’il',
    span: '11 AH · June 632 CE',
    urduTitle: 'وصالِ مبارک اور شمائلِ نبوی ﷺ',
    overviewEn:
      'Final days of counsel, appointment of Abu Bakr (RA) to lead Salah, serene departure on 12 Rabi al-Awwal, and a portrait of his blessed appearance and character.',
    overviewUr:
      'مرضِ وفات، حضرت ابوبکرؓ کی امامت، 12 ربیع الاول کا وصالِ مبارک اور شمائل و اخلاقِ نبوی ﷺ۔',
  },
];

export const SEERAH_COMPLETE_EVENTS: SeerahEvent[] = [
  // CHAPTER 1: ARABIA BEFORE ISLAM
  {
    id: 'ch1-geography-tribes',
    era: 'Arabia Before Islam',
    yearLabel: 'Pre-570 CE · Before Prophethood',
    title: 'Geography, Lineage & Arab Tribes',
    titleUrdu: 'جزیرۃ العرب کا جغرافیہ اور قبائل',
    summaryEn: [
      'Positioned between the Byzantine Empire in the north-west and the Sassanid Persian Empire in the north-east, the Arabian Peninsula remained geographically shielded from foreign conquest by vast deserts and rugged mountains. Inside this isolated cradle lived communities prized for fierce independence, hospitality, poetry, and horsemanship.',
      'Historically, scholars like Shaykh Safi-ur-Rahman al-Mubarakpuri divide Arabs into the perished ancient tribes (Al-‘Arab al-Ba’idah like ‘Ad and Thamud), the pure Southern Arabs of Qahtan (Al-‘Arab al-‘Aribah), and the Arabized Northern descendants of Prophet Ismail (AS) through ‘Adnan (Al-‘Arab al-Musta‘ribah), from whom Quraysh descended.',
    ],
    summaryUr: [
      'رومی اور فارسی سپر طاقتوں کے درمیان واقع جزیرۃ العرب اپنے وسیع صحراؤں اور پہاڑی سلسلوں کی بدولت بیرونی تسلط سے محفوظ رہا۔ یہاں کے باشندے فصاحت و بلاغت، مہمان نوازی، شہسواری اور قبائلی خودداری میں بے مثال تھے۔',
      'مؤرخین عربوں کو تین طبقات میں تقسیم کرتے ہیں: عربِ بائدہ (عاد و ثمود)، عربِ عاربہ (بنو قحطان) اور عربِ مستعربہ (حضرت اسماعیلؑ کی نسل عدنان سے، جن میں قریش شامل ہیں)۔',
    ],
    takeawaysEn: [
      'Arabia’s central position along ancient caravan routes prepared it to carry Islam swiftly to three continents.',
      'Linguistic mastery and poetic memory later served the preservation of the Quran and Hadith.',
    ],
    takeawaysUr: [
      'تجارتی راستوں کا مرکز ہونے کے باعث عرب سے اسلام کا پیغام دنیا بھر میں تیزی سے پھیل سکا۔',
      'زبان و بیان کی پختگی نے قرآن و سنت کے حفظ اور حفاظت میں اہم کردار ادا کیا۔',
    ],
  },
  {
    id: 'ch1-religious-social',
    era: 'Arabia Before Islam',
    yearLabel: 'Jahiliyyah Era · Pre-610 CE',
    title: 'Religious Corruption & Social Conditions (Al-Jahiliyyah)',
    titleUrdu: 'دورِ جاہلیت کے دینی، اخلاقی اور معاشرتی حالات',
    summaryEn: [
      'Although Makkah’s inhabitants remembered Prophet Ibrahim (AS) and retained remnants of Tawhid such as venerating the Ka‘bah and performing Hajj, ‘Amr ibn Luhayy al-Khuza‘i introduced idol worship from Syria. Gradually 360 idols—including Hubal, Al-Lat, Al-‘Uzza, and Manat—surrounded and entered the Sacred House.',
      'Socially, Arabia stood fractured by decades-long tribal blood feuds, usury (Riba), rampant alcohol, humiliation of women, and the tragic practice of burying infant daughters alive. Yet sparks of nobility—chivalry, loyalty to oaths, and keeping one’s word—remained embedded in the Arab character waiting to be purified by revelation.',
    ],
    summaryUr: [
      'اہلِ مکہ حضرت ابراہیمؑ کی چند روایات مثلاً حج اور احترامِ کعبہ کو باقی رکھے ہوئے تھے، لیکن عمرو بن لحی خزاعی نے شام سے بت پرستی متعارف کرائی اور رفتہ رفتہ کعبہ کے گرد 360 بت نصب کر دیے گئے، جن میں ہبل، لات، عزیٰ اور منات نمایاں تھے۔',
      'معاشرہ قبائلی عداوتوں، سود خوری، شراب نوشی، خواتین کے استحصال اور دختر کشی جیسی جاہلانہ رسوم کا شکار تھا؛ البتہ شجاعت، عہد کی پاسداری اور مہمان نوازی جیسی خوبیاں اب بھی باقی تھیں۔',
    ],
    takeawaysEn: [
      'Humanity stood in acute spiritual and moral need of divine guidance before the Prophet’s advent.',
      'Islam preserved noble Arab virtues like generosity and courage while uprooting shirk and oppression.',
    ],
    takeawaysUr: [
      'بعثتِ نبوی ﷺ سے قبل انسانیت شدید روحانی اور اخلاقی تاریکی میں تھی اور ہدایتِ الٰہی کی محتاج تھی۔',
      'اسلام نے شرک و ظلم کا خاتمہ کر کے سخاوت و شجاعت جیسی اعلیٰ اقدار کو نکھارا۔',
    ],
  },

  // CHAPTER 2: BIRTH & EARLY LIFE
  {
    id: 'ch2-elephant-lineage',
    era: 'Birth & Early Life',
    yearLabel: '570 CE · 53 BH',
    title: 'Pure Lineage & The Year of the Elephant',
    titleUrdu: 'نسبِ مبارک اور عام الفیل کا عظیم واقعہ',
    summaryEn: [
      'Muhammad ﷺ descended through an unbroken line of honorable forebears: Muhammad ibn Abdullah ibn Abdul-Muttalib ibn Hashim ibn ‘Abd Manaf ibn Qusayy ibn Kilab, reaching ‘Adnan and Prophet Ismail (AS). Hashim fed pilgrims generously, while Abdul-Muttalib rediscovered the buried Well of Zamzam after decades of obscurity.',
      'In the very year of the Prophet’s birth, Abrahah marched from Yemen with an elephant-led army to demolish the Ka‘bah. Abdul-Muttalib famously told Abrahah: "I am the master of my camels, and the House has a Lord Who will defend it." Allah sent flocks of birds (Ababil) showering baked clay stones, annihilating the invaders (Surah al-Fil).',
    ],
    summaryUr: [
      'نبی کریم ﷺ کا نسبِ اطہر محمد بن عبداللہ بن عبدالمطلب بن ہاشم سے ہوتا ہوا حضرت اسماعیلؑ تک پہنچتا ہے۔ آپ کے دادا عبدالمطلب نے زمزم کا گمشدہ کنواں دوبارہ دریافت فرمایا اور حاجیوں کی خدمت کا شرف پایا۔',
      'آپ کی ولادت کے سال ابرہہ ہاتھیوں کا لشکر لے کر کعبہ گرانے آیا۔ عبدالمطلب نے فرمایا: "اس گھر کا ایک مالک ہے جو خود اس کی حفاظت کرے گا۔" اللہ تعالیٰ نے ابابیل کے ذریعے کنکریاں برسا کر لشکر کو تباہ کر دیا۔',
    ],
    takeawaysEn: [
      'Allah visibly protected the Sacred Sanctuary fifty days before the birth of Muhammad ﷺ.',
      'Every link in the Prophet’s ancestry was guarded in honor and dignity.',
    ],
    takeawaysUr: [
      'آپ ﷺ کی ولادت سے پچاس دن قبل اللہ تعالیٰ نے بیت اللہ کی حفاظت فرما کر دنیا کو عظیم نشانی دکھائی۔',
      'آپ ﷺ کا خاندان عرب میں شرافت، قیادت اور پاکدامنی میں ممتاز تھا۔',
    ],
  },
  {
    id: 'ch2-birth-halimah',
    era: 'Birth & Early Life',
    yearLabel: '570–578 CE',
    title: 'Birth in Makkah, Halimah al-Sa‘diyah & Orphanhood',
    titleUrdu: 'ولادت، رضاعتِ حلیمہؓ اور بچپن کی یتیمی',
    summaryEn: [
      'Born on Monday in Rabi al-Awwal (April 570 / 571 CE) after his father Abdullah had died in Yathrib, the infant was carried by Abdul-Muttalib inside the Ka‘bah and named Muhammad. Soon after, he was entrusted to Halimah al-Sa‘diyah of Banu Sa‘d in the desert, where drought turned into immediate abundance for her household.',
      'At age four, angels opened his chest (Shaqq as-Sadr), washed his heart with Zamzam water, and purified it. Returned to his mother Aminah bint Wahb, he lost her at Abwa at age six, then lost his loving grandfather Abdul-Muttalib at age eight, coming under the devoted guardianship of his uncle Abu Talib.',
    ],
    summaryUr: [
      'ربیع الاول میں پیر کے دن مکہ مکرمہ میں ولادت ہوئی۔ والد عبداللہ پہلے ہی وفات پا چکے تھے۔ دادا عبدالمطلب نے آپ کو کعبہ میں لے جا کر شکر ادا کیا اور "محمد" نام رکھا۔ بعدازاں حضرت حلیمہ سعدیہؓ کی رضاعت میں بنو سعد تشریف لے گئے جہاں ہر طرف برکتیں برسنے لگیں۔',
      'چار سال کی عمر میں شقِ صدر کا واقعہ پیش آیا۔ چھ سال کی عمر میں والدہ آمنہؓ کا ابواء کے مقام پر انتقال ہوا، آٹھ سال کی عمر میں دادا بھی رخصت ہوئے اور چچا ابو طالب نے آپ کی کفالت سنبھالی۔',
    ],
    takeawaysEn: [
      'Raising him as an orphan cultivated deep compassion for the vulnerable throughout his life.',
      'Shaqq as-Sadr prepared his heart spiritually years before formal revelation began.',
    ],
    takeawaysUr: [
      'یتیمی کے تجربے نے آپ ﷺ کے دل میں کمزوروں اور بے سہاروں کے لیے بے پناہ شفقت پیدا کی۔',
      'بچپن ہی میں قلبِ مبارک کی تطہیر نبوت کی عظیم ذمہ داری کی تیاری تھی۔',
    ],
  },
  {
    id: 'ch2-syria-fudul',
    era: 'Birth & Early Life',
    yearLabel: '582–595 CE',
    title: 'Journey to Syria, Bahira & Hilf al-Fudul',
    titleUrdu: 'سفرِ شام، راہب بحیرا اور حلف الفضول',
    summaryEn: [
      'At age twelve, young Muhammad ﷺ accompanied Abu Talib’s caravan to Busra in Syria, where the Christian monk Bahira noticed a cloud shading him and recognized the Seal of Prophethood between his shoulders, advising Abu Talib to guard him carefully from envious foes.',
      'At age twenty, after witnessing the Sacrilegious Wars (Harb al-Fijar), he participated enthusiastically in Hilf al-Fudul—a solemn Makkan pact pledging to defend every oppressed stranger or resident in Makkah. Decades later as Messenger of Allah, he declared he would still honor that pact over red camels.',
    ],
    summaryUr: [
      'بارہ سال کی عمر میں چچا ابو طالب کے ساتھ بصریٰ (شام) کے تجارتی سفر پر گئے جہاں راہب بحیرا نے بادل کے سایہ اور مہرِ نبوت دیکھ کر آپ کے آخری نبی ہونے کی گواہی دی اور حفاظت کا مشورہ دیا۔',
      'بیس سال کی عمر میں آپ ﷺ نے مکہ میں مظلوموں کی مدد کے معاہدے "حلف الفضول" میں شرکت فرمائی، اور نبوت کے بعد بھی فرمایا کہ اگر آج مجھے ایسے معاہدے کی طرف بلایا جائے تو میں ضرور لبیک کہوں گا۔',
    ],
    takeawaysEn: [
      'Standing for civic justice (Hilf al-Fudul) was part of his character before prophethood.',
      'Working as a shepherd taught patience, vigilance, and humility in caring for a community.',
    ],
    takeawaysUr: [
      'نبوت سے قبل ہی آپ ﷺ عدل و انصاف اور مظلوم کی حمایت کے علمبردار تھے۔',
      'بکریاں چرانے کے پیشے نے امت کی نگہبانی کے لیے صبر اور عاجزی کی تربیت دی۔',
    ],
  },
  {
    id: 'ch2-khadijah-kaabah',
    era: 'Birth & Early Life',
    yearLabel: '595–605 CE',
    title: 'Al-Amin, Marriage to Khadijah (RA) & Rebuilding the Ka‘bah',
    titleUrdu: 'صادق و امین، حضرت خدیجہؓ سے نکاح اور حجرِ اسود کی تنصیب',
    summaryEn: [
      'Renowned across Makkah as As-Sadiq (The Truthful) and Al-Amin (The Trustworthy), at age twenty-five he led Khadijah bint Khuwaylid’s trade caravan to Syria with her servant Maysarah. Impressed by his extraordinary integrity and blessed character, Khadijah (RA)—the noblest woman of Quraysh—proposed marriage, beginning twenty-five years of loving companionship.',
      'At age thirty-five, Quraysh rebuilt the Ka‘bah and nearly went to war over who would place the Black Stone (Hajar al-Aswad). Agreeing that the first man entering the sanctuary would arbitrate, they rejoiced seeing Al-Amin arrive. He laid his cloak, placed the Stone upon it, invited every clan chief to lift an edge together, and set it in place with his own hands.',
    ],
    summaryUr: [
      'مکہ میں "صادق اور امین" کے لقب سے مشہور آپ ﷺ نے پچیس سال کی عمر میں حضرت خدیجہؓ کا تجارتی سامان شام لے جا کر بے مثال دیانت کا مظاہرہ کیا۔ آپ کے اخلاق سے متاثر ہو کر حضرت خدیجہؓ نے نکاح کی پیشکش کی اور پچیس سال تک مثالی رفاقت نبھائی۔',
      'پینتیس سال کی عمر میں تعمیرِ کعبہ کے وقت حجرِ اسود رکھنے پر قبائل میں خونریز جنگ کا خطرہ پیدا ہوا تو آپ ﷺ نے اپنی چادر بچھا کر تمام سرداروں کو شریک فرمایا اور اپنے دستِ مبارک سے حجرِ اسود نصب کر کے فتنہ ٹال دیا۔',
    ],
    takeawaysEn: [
      'Trustworthiness (Amanah) and wise conflict resolution won universal Makkan respect prior to Islam.',
      'Khadijah (RA) became the emotional and financial bedrock of the coming prophetic mission.',
    ],
    takeawaysUr: [
      'امانت داری اور حکمتِ عملی سے آپ ﷺ نے نبوت سے پہلے ہی ہر دل میں مقام بنا لیا تھا۔',
      'حضرت خدیجہؓ کی رفاقت آنے والے کٹھن مشن کا سب سے بڑا سہارا ثابت ہوئی۔',
    ],
  },

  // CHAPTER 3: REVELATION & SECRET CALL
  {
    id: 'ch3-hira-revelation',
    era: 'Revelation & Secret Call',
    yearLabel: 'Ramadan 610 CE · 13 BH',
    title: 'Seclusion in Cave Hira & First Revelation (Iqra)',
    titleUrdu: 'غارِ حرا میں خلوت نشینی اور پہلی وحی کا نزول',
    summaryEn: [
      'Approaching age forty, Muhammad ﷺ increasingly distanced himself from Makkan idolatry, spending nights in worship (Tahannuth) inside Cave Hira atop Jabal an-Noor, preceded by six months of true dreams that unfolded like dawn.',
      'On a blessed night in Ramadan (Laylat al-Qadr), Angel Jibril (AS) appeared, embraced him tightly three times commanding "Read!" (Iqra), and revealed Surah al-‘Alaq (96:1–5). Trembling, he returned to Khadijah (RA) saying "Cover me!" She reassured him immediately: "Never! Allah will never disgrace you; you uphold family ties, bear the burdens of the weak, honor guests, and aid the afflicted." Waraqah ibn Nawfal then confirmed he had met the same Namus (Jibril) sent to Musa (AS).',
    ],
    summaryUr: [
      'چالیس برس کی عمر کے قریب آپ ﷺ بت پرستی سے بیزار ہو کر جبلِ نور کے غارِ حرا میں عبادت اور غور و فکر فرمانے لگے، اور چھ ماہ تک سچے خواب دیکھتے رہے۔',
      'رمضان کی ایک مبارک رات حضرت جبرائیلؑ تشریف لائے، آپ کو بھینچ کر فرمایا: "اقْرَأْ" (پڑھو!) اور سورۃ العلق کی ابتدائی پانچ آیات نازل ہوئیں۔ لرزتے ہوئے گھر پہنچے تو حضرت خدیجہؓ نے تسلی دی کہ اللہ آپ کو کبھی رسوا نہ کرے گا، پھر ورقہ بن نوفل نے آپ کی نبوت کی تصدیق کی۔',
    ],
    takeawaysEn: [
      'Good character—caring for kin and the vulnerable—is proof of Allah’s favor and protection.',
      'Revelation opened with reading, knowledge, and the pen in the Name of the Creator.',
    ],
    takeawaysUr: [
      'اعلیٰ اخلاق، صلہ رحمی اور کمزوروں کی خدمت اللہ کی نصرت کی ضمانت ہے۔',
      'اسلامی پیغام کا آغاز علم، قراءت اور ربِ کائنات کی معرفت سے ہوا۔',
    ],
  },
  {
    id: 'ch3-secret-dawah',
    era: 'Revelation & Secret Call',
    yearLabel: '610–613 CE · 13–10 BH',
    title: 'The Secret Call & Dar al-Arqam',
    titleUrdu: 'خفیہ دعوتِ اسلام اور دارِ ارقم کی تربیت',
    summaryEn: [
      'Following a brief pause in revelation (Fatrat al-Wahy), Surah al-Muddaththir (74:1–7) was revealed commanding the Prophet ﷺ to arise and warn humanity. For three years, dawah was extended discreetly to trusted relatives and friends.',
      'The earliest to embrace Islam were Khadijah (RA) among women, his close friend Abu Bakr as-Siddiq (RA) among free men, ten-year-old Ali ibn Abi Talib (RA), and his freedman Zayd ibn Harithah (RA). Through Abu Bakr’s quiet outreach, luminaries like Uthman ibn Affan, Zubayr, Talhah, Abdur-Rahman ibn Awf, and Sa‘d ibn Abi Waqqas accepted Islam and trained silently in Dar al-Arqam near Mount Safa.',
    ],
    summaryUr: [
      'کچھ وقفے کے بعد سورۃ المدثر کی آیات نازل ہوئیں جن میں اٹھ کر دعوت دینے کا حکم دیا گیا۔ ابتدائی تین سال نہایت رازداری سے قریبی اور قابلِ اعتماد افراد کو اسلام کی دعوت دی گئی۔',
      'سب سے پہلے حضرت خدیجہؓ، مردوں میں حضرت ابوبکر صدیقؓ، بچوں میں حضرت علیؓ اور غلاموں میں حضرت زید بن حارثہؓ ایمان لائے۔ حضرت ابوبکرؓ کی دعوت سے حضرت عثمانؓ، زبیرؓ، طلحہؓ، عبدالرحمٰن بن عوفؓ اور سعدؓ مشرف بہ اسلام ہوئے اور دارِ ارقم میں خفیہ تربیت پاتے رہے۔',
    ],
    takeawaysEn: [
      'Strategic wisdom: nurturing a committed core through Quranic tarbiyah before public confrontation.',
      'Islam united elites and freed servants equally around pure Tawhid.',
    ],
    takeawaysUr: [
      'حکمتِ دعوت کا تقاضا تھا کہ علانیہ اعلان سے قبل مخلص ساتھیوں کی مضبوط تربیت کی جائے۔',
      'توحید نے آزاد و غلام اور امیر و غریب سب کو ایک صف میں کھڑا کر دیا۔',
    ],
  },

  // CHAPTER 4: MAKKAH PERSECUTION & ABYSSINIA
  {
    id: 'ch4-safa-persecution',
    era: 'Makkah Persecution & Abyssinia',
    yearLabel: '613–615 CE',
    title: 'Proclamation at Mount Safa & Makkan Persecution',
    titleUrdu: 'کوہِ صفا سے اعلانیہ دعوت اور قریش کا ظلم و ستم',
    summaryEn: [
      'When Allah revealed "And warn your closest kindred" (26:214) and "Proclaim openly what you are commanded" (15:94), the Prophet ﷺ ascended Mount Safa, summoned every Makkan clan, reminded them they had never heard a lie from him, and warned them of the Hereafter. Abu Lahab cursed him in rage, earning Surah al-Masad.',
      'Realizing Tawhid threatened their idol economy and tribal arrogance, Quraysh launched fierce persecution—especially against the unprotected. Bilal ibn Rabah (RA) was pinned beneath scorching boulders whispering "Ahad, Ahad"; Ammar’s parents Yasir and Sumayyah (RA) endured lethal torture, making Sumayyah Islam’s first martyr.',
    ],
    summaryUr: [
      'جب قریبی رشتہ داروں اور پھر اعلانیہ دعوت کا حکم نازل ہوا تو آپ ﷺ نے کوہِ صفا پر چڑھ کر تمام قریش کو پکارا۔ سب نے آپ کے صادق ہونے کا اقرار کیا مگر توحید کی دعوت سن کر ابو لہب نے مخالفت کی۔',
      'قریش نے غریب و بے سہارا مسلمانوں پر مظالم کے پہاڑ توڑ دیے۔ حضرت بلالؓ کو تپتی ریت پر لٹا کر سینے پر بھاری پتھر رکھے گئے، جبکہ حضرت یاسرؓ اور حضرت سمیہؓ نے شہادت پا کر استقامت کی لازوال تاریخ رقم کی۔',
    ],
    takeawaysEn: [
      'Sumayyah (RA) and Bilal (RA) proved faith outweighs physical suffering.',
      'Abu Bakr (RA) spent his wealth liberating enslaved believers under torture.',
    ],
    takeawaysUr: [
      'حضرت سمیہؓ اور بلالؓ کی استقامت نے ثابت کیا کہ ایمان کے سامنے دنیاوی تکالیف ہیچ ہیں۔',
      'حضرت ابوبکر صدیقؓ نے اپنا مال خرچ کر کے مظلوم غلاموں کو آزادی دلائی۔',
    ],
  },
  {
    id: 'ch4-abyssinia-hamza-umar',
    era: 'Makkah Persecution & Abyssinia',
    yearLabel: '615–616 CE · 5–6 BH',
    title: 'Migrations to Abyssinia & Conversion of Hamza & Umar (RA)',
    titleUrdu: 'ہجرتِ حبشہ اور حضرت حمزہؓ و حضرت عمرؓ کا قبولِ اسلام',
    summaryEn: [
      'To protect vulnerable believers, the Prophet ﷺ directed them to Abyssinia under the just Christian king Al-Najashi (Negus). When Quraysh sent envoys demanding their extradition, Ja‘far ibn Abi Talib (RA) stood in court and recited Surah Maryam, moving Al-Najashi to tears as he guaranteed the Muslims complete safety.',
      'Shortly thereafter, Allah strengthened Islam in Makkah through two towering conversions: the Prophet’s valiant uncle Hamza ibn Abdul-Muttalib (RA), and Umar ibn al-Khattab (RA), whose heart melted upon hearing Surah Ta-Ha at his sister Fatimah’s home. For the first time, believers marched in two open ranks to pray at the Ka‘bah.',
    ],
    summaryUr: [
      'مظالم بڑھنے پر آپ ﷺ نے صحابہؓ کو عادل بادشاہ نجاشی کے ملک حبشہ کی طرف ہجرت کی اجازت دی۔ قریش کے وفد کے سامنے حضرت جعفر طیارؓ نے سورہ مریم کی تلاوت کی جسے سن کر نجاشی رو پڑے اور مسلمانوں کو مکمل پناہ دی۔',
      'اسی دوران حضرت حمزہؓ اور حضرت عمر فاروقؓ کے قبولِ اسلام سے مسلمانوں کو عظیم قوت ملی اور پہلی بار بیت اللہ میں اعلانیہ صفیں باندھ کر نماز ادا کی گئی۔',
    ],
    takeawaysEn: [
      'Ja‘far’s dignified speech exemplifies principled dialogue rooted in shared moral truths.',
      'The conversions of Hamza and Umar (RA) transformed the balance of confidence in Makkah.',
    ],
    takeawaysUr: [
      'نجاشی کے دربار میں حضرت جعفرؓ کی گفتگو حکمتِ دعوت کی بہترین مثال ہے۔',
      'حضرت حمزہؓ اور عمرؓ کے ایمان لانے سے مکہ میں اسلام کو واضح تقویت ملی۔',
    ],
  },

  // CHAPTER 5: BOYCOTT, YEAR OF SORROW & TA'IF
  {
    id: 'ch5-boycott-sorrow',
    era: 'Boycott, Year of Sorrow & Taif',
    yearLabel: '616–619 CE · 7–10 BH',
    title: 'Three-Year Boycott in Shi‘b Abi Talib & Year of Sorrow',
    titleUrdu: 'شعبِ ابی طالب کا محاصرہ اور عام الحزن',
    summaryEn: [
      'Unable to silence the call, Quraysh drafted a written pact banning all marriage, trade, and contact with Banu Hashim and Banu al-Muttalib, confining them to the narrow valley of Shi‘b Abi Talib for three grueling years. Families survived on tree leaves and scarce secret aid until Allah caused termites to devour the entire parchment except "Bismika Allahumma."',
      'Within months of emerging from the exhausted boycott in the 10th year of prophethood, the Prophet ﷺ lost his unwavering protector Abu Talib, followed days later by his beloved wife and confidante Khadijah (RA)—a double bereavement etched in history as ‘Am al-Huzn (The Year of Sorrow).',
    ],
    summaryUr: [
      'قریش نے بنو ہاشم اور بنو المطلب کا مکمل معاشرتی و تجارتی بائیکاٹ کر کے انہیں تین سال تک شعبِ ابی طالب میں محصور رکھا، جہاں نوبت درختوں کے پتے کھانے تک جا پہنچی، تاآنکہ اللہ نے ان کے معاہدے کو دیمک کے ذریعے کھلوا دیا۔',
      'محاصرہ ختم ہونے کے چند ماہ بعد نبوت کے دسویں سال چچا ابو طالب اور ام المؤمنین حضرت خدیجہؓ کا وصال ہو گیا، جسے تاریخ میں "عام الحزن" (غم کا سال) کہا جاتا ہے۔',
    ],
    takeawaysEn: [
      'Steadfast family solidarity protected the Messenger ﷺ even amid severe hunger.',
      'Outward loss does not diminish Allah’s love; grief is honored while staying firm in mission.',
    ],
    takeawaysUr: [
      'شدید بھوک اور بائیکاٹ کے باوجود اہلِ ایمان ثابت قدم رہے۔',
      'بے پناہ غم کے باوجود نبی کریم ﷺ نے دعوتِ حق کا مشن جاری رکھا۔',
    ],
  },
  {
    id: 'ch5-taif-journey',
    era: 'Boycott, Year of Sorrow & Taif',
    yearLabel: '619 CE · 10 BH',
    title: 'The Trial at Ta’if & Prayer of Mercy',
    titleUrdu: 'سفرِ طائف، صبر کی انتہا اور رحمت بھری دعا',
    summaryEn: [
      'Seeking a new base of support after Abu Talib’s passing, the Prophet ﷺ walked with Zayd ibn Harithah (RA) to Ta’if, speaking politely with the leaders of Banu Thaqif. Not only did they mock him coldly, they stirred street crowds to line the path and pelt him relentlessly with stones until his blessed sandals overflowed with blood while Zayd tried to shield him.',
      'Taking shelter inside the vineyard of ‘Utbah and Shaybah, he raised his unforgettable du‘a of pure servitude ("To You I complain of my weakness, my scarcity of resources, and my insignificance before people; You are the Lord of the weak and You are my Lord; if You are not angry with me, I care not"). When Jibril and the Angel of the Mountains offered to crush the town between the two peaks of Akhshabayn, the Prophet ﷺ replied: "Rather, I hope Allah will bring forth from their loins people who worship Allah alone." Soon after, a Christian servant named ‘Addas kissed his head and hands upon hearing him say "Bismillah."',
    ],
    summaryUr: [
      'ابو طالب کے وصال کے بعد نئی حمایت کی تلاش میں آپ ﷺ حضرت زید بن حارثہؓ کے ہمراہ طائف تشریف لے گئے۔ بنو ثقیف کے سرداروں نے نہ صرف انکار کیا بلکہ اوباشوں کو پیچھے لگا دیا جنہوں نے پتھر مار مار کر آپ ﷺ کے نعلین مبارک کو لہولہان کر دیا۔',
      'ایک باغ میں پناہ لے کر آپ ﷺ نے بارگاہِ الٰہی میں انتہائی عاجزانہ دعا فرمائی۔ جب فرشتے نے طائف کو دو پہاڑوں کے درمیان پیس دینے کی اجازت مانگی تو آپ ﷺ نے فرمایا: "مجھے امید ہے کہ اللہ ان کی نسلوں سے ایسے لوگ پیدا فرمائے گا جو صرف اللہ کی عبادت کریں گے۔"',
    ],
    takeawaysEn: [
      'Mercy toward hostile towns changed Ta’if within a decade into a loyal Muslim stronghold.',
      'True greatness is refusing vengeance when total power is offered.',
    ],
    takeawaysUr: [
      'طائف والوں کے لیے رحمت بھری دعا کی برکت سے چند سال بعد پورا طائف مسلمان ہو گیا۔',
      'انتقام کی قدرت کے باوجود معاف کر دینا اخلاقِ نبوی ﷺ کا عظیم کمال ہے۔',
    ],
  },

  // CHAPTER 6: AL-ISRA WAL-MI‘RAJ
  {
    id: 'ch6-isra-jerusalem',
    era: 'Al-Isra wal-Mi‘raj',
    yearLabel: '620–621 CE · 11 BH',
    title: 'Al-Isra: The Night Journey to Masjid al-Aqsa',
    titleUrdu: 'سفرِ اسراء: مسجدِ حرام سے مسجدِ اقصیٰ تک',
    summaryEn: [
      'Shortly after the severe trials of the Year of Sorrow and Ta’if, Allah honored His Messenger ﷺ with Al-Isra—the miraculous night journey from Masjid al-Haram in Makkah to Masjid al-Aqsa in Jerusalem (Surah al-Isra 17:1). Angel Jibril (AS) purified his heart once more with Zamzam and brought the radiant winged steed Al-Buraq.',
      'Arriving at Bayt al-Maqdis, Allah gathered all previous Prophets—Ibrahim, Musa, Isa, and the rest (peace be upon them all)—and Muhammad ﷺ stepped forward as Imam to lead them all in prayer, symbolizing that the final revelation completes and confirms all prior prophetic messages. Offered vessels of milk and wine, he chose milk, and Jibril declared: "You have been guided to the natural path (Al-Fitrah)."',
    ],
    summaryUr: [
      'عام الحزن اور طائف کی آزمائشوں کے بعد اللہ تعالیٰ نے اپنے حبیب ﷺ کو معجزۂ اسراء و معراج سے نوازا۔ حضرت جبرائیلؑ آپ کو براق پر بٹھا کر راتوں رات مسجدِ حرام سے مسجدِ اقصیٰ (بیت المقدس) لے گئے۔',
      'مسجدِ اقصیٰ میں تمام سابقہ انبیاء کرامؑ جمع کیے گئے اور نبی کریم ﷺ نے سب کی امامت فرمائی، جو اس بات کا اعلان تھا کہ آپ تمام انبیاءؑ کے مشن کی تکمیل فرمانے والے آخری رسول ہیں۔ پھر آپ نے دودھ کا پیالہ منتخب فرمایا جس پر جبرائیلؑ نے فرمایا کہ آپ نے فطرت کو چن لیا۔',
    ],
    takeawaysEn: [
      'Leading all Prophets in Salah anchored Masjid al-Aqsa permanently in the Muslim heart.',
      'Choosing Al-Fitrah reflects Islam’s harmony with pure human nature.',
    ],
    takeawaysUr: [
      'بیت المقدس میں تمام انبیاءؑ کی امامت نے امتِ مسلمہ کے دلوں میں مسجدِ اقصیٰ کی عظمت راسخ کر دی۔',
      'دینِ اسلام انسانی فطرتِ سلیمہ کے عین مطابق ہے۔',
    ],
  },
  {
    id: 'ch6-miraj-salah-gift',
    era: 'Al-Isra wal-Mi‘raj',
    yearLabel: '620–621 CE · 11 BH',
    title: 'Al-Mi‘raj: Ascension Through the Heavens & Gift of Five Daily Prayers',
    titleUrdu: 'معراجِ سماوی، انبیاءؑ سے ملاقات اور پنجگانہ نماز کا تحفہ',
    summaryEn: [
      'From the Sacred Rock in Jerusalem, the Prophet ﷺ ascended with Jibril (AS) across the seven heavens: meeting Adam (AS) in the first, Yahya and Isa (AS) in the second, Yusuf (AS) in the third, Idris (AS) in the fourth, Harun (AS) in the fifth, Musa (AS) in the sixth, and Prophet Ibrahim (AS) leaning against Al-Bayt al-Ma‘mur (entered daily by seventy thousand angels) in the seventh.',
      'Reaching Sidrat al-Muntaha—the Lote Tree of the Utmost Boundary—he stood before Divine Majesty and received the closing verses of Surah al-Baqarah (2:285–286), forgiveness for those who shun shirk, and fifty daily prayers, reduced through Musa’s counsel and Allah’s mercy to five daily prayers carrying the full reward of fifty. Returning to Makkah before dawn, Abu Bakr (RA) famously declared his immediate belief ("If he said it, it is true!"), earning forever the title As-Siddiq.',
    ],
    summaryUr: [
      'بیت المقدس سے آپ ﷺ حضرت جبرائیلؑ کے ساتھ ساتوں آسمانوں کی سیر پر تشریف لے گئے: پہلے آسمان پر حضرت آدمؑ، دوسرے پر یحییٰ و عیسیٰؑ، تیسرے پر یوسفؑ، چوتھے پر ادریسؑ، پانچویں پر ہارونؑ، چھٹے پر موسیٰؑ اور ساتویں آسمان پر بیت المعمور سے ٹیک لگائے حضرت ابراہیمؑ سے ملاقات ہوئی۔',
      'سدرۃ المنتہیٰ کے مقام پر اللہ تعالیٰ نے براہِ راست سورہ بقرہ کی آخری دو آیات، غیر مشرکین کی مغفرت کی بشارت اور پنجگانہ نماز کا عظیم تحفہ عطا فرمایا، جو پچاس نمازوں کے ثواب کے برابر ہے۔ صبح مکہ میں حضرت ابوبکرؓ نے بلا تردد تصدیق کر کے "صدیق" کا لقب پایا۔',
    ],
    takeawaysEn: [
      'Unlike every other command brought via revelation on earth, Salah was gifted directly above the heavens.',
      'Abu Bakr as-Siddiq (RA) set the standard of unshakeable conviction in the Messenger’s word.',
    ],
    takeawaysUr: [
      'نماز واحد عبادت ہے جو زمین پر وحی کے بجائے براہِ راست آسمانوں کے اوپر عطا کی گئی۔',
      'حضرت ابوبکر صدیقؓ کا فوری ایمان یقینِ کامل کا روشن معیار ہے۔',
    ],
  },

  // CHAPTER 7: PLEDGES OF AQABAH & GREAT HIJRAH
  {
    id: 'ch7-aqabah-pledges',
    era: 'Pledges of Aqabah & Great Hijrah',
    yearLabel: '620–622 CE · 12–13 Prophethood',
    title: 'The First & Second Pledges of Aqabah',
    titleUrdu: 'بیعتِ عقبہ اولیٰ اور بیعتِ عقبہ ثانیہ',
    summaryEn: [
      'During the 11th year of Hajj, six men from the Khazraj tribe of Yathrib heard the Prophet ﷺ recite the Quran at ‘Aqabah, recognized him as the awaited Prophet, and carried Islam back to their city. The following year, twelve Ansar took the First Pledge of ‘Aqabah, after which Mus‘ab ibn Umayr (RA) was dispatched as Madinah’s first teacher, transforming nearly every household through wisdom and the Quran.',
      'In the 13th year, seventy-three men and two women met the Prophet ﷺ secretly by night at ‘Aqabah to seal the Second Pledge—vowing to protect the Messenger ﷺ as they protected their own families, obey in ease and hardship, and invite him to Madinah.',
    ],
    summaryUr: [
      'حج کے موقع پر یثرب (مدینہ) کے چھ افراد نے عقبہ کے مقام پر آپ ﷺ سے اسلام قبول کیا۔ اگلے سال بارہ انصار نے بیعتِ عقبہ اولیٰ کی اور حضرت مصعب بن عمیرؓ مدینہ کے پہلے معلم بن کر گئے جن کی حکمت سے گھر گھر اسلام پھیل گیا۔',
      'تیرہویں سال تہتر مردوں اور دو خواتین نے رات کی تاریکی میں بیعتِ عقبہ ثانیہ کر کے رسول اللہ ﷺ کی ہر حال میں حفاظت اور مدینہ تشریف آوری کا عہد کیا۔',
    ],
    takeawaysEn: [
      'Mus‘ab ibn Umayr (RA) opened Madinah not by sword, but by character and Quranic recitation.',
      'Preparation and mutual covenant preceded the establishment of the Madinan society.',
    ],
    takeawaysUr: [
      'مدینہ منورہ تلوار سے نہیں بلکہ حضرت مصعبؓ کے حسنِ اخلاق اور قرآن کی دعوت سے فتح ہوا۔',
      'اسلامی معاشرے کے قیام سے قبل مضبوط عہد و پیمان اور تیاری کی گئی۔',
    ],
  },
  {
    id: 'ch7-great-hijrah',
    era: 'Pledges of Aqabah & Great Hijrah',
    yearLabel: 'Rabi al-Awwal 1 AH · Sep 622 CE',
    title: 'Cave Thawr, Suraqah & Joyous Arrival in Quba and Madinah',
    titleUrdu: 'غارِ ثور، سراقہ کا تعاقب اور قباء و مدینہ آمد',
    summaryEn: [
      'When Quraysh chiefs plotted at Dar an-Nadwah to assassinate the Prophet ﷺ using warriors from every clan, Jibril (AS) informed him. Leaving Ali (RA) in his bed to return Makkan trusts to their rightful owners, the Prophet ﷺ departed with Abu Bakr as-Siddiq (RA) and sheltered three nights in Cave Thawr while Asma bint Abi Bakr brought provisions and Abdullah gathered Makkan intelligence.',
      'Allah blinded the trackers at the cave’s mouth ("Do not grieve; indeed Allah is with us," 9:40). Along the coastal route led by Abdullah ibn Urayqit, Suraqah ibn Malik pursued them for Quraysh’s hundred-camel bounty, only for his horse’s hooves to sink thrice into solid earth before receiving a promise of Khosrow’s bracelets. Reaching Quba, the Prophet ﷺ built Islam’s first mosque and then entered Madinah amid joyous chants of welcome.',
    ],
    summaryUr: [
      'دارالندوہ میں قتل کی سازش کے بعد آپ ﷺ نے حضرت علیؓ کو امانتیں لوٹانے کے لیے اپنے بستر پر چھوڑا اور حضرت ابوبکرؓ کے ہمراہ غارِ ثور میں تین راتیں قیام فرمایا۔ غار کے دہانے پر دشمن پہنچ گئے مگر اللہ نے حفاظت فرمائی۔',
      'ساحلی راستے پر سراقہ بن مالک نے انعام کے لالچ میں تعاقب کیا مگر گھوڑے کے پاؤں زمین میں دھنس گئے اور آپ ﷺ نے اسے کسریٰ کے کنگن پہننے کی بشارت دی۔ قباء میں پہلی مسجد کی بنیاد رکھنے کے بعد مدینہ میں والہانہ استقبال ہوا۔',
    ],
    takeawaysEn: [
      'Even when targeted for assassination, the Prophet ﷺ ensured Makkan deposits were returned honestly.',
      'Careful planning—guides, supplies, and routes—combined seamlessly with complete Tawakkul.',
    ],
    takeawaysUr: [
      'دشمنوں کے نرغے میں بھی آپ ﷺ نے لوگوں کی امانتیں واپس لوٹانے کا اہتمام فرمایا۔',
      'بہترین تدبیر اور اسباب کے ساتھ اللہ پر کامل بھروسہ ہجرت کا بنیادی سبق ہے۔',
    ],
  },

  // CHAPTER 8: FOUNDING MADINAH, BADR & UHUD
  {
    id: 'ch8-masjid-brotherhood-charter',
    era: 'Founding Madinah, Badr & Uhud',
    yearLabel: '1–2 AH · 622–624 CE',
    title: 'Masjid an-Nabawi, Mu’akhah, Charter of Madinah & Change of Qiblah',
    titleUrdu: 'مسجدِ نبوی، مواخات، میثاقِ مدینہ اور تحویلِ قبلہ',
    summaryEn: [
      'Purchasing land from two orphan boys, Sahl and Suhayl, the Prophet ﷺ built Masjid an-Nabawi alongside his companions—serving as sanctuary, school of Suffah, and civic center, graced by Bilal’s Adhan. He established Brotherhood (Mu’akhah) pairing Muhajirun and Ansar in heartfelt solidarity and drafted the Charter of Madinah securing religious freedom and joint civic defense.',
      'In 2 AH, at Masjid al-Qiblatayn, Allah revealed 2:144 shifting the Qiblah from Jerusalem to the Sacred Ka‘bah in Makkah, and legislated fasting in Ramadan and institutionalized Zakah to bind personal devotion with social compassion.',
    ],
    summaryUr: [
      'دو یتیم بچوں سے زمین خرید کر آپ ﷺ نے صحابہؓ کے ساتھ مل کر مسجدِ نبوی تعمیر فرمائی، مہاجرین و انصار کے درمیان تاریخی مواخات قائم کی اور "میثاقِ مدینہ" کے ذریعے عدل و مذہبی آزادی کا آئینی معاہدہ نافذ فرمایا۔',
      '2 ہجری میں مسجدِ قبلتین میں وحی کے ذریعے قبلہ بیت المقدس سے خانہ کعبہ کی طرف تبدیل ہوا اور اسی سال ماہِ رمضان کے روزے اور زکوٰۃ فرض ہوئی۔',
    ],
    takeawaysEn: [
      'Spiritual grounding (Masjid) and social solidarity (Brotherhood) formed the pillars of the Madinan community.',
      'The Charter of Madinah stands as a landmark of written constitutional law and accountability.',
    ],
    takeawaysUr: [
      'مثالی ریاست کی بنیاد مسجد، بھائی چارے اور آئینی عدل پر رکھی گئی۔',
      'تحویلِ قبلہ نے امت کو مرکزِ توحید بیت اللہ کے گرد یکجا کر دیا۔',
    ],
  },
  {
    id: 'ch8-badr-uhud',
    era: 'Founding Madinah, Badr & Uhud',
    yearLabel: '2–3 AH · 624–625 CE',
    title: 'The Great Battle of Badr & The Trial of Uhud',
    titleUrdu: 'غزوہ بدرِ کبریٰ اور غزوہ احد کی آزمائش',
    summaryEn: [
      'On 17 Ramadan 2 AH, 313 modestly equipped believers stood at the wells of Badr facing over 1,000 heavily armed Quraysh warriors. Spending the night in tearful du‘a, the Prophet ﷺ received Allah’s promise of reinforcement by 1,000 angels. By noon, Quraysh’s senior leaders including Abu Jahl lay slain, marking Yawm al-Furqan—the Day of Criterion.',
      'A year later in Shawwal 3 AH at Mount Uhud, after Muslim archers left their strategic pass thinking victory was complete, Khalid ibn al-Walid wheeled behind them. Seventy noble companions—including the Prophet’s beloved uncle Hamza (RA) and Mus‘ab ibn Umayr (RA)—fell martyred, and the Prophet ﷺ himself was wounded, teaching the Ummah that victory depends on discipline and strict obedience.',
    ],
    summaryUr: [
      '17 رمضان 2 ہجری کو بدر کے میدان میں 313 نہتے مومنوں نے ایک ہزار سے زائد مسلح قریش کا مقابلہ کیا۔ رات بھر کی دعاؤں کے بعد اللہ نے فرشتوں سے نصرت فرمائی اور حق و باطل کا عظیم فیصلہ (یومِ فرقان) ہوا۔',
      'شوال 3 ہجری میں غزوہ احد کے موقع پر تیر اندازوں کے درہ چھوڑ دینے سے پانسہ پلٹ گیا، ستر صحابہؓ بشمول حضرت حمزہؓ اور مصعبؓ شہید ہوئے اور خود آپ ﷺ زخمی ہوئے۔ اس نے امت کو نظم و ضبط اور اطاعت کا عظیم سبق دیا۔',
    ],
    takeawaysEn: [
      'Badr proved numerical superiority cannot overcome sincere faith and divine aid.',
      'Uhud taught eternal lessons on guarding strategic posts and obeying prophetic guidance.',
    ],
    takeawaysUr: [
      'بدر نے ثابت کیا کہ تعداد کی کمی سچے ایمان اور نصرتِ الٰہی کے سامنے معنی نہیں رکھتی۔',
      'احد نے سکھایا کہ فتح کے قریب بھی حکمِ نبوی ﷺ اور نظم و ضبط سے غفلت نقصان دہ ہوتی ہے۔',
    ],
  },

  // CHAPTER 9: KHANDAQ, HUDAYBIYYAH & KHAYBAR
  {
    id: 'ch9-nadir-trench-qurayza',
    era: 'Khandaq, Hudaybiyyah & Khaybar',
    yearLabel: '4–5 AH · 625–627 CE',
    title: 'Banu Nadir, Battle of the Trench (Al-Ahzab) & Banu Qurayza',
    titleUrdu: 'جلاوطنی بنو نضیر، غزوہ خندق اور بنو قریظہ',
    summaryEn: [
      'Following a treacherous assassination plot against the Prophet ﷺ by Banu Nadir in 4 AH, they were peacefully exiled from Madinah as recorded in Surah al-Hashr. Soon those exiled leaders rallied Quraysh, Ghatafan, and allied Arab tribes into a massive 10,000-man coalition (Al-Ahzab) marching to eradicate Madinah in Shawwal 5 AH.',
      'Accepting Salman al-Farsi’s brilliant proposal, Muslims dug a deep defensive trench across Madinah’s exposed northern flank while enduring bitter cold and hunger. When Banu Qurayza broke their mutual defense treaty from within, Allah sent biting winds and panic through the confederates’ camp, scattering them without full-scale battle. Following the siege of Banu Qurayza, Sa‘d ibn Mu‘adh’s verdict upheld treason law fairly under their own scripture.',
    ],
    summaryUr: [
      '4 ہجری میں عہد شکنی اور قاتلانہ سازش پر بنو نضیر کو مدینہ سے جلاوطن کیا گیا۔ اس کے بعد انہوں نے قریش اور غطفان کو ملا کر 5 ہجری میں دس ہزار کے لشکرِ احزاب کے ساتھ مدینہ پر چڑھائی کی۔',
      'حضرت سلمان فارسیؓ کے مشورے سے مدینہ کے شمالی حصے میں خندق کھودی گئی۔ اندرونی غداری (بنو قریظہ) کے باوجود اللہ تعالیٰ نے تیز آندھی اور رعب سے لشکرِ احزاب کو پسپا فرما دیا۔',
    ],
    takeawaysEn: [
      'Consulting companions (Shura) brought Salman al-Farsi’s trench strategy that saved Madinah.',
      'In moments of extreme siege, faith shines brightest through steadfast patience and unity.',
    ],
    takeawaysUr: [
      'مشاورت (شوریٰ) کی برکت سے حضرت سلمان فارسیؓ کا خندق والا مشورہ مدینہ کے دفاع کا سبب بنا۔',
      'شدید محاصرے اور آزمائش میں بھی اہلِ ایمان کا توکل اور اتحاد قائم رہا۔',
    ],
  },
  {
    id: 'ch9-hudaybiyyah-khaybar',
    era: 'Khandaq, Hudaybiyyah & Khaybar',
    yearLabel: '6–7 AH · 628–629 CE',
    title: 'Treaty of Hudaybiyyah, Letters to Rulers & Conquest of Khaybar',
    titleUrdu: 'صلح حدیبیہ، سلاطین کو خطوط اور فتحِ خیبر',
    summaryEn: [
      'In Dhul-Qi‘dah 6 AH, the Prophet ﷺ marched with 1,400 unarmed pilgrims intending peaceful ‘Umrah. Blocked at Hudaybiyyah—where companions swore Bay‘at ar-Ridwan beneath a tree—he signed a ten-year truce that Allah named a "Clear Victory" (Fathun Mubin, Surah al-Fath). Freed from warfare, Islam doubled its numbers while the Prophet ﷺ sent sealed letters to Heraclius, Khosrow, the Muqawqis of Egypt, and Al-Najashi.',
      'In Muharram 7 AH, confronting plots centered at Khaybar’s fortresses, the Prophet ﷺ handed the banner to Ali ibn Abi Talib (RA), whose sore eyes were healed instantly with his blessed prayer and saliva. Fort Qamus fell, and peace terms allowed local farmers to retain half the harvest.',
    ],
    summaryUr: [
      '6 ہجری میں 1400 صحابہؓ کے ساتھ عمرہ کے لیے روانگی ہوئی مگر قریش نے حدیبیہ پر روک لیا۔ بیعتِ رضوان کے بعد دس سالہ صلح نامہ طے پایا جسے قرآن نے "فتح مبین" قرار دیا۔ امن کے اس دور میں آپ ﷺ نے ہرقل، خسرو، مقوقس اور نجاشی کو اسلام کی دعوت کے خطوط ارسال فرمائے۔',
      'محرم 7 ہجری میں سازشوں کے گڑھ خیبر پر حضرت علیؓ کے ہاتھوں قلعہ قموص فتح ہوا اور اہلِ خیبر کو نصف پیداوار پر کاشتکاری کی اجازت ملی۔',
    ],
    takeawaysEn: [
      'Strategic peace created far wider openings for hearts than continuous warfare.',
      'Letters to emperors proved Islam’s universal call beyond any single region.',
    ],
    takeawaysUr: [
      'امن اور معاہدوں کی حکمتِ عملی نے اسلام کی اشاعت کے لیے عظیم راہیں کھول دیں۔',
      'عالمی حکمرانوں کو خطوط نے اسلام کی عالمگیریت کو واضح کر دیا۔',
    ],
  },

  // CHAPTER 10: MU‘TAH, CONQUEST OF MAKKAH, HUNAYN & TABUK
  {
    id: 'ch10-mutah-fath-makkah',
    era: 'Mu‘tah, Conquest of Makkah, Hunayn & Tabuk',
    yearLabel: '8 AH · 629–630 CE',
    title: 'Heroism at Mu‘tah & The Bloodless Conquest of Makkah',
    titleUrdu: 'معرکہ موتہ اور فتحِ مکہ (کعبہ کی تطہیر و عام معافی)',
    summaryEn: [
      'In Jumada al-Ula 8 AH, 3,000 Muslims faced an imperial Byzantine-allied force exceeding 100,000 at Mu‘tah after an envoy’s murder. Zayd ibn Harithah, Ja‘far ibn Abi Talib, and Abdullah ibn Rawahah (RA) fought until martyrdom, whereupon Khalid ibn al-Walid executed a masterly withdrawal earning the title Sayfullah (Sword of Allah).',
      'Months later in Ramadan 8 AH, after Quraysh aided a treacherous slaughter against Muslim-allied Khuza‘ah, the Prophet ﷺ entered Makkah with 10,000 companions. Lowering his head humbly until his beard touched the saddle, he cleansed the 360 idols from the Ka‘bah reciting 17:81, bade Bilal call the Adhan atop the House, and forgave his bitterest lifelong foes: "Go, for you are free."',
    ],
    summaryUr: [
      '8 ہجری میں معرکہ موتہ میں 3000 صحابہؓ نے زید بن حارثہؓ، جعفر طیارؓ اور عبداللہ بن رواحہؓ کی شہادت کے بعد حضرت خالد بن ولیدؓ کی قیادت میں رومی اتحادیوں کے عظیم لشکر کا بے مثال شجاعت سے مقابلہ کیا۔',
      'رمضان 8 ہجری میں عہد شکنی کے بعد آپ ﷺ دس ہزار صحابہؓ کے ساتھ مکہ مکرمہ میں انتہائی تواضع کے ساتھ داخل ہوئے، بیت اللہ کو 360 بتوں سے پاک فرمایا، حضرت بلالؓ نے کعبہ کی چھت پر اذان دی اور تمام سابقہ دشمنوں کو عام معافی عطا فرمائی۔',
    ],
    takeawaysEn: [
      'At the pinnacle of triumph, the Prophet ﷺ modeled humility and universal amnesty.',
      'Mercy after power won hearts overnight that swords never tried to force.',
    ],
    takeawaysUr: [
      'فتح کے عروج پر عاجزی اور عام معافی نبوی سیرت کا عظیم ترین باب ہے۔',
      'معرکہ موتہ نے دکھایا کہ قلیل تعداد میں بھی ثابت قدمی اور حکمت کامیابی دلاتی ہے۔',
    ],
  },
  {
    id: 'ch10-hunayn-tabuk',
    era: 'Mu‘tah, Conquest of Makkah, Hunayn & Tabuk',
    yearLabel: '8–9 AH · 630 CE',
    title: 'Battle of Hunayn, Siege of Ta’if & Expedition of Tabuk',
    titleUrdu: 'غزوہ حنین، محاصرہ طائف اور غزوہ تبوک',
    summaryEn: [
      'Weeks after Makkah’s conquest, Hawazin and Thaqif ambushed the 12,000-strong Muslim army in the narrow Hunayn valley. When surprise scattered the vanguard, the Prophet ﷺ stood firm calling out: "I am the Prophet, no lie! I am the son of Abdul-Muttalib!" Companions rallied swiftly and Allah sent tranquility and decisive victory (9:25–26), followed by merciful release of Hawazin captives.',
      'In Rajab 9 AH, amid scorching summer heat and ripening harvests, 30,000 companions marched 700 km north to Tabuk in Jaysh al-‘Usrah (Expedition of Hardship). Uthman (RA) outfitted a third of the army, Abu Bakr (RA) gave everything, while Ka‘b ibn Malik (RA) and his two companions taught an unforgettable lesson in pure truthfulness (9:118).',
    ],
    summaryUr: [
      'فتحِ مکہ کے فوراً بعد وادی حنین میں ہوازن و ثقیف نے 12 ہزار کے لشکر پر اچانک حملہ کر دیا۔ شروع میں ابتری پھیلی مگر آپ ﷺ پہاڑ کی طرح ڈٹے رہے، صحابہؓ پلٹ آئے اور اللہ نے عظیم فتح عطا فرمائی۔',
      'رجب 9 ہجری میں سخت گرمی اور قحط کے باوجود تیس ہزار صحابہؓ تبوک کے طویل سفر پر روانہ ہوئے (جیش العسرہ)۔ اس موقع پر حضرت عثمانؓ و ابوبکرؓ نے بے مثال انفاق کیا اور حضرت کعب بن مالکؓ کے واقعے نے سچائی کا لازوال سبق دیا۔',
    ],
    takeawaysEn: [
      'Hunayn proved victory comes solely from Allah—never from boasting over numbers.',
      'Tabuk established sacrifice in hardship and absolute honesty in repentance.',
    ],
    takeawaysUr: [
      'غزوہ حنین نے یاد دلایا کہ فتح کثرتِ تعداد سے نہیں بلکہ صرف اللہ کی نصرت سے ملتی ہے۔',
      'غزوہ تبوک تنگی میں ایثار اور سچی توبہ کا عظیم سبق ہے۔',
    ],
  },

  // CHAPTER 11: YEAR OF DELEGATIONS & FAREWELL SERMON
  {
    id: 'ch11-year-of-delegations',
    era: 'Year of Delegations & Farewell Sermon',
    yearLabel: '9–10 AH · 631 CE',
    title: 'The Year of Delegations (‘Am al-Wufud) Across Arabia',
    titleUrdu: 'عام الوفود: قبائلِ عرب کا جوق در جوق قبولِ اسلام',
    summaryEn: [
      'Following the Conquest of Makkah and Tabuk, over seventy tribal delegations journeyed from Yemen, Najd, Oman, Bahrain, Yamamah, and Ta’if to Madinah to accept Islam willingly—fulfilling Surah an-Nasr: "And you see the people entering into the religion of Allah in multitudes."',
      'Thaqif of Ta’if—who had stoned him a decade earlier—came seeking peace and embraced Tawhid. The Prophet ﷺ sent wise teachers like Mu‘adh ibn Jabal and Abu Musa al-Ash‘ari (RA) to Yemen, advising them: "Make things easy and do not make them difficult; give glad tidings and do not repel people." Meanwhile in 9 AH, Abu Bakr (RA) led the Hajj while Ali (RA) proclaimed the end of idolatry inside the Sanctuary.',
    ],
    summaryUr: [
      'فتحِ مکہ اور غزوہ تبوک کے بعد 9 اور 10 ہجری میں یمن، نجد، عمان، بحرین، طائف اور جزیرۃ العرب کے ستر سے زائد وفود مدینہ آ کر جوق در جوق اسلام میں داخل ہوئے۔',
      'طائف کا وہی قبیلہ ثقیف جس نے کبھی آپ ﷺ پر پتھر برسائے تھے، خود حاضر ہو کر مسلمان ہوا۔ آپ ﷺ نے حضرت معاذ بن جبلؓ اور ابو موسیٰ اشعریؓ کو یمن روانہ فرماتے ہوئے نصیحت کی: "آسانی پیدا کرنا، تنگی نہ ڈالنا؛ خوشخبری دینا، نفرت نہ دلانا۔"',
    ],
    takeawaysEn: [
      'Hearts opened to Islam through security, patience, and prophetic compassion.',
      'Teaching religion with ease and glad tidings was the Prophet’s explicit directive to envoys.',
    ],
    takeawaysUr: [
      'صلح، صبر اور رحمتِ نبوی ﷺ سے پورا جزیرۃ العرب حلقہ بگوشِ اسلام ہو گیا۔',
      'دین کی تعلیم میں آسانی اور خوشخبری سنانا نبوی منہج ہے۔',
    ],
  },
  {
    id: 'ch11-farewell-pilgrimage-sermon',
    era: 'Year of Delegations & Farewell Sermon',
    yearLabel: '9 Dhul-Hijjah 10 AH · March 632 CE',
    title: 'The Farewell Pilgrimage & Complete Farewell Sermon at ‘Arafat',
    titleUrdu: 'حجۃ الوداع اور میدانِ عرفات کا تاریخی عالمگیر خطبہ',
    summaryEn: [
      'In Dhul-Hijjah 10 AH, the Prophet ﷺ performed his single, final Hajj with over 100,000 companions. Standing on Mount ‘Arafat on 9 Dhul-Hijjah, he delivered humanity’s timeless Charter—declaring the absolute sanctity of every person’s blood, property, and honor; abolishing all usury (Riba) beginning with his uncle Abbas’s claims; and ending all pre-Islamic blood feuds.',
      'He solemnly charged men to fear Allah regarding women’s rights and kindness in marriage; proclaimed universal human equality ("An Arab has no superiority over a non-Arab, nor a white over a black, except by piety and righteous action"); commanded returning all trusts faithfully; and left two unshakeable anchors: the Book of Allah and his Sunnah. Asking the multitude whether he had conveyed the message, over a hundred thousand voices thundered "Yes!" as he raised his finger skyward saying "O Allah, bear witness!" That very day, Surah al-Ma’idah 5:3 descended: "This day I have perfected for you your religion."',
    ],
    summaryUr: [
      'ذوالحجہ 10 ہجری میں آپ ﷺ نے ایک لاکھ سے زائد صحابہؓ کے ہمراہ حجۃ الوداع ادا فرمایا۔ 9 ذوالحجہ کو میدانِ عرفات میں تاریخی خطبہ ارشاد فرمایا جس میں ہر انسان کے خون، مال اور عزت کو حرمت والا قرار دیا، جاہلیت کے تمام سود اور خونی انتقام ختم فرمائے۔',
      'آپ ﷺ نے خواتین کے حقوق کے بارے میں اللہ سے ڈرنے کی وصیت فرمائی، نسلی و قومی امتیاز مٹا کر اعلان فرمایا کہ "کسی عربی کو عجمی پر اور کسی گورے کو کالے پر تقویٰ کے سوا کوئی فضیلت نہیں"، امانتیں ادا کرنے اور قرآن و سنت کو مضبوطی سے تھامنے کی ہدایت فرمائی۔ لاکھوں صحابہؓ سے گواہی لے کر آسمان کی طرف انگلی اٹھا کر فرمایا: "اے اللہ تو گواہ رہ!" اسی دن آیتِ تکمیلِ دین (المائدہ 5:3) نازل ہوئی۔',
    ],
    takeawaysEn: [
      'The Farewell Sermon stands as the foundational charter of human dignity, racial equality, and social justice.',
      'Holding fast to the Quran and authentic Sunnah ensures guidance after the Prophet’s passing.',
    ],
    takeawaysUr: [
      'خطبہ حجۃ الوداع انسانی وقار، نسلی مساوات اور سماجی عدل کا ابدی منشور ہے۔',
      'قرآن اور سنتِ رسول ﷺ سے تمسک امت کی ابدی نجات کا راستہ ہے۔',
    ],
  },

  // CHAPTER 12: PASSING & NOBLE CHARACTER (ASH-SHAMA’IL)
  {
    id: 'ch12-final-illness-passing',
    era: 'Passing & Noble Character (Ash-Shama’il)',
    yearLabel: 'Safar – 12 Rabi al-Awwal 11 AH · June 632 CE',
    title: 'Final Counsel, Abu Bakr’s Leadership & Passing of the Prophet ﷺ',
    titleUrdu: 'آخری وصایا، حضرت ابوبکرؓ کی امامت اور وصالِ باکمال',
    summaryEn: [
      'Returning from Hajj, the Prophet ﷺ visited Baqi‘ al-Gharqad and prayed tenderly for the martyrs of Uhud, bidding farewell to the living and the departed. Five days before his passing, despite high fever, he addressed the Masjid warning believers never to turn prophets’ graves into places of worship, instructing them to honor the Ansar, and appointing Abu Bakr as-Siddiq (RA) to lead all congregational prayers.',
      'On Monday, 12 Rabi al-Awwal 11 AH, peeking from Aisha’s curtain at the Fajr rows standing calmly behind Abu Bakr, his face beamed with serene joy. Resting his head in Aisha’s (RA) lap after brushing his teeth with Abdur-Rahman’s soft Miswak, he dipped his hand in cool water wiping his forehead and repeated his parting counsel: "Guard the Prayer, guard the Prayer, and care for those under your authority." Raising his gaze heavenward, he whispered "O Allah, forgive me, have mercy on me, and join me with the Highest Companion (Ar-Rafiq al-A‘la)," passing gently at age sixty-three.',
    ],
    summaryUr: [
      'حج سے واپسی پر آپ ﷺ نے جنت البقیع اور شہدائے احد کے لیے دعا فرمائی۔ وصال سے پانچ روز قبل شدید بخار میں بھی امت کو قبروں کو سجدہ گاہ بنانے سے منع فرمایا، انصار کے ساتھ حسنِ سلوک کی وصیت کی اور حضرت ابوبکر صدیقؓ کو نماز کی امامت پر مقرر فرمایا۔',
      'پیر 12 ربیع الاول 11 ہجری کو فجر کے وقت پردہ اٹھا کر صحابہؓ کو حضرت ابوبکرؓ کے پیچھے نماز پڑھتے دیکھ کر آپ کا چہرہِ مبارک خوشی سے دمک اٹھا۔ دوپہر کے وقت حضرت عائشہؓ کی گود میں سرِ مبارک رکھے، مسواک فرمانے کے بعد آپ نے آخری وصیت فرمائی: "نماز اور ماتحتوں کا خیال رکھنا"، اور "اللهم بالرفيق الأعلى" فرماتے ہوئے 63 برس کی عمر میں اس دنیا سے رخصت ہو گئے۔',
    ],
    takeawaysEn: [
      'Even at his final breath, his heart beat with concern for the Ummah’s Salah and care for the vulnerable.',
      'Abu Bakr as-Siddiq’s calm reminder ("Whoever worshipped Muhammad, he has died; whoever worships Allah, He is Ever-Living") steadied Madinah in grief.',
    ],
    takeawaysUr: [
      'آخری سانس تک آپ ﷺ کی فکر نماز کی حفاظت اور کمزوروں کے حقوق کے گرد گھومتی رہی۔',
      'وصال کے صدمے میں حضرت ابوبکر صدیقؓ کے تاریخی خطبے نے امت کو سنبھالا۔',
    ],
  },
  {
    id: 'ch12-noble-shamail',
    era: 'Passing & Noble Character (Ash-Shama’il)',
    yearLabel: 'Timeless Prophetic Portrait',
    title: 'Ash-Shama’il al-Muhammadiyyah: His Blessed Appearance & Character',
    titleUrdu: 'شمائلِ نبوی ﷺ: جمالِ مبارک اور اخلاقِ عالیہ',
    summaryEn: [
      'As preserved in the closing chapters of Ar-Raheeq Al-Makhtum and Imam at-Tirmidhi’s Ash-Shama’il, the Messenger of Allah ﷺ was of balanced, dignified stature—neither overly tall nor short—broad-shouldered, with radiant complexion luminous like the full moon on a clear night, large dark eyes fringed with natural kohl-like lashes, wavy black hair reaching his earlobes, and a thick, well-proportioned beard.',
      'His inward beauty surpassed every description: Aisha (RA) summed it up simply, "His character was the Quran." Most generous of all humanity—especially in Ramadan like a swift wind of charity—he smiled warmly more than anyone, spoke measured clear words so listeners could count them, never struck a servant or woman, never sought personal revenge unless Allah’s sacred bounds were violated, mended his own sandals, and walked patiently with widows and children until their needs were fulfilled—a true Mercy to all creation (21:107).',
    ],
    summaryUr: [
      'الرحیق المختوم کے اختتامی ابواب اور شمائلِ ترمذی کے مطابق نبی کریم ﷺ حسن و جمال کا پیکر تھے: میانہ و متوازن قد، چوڑا سینہ، چودھویں کے چاند جیسا روشن چہرہ، سرمگیں بڑی آنکھیں اور کانوں کی لو تک لہراتے گیسو۔',
      'حضرت عائشہؓ نے فرمایا کہ "آپ کا اخلاق مکمل قرآن تھا۔" آپ لوگوں میں سب سے زیادہ سخی، نرم خو اور مسکرانے والے تھے، بات نہایت واضح اور ٹھہر ٹھہر کر فرماتے، کبھی ذاتی انتقام نہ لیتے، اپنے جوتے خود گانٹھ لیتے، اور بیواؤں، یتیموں اور مسکینوں کے کام پیدل چل کر پورے فرماتے—واقعی آپ تمام جہانوں کے لیے سراپا رحمت تھے۔',
    ],
    takeawaysEn: [
      'Studying Ash-Shama’il kindles sincere love and reverence for the Messenger ﷺ.',
      'True obedience means embodying his gentleness, truthfulness, generosity, and humility daily.',
    ],
    takeawaysUr: [
      'شمائلِ نبوی ﷺ کا مطالعہ دل میں محبتِ رسول ﷺ کی شمع روشن کرتا ہے۔',
      'سچی اتباع یہی ہے کہ ہم اپنی روزمرہ زندگی میں آپ کی نرمی، سچائی، سخاوت اور عاجزی اپنائیں۔',
    ],
  },
];
