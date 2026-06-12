/* ─────────────────────────────────────────────────────────────────
   PRAYER METADATA
   Visual assets, display info, and gradient definitions for each
   of the six Islamic daily prayers.
───────────────────────────────────────────────────────────────── */

/**
 * @typedef {Object} PrayerMeta
 * @property {string} key       - API / storage key (matches aladhan timings object)
 * @property {string} emoji     - Emoji representing the prayer's time of day
 * @property {string} gradient  - CSS gradient for the prayer card header
 * @property {boolean} trackable - Whether the prayer counts in the daily tracker
 * @property {boolean} countdown - Whether the prayer is included in the countdown timer
 */

/** @type {PrayerMeta[]} */
export const PRAYER_META = [
  {
    key:       "Fajr",
    emoji:     "🌙",
    trackable: true,
    countdown: true,
    gradient:  "linear-gradient(160deg,#0f0c29 0%,#302b63 55%,#24243e 100%)",
  },
  {
    key:       "Sunrise",
    emoji:     "🌅",
    trackable: false,
    countdown: false,
    gradient:  "linear-gradient(160deg,#373B44 0%,#4286f4 45%,#f7971e 100%)",
  },
  {
    key:       "Dhuhr",
    emoji:     "☀️",
    trackable: true,
    countdown: true,
    gradient:  "linear-gradient(160deg,#1565c0 0%,#42a5f5 55%,#b3e5fc 100%)",
  },
  {
    key:       "Asr",
    emoji:     "🌤️",
    trackable: true,
    countdown: true,
    gradient:  "linear-gradient(160deg,#00695c 0%,#26c6da 55%,#80deea 100%)",
  },
  {
    key:       "Maghrib",
    emoji:     "🌇",
    trackable: true,
    countdown: true,
    gradient:  "linear-gradient(160deg,#bf360c 0%,#e64a19 35%,#ff8f00 65%,#ffd54f 100%)",
  },
  {
    key:       "Isha",
    emoji:     "🌃",
    trackable: true,
    countdown: true,
    gradient:  "linear-gradient(160deg,#1a1a2e 0%,#16213e 55%,#0f3460 100%)",
  },
];

/** Quick lookup maps derived from PRAYER_META */
export const PRAYER_GRADIENT = Object.fromEntries(PRAYER_META.map((p) => [p.key, p.gradient]));
export const PRAYER_EMOJI    = Object.fromEntries(PRAYER_META.map((p) => [p.key, p.emoji]));

/** Derived lists (kept in sync automatically) */
export const DISPLAY_PRAYERS   = PRAYER_META.map((p) => p.key);
export const COUNTDOWN_PRAYERS = PRAYER_META.filter((p) => p.countdown).map((p) => p.key);
export const TRACKABLE_PRAYERS = PRAYER_META.filter((p) => p.trackable).map((p) => p.key);
