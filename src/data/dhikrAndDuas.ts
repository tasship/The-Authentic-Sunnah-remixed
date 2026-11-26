import { DhikrCategory, DhikrItem } from '../types';

export {
  DUA_ITEMS,
  QURAN_DUA_CATEGORIES,
  QURAN_DUA_ITEMS,
  SUNNAH_DUA_CATEGORIES,
  SUNNAH_DUA_ITEMS,
} from './duasExpanded';

export const DHIKR_CATEGORIES: DhikrCategory[] = [
  'Morning Adhkar',
  'Evening Adhkar',
  'Post-Salah Adhkar',
  'Sleeping & Waking',
  'Istighfar & Repentance',
  'Durood & Salawat',
  'Tasbih, Tahmid, Tahlil & Takbir',
  'Anxiety, Debt & Protection',
  'Ruqyah Shariyyah',
];

const AYAT_AL_KURSI_ARABIC =
  'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ';

const AYAT_AL_KURSI_TRANSLIT =
  "Allahu la ilaha illa Huwa, al-Hayyu al-Qayyum. La ta'khudhuhu sinatun wa la nawm. Lahu ma fi al-samawati wa ma fi al-ard. Man dha alladhi yashfa'u 'indahu illa bi-idhnih. Ya'lamu ma bayna aydihim wa ma khalfahum, wa la yuhituna bi-shay'in min 'ilmihi illa bima sha'a. Wasi'a Kursiyyuhu al-samawati wal-ard, wa la ya'uduhu hifzuhuma, wa Huwa al-'Aliyyu al-'Azim.";

const AYAT_AL_KURSI_EN =
  'Allah — there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is presently before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.';

const AYAT_AL_KURSI_UR =
  'اللہ وہ معبود ہے جس کے سوا کوئی معبود نہیں، وہ زندہ ہے، سب کو تھامنے والا ہے۔ اسے نہ اونگھ آتی ہے اور نہ نیند۔ جو کچھ آسمانوں میں ہے اور جو کچھ زمین میں ہے سب اسی کا ہے۔ کون ہے جو اس کی اجازت کے بغیر اس کے حضور سفارش کر سکے؟ وہ جانتا ہے جو ان کے آگے ہے اور جو ان کے پیچھے ہے، اور وہ اس کے علم میں سے کسی چیز کا احاطہ نہیں کر سکتے مگر جتنا وہ چاہے۔ اس کی کرسی آسمانوں اور زمین کو گھیرے ہوئے ہے، اور ان دونوں کی حفاظت اس پر گراں نہیں گزرتی، اور وہی سب سے بلند، نہایت عظمت والا ہے۔';

const AYAT_AL_KURSI_ROMAN_URDU =
  'Allah woh mabood hai jis ke siwa koi mabood nahi, Woh zinda hai, sab ko thamne wala hai. Use na oongh aati hai aur na neend. Jo kuch aasmano mein hai aur jo kuch zameen mein hai sab Usi ka hai. Kaun hai jo Us ki ijazat ke baghair Us ke huzoor sifarish kar sake? Woh janta hai jo un ke aage hai aur jo un ke peeche hai, aur woh Us ke ilm mein se kisi cheez ka ihata nahi kar sakte magar jitna Woh chahe. Us ki Kursi aasmano aur zameen ko ghere hue hai, aur un dono ki hifazat Us par giran nahi guzarti, aur Wahi sab se buland, nihayat azmat wala hai.';

const THREE_QULS_ARABIC =
  'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ۞ بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ۞ بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ';

const THREE_QULS_TRANSLIT =
  "Bismillahi al-Rahmani al-Rahim. Qul Huwa Allahu Ahad, Allahu al-Samad, lam yalid wa lam yulad, wa lam yakun lahu kufuwan ahad. Bismillahi al-Rahmani al-Rahim. Qul a'udhu bi-Rabbi al-falaq, min sharri ma khalaq, wa min sharri ghasiqin idha waqab, wa min sharri al-naffathati fi al-'uqad, wa min sharri hasidin idha hasad. Bismillahi al-Rahmani al-Rahim. Qul a'udhu bi-Rabbi al-nas, Maliki al-nas, Ilahi al-nas, min sharri al-waswasi al-khannas, alladhi yuwaswisu fi suduri al-nas, min al-jinnati wal-nas.";

const THREE_QULS_EN =
  'In the name of Allah, the Entirely Merciful, the Especially Merciful. Say: He is Allah, Who is One; Allah, the Eternal Refuge; He neither begets nor is born; nor is there to Him any equivalent. — In the name of Allah, the Entirely Merciful, the Especially Merciful. Say: I seek refuge in the Lord of daybreak, from the evil of that which He created, and from the evil of darkness when it settles, and from the evil of the blowers in knots, and from the evil of an envier when he envies. — In the name of Allah, the Entirely Merciful, the Especially Merciful. Say: I seek refuge in the Lord of mankind, the Sovereign of mankind, the God of mankind, from the evil of the retreating whisperer who whispers into the breasts of mankind, from among the jinn and mankind.';

const THREE_QULS_UR =
  'شروع اللہ کے نام سے جو بڑا مہربان، نہایت رحم والا ہے۔ کہہ دیجیے: وہ اللہ ایک ہے، اللہ بے نیاز ہے، نہ اس نے کسی کو جنا اور نہ وہ جنا گیا، اور اس کا کوئی ہمسر نہیں۔ — شروع اللہ کے نام سے جو بڑا مہربان، نہایت رحم والا ہے۔ کہہ دیجیے: میں صبح کے رب کی پناہ میں آتا ہوں، ہر اس چیز کے شر سے جو اس نے پیدا کی، اور اندھیری رات کے شر سے جب وہ چھا جائے، اور گرہوں میں پھونک مارنے والیوں کے شر سے، اور حسد کرنے والے کے شر سے جب وہ حسد کرے۔ — شروع اللہ کے نام سے جو بڑا مہربان، نہایت رحم والا ہے۔ کہہ دیجیے: میں لوگوں کے رب، لوگوں کے بادشاہ، لوگوں کے معبود کی پناہ میں آتا ہوں، وسوسہ ڈالنے والے پیچھے ہٹ جانے والے (شیطان) کے شر سے، جو لوگوں کے سینوں میں وسوسہ ڈالتا ہے، خواہ وہ جنوں میں سے ہو یا انسانوں میں سے۔';

const THREE_QULS_ROMAN_URDU =
  'Shuru Allah ke naam se jo bada meherban, nihayat reham wala hai. Keh dijiye: Woh Allah ek hai, Allah be-niyaz hai, na Us ne kisi ko jana aur na Woh jana gaya, aur Us ka koi hamsar nahi. — Shuru Allah ke naam se jo bada meherban, nihayat reham wala hai. Keh dijiye: Main subah ke Rab ki panah mein aata hoon, har us cheez ke shar se jo Us ne paida ki, aur andheri raat ke shar se jab woh chha jaye, aur girahon mein phoonk marne waliyon ke shar se, aur hasad karne wale ke shar se jab woh hasad kare. — Shuru Allah ke naam se jo bada meherban, nihayat reham wala hai. Keh dijiye: Main logon ke Rab, logon ke Badshah, logon ke Mabood ki panah mein aata hoon, waswasa dalne wale peeche hat jane wale (Shaitan) ke shar se, jo logon ke seenon mein waswasa dalta hai, khwah woh jinnon mein se ho ya insano mein se.';

