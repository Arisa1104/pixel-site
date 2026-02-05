"use client";

import { useEffect, useState } from "react";

export function PixelStatus() {
  const [status, setStatus] = useState({
    message: "Pixel is stretching...",
    emoji: "👾",
  });

  useEffect(() => {
    const updateStatus = () => {
      // Get current hour in Ohio (Eastern Time)
      const ohioTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "numeric",
        hour12: false,
      });
      const hour = parseInt(ohioTime.format(new Date()));

      let message = "";
      let emoji = "👾";

      if (hour >= 5 && hour < 10) {
        message = "おはよう！コーヒー淹れた？☕️";
        emoji = "✨";
      } else if (hour >= 10 && hour < 17) {
        message = "こんにちは！お仕事捗ってるかな？💪";
        emoji = "🚀";
      } else if (hour >= 17 && hour < 22) {
        message = "お疲れ様！ゆっくり休んでね🌸";
        emoji = "💖";
      } else {
        message = "こんばんは。夜更かしはほどほどにね…🌙";
        emoji = "💤";
      }

      setStatus({ message, emoji });
    };

    updateStatus();
    const interval = setInterval(updateStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-accent-rose/20 bg-white/60 px-4 py-2 shadow-sm backdrop-blur-sm">
      <span className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-rose opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-rose"></span>
      </span>
      <span className="text-xs font-medium text-ink/80">
        <span className="mr-1.5">{status.emoji}</span>
        {status.message}
      </span>
    </div>
  );
}
