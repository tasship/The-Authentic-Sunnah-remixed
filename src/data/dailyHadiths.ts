export interface DailySahihHadith {
  id: string;
  narratorEn: string;
  english: string;
  urdu: string;
  romanUrdu?: string;
  reference: string;
}

export const DAILY_SAHIH_HADITHS: DailySahihHadith[] = [
  {
    id: 'dh-1',
    narratorEn: 'Narrated Umar ibn al-Khattab (RA)',
    english:
      'The reward of deeds depends upon the intentions, and every person will get the reward according to what he has intended.',
    urdu: 'اعمال کا دارومدار نیتوں پر ہے اور ہر شخص کو وہی ملے گا جس کی اس نے نیت کی۔',
    romanUrdu:
      'Amaal ka daromadar niyaton par hai aur har shakhs ko wahi milega jis ki usne niyat ki.',
    reference: 'Sahih al-Bukhari 1 · Sahih Muslim 1907',
  },
  {
    id: 'dh-2',
    narratorEn: 'Narrated Abu Hurayrah (RA)',
    english:
      'Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise.',
    urdu: 'جو شخص علم کی تلاش میں کسی راستے پر چلتا ہے، اللہ تعالیٰ اس کے لیے جنت کا راستہ آسان فرما دیتا ہے۔',
    romanUrdu:
      'Jo shakhs ilm ki talash mein kisi raste par chalta hai, Allah Taala us ke liye Jannat ka rasta asaan farma deta hai.',
    reference: 'Sahih Muslim 2699',
  },
  {
    id: 'dh-3',
    narratorEn: 'Narrated Uthman ibn Affan (RA)',
    english:
      'The best among you are those who learn the Quran and teach it to others.',
    urdu: 'تم میں سے بہترین شخص وہ ہے جو قرآن سیکھے اور دوسروں کو سکھائے۔',
    romanUrdu:
      'Tum mein se behtareen shakhs woh hai jo Quran seekhe aur doosron ko sikhaye.',
    reference: 'Sahih al-Bukhari 5027',
  },
  {
    id: 'dh-4',
    narratorEn: 'Narrated Aishah (RA)',
    english:
      'The most beloved of deeds to Allah are those that are most consistent, even if they are small.',
    urdu: 'اللہ تعالیٰ کے نزدیک سب سے محبوب عمل وہ ہے جو ہمیشہ کیا جائے، خواہ وہ تھوڑا ہی کیوں نہ ہو۔',
    romanUrdu:
      'Allah Taala ke nazdeek sab se mehboob amal woh hai jo hamesha kiya jaye, khwah woh thoda hi kyun na ho.',
    reference: 'Sahih al-Bukhari 6464 · Sahih Muslim 782',
  },
  {
    id: 'dh-5',
    narratorEn: 'Narrated Abu Masud al-Ansari (RA)',
    english:
      'Whoever guides someone to goodness will have a reward like the one who did it.',
    urdu: 'جو شخص کسی کو بھلائی کی رہنمائی کرے، اسے عمل کرنے والے کے برابر ثواب ملتا ہے۔',
    romanUrdu:
      'Jo shakhs kisi ko bhalai ki rehnumai kare, use amal karne wale ke barabar sawab milta hai.',
    reference: 'Sahih Muslim 1893',
  },
  {
    id: 'dh-6',
    narratorEn: 'Narrated Abu Hurayrah (RA)',
    english:
      'Two words are light on the tongue, heavy on the Scale of Deeds, and beloved to the Most Merciful: SubhanAllahi wa bihamdihi, SubhanAllahil-Azim.',
    urdu: 'دو کلمے زبان پر ہلکے، میزانِ عمل میں بھاری اور رحمٰن کو بہت محبوب ہیں: سبحان اللہ وبحمدہ، سبحان اللہ العظیم۔',
    romanUrdu:
      'Do kalime zaban par halke, meezan-e-amal mein bhari aur Rahman ko bohat mehboob hain: SubhanAllahi wa bihamdihi, SubhanAllahil-Azim.',
    reference: 'Sahih al-Bukhari 6406 · Sahih Muslim 2694',
  },
  {
    id: 'dh-7',
    narratorEn: 'Narrated Anas ibn Malik (RA)',
    english:
      'None of you truly believes until he loves for his brother what he loves for himself.',
    urdu: 'تم میں سے کوئی شخص اس وقت تک کامل مومن نہیں ہو سکتا جب تک اپنے بھائی کے لیے بھی وہی پسند نہ کرے جو اپنے لیے پسند کرتا ہے۔',
    romanUrdu:
      'Tum mein se koi shakhs us waqt tak kamil momin nahi ho sakta jab tak apne bhai ke liye bhi wahi pasand na kare jo apne liye pasand karta hai.',
    reference: 'Sahih al-Bukhari 13 · Sahih Muslim 45',
  },
  {
    id: 'dh-8',
    narratorEn: 'Narrated Abu Hurayrah (RA)',
    english:
      'Charity does not decrease wealth; no one forgives except that Allah increases him in honor, and no one humbles himself for Allah except that Allah raises him.',
    urdu: 'صدقہ کرنے سے مال کم نہیں ہوتا، اور معاف کرنے سے اللہ بندے کی عزت بڑھاتا ہے، اور جو اللہ کے لیے عاجزی اختیار کرتا ہے اللہ اسے بلند کر دیتا ہے۔',
    romanUrdu:
      'Sadqah karne se maal kam nahi hota, aur maaf karne se Allah bande ki izzat badhata hai, aur jo Allah ke liye aajizi ikhtiyar karta hai Allah use buland kar deta hai.',
    reference: 'Sahih Muslim 2588',
  },
  {
    id: 'dh-9',
    narratorEn: 'Narrated Suhayb ibn Sinan (RA)',
    english:
      'Wondrous is the affair of the believer, for there is good for him in every matter: if ease befalls him he gives thanks, and if hardship befalls him he shows patience.',
    urdu: 'مومن کا معاملہ عجیب ہے، اس کے ہر حال میں خیر ہی خیر ہے: اگر خوشی ملے تو شکر کرتا ہے اور تکلیف پہنچے تو صبر کرتا ہے۔',
    romanUrdu:
      'Momin ka muamla ajeeb hai, us ke har haal mein khair hi khair hai: agar khushi mile to shukr karta hai aur takleef pohnche to sabr karta hai.',
    reference: 'Sahih Muslim 2999',
  },
  {
    id: 'dh-10',
    narratorEn: 'Narrated Abu Hurayrah (RA)',
    english:
      'When a human being dies, his deeds end except for three: ongoing charity (Sadaqah Jariyah), beneficial knowledge, or a righteous child who prays for him.',
    urdu: 'جب انسان فوت ہو جاتا ہے تو اس کے اعمال منقطع ہو جاتے ہیں سوائے تین چیزوں کے: صدقہ جاریہ، نفع بخش علم، یا نیک اولاد جو اس کے لیے دعا کرے۔',
    romanUrdu:
      'Jab insaan faut ho jata hai to us ke amaal munqata ho jate hain siwaye teen cheezon ke: sadqah jariyah, nafa bakhsh ilm, ya nek aulad jo us ke liye dua kare.',
    reference: 'Sahih Muslim 1631',
  },
  {
    id: 'dh-11',
    narratorEn: 'Narrated Jabir ibn Abdullah (RA)',
    english:
      'Every good deed is charity; and it is part of goodness to meet your brother with a cheerful face.',
    urdu: 'ہر نیکی صدقہ ہے، اور یہ بھی نیکی ہے کہ تم اپنے بھائی سے خندہ پیشانی (مسکراتے چہرے) سے ملو۔',
    romanUrdu:
      'Har neki sadqah hai, aur yeh bhi neki hai ke tum apne bhai se khanda peshani (muskurate chehre) se milo.',
    reference: 'Sahih al-Bukhari 6021 · Sahih Muslim 1005',
  },
  {
    id: 'dh-12',
    narratorEn: 'Narrated Abu Hurayrah (RA)',
    english:
      'The strong believer is not the one who overcomes others by physical strength, rather the strong one is he who controls himself when angry.',
    urdu: 'طاقتور وہ نہیں جو کشتی میں پچھاڑ دے، بلکہ اصل طاقتور وہ ہے جو غصے کے وقت اپنے آپ پر قابو رکھے۔',
    romanUrdu:
      'Taqatwar woh nahi jo kushti mein pachhad de, balke asl taqatwar woh hai jo ghusse ke waqt apne aap par qabu rakhe.',
    reference: 'Sahih al-Bukhari 6114 · Sahih Muslim 2609',
  },
];
