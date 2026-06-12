import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { cn } from "../lib/utils";
import { useLang } from "../contexts/LanguageContext";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";

export default function MonthlyView({ open, onClose, city, isGeo, geoCoords, calcMethod }) {
  const { t, lang } = useLang();
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setData(null);
    setError(null);

    const year  = moment().year();
    const month = moment().month() + 1;
    let url;

    if (isGeo && geoCoords) {
      url = `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${geoCoords.lat}&longitude=${geoCoords.lng}&method=${calcMethod}`;
    } else {
      url = `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${encodeURIComponent(city.apiCity)}&country=${city.apiCountry}&method=${calcMethod}`;
    }

    axios.get(url)
      .then((res) => setData(res.data.data))
      .catch(() => setError("Failed to load monthly data."))
      .finally(() => setLoading(false));
  }, [open, city, isGeo, geoCoords, calcMethod]);

  const todayDay = moment().date();

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] flex flex-col gap-3 p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="font-lemonada">
            📅 {t.monthlyTitle}
          </DialogTitle>
          <DialogDescription className="font-lemonada">
            {isGeo ? t.geoCity : (lang === "ar" ? city?.displayAr : city?.displayEn)}
            {" · "}{moment().format("MMMM YYYY")}
          </DialogDescription>
        </DialogHeader>

        {loading && (
          <div className="flex items-center justify-center py-16 gap-3">
            <span className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
            <span className="text-sm text-muted-foreground font-lemonada">{t.loadingMonthly}</span>
          </div>
        )}

        {error && (
          <p className="text-center text-sm text-destructive font-lemonada py-8">{error}</p>
        )}

        {data && !loading && (
          <ScrollArea className="flex-1 max-h-[60vh]">
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm font-lemonada">
                <thead>
                  <tr className="bg-primary/8 border-b sticky top-0 bg-background/95 backdrop-blur-sm">
                    {[t.col.day, t.col.fajr, t.col.sunrise, t.col.dhuhr, t.col.asr, t.col.maghrib, t.col.isha].map((h, i) => (
                      <th
                        key={h}
                        className={cn(
                          "px-2.5 py-2.5 font-semibold text-foreground",
                          i === 0 ? "text-start" : "text-center",
                          i === 2 && "hidden sm:table-cell",
                        )}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((dayData, i) => {
                    const dayNum    = i + 1;
                    const isToday   = dayNum === todayDay;
                    const { timings, date } = dayData;
                    const hijriDay  = date?.hijri?.day;
                    return (
                      <tr
                        key={dayNum}
                        className={cn(
                          "border-b transition-colors",
                          isToday
                            ? "bg-primary/12 dark:bg-primary/15"
                            : dayNum % 2 === 0
                            ? "bg-muted/25 hover:bg-muted/50"
                            : "hover:bg-muted/40",
                        )}
                      >
                        <td className="px-2.5 py-2 text-start">
                          <span className={cn("tabular-nums font-medium", isToday && "text-primary")}>
                            {dayNum}
                          </span>
                          {hijriDay && (
                            <span className="text-muted-foreground ms-1 text-[10px]">({hijriDay})</span>
                          )}
                          {isToday && (
                            <span className="ms-1.5 text-[10px] bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 font-bold">
                              {t.today}
                            </span>
                          )}
                        </td>
                        {[timings.Fajr, timings.Sunrise, timings.Dhuhr, timings.Asr, timings.Maghrib, timings.Isha].map((ti, j) => (
                          <td
                            key={j}
                            className={cn(
                              "px-2.5 py-2 text-center tabular-nums",
                              j === 1 && "hidden sm:table-cell",
                              isToday && "font-semibold text-primary",
                            )}
                            style={{ direction: "ltr" }}
                          >
                            {ti?.slice(0, 5) ?? "--:--"}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
