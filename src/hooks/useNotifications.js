import { useState, useEffect, useRef, useCallback } from "react";
import { playAdhanBeep } from "../lib/utils";
import { STORAGE, NOTIF_CHECK_MS, DISPLAY_PRAYERS } from "../data/constants";

export function useNotifications(timings, prayerNames) {
  const [enabled,    setEnabled]    = useState(() => localStorage.getItem(STORAGE.NOTIF) === "1");
  const [permission, setPermission] = useState(() => Notification?.permission ?? "default");
  const alertedRef                  = useRef(new Set());

  const requestPermission = useCallback(async () => {
    if (!("Notification" in window)) return;
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === "granted") {
      setEnabled(true);
      localStorage.setItem(STORAGE.NOTIF, "1");
    }
  }, []);

  const toggleEnabled = useCallback(async () => {
    if (!enabled && permission !== "granted") {
      await requestPermission();
      return;
    }
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem(STORAGE.NOTIF, next ? "1" : "0");
  }, [enabled, permission, requestPermission]);

  useEffect(() => {
    if (!enabled || !timings || permission !== "granted") return;

    const todayKey = new Date().toDateString();

    const check = () => {
      const now  = new Date();
      const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

      DISPLAY_PRAYERS.forEach((key) => {
        const prayerTime = timings[key];
        if (!prayerTime) return;
        const alertKey = `${todayKey}_${key}`;
        if (prayerTime === hhmm && !alertedRef.current.has(alertKey)) {
          alertedRef.current.add(alertKey);
          playAdhanBeep();
          new Notification(`🕌 ${prayerNames?.[key] ?? key}`, {
            body:              `${prayerNames?.[key] ?? key}: ${prayerTime}`,
            icon:              "/azan-modified.png",
            badge:             "/azan-modified.png",
            tag:               alertKey,
            requireInteraction: false,
          });
        }
      });
    };

    const id = setInterval(check, NOTIF_CHECK_MS);
    check();
    return () => clearInterval(id);
  }, [enabled, timings, permission, prayerNames]);

  return { enabled, permission, toggleEnabled, requestPermission };
}
