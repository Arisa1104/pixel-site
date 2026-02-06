"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "night";

const ThemeContext = createContext<{
  theme: Theme;
  isNight: boolean;
}>({
  theme: "light",
  isNight: false,
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // Check Ohio time (EST/EDT)
    // For simplicity, we'll use UTC offset -5 (EST) or -4 (EDT)
    // Feb is EST (-5). UTC 22:00 is 17:00 (5 PM) EST.
    // Let's say Night starts at 7 PM (19:00) EST and ends at 7 AM EST.
    // 7 PM EST = 00:00 UTC
    // 7 AM EST = 12:00 UTC

    const updateTheme = () => {
      const now = new Date();
      const hour = now.getUTCHours();
      
      // Night: 00:00 UTC to 12:00 UTC (approx 7 PM to 7 AM Ohio)
      const isNightTime = hour >= 0 && hour < 12;
      
      if (isNightTime) {
        setTheme("night");
        document.documentElement.classList.add("night-mode");
      } else {
        setTheme("light");
        document.documentElement.classList.remove("night-mode");
      }
    };

    updateTheme();
    const interval = setInterval(updateTheme, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isNight: theme === "night" }}>
      {children}
    </ThemeContext.Provider>
  );
}
