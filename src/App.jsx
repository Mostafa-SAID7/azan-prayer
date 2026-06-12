import { useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./theme";
import { LanguageProvider, useLang } from "./contexts/LanguageContext";
import { TooltipProvider } from "./components/ui/tooltip";
import MainContaint from "./components/MainContaint";
import QuranReader from "./components/QuranReader";
import Footer from "./components/Footer";
import Scroll_btn from "./components/Scroll_btn";
import Top_Head from "./components/Top_Head";
import SplashScreen from "./components/SplashScreen";
import NotFound from "./components/NotFound";
import { cn } from "./lib/utils";
import { STORAGE } from "./data/constants";
import { Clock, BookOpen } from "lucide-react";

/* ── Tab bar component ───────────────────────────────────────────── */
function TabBar({ activeTab, onChange, t }) {
  const tabs = [
    { id: "prayer", icon: Clock,     label: t.tabPrayer, emoji: "🕌" },
    { id: "quran",  icon: BookOpen,  label: t.tabQuran,  emoji: "📖" },
  ];

  return (
    <div className="sticky top-[49px] z-30 bg-background/95 backdrop-blur-md border-b">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex">
          {tabs.map(({ id, icon: Icon, label, emoji }) => (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={cn(
                "relative flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-lemonada transition-all duration-200",
                activeTab === id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="text-base leading-none">{emoji}</span>
              <span className="hidden sm:inline">{label}</span>

              {/* Active underline indicator */}
              <span
                className={cn(
                  "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2.5px] rounded-full bg-primary transition-all duration-300",
                  activeTab === id ? "w-3/4" : "w-0",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main app inner ──────────────────────────────────────────────── */
function AppInner() {
  const { isRtl, t } = useLang();

  const [splashDone, setSplashDone] = useState(
    () => sessionStorage.getItem("splashShown") === "1"
  );
  const [activeTab, setActiveTab] = useState(
    () => localStorage.getItem(STORAGE.ACTIVE_TAB) || "prayer"
  );

  const handleSplashFinish = useCallback(() => {
    sessionStorage.setItem("splashShown", "1");
    setSplashDone(true);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem(STORAGE.ACTIVE_TAB, tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {!splashDone && <SplashScreen onFinish={handleSplashFinish} />}

      <Routes>
        <Route
          path="/"
          element={
            <div
              dir={isRtl ? "rtl" : "ltr"}
              style={{ opacity: splashDone ? 1 : 0, transition: "opacity 0.5s ease 0.1s" }}
              className="min-h-dvh flex flex-col bg-background"
            >
              <Top_Head />

              {/* Tab switcher */}
              <TabBar activeTab={activeTab} onChange={handleTabChange} t={t} />

              <main className="flex-1 flex justify-center w-full">
                <div className="w-full max-w-5xl px-4 pb-10">
                  {activeTab === "prayer" && <MainContaint />}
                  {activeTab === "quran"  && <QuranReader />}
                </div>
              </main>

              <Scroll_btn />
              <Footer />
            </div>
          }
        />
        <Route
          path="*"
          element={
            <div
              dir={isRtl ? "rtl" : "ltr"}
              className="min-h-dvh flex flex-col bg-background"
            >
              <Top_Head />
              <NotFound />
              <Footer />
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <TooltipProvider delayDuration={300}>
          <AppInner />
        </TooltipProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
