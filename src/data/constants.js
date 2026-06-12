/* ─────────────────────────────────────────────────────────────────
   APP CONSTANTS
   Single source of truth for every magic string, number, and key
   used across the application.
───────────────────────────────────────────────────────────────── */

// ── API ──────────────────────────────────────────────────────────
export const API_BASE        = "https://api.aladhan.com/v1";
export const API_TIMEOUT_MS  = 10_000;
export const NOTIF_CHECK_MS  = 30_000;   // notification polling interval

// ── Storage keys ──────────────────────────────────────────────────
export const STORAGE = {
  LANG:      "prayerLang",
  MODE:      "mode",
  FAVORITES: "prayerFavorites",
  NOTIF:     "notifEnabled",
  TRACKER:   (date) => `prayerTracker_${date}`,   // date = "YYYY-MM-DD"
};

// ── Prayer key lists ──────────────────────────────────────────────
/** All six displayed prayer cards (in order) */
export const DISPLAY_PRAYERS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

/** The five trackable + countdown prayers (Sunrise excluded) */
export const COUNTDOWN_PRAYERS  = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
export const TRACKABLE_PRAYERS  = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

// ── Limits ────────────────────────────────────────────────────────
export const MAX_FAVORITES = 5;

// ── Default settings ──────────────────────────────────────────────
export const DEFAULT_CALC_METHOD = 4;   // Umm Al-Qura, Makkah
export const DEFAULT_LANG        = "ar";

// ── Region metadata ───────────────────────────────────────────────
/** Ordered list of city regions — keys match the `region` field in cities.js */
export const REGION_META = [
  { key: "Arabian Peninsula", emoji: "🕌", ar: "شبه الجزيرة العربية" },
  { key: "Levant & Iraq",     emoji: "🏛️", ar: "الشام والعراق"        },
  { key: "North Africa",      emoji: "🌴", ar: "شمال أفريقيا"         },
  { key: "Africa",            emoji: "🌍", ar: "أفريقيا"              },
  { key: "Turkey & Central Asia", emoji: "⛰️", ar: "تركيا وآسيا الوسطى" },
  { key: "South & Southeast Asia", emoji: "🌊", ar: "جنوب وجنوب شرق آسيا" },
  { key: "Europe",            emoji: "🏙️", ar: "أوروبا"               },
  { key: "Americas",          emoji: "🗽", ar: "الأمريكتان"           },
];
