import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const TOTAL_MS   = 2800;  // total splash duration
const EXIT_MS    = 2200;  // when exit animation begins

export default function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState("enter"); // enter → idle → exit → done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"),  EXIT_MS);
    const t2 = setTimeout(() => onFinish(),        TOTAL_MS);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onFinish]);

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        background: "linear-gradient(160deg, #043A04 0%, #0A5C0A 40%, #107C10 75%, #1B8A1B 100%)",
        animation: phase === "exit"
          ? "splashExit 0.65s cubic-bezier(0.4,0,0.2,1) forwards"
          : "splashEnter 0.5s ease forwards",
      }}
    >
      {/* ── Ambient radial glow ─────────────────────── */}
      <Box sx={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 55% at 50% 48%, rgba(255,255,255,0.07) 0%, transparent 70%)",
      }} />

      {/* ── Ripple rings ────────────────────────────── */}
      {[0, 1, 2].map((i) => (
        <Box key={i} sx={{
          position: "absolute",
          width: 320, height: 320,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.14)",
          animation: `splashRipple 2.4s cubic-bezier(0,0.2,0.8,1) ${i * 0.8}s infinite`,
          pointerEvents: "none",
        }} />
      ))}

      {/* ── Mosque Icon ─────────────────────────────── */}
      <Box sx={{
        fontSize: "5.5rem",
        lineHeight: 1,
        mb: 2.5,
        animation: "splashIconIn 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.1s both",
        filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.35))",
        zIndex: 1,
      }}>
        🕌
      </Box>

      {/* ── Arabic Title ────────────────────────────── */}
      <Typography sx={{
        fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
        fontFamily: "Lemonada",
        fontWeight: 700,
        color: "#fff",
        letterSpacing: "0.02em",
        lineHeight: 1.2,
        textAlign: "center",
        zIndex: 1,
        animation: "splashTextIn 0.6s ease 0.35s both",
        textShadow: "0 2px 16px rgba(0,0,0,0.3)",
        px: 2,
      }}>
        أوقات الصلاة
      </Typography>

      {/* ── English Subtitle ────────────────────────── */}
      <Typography sx={{
        fontSize: "clamp(0.85rem, 2vw, 1rem)",
        fontFamily: "Lemonada",
        fontWeight: 400,
        color: "rgba(255,255,255,0.72)",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        mt: 0.75,
        mb: 4,
        zIndex: 1,
        animation: "splashTextIn 0.6s ease 0.55s both",
        textAlign: "center",
        px: 2,
      }}>
        Prayer Times
      </Typography>

      {/* ── Loading dots ────────────────────────────── */}
      <Box sx={{ display: "flex", gap: 1.2, zIndex: 1 }}>
        {[0, 1, 2].map((i) => (
          <Box key={i} sx={{
            width: 8, height: 8,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.8)",
            animation: `splashDot 1.2s ease ${0.2 + i * 0.18}s infinite`,
          }} />
        ))}
      </Box>

      {/* ── Progress bar ────────────────────────────── */}
      <Box sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        height: 3,
        bgcolor: "rgba(255,255,255,0.25)",
        width: "100%",
        overflow: "hidden",
        zIndex: 1,
      }}>
        <Box sx={{
          height: "100%",
          bgcolor: "rgba(255,255,255,0.75)",
          borderRadius: "0 2px 2px 0",
          animation: `splashBar ${EXIT_MS}ms linear 0.1s both`,
        }} />
      </Box>

      {/* ── Keyframes ───────────────────────────────── */}
      <style>{`
        @keyframes splashEnter {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes splashExit {
          0%   { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.06); }
        }
        @keyframes splashRipple {
          0%   { transform: scale(0.1); opacity: 0.8; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        @keyframes splashIconIn {
          from { opacity: 0; transform: scale(0.3) translateY(30px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes splashTextIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes splashDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%           { transform: scale(1.2); opacity: 1; }
        }
        @keyframes splashBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </Box>
  );
}
