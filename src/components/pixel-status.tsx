"use client";

import { useEffect, useState } from "react";

export function PixelStatus() {
  const [status, setStatus] = useState({
    message: "Pixel is stretching...",
    emoji: "👾",
    weather: "",
  });

  useEffect(() => {
    const updateStatus = async () => {
      // 1. Get current hour in Ohio
      const ohioTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "numeric",
        hour12: false,
      });
      const hour = parseInt(ohioTime.format(new Date()));

      // 2. Fetch Weather for Oberlin, OH
      let weatherEmoji = "";
      let weatherText = "";
      try {
        const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=41.29&longitude=-82.22&current_weather=true&temperature_unit=fahrenheit");
        const data = await res.json();
        const code = data.current_weather.weathercode;
        const temp = Math.round(data.current_weather.temperature);

        // Map WMO codes
        if (code <= 1) weatherEmoji = "☀️";
        else if (code <= 3) weatherEmoji = "☁️";
        else if (code <= 48) weatherEmoji = "🌫️";
        else if (code <= 67) weatherEmoji = "🌧️";
        else if (code <= 77) weatherEmoji = "❄️";
        else weatherEmoji = "⛈️";
        
        weatherText = `${temp}°F`;
      } catch (e) {
        console.error("Weather fetch failed", e);
      }

      let timeMessage = "";
      let pixelEmoji = "👾";

      if (hour >= 5 && hour < 10) {
        timeMessage = "おはよう！コーヒー淹れた？☕️";
        pixelEmoji = "✨";
      } else if (hour >= 10 && hour < 17) {
        timeMessage = "こんにちは！お仕事捗ってるかな？💪";
        pixelEmoji = "🚀";
      } else if (hour >= 17 && hour < 22) {
        timeMessage = "お疲れ様！ゆっくり休んでね🌸";
        pixelEmoji = "💖";
      } else {
        timeMessage = "こんばんは。夜更かしはほどほどにね…🌙";
        pixelEmoji = "💤";
      }

      setStatus({ 
        message: timeMessage, 
        emoji: pixelEmoji,
        weather: weatherText ? `${weatherEmoji} ${weatherText}` : ""
      });
    };

    updateStatus();
    const interval = setInterval(updateStatus, 600000); // Update every 10 mins
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-2">
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
      
      {status.weather && (
        <div className="ml-4 inline-flex items-center gap-2 text-[10px] font-sans tracking-wider uppercase text-ink/40">
          <span>Ohio Status:</span>
          <span className="font-bold text-accent-rose/60">{status.weather}</span>
        </div>
      )}
    </div>
  );
}
