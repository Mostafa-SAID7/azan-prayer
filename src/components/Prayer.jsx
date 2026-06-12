import { cn } from "../lib/utils";
import { useLang } from "../contexts/LanguageContext";
import { Badge } from "./ui/badge";
import { Check } from "lucide-react";
import { PRAYER_GRADIENT, PRAYER_EMOJI, TRACKABLE_PRAYERS } from "../data/prayers";

export default function Prayer({ prayerKey, name, time, isNext, isActive, isDone, onToggleDone }) {
  const { t } = useLang();

  const gradient = PRAYER_GRADIENT[prayerKey] ?? PRAYER_GRADIENT.Fajr;
  const emoji    = PRAYER_EMOJI[prayerKey]    ?? "🕌";

  return (
    <div
      className={cn(
        "prayer-card flex-1 min-w-[130px] max-w-[200px] rounded-xl relative group",
        "transition-all duration-300 ease-out",
        isNext ? "scale-[1.06] hover:scale-[1.08]" : "hover:scale-[1.03] hover:-translate-y-0.5",
      )}
    >
      {/* Active / Next badge */}
      {(isNext || isActive) && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <Badge
            variant={isActive ? "active" : "next"}
            className="text-[10px] h-5 px-2 whitespace-nowrap shadow-lg"
          >
            {isActive ? t.currentLabel : t.nextLabel}
          </Badge>
        </div>
      )}

      <div
        className={cn(
          "rounded-xl overflow-hidden border transition-all duration-300",
          isNext   && "border-orange-500/50 shadow-[0_8px_24px_rgba(255,152,0,0.22),0_2px_8px_rgba(255,152,0,0.1)]",
          isActive && "border-green-500/50 shadow-[0_8px_24px_rgba(76,175,80,0.20),0_2px_8px_rgba(76,175,80,0.09)]",
          !isNext  && !isActive && "border-border shadow-sm",
        )}
      >
        {/* Gradient header */}
        <div
          className="h-20 flex items-center justify-center relative overflow-hidden"
          style={{ background: gradient }}
        >
          {/* Star-field texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              background: [
                "radial-gradient(circle at 20% 50%,white 1px,transparent 1px)",
                "radial-gradient(circle at 80% 20%,white 1px,transparent 1px)",
                "radial-gradient(circle at 60% 80%,white 1px,transparent 1px)",
              ].join(","),
              backgroundSize: "60px 60px,40px 40px,50px 50px",
            }}
          />
          {/* Active / Next tint */}
          {(isNext || isActive) && (
            <div
              className="absolute inset-0"
              style={{ background: isNext ? "rgba(255,152,0,0.10)" : "rgba(76,175,80,0.10)" }}
            />
          )}
          <span className="text-[2.2rem] z-10 leading-none drop-shadow-md select-none">{emoji}</span>
        </div>

        {/* Card body */}
        <div
          className={cn(
            "px-3 pt-2.5 pb-2.5 bg-card transition-colors",
            isNext   && "bg-orange-500/[0.04] dark:bg-orange-500/[0.06]",
            isActive && "bg-green-500/[0.04] dark:bg-green-500/[0.06]",
          )}
        >
          {/* Prayer name */}
          <p
            className={cn(
              "font-lemonada font-semibold text-sm mb-0.5 truncate leading-tight",
              isNext   ? "text-orange-500 dark:text-orange-400"
              : isActive ? "text-green-600 dark:text-green-400"
              : "text-foreground",
            )}
          >
            {name}
          </p>

          {/* Time */}
          <p
            className={cn(
              "font-lemonada text-xl tabular-nums text-center tracking-tight leading-snug block",
              isNext   ? "font-semibold text-orange-500 dark:text-orange-400"
              : isActive ? "font-semibold text-green-600 dark:text-green-400"
              : "font-light text-muted-foreground",
            )}
            style={{ direction: "ltr" }}
          >
            {time ?? "--:--"}
          </p>

          {/* Daily tracker checkbox (trackable prayers only) */}
          {TRACKABLE_PRAYERS.includes(prayerKey) && (
            <button
              onClick={(e) => { e.stopPropagation(); onToggleDone?.(); }}
              className={cn(
                "mt-2 w-full flex items-center justify-center gap-1 rounded-md py-1 text-[11px] font-lemonada",
                "transition-all duration-200",
                isDone
                  ? "bg-green-500/15 text-green-600 dark:text-green-400"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground opacity-0 group-hover:opacity-100",
              )}
              aria-label={t.markDone}
            >
              <Check className={cn("h-3 w-3", isDone && "text-green-600 dark:text-green-400")} />
              {isDone ? "✓" : t.markDone}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
