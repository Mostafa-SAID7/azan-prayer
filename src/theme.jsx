import { createContext, useContext, useState, useEffect } from "react";

export const ColorModeContext = createContext({
  mode: "light",
  toggleColorMode: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(
    () => localStorage.getItem("mode") || "light"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("mode", next);
      return next;
    });
  };

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
}
