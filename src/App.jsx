import { useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import MainContaint from "./components/MainContaint";
import Container from "@mui/material/Container";
import Footer from "./components/Footer";
import Scroll_btn from "./components/Scroll_btn";
import Top_Head from "./components/Top_Head";
import SplashScreen from "./components/SplashScreen";
import NotFound from "./components/NotFound";
import { LanguageProvider, useLang } from "./contexts/LanguageContext";

function AppInner() {
  const [theme, colorMode] = useMode();
  const { isRtl } = useLang();
  const [splashDone, setSplashDone] = useState(
    () => sessionStorage.getItem("splashShown") === "1"
  );

  const handleSplashFinish = useCallback(() => {
    sessionStorage.setItem("splashShown", "1");
    setSplashDone(true);
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* First-load splash screen */}
        {!splashDone && <SplashScreen onFinish={handleSplashFinish} />}

        <Routes>
          {/* Main page */}
          <Route
            path="/"
            element={
              <div
                style={{
                  direction: isRtl ? "rtl" : "ltr",
                  opacity: splashDone ? 1 : 0,
                  transition: "opacity 0.5s ease 0.1s",
                  minHeight: "100dvh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Top_Head />
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Container maxWidth="lg">
                    <MainContaint />
                  </Container>
                </div>
                <Scroll_btn />
                <Footer />
              </div>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div
                style={{
                  direction: isRtl ? "rtl" : "ltr",
                  minHeight: "100dvh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Top_Head />
                <NotFound />
                <Footer />
              </div>
            }
          />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}

export default App;
