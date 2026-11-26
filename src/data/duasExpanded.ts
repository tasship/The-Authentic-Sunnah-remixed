import {
  DuaItem,
  QuranDuaCategory,
  SunnahDuaCategory,
} from '../types';

export const QURAN_DUA_CATEGORIES: QuranDuaCategory[] = [
  'Guidance & Steadfastness',
  'Forgiveness & Mercy',
  'Family & Righteous Progeny',
  'Protection & Patience',
  'Knowledge, Gratitude & Akhirah',
];

export const SUNNAH_DUA_CATEGORIES: SunnahDuaCategory[] = [
  'Waking Up',
  'Morning & Evening',
  'Home & Masjid',
  'Travel',
  'Rain & Wind',
  'Anxiety & Grief',
  'Forgiveness',
  'Illness & Ruqyah',
  'Istikharah',
  'Parents & Family',
];

export const QURAN_DUA_ITEMS: DuaItem[] = [
  // 1. Guidance & Steadfastness (8)
  {
    id: 'q-dua-ihdina',
    sourceGroup: 'quran',
    category: 'Guidance & Steadfastness',
    title: 'Guide Us to the Straight Path',
    arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    transliteration:
      "Ihdina al-sirat al-mustaqim. Sirat alladhina an'amta 'alayhim ghayri al-maghdubi 'alayhim wa la al-dallin.",
    english:
      'Guide us to the straight path — the path of those upon whom You have bestowed favor, not of those who have evoked Your anger or of those who are astray.',
    urdu: 'ہمیں سیدھا راستہ دکھا، ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، نہ کہ ان کا جن پر غضب ہوا اور نہ گمراہوں کا۔',
    romanUrdu:
      'Humein seedha rasta dikha, un logon ka rasta jin par Tu ne inaam farmaya, na ke un ka jin par ghazab hua aur na gumrahon ka.',
    reference: 'Surah Al-Fatihah 1:6–7',
  },
  {
    id: 'q-dua-hearts-firm',
    sourceGroup: 'quran',
    category: 'Guidance & Steadfastness',
    title: 'Keep Our Hearts Steadfast Upon Guidance',
    arabic: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ',
    transliteration:
      "Rabbana la tuzigh qulubana ba'da idh hadaytana wa hab lana min ladunka rahmatan innaka Anta al-Wahhab.",
    english:
      'Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Perpetual Bestower.',
    urdu: 'اے ہمارے رب! ہمیں ہدایت دینے کے بعد ہمارے دلوں کو ٹیڑھا نہ کر اور ہمیں اپنے پاس سے رحمت عطا فرما، بے شک تو ہی بہت عطا فرمانے والا ہے۔',
    romanUrdu:
      'Aye hamare Rab! Humein hidayat dene ke baad hamare dilon ko tedha na kar aur humein apne paas se rehmat ata farma, beshak Tu hi bohat ata farmane wala hai.',
    reference: 'Surah Aal-e-Imran 3:8',
  },
  {
    id: 'q-dua-muslims-submitting',
    sourceGroup: 'quran',
    category: 'Guidance & Steadfastness',
    title: 'Make Us Submitting Muslims (Ibrahim & Ismail)',
    arabic:
      'رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ لَكَ وَمِن ذُرِّيَّتِنَا أُمَّةً مُّسْلِمَةً لَّكَ وَأَرِنَا مَنَاسِكَنَا وَتُبْ عَلَيْنَا ۖ إِنَّكَ أَنتَ التَّوَّابُ الرَّحِيمُ',
    transliteration:
      "Rabbana waj'alna muslimayni laka wa min dhurriyyatina ummatan muslimatan laka wa arina manasikana wa tub 'alayna innaka Anta al-Tawwab al-Rahim.",
    english:
      'Our Lord, make us Muslims in submission to You and from our descendants a Muslim nation in submission to You. And show us our rites and accept our repentance. Indeed, You are the Accepting of repentance, the Merciful.',
    urdu: 'اے ہمارے رب! ہمیں اپنا فرمانبردار بنا لے اور ہماری اولاد میں سے بھی ایک ایسی امت پیدا کر جو تیری فرمانبردار ہو، اور ہمیں ہماری عبادت کے طریقے سکھا اور ہماری توبہ قبول فرما۔ بے شک تو بہت توبہ قبول کرنے والا، نہایت رحم والا ہے۔',
    romanUrdu:
      'Aye hamare Rab! Humein apna farmanbardar bana le aur hamari aulad mein se bhi ek aisi ummat paida kar jo Teri farmanbardar ho, aur humein hamari ibadat ke tareeqe sikha aur hamari tauba qubool farma. Beshak Tu bohat tauba qubool karne wala, nihayat reham wala hai.',
    reference: 'Surah Al-Baqarah 2:128',
  },
  {
    id: 'q-dua-light-perfect',
    sourceGroup: 'quran',
    category: 'Guidance & Steadfastness',
    title: 'Perfect Our Light on the Day of Resurrection',
    arabic: 'رَبَّنَا أَتْمِمْ لَنَا نُورَنَا وَاغْفِرْ لَنَا ۖ إِنَّكَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: "Rabbana atmim lana nurana waghfir lana innaka 'ala kulli shay'in qadir.",
    english:
      'Our Lord, perfect for us our light and forgive us. Indeed, You are over all things competent.',
    urdu: 'اے ہمارے رب! ہمارے لیے ہمارا نور مکمل فرما دے اور ہمیں بخش دے، بے شک تو ہر چیز پر پوری طرح قادر ہے۔',
    romanUrdu:
      'Aye hamare Rab! Hamare liye hamara noor mukammal farma de aur humein bakhsh de, beshak Tu har cheez par poori tarah qadir hai.',
    reference: 'Surah At-Tahrim 66:8',
  },
  {
    id: 'q-dua-rashadan',
    sourceGroup: 'quran',
    category: 'Guidance & Steadfastness',
    title: 'Grant Us Mercy & Right Guidance in Our Affair',
    arabic: 'رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا',
    transliteration: "Rabbana atina min ladunka rahmatan wa hayyi' lana min amrina rashada.",
    english:
      'Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance.',
    urdu: 'اے ہمارے رب! ہمیں اپنے پاس سے رحمت عطا فرما اور ہمارے کام میں ہمارے لیے بھلائی اور ہدایت کا سامان پیدا فرما۔',
    romanUrdu:
      'Aye hamare Rab! Humein apne paas se rehmat ata farma aur hamare kaam mein hamare liye bhalai aur hidayat ka saman paida farma.',
    reference: 'Surah Al-Kahf 18:10',
  },
  {
    id: 'q-dua-musa-ease',
    sourceGroup: 'quran',
    category: 'Guidance & Steadfastness',
    title: 'Expand My Chest & Ease My Task (Prophet Musa)',
    arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي ۝ وَيَسِّرْ لِي أَمْرِي ۝ وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي ۝ يَفْقَهُوا قَوْلِي',
    transliteration:
      "Rabbi ishrah li sadri wa yassir li amri wahlul 'uqdatan min lisani yafqahu qawli.",
    english:
      'My Lord, expand for me my breast with assurance, ease for me my task, and untie the knot from my tongue that they may understand my speech.',
    urdu: 'اے میرے رب! میرا سینہ میرے لیے کھول دے، اور میرا کام میرے لیے آسان فرما دے، اور میری زبان کی گرہ کھول دے تاکہ لوگ میری بات سمجھ سکیں۔',
    romanUrdu:
      'Aye mere Rab! Mera seena mere liye khol de, aur mera kaam mere liye asaan farma de, aur meri zaban ki girah khol de taake log meri baat samajh sakein.',
    reference: 'Surah Ta-Ha 20:25–28',
  },
  {
    id: 'q-dua-die-muslims',
    sourceGroup: 'quran',
    category: 'Guidance & Steadfastness',
    title: 'Die as a Muslim & Join the Righteous (Prophet Yusuf)',
    arabic:
      'فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ أَنتَ وَلِيِّي فِي الدُّنْيَا وَالْآخِرَةِ ۖ تَوَفَّنِي مُسْلِمًا وَأَلْحِقْنِي بِالصَّالِحِينَ',
    transliteration:
      'Fatira al-samawati wal-ardi Anta waliyyi fi al-dunya wal-akhirati tawaffani musliman wa alhiqni bil-salihin.',
    english:
      'Creator of the heavens and earth, You are my protector in this world and in the Hereafter. Cause me to die a Muslim and join me with the righteous.',
    urdu: 'آسمانوں اور زمین کے پیدا کرنے والے! دنیا اور آخرت میں تو ہی میرا کارساز ہے۔ مجھے اسلام کی حالت میں وفات دے اور مجھے نیک لوگوں کے ساتھ ملا دے۔',
    romanUrdu:
      'Aasmano aur zameen ke paida karne wale! Duniya aur aakhirat mein Tu hi mera karsaaz hai. Mujhe Islam ki halat mein wafat de aur mujhe nek logon ke sath mila de.',
    reference: 'Surah Yusuf 12:101',
  },
  {
    id: 'q-dua-bear-witness',
    sourceGroup: 'quran',
    category: 'Guidance & Steadfastness',
    title: 'We Believe in Revelation & Follow the Messenger',
    arabic: 'رَبَّنَا آمَنَّا بِمَا أَنزَلْتَ وَاتَّبَعْنَا الرَّسُولَ فَاكْتُبْنَا مَعَ الشَّاهِدِينَ',
    transliteration:
      "Rabbana amanna bima anzalta wattaba'na al-rasula faktubna ma'a al-shahidin.",
    english:
      'Our Lord, we have believed in what You revealed and have followed the Messenger, so register us among the witnesses to truth.',
    urdu: 'اے ہمارے رب! ہم اس پر ایمان لائے جو تو نے نازل فرمایا اور ہم نے رسول کی پیروی کی، پس ہمیں گواہی دینے والوں میں لکھ لے۔',
    romanUrdu:
      'Aye hamare Rab! Hum us par iman laye jo Tu ne nazil farmaya aur hum ne Rasool ki pairwi ki, pas humein gawahi dene walon mein likh le.',
    reference: 'Surah Aal-e-Imran 3:53',
  },

  // 2. Forgiveness & Mercy (8)
  {
    id: 'q-dua-adam-hawwa',
    sourceGroup: 'quran',
    category: 'Forgiveness & Mercy',
    title: 'Dua of Prophet Adam for Repentance & Mercy',
    arabic: 'رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    transliteration:
      'Rabbana zalamna anfusana wa in lam taghfir lana wa tarhamna lanakunanna min al-khasirin.',
    english:
      'Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.',
    urdu: 'اے ہمارے رب! ہم نے اپنی جانوں پر ظلم کیا اور اگر تو نے ہمیں معاف نہ فرمایا اور ہم پر رحم نہ کیا تو ہم یقیناً نقصان اٹھانے والوں میں سے ہو جائیں گے۔',
    romanUrdu:
      'Aye hamare Rab! Hum ne apni jaanon par zulm kiya aur agar Tu ne humein maaf na farmaya aur hum par reham na kiya to hum yaqeenan nuqsan uthane walon mein se ho jayenge.',
    reference: 'Surah Al-A‘raf 7:23',
  },
  {
    id: 'q-dua-yunus',
    sourceGroup: 'quran',
    category: 'Forgiveness & Mercy',
    title: 'Tasbih & Repentance of Prophet Yunus',
    arabic: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    transliteration: 'La ilaha illa Anta subhanaka inni kuntu min al-zalimin.',
    english:
      'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    urdu: 'تیرے سوا کوئی معبود نہیں، تو پاک ہے، بے شک میں ہی قصورواروں میں سے تھا۔',
    romanUrdu: 'Tere siwa koi mabood nahi, Tu paak hai, beshak main hi qusoorwaron mein se tha.',
    reference: 'Surah Al-Anbiya 21:87',
  },
  {
    id: 'q-dua-rabbana-faghfir',
    sourceGroup: 'quran',
    category: 'Forgiveness & Mercy',
    title: 'Forgive Our Sins & Save Us from the Fire',
    arabic: 'رَبَّنَا إِنَّنَا آمَنَّا فَاغْفِرْ لَنَا ذُنُوبَنَا وَقِنَا عَذَابَ النَّارِ',
    transliteration: 'Rabbana innana amanna faghfir lana dhunubana wa qina adhab al-nar.',
    english:
      'Our Lord, indeed we have believed, so forgive us our sins and protect us from the punishment of the Fire.',
    urdu: 'اے ہمارے رب! بے شک ہم ایمان لا چکے ہیں، پس ہمارے گناہ بخش دے اور ہمیں آگ کے عذاب سے بچا لے۔',
    romanUrdu:
      'Aye hamare Rab! Beshak hum iman la chuke hain, pas hamare gunah bakhsh de aur humein aag ke azaab se bacha le.',
    reference: 'Surah Aal-e-Imran 3:16',
  },
  {
    id: 'q-dua-sami-na-ata-na',
    sourceGroup: 'quran',
    category: 'Forgiveness & Mercy',
    title: 'We Hear & Obey — Grant Us Your Forgiveness',
    arabic: 'غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ',
    transliteration: 'Ghufranaka Rabbana wa ilayka al-masir.',
    english: 'We seek Your forgiveness, our Lord, and to You is the final destination.',
    urdu: 'اے ہمارے رب! ہم تیری بخشش چاہتے ہیں اور تیری ہی طرف لوٹ کر جانا ہے۔',
    romanUrdu: 'Aye hamare Rab! Hum Teri bakhshish chahte hain aur Teri hi taraf laut kar jana hai.',
    reference: 'Surah Al-Baqarah 2:285',
  },
  {
    id: 'q-dua-do-not-burden',
    sourceGroup: 'quran',
    category: 'Forgiveness & Mercy',
    title: 'Pardon Us, Forgive Us & Do Not Burden Beyond Capacity',
    arabic:
      'رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
    transliteration:
      "Rabbana la tu'akhidhna in nasina aw akhta'na. Rabbana wa la tahmil 'alayna isran kama hamaltahu 'ala alladhina min qablina. Rabbana wa la tuhammilna ma la taqata lana bih. Wa'fu 'anna waghfir lana warhamna Anta Mawlana fansurna 'ala al-qawmi al-kafirin.",
    english:
      'Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people.',
    urdu: 'اے ہمارے رب! اگر ہم بھول جائیں یا غلطی کر بیٹھیں تو ہماری گرفت نہ فرما۔ اے ہمارے رب! ہم پر وہ بوجھ نہ ڈال جو تو نے ہم سے پہلے لوگوں پر ڈالا تھا۔ اے ہمارے رب! ہم پر وہ بوجھ نہ ڈال جس کی ہم میں طاقت نہ ہو۔ اور ہم سے درگزر فرما، اور ہمیں بخش دے، اور ہم پر رحم فرما۔ تو ہی ہمارا مولا ہے، پس ہمیں کافروں کے مقابلے میں مدد عطا فرما۔',
    romanUrdu:
      'Aye hamare Rab! Agar hum bhool jayein ya ghalti kar baithein to hamari girift na farma. Aye hamare Rab! Hum par woh bojh na daal jo Tu ne hum se pehle logon par dala tha. Aye hamare Rab! Hum par woh bojh na daal jis ki hum mein taqat na ho. Aur hum se darguzar farma, aur humein bakhsh de, aur hum par reham farma. Tu hi hamara Maula hai, pas humein kafiron ke muqabale mein madad ata farma.',
    reference: 'Surah Al-Baqarah 2:286',
  },
  {
    id: 'q-dua-amanna-faghfir',
    sourceGroup: 'quran',
    category: 'Forgiveness & Mercy',
    title: 'You Are the Best of the Merciful',
    arabic: 'رَبَّنَا آمَنَّا فَاغْفِرْ لَنَا وَارْحَمْنَا وَأَنتَ خَيْرُ الرَّاحِمِينَ',
    transliteration: 'Rabbana amanna faghfir lana warhamna wa Anta khayru al-rahimin.',
    english:
      'Our Lord, we have believed, so forgive us and have mercy upon us, and You are the best of the merciful.',
    urdu: 'اے ہمارے رب! ہم ایمان لے آئے ہیں، پس ہمیں بخش دے اور ہم پر رحم فرما اور تو سب رحم کرنے والوں سے بہتر ہے۔',
    romanUrdu:
      'Aye hamare Rab! Hum iman le aaye hain, pas humein bakhsh de aur hum par reham farma aur Tu sab reham karne walon se behtar hai.',
    reference: 'Surah Al-Mu’minun 23:109',
  },
  {
    id: 'q-dua-forgive-brothers',
    sourceGroup: 'quran',
    category: 'Forgiveness & Mercy',
    title: 'Forgive Us & Remove Malice Towards Believers',
    arabic:
      'رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَّحِيمٌ',
    transliteration:
      "Rabbana aghfir lana wa li-ikhwanina alladhina sabaquna bil-imani wa la taj'al fi qulubina ghillan lilladhina amanu Rabbana innaka Ra'ufun Rahim.",
    english:
      'Our Lord, forgive us and our brothers who preceded us in faith and put not in our hearts any resentment toward those who have believed. Our Lord, indeed You are Kind and Merciful.',
    urdu: 'اے ہمارے رب! ہمیں اور ہمارے ان بھائیوں کو بخش دے جو ایمان میں ہم سے سبقت لے گئے، اور ہمارے دلوں میں ایمان والوں کے لیے کوئی کینہ نہ رکھ۔ اے ہمارے رب! بے شک تو نہایت شفقت کرنے والا، رحم فرمانے والا ہے۔',
    romanUrdu:
      'Aye hamare Rab! Humein aur hamare un bhaiyon ko bakhsh de jo iman mein hum se sabqat le gaye, aur hamare dilon mein iman walon ke liye koi keena na rakh. Aye hamare Rab! Beshak Tu nihayat shafqat karne wala, reham farmane wala hai.',
    reference: 'Surah Al-Hashr 59:10',
  },
  {
    id: 'q-dua-rabbi-ighfir-best',
    sourceGroup: 'quran',
    category: 'Forgiveness & Mercy',
    title: 'My Lord, Forgive & Have Mercy',
    arabic: 'رَّبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ',
    transliteration: 'Rabbi aghfir warham wa Anta khayru al-rahimin.',
    english: 'My Lord, forgive and have mercy, and You are the best of the merciful.',
    urdu: 'اے میرے رب! معاف فرما اور رحم کر، اور تو سب رحم کرنے والوں سے بہتر ہے۔',
    romanUrdu: 'Aye mere Rab! Maaf farma aur reham kar, aur Tu sab reham karne walon se behtar hai.',
    reference: 'Surah Al-Mu’minun 23:118',
  },

  // 3. Family & Righteous Progeny (7)
  {
    id: 'q-dua-qurrat-ayun',
    sourceGroup: 'quran',
    category: 'Family & Righteous Progeny',
    title: 'Comfort of Eyes in Spouses & Offspring',
    arabic:
      'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    transliteration:
      "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama.",
    english:
      'Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.',
    urdu: 'اے ہمارے رب! ہمیں ہماری بیویوں اور ہماری اولاد کی طرف سے آنکھوں کی ٹھنڈک عطا فرما اور ہمیں پرہیزگاروں کا امام بنا دے۔',
    romanUrdu:
      'Aye hamare Rab! Humein hamari biwiyon aur hamari aulad ki taraf se aankhon ki thandak ata farma aur humein parhezgaron ka imam bana de.',
    reference: 'Surah Al-Furqan 25:74',
  },
  {
    id: 'q-dua-parents-mercy',
    sourceGroup: 'quran',
    category: 'Family & Righteous Progeny',
    title: 'Have Mercy on My Parents as They Raised Me',
    arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliteration: 'Rabbi irhamhuma kama rabbayani saghira.',
    english: 'My Lord, have mercy upon them both as they brought me up when I was small.',
    urdu: 'اے میرے رب! ان دونوں پر رحم فرما جیسا کہ انہوں نے بچپن میں میری پرورش کی۔',
    romanUrdu: 'Aye mere Rab! Un dono par reham farma jaisa ke unhon ne bachpan mein meri parwarish ki.',
    reference: 'Surah Al-Isra 17:24',
  },
  {
    id: 'q-dua-parents-believers',
    sourceGroup: 'quran',
    category: 'Family & Righteous Progeny',
    title: 'Forgive Me, My Parents & All Believers on Judgment Day',
    arabic: 'رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ',
    transliteration: 'Rabbana aghfir li wa li-walidayya wa lil-mu’minina yawma yaqumu al-hisab.',
    english:
      'Our Lord, forgive me and my parents and the believers the Day the account is established.',
    urdu: 'اے ہمارے رب! مجھے اور میرے والدین کو اور تمام مومنوں کو اس دن بخش دینا جس دن حساب قائم ہوگا۔',
    romanUrdu:
      'Aye hamare Rab! Mujhe aur mere walidain ko aur tamam mominon ko us din bakhsh dena jis din hisab qaim hoga.',
    reference: 'Surah Ibrahim 14:41',
  },
  {
    id: 'q-dua-establish-salah',
    sourceGroup: 'quran',
    category: 'Family & Righteous Progeny',
    title: 'Establisher of Salah & Righteous Progeny (Prophet Ibrahim)',
    arabic:
      'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ',
    transliteration:
      "Rabbi ij'alni muqima al-salati wa min dhurriyyati Rabbana wa taqabbal du'a.",
    english:
      'My Lord, make me an establisher of prayer, and many from my descendants. Our Lord, and accept my supplication.',
    urdu: 'اے میرے رب! مجھے نماز قائم کرنے والا بنا اور میری اولاد میں سے بھی۔ اے ہمارے رب! اور میری دعا قبول فرما۔',
    romanUrdu:
      'Aye mere Rab! Mujhe namaz qaim karne wala bana aur meri aulad mein se bhi. Aye hamare Rab! Aur meri dua qubool farma.',
    reference: 'Surah Ibrahim 14:40',
  },
  {
    id: 'q-dua-zakariyya-progeny',
    sourceGroup: 'quran',
    category: 'Family & Righteous Progeny',
    title: 'Grant Me Good Offspring (Prophet Zakariyya)',
    arabic: 'رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ الدُّعَاءِ',
    transliteration: "Rabbi hab li min ladunka dhurriyyatan tayyibatan innaka Sami'u al-du'a.",
    english:
      'My Lord, grant me from Yourself a good offspring. Indeed, You are the Hearer of supplication.',
    urdu: 'اے میرے رب! مجھے اپنے پاس سے پاکیزہ اولاد عطا فرما، بے شک تو دعا کا سننے والا ہے۔',
    romanUrdu:
      'Aye mere Rab! Mujhe apne paas se pakeeza aulad ata farma, beshak Tu dua ka sunne wala hai.',
    reference: 'Surah Aal-e-Imran 3:38',
  },
  {
    id: 'q-dua-not-alone',
    sourceGroup: 'quran',
    category: 'Family & Righteous Progeny',
    title: 'Do Not Leave Me Alone Without Inheritors',
    arabic: 'رَبِّ لَا تَذَرْنِي فَرْدًا وَأَنتَ خَيْرُ الْوَارِثِينَ',
    transliteration: 'Rabbi la tadharni fardan wa Anta khayru al-warithin.',
    english: 'My Lord, do not leave me alone without an heir, while You are the best of inheritors.',
    urdu: 'اے میرے رب! مجھے اکیلا نہ چھوڑ، اور تو سب سے بہتر وارث ہے۔',
    romanUrdu: 'Aye mere Rab! Mujhe akela na chhod, aur Tu sab se behtar waris hai.',
    reference: 'Surah Al-Anbiya 21:89',
  },
  {
    id: 'q-dua-nuh-parents',
    sourceGroup: 'quran',
    category: 'Family & Righteous Progeny',
    title: 'Forgive My Parents & Every Believer Entering My Home',
    arabic:
      'رَّبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَن دَخَلَ بَيْتِيَ مُؤْمِنًا وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ',
    transliteration:
      'Rabbi aghfir li wa li-walidayya wa liman dakhala baytiya mu’minan wa lil-mu’minina wal-mu’minat.',
    english:
      'My Lord, forgive me and my parents and whoever enters my house a believer and the believing men and believing women.',
    urdu: 'اے میرے رب! مجھے اور میرے والدین کو اور ہر اس شخص کو جو ایمان کی حالت میں میرے گھر میں داخل ہوا اور تمام مومن مردوں اور مومن عورتوں کو بخش دے۔',
    romanUrdu:
      'Aye mere Rab! Mujhe aur mere walidain ko aur har us shakhs ko jo iman ki halat mein mere ghar mein dakhil hua aur tamam momin mardon aur momin auraton ko bakhsh de.',
    reference: 'Surah Nuh 71:28',
  },

  // 4. Protection & Patience (7)
  {
    id: 'q-dua-patience-firmness',
    sourceGroup: 'quran',
    category: 'Protection & Patience',
    title: 'Pour Patience Upon Us & Make Our Feet Firm',
    arabic:
      'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
    transliteration:
      "Rabbana afrigh 'alayna sabran wa thabbit aqdamana wansurna 'ala al-qawmi al-kafirin.",
    english:
      'Our Lord, pour upon us patience and plant firmly our feet and give us victory over the disbelieving people.',
    urdu: 'اے ہمارے رب! ہم پر صبر کا فیضان فرما اور ہمارے قدم جما دے اور کافر قوم کے مقابلے میں ہماری مدد فرما۔',
    romanUrdu:
      'Aye hamare Rab! Hum par sabr ka faizan farma aur hamare qadam jama de aur kafir qaum ke muqabale mein hamari madad farma.',
    reference: 'Surah Al-Baqarah 2:250',
  },
  {
    id: 'q-dua-avert-hell',
    sourceGroup: 'quran',
    category: 'Protection & Patience',
    title: 'Avert from Us the Punishment of Hell',
    arabic: 'رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ ۖ إِنَّ عَذَابَهَا كَانَ غَرَامًا ۝ إِنَّهَا سَاءَتْ مُسْتَقَرًّا وَمُقَامًا',
    transliteration:
      "Rabbana isrif 'anna 'adhaba Jahannama inna 'adhabaha kana gharama. Innaha sa'at mustaqarran wa muqama.",
    english:
      'Our Lord, avert from us the punishment of Hell. Indeed, its punishment is ever adhering; indeed, it is evil as a settlement and residence.',
    urdu: 'اے ہمارے رب! ہم سے جہنم کا عذاب پھیر دے، بے شک اس کا عذاب چمٹ کر رہنے والا ہے، بے شک وہ ٹھہرنے اور رہنے کی بہت بری جگہ ہے۔',
    romanUrdu:
      'Aye hamare Rab! Hum se Jahannam ka azaab pher de, beshak us ka azaab chimat kar rehne wala hai, beshak woh theharne aur rehne ki bohat buri jagah hai.',
    reference: 'Surah Al-Furqan 25:65–66',
  },
  {
    id: 'q-dua-ayyub-healing',
    sourceGroup: 'quran',
    category: 'Protection & Patience',
    title: 'Dua of Prophet Ayyub in Illness & Adversity',
    arabic: 'أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ',
    transliteration: 'Anni massaniya al-durru wa Anta Arhamu al-Rahimin.',
    english:
      'Indeed, adversity has touched me, and You are the Most Merciful of the merciful.',
    urdu: 'بے شک مجھے تکلیف پہنچی ہے اور تو سب رحم کرنے والوں سے بڑھ کر رحم کرنے والا ہے۔',
    romanUrdu:
      'Beshak mujhe takleef pohnchi hai aur Tu sab reham karne walon se badh kar reham karne wala hai.',
    reference: 'Surah Al-Anbiya 21:83',
  },
  {
    id: 'q-dua-musa-poverty',
    sourceGroup: 'quran',
    category: 'Protection & Patience',
    title: 'Dua of Prophet Musa for Sustenance & Good',
    arabic: 'رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ',
    transliteration: 'Rabbi inni lima anzalta ilayya min khayrin faqir.',
    english:
      'My Lord, indeed I am, for whatever good You would send down to me, in need.',
    urdu: 'اے میرے رب! جو بھلائی بھی تو میری طرف اتارے میں اس کا محتاج ہوں۔',
    romanUrdu: 'Aye mere Rab! Jo bhalai bhi Tu meri taraf utare main us ka mohtaj hoon.',
    reference: 'Surah Al-Qasas 28:24',
  },
  {
    id: 'q-dua-refuge-shaytan',
    sourceGroup: 'quran',
    category: 'Protection & Patience',
    title: 'Seek Refuge from Whisperings & Presence of Devils',
    arabic: 'رَّبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ ۝ وَأَعُوذُ بِكَ رَبِّ أَن يَحْضُرُونِ',
    transliteration:
      "Rabbi a'udhu bika min hamazati al-shayatin. Wa a'udhu bika Rabbi an yahdurun.",
    english:
      'My Lord, I seek refuge in You from the incitements of the devils, and I seek refuge in You, my Lord, lest they be present with me.',
    urdu: 'اے میرے رب! میں شیطانوں کے وسوسوں سے تیری پناہ مانگتا ہوں، اور اے میرے رب! میں اس بات سے تیری پناہ مانگتا ہوں کہ وہ میرے پاس آئیں۔',
    romanUrdu:
      'Aye mere Rab! Main Shaitanon ke waswason se Teri panah mangta hoon, aur aye mere Rab! Main is baat se Teri panah mangta hoon ke woh mere paas aayein.',
    reference: 'Surah Al-Mu’minun 23:97–98',
  },
  {
    id: 'q-dua-tawakkul',
    sourceGroup: 'quran',
    category: 'Protection & Patience',
    title: 'Upon You We Rely — Do Not Make Us a Trial',
    arabic:
      'رَّبَّنَا عَلَيْكَ تَوَكَّلْنَا وَإِلَيْكَ أَنَبْنَا وَإِلَيْكَ الْمَصِيرُ ۝ رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِّلَّذِينَ كَفَرُوا وَاغْفِرْ لَنَا رَبَّنَا ۖ إِنَّكَ أَنتَ الْعَزِيزُ الْحَكِيمُ',
    transliteration:
      "Rabbana 'alayka tawakkalna wa ilayka anabna wa ilayka al-masir. Rabbana la taj'alna fitnatan lilladhina kafaru waghfir lana Rabbana innaka Anta al-'Aziz al-Hakim.",
    english:
      'Our Lord, upon You we have relied, and to You we have returned, and to You is the destination. Our Lord, make us not a trial for those who disbelieve and forgive us, our Lord. Indeed, You are the Exalted in Might, the Wise.',
    urdu: 'اے ہمارے رب! ہم نے تجھ ہی پر بھروسا کیا اور تیری ہی طرف رجوع کیا اور تیری ہی طرف لوٹ کر جانا ہے۔ اے ہمارے رب! ہمیں کافروں کے لیے آزمائش کا ذریعہ نہ بنا اور ہمیں بخش دے۔ بے شک تو زبردست، بڑی حکمت والا ہے۔',
    romanUrdu:
      'Aye hamare Rab! Hum ne Tujh hi par bharosa kiya aur Teri hi taraf ruju kiya aur Teri hi taraf laut kar jana hai. Aye hamare Rab! Humein kafiron ke liye aazmaish ka zariya na bana aur humein bakhsh de. Beshak Tu zabardast, badi hikmat wala hai.',
    reference: 'Surah Al-Mumtahanah 60:4–5',
  },
  {
    id: 'q-dua-hasbunallah',
    sourceGroup: 'quran',
    category: 'Protection & Patience',
    title: 'Sufficient for Us is Allah & Truthful Entry/Exit',
    arabic:
      'رَّبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ وَأَخْرِجْنِي مُخْرَجَ صِدْقٍ وَاجْعَل لِّي مِن لَّدُنكَ سُلْطَانًا نَّصِيرًا',
    transliteration:
      "Rabbi adkhilni mudkhala sidqin wa akhrijni mukhraja sidqin waj'al li min ladunka sultanan nasira.",
    english:
      'My Lord, cause me to enter a sound entrance and to exit a sound exit and grant me from Yourself a supporting authority.',
    urdu: 'اے میرے رب! مجھے سچائی کے ساتھ داخل فرما اور سچائی کے ساتھ نکال اور اپنے پاس سے میرے لیے مددگار غلبہ عطا فرما۔',
    romanUrdu:
      'Aye mere Rab! Mujhe sachai ke sath dakhil farma aur sachai ke sath nikaal aur apne paas se mere liye madadgar ghalba ata farma.',
    reference: 'Surah Al-Isra 17:80',
  },

  // 5. Knowledge, Gratitude & Akhirah (7)
  {
    id: 'q-dua-hasanah',
    sourceGroup: 'quran',
    category: 'Knowledge, Gratitude & Akhirah',
    title: 'Good in This World & Good in the Hereafter',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration:
      "Rabbana atina fi al-dunya hasanatan wa fi al-akhirati hasanatan wa qina 'adhab al-nar.",
    english:
      'Our Lord, give us in this world that which is good and in the Hereafter that which is good and protect us from the punishment of the Fire.',
    urdu: 'اے ہمارے رب! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی بھلائی عطا فرما اور ہمیں آگ کے عذاب سے بچا لے۔',
    romanUrdu:
      'Aye hamare Rab! Humein duniya mein bhi bhalai ata farma aur aakhirat mein bhi bhalai ata farma aur humein aag ke azaab se bacha le.',
    reference: 'Surah Al-Baqarah 2:201',
  },
  {
    id: 'q-dua-increase-knowledge',
    sourceGroup: 'quran',
    category: 'Knowledge, Gratitude & Akhirah',
    title: 'Increase Me in Knowledge',
    arabic: 'رَّبِّ زِدْنِي عِلْمًا',
    transliteration: "Rabbi zidni 'ilma.",
    english: 'My Lord, increase me in knowledge.',
    urdu: 'اے میرے رب! میرے علم میں اضافہ فرما۔',
    romanUrdu: 'Aye mere Rab! Mere ilm mein izafa farma.',
    reference: 'Surah Ta-Ha 20:114',
  },
  {
    id: 'q-dua-sulaiman-gratitude',
    sourceGroup: 'quran',
    category: 'Knowledge, Gratitude & Akhirah',
    title: 'Inspire Me to Be Grateful (Prophet Sulaiman)',
    arabic:
      'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَدْخِلْنِي بِرَحْمَتِكَ فِي عِبَادِكَ الصَّالِحِينَ',
    transliteration:
      "Rabbi awzi'ni an ashkura ni'mataka allati an'amta 'alayya wa 'ala walidayya wa an a'mala salihan tardahu wa adkhilni bi-rahmatika fi 'ibadika al-salihin.",
    english:
      'My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to do righteousness of which You approve. And admit me by Your mercy into the ranks of Your righteous servants.',
    urdu: 'اے میرے رب! مجھے توفیق دے کہ میں تیری اس نعمت کا شکر ادا کروں جو تو نے مجھ پر اور میرے والدین پر فرمائی اور ایسے نیک عمل کروں جن سے تو راضی ہو، اور اپنی رحمت سے مجھے اپنے نیک بندوں میں داخل فرما۔',
    romanUrdu:
      'Aye mere Rab! Mujhe taufeeq de ke main Teri us naimat ka shukr ada karoon jo Tu ne mujh par aur mere walidain par farmai aur aise nek amal karoon jin se Tu razi ho, aur apni rehmat se mujhe apne nek bandon mein dakhil farma.',
    reference: 'Surah An-Naml 27:19',
  },
  {
    id: 'q-dua-ahqaf-gratitude',
    sourceGroup: 'quran',
    category: 'Knowledge, Gratitude & Akhirah',
    title: 'Gratitude, Righteous Offspring & Sincere Repentance',
    arabic:
      'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي ۖ إِنِّي تُبْتُ إِلَيْكَ وَإِنِّي مِنَ الْمُسْلِمِينَ',
    transliteration:
      "Rabbi awzi'ni an ashkura ni'mataka allati an'amta 'alayya wa 'ala walidayya wa an a'mala salihan tardahu wa aslih li fi dhurriyyati inni tubtu ilayka wa inni min al-muslimin.",
    english:
      'My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to work righteousness of which You will approve and make righteous for me my offspring. Indeed, I have repented to You, and indeed, I am of the Muslims.',
    urdu: 'اے میرے رب! مجھے توفیق دے کہ میں تیری نعمت کا شکر کروں جو تو نے مجھ پر اور میرے والدین پر کی اور نیک عمل کروں جن سے تو راضی ہو، اور میری اولاد میں میرے لیے صلاح و اصلاح پیدا فرما۔ بے شک میں نے تیری طرف توبہ کی اور میں فرمانبرداروں میں سے ہوں۔',
    romanUrdu:
      'Aye mere Rab! Mujhe taufeeq de ke main Teri naimat ka shukr karoon jo Tu ne mujh par aur mere walidain par ki aur nek amal karoon jin se Tu razi ho, aur meri aulad mein mere liye salah o islah paida farma. Beshak maine Teri taraf tauba ki aur main farmanbardaron mein se hoon.',
    reference: 'Surah Al-Ahqaf 46:15',
  },
  {
    id: 'q-dua-ibrahim-wisdom',
    sourceGroup: 'quran',
    category: 'Knowledge, Gratitude & Akhirah',
    title: 'Grant Me Wisdom, Honorable Mention & Paradise',
    arabic:
      'رَبِّ هَبْ لِي حُكْمًا وَأَلْحِقْنِي بِالصَّالِحِينَ ۝ وَاجْعَل لِّي لِسَانَ صِدْقٍ فِي الْآخِرِينَ ۝ وَاجْعَلْنِي مِن وَرَثَةِ جَنَّةِ النَّعِيمِ',
    transliteration:
      "Rabbi hab li hukman wa alhiqni bil-salihin. Waj'al li lisana sidqin fi al-akhirin. Waj'alni min warathati jannati al-na'im.",
    english:
      'My Lord, grant me authority and wisdom and join me with the righteous. And grant me a reputation of honor among later generations. And place me among the inheritors of the Garden of Pleasure.',
    urdu: 'اے میرے رب! مجھے حکمت و دانش عطا فرما اور مجھے نیک لوگوں کے ساتھ ملا دے، اور بعد میں آنے والوں میں میرا سچا ذکرِ خیر باقی رکھ، اور مجھے نعمتوں والی جنت کے وارثوں میں سے بنا۔',
    romanUrdu:
      'Aye mere Rab! Mujhe hikmat o danish ata farma aur mujhe nek logon ke sath mila de, aur baad mein aane walon mein mera sacha zikr-e-khair baqi rakh, aur mujhe naimaton wali Jannat ke warison mein se bana.',
    reference: 'Surah Ash-Shu‘ara 26:83–85',
  },
  {
    id: 'q-dua-taqabbal',
    sourceGroup: 'quran',
    category: 'Knowledge, Gratitude & Akhirah',
    title: 'Accept Our Deeds — You Are All-Hearing, All-Knowing',
    arabic: 'رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ',
    transliteration: "Rabbana taqabbal minna innaka Anta al-Sami'u al-'Alim.",
    english:
      'Our Lord, accept this from us. Indeed You are the Hearing, the Knowing.',
    urdu: 'اے ہمارے رب! ہم سے قبول فرما، بے شک تو ہی خوب سننے والا، سب کچھ جاننے والا ہے۔',
    romanUrdu:
      'Aye hamare Rab! Hum se qubool farma, beshak Tu hi khoob sunne wala, sab kuch janne wala hai.',
    reference: 'Surah Al-Baqarah 2:127',
  },
  {
    id: 'q-dua-home-paradise',
    sourceGroup: 'quran',
    category: 'Knowledge, Gratitude & Akhirah',
    title: 'Build for Me a House Near You in Paradise (Asiyah)',
    arabic: 'رَبِّ ابْنِ لِي عِندَكَ بَيْتًا فِي الْجَنَّةِ',
    transliteration: 'Rabbi ibni li indaka baytan fi al-jannah.',
    english: 'My Lord, build for me near You a house in Paradise.',
    urdu: 'اے میرے رب! میرے لیے اپنے پاس جنت میں ایک گھر بنا دے۔',
    romanUrdu: 'Aye mere Rab! Mere liye apne paas Jannat mein ek ghar bana de.',
    reference: 'Surah At-Tahrim 66:11',
  },
];

