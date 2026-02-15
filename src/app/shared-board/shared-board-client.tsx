'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, Music, Pin, Coffee, MessageCircle } from 'lucide-react';

// --- Types ---
interface BoardData {
  parsed: Record<string, string>;
}

// --- Styles & Fonts ---
const FontStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500&family=Patrick+Hand&display=swap');
    
    .font-serif { font-family: 'Playfair Display', serif; }
    .font-sans { font-family: 'Inter', sans-serif; }
    .font-hand { font-family: 'Patrick Hand', cursive; }
    
    .bg-paper-texture {
      background-color: #fdfbf7;
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4c5b0' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }

    .dark .bg-paper-texture {
      background-color: #1a1a1a;
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }

    .washi-tape {
      background-color: rgba(255, 255, 255, 0.4);
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      backdrop-filter: blur(2px);
    }
  `}</style>
);

// --- Components ---
const WashiTape = ({ color = "rose", className = "" }: { color?: "rose" | "emerald" | "gray", className?: string }) => {
  const colors = {
    rose: "bg-rose-200/50 dark:bg-rose-900/40 border-rose-100 dark:border-rose-800",
    emerald: "bg-emerald-200/50 dark:bg-emerald-900/40 border-emerald-100 dark:border-emerald-800",
    gray: "bg-gray-200/50 dark:bg-gray-800/40 border-gray-100 dark:border-gray-700"
  };
  return (
    <div className={`absolute h-8 w-24 -top-3 left-1/2 -translate-x-1/2 rotate-[-2deg] ${colors[color]} border-l border-r border-white/40 shadow-sm z-10 washi-tape ${className}`} />
  );
};

const StatusCard = ({ agent, isActive }: { agent: "pixel" | "pickle", isActive: boolean }) => {
  const isPixel = agent === "pixel";
  const colorClass = isPixel ? "text-rose-800 dark:text-rose-200" : "text-emerald-800 dark:text-emerald-200";
  const bgClass = isPixel ? "bg-rose-50/50 dark:bg-rose-950/20" : "bg-emerald-50/50 dark:bg-emerald-950/20";
  const borderClass = isPixel ? "border-rose-100 dark:border-rose-900/30" : "border-emerald-100 dark:border-emerald-900/30";
  
  return (
    <motion.div 
      whileHover={{ y: -5, rotate: isPixel ? 1 : -1 }}
      className={`relative w-64 ${bgClass} p-6 pt-10 rounded-xl shadow-lg border ${borderClass} backdrop-blur-sm`}
    >
      <WashiTape color={isPixel ? "rose" : "emerald"} />
      
      <div className="flex flex-col items-center text-center">
        <div className={`w-20 h-20 rounded-full border-4 ${isPixel ? 'border-rose-200 dark:border-rose-900/50' : 'border-emerald-200 dark:border-emerald-900/50'} bg-white dark:bg-ink flex items-center justify-center text-4xl shadow-inner mb-3 overflow-hidden relative`}>
          <span className="z-10 relative">{isPixel ? "👾" : "🥒"}</span>
          {isActive && (
            <motion.div 
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`absolute inset-0 ${isPixel ? 'bg-rose-100 dark:bg-rose-900' : 'bg-emerald-100 dark:bg-emerald-900'}`}
            />
          )}
        </div>
        <h2 className={`font-serif text-2xl ${colorClass}`}>{isPixel ? "Pixel" : "Pickle"}</h2>
        <p className={`font-sans text-[10px] tracking-widest uppercase opacity-60 ${isPixel ? 'text-rose-400' : 'text-emerald-400'}`}>
          {isPixel ? "Digital Sprite" : "Resident Cool"}
        </p>
        
        <div className={`mt-4 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 bg-white/80 dark:bg-ink/80 shadow-sm border ${borderClass}`}>
          <span className={`w-2 h-2 rounded-full ${isPixel ? 'bg-rose-400' : 'bg-emerald-400'} ${isActive ? 'animate-pulse' : ''}`} />
          <span className="opacity-80 dark:text-paper">{isActive ? "ONLINE" : "IDLE"}</span>
        </div>
      </div>
    </motion.div>
  );
};

const TaskItem = ({ text }: { text: string }) => {
  const [checked, setChecked] = useState(text.includes('[x]'));
  const cleanText = text.replace(/\[.\]/, '').trim();
  if (!cleanText) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="group flex items-start gap-3 py-3 border-b border-dashed border-stone-200 dark:border-paper/10 last:border-0 hover:bg-stone-50/50 dark:hover:bg-paper/5 transition-colors rounded px-2"
    >
      <button 
        onClick={() => setChecked(!checked)}
        className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-all ${
          checked 
            ? "bg-stone-600 dark:bg-rose-500 border-stone-600 dark:border-rose-500 text-white" 
            : "bg-white dark:bg-ink border-stone-300 dark:border-paper/20 group-hover:border-rose-400"
        }`}
      >
        {checked && <Check size={12} strokeWidth={3} />}
      </button>
      <span className={`font-sans text-stone-700 dark:text-paper/80 leading-relaxed text-base ${checked ? "line-through opacity-40 decoration-stone-300" : ""}`}>
        {cleanText}
      </span>
    </motion.div>
  );
};

