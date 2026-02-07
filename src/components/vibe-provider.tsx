"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useTheme } from "./theme-provider";

type Vibe = "CHILL" | "ENERGIZED" | "CREATIVE" | "DREAMY";

const VibeContext = createContext<{
  vibe: Vibe;
  setVibe: (v: Vibe) => void;
}>({
  vibe: "CHILL",
  setVibe: () => {},
});

export const useVibe = () => useContext(VibeContext);

export function VibeProvider({ children }: { children: React.ReactNode }) {
  const [vibe, setVibe] = useState<Vibe>("CHILL");
  const { isNight } = useTheme();

  useEffect(() => {
    // Auto-vibe logic
    if (isNight) {
      setVibe("DREAMY");
    } else {
      setVibe("ENERGIZED");
    }
  }, [isNight]);

  return (
    <VibeContext.Provider value={{ vibe, setVibe }}>
      <div className={`vibe-container vibe-${vibe.toLowerCase()}`}>
        {children}
      </div>
    </VibeContext.Provider>
  );
}