export const SUNNAH_DUA_ITEMS: DuaItem[] = [
  // 1. Waking Up (6)
  {
    id: 's-dua-wake-1',
    sourceGroup: 'sunnah',
    category: 'Waking Up',
    title: 'Upon Waking Up from Sleep',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration:
      'Alhamdulillahi alladhi ahyana ba‘da ma amatana wa ilayhi al-nushur.',
    english:
      'All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.',
    urdu: 'تمام تعریفیں اللہ کے لیے ہیں جس نے ہمیں موت (نیند) کے بعد زندگی عطا فرمائی اور اسی کی طرف لوٹ کر جانا ہے۔',
    romanUrdu: 'Tamam tareefein Allah ke liye hain jis ne hamein maut (neend) ke baad zindagi ata farmaayi aur usi ki taraf laut kar jaana hai.',
    reference: 'Sahih al-Bukhari 6312',
  },
  {
    id: 's-dua-wake-2',
    sourceGroup: 'sunnah',
    category: 'Waking Up',
    title: 'Health in Body & Returning the Soul',
    arabic:
      'الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي وَرَدَّ عَلَيَّ رُوحِي وَأَذِنَ لِي بِذِكْرِهِ',
    transliteration:
      "Alhamdulillahi alladhi 'afani fi jasadi wa radda 'alayya ruhi wa adhina li bi-dhikrih.",
    english:
      'All praise is for Allah who restored to me my health, returned my soul, and has allowed me to remember Him.',
    urdu: 'تمام تعریفیں اللہ کے لیے ہیں جس نے میرے جسم کو عافیت دی، میری روح مجھ پر لوٹائی اور مجھے اپنے ذکر کی اجازت عطا فرمائی۔',
    romanUrdu: 'Tamam tareefein Allah ke liye hain jis ne mere jism ko aafiyat di, meri rooh mujh par lautaayi aur mujhe apne zikr ki ijazat ata farmaayi.',
    reference: 'Jami‘ at-Tirmidhi 3401',
  },
  {
    id: 's-dua-wake-3',
    sourceGroup: 'sunnah',
    category: 'Waking Up',
    title: 'Waking Up at Night (Guaranteed Acceptance)',
    arabic:
      'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ، الْحَمْدُ لِلَّهِ وَسُبْحَانَ اللَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration:
      'La ilaha illAllahu wahdahu la sharika lahu, lahu al-mulku wa lahu al-hamdu wa Huwa ‘ala kulli shay’in qadir. Alhamdulillahi wa SubhanAllahi wa La ilaha illAllahu wallahu Akbar wa la hawla wa la quwwata illa billah.',
    english:
      'There is none worthy of worship besides Allah alone, without partner; to Him belongs all sovereignty and praise, and He is over all things omnipotent. All praise is for Allah, Glory be to Allah, none has the right to be worshipped but Allah, Allah is the Greatest, and there is no might nor power except through Allah.',
    urdu: 'اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے اور اسی کے لیے تمام تعریف ہے، اور وہ ہر چیز پر قادر ہے۔ اللہ کی تعریف ہے، اللہ پاک ہے، اللہ کے سوا کوئی معبود نہیں، اللہ سب سے بڑا ہے، اور نیکی کی طاقت اور گناہ سے بچنے کی قوت صرف اللہ کی مدد سے ہے۔',
    romanUrdu: 'Allah ke siwa koi ma’bood nahi, woh akela hai, us ka koi shareek nahi, usi ki baadshahi hai aur usi ke liye tamam tareef hai, aur woh har cheez par qadir hai. Allah ki tareef hai, Allah paak hai, Allah ke siwa koi ma’bood nahi, Allah sab se bada hai, aur neki ki taqat aur gunah se bachne ki quwwat sirf Allah ki madad se hai.',
    reference: 'Sahih al-Bukhari 1154',
  },
  {
    id: 's-dua-wake-4',
    sourceGroup: 'sunnah',
    category: 'Waking Up',
    title: 'Upon Starting Wudu (Ablution)',
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismillah.',
    english: 'In the name of Allah.',
    urdu: 'اللہ کے نام سے (شروع کرتا ہوں)۔',
    romanUrdu: 'Allah ke naam se (shuru karta hoon).',
    reference: 'Sunan Abi Dawud 101',
  },
  {
    id: 's-dua-wake-5',
    sourceGroup: 'sunnah',
    category: 'Waking Up',
    title: 'Upon Completing Wudu (Eight Gates of Paradise)',
    arabic:
      'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ ۝ اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
    transliteration:
      "Ashhadu an la ilaha illAllahu wahdahu la sharika lahu wa ashhadu anna Muhammadan 'abduhu wa rasuluhu. Allahumma ij'alni min al-tawwabina waj'alni min al-mutatahhirin.",
    english:
      'I bear witness that none has the right to be worshipped except Allah alone without partner, and I bear witness that Muhammad is His servant and Messenger. O Allah, make me among those who repent and make me among those who purify themselves.',
    urdu: 'میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اور میں گواہی دیتا ہوں کہ محمد (ﷺ) اس کے بندے اور رسول ہیں۔ اے اللہ! مجھے خوب توبہ کرنے والوں اور پاکیزگی اختیار کرنے والوں میں شامل فرما۔',
    romanUrdu: 'Main gawahi deta hoon ke Allah ke siwa koi ma’bood nahi, woh akela hai, us ka koi shareek nahi, aur main gawahi deta hoon ke Muhammad (ﷺ) us ke bande aur Rasool hain. Aye Allah! Mujhe khoob taubah karne walon aur pakeezgi ikhtiyar karne walon mein shamil farma.',
    reference: 'Sahih Muslim 234 & Jami‘ at-Tirmidhi 55',
  },
  {
    id: 's-dua-wake-6',
    sourceGroup: 'sunnah',
    category: 'Waking Up',
    title: 'When Putting on Garments',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَٰذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    transliteration:
      'Alhamdulillahi alladhi kasani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah.',
    english:
      'All praise is for Allah who has clothed me with this garment and provided it for me, with no power or might from myself.',
    urdu: 'تمام تعریفیں اللہ کے لیے ہیں جس نے مجھے یہ لباس پہنایا اور میری کسی طاقت و قوت کے بغیر یہ مجھے عطا فرمایا۔',
    romanUrdu: 'Tamam tareefein Allah ke liye hain jis ne mujhe yeh libas pehnaya aur meri kisi taqat o quwwat ke baghair yeh mujhe ata farmaya.',
    reference: 'Sunan Abi Dawud 4023',
  },

  // 2. Morning & Evening (7)
  {
    id: 's-dua-me-1',
    sourceGroup: 'sunnah',
    category: 'Morning & Evening',
    title: 'Seeking Beneficial Knowledge, Pure Provision & Accepted Deeds (Morning)',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا',
    transliteration:
      "Allahumma inni as'aluka 'ilman nafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbala.",
    english:
      'O Allah, indeed I ask You for beneficial knowledge, good and lawful provision, and deeds that are accepted.',
    urdu: 'اے اللہ! بے شک میں تجھ سے نفع بخش علم، پاکیزہ رزق اور مقبول عمل کا سوال کرتا ہوں۔',
    romanUrdu: 'Aye Allah! Beshak main Tujh se nafa bakhsh ilm, pakeezah rizq aur maqbool amal ka sawal karta hoon.',
    reference: 'Sunan Ibn Majah 925 (After Fajr)',
  },
  {
    id: 's-dua-me-2',
    sourceGroup: 'sunnah',
    category: 'Morning & Evening',
    title: 'Seeking Well-Being in World & Hereafter',
    arabic:
      'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي وَمِنْ فَوْقِي وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي',
    transliteration:
      "Allahumma inni as'aluka al-'afwa wal-'afiyata fi al-dunya wal-akhirah. Allahumma inni as'aluka al-'afwa wal-'afiyata fi dini wa dunyaya wa ahli wa mali. Allahumma ustur 'awrati wa amin raw'ati. Allahumma ihfazni min bayni yadayya wa min khalfi wa 'an yamini wa 'an shimali wa min fawqi, wa a'udhu bi-'azamatika an ughtala min tahti.",
    english:
      'O Allah, I ask You for pardon and well-being in this life and the next. O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, and my wealth. O Allah, conceal my faults and calm my fears. O Allah, guard me from before me and behind me, from my right and my left, and from above me, and I seek refuge in Your greatness from being destroyed from beneath me.',
    urdu: 'اے اللہ! میں تجھ سے دنیا اور آخرت میں معافی اور عافیت کا سوال کرتا ہوں۔ اے اللہ! میں تجھ سے اپنے دین، دنیا، اہل اور مال میں معافی اور عافیت مانگتا ہوں۔ اے اللہ! میرے عیبوں پر پردہ ڈال دے اور میرے خوف کو امن میں بدل دے۔ اے اللہ! میری حفاظت فرما میرے آگے سے، پیچھے سے، دائیں سے، بائیں سے اور اوپر سے، اور میں تیری عظمت کی پناہ مانگتا ہوں کہ اچانک نیچے سے ہلاک کیا جاؤں۔',
    romanUrdu: 'Aye Allah! Main Tujh se duniya aur aakhirat mein ma’afi aur aafiyat ka sawal karta hoon. Aye Allah! Main Tujh se apne deen, duniya, ahl aur maal mein ma’afi aur aafiyat maangta hoon. Aye Allah! Mere aibon par parda daal de aur mere khauf ko amn mein badal de. Aye Allah! Meri hifazat farma mere aage se, peeche se, daayein se, baayein se aur oopar se, aur main Teri azmat ki panah maangta hoon ke achanak neeche se halak kiya jaaun.',
    reference: 'Sunan Abi Dawud 5074 & Sunan Ibn Majah 3871',
  },
  {
    id: 's-dua-me-3',
    sourceGroup: 'sunnah',
    category: 'Morning & Evening',
    title: 'Help Me Remember, Thank & Worship You Well',
    arabic: 'اللَّهُمَّ أَعِنِّي عَلَىٰ ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ',
    transliteration: "Allahumma a'inni 'ala dhikrika, wa shukrika, wa husni 'ibadatik.",
    english:
      'O Allah, help me to remember You, to give thanks to You, and to worship You in the best of manners.',
    urdu: 'اے اللہ! اپنے ذکر، اپنے شکر اور اپنی بہترین عبادت پر میری مدد فرما۔',
    romanUrdu: 'Aye Allah! Apne zikr, apne shukr aur apni behtareen ibadat par meri madad farma.',
    reference: 'Sunan Abi Dawud 1522',
  },
  {
    id: 's-dua-me-4',
    sourceGroup: 'sunnah',
    category: 'Morning & Evening',
    title: 'Seeking Shelter from the Evil of Myself',
    arabic:
      'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا أَنتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَىٰ نَفْسِي سُوءًا أَوْ أَجُرَّهُ إِلَىٰ مُسْلِمٍ',
    transliteration:
      "Allahumma 'Alima al-ghaybi wal-shahadati Fatira al-samawati wal-ardi, Rabba kulli shay'in wa malikahu, ashhadu an la ilaha illa Anta, a'udhu bika min sharri nafsi, wa min sharri al-shaytani wa shirkih, wa an aqtarifa 'ala nafsi su'an aw ajurrahu ila muslim.",
    english:
      'O Allah, Knower of the unseen and the seen, Creator of the heavens and the earth, Lord and Sovereign of all things, I bear witness that none has the right to be worshipped except You. I take refuge in You from the evil of my soul and from the evil and polytheism of Shaytan, and from committing wrong against myself or bringing it upon another Muslim.',
    urdu: 'اے اللہ! غیب و شہادت کے جاننے والے، آسمانوں اور زمین کے پیدا کرنے والے، ہر چیز کے رب اور مالک! میں گواہی دیتا ہوں کہ تیرے سوا کوئی معبود نہیں۔ میں اپنے نفس کے شر سے، شیطان کے شر اور اس کے شرک سے، اور اس بات سے تیری پناہ مانگتا ہوں کہ میں اپنے آپ پر کوئی برائی کماؤں یا کسی مسلمان کی طرف کوئی برائی پہنچاؤں۔',
    romanUrdu: 'Aye Allah! Ghaib o shahadat ke jaanne wale, aasmanon aur zameen ke paida karne wale, har cheez ke Rab aur Malik! Main gawahi deta hoon ke Tere siwa koi ma’bood nahi. Main apne nafs ke shar se, shaitan ke shar aur us ke shirk se, aur is baat se Teri panah maangta hoon ke main apne aap par koi buraai kamaaun ya kisi Musalman ki taraf koi buraai pahunchaaun.',
    reference: 'Jami‘ at-Tirmidhi 3392',
  },
  {
    id: 's-dua-me-5',
    sourceGroup: 'sunnah',
    category: 'Morning & Evening',
    title: 'Blessings & Gratitude in the Morning',
    arabic:
      'اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ',
    transliteration:
      "Allahumma ma asbaha bi min ni'matin aw bi-ahadin min khalqika fa-minka wahdaka la sharika laka, fa-laka al-hamdu wa laka al-shukr.",
    english:
      'O Allah, whatever blessing I or any of Your creation have risen upon this morning is from You alone without any partner, so for You is all praise and unto You all thanks.',
    urdu: 'اے اللہ! اس صبح مجھے یا تیری مخلوق میں سے کسی کو جو بھی نعمت حاصل ہوئی ہے وہ صرف تیری ہی طرف سے ہے، تیرا کوئی شریک نہیں، پس تمام تعریف اور شکر تیرے ہی لیے ہے۔',
    romanUrdu: 'Aye Allah! Is subah mujhe ya Teri makhlooq mein se kisi ko jo bhi ne’mat haasil hui hai woh sirf Teri hi taraf se hai, Tera koi shareek nahi, pas tamam tareef aur shukr Tere hi liye hai.',
    reference: 'Sunan Abi Dawud 5073',
  },
  {
    id: 's-dua-me-6',
    sourceGroup: 'sunnah',
    category: 'Morning & Evening',
    title: 'In Whose Name Nothing Causes Harm',
    arabic:
      'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration:
      "Bismillahi alladhi la yadurru ma'a ismihi shay'un fi al-ardi wa la fi al-sama'i wa Huwa al-Sami'u al-'Alim.",
    english:
      'In the name of Allah with whose name nothing is harmed on earth nor in the heavens, and He is the All-Hearing, the All-Knowing.',
    urdu: 'اس اللہ کے نام سے جس کے نام کی برکت سے زمین و آسمان کی کوئی چیز نقصان نہیں پہنچا سکتی، اور وہ خوب سننے والا، سب کچھ جاننے والا ہے۔',
    romanUrdu: 'Us Allah ke naam se jis ke naam ki barkat se zameen o aasman ki koi cheez nuqsan nahi pahuncha sakti, aur Woh khoob sunne wala, sab kuch jaanne wala hai.',
    reference: 'Sunan Abi Dawud 5088 (Recite 3 times morning & evening)',
  },
  {
    id: 's-dua-me-7',
    sourceGroup: 'sunnah',
    category: 'Morning & Evening',
    title: 'Content with Allah, Islam & Muhammad (ﷺ)',
    arabic: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    transliteration:
      'Raditu billahi Rabban, wa bil-Islami dinan, wa bi-Muhammadin sallAllahu ‘alayhi wa sallama nabiyya.',
    english:
      'I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (ﷺ) as my Prophet.',
    urdu: 'میں اللہ کو رب مان کر، اسلام کو دین مان کر، اور محمد (ﷺ) کو نبی مان کر راضی ہوں۔',
    romanUrdu: 'Main Allah ko Rab maan kar, Islam ko deen maan kar, aur Muhammad (ﷺ) ko Nabi maan kar raazi hoon.',
    reference: 'Musnad Ahmad 18967 (Recite 3 times morning & evening)',
  },

  // 3. Home & Masjid (7)
  {
    id: 's-dua-home-leave',
    sourceGroup: 'sunnah',
    category: 'Home & Masjid',
    title: 'When Leaving the Home',
    arabic: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'Bismillah, tawakkaltu ‘ala Allah, wa la hawla wa la quwwata illa billah.',
    english:
      'In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah.',
    urdu: 'اللہ کے نام سے، میں نے اللہ پر بھروسا کیا، اور نیکی کی طاقت اور گناہ سے بچنے کی قوت صرف اللہ ہی کی توفیق سے ہے۔',
    romanUrdu: 'Allah ke naam se, main ne Allah par bharosa kiya, aur neki ki taqat aur gunah se bachne ki quwwat sirf Allah hi ki taufeeq se hai.',
    reference: 'Sunan Abi Dawud 5095 & Jami‘ at-Tirmidhi 3426',
  },
  {
    id: 's-dua-home-leave-protect',
    sourceGroup: 'sunnah',
    category: 'Home & Masjid',
    title: 'Seeking Protection from Misguidance When Leaving Home',
    arabic:
      'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أَضِلَّ أَوْ أُضَلَّ، أَوْ أَزِلَّ أَوْ أُزَلَّ، أَوْ أَظْلِمَ أَوْ أُظْلَمَ، أَوْ أَجْهَلَ أَوْ يُجْهَلَ عَلَيَّ',
    transliteration:
      "Allahumma inni a'udhu bika an adilla aw udalla, aw azilla aw uzalla, aw azlima aw uzlama, aw ajhala aw yujhala 'alayya.",
    english:
      'O Allah, I seek refuge in You lest I stray or be led astray, slip or be made to slip, oppress or be oppressed, or behave foolishly or have foolishness shown towards me.',
    urdu: 'اے اللہ! میں تیری پناہ مانگتا ہوں اس سے کہ میں گمراہ ہوں یا گمراہ کیا جاؤں، پھسل جاؤں یا پھسلایا جاؤں، ظلم کروں یا مجھ پر ظلم کیا جائے، یا میں جہالت کروں یا میرے ساتھ جہالت کا برتاؤ کیا جائے۔',
    romanUrdu: 'Aye Allah! Main Teri panah maangta hoon is se ke main gumrah hoon ya gumrah kiya jaaun, phisal jaaun ya phislaya jaaun, zulm karoon ya mujh par zulm kiya jaaye, ya main jahalat karoon ya mere saath jahalat ka bartaao kiya jaaye.',
    reference: 'Sunan Abi Dawud 5094',
  },
  {
    id: 's-dua-home-enter',
    sourceGroup: 'sunnah',
    category: 'Home & Masjid',
    title: 'When Entering the Home',
    arabic:
      'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
    transliteration: 'Bismillahi walajna, wa bismillahi kharajna, wa ‘ala Allahi Rabbina tawakkalna.',
    english:
      'In the name of Allah we enter, and in the name of Allah we leave, and upon Allah our Lord we depend.',
    urdu: 'اللہ کے نام کے ساتھ ہم داخل ہوئے اور اللہ کے نام کے ساتھ ہم نکلے اور اپنے رب اللہ ہی پر ہم نے بھروسا کیا۔',
    romanUrdu: 'Allah ke naam ke saath hum daakhil hue aur Allah ke naam ke saath hum nikle aur apne Rab Allah hi par hum ne bharosa kiya.',
    reference: 'Sunan Abi Dawud 5096',
  },
  {
    id: 's-dua-masjid-go',
    sourceGroup: 'sunnah',
    category: 'Home & Masjid',
    title: 'When Walking to the Masjid (Dua for Light)',
    arabic:
      'اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي لِسَانِي نُورًا، وَفِي سَمْعِي نُورًا، وَفِي بَصَرِي نُورًا، وَمِنْ فَوْقِي نُورًا، وَمِنْ تَحْتِي نُورًا، وَعَنْ يَمِينِي نُورًا، وَعَنْ شِمَالِي نُورًا، وَمِنْ أَمَامِي نُورًا، وَمِنْ خَلْفِي نُورًا، وَاجْعَلْ فِي نَفْسِي نُورًا، وَأَعْظِمْ لِي نُورًا',
    transliteration:
      "Allahumma ij'al fi qalbi nuran, wa fi lisani nuran, wa fi sam'i nuran, wa fi basari nuran, wa min fawqi nuran, wa min tahti nuran, wa 'an yamini nuran, wa 'an shimali nuran, wa min amami nuran, wa min khalfi nuran, waj'al fi nafsi nuran, wa a'zim li nura.",
    english:
      'O Allah, place light in my heart, and on my tongue light, and in my hearing light, and in my sight light, and above me light, and beneath me light, and to my right light, and to my left light, and before me light, and behind me light. Place light in my soul and magnify for me light.',
    urdu: 'اے اللہ! میرے دل میں نور بھر دے، میری زبان میں نور، میرے کان میں نور، میری آنکھ میں نور، میرے اوپر نور، میرے نیچے نور، میرے دائیں نور، میرے بائیں نور، میرے آگے نور اور میرے پیچھے نور عطا فرما، اور میرے نفس میں نور پیدا فرما اور میرے لیے نور کو عظیم کر دے۔',
    romanUrdu: 'Aye Allah! Mere dil mein noor bhar de, meri zabaan mein noor, mere kaan mein noor, meri aankh mein noor, mere oopar noor, mere neeche noor, mere daayein noor, mere baayein noor, mere aage noor aur mere peeche noor ata farma, aur mere nafs mein noor paida farma aur mere liye noor ko azeem kar de.',
    reference: 'Sahih Muslim 763',
  },
  {
    id: 's-dua-masjid-enter',
    sourceGroup: 'sunnah',
    category: 'Home & Masjid',
    title: 'When Entering the Masjid',
    arabic:
      'أَعُوذُ بِاللَّهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ، بِسْمِ اللَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَىٰ رَسُولِ اللَّهِ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    transliteration:
      "A'udhu billahi al-'Azim, wa bi-wajhihi al-Karim, wa sultanihi al-qadim, min al-shaytani al-rajim. Bismillahi wal-salatu wal-salamu 'ala Rasulillah. Allahumma iftah li abwaba rahmatik.",
    english:
      'I seek refuge in Allah, the Supreme, and in His Noble Face, and in His eternal authority from the accursed Shaytan. In the name of Allah, and prayers and peace be upon the Messenger of Allah. O Allah, open the gates of Your mercy for me.',
    urdu: 'میں عظمت والے اللہ، اس کے کریم چہرے اور اس کی قدیم سلطنت کے واسطے سے شیطان مردود سے پناہ مانگتا ہوں۔ اللہ کے نام سے، اور رسول اللہ (ﷺ) پر درود و سلام ہو۔ اے اللہ! میرے لیے اپنی رحمت کے دروازے کھول دے۔',
    romanUrdu: 'Main azmat wale Allah, Us ke Kareem chehre aur Us ki qadeem saltanat ke waaste se shaitan mardood se panah maangta hoon. Allah ke naam se, aur Rasoolullah (ﷺ) par durood o salaam ho. Aye Allah! Mere liye Apni rehmat ke darwaze khol de.',
    reference: 'Sahih Muslim 713 & Sunan Abi Dawud 466',
  },
  {
    id: 's-dua-masjid-leave',
    sourceGroup: 'sunnah',
    category: 'Home & Masjid',
    title: 'When Leaving the Masjid',
    arabic:
      'بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَىٰ رَسُولِ اللَّهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ، اللَّهُمَّ اعْصِمْنِي مِنَ الشَّيْطَانِ الرَّجِيمِ',
    transliteration:
      "Bismillahi wal-salatu wal-salamu 'ala Rasulillah. Allahumma inni as'aluka min fadlik. Allahumma i'simni min al-shaytani al-rajim.",
    english:
      'In the name of Allah, and prayers and peace be upon the Messenger of Allah. O Allah, I ask You from Your favor. O Allah, guard me from the accursed Shaytan.',
    urdu: 'اللہ کے نام سے اور رسول اللہ (ﷺ) پر درود و سلام ہو۔ اے اللہ! میں تجھ سے تیرے فضل کا سوال کرتا ہوں۔ اے اللہ! مجھے شیطان مردود سے محفوظ رکھ۔',
    romanUrdu: 'Allah ke naam se aur Rasoolullah (ﷺ) par durood o salaam ho. Aye Allah! Main Tujh se Tere fazl ka sawal karta hoon. Aye Allah! Mujhe shaitan mardood se mehfooz rakh.',
    reference: 'Sahih Muslim 713 & Sunan Ibn Majah 773',
  },
  {
    id: 's-dua-after-adhan',
    sourceGroup: 'sunnah',
    category: 'Home & Masjid',
    title: 'After the Call to Prayer (Adhan)',
    arabic:
      'اللَّهُمَّ رَبَّ هَٰذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ',
    transliteration:
      "Allahumma Rabba hadhihi al-da'wati al-tammah, wal-salati al-qa'imah, ati Muhammadan al-wasilata wal-fadilah, wab'athhu maqaman mahmudan alladhi wa'adtah.",
    english:
      'O Allah, Lord of this perfect call and established prayer, grant Muhammad the intercession and favor, and raise him to the honored station You have promised him.',
    urdu: 'اے اللہ! اس کامل دعوت اور قائم ہونے والی نماز کے رب! محمد (ﷺ) کو وسیلہ اور فضیلت عطا فرما اور انہیں مقامِ محمود پر فائز فرما جس کا تو نے ان سے وعدہ فرمایا ہے۔',
    romanUrdu: 'Aye Allah! Is kaamil dawat aur qaim hone wali namaz ke Rab! Muhammad (ﷺ) ko waseela aur fazeelat ata farma aur unhein Maqam-e-Mahmood par faaiz farma jis ka Tu ne un se waada farmaya hai.',
    reference: 'Sahih al-Bukhari 614',
  },

  // 4. Travel (5)
  {
    id: 's-dua-travel-main',
    sourceGroup: 'sunnah',
    category: 'Travel',
    title: 'When Mounting a Vehicle or Starting a Journey',
    arabic:
      'بِسْمِ اللَّهِ، الْحَمْدُ لِلَّهِ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ، الْحَمْدُ لِلَّهِ، الْحَمْدُ لِلَّهِ، الْحَمْدُ لِلَّهِ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَكَ اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنتَ',
    transliteration:
      'Bismillah, Alhamdulillah. Subhana alladhi sakhkhara lana hadha wa ma kunna lahu muqrinin wa inna ila Rabbina lamunqalibun. Alhamdulillah (3x), Allahu Akbar (3x). Subhanaka Allahumma inni zalamtu nafsi faghfir li fa-innahu la yaghfiru al-dhunuba illa Anta.',
    english:
      'In the name of Allah, all praise is for Allah. Glory to Him who has subjected this to us, though we could never have had it by our efforts, and surely to our Lord we shall return. All praise is for Allah (three times), Allah is the Greatest (three times). Glory to You, O Allah, verily I have wronged myself, so forgive me, for surely none can forgive sins except You.',
    urdu: 'اللہ کے نام سے، تمام تعریفیں اللہ کے لیے ہیں۔ پاک ہے وہ ذات جس نے اس سواری کو ہمارے بس میں کر دیا حالانکہ ہم اسے قابو میں لانے والے نہ تھے، اور بے شک ہم اپنے رب کی طرف لوٹنے والے ہیں۔ تمام تعریف اللہ کے لیے ہے (تین بار)، اللہ سب سے بڑا ہے (تین بار)۔ اے اللہ تو پاک ہے، میں نے اپنی جان پر ظلم کیا، پس مجھے بخش دے کیونکہ تیرے سوا گناہ کوئی معاف نہیں کر سکتا۔',
    romanUrdu: 'Allah ke naam se, tamam tareefein Allah ke liye hain. Paak hai woh zaat jis ne is sawaari ko hamare bas mein kar diya halanke hum ise qaboo mein laane wale na the, aur beshak hum apne Rab ki taraf lautne wale hain. Tamam tareef Allah ke liye hai (teen baar), Allah sab se bada hai (teen baar). Aye Allah Tu paak hai, main ne apni jaan par zulm kiya, pas mujhe bakhsh de kyunke Tere siwa gunah koi maaf nahi kar sakta.',
    reference: 'Sahih Muslim 1342 & Jami‘ at-Tirmidhi 3446',
  },
  {
    id: 's-dua-travel-protection',
    sourceGroup: 'sunnah',
    category: 'Travel',
    title: 'Dua for Ease, Righteousness & Family Protection During Travel',
    arabic:
      'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَٰذَا الْبِرَّ وَالتَّقْوَىٰ، وَمِنَ الْعَمَلِ مَا تَرْضَىٰ، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَٰذَا وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الْأَهْلِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ الْمَنْظَرِ، وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ',
    transliteration:
      "Allahumma inna nas'aluka fi safarina hadha al-birra wal-taqwa, wa min al-'amali ma tarda. Allahumma hawwin 'alayna safarana hadha watwi 'anna bu'dah. Allahumma Anta al-Sahibu fi al-safar, wal-khalifatu fi al-ahl. Allahumma inni a'udhu bika min wa'tha'i al-safar, wa ka'abati al-manzar, wa su'i al-munqalabi fi al-mali wal-ahl.",
    english:
      'O Allah, we ask You in this journey of ours for righteousness, piety, and deeds that please You. O Allah, facilitate this journey for us and fold up its distance for us. O Allah, You are our Companion on the journey and the Guardian over our family. O Allah, I seek refuge in You from the hardships of travel, gloomy sights, and finding misfortune upon returning to wealth and family.',
    urdu: 'اے اللہ! ہم تجھ سے اپنے اس سفر میں نیکی، تقویٰ اور ایسے عمل کا سوال کرتے ہیں جس سے تو راضی ہو۔ اے اللہ! ہم پر یہ سفر آسان فرما اور اس کی دوری کو ہمارے لیے سمیٹ دے۔ اے اللہ! تو ہی سفر میں رفیق اور گھر والوں میں نگہبان ہے۔ اے اللہ! میں سفر کی مشقت، تکلیف دہ منظر اور مال و اہل میں بری واپسی سے تیری پناہ مانگتا ہوں۔',
    romanUrdu: 'Aye Allah! Hum Tujh se apne is safar mein neki, taqwa aur aise amal ka sawal karte hain jis se Tu raazi ho. Aye Allah! Hum par yeh safar aasaan farma aur is ki doori ko hamare liye samait de. Aye Allah! Tu hi safar mein rafeeq aur ghar walon mein nigehbaan hai. Aye Allah! Main safar ki mashaqqat, takleef-deh manzar aur maal o ahl mein buri waapsi se Teri panah maangta hoon.',
    reference: 'Sahih Muslim 1342',
  },
  {
    id: 's-dua-travel-return',
    sourceGroup: 'sunnah',
    category: 'Travel',
    title: 'Upon Returning from Travel',
    arabic: 'آيِبُونَ، تَائِبُونَ، عَابِدُونَ، لِرَبِّنَا حَامِدُونَ',
    transliteration: "Ayibuna, ta'ibuna, 'abiduna, li-Rabbina hamidun.",
    english:
      'We return safely, repenting to Allah, worshipping Him, and praising our Lord.',
    urdu: 'ہم بحفاظت لوٹنے والے، توبہ کرنے والے، عبادت کرنے والے اور اپنے رب کی حمد کرنے والے ہیں۔',
    romanUrdu: 'Hum ba-hifazat lautne wale, taubah karne wale, ibadat karne wale aur apne Rab ki hamd karne wale hain.',
    reference: 'Sahih Muslim 1342',
  },
  {
    id: 's-dua-travel-town',
    sourceGroup: 'sunnah',
    category: 'Travel',
    title: 'Upon Entering a Town or City',
    arabic:
      'اللَّهُمَّ رَبَّ السَّمَاوَاتِ السَّبْعِ وَمَا أَظْلَلْنَ، وَرَبَّ الْأَرَضِينَ السَّبْعِ وَمَا أَقْلَلْنَ، وَرَبَّ الشَّيَاطِينِ وَمَا أَضْلَلْنَ، وَرَبَّ الرِّيَاحِ وَمَا ذَرَيْنَ، أَسْأَلُكَ خَيْرَ هَٰذِهِ الْقَرْيَةِ وَخَيْرَ أَهْلِهَا، وَخَيْرَ مَا فِيهَا، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ أَهْلِهَا وَشَرِّ مَا فِيهَا',
    transliteration:
      "Allahumma Rabba al-samawati al-sab'i wa ma azlalna, wa Rabba al-aradina al-sab'i wa ma aqlalna, wa Rabba al-shayatini wa ma adlalna, wa Rabba al-riyahi wa ma dharayna, as'aluka khayra hadhihi al-qaryati wa khayra ahliha wa khayra ma fiha, wa a'udhu bika min sharriha wa sharri ahliha wa sharri ma fiha.",
    english:
      'O Allah, Lord of the seven heavens and all they overshadow, Lord of the seven earths and all they uphold, Lord of the devils and all they lead astray, and Lord of the winds and all they scatter: I ask You for the goodness of this town, the goodness of its inhabitants, and the goodness of what is in it; and I seek refuge in You from its evil, the evil of its inhabitants, and the evil of what is in it.',
    urdu: 'اے اللہ! ساتوں آسمانوں اور جن پر وہ سایہ فگن ہیں ان کے رب، ساتوں زمینوں اور جو کچھ وہ اٹھائے ہوئے ہیں ان کے رب، شیطانوں اور جنہیں وہ گمراہ کرتے ہیں ان کے رب، اور ہواؤں اور جو کچھ وہ اڑاتی ہیں ان کے رب! میں تجھ سے اس بستی کی بھلائی، اس کے رہنے والوں کی بھلائی اور جو کچھ اس میں ہے اس کی بھلائی مانگتا ہوں، اور اس کے شر، اس کے رہنے والوں کے شر اور اس میں موجود ہر شر سے تیری پناہ مانگتا ہوں۔',
    romanUrdu: 'Aye Allah! Saaton aasmanon aur jin par woh saya-figan hain un ke Rab, saaton zameenon aur jo kuch woh uthaye hue hain un ke Rab, shaitanon aur jinhein woh gumrah karte hain un ke Rab, aur hawaon aur jo kuch woh udaati hain un ke Rab! Main Tujh se is basti ki bhalaai, is ke rehne walon ki bhalaai aur jo kuch is mein hai us ki bhalaai maangta hoon, aur is ke shar, is ke rehne walon ke shar aur is mein maujood har shar se Teri panah maangta hoon.',
    reference: 'Sahih Ibn Hibban 2708 & al-Nasa’i al-Kubra 8808',
  },
  {
    id: 's-dua-travel-lodging',
    sourceGroup: 'sunnah',
    category: 'Travel',
    title: 'When Stopping or Lodging Anywhere',
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    transliteration: "A'udhu bi-kalimati Allahi al-tammati min sharri ma khalaq.",
    english:
      'I seek refuge in the perfect words of Allah from the evil of that which He has created.',
    urdu: 'میں اللہ کے مکمل کلمات کی پناہ مانگتا ہوں ہر اس چیز کے شر سے جو اس نے پیدا کی ہے۔',
    romanUrdu: 'Main Allah ke mukammal kalimaat ki panah maangta hoon har us cheez ke shar se jo Us ne paida ki hai.',
    reference: 'Sahih Muslim 2708',
  },

  // 5. Rain & Wind (5)
  {
    id: 's-dua-rain-falling',
    sourceGroup: 'sunnah',
    category: 'Rain & Wind',
    title: 'When Rain Begins to Fall',
    arabic: 'اللَّهُمَّ صَيِّبًا نَافِعًا',
    transliteration: "Allahumma sayyiban nafi'a.",
    english: 'O Allah, may it be a beneficial, abundant rain.',
    urdu: 'اے اللہ! اسے نفع بخش اور بابرکت بارش بنا دے۔',
    romanUrdu: 'Aye Allah! Ise nafa bakhsh aur ba-barkat baarish bana de.',
    reference: 'Sahih al-Bukhari 1032',
  },
  {
    id: 's-dua-rain-after',
    sourceGroup: 'sunnah',
    category: 'Rain & Wind',
    title: 'After Rain Has Fallen',
    arabic: 'مُطِرْنَا بِفَضْلِ اللَّهِ وَرَحْمَتِهِ',
    transliteration: 'Mutirna bi-fadli Allahi wa rahmatih.',
    english: 'We have been given rain by the grace and mercy of Allah.',
    urdu: 'ہم پر اللہ کے فضل اور اس کی رحمت سے بارش برسائی گئی ہے۔',
    romanUrdu: 'Hum par Allah ke fazl aur Us ki rehmat se baarish barsaayi gayi hai.',
    reference: 'Sahih al-Bukhari 846',
  },
  {
    id: 's-dua-rain-heavy',
    sourceGroup: 'sunnah',
    category: 'Rain & Wind',
    title: 'When Rain Becomes Excessive or Fearsome',
    arabic:
      'اللَّهُمَّ حَوَالَيْنَا وَلَا عَلَيْنَا، اللَّهُمَّ عَلَى الْآكَامِ وَالظِّرَابِ، وَبُطُونِ الْأَوْدِيَةِ، وَمَنَابِتِ الشَّجَرِ',
    transliteration:
      "Allahumma hawalayna wa la 'alayna, Allahumma 'ala al-akami wal-zirabi wa butuni al-awdiyati wa manabiti al-shajar.",
    english:
      'O Allah, let the rain fall around us and not upon us; O Allah, upon the plateaus, the hills, the valleys, and the roots of trees.',
    urdu: 'اے اللہ! ہمارے اردگرد برسا، ہم پر (نقصان کے لیے) نہ برسا۔ اے اللہ! ٹیلوں، پہاڑیوں، وادیوں کے نشیبوں اور درختوں کی جڑوں پر برسا۔',
    romanUrdu: 'Aye Allah! Hamare ird-gird barsa, hum par (nuqsan ke liye) na barsa. Aye Allah! Teelon, pahadiyon, waadiyon ke nashebon aur darakhton ki jadon par barsa.',
    reference: 'Sahih al-Bukhari 1014',
  },
  {
    id: 's-dua-wind-storm',
    sourceGroup: 'sunnah',
    category: 'Rain & Wind',
    title: 'When the Wind Blows Strongly',
    arabic:
      'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا، وَخَيْرَ مَا فِيهَا، وَخَيْرَ مَا أُرْسِلَتْ بِهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا، وَشَرِّ مَا فِيهَا، وَشَرِّ مَا أُرْسِلَتْ بِهِ',
    transliteration:
      "Allahumma inni as'aluka khayraha, wa khayra ma fiha, wa khayra ma ursilat bih, wa a'udhu bika min sharriha, wa sharri ma fiha, wa sharri ma ursilat bih.",
    english:
      'O Allah, I ask You for its goodness, the good within it, and the good with which it was sent; and I seek refuge in You from its evil, the evil within it, and the evil with which it was sent.',
    urdu: 'اے اللہ! میں تجھ سے اس ہوا کی بھلائی، اس کے اندر کی بھلائی اور جس مقصد کے لیے یہ بھیجی گئی ہے اس کی بھلائی مانگتا ہوں، اور اس کے شر، اس کے اندر کے شر اور جس شر کے ساتھ یہ بھیجی گئی ہے اس سے تیری پناہ مانگتا ہوں۔',
    romanUrdu: 'Aye Allah! Main Tujh se is hawa ki bhalaai, is ke andar ki bhalaai aur jis maqsad ke liye yeh bheji gayi hai us ki bhalaai maangta hoon, aur is ke shar, is ke andar ke shar aur jis shar ke saath yeh bheji gayi hai us se Teri panah maangta hoon.',
    reference: 'Sahih Muslim 899',
  },
  {
    id: 's-dua-thunder',
    sourceGroup: 'sunnah',
    category: 'Rain & Wind',
    title: 'Upon Hearing Thunder',
    arabic: 'سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ',
    transliteration: 'Subhana alladhi yusabbihu al-ra‘du bi-hamdihi wal-mala’ikatu min khifatih.',
    english:
      'Glory is to Him whom the thunder glorifies with His praise and the angels in awe of Him.',
    urdu: 'پاک ہے وہ ذات جس کی حمد کے ساتھ گرج تسبیح کرتی ہے اور فرشتے اس کے خوف سے تسبیح کرتے ہیں۔',
    romanUrdu: 'Paak hai woh zaat jis ki hamd ke saath garaj tasbeeh karti hai aur farishte Us ke khauf se tasbeeh karte hain.',
    reference: 'Muwatta Malik 1802 (Sunan al-Kubra al-Bayhaqi)',
  },

  // 6. Anxiety & Grief (7)
  {
    id: 's-dua-anx-1',
    sourceGroup: 'sunnah',
    category: 'Anxiety & Grief',
    title: 'The Grand Dua for Removing Anxiety & Sorrow',
    arabic:
      'اللَّهُمَّ إِنِّي عَبْدُكَ، ابْنُ عَبْدِكَ، ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ، أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ، سَمَّيْتَ بِهِ نَفْسَكَ، أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ، أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ، أَوِ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ، أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي، وَنُورَ صَدْرِي، وَجِلَاءَ حُزْنِي، وَذَهَابَ هَمِّي',
    transliteration:
      "Allahumma inni 'abduka, ibnu 'abdika, ibnu amatika, nasiyati bi-yadika, madin fiyya hukmuka, 'adlun fiyya qada'uka. As'aluka bi-kulli ismin huwa laka, sammayta bihi nafsaka, aw anzaltahu fi kitabika, aw 'allamtahu ahadan min khalqika, aw ista'tharta bihi fi 'ilmi al-ghaybi 'indaka, an taj'ala al-Qur'ana rabi'a qalbi, wa nura sadri, wa jila'a huzni, wa dhahaba hammi.",
    english:
      'O Allah, I am Your servant, son of Your servant, son of Your maidservant. My forelock is in Your hand, Your command over me is forever executed, and Your decree over me is just. I ask You by every name belonging to You which You have named Yourself with, or revealed in Your Book, or taught to any of Your creation, or preserved in the knowledge of the unseen with You, that You make the Quran the spring of my heart, the light of my chest, the remover of my sorrow, and the reliever of my anxiety.',
    urdu: 'اے اللہ! میں تیرا بندہ ہوں، تیرے بندے کا بیٹا اور تیری بندی کا بیٹا ہوں، میری پیشانی تیرے ہاتھ میں ہے، مجھ پر تیرا حکم نافذ ہے، میرے بارے میں تیرا فیصلہ سراسر عدل ہے۔ میں تجھ سے تیرے ہر اس نام کے واسطے سے سوال کرتا ہوں جو تو نے خود رکھا، یا اپنی کتاب میں نازل فرمایا، یا اپنی مخلوق میں سے کسی کو سکھایا، یا اپنے پاس علمِ غیب میں محفوظ رکھا، کہ تو قرآن کو میرے دل کی بہار، میرے سینے کا نور، میرے غم کو دور کرنے والا اور میری پریشانیوں کو مٹانے والا بنا دے۔',
    romanUrdu: 'Aye Allah! Main Tera banda hoon, Tere bande ka beta aur Teri bandi ka beta hoon, meri peshani Tere haath mein hai, mujh par Tera hukm naafiz hai, mere baare mein Tera faisla saraasar adl hai. Main Tujh se Tere har us naam ke waaste se sawal karta hoon jo Tu ne khud rakha, ya Apni kitaab mein naazil farmaya, ya Apni makhlooq mein se kisi ko sikhaya, ya Apne paas ilm-e-ghaib mein mehfooz rakha, ke Tu Quran ko mere dil ki bahaar, mere seene ka noor, mere gham ko door karne wala aur meri pareshaniyon ko mitane wala bana de.',
    reference: 'Musnad Ahmad 3712',
  },
  {
    id: 's-dua-anx-2',
    sourceGroup: 'sunnah',
    category: 'Anxiety & Grief',
    title: 'Protection from Anxiety, Weakness, Laziness & Debt',
    arabic:
      'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
    transliteration:
      "Allahumma inni a'udhu bika min al-hammi wal-hazan, wal-'ajzi wal-kasal, wal-bukhli wal-jubn, wa dala'i al-dayni wa ghalabati al-rijal.",
    english:
      'O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and being overpowered by men.',
    urdu: 'اے اللہ! میں غم و فکر، عاجزی و سستی، بخل و بزدلی، قرض کے بوجھ اور لوگوں کے غلبے سے تیری پناہ مانگتا ہوں۔',
    romanUrdu: 'Aye Allah! Main gham o fikr, aajizi o susti, bukhl o buzdili, qarz ke bojh aur logon ke ghalbe se Teri panah maangta hoon.',
    reference: 'Sahih al-Bukhari 6369',
  },
  {
    id: 's-dua-anx-3',
    sourceGroup: 'sunnah',
    category: 'Anxiety & Grief',
    title: 'Dua in Moments of Severe Distress (Al-Karb)',
    arabic:
      'لَا إِلَٰهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَٰهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَٰهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ',
    transliteration:
      "La ilaha illAllahu al-'Azim al-Halim, La ilaha illAllahu Rabbu al-'Arshi al-'Azim, La ilaha illAllahu Rabbu al-samawati wa Rabbu al-ardi wa Rabbu al-'Arshi al-Karim.",
    english:
      'None has the right to be worshipped except Allah, the Magnificent, the Forbearing. None has the right to be worshipped except Allah, Lord of the Magnificent Throne. None has the right to be worshipped except Allah, Lord of the heavens, Lord of the earth, and Lord of the Noble Throne.',
    urdu: 'اللہ کے سوا کوئی معبود نہیں جو نہایت عظمت والا اور بردبار ہے۔ اللہ کے سوا کوئی معبود نہیں جو عرشِ عظیم کا رب ہے۔ اللہ کے سوا کوئی معبود نہیں جو آسمانوں کا رب، زمین کا رب اور عرشِ کریم کا رب ہے۔',
    romanUrdu: 'Allah ke siwa koi ma’bood nahi jo nihayat azmat wala aur burdbaar hai. Allah ke siwa koi ma’bood nahi jo Arsh-e-Azeem ka Rab hai. Allah ke siwa koi ma’bood nahi jo aasmanon ka Rab, zameen ka Rab aur Arsh-e-Kareem ka Rab hai.',
    reference: 'Sahih al-Bukhari 6346 & Sahih Muslim 2730',
  },
  {
    id: 's-dua-anx-4',
    sourceGroup: 'sunnah',
    category: 'Anxiety & Grief',
    title: 'O Ever-Living, In Your Mercy I Seek Relief',
    arabic: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَىٰ نَفْسِي طَرْفَةَ عَيْنٍ',
    transliteration:
      "Ya Hayyu Ya Qayyum bi-rahmatika astaghith, aslih li sha'ni kullahu wa la takilni ila nafsi tarfata 'ayn.",
    english:
      'O Ever-Living, O Sustainer of all, in Your mercy I seek relief! Rectify all of my affairs and do not leave me to myself even for the blink of an eye.',
    urdu: 'اے ہمیشہ زندہ رہنے والے! اے سب کو تھامنے والے! تیری ہی رحمت کے وسیلے سے فریاد کرتا ہوں۔ میرے تمام معاملات درست فرما دے اور پلک جھپکنے کے برابر بھی مجھے میرے نفس کے حوالے نہ فرما۔',
    romanUrdu: 'Aye hamesha zinda rehne wale! Aye sab ko thaamne wale! Teri hi rehmat ke waseele se faryaad karta hoon. Mere tamam muamlaat durust farma de aur palak jhapakne ke barabar bhi mujhe mere nafs ke hawaale na farma.',
    reference: 'Sunan an-Nasa’i al-Kubra 10405',
  },
  {
    id: 's-dua-anx-5',
    sourceGroup: 'sunnah',
    category: 'Anxiety & Grief',
    title: 'Do Not Abandon Me to Myself for a Blink of an Eye',
    arabic:
      'اللَّهُمَّ رَحْمَتَكَ أَرْجُو فَلَا تَكِلْنِي إِلَىٰ نَفْسِي طَرْفَةَ عَيْنٍ، وَأَصْلِحْ لِي شَأْنِي كُلَّهُ، لَا إِلَٰهَ إِلَّا أَنتَ',
    transliteration:
      "Allahumma rahmataka arju fala takilni ila nafsi tarfata 'ayn, wa aslih li sha'ni kullahu, la ilaha illa Anta.",
    english:
      'O Allah, it is Your mercy that I hope for, so do not leave me in charge of my affairs even for a blink of an eye, and rectify for me all of my affairs. None has the right to be worshipped except You.',
    urdu: 'اے اللہ! میں تیری رحمت کا امیدوار ہوں، پس مجھے پلک جھپکنے کے برابر بھی میرے نفس کے سپرد نہ فرما، اور میرے تمام معاملات سنوار دے، تیرے سوا کوئی معبود نہیں۔',
    romanUrdu: 'Aye Allah! Main Teri rehmat ka ummeedwaar hoon, pas mujhe palak jhapakne ke barabar bhi mere nafs ke supurd na farma, aur mere tamam muamlaat sanwaar de, Tere siwa koi ma’bood nahi.',
    reference: 'Sunan Abi Dawud 5090',
  },
  {
    id: 's-dua-anx-6',
    sourceGroup: 'sunnah',
    category: 'Anxiety & Grief',
    title: 'When Overwhelmed by Debt',
    arabic: 'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ',
    transliteration: "Allahumma ikfini bi-halalika 'an haramika, wa aghnini bi-fadlika 'amman siwak.",
    english:
      'O Allah, suffice me with what You have made lawful against what You have forbidden, and make me independent of all others besides You by Your bounty.',
    urdu: 'اے اللہ! مجھے اپنے حلال کے ذریعے اپنے حرام سے بے نیاز فرما دے، اور اپنے فضل کے ذریعے اپنے سوا ہر ایک سے مستغنی کر دے۔',
    romanUrdu: 'Aye Allah! Mujhe Apne halaal ke zariye Apne haraam se be-niyaaz farma de, aur Apne fazl ke zariye Apne siwa har ek se mustaghni kar de.',
    reference: 'Jami‘ at-Tirmidhi 3563',
  },
  {
    id: 's-dua-anx-7',
    sourceGroup: 'sunnah',
    category: 'Anxiety & Grief',
    title: 'When Struck by a Calamity or Loss',
    arabic: 'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا',
    transliteration:
      "Inna lillahi wa inna ilayhi raji'un. Allahumma'jurni fi musibati wa akhlif li khayran minha.",
    english:
      'Indeed we belong to Allah, and indeed to Him we shall return. O Allah, reward me in my affliction and replace it for me with something better.',
    urdu: 'بے شک ہم اللہ ہی کے لیے ہیں اور بے شک ہم اسی کی طرف لوٹ کر جانے والے ہیں۔ اے اللہ! مجھے میری اس مصیبت میں اجر عطا فرما اور اس کے بدلے مجھے اس سے بہتر عطا فرما۔',
    romanUrdu: 'Beshak hum Allah hi ke liye hain aur beshak hum Usi ki taraf laut kar jaane wale hain. Aye Allah! Mujhe meri is museebat mein ajr ata farma aur is ke badle mujhe is se behtar ata farma.',
    reference: 'Sahih Muslim 918',
  },

  // 7. Forgiveness (6)
  {
    id: 's-dua-forg-1',
    sourceGroup: 'sunnah',
    category: 'Forgiveness',
    title: 'Sayyid al-Istighfar (Master Supplication for Forgiveness)',
    arabic:
      'اللَّهُمَّ أَنتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنتَ',
    transliteration:
      "Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika ma istata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bi-ni'matika 'alayya, wa abu'u bi-dhanbi faghfir li fa-innahu la yaghfiru al-dhunuba illa Anta.",
    english:
      'O Allah, You are my Lord; none has the right to be worshipped except You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me and I acknowledge my sin, so forgive me, for verily none can forgive sins except You.',
    urdu: 'اے اللہ! تو میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں، اور میں اپنی استطاعت کے مطابق تیرے عہد اور وعدے پر قائم ہوں۔ میں اپنے کیے ہوئے برے اعمال کے شر سے تیری پناہ مانگتا ہوں، میں تجھ پر اپنی نعمتوں کا اقرار کرتا ہوں اور اپنے گناہوں کا اعتراف کرتا ہوں، پس مجھے بخش دے کیونکہ تیرے سوا گناہ کوئی معاف نہیں کر سکتا۔',
    romanUrdu: 'Aye Allah! Tu mera Rab hai, Tere siwa koi ma’bood nahi, Tu ne mujhe paida kiya aur main Tera banda hoon, aur main apni istita’at ke mutabiq Tere ahd aur waade par qaim hoon. Main apne kiye hue bure aamaal ke shar se Teri panah maangta hoon, main Tujh par Apni ne’maton ka iqraar karta hoon aur apne gunahon ka aitraaf karta hoon, pas mujhe bakhsh de kyunke Tere siwa gunah koi maaf nahi kar sakta.',
    reference: 'Sahih al-Bukhari 6306',
  },
  {
    id: 's-dua-forg-2',
    sourceGroup: 'sunnah',
    category: 'Forgiveness',
    title: 'Before Taslim in Salah (Taught to Abu Bakr)',
    arabic:
      'اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا، وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنتَ، فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ وَارْحَمْنِي إِنَّكَ أَنتَ الْغَفُورُ الرَّحِيمُ',
    transliteration:
      'Allahumma inni zalamtu nafsi zulman kathiran, wa la yaghfiru al-dhunuba illa Anta, faghfir li maghfiratan min ‘indika warhamni innaka Anta al-Ghafur al-Rahim.',
    english:
      'O Allah, I have indeed wronged myself greatly, and none can forgive sins except You. So grant me forgiveness from Yourself and have mercy on me. Surely, You are the Oft-Forgiving, the Most Merciful.',
    urdu: 'اے اللہ! بے شک میں نے اپنی جان پر بہت بڑا ظلم کیا اور تیرے سوا گناہوں کو معاف کرنے والا کوئی نہیں۔ پس مجھے اپنی طرف سے خاص بخشش عطا فرما اور مجھ پر رحم کر، بے شک تو بہت بخشنے والا، نہایت رحم والا ہے۔',
    romanUrdu: 'Aye Allah! Beshak main ne apni jaan par bahut bada zulm kiya aur Tere siwa gunahon ko maaf karne wala koi nahi. Pas mujhe Apni taraf se khaas bakhshish ata farma aur mujh par reham kar, beshak Tu bahut bakhshne wala, nihayat reham wala hai.',
    reference: 'Sahih al-Bukhari 834 & Sahih Muslim 2705',
  },
  {
    id: 's-dua-forg-3',
    sourceGroup: 'sunnah',
    category: 'Forgiveness',
    title: 'Forgive All Sins — Minor, Major, First & Last',
    arabic:
      'اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ، دِقَّهُ وَجِلَّهُ، وَأَوَّلَهُ وَآخِرَهُ، وَعَلَانِيَتَهُ وَسِرَّهُ',
    transliteration:
      "Allahumma aghfir li dhanbi kullahu, diqqahu wa jillahu, wa awwalahu wa akhirahu, wa 'alaniyatahu wa sirrah.",
    english:
      'O Allah, forgive all of my sins: the small and the great, the first and the last, the open and the secret.',
    urdu: 'اے اللہ! میرے تمام گناہ بخش دے، چھوٹے ہوں یا بڑے، پہلے ہوں یا پچھلے، کھلے ہوں یا چھپے۔',
    romanUrdu: 'Aye Allah! Mere tamam gunah bakhsh de, chhote hon ya bade, pehle hon ya pichhle, khule hon ya chhupe.',
    reference: 'Sahih Muslim 483 (Recited in Sujud)',
  },
  {
    id: 's-dua-forg-4',
    sourceGroup: 'sunnah',
    category: 'Forgiveness',
    title: 'You Love to Pardon, So Pardon Me',
    arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
    transliteration: "Allahumma innaka 'Afuwwun tuhibbu al-'afwa fa'fu 'anni.",
    english:
      'O Allah, You are Pardoning and love to pardon, so pardon me.',
    urdu: 'اے اللہ! بے شک تو بہت معاف فرمانے والا ہے، معافی کو پسند فرماتا ہے، پس مجھے معاف فرما دے۔',
    romanUrdu: 'Aye Allah! Beshak Tu bahut maaf farmane wala hai, ma’afi ko pasand farmata hai, pas mujhe maaf farma de.',
    reference: 'Jami‘ at-Tirmidhi 3513',
  },
  {
    id: 's-dua-forg-5',
    sourceGroup: 'sunnah',
    category: 'Forgiveness',
    title: 'Dua for Expiation at the End of a Gathering (Kaffarat al-Majlis)',
    arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا أَنتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ',
    transliteration:
      "Subhanaka Allahumma wa bi-hamdika, ashhadu an la ilaha illa Anta, astaghfiruka wa atubu ilayk.",
    english:
      'Glory be to You, O Allah, and praise be to You. I bear witness that there is none worthy of worship except You. I seek Your forgiveness and repent to You.',
    urdu: 'اے اللہ! تو پاک ہے اور تیری ہی تعریف ہے۔ میں گواہی دیتا ہوں کہ تیرے سوا کوئی معبود نہیں، میں تجھ سے بخشش مانگتا ہوں اور تیری طرف توبہ کرتا ہوں۔',
    romanUrdu: 'Aye Allah! Tu paak hai aur Teri hi tareef hai. Main gawahi deta hoon ke Tere siwa koi ma’bood nahi, main Tujh se bakhshish maangta hoon aur Teri taraf taubah karta hoon.',
    reference: 'Jami‘ at-Tirmidhi 3433 & Sunan Abi Dawud 4859',
  },
  {
    id: 's-dua-forg-6',
    sourceGroup: 'sunnah',
    category: 'Forgiveness',
    title: 'Istighfar That Forgives Even Major Fleeing',
    arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ',
    transliteration:
      "Astaghfirullaha al-'Azima alladhi la ilaha illa Huwa al-Hayyu al-Qayyumu wa atubu ilayh.",
    english:
      'I seek forgiveness from Allah the Almighty, besides whom there is none worthy of worship, the Ever-Living, the Sustainer of all, and I repent to Him.',
    urdu: 'میں عظمت والے اللہ سے بخشش مانگتا ہوں جس کے سوا کوئی معبود نہیں، جو زندہ اور قائم رکھنے والا ہے، اور میں اسی کی طرف توبہ کرتا ہوں۔',
    romanUrdu: 'Main azmat wale Allah se bakhshish maangta hoon jis ke siwa koi ma’bood nahi, jo Zinda aur Qaim rakhne wala hai, aur main Usi ki taraf taubah karta hoon.',
    reference: 'Sunan Abi Dawud 1517 & Jami‘ at-Tirmidhi 3577',
  },

  // 8. Illness & Ruqyah (6)
  {
    id: 's-dua-ill-1',
    sourceGroup: 'sunnah',
    category: 'Illness & Ruqyah',
    title: 'Remove the Harm & Grant Complete Healing',
    arabic:
      'اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأْسَ، اشْفِ أَنتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا',
    transliteration:
      "Allahumma Rabba al-nas, adhhibi al-ba's, ishfi Anta al-Shafi, la shifa'a illa shifa'uka, shifa'an la yughadiru saqama.",
    english:
      'O Allah, Lord of mankind, remove the affliction and heal, for You are the Healer. There is no healing except Your healing — a healing that leaves behind no ailment.',
    urdu: 'اے اللہ، تمام انسانوں کے رب! تکلیف دور فرما دے اور شفا عطا فرما، تو ہی شفا دینے والا ہے، تیری شفا کے سوا کوئی شفا نہیں، ایسی شفا عطا فرما جو کسی بیماری کو باقی نہ چھوڑے۔',
    romanUrdu: 'Aye Allah, tamam insanon ke Rab! Takleef door farma de aur shifa ata farma, Tu hi shifa dene wala hai, Teri shifa ke siwa koi shifa nahi, aisi shifa ata farma jo kisi bimari ko baaqi na chhode.',
    reference: 'Sahih al-Bukhari 5743 & Sahih Muslim 2191',
  },
  {
    id: 's-dua-ill-2',
    sourceGroup: 'sunnah',
    category: 'Illness & Ruqyah',
    title: 'When Experiencing Physical Pain (Place Hand on Spot)',
    arabic:
      'بِسْمِ اللَّهِ (ثَلَاثًا) ۝ أَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ (سَبْعَ مَرَّاتٍ)',
    transliteration:
      "Bismillah (3 times). A'udhu billahi wa qudratihi min sharri ma ajidu wa uhadhir (7 times).",
    english:
      'In the name of Allah (three times). I seek refuge in Allah and His power from the evil of what I feel and what I fear (seven times).',
    urdu: 'اللہ کے نام سے (تین بار)۔ میں اللہ اور اس کی قدرت کی پناہ مانگتا ہوں اس تکلیف کے شر سے جو میں محسوس کر رہا ہوں اور جس سے میں ڈرتا ہوں (سات بار)۔',
    romanUrdu: 'Allah ke naam se (teen baar). Main Allah aur Us ki qudrat ki panah maangta hoon is takleef ke shar se jo main mehsoos kar raha hoon aur jis se main darta hoon (saat baar).',
    reference: 'Sahih Muslim 2202',
  },
  {
    id: 's-dua-ill-3',
    sourceGroup: 'sunnah',
    category: 'Illness & Ruqyah',
    title: 'When Visiting Someone Who Is Ill (7 Times)',
    arabic: 'أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ',
    transliteration: "As'alu Allaha al-'Azim Rabba al-'Arshi al-'Azim an yashfiyak.",
    english:
      'I ask Allah the Almighty, Lord of the Mighty Throne, to heal you.',
    urdu: 'میں عظمت والے اللہ سے، جو عرشِ عظیم کا رب ہے، دعا کرتا ہوں کہ وہ آپ کو شفا عطا فرمائے۔',
    romanUrdu: 'Main azmat wale Allah se, jo Arsh-e-Azeem ka Rab hai, dua karta hoon ke Woh aap ko shifa ata farmaaye.',
    reference: 'Sunan Abi Dawud 3106 & Jami‘ at-Tirmidhi 2083',
  },
  {
    id: 's-dua-ill-4',
    sourceGroup: 'sunnah',
    category: 'Illness & Ruqyah',
    title: 'No Harm — Purification, If Allah Wills',
    arabic: 'لَا بَأْسَ، طَهُورٌ إِنْ شَاءَ اللَّهُ',
    transliteration: "La ba's, tahurun in sha'Allah.",
    english: 'No harm; it is a purification (from sins), if Allah wills.',
    urdu: 'کوئی حرج نہیں، ان شاء اللہ یہ بیماری گناہوں سے پاکیزگی کا ذریعہ ہے۔',
    romanUrdu: 'Koi harj nahi, In sha Allah yeh bimari gunahon se pakeezgi ka zariya hai.',
    reference: 'Sahih al-Bukhari 3616',
  },
  {
    id: 's-dua-ill-5',
    sourceGroup: 'sunnah',
    category: 'Illness & Ruqyah',
    title: 'Ruqyah of Angel Jibril Over the Prophet (ﷺ)',
    arabic:
      'بِسْمِ اللَّهِ أَرْقِيكَ، مِنْ كُلِّ شَيْءٍ يُؤْذِيكَ، مِنْ شَرِّ كُلِّ نَفْسٍ أَوْ عَيْنِ حَاسِدٍ، اللَّهُ يَشْفِيكَ، بِسْمِ اللَّهِ أَرْقِيكَ',
    transliteration:
      "Bismillahi arqika, min kulli shay'in yu'dhika, min sharri kulli nafsin aw 'ayni hasid, Allahu yashfika, bismillahi arqik.",
    english:
      'In the name of Allah I perform Ruqyah upon you, from everything that harms you, from the evil of every soul or envious eye; may Allah heal you. In the name of Allah I perform Ruqyah upon you.',
    urdu: 'اللہ کے نام سے میں تم پر دم کرتا ہوں، ہر اس چیز سے جو تمہیں تکلیف دے، ہر نفس کے شر یا حسد کرنے والی آنکھ سے، اللہ تمہیں شفا دے، اللہ کے نام سے میں تم پر دم کرتا ہوں۔',
    romanUrdu: 'Allah ke naam se main tum par dam karta hoon, har us cheez se jo tumhein takleef de, har nafs ke shar ya hasad karne wali aankh se, Allah tumhein shifa de, Allah ke naam se main tum par dam karta hoon.',
    reference: 'Sahih Muslim 2186',
  },
  {
    id: 's-dua-ill-6',
    sourceGroup: 'sunnah',
    category: 'Illness & Ruqyah',
    title: 'Seeking Refuge for Children & Loved Ones',
    arabic:
      'أُعِيذُكُمَا بِكَلِمَاتِ اللَّهِ التَّامَّةِ، مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ',
    transliteration:
      "U'idhukuma bi-kalimati Allahi al-tammah, min kulli shaytanin wa hammah, wa min kulli 'aynin lammah.",
    english:
      'I seek protection for you in the perfect words of Allah from every devil and every venomous creature, and from every evil, envious eye.',
    urdu: 'میں تمہیں اللہ کے مکمل کلمات کی پناہ میں دیتا ہوں، ہر شیطان سے، ہر زہریلے جانور سے اور ہر نظرِ بد سے۔',
    romanUrdu: 'Main tumhein Allah ke mukammal kalimaat ki panah mein deta hoon, har shaitan se, har zehreele jaanwar se aur har nazar-e-bad se.',
    reference: 'Sahih al-Bukhari 3371',
  },

  // 9. Istikharah (5)
  {
    id: 's-dua-ist-1',
    sourceGroup: 'sunnah',
    category: 'Istikharah',
    title: 'Complete Salat al-Istikharah Supplication (Seeking Allah’s Guidance)',
    arabic:
      'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ، وَتَعْلَمُ وَلَا أَعْلَمُ، وَأَنتَ عَلَّامُ الْغُيُوبِ، اللَّهُمَّ إِنْ كُنتَ تَعْلَمُ أَنَّ هَٰذَا الْأَمْرَ خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي ثُمَّ بَارِكْ لِي فِيهِ، وَإِنْ كُنتَ تَعْلَمُ أَنَّ هَٰذَا الْأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ وَاقْدُرْ لِيَ الْخَيْرَ حَيْثُ كَانَ ثُمَّ أَرْضِنِي بِهِ',
    transliteration:
      "Allahumma inni astakhiruka bi-'ilmika, wa astaqdiruka bi-qudratika, wa as'aluka min fadlika al-'azim, fa-innaka taqdiru wa la aqdiru, wa ta'lamu wa la a'lamu, wa Anta 'Allamu al-ghuyub. Allahumma in kunta ta'lamu anna hadha al-amra khayrun li fi dini wa ma'ashi wa 'aqibati amri faqdurhu li wa yassirhu li thumma barik li fih; wa in kunta ta'lamu anna hadha al-amra sharrun li fi dini wa ma'ashi wa 'aqibati amri fasrifhu 'anni wasrifni 'anhu waqdur liya al-khayra haythu kana thumma ardini bih.",
    english:
      'O Allah, I seek Your counsel by Your knowledge and by Your power I seek strength, and I ask You from Your immense favor, for indeed You have power and I do not, and You know while I do not know, and You are the Knower of the unseen. O Allah, if You know that this affair is good for me in my religion, my livelihood, and the outcome of my affairs, then decree it for me, make it easy for me, and then bless me in it. And if You know that this affair is harmful for me in my religion, my livelihood, and the outcome of my affairs, then turn it away from me and turn me away from it, and decree for me what is good wherever it may be, and make me pleased with it.',
    urdu: 'اے اللہ! میں تیرے علم کے ذریعے تجھ سے خیر طلب کرتا ہوں، اور تیری قدرت کے ذریعے تجھ سے طاقت مانگتا ہوں، اور تیرے عظیم فضل کا سوال کرتا ہوں۔ کیونکہ تو قدرت رکھتا ہے اور میں قدرت نہیں رکھتا، تو جانتا ہے اور میں نہیں جانتا، اور تو غیبوں کا خوب جاننے والا ہے۔ اے اللہ! اگر تو جانتا ہے کہ یہ کام میرے لیے میرے دین، میری معاش اور میرے انجام کے اعتبار سے بہتر ہے تو اسے میرے لیے مقدر فرما، اسے میرے لیے آسان کر اور پھر اس میں میرے لیے برکت عطا فرما۔ اور اگر تو جانتا ہے کہ یہ کام میرے لیے میرے دین، میری معاش اور میرے انجام کے اعتبار سے برا ہے تو اسے مجھ سے پھیر دے اور مجھے اس سے پھیر دے، اور میرے لیے جہاں کہیں بھلائی ہو وہ مقدر فرما اور پھر مجھے اس پر راضی کر دے۔',
    romanUrdu: 'Aye Allah! Main Tere ilm ke zariye Tujh se khair talab karta hoon, aur Teri qudrat ke zariye Tujh se taqat maangta hoon, aur Tere azeem fazl ka sawal karta hoon. Kyunke Tu qudrat rakhta hai aur main qudrat nahi rakhta, Tu jaanta hai aur main nahi jaanta, aur Tu ghaibon ka khoob jaanne wala hai. Aye Allah! Agar Tu jaanta hai ke yeh kaam mere liye mere deen, meri ma’ash aur mere anjaam ke aitbaar se behtar hai to ise mere liye muqaddar farma, ise mere liye aasaan kar aur phir is mein mere liye barkat ata farma. Aur agar Tu jaanta hai ke yeh kaam mere liye mere deen, meri ma’ash aur mere anjaam ke aitbaar se bura hai to ise mujh se pher de aur mujhe is se pher de, aur mere liye jahan kahin bhalaai ho woh muqaddar farma aur phir mujhe is par raazi kar de.',
    reference: 'Sahih al-Bukhari 1162 (Recited after 2 voluntary rak‘ahs)',
  },
  {
    id: 's-dua-ist-2',
    sourceGroup: 'sunnah',
    category: 'Istikharah',
    title: 'Guide Me to the Best of Conduct & Make Easy Every Affair',
    arabic:
      'اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَىٰ وَالسَّدَادَ',
    transliteration: "Allahumma ihdini wa saddidni, Allahumma inni as'aluka al-huda wal-sadad.",
    english:
      'O Allah, guide me and keep me upright. O Allah, I ask You for guidance and correctness in my affairs.',
    urdu: 'اے اللہ! مجھے ہدایت عطا فرما اور سیدھے راستے پر قائم رکھ۔ اے اللہ! میں تجھ سے ہدایت اور درستیِ کار کا سوال کرتا ہوں۔',
    romanUrdu: 'Aye Allah! Mujhe hidayat ata farma aur seedhe raaste par qaim rakh. Aye Allah! Main Tujh se hidayat aur durusti-e-kaar ka sawal karta hoon.',
    reference: 'Sahih Muslim 2725',
  },
  {
    id: 's-dua-ist-3',
    sourceGroup: 'sunnah',
    category: 'Istikharah',
    title: 'Asking for Guidance in Deeds, Speech & Morals',
    arabic:
      'اللَّهُمَّ اهْدِنِي لِأَحْسَنِ الْأَعْمَالِ وَأَحْسَنِ الْأَخْلَاقِ، لَا يَهْدِي لِأَحْسَنِهَا إِلَّا أَنتَ، وَقِنِي سَيِّئَ الْأَعْمَالِ وَسَيِّئَ الْأَخْلَاقِ، لَا يَقِي سَيِّئَهَا إِلَّا أَنتَ',
    transliteration:
      "Allahumma ihdini li-ahsani al-a'mali wa ahsani al-akhlaq, la yahdi li-ahsaniha illa Anta, wa qini sayyi'a al-a'mali wa sayyi'a al-akhlaq, la yaqi sayyi'aha illa Anta.",
    english:
      'O Allah, guide me to the best of deeds and the best of morals; none guides to the best of them except You. And protect me from evil deeds and evil morals; none protects from their evil except You.',
    urdu: 'اے اللہ! مجھے بہترین اعمال اور بہترین اخلاق کی ہدایت دے، تیرے سوا ان میں سے بہترین کی طرف کوئی رہنمائی نہیں کر سکتا؛ اور مجھے برے اعمال اور برے اخلاق سے بچا، تیرے سوا ان کے شر سے کوئی نہیں بچا سکتا۔',
    romanUrdu: 'Aye Allah! Mujhe behtareen aamaal aur behtareen akhlaaq ki hidayat de, Tere siwa in mein se behtareen ki taraf koi rehnumai nahi kar sakta; aur mujhe bure aamaal aur bure akhlaaq se bacha, Tere siwa in ke shar se koi nahi bacha sakta.',
    reference: 'Sunan an-Nasa’i 896',
  },
  {
    id: 's-dua-ist-4',
    sourceGroup: 'sunnah',
    category: 'Istikharah',
    title: 'Asking Allah for Piety, Chastity & Self-Sufficiency',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَىٰ وَالتُّقَىٰ وَالْعَفَافَ وَالْغِنَىٰ',
    transliteration: "Allahumma inni as'aluka al-huda wal-tuqa wal-'afafa wal-ghina.",
    english:
      'O Allah, I ask You for guidance, piety, chastity, and contentment.',
    urdu: 'اے اللہ! میں تجھ سے ہدایت، تقویٰ، پاکدامنی اور دل کی غنا کا سوال کرتا ہوں۔',
    romanUrdu: 'Aye Allah! Main Tujh se hidayat, taqwa, paak-daamani aur dil ki ghina ka sawal karta hoon.',
    reference: 'Sahih Muslim 2721',
  },
  {
    id: 's-dua-ist-5',
    sourceGroup: 'sunnah',
    category: 'Istikharah',
    title: 'Nothing Is Easy Except What You Make Easy',
    arabic: 'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا',
    transliteration:
      "Allahumma la sahla illa ma ja'altahu sahla, wa Anta taj'alu al-hazna idha shi'ta sahla.",
    english:
      'O Allah, there is no ease except in that which You have made easy, and You make the difficulty, if You wish, easy.',
    urdu: 'اے اللہ! کوئی کام آسان نہیں مگر وہ جسے تو آسان کر دے، اور تو جب چاہے مشکل کو بھی آسان بنا دیتا ہے۔',
    romanUrdu: 'Aye Allah! Koi kaam aasaan nahi magar woh jise Tu aasaan kar de, aur Tu jab chaahe mushkil ko bhi aasaan bana deta hai.',
    reference: 'Sahih Ibn Hibban 974',
  },

  // 10. Parents & Family (6)
  {
    id: 's-dua-fam-1',
    sourceGroup: 'sunnah',
    category: 'Parents & Family',
    title: 'Blessing for Newlyweds (Marriage Congratulations)',
    arabic: 'بَارَكَ اللَّهُ لَكَ، وَبَارَكَ عَلَيْكَ، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
    transliteration: "BarakAllahu laka, wa baraka 'alayka, wa jama'a baynakuma fi khayr.",
    english:
      'May Allah bless you, and shower His blessings upon you, and join you together in goodness.',
    urdu: 'اللہ آپ کو برکت دے، آپ پر برکت نازل فرمائے اور آپ دونوں کو بھلائی میں جمع رکھے۔',
    romanUrdu: 'Allah aap ko barkat de, aap par barkat naazil farmaaye aur aap dono ko bhalaai mein jama rakhe.',
    reference: 'Sunan Abi Dawud 2130 & Jami‘ at-Tirmidhi 1091',
  },
  {
    id: 's-dua-fam-2',
    sourceGroup: 'sunnah',
    category: 'Parents & Family',
    title: 'Setting Upright Religion, Affairs & Hereafter for Family',
    arabic:
      'اللَّهُمَّ أَصْلِحْ لِي دِينِي الَّذِي هُوَ عِصْمَةُ أَمْرِي، وَأَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي، وَأَصْلِحْ لِي آخِرَتِي الَّتِي فِيهَا مَعَادِي، وَاجْعَلِ الْحَيَاةَ زِيَادَةً لِي فِي كُلِّ خَيْرٍ، وَاجْعَلِ الْمَوْتَ رَاحَةً لِي مِنْ كُلِّ شَرٍّ',
    transliteration:
      "Allahumma aslih li dini alladhi huwa 'ismatu amri, wa aslih li dunyaya allati fiha ma'ashi, wa aslih li akhirati allati fiha ma'adi, waj'ali al-hayata ziyadatan li fi kulli khayr, waj'ali al-mawta rahatan li min kulli sharr.",
    english:
      'O Allah, set right for me my religion which is the safeguard of my affairs, set right for me my world wherein is my living, set right for me my Hereafter to which is my return, make life for me an increase in every good, and make death for me a relief from every evil.',
    urdu: 'اے اللہ! میرے دین کو سنوار دے جو میرے تمام معاملات کی حفاظت کا ذریعہ ہے، میری دنیا کو سنوار دے جس میں میری معاش ہے، میری آخرت کو سنوار دے جس میں میرا لوٹنا ہے، زندگی کو میرے لیے ہر بھلائی میں اضافے کا سبب بنا دے اور موت کو میرے لیے ہر شر سے راحت بنا دے۔',
    romanUrdu: 'Aye Allah! Mere deen ko sanwaar de jo mere tamam muamlaat ki hifazat ka zariya hai, meri duniya ko sanwaar de jis mein meri ma’ash hai, meri aakhirat ko sanwaar de jis mein mera lautna hai, zindagi ko mere liye har bhalaai mein izafe ka sabab bana de aur maut ko mere liye har shar se raahat bana de.',
    reference: 'Sahih Muslim 2720',
  },
  {
    id: 's-dua-fam-3',
    sourceGroup: 'sunnah',
    category: 'Parents & Family',
    title: 'Seeking Blessings Upon a Household & Meal Host',
    arabic: 'اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ، وَاغْفِرْ لَهُمْ وَارْحَمْهُمْ',
    transliteration: 'Allahumma barik lahum fima razaqtahum, waghfir lahum warhamhum.',
    english:
      'O Allah, bless them in what You have provided them, and forgive them and have mercy upon them.',
    urdu: 'اے اللہ! جو رزق تو نے انہیں عطا فرمایا ہے اس میں ان کے لیے برکت عطا فرما، اور انہیں بخش دے اور ان پر رحم فرما۔',
    romanUrdu: 'Aye Allah! Jo rizq Tu ne unhein ata farmaya hai us mein un ke liye barkat ata farma, aur unhein bakhsh de aur un par reham farma.',
    reference: 'Sahih Muslim 2042',
  },
  {
    id: 's-dua-fam-4',
    sourceGroup: 'sunnah',
    category: 'Parents & Family',
    title: 'Before Conjugal Intimacy (Protection of Offspring)',
    arabic: 'بِسْمِ اللَّهِ، اللَّهُمَّ جَنِّبْنَا الشَّيْطَانَ، وَجَنِّبِ الشَّيْطَانَ مَا رَزَقْتَنَا',
    transliteration: 'Bismillah, Allahumma jannibna al-shaytana, wa jannibi al-shaytana ma razaqtana.',
    english:
      'In the name of Allah. O Allah, keep the devil away from us and keep the devil away from what You bless us with.',
    urdu: 'اللہ کے نام سے، اے اللہ! ہمیں شیطان سے دور رکھ اور جو اولاد تو ہمیں عطا فرمائے اسے بھی شیطان سے دور رکھ۔',
    romanUrdu: 'Allah ke naam se, Aye Allah! Hamein shaitan se door rakh aur jo aulaad Tu hamein ata farmaaye use bhi shaitan se door rakh.',
    reference: 'Sahih al-Bukhari 6388 & Sahih Muslim 1434',
  },
  {
    id: 's-dua-fam-5',
    sourceGroup: 'sunnah',
    category: 'Parents & Family',
    title: 'Dua for Deceased Parents & All Departed Believers',
    arabic:
      'اللَّهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ، وَعَافِهِمْ وَاعْفُ عَنْهُمْ، وَأَكْرِمْ نُزُلَهُمْ، وَوَسِّعْ مُدْخَلَهُمْ، وَاغْسِلْهُمْ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ، وَنَقِّهِمْ مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الْأَبْيَضَ مِنَ الدَّنَسِ',
    transliteration:
      "Allahumma aghfir lahum warhamhum, wa 'afihim wa'fu 'anhum, wa akrim nuzulahum, wa wassi' mudkhalahum, waghsilhum bil-ma'i wal-thalji wal-barad, wa naqqihim min al-khataya kama naqqayta al-thawba al-abyada min al-danas.",
    english:
      'O Allah, forgive them and have mercy upon them, grant them peace and pardon them. Honor their reception, widen their resting place, wash them with water, snow, and hail, and cleanse them of sins just as a white garment is cleansed from stain.',
    urdu: 'اے اللہ! انہیں بخش دے اور ان پر رحم فرما، انہیں عافیت دے اور ان سے درگزر فرما، ان کی مہمانی کو عزت عطا فرما، ان کی قبر کو کشادہ کر دے، انہیں پانی، برف اور اولوں سے دھو دے، اور انہیں گناہوں سے اس طرح پاک کر دے جیسے سفید کپڑا میل کچیل سے پاک کیا جاتا ہے۔',
    romanUrdu: 'Aye Allah! Unhein bakhsh de aur un par reham farma, unhein aafiyat de aur un se darguzar farma, un ki mehmaani ko izzat ata farma, un ki qabr ko kushada kar de, unhein paani, barf aur olon se dho de, aur unhein gunahon se is tarah paak kar de jaise safaid kapda mail kuchail se paak kiya jaata hai.',
    reference: 'Sahih Muslim 963',
  },
  {
    id: 's-dua-fam-6',
    sourceGroup: 'sunnah',
    category: 'Parents & Family',
    title: 'Blessings for Righteous Wealth, Children & Long Life in Obedience',
    arabic: 'اللَّهُمَّ أَكْثِرْ مَالِي وَوَلَدِي، وَبَارِكْ لِي فِيمَا أَعْطَيْتَنِي',
    transliteration: "Allahumma akthir mali wa waladi, wa barik li fima a'taytani.",
    english:
      'O Allah, increase my wealth and my children, and bless me in whatever You have granted me.',
    urdu: 'اے اللہ! میرے مال اور اولاد میں اضافہ فرما، اور جو کچھ تو نے مجھے عطا فرمایا ہے اس میں میرے لیے برکت ڈال دے۔',
    romanUrdu: 'Aye Allah! Mere maal aur aulaad mein izafa farma, aur jo kuch Tu ne mujhe ata farmaya hai us mein mere liye barkat daal de.',
    reference: 'Sahih al-Bukhari 6334 & Sahih Muslim 2480',
  },
];

export const DUA_ITEMS: DuaItem[] = [...QURAN_DUA_ITEMS, ...SUNNAH_DUA_ITEMS];
