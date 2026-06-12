import { createContext, useContext, useState } from "react";

const translations = {
  ar: {
    appName: "أوقات الأذان",
    cityLabel: "اختر المدينة",
    searchCity: "ابحث عن مدينة...",
    nextPrayer: "متبقي حتى صلاة",
    method: "طريقة الحساب",
    detectLocation: "تحديد موقعي",
    detecting: "جارٍ التحديد...",
    hijri: "التاريخ الهجري",
    gregorian: "التاريخ الميلادي",
    prayers: {
      Fajr: "الفجر",
      Sunrise: "الشروق",
      Dhuhr: "الظهر",
      Asr: "العصر",
      Maghrib: "المغرب",
      Isha: "العشاء",
      Midnight: "منتصف الليل",
    },
    nextLabel: "القادمة",
    currentLabel: "الآن",
    shareTitle: "أوقات الصلاة",
    copiedMsg: "تم النسخ!",
    locationError: "تعذّر تحديد موقعك",
    loading: "جارٍ تحميل الأوقات...",
    noResults: "لا توجد نتائج",
    geoCity: "موقعي الحالي",
  },
  en: {
    appName: "Prayer Times",
    cityLabel: "Select City",
    searchCity: "Search a city...",
    nextPrayer: "Time until",
    method: "Calculation Method",
    detectLocation: "Detect My Location",
    detecting: "Detecting...",
    hijri: "Hijri Date",
    gregorian: "Gregorian Date",
    prayers: {
      Fajr: "Fajr",
      Sunrise: "Sunrise",
      Dhuhr: "Dhuhr",
      Asr: "Asr",
      Maghrib: "Maghrib",
      Isha: "Isha",
      Midnight: "Midnight",
    },
    nextLabel: "Next",
    currentLabel: "Now",
    shareTitle: "Prayer Times",
    copiedMsg: "Copied!",
    locationError: "Could not get your location",
    loading: "Loading prayer times...",
    noResults: "No results found",
    geoCity: "My Current Location",
  },
};

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(
    localStorage.getItem("prayerLang") || "ar"
  );

  const switchLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem("prayerLang", newLang);
  };

  return (
    <LanguageContext.Provider
      value={{ lang, switchLang, t: translations[lang], isRtl: lang === "ar" }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
