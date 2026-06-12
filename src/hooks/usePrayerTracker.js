import { useState, useEffect, useCallback } from "react";
import moment from "moment";

const TODAY_KEY = () => `prayerTracker_${moment().format("YYYY-MM-DD")}`;
const PRAYERS   = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

export function usePrayerTracker() {
  const [done, setDone] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(TODAY_KEY())) || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(TODAY_KEY(), JSON.stringify(done));
  }, [done]);

  const toggle = useCallback((key) => {
    setDone((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const reset = useCallback(() => setDone({}), []);

  const count    = PRAYERS.filter((p) => done[p]).length;
  const total    = PRAYERS.length;
  const percent  = Math.round((count / total) * 100);

  return { done, toggle, reset, count, total, percent };
}
