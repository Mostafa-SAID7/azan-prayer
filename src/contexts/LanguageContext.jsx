import { createContext, useContext, useState } from "react";
import { translations, DEFAULT_LOCALE } from "../data/translations";
import { STORAGE } from "../data/constants";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem(STORAGE.LANG) || DEFAULT_LOCALE
  );

  const switchLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem(STORAGE.LANG, newLang);
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        switchLang,
        t: translations[lang],
        isRtl: lang === "ar",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
