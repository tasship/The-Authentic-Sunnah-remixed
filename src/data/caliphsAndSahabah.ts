import { CaliphProfile, SahabiCategory, SahabiProfile } from '../types';

export const CALIPHS_DATA: CaliphProfile[] = [
  {
    id: 'caliph-abu-bakr',
    order: 1,
    name: 'Abu Bakr as-Siddiq',
    honorific: 'رضي الله عنه',
    nameUrdu: 'حضرت ابوبکر صدیقؓ',
    reignYears: '11–13 AH · 632–634 CE',
    titleBadge: 'First Caliph · As-Siddiq (The Truthful)',
    shortIntroEn:
      'Closest lifelong companion of the Prophet ﷺ, first adult male to embrace Islam, companion of Cave Thawr, and saviour of the Ummah’s unity after the Prophet’s passing.',
    shortIntroUr:
      'رسول اللہ ﷺ کے سب سے قریبی رفیق، بالغ مردوں میں سب سے پہلے ایمان لانے والے، یارِ غار اور خلیفہ اول جنہوں نے فتنہ ارتداد کے خلاف امت کو متحد رکھا۔',
    tabs: {
      earlyLifeEn: [
        'Born in Makkah roughly two years after the Year of the Elephant as Abdullah ibn Uthman (Abu Quhafah) of Banu Taym, he was respected across Quraysh for integrity, genealogy knowledge, and refusal to worship idols or drink wine even before Islam.',
        'A successful cloth merchant, he immediately accepted Islam without a moment of hesitation the very day Muhammad ﷺ shared prophethood with him—earning the enduring admiration of the Prophet ﷺ: "Whenever I invited anyone to Islam, he hesitated except Abu Bakr."',
      ],
      earlyLifeUr: [
        'آپ کا نام عبداللہ بن عثمان (ابو قحافہ) تھا اور آپ عام الفیل کے تقریباً دو سال بعد مکہ میں قبیلہ بنو تیم میں پیدا ہوئے۔ اسلام سے پہلے بھی آپ دیانت، علمِ انساب اور پاکیزگی میں مشہور تھے اور کبھی بت پرستی یا شراب کے قریب نہ گئے۔',
        'جب نبی کریم ﷺ نے نبوت کی دعوت دی تو آپ نے ایک لمحے کے تردد کے بغیر فوراً اسلام قبول کر لیا۔ آپ ﷺ نے فرمایا: "میں نے جس کو بھی اسلام کی دعوت دی اس نے کچھ توقف کیا، سوائے ابوبکرؓ کے۔"',
      ],
      companionshipEn: [
        'He spent his vast fortune freeing tortured enslaved believers, including Bilal ibn Rabah (RA) and Amir ibn Fuhayrah (RA). When Quraysh mocked the Night Journey (Al-Isra), he affirmed it instantly, receiving the title As-Siddiq (The Unwaveringly Truthful).',
        'Honored as the sole companion in Cave Thawr during the Hijrah (mentioned in Quran 9:40), he fought beside the Prophet ﷺ at every major campaign, gave 100% of his household wealth at Tabuk, and was appointed to lead Salah during the Prophet’s final illness.',
      ],
      companionshipUr: [
        'آپ نے اپنا کثیر مال مظلوم غلاموں مثلاً حضرت بلالؓ اور حضرت عامر بن فہیرہؓ کو آزاد کرانے میں خرچ فرمایا۔ واقعہ معراج کی فوری تصدیق پر آپ کو "صدیق" کا لقب عطا ہوا۔',
        'ہجرت میں غارِ ثور کے ساتھی ہونے کا شرف پایا (جس کا ذکر قرآن میں ہے)، تمام غزوات میں شریک رہے، غزوہ تبوک میں گھر کا سارا مال پیش کیا اور مرضِ وفات میں امامتِ صلاۃ کا شرف حاصل کیا۔',
      ],
      caliphateEn: [
        'Elected Caliph at Saqifah Banu Sa‘idah amid grief over the Prophet’s passing, he steadied the community with his famous declaration: "Whoever worshipped Muhammad, know that Muhammad has died; whoever worships Allah, Allah is Ever-Living and never dies."',
        'Within a two-year reign, he dispatched Usamah ibn Zayd’s expedition as commanded by the Prophet ﷺ, suppressed false prophets and apostasy (Riddah Wars) to preserve Zakah and unity, initiated the first bound compilation (Mushaf) of the Holy Quran under Zayd ibn Thabit (RA), and opened the frontiers of Iraq and Ash-Sham.',
      ],
      caliphateUr: [
        'سقیفہ بنی ساعدہ میں بیعت کے بعد آپ نے غمزدہ امت کو سنبھالا اور تاریخی خطبہ دیا: "جو شخص محمد ﷺ کی عبادت کرتا تھا وہ جان لے کہ آپ ﷺ وصال فرما چکے، اور جو اللہ کی عبادت کرتا ہے تو اللہ ہمیشہ زندہ ہے۔"',
        'صرف دو سال کی خلافت میں جیشِ اسامہؓ روانہ کیا، جھوٹے مدعیانِ نبوت اور منکرینِ زکوٰۃ کا فتنہ ختم کر کے امت کو بچایا، حضرت زید بن ثابتؓ کے ذریعے قرآنِ مجید کو یکجا مدون کروایا اور عراق و شام کی فتوحات کا آغاز فرمایا۔',
      ],
      characterAndPassingEn: [
        'Humility defined his leadership: in his inaugural address he said, "Obey me as long as I obey Allah and His Messenger; if I disobey, you owe me no obedience." Before dying in Jumada al-Akhirah 13 AH (634 CE) at age 63, he instructed his daughter Aisha (RA) to return every stipend he had drawn from the public treasury.',
        'He left behind the famous counsel to his successor Umar (RA): "Fear Allah, O Umar, and know that Allah has rights by night He does not accept by day, and rights by day He does not accept by night." He was buried beside the Prophet ﷺ in Madinah.',
      ],
      characterAndPassingUr: [
        'آپ کی عاجزی کا یہ عالم تھا کہ خطبہ خلافت میں فرمایا: "جب تک میں اللہ اور اس کے رسول کی اطاعت کروں میری اطاعت کرو، اگر نافرمانی کروں تو مجھ پر تمہاری کوئی اطاعت نہیں۔" وفات سے قبل بیت المال سے لیا گیا تمام وظیفہ واپس کر دینے کی وصیت فرمائی۔',
        'جمادی الاخریٰ 13 ہجری میں 63 سال کی عمر میں وصال فرمایا اور حضرت عمرؓ کو تقویٰ کی نصیحت فرمائی۔ آپ کو روضہ رسول ﷺ کے پہلو میں دفن کیا گیا۔',
      ],
    },
  },
  {
    id: 'caliph-umar',
    order: 2,
    name: 'Umar ibn al-Khattab',
    honorific: 'رضي الله عنه',
    nameUrdu: 'حضرت عمر فاروقؓ',
    reignYears: '13–23 AH · 634–644 CE',
    titleBadge: 'Second Caliph · Al-Faruq (Distinguisher of Truth)',
    shortIntroEn:
      'Pillar of uncompromising justice, administrative architect of the Islamic state, conqueror of Jerusalem and Persia, and honored with the title Al-Faruq.',
    shortIntroUr:
      'عدل و انصاف کی لازوال علامت، اسلامی مملکت کے عظیم منتظم، فاتحِ بیت المقدس و ایران اور خلیفہ دوم جنہیں رسول اللہ ﷺ نے "فاروق" کا لقب عطا فرمایا۔',
    tabs: {
      earlyLifeEn: [
        'Born into Banu Adi of Quraysh around thirteen years after the Year of the Elephant, Umar (RA) grew up literate, athletic, articulate, and respected as Quraysh’s diplomatic envoy.',
        'Initially fierce against Islam, in the 6th year of prophethood he set out with his sword intending to kill the Prophet ﷺ—only to learn his own sister Fatimah and brother-in-law Sa‘id ibn Zayd had accepted Islam. Hearing the opening verses of Surah Ta-Ha, his heart melted into submission, and he walked straight to Dar al-Arqam to declare the Shahadah.',
      ],
      earlyLifeUr: [
        'آپ عام الفیل کے تقریباً تیرہ سال بعد قریش کے خاندان بنو عدی میں پیدا ہوئے۔ آپ لکھنا پڑھنا جانتے تھے، نہایت بہادر اور قریش کے سفیر تھے۔',
        'ابتدا میں اسلام کے سخت مخالف تھے، حتیٰ کہ نبوت کے چھٹے سال تلوار لے کر نکلے، مگر بہن فاطمہؓ کے گھر سورہ طٰہٰ کی تلاوت سن کر دل بدل گیا اور دارِ ارقم جا کر اسلام قبول کر لیا۔',
      ],
      companionshipEn: [
        'The day Umar (RA) embraced Islam, Muslims marched openly in two rows to the Ka‘bah and prayed publicly for the first time—earning him the title Al-Faruq (the One who distinguishes truth from falsehood).',
        'He stood steadfast in every campaign, migrated openly after challenging Quraysh, and shared profound spiritual insight—several Quranic rulings aligned with Umar’s prayerful suggestions (Muwafaqat Umar), including the Maqam Ibrahim prayer and Hijab verses.',
      ],
      companionshipUr: [
        'آپ کے قبولِ اسلام سے مسلمانوں کو بڑی قوت ملی اور پہلی بار بیت اللہ میں اعلانیہ نماز ادا کی گئی، جس پر آپ کو "فاروق" کا لقب ملا۔',
        'آپ تمام غزوات میں رسول اللہ ﷺ کے شانہ بشانہ رہے۔ متعدد مواقع پر آپ کی نیک رائے کی موافقت میں قرآنی آیات نازل ہوئیں، جن میں مقامِ ابراہیم پر نماز اور احکامِ حجاب شامل ہیں۔',
      ],
      caliphateEn: [
        'During his ten-year Caliphate (13–23 AH), the Muslim commonwealth expanded peacefully across Ash-Sham, Jerusalem (whose keys he personally received under the Covenant of Umar guaranteeing protection for Christian citizens and churches), Egypt, and the Sassanid Empire.',
        'He established foundational public institutions: the Hijri lunar calendar, Bait al-Mal (public treasury), provincial courts with independent judges, stipends for infants and the elderly, postal/garrison networks, and night patrols ensuring no orphan or widow slept hungry.',
      ],
      caliphateUr: [
        'دس سالہ دورِ خلافت میں شام، مصر، ایران اور بیت المقدس فتح ہوئے۔ آپ نے خود بیت المقدس جا کر چابیاں وصول کیں اور "عہدِ عمری" کے تحت غیر مسلم شہریوں اور عبادت گاہوں کے تحفظ کی ضمانت دی۔',
        'آپ نے ہجری تقویم جاری کی، بیت المال اور دیوانِ عسکری قائم کیے، ججوں کو آزاد کیا، شیر خوار بچوں اور بزرگوں کے وظائف مقرر کیے اور راتوں کو گشت کر کے رعایا کی خبرگیری فرمائی۔',
      ],
      characterAndPassingEn: [
        'Known for wearing patched garments while administering vast provinces, Umar famously feared: "If a single mule stumbles on the banks of the Euphrates, I fear Allah will question Umar why he did not level the road for it."',
        'While leading Fajr prayer in Masjid an-Nabawi in Dhul-Hijjah 23 AH (644 CE), he was fatally stabbed with a poisoned dagger by Abu Lu’lu’ah Firuz. Appointed a six-member Shura council before passing, he asked Aisha’s permission to be buried beside his two beloved companions, the Prophet ﷺ and Abu Bakr (RA).',
      ],
      characterAndPassingUr: [
        'اتنی بڑی سلطنت کے حکمران ہونے کے باوجود پیوند لگے کپڑے پہنتے اور فرمایا کرتے: "اگر فرات کے کنارے کوئی اونٹ یا بکری بھی بھوکی مر گئی تو مجھے ڈر ہے قیامت کے دن عمر سے سوال ہو گا۔"',
        'ذوالحجہ 23 ہجری میں فجر کی نماز کی امامت کے دوران ایک مجوسی نے آپ پر زہریلے خنجر سے حملہ کیا۔ آپ نے چھ رکنی شوریٰ مقرر فرمائی اور حضرت عائشہؓ کی اجازت سے روضہ نبوی ﷺ کے ساتھ مدفون ہوئے۔',
      ],
    },
  },
  {
    id: 'caliph-uthman',
    order: 3,
    name: 'Uthman ibn Affan',
    honorific: 'رضي الله عنه',
    nameUrdu: 'حضرت عثمان غنیؓ',
    reignYears: '23–35 AH · 644–656 CE',
    titleBadge: 'Third Caliph · Dhun-Nurayn (Possessor of Two Lights)',
    shortIntroEn:
      'Embodiment of modesty, unmatched generosity, unifier of the Quranic Mushaf across the Muslim world, and noble son-in-law of the Prophet ﷺ twice over.',
    shortIntroUr:
      'حیا و سخاوت کے پیکر، جامعِ قرآن، ذوالنورین (حضور ﷺ کی دو صاحبزادیوں کے شوہر) اور خلیفہ سوم جن کی حیا سے فرشتے بھی حیا کرتے تھے۔',
    tabs: {
      earlyLifeEn: [
        'Born into the wealthy Umayyad clan of Quraysh around five years after the Year of the Elephant, Uthman (RA) was celebrated for gentle manners, cleanliness, and refined literacy.',
        'At age thirty-four, invited warmly by Abu Bakr as-Siddiq (RA), he accepted Islam early in the Makkan period—enduring harsh confinement from his own uncle rather than renouncing his faith.',
      ],
      earlyLifeUr: [
        'آپ عام الفیل کے تقریباً پانچ سال بعد قریش کے معزز خاندان بنو امیہ میں پیدا ہوئے۔ بچپن ہی سے شرم و حیا، نرمی اور خوش خطی میں مشہور تھے۔',
        'چونتیس سال کی عمر میں حضرت ابوبکرؓ کی دعوت پر ابتدائی مسلمانوں میں شامل ہوئے اور اپنے چچا کی سخت قید و بند کے باوجود ایمان پر ثابت قدم رہے۔',
      ],
      companionshipEn: [
        'Honored as Dhun-Nurayn (Possessor of Two Lights) because the Prophet ﷺ married two of his daughters—first Ruqayyah (RA) and, after her passing, Umm Kulthum (RA)—to him. He led the first migration to Abyssinia with Ruqayyah (RA).',
        'Whenever Madinah faced crisis, Uthman stepped forward quietly: he purchased the Well of Rumah for 35,000 dirhams to provide free fresh water to all residents, expanded Masjid an-Nabawi, and financed 950 camels, horses, and 1,000 gold dinars for the Tabuk expedition, prompting the Prophet ﷺ to say: "Nothing Uthman does after today will harm him."',
      ],
      companionshipUr: [
        'نبی کریم ﷺ کی دو صاحبزادیوں حضرت رقیہؓ اور ان کے بعد حضرت ام کلثومؓ سے نکاح کی سعادت پانے پر "ذوالنورین" کہلائے۔ آپ نے حضرت رقیہؓ کے ساتھ حبشہ کی پہلی ہجرت بھی فرمائی۔',
        'مدینہ میں میٹھے پانی کا کنواں (بئرِ رومہ) خرید کر مسلمانوں کے لیے وقف کیا، مسجدِ نبوی کی توسیع کی اور غزوہ تبوک میں 950 اونٹ، گھوڑے اور ایک ہزار اشرفیاں پیش کیں، جس پر آپ ﷺ نے خوش ہو کر جنت کی بشارت دی۔',
      ],
      caliphateEn: [
        'Selected as third Caliph in 24 AH, Uthman presided over twelve years of rapid growth—extending Muslim governance into North Africa, Cyprus, Khorasan, and Armenia, and establishing the first Muslim naval fleet alongside Mu‘awiyah (RA).',
        'His single greatest eternal service to the Ummah was standardizing the official Qurayshi Uthmani Mushaf in 25 AH—entrusting Zayd ibn Thabit (RA) and a scholarly committee to transcribe verified copies from Abu Bakr’s archive and dispatch them to major provinces, permanently protecting the Quran from textual variance.',
      ],
      caliphateUr: [
        '24 ہجری میں مسندِ خلافت سنبھالنے کے بعد بارہ سال تک اسلامی فتوحات شمالی افریقہ، قبرص، خراسان اور آرمینیا تک پھیلیں اور پہلا اسلامی بحری بیڑا قائم ہوا۔',
        'آپ کا سب سے عظیم اور لازوال کارنامہ قرآنِ مجید کو قریشی لہجے پر یکساں رسم الخط (مصحفِ عثمانی) میں جمع کر کے تمام صوبوں میں ارسال کرنا تھا تاکہ امت میں تلاوت کا کوئی اختلاف باقی نہ رہے۔',
      ],
      characterAndPassingEn: [
        'The Prophet ﷺ famously said of him: "Should I not feel shy before a man before whom even the angels feel shy?" He fasted frequently, spent nights standing in Quranic recitation, and freed enslaved people every Friday.',
        'When armed rebels besieged his house in Dhul-Hijjah 35 AH (656 CE), Uthman strictly forbade his defenders and sons from shedding a drop of Muslim blood in Madinah to protect his own life. Fasting and reciting Surah al-Baqarah (2:137), he was martyred inside his home, his blood falling upon the Mushaf in his lap.',
      ],
      characterAndPassingUr: [
        'رسول اللہ ﷺ نے آپ کے بارے میں فرمایا: "کیا میں اس شخص سے حیا نہ کروں جس سے فرشتے بھی حیا کرتے ہیں۔" آپ ہر جمعہ کو غلام آزاد کرتے اور راتوں کو پورا قرآن تلاوت فرمایا کرتے تھے۔',
        'ذوالحجہ 35 ہجری میں باغیوں کے محاصرے کے دوران آپ نے مدینہ میں مسلمانوں کا خون بہانے کی اجازت نہ دی۔ روزے کی حالت میں تلاوتِ قرآن کرتے ہوئے آپ جامِ شہادت نوش فرما گئے۔',
      ],
    },
  },
  {
    id: 'caliph-ali',
    order: 4,
    name: 'Ali ibn Abi Talib',
    honorific: 'رضي الله عنه',
    nameUrdu: 'حضرت علی المرتضیٰؓ',
    reignYears: '35–40 AH · 656–661 CE',
    titleBadge: 'Fourth Caliph · Asadullah (Lion of Allah)',
    shortIntroEn:
      'Cousin and son-in-law of the Prophet ﷺ, first youth to embrace Islam, towering scholar of Quran and jurisprudence, and model of bravery and eloquence.',
    shortIntroUr:
      'رسول اللہ ﷺ کے چچا زاد بھائی اور داماد، بچوں میں سب سے پہلے ایمان لانے والے، اسداللہ (اللہ کے شیر)، بابِ علم و فصاحت اور خلیفہ چہارم۔',
    tabs: {
      earlyLifeEn: [
        'Born inside Banu Hashim to Abu Talib—the Prophet’s uncle—around thirty years after the Year of the Elephant, Ali (RA) was taken into Muhammad’s own household as a young boy to ease Abu Talib’s financial strain, growing up directly under Prophetic care.',
        'At roughly ten years old, witnessing the Prophet ﷺ and Khadijah (RA) in prayer, he accepted Islam the very next morning—becoming the first youth to embrace the faith and standing courageously beside his cousin throughout the Makkan boycott.',
      ],
      earlyLifeUr: [
        'آپ عام الفیل کے تقریباً تیس سال بعد ابو طالب کے گھر پیدا ہوئے۔ بچپن ہی سے رسول اللہ ﷺ نے چچا کا بوجھ ہلکا کرنے کے لیے آپ کی پرورش اپنے گھر میں فرمائی۔',
        'تقریباً دس سال کی عمر میں آپ نے حضور ﷺ اور حضرت خدیجہؓ کو نماز پڑھتے دیکھا اور اگلے ہی صبح بچوں میں سب سے پہلے اسلام قبول کر لیا۔',
      ],
      companionshipEn: [
        'On the night of the Hijrah, Ali (RA) risked his life sleeping inside the Prophet’s cloak in his bed so the Prophet could depart safely and so Makkan trusts would be faithfully returned.',
        'Married to the Prophet’s beloved daughter Fatimah az-Zahra (RA), he served as father to al-Hasan and al-Husayn (RA), carried the banner at Badr and Khaybar, served as scribe of revelation and Hudaybiyyah, and earned the Prophet’s testimony: "You are to me in the position Harun was to Musa, except there is no prophet after me."',
      ],
      companionshipUr: [
        'شبِ ہجرت آپ نے امانتوں کی واپسی اور رسول اللہ ﷺ کی حفاظت کے لیے جان پر کھیل کر بسترِ نبوی ﷺ پر آرام فرمایا۔',
        'خاتونِ جنت حضرت فاطمہ زہراؓ سے نکاح ہوا اور حسنین کریمینؓ کے والد بنے۔ بدر و خیبر میں شجاعت کے جوہر دکھائے، کتابتِ وحی کی اور حضور ﷺ نے فرمایا: "تم میرے لیے ایسے ہو جیسے ہارونؑ موسیٰؑ کے لیے تھے، بس میرے بعد کوئی نبی نہیں۔"',
      ],
      caliphateEn: [
        'Assuming the Caliphate in Dhul-Hijjah 35 AH during severe civil turmoil following Uthman’s martyrdom, Ali relocated the administrative center to Kufa, reformed tax equity, removed corrupt governors, and labored tirelessly to restore peace while refusing to compromise justice.',
        'Even amid painful internal trials (Camel, Siffin, and Nahrawan), he instructed his troops never to pursue retreating Muslims, never to harm women or wounded, and never to confiscate Muslim property—preserving Islamic ethics of mercy even in civil strife.',
      ],
      caliphateUr: [
        'شہادتِ عثمانؓ کے بعد 35 ہجری میں سخت فتنوں کے دور میں آپ نے خلافت سنبھالی، دارالحکومت کوفہ منتقل کیا، بیت المال میں مساوات قائم کی اور ظلم و بدعنوانی کا خاتمہ کیا۔',
        'اندرونی آزمائشوں (جمل، صفین اور نہروان) میں بھی آپ نے بھاگنے والوں کا پیچھا نہ کرنے، زخمیوں پر ہاتھ نہ اٹھانے اور مسلمانوں کا مال غنیمت نہ بنانے کا سخت حکم دے کر اسلامی اخلاقیات کو بلند رکھا۔',
      ],
      characterAndPassingEn: [
        'Renowned across Islamic history for piercing judicial wisdom, ascetic detachment from wealth, and timeless aphorisms ("People are of two kinds: either your brother in faith or your equal in humanity"), Ali lived on barley bread while distributing the entire treasury fairly.',
        'At dawn on 19 Ramadan 40 AH (661 CE), while waking worshippers for Fajr in the Grand Mosque of Kufa, he was struck by the Kharijite assassin Abdur-Rahman ibn Muljam, exclaiming: "By the Lord of the Ka‘bah, I have succeeded!" He passed away on 21 Ramadan instructing his sons to show strict legal justice without excess.',
      ],
      characterAndPassingUr: [
        'آپ کا علم، فیصلہ سازی کی بصیرت، زہد و قناعت اور حکمت ضرب المثل ہے۔ آپ کا مشہور قول ہے: "لوگ دو طرح کے ہیں: یا تمہارے دینی بھائی ہیں یا انسانیت میں تمہارے برابر۔"',
        '19 رمضان 40 ہجری کو مسجدِ کوفہ میں فجر کی نماز کے وقت ایک خارجی عبدالرحمٰن بن ملجم کے قاتلانہ حملے میں زخمی ہوئے، فرماتے ہوئے: "ربِ کعبہ کی قسم! میں کامیاب ہو گیا۔" 21 رمضان کو شہادت پائی۔',
      ],
    },
  },
];

