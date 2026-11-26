import { QuizQuestion } from '../types';

export interface SunnahAIStarterItem {
  id: string;
  label: string;
  question: string;
  answer: string;
}

export interface PropheticMedicineItem {
  id: string;
  nameEn: string;
  nameUr: string;
  arabicName: string;
  benefitEn: string;
  benefitUr: string;
  reference: string;
}

export const SUNNAH_AI_STARTER_TOPICS: SunnahAIStarterItem[] = [
  {
    id: 'starter-tawheed',
    label: 'What is Tawheed?',
    question: 'What is Tawheed and what are its categories in Islam?',
    answer: `### 1. Direct Answer Based on Quran & Authentic Sunnah
Tawheed (التوحيد) is affirming the absolute Oneness of Allah in His Lordship, His exclusive right to worship, and His Noble Names and Attributes. Allah commands throughout the Quran: *"And your god is one God. There is no deity worthy of worship except Him, the Entirely Merciful, the Especially Merciful"* (Al-Baqarah 2:163), and Surah Al-Ikhlas (112:1–4) defines His pure uniqueness. In Sahih al-Bukhari (Kitab at-Tawhid) and Sahih Muslim, when the Prophet ﷺ sent Mu‘adh ibn Jabal (RA) to Yemen, he instructed him: *"Let the first thing you call them to be the testimony that none has the right to be worshipped except Allah."*

### 2. Understanding of the Salaf as-Salih
The Companions, Tabi‘un, and early scholars summarized Tawheed directly from Quranic usage into three complementary aspects:
- **Tawheed ar-Rububiyyah (Lordship):** Allah alone creates, sustains, gives life and death, and governs the universe.
- **Tawheed al-Uluhiyyah (Worship):** All Salah, du‘a, vows, sacrifice, ultimate fear, and reliance belong strictly to Allah alone without saints or intermediaries.
- **Tawheed al-Asma was-Sifat (Names & Attributes):** Affirming Allah’s revealed Names and Attributes without distorting their meaning, denying them, or likening Him to creation (Ash-Shura 42:11).

### 3. Views of the Four Imams
All Four Imams—Abu Hanifah (in *Al-Fiqh al-Akbar*), Malik, ash-Shafi‘i, and Ahmad ibn Hanbal (in *Usul as-Sunnah*)—held complete consensus (*Ijma‘*) on the absolute oneness of Allah in Lordship, Worship, and Names & Attributes, warning sternly against directing any act of worship or invocation to other than Allah.

### 4. Adab & Disclaimer
Understanding and living Tawheed brings deep peace and freedom from fear of creation. **Wallahu A'lam (And Allah knows best).** For deeper personal study or specific theological questions, please consult a qualified local scholar.`,
  },
  {
    id: 'starter-prayer',
    label: 'How to pray according to Sunnah?',
    question: 'How should a Muslim perform Salah according to the authentic Sunnah?',
    answer: `### 1. Direct Answer Based on Quran & Authentic Sunnah
Allah commands establishing Salah with serenity and devotion (Al-Baqarah 2:238; Al-Mu’minun 23:1–2), and the Prophet Muhammad ﷺ instructed: *"Pray as you have seen me praying"* (Sahih al-Bukhari, Kitab al-Adhan). Key authenticated steps from *Sahih al-Bukhari*, *Sahih Muslim*, and the Sunan include: performing complete Wudu, facing the Qiblah with sincere intention in the heart, raising the hands for Takbirat al-Ihram saying *"Allahu Akbar"*, reciting opening du‘a, reciting Surah al-Fatihah with calm pauses (mandatory in every rak‘ah), bowing in Ruku‘ with a straight back and tranquility (*Tuma’ninah*), standing upright calmly after Ruku‘, prostrating cleanly on the seven bones in Sujud where a servant is closest to Allah, sitting with peace between prostrations, and concluding with Tashahhud, Salawat upon the Prophet ﷺ, and Taslim to the right and left.

### 2. Understanding of the Salaf as-Salih
The Companions closely observed and narrated every posture of the Prophet’s Salah—from stillness (*Khushu‘*) to weeping in Qiyam and never rushing prayers like a pecking bird. Imam Ibn al-Qayyim and Ibn Kathir emphasized that tranquility in every pillar is the soul of Salah.

### 3. Views of the Four Imams
All Four Imams (Hanafi, Maliki, Shafi‘i, Hanbali) share complete consensus (*Ijma‘*) on the foundational pillars of Salah (Takbir al-Ihram, standing when able, Ruku‘, Sujud, final sitting, and tranquility). They hold respectful, evidence-based differences in secondary Sunnah details such as where hands are placed on the chest/navel, saying *"Ameen"* aloud or softly, or raising hands (*Raf‘ al-Yadayn*) before/after Ruku‘. Every authentic Sunnah variation practiced by the Companions remains worthy of respect without division.

### 4. Adab & Disclaimer
Prioritize sincerity, unhurried calm, and focus upon meeting Allah in every prayer. **Wallahu A'lam (And Allah knows best).** For detailed rulings on missed prayers or travel concessions, please consult a qualified local scholar.`,
  },
  {
    id: 'starter-salaf',
    label: 'Who are the Salaf?',
    question: 'Who are the Salaf as-Salih and why do Muslims follow their understanding?',
    answer: `### 1. Direct Answer Based on Quran & Authentic Sunnah
*As-Salaf as-Salih* (the Pious Predecessors) refers to the first three exemplary generations praised by the Prophet Muhammad ﷺ: *"The best of people are my generation, then those who come after them, then those who come after them"* (Sahih al-Bukhari, Kitab ash-Shahadat; Sahih Muslim, Kitab Fada’il as-Sahabah). Allah Himself praised the early Muhajirun, Ansar, and those who follow them with excellence in At-Tawbah (9:100), and made the faith of the Companions the standard of guidance in Al-Baqarah (2:137) and An-Nisa (4:115).

### 2. Understanding of the Salaf as-Salih
Following the Salaf means interpreting the Quran and Sunnah through the lens of the Companions who witnessed revelation firsthand, the Tabi‘un who inherited their teachings, and the upright Imams of the third generation—anchoring Islam against later sectarian alterations or arbitrary personal opinions.

### 3. Views of the Four Imams
All Four Great Imams belonged to or directly succeeded the Salaf generations and explicitly called people back to the Quran, authentic Sunnah, and the consensus of the Companions. Imam Malik famously wrote: *"The latter part of this Ummah will never be rectified except by that which rectified its beginning."* Imam Ahmad likewise anchored his *Usul as-Sunnah* to holding fast to what the Companions were upon.

### 4. Adab & Disclaimer
True adherence to the Salaf shines through humility, authentic knowledge, reverence for scholars, and gentleness in calling others to truth. **Wallahu A'lam (And Allah knows best).** Consult a trustworthy scholar when studying advanced classical texts.`,
  },
  {
    id: 'starter-four-imams',
    label: 'Difference between the 4 Imams',
    question: 'What are the differences between the Four Imams (Hanafi, Maliki, Shafi‘i, Hanbali)?',
    answer: `### 1. Direct Answer Based on Quran & Authentic Sunnah
Allah warns against splitting the core religion (Ali ‘Imran 3:103), while the Sunnah affirms that a qualified scholar (*Mujtahid*) who strives sincerely using sound evidence earns two rewards when right and one reward when mistaken (Sahih al-Bukhari, Kitab al-I‘tisam; Sahih Muslim). All Four Imams—Abu Hanifah, Malik, ash-Shafi‘i, and Ahmad ibn Hanbal—stood firmly united upon the exact same Quran, Sunnah, and orthodox Sunni Aqeedah.

### 2. Understanding of the Salaf as-Salih
Among the Companions themselves (such as Ibn Mas‘ud, Ibn ‘Umar, ‘A’ishah, and Ibn ‘Abbas RA), minor secondary Fiqh differences naturally arose based on which Hadith reached a scholar or how a phrase was weighed—yet they always prayed behind one another with love and brotherhood. The Four Imams preserved this principled scholarship, each independently declaring that whenever an authentic Sahih Hadith is established, it overrides any human opinion.

### 3. Views of the Four Imams
- **Imam Abu Hanifah (Kufah):** Emphasized systematic principles, analogical reasoning (*Qiyas*) grounded in revelation, and *Istihsan* for practical life issues.
- **Imam Malik (Madinah):** Weighted Quran and Hadith alongside the continuous living practice of Madinah (*‘Amal Ahl al-Madinah*) and *Maslahah*.
- **Imam ash-Shafi‘i (Makkah/Egypt):** Codified *Usul al-Fiqh* (*Ar-Risalah*), placing every authentic Hadith above local custom or unverified opinion.
- **Imam Ahmad (Baghdad):** Relied maximally on explicit Hadith texts (*Al-Musnad*) and Companion verdicts, minimizing speculative analogy.

Their differences lie strictly in secondary *Furu‘* (jurisprudential details), never in core Creed (*Aqeedah*).

### 4. Adab & Disclaimer
Never turn scholarly Fiqh differences into hostility or sectarianism; love all Four Imams and follow sound Prophetic evidence with humility. **Wallahu A'lam (And Allah knows best).** Consult a qualified scholar for personal legal rulings.`,
  },
  {
    id: 'starter-bidah',
    label: 'Ruling on Bid‘ah',
    question: 'What is the ruling on Bid‘ah (religious innovation) in Islam?',
    answer: `### 1. Direct Answer Based on Quran & Authentic Sunnah
Islam was perfected by Allah during the Prophet’s lifetime: *"This day I have perfected for you your religion and completed My favor upon you"* (Al-Ma’idah 5:3). Because acts of worship (*‘Ibadah*) require clear revelation, the Prophet ﷺ taught explicitly: *"Whoever innovates something in this affair of ours (Islam) that is not part of it will have it rejected"* (Sahih al-Bukhari 2697; Sahih Muslim 1718), and in *Sunan Abi Dawud* & *Jami‘ at-Tirmidhi* warned: *"Beware of newly invented matters (in religion), for every religious innovation is misguidance."*

### 2. Understanding of the Salaf as-Salih
‘Abdullah ibn Mas‘ud (RA) advised: *"Follow and do not innovate, for you have been sufficed."* The Salaf drew a sharp distinction between permissible worldly inventions (medicine, travel, apps, printing mushafs as preservation tools) versus inventing new rituals, special fixed dates, or unprescribed modes of worship claiming extra divine reward without Sunnah proof.

### 3. Views of the Four Imams
All Four Imams stood united in rejecting ungrounded religious innovations (*Bid‘ah* in worship). Imam Malik warned in his famous statement that whoever introduces a religious innovation believing it to be good implies that the Prophet ﷺ fell short in conveying the message—since Allah testified the religion is already complete. Scholars explain that while language usage like ‘Umar’s phrase *"Ni‘mat al-bid‘ah"* regarding congregational Tarawih referred to reviving an existing Prophetic Sunnah, inventing new acts of worship has no sanction.

### 4. Adab & Disclaimer
Reject unauthenticated innovations clearly, yet correct people gently with education, patience, and good character—reviving the rich, joyful authentic Sunnahs in their place. **Wallahu A'lam (And Allah knows best).** Consult a trustworthy scholar if unsure whether a specific practice has authentic basis.`,
  },
  {
    id: 'starter-iman',
    label: 'How to strengthen Iman?',
    question: 'How can a believer strengthen and renew their Iman (faith)?',
    answer: `### 1. Direct Answer Based on Quran & Authentic Sunnah
Allah informs us in Al-Anfal (8:2) that believers’ hearts tremble at His mention and their faith increases whenever His verses are recited. Similarly, the Prophet ﷺ reminded the Ummah in authentic narrations (*Musnad Ahmad* & *Al-Mustadrak*): *"Verily, faith wears out inside the heart of one of you just as a garment wears out, so ask Allah to renew faith in your hearts."* Core Quran-and-Sunnah means to boost Iman include: daily reflective Quran recitation, unhurried five daily prayers with Khushu‘, consistent morning and evening Adhkar, night Istighfar, sincere charity, and righteous company.

### 2. Understanding of the Salaf as-Salih
The Salaf firmly held that **Iman increases with obedience and decreases with sin**. Whenever companions like Mu‘adh ibn Jabal (RA) met brothers in Madinah, they would say: *"Sit with us so we may believe for an hour"*—revisiting Quran, remembering Paradise and Hellfire, and softening hearts through sincere remembrance.

### 3. Views of the Four Imams
All Four Imams affirmed that true Iman encompasses belief in the heart, affirmation on the tongue, and righteous deeds of the limbs—growing stronger through consistent worship, avoiding doubtful temptations, and seeking beneficial sacred knowledge.

### 4. Adab & Disclaimer
Avoid expecting instant perfection; take steady small daily steps (*"The most beloved deeds to Allah are the most consistent, even if small"* — Bukhari & Muslim). **Wallahu A'lam (And Allah knows best).** Seek wholesome local masjid gatherings and trustworthy teachers for ongoing spiritual companionship.`,
  },
];

