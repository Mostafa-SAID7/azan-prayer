import { useState, useCallback } from "react";
import { cities } from "../data/cities";
import { STORAGE, MAX_FAVORITES } from "../data/constants";

function loadFromStorage() {
  try {
    const ids = JSON.parse(localStorage.getItem(STORAGE.FAVORITES)) || [];
    return ids.map((id) => cities.find((c) => c.apiCity === id)).filter(Boolean);
  } catch {
    return [];
  }
}

function saveToStorage(list) {
  localStorage.setItem(STORAGE.FAVORITES, JSON.stringify(list.map((c) => c.apiCity)));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(loadFromStorage);

  const toggle = useCallback((city) => {
    setFavorites((prev) => {
      const exists = prev.some((c) => c.apiCity === city.apiCity);
      const next   = exists
        ? prev.filter((c) => c.apiCity !== city.apiCity)
        : prev.length < MAX_FAVORITES
        ? [...prev, city]
        : prev;
      saveToStorage(next);
      return next;
    });
  }, []);

  const isFav  = useCallback((city) => favorites.some((c) => c.apiCity === city.apiCity), [favorites]);
  const canAdd = favorites.length < MAX_FAVORITES;

  return { favorites, toggle, isFav, canAdd };
}
