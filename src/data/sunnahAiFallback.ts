import { TranslationDisplay } from '../types';

interface FallbackKnowledgeEntry {
  id: string;
  keywords: string[];
  titleEn: string;
  answerEn: string;
  answerUr: string;
}

const SUNNAH_AI_FALLBACK_KB: FallbackKnowledgeEntry[] = [
  {
    id: 'who-is-allah',
    keywords: [
      'who is allah',
      'about allah',
      'creator',
      'god in islam',
      'allah',
      'names of allah',
      'asma ul husna',
      'ayat al kursi',
      'al-ikhlas',
      'existence of god',
    ],
    titleEn: 'Who is Allah?',
    answerEn: `### 1. Direct Answer from Quran & Authentic Sunnah
Allah (الله) is the One True God—the Eternal Creator, Sustainer, and Sovereign Lord of the heavens, the earth, and everything within them. He describes Himself in Surah Al-Ikhlas (112:1–4): *"Say, 'He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent.'"* And in Ayat al-Kursi (Al-Baqarah 2:255): *"Allah—there is no deity worthy of worship except Him, the Ever-Living, the All-Sustainer. Neither drowsiness overtakes Him nor sleep."* In Sahih al-Bukhari and Sahih Muslim, the Prophet ﷺ taught that Allah’s mercy prevails over His wrath and that He has Ninety-Nine Beautiful Names—whoever learns, understands, and lives by them enters Paradise.

### 2. Understanding of the Salaf as-Salih
The Companions and Tabi‘un affirmed all Names and Attributes Allah revealed in the Quran and authentic Sunnah with complete reverence—without distorting their meaning, denying them, or comparing Allah to His creation, anchored upon Ash-Shura (42:11): *"There is nothing like unto Him, and He is the Hearing, the Seeing."*

### 3. Views of the Four Imams
All Four Imams—Abu Hanifah (in *Al-Fiqh al-Akbar*), Malik, ash-Shafi‘i, and Ahmad ibn Hanbal—held complete consensus (*Ijma‘*) that Allah is uniquely One in His Essence, Lordship, exclusive right to worship, and Noble Attributes, transcendent above creation while hearing every whisper and answering every sincere supplication.

### 4. Adab & Closing Note
Knowing Allah fills the heart with hope, tranquility, and purpose. **Wallahu A'lam (And Allah knows best).** For deeper study, explore Surah Al-Hashr (59:22–24) and *Asma-ul-Husna* inside the Explore tab.`,
    answerUr: `### 1. قرآن و سنت کی روشنی میں براہِ راست جواب
اللہ تعالیٰ واحد و یکتا خالق، مالک اور تمام جہانوں کا رب ہے۔ سورۃ الاخلاص (112:1–4) میں اللہ اپنا تعارف فرماتا ہے کہ وہ ایک ہے، بے نیاز ہے، نہ اس کی کوئی اولاد ہے اور نہ وہ کسی سے پیدا ہوا، اور کوئی اس کا ہمسر نہیں۔ آیت الکرسی (البقرہ 2:255) میں بیان ہے کہ وہ زندہ جاوید اور سب کو تھامنے والا ہے۔ صحیح بخاری و مسلم میں نبی کریم ﷺ نے فرمایا کہ اللہ کے ننانوے اسمائے حسنیٰ ہیں، جو انہیں یاد کرے اور ان پر عمل کرے وہ جنت میں داخل ہوگا۔

### 2. سلف صالحین کا فہم
صحابہ کرام اور تابعین اللہ کے تمام اسماء و صفات پر بلا تشبیہ و بلا تعطیل ایمان رکھتے تھے: *"اس جیسی کوئی چیز نہیں، اور وہ سننے والا دیکھنے والا ہے"* (الشوریٰ 42:11)۔

### 3. ائمہ اربعہ کا اتفاق
امام ابو حنیفہ، امام مالک، امام شافعی اور امام احمد بن حنبل رحمہم اللہ سب کا کامل اجماع ہے کہ عبادت، دعا اور توکل صرف اللہ وحدہ لا شریک کا حق ہے۔

### 4. ادب اور اختتامی کلمات
اللہ کی معرفت دلوں کو سکون دیتی ہے۔ **واللہ اعلم (اور اللہ بہتر جانتا ہے)۔**`,
  },
  {
    id: 'pillars-aqeedah',
    keywords: [
      'islam',
      'iman',
      'pillars',
      'angels',
      'qadr',
      'destiny',
      'predestination',
      'akhirah',
      'judgment',
      'jannah',
      'hellfire',
      'hereafter',
      'muslim',
    ],
    titleEn: 'Articles of Faith (Iman), Angels, Qadr & Akhirah',
    answerEn: `### 1. Direct Answer from Quran & Authentic Sunnah
In the famous Hadith of Jibril (*Sahih Muslim*, Kitab al-Iman), the Prophet ﷺ defined Islam through its Five Pillars (Shahadah, Salah, Zakah, Sawm of Ramadan, and Hajj) and defined Iman through Six Articles: believing in **Allah**, **His Angels**, **His Revealed Books**, **His Messengers**, **the Last Day**, and **Divine Decree (Al-Qadr), both good and seemingly difficult** (Al-Baqarah 2:285; Al-Qamar 54:49).

### 2. Understanding of the Salaf as-Salih
The Salaf affirmed that true faith (*Iman*) combines conviction in the heart, confession on the tongue, and righteous action of the limbs—increasing with obedience and decreasing with neglect. On *Al-Qadr*, they affirmed Allah’s eternal knowledge, recording (*Al-Lawh al-Mahfuz*), sovereign will, and creation, alongside real human moral responsibility and free choice.

### 3. Views of the Four Imams
All Four Imams stood united upon these Six Articles of Faith without any disagreement in creed, emphasizing love for all Prophets, reverence for the Angels, preparation for the grave and Resurrection, and gratitude and patience in every decree of Allah.

### 4. Adab & Closing Note
Hold firm to daily prayer, remembrance, and good character while trusting Allah’s wisdom. **Wallahu A'lam (And Allah knows best).** Consult a qualified scholar for deeper theological study.`,
    answerUr: `### 1. قرآن و سنت کی روشنی میں براہِ راست جواب
حدیثِ جبریل (صحیح مسلم) کے مطابق اسلام کے پانچ ارکان (شہادت، نماز، زکوٰۃ، روزہ، حج) اور ایمان کے چھ بنیادی عقائد ہیں: اللہ، فرشتوں، آسمانی کتابوں، رسولوں، آخرت کے دن اور اچھی و بری تقدیر پر ایمان (البقرہ 2:285)۔

### 2. سلف صالحین کا فہم
سلف صالحین کے نزدیک ایمان دل کی تصدیق، زبان کے اقرار اور اعمالِ صالحہ کا نام ہے جو اطاعت سے بڑھتا ہے۔

### 3. ائمہ اربعہ کا اتفاق
امام ابو حنیفہ، مالک، شافعی اور احمد رحمہم اللہ سب کا ان تمام عقائدِ ایمان پر کامل اتفاق ہے۔

### 4. ادب اور اختتامی کلمات
**واللہ اعلم (اور اللہ بہتر جانتا ہے)۔**`,
  },
  {
    id: 'tawbah-repentance',
    keywords: ['repent', 'tawbah', 'forgive', 'forgiveness', 'sin', 'istighfar', 'mercy', 'guilt'],
    titleEn: 'Repentance (Tawbah) & Seeking Forgiveness',
    answerEn: `### 1. Direct Answer from Quran & Authentic Sunnah
Allah welcomes every sincere returning servant with boundless mercy: *"Say, 'O My servants who have transgressed against themselves, do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful'"* (Az-Zumar 39:53). In *Sahih Muslim*, the Prophet ﷺ said Allah rejoices more at a servant’s repentance than a traveler finding his lost camel in a desert, and taught Sayyid al-Istighfar (*Sahih al-Bukhari*).

### 2. Understanding of the Salaf as-Salih
Scholars of the Salaf like al-Hasan al-Basri and Ibn al-Qayyim summarized three conditions of sincere *Tawbah Nasuh* (At-Tahrim 66:8): stopping the sin immediately, feeling genuine remorse before Allah, and firmly resolving not to return—plus restoring any rights owed to other people.

### 3. Views of the Four Imams
All Four Imams share complete consensus (*Ijma‘*) that the door of repentance remains open until the soul reaches the throat at death or the sun rises from the west, and that despairing of Allah’s mercy is itself a grave error.

### 4. Adab & Closing Note
Never let shame keep you away from Salah or Du‘a—turn back to Allah immediately after any slip. **Wallahu A'lam (And Allah knows best).** Consult a qualified scholar if restoring complex financial or personal rights.`,
    answerUr: `### 1. قرآن و سنت کی روشنی میں براہِ راست جواب
اللہ تعالیٰ فرماتا ہے: *"اے میرے بندو جنہوں نے اپنی جانوں پر زیادتی کی ہے، اللہ کی رحمت سے مایوس نہ ہو، بے شک اللہ تمام گناہ بخش دیتا ہے"* (الزمر 39:53)۔ صحیح مسلم کے مطابق اللہ بندے کی توبہ پر بے حد خوش ہوتا ہے۔

### 2. سلف صالحین کا فہم
سچی توبہ (التحریم 66:8) کی شرائط یہ ہیں: گناہ کو فوراً چھوڑنا، دل سے ندامت، آئندہ نہ کرنے کا پختہ عزم، اور اگر کسی بندے کا حق تلف ہوا ہو تو اسے ادا کرنا۔

### 3. ائمہ اربعہ کا اتفاق
چاروں ائمہ کا اجماع ہے کہ موت کے غرغرہ سے پہلے تک توبہ کا دروازہ ہمیشہ کھلا رہتا ہے۔

### 4. ادب اور اختتامی کلمات
**واللہ اعلم (اور اللہ بہتر جانتا ہے)۔**`,
  },
  {
    id: 'fasting-zakah-hajj',
    keywords: ['fast', 'ramadan', 'sawm', 'zakah', 'charity', 'sadaqah', 'hajj', 'umrah', 'wudu', 'ghusl'],
    titleEn: 'Purification, Fasting, Zakah & Pilgrimage',
    answerEn: `### 1. Direct Answer from Quran & Authentic Sunnah
Worship in Islam centers on sincerity and Prophetic guidance. Allah prescribes Wudu before prayer (Al-Ma’idah 5:6), fasting in Ramadan for Taqwa (Al-Baqarah 2:183), Zakah to purify wealth and uplift the poor (At-Tawbah 9:60, 103), and Hajj once in a lifetime for those able (Ali ‘Imran 3:97). In *Sahih al-Bukhari* and *Sahih Muslim*, the Prophet ﷺ emphasized that whoever fasts Ramadan out of faith and seeking reward has past sins forgiven.

### 2. Understanding of the Salaf as-Salih
The Companions guarded both the outer precision of Wudu, fasting, and Zakah and their inner spirit—generosity, guarding the tongue from backbiting, and joyful humility.

### 3. Views of the Four Imams
All Four Imams agree on the obligatory status and core pillars of Wudu, Ramadan fasting, Zakah (2.5% on qualifying savings held a lunar year), and Hajj, while holding recognized scholarly details on items like Zakah on jewelry or traveling fast concessions.

### 4. Adab & Closing Note
Seek ease and authenticity in worship without excess burden. **Wallahu A'lam (And Allah knows best).** Consult a qualified local scholar or mufti for detailed personal Zakah or medical fasting rulings.`,
    answerUr: `### 1. قرآن و سنت کی روشنی میں براہِ راست جواب
نماز کے لیے وضو (المائدہ 5:6)، تقویٰ کے لیے رمضان کے روزے (البقرہ 2:183)، مال کی پاکیزگی کے لیے زکوٰۃ (التوبہ 9:103) اور استطاعت پر حج فرض ہے (آل عمران 3:97)۔

### 2. سلف صالحین کا فہم
سلف صالحین عبادات کے ظاہری ارکان کے ساتھ اخلاص، زبان کی حفاظت اور سخاوت کا خاص اہتمام کرتے تھے۔

### 3. ائمہ اربعہ کا اتفاق
چاروں فقہی مکاتبِ فکر ان فرائض پر متفق ہیں اور جزئی مسائل میں مستند دلائل کی بنیاد پر معتدل اجتہاد کرتے ہیں۔

### 4. ادب اور اختتامی کلمات
**واللہ اعلم (اور اللہ بہتر جانتا ہے)۔** ذاتی زکوٰۃ یا عذر کے مسائل میں مستند مفتی سے رجوع کریں۔`,
  },
  {
    id: 'parents-family-character',
    keywords: ['parent', 'mother', 'father', 'marriage', 'wife', 'husband', 'family', 'character', 'anger', 'patience', 'sabr', 'dua', 'rizq', 'halal'],
    titleEn: 'Family, Character, Patience & Halal Sustenance',
    answerEn: `### 1. Direct Answer from Quran & Authentic Sunnah
After worshiping Allah alone, the Quran commands utmost kindness to parents: *"And lower to them the wing of humility out of mercy and say, 'My Lord, have mercy upon them as they brought me up [when I was] small'"* (Al-Isra 17:23–24). On patience and trust, Allah promises: *"Whoever fears Allah—He will make for him a way out and provide for him from where he does not expect"* (At-Talaq 65:2–3). In *Sahih Muslim*, the Prophet ﷺ reminded us that the affairs of a believer are always good—grateful in ease and patient in hardship.

### 2. Understanding of the Salaf as-Salih
The Companions excelled in gentle speech, truthfulness in trade, seeking purely Halal sustenance, controlling anger (*"Do not get angry"* — *Sahih al-Bukhari*), and uniting family ties even when mistreated.

### 3. Views of the Four Imams
All Four Imams affirmed that honoring parents, upholding marital kindness (*Mu‘asharah bil-Ma‘ruf*, An-Nisa 4:19), and earning purely Halal income are foundational Islamic obligations.

### 4. Adab & Closing Note
Good character weighs heaviest on the Scale on the Day of Judgment (*Jami‘ at-Tirmidhi*). **Wallahu A'lam (And Allah knows best).** For sensitive family or marital mediation, consult a trusted local scholar.`,
    answerUr: `### 1. قرآن و سنت کی روشنی میں براہِ راست جواب
توحید کے بعد والدین کے ساتھ حسنِ سلوک سب سے بڑا حکم ہے (الاسراء 17:23–24)۔ تقویٰ اور صبر پر اللہ رزق اور کشادگی کے راستے کھول دیتا ہے (الطلاق 65:2–3)۔

### 2. سلف صالحین کا فہم
صحابہ کرام رزقِ حلال، سچائی، غصے پر قابو (صحیح بخاری) اور صلہ رحمی میں سب سے آگے تھے۔

### 3. ائمہ اربعہ کا اتفاق
تمام ائمہ والدین کی خدمت، اہلِ خانہ کے حقوق اور حلال کمائی کو بنیادی دینی فرائض قرار دیتے ہیں۔

### 4. ادب اور اختتامی کلمات
**واللہ اعلم (اور اللہ بہتر جانتا ہے)۔**`,
  },
];

