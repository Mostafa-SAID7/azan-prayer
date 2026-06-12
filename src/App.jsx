import { useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./theme";
import { LanguageProvider, useLang } from "./contexts/LanguageContext";
import { TooltipProvider } from "./components/ui/tooltip";
import MainContaint from "./components/MainContaint";
import Footer from "./components/Footer";
import Scroll_btn from "./components/Scroll_btn";
import Top_Head from "./components/Top_Head";
import SplashScreen from "./components/SplashScreen";
import NotFound from "./components/NotFound";

function AppInner() {
  const { isRtl } = useLang();
  const [splashDone, setSplashDone] = useState(
    () => sessionStorage.getItem("splashShown") === "1"
  );

  const handleSplashFinish = useCallback(() => {
    sessionStorage.setItem("splashShown", "1");
    setSplashDone(true);
  }, []);

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
              <main className="flex-1 flex justify-center w-full">
                <div className="w-full max-w-5xl px-4 pb-8">
                  <MainContaint />
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
