---
name: Prayer App Architecture
description: Key patterns, hooks, and feature design for the أوقات الصلاة PWA built with React + Vite + Tailwind.
---

## State / data flow
- `MainContaint.jsx` is the single smart component. All prayer API calls, countdown timer, and feature state live here.
- API: `https://api.aladhan.com/v1/timingsByCity` for city-based, `timings/{date}` for geolocation.
- Countdown: 1-second `setInterval` calling `moment()` diff against the next COUNTDOWN_PRAYERS entry.

## Feature hooks (src/hooks/)
- `usePrayerTracker` — daily tracker keyed on `prayerTracker_YYYY-MM-DD` in localStorage; resets automatically by using today's date as the key.
- `useNotifications` — checks every 30s if `HH:mm` matches a prayer time; plays `playAdhanBeep()` + shows `Notification`; permission must be "granted" before enabling.
- `useFavorites` — stores up to 5 city `apiCity` IDs in localStorage under `prayerFavorites`.

## Prayer card design
- Gradient headers defined in `Prayer.jsx` GRADIENTS map (one per prayer key).
- Active prayer: green ring + green text + `isActive` prop.
- Next prayer: orange ring + scale-[1.06] + orange text + `isNext` prop.
- Tracker checkbox appears on hover (`group-hover:opacity-100`), stays visible when `isDone=true`.
- Sunrise is a display-only card (not in COUNTDOWN_PRAYERS, not trackable).

## Monthly view
- `MonthlyView.jsx` — Dialog using Radix, fetches `calendarByCity/{year}/{month}` on open.
- Shows Hijri day in parentheses; highlights today's row with primary color.

## Adhan audio
- `playAdhanBeep()` in `src/lib/utils.js` uses Web Audio API (no external file). Synthesizes 5 ascending/descending tones.

## RTL / i18n
- `LanguageContext` provides `{ lang, switchLang, t, isRtl }`. All `dir` attributes on root divs come from `isRtl`.
- Times always rendered with `style={{ direction: "ltr" }}` to prevent Arabic RTL flipping digits.
