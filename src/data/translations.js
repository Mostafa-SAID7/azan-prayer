/* ─────────────────────────────────────────────────────────────────
   TRANSLATIONS
   All UI strings for Arabic (ar) and English (en).
   Add new keys to BOTH locales to keep them in sync.
───────────────────────────────────────────────────────────────── */

/** @type {Record<string, Translation>} */
export const translations = {
  ar: {
    // ── App identity ─────────────────────────────────────────────
    appName:      "أوقات الصلاة",
    appSubtitle:  "مواقيت الأذان والصلاة",

    // ── City / location ──────────────────────────────────────────
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

    // ── Monthly table column headers ──────────────────────────────
    col: {
      day:     "اليوم",
      fajr:    "الفجر",
      sunrise: "الشروق",
      dhuhr:   "الظهر",
      asr:     "العصر",
      maghrib: "المغرب",
      isha:    "العشاء",
    },

    // ── Dates ────────────────────────────────────────────────────
    hijri:     "التاريخ الهجري",
    gregorian: "التاريخ الميلادي",
    today:     "اليوم",

    // ── Countdown & state labels ──────────────────────────────────
    nextPrayer:   "متبقي حتى صلاة",
    nextLabel:    "القادمة",
    currentLabel: "الآن",

    // ── Actions ──────────────────────────────────────────────────
    retry:     "إعادة المحاولة",
    share:     "مشاركة",
    shareMsg:  "مواقيت الصلاة اليوم",
    copied:    "تم النسخ!",
    playAdhan: "تشغيل الأذان",
    markDone:  "تحديد كمكتملة",
    settings:  "الإعدادات",

    // ── Calculation method ────────────────────────────────────────
    method: "طريقة الحساب",

    // ── Notifications ────────────────────────────────────────────
    notifOn:         "الإشعارات مفعّلة",
    notifOff:        "الإشعارات معطّلة",
    notifPermission: "اسمح بالإشعارات",

    // ── Monthly view ─────────────────────────────────────────────
    monthlyView:    "الجدول الشهري",
    monthlyTitle:   "مواقيت الصلاة — الشهر الكامل",
    loadingMonthly: "جارٍ تحميل البيانات...",

    // ── Prayer tracker ────────────────────────────────────────────
    trackerTitle: "صلوات اليوم",
    prayersDone:  "مكتملة",

    // ── Favorites ────────────────────────────────────────────────
    favoritesTitle: "المفضلة",
    addFavorite:    "أضف للمفضلة",
    removeFavorite: "إزالة من المفضلة",
    noFavorites:    "لا توجد مدن مفضّلة",

    // ── Loading / status ──────────────────────────────────────────
    loading: "جارٍ تحميل الأوقات...",
  },

  en: {
    // ── App identity ─────────────────────────────────────────────
    appName:     "Prayer Times",
    appSubtitle: "Azan & Salah Times",

    // ── City / location ──────────────────────────────────────────
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

    // ── Monthly table column headers ──────────────────────────────
    col: {
      day:     "Day",
      fajr:    "Fajr",
      sunrise: "Sunrise",
      dhuhr:   "Dhuhr",
      asr:     "Asr",
      maghrib: "Maghrib",
      isha:    "Isha",
    },

    // ── Dates ────────────────────────────────────────────────────
    hijri:     "Hijri Date",
    gregorian: "Gregorian Date",
    today:     "Today",

    // ── Countdown & state labels ──────────────────────────────────
    nextPrayer:   "Time until",
    nextLabel:    "Next",
    currentLabel: "Now",

    // ── Actions ──────────────────────────────────────────────────
    retry:     "Retry",
    share:     "Share",
    shareMsg:  "Today's Prayer Times",
    copied:    "Copied!",
    playAdhan: "Play Adhan",
    markDone:  "Mark as done",
    settings:  "Settings",

    // ── Calculation method ────────────────────────────────────────
    method: "Calculation Method",

    // ── Notifications ────────────────────────────────────────────
    notifOn:         "Notifications On",
    notifOff:        "Notifications Off",
    notifPermission: "Allow Notifications",

    // ── Monthly view ─────────────────────────────────────────────
    monthlyView:    "Monthly",
    monthlyTitle:   "Monthly Prayer Times",
    loadingMonthly: "Loading data...",

    // ── Prayer tracker ────────────────────────────────────────────
    trackerTitle: "Today's Prayers",
    prayersDone:  "done",

    // ── Favorites ────────────────────────────────────────────────
    favoritesTitle: "Favorites",
    addFavorite:    "Add to favorites",
    removeFavorite: "Remove from favorites",
    noFavorites:    "No favorite cities yet",

    // ── Loading / status ──────────────────────────────────────────
    loading: "Loading prayer times...",
  },
};

/** Supported locale codes */
export const LOCALES = /** @type {const} */ (["ar", "en"]);

/** Default locale */
export const DEFAULT_LOCALE = "ar";
