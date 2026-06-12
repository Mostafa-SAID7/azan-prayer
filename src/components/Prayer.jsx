import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { useTheme, alpha } from "@mui/material";
import { useLang } from "../contexts/LanguageContext";

const GRADIENTS = {
  Fajr:    "linear-gradient(160deg, #0f0c29 0%, #302b63 55%, #24243e 100%)",
  Sunrise: "linear-gradient(160deg, #373B44 0%, #4286f4 45%, #f7971e 100%)",
  Dhuhr:   "linear-gradient(160deg, #1565c0 0%, #42a5f5 55%, #b3e5fc 100%)",
  Asr:     "linear-gradient(160deg, #00695c 0%, #26c6da 55%, #80deea 100%)",
  Maghrib: "linear-gradient(160deg, #bf360c 0%, #e64a19 35%, #ff8f00 65%, #ffd54f 100%)",
  Isha:    "linear-gradient(160deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)",
};

const EMOJIS = {
  Fajr: "🌙", Sunrise: "🌅", Dhuhr: "☀️", Asr: "🌤️", Maghrib: "🌇", Isha: "🌃",
};

const Prayer = ({ prayerKey, name, time, isNext, isActive }) => {
  const theme = useTheme();
  const { t } = useLang();
  const isLight = theme.palette.mode === "light";

  const accent = isActive ? "#4caf50" : isNext ? "#ff9800" : null;
  const glowColor = isActive
    ? "rgba(76,175,80,0.28)"
    : isNext
    ? "rgba(255,152,0,0.28)"
    : null;

  return (
    <Card
      className="prayer-card"
      elevation={isNext ? 6 : 2}
      sx={{
        flex: "1 1 145px",
        minWidth: 130,
        maxWidth: 200,
        border: accent
          ? `1.5px solid ${accent}`
          : `1px solid ${theme.palette.divider}`,
        transform: isNext ? "scale(1.06)" : "scale(1)",
        boxShadow: glowColor
          ? `0 8px 24px ${glowColor}, 0 2px 8px ${glowColor}`
          : undefined,
        position: "relative",
        overflow: "visible",
        transition: "all 0.28s cubic-bezier(0.4,0,0.2,1)",
        "&:hover": {
          transform: isNext ? "scale(1.08)" : "scale(1.03)",
          boxShadow: glowColor
            ? `0 12px 32px ${glowColor}`
            : `0 8px 20px ${alpha(theme.palette.text.primary, 0.10)}`,
        },
      }}
    >
      {(isNext || isActive) && (
        <Box
          sx={{
            position: "absolute",
            top: -14,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
          }}
        >
          <Chip
            label={isActive ? t.currentLabel : t.nextLabel}
            size="small"
            sx={{
              background: `linear-gradient(135deg, ${isActive ? "#43a047, #66bb6a" : "#fb8c00, #ffa726"})`,
              color: "#fff",
              fontFamily: "Lemonada",
              fontSize: "10px",
              height: 22,
              fontWeight: 700,
              letterSpacing: "0.04em",
              boxShadow: `0 2px 8px ${glowColor}`,
              whiteSpace: "nowrap",
              border: "none",
            }}
          />
        </Box>
      )}

      <CardActionArea sx={{ borderRadius: 14, overflow: "hidden" }}>
        {/* Gradient Header */}
        <Box
          sx={{
            height: 80,
            background: GRADIENTS[prayerKey] || GRADIENTS.Fajr,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              background: isNext
                ? "rgba(255,152,0,0.12)"
                : isActive
                ? "rgba(76,175,80,0.12)"
                : "transparent",
              transition: "background 0.3s",
            },
          }}
        >
          {/* Subtle shimmer dots */}
          <Box sx={{
            position: "absolute", inset: 0, opacity: 0.08,
            background: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px), radial-gradient(circle at 60% 80%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px, 40px 40px, 50px 50px",
          }} />
          <Typography sx={{ fontSize: "2.2rem", zIndex: 1, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))", lineHeight: 1 }}>
            {EMOJIS[prayerKey] || "🕌"}
          </Typography>
        </Box>

        {/* Card Body */}
        <CardContent
          sx={{
            pt: 1.5,
            pb: "12px !important",
            px: 1.5,
            background: isLight
              ? isNext ? "rgba(255,152,0,0.04)" : isActive ? "rgba(76,175,80,0.04)" : "transparent"
              : isNext ? "rgba(255,152,0,0.06)" : isActive ? "rgba(76,175,80,0.06)" : "transparent",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Lemonada",
              fontWeight: 600,
              fontSize: { xs: "0.8rem", sm: "0.875rem" },
              color: accent || "text.primary",
              mb: 0.5,
              lineHeight: 1.3,
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: accent ? accent : "text.secondary",
              fontFamily: "Lemonada",
              fontWeight: accent ? 600 : 300,
              fontSize: { xs: "1.2rem", sm: "1.45rem" },
              lineHeight: 1.2,
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "0.01em",
              direction: "ltr",
              textAlign: "center",
              display: "block",
            }}
          >
            {time || "--:--"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Prayer;