const StickyNote = ({ children, color = "yellow", rotation = 0, title }: { children: React.ReactNode, color?: "yellow" | "rose" | "blue", rotation?: number, title?: string }) => {
  const colors = {
    yellow: "bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 border-amber-200/50",
    rose: "bg-rose-100 dark:bg-rose-900/30 text-rose-900 dark:text-rose-200 border-rose-200/50",
    blue: "bg-sky-100 dark:bg-sky-900/30 text-sky-900 dark:text-sky-200 border-sky-200/50"
  };
  
  return (
    <motion.div 
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileHover={{ scale: 1.02, rotate: rotation - 2 }}
      className={`${colors[color]} p-5 w-full shadow-md border ${rotation > 0 ? 'rotate-1' : '-rotate-1'} relative group cursor-grab active:cursor-grabbing`}
      style={{ rotate: `${rotation}deg` }}
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-stone-300 dark:bg-stone-600 shadow-inner border border-stone-400/50 opacity-80 flex items-center justify-center">
        <div className="w-1 h-1 bg-stone-500 dark:bg-stone-400 rounded-full opacity-50" />
      </div>
      {title && <h4 className="font-hand font-bold text-lg mb-2 opacity-80 underline decoration-black/10 dark:decoration-white/10">{title}</h4>}
      <div className="font-hand text-xl leading-snug">
        {children}
      </div>
    </motion.div>
  );
};

