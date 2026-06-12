import { useContext } from "react";
import { ColorModeContext } from "../theme";
import { useLang } from "../contexts/LanguageContext";
import {
  IconButton,
  useTheme,
  Box,
  Typography,
  Stack,
  Container,
  Tooltip,
} from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  Translate,
} from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Top_Head = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const { lang, switchLang, t } = useLang();

  const handleToggleLang = () => {
    switchLang(lang === "ar" ? "en" : "ar");
  };

  const handleToggleMode = () => {
    localStorage.setItem("mode", theme.palette.mode === "dark" ? "light" : "dark");
    colorMode.toggleColorMode();
  };

  return (
    <Box sx={{ background: "rgba(9,121,16,1)" }}>
      <Container>
        <Stack direction="row" alignItems="center" sx={{ py: 0.5 }}>
          <Typography
            sx={{
              mr: 1.5,
              p: "3px 10px",
              bgcolor: "#D23f57",
              borderRadius: "12px",
              fontSize: "10px",
              fontWeight: "bold",
              color: "#fff",
              flexShrink: 0,
            }}
            variant="body2"
          >
            LIVE
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#fff",
              fontFamily: "Lemonada",
            }}
            variant="body2"
          >
            {t.appName}
          </Typography>

          <Box flexGrow={1} />

          <Tooltip title={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}>
            <IconButton onClick={handleToggleLang} color="inherit" size="small">
              <Stack direction="row" alignItems="center" spacing={0.3}>
                <Translate sx={{ fontSize: "14px", color: "#fff" }} />
                <Typography sx={{ fontSize: "10px", color: "#fff", fontWeight: "bold" }}>
                  {lang === "ar" ? "EN" : "AR"}
                </Typography>
              </Stack>
            </IconButton>
          </Tooltip>

          <Tooltip title={theme.palette.mode === "light" ? "Dark mode" : "Light mode"}>
            <IconButton onClick={handleToggleMode} color="inherit" size="small">
              {theme.palette.mode === "light" ? (
                <LightModeOutlined sx={{ fontSize: "16px", color: "orange" }} />
              ) : (
                <DarkModeOutlined sx={{ fontSize: "16px", color: "#fff" }} />
              )}
            </IconButton>
          </Tooltip>

          <FacebookIcon sx={{ fontSize: "15px", color: "#fff", ml: 0.5, cursor: "pointer" }} />
          <TwitterIcon sx={{ fontSize: "15px", color: "#fff", mx: 0.5, cursor: "pointer" }} />
          <InstagramIcon sx={{ fontSize: "15px", color: "#fff", cursor: "pointer" }} />
        </Stack>
      </Container>
    </Box>
  );
};

export default Top_Head;
