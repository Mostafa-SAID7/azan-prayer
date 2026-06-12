import { useState, useCallback } from "react";
import { cities } from "../data/cities";

const MAX    = 5;
const STORE  = "prayerFavorites";

function load() {
  try {
    const ids = JSON.parse(localStorage.getItem(STORE)) || [];
    return ids.map((id) => cities.find((c) => c.apiCity === id)).filter(Boolean);
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(load);

  const save = useCallback((list) => {
    setFavorites(list);
    localStorage.setItem(STORE, JSON.stringify(list.map((c) => c.apiCity)));
  }, []);

  const toggle = useCallback((city) => {
    setFavorites((prev) => {
      const exists = prev.some((c) => c.apiCity === city.apiCity);
      const next   = exists
        ? prev.filter((c) => c.apiCity !== city.apiCity)
        : prev.length < MAX ? [...prev, city] : prev;
      localStorage.setItem(STORE, JSON.stringify(next.map((c) => c.apiCity)));
      return next;
    });
  }, []);

  const isFav    = useCallback((city) => favorites.some((c) => c.apiCity === city.apiCity), [favorites]);
  const canAdd   = favorites.length < MAX;

  return { favorites, toggle, isFav, canAdd };
}