export const DHIKR_ITEMS: DhikrItem[] = [
  // Morning Adhkar
  {
    id: 'morning-ayat-kursi',
    category: 'Morning Adhkar',
    title: 'Ayat al-Kursi (Morning Protection)',
    arabic: AYAT_AL_KURSI_ARABIC,
    transliteration: AYAT_AL_KURSI_TRANSLIT,
    english: AYAT_AL_KURSI_EN,
    urdu: AYAT_AL_KURSI_UR,
    romanUrdu: AYAT_AL_KURSI_ROMAN_URDU,
    reference: 'Surah Al-Baqarah 2:255 · Al-Hakim (Sahih)',
    targetCount: 1,
    virtue: 'Whoever recites it in the morning is protected from jinn until the evening.',
  },
  {
    id: 'morning-ikhlas-muawwidhat',
    category: 'Morning Adhkar',
    title: 'Three Quls: Surahs Al-Ikhlas, Al-Falaq & An-Nas',
    arabic: THREE_QULS_ARABIC,
    transliteration: THREE_QULS_TRANSLIT,
    english: THREE_QULS_EN,
    urdu: THREE_QULS_UR,
    romanUrdu: THREE_QULS_ROMAN_URDU,
    reference: 'Sunan Abi Dawud 5082 · Jami‘ at-Tirmidhi 3575',
    targetCount: 3,
    virtue: 'Reciting these three Surahs three times in the morning suffices you against all harm.',
  },
  {
    id: 'morning-asbahna-mulk',
    category: 'Morning Adhkar',
    title: 'We Have Reached Morning & Dominion Belongs to Allah',
    arabic:
      'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
    transliteration:
      "Asbahna wa asbaha al-mulku lillah, wal-hamdu lillah. La ilaha illAllahu wahdahu la sharika lahu, lahu al-mulku wa lahu al-hamdu wa Huwa 'ala kulli shay'in qadir. Rabbi as'aluka khayra ma fi hadha al-yawmi wa khayra ma ba'dahu, wa a'udhu bika min sharri ma fi hadha al-yawmi wa sharri ma ba'dah. Rabbi a'udhu bika min al-kasali wa su'i al-kibar. Rabbi a'udhu bika min 'adhabin fi al-nari wa 'adhabin fi al-qabr.",
    english:
      'We have reached the morning and at this very time all sovereignty belongs to Allah, and all praise is for Allah. None has the right to be worshipped except Allah alone without partner; to Him belongs all sovereignty and praise, and He is over all things omnipotent. My Lord, I ask You for the good of this day and the good of what follows it, and I seek refuge in You from the evil of this day and the evil of what follows it. My Lord, I seek refuge in You from laziness and senility. My Lord, I seek refuge in You from torment in the Fire and punishment in the grave.',
    urdu: 'ہم نے صبح کی اور تمام بادشاہی اللہ ہی کی ہے، اور تمام تعریف اللہ کے لیے ہے۔ اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے اور اسی کے لیے تمام تعریف ہے اور وہ ہر چیز پر قادر ہے۔ اے میرے رب! میں تجھ سے اس دن کی بھلائی اور اس کے بعد آنے والے دن کی بھلائی مانگتا ہوں، اور اس دن کے شر اور اس کے بعد آنے والے شر سے تیری پناہ مانگتا ہوں۔ اے میرے رب! میں سستی اور بڑھاپے کی خرابی سے تیری پناہ مانگتا ہوں۔ اے میرے رب! میں آگ کے عذاب اور قبر کے عذاب سے تیری پناہ مانگتا ہوں۔',
    romanUrdu:
      'Hum ne subah ki aur tamam badshahi Allah hi ki hai, aur tamam tareef Allah ke liye hai. Allah ke siwa koi mabood nahi, Woh akela hai, Us ka koi shareek nahi, Usi ki badshahi hai aur Usi ke liye tamam tareef hai aur Woh har cheez par qadir hai. Aye mere Rab! Main Tujh se is din ki bhalai aur is ke baad aane wale din ki bhalai mangta hoon, aur is din ke shar aur is ke baad aane wale shar se Teri panah mangta hoon. Aye mere Rab! Main susti aur budhape ki kharabi se Teri panah mangta hoon. Aye mere Rab! Main aag ke azaab aur qabr ke azaab se Teri panah mangta hoon.',
    reference: 'Sahih Muslim 2723',
    targetCount: 1,
    virtue: 'Comprehensive morning pledge entrusting your day to Allah.',
  },
  {
    id: 'morning-bika-asbahna',
    category: 'Morning Adhkar',
    title: 'By You We Enter the Morning & Unto You Is Resurrection',
    arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
    transliteration:
      'Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namut, wa ilayka al-nushur.',
    english:
      'O Allah, by Your leave we have reached the morning, and by Your leave we reach the evening, by Your leave we live and die, and unto You is our resurrection.',
    urdu: 'اے اللہ! تیری ہی قدرت سے ہم نے صبح کی اور تیری ہی قدرت سے ہم شام کرتے ہیں، تیری ہی طرف سے ہم زندہ رہتے ہیں اور تیری ہی طرف سے ہمیں موت آتی ہے، اور تیری ہی طرف لوٹ کر جانا ہے۔',
    romanUrdu:
      'Aye Allah! Teri hi qudrat se hum ne subah ki aur Teri hi qudrat se hum shaam karte hain, Teri hi taraf se hum zinda rehte hain aur Teri hi taraf se humein maut aati hai, aur Teri hi taraf uth kar jana hai.',
    reference: 'Jami‘ at-Tirmidhi 3391 · Sunan Abi Dawud 5068',
    targetCount: 1,
  },
  {
    id: 'morning-sayyid-istighfar',
    category: 'Morning Adhkar',
    title: 'Sayyid al-Istighfar (Master Supplication for Forgiveness)',
    arabic:
      'اللَّهُمَّ أَنتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنتَ',
    transliteration:
      "Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika ma istata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bi-ni'matika 'alayya, wa abu'u bi-dhanbi faghfir li fa-innahu la yaghfiru al-dhunuba illa Anta.",
    english:
      'O Allah, You are my Lord; none has the right to be worshipped except You. You created me and I am Your servant, and I abide to Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me and I acknowledge my sin, so forgive me, for verily none can forgive sins except You.',
    urdu: 'اے اللہ! تو میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں، اور میں اپنی طاقت کے مطابق تیرے عہد اور وعدے پر قائم ہوں۔ میں اپنے برے اعمال کے شر سے تیری پناہ مانگتا ہوں، تجھ پر اپنی نعمتوں کا اقرار کرتا ہوں اور اپنے گناہوں کا اعتراف کرتا ہوں، پس مجھے بخش دے کیونکہ تیرے سوا گناہ کوئی معاف نہیں کر سکتا۔',
    romanUrdu:
      'Aye Allah! Tu mera Rab hai, Tere siwa koi mabood nahi, Tu ne mujhe paida kiya aur main Tera banda hoon, aur main apni taqat ke mutabiq Tere ahad aur wade par qaim hoon. Main apne bure amaal ke shar se Teri panah mangta hoon, Tujh par apni naimaton ka iqrar karta hoon aur apne gunahon ka itiraf karta hoon, pas mujhe bakhsh de kyunki Tere siwa gunah koi maaf nahi kar sakta.',
    reference: 'Sahih al-Bukhari 6306',
    targetCount: 1,
    virtue: 'Whoever recites it with conviction in the morning and dies that day enters Paradise.',
  },
  {
    id: 'morning-bismillah-la-yadurru',
    category: 'Morning Adhkar',
    title: 'In Whose Name Nothing Causes Harm',
    arabic:
      'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration:
      "Bismillahi alladhi la yadurru ma'a ismihi shay'un fi al-ardi wa la fi al-sama'i wa Huwa al-Sami'u al-'Alim.",
    english:
      'In the name of Allah with whose name nothing is harmed on earth nor in the heavens, and He is the All-Hearing, the All-Knowing.',
    urdu: 'اس اللہ کے نام سے جس کے نام کے ساتھ زمین و آسمان کی کوئی چیز نقصان نہیں پہنچا سکتی اور وہ خوب سننے والا، سب کچھ جاننے والا ہے۔',
    romanUrdu:
      'Us Allah ke naam se jis ke naam ke sath zameen o aasman ki koi cheez nuqsan nahi pohncha sakti aur Woh khoob sunne wala, sab kuch janne wala hai.',
    reference: 'Sunan Abi Dawud 5088',
    targetCount: 3,
    virtue: 'Nothing will suddenly harm the one who recites it three times each morning.',
  },
  {
    id: 'morning-afini-fi-badani',
    category: 'Morning Adhkar',
    title: 'Grant Health to My Body, Hearing & Sight',
    arabic:
      'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنتَ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَٰهَ إِلَّا أَنتَ',
    transliteration:
      "Allahumma 'afini fi badani, Allahumma 'afini fi sam'i, Allahumma 'afini fi basari, la ilaha illa Anta. Allahumma inni a'udhu bika min al-kufri wal-faqr, wa a'udhu bika min 'adhabi al-qabr, la ilaha illa Anta.",
    english:
      'O Allah, grant health to my body. O Allah, grant health to my hearing. O Allah, grant health to my sight. None has the right to be worshipped except You. O Allah, I seek refuge in You from disbelief and poverty, and I seek refuge in You from the punishment of the grave. None has the right to be worshipped except You.',
    urdu: 'اے اللہ! میرے بدن میں عافیت عطا فرما، اے اللہ! میری سماعت میں عافیت عطا فرما، اے اللہ! میری بصارت میں عافیت عطا فرما، تیرے سوا کوئی معبود نہیں۔ اے اللہ! میں کفر اور فقر سے تیری پناہ مانگتا ہوں، اور قبر کے عذاب سے تیری پناہ مانگتا ہوں، تیرے سوا کوئی معبود نہیں۔',
    romanUrdu:
      'Aye Allah! Mere badan mein aafiyat ata farma, Aye Allah! Meri samaat mein aafiyat ata farma, Aye Allah! Meri basarat mein aafiyat ata farma, Tere siwa koi mabood nahi. Aye Allah! Main kufr aur faqr se Teri panah mangta hoon, aur qabr ke azaab se Teri panah mangta hoon, Tere siwa koi mabood nahi.',
    reference: 'Sunan Abi Dawud 5090',
    targetCount: 3,
  },
  {
    id: 'morning-subhanallahi-adada',
    category: 'Morning Adhkar',
    title: 'Tasbih Weighted by All Creation (Juwayriyyah’s Dhikr)',
    arabic:
      'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ',
    transliteration:
      "SubhanAllahi wa bi-hamdihi, 'adada khalqihi, wa rida nafsihi, wa zinata 'arshihi, wa midada kalimatih.",
    english:
      'Glory be to Allah and praise Him, by the multitude of His creation, by His pleasure, by the weight of His Throne, and by the ink of His words.',
    urdu: 'اللہ پاک ہے اور اسی کے لیے تمام تعریف ہے، اس کی مخلوق کی تعداد کے برابر، اس کی رضا کے مطابق، اس کے عرش کے وزن کے برابر اور اس کے کلمات کی روشنائی کے برابر۔',
    romanUrdu:
      'Allah paak hai aur Usi ke liye tamam tareef hai, Us ki makhlooq ki tadaad ke barabar, Us ki raza ke mutabiq, Us ke Arsh ke wazan ke barabar aur Us ke kalimaat ki roshnai ke barabar.',
    reference: 'Sahih Muslim 2726',
    targetCount: 3,
    virtue: 'Three recitations outweigh hours of morning remembrance.',
  },
  {
    id: 'morning-fitrah-islam',
    category: 'Morning Adhkar',
    title: 'Upon the Natural State of Islam & Sincerity',
    arabic:
      'أَصْبَحْنَا عَلَىٰ فِطْرَةِ الْإِسْلَامِ وَعَلَىٰ كَلِمَةِ الْإِخْلَاصِ، وَعَلَىٰ دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَعَلَىٰ مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ',
    transliteration:
      "Asbahna 'ala fitrati al-Islami wa 'ala kalimati al-ikhlas, wa 'ala dini nabiyyina Muhammadin sallAllahu 'alayhi wa sallam, wa 'ala millati abina Ibrahima hanifan musliman wa ma kana min al-mushrikin.",
    english:
      'We have entered the morning upon the natural constitution of Islam, upon the word of pure faith, upon the religion of our Prophet Muhammad (ﷺ), and upon the way of our forefather Ibrahim, upright and Muslim, and he was not of the polytheists.',
    urdu: 'ہم نے اسلام کی فطرت، کلمۂ اخلاص، اپنے نبی محمد (ﷺ) کے دین اور اپنے باپ ابراہیم (علیہ السلام) کے ملت پر صبح کی جو یکسو مسلمان تھے اور مشرکوں میں سے نہ تھے۔',
    romanUrdu:
      'Hum ne Islam ki fitrat, kalima-e-ikhlas, apne Nabi Muhammad (ﷺ) ke deen aur apne baap Ibrahim (Alaihis Salam) ki millat par subah ki jo yaksoo Musalman the aur mushrikon mein se na the.',
    reference: 'Musnad Ahmad 15360',
    targetCount: 1,
  },
  {
    id: 'morning-hasbi-allah',
    category: 'Morning Adhkar',
    title: 'Sufficient for Me Is Allah (HasbiyAllahu)',
    arabic:
      'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ ۖ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
    transliteration:
      "HasbiyAllahu la ilaha illa Huwa, 'alayhi tawakkaltu, wa Huwa Rabbu al-'Arshi al-'Azim.",
    english:
      'Sufficient for me is Allah; there is no deity except Him. On Him I have relied, and He is the Lord of the Great Throne.',
    urdu: 'میرے لیے اللہ کافی ہے، اس کے سوا کوئی معبود نہیں، میں نے اسی پر بھروسا کیا اور وہ عرشِ عظیم کا مالک ہے۔',
    romanUrdu:
      'Mere liye Allah kafi hai, Us ke siwa koi mabood nahi, maine Usi par bharosa kiya aur Woh Arsh-e-Azim ka malik hai.',
    reference: 'Surah At-Tawbah 9:129 · Sunan Abi Dawud 5081',
    targetCount: 7,
    virtue: 'Reciting it seven times relieves worries of this world and the Hereafter.',
  },

  // Evening Adhkar
  {
    id: 'evening-three-quls',
    category: 'Evening Adhkar',
    title: 'Three Quls: Surahs Al-Ikhlas, Al-Falaq & An-Nas',
    arabic: THREE_QULS_ARABIC,
    transliteration: THREE_QULS_TRANSLIT,
    english: THREE_QULS_EN,
    urdu: THREE_QULS_UR,
    romanUrdu: THREE_QULS_ROMAN_URDU,
    reference: 'Sunan Abi Dawud 5082 · Jami‘ at-Tirmidhi 3575',
    targetCount: 3,
    virtue: 'Recite three times in the evening for protection throughout the entire night.',
  },
  {
    id: 'evening-amsayna-mulk',
    category: 'Evening Adhkar',
    title: 'We Have Reached Evening & Sovereignty Belongs to Allah',
    arabic:
      'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
    transliteration:
      "Amsayna wa amsa al-mulku lillah, wal-hamdu lillah. La ilaha illAllahu wahdahu la sharika lahu, lahu al-mulku wa lahu al-hamdu wa Huwa 'ala kulli shay'in qadir. Rabbi as'aluka khayra ma fi hadhihi al-laylati wa khayra ma ba'daha, wa a'udhu bika min sharri ma fi hadhihi al-laylati wa sharri ma ba'daha. Rabbi a'udhu bika min al-kasali wa su'i al-kibar. Rabbi a'udhu bika min 'adhabin fi al-nari wa 'adhabin fi al-qabr.",
    english:
      'We have reached the evening and at this very time all sovereignty belongs to Allah, and all praise is for Allah. None has the right to be worshipped except Allah alone without partner; to Him belongs all sovereignty and praise, and He is over all things omnipotent. My Lord, I ask You for the good of this night and the good of what follows it, and I seek refuge in You from the evil of this night and the evil of what follows it. My Lord, I seek refuge in You from laziness and senility. My Lord, I seek refuge in You from torment in the Fire and punishment in the grave.',
    urdu: 'ہم نے شام کی اور تمام بادشاہی اللہ ہی کی ہے، اور تمام تعریف اللہ کے لیے ہے۔ اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے اور اسی کے لیے تمام تعریف ہے اور وہ ہر چیز پر قادر ہے۔ اے میرے رب! میں تجھ سے اس رات کی بھلائی اور اس کے بعد آنے والی رات کی بھلائی مانگتا ہوں، اور اس رات کے شر اور اس کے بعد آنے والے شر سے تیری پناہ مانگتا ہوں۔ اے میرے رب! میں سستی اور بڑھاپے کی خرابی سے تیری پناہ مانگتا ہوں، اور آگ کے عذاب اور قبر کے عذاب سے تیری پناہ مانگتا ہوں۔',
    romanUrdu:
      'Hum ne shaam ki aur tamam badshahi Allah hi ki hai, aur tamam tareef Allah ke liye hai. Allah ke siwa koi mabood nahi, Woh akela hai, Us ka koi shareek nahi, Usi ki badshahi hai aur Usi ke liye tamam tareef hai aur Woh har cheez par qadir hai. Aye mere Rab! Main Tujh se is raat ki bhalai aur is ke baad aane wali raat ki bhalai mangta hoon, aur is raat ke shar aur is ke baad aane wale shar se Teri panah mangta hoon. Aye mere Rab! Main susti aur budhape ki kharabi se Teri panah mangta hoon, aur aag ke azaab aur qabr ke azaab se Teri panah mangta hoon.',
    reference: 'Sahih Muslim 2723',
    targetCount: 1,
  },
  {
    id: 'evening-bika-amsayna',
    category: 'Evening Adhkar',
    title: 'By You We Enter the Evening & Unto You Is the Return',
    arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
    transliteration:
      'Allahumma bika amsayna, wa bika asbahna, wa bika nahya, wa bika namut, wa ilayka al-masir.',
    english:
      'O Allah, by Your leave we have reached the evening, and by Your leave we reach the morning, by Your leave we live and die, and unto You is our final return.',
    urdu: 'اے اللہ! تیری ہی قدرت سے ہم نے شام کی اور تیری ہی قدرت سے ہم صبح کرتے ہیں، تیری ہی طرف سے ہم زندہ رہتے ہیں اور تیری ہی طرف سے ہمیں موت آتی ہے، اور تیری ہی طرف لوٹ کر جانا ہے۔',
    romanUrdu:
      'Aye Allah! Teri hi qudrat se hum ne shaam ki aur Teri hi qudrat se hum subah karte hain, Teri hi taraf se hum zinda rehte hain aur Teri hi taraf se humein maut aati hai, aur Teri hi taraf laut kar jana hai.',
    reference: 'Jami‘ at-Tirmidhi 3391',
    targetCount: 1,
  },
  {
    id: 'evening-kalimat-tammat',
    category: 'Evening Adhkar',
    title: 'Protection with the Perfect Words of Allah',
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    transliteration: "A'udhu bi-kalimati Allahi al-tammati min sharri ma khalaq.",
    english:
      'I seek refuge in the perfect words of Allah from the evil of that which He has created.',
    urdu: 'میں اللہ کے مکمل کلمات کی پناہ مانگتا ہوں ہر اس چیز کے شر سے جو اس نے پیدا کی ہے۔',
    romanUrdu:
      'Main Allah ke mukammal kalimaat ki panah mangta hoon har us cheez ke shar se jo Us ne paida ki hai.',
    reference: 'Sahih Muslim 2708',
    targetCount: 3,
    virtue: 'Reciting it three times in the evening protects from venomous harm and evil.',
  },
  {
    id: 'evening-raditu-billah',
    category: 'Evening Adhkar',
    title: 'Pleased with Allah, Islam & Muhammad (ﷺ)',
    arabic: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    transliteration:
      "Raditu billahi Rabban, wa bil-Islami dinan, wa bi-Muhammadin sallAllahu 'alayhi wa sallama nabiyya.",
    english:
      'I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (ﷺ) as my Prophet.',
    urdu: 'میں اللہ کو رب، اسلام کو دین اور محمد (ﷺ) کو نبی مان کر راضی ہوا۔',
    romanUrdu:
      'Main Allah ko Rab, Islam ko deen aur Muhammad (ﷺ) ko Nabi maan kar razi hua.',
    reference: 'Musnad Ahmad 18967',
    targetCount: 3,
    virtue: 'Allah promises to please on the Day of Judgment whoever recites this 3 times morning and evening.',
  },
  {
    id: 'evening-ya-hayyu-qayyum',
    category: 'Evening Adhkar',
    title: 'In Your Mercy I Seek Relief (Evening)',
    arabic:
      'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَىٰ نَفْسِي طَرْفَةَ عَيْنٍ',
    transliteration:
      "Ya Hayyu Ya Qayyum bi-rahmatika astaghith, aslih li sha'ni kullahu wa la takilni ila nafsi tarfata 'ayn.",
    english:
      'O Ever-Living, O Sustainer of all, in Your mercy I seek relief! Rectify all of my affairs and do not leave me to myself even for the blink of an eye.',
    urdu: 'اے زندہ و جاوید! اے سب کو قائم رکھنے والے! تیری ہی رحمت کے وسیلے سے مدد چاہتا ہوں، میرے تمام معاملات درست فرما دے اور آنکھ جھپکنے کے برابر بھی مجھے میرے نفس کے حوالے نہ فرما۔',
    romanUrdu:
      'Aye Zinda o Javed! Aye sab ko qaim rakhne wale! Teri hi rehmat ke waseele se madad chahta hoon, mere tamam muamlaat durust farma de aur aankh jhapakne ke barabar bhi mujhe mere nafs ke hawale na farma.',
    reference: 'Sunan an-Nasa’i al-Kubra 10405',
    targetCount: 1,
  },

  // Post-Salah Adhkar
  {
    id: 'salah-istighfar-salam',
    category: 'Post-Salah Adhkar',
    title: 'Istighfar & Allahumma Antas-Salam (Immediately After Salam)',
    arabic:
      'أَسْتَغْفِرُ اللَّهَ (ثَلَاثًا) ۝ اللَّهُمَّ أَنتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    transliteration:
      'Astaghfirullah (3x). Allahumma Anta al-Salamu wa minka al-Salam, tabarakta ya Dha al-Jalali wal-Ikram.',
    english:
      'I seek forgiveness from Allah (three times). O Allah, You are Peace and from You comes peace. Blessed are You, O Possessor of Majesty and Honor.',
    urdu: 'میں اللہ سے بخشش مانگتا ہوں (تین بار)۔ اے اللہ! تو سلامتی والا ہے اور تیری ہی طرف سے سلامتی ہے، تو بابرکت ہے اے جلال اور اکرام کے مالک۔',
    romanUrdu:
      'Main Allah se bakhshish mangta hoon (3 baar). Aye Allah! Tu salamti wala hai aur Teri hi taraf se salamti hai, Tu ba-barkat hai aye jalal aur ikram ke malik.',
    reference: 'Sahih Muslim 591',
    targetCount: 1,
  },
  {
    id: 'salah-ayat-kursi',
    category: 'Post-Salah Adhkar',
    title: 'Ayat al-Kursi After Every Obligatory Prayer',
    arabic: AYAT_AL_KURSI_ARABIC,
    transliteration: AYAT_AL_KURSI_TRANSLIT,
    english: AYAT_AL_KURSI_EN,
    urdu: AYAT_AL_KURSI_UR,
    romanUrdu: AYAT_AL_KURSI_ROMAN_URDU,
    reference: 'Surah Al-Baqarah 2:255 · Sunan an-Nasa’i al-Kubra 9928',
    targetCount: 1,
    virtue: 'Nothing stands between the reciter and Paradise except death.',
  },
  {
    id: 'salah-tasbih-33',
    category: 'Post-Salah Adhkar',
    title: 'SubhanAllah (Glory Be to Allah)',
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'SubhanAllah',
    english: 'Glory be to Allah.',
    urdu: 'اللہ تمام عیبوں سے پاک ہے۔',
    romanUrdu: 'Allah tamam aibon se paak hai.',
    reference: 'Sahih Muslim 597',
    targetCount: 33,
  },
  {
    id: 'salah-tahmid-33',
    category: 'Post-Salah Adhkar',
    title: 'Alhamdulillah (All Praise Is for Allah)',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alhamdulillah',
    english: 'All praise is for Allah.',
    urdu: 'تمام تعریفیں اللہ ہی کے لیے ہیں۔',
    romanUrdu: 'Tamam tareefein Allah hi ke liye hain.',
    reference: 'Sahih Muslim 597',
    targetCount: 33,
  },
  {
    id: 'salah-takbir-33',
    category: 'Post-Salah Adhkar',
    title: 'Allahu Akbar (Allah Is the Greatest)',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    english: 'Allah is the Greatest.',
    urdu: 'اللہ سب سے بڑا ہے۔',
    romanUrdu: 'Allah sab se bada hai.',
    reference: 'Sahih Muslim 597',
    targetCount: 33,
  },
  {
    id: 'salah-tahlil-100th',
    category: 'Post-Salah Adhkar',
    title: 'Completing the Hundredth Count After Salah',
    arabic:
      'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration:
      "La ilaha illAllahu wahdahu la sharika lahu, lahu al-mulku wa lahu al-hamdu wa Huwa 'ala kulli shay'in qadir.",
    english:
      'None has the right to be worshipped except Allah alone without partner; to Him belongs all sovereignty and praise, and He is over all things omnipotent.',
    urdu: 'اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے اور اسی کے لیے تمام تعریف ہے اور وہ ہر چیز پر قادر ہے۔',
    romanUrdu:
      'Allah ke siwa koi mabood nahi, Woh akela hai, Us ka koi shareek nahi, Usi ki badshahi hai aur Usi ke liye tamam tareef hai aur Woh har cheez par qadir hai.',
    reference: 'Sahih Muslim 597',
    targetCount: 1,
    virtue: 'Completes the 33-33-33-1 formula so sins are forgiven even if like the foam of the sea.',
  },
  {
    id: 'salah-aini-ala-dhikrika',
    category: 'Post-Salah Adhkar',
    title: 'Help Me Remember, Thank & Worship You Well',
    arabic: 'اللَّهُمَّ أَعِنِّي عَلَىٰ ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ',
    transliteration: "Allahumma a'inni 'ala dhikrika, wa shukrika, wa husni 'ibadatik.",
    english:
      'O Allah, help me to remember You, to thank You, and to worship You in the best manner.',
    urdu: 'اے اللہ! اپنے ذکر، اپنے شکر اور اپنی بہترین عبادت پر میری مدد فرما۔',
    romanUrdu:
      'Aye Allah! Apne zikr, apne shukr aur apni behtareen ibadat par meri madad farma.',
    reference: 'Sunan Abi Dawud 1522',
    targetCount: 1,
  },

  // Sleeping & Waking
  {
    id: 'sleep-baqarah-last-two',
    category: 'Sleeping & Waking',
    title: 'Last Two Ayahs of Surah Al-Baqarah (2:285–286)',
    arabic:
      'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ ۝ لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
    transliteration:
      "Amana al-Rasulu bima unzila ilayhi min Rabbihi wal-mu'minun. Kullun amana billahi wa mala'ikatihi wa kutubihi wa rusulihi la nufarriqu bayna ahadin min rusulih. Wa qalu sami'na wa ata'na ghufranaka Rabbana wa ilayka al-masir. La yukallifu Allahu nafsan illa wus'aha. Laha ma kasabat wa 'alayha ma iktasabat. Rabbana la tu'akhidhna in nasina aw akhta'na. Rabbana wa la tahmil 'alayna isran kama hamaltahu 'ala alladhina min qablina. Rabbana wa la tuhammilna ma la taqata lana bih. Wa'fu 'anna waghfir lana warhamna Anta Mawlana fansurna 'ala al-qawmi al-kafirin.",
    english:
      'The Messenger has believed in what was revealed to him from his Lord, and so have the believers. All of them have believed in Allah and His angels and His books and His messengers, saying, "We make no distinction between any of His messengers." And they say, "We hear and we obey. We seek Your forgiveness, our Lord, and to You is the final destination." Allah does not charge a soul except with that within its capacity. It will have the consequence of what good it has gained, and it will bear the consequence of what evil it has earned. "Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people."',
    urdu: 'رسول (ﷺ) اس پر ایمان لائے جو ان کے رب کی طرف سے ان پر نازل کیا گیا اور مومن بھی ایمان لائے۔ سب ایمان لائے اللہ پر، اس کے فرشتوں پر، اس کی کتابوں پر اور اس کے رسولوں پر، (اور کہتے ہیں) ہم اس کے رسولوں میں سے کسی کے درمیان تفریق نہیں کرتے۔ اور انہوں نے کہا: ہم نے سنا اور اطاعت کی، اے ہمارے رب! ہم تیری بخشش چاہتے ہیں اور تیری ہی طرف لوٹ کر جانا ہے۔ اللہ کسی جان کو اس کی وسعت سے زیادہ تکلیف نہیں دیتا؛ اس نے جو نیکی کمائی وہ اس کے لیے ہے اور جو برائی کمائی وہ اسی پر ہے۔ اے ہمارے رب! اگر ہم بھول جائیں یا خطا کر بیٹھیں تو ہماری گرفت نہ فرما۔ اے ہمارے رب! ہم پر وہ بوجھ نہ ڈال جیسا تو نے ہم سے پہلے لوگوں پر ڈالا تھا۔ اے ہمارے رب! ہم سے وہ بوجھ نہ اٹھوا جس کی ہم میں طاقت نہ ہو۔ اور ہم سے درگزر فرما، ہمیں بخش دے اور ہم پر رحم فرما۔ تو ہی ہمارا مولا ہے، پس کافر قوم کے مقابلے میں ہماری مدد فرما۔',
    romanUrdu:
      'Rasool (ﷺ) us par iman laye jo un ke Rab ki taraf se un par nazil kiya gaya aur momin bhi iman laye. Sab iman laye Allah par, Us ke farishton par, Us ki kitabon par aur Us ke rasoolon par, (aur kehte hain) hum Us ke rasoolon mein se kisi ke darmiyan tafreeq nahi karte. Aur unhon ne kaha: Hum ne suna aur itaat ki, aye hamare Rab! Hum Teri bakhshish chahte hain aur Teri hi taraf laut kar jana hai. Allah kisi jaan ko us ki wusat se zyada takleef nahi deta; us ne jo neki kamai woh us ke liye hai aur jo burai kamai woh usi par hai. Aye hamare Rab! Agar hum bhool jayein ya khata kar baithein to hamari girift na farma. Aye hamare Rab! Hum par woh bojh na daal jaisa Tu ne hum se pehle logon par dala tha. Aye hamare Rab! Hum se woh bojh na uthwa jis ki hum mein taqat na ho. Aur hum se darguzar farma, humein bakhsh de aur hum par reham farma. Tu hi hamara Maula hai, pas kafir qaum ke muqabale mein hamari madad farma.',
    reference: 'Surah Al-Baqarah 2:285–286 · Sahih al-Bukhari 5009',
    targetCount: 1,
    virtue: 'Whoever recites these two verses at night, they will suffice him against all harm.',
  },
  {
    id: 'sleep-ayat-kursi',
    category: 'Sleeping & Waking',
    title: 'Ayat al-Kursi Before Going to Sleep',
    arabic: AYAT_AL_KURSI_ARABIC,
    transliteration: AYAT_AL_KURSI_TRANSLIT,
    english: AYAT_AL_KURSI_EN,
    urdu: AYAT_AL_KURSI_UR,
    romanUrdu: AYAT_AL_KURSI_ROMAN_URDU,
    reference: 'Surah Al-Baqarah 2:255 · Sahih al-Bukhari 2311',
    targetCount: 1,
    virtue: 'A guardian angel remains beside you until morning and Shaytan cannot come near.',
  },
  {
    id: 'sleep-bismika-amut',
    category: 'Sleeping & Waking',
    title: 'In Your Name I Die and Live (Sleeping Dua)',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: 'Bismika Allahumma amutu wa ahya.',
    english: 'In Your name, O Allah, I die and I live.',
    urdu: 'اے اللہ! تیرے ہی نام کے ساتھ میں مرتا ہوں (سوتا ہوں) اور زندہ ہوتا ہوں۔',
    romanUrdu: 'Aye Allah! Tere hi naam ke sath main marta hoon (sota hoon) aur zinda hota hoon.',
    reference: 'Sahih al-Bukhari 6324',
    targetCount: 1,
  },
  {
    id: 'sleep-qini-adhabaka',
    category: 'Sleeping & Waking',
    title: 'Protect Me from Your Punishment on Resurrection Day',
    arabic: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
    transliteration: "Allahumma qini 'adhabaka yawma tab'athu 'ibadak.",
    english:
      'O Allah, protect me from Your punishment on the Day You resurrect Your servants.',
    urdu: 'اے اللہ! مجھے اپنے عذاب سے بچا لینا جس دن تو اپنے بندوں کو اٹھائے گا۔',
    romanUrdu: 'Aye Allah! Mujhe apne azaab se bacha lena jis din Tu apne bandon ko uthayega.',
    reference: 'Sunan Abi Dawud 5045 · Jami‘ at-Tirmidhi 3398',
    targetCount: 3,
  },
  {
    id: 'wake-alhamdulillah',
    category: 'Sleeping & Waking',
    title: 'Praise Allah Upon Waking Up',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: 'Alhamdulillahi alladhi ahyana ba‘da ma amatana wa ilayhi al-nushur.',
    english:
      'All praise is for Allah who gave us life after causing us to die, and unto Him is the resurrection.',
    urdu: 'تمام تعریفیں اللہ کے لیے ہیں جس نے ہمیں موت (نیند) کے بعد زندگی دی اور اسی کی طرف لوٹ کر جانا ہے۔',
    romanUrdu:
      'Tamam tareefein Allah ke liye hain jis ne humein maut (neend) ke baad zindagi di aur Usi ki taraf laut kar jana hai.',
    reference: 'Sahih al-Bukhari 6312',
    targetCount: 1,
  },

  // Istighfar & Repentance
  {
    id: 'istighfar-short',
    category: 'Istighfar & Repentance',
    title: 'Frequent Istighfar (100x Daily Sunnah)',
    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfirullaha wa atubu ilayh.',
    english: 'I seek the forgiveness of Allah and repent to Him.',
    urdu: 'میں اللہ سے بخشش مانگتا ہوں اور اسی کی طرف توبہ کرتا ہوں۔',
    romanUrdu: 'Main Allah se bakhshish mangta hoon aur Usi ki taraf tauba karta hoon.',
    reference: 'Sahih al-Bukhari 6307 & Sahih Muslim 2702',
    targetCount: 100,
    virtue: 'The Prophet (ﷺ) sought Allah’s forgiveness over seventy times every day.',
  },
  {
    id: 'istighfar-great',
    category: 'Istighfar & Repentance',
    title: 'Astaghfirullah al-‘Azim',
    arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ',
    transliteration:
      "Astaghfirullaha al-'Azima alladhi la ilaha illa Huwa al-Hayyu al-Qayyumu wa atubu ilayh.",
    english:
      'I seek forgiveness from Allah the Almighty, none has the right to be worshipped except Him, the Ever-Living, the Sustainer of all, and I repent to Him.',
    urdu: 'میں عظمت والے اللہ سے بخشش مانگتا ہوں جس کے سوا کوئی معبود نہیں، وہ ہمیشہ زندہ اور سب کو تھامنے والا ہے، اور میں اس کے حضور توبہ کرتا ہوں۔',
    romanUrdu:
      'Main azmat wale Allah se bakhshish mangta hoon jis ke siwa koi mabood nahi, Woh hamesha zinda aur sab ko thamne wala hai, aur main Us ke huzoor tauba karta hoon.',
    reference: 'Sunan Abi Dawud 1517 · Jami‘ at-Tirmidhi 3577',
    targetCount: 3,
    virtue: 'Forgives sins even of one who fled the battlefield.',
  },
  {
    id: 'istighfar-yunus',
    category: 'Istighfar & Repentance',
    title: 'Supplication of Prophet Yunus (عليه السلام)',
    arabic: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    transliteration: 'La ilaha illa Anta subhanaka inni kuntu min al-zalimin.',
    english:
      'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    urdu: 'تیرے سوا کوئی معبود نہیں، تو پاک ہے، بے شک میں ہی قصورواروں میں سے تھا۔',
    romanUrdu: 'Tere siwa koi mabood nahi, Tu paak hai, beshak main hi qusoorwaron mein se tha.',
    reference: 'Surah Al-Anbiya 21:87 · Jami‘ at-Tirmidhi 3505',
    targetCount: 33,
    virtue: 'No Muslim calls upon Allah with these words except that Allah answers.',
  },

  // Durood & Salawat
  {
    id: 'durood-ibrahimi',
    category: 'Durood & Salawat',
    title: 'Durood Ibrahimi (Full Salawat from Salah)',
    arabic:
      'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    transliteration:
      "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammadin kama sallayta 'ala Ibrahima wa 'ala ali Ibrahima innaka Hamidun Majid. Allahumma barik 'ala Muhammadin wa 'ala ali Muhammadin kama barakta 'ala Ibrahima wa 'ala ali Ibrahima innaka Hamidun Majid.",
    english:
      'O Allah, send prayers upon Muhammad and upon the family of Muhammad, as You sent prayers upon Ibrahim and upon the family of Ibrahim; indeed You are Praiseworthy and Glorious. O Allah, bless Muhammad and the family of Muhammad, as You blessed Ibrahim and the family of Ibrahim; indeed You are Praiseworthy and Glorious.',
    urdu: 'اے اللہ! محمد (ﷺ) پر اور آلِ محمد پر رحمت نازل فرما جیسا کہ تو نے ابراہیم (علیہ السلام) اور آلِ ابراہیم پر رحمت نازل فرمائی، بے شک تو تعریف کے لائق اور بزرگی والا ہے۔ اے اللہ! محمد (ﷺ) پر اور آلِ محمد پر برکت نازل فرما جیسا کہ تو نے ابراہیم (علیہ السلام) اور آلِ ابراہیم پر برکت نازل فرمائی، بے شک تو تعریف کے لائق اور بزرگی والا ہے۔',
    romanUrdu:
      'Aye Allah! Muhammad (ﷺ) par aur Aal-e-Muhammad par rehmat nazil farma jaisa ke Tu ne Ibrahim (Alaihis Salam) aur Aal-e-Ibrahim par rehmat nazil farmai, beshak Tu tareef ke laiq aur buzurgi wala hai. Aye Allah! Muhammad (ﷺ) par aur Aal-e-Muhammad par barkat nazil farma jaisa ke Tu ne Ibrahim (Alaihis Salam) aur Aal-e-Ibrahim par barkat nazil farmai, beshak Tu tareef ke laiq aur buzurgi wala hai.',
    reference: 'Sahih al-Bukhari 3370',
    targetCount: 10,
    virtue: 'Whoever sends blessings upon the Prophet (ﷺ) once, Allah sends ten upon him.',
  },
  {
    id: 'durood-concise',
    category: 'Durood & Salawat',
    title: 'Concise Salawat Upon the Messenger of Allah (ﷺ)',
    arabic: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَىٰ نَبِيِّنَا مُحَمَّدٍ',
    transliteration: "Allahumma salli wa sallim 'ala nabiyyina Muhammad.",
    english: 'O Allah, send peace and blessings upon our Prophet Muhammad.',
    urdu: 'اے اللہ! ہمارے نبی محمد (ﷺ) پر درود و سلام نازل فرما۔',
    romanUrdu: 'Aye Allah! Hamare Nabi Muhammad (ﷺ) par durood o salam nazil farma.',
    reference: 'Sahih Muslim 408',
    targetCount: 10,
  },

  // Tasbih, Tahmid, Tahlil & Takbir
  {
    id: 'tasbih-subhanallahi-wabihamdihi',
    category: 'Tasbih, Tahmid, Tahlil & Takbir',
    title: 'SubhanAllahi wa Bihamdihi (100x Daily)',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    transliteration: 'SubhanAllahi wa bi-hamdihi.',
    english: 'Glory be to Allah and praise be to Him.',
    urdu: 'اللہ پاک ہے اور تمام تعریفیں اسی کے لیے ہیں۔',
    romanUrdu: 'Allah paak hai aur tamam tareefein Usi ke liye hain.',
    reference: 'Sahih al-Bukhari 6405',
    targetCount: 100,
    virtue: 'Whoever says this 100 times a day has sins forgiven even if like the foam of the sea.',
  },
  {
    id: 'tasbih-heavy-scales',
    category: 'Tasbih, Tahmid, Tahlil & Takbir',
    title: 'Two Words Beloved to Ar-Rahman, Heavy on the Scales',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
    transliteration: "SubhanAllahi wa bi-hamdihi, SubhanAllahi al-'Azim.",
    english: 'Glory be to Allah and praise Him; Glory be to Allah, the Supreme.',
    urdu: 'اللہ پاک ہے اپنی حمد کے ساتھ، اللہ پاک ہے جو بہت عظمت والا ہے۔',
    romanUrdu: 'Allah paak hai apni hamd ke sath, Allah paak hai jo bohat azmat wala hai.',
    reference: 'Sahih al-Bukhari 6406',
    targetCount: 33,
    virtue: 'Light on the tongue, heavy on the Scale of Deeds, beloved to the Most Merciful.',
  },
  {
    id: 'tasbih-kalimat-arba',
    category: 'Tasbih, Tahmid, Tahlil & Takbir',
    title: 'The Four Beloved Words of Remembrance',
    arabic: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَٰهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ',
    transliteration: 'SubhanAllah, wal-Hamdulillah, wa La ilaha illAllah, wallahu Akbar.',
    english:
      'Glory be to Allah, all praise is for Allah, there is no deity worthy of worship except Allah, and Allah is the Greatest.',
    urdu: 'اللہ پاک ہے، تمام تعریف اللہ کے لیے ہے، اللہ کے سوا کوئی معبود نہیں، اور اللہ سب سے بڑا ہے۔',
    romanUrdu:
      'Allah paak hai, tamam tareef Allah ke liye hai, Allah ke siwa koi mabood nahi, aur Allah sab se bada hai.',
    reference: 'Sahih Muslim 2695',
    targetCount: 33,
    virtue: 'Dearer to the Messenger of Allah (ﷺ) than everything upon which the sun rises.',
  },
  {
    id: 'tasbih-kanz-jannah',
    category: 'Tasbih, Tahmid, Tahlil & Takbir',
    title: 'A Treasure from the Treasures of Paradise',
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'La hawla wa la quwwata illa billah.',
    english: 'There is no might nor power except through Allah.',
    urdu: 'نیکی کرنے کی طاقت اور گناہ سے بچنے کی قوت صرف اللہ ہی کی توفیق سے ہے۔',
    romanUrdu:
      'Neki karne ki taqat aur gunah se bachne ki quwwat sirf Allah hi ki taufeeq se hai.',
    reference: 'Sahih al-Bukhari 4205',
    targetCount: 33,
    virtue: 'One of the treasures beneath the Throne of Paradise.',
  },

  // Anxiety, Debt & Protection
  {
    id: 'anx-hamm-hazan',
    category: 'Anxiety, Debt & Protection',
    title: 'Refuge from Anxiety, Grief, Weakness & Debt',
    arabic:
      'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
    transliteration:
      "Allahumma inni a'udhu bika min al-hammi wal-hazan, wal-'ajzi wal-kasal, wal-bukhli wal-jubn, wa dala'i al-dayni wa ghalabati al-rijal.",
    english:
      'O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and being overpowered by men.',
    urdu: 'اے اللہ! میں غم و فکر، عاجزی و سستی، بخل و بزدلی، قرض کے بوجھ اور لوگوں کے غلبے سے تیری پناہ مانگتا ہوں۔',
    romanUrdu:
      'Aye Allah! Main gham o fikr, aajizi o susti, bukhl o buzdili, qarz ke bojh aur logon ke ghalbe se Teri panah mangta hoon.',
    reference: 'Sahih al-Bukhari 6369',
    targetCount: 1,
  },
  {
    id: 'anx-hasbunallah',
    category: 'Anxiety, Debt & Protection',
    title: 'HasbunAllahu wa Ni‘mal Wakil',
    arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    transliteration: "HasbunAllahu wa ni'ma al-wakil.",
    english: 'Sufficient for us is Allah, and He is the best Disposer of affairs.',
    urdu: 'ہمارے لیے اللہ ہی کافی ہے اور وہ بہترین کارساز ہے۔',
    romanUrdu: 'Hamare liye Allah hi kafi hai aur Woh behtareen karsaaz hai.',
    reference: 'Surah Aal-e-Imran 3:173 · Sahih al-Bukhari 4563',
    targetCount: 7,
  },
  {
    id: 'anx-debt-freedom',
    category: 'Anxiety, Debt & Protection',
    title: 'Suffice Me with Lawful Provision Against Debt',
    arabic: 'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ',
    transliteration: "Allahumma ikfini bi-halalika 'an haramika, wa aghnini bi-fadlika 'amman siwak.",
    english:
      'O Allah, suffice me with what You have allowed instead of what You have forbidden, and make me independent of all others besides You.',
    urdu: 'اے اللہ! مجھے اپنے حلال کے ذریعے اپنے حرام سے بے نیاز فرما اور اپنے فضل سے اپنے سوا سب سے مستغنی کر دے۔',
    romanUrdu:
      'Aye Allah! Mujhe apne halal ke zariye apne haram se be-niyaz farma aur apne fazl se apne siwa sab se mustaghni kar de.',
    reference: 'Jami‘ at-Tirmidhi 3563',
    targetCount: 3,
  },

  // Ruqyah Shariyyah
  {
    id: 'ruqyah-fatihah',
    category: 'Ruqyah Shariyyah',
    title: 'Surah Al-Fatihah (Complete — Al-Ruqyah al-Kubra)',
    arabic:
      'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    transliteration:
      "Bismillahi al-Rahmani al-Rahim. Alhamdu lillahi Rabbi al-'alamin. Al-Rahmani al-Rahim. Maliki yawmi al-din. Iyyaka na'budu wa iyyaka nasta'in. Ihdina al-sirata al-mustaqim. Sirata alladhina an'amta 'alayhim ghayri al-maghdubi 'alayhim wa la al-dallin.",
    english:
      'In the name of Allah, the Entirely Merciful, the Especially Merciful. All praise is due to Allah, Lord of the worlds — the Entirely Merciful, the Especially Merciful, Sovereign of the Day of Recompense. It is You we worship and You we ask for help. Guide us to the straight path — the path of those upon whom You have bestowed favor, not of those who have evoked Your anger or of those who are astray.',
    urdu: 'شروع اللہ کے نام سے جو بڑا مہربان، نہایت رحم والا ہے۔ تمام تعریفیں اللہ کے لیے ہیں جو تمام جہانوں کا رب ہے، بڑا مہربان نہایت رحم والا، بدلے کے دن کا مالک۔ ہم تیری ہی عبادت کرتے ہیں اور تجھی سے مدد مانگتے ہیں۔ ہمیں سیدھا راستہ دکھا، ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، نہ کہ ان کا جن پر غضب کیا گیا اور نہ گمراہوں کا۔',
    romanUrdu:
      'Shuru Allah ke naam se jo bada meherban, nihayat reham wala hai. Tamam tareefein Allah ke liye hain jo tamam jahanon ka Rab hai, bada meherban nihayat reham wala, badle ke din ka malik. Hum Teri hi ibadat karte hain aur Tujhi se madad mangte hain. Humein seedha rasta dikha, un logon ka rasta jin par Tu ne inaam farmaya, na ke un ka jin par ghazab kiya gaya aur na gumrahon ka.',
    reference: 'Surah Al-Fatihah 1:1–7 · Sahih al-Bukhari 5736',
    targetCount: 7,
    virtue: 'The Greatest Surah of the Quran — an established prophetic cure and spiritual shield.',
  },
  {
    id: 'ruqyah-pain-hand',
    category: 'Ruqyah Shariyyah',
    title: 'Prophetic Ruqyah for Bodily Pain',
    arabic: 'بِسْمِ اللَّهِ (٣) ۝ أَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ',
    transliteration:
      "Bismillah (3x). A'udhu billahi wa qudratihi min sharri ma ajidu wa uhadhir.",
    english:
      'In the name of Allah (3x). I seek refuge in Allah and His power from the evil of what I find and fear.',
    urdu: 'اللہ کے نام سے (تین بار)۔ میں اللہ اور اس کی قدرت کی پناہ مانگتا ہوں اس تکلیف کے شر سے جو میں پاتا ہوں اور جس سے ڈرتا ہوں۔',
    romanUrdu:
      'Allah ke naam se (3 baar). Main Allah aur Us ki qudrat ki panah mangta hoon is takleef ke shar se jo main pata hoon aur jis se darta hoon.',
    reference: 'Sahih Muslim 2202',
    targetCount: 7,
  },
  {
    id: 'ruqyah-jibril',
    category: 'Ruqyah Shariyyah',
    title: 'Ruqyah of Jibril (عليه السلام)',
    arabic:
      'بِسْمِ اللَّهِ أَرْقِيكَ، مِنْ كُلِّ شَيْءٍ يُؤْذِيكَ، مِنْ شَرِّ كُلِّ نَفْسٍ أَوْ عَيْنِ حَاسِدٍ اللَّهُ يَشْفِيكَ، بِسْمِ اللَّهِ أَرْقِيكَ',
    transliteration:
      "Bismillahi arqika, min kulli shay'in yu'dhika, min sharri kulli nafsin aw 'ayni hasidin Allahu yashfika, bismillahi arqik.",
    english:
      'In the name of Allah I perform Ruqyah for you, from everything that harms you, from the evil of every soul or envious eye; may Allah heal you. In the name of Allah I perform Ruqyah for you.',
    urdu: 'اللہ کے نام سے میں تم پر دم کرتا ہوں، ہر تکلیف دینے والی چیز سے، ہر نفس یا حسد کرنے والی آنکھ کے شر سے، اللہ تمہیں شفا عطا فرمائے، اللہ کے نام سے میں تم پر دم کرتا ہوں۔',
    romanUrdu:
      'Allah ke naam se main tum par dam karta hoon, har takleef dene wali cheez se, har nafs ya hasad karne wali aankh ke shar se, Allah tumhein shifa ata farmaye, Allah ke naam se main tum par dam karta hoon.',
    reference: 'Sahih Muslim 2186',
    targetCount: 3,
  },
];
