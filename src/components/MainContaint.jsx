import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar-dz";
import { cn, playAdhanBeep } from "../lib/utils";
import { useLang } from "../contexts/LanguageContext";
import { cities, calculationMethods } from "../data/cities";
import { usePrayerTracker } from "../hooks/usePrayerTracker";
import { useNotifications } from "../hooks/useNotifications";
import { useFavorites } from "../hooks/useFavorites";
import Prayer from "./Prayer";
import MonthlyView from "./MonthlyView";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
  MapPin, Search, CalendarDays, Share2, Bell, BellOff,
  Star, Music2, CheckCircle2, AlertCircle,
} from "lucide-react";

const COUNTDOWN_PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const DISPLAY_PRAYERS   = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
const pad = (n) => String(Math.abs(Math.floor(n))).padStart(2, "0");

export default function MainContaint() {
  const { t, lang } = useLang();

  /* ── Core state ─────────────────────────────────────────── */
  const [timings,       setTimings]       = useState(null);
  const [dateInfo,      setDateInfo]      = useState({ gregorian: "", hijri: "", hijriEn: "" });
  const [selectCity,    setSelectCity]    = useState(cities[0]);
  const [geoCoords,     setGeoCoords]     = useState(null);
  const [isGeo,         setIsGeo]         = useState(false);
  const [geoLoading,    setGeoLoading]    = useState(false);
  const [nextPrayerIdx, setNextPrayerIdx] = useState(0);
  const [activePrayerKey, setActivePrayerKey] = useState(null);
  const [remainingTime, setRemainingTime] = useState("--:--:--");
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(null);
  const [searchQuery,   setSearchQuery]   = useState("");
  const [calcMethod,    setCalcMethod]    = useState(4);
  const [monthlyOpen,   setMonthlyOpen]   = useState(false);
  const [shareSuccess,  setShareSuccess]  = useState(false);

  const intervalRef = useRef(null);

  /* ── Feature hooks ───────────────────────────────────────── */
  const { done, toggle: trackerToggle, count: doneCount, total: doneTotal, percent: donePercent } = usePrayerTracker();
  const { favorites, toggle: toggleFav, isFav }                                                   = useFavorites();
  const { enabled: notifEnabled, toggleEnabled: toggleNotif }                                     = useNotifications(timings, t.prayers);

  /* ── Filtered cities ─────────────────────────────────────── */
  const filteredCities = cities.filter((c) => {
    const q = searchQuery.toLowerCase();
    return c.displayAr.includes(q) || c.displayEn.toLowerCase().includes(q) || c.apiCountry.toLowerCase().includes(q);
  });

  /* ── Fetch prayer times ──────────────────────────────────── */
  const fetchTimings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let url;
      if (isGeo && geoCoords) {
        const dateStr = moment().format("DD-MM-YYYY");
        url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${geoCoords.lat}&longitude=${geoCoords.lng}&method=${calcMethod}`;
      } else {
        url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(selectCity.apiCity)}&country=${selectCity.apiCountry}&method=${calcMethod}`;
      }
      const res  = await axios.get(url);
      const data = res.data.data;
      setTimings(data.timings);
      const g = data.date.gregorian;
      const h = data.date.hijri;
      setDateInfo({
        gregorian: `${g.weekday.en}, ${g.day} ${g.month.en} ${g.year}`,
        hijri:     `${h.day} ${h.month.ar} ${h.year} هـ`,
        hijriEn:   `${h.day} ${h.month.en} ${h.year} AH`,
      });
    } catch {
      setError("Failed to load prayer times. Check your connection.");
    } finally {
      setLoading(false);
    }
  }, [selectCity, geoCoords, isGeo, calcMethod]);

  useEffect(() => { fetchTimings(); }, [fetchTimings]);

  /* ── Countdown engine ────────────────────────────────────── */
  const computeCountdown = useCallback(() => {
    if (!timings?.Fajr) return;
    const now = moment();
    let nextIdx = -1;
    for (let i = 0; i < COUNTDOWN_PRAYERS.length; i++) {
      if (now.isBefore(moment(timings[COUNTDOWN_PRAYERS[i]], "HH:mm"))) { nextIdx = i; break; }
    }
    const rni = nextIdx === -1 ? 0 : nextIdx;
    setNextPrayerIdx(rni);

    let activeKey = null;
    for (let i = 0; i < COUNTDOWN_PRAYERS.length; i++) {
      if (now.isAfter(moment(timings[COUNTDOWN_PRAYERS[i]], "HH:mm"))) activeKey = COUNTDOWN_PRAYERS[i];
    }
    setActivePrayerKey(activeKey);

    const nxtMom = moment(timings[COUNTDOWN_PRAYERS[rni]], "HH:mm");
    let diff = nxtMom.diff(now);
    if (diff < 0) {
      diff = moment("23:59:59","HH:mm:ss").diff(now) + 1000
           + moment(timings.Fajr,"HH:mm").diff(moment("00:00:00","HH:mm:ss"));
    }
    const dur = moment.duration(diff);
    setRemainingTime(`${pad(dur.hours())}:${pad(dur.minutes())}:${pad(dur.seconds())}`);
  }, [timings]);

  useEffect(() => {
    if (!timings) return;
    computeCountdown();
    intervalRef.current = setInterval(computeCountdown, 1000);
    return () => clearInterval(intervalRef.current);
  }, [timings, computeCountdown]);

  /* ── Geolocation ─────────────────────────────────────────── */
  const detectLocation = () => {
    if (!navigator.geolocation) return;
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => { setGeoCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setIsGeo(true); setGeoLoading(false); },
      () => setGeoLoading(false),
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  /* ── Share ───────────────────────────────────────────────── */
  const handleShare = async () => {
    if (!timings) return;
    const lines = DISPLAY_PRAYERS.map((k) => `${t.prayers[k]}: ${timings[k] || "--:--"}`);
    const text  = `${t.shareMsg} — ${cityLabel}\n${dateInfo.gregorian}\n\n${lines.join("\n")}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: t.shareTitle, text });
      } else {
        await navigator.clipboard.writeText(text);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      }
    } catch {}
  };

  const isSunriseApproaching = (() => {
    if (!timings?.Fajr || !timings?.Sunrise) return false;
    const now = moment();
    return now.isAfter(moment(timings.Fajr,"HH:mm")) && now.isBefore(moment(timings.Sunrise,"HH:mm"));
  })();

  const cityLabel = isGeo ? t.geoCity : (lang === "ar" ? selectCity.displayAr : selectCity.displayEn);

  /* ── Loading skeleton ────────────────────────────────────── */
  if (loading) return <LoadingSkeleton t={t} />;

  /* ── Error state ─────────────────────────────────────────── */
  if (error) {
    return (
      <div className="mt-6 rounded-xl border border-destructive/40 bg-destructive/8 p-4 flex items-start gap-3"
           style={{ animation: "fadeInUp 0.4s ease both" }}>
        <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-lemonada text-destructive">{error}</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchTimings} className="shrink-0">
          {t.retry}
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* ── City / Date Banner ──────────────────────────────── */}
      <div
        className="mt-5 rounded-2xl border bg-gradient-to-br from-primary/[0.06] to-primary/[0.02] p-4 sm:p-5"
        style={{ animation: "slideInDown 0.5s cubic-bezier(0.34,1.2,0.64,1) both" }}
      >
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Left: city + dates */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-lemonada font-bold text-[1.85rem] sm:text-[2.2rem] text-primary leading-tight">
                {cityLabel}
              </h2>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => !isGeo && toggleFav(selectCity)}
                    disabled={isGeo}
                    className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors disabled:opacity-30"
                  >
                    {isFav(selectCity) && !isGeo
                      ? <Star className="h-4 w-4 text-yellow-500 fill-yellow-400" />
                      : <Star className="h-4 w-4 text-muted-foreground" />}
                  </button>
                </TooltipTrigger>
                <TooltipContent>{isFav(selectCity) && !isGeo ? t.removeFavorite : t.addFavorite}</TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2 mt-1 flex-wrap font-lemonada text-xs text-muted-foreground">
              <span>📅 {lang === "ar" ? dateInfo.hijri : dateInfo.hijriEn}</span>
              <span className="h-1 w-1 rounded-full bg-border shrink-0" />
              <span>{dateInfo.gregorian}</span>
            </div>
          </div>

          {/* Right: countdown */}
          <div className="rounded-xl bg-primary/[0.07] border border-primary/20 px-4 py-3 min-w-[200px] sm:text-end">
            <div className="flex items-center gap-1.5 sm:justify-end text-[11px] text-muted-foreground font-lemonada mb-1">
              <span>⏱</span>
              <span>{t.nextPrayer} {t.prayers[COUNTDOWN_PRAYERS[nextPrayerIdx]]}</span>
            </div>
            <div
              key={remainingTime}
              className="font-lemonada font-bold text-primary tabular-nums leading-none"
              style={{
                fontSize: "clamp(1.8rem,5vw,2.4rem)",
                direction: "ltr",
                animation: "countdownTick 1s ease both",
              }}
            >
              {remainingTime}
            </div>
            <button
              onClick={playAdhanBeep}
              className="mt-2 text-[11px] font-lemonada text-primary/60 hover:text-primary flex items-center gap-1 sm:ms-auto transition-colors"
            >
              <Music2 className="h-3 w-3" />
              {t.playAdhan}
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats / Action Bar ──────────────────────────────── */}
      <div
        className="mt-3 rounded-xl border bg-card p-3 flex items-center gap-3"
        style={{ animation: "fadeInUp 0.45s ease 0.06s both" }}
      >
        {/* Tracker progress */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-lemonada font-medium text-foreground">{t.trackerTitle}</span>
            <span className="text-xs text-muted-foreground font-lemonada">
              {doneCount}/{doneTotal} {t.prayersDone}
            </span>
          </div>
          <Progress value={donePercent} className="h-1.5" />
        </div>

        {/* Action buttons */}
        <div className="flex gap-1.5 shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleNotif}
                className={cn(
                  "p-2 rounded-lg border text-sm transition-all duration-200",
                  notifEnabled
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-transparent border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {notifEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
              </button>
            </TooltipTrigger>
            <TooltipContent>{notifEnabled ? t.notifOn : t.notifOff}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setMonthlyOpen(true)}
                className="p-2 rounded-lg border bg-transparent border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
              >
                <CalendarDays className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>{t.monthlyView}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleShare}
                className={cn(
                  "p-2 rounded-lg border transition-all duration-200",
                  shareSuccess
                    ? "bg-green-500/12 border-green-500/30 text-green-600 dark:text-green-400"
                    : "bg-transparent border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {shareSuccess ? <CheckCircle2 className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
              </button>
            </TooltipTrigger>
            <TooltipContent>{shareSuccess ? t.copied : t.share}</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* ── Favorites bar ───────────────────────────────────── */}
      {favorites.length > 0 && (
        <div
          className="mt-2 flex gap-2 flex-wrap"
          style={{ animation: "fadeInUp 0.4s ease 0.1s both" }}
        >
          {favorites.map((city) => (
            <button
              key={city.apiCity}
              onClick={() => { setSelectCity(city); setIsGeo(false); setGeoCoords(null); }}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-lemonada border transition-all duration-200",
                selectCity.apiCity === city.apiCity && !isGeo
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-accent"
              )}
            >
              {lang === "ar" ? city.displayAr : city.displayEn}
            </button>
          ))}
        </div>
      )}

      <Separator className="my-4" />

      {/* ── Prayer Cards Grid ───────────────────────────────── */}
      <div className="prayers-grid">
        {DISPLAY_PRAYERS.map((key) => (
          <Prayer
            key={key}
            prayerKey={key}
            name={t.prayers[key]}
            time={timings?.[key]}
            isNext={COUNTDOWN_PRAYERS[nextPrayerIdx] === key}
            isActive={key === "Sunrise" ? isSunriseApproaching : activePrayerKey === key}
            isDone={done[key]}
            onToggleDone={() => trackerToggle(key)}
          />
        ))}
      </div>

      {/* ── Controls Panel ──────────────────────────────────── */}
      <div
        className="mt-6 rounded-2xl border bg-card p-4 sm:p-5 space-y-3"
        style={{ animation: "slideInUp 0.5s cubic-bezier(0.34,1.2,0.64,1) 0.18s both" }}
      >
        {/* Row 1: search + city selector + geo */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchCity}
              className="ps-8 h-9 text-sm"
              dir={lang === "ar" ? "rtl" : "ltr"}
            />
          </div>

          <div className="flex-[2] min-w-0">
            <Select
              value={isGeo ? "" : selectCity.apiCity}
              onValueChange={(val) => {
                const city = cities.find((c) => c.apiCity === val);
                if (city) { setSelectCity(city); setIsGeo(false); setGeoCoords(null); }
              }}
            >
              <SelectTrigger className="h-9 text-sm w-full">
                <SelectValue placeholder={t.cityLabel} />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {filteredCities.length === 0 ? (
                  <div className="py-5 text-center text-sm text-muted-foreground font-lemonada">
                    {t.noResults}
                  </div>
                ) : (
                  filteredCities.map((city) => (
                    <SelectItem key={city.apiCity} value={city.apiCity}>
                      {lang === "ar" ? city.displayAr : city.displayEn}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={detectLocation}
                disabled={geoLoading}
                className={cn("h-9 w-9 shrink-0", isGeo && "border-primary text-primary bg-primary/8")}
              >
                {geoLoading
                  ? <span className="h-3.5 w-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  : <MapPin className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{geoLoading ? t.detecting : t.detectLocation}</TooltipContent>
          </Tooltip>
        </div>

        {/* Row 2: calculation method */}
        <Select value={String(calcMethod)} onValueChange={(v) => setCalcMethod(Number(v))}>
          <SelectTrigger className="h-9 text-sm w-full">
            <SelectValue placeholder={t.method} />
          </SelectTrigger>
          <SelectContent>
            {calculationMethods.map((m) => (
              <SelectItem key={m.id} value={String(m.id)}>
                {lang === "ar" ? m.nameAr : m.nameEn}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ── Monthly view dialog ─────────────────────────────── */}
      <MonthlyView
        open={monthlyOpen}
        onClose={() => setMonthlyOpen(false)}
        city={selectCity}
        isGeo={isGeo}
        geoCoords={geoCoords}
        calcMethod={calcMethod}
      />
    </>
  );
}

/* ── Loading skeleton ─────────────────────────────────────── */
function LoadingSkeleton({ t }) {
  const sk = "animate-pulse bg-muted rounded-lg";
  return (
    <div className="py-4 space-y-4">
      <div className={`${sk} h-1 w-full rounded-full`} />

      {/* Banner */}
      <div className="rounded-2xl border p-4 sm:p-5" style={{ animation: "skeletonFadeUp 0.4s ease 0.05s both" }}>
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="space-y-2.5">
            <div className={`${sk} h-9 w-44`} />
            <div className="flex gap-2">
              <div className={`${sk} h-3.5 w-28`} />
              <div className={`${sk} h-3.5 w-32`} />
            </div>
          </div>
          <div className="border rounded-xl p-3 space-y-2 min-w-[180px]">
            <div className={`${sk} h-3.5 w-32`} />
            <div className={`${sk} h-11 w-40`} />
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border rounded-xl p-3 flex gap-3" style={{ animation: "skeletonFadeUp 0.4s ease 0.08s both" }}>
        <div className="flex-1 space-y-2">
          <div className="flex justify-between">
            <div className={`${sk} h-3.5 w-28`} />
            <div className={`${sk} h-3.5 w-14`} />
          </div>
          <div className={`${sk} h-1.5 w-full rounded-full`} />
        </div>
        <div className="flex gap-1.5">
          {[0,1,2].map(i=><div key={i} className={`${sk} h-8 w-8 rounded-lg`}/>)}
        </div>
      </div>

      {/* Prayer cards */}
      <div className="prayers-grid">
        {DISPLAY_PRAYERS.map((k, i) => (
          <div
            key={k}
            className="flex-1 min-w-[130px] max-w-[200px] rounded-xl overflow-hidden border"
            style={{ animation: `skeletonFadeUp 0.4s ease ${0.1 + i * 0.055}s both` }}
          >
            <div className={`${sk} h-20 rounded-none`} />
            <div className="p-3 space-y-2 bg-card">
              <div className={`${sk} h-3.5 w-16`} />
              <div className={`${sk} h-7 w-20`} />
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="border rounded-2xl p-4 space-y-3" style={{ animation: "skeletonFadeUp 0.4s ease 0.45s both" }}>
        <div className="flex gap-2.5">
          <div className={`${sk} h-9 flex-1`} />
          <div className={`${sk} h-9 flex-[2]`} />
          <div className={`${sk} h-9 w-9`} />
        </div>
        <div className={`${sk} h-9 w-full`} />
      </div>

      <p className="text-center text-xs text-muted-foreground font-lemonada">{t.loading}</p>
    </div>
  );
}
