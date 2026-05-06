"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "lightGreen" | "dark" | "system";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("lightGreen");

 useEffect(() => {
  const root = document.documentElement;

  if (theme === "lightGreen") {
    root.setAttribute("data-theme", "lightgreen");
  } else if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
  }
}, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
