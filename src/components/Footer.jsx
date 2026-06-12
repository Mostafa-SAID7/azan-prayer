import { useLang } from "../contexts/LanguageContext";

/** Gregorian year */
const GY = new Date().getFullYear();

/**
 * Approximate Hijri year for the current date.
 * Uses the standard epoch offset (16 Jul 622 CE) and the mean Hijri year
 * length of 354.367 days — accurate to ±1 year.
 */
function hijriYear() {
  const HIJRI_EPOCH_JD = 1948439.5;           // Julian Day of 1 Muharram 1 AH
  const now = new Date();
  const jd  = Math.floor(
    (now.getTime() / 86_400_000) + 2_440_587.5    // unix epoch → Julian Day
  );
  return Math.floor((jd - HIJRI_EPOCH_JD) / 354.367) + 1;
}

const HY = hijriYear();   // e.g. 1447

export default function Footer() {
  const { lang } = useLang();
  const isAr = lang === "ar";

  return (
    <footer className="app-footer mt-8 shadow-[0_-2px_20px_rgba(0,0,0,0.25)]">
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-4">

        {/* ── Ornamental divider ─────────────────────── */}
        <div className="flex items-center gap-3 mb-3.5">
          <div className="flex-1 h-px bg-white/15" />
          <span className="text-white/35 text-xs tracking-[0.35em] select-none">✦ ✦ ✦</span>
          <div className="flex-1 h-px bg-white/15" />
        </div>

        {/* ── Dual-year display ─────────────────────── */}
        <div className="flex items-center justify-center gap-2.5 mb-3.5 flex-wrap">

          {/* Hijri year pill */}
          <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3.5 py-1.5 shadow-inner">
            <span className="text-sm leading-none">🌙</span>
            <span className="font-lemonada font-bold text-white text-[13px] tabular-nums" style={{ direction: "ltr" }}>
              {HY} هـ
            </span>
          </div>

          {/* Mosque icon — subtle pulse */}
          <span
            className="text-[22px] select-none"
            style={{ animation: "footerPulse 3s ease-in-out infinite" }}
          >
            🕌
          </span>

          {/* Gregorian year pill */}
          <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3.5 py-1.5 shadow-inner">
            <span className="text-sm leading-none">📅</span>
            <span className="font-lemonada font-bold text-white text-[13px] tabular-nums" style={{ direction: "ltr" }}>
              {GY} م
            </span>
          </div>

        </div>

        {/* ── Credits ──────────────────────────────── */}
        <p className="text-center font-lemonada text-[11px] text-white/55 leading-relaxed">
          {isAr ? "صُنع بـ" : "Crafted with"}{" "}
          <span className="text-red-300 text-sm">❤</span>{" "}
          {isAr ? "بواسطة" : "by"}{" "}
          <span className="font-semibold text-white/80">M.Said</span>
          <span className="mx-2 text-white/25">·</span>
          <span className="text-white/35">
            {isAr ? "جميع الحقوق محفوظة" : "All rights reserved"}
          </span>
        </p>

      </div>
    </footer>
  );
}