export const PROPHETIC_MEDICINE_ITEMS: PropheticMedicineItem[] = [
  {
    id: 'tibb-black-seed',
    nameEn: 'Black Seed (Al-Habbah as-Sawda / Kalonji)',
    nameUr: 'کلونجی (الحبۃ السوداء)',
    arabicName: 'الْحَبَّةُ السَّوْدَاءُ',
    benefitEn:
      'The Prophet ﷺ stated: "In the black seed there is healing for every disease except death." Used for immunity, respiratory comfort, and vitality alongside healthy nutrition.',
    benefitUr:
      'نبی کریم ﷺ نے فرمایا: "کلونجی میں موت کے سوا ہر بیماری سے شفا ہے۔" یہ قوتِ مدافعت، سانس اور عمومی صحت کے لیے نہایت مفید ہے۔',
    reference: 'Sahih al-Bukhari 5688 · Sahih Muslim 2215',
  },
  {
    id: 'tibb-honey',
    nameEn: 'Pure Natural Honey (Al-‘Asal)',
    nameUr: 'خالص شہد (العسل)',
    arabicName: 'الْعَسَلُ',
    benefitEn:
      'Described in Surah an-Nahl (16:69) as carrying "healing for people", and prescribed by the Prophet ﷺ for stomach ailments and soothing the chest when taken in moderation with warm water.',
    benefitUr:
      'قرآن (النحل 16:69) میں شہد کو "لوگوں کے لیے شفا" قرار دیا گیا ہے اور نبی کریم ﷺ نے معدے کی خرابی اور عمومی تندرستی کے لیے اسے تجویز فرمایا۔',
    reference: 'An-Nahl 16:69 · Sahih al-Bukhari 5684',
  },
  {
    id: 'tibb-zamzam',
    nameEn: 'Zamzam Water',
    nameUr: 'آبِ زمزم',
    arabicName: 'مَاءُ زَمْزَمَ',
    benefitEn:
      'The blessed spring gushed for Hajar and Isma‘il (AS). The Prophet ﷺ affirmed: "Zamzam water is for whatever intention it is drunk for"—seeking healing, beneficial knowledge, or nourishment with sincere du‘a.',
    benefitUr:
      'رسول اللہ ﷺ نے فرمایا: "آبِ زمزم جس نیت سے پیا جائے اسی کے مطابق فائدہ دیتا ہے۔" شفا، علمِ نافع اور برکت کی دعا کے ساتھ پینا مسنون ہے۔',
    reference: 'Sunan Ibn Majah 3062 · Sahih Muslim 2473',
  },
  {
    id: 'tibb-hijamah',
    nameEn: 'Cupping Therapy (Al-Hijamah)',
    nameUr: 'حجامہ (پچھنے لگوانا)',
    arabicName: 'الْحِجَامَةُ',
    benefitEn:
      'Recommended repeatedly by the Prophet ﷺ as among the finest remedies ("Indeed the best of treatments you use is Hijamah"), promoting circulation and headache/muscular relief when performed cleanly by a skilled practitioner.',
    benefitUr:
      'نبی کریم ﷺ نے فرمایا: "تمہارے بہترین علاجوں میں سے حجامہ لگوانا ہے۔" ماہر معالج کے ذریعے کروانے سے خون کی روانی اور درد میں راحت ملتی ہے۔',
    reference: 'Sahih al-Bukhari 5696 · Sahih Muslim 1577',
  },
  {
    id: 'tibb-olive',
    nameEn: 'Olive Oil (Zayt az-Zaytun)',
    nameUr: 'زیتون کا تیل',
    arabicName: 'زَيْتُ الزَّيْتُونِ',
    benefitEn:
      'Derived from the "blessed tree" mentioned in Surah an-Nur (24:35). The Prophet ﷺ advised: "Eat of its oil and anoint yourselves with it, for indeed it comes from a blessed tree."',
    benefitUr:
      'نبی کریم ﷺ نے فرمایا: "زیتون کا تیل کھاؤ اور اسے بدن پر لگاؤ کیونکہ یہ ایک مبارک درخت سے ہے۔"',
    reference: 'An-Nur 24:35 · Jami‘ at-Tirmidhi 1851 · Sunan Ibn Majah 3319',
  },
  {
    id: 'tibb-talbinah',
    nameEn: 'Talbinah (Warm Barley & Milk Porridge)',
    nameUr: 'تلبینہ (جو کا دلیہ اور دودھ)',
    arabicName: 'التَّلْبِينَةُ',
    benefitEn:
      'Prepared from barley flour, milk, and honey. ‘A’ishah (RA) narrated the Prophet ﷺ said: "Verily, Talbinah soothes the heart of the sick person and takes away some of their sorrow."',
    benefitUr:
      'جو کے آٹے، دودھ اور شہد سے بنایا جاتا ہے۔ نبی کریم ﷺ نے فرمایا: "تلبینہ مریض کے دل کو سکون دیتا ہے اور اس کے غم کو کم کرتا ہے۔"',
    reference: 'Sahih al-Bukhari 5417 · Sahih Muslim 2216',
  },
  {
    id: 'tibb-ajwa',
    nameEn: 'Ajwa Dates of Madinah',
    nameUr: 'عجوہ کھجور (مدینہ منورہ)',
    arabicName: 'تَمْرُ الْعَجْوَةِ',
    benefitEn:
      'Rich in fiber, potassium, and antioxidants. The Prophet ﷺ said: "Whoever eats seven Ajwa dates in the morning will not be harmed by poison or magic on that day."',
    benefitUr:
      'نبی کریم ﷺ نے فرمایا: "جو شخص صبح کے وقت سات عجوہ کھجوریں کھا لے، اس دن اسے کوئی زہر یا جادو نقصان نہیں پہنچا سکے گا۔"',
    reference: 'Sahih al-Bukhari 5445 · Sahih Muslim 2047',
  },
  {
    id: 'tibb-moderation',
    nameEn: 'Moderation in Eating & Drinking',
    nameUr: 'کھانے پینے میں اعتدال (حکمتِ نبوی)',
    arabicName: 'ثُلُثٌ لِطَعَامِهِ وَثُلُثٌ لِشَرَابِهِ',
    benefitEn:
      'The foundation of preventative Prophetic medicine: "The son of Adam fills no vessel worse than his stomach; a few morsels to keep his back upright suffice, or one-third for food, one-third for drink, and one-third for breath."',
    benefitUr:
      'نبی کریم ﷺ نے فرمایا: "انسان نے پیٹ سے برا کوئی برتن نہیں بھرا؛ چند لقمے کافی ہیں، یا پیٹ کا ایک تہائی کھانے، ایک تہائی پانی اور ایک تہائی سانس کے لیے رکھے۔"',
    reference: 'Jami‘ at-Tirmidhi 2380 · Sunan Ibn Majah 3349',
  },
];

