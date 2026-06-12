import { createContext, useState, useMemo } from "react";
import { createTheme, alpha } from "@mui/material/styles";

const BRAND = {
  green: { 50: "#E8F5E9", 100: "#C8E6C9", 200: "#A5D6A7", 300: "#81C784", 400: "#66BB6A", 500: "#107C10", 600: "#0D6B0D", 700: "#0A5C0A", 800: "#074D07", 900: "#043A04" },
  greenDark: { main: "#54B054", light: "#75C875", dark: "#107C10" },
  gold: { light: "#C19A00", dark: "#FFD700" },
  neutral: {
    light: { 50: "#FAFAFA", 100: "#F5F5F5", 200: "#EEEEEE", 300: "#E0E0E0", 400: "#BDBDBD", 500: "#9E9E9E", 600: "#757575", 700: "#616161", 800: "#424242", 900: "#212121" },
    dark: { 50: "#1B1B1B", 100: "#212121", 200: "#252525", 300: "#2D2D2D", 400: "#333333", 500: "#3A3A3A", 600: "#424242", 700: "#4E4E4E", 800: "#616161", 900: "#757575" },
  },
};

const buildShadows = (mode) => {
  const base = mode === "light" ? "0,0,0" : "0,0,0";
  const o = mode === "light" ? 1 : 1.4;
  return [
    "none",
    `0 1px 2px rgba(${base},${0.06 * o}), 0 1px 1px rgba(${base},${0.04 * o})`,
    `0 1px 3px rgba(${base},${0.10 * o}), 0 1px 2px rgba(${base},${0.06 * o})`,
    `0 2px 6px rgba(${base},${0.10 * o}), 0 1px 2px rgba(${base},${0.06 * o})`,
    `0 4px 8px rgba(${base},${0.08 * o}), 0 2px 4px rgba(${base},${0.05 * o})`,
    `0 4px 12px rgba(${base},${0.09 * o}), 0 2px 4px rgba(${base},${0.06 * o})`,
    `0 6px 14px rgba(${base},${0.09 * o}), 0 2px 6px rgba(${base},${0.06 * o})`,
    `0 8px 16px rgba(${base},${0.10 * o}), 0 3px 6px rgba(${base},${0.06 * o})`,
    `0 8px 20px rgba(${base},${0.10 * o}), 0 4px 8px rgba(${base},${0.06 * o})`,
    `0 10px 24px rgba(${base},${0.11 * o}), 0 4px 8px rgba(${base},${0.07 * o})`,
    `0 12px 28px rgba(${base},${0.11 * o}), 0 5px 10px rgba(${base},${0.07 * o})`,
    `0 14px 32px rgba(${base},${0.12 * o}), 0 6px 12px rgba(${base},${0.08 * o})`,
    `0 16px 36px rgba(${base},${0.12 * o}), 0 6px 14px rgba(${base},${0.08 * o})`,
    `0 18px 40px rgba(${base},${0.13 * o}), 0 7px 14px rgba(${base},${0.08 * o})`,
    `0 20px 44px rgba(${base},${0.13 * o}), 0 8px 16px rgba(${base},${0.09 * o})`,
    `0 22px 48px rgba(${base},${0.14 * o}), 0 9px 18px rgba(${base},${0.09 * o})`,
    `0 24px 52px rgba(${base},${0.14 * o}), 0 10px 20px rgba(${base},${0.10 * o})`,
    `0 26px 56px rgba(${base},${0.15 * o}), 0 10px 22px rgba(${base},${0.10 * o})`,
    `0 28px 60px rgba(${base},${0.15 * o}), 0 12px 24px rgba(${base},${0.10 * o})`,
    `0 30px 64px rgba(${base},${0.16 * o}), 0 12px 26px rgba(${base},${0.11 * o})`,
    `0 32px 68px rgba(${base},${0.16 * o}), 0 14px 28px rgba(${base},${0.11 * o})`,
    `0 36px 72px rgba(${base},${0.17 * o}), 0 16px 32px rgba(${base},${0.12 * o})`,
    `0 40px 76px rgba(${base},${0.17 * o}), 0 18px 36px rgba(${base},${0.12 * o})`,
    `0 44px 80px rgba(${base},${0.18 * o}), 0 20px 40px rgba(${base},${0.12 * o})`,
    `0 48px 84px rgba(${base},${0.20 * o}), 0 24px 48px rgba(${base},${0.14 * o})`,
  ];
};

