import { useState, useEffect, useRef, useCallback } from "react";
import { playAdhanBeep } from "../lib/utils";

export function useNotifications(timings, prayerNames) {
  const [enabled, setEnabled]     = useState(() => localStorage.getItem("notifEnabled") === "1");
  const [permission, setPermission]= useState(() => Notification?.permission || "default");
  const alertedRef                 = useRef(new Set());

  const requestPermission = useCallback(async () => {
    if (!("Notification" in window)) return;
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === "granted") {
      setEnabled(true);
      localStorage.setItem("notifEnabled", "1");
    }
  }, []);

  const toggleEnabled = useCallback(async () => {
    if (!enabled && permission !== "granted") {
      await requestPermission();
      return;
    }
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem("notifEnabled", next ? "1" : "0");
  }, [enabled, permission, requestPermission]);

  useEffect(() => {
    if (!enabled || !timings || permission !== "granted") return;

    const PRAYERS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
    const todayKey = new Date().toDateString();

    const check = () => {
      const now  = new Date();
      const hhmm = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;

      PRAYERS.forEach((key) => {
        const prayerTime = timings[key];
        if (!prayerTime) return;
        const alertKey = `${todayKey}_${key}`;
        if (prayerTime === hhmm && !alertedRef.current.has(alertKey)) {
          alertedRef.current.add(alertKey);
          playAdhanBeep();
          new Notification(`🕌 ${prayerNames?.[key] || key}`, {
            body: `Prayer time: ${prayerTime}`,
            icon: "/azan-modified.png",
            badge: "/azan-modified.png",
            tag: alertKey,
            requireInteraction: false,
          });
        }
      });
    };

    const id = setInterval(check, 30000);
    check();
    return () => clearInterval(id);
  }, [enabled, timings, permission, prayerNames]);

  return { enabled, permission, toggleEnabled, requestPermission };
}
