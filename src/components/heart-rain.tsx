'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export function HeartRain() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  const addHeart = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random();
    const size = Math.random() * 12 + 6;
    const colors = ['#d33682', '#ffc1e3', '#e91e63', '#f48fb1'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    setHearts((prev) => [...prev, { id, x, y, size, color }].slice(-15)); // Limit to 15 hearts for performance
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Only add a heart every 5th movement to keep it subtle
      if (Math.random() > 0.8) {
        addHeart(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [addHeart]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 0.8, scale: 0, x: heart.x - heart.size / 2, y: heart.y - heart.size / 2 }}
            animate={{ 
              opacity: 0, 
              scale: 1, 
              y: heart.y + 100, 
              rotate: Math.random() * 90 - 45 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ position: 'absolute' }}
          >
            {/* Pixelated Heart SVG */}
            <svg
              width={heart.size}
              height={heart.size}
              viewBox="0 0 8 8"
              fill={heart.color}
              xmlns="http://www.w3.org/2000/svg"
              style={{ imageRendering: 'pixelated' }}
            >
              <path d="M2 1H3V2H2V1Z" />
              <path d="M5 1H6V2H5V1Z" />
              <path d="M1 2H2V3H1V2Z" />
              <path d="M3 2H5V3H3V2Z" />
              <path d="M6 2H7V3H6V2Z" />
              <path d="M1 3H2V4H1V3Z" />
              <path d="M7 3H8V4H7V3Z" />
              <path d="M2 4H3V5H2V4Z" />
              <path d="M5 4H6V5H5V4Z" />
              <path d="M3 5H5V6H3V5Z" />
              <path d="M4 6V7H5V6H4Z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