export const getDesignTokens = (mode) => {
  const isLight = mode === "light";
  const pGreen = isLight ? BRAND.green[500] : BRAND.greenDark.main;
  const pGreenLight = isLight ? BRAND.green[400] : BRAND.greenDark.light;
  const pGreenDark = isLight ? BRAND.green[700] : BRAND.greenDark.dark;

  return {
    palette: {
      mode,
      primary: { main: pGreen, light: pGreenLight, dark: pGreenDark, contrastText: "#fff" },
      secondary: {
        main: isLight ? "#0078D4" : "#60CDFF",
        light: isLight ? "#60CDFF" : "#88D8FF",
        dark: isLight ? "#005A9E" : "#0078D4",
        contrastText: isLight ? "#fff" : "#000",
      },
      error:   { main: isLight ? "#C4262E" : "#FF6B6B" },
      warning: { main: isLight ? "#D47500" : "#FFB340" },
      info:    { main: isLight ? "#0078D4" : "#60CDFF" },
      success: { main: pGreen, light: pGreenLight, dark: pGreenDark },
      background: {
        default: isLight ? "#F3F2F1" : "#1B1B1B",
        paper:   isLight ? "#FFFFFF"  : "#252525",
      },
      text: {
        primary:   isLight ? "#1B1A19" : "#FFFFFF",
        secondary: isLight ? "#605E5C" : "#9D9B97",
        disabled:  isLight ? "#A19F9D" : "#6E6E6E",
      },
      divider: isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)",
      action: {
        hover:    isLight ? "rgba(0,0,0,0.04)"    : "rgba(255,255,255,0.06)",
        selected: isLight ? alpha(pGreen, 0.08)    : alpha(pGreen, 0.14),
        focus:    isLight ? alpha(pGreen, 0.12)    : alpha(pGreen, 0.18),
        disabled:       isLight ? "rgba(0,0,0,0.26)"    : "rgba(255,255,255,0.26)",
        disabledBackground: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)",
      },
      gold:    isLight ? BRAND.gold.light   : BRAND.gold.dark,
      surface1: isLight ? "#FFFFFF"  : "#252525",
      surface2: isLight ? "#F8F7F6"  : "#2D2D2D",
      surface3: isLight ? "#F0EFEE"  : "#333333",
      surface4: isLight ? "#E8E6E4"  : "#3A3A3A",
    },

    typography: {
      fontFamily: '"Lemonada", "Segoe UI Variable", "Segoe UI", "Roboto", "Helvetica Neue", system-ui, -apple-system, sans-serif',
      h1: { fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3.5rem)",  lineHeight: 1.15, letterSpacing: "-0.02em" },
      h2: { fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", lineHeight: 1.2,  letterSpacing: "-0.015em" },
      h3: { fontWeight: 600, fontSize: "clamp(1.25rem, 2.5vw, 2rem)", lineHeight: 1.25, letterSpacing: "-0.01em" },
      h4: { fontWeight: 600, fontSize: "clamp(1.1rem, 2vw, 1.75rem)", lineHeight: 1.3,  letterSpacing: "-0.01em" },
      h5: { fontWeight: 600, fontSize: "clamp(1rem, 1.5vw, 1.5rem)",  lineHeight: 1.35 },
      h6: { fontWeight: 600, fontSize: "clamp(0.875rem, 1.2vw, 1.25rem)", lineHeight: 1.4 },
      body1: { fontSize: "1rem",    lineHeight: 1.6,  letterSpacing: "0.005em" },
      body2: { fontSize: "0.875rem", lineHeight: 1.57, letterSpacing: "0.01em" },
      caption: { fontSize: "0.75rem", lineHeight: 1.5, letterSpacing: "0.03em" },
      overline: { fontSize: "0.6875rem", fontWeight: 700, lineHeight: 1.5, letterSpacing: "0.1em", textTransform: "uppercase" },
    },

    shape: { borderRadius: 10 },

    shadows: buildShadows(mode),

    transitions: {
      duration: { shortest: 150, shorter: 200, short: 250, standard: 300, complex: 375, enteringScreen: 225, leavingScreen: 195 },
      easing: { easeInOut: "cubic-bezier(0.4,0,0.2,1)", easeOut: "cubic-bezier(0,0,0.2,1)", easeIn: "cubic-bezier(0.4,0,1,1)", sharp: "cubic-bezier(0.4,0,0.6,1)" },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: (theme) => `
          *, *::before, *::after { box-sizing: border-box; }
          html { scroll-behavior: smooth; text-size-adjust: 100%; }
          body {
            transition: background-color 0.3s ease, color 0.3s ease;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
          ::selection {
            background-color: ${alpha(pGreen, isLight ? 0.18 : 0.28)};
            color: ${theme.palette.text.primary};
          }
          ::-webkit-scrollbar { width: 6px; height: 6px; }
          ::-webkit-scrollbar-track { background: transparent; border-radius: 3px; }
          ::-webkit-scrollbar-thumb {
            background: ${isLight ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.18)"};
            border-radius: 3px;
            transition: background 0.2s;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: ${isLight ? "rgba(0,0,0,0.34)" : "rgba(255,255,255,0.34)"};
          }
          ::-webkit-scrollbar-corner { background: transparent; }
          * { scrollbar-width: thin; scrollbar-color: ${isLight ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.18)"} transparent; }
          img { display: block; max-width: 100%; }
          a { color: inherit; text-decoration: none; }
        `,
      },

      MuiCard: {
        defaultProps: { elevation: 2 },
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 14,
            border: `1px solid ${theme.palette.divider}`,
            backgroundImage: "none",
            backgroundColor: theme.palette.background.paper,
            transition: "box-shadow 0.22s ease, transform 0.22s ease, border-color 0.22s ease",
            "&:hover": { boxShadow: theme.shadows[5] },
          }),
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: "none" },
          rounded: { borderRadius: 14 },
          elevation1: ({ theme }) => ({ border: `1px solid ${theme.palette.divider}` }),
          elevation2: ({ theme }) => ({ border: `1px solid ${theme.palette.divider}` }),
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 600,
            letterSpacing: "0.01em",
            transition: "all 0.2s ease",
            minHeight: 36,
          },
          contained: ({ theme }) => ({
            boxShadow: theme.shadows[2],
            "&:hover": { boxShadow: theme.shadows[4], transform: "translateY(-1px)" },
            "&:active": { boxShadow: theme.shadows[1], transform: "translateY(0)" },
          }),
          outlined: ({ theme }) => ({
            borderColor: theme.palette.divider,
            "&:hover": { borderColor: theme.palette.primary.main, backgroundColor: alpha(theme.palette.primary.main, 0.04) },
          }),
        },
      },

      MuiIconButton: {
        styleOverrides: {
          root: { borderRadius: 8, transition: "background-color 0.18s ease, transform 0.18s ease", "&:hover": { transform: "scale(1.08)" } },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 6, fontWeight: 600, letterSpacing: "0.02em" },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 10,
            transition: "box-shadow 0.2s ease",
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: theme.palette.primary.main },
            "&.Mui-focused": {
              boxShadow: `0 0 0 3px ${alpha(pGreen, isLight ? 0.15 : 0.22)}`,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: theme.palette.primary.main, borderWidth: 1.5 },
            },
          }),
          notchedOutline: ({ theme }) => ({
            borderColor: theme.palette.divider,
            transition: "border-color 0.2s ease",
          }),
        },
      },

      MuiSelect: {
        styleOverrides: { select: { fontFamily: '"Lemonada", sans-serif' } },
      },

      MuiMenuItem: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 6,
            margin: "2px 6px",
            fontSize: "0.875rem",
            transition: "background-color 0.15s ease",
            "&.Mui-selected": {
              backgroundColor: alpha(pGreen, 0.1),
              fontWeight: 600,
              "&:hover": { backgroundColor: alpha(pGreen, 0.15) },
            },
          }),
        },
      },

      MuiDivider: {
        styleOverrides: {
          root: ({ theme }) => ({ borderColor: theme.palette.divider }),
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: ({ theme }) => ({
            borderRadius: 6,
            fontSize: "0.75rem",
            fontWeight: 500,
            padding: "5px 10px",
            backgroundColor: theme.palette.mode === "light" ? "#1B1A19" : "#3A3A3A",
            border: `1px solid ${theme.palette.mode === "light" ? "transparent" : "rgba(255,255,255,0.08)"}`,
          }),
          arrow: ({ theme }) => ({ color: theme.palette.mode === "light" ? "#1B1A19" : "#3A3A3A" }),
        },
      },

      MuiSkeleton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 8,
            backgroundColor: theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)",
            "&::after": {
              background: `linear-gradient(90deg, transparent, ${theme.palette.mode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.06)"}, transparent)`,
            },
          }),
        },
      },

      MuiSnackbarContent: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 10,
            backgroundColor: theme.palette.mode === "light" ? "#1B1A19" : "#3A3A3A",
            border: `1px solid ${theme.palette.mode === "light" ? "transparent" : "rgba(255,255,255,0.1)"}`,
            boxShadow: theme.shadows[8],
          }),
        },
      },

      MuiAlert: {
        styleOverrides: {
          root: { borderRadius: 10 },
        },
      },

      MuiLinearProgress: {
        styleOverrides: {
          root: { borderRadius: 4, height: 4 },
        },
      },

      MuiFab: {
        styleOverrides: {
          root: ({ theme }) => ({
            boxShadow: theme.shadows[6],
            "&:hover": { boxShadow: theme.shadows[9], transform: "scale(1.05)" },
            transition: "all 0.22s ease",
          }),
        },
      },
    },
  };
};

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useMode = () => {
  const [mode, setMode] = useState(() => localStorage.getItem("mode") || "light");

  const colorMode = useMemo(() => ({
    toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
  }), []);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return [theme, colorMode];
};