export const SAHABI_CATEGORIES: SahabiCategory[] = [
  'Ten Promised Paradise',
  'Mothers of the Believers',
  'Prominent Companions & Scholars',
];

export const SAHABAH_DATA: SahabiProfile[] = [
  // --- 1. TEN PROMISED PARADISE (AL-ASHARAH AL-MUBASHARAH) (10) ---
  {
    id: 'sahabi-abu-bakr',
    name: 'Abu Bakr as-Siddiq',
    nameUrdu: 'حضرت ابوبکر صدیقؓ',
    honorific: 'As-Siddiq · First Caliph & Companion of the Cave',
    category: 'Ten Promised Paradise',
    eraNote: '573–634 CE · Makkah & Madinah',
    earlyLifeEn: [
      'Born Abdullah ibn Uthman in Banu Taym of Quraysh, two years after the Year of the Elephant. Even in pre-Islamic Makkah he never prostrated to idols, never drank intoxicants, and was admired as a gentle, honest cloth merchant and master genealogist.',
      'He became the first free adult man to embrace Islam without a moment of hesitation the very hour Muhammad ﷺ invited him, immediately bringing Uthman, Talhah, Zubayr, Sa‘d ibn Abi Waqqas, and Abdur-Rahman ibn Awf to Islam.',
    ],
    earlyLifeUr: [
      'آپ کا نام عبداللہ بن عثمان تھا اور عام الفیل کے دو سال بعد قریش کے خاندان بنو تیم میں پیدا ہوئے۔ جاہلیت میں بھی کبھی بت پرستی یا شراب کے قریب نہ گئے اور دیانت دار تاجر مشہور تھے۔',
      'بالغ مردوں میں سب سے پہلے بغیر کسی تردد کے اسلام قبول کیا اور فوراً حضرت عثمانؓ، طلحہؓ، زبیرؓ، سعدؓ اور عبدالرحمٰن بن عوفؓ جیسے اکابر کو ایمان کی دعوت دی۔',
    ],
    eventsEn: [
      'Spent tens of thousands of dirhams purchasing and freeing tortured enslaved Muslims including Bilal ibn Rabah (RA), Amir ibn Fuhayrah (RA), and Lubaynah (RA).',
      'Chosen by Allah and His Messenger as the sole companion inside Cave Thawr during the Hijrah (Quran 9:40), stood firm at Badr, Uhud, Khandaq, Hudaybiyyah, and donated 100% of his household wealth at Tabuk.',
    ],
    eventsUr: [
      'حضرت بلالؓ اور عامر بن فہیرہؓ سمیت متعدد مظلوم غلاموں کو کثیر رقم دے کر آزاد کروایا۔',
      'ہجرت میں غارِ ثور کے رفیقِ خاص بنے (جس کا ذکر سورہ توبہ میں ہے)، تمام غزوات میں ساتھ رہے اور غزوہ تبوک میں گھر کا سارا مال راہِ خدا میں پیش کر دیا۔',
    ],
    virtuesEn: [
      'The Prophet ﷺ declared: "If I were to take a Khalil (intimate friend) from my nation, I would take Abu Bakr; rather he is my brother and companion in faith" (Sahih al-Bukhari).',
      'Named among the Ten Promised Paradise, honored as As-Siddiq for immediately affirming Al-Isra wal-Mi‘raj, and appointed to lead the Salah during the Prophet’s final days.',
    ],
    virtuesUr: [
      'رسول اللہ ﷺ نے فرمایا: "اگر میں امت میں سے کسی کو خلیل بناتا تو ابوبکر کو بناتا" (صحیح بخاری)۔ معراج کی فوری تصدیق پر "صدیق" کا لقب ملا۔',
      'عشرہ مبشرہ میں سرفہرست ہیں اور مرضِ وفات میں رسول اللہ ﷺ نے آپ ہی کو امامتِ نماز کا شرف بخشا۔',
    ],
    legacyEn: [
      'As First Caliph (11–13 AH), he crushed the Riddah apostasy rebellions, dispatched Usamah’s army, initiated the official bound compilation of the Quran, and passed away peacefully in 13 AH at age 63, buried beside the Prophet ﷺ.',
    ],
    legacyUr: [
      'خلیفہ اول بن کر فتنہ ارتداد کا خاتمہ کیا، امت کو متحد رکھا، قرآنِ مجید کو یکجا مدون کروایا اور 13 ہجری میں وصال فرما کر روضہ رسول ﷺ کے پہلو میں مدفون ہوئے۔',
    ],
  },
  {
    id: 'sahabi-umar',
    name: 'Umar ibn al-Khattab',
    nameUrdu: 'حضرت عمر فاروقؓ',
    honorific: 'Al-Faruq · Second Caliph & Pillar of Justice',
    category: 'Ten Promised Paradise',
    eraNote: '584–644 CE · Makkah & Madinah',
    earlyLifeEn: [
      'Born into Banu Adi of Quraysh around thirteen years after the Year of the Elephant, literate, towering in stature, and Quraysh’s diplomatic envoy.',
      'In Year 6 of Prophethood, setting out sword in hand against Muhammad ﷺ, he visited his sister Fatimah (RA), heard Surah Ta-Ha recited aloud, wept, and marched directly to Dar al-Arqam to declare the Shahadah.',
    ],
    earlyLifeUr: [
      'عام الفیل کے تیرہ سال بعد قریش کے بنو عدی خاندان میں پیدا ہوئے؛ باوقار خطیب، بہادر پہلوان اور قریش کے سفیر تھے۔',
      'نبوت کے چھٹے سال اپنی بہن حضرت فاطمہؓ کے گھر سورہ طٰہٰ کی تلاوت سن کر دل پگھل گیا اور دارِ ارقم جا کر مشرف بہ اسلام ہوئے۔',
    ],
    eventsEn: [
      'The very day he accepted Islam, Muslims prayed openly at the Ka‘bah for the first time. Later he publicly challenged Quraysh before migrating to Madinah in daylight.',
      'Participated in every major expedition from Badr to Tabuk, contributed half his wealth at Tabuk, and as Second Caliph (13–23 AH) oversaw the peaceful opening of Jerusalem, Persia, Syria, and Egypt.',
    ],
    eventsUr: [
      'آپ کے ایمان لانے کے دن پہلی بار بیت اللہ میں اعلانیہ نماز پڑھی گئی، اور ہجرتِ مدینہ بھی علانیہ اعلان کر کے فرمائی۔',
      'بدر سے تبوک تک ہر معرکے میں شریک رہے اور دس سالہ خلافت میں شام، ایران، مصر اور بیت المقدس فتح ہوئے۔',
    ],
    virtuesEn: [
      'The Prophet ﷺ prayed for his guidance and testified: "If there were to be a prophet after me, it would have been Umar" (Jami‘ at-Tirmidhi), and said Satan flees the very path Umar walks (Sahih al-Bukhari).',
      'Honored with Al-Faruq, promised Paradise, and granted Muwafaqat (Quranic verses revealed affirming his sincere counsel on Hijab, Maqam Ibrahim, and Badr captives).',
    ],
    virtuesUr: [
      'حضور ﷺ نے فرمایا: "اگر میرے بعد کوئی نبی ہوتا تو عمر ہوتے" اور فرمایا کہ جس راستے پر عمر چلتے ہیں شیطان وہ راستہ چھوڑ دیتا ہے۔',
      'عشرہ مبشرہ میں شامل ہیں اور متعدد قرآنی احکام (مقامِ ابراہیم، حجاب وغیرہ) آپ کی رائے کی موافقت میں نازل ہوئے۔',
    ],
    legacyEn: [
      'Founded the Hijri calendar, Bait al-Mal welfare system, independent judiciary, and night patrols for widows and orphans. Martyred while leading Fajr prayer in Dhul-Hijjah 23 AH and buried next to Abu Bakr and the Prophet ﷺ.',
    ],
    legacyUr: [
      'ہجری کیلنڈر، بیت المال، آزاد عدالتیں اور شب گشت کے ذریعے رعایا کی خبرگیری کا بے مثال نظام قائم کیا؛ فجر کی نماز میں شہادت پائی اور روضہ نبوی ﷺ میں مدفون ہوئے۔',
    ],
  },
  {
    id: 'sahabi-uthman',
    name: 'Uthman ibn Affan',
    nameUrdu: 'حضرت عثمان غنیؓ',
    honorific: 'Dhun-Nurayn · Third Caliph & Unifier of the Mushaf',
    category: 'Ten Promised Paradise',
    eraNote: '576–656 CE · Makkah & Madinah',
    earlyLifeEn: [
      'Born into Banu Umayyah of Quraysh, renowned before Islam for refinement, shyness (Haya), literacy, and honorable trade.',
      'Converted at age 34 upon Abu Bakr’s invitation—among the very earliest Muslims—enduring confinement and torture from his own uncle al-Hakam rather than recanting.',
    ],
    earlyLifeUr: [
      'قریش کے معزز خاندان بنو امیہ میں پیدا ہوئے؛ قبل از اسلام بھی شرم و حیا، صفائی اور دیانت دار تجارت میں مشہور تھے۔',
      'حضرت ابوبکرؓ کی دعوت پر ابتدائی دور میں اسلام لائے اور چچا کی سخت قید و ایذا کے باوجود ایمان نہ چھوڑا۔',
    ],
    eventsEn: [
      'Led the first migration to Abyssinia with the Prophet’s daughter Ruqayyah (RA), later married Umm Kulthum (RA) earning the title Dhun-Nurayn.',
      'Bought the Well of Rumah for 35,000 dirhams to give Madinah free water forever, funded Masjid an-Nabawi’s expansion, and outfitted the Army of Hardship at Tabuk with 950 camels, 50 horses, and 1,000 gold dinars.',
    ],
    eventsUr: [
      'حضور ﷺ کی صاحبزادی حضرت رقیہؓ کے ساتھ حبشہ ہجرت کی اور بعد میں حضرت ام کلثومؓ سے نکاح پر "ذوالنورین" کہلائے۔',
      'بئرِ رومہ خرید کر وقف کیا، مسجدِ نبوی کی توسیع کروائی اور غزوہ تبوک میں 950 اونٹ، گھوڑے اور ایک ہزار اشرفیاں پیش کیں۔',
    ],
    virtuesEn: [
      'The Prophet ﷺ stated: "Should I not feel shy before a man before whom even the angels feel shy?" (Sahih Muslim) and assured him after Tabuk: "Nothing Uthman does after today will harm him."',
      'At the Pledge of Ridwan (Hudaybiyyah), the Prophet ﷺ placed his own left hand in his right hand to pledge on Uthman’s behalf.',
    ],
    virtuesUr: [
      'حضور ﷺ نے فرمایا: "کیا میں اس شخص سے حیا نہ کروں جس سے فرشتے بھی حیا کرتے ہیں؟" اور تبوک پر فرمایا: "آج کے بعد عثمان کا کوئی عمل انہیں نقصان نہ دے گا۔"',
      'بیعتِ رضوان کے وقت آپ ﷺ نے خود اپنا دستِ مبارک حضرت عثمانؓ کا ہاتھ قرار دے کر بیعت لی۔',
    ],
    legacyEn: [
      'During his 12-year Caliphate, he established the first Muslim navy and permanently preserved Quranic unity by standardizing the master Uthmani Mushaf across all Islamic lands. Martyred fasting while reciting Surah al-Baqarah in 35 AH.',
    ],
    legacyUr: [
      'اپنی خلافت میں پہلا اسلامی بحری بیڑا قائم کیا اور قرآنِ مجید کو یکساں مصحفِ عثمانی کی صورت میں جمع کر کے امت کو اختلاف سے بچایا۔ 35 ہجری میں روزے اور تلاوتِ قرآن کی حالت میں شہید ہوئے۔',
    ],
  },
  {
    id: 'sahabi-ali',
    name: 'Ali ibn Abi Talib',
    nameUrdu: 'حضرت علی المرتضیٰؓ',
    honorific: 'Asadullah · Fourth Caliph & Gate of Knowledge',
    category: 'Ten Promised Paradise',
    eraNote: '600–661 CE · Makkah, Madinah & Kufa',
    earlyLifeEn: [
      'Son of Abu Talib of Banu Hashim and paternal cousin of the Prophet ﷺ, raised directly inside Muhammad’s household from early childhood.',
      'Accepted Islam at age ten the very morning after witnessing the Prophet ﷺ and Khadijah (RA) pray—becoming the first youth ever to believe.',
    ],
    earlyLifeUr: [
      'حضور ﷺ کے چچا ابو طالب کے بیٹے تھے اور بچپن ہی سے رسول اللہ ﷺ کے گھر میں پرورش پائی۔',
      'دس سال کی عمر میں حضور ﷺ اور حضرت خدیجہؓ کو نماز پڑھتے دیکھ کر اگلے ہی صبح بچوں میں سب سے پہلے ایمان لائے۔',
    ],
    eventsEn: [
      'Slept in the Prophet’s bed on the night of Hijrah to decoy Quraysh assassins and return Makkan deposits safely. Married Fatimah az-Zahra (RA) in 2 AH.',
      'Bore the Muslim banner at Badr and Khaybar (lifting the heavy fortress gate), authored the Treaty of Hudaybiyyah, and navigated the agonizing trials of his Caliphate (35–40 AH) in Kufa with moral restraint.',
    ],
    eventsUr: [
      'شبِ ہجرت امانتیں لوٹانے اور حضور ﷺ کی حفاظت کے لیے بسترِ نبوی پر سوئے، اور 2 ہجری میں حضرت فاطمہ زہراؓ سے نکاح ہوا۔',
      'بدر و خیبر میں شجاعت کے جوہر دکھائے، صلحِ حدیبیہ کے کاتب رہے اور خلافت کے کٹھن دور میں عدل و اخلاقیات کا علم بلند رکھا۔',
    ],
    virtuesEn: [
      'The Prophet ﷺ said at Khaybar: "Tomorrow I will give the banner to a man who loves Allah and His Messenger, and whom Allah and His Messenger love" (Sahih al-Bukhari), and declared: "You are to me as Harun was to Musa, except there is no prophet after me."',
    ],
    virtuesUr: [
      'غزوہ خیبر میں حضور ﷺ نے فرمایا: "کل میں علم اس شخص کو دوں گا جو اللہ اور اس کے رسول سے محبت کرتا ہے اور اللہ اور اس کا رسول اس سے محبت کرتے ہیں۔"',
      'نیز فرمایا: "تم میرے نزدیک ایسے ہو جیسے ہارونؑ موسیٰؑ کے نزدیک تھے، بس میرے بعد کوئی نبی نہیں۔"',
    ],
    legacyEn: [
      'Master of judicial verdicts, eloquent speeches, Arabic grammar patronage, and ascetic simplicity. Struck at dawn during Fajr in Kufa in Ramadan 40 AH exclaiming, "By the Lord of the Ka‘bah, I have won!"',
    ],
    legacyUr: [
      'علم، قضا، فصاحت و خطابت اور زہد و تقویٰ میں پوری امت کے امام ہیں۔ 40 ہجری رمضان میں فجر کے وقت مسجدِ کوفہ میں حملے کا شکار ہو کر شہادت پائی۔',
    ],
  },
  {
    id: 'sahabi-talhah',
    name: 'Talhah ibn Ubaydullah',
    nameUrdu: 'حضرت طلحہ بن عبیداللہؓ',
    honorific: 'The Living Martyr · Al-Fayyad (The Generous)',
    category: 'Ten Promised Paradise',
    eraNote: '594–656 CE · Banu Taym',
    earlyLifeEn: [
      'A perceptive Makkan merchant from Banu Taym who met a Christian monk in the market of Busra foretelling the final Prophet’s imminent appearance in Makkah.',
      'Hurrying back to Makkah, he sought out his kinsman Abu Bakr (RA) and accepted Islam among the earliest eight believers, enduring torture alongside Abu Bakr bound together by Quraysh.',
    ],
    earlyLifeUr: [
      'قبیلہ بنو تیم کے ذہین تاجر جنہوں نے بصریٰ کے بازار میں ایک راہب سے آخری نبی ﷺ کی آمد کی نشانی سنی۔',
      'مکہ لوٹتے ہی حضرت ابوبکرؓ کے پاس جا کر ابتدائی آٹھ مسلمانوں میں شامل ہوئے اور کفار کے مظالم صبر سے سہے۔',
    ],
    eventsEn: [
      'Guided the Prophet’s Hijrah caravan through safe desert tracks, carried supplies to Madinah, and fought valiantly at Uhud where he formed a one-man shield around the Prophet ﷺ.',
      'Blocked enemy arrows with his bare hand until his fingers were permanently paralyzed and sustained over seventy sword and spear wounds rescuing the Prophet up the rocky slope of Uhud.',
    ],
    eventsUr: [
      'ہجرت کے سفر میں راہنمائی کی اور غزوہ احد میں رسول اللہ ﷺ کے گرد ڈھال بن کر کھڑے ہو گئے۔',
      'تیر اپنے ننگے ہاتھ پر روکتے رہے یہاں تک کہ ہاتھ شل ہو گیا اور ستر سے زائد زخم کھا کر حضور ﷺ کو پہاڑی پر پہنچایا۔',
    ],
    virtuesEn: [
      'Named Talhah al-Khayr (of Goodness) and Talhah al-Fayyad (of Overflowing Charity). The Prophet ﷺ declared: "Whoever wishes to see a martyr walking upon the face of the earth, let him look at Talhah ibn Ubaydullah" (Jami‘ at-Tirmidhi).',
    ],
    virtuesUr: [
      'حضور ﷺ نے آپ کو طلحہ الخیر، طلحہ الجود اور طلحہ الفیاض کے القاب دیے اور فرمایا: "جو زمین پر چلتا پھرتا شہید دیکھنا چاہے وہ طلحہ بن عبیداللہ کو دیکھ لے۔"',
    ],
    legacyEn: [
      'Distinguished for immense open-handed charity—once selling land for 700,000 dirhams and giving away every single coin before dawn because keeping wealth overnight kept him awake. Martyred at the Battle of the Camel in 36 AH.',
    ],
    legacyUr: [
      'آپ کی سخاوت کا یہ عالم تھا کہ سات لاکھ درہم ایک ہی رات میں فقراء میں بانٹ دیے؛ 36 ہجری میں جنگِ جمل کے موقع پر شہادت پائی۔',
    ],
  },
  {
    id: 'sahabi-zubayr',
    name: 'Zubayr ibn al-Awwam',
    nameUrdu: 'حضرت زبیر بن عوامؓ',
    honorific: 'Hawari of the Prophet ﷺ (Disciple)',
    category: 'Ten Promised Paradise',
    eraNote: '594–656 CE · Cousin of the Prophet ﷺ',
    earlyLifeEn: [
      'Son of the Prophet’s paternal aunt Safiyyah bint Abdul-Muttalib (RA) and nephew of Khadijah (RA). Raised by his brave mother to grow tough and fearless.',
      'Embraced Islam at age fifteen or sixteen. Upon hearing a rumor in Makkah that the Prophet ﷺ had been captured, young Zubayr famously became the very first Muslim to unsheathe a sword in Allah’s path.',
    ],
    earlyLifeUr: [
      'رسول اللہ ﷺ کی پھوپھی حضرت صفیہؓ کے بیٹے اور حضرت خدیجہؓ کے بھتیجے تھے؛ والدہ نے بچپن سے نہایت نڈر بنایا۔',
      'سولہ سال کی عمر میں اسلام قبول کیا اور مکہ میں حضور ﷺ کی گرفتاری کی خبر سن کر راہِ خدا میں سب سے پہلے تلوار نیام سے نکالی۔',
    ],
    eventsEn: [
      'Migrated to Abyssinia and Madinah, charged down enemy champions at Badr wearing a bright yellow turban, scaled the fortress walls of Khaybar and Babylon (Egypt), and rode behind enemy lines at Khandaq.',
      'Fought tirelessly alongside Umar’s armies at Yarmuk and Egypt, carrying innumerable battle scars across his chest from facing every foe head-on.',
    ],
    eventsUr: [
      'حبشہ و مدینہ ہجرت کی، بدر میں زرد عمامہ باندھ کر دادِ شجاعت دی اور غزوہ خندق میں قریش کے لشکر کی جاسوسی و مدافعت کی۔',
      'جنگِ یرموک اور فتحِ مصر میں عظیم بہادری دکھائی؛ آپ کے سینے پر تلواروں اور نیزوں کے بے شمار زخم تھے۔',
    ],
    virtuesEn: [
      'After Zubayr’s solitary reconnaissance missions during the Battle of the Trench, the Prophet ﷺ proclaimed: "Every Prophet has a Hawari (devoted disciple), and my Hawari is az-Zubayr" (Sahih al-Bukhari & Muslim).',
    ],
    virtuesUr: [
      'غزوہ خندق میں آپ کی بے خوف خدمات پر رسول اللہ ﷺ نے فرمایا: "ہر نبی کا ایک حواری (مخلص مددگار) ہوتا ہے اور میرا حواری زبیرؓ ہے۔"',
    ],
    legacyEn: [
      'So universally trusted in Madinah that people forced him to safeguard their deposits as "loans" so he would protect their wealth. Step-aside peacefully before fighting in 36 AH, remembering Ali’s reminder of Prophetic love, before being treacherously slain in Wadi as-Siba.',
    ],
    legacyUr: [
      'دیانت کا یہ عالم تھا کہ لوگ اپنی امانتیں آپ کے پاس رکھواتے؛ 36 ہجری میں حضرت علیؓ کی یاد دہانی پر جنگ سے الگ ہو گئے اور وادی السباع میں نماز کے دوران شہید کر دیے گئے۔',
    ],
  },
  {
    id: 'sahabi-abdur-rahman',
    name: 'Abdur-Rahman ibn Awf',
    nameUrdu: 'حضرت عبدالرحمٰن بن عوفؓ',
    honorific: 'The Blessed Merchant of Paradise',
    category: 'Ten Promised Paradise',
    eraNote: '581–654 CE · Banu Zuhrah',
    earlyLifeEn: [
      'Born into Banu Zuhrah as Abd Amr; the Prophet ﷺ affectionately renamed him Abdur-Rahman ("Servant of the Most Merciful").',
      'Embraced Islam two days after Abu Bakr (RA), suffered Makkan persecution, and migrated twice—to Abyssinia and later Madinah.',
    ],
    earlyLifeUr: [
      'قبیلہ بنو زہرہ میں پیدا ہوئے؛ قبل از اسلام نام عبد عمرو تھا جسے حضور ﷺ نے بدل کر عبدالرحمٰن رکھا۔',
      'حضرت ابوبکرؓ کے دو دن بعد اسلام لائے اور حبشہ و مدینہ کی ہجرتوں کی تکالیف برداشت کیں۔',
    ],
    eventsEn: [
      'Paired in brotherhood in Madinah with Sa‘d ibn ar-Rabi‘ (RA), who offered half his estate and family—Abdur-Rahman politely declined: "May Allah bless your family and wealth; just show me the way to the market."',
      'Starting with cottage cheese and ghee, Allah blessed his scrupulous honesty so greatly that he famously said: "If I lifted a stone, I expected to find gold or silver beneath it." Fought at Badr, sustained twenty wounds at Uhud, and once led a dawn Fajr prayer in which the Prophet ﷺ prayed behind him!',
    ],
    eventsUr: [
      'مدینہ میں مواخات کے وقت حضرت سعد بن ربیعؓ کی پیشکش شکریے کے ساتھ لوٹا کر فرمایا: "مجھے بس بازار کا راستہ دکھا دیں۔"',
      'دیانت دار تجارت سے بے پناہ برکت پائی؛ بدر و احد میں شریک رہے اور ایک سفر میں حضور ﷺ نے آپ کی اقتدا میں نماز فجر ادا فرمائی۔',
    ],
    virtuesEn: [
      'One of the Ten Promised Paradise; appointed head of the six-member electoral Shura by Umar (RA), gracefully renouncing his own candidacy to ensure unity.',
      'Donated an entire 700-camel trade caravan filled with grain, flour, and goods to Madinah’s needy after hearing Aisha (RA) quote the Prophet’s hope for him to enter Paradise smoothly.',
    ],
    virtuesUr: [
      'عشرہ مبشرہ میں شامل ہیں؛ حضرت عمرؓ کی مقرر کردہ چھ رکنی شوریٰ کے سربراہ بنے اور خود دستبردار ہو کر امت کو متفق کیا۔',
      'مدینہ کے فقراء کے لیے سات سو اونٹوں کا پورا تجارتی قافلہ مع سامان راہِ خدا میں صدقہ کر دیا۔',
    ],
    legacyEn: [
      'Set aside 50,000 dinars in his will for the path of Allah, 400 dinars for every surviving veteran of Badr, and left enormous gardens supporting the Mothers of the Believers—proving righteous wealth is an honor in Islam.',
    ],
    legacyUr: [
      'وفات کے وقت تمام بدری صحابہؓ کے لیے چار چار سو دینار اور امہات المومنینؓ کی کفالت کا انتظام فرمایا؛ ثابت کیا کہ حلال مال تقویٰ کے ساتھ عظیم نعمت ہے۔',
    ],
  },
  {
    id: 'sahabi-sad-abi-waqqas',
    name: 'Sa‘d ibn Abi Waqqas',
    nameUrdu: 'حضرت سعد بن ابی وقاصؓ',
    honorific: 'First Archer of Islam · Conqueror of Persia',
    category: 'Ten Promised Paradise',
    eraNote: '595–674 CE · Maternal Uncle of the Prophet ﷺ',
    earlyLifeEn: [
      'Of Banu Zuhrah—the clan of the Prophet’s mother Aminah—so the Prophet ﷺ proudly introduced him: "This is my maternal uncle; let anyone show me an uncle like him!"',
      'Accepted Islam at age seventeen after dreaming of drowning in darkness and clinging to a bright moon. When his mother swore not to eat or sit in shade until he left Islam, Sa‘d stayed steadfast yet respectful—inspiring Quran 31:14–15.',
    ],
    earlyLifeUr: [
      'بنو زہرہ (آپ ﷺ کے ننھیالی قبیلے) سے تھے، اسی لیے حضور ﷺ فخر سے انہیں اپنا ماموں فرماتے تھے۔',
      'سترہ سال کی عمر میں ایمان لائے؛ والدہ کی بھوک ہڑتال کے باوجود عقیدہ نہ چھوڑا مگر ان کی خدمت میں کمی نہ کی، جس پر سورہ لقمان کی آیات نازل ہوئیں۔',
    ],
    eventsEn: [
      'Became the very first Muslim to loose an arrow in Allah’s cause during the early Rabigh patrol. Stood beside the Prophet ﷺ at Badr and Uhud, and served as commander of the decisive Battle of Qadisiyyah opening the Sassanid capital of Ctesiphon.',
      'Established Kufa as a serene garrison city and later withdrew cleanly from civil wars into seclusion outside Madinah.',
    ],
    eventsUr: [
      'اسلام کی راہ میں سب سے پہلا تیر چلایا؛ بدر و احد میں شریک رہے اور خلافتِ فاروقی میں جنگِ قادسیہ فتح کر کے کسریٰ کا تخت الٹ دیا۔',
      'شہرِ کوفہ آباد فرمایا اور بعد ازاں فتنوں کے دور میں گوشہ نشینی اختیار فرما لی۔',
    ],
    virtuesEn: [
      'At Uhud, the Prophet ﷺ handed him arrows saying: "Shoot, Sa‘d! May my father and mother be sacrificed for you!" (Sahih al-Bukhari).',
      'The Prophet ﷺ prayed for him: "O Allah, make his arrows hit their mark and answer his supplication"—making Sa‘d famous across the Ummah as Mustajab ad-Da‘wah (one whose du‘as were answered).',
    ],
    virtuesUr: [
      'غزوہ احد میں رسول اللہ ﷺ نے آپ کو تیر پکڑاتے ہوئے فرمایا: "سعد تیر چلاؤ! میرے ماں باپ تم پر فدا ہوں۔"',
      'آپ ﷺ کی دعا سے آپ مستجاب الدعوات ہو گئے اور تیر نشانے پر لگتے تھے۔',
    ],
    legacyEn: [
      'Passed away around 55 AH near Madinah as the last survivor of the Ten Promised Paradise, insisting on being shrouded in his worn woolen cloak from the Battle of Badr.',
    ],
    legacyUr: [
      '55 ہجری میں وصال فرمایا؛ عشرہ مبشرہ میں سب سے آخر میں دنیا سے رخصت ہوئے اور غزوہ بدر کے پرانے جبے میں کفن پہننے کی وصیت فرمائی۔',
    ],
  },
  {
    id: 'sahabi-said-ibn-zayd',
    name: 'Sa‘id ibn Zayd',
    nameUrdu: 'حضرت سعید بن زیدؓ',
    honorific: 'Son of Hanif Zayd · Brother-in-Law of Umar',
    category: 'Ten Promised Paradise',
    eraNote: '593–671 CE · Banu Adi',
    earlyLifeEn: [
      'Son of Zayd ibn Amr ibn Nufayl—one of pre-Islamic Makkah’s rare Hanifs (pure monotheists) who abandoned idols, rescued newborn girls from burial, and awaited the final Prophet.',
      'Accepted Islam at the very dawn of revelation alongside his wife Fatimah bint al-Khattab (RA), whose gentle endurance led directly to her brother Umar’s conversion inside their home.',
    ],
    earlyLifeUr: [
      'آپ کے والد زید بن عمرو جاہلیت میں بھی توحید پرست (حنیف) تھے اور بیٹیوں کو زندہ دفن کرنے سے روکتے تھے۔',
      'اپنی اہلیہ حضرت فاطمہ بنت خطابؓ کے ساتھ ابتدائی دور میں ایمان لائے، اور انہی کے گھر میں حضرت عمرؓ نے اسلام قبول کیا۔',
    ],
    eventsEn: [
      'Sent by the Prophet ﷺ along with Talhah (RA) to scout Quraysh’s caravan before Badr—receiving a full veteran’s share and reward of Badr despite returning just as battle ended.',
      'Fought bravely at Uhud, Khandaq, Yarmuk, and commanded troops during the opening of Damascus before stepping aside to serve quietly as teacher and worshipper.',
    ],
    eventsUr: [
      'غزوہ بدر سے قبل تجسس کے اہم مشن پر مامور ہوئے اور واپسی پر بدری صحابہؓ کا درجہ و حصہ پایا۔',
      'احد، خندق، یرموک اور فتحِ دمشق میں شریک رہے اور بعد میں گوشہ نشینی و عبادت اختیار کی۔',
    ],
    virtuesEn: [
      'Included explicitly by the Prophet ﷺ among the Ten Promised Paradise. Known throughout Madinah for answered prayers—a false accuser who claimed part of Sa‘id’s land was struck blind and swallowed by a well after Sa‘id prayed for justice.',
    ],
    virtuesUr: [
      'عشرہ مبشرہ میں شامل ہیں؛ آپ کی دعا فوراً قبول ہوتی تھی اور زمین پر ناجائز دعویٰ کرنے والی عورت کو آپ کی بددعا لگ گئی تھی۔',
    ],
    legacyEn: [
      'Shunned political ambition throughout his long life, dying peacefully in al-Aqiq near Madinah around 51 AH, remembered for purity of heart and loyalty.',
    ],
    legacyUr: [
      'دنیاوی عہدوں سے ہمیشہ دور رہے اور 51 ہجری میں مدینہ کے قریب وفات پائی؛ تقویٰ اور خاموش خدمت کی روشن مثال تھے۔',
    ],
  },
  {
    id: 'sahabi-abu-ubaydah',
    name: 'Abu Ubaydah ibn al-Jarrah',
    nameUrdu: 'حضرت ابوعبیدہ بن الجراحؓ',
    honorific: 'Amin al-Ummah (Trustee of This Nation)',
    category: 'Ten Promised Paradise',
    eraNote: '583–639 CE · Supreme Commander of Ash-Sham',
    earlyLifeEn: [
      'Born Amir ibn Abdullah into Banu al-Harith of Quraysh; tall, slender, serene, and gentle-spoken.',
      'Accepted Islam the day after Abu Bakr as-Siddiq (RA), endured Makkan cruelty, and migrated both to Abyssinia and Madinah.',
    ],
    earlyLifeUr: [
      'نام عامر بن عبداللہ تھا اور قریش کے بنو الحارث خاندان سے تھے؛ نہایت حلیم، منکسر المزاج اور بردبار تھے۔',
      'حضرت ابوبکرؓ کے ایمان لانے کے اگلے ہی روز اسلام قبول کیا اور حبشہ و مدینہ ہجرت فرمائی۔',
    ],
    eventsEn: [
      'At Uhud, he extracted two iron rings of chainmail embedded deep into the Prophet’s blessed cheek using his teeth, losing two front teeth cleanly—leaving him looking more dignified than before.',
      'Sent to Najran as judge, led the Dhat as-Salasil reinforcement, and later served as Umar’s supreme commander in Greater Syria (opening Damascus, Homs, and standing beside Jerusalem).',
    ],
    eventsUr: [
      'غزوہ احد میں رسول اللہ ﷺ کے رخسارِ مبارک میں دھنسی ہوئی خود کی دو کڑیاں اپنے دانتوں سے کھینچ کر نکالیں اور اگلے دو دانت شہید ہو گئے۔',
      'نجران کے قاضی اور بعد میں خلافتِ فاروقی میں شام کے سپہ سالارِ اعظم بنے۔',
    ],
    virtuesEn: [
      'The Prophet ﷺ held his hand before the Najran delegation and proclaimed: "Every nation has an Amin (trustee), and the trustee of this Ummah is Abu Ubaydah ibn al-Jarrah" (Sahih al-Bukhari).',
      'Umar (RA) once visited his home in Syria only to find a single sword, shield, and water-skin, weeping: "Everyone else has changed after worldliness except you, O Abu Ubaydah!"',
    ],
    virtuesUr: [
      'حضور ﷺ نے نجران کے وفد کے سامنے فرمایا: "ہر امت کا ایک امین ہوتا ہے اور اس امت کے امین ابوعبیدہ بن الجراحؓ ہیں۔"',
      'حضرت عمرؓ نے شام میں ان کے گھر میں صرف ایک تلوار، ڈھال اور مشکیزہ دیکھ کر فرمایا: "دنیا نے سب کو بدل دیا مگر ابوعبیدہ کو نہیں بدل سکی۔"',
    ],
    legacyEn: [
      'When the Plague of Emmaus (18 AH) struck Syria, he refused Umar’s urgent plea to evacuate alone, declaring he would never abandon his Muslim soldiers—attaining martyrdom in the plague.',
    ],
    legacyUr: [
      '18 ہجری میں طاعونِ عمواس کے وقت حضرت عمرؓ کے بلانے کے باوجود لشکر کو تنہا چھوڑ کر نکلنے سے انکار کیا اور اسی وبا میں شہادت پائی۔',
    ],
  },

  // --- 2. MOTHERS OF THE BELIEVERS (UMMAHAT AL-MU'MININ) (9) ---
  {
    id: 'sahabiyah-khadijah',
    name: 'Khadijah bint Khuwaylid',
    nameUrdu: 'حضرت خدیجہ الکبریٰؓ',
    honorific: 'Al-Kubra · First Believer & Queen of the Women of Paradise',
    category: 'Mothers of the Believers',
    eraNote: '555–619 CE · Mother of Fatimah az-Zahra (RA)',
    earlyLifeEn: [
      'Born into a noble Qurayshi family and titled At-Tahirah (The Pure) even before Islam for her dignity, intellect, and charitable spirit. Managing large caravan trade, she employed Muhammad ﷺ after hearing of his unmatched trustworthiness (Al-Amin).',
      'Impressed by his integrity reported by Maysarah, she proposed marriage; together they shared 25 years of blissful devotion and raised six children, including Fatimah az-Zahra (RA).',
    ],
    earlyLifeUr: [
      'قریش کے معزز خاندان میں پیدا ہوئیں اور اسلام سے پہلے بھی پاکدامنی و دانشمندی کے باعث "طاہرہ" کہلاتی تھیں۔',
      'نبی کریم ﷺ کی امانت داری دیکھ کر نکاح کا پیغام بھیجا اور پچیس سال تک بے مثال رفاقت و محبت کا رشتہ نبھایا۔',
    ],
    eventsEn: [
      'When Muhammad ﷺ rushed down from Cave Hira trembling after the first revelation, Khadijah wrapped him warmly and comforted him: "Never! By Allah, Allah will never disgrace you; you maintain family ties, help the weak, honor guests, and assist truth."',
      'She became the very first human being to accept Islam, prayed alongside him secretly, financed the young community, and endured the grueling three-year starvation boycott in Shi‘b Abi Talib until her health gave way in the Year of Sorrow (10th year of Prophethood).',
    ],
    eventsUr: [
      'غارِ حرا سے واپسی پر جب آپ ﷺ گھبراہٹ میں گھر آئے تو آپؓ نے تسلی دی: "خدا کی قسم! اللہ آپ کو ہرگز رسوا نہ کرے گا، آپ صلہ رحمی کرتے اور کمزوروں کا بوجھ اٹھاتے ہیں۔"',
      'تمام انسانوں میں سب سے پہلے ایمان لائیں اور شعبِ ابی طالب کے تین سالہ محاصرے میں تمام مال و آسائشیں دین پر قربان کر دیں۔',
    ],
    virtuesEn: [
      'Angel Jibril (AS) visited the Prophet ﷺ and instructed: "Convey Salams to Khadijah from her Lord and from me, and give her glad tidings of a palace of hollowed pearl in Paradise where there is neither noise nor fatigue" (Sahih al-Bukhari).',
      'The Prophet ﷺ named her among the four greatest women in human history alongside Maryam, Asiyah, and Fatimah.',
    ],
    virtuesUr: [
      'جبرائیلؑ نے آ کر اللہ تعالیٰ اور اپنی طرف سے سلام پہنچایا اور جنت میں موتی کے ایسے محل کی بشارت دی جہاں نہ شور ہو گا نہ تھکن۔',
      'رسول اللہ ﷺ نے آپ کو کائنات کی چار بہترین خواتین میں شمار فرمایا۔',
    ],
    legacyEn: [
      'Even decades after her death, the Prophet ﷺ honored her friends, sent meat to her companions, and defended her memory: "She believed in me when people disbelieved, affirmed me when people called me a liar, and shared her wealth with me when people deprived me."',
    ],
    legacyUr: [
      'وفات کے سالوں بعد بھی حضور ﷺ ان کی سہیلیوں کو ہدیے بھیجتے اور فرماتے: "جب سب نے میرا انکار کیا تو وہ مجھ پر ایمان لائیں اور اپنا مال مجھ پر خرچ کیا۔"',
    ],
  },
  {
    id: 'sahabiyah-sawdah',
    name: 'Sawdah bint Zam‘ah',
    nameUrdu: 'حضرت سودہ بنت زمعہؓ',
    honorific: 'Early Abyssinian Migrant · Sanctuary of Compassion',
    category: 'Mothers of the Believers',
    eraNote: 'd. 644/674 CE · First Wife Married After Khadijah',
    earlyLifeEn: [
      'A noble woman of Banu Amir of Quraysh who accepted Islam early in Makkah alongside her husband as-Sakran ibn Amr (RA).',
      'To escape relentless persecution, they migrated across the Red Sea to Abyssinia; upon returning, her husband passed away leaving her widowed and vulnerable among hostile polytheists.',
    ],
    earlyLifeUr: [
      'قریش کے بنو عامر خاندان سے تھیں اور ابتدائی مکی دور میں اپنے پہلے شوہر حضرت سکرانؓ کے ساتھ اسلام قبول کیا۔',
      'کفار کے مظالم سے بچنے کے لیے حبشہ ہجرت کی، جہاں سے واپسی پر شوہر کا انتقال ہو گیا اور وہ تنہا رہ گئیں۔',
    ],
    eventsEn: [
      'Seeing the Prophet’s grief and young daughters after Khadijah’s passing, Khawlah bint Hakim (RA) suggested marriage to Sawdah. She entered the Prophetic home with warmth, gentle wit, and motherly devotion.',
      'In later years, out of deep love and selflessness, she gifted her scheduled night with the Prophet ﷺ to Aisha (RA) so she might remain honored as his wife in both worlds.',
    ],
    eventsUr: [
      'حضرت خدیجہؓ کی وفات کے بعد آپ ﷺ کے گھر اور صاحبزادیوں کی سنبھال کے لیے نکاح میں آئیں اور گھر کو خوش مزاجی و شفقت سے بھر دیا۔',
      'بعد ازاں ایثار کی بے مثال داستان رقم کرتے ہوئے اپنی باری کا دن حضرت عائشہؓ کو ہبہ کر دیا۔',
    ],
    virtuesEn: [
      'Aisha (RA) warmly admired her: "There is no woman whose character I wish to possess more than Sawdah bint Zam‘ah—save for her fiery generosity."',
      'Once Umar (RA) sent her a leather pouch of dirhams; finding out they were coins rather than dates, she immediately distributed every coin to the poor.',
    ],
    virtuesUr: [
      'حضرت عائشہؓ فرماتی تھیں: "عورتوں میں حضرت سودہؓ سے زیادہ مجھے کسی کا کردار پسند نہ تھا۔"',
      'ایک بار حضرت عمرؓ نے درہم کی تھیلی بھیجی تو آپ نے فوراً سارے درہم غریبوں میں تقسیم کر دیے۔',
    ],
    legacyEn: [
      'Narrated five authentic Hadiths, remained quietly devoted to worship inside her home in Madinah after the Farewell Pilgrimage, and modeled selfless kindness and humor.',
    ],
    legacyUr: [
      'آپ سے پانچ احادیث مروی ہیں؛ حجۃ الوداع کے بعد گھر میں عبادتِ الٰہی میں مصروف رہیں اور سخاوت و ایثار کی مثال چھوڑ گئیں۔',
    ],
  },
  {
    id: 'sahabiyah-aisha',
    name: 'Aisha bint Abi Bakr',
    nameUrdu: 'حضرت عائشہ صدیقہؓ',
    honorific: 'As-Siddiqah · Jurist & Teacher of the Ummah',
    category: 'Mothers of the Believers',
    eraNote: '614–678 CE · Daughter of Abu Bakr as-Siddiq',
    earlyLifeEn: [
      'Born in Makkah directly into Islam to Abu Bakr (RA) and Umm Ruman (RA)—she famously remarked: "Since I reached the age of understanding, my parents only ever practiced Islam."',
      'Married the Prophet ﷺ after the Hijrah into Madinah, blessed with razor-sharp intelligence, fluency in classical Arabic poetry, medicine, and genealogy.',
    ],
    earlyLifeUr: [
      'مکہ میں حضرت ابوبکر صدیقؓ کے ایمان افروز گھرانے میں پیدا ہوئیں؛ فرمایا کرتی تھیں: "جب سے ہوش سنبھالا، والدین کو دینِ اسلام پر پایا۔"',
      'ہجرت کے بعد مدینہ میں رخصتی ہوئی؛ غیر معمولی ذہانت، عربی ادب، طب اور تاریخ پر گہری نظر رکھتی تھیں۔',
    ],
    eventsEn: [
      'Accompanied the Prophet ﷺ on expeditions including Uhud (carrying water for wounded soldiers) and Banu al-Mustaliq, where hypocrites fabricated a painful slander (al-Ifk)—until Allah personally vindicated her honor forever in Surah an-Nur (24:11–20).',
      'Cared tenderly for the Prophet ﷺ in her apartment during his final illness, where his blessed soul departed resting upon her chest.',
    ],
    eventsUr: [
      'غزوہ احد میں زخمیوں کو پانی پلاتیں؛ غزوہ بنی مصطلق کے بعد منافقین کی تہمت (واقعہ افک) پر اللہ تعالیٰ نے سورہ نور میں آپ کی براءت نازل فرمائی۔',
      'رسول اللہ ﷺ کے مرضِ وفات میں آپ ہی کے حجرے میں تیمارداری کی اور آپ ﷺ کا وصال آپ کے سینے سے ٹیک لگائے ہوئے ہوا۔',
    ],
    virtuesEn: [
      'Preserved and narrated 2,210 authentic Hadiths—fourth highest among all Companions—giving the Ummah precious insight into the Prophet’s private worship, gentleness at home, and nightly Tahajjud.',
      'Abu Musa al-Ash‘ari (RA) testified: "Whenever a Hadith perplexed us, Companions of the Messenger, we asked Aisha and always found knowledge of it with her."',
    ],
    virtuesUr: [
      '2,210 احادیث روایت کر کے امت کو گھریلو سنت، تہجد اور فقہی احکام کا عظیم خزانہ عطا فرمایا۔',
      'حضرت ابو موسیٰ اشعریؓ فرماتے ہیں: "جب بھی ہمیں کسی حدیث میں اشکال ہوتا تو حضرت عائشہؓ کے پاس اس کا یقینی علم مل جاتا۔"',
    ],
    legacyEn: [
      'Spent over four decades after the Prophet’s passing teaching male and female scholars in Madinah, giving every gift away in charity while fasting continuously, and passing away in Ramadan 58 AH.',
    ],
    legacyUr: [
      'وصالِ نبوی ﷺ کے بعد چالیس سال سے زائد عرصے تک مدینہ میں علمِ نبوی کا درس دیتی رہیں اور 58 ہجری رمضان میں وصال فرمایا۔',
    ],
  },
  {
    id: 'sahabiyah-hafsah',
    name: 'Hafsah bint Umar',
    nameUrdu: 'حضرت حفصہ بنت عمرؓ',
    honorific: 'Guardian of the Master Quranic Manuscript',
    category: 'Mothers of the Believers',
    eraNote: '605–665 CE · Daughter of Umar al-Faruq',
    earlyLifeEn: [
      'Eldest daughter of Umar ibn al-Khattab (RA), born in Makkah five years before prophethood; famous for literacy (having learned writing from ash-Shifa bint Abdullah), outspoken courage, and intense piety.',
      'Accepted Islam early with her family and migrated to Madinah with her first husband Khunays ibn Hudhafah (RA), who succumbed to wounds sustained at Badr.',
    ],
    earlyLifeUr: [
      'حضرت عمر فاروقؓ کی سب سے بڑی صاحبزادی تھیں جو بعثت سے پانچ سال قبل پیدا ہوئیں؛ لکھنا پڑھنا جانتی تھیں اور نہایت عبادت گزار تھیں۔',
      'مکہ میں اسلام لائیں اور شوہر حضرت خنیسؓ کے ساتھ مدینہ ہجرت کی، جو غزوہ بدر کے زخموں سے شہید ہو گئے۔',
    ],
    eventsEn: [
      'When Umar (RA) felt anxious over her widowhood, the Prophet ﷺ honored him by marrying Hafsah (RA) in 3 AH.',
      'Dedicated her days to voluntary fasting and her nights to standing in prayer, narrating sixty Hadiths regarding Prophetic devotion and Quranic rules.',
    ],
    eventsUr: [
      'حضرت عمرؓ کی پریشانی دور کرنے کے لیے رسول اللہ ﷺ نے 3 ہجری میں حضرت حفصہؓ سے نکاح فرمایا۔',
      'دن روزے میں اور راتیں عبادت میں گزارتیں؛ ساٹھ احادیث روایت فرمائیں۔',
    ],
    virtuesEn: [
      'Angel Jibril (AS) instructed the Prophet ﷺ regarding Hafsah: "Indeed she is Sawwamah (frequent faster) and Qawwamah (constant night-worshipper), and she is your wife in Paradise" (at-Tabarani / al-Hakim).',
    ],
    virtuesUr: [
      'جبرائیلؑ نے حضور ﷺ سے ان کے بارے میں فرمایا: "یہ کثرت سے روزے رکھنے اور راتوں کو عبادت کرنے والی ہیں اور جنت میں آپ کی زوجہ ہوں گی۔"',
    ],
    legacyEn: [
      'Entrusted with the sole master written manuscript (Suhuf) of the Holy Quran compiled during Abu Bakr’s and Umar’s caliphates—preserving it faithfully until Uthman (RA) borrowed it to transcribe the canonical Uthmani Mushafs.',
    ],
    legacyUr: [
      'عہدِ صدیقی و فاروقی میں جمع شدہ قرآنِ مجید کا اصل نسخہ آپ ہی کی تحویل میں محفوظ رہا، جس سے بعد میں حضرت عثمانؓ نے امت کے لیے نقول تیار کروائیں۔',
    ],
  },
  {
    id: 'sahabiyah-umm-salamah',
    name: 'Umm Salamah (Hind bint Abi Umayyah)',
    nameUrdu: 'حضرت ام سلمہؓ',
    honorific: 'Wise Counselor of Hudaybiyyah & Narrator of Hadith',
    category: 'Mothers of the Believers',
    eraNote: '596–680 CE · Banu Makhzum',
    earlyLifeEn: [
      'Born Hind bint Abi Umayyah into the influential Makhzum clan; married her noble cousin Abu Salamah (RA), and together they were among the very earliest Makkan converts.',
      'Migrated to Abyssinia and later endured a heart-wrenching year-long separation when her clan tore her son and husband away during the Hijrah to Madinah before finally reuniting.',
    ],
    earlyLifeUr: [
      'قبیلہ بنو مخزوم کے معزز گھرانے میں پیدا ہوئیں اور اپنے شوہر ابو سلمہؓ کے ساتھ ابتدائی دور میں اسلام قبول کیا۔',
      'حبشہ و مدینہ کی ہجرتوں میں شدید مصائب جھیلے؛ قبیلے نے بچہ اور شوہر الگ کر دیے مگر صبر سے بالآخر مدینہ جا پہنچیں۔',
    ],
    eventsEn: [
      'When Abu Salamah (RA) died from Uhud wounds, she remembered the Prophet’s du‘a ("O Allah, reward me in my affliction and replace it with what is better"), wondering silently who could be better than Abu Salamah—until the Prophet ﷺ proposed to her in 4 AH.',
      'Provided decisive statesmanship at the Treaty of Hudaybiyyah: when heartbroken Companions hesitated to sacrifice and shave their heads, she advised the Prophet ﷺ to sacrifice and shave silently first—breaking the deadlock immediately.',
    ],
    eventsUr: [
      'ابو سلمہؓ کی وفات پر مسنون دعا پڑھی: "اے اللہ مجھے مصیبت کا اجر دے اور اس سے بہتر نعم البدل عطا فرما"، جس کے صلے میں 4 ہجری میں رسول اللہ ﷺ سے نکاح ہوا۔',
      'صلحِ حدیبیہ کے نازک موقع پر حضور ﷺ کو حکیمانہ مشورہ دیا جس پر عمل کرتے ہی تمام صحابہؓ نے قربانی و حلق کر لیا۔',
    ],
    virtuesEn: [
      'Praised for remarkable intelligence, legal depth, and beauty of speech. When she asked why women were rarely mentioned separately in revelation, Allah revealed Surah al-Ahzab (33:35) honoring believing men and women equally.',
    ],
    virtuesUr: [
      'آپ کی دینی بصیرت پر سورہ احزاب کی آیت 35 نازل ہوئی جس میں مومن مردوں کے ساتھ مومن عورتوں کے اجر کی صراحت فرمائی گئی۔',
    ],
    legacyEn: [
      'Narrated 378 authentic Hadiths (second only to Aisha among the Mothers of the Believers) and passed away around 61 AH—outliving all other wives of the Prophet ﷺ.',
    ],
    legacyUr: [
      '378 احادیث روایت کیں اور تمام ازواجِ مطہرات میں سب سے آخر میں تقریباً 61 ہجری میں وصال فرمایا۔',
    ],
  },
  {
    id: 'sahabiyah-zaynab-jahsh',
    name: 'Zaynab bint Jahsh',
    nameUrdu: 'حضرت زینب بنت جحشؓ',
    honorific: 'Mother of the Poor · Longest Hand in Charity',
    category: 'Mothers of the Believers',
    eraNote: '590–641 CE · Paternal Cousin of the Prophet ﷺ',
    earlyLifeEn: [
      'Daughter of Umaymah bint Abdul-Muttalib, paternal aunt of the Prophet ﷺ; raised in Makkah and embraced Islam early alongside her siblings.',
      'Initially wed to the Prophet’s adopted son Zayd ibn Harithah (RA) at the Prophet’s urging to break class barriers.',
    ],
    earlyLifeUr: [
      'رسول اللہ ﷺ کی پھوپھی امیمہ بنت عبدالمطلب کی صاحبزادی تھیں اور ابتدائی مکی دور میں اسلام قبول کر کے مدینہ ہجرت کی۔',
      'طبقاتی اونچ نیچ ختم کرنے کے لیے حضور ﷺ کے حکم پر حضرت زید بن حارثہؓ سے نکاح قبول فرمایا۔',
    ],
    eventsEn: [
      'Following the divorce from Zayd (RA), Allah personally decreed her marriage to the Prophet ﷺ in the Quran (Surah al-Ahzab 33:37) to permanently abolish the pre-Islamic taboo forbidding marriage with former spouses of adopted sons.',
      'Earned her living tanning hides and crafting leatherwork, donating every single dirham to widows and orphans.',
    ],
    eventsUr: [
      'حضرت زیدؓ سے علیحدگی کے بعد جاہلی متبنیٰ رسم کو مٹانے کے لیے اللہ کے براہِ راست حکم (سورہ احزاب 33:37) سے حضور ﷺ کے نکاح میں آئیں۔',
      'اپنے ہاتھ سے چمڑا رنگ کر اور محنت سے کما کر ساری آمدنی غریبوں میں بانٹ دیا کرتی تھیں۔',
    ],
    virtuesEn: [
      'Even Aisha (RA) praised her: "I have never seen a woman better in religion than Zaynab, more God-fearing, more truthful, more faithful to family ties, and more generous in charity."',
      'Fulfilled the Prophet’s prophecy that the wife with the "longest hand" (in generosity) would be the very first to join him after his passing.',
    ],
    virtuesUr: [
      'حضرت عائشہؓ فرماتی تھیں: "میں نے دین داری، تقویٰ، سچائی اور صدقہ و خیرات میں زینبؓ سے بہتر کوئی خاتون نہیں دیکھی۔"',
      'رسول اللہ ﷺ کی پیش گوئی کے مطابق سخاوت میں "لمبے ہاتھ" والی ہونے کی وجہ سے وصالِ نبوی کے بعد سب سے پہلے آپ ﷺ سے جا ملیں۔',
    ],
    legacyEn: [
      'Passed away in 20 AH during Umar’s Caliphate; when Umar sent her 12,000 dirhams stipend, she gave all of it away wrapped in a cloth before noon, praying not to be alive to see next year’s wealth.',
    ],
    legacyUr: [
      '20 ہجری میں وصال فرمایا؛ حضرت عمرؓ کا بھیجا ہوا بارہ ہزار درہم کا وظیفہ بھی پورا کا پورا صدقہ کر کے فرمایا کہ اے اللہ آئندہ سال یہ مال مجھ پر نہ آئے۔',
    ],
  },
  {
    id: 'sahabiyah-juwayriyah',
    name: 'Juwayriyah bint al-Harith',
    nameUrdu: 'حضرت جویریہ بنت الحارثؓ',
    honorific: 'The Greatest Blessing to Her Tribe',
    category: 'Mothers of the Believers',
    eraNote: '608–676 CE · Banu al-Mustaliq',
    earlyLifeEn: [
      'Born Barrah bint al-Harith, daughter of the chief of Banu al-Mustaliq; highly articulate, dignified, and refined.',
      'Captured after her tribe’s failed hostility at al-Muraysi‘ in 5 AH, she approached the Prophet ﷺ seeking help to buy her own freedom.',
    ],
    earlyLifeUr: [
      'قبیلہ بنو مصطلق کے سردار حارث بن ابی ضرار کی صاحبزادی تھیں؛ اصل نام برہ تھا جسے حضور ﷺ نے بدل کر جویریہ رکھا۔',
      '5 ہجری میں غزوہ بنی مصطلق کے بعد قید ہو کر آئیں اور اپنی آزادی کی کتابت کے سلسلے میں رسول اللہ ﷺ کی خدمت میں حاضر ہوئیں۔',
    ],
    eventsEn: [
      'The Prophet ﷺ offered to pay her entire ransom and marry her in honor; she gladly accepted Islam and marriage, and the Prophet renamed her Juwayriyah.',
      'Hearing that Banu al-Mustaliq had now become in-laws of the Messenger of Allah ﷺ, the Companions immediately freed over one hundred captive families without taking a coin—prompting her entire tribe to accept Islam peacefully!',
    ],
    eventsUr: [
      'رسول اللہ ﷺ نے آپ کا فدیہ ادا کر کے نکاح کی پیشکش فرمائی جسے آپ نے قبول کیا اور اسلام لے آئیں۔',
      'صحابہ کرامؓ نے جب سنا کہ بنو مصطلق اب حضور ﷺ کے سسرالی بن گئے ہیں تو سو سے زائد قیدی خاندان فوراً آزاد کر دیے، جس سے پورا قبیلہ مشرف بہ اسلام ہو گیا۔',
    ],
    virtuesEn: [
      'Aisha (RA) famously remarked: "I do not know of any woman who was a greater blessing to her people than Juwayriyah."',
      'Immersed deeply in daily Dhikr—once the Prophet ﷺ left her at Fajr reciting Tasbih and returned mid-morning to find her still sitting in remembrance, teaching her the four profound words ("SubhanAllahi wa bihamdihi, ‘adada khalqihi, wa rida nafsihi, wa zinata ‘arshihi, wa midada kalimatih") weighing more than hours of Dhikr.',
    ],
    virtuesUr: [
      'حضرت عائشہؓ نے فرمایا: "میں نے کسی عورت کو اپنی قوم کے لیے حضرت جویریہؓ سے بڑھ کر بابرکت نہیں دیکھا۔"',
      'کثرتِ ذکر کی وجہ سے آپ ﷺ نے انہیں چار کلمات (سبحان اللہ وبحمدہ عدد خلقہ ورضا نفسہ وزنة عرشہ ومداد کلماتہ) سکھائے جو گھنٹوں کے تسبیحات سے افضل ہیں۔',
    ],
    legacyEn: [
      'Narrated seven authentic Hadiths, remained devoted to fasting and Dhikr throughout her life, and passed away peacefully in Madinah in 56 AH.',
    ],
    legacyUr: [
      'آپ سے سات احادیث مروی ہیں؛ ساری زندگی ذکر و عبادت میں گزاری اور 56 ہجری میں مدینہ میں وصال فرمایا۔',
    ],
  },
  {
    id: 'sahabiyah-safiyyah',
    name: 'Safiyyah bint Huyayy',
    nameUrdu: 'حضرت صفیہ بنت حییؓ',
    honorific: 'Descendant of Prophets Harun & Musa (AS)',
    category: 'Mothers of the Believers',
    eraNote: '610–670 CE · Banu Nadir & Prophet’s Household',
    earlyLifeEn: [
      'Daughter of Huyayy ibn Akhtab (chief of Banu Nadir) and descended directly from the Prophet Harun (AS). Even before Khaybar, she saw a dream of the full moon falling into her lap—receiving a bruise from her husband for speaking of Muhammad ﷺ.',
    ],
    earlyLifeUr: [
      'بنو نضیر کے سردار حیی بن اخطب کی بیٹی اور حضرت ہارونؑ کی نسل سے تھیں؛ خیبر سے قبل خواب میں چاند اپنی گود میں گرتے دیکھا تھا۔',
    ],
    eventsEn: [
      'Following Khaybar (7 AH), the Prophet ﷺ offered her full freedom to return to her people or freedom with marriage to himself; she declared without hesitation: "I choose Allah and His Messenger!"',
      'Became deeply compassionate, sending food secretly to Uthman (RA) during his 35 AH siege and sharing peaceful humility inside the Prophetic home.',
    ],
    eventsUr: [
      'فتحِ خیبر کے بعد رسول اللہ ﷺ نے آزادی یا نکاح کا اختیار دیا تو فرمایا: "میں اللہ اور اس کے رسول کو چنتی ہوں۔"',
      'محاصرہ عثمانؓ کے دوران خفیہ طور پر خلیفہ کو کھانا پہنچایا اور نہایت حلیم و سخی زندگی گزاری۔',
    ],
    virtuesEn: [
      'When some teased her heritage leaving her in tears, the Prophet ﷺ tenderly wiped her face and taught her to answer: "How could you be better than me when my father is Harun, my uncle is Musa, and my husband is Muhammad!" (Jami‘ at-Tirmidhi).',
    ],
    virtuesUr: [
      'جب کسی نے ان کے نسب کا طعنہ دیا تو حضور ﷺ نے فرمایا: "ان سے کہو تم مجھ سے بہتر کیسے ہو سکتی ہو جب کہ میرے باپ ہارونؑ، چچا موسیٰؑ اور شوہر محمد ﷺ ہیں۔"',
    ],
    legacyEn: [
      'Narrated ten Hadiths, left one-third of her substantial estate (worth 100,000 dirhams) to her non-Muslim Jewish nephew out of pure family kindness, and passed away around 50 AH.',
    ],
    legacyUr: [
      'دس احادیث روایت کیں اور وفات سے قبل صلہ رحمی کی خاطر اپنی جائیداد کا ایک تہائی حصہ اپنے غیر مسلم بھانجے کو وصیت فرمایا۔',
    ],
  },
  {
    id: 'sahabiyah-maymunah',
    name: 'Maymunah bint al-Harith',
    nameUrdu: 'حضرت میمونہ بنت الحارثؓ',
    honorific: 'Last Wife of the Prophet ﷺ · Symbol of Kinship & Worship',
    category: 'Mothers of the Believers',
    eraNote: '594–671 CE · Aunt of Khalid ibn al-Walid & Ibn Abbas',
    earlyLifeEn: [
      'Born Barrah bint al-Harith into Banu Hilal; aunt of both Khalid ibn al-Walid (RA) and Abdullah ibn Abbas (RA). The Prophet ﷺ renamed her Maymunah ("The Blessed").',
      'Married the Prophet ﷺ during Umrat al-Qada in 7 AH after her brother-in-law al-Abbas ibn Abdul-Muttalib proposed—reconciling several hostile tribes.',
    ],
    earlyLifeUr: [
      'بنو ہلال سے تعلق تھا اور حضرت خالد بن ولیدؓ و عبداللہ بن عباسؓ کی خالہ تھیں؛ حضور ﷺ نے آپ کا نام برہ سے بدل کر میمونہ (بابرکت) رکھا۔',
      '7 ہجری میں عمرۃ القضاء کے موقع پر آپ ﷺ سے نکاح ہوا جس سے کئی قبائل کے دل اسلام کی طرف مائل ہوئے۔',
    ],
    eventsEn: [
      'Narrated 76 authentic Hadiths—especially preserving precise details of the Prophet’s Wudu, Ghusl, and Tahajjud prayer inside her house observed by her young nephew Ibn Abbas (RA).',
      'Renowned for freeing enslaved people generously and strictly avoiding debt out of trust in Allah’s provision.',
    ],
    eventsUr: [
      '76 احادیث روایت کیں اور حضور ﷺ کے غسل، وضو اور تہجد کے دقیق مسائل امت تک پہنچائے۔',
      'قرض لینے سے سختی سے بچتیں اور غلاموں کو آزاد کرنے میں پیش پیش رہتی تھیں۔',
    ],
    virtuesEn: [
      'Aisha (RA) testified warmly upon her passing: "By Allah, Maymunah has passed away—and she was the most God-fearing among us and the most mindful of family ties."',
    ],
    virtuesUr: [
      'آپ کے وصال پر حضرت عائشہؓ نے گواہی دی: "اللہ کی قسم! میمونہ ہم سب میں سب سے زیادہ پرہیزگار اور صلہ رحمی کرنے والی تھیں۔"',
    ],
    legacyEn: [
      'Requested to be buried at Sarif—the very valley outside Makkah where her wedding tent had been pitched forty-four years earlier—passing away peacefully around 51 AH.',
    ],
    legacyUr: [
      '51 ہجری میں عین اسی مقام (سرف) پر وصال و تدفین ہوئی جہاں چوالیس سال قبل آپ کی رخصتی کا خیمہ لگا تھا۔',
    ],
  },

  // --- 3. PROMINENT COMPANIONS & SCHOLARS (17) ---
  {
    id: 'sahabi-bilal',
    name: 'Bilal ibn Rabah',
    nameUrdu: 'حضرت بلال بن رباحؓ',
    honorific: 'Mu’adhdhin of the Prophet ﷺ · Master of Endurance',
    category: 'Prominent Companions & Scholars',
    eraNote: '580–640 CE · Makkah, Madinah & Damascus',
    earlyLifeEn: [
      'Born in Makkah to an Abyssinian mother (Hamamah) in bondage under Umayyah ibn Khalaf.',
      'Became one of the first seven Muslims to declare faith openly—and suffered daily torture on blazing desert rocks under heavy boulders while repeating only "Ahad, Ahad!" (The One God!) until Abu Bakr (RA) bought and emancipated him.',
    ],
    earlyLifeUr: [
      'مکہ میں حبشی النسل ماں حمامہ کے ہاں پیدا ہوئے اور امیہ بن خلف کے غلام تھے۔',
      'ابتدائی سات اعلانیہ ایمان لانے والوں میں شامل تھے؛ تپتی ریت پر بھاری پتھر تلے "احد، احد" پکارتے رہے یہاں تک کہ حضرت ابوبکرؓ نے خرید کر آزاد کر دیا۔',
    ],
    eventsEn: [
      'Chosen by the Prophet ﷺ as Islam’s very first Mu’adhdhin in Madinah, delivering the stirring Adhan five times daily. Fought at Badr where he confronted his former tormentor Umayyah.',
      'On Fath Makkah, he climbed atop the Ka‘bah itself to proclaim the Adhan of Tawhid. After the Prophet’s passing, unable to finish "Ash-hadu anna Muhammadan Rasulullah" without breaking down, he moved to Syria—returning only once for Umar’s opening of Jerusalem.',
    ],
    eventsUr: [
      'مدینہ منورہ میں اسلام کے پہلے مؤذن مقرر ہوئے اور غزوہ بدر میں اپنے سابق ظالم آقا سے مقابلہ کیا۔',
      'فتحِ مکہ پر کعبہ کی چھت پر چڑھ کر اذان دی؛ وصالِ نبوی کے بعد شام چلے گئے اور فتحِ بیت المقدس پر حضرت عمرؓ کی فرمائش پر اذان دی تو پورا لشکر رو پڑا۔',
    ],
    virtuesEn: [
      'The Prophet ﷺ told him at Fajr: "O Bilal, tell me of the most hopeful deed you do in Islam, for I heard the sound of your footsteps ahead of me in Paradise!" Bilal replied he never made Wudu by day or night without praying two rak‘ahs (Sahih al-Bukhari).',
    ],
    virtuesUr: [
      'رسول اللہ ﷺ نے فرمایا: "اے بلال! میں نے جنت میں اپنے آگے تمہارے قدموں کی آہٹ سنی ہے" تو انہوں نے بتایا کہ ہر وضو کے بعد دو رکعت نفل ضرور پڑھتا ہوں۔',
    ],
    legacyEn: [
      'Passed away in Damascus around 20 AH reciting joyfully: "Tomorrow we meet the beloved ones—Muhammad and his companions!"—remaining Islam’s eternal emblem of equality and constancy.',
    ],
    legacyUr: [
      '20 ہجری میں دمشق میں وصال کے وقت خوشی سے فرمایا: "کل ہم اپنے محبوب محمد ﷺ اور ان کے ساتھیوں سے جا ملیں گے!" رنگ و نسل سے بالاتر مساواتِ اسلام کی علامت ہیں۔',
    ],
  },
  {
    id: 'sahabi-salman',
    name: 'Salman al-Farsi',
    nameUrdu: 'حضرت سلمان فارسیؓ',
    honorific: 'The Seeker of Truth · Member of Ahl al-Bayt',
    category: 'Prominent Companions & Scholars',
    eraNote: 'd. 656 CE · Isfahan to Madinah & al-Mada’in',
    earlyLifeEn: [
      'Raised in comfort as the cherished son of a Zoroastrian estate holder in Jayy (Isfahan), he encountered a Christian church and walked away from wealth forever seeking truth across Syria, Mosul, Nisibis, and Ammuriyyah.',
      'Following a dying monk’s prophecy of a Prophet emerging in a land of date palms between black volcanic plains who accepts gifts, refuses Sadaqah, and bears the Seal of Prophethood—Salman reached Madinah in bondage, verified all three signs firsthand, and accepted Islam.',
    ],
    earlyLifeUr: [
      'اصفہان کے ایک مالدار مجوسی زمیندار کے بیٹے تھے مگر حق کی تلاش میں گھر بار چھوڑ کر شام و عراق کے علماء کی صحبت میں رہے۔',
      'آخری راہب کی بتائی ہوئی تین نشانیوں (صدقہ نہ لینا، ہدیہ قبول کرنا اور مہرِ نبوت) کو مدینہ میں پرکھ کر اسلام قبول کیا اور حضور ﷺ نے ان کی آزادی کروائی۔',
    ],
    eventsEn: [
      'Freed through three hundred palm shoots planted personally by the Prophet ﷺ and a piece of gold miraculously multiplying to clear his debt.',
      'Proposed the unprecedented defensive trench strategy before the Battle of al-Ahzab (Khandaq), saving Madinah from a 10,000-man coalition.',
    ],
    eventsUr: [
      'حضور ﷺ نے خود اپنے دستِ مبارک سے کھجور کے تین سو پودے لگا کر آپ کی مکاتبت ادا کروائی اور غلامی سے آزاد کروایا۔',
      'غزوہ احزاب میں مدینہ کے گرد خندق کھودنے کا تاریخی مشورہ دیا جس سے دس ہزار کا لشکر ناکام لوٹ گیا۔',
    ],
    virtuesEn: [
      'As Muhajirun and Ansar debated whom Salman belonged to at Khandaq, the Prophet ﷺ settled it forever: "Salman is one of us, the People of the House (Ahl al-Bayt)."',
      'Memorized both previous scriptures’ wisdom and the Quran, later co-advising Abu ad-Darda’ (RA) in a Hadith preserved in Sahih al-Bukhari: "Your Lord has a right over you, your soul has a right, and your family has a right."',
    ],
    virtuesUr: [
      'غزوہ خندق میں مہاجرین و انصار کے اصرار پر حضور ﷺ نے فرمایا: "سلمان ہم میں سے، یعنی اہلِ بیت میں سے ہیں۔"',
      'حکمت و فقہ کا یہ عالم تھا کہ آپ کی نصیحت ("تمہارے رب، جان اور اہل سب کا حق ہے") صحیح بخاری کی مشہور حدیث بنی۔',
    ],
    legacyEn: [
      'Appointed Governor of al-Mada’in (former Persian capital) under Umar (RA), he gave away his entire governor salary in charity and earned his daily bread weaving palm baskets—dying in 35 AH owning scarcely twenty dirhams.',
    ],
    legacyUr: [
      'مدائن کے گورنر مقرر ہو کر بھی سرکاری تنخواہ صدقہ کر دیتے اور کھجور کے پتے بن کر اپنی روزی کماتے؛ 35 ہجری میں فقیرانہ سادگی سے وصال فرمایا۔',
    ],
  },
  {
    id: 'sahabi-abu-dharr',
    name: 'Abu Dharr al-Ghifari',
    nameUrdu: 'حضرت ابوذر غفاریؓ',
    honorific: 'The Truth-Teller & Ascetic Champion of the Poor',
    category: 'Prominent Companions & Scholars',
    eraNote: 'd. 652 CE · Banu Ghifar (ar-Rabadhah)',
    earlyLifeEn: [
      'Born Jundub ibn Junadah in Banu Ghifar, a desert clan along the Makkan trade routes. Even before meeting Muhammad ﷺ, Abu Dharr prayed privately to Allah alone and rejected idols.',
      'Hearing rumors of a Prophet in Makkah, he traveled alone, sought out Ali (RA) silently at night, listened directly to the Prophet ﷺ, and became the 4th or 5th person ever to embrace Islam—promptly shouting the Shahadah aloud right beside the Ka‘bah despite being beaten unconscious.',
    ],
    earlyLifeUr: [
      'نام جندب بن جنادہ اور قبیلہ بنو غفار سے تھے؛ قبل از اسلام بھی بتوں سے بیزار اور توحید پرست تھے۔',
      'تنہا مکہ پہنچے، چوتھے یا پانچویں نمبر پر اسلام قبول کیا اور حرمِ کعبہ میں جا کر علی الاعلان کلمہ پڑھا جس پر کفار نے بے ہوش ہونے تک مارا۔',
    ],
    eventsEn: [
      'Returned home and converted nearly the entire Banu Ghifar tribe (and neighboring Aslam) to Islam before ever migrating to Madinah after Khandaq.',
      'During the arduous Tabuk march, when his camel collapsed from thirst and heat, Abu Dharr shouldered his pack and walked alone across the desert to catch the Prophet ﷺ.',
    ],
    eventsUr: [
      'اپنے قبیلے میں واپس جا کر پورے بنو غفار اور بنو اسلم کو اسلام کی دعوت دی اور خندق کے بعد مدینہ آ کر مستقل قیام کیا۔',
      'غزوہ تبوک میں اونٹ تھک کر بیٹھ گیا تو پیدل ہی سامان اٹھائے تپتے صحرا میں حضور ﷺ سے جا ملے۔',
    ],
    virtuesEn: [
      'When he finally caught up alone at Tabuk, the Prophet ﷺ said: "May Allah have mercy on Abu Dharr—he walks alone, will die alone, and will be resurrected alone."',
      'The Prophet ﷺ further testified: "The sky has not shaded nor the earth carried a speaker more truthful than Abu Dharr" (Jami‘ at-Tirmidhi).',
    ],
    virtuesUr: [
      'تبوک میں تنہا پہنچنے پر حضور ﷺ نے فرمایا: "اللہ ابوذر پر رحم فرمائے، وہ تنہا چلتا ہے، تنہا مرے گا اور تنہا اٹھایا جائے گا۔"',
      'مزید فرمایا: "آسمان نے سایہ نہیں کیا اور زمین نے کسی ایسے شخص کو نہیں اٹھایا جو ابوذر سے زیادہ سچا ہو۔"',
    ],
    legacyEn: [
      'Passionate critic of hoarding gold and luxury, instructing rulers with Quran 9:34 ("Those who hoard gold and silver and spend it not in the way of Allah—give them tidings of a painful punishment"). Chose solitary worship in ar-Rabadhah, dying there in 32 AH exactly as the Prophet ﷺ foretold, buried by passing Ibn Mas‘ud (RA).',
    ],
    legacyUr: [
      'زر اندوزی کے خلاف ہمیشہ حق گوئی فرمائی اور آخر عمر میں ربذہ کے صحرا میں تنہا عبادت کرتے ہوئے 32 ہجری میں وصال فرمایا جہاں حضرت ابن مسعودؓ نے تدفین کی۔',
    ],
  },
  {
    id: 'sahabi-ibn-masud',
    name: 'Abdullah ibn Mas‘ud',
    nameUrdu: 'حضرت عبداللہ بن مسعودؓ',
    honorific: 'First Public Reciter of Quran · Founder of Kufan Fiqh',
    category: 'Prominent Companions & Scholars',
    eraNote: '594–653 CE · Makkah, Madinah & Kufa',
    earlyLifeEn: [
      'A humble, slender shepherd boy tending Uqbah ibn Abi Mu‘ayt’s sheep in Makkah. Witnessing the Prophet ﷺ bless an empty goat’s udder into flowing milk in the hills, Abdullah immediately accepted Islam—the sixth person to do so.',
    ],
    earlyLifeUr: [
      'مکہ میں بکریاں چرانے والے کمزور جسامت کے نوجوان تھے؛ خشک بکری کے تھنوں میں معجزانہ دودھ اترتے دیکھ کر چھٹے نمبر پر ایمان لے آئے۔',
    ],
    eventsEn: [
      'Wait in attendance on the Prophet’s personal needs—carrying his Siwak, sandals, and pillow—gaining intimate access inside the Prophetic home.',
      'Volunteered to become the very first Muslim to recite Surah ar-Rahman aloud beside the Ka‘bah before Quraysh leaders, enduring severe beatings proudly. Fought at Badr and dispatched Abu Jahl at battle’s end.',
    ],
    eventsUr: [
      'رسول اللہ ﷺ کے خاص خادم رہے (مسواک، نعلین اور تکیہ اٹھاتے) جس کی وجہ سے ہر وقت صحبتِ نبوی میسر رہی۔',
      'مکہ میں کعبہ کے پاس بلند آواز سے سورہ رحمٰن تلاوت کرنے والے پہلے صحابی بنے اور غزوہ بدر میں ابوجہل کا کام تمام کیا۔',
    ],
    virtuesEn: [
      'Once Companions chuckled at his thin shins as he climbed an Arak tree; the Prophet ﷺ corrected them: "Why do you laugh? By the One in whose hand is my soul, those two legs will be heavier on the Scale on Judgment Day than Mount Uhud!"',
      'Declared by the Prophet ﷺ: "Whoever wishes to recite the Quran as fresh as the day it was revealed, let him recite it like Ibn Umm Abd (Ibn Mas‘ud)" (Musnad Ahmad), naming him one of the top four Quran teachers.',
    ],
    virtuesUr: [
      'درخت پر چڑھتے وقت پتلی پنڈلیوں پر صحابہؓ مسکرائے تو حضور ﷺ نے فرمایا: "قیامت کے دن میزانِ عمل میں یہ دونوں پنڈلیاں احد پہاڑ سے زیادہ وزنی ہوں گی۔"',
      'فرمایا: "جو قرآن کو بالکل تازہ نازل ہونے کی طرح پڑھنا چاہے وہ ابن ام عبد (ابن مسعودؓ) کی طرح پڑھے۔"',
    ],
    legacyEn: [
      'Sent by Umar (RA) to Kufa ("I have preferred you over myself with Abdullah"), where he trained an entire generation of scholars—including Alqamah and al-Aswad—forming the bedrock of Iraqi Hanafi jurisprudence. Passed away in 32 AH.',
    ],
    legacyUr: [
      'حضرت عمرؓ نے انہیں کوفہ کا معلم و قاضی بنا کر بھیجا؛ آپ کے شاگردوں سے عراق و فقہِ حنفی کا عظیم علمی مدرسہ قائم ہوا۔ 32 ہجری میں مدینہ میں وصال فرمایا۔',
    ],
  },
  {
    id: 'sahabi-ibn-abbas',
    name: 'Abdullah ibn Abbas',
    nameUrdu: 'حضرت عبداللہ بن عباسؓ',
    honorific: 'Habr al-Ummah (Scholar of the Nation) & Tarjuman al-Quran',
    category: 'Prominent Companions & Scholars',
    eraNote: '619–687 CE · Makkah, Madinah & Ta’if',
    earlyLifeEn: [
      'Born in Shi‘b Abi Talib during the agonizing Makkan boycott to the Prophet’s uncle al-Abbas (RA); blessed immediately with the Prophet’s Tahnik (first taste of sweetness).',
      'Raised in Madinah close to his cousin the Prophet ﷺ and his aunt Maymunah (RA), often watching the Prophet’s nightly Tahajjud.',
    ],
    earlyLifeUr: [
      'شعبِ ابی طالب کے محاصرے کے دوران حضرت عباسؓ کے گھر پیدا ہوئے اور حضور ﷺ کی دعاؤں و شفقت میں پلے۔',
      'اپنی خالہ حضرت میمونہؓ کے گھر رہتے ہوئے رسول اللہ ﷺ کی تہجد اور روزمرہ سنتوں کا قریب سے مشاہدہ کیا۔',
    ],
    eventsEn: [
      'Left Madinah only briefly for Basra under Ali (RA) and famously entered a peaceful scholarly debate with 6,000 rebellious Kharijites near Harura—convincing 2,000 of them to lay down arms through Quranic reasoning alone.',
      'Devoted thirty years after the Prophet’s passing to teaching daily circles on Tafsir, Hadith, inheritance law, Arabic grammar, and pre-Islamic poetry.',
    ],
    eventsUr: [
      'حضرت علیؓ کے دور میں خوارج کے کیمپ میں جا کر تنہا علمی مناظرہ کیا اور محض قرآن و سنت کے دلائل سے دو ہزار خوارج کو حق کی طرف پلٹا دیا۔',
      'حضور ﷺ کے بعد تیس سال تک مکہ و مدینہ میں تفسیرِ قرآن، فقہ اور عربی ادب کے حلقے قائم فرمائے۔',
    ],
    virtuesEn: [
      'After teenage Abdullah prepared Wudu water silently in the night, the Prophet ﷺ hugged him and prayed: "O Allah, grant him deep comprehension (Fiqh) of the religion and teach him the interpretation (Ta’wil) of the Quran" (Sahih al-Bukhari).',
      'Narrated 1,660 Hadiths and was revered by senior Companions like Umar (RA), who seated young Ibn Abbas beside veterans of Badr.',
    ],
    virtuesUr: [
      'حضور ﷺ نے آپ کو گلے لگا کر دعا دی: "اے اللہ! اسے دین کی گہری سمجھ اور قرآن کی تاویل (تفسیر) کا علم عطا فرما۔"',
      '1,660 احادیث روایت کیں اور حضرت عمرؓ انہیں بدری صحابہؓ کی مجلس میں بٹھا کر مشورہ لیتے تھے۔',
    ],
    legacyEn: [
      'Walked tirelessly to senior Companions’ doorsteps, resting on his cloak outside in dust rather than waking them, saying: "Knowledge is sought, it does not come seeking you." Passed away in Ta’if in 68 AH.',
    ],
    legacyUr: [
      'کبار صحابہؓ کے دروازوں پر مٹی میں چادر بچھا کر انتظار کرتے تاکہ علمِ حدیث حاصل کریں؛ 68 ہجری میں طائف میں وصال فرمایا۔',
    ],
  },
  {
    id: 'sahabi-ibn-umar',
    name: 'Abdullah ibn Umar',
    nameUrdu: 'حضرت عبداللہ بن عمرؓ',
    honorific: 'Model of Meticulous Adherence to the Sunnah',
    category: 'Prominent Companions & Scholars',
    eraNote: '610–693 CE · Son of Umar al-Faruq',
    earlyLifeEn: [
      'Born in Makkah to Umar ibn al-Khattab (RA) and Zaynab bint Maz‘un; accepted Islam as a child alongside his father and migrated to Madinah.',
      'Too young at Badr and Uhud (turned back at 14), he trained fiercely until permitted to fight at Khandaq at age 15.',
    ],
    earlyLifeUr: [
      'حضرت عمر فاروقؓ کے صاحبزادے؛ بچپن ہی میں والد کے ساتھ اسلام قبول کیا اور مدینہ ہجرت فرمائی۔',
      'بدر و احد میں کم عمری کی وجہ سے واپس لوٹا دیے گئے، پھر 15 سال کی عمر میں غزوہ خندق میں شریک ہوئے۔',
    ],
    eventsEn: [
      'Preserved 2,630 authentic Hadiths—second only to Abu Hurayrah across the entire Ummah—with extraordinary caution, often trembling lest he alter a single Prophetic word.',
      'Refused all offers to serve as judge or take sides in civil conflict, dedicating sixty years to prayer, teaching in Madinah and Makkah, and charity.',
    ],
    eventsUr: [
      '2,630 احادیث روایت کر کے حفاظتِ حدیث میں دوسرا بڑا مقام حاصل کیا؛ روایت بیان کرتے ہوئے حد درجہ احتیاط فرماتے تھے۔',
      'قضا کے عہدوں اور خانہ جنگی سے مکمل کنارہ کش رہے اور ساٹھ سال تک علم و عبادت میں مشغول رہے۔',
    ],
    virtuesEn: [
      'The Prophet ﷺ told Hafsah (RA): "What an excellent man Abdullah is—if only he would pray the night prayer!" From that night onward, Ibn Umar almost never slept at night without standing in Tahajjud.',
      'Celebrated for following every footprint of the Sunnah—even resting his camel beneath the exact trees along the Makkah road where the Prophet ﷺ once paused.',
    ],
    virtuesUr: [
      'رسول اللہ ﷺ نے فرمایا: "عبداللہ کتنا نیک آدمی ہے کاش رات کو نماز (تہجد) پڑھا کرے!" اس کے بعد ساری زندگی تہجد نہ چھوڑی۔',
      'اتباعِ سنت کا یہ عالم تھا کہ سفرِ مکہ میں ان ہی درختوں کے نیچے قیام فرماتے جہاں حضور ﷺ نے آرام فرمایا تھا۔',
    ],
    legacyEn: [
      'Freed over a thousand enslaved people during his lifetime—giving away even his finest garments whenever someone admired them—and passed away in Makkah in 73 AH.',
    ],
    legacyUr: [
      'اپنی حیات میں ایک ہزار سے زائد غلام آزاد کیے اور جب بھی کوئی چیز پسند آتی اللہ کی راہ میں صدقہ کر دیتے؛ 73 ہجری میں مکہ میں وصال فرمایا۔',
    ],
  },
  {
    id: 'sahabi-abu-hurayrah',
    name: 'Abu Hurayrah (Abdur-Rahman ibn Sakhr)',
    nameUrdu: 'حضرت ابوہریرہؓ',
    honorific: 'Foremost Preserver of Hadith (5,374 Narrations)',
    category: 'Prominent Companions & Scholars',
    eraNote: '603–681 CE · Daws Tribe (Yemen) & Madinah',
    earlyLifeEn: [
      'Born Abd Shams in the Daws tribe of southern Yemen and affectionately nicknamed Abu Hurayrah ("Father of the Kitten") by the Prophet ﷺ after seeing him gently carry a kitten inside his sleeve.',
      'Accepted Islam in Yemen through at-Tufayl ibn Amr (RA) and migrated to Madinah in 7 AH right at the time of Khaybar.',
    ],
    earlyLifeUr: [
      'یمن کے قبیلہ دوس میں پیدا ہوئے؛ بلی کے بچے سے شفقت پر حضور ﷺ نے "ابوہریرہ" کا لقب عطا فرمایا۔',
      '7 ہجری میں غزوہ خیبر کے موقع پر مدینہ تشریف لائے اور اسلام کی دولت سے مالا مال ہوئے۔',
    ],
    eventsEn: [
      'While Makkan merchants traded and Ansar tended date groves, Abu Hurayrah lived penniless among Ahl as-Suffah inside Masjid an-Nabawi so he would never miss a single word from the Prophet’s lips.',
      'Often fainted from hunger between the Pulpit and Aisha’s door, tying stones to his stomach while memorizing revelation and Prophetic rulings day and night.',
    ],
    eventsUr: [
      'مہاجرین تجارت اور انصار زراعت میں مشغول رہتے جبکہ آپ نے مسجدِ نبوی کے صفہ پر رہ کر خود کو صحبتِ نبوی ﷺ کے لیے وقف کر دیا۔',
      'شدید بھوک کی حالت میں پیٹ پر پتھر باندھتے مگر علمِ حدیث کے حصول میں ایک لمحہ ضائع نہ کرتے۔',
    ],
    virtuesEn: [
      'When he lamented forgetting some Hadiths he heard, the Prophet ﷺ told him to spread his cloak, scooped his blessed hands toward the sky and placed them in the cloak, saying: "Gather it to your chest." From that moment, Abu Hurayrah never forgot a single Hadith again (Sahih al-Bukhari).',
      'Narrated 5,374 Hadiths—the highest number of any Companion.',
    ],
    virtuesUr: [
      'جب بھولنے کی شکایت کی تو حضور ﷺ نے چادر پھیلوا کر اس میں دعا فرمائی اور سینے سے لگانے کو کہا؛ اس کے بعد کبھی کوئی حدیث نہ بھولے۔',
      'پوری امت کے لیے سب سے زیادہ یعنی 5,374 احادیثِ مبارکہ محفوظ فرمائیں۔',
    ],
    legacyEn: [
      'Divided every night into thirds: one-third prayer, one-third sleep, and one-third teaching his family and students Hadith (alternating with his wife and daughter so Allah’s remembrance never paused in his house). Passed away in 57 AH.',
    ],
    legacyUr: [
      'اپنے گھر میں رات کے تین حصے مقرر کر رکھے تھے تاکہ تہجد اور ذکرِ الٰہی ساری رات جاری رہے؛ 57 ہجری میں مدینہ میں وصال فرمایا۔',
    ],
  },
  {
    id: 'sahabi-khalid',
    name: 'Khalid ibn al-Walid',
    nameUrdu: 'حضرت خالد بن ولیدؓ',
    honorific: 'Sayfullah al-Maslul (The Drawn Sword of Allah)',
    category: 'Prominent Companions & Scholars',
    eraNote: '585–642 CE · Banu Makhzum',
    earlyLifeEn: [
      'Son of Walid ibn al-Mughirah of Banu Makhzum; unmatched cavalry tactician of Quraysh whose sudden flanking charge shifted the tide at Uhud.',
      'Following the Truce of Hudaybiyyah, seeing truth unmistakably triumphing, he voluntarily traveled to Madinah in Safar 8 AH alongside Amr ibn al-As (RA) and pledged allegiance to the Prophet ﷺ.',
    ],
    earlyLifeUr: [
      'بنو مخزوم کے مایہ ناز شہسوار اور جنگی ماہر تھے جنہوں نے غزوہ احد میں قریش کا پلہ بھاری کیا تھا۔',
      'صلحِ حدیبیہ کے بعد حق روشن ہو جانے پر 8 ہجری میں خود مدینہ حاضر ہو کر اسلام قبول کیا، جس پر حضور ﷺ بے حد خوش ہوئے۔',
    ],
    eventsEn: [
      'Weeks after embracing Islam at Mu’tah (8 AH), after all three appointed Muslim commanders were martyred facing 100,000+ troops, Khalid rallied the outnumbered force and executed an extraordinary tactical withdrawal that saved the army.',
      'Played a decisive role in Fath Makkah, Riddah campaigns, Iraq, and the historic Battle of Yarmuk—never losing a single pitched battle across over 100 engagements.',
    ],
    eventsUr: [
      'قبولِ اسلام کے فوراً بعد غزوہ موتہ میں تین سپہ سالاروں کی شہادت کے بعد کمان سنبھالی اور حکمتِ عملی سے لشکر کو محفوظ نکال لائے۔',
      'فتحِ مکہ، فتنہ ارتداد، عراق اور جنگِ یرموک میں عظیم فتوحات حاصل کیں اور سو سے زائد جنگوں میں ناقابلِ شکست رہے۔',
    ],
    virtuesEn: [
      'Honored directly from the pulpit by the Prophet ﷺ after Mu’tah: "Then the banner was taken by a Sword from the Swords of Allah (Sayfullah), until Allah granted them victory" (Sahih al-Bukhari).',
      'When Caliph Umar (RA) relieved him from top command at the height of victory in Syria lest people rely on Khalid instead of Allah, Khalid submitted without resentment: "I fight for the Lord of Umar, not for Umar."',
    ],
    virtuesUr: [
      'غزوہ موتہ پر رسول اللہ ﷺ نے انہیں "سیف اللہ" (اللہ کی تلوار) کا لقب عطا فرمایا۔',
      'جنگِ یرموک کے عین عروج پر حضرت عمرؓ کے حکمِ معزولی پر بلاتردد عہدہ سپرد کر کے فرمایا: "میں عمر کے لیے نہیں بلکہ عمر کے رب کے لیے لڑتا ہوں۔"',
    ],
    legacyEn: [
      'Wept on his deathbed in Homs (21 AH) lamenting dying in bed despite bearing scarcely a hand’s-breadth of unmarked skin free from spear, arrow, or sword scars: "May the eyes of cowards never sleep."',
    ],
    legacyUr: [
      '21 ہجری میں حمص میں بسترِ مرگ پر روتے ہوئے فرمایا کہ جسم پر بالشت بھر جگہ زخموں سے خالی نہیں مگر بستر پر موت آ رہی ہے؛ "بزدلوں کی آنکھیں کبھی نہ سوئیں۔"',
    ],
  },
  {
    id: 'sahabi-hamza',
    name: 'Hamza ibn Abdul-Muttalib',
    nameUrdu: 'حضرت حمزہ بن عبدالمطلبؓ',
    honorific: 'Asadullah · Master of the Martyrs (Sayyid ash-Shuhada)',
    category: 'Prominent Companions & Scholars',
    eraNote: '568–625 CE · Uncle & Foster Brother of the Prophet ﷺ',
    earlyLifeEn: [
      'Paternal uncle, childhood playmate, and milk-brother (nursed by Thuwaybah) of the Prophet ﷺ; admired across Arabia as Makkah’s fiercest hunter and fearless knight.',
      'Returning from hunting in Year 6 of Prophethood and learning Abu Jahl had brutally insulted Muhammad ﷺ near Safa, Hamza marched straight to the Ka‘bah, struck Abu Jahl across the forehead with his bow, and roared his acceptance of Islam publicly.',
    ],
    earlyLifeUr: [
      'نبی کریم ﷺ کے چچا اور رضاعی بھائی تھے؛ مکہ کے سب سے نامور پہلوان، شکاری اور نڈر انسان تھے۔',
      'نبوت کے چھٹے سال شکار سے واپسی پر ابو جہل کی گستاخی سن کر حرم میں جا کر اس کے سر پر کمان ماری اور علی الاعلان اسلام قبول کر لیا۔',
    ],
    eventsEn: [
      'His conversion shattered Quraysh’s intimidation and gave Muslims visible protection in Makkah. Led the very first Muslim scouting expedition after the Hijrah.',
      'At Badr, wearing an ostrich feather on his armor, he slew top Qurayshi champions in single combat. At Uhud, he fought heroically until felled from ambush by Wahshi’s javelin.',
    ],
    eventsUr: [
      'آپ کے اسلام سے کفار کی ہمت ٹوٹ گئی؛ ہجرت کے بعد پہلے اسلامی سریہ کے قائد بنے اور بدر میں قریش کے بڑے سرداروں کو واصلِ جہنم کیا۔',
      'غزوہ احد میں بے جگری سے لڑتے ہوئے وحشی کے نیزے سے شہادت پائی۔',
    ],
    virtuesEn: [
      'Honored eternally by the Prophet ﷺ with two titles: Asadullah wa Asad Rasulih (Lion of Allah and His Messenger) and Sayyid ash-Shuhada (Master of the Martyrs).',
    ],
    virtuesUr: [
      'رسول اللہ ﷺ نے آپ کو "اسداللہ و اسد رسولہ" (اللہ اور اس کے رسول کا شیر) اور "سید الشہداء" کے عظیم القاب عطا فرمائے۔',
    ],
    legacyEn: [
      'Buried in his battle cloak at Uhud beside Mus‘ab ibn Umayr (RA); the Prophet ﷺ prayed seventy funeral prayers over him alongside his fellow martyrs and stood weeping for his beloved uncle.',
    ],
    legacyUr: [
      'میدانِ احد میں مدفون ہوئے؛ آپ ﷺ نے شہدائے احد کے ساتھ آپ کی نمازِ جنازہ ادا فرمائی اور بے حد رنجیدہ ہوئے۔',
    ],
  },
  {
    id: 'sahabi-musab',
    name: 'Mus‘ab ibn Umayr',
    nameUrdu: 'حضرت مصعب بن عمیرؓ',
    honorific: 'First Ambassador of Islam · Standard-Bearer at Uhud',
    category: 'Prominent Companions & Scholars',
    eraNote: '594–625 CE · Banu Abd ad-Dar',
    earlyLifeEn: [
      'Makkah’s most pampered, handsome, and wealthy aristocratic youth—wearing imported Yemeni silks and bespoke fragrances known down every alley.',
      'Secretly attended Dar al-Arqam to embrace Islam; when his mother Khunas bint Malik discovered it, she starved and stripped him of every stitch of wealth—yet Mus‘ab walked out in coarse camel-hair choosing Allah.',
    ],
    earlyLifeUr: [
      'قبولِ اسلام سے قبل مکہ کے سب سے حسین، خوش لباس اور ناز و نعمت میں پلے ہوئے نوجوان تھے۔',
      'دارِ ارقم میں خفیہ اسلام قبول کیا اور والدہ کی طرف سے تمام جائیداد و آسائشیں چھن جانے کے باوجود موٹے کپڑے میں دین پر قائم رہے۔',
    ],
    eventsEn: [
      'Migrated to Abyssinia and returned so transformed by austerity that the Prophet ﷺ wept remembering his former luxury.',
      'Appointed by the Prophet ﷺ after the First Pledge of Aqabah as Islam’s first ambassador to Yathrib (Madinah)—patiently reciting the Quran and winning the hearts of Sa‘d ibn Mu‘adh, Usayd ibn Hudayr, and nearly every household in Madinah.',
    ],
    eventsUr: [
      'حبشہ ہجرت کی اور واپسی پر آپ کی خستہ حالی دیکھ کر حضور ﷺ آبدیدہ ہو گئے۔',
      'بیعتِ عقبہ اولیٰ کے بعد اسلام کے پہلے سفیر بن کر مدینہ گئے اور حکمت و تلاوتِ قرآن سے پورے مدینہ کو اسلام کا شیدائی بنا دیا۔',
    ],
    virtuesEn: [
      'Carried the Muslim standard at both Badr and Uhud. At Uhud, as his right arm holding the banner was severed, he gripped it with his left reciting Quran 3:144 ("Muhammad is not but a messenger; other messengers have passed on before him"), and when his left arm fell, he hugged the standard to his chest until pierced by a spear.',
    ],
    virtuesUr: [
      'غزوہ بدر و احد میں علمبردار رہے؛ احد میں دایاں اور بایاں بازو کٹنے کے باوجود پرچم کو سینے سے لگائے رکھا اور شہادت پائی۔',
    ],
    legacyEn: [
      'After battle, only one short striped cloak was found for his shroud—covering his head exposed his feet, so the Prophet ﷺ ordered covering his head and placing sweet idhkhir grass over his feet, reciting: "Among the believers are men true to what they promised Allah" (33:23).',
    ],
    legacyUr: [
      'شہادت کے بعد کفن کے لیے صرف ایک چھوٹی چادر ملی کہ سر ڈھانپتے تو پاؤں کھل جاتے؛ حضور ﷺ نے آپ پر سورہ احزاب کی آیت تلاوت فرمائی۔',
    ],
  },
  {
    id: 'sahabi-muadh',
    name: 'Mu‘adh ibn Jabal',
    nameUrdu: 'حضرت معاذ بن جبلؓ',
    honorific: 'Most Knowledgeable in Halal & Haram',
    category: 'Prominent Companions & Scholars',
    eraNote: '603–639 CE · Ansar (Banu Khazraj)',
    earlyLifeEn: [
      'Radiant, eloquent Ansar youth of Banu Khazraj in Madinah who embraced Islam at age eighteen through Mus‘ab ibn Umayr (RA) and pledged at the Second Pledge of Aqabah.',
      'Joined in breaking idols of Banu Salamah in Madinah before welcoming the Prophet ﷺ.',
    ],
    earlyLifeUr: [
      'مدینہ کے انصار (قبیلہ خزرج) کے نہایت ذہین اور خوبرو نوجوان تھے جنہوں نے اٹھارہ سال کی عمر میں حضرت مصعبؓ کے ہاتھ پر اسلام قبول کیا۔',
      'بیعتِ عقبہ ثانیہ میں شریک رہے اور ہجرت سے قبل مدینہ کے بت توڑنے میں پیش پیش تھے۔',
    ],
    eventsEn: [
      'Participated at Badr and every campaign alongside the Prophet ﷺ; sent after Fath Makkah to teach Makkah’s new converts and later dispatched as Chief Judge and Governor of Yemen.',
      'Established the classical methodology of Islamic jurisprudence when asked by the Prophet ﷺ how he would judge in Yemen: Quran first, Sunnah second, and careful conscientious Ijtihad third.',
    ],
    eventsUr: [
      'بدر سمیت تمام غزوات میں شریک رہے اور فتحِ مکہ کے بعد مکہ اور پھر یمن کے قاضی و معلم مقرر ہوئے۔',
      'یمن روانگی کے وقت حضور ﷺ کے سوال پر اجتہاد کا سنہری فقہی اصول بیان فرمایا۔',
    ],
    virtuesEn: [
      'Honored with one of the most tender testimonies ever spoken by the Prophet ﷺ: holding Mu‘adh’s hand, he whispered: "O Mu‘adh, by Allah, I truly love you! Never fail to say at the end of every prayer: Allahumma a‘inni ‘ala dhikrika wa shukrika wa husni ‘ibadatik" (Sunan Abi Dawud).',
      'Declared "most knowledgeable of my Ummah regarding Halal and Haram" and leader of the scholars on the Day of Resurrection.',
    ],
    virtuesUr: [
      'رسول اللہ ﷺ نے ہاتھ تھام کر فرمایا: "معاذ! اللہ کی قسم میں تم سے محبت کرتا ہوں، ہر نماز کے بعد ذکر و شکر اور حسنِ عبادت کی دعا کبھی نہ چھوڑنا۔"',
      'آپ کو امت میں حلال و حرام کا سب سے بڑا عالم قرار دیا گیا۔',
    ],
    legacyEn: [
      'Moved to Greater Syria as a teacher after the Prophet’s passing, succeeded Abu Ubaydah briefly during the Emmaus plague, and attained martyrdom in 18 AH at just 34 years of age.',
    ],
    legacyUr: [
      'شام میں دینی تعلیم عام کی اور محض 34 سال کی عمر میں 18 ہجری کے طاعون میں شہادت کا بلند مرتبہ پایا۔',
    ],
  },
  {
    id: 'sahabi-anas',
    name: 'Anas ibn Malik',
    nameUrdu: 'حضرت انس بن مالکؓ',
    honorific: 'Khadim Rasulillah ﷺ (10 Years of Faithful Service)',
    category: 'Prominent Companions & Scholars',
    eraNote: '612–709 CE · Madinah & Basra',
    earlyLifeEn: [
      'Son of Umm Sulaym (RA) of Madinah; when the Prophet ﷺ arrived in Madinah during the Hijrah, Umm Sulaym brought ten-year-old Anas by the hand: "O Messenger of Allah, all Madinans have brought you gifts except me; take my little son Anas to serve you."',
    ],
    earlyLifeUr: [
      'مدینہ منورہ میں حضرت ام سلیمؓ کے صاحبزادے تھے؛ ہجرت کے وقت دس سال کی عمر میں والدہ نے رسول اللہ ﷺ کی خدمت کے لیے وقف کر دیا۔',
    ],
    eventsEn: [
      'Served faithfully inside the Prophet’s household for ten full years without interruption, absorbing every detail of Prophetic gentleness, worship, eating habits, and dealings.',
      'Narrated 2,286 Hadiths (third highest in Islamic history) and later settled in Basra teaching thousands of students including al-Hasan al-Basri and Muhammad ibn Sirin.',
    ],
    eventsUr: [
      'پورے دس سال تک مسلسل رسول اللہ ﷺ کی خدمتِ اقدس کا شرف حاصل کیا اور آپ کے اخلاق و عبادات کو قریب سے دیکھا۔',
      '2,286 احادیث روایت کیں اور بعد میں بصرہ میں علمِ حدیث کا عظیم مرکز قائم فرمایا۔',
    ],
    virtuesEn: [
      'Testified famously: "I served the Prophet ﷺ for ten years, and by Allah, he never once said even ‘Uff’ to me, nor asked why I did something or why I left something undone!"',
      'The Prophet ﷺ prayed for him: "O Allah, increase his wealth and children and bless him in all You grant him"—resulting in orchards bearing fruit twice a year and over a hundred grandchildren.',
    ],
    virtuesUr: [
      'فرماتے ہیں: "میں نے دس سال حضور ﷺ کی خدمت کی، آپ نے کبھی اف تک نہ فرمایا اور نہ کسی کام پر ڈانٹا۔"',
      'حضور ﷺ کی دعا سے آپ کے باغات سال میں دو بار پھل دیتے اور سو سے زائد اولاد و احفاد ہوئے۔',
    ],
    legacyEn: [
      'Lived nearly a full century—the last surviving Companion in Basra—leaving behind a walking stick of the Prophet ﷺ buried beside him when he passed in 93 AH.',
    ],
    legacyUr: [
      'تقریباً سو سال عمر پائی، بصرہ کے آخری صحابی تھے اور 93 ہجری میں وصال فرما کر حضور ﷺ کی تبرک والی چھڑی کے ساتھ مدفون ہوئے۔',
    ],
  },
  {
    id: 'sahabi-zayd',
    name: 'Zayd ibn Harithah',
    nameUrdu: 'حضرت زید بن حارثہؓ',
    honorific: 'Hibb Rasulillah · Only Companion Named in the Quran',
    category: 'Prominent Companions & Scholars',
    eraNote: '581–629 CE · Kalb Tribe & Madinah',
    earlyLifeEn: [
      'Kidnapped as a boy during a desert raid, sold in Makkah, and gifted by Khadijah (RA) to her husband Muhammad ﷺ before prophethood.',
      'Years later when his weeping father and uncle arrived in Makkah offering any ransom to bring Zayd home, Zayd famously refused freedom to return with them: "I have seen something in this man that I will never prefer anyone over him!"',
    ],
    earlyLifeUr: [
      'بچپن میں اغوا ہو کر مکہ میں فروخت ہوئے اور حضرت خدیجہؓ نے آپ کو نبی کریم ﷺ کی خدمت میں پیش کر دیا۔',
      'جب والدین رہائی کے لیے آئے تو زیدؓ نے ان کے ساتھ جانے سے انکار کر کے فرمایا: "میں نے اس ہستی میں جو اخلاق دیکھے ہیں ان پر کسی کو ترجیح نہیں دے سکتا۔"',
    ],
    eventsEn: [
      'Accepted Islam immediately after Khadijah (RA), Ali (RA), and Abu Bakr (RA)—becoming the first freedman to believe. Accompanied the Prophet ﷺ alone to Ta’if, shielding his master’s head with his own body from stones.',
      'Appointed general of seven military expeditions, culminating in commanding the 3,000-man army at the Battle of Mu’tah (8 AH).',
    ],
    eventsUr: [
      'آزاد کردہ غلاموں میں سب سے پہلے ایمان لائے اور سفرِ طائف میں پتھروں کی بارش کے دوران حضور ﷺ کے لیے ڈھال بنے رہے۔',
      'متعدد سرایا کی قیادت کی اور بالآخر 8 ہجری میں غزوہ موتہ کے پہلے سپہ سالار مقرر ہوئے۔',
    ],
    virtuesEn: [
      'Bears the singular distinction across the entire Holy Quran of being the ONLY Companion explicitly mentioned by personal name (Surah al-Ahzab 33:37).',
      'Known fondly across Madinah as Hibb Rasulillah ("Beloved of Allah’s Messenger"); whenever Zayd led an expedition, he held supreme command.',
    ],
    virtuesUr: [
      'پورے قرآنِ مجید میں واحد صحابی ہیں جن کا نامِ نامی (سورہ احزاب 33:37) صراحت کے ساتھ آیا ہے۔',
      'مدینہ میں "حبِ رسول" کے لقب سے معروف تھے اور جس لشکر میں جاتے اس کے امیر مقرر کیے جاتے۔',
    ],
    legacyEn: [
      'Held the banner steadfastly at Mu’tah until martyred facing overwhelming Roman-allied lines—moving the Prophet ﷺ to silent tears as he comforted Zayd’s young daughter.',
    ],
    legacyUr: [
      'غزوہ موتہ میں رومی لشکر کے سامنے پرچم تھامے شہید ہوئے؛ ان کی شہادت پر رسول اللہ ﷺ آبدیدہ ہو گئے۔',
    ],
  },
  {
    id: 'sahabi-usamah',
    name: 'Usamah ibn Zayd',
    nameUrdu: 'حضرت اسامہ بن زیدؓ',
    honorific: 'Al-Hibb ibn al-Hibb · Youngest Commander in History',
    category: 'Prominent Companions & Scholars',
    eraNote: '614–674 CE · Son of Zayd ibn Harithah & Umm Ayman',
    earlyLifeEn: [
      'Born in Makkah inside Islam to two beloved members of the Prophet’s household—Zayd ibn Harithah (RA) and Umm Ayman (RA), the Prophet’s faithful childhood nurse.',
      'Grew up seated on one of the Prophet’s blessed knees while Hasan ibn Ali (RA) sat on the other.',
    ],
    earlyLifeUr: [
      'مکہ میں اسلامی گھرانے میں حضرت زیدؓ اور حضور ﷺ کی دایہ حضرت ام ایمنؓ کے ہاں پیدا ہوئے۔',
      'بچپن میں حضور ﷺ کے ایک گھٹنے پر حضرت اسامہؓ اور دوسرے پر حضرت حسنؓ بیٹھتے تھے۔',
    ],
    eventsEn: [
      'Rode behind the Prophet ﷺ on the same camel entering Makkah in conquest (8 AH) and again during the Farewell Pilgrimage. Helped wash the Prophet’s blessed body alongside Ali and al-Abbas (RA).',
      'At age eighteen, appointed by the Prophet ﷺ during his final weeks to command an army including senior veterans Abu Bakr and Umar (RA) toward al-Balqa—an expedition Caliph Abu Bakr insisted on dispatching faithfully.',
    ],
    eventsUr: [
      'فتحِ مکہ اور حجۃ الوداع میں رسول اللہ ﷺ کے پیچھے اونٹنی پر سوار ہونے کا شرف پایا اور غسلِ نبوی میں شریک رہے۔',
      'محض اٹھارہ سال کی عمر میں حضور ﷺ نے انہیں جیشِ اسامہ کا سپہ سالار بنایا جس میں اکابر صحابہؓ شامل تھے، اور یہ لشکر کامیاب لوٹا۔',
    ],
    virtuesEn: [
      'Rebuked gently by the Prophet ﷺ after killing a fleeing combatant who uttered the Shahadah: "Did you split open his heart to know if he said it sincerely?"—teaching Usamah lifelong reverence for human life and the Shahadah.',
      'Umar (RA) later awarded Usamah a higher stipend than his own son Abdullah, explaining: "Because his father was dearer to the Messenger of Allah than your father, and he was dearer to the Messenger of Allah than you!"',
    ],
    virtuesUr: [
      'میدانِ جنگ میں کلمہ پڑھنے والے شخص سے متعلق حضور ﷺ کی تنبیہ نے آپ کو کلمے کے احترام کا عظیم درس دیا۔',
      'حضرت عمرؓ نے ان کا وظیفہ اپنے بیٹے عبداللہ سے زیادہ مقرر فرمایا کیونکہ وہ حضور ﷺ کو زیادہ محبوب تھے۔',
    ],
    legacyEn: [
      'Refused completely to shed Muslim blood in subsequent civil wars, dedicating his final decades to Hadith narration (128 Hadiths) and fasting every Monday and Thursday until passing in al-Jurf around 54 AH.',
    ],
    legacyUr: [
      'خانہ جنگیوں سے مکمل الگ رہے، 128 احادیث روایت کیں اور پیر و جمعرات کے روزے رکھتے ہوئے 54 ہجری میں وصال فرمایا۔',
    ],
  },
  {
    id: 'sahabiyah-fatimah',
    name: 'Fatimah az-Zahra',
    nameUrdu: 'حضرت فاطمہ الزہراءؓ',
    honorific: 'Sayyidat Nisa’ Ahl al-Jannah · Mother of Hasan & Husayn',
    category: 'Prominent Companions & Scholars',
    eraNote: '605–632 CE · Beloved Daughter of the Prophet ﷺ',
    earlyLifeEn: [
      'Youngest and most beloved daughter of the Prophet Muhammad ﷺ and Khadijah (RA), sharing striking likeness to her father in speech, walk, and composure.',
      'As a small girl in Makkah, she washed camel entrails thrown upon her praying father’s back by Quraysh thugs and comforted him bravely through the three-year Shi‘b Abi Talib starvation boycott.',
    ],
    earlyLifeUr: [
      'رسول اللہ ﷺ اور حضرت خدیجہؓ کی سب سے چھوٹی اور لاڈلی صاحبزادی جو گفتگو اور چال ڈھال میں حضور ﷺ کی مشابہ تھیں۔',
      'بچپن میں کعبہ کے پاس آپ ﷺ کی پشت سے غلاظت صاف کرتیں اور شعبِ ابی طالب کے بائیکاٹ میں ثابت قدم رہیں۔',
    ],
    eventsEn: [
      'Married Ali ibn Abi Talib (RA) in 2 AH in utmost simplicity; raised Hasan, Husayn, Zaynab, and Umm Kulthum (RA) while grinding barley by hand until her palms blistered and carrying water skins until her shoulders bruised.',
      'Asked her father for a servant out of exhaustion—and received a gift far greater: Tasbih Fatimah (33 SubhanAllah, 33 Alhamdulillah, 34 Allahu Akbar before sleep).',
    ],
    eventsUr: [
      '2 ہجری میں حضرت علیؓ سے سادہ نکاح ہوا؛ خود چکی پیس کر اور مشکیزے بھر کر گھر سنبھالتیں اور حسنین کریمینؓ کی تربیت فرمائی۔',
      'خادم مانگنے پر حضور ﷺ نے امت کا عظیم تحفہ "تسبیحِ فاطمہؓ" (33، 33، 34) عطا فرمایا۔',
    ],
    virtuesEn: [
      'Whenever Fatimah entered a room, the Prophet ﷺ stood up, kissed her forehead, and seated her in his own place (Sunan Abi Dawud).',
      'He declared openly: "Fatimah is a part of me; whoever angers her angers me" (Sahih al-Bukhari), and confided in his final illness that she would be the Leader of the Women of Paradise and the first of his family to join him.',
    ],
    virtuesUr: [
      'جب آپ تشریف لاتیں تو حضور ﷺ کھڑے ہو کر پیشانی چومتے اور اپنی جگہ پر بٹھاتے تھے۔',
      'فرمایا: "فاطمہ میرے جگر کا ٹکڑا ہے، جس نے اسے ناراض کیا اس نے مجھے ناراض کیا"، اور جنتی عورتوں کی سردار ہونے کی بشارت دی۔',
    ],
    legacyEn: [
      'Passed away peacefully just six months after the Prophet ﷺ in Ramadan 11 AH at age twenty-seven, smiling at her father’s final whispered promise of reunion.',
    ],
    legacyUr: [
      'وصالِ نبوی ﷺ کے محض چھ ماہ بعد 11 ہجری رمضان میں 27 سال کی عمر میں وصال فرمایا اور اہلِ بیت میں سب سے پہلے آپ ﷺ سے جا ملیں۔',
    ],
  },
  {
    id: 'sahabi-hasan',
    name: 'Al-Hasan ibn Ali',
    nameUrdu: 'حضرت امام حسنؓ',
    honorific: 'Sayyid · Peacemaker & Master of Youth of Paradise',
    category: 'Prominent Companions & Scholars',
    eraNote: '624–670 CE · Eldest Grandson of the Prophet ﷺ',
    earlyLifeEn: [
      'Born in Ramadan 3 AH in Madinah to Ali ibn Abi Talib (RA) and Fatimah az-Zahra (RA). The Prophet ﷺ personally whispered the Adhan into his ear, named him al-Hasan, and shaved his hair in charity.',
      'Raised in the Prophet’s lap—often climbing onto the Prophet’s back while he prostrated in prayer as the Prophet lengthened his sujud so little Hasan would not fall.',
    ],
    earlyLifeUr: [
      '3 ہجری رمضان میں حضرت علیؓ و حضرت فاطمہؓ کے گھر پیدا ہوئے؛ حضور ﷺ نے خود کان میں اذان دی اور حسن نام رکھا۔',
      'نماز میں سجدے کی حالت میں آپ حضور ﷺ کی کمر پر چڑھ جاتے تو آپ ﷺ سجدہ طویل فرما دیتے۔',
    ],
    eventsEn: [
      'Served beside his father Ali (RA) during his Caliphate; upon Ali’s martyrdom in 40 AH, 40,000+ Iraqis pledged allegiance to Hasan as Fifth Caliph.',
      'Six months later in 41 AH (Year of Unity — ‘Am al-Jama‘ah), seeing civil war threatening thousands of Muslim lives, Hasan voluntarily abdicated political authority to Mu‘awiyah (RA) on terms of justice and mercy—halting bloodshed completely.',
    ],
    eventsUr: [
      '40 ہجری میں شہادتِ علیؓ کے بعد چالیس ہزار لوگوں نے آپ کے ہاتھ پر بیعت کی۔',
      '41 ہجری ("عام الجماعۃ") میں امت کا خون بہنے سے بچانے کے لیے خلافت سے دستبردار ہو کر حضرت معاویہؓ سے صلح فرما لی۔',
    ],
    virtuesEn: [
      'Holding young Hasan beside him on the pulpit, the Prophet ﷺ prophesied: "Indeed this son of mine is a Sayyid (noble leader), and perhaps Allah will reconcile two great factions of Muslims through him" (Sahih al-Bukhari).',
      'Honored alongside Husayn as one of the "Two Masters of the Youth of Paradise" and resembled the Prophet ﷺ closely in facial beauty.',
    ],
    virtuesUr: [
      'منبر پر بٹھا کر حضور ﷺ نے پیش گوئی فرمائی: "میرا یہ بیٹا سید (سردار) ہے اور اللہ اس کے ذریعے مسلمانوں کے دو بڑے گروہوں میں صلح کرائے گا۔"',
      'آپ جنت کے نوجوانوں کے سردار اور صورت میں رسول اللہ ﷺ سے بے حد مشابہ تھے۔',
    ],
    legacyEn: [
      'Twice gave away half of his entire possessions in charity and performed Hajj on foot twenty-five times out of reverence for Allah. Passed away by poisoning in 50 AH instructing his brother Husayn never to shed blood over his burial.',
    ],
    legacyUr: [
      'دو بار اپنا آدھا مال راہِ خدا میں تقسیم کیا اور پچیس حج پیدل ادا فرمائے؛ 50 ہجری میں زہر دیے جانے سے شہادت پائی اور صبر کی وصیت فرمائی۔',
    ],
  },
  {
    id: 'sahabi-husayn',
    name: 'Al-Husayn ibn Ali',
    nameUrdu: 'حضرت امام حسینؓ',
    honorific: 'Sayyid ash-Shuhada of Karbala · Master of Youth of Paradise',
    category: 'Prominent Companions & Scholars',
    eraNote: '626–680 CE · Beloved Grandson of the Prophet ﷺ',
    earlyLifeEn: [
      'Born in Sha‘ban 4 AH in Madinah to Ali (RA) and Fatimah (RA), carrying the love and features of his grandfather the Prophet ﷺ from infancy.',
      'Grew up alongside his elder brother Hasan (RA) in Masjid an-Nabawi, receiving direct care from his father Ali, Abu Bakr, Umar, and Uthman (RA).',
    ],
    earlyLifeUr: [
      '4 ہجری شعبان میں مدینہ میں پیدا ہوئے اور بچپن ہی سے رسول اللہ ﷺ کی گود و شفقت میں پرورش پائی۔',
      'بھائی حضرت حسنؓ کے ساتھ مسجدِ نبوی میں پلے بڑھے اور تمام خلفائے راشدین کی محبت و احترام پایا۔',
    ],
    eventsEn: [
      'Remained faithful to Hasan’s peace treaty until 60 AH, when coerced to pledge allegiance to an unjust dynastic succession. Answering thousands of Kufan letters begging for guidance, he set out peacefully with his family toward Iraq.',
      'Betrayed and surrounded without water on the burning plains of Karbala in Muharram 61 AH alongside seventy-two family members and companions, he refused surrender to tyranny and stood in prayer and valor until martyred on 10 Muharram (Ashura).',
    ],
    eventsUr: [
      '60 ہجری تک صلح کے معاہدے پر قائم رہے؛ اہلِ کوفہ کے ہزاروں خطوط پر اصلاحِ امت کی نیت سے اہلِ خانہ کے ہمراہ عراق روانہ ہوئے۔',
      'محرم 61 ہجری میں کربلا کے میدان میں پیاس کی حالت میں بہتر جانثاروں سمیت ظلم کے آگے جھکنے سے انکار کیا اور یومِ عاشوراء کو عظیم شہادت پائی۔',
    ],
    virtuesEn: [
      'The Prophet ﷺ famously declared: "Al-Hasan and al-Husayn are the two Masters of the Youth of Paradise" (Jami‘ at-Tirmidhi), and prayed kissing him: "Husayn is from me and I am from Husayn; may Allah love whoever loves Husayn."',
    ],
    virtuesUr: [
      'رسول اللہ ﷺ نے فرمایا: "حسن و حسین جنت کے نوجوانوں کے سردار ہیں" اور فرمایا: "حسین مجھ سے ہے اور میں حسین سے ہوں، اللہ اس سے محبت کرے جو حسین سے محبت کرے۔"',
    ],
    legacyEn: [
      'Celebrated for profound devotion—praying hundreds of rak‘ahs daily, feeding orphans secretly in Madinah at night (only discovered after his death by grain-sack marks on his shoulders), and inspiring every generation to stand for truth with dignity.',
    ],
    legacyUr: [
      'راتوں کو مدینہ کے غریبوں کو چپکے سے راشن پہنچاتے تھے؛ آپ کی شہادت حق پر استقامت اور ظلم کے خلاف غیرتِ ایمانی کی ابدی علامت بن گئی۔',
    ],
  },
];
