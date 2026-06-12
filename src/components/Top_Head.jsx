import { useContext } from "react";
import { ColorModeContext } from "../theme";
import { useLang } from "../contexts/LanguageContext";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Sun, Moon, Languages } from "lucide-react";

export default function Top_Head() {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const { lang, switchLang, t } = useLang();
  const isDark = mode === "dark";

  return (
    <header className="sticky top-0 z-40 bg-[#097910] dark:bg-[#064d06] shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-2">
        {/* Brand */}
        <span className="text-lg" aria-hidden>🕌</span>
        <span className="font-lemonada font-semibold text-white text-sm tracking-wide">
          {t.appName}
        </span>
        <span className="text-[10px] font-bold text-white bg-red-500 rounded-full px-2 py-0.5 leading-tight">
          LIVE
        </span>

        <div className="flex-1" />

        {/* Language toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => switchLang(lang === "ar" ? "en" : "ar")}
              className="text-white hover:bg-white/15 hover:text-white"
              aria-label={lang === "ar" ? "Switch to English" : "التبديل للعربية"}
            >
              <Languages className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {lang === "ar" ? "Switch to English" : "العربية"}
          </TooltipContent>
        </Tooltip>

        {/* Dark mode toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleColorMode}
              className="text-white hover:bg-white/15 hover:text-white"
              aria-label={isDark ? "Light mode" : "Dark mode"}
            >
              {isDark
                ? <Sun className="h-4 w-4 text-yellow-300" />
                : <Moon className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {isDark ? "Light mode" : "Dark mode"}
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