export const ISLAMIC_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-quran-1',
    topic: 'Quran',
    questionEn: 'Which Surah is called "The Heart of the Quran" or stands out as the opening prayer recited in every rak‘ah?',
    questionUr: 'نماز کی ہر رکعت میں کس سورت کی تلاوت فرض (رکن) ہے جسے ام الکتاب بھی کہا جاتا ہے؟',
    options: ['Surah al-Fatihah', 'Surah al-Ikhlas', 'Surah al-Baqarah', 'Surah al-Mulk'],
    correctIndex: 0,
    explanationEn:
      'Surah al-Fatihah is called Umm al-Kitab (Mother of the Book) and As-Sab‘ al-Mathani; the Prophet ﷺ stated there is no valid prayer without reciting it (Bukhari 756).',
    explanationUr:
      'سورہ فاتحہ کو ام الکتاب اور سبع مثانی کہا جاتا ہے اور صحیح بخاری کے مطابق اس کے بغیر نماز مکمل نہیں ہوتی۔',
    reference: 'Sahih al-Bukhari 756 · Al-Hijr 15:87',
  },
  {
    id: 'q-quran-2',
    topic: 'Quran',
    questionEn: 'Which Surah does NOT begin with "Bismillahir-Rahmanir-Rahim"?',
    questionUr: 'قرآن مجید کی کون سی سورت "بسم اللہ الرحمٰن الرحیم" کے بغیر شروع ہوتی ہے؟',
    options: ['Surah al-Anfal (8)', 'Surah at-Tawbah (9)', 'Surah al-Kahf (18)', 'Surah al-Fath (48)'],
    correctIndex: 1,
    explanationEn:
      'Surah at-Tawbah (Surah 9) is the only Surah in the Holy Quran that opens without Bismillah.',
    explanationUr:
      'سورہ توبہ (سورت نمبر 9) قرآن مجید کی واحد سورت ہے جس کے آغاز میں بسم اللہ نہیں لکھی گئی۔',
    reference: 'Surah at-Tawbah 9:1 · Al-Mustadrak',
  },
  {
    id: 'q-quran-3',
    topic: 'Quran',
    questionEn: 'Which Surah is known as equivalent to one-third of the Holy Quran in reward?',
    questionUr: 'کون سی سورت اجر و ثواب کے اعتبار سے ایک تہائی قرآن کے برابر قرار دی گئی ہے؟',
    options: ['Surah al-Falaq', 'Surah an-Nasr', 'Surah al-Ikhlas', 'Surah al-Kawthar'],
    correctIndex: 2,
    explanationEn:
      'Surah al-Ikhlas (112) summarizes pure Tawheed and the perfection of Allah’s Attributes, earning the reward of one-third of the Quran.',
    explanationUr:
      'سورہ اخلاص (112) خالص توحید اور صفاتِ الٰہی کے بیان کی وجہ سے ثواب میں ایک تہائی قرآن کے برابر ہے۔',
    reference: 'Sahih al-Bukhari 5013 · Sahih Muslim 811',
  },
  {
    id: 'q-quran-4',
    topic: 'Quran',
    questionEn: 'Which Surah intercedes for its reciter in the grave and protects from its punishment?',
    questionUr: 'وہ کون سی سورت ہے جو اپنے قاری کی شفاعت کرتی ہے اور عذابِ قبر سے بچاتی ہے؟',
    options: ['Surah al-Mulk (67)', 'Surah al-Qalam (68)', 'Surah al-Waqiah (56)', 'Surah al-Jumu‘ah (62)'],
    correctIndex: 0,
    explanationEn:
      'The Prophet ﷺ taught that Surah al-Mulk (30 verses) intercedes for a person until they are forgiven and serves as a shield in the grave.',
    explanationUr:
      'نبی کریم ﷺ نے فرمایا کہ تیس آیات والی سورہ ملک اپنے پڑھنے والے کی شفاعت کرتی ہے اور عذابِ قبر سے حفاظت کا ذریعہ بنتی ہے۔',
    reference: 'Jami‘ at-Tirmidhi 2891 · Sunan Abi Dawud 1400',
  },
  {
    id: 'q-quran-5',
    topic: 'Quran',
    questionEn: 'Which Surah contains Bismillah twice (once at the opening and once inside a verse)?',
    questionUr: 'قرآن مجید کی کس سورت میں "بسم اللہ" دو مرتبہ آئی ہے؟',
    options: ['Surah al-Qasas', 'Surah an-Naml', 'Surah Luqman', 'Surah Maryam'],
    correctIndex: 1,
    explanationEn:
      'Surah an-Naml opens with Bismillah and also quotes Prophet Sulayman’s letter to Sheba in verse 27:30: "Innahu min Sulaymana wa innahu Bismillahir-Rahmanir-Rahim."',
    explanationUr:
      'سورہ نمل کے شروع میں بھی بسم اللہ ہے اور آیت 30 میں حضرت سلیمانؑ کے خط کے آغاز میں بھی بسم اللہ آئی ہے۔',
    reference: 'Surah an-Naml 27:30',
  },
  {
    id: 'q-seerah-1',
    topic: 'Seerah',
    questionEn: 'In which cave outside Makkah did Prophet Muhammad ﷺ receive the very first verses of the Quran?',
    questionUr: 'مکہ مکرمہ کے قریب کس غار میں نبی کریم ﷺ پر قرآن کی پہلی وحی نازل ہوئی؟',
    options: ['Cave Thawr', 'Cave Hira', 'Cave Uhud', 'Valley of Mina'],
    correctIndex: 1,
    explanationEn:
      'Angel Jibril (AS) came to the Prophet ﷺ in Cave Hira on Jabal an-Nur with the first five verses of Surah al-‘Alaq ("Iqra...").',
    explanationUr:
      'جبلِ نور پر واقع غارِ حرا میں حضرت جبرائیلؑ سورہ علق کی ابتدائی پانچ آیات لے کر نازل ہوئے۔',
    reference: 'Sahih al-Bukhari 3 · Al-‘Alaq 96:1–5',
  },
  {
    id: 'q-seerah-2',
    topic: 'Seerah',
    questionEn: 'Who was the faithful Companion who accompanied the Prophet ﷺ inside Cave Thawr during the Hijrah?',
    questionUr: 'ہجرتِ مدینہ کے دوران غارِ ثور میں نبی کریم ﷺ کے ساتھ کون سے صحابی شریکِ سفر تھے؟',
    options: ['‘Umar ibn al-Khattab (RA)', 'Abu Bakr as-Siddiq (RA)', '‘Ali ibn Abi Talib (RA)', 'Zayd ibn Harithah (RA)'],
    correctIndex: 1,
    explanationEn:
      'Abu Bakr as-Siddiq (RA) accompanied the Prophet ﷺ for three nights in Cave Thawr and is honored directly in Surah at-Tawbah 9:40 ("Do not grieve; indeed Allah is with us").',
    explanationUr:
      'حضرت ابوبکر صدیقؓ غارِ ثور میں آپ ﷺ کے رفیقِ سفر تھے جن کا تذکرہ قرآن کی سورہ توبہ (9:40) میں موجود ہے۔',
    reference: 'At-Tawbah 9:40 · Sahih al-Bukhari 3653',
  },
  {
    id: 'q-seerah-3',
    topic: 'Seerah',
    questionEn: 'Which decisive battle took place on the 17th of Ramadan in the 2nd year after Hijrah (2 AH)?',
    questionUr: '2 ہجری میں 17 رمضان المبارک کو کون سا عظیم الشان غزوہ پیش آیا؟',
    options: ['Battle of Uhud', 'Battle of the Trench (Khandaq)', 'Battle of Badr', 'Battle of Khaybar'],
    correctIndex: 2,
    explanationEn:
      'Called Yawm al-Furqan (Day of the Criterion) in the Quran, 313 poorly equipped Muslims gained decisive victory at Badr by Allah’s help.',
    explanationUr:
      'غزوۂ بدر کو قرآن میں "یوم الفرقان" کہا گیا جس میں 313 مسلمانوں کو اللہ کی خاص نصرت سے فیصلہ کن فتح ملی۔',
    reference: 'Al-Anfal 8:41 · Ali ‘Imran 3:123',
  },
  {
    id: 'q-seerah-4',
    topic: 'Seerah',
    questionEn: 'Who suggested digging a defensive trench around Madinah prior to the Battle of Ahzab (5 AH)?',
    questionUr: 'غزوۂ احزاب (5 ہجری) میں مدینہ کے گرد خندق کھودنے کا مشورہ کس صحابی نے دیا تھا؟',
    options: ['Sa‘d ibn Mu‘adh (RA)', 'Salman al-Farisi (RA)', 'Khalid ibn al-Walid (RA)', '‘Ammar ibn Yasir (RA)'],
    correctIndex: 1,
    explanationEn:
      'Salman al-Farisi (RA) advised this defensive strategy used in Persia, saving Madinah from the 10,000-strong coalition siege.',
    explanationUr:
      'حضرت سلمان فارسیؓ کے مشورے سے مدینہ کے کھلے حصے پر خندق کھودی گئی جس سے مشرکین کا محاصرہ ناکام ہوا۔',
    reference: 'Al-Ahzab 33:9–25 · Ar-Raheeq Al-Makhtum',
  },
  {
    id: 'q-seerah-5',
    topic: 'Seerah',
    questionEn: 'What historic phrase did the Prophet ﷺ proclaim when forgiving the people of Makkah at its Conquest (8 AH)?',
    questionUr: 'فتحِ مکہ (8 ہجری) کے موقع پر نبی کریم ﷺ نے اہلِ مکہ کو معاف کرتے ہوئے کون سا جملہ ارشاد فرمایا؟',
    options: [
      '"No blame upon you today; go, for you are free"',
      '"Pay double tribute for twenty years"',
      '"Leave Makkah immediately"',
      '"Await a council next month"',
    ],
    correctIndex: 0,
    explanationEn:
      'Echoing Prophet Yusuf’s forgiving words ("La tathriba ‘alaykumul-yawm"), the Prophet ﷺ declared general amnesty to those who persecuted him for years.',
    explanationUr:
      'آپ ﷺ نے حضرت یوسفؑ کے الفاظ دہراتے ہوئے فرمایا: "آج تم پر کوئی ملامت نہیں، جاؤ تم سب آزاد ہو۔"',
    reference: 'Yusuf 12:92 · Ar-Raheeq Al-Makhtum',
  },
  {
    id: 'q-salaf-1',
    topic: 'Salaf & Aqeedah',
    questionEn: 'Which three generations make up "As-Salaf as-Salih" praised directly by Prophet Muhammad ﷺ?',
    questionUr: 'نبی کریم ﷺ کی حدیث کے مطابق "خیرالقرون" (سلفِ صالحین) میں کون سی تین نسلیں شامل ہیں؟',
    options: [
      'Sahabah, Tabi‘un, and Atba‘ at-Tabi‘in',
      'Only the Prophets before Islam',
      'Scholars after 1000 AH',
      'Poets of pre-Islamic Makkah',
    ],
    correctIndex: 0,
    explanationEn:
      'In Sahih al-Bukhari (2652) & Sahih Muslim (2533), the Prophet ﷺ declared: "The best of people are my generation (Sahabah), then those after them (Tabi‘un), then those after them (Atba‘ at-Tabi‘in)."',
    explanationUr:
      'صحیح بخاری و مسلم کے مطابق بہترین زمانے صحابہ کرامؓ، پھر تابعینؒ اور پھر تبع تابعینؒ کے ادوار ہیں۔',
    reference: 'Sahih al-Bukhari 2652 · Sahih Muslim 2533',
  },
  {
    id: 'q-salaf-2',
    topic: 'Salaf & Aqeedah',
    questionEn: 'Which category of Tawheed specifically means directing all worship, du‘a, and reliance solely to Allah alone?',
    questionUr: 'توحید کی کس قسم کا مطلب ہر قسم کی عبادت، دعا اور توکل کو صرف اللہ کے لیے خاص کرنا ہے؟',
    options: [
      'Tawheed ar-Rububiyyah',
      'Tawheed al-Uluhiyyah',
      'Tawheed al-Mu‘amalat',
      'Tawheed al-Adab',
    ],
    correctIndex: 1,
    explanationEn:
      'Tawheed al-Uluhiyyah (Oneness of Worship) is dedicating Salah, supplication, vows, sacrifice, and reliance strictly to Allah—the core message of every Prophet.',
    explanationUr:
      'توحیدِ الوہیت کا مطلب ہر عبادت، دعا، نذر اور توکل کو بغیر کسی شریک کے صرف اللہ کے لیے خالص کرنا ہے۔',
    reference: 'Al-Fatihah 1:5 · An-Nahl 16:36',
  },
  {
    id: 'q-salaf-3',
    topic: 'Salaf & Aqeedah',
    questionEn: 'In the famous Hadith of Jibril, how did the Prophet ﷺ define "Ihsan" (spiritual excellence)?',
    questionUr: 'حدیثِ جبرائیل میں نبی کریم ﷺ نے "احسان" کی کیا تعریف فرمائی؟',
    options: [
      'Giving half of all income to kings',
      'Fasting every single day without stopping',
      'Worshipping Allah as though you see Him, knowing He sees you',
      'Memorizing ancient poetry',
    ],
    correctIndex: 2,
    explanationEn:
      'In Sahih Muslim 8, Ihsan is: "To worship Allah as though you see Him, and though you do not see Him, know surely that He sees you."',
    explanationUr:
      'صحیح مسلم کی حدیثِ جبرائیل میں احسان یہ ہے کہ تم اللہ کی عبادت ایسے کرو گویا اسے دیکھ رہے ہو، ورنہ یہ یقین رکھو کہ وہ تمہیں دیکھ رہا ہے۔',
    reference: 'Sahih Muslim 8 (Hadith Jibril)',
  },
  {
    id: 'q-salaf-4',
    topic: 'Salaf & Aqeedah',
    questionEn: 'Which Companion said: "Follow and do not innovate, for you have been sufficed"?',
    questionUr: 'کس جلیل القدر صحابی نے فرمایا: "اتباع کرو اور بدعت ایجاد نہ کرو، تمہارے لیے سنت کافی کر دی گئی ہے"؟',
    options: [
      '‘Abdullah ibn Mas‘ud (RA)',
      'Mu‘awiyah ibn Abi Sufyan (RA)',
      'Abu Hurayrah (RA)',
      '‘Amr ibn al-‘As (RA)',
    ],
    correctIndex: 0,
    explanationEn:
      'Senior Companion and jurist ‘Abdullah ibn Mas‘ud (RA) authored this timeless principle preserving adherence to authentic Sunnah.',
    explanationUr:
      'یہ سنہری قول جلیل القدر صحابی اور فقیہ حضرت عبداللہ بن مسعود رضی اللہ عنہ سے مروی ہے۔',
    reference: 'Al-Lalika’i, Sharh Usul I‘tiqad Ahl as-Sunnah',
  },
  {
    id: 'q-salaf-5',
    topic: 'Salaf & Aqeedah',
    questionEn: 'Which Salaf scholar wrote: "The chain of narration (Isnad) is part of the religion; without it, anyone could say whatever they wish"?',
    questionUr: 'کس عظیم سلف عالم نے فرمایا: "اسناد دین کا حصہ ہے، اگر اسناد نہ ہوتیں تو ہر شخص جو چاہتا کہہ دیتا"؟',
    options: [
      '‘Abdullah ibn al-Mubarak',
      'Hasan al-Basri',
      'Ibn Shihab az-Zuhri',
      'Al-Layth ibn Sa‘d',
    ],
    correctIndex: 0,
    explanationEn:
      'Imam ‘Abdullah ibn al-Mubarak (118–181 AH) articulated this cornerstone principle, preserved by Imam Muslim in the introduction of Sahih Muslim.',
    explanationUr:
      'امام عبداللہ بن مبارک رحمہ اللہ کا یہ مشہور قول مقدمہ صحیح مسلم میں محفوظ ہے۔',
    reference: 'Introduction to Sahih Muslim 1/15',
  },
  {
    id: 'q-imams-1',
    topic: 'Companions & 4 Imams',
    questionEn: 'Which of the Four Great Imams authored "Al-Muwatta" and taught Imam ash-Shafi‘i in Madinah?',
    questionUr: 'چاروں ائمہ کرام میں سے کس امام نے "المؤطا" تصنیف فرمائی اور مدینہ میں امام شافعیؒ کو درس دیا؟',
    options: [
      'Imam Abu Hanifah',
      'Imam Malik ibn Anas',
      'Imam Ahmad ibn Hanbal',
      'Imam al-Awza‘i',
    ],
    correctIndex: 1,
    explanationEn:
      'Imam Malik ibn Anas (93–179 AH), Imam of Madinah, compiled Al-Muwatta and personally taught the young Imam ash-Shafi‘i.',
    explanationUr:
      'امام دارِ ہجرت حضرت امام مالک بن انسؒ نے المؤطا تالیف فرمائی اور امام شافعیؒ ان کے ممتاز شاگرد تھے۔',
    reference: 'Siyar A‘lam an-Nubala',
  },
  {
    id: 'q-imams-2',
    topic: 'Companions & 4 Imams',
    questionEn: 'Which Imam pioneered the formal discipline of Usul al-Fiqh (Islamic Legal Theory) by authoring "Ar-Risalah"?',
    questionUr: 'کس امام نے "الرسالہ" تصنیف فرما کر علمِ اصولِ فقہ کی باقاعدہ تدوین کی؟',
    options: [
      'Imam ash-Shafi‘i',
      'Imam Abu Hanifah',
      'Imam Malik',
      'Imam Abu Yusuf',
    ],
    correctIndex: 0,
    explanationEn:
      'Imam Muhammad ibn Idris ash-Shafi‘i (150–204 AH) authored Ar-Risalah, systematizing Quran, Sunnah, Ijma‘, and Qiyas.',
    explanationUr:
      'امام شافعی رحمہ اللہ نے "الرسالہ" لکھ کر اصولِ فقہ کے قواعد کو باقاعدہ علمی شکل دی۔',
    reference: 'Ar-Risalah by Imam ash-Shafi‘i',
  },
  {
    id: 'q-imams-3',
    topic: 'Companions & 4 Imams',
    questionEn: 'Which Imam stood steadfast through imprisonment and lashing during Al-Mihnah defending that the Quran is Allah’s uncreated Speech, and authored Al-Musnad?',
    questionUr: 'فتنہ خلقِ قرآن میں قید و کوڑے سہہ کر عقیدۂ اہلِ سنت کی حفاظت کس امام نے کی اور "المسند" تصنیف فرمائی؟',
    options: [
      'Imam Ahmad ibn Hanbal',
      'Imam Malik ibn Anas',
      'Imam Abu Hanifah',
      'Imam ash-Shafi‘i',
    ],
    correctIndex: 0,
    explanationEn:
      'Imam Ahmad ibn Hanbal (164–241 AH), known as Imam Ahl as-Sunnah, compiled over 27,000 Hadiths in Al-Musnad and stood unyielding during Al-Mihnah.',
    explanationUr:
      'امام اہلِ سنت حضرت امام احمد بن حنبلؒ نے فتنہ خلقِ قرآن میں ثابت قدمی دکھائی اور المسند جیسی عظیم کتاب مرتب فرمائی۔',
    reference: 'Al-Bidayah wan-Nihayah',
  },
  {
    id: 'q-imams-4',
    topic: 'Companions & 4 Imams',
    questionEn: 'How did the Second Caliph ‘Umar ibn al-Khattab (RA) advise Abu Bakr (RA) after the Battle of Yamamah?',
    questionUr: 'جنگِ یمامہ میں حفاظ کی شہادت کے بعد حضرت عمرؓ نے حضرت ابوبکر صدیقؓ کو کس عظیم کام کا مشورہ دیا؟',
    options: [
      'Collecting and compiling the Quran into a unified Mushaf',
      'Building ships across the Mediterranean',
      'Closing all markets in Madinah',
      'Translating poetry into Latin',
    ],
    correctIndex: 0,
    explanationEn:
      'After many memorizers were martyred at Yamamah, ‘Umar (RA) urged Abu Bakr (RA) to compile the scattered Quran manuscripts into one unified Mushaf under Zayd ibn Thabit (RA).',
    explanationUr:
      'جنگِ یمامہ کے بعد حضرت عمرؓ کے مشورے سے حضرت ابوبکر صدیقؓ نے حضرت زید بن ثابتؓ کی سربراہی میں قرآن مجید کو یکجا مصحف کی شکل میں جمع فرمایا۔',
    reference: 'Sahih al-Bukhari 4986',
  },
  {
    id: 'q-imams-5',
    topic: 'Companions & 4 Imams',
    questionEn: 'What golden principle did ALL Four Great Imams agree upon regarding their personal rulings versus an authentic Hadith?',
    questionUr: 'چاروں ائمہ کرام کا اپنے ذاتی قول اور صحیح حدیث کے مقابلے میں کیا متفقہ اصول تھا؟',
    options: [
      'When an authentic Hadith is clear, follow the Hadith and leave any conflicting human opinion',
      'Human opinions always override newly discovered authentic Hadith',
      'Never read any Hadith outside one city',
      'Only kings may consult the Sunnah',
    ],
    correctIndex: 0,
    explanationEn:
      'Abu Hanifah, Malik, ash-Shafi‘i, and Ahmad each explicitly stated words to the effect: "When a Hadith is proven Sahih, that is my Madhhab."',
    explanationUr:
      'چاروں ائمہ کرام نے واضح فرمایا کہ جب صحیح حدیث ثابت ہو جائے تو وہی ہمارا مذہب ہے اور اس کے مقابل کسی انسان کا قول چھوڑ دیا جائے گا۔',
    reference: 'Sifat Salah an-Nabi Introduction · Usul',
  },
];