export function findSunnahAiFallback(
  question: string,
  language: TranslationDisplay
): string {
  const q = question.toLowerCase();
  const useUrdu = language === 'urdu';

  for (const entry of SUNNAH_AI_FALLBACK_KB) {
    if (entry.keywords.some((kw) => q.includes(kw))) {
      return useUrdu ? entry.answerUr : entry.answerEn;
    }
  }

  if (useUrdu) {
    return `### 1. قرآن و سنت کی روشنی میں براہِ راست جواب
اسلام میں ہر دینی و دنیاوی مسئلے کا بنیادی ماخذ قرآنِ مجید اور نبی کریم ﷺ کی صحیح سنت ہے: *"اگر تم کسی چیز میں اختلاف کرو تو اسے اللہ اور رسول کی طرف لوٹا دو"* (النساء 4:59)۔ صحیح بخاری و مسلم کے مطابق نبی کریم ﷺ نے فرمایا کہ جس شخص کے ساتھ اللہ بھلائی کا ارادہ فرماتا ہے اسے دین کی گہری سمجھ عطا فرما دیتا ہے۔

### 2. سلف صالحین کا فہم
صحابہ کرام، تابعین اور سلف صالحین قرآن اور مستند احادیث کو ان کے ظاہری، معتدل اور جامع مفہوم کے مطابق سمجھتے تھے اور غیر ثابت شدہ باتوں سے بچتے تھے۔

### 3. ائمہ اربعہ کا اتفاق
امام ابو حنیفہ، امام مالک، امام شافعی اور امام احمد رحمہم اللہ سب کا اس اصول پر اجماع ہے کہ مستند حدیثِ نبوی ہر رائے پر مقدم ہے۔

### 4. ادب اور اختتامی کلمات
آپ اپنے سوال ("${question.trim()}") پر لائیو جواب کے لیے نیچے **Retry Live Answer** دبا سکتے ہیں یا Explore میں عقیدہ، سیرت اور ائمہ اربعہ کے ابواب دیکھ سکتے ہیں۔ **واللہ اعلم (اور اللہ بہتر جانتا ہے)۔**`;
  }

  return `### 1. Direct Answer from Quran & Authentic Sunnah
Every sincere question in Islam is anchored upon Allah’s Book and the authentic Sunnah of Prophet Muhammad ﷺ: *"O you who have believed, obey Allah and obey the Messenger... and if you disagree over anything, refer it to Allah and the Messenger"* (An-Nisa 4:59). In *Sahih al-Bukhari* and *Sahih Muslim*, the Prophet ﷺ encouraged seeking beneficial knowledge: *"Whomever Allah intends good for, He grants them deep understanding of the religion."*

### 2. Understanding of the Salaf as-Salih
The Companions, Tabi‘un, and early scholars verified narrations carefully, combined texts together rather than isolating single lines, and held fast to clarity, moderation, and reverence for revelation.

### 3. Views of the Four Imams
All Four Imams—Abu Hanifah, Malik, ash-Shafi‘i, and Ahmad ibn Hanbal—shared full agreement on anchoring every ruling in the Quran, authentic Sunnah, and scholarly consensus (*Ijma‘*), setting aside personal opinions whenever clear Prophetic evidence is established.

### 4. Adab & Closing Note
Your question (*"${question.trim()}"*) can also be retried with live **Sunnah AI** using the **Retry Live Answer** button below, or explored directly in the *Aqeedah*, *Salaf*, *Four Imams*, and *Hadith* tabs. **Wallahu A'lam (And Allah knows best).**`;
}
