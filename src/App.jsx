import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import MainContaint from "./components/MainContaint";
import Container from "@mui/material/Container";
import Footer from "./components/Footer";
import Scroll_btn from "./components/Scroll_btn";
import Top_Head from "./components/Top_Head";
import { LanguageProvider, useLang } from "./contexts/LanguageContext";

function AppInner() {
  const [theme, colorMode] = useMode();
  const { isRtl } = useLang();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Top_Head />
        <div
          className="App"
          style={{
            direction: isRtl ? "rtl" : "ltr",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            width: "100%",
            minHeight: "87vh",
          }}
        >
          <Container maxWidth="lg">
            <MainContaint />
          </Container>
        </div>
        <Scroll_btn />
        <Footer />
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
