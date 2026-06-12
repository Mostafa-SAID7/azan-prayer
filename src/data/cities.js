/* ─────────────────────────────────────────────────────────────────
   CITIES & CALCULATION METHODS
   Each city entry has:
     displayAr  — Arabic display name
     displayEn  — English display name
     apiCity    — city string sent to aladhan API
     apiCountry — ISO 3166-1 alpha-2 country code
     region     — grouping label for future filtering (en)
───────────────────────────────────────────────────────────────── */

/** @type {City[]} */
export const cities = [
  // ── Arabian Peninsula ─────────────────────────────────────────
  { displayAr: "مكة المكرمة",    displayEn: "Makkah",       apiCity: "Makkah al Mukarramah", apiCountry: "SA", region: "Arabian Peninsula" },
  { displayAr: "المدينة المنورة", displayEn: "Madinah",      apiCity: "Medina",               apiCountry: "SA", region: "Arabian Peninsula" },
  { displayAr: "الرياض",         displayEn: "Riyadh",        apiCity: "Riyadh",               apiCountry: "SA", region: "Arabian Peninsula" },
  { displayAr: "جدة",            displayEn: "Jeddah",        apiCity: "Jeddah",               apiCountry: "SA", region: "Arabian Peninsula" },
  { displayAr: "الدمام",         displayEn: "Dammam",        apiCity: "Dammam",               apiCountry: "SA", region: "Arabian Peninsula" },
  { displayAr: "أبها",           displayEn: "Abha",          apiCity: "Abha",                 apiCountry: "SA", region: "Arabian Peninsula" },
  { displayAr: "تبوك",           displayEn: "Tabuk",         apiCity: "Tabuk",                apiCountry: "SA", region: "Arabian Peninsula" },
  { displayAr: "دبي",            displayEn: "Dubai",         apiCity: "Dubai",                apiCountry: "AE", region: "Arabian Peninsula" },
  { displayAr: "أبوظبي",         displayEn: "Abu Dhabi",     apiCity: "Abu Dhabi",            apiCountry: "AE", region: "Arabian Peninsula" },
  { displayAr: "الشارقة",        displayEn: "Sharjah",       apiCity: "Sharjah",              apiCountry: "AE", region: "Arabian Peninsula" },
  { displayAr: "الكويت",         displayEn: "Kuwait City",   apiCity: "Kuwait City",          apiCountry: "KW", region: "Arabian Peninsula" },
  { displayAr: "المنامة",        displayEn: "Manama",        apiCity: "Manama",               apiCountry: "BH", region: "Arabian Peninsula" },
  { displayAr: "مسقط",           displayEn: "Muscat",        apiCity: "Muscat",               apiCountry: "OM", region: "Arabian Peninsula" },
  { displayAr: "الدوحة",         displayEn: "Doha",          apiCity: "Doha",                 apiCountry: "QA", region: "Arabian Peninsula" },
  { displayAr: "صنعاء",          displayEn: "Sanaa",         apiCity: "Sanaa",                apiCountry: "YE", region: "Arabian Peninsula" },
  { displayAr: "عدن",            displayEn: "Aden",          apiCity: "Aden",                 apiCountry: "YE", region: "Arabian Peninsula" },

  // ── Levant & Iraq ─────────────────────────────────────────────
  { displayAr: "بغداد",          displayEn: "Baghdad",       apiCity: "Baghdad",              apiCountry: "IQ", region: "Levant & Iraq" },
  { displayAr: "البصرة",         displayEn: "Basra",         apiCity: "Basra",                apiCountry: "IQ", region: "Levant & Iraq" },
  { displayAr: "الموصل",         displayEn: "Mosul",         apiCity: "Mosul",                apiCountry: "IQ", region: "Levant & Iraq" },
  { displayAr: "دمشق",           displayEn: "Damascus",      apiCity: "Damascus",             apiCountry: "SY", region: "Levant & Iraq" },
  { displayAr: "حلب",            displayEn: "Aleppo",        apiCity: "Aleppo",               apiCountry: "SY", region: "Levant & Iraq" },
  { displayAr: "بيروت",          displayEn: "Beirut",        apiCity: "Beirut",               apiCountry: "LB", region: "Levant & Iraq" },
  { displayAr: "عمّان",          displayEn: "Amman",         apiCity: "Amman",                apiCountry: "JO", region: "Levant & Iraq" },
  { displayAr: "القدس",          displayEn: "Jerusalem",     apiCity: "Jerusalem",            apiCountry: "PS", region: "Levant & Iraq" },
  { displayAr: "غزة",            displayEn: "Gaza",          apiCity: "Gaza",                 apiCountry: "PS", region: "Levant & Iraq" },

  // ── North Africa ──────────────────────────────────────────────
  { displayAr: "القاهرة",        displayEn: "Cairo",         apiCity: "Cairo",                apiCountry: "EG", region: "North Africa" },
  { displayAr: "الإسكندرية",     displayEn: "Alexandria",    apiCity: "Alexandria",           apiCountry: "EG", region: "North Africa" },
  { displayAr: "أسوان",          displayEn: "Aswan",         apiCity: "Aswan",                apiCountry: "EG", region: "North Africa" },
  { displayAr: "طرابلس",         displayEn: "Tripoli",       apiCity: "Tripoli",              apiCountry: "LY", region: "North Africa" },
  { displayAr: "بنغازي",         displayEn: "Benghazi",      apiCity: "Benghazi",             apiCountry: "LY", region: "North Africa" },
  { displayAr: "تونس",           displayEn: "Tunis",         apiCity: "Tunis",                apiCountry: "TN", region: "North Africa" },
  { displayAr: "الجزائر",        displayEn: "Algiers",       apiCity: "Algiers",              apiCountry: "DZ", region: "North Africa" },
  { displayAr: "وهران",          displayEn: "Oran",          apiCity: "Oran",                 apiCountry: "DZ", region: "North Africa" },
  { displayAr: "الدار البيضاء",  displayEn: "Casablanca",    apiCity: "Casablanca",           apiCountry: "MA", region: "North Africa" },
  { displayAr: "الرباط",         displayEn: "Rabat",         apiCity: "Rabat",                apiCountry: "MA", region: "North Africa" },
  { displayAr: "مراكش",          displayEn: "Marrakesh",     apiCity: "Marrakesh",            apiCountry: "MA", region: "North Africa" },
  { displayAr: "فاس",            displayEn: "Fes",           apiCity: "Fes",                  apiCountry: "MA", region: "North Africa" },
  { displayAr: "الخرطوم",        displayEn: "Khartoum",      apiCity: "Khartoum",             apiCountry: "SD", region: "North Africa" },
  { displayAr: "نواكشوط",        displayEn: "Nouakchott",    apiCity: "Nouakchott",           apiCountry: "MR", region: "North Africa" },

  // ── Turkey & Central Asia ─────────────────────────────────────
  { displayAr: "إسطنبول",        displayEn: "Istanbul",      apiCity: "Istanbul",             apiCountry: "TR", region: "Turkey & Central Asia" },
  { displayAr: "أنقرة",          displayEn: "Ankara",        apiCity: "Ankara",               apiCountry: "TR", region: "Turkey & Central Asia" },
  { displayAr: "إزمير",          displayEn: "Izmir",         apiCity: "Izmir",                apiCountry: "TR", region: "Turkey & Central Asia" },
  { displayAr: "طشقند",          displayEn: "Tashkent",      apiCity: "Tashkent",             apiCountry: "UZ", region: "Turkey & Central Asia" },
  { displayAr: "ألماتي",         displayEn: "Almaty",        apiCity: "Almaty",               apiCountry: "KZ", region: "Turkey & Central Asia" },
  { displayAr: "باكو",           displayEn: "Baku",          apiCity: "Baku",                 apiCountry: "AZ", region: "Turkey & Central Asia" },
  { displayAr: "طهران",          displayEn: "Tehran",        apiCity: "Tehran",               apiCountry: "IR", region: "Turkey & Central Asia" },
  { displayAr: "مشهد",           displayEn: "Mashhad",       apiCity: "Mashhad",              apiCountry: "IR", region: "Turkey & Central Asia" },

  // ── South & Southeast Asia ────────────────────────────────────
  { displayAr: "كراتشي",         displayEn: "Karachi",       apiCity: "Karachi",              apiCountry: "PK", region: "South & Southeast Asia" },
  { displayAr: "لاهور",          displayEn: "Lahore",        apiCity: "Lahore",               apiCountry: "PK", region: "South & Southeast Asia" },
  { displayAr: "إسلام آباد",     displayEn: "Islamabad",     apiCity: "Islamabad",            apiCountry: "PK", region: "South & Southeast Asia" },
  { displayAr: "دكا",            displayEn: "Dhaka",         apiCity: "Dhaka",                apiCountry: "BD", region: "South & Southeast Asia" },
  { displayAr: "مومباي",         displayEn: "Mumbai",        apiCity: "Mumbai",               apiCountry: "IN", region: "South & Southeast Asia" },
  { displayAr: "نيودلهي",        displayEn: "New Delhi",     apiCity: "New Delhi",            apiCountry: "IN", region: "South & Southeast Asia" },
  { displayAr: "حيدر آباد",      displayEn: "Hyderabad",     apiCity: "Hyderabad",            apiCountry: "IN", region: "South & Southeast Asia" },
  { displayAr: "كوالالمبور",     displayEn: "Kuala Lumpur",  apiCity: "Kuala Lumpur",         apiCountry: "MY", region: "South & Southeast Asia" },
  { displayAr: "جاكرتا",         displayEn: "Jakarta",       apiCity: "Jakarta",              apiCountry: "ID", region: "South & Southeast Asia" },
  { displayAr: "سنغافورة",       displayEn: "Singapore",     apiCity: "Singapore",            apiCountry: "SG", region: "South & Southeast Asia" },
  { displayAr: "بانكوك",         displayEn: "Bangkok",       apiCity: "Bangkok",              apiCountry: "TH", region: "South & Southeast Asia" },
  { displayAr: "مانيلا",         displayEn: "Manila",        apiCity: "Manila",               apiCountry: "PH", region: "South & Southeast Asia" },
  { displayAr: "كابول",          displayEn: "Kabul",         apiCity: "Kabul",                apiCountry: "AF", region: "South & Southeast Asia" },

  // ── Europe ────────────────────────────────────────────────────
  { displayAr: "لندن",           displayEn: "London",        apiCity: "London",               apiCountry: "GB", region: "Europe" },
  { displayAr: "باريس",          displayEn: "Paris",         apiCity: "Paris",                apiCountry: "FR", region: "Europe" },
  { displayAr: "برلين",          displayEn: "Berlin",        apiCity: "Berlin",               apiCountry: "DE", region: "Europe" },
  { displayAr: "أمستردام",       displayEn: "Amsterdam",     apiCity: "Amsterdam",            apiCountry: "NL", region: "Europe" },
  { displayAr: "بروكسل",         displayEn: "Brussels",      apiCity: "Brussels",             apiCountry: "BE", region: "Europe" },
  { displayAr: "مدريد",          displayEn: "Madrid",        apiCity: "Madrid",               apiCountry: "ES", region: "Europe" },
  { displayAr: "روما",           displayEn: "Rome",          apiCity: "Rome",                 apiCountry: "IT", region: "Europe" },
  { displayAr: "ستوكهولم",       displayEn: "Stockholm",     apiCity: "Stockholm",            apiCountry: "SE", region: "Europe" },
  { displayAr: "موسكو",          displayEn: "Moscow",        apiCity: "Moscow",               apiCountry: "RU", region: "Europe" },

  // ── Americas ──────────────────────────────────────────────────
  { displayAr: "نيويورك",        displayEn: "New York",      apiCity: "New York",             apiCountry: "US", region: "Americas" },
  { displayAr: "لوس أنجلوس",     displayEn: "Los Angeles",   apiCity: "Los Angeles",          apiCountry: "US", region: "Americas" },
  { displayAr: "شيكاغو",         displayEn: "Chicago",       apiCity: "Chicago",              apiCountry: "US", region: "Americas" },
  { displayAr: "هيوستن",         displayEn: "Houston",       apiCity: "Houston",              apiCountry: "US", region: "Americas" },
  { displayAr: "ديترويت",        displayEn: "Detroit",       apiCity: "Detroit",              apiCountry: "US", region: "Americas" },
  { displayAr: "تورنتو",         displayEn: "Toronto",       apiCity: "Toronto",              apiCountry: "CA", region: "Americas" },
  { displayAr: "مونتريال",       displayEn: "Montreal",      apiCity: "Montreal",             apiCountry: "CA", region: "Americas" },
  { displayAr: "ساو باولو",      displayEn: "São Paulo",     apiCity: "Sao Paulo",            apiCountry: "BR", region: "Americas" },

  // ── Africa (sub-Saharan) ──────────────────────────────────────
  { displayAr: "لاغوس",          displayEn: "Lagos",         apiCity: "Lagos",                apiCountry: "NG", region: "Africa" },
  { displayAr: "أبوجا",          displayEn: "Abuja",         apiCity: "Abuja",                apiCountry: "NG", region: "Africa" },
  { displayAr: "كانو",           displayEn: "Kano",          apiCity: "Kano",                 apiCountry: "NG", region: "Africa" },
  { displayAr: "نيروبي",         displayEn: "Nairobi",       apiCity: "Nairobi",              apiCountry: "KE", region: "Africa" },
  { displayAr: "أكرا",           displayEn: "Accra",         apiCity: "Accra",                apiCountry: "GH", region: "Africa" },
  { displayAr: "أديس أبابا",     displayEn: "Addis Ababa",   apiCity: "Addis Ababa",          apiCountry: "ET", region: "Africa" },
  { displayAr: "دار السلام",     displayEn: "Dar es Salaam", apiCity: "Dar es Salaam",        apiCountry: "TZ", region: "Africa" },
];

