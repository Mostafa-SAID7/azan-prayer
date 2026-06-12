/* ─────────────────────────────────────────────────────────────────
   APP CONSTANTS
   Single source of truth for every magic string, number, and key
   used across the application.
───────────────────────────────────────────────────────────────── */

// ── Prayer times API ─────────────────────────────────────────────
export const API_BASE        = "https://api.aladhan.com/v1";
export const API_TIMEOUT_MS  = 10_000;
export const NOTIF_CHECK_MS  = 30_000;

// ── Quran API ─────────────────────────────────────────────────────
export const QURAN_API = "https://api.alquran.cloud/v1";

// ── Storage keys ──────────────────────────────────────────────────
export const STORAGE = {
  LANG:         "prayerLang",
  MODE:         "mode",
  FAVORITES:    "prayerFavorites",
  NOTIF:        "notifEnabled",
  TRACKER:      (date) => `prayerTracker_${date}`,   // date = "YYYY-MM-DD"
  QURAN_LAST:   "quranLastRead",    // { surah: number, ayah: number }
  QURAN_FONT:   "quranFontSize",    // "sm" | "md" | "lg"
  QURAN_TRANSL: "quranTranslation", // "0" | "1"
  ACTIVE_TAB:   "activeTab",        // "prayer" | "quran"
};

// ── Prayer key lists ──────────────────────────────────────────────
export const DISPLAY_PRAYERS   = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
export const COUNTDOWN_PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
export const TRACKABLE_PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

// ── Limits ────────────────────────────────────────────────────────
export const MAX_FAVORITES = 5;

// ── Default settings ──────────────────────────────────────────────
export const DEFAULT_CALC_METHOD = 4;
export const DEFAULT_LANG        = "ar";

// ── Region metadata ───────────────────────────────────────────────
export const REGION_META = [
  { key: "Arabian Peninsula",      emoji: "🕌",  ar: "شبه الجزيرة العربية"    },
  { key: "Levant & Iraq",          emoji: "🏛️",  ar: "الشام والعراق"           },
  { key: "North Africa",           emoji: "🌴",  ar: "شمال أفريقيا"            },
  { key: "Africa",                 emoji: "🌍",  ar: "أفريقيا"                 },
  { key: "Turkey & Central Asia",  emoji: "⛰️",  ar: "تركيا وآسيا الوسطى"     },
  { key: "South & Southeast Asia", emoji: "🌊",  ar: "جنوب وجنوب شرق آسيا"    },
  { key: "Europe",                 emoji: "🏙️",  ar: "أوروبا"                  },
  { key: "Americas",               emoji: "🗽",  ar: "الأمريكتان"              },
];

// ── Quran font size options ────────────────────────────────────────
export const QURAN_FONT_SIZES = {
  sm: { label: "ص",  arabic: "text-xl",   latin: "text-xs"  },
  md: { label: "م",  arabic: "text-2xl",  latin: "text-sm"  },
  lg: { label: "ك",  arabic: "text-3xl",  latin: "text-base" },
};
