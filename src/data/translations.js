/* ─────────────────────────────────────────────────────────────────
   TRANSLATIONS  —  ar + en
   Add new keys to BOTH locales to stay in sync.
───────────────────────────────────────────────────────────────── */

export const translations = {
  ar: {
    // ── App identity ──────────────────────────────────────────────
    appName:     "أوقات الصلاة",
    appSubtitle: "مواقيت الأذان والصلاة",

    // ── Tabs ──────────────────────────────────────────────────────
    tabPrayer: "أوقات الصلاة",
    tabQuran:  "القرآن الكريم",

    // ── City / location ───────────────────────────────────────────
    cityLabel:      "اختر المدينة",
    searchCity:     "ابحث عن مدينة...",
    detectLocation: "تحديد موقعي",
    detecting:      "جارٍ التحديد...",
    locationError:  "تعذّر تحديد موقعك",
    geoCity:        "موقعي الحالي",
    noResults:      "لا توجد نتائج",

    // ── Prayer names ──────────────────────────────────────────────
    prayers: {
      Fajr:    "الفجر",
      Sunrise: "الشروق",
      Dhuhr:   "الظهر",
      Asr:     "العصر",
      Maghrib: "المغرب",
      Isha:    "العشاء",
    },

    // ── Monthly table columns ─────────────────────────────────────
    col: {
      day:     "اليوم",
      fajr:    "الفجر",
      sunrise: "الشروق",
      dhuhr:   "الظهر",
      asr:     "العصر",
      maghrib: "المغرب",
      isha:    "العشاء",
    },

    // ── Dates ─────────────────────────────────────────────────────
    hijri:     "التاريخ الهجري",
    gregorian: "التاريخ الميلادي",
    today:     "اليوم",
    backToToday: "العودة لهذا الشهر",

    // ── Countdown & state labels ──────────────────────────────────
    nextPrayer:   "متبقي حتى صلاة",
    nextLabel:    "القادمة",
    currentLabel: "الآن",

    // ── Actions ───────────────────────────────────────────────────
    retry:     "إعادة المحاولة",
    share:     "مشاركة",
    shareMsg:  "مواقيت الصلاة اليوم",
    copied:    "تم النسخ!",
    playAdhan: "تشغيل الأذان",
    markDone:  "تحديد كمكتملة",
    settings:  "الإعدادات",

    // ── Calculation method ────────────────────────────────────────
    method: "طريقة الحساب",

    // ── Notifications ─────────────────────────────────────────────
    notifOn:         "الإشعارات مفعّلة",
    notifOff:        "الإشعارات معطّلة",
    notifPermission: "اسمح بالإشعارات",

    // ── Monthly view ──────────────────────────────────────────────
    monthlyView:    "الجدول الشهري",
    monthlyTitle:   "مواقيت الصلاة",
    loadingMonthly: "جارٍ تحميل البيانات...",
    prevMonth:      "الشهر السابق",
    nextMonth:      "الشهر التالي",

    // ── Prayer tracker ────────────────────────────────────────────
    trackerTitle: "صلوات اليوم",
    prayersDone:  "مكتملة",

    // ── Favorites ─────────────────────────────────────────────────
    favoritesTitle: "المفضلة",
    addFavorite:    "أضف للمفضلة",
    removeFavorite: "إزالة من المفضلة",
    noFavorites:    "لا توجد مدن مفضّلة",

    // ── Region filter ─────────────────────────────────────────────
    allRegions: "الكل",

    // ── Loading / status ──────────────────────────────────────────
    loading: "جارٍ تحميل الأوقات...",

    // ── Quran reader ──────────────────────────────────────────────
    quranTitle:       "القرآن الكريم",
    quranSearchPlaceholder: "ابحث عن سورة...",
    quranAllSurahs:   "جميع السور",
    quranMeccan:      "مكية",
    quranMedinan:     "مدنية",
    quranAyahs:       "آيات",
    quranLoading:     "جارٍ تحميل القرآن...",
    quranLoadingSurah:"جارٍ تحميل السورة...",
    quranError:       "تعذّر تحميل البيانات",
    quranShowTransl:  "إظهار الترجمة",
    quranHideTransl:  "إخفاء الترجمة",
    quranLastRead:    "آخر ما قرأت",
    quranContinue:    "متابعة القراءة",
    quranBismillah:   "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    quranVerse:       "آية",
    quranFontSize:    "حجم الخط",
    quranPrevSurah:   "السورة السابقة",
    quranNextSurah:   "السورة التالية",
    quranJuz:         "الجزء",
    quranSurah:       "سورة",
    quranMeccaTag:    "مكية",
    quranMedinaTag:   "مدنية",
    quranBackToList:  "قائمة السور",
    quranNoResults:   "لا توجد سور مطابقة",
  },

  en: {
    // ── App identity ──────────────────────────────────────────────
    appName:     "Prayer Times",
    appSubtitle: "Azan & Salah Times",

    // ── Tabs ──────────────────────────────────────────────────────
    tabPrayer: "Prayer Times",
    tabQuran:  "Holy Quran",

    // ── City / location ───────────────────────────────────────────
    cityLabel:      "Select City",
    searchCity:     "Search a city...",
    detectLocation: "Detect My Location",
    detecting:      "Detecting...",
    locationError:  "Could not get your location",
    geoCity:        "My Current Location",
    noResults:      "No results found",

    // ── Prayer names ──────────────────────────────────────────────
    prayers: {
      Fajr:    "Fajr",
      Sunrise: "Sunrise",
      Dhuhr:   "Dhuhr",
      Asr:     "Asr",
      Maghrib: "Maghrib",
      Isha:    "Isha",
    },

    // ── Monthly table columns ─────────────────────────────────────
    col: {
      day:     "Day",
      fajr:    "Fajr",
      sunrise: "Sunrise",
      dhuhr:   "Dhuhr",
      asr:     "Asr",
      maghrib: "Maghrib",
      isha:    "Isha",
    },

    // ── Dates ─────────────────────────────────────────────────────
    hijri:       "Hijri Date",
    gregorian:   "Gregorian Date",
    today:       "Today",
    backToToday: "Back to current month",

    // ── Countdown & state labels ──────────────────────────────────
    nextPrayer:   "Time until",
    nextLabel:    "Next",
    currentLabel: "Now",

    // ── Actions ───────────────────────────────────────────────────
    retry:     "Retry",
    share:     "Share",
    shareMsg:  "Today's Prayer Times",
    copied:    "Copied!",
    playAdhan: "Play Adhan",
    markDone:  "Mark as done",
    settings:  "Settings",

    // ── Calculation method ────────────────────────────────────────
    method: "Calculation Method",

    // ── Notifications ─────────────────────────────────────────────
    notifOn:         "Notifications On",
    notifOff:        "Notifications Off",
    notifPermission: "Allow Notifications",

    // ── Monthly view ──────────────────────────────────────────────
    monthlyView:    "Monthly",
    monthlyTitle:   "Prayer Times",
    loadingMonthly: "Loading data...",
    prevMonth:      "Previous month",
    nextMonth:      "Next month",

    // ── Prayer tracker ────────────────────────────────────────────
    trackerTitle: "Today's Prayers",
    prayersDone:  "done",

    // ── Favorites ─────────────────────────────────────────────────
    favoritesTitle: "Favorites",
    addFavorite:    "Add to favorites",
    removeFavorite: "Remove from favorites",
    noFavorites:    "No favorite cities yet",

    // ── Region filter ─────────────────────────────────────────────
    allRegions: "All",

    // ── Loading / status ──────────────────────────────────────────
    loading: "Loading prayer times...",

    // ── Quran reader ──────────────────────────────────────────────
    quranTitle:       "The Holy Quran",
    quranSearchPlaceholder: "Search a surah...",
    quranAllSurahs:   "All Surahs",
    quranMeccan:      "Meccan",
    quranMedinan:     "Medinan",
    quranAyahs:       "ayahs",
    quranLoading:     "Loading Quran...",
    quranLoadingSurah:"Loading surah...",
    quranError:       "Failed to load data",
    quranShowTransl:  "Show translation",
    quranHideTransl:  "Hide translation",
    quranLastRead:    "Last read",
    quranContinue:    "Continue reading",
    quranBismillah:   "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    quranVerse:       "Verse",
    quranFontSize:    "Font size",
    quranPrevSurah:   "Previous surah",
    quranNextSurah:   "Next surah",
    quranJuz:         "Juz",
    quranSurah:       "Surah",
    quranMeccaTag:    "Meccan",
    quranMedinaTag:   "Medinan",
    quranBackToList:  "Surah list",
    quranNoResults:   "No surahs found",
  },
};

export const LOCALES      = /** @type {const} */ (["ar", "en"]);
export const DEFAULT_LOCALE = "ar";
