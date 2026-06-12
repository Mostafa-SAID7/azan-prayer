import { useState, useEffect, useCallback, useRef } from "react";
import {
  Box, Divider, Stack, Typography, FormControl, Select, MenuItem,
  InputLabel, TextField, IconButton, Tooltip, Skeleton, Chip,
  Snackbar, Alert, Paper, useTheme, alpha, InputAdornment,
  LinearProgress,
} from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar-dz";
import Prayer from "./Prayer";
import { useLang } from "../contexts/LanguageContext";
import { cities, calculationMethods } from "../data/cities";

const COUNTDOWN_PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const DISPLAY_PRAYERS   = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

const pad = (n) => String(Math.abs(Math.floor(n))).padStart(2, "0");

export default function MainContaint() {
  const theme   = useTheme();
  const isLight = theme.palette.mode === "light";
  const { t, lang } = useLang();

  /* ── State ─────────────────────────────────────────── */
  const [timings,     setTimings]    = useState(null);
  const [dateInfo,    setDateInfo]   = useState({ gregorian: "", hijri: "", hijriEn: "" });
  const [selectCity,  setSelectCity] = useState(cities[0]);
  const [geoCoords,   setGeoCoords]  = useState(null);
  const [isGeo,       setIsGeo]      = useState(false);
  const [geoLoading,  setGeoLoading] = useState(false);
  const [nextPrayerIdx, setNextPrayerIdx]   = useState(0);
  const [activePrayerKey, setActivePrayerKey] = useState(null);
  const [remainingTime, setRemainingTime]   = useState("--:--:--");
  const [loading,     setLoading]   = useState(true);
  const [error,       setError]     = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [calcMethod,  setCalcMethod] = useState(4);
  const [snack,       setSnack]     = useState({ open: false, msg: "", severity: "info" });

  const intervalRef = useRef(null);

  /* ── Filtered cities ───────────────────────────────── */
  const filteredCities = cities.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.displayAr.includes(q) ||
      c.displayEn.toLowerCase().includes(q) ||
      c.apiCountry.toLowerCase().includes(q)
    );
  });

  /* ── Fetch prayer times ────────────────────────────── */
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
      const res = await axios.get(url);
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

  /* ── Countdown engine ──────────────────────────────── */
  const computeCountdown = useCallback(() => {
    if (!timings?.Fajr) return;
    const now = moment();

    // Find next prayer
    let nextIdx = -1;
    for (let i = 0; i < COUNTDOWN_PRAYERS.length; i++) {
      const pt = moment(timings[COUNTDOWN_PRAYERS[i]], "HH:mm");
      if (now.isBefore(pt)) { nextIdx = i; break; }
    }
    const resolvedNextIdx = nextIdx === -1 ? 0 : nextIdx;
    setNextPrayerIdx(resolvedNextIdx);

    // Find active prayer (last passed)
    let activeKey = null;
    for (let i = 0; i < COUNTDOWN_PRAYERS.length; i++) {
      if (now.isAfter(moment(timings[COUNTDOWN_PRAYERS[i]], "HH:mm"))) {
        activeKey = COUNTDOWN_PRAYERS[i];
      }
    }
    setActivePrayerKey(activeKey);

    // Remaining time
    const nxtKey  = COUNTDOWN_PRAYERS[resolvedNextIdx];
    const nxtMom  = moment(timings[nxtKey], "HH:mm");
    let diff = nxtMom.diff(now);
    if (diff < 0) {
      // Crosses midnight → next Fajr
      const tillMidnight = moment("23:59:59", "HH:mm:ss").diff(now) + 1000;
      const fajrFromStart = moment(timings["Fajr"], "HH:mm").diff(moment("00:00:00", "HH:mm:ss"));
      diff = tillMidnight + fajrFromStart;
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

  /* ── Geolocation ───────────────────────────────────── */
  const detectLocation = () => {
    if (!navigator.geolocation) {
      setSnack({ open: true, msg: "Geolocation not supported", severity: "warning" });
      return;
    }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsGeo(true);
        setGeoLoading(false);
        setSnack({ open: true, msg: lang === "ar" ? "✅ تم تحديد موقعك" : "✅ Location detected", severity: "success" });
      },
      () => {
        setGeoLoading(false);
        setSnack({ open: true, msg: t.locationError, severity: "error" });
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  const handleCityChange = (e) => {
    const city = cities.find((c) => c.apiCity === e.target.value);
    if (city) { setSelectCity(city); setIsGeo(false); setGeoCoords(null); }
  };

  /* ── Sunrise approaching? ──────────────────────────── */
  const isSunriseApproaching = (() => {
    if (!timings?.Fajr || !timings?.Sunrise) return false;
    const now = moment();
    return now.isAfter(moment(timings.Fajr, "HH:mm")) && now.isBefore(moment(timings.Sunrise, "HH:mm"));
  })();

  /* ── City display name ─────────────────────────────── */
  const cityLabel = isGeo
    ? t.geoCity
    : lang === "ar"
    ? selectCity.displayAr
    : selectCity.displayEn;

  /* ── Loading skeleton ──────────────────────────────── */
  if (loading) {
    return (
      <Box sx={{ py: 3 }}>
        <LinearProgress color="primary" sx={{ mb: 3, borderRadius: 2, height: 3 }} />
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Skeleton variant="text" width={160} height={32} />
          <Skeleton variant="text" width={200} height={32} />
        </Stack>
        <Skeleton variant="text" width={200} height={24} sx={{ mb: 2 }} />
        <Divider sx={{ mb: 3 }} />
        <Box className="prayers-grid">
          {DISPLAY_PRAYERS.map((k) => (
            <Skeleton key={k} variant="rounded" height={160} sx={{ flex: "1 1 145px", minWidth: 130, maxWidth: 200, borderRadius: 2 }} />
          ))}
        </Box>
        <Typography textAlign="center" color="text.secondary" variant="caption" sx={{ mt: 2, display: "block" }}>
          {t.loading}
        </Typography>
      </Box>
    );
  }

  /* ── Error state ───────────────────────────────────── */
  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 4, borderRadius: 2 }} action={
        <Chip label={lang === "ar" ? "إعادة المحاولة" : "Retry"} size="small" onClick={fetchTimings}
          sx={{ cursor: "pointer", fontFamily: "Lemonada" }} />
      }>
        {error}
      </Alert>
    );
  }

  return (
    <>
      {/* ── Date & City Banner ─────────────────────── */}
      <Paper
        elevation={0}
        sx={{
          mt: 3, mb: 2.5, p: { xs: 2, sm: 3 },
          background: isLight
            ? `linear-gradient(135deg, ${alpha("#107C10", 0.04)} 0%, ${alpha("#107C10", 0.01)} 100%)`
            : `linear-gradient(135deg, ${alpha("#54B054", 0.08)} 0%, ${alpha("#54B054", 0.02)} 100%)`,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 3,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1}
        >
          {/* Left: City + Dates */}
          <Box>
            <Typography
              variant="h4"
              sx={{ fontFamily: "Lemonada", fontWeight: 700, color: "primary.main", lineHeight: 1.2 }}
            >
              {cityLabel}
            </Typography>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mt: 1, flexWrap: "wrap", gap: 0.5 }}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <CalendarMonthIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "Lemonada" }}>
                  {lang === "ar" ? dateInfo.hijri : dateInfo.hijriEn}
                </Typography>
              </Stack>
              <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: "divider", flexShrink: 0 }} />
              <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "Lemonada" }}>
                {dateInfo.gregorian}
              </Typography>
            </Stack>
          </Box>

          {/* Right: Countdown */}
          <Box
            sx={{
              textAlign: { xs: "start", sm: "end" },
              background: isLight ? alpha("#107C10", 0.06) : alpha("#54B054", 0.10),
              px: 2.5, py: 1.5,
              borderRadius: 2.5,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
              minWidth: { sm: 200 },
            }}
          >
            <Stack direction="row" spacing={0.5} alignItems="center" justifyContent={{ xs: "flex-start", sm: "flex-end" }}>
              <AccessTimeIcon sx={{ fontSize: 13, color: "primary.main", opacity: 0.8 }} />
              <Typography
                variant="caption"
                sx={{ fontFamily: "Lemonada", color: "text.secondary", fontSize: "0.72rem" }}
              >
                {t.nextPrayer} {t.prayers[COUNTDOWN_PRAYERS[nextPrayerIdx]]}
              </Typography>
            </Stack>
            <Typography
              className="countdown"
              variant="h3"
              sx={{
                fontFamily: "Lemonada",
                fontWeight: 700,
                color: "primary.main",
                letterSpacing: "0.04em",
                fontSize: { xs: "2rem", sm: "2.4rem" },
                fontVariantNumeric: "tabular-nums",
                mt: 0.25,
                lineHeight: 1.1,
                direction: "ltr",
                textAlign: { xs: "start", sm: "end" },
              }}
            >
              {remainingTime}
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Divider sx={{ mb: 2.5 }} />

      {/* ── Prayer Cards ───────────────────────────── */}
      <Box className="prayers-grid">
        {DISPLAY_PRAYERS.map((key) => (
          <Prayer
            key={key}
            prayerKey={key}
            name={t.prayers[key]}
            time={timings?.[key]}
            isNext={COUNTDOWN_PRAYERS[nextPrayerIdx] === key}
            isActive={
              key === "Sunrise"
                ? isSunriseApproaching
                : activePrayerKey === key
            }
          />
        ))}
      </Box>

      {/* ── Controls ───────────────────────────────── */}
      <Paper
        elevation={0}
        sx={{
          mt: 4, mb: 4, p: { xs: 2, sm: 3 },
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 3,
        }}
      >
        <Stack spacing={2}>
          {/* Row 1: City selector + search */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", sm: "center" }}
          >
            {/* Search field */}
            <TextField
              size="small"
              placeholder={t.searchCity}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position={lang === "ar" ? "end" : "start"}>
                    <SearchIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                  </InputAdornment>
                ),
                sx: { fontFamily: "Lemonada", fontSize: "0.875rem" },
              }}
              sx={{ flex: 1, minWidth: 140, direction: lang === "ar" ? "rtl" : "ltr" }}
            />

            {/* City selector */}
            <FormControl size="small" sx={{ flex: 2, minWidth: 180 }}>
              <InputLabel sx={{ fontFamily: "Lemonada", fontSize: "0.875rem" }}>
                {t.cityLabel}
              </InputLabel>
              <Select
                value={isGeo ? "" : selectCity.apiCity}
                label={t.cityLabel}
                onChange={handleCityChange}
                sx={{ fontFamily: "Lemonada", fontSize: "0.875rem" }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 280,
                      borderRadius: 2.5,
                      border: `1px solid ${theme.palette.divider}`,
                      mt: 0.5,
                    },
                  },
                }}
              >
                {filteredCities.length === 0 ? (
                  <MenuItem disabled sx={{ fontFamily: "Lemonada", fontSize: "0.8rem" }}>
                    {t.noResults}
                  </MenuItem>
                ) : (
                  filteredCities.map((city) => (
                    <MenuItem
                      key={city.apiCity}
                      value={city.apiCity}
                      sx={{ fontFamily: "Lemonada", fontSize: "0.8rem", direction: lang === "ar" ? "rtl" : "ltr" }}
                    >
                      {lang === "ar" ? city.displayAr : city.displayEn}
                      <Box component="span" sx={{ ml: "auto", pl: 1.5, fontSize: "0.7rem", color: "text.secondary", opacity: 0.7 }}>
                        {city.apiCountry}
                      </Box>
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>

            {/* Geolocation button */}
            <Tooltip title={geoLoading ? t.detecting : t.detectLocation} placement="top">
              <span>
                <IconButton
                  onClick={detectLocation}
                  disabled={geoLoading}
                  size="medium"
                  sx={{
                    border: `1.5px solid ${isGeo ? theme.palette.primary.main : theme.palette.divider}`,
                    borderRadius: 2.5,
                    color: isGeo ? "primary.main" : "text.secondary",
                    bgcolor: isGeo ? alpha(theme.palette.primary.main, 0.06) : "transparent",
                    px: 1.5,
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "primary.main",
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                    },
                    ...(geoLoading && { animation: "spin 1s linear infinite",
                      "@keyframes spin": { "100%": { transform: "rotate(360deg)" } } }),
                  }}
                >
                  <MyLocationIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>

          {/* Row 2: Calculation method */}
          <FormControl size="small" fullWidth>
            <InputLabel sx={{ fontFamily: "Lemonada", fontSize: "0.875rem" }}>
              {t.method}
            </InputLabel>
            <Select
              value={calcMethod}
              label={t.method}
              onChange={(e) => setCalcMethod(Number(e.target.value))}
              sx={{ fontFamily: "Lemonada", fontSize: "0.875rem" }}
              MenuProps={{
                PaperProps: { sx: { borderRadius: 2.5, border: `1px solid ${theme.palette.divider}`, mt: 0.5 } },
              }}
            >
              {calculationMethods.map((m) => (
                <MenuItem
                  key={m.id}
                  value={m.id}
                  sx={{ fontFamily: "Lemonada", fontSize: "0.8rem", direction: lang === "ar" ? "rtl" : "ltr" }}
                >
                  {lang === "ar" ? m.nameAr : m.nameEn}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      {/* ── Snackbar ───────────────────────────────── */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snack.severity}
          variant="filled"
          sx={{ borderRadius: 2.5, fontFamily: "Lemonada", fontSize: "0.8rem" }}
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </>
  );
}
