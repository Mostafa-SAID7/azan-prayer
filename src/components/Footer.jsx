import { useLang } from "../contexts/LanguageContext";

export default function Footer() {
  const { lang } = useLang();
  return (
    <footer className="bg-[#097910] dark:bg-[#064d06] py-3">
      <p className="text-center text-white text-sm font-lemonada opacity-90">
        {lang === "ar" ? "تصميم وتطوير" : "Designed & developed by"}{" "}
        <span className="text-yellow-300 font-bold">M.Said</span>
        {" "}© {new Date().getFullYear()}
      </p>
    </footer>
  );
}
