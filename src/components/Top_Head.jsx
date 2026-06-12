import { useContext } from "react";
import { ColorModeContext } from "../theme";
import { useLang } from "../contexts/LanguageContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Sun, Moon, Languages, Clock, BookOpen } from "lucide-react";
import { cn } from "../lib/utils";
import { STORAGE } from "../data/constants";

export default function Top_Head({ activeTab, onTabChange }) {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const { lang, switchLang, t }   = useLang();
  const isDark = mode === "dark";

  const tabs = [
    { id: "prayer", icon: Clock,     label: t.tabPrayer, emoji: "🕌" },
    { id: "quran",  icon: BookOpen,  label: t.tabQuran,  emoji: "📖" },
  ];

  const handleTabChange = (tab) => {
    if (onTabChange) onTabChange(tab);
    localStorage.setItem(STORAGE.ACTIVE_TAB, tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Main Header ───────────────────────────────────── */}
      <header
        className="app-header sticky top-0 z-40 shadow-[0_2px_20px_rgba(0,0,0,0.35)]"
        style={{ animation: "headerIn 0.4s cubic-bezier(0.34,1.1,0.64,1) both" }}
      >
        <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 py-2 flex items-center justify-between gap-2">

          {/* ── Brand ─────────────────────────────────────── */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {/* Mosque icon in a circle */}
            <div className="w-9 h-9 rounded-full bg-white/12 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
              <span className="text-[1.25rem] leading-none" aria-hidden>🕌</span>
            </div>

            {/* Name + subtitle */}
            <div className="min-w-0">
              <h1 className="font-lemonada font-bold text-white leading-tight text-sm sm:text-base tracking-wide truncate">
                {t.appName}
              </h1>
              <p className="font-lemonada text-[9px] text-white/60 leading-none tracking-widest uppercase mt-0.5 hidden sm:block">
                {t.appSubtitle}
              </p>
            </div>

            {/* Live badge */}
            <span
              className="hidden sm:inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-white bg-white/15 border border-white/25 rounded-full px-2 py-1 shrink-0"
              style={{ animation: "footerPulse 2.4s ease-in-out infinite" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-300 animate-pulse" />
              LIVE
            </span>
          </div>

          {/* ── Controls ─────────────────────────────────── */}
          <div className="flex items-center gap-1 shrink-0">

            {/* Language toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => switchLang(lang === "ar" ? "en" : "ar")}
                  className="relative flex items-center justify-center w-9 h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/12 transition-all duration-200"
                  aria-label={lang === "ar" ? "Switch to English" : "التبديل للعربية"}
                >
                  <Languages className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                {lang === "ar" ? "English" : "العربية"}
              </TooltipContent>
            </Tooltip>

            {/* Dark mode toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleColorMode}
                  className="flex items-center justify-center w-9 h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/12 transition-all duration-200"
                  aria-label={isDark ? "Light mode" : "Dark mode"}
                >
                  {isDark
                    ? <Sun  className="h-4 w-4 text-yellow-300 hover:text-yellow-200" />
                    : <Moon className="h-4 w-4" />}
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                {isDark ? "Light mode" : "Dark mode"}
              </TooltipContent>
            </Tooltip>

          </div>
        </div>
      </header>

      {/* ── Inner Navigation Header ─────────────────────── */}
      <nav className="sticky top-[56px] z-30 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-center h-12">
            {tabs.map(({ id, label, emoji }) => (
              <button
                key={id}
                onClick={() => handleTabChange(id)}
                className={cn(
                  "relative flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-semibold font-lemonada transition-all duration-200",
                  activeTab === id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="text-lg leading-none">{emoji}</span>
                <span>{label}</span>

                {/* Active underline indicator */}
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-primary transition-all duration-300",
                    activeTab === id ? "w-12" : "w-0",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
