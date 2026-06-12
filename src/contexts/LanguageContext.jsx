import { createContext, useContext, useState } from "react";

const translations = {
  ar: {
    appName:        "أوقات الأذان",
    appSubtitle:    "مواقيت الصلاة",
    cityLabel:      "اختر المدينة",
    searchCity:     "ابحث عن مدينة...",
    nextPrayer:     "متبقي حتى صلاة",
    method:         "طريقة الحساب",
    detectLocation: "تحديد موقعي",
    detecting:      "جارٍ التحديد...",
    hijri:          "التاريخ الهجري",
    gregorian:      "التاريخ الميلادي",
    prayers: {
      Fajr: "الفجر", Sunrise: "الشروق", Dhuhr: "الظهر",
      Asr: "العصر", Maghrib: "المغرب", Isha: "العشاء",
    },
    nextLabel:       "القادمة",
    currentLabel:    "الآن",
    shareTitle:      "أوقات الصلاة",
    copiedMsg:       "تم النسخ!",
    locationError:   "تعذّر تحديد موقعك",
    loading:         "جارٍ تحميل الأوقات...",
    noResults:       "لا توجد نتائج",
    geoCity:         "موقعي الحالي",
    retry:           "إعادة المحاولة",
    notifEnable:     "تفعيل الإشعارات",
    notifOn:         "الإشعارات مفعّلة",
    notifOff:        "الإشعارات معطّلة",
    notifPermission: "اسمح بالإشعارات",
    monthlyView:     "الجدول الشهري",
    monthlyTitle:    "مواقيت الصلاة — الشهر الكامل",
    share:           "مشاركة",
    shareMsg:        "مواقيت الصلاة اليوم",
    copied:          "تم النسخ!",
    trackerTitle:    "صلوات اليوم",
    prayersDone:     "مكتملة",
    favoritesTitle:  "المفضلة",
    addFavorite:     "أضف للمفضلة",
    removeFavorite:  "إزالة من المفضلة",
    noFavorites:     "لا توجد مدن مفضّلة",
    playAdhan:       "تشغيل الأذان",
    markDone:        "تحديد كمكتملة",
    settings:        "الإعدادات",
    today:           "اليوم",
    loadingMonthly:  "جارٍ تحميل البيانات...",
    col: { day:"اليوم", fajr:"الفجر", sunrise:"الشروق", dhuhr:"الظهر", asr:"العصر", maghrib:"المغرب", isha:"العشاء" },
  },
  en: {
    appName:        "Prayer Times",
    appSubtitle:    "Azan & Salah",
    cityLabel:      "Select City",
    searchCity:     "Search a city...",
    nextPrayer:     "Time until",
    method:         "Calculation Method",
    detectLocation: "Detect My Location",
    detecting:      "Detecting...",
    hijri:          "Hijri Date",
    gregorian:      "Gregorian Date",
    prayers: {
      Fajr: "Fajr", Sunrise: "Sunrise", Dhuhr: "Dhuhr",
      Asr: "Asr", Maghrib: "Maghrib", Isha: "Isha",
    },
    nextLabel:       "Next",
    currentLabel:    "Now",
    shareTitle:      "Prayer Times",
    copiedMsg:       "Copied!",
    locationError:   "Could not get your location",
    loading:         "Loading prayer times...",
    noResults:       "No results found",
    geoCity:         "My Current Location",
    retry:           "Retry",
    notifEnable:     "Enable Notifications",
    notifOn:         "Notifications On",
    notifOff:        "Notifications Off",
    notifPermission: "Allow Notifications",
    monthlyView:     "Monthly",
    monthlyTitle:    "Monthly Prayer Times",
    share:           "Share",
    shareMsg:        "Today's Prayer Times",
    copied:          "Copied!",
    trackerTitle:    "Today's Prayers",
    prayersDone:     "done",
    favoritesTitle:  "Favorites",
    addFavorite:     "Add to favorites",
    removeFavorite:  "Remove from favorites",
    noFavorites:     "No favorite cities yet",
    playAdhan:       "Play Adhan",
    markDone:        "Mark as done",
    settings:        "Settings",
    today:           "Today",
    loadingMonthly:  "Loading data...",
    col: { day:"Day", fajr:"Fajr", sunrise:"Sunrise", dhuhr:"Dhuhr", asr:"Asr", maghrib:"Maghrib", isha:"Isha" },
  },
};

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem("prayerLang") || "ar"
  );

  const switchLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem("prayerLang", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t: translations[lang], isRtl: lang === "ar" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
