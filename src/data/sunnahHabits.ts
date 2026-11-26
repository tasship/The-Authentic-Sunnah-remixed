import { SunnahHabitItem, SunnahHabitTime } from '../types';

export const SUNNAH_HABIT_TIMES: SunnahHabitTime[] = [
  'Morning Sunnahs',
  'Prayer & Masjid',
  'Meals & Hydration',
  'Character & Social',
  'Evening & Sleep',
];

export const SUNNAH_HABITS: SunnahHabitItem[] = [
  // Morning Sunnahs (4)
  {
    id: 'sh-wake-wudu-miswak',
    timeOfDay: 'Morning Sunnahs',
    titleEn: 'Use Miswak (or Toothbrush) Upon Waking & Before Wudu',
    titleUr: 'بیدار ہونے پر اور وضو سے پہلے مسواک کرنا',
    descriptionEn:
      'The Messenger of Allah (ﷺ) purified his mouth with the Miswak upon rising from sleep and before every prayer.',
    descriptionUr:
      'رسول اللہ (ﷺ) نیند سے بیدار ہونے کے بعد اور ہر نماز کے لیے وضو سے پہلے مسواک فرمایا کرتے تھے۔',
    reference: 'Sahih al-Bukhari 245 & Sahih Muslim 255',
  },
  {
    id: 'sh-morning-adhkar',
    timeOfDay: 'Morning Sunnahs',
    titleEn: 'Recite Morning Adhkar After Fajr Until Sunrise',
    titleUr: 'فجر کے بعد صبح کے مسنون اذکار پڑھنا',
    descriptionEn:
      'Recite Ayat al-Kursi, the Three Quls (3x each), Sayyid al-Istighfar, and morning protections for spiritual serenity.',
    descriptionUr:
      'فجر کے بعد آیۃ الکرسی، تینوں قل (تین تین بار)، سید الاستغفار اور صبح کی حفاظت کی دعائیں پڑھنا۔',
    reference: 'Sunan Abi Dawud 5068 & 5082',
  },
  {
    id: 'sh-salat-al-duha',
    timeOfDay: 'Morning Sunnahs',
    titleEn: 'Pray 2 to 8 Rak‘ahs of Salat al-Duha (Forenoon Prayer)',
    titleUr: 'نمازِ چاشت (ضحیٰ) کی دو یا زائد رکعتیں ادا کرنا',
    descriptionEn:
      'Two rak‘ahs of Duha fulfill the daily charity due upon every one of your 360 bodily joints.',
    descriptionUr:
      'چاشت کی دو رکعتیں جسم کے تمام 360 جوڑوں کے روزانہ صدقے کی ادائیگی کے برابر ہیں۔',
    reference: 'Sahih Muslim 720',
  },
  {
    id: 'sh-smile-salam',
    timeOfDay: 'Morning Sunnahs',
    titleEn: 'Greet Family & Neighbors with Salam & a Warm Smile',
    titleUr: 'گھر والوں اور مسلمانوں کو سلام اور مسکراہٹ سے ملنا',
    descriptionEn:
      'Spreading peace ("As-Salamu Alaykum") and smiling in your brother’s face is counted as pure charity.',
    descriptionUr:
      'سلام عام کرنا اور اپنے بھائی کے سامنے مسکرا کر ملنا بھی صدقہ شمار ہوتا ہے۔',
    reference: 'Sahih Muslim 54 & Jami‘ at-Tirmidhi 1956',
  },

  // Prayer & Masjid (5)
  {
    id: 'sh-answer-adhan',
    timeOfDay: 'Prayer & Masjid',
    titleEn: 'Repeat the Adhan & Recite the Dua After It',
    titleUr: 'اذان کا جواب دینا اور اس کے بعد مسنون دعا پڑھنا',
    descriptionEn:
      'Pause briefly when hearing the Adhan, repeat the words of the Mu’adhdhin, send Salawat on the Prophet (ﷺ), and recite Allahumma Rabba hadhihi al-da‘wati al-tammah.',
    descriptionUr:
      'اذان سن کر مؤذن کے کلمات دہرانا، درود شریف پڑھنا اور اذان کے بعد کی دعا پڑھنا شفاعتِ نبوی کا ذریعہ ہے۔',
    reference: 'Sahih Muslim 384 & Sahih al-Bukhari 614',
  },
  {
    id: 'sh-sunnah-muakkadah',
    timeOfDay: 'Prayer & Masjid',
    titleEn: 'Guard the 12 Daily Sunnah Rawatib Prayers',
    titleUr: 'بارہ رکعت سننِ مؤکدہ (رواتب) کی پابندی کرنا',
    descriptionEn:
      '2 before Fajr, 4 before and 2 after Dhuhr, 2 after Maghrib, and 2 after Isha earn a house built in Paradise.',
    descriptionUr:
      'فجر سے پہلے دو، ظہر سے پہلے چار اور بعد میں دو، مغرب کے بعد دو اور عشاء کے بعد دو رکعت پڑھنے والے کے لیے جنت میں گھر بنایا جاتا ہے۔',
    reference: 'Sahih Muslim 728 & Jami‘ at-Tirmidhi 415',
  },
  {
    id: 'sh-tasbih-fatimah',
    timeOfDay: 'Prayer & Masjid',
    titleEn: 'Recite Post-Salah Tasbih (33x, 33x, 34x) & Ayat al-Kursi',
    titleUr: 'ہر فرض نماز کے بعد تسبیح فاطمی اور آیۃ الکرسی پڑھنا',
    descriptionEn:
      'SubhanAllah (33), Alhamdulillah (33), Allahu Akbar (33), followed by the Tahlil — plus Ayat al-Kursi after every obligatory Salah.',
    descriptionUr:
      'ہر فرض نماز کے بعد 33 بار سبحان اللہ، 33 بار الحمد للہ، 33 بار اللہ اکبر اور ایک بار لا الہ الا اللہ، نیز آیۃ الکرسی پڑھنا۔',
    reference: 'Sahih Muslim 597 & Sunan an-Nasa’i al-Kubra 9928',
  },
  {
    id: 'sh-tahiyyatul-wudu',
    timeOfDay: 'Prayer & Masjid',
    titleEn: 'Enter the Masjid with the Right Foot & Pray 2 Rak‘ahs',
    titleUr: 'مسجد میں دائیں پاؤں سے داخل ہونا اور تحیۃ المسجد پڑھنا',
    descriptionEn:
      'Step in calmly with the right foot saying the Masjid dua, and pray two rak‘ahs of Tahiyyat al-Masjid before sitting.',
    descriptionUr:
      'مسجد میں دعا پڑھتے ہوئے دایاں پاؤں پہلے رکھیں اور بیٹھنے سے پہلے دو رکعت تحیۃ المسجد ادا کریں۔',
    reference: 'Sahih al-Bukhari 444 & Sahih Muslim 714',
  },
  {
    id: 'sh-daily-quran-hizb',
    timeOfDay: 'Prayer & Masjid',
    titleEn: 'Maintain a Consistent Daily Quran Portion (Wird)',
    titleUr: 'روزانہ قرآنِ مجید کی تلاوت کا معمول برقرار رکھنا',
    descriptionEn:
      'The most beloved deeds to Allah are those done consistently, even if small. Read with reflection and earn 10 Hasanat per letter.',
    descriptionUr:
      'اللہ کے نزدیک سب سے محبوب عمل وہ ہے جو ہمیشہ کیا جائے خواہ تھوڑا ہی ہو۔ روزانہ تلاوت سے ہر حرف پر دس نیکیاں ملتی ہیں۔',
    reference: 'Sahih al-Bukhari 6464 & Jami‘ at-Tirmidhi 2910',
  },

  // Meals & Hydration (4)
  {
    id: 'sh-meal-bismillah-right',
    timeOfDay: 'Meals & Hydration',
    titleEn: 'Say Bismillah & Eat with the Right Hand from Your Side',
    titleUr: 'بسم اللہ پڑھ کر دائیں ہاتھ سے اور اپنے سامنے سے کھانا',
    descriptionEn:
      'Mention the name of Allah before eating, use the right hand, eat from the nearest edge, and never criticize food.',
    descriptionUr:
      'کھانے سے پہلے بسم اللہ پڑھنا، دائیں ہاتھ سے کھانا، اپنے سامنے سے لینا اور کبھی کھانے میں عیب نہ نکالنا۔',
    reference: 'Sahih al-Bukhari 5376 & 5409',
  },
  {
    id: 'sh-drink-seated-three',
    timeOfDay: 'Meals & Hydration',
    titleEn: 'Sit While Drinking Water in Three Separate Sips',
    titleUr: 'بیٹھ کر تین سانسوں میں پانی پینا',
    descriptionEn:
      'Drink calmly while seated, taking three breaths outside the cup and praising Allah upon finishing.',
    descriptionUr:
      'بیٹھ کر پینا، برتن سے منہ ہٹا کر تین سانسوں میں پینا اور فارغ ہو کر الحمد للہ کہنا۔',
    reference: 'Sahih Muslim 2024 & 2028',
  },
  {
    id: 'sh-eat-one-third',
    timeOfDay: 'Meals & Hydration',
    titleEn: 'Practice Moderation: 1/3 Food, 1/3 Water, 1/3 Breath',
    titleUr: 'اعتدال: تہائی کھانا، تہائی پانی اور تہائی سانس کے لیے رکھنا',
    descriptionEn:
      'Leave room in the stomach for nourishment, hydration, and light breathing rather than overeating.',
    descriptionUr:
      'پیٹ بھر کر زیادہ کھانے کے بجائے ایک تہائی غذا، ایک تہائی پانی اور ایک تہائی سانس کے لیے خالی چھوڑنا۔',
    reference: 'Jami‘ at-Tirmidhi 2380',
  },
  {
    id: 'sh-alhamdulillah-after-meal',
    timeOfDay: 'Meals & Hydration',
    titleEn: 'Recite the Sunnah Praise After Finishing a Meal',
    titleUr: 'کھانے کے بعد مسنون شکر اور دعا پڑھنا',
    descriptionEn:
      'Thank Allah after every meal — Allah is pleased with a servant who eats a morsel or takes a drink and praises Him for it.',
    descriptionUr:
      'کھانے کے بعد اللہ کا شکر ادا کرنا؛ اللہ اس بندے سے راضی ہوتا ہے جو ایک لقمہ کھائے یا گھونٹ پیے اور اس پر اللہ کی حمد کرے۔',
    reference: 'Sahih Muslim 2734 & Jami‘ at-Tirmidhi 3458',
  },

  // Character & Social (5)
  {
    id: 'sh-guard-tongue-silence',
    timeOfDay: 'Character & Social',
    titleEn: 'Speak Good Words or Remain Silent (Zero Backbiting)',
    titleUr: 'بھلائی کی بات کہنا یا خاموش رہنا (غیبت سے پرہیز)',
    descriptionEn:
      'Whoever believes in Allah and the Last Day should speak what is good and truthful or hold their tongue from harm.',
    descriptionUr:
      'جو اللہ اور آخرت کے دن پر ایمان رکھتا ہے وہ اچھی بات کہے یا خاموش رہے اور غیبت و دل آزاری سے بچے۔',
    reference: 'Sahih al-Bukhari 6018',
  },
  {
    id: 'sh-right-shoe-first',
    timeOfDay: 'Character & Social',
    titleEn: 'Begin with the Right for Shoes, Dressing & Noble Tasks',
    titleUr: 'جوتا پہننے، لباس اور اچھے کاموں کی ابتدا دائیں جانب سے کرنا',
    descriptionEn:
      'The Prophet (ﷺ) loved beginning from the right side in wearing sandals, combing hair, purifying himself, and all honorable acts.',
    descriptionUr:
      'نبی کریم (ﷺ) جوتا پہننے، کنگھی کرنے، وضو کرنے اور ہر اچھے کام میں دائیں طرف سے ابتدا کرنے کو پسند فرماتے تھے۔',
    reference: 'Sahih al-Bukhari 168 & 5856',
  },
  {
    id: 'sh-check-parents-kin',
    timeOfDay: 'Character & Social',
    titleEn: 'Serve Parents with Kindness & Uphold Family Ties',
    titleUr: 'والدین کی خدمت، حسنِ سلوک اور صلہ رحمی کرنا',
    descriptionEn:
      'Call, visit, assist, or make heartfelt dua for your parents and relatives daily — Silat ar-Rahim brings barakah in provision and lifespan.',
    descriptionUr:
      'والدین اور رشتہ داروں کے ساتھ حسنِ سلوک، ان کی خبرگیری اور ان کے لیے دعا رزق اور عمر میں برکت کا باعث ہے۔',
    reference: 'Sahih al-Bukhari 5986',
  },
  {
    id: 'sh-daily-istighfar-salawat',
    timeOfDay: 'Character & Social',
    titleEn: 'Say Astaghfirullah (70–100x) & Send Salawat Upon the Prophet (ﷺ)',
    titleUr: 'روزانہ کثرت سے استغفار اور نبی کریم (ﷺ) پر درود بھیجنا',
    descriptionEn:
      'Send frequent peace and blessings upon the Prophet (ﷺ) and seek Allah’s forgiveness over seventy times daily.',
    descriptionUr:
      'نبی اکرم (ﷺ) روزانہ ستر سے سو بار استغفار فرمایا کرتے تھے، اور ایک بار درود پڑھنے پر اللہ دس رحمتیں نازل فرماتا ہے۔',
    reference: 'Sahih al-Bukhari 6307 & Sahih Muslim 408',
  },
  {
    id: 'sh-help-remove-harm',
    timeOfDay: 'Character & Social',
    titleEn: 'Give Daily Sadaqah or Remove Any Harm from Someone’s Path',
    titleUr: 'روزانہ صدقہ کرنا یا راستے سے تکلیف دہ چیز ہٹا دینا',
    descriptionEn:
      'Even a kind word, helping someone carry a load, or clearing an obstacle from a walkway earns true charity.',
    descriptionUr:
      'نرم اور اچھی بات کہنا، کسی کی مدد کرنا یا راستے سے تکلیف دہ چیز ہٹا دینا بھی بہترین صدقہ ہے۔',
    reference: 'Sahih al-Bukhari 2989 & Sahih Muslim 1009',
  },

  // Evening & Sleep (5)
  {
    id: 'sh-evening-adhkar',
    timeOfDay: 'Evening & Sleep',
    titleEn: 'Recite Evening Adhkar After Asr / Before Maghrib',
    titleUr: 'عصر کے بعد شام کے مسنون اذکار کی پابندی کرنا',
    descriptionEn:
      'Recite the evening protections, Three Quls (3x), HasbiyAllahu, and Durood Shareef to enter the night under Allah’s care.',
    descriptionUr:
      'عصر کے بعد شام کی حفاظت کی دعائیں، تینوں قل، حسبی اللہ اور درود شریف پڑھ کر رات اللہ کی حفاظت میں گزارنا۔',
    reference: 'Sunan Abi Dawud 5068 & 5082',
  },
  {
    id: 'sh-wudu-before-sleep',
    timeOfDay: 'Evening & Sleep',
    titleEn: 'Make Fresh Wudu & Dust the Bed Before Sleeping',
    titleUr: 'سونے سے پہلے تازہ وضو کرنا اور بستر جھاڑنا',
    descriptionEn:
      'Perform ablution as for prayer, lightly dust off your bedding three times with Bismillah, and lie down on your right side.',
    descriptionUr:
      'سونے سے پہلے نماز جیسا وضو کرنا، بستر کو بسم اللہ کہہ کر تین بار جھاڑنا اور دائیں کروٹ لیٹنا۔',
    reference: 'Sahih al-Bukhari 247 & 6320',
  },
  {
    id: 'sh-sleep-surahs-kursi',
    timeOfDay: 'Evening & Sleep',
    titleEn: 'Recite Ayat al-Kursi, Last 2 Ayahs of Al-Baqarah & Blow Three Quls',
    titleUr: 'سونے سے پہلے آیۃ الکرسی، سورہ بقرہ کی آخری دو آیات اور تینوں قل دم کرنا',
    descriptionEn:
      'Recite Ayat al-Kursi for an angel guardian all night, Al-Baqarah 2:285–286 for complete sufficiency, and blow into cupped hands with Surahs 112–114 three times.',
    descriptionUr:
      'آیۃ الکرسی رات بھر فرشتے کی حفاظت کا سبب، سورہ بقرہ کی آخری دو آیات کفایت کا ذریعہ، اور تینوں قل پڑھ کر ہاتھوں پر دم کر کے جسم پر پھیرنا مسنون ہے۔',
    reference: 'Sahih al-Bukhari 2311, 5009 & 5017',
  },
  {
    id: 'sh-forgive-before-sleep',
    timeOfDay: 'Evening & Sleep',
    titleEn: 'Cleanse Your Heart & Forgive Everyone Before Closing Your Eyes',
    titleUr: 'سونے سے پہلے دل صاف کرنا اور سب کو معاف کر دینا',
    descriptionEn:
      'Let go of grudges and sleep with a pure, forgiving heart toward every fellow Muslim — a hallmark of the People of Paradise.',
    descriptionUr:
      'سونے سے پہلے دل سے کینہ و بغض نکال کر سب کو معاف کر دینا اہلِ جنت کا خاص وصف ہے۔',
    reference: 'Musnad Ahmad 12697 & Sahih Muslim 2588',
  },
  {
    id: 'sh-witr-before-sleep',
    timeOfDay: 'Evening & Sleep',
    titleEn: 'Pray Witr (and Optional Qiyam) Before Sleeping or Before Fajr',
    titleUr: 'وتر کی نماز پڑھ کر سونا یا تہجد کے وقت ادا کرنا',
    descriptionEn:
      'Never leave out Witr; pray it before sleeping if unsure of waking for Tahajjud, or delay it to the blessed final third of the night.',
    descriptionUr:
      'وتر کی نماز کو کبھی نہ چھوڑیں؛ تہجد میں اٹھنے کا یقین ہو تو رات کے آخری حصے میں، ورنہ سونے سے پہلے ادا کر لیں۔',
    reference: 'Sahih Muslim 755 & 756',
  },
];