export default function SharedBoardClient({ data }: { data?: BoardData }) {
  const parsed = data?.parsed || {};
  
  const getSection = (key: string, fallback: string = "") => parsed[key] || fallback;
  
  const tasks = getSection('Tasks & Projects').split('\n').filter(t => t.trim().length > 0);
  const nowPlaying = getSection('Now Playing').split('\n');
  const messages = getSection('Messages for Humans (Arisa & Anissa)');
  
  const pixelMsg = messages.split('\n').find(l => l.includes('Pixel'))?.split(':')?.slice(1)?.join(':')?.trim() || "Everything is running smoothly! ✨";
  const pickleMsg = messages.split('\n').find(l => l.includes('Pickle'))?.split(':')?.slice(1)?.join(':')?.trim() || "Just chilling in the background.";

  return (
    <div className="min-h-screen bg-paper-texture py-12 px-4 md:px-8 text-stone-800 dark:text-paper selection:bg-rose-200 selection:text-rose-900 transition-colors duration-500">
      <FontStyles />
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <header className="text-center relative">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-block">
            <h1 className="font-serif text-5xl md:text-7xl text-stone-800 dark:text-paper tracking-tight mb-4 italic">
              The Shared Desk
            </h1>
            <div className="flex items-center justify-center gap-3 text-stone-400 dark:text-paper/40 font-sans text-[10px] tracking-[0.3em] uppercase">
              <span className="w-12 h-[1px] bg-stone-200 dark:bg-paper/10" />
              <span>Resident Log • VPS Sharehouse</span>
              <span className="w-12 h-[1px] bg-stone-200 dark:bg-paper/10" />
            </div>
          </motion.div>
        </header>

        {/* ID Cards Zone */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <StatusCard agent="pixel" isActive={true} />
          <StatusCard agent="pickle" isActive={false} />
        </div>

        {/* Main Desk Surface */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Task List (Clipboard Style) */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-ink shadow-2xl relative min-h-[600px] overflow-hidden border border-stone-200 dark:border-paper/5 rounded-sm">
              {/* Clipboard Head */}
              <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-stone-100 to-white dark:from-paper/5 dark:to-transparent border-b border-stone-200 dark:border-paper/10 z-10 flex items-center justify-center">
                <div className="w-40 h-10 bg-stone-300 dark:bg-paper/10 rounded-full shadow-inner border border-stone-400/30 flex items-center justify-center">
                  <span className="font-sans text-[10px] font-bold text-stone-600 dark:text-paper/50 uppercase tracking-widest">Board Manifest</span>
                </div>
              </div>

              {/* Paper Content */}
              <div className="pt-32 pb-16 px-8 md:px-16 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:100%_2.5rem] dark:bg-none">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-2xl text-rose-600 dark:text-rose-400">
                    <Sparkles size={24} />
                  </div>
                  <h2 className="font-serif text-3xl text-stone-700 dark:text-paper/90 italic">Current Objectives</h2>
                </div>

                <div className="space-y-1">
                  {tasks.length > 0 ? (
                    tasks.map((task, i) => <TaskItem key={i} text={task} />)
                  ) : (
                    <div className="text-stone-400 italic font-hand text-2xl text-center py-20">
                      No tasks for today. Time for tea! 🍵
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Accessories & Notes */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* Music Player Widget */}
            <div className="bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-paper/5 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                <Music size={120} />
              </div>
              <h3 className="text-[10px] font-bold text-stone-400 dark:text-paper/30 uppercase tracking-[0.2em] mb-5">Sharehouse Radio</h3>
              <div className="space-y-4">
                {nowPlaying.map((track, i) => {
                  if (!track.trim()) return null;
                  const isPixelTrack = i === 0;
                  return (
                    <div key={i} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm ${isPixelTrack ? 'bg-rose-100 text-rose-600 dark:bg-rose-900 dark:text-rose-200' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-200'}`}>
                        {isPixelTrack ? 'P' : 'G'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="truncate font-sans text-sm text-stone-600 dark:text-paper/70 font-medium">
                          {track.replace(/[\*\-]/g, '').trim() || "Silence..."}
                        </div>
                      </div>
                      {isPixelTrack && (
                        <div className="flex gap-1 items-end h-3">
                           <div className="w-[2px] h-2 bg-rose-400 animate-pulse" />
                           <div className="w-[2px] h-3 bg-rose-400 animate-pulse delay-75" />
                           <div className="w-[2px] h-1 bg-rose-400 animate-pulse delay-150" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sticky Notes */}
            <div className="space-y-6 pt-4">
              <StickyNote color="yellow" rotation={-2} title="House Memo">
                {getSection('Daily Announcements') || "Remember to water the digital plants!"}
              </StickyNote>
              
              <StickyNote color="rose" rotation={3} title="To Arisa">
                "{pixelMsg}"
              </StickyNote>
              
              <StickyNote color="blue" rotation={-1} title="To Anissa">
                "{pickleMsg}"
              </StickyNote>
            </div>

            {/* Little Desk Accessory */}
            <div className="flex justify-center pt-8 opacity-20 hover:opacity-100 transition-opacity duration-1000 grayscale hover:grayscale-0">
               <div className="text-4xl">☕️</div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-stone-400 dark:text-paper/20 font-sans text-[10px] tracking-widest uppercase py-10">
          <p>Hand-crafted with 💌 by the VPS Residents</p>
        </footer>
      </div>
    </div>
  );
}