/* ─────────────────────────────────────────────────────────────────
   CALCULATION METHODS
   IDs match the aladhan API method parameter.
───────────────────────────────────────────────────────────────── */

/** @type {CalcMethod[]} */
export const calculationMethods = [
  { id: 4,  nameAr: "أم القرى، مكة المكرمة",                      nameEn: "Umm Al-Qura, Makkah" },
  { id: 3,  nameAr: "رابطة العالم الإسلامي",                       nameEn: "Muslim World League" },
  { id: 5,  nameAr: "الهيئة المصرية العامة للمساحة",               nameEn: "Egyptian General Authority" },
  { id: 2,  nameAr: "الجمعية الإسلامية لأمريكا الشمالية (ISNA)",   nameEn: "ISNA (North America)" },
  { id: 1,  nameAr: "جامعة العلوم الإسلامية، كراتشي",             nameEn: "Islamic Univ. Karachi" },
  { id: 12, nameAr: "اتحاد المنظمات الإسلامية في فرنسا (UIOF)",    nameEn: "UIOF (France)" },
  { id: 13, nameAr: "ديانت (تركيا)",                               nameEn: "Diyanet (Turkey)" },
  { id: 14, nameAr: "المجلس الإسلامي للمملكة المتحدة",             nameEn: "Islamic Society of NA" },
  { id: 15, nameAr: "خوارزمية الزاوية الكبرى (تيدجاني)",          nameEn: "Moonsighting Committee" },
];
