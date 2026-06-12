import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Stack, useTheme, alpha } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useLang } from "../contexts/LanguageContext";

export default function NotFound() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { lang } = useLang();
  const isLight = theme.palette.mode === "light";

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        px: 3,
        py: 6,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Ambient background orbs ─────────────────── */}
      <Box sx={{
        position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden",
      }}>
        <Box sx={{
          position: "absolute", width: 400, height: 400, borderRadius: "50%",
          top: "10%", left: "55%",
          background: isLight
            ? `radial-gradient(circle, ${alpha("#107C10", 0.07)} 0%, transparent 70%)`
            : `radial-gradient(circle, ${alpha("#54B054", 0.10)} 0%, transparent 70%)`,
          animation: "nfFloat 7s ease-in-out infinite alternate",
        }} />
        <Box sx={{
          position: "absolute", width: 300, height: 300, borderRadius: "50%",
          bottom: "10%", right: "60%",
          background: isLight
            ? `radial-gradient(circle, ${alpha("#0078D4", 0.06)} 0%, transparent 70%)`
            : `radial-gradient(circle, ${alpha("#60CDFF", 0.08)} 0%, transparent 70%)`,
          animation: "nfFloat 9s ease-in-out 1s infinite alternate-reverse",
        }} />
      </Box>

      {/* ── 404 Number ──────────────────────────────── */}
      <Box sx={{ position: "relative", mb: 1, zIndex: 1 }}>
        {"404".split("").map((char, i) => (
          <Box
            key={i}
            component="span"
            sx={{
              display: "inline-block",
              fontSize: "clamp(5rem, 18vw, 10rem)",
              fontFamily: "Lemonada",
              fontWeight: 700,
              lineHeight: 1,
              color: "transparent",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              backgroundImage: isLight
                ? "linear-gradient(135deg, #0A5C0A 0%, #107C10 40%, #54B054 100%)"
                : "linear-gradient(135deg, #54B054 0%, #75C875 50%, #a5d6a7 100%)",
              animation: `nfDigit 0.7s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.12}s both`,
              letterSpacing: "-0.03em",
            }}
          >
            {char}
          </Box>
        ))}

        {/* Reflection / glow under digits */}
        <Box sx={{
          position: "absolute",
          bottom: -8, left: "50%", transform: "translateX(-50%)",
          width: "80%", height: 24,
          background: isLight
            ? `radial-gradient(ellipse, ${alpha("#107C10", 0.2)} 0%, transparent 70%)`
            : `radial-gradient(ellipse, ${alpha("#54B054", 0.25)} 0%, transparent 70%)`,
          filter: "blur(8px)",
        }} />
      </Box>

      {/* ── Floating Icon ───────────────────────────── */}
      <Box sx={{
        fontSize: "clamp(3rem, 8vw, 4.5rem)",
        mb: 3,
        zIndex: 1,
        animation: "nfMosqueFloat 3.5s ease-in-out infinite",
        filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.18))",
        lineHeight: 1,
      }}>
        🕌
      </Box>

      {/* ── Title ───────────────────────────────────── */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Lemonada",
          fontWeight: 700,
          mb: 1.5,
          zIndex: 1,
          animation: "nfFadeUp 0.6s ease 0.3s both",
          color: "text.primary",
        }}
      >
        {lang === "ar" ? "الصفحة غير موجودة" : "Page Not Found"}
      </Typography>

      {/* ── Subtitle ────────────────────────────────── */}
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          fontFamily: "Lemonada",
          maxWidth: 400,
          mb: 1.5,
          zIndex: 1,
          lineHeight: 1.8,
          animation: "nfFadeUp 0.6s ease 0.45s both",
          fontSize: { xs: "0.875rem", sm: "1rem" },
        }}
      >
        {lang === "ar"
          ? "عذراً، الصفحة التي تبحث عنها لا وجود لها أو ربما تمّ نقلها."
          : "Sorry, the page you're looking for doesn't exist or has been moved."}
      </Typography>

      <Typography
        variant="caption"
        color="text.disabled"
        sx={{
          fontFamily: "Lemonada",
          mb: 4,
          zIndex: 1,
          animation: "nfFadeUp 0.6s ease 0.55s both",
          display: "block",
        }}
      >
        {lang === "ar" ? "Page Not Found" : "الصفحة غير موجودة"}
      </Typography>

      {/* ── Dots separator ──────────────────────────── */}
      <Stack direction="row" spacing={0.8} sx={{ mb: 4, zIndex: 1, animation: "nfFadeUp 0.6s ease 0.6s both" }}>
        {[0,1,2,3,4].map((i) => (
          <Box key={i} sx={{
            width: i === 2 ? 20 : 6,
            height: 6,
            borderRadius: 3,
            bgcolor: i === 2 ? "primary.main" : alpha(theme.palette.primary.main, 0.3),
            transition: "all 0.3s",
          }} />
        ))}
      </Stack>

      {/* ── Home button ─────────────────────────────── */}
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<HomeIcon />}
        onClick={() => navigate("/")}
        sx={{
          fontFamily: "Lemonada",
          borderRadius: 3,
          px: 4,
          py: 1.4,
          fontSize: "1rem",
          fontWeight: 600,
          zIndex: 1,
          animation: "nfFadeUp 0.6s ease 0.7s both",
          background: "linear-gradient(135deg, #0A5C0A 0%, #107C10 50%, #1B8A1B 100%)",
          boxShadow: `0 6px 24px ${alpha("#107C10", 0.35)}`,
          "&:hover": {
            background: "linear-gradient(135deg, #107C10 0%, #1B8A1B 50%, #2a9a2a 100%)",
            boxShadow: `0 8px 28px ${alpha("#107C10", 0.45)}`,
            transform: "translateY(-2px)",
          },
          "&:active": { transform: "translateY(0)" },
          transition: "all 0.22s ease",
        }}
      >
        {lang === "ar" ? "العودة للرئيسية" : "Back to Home"}
      </Button>

      {/* ── Keyframes ───────────────────────────────── */}
      <style>{`
        @keyframes nfFloat {
          from { transform: translateY(0px) scale(1); }
          to   { transform: translateY(-40px) scale(1.06); }
        }
        @keyframes nfDigit {
          from { opacity: 0; transform: translateY(-60px) scale(0.5); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes nfMosqueFloat {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%      { transform: translateY(-18px) rotate(2deg); }
        }
        @keyframes nfFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
}
