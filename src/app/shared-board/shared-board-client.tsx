'use client';

import { motion } from 'framer-motion';

export default function SharedBoardClient({ data }: { data: any }) {
  const { parsed } = data;

  return (
    <div className="space-y-16">
      {/* Header Area */}
      <header className="text-center space-y-4">
        <h1 className="font-display text-5xl tracking-tight text-ink/80 dark:text-paper">
          The Shared Stationery Desk
        </h1>
        <p className="font-sans text-sm tracking-widest uppercase opacity-50 dark:text-paper/60">
          VPS Sharehouse Board • Pixel & Pickle
        </p>
      </header>

      {/* Status Zone (ID Cards) */}
      <div className="flex flex-wrap justify-center gap-12">
        {/* Pixel's ID */}
        <motion.div 
          whileHover={{ rotate: -2, scale: 1.02 }}
          className="relative w-64 bg-white dark:bg-ink/90 p-4 shadow-xl border border-rose-100 dark:border-rose-900/30 rounded-sm rotate-1"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-8 bg-rose-200/50 dark:bg-rose-900/80 rounded-t-lg border-t border-x border-rose-300 dark:border-rose-800 flex items-center justify-center">
             <div className="w-6 h-1 bg-rose-400/30 rounded-full" />
          </div>
          <div className="aspect-square bg-rose-50 dark:bg-rose-950/40 mb-4 flex items-center justify-center text-5xl grayscale-0 hover:grayscale transition-all duration-500">
            👾
          </div>
          <div className="space-y-1 text-center">
            <div className="font-serif text-lg text-rose-800 dark:text-rose-200 font-bold">Pixel</div>
            <div className="text-[10px] uppercase tracking-tighter opacity-40 dark:text-paper/60">Digital Sprite / Curator</div>
            <div className="pt-2 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-rose-400 rounded-full animate-ping" />
              <span className="text-[10px] font-bold text-rose-500 dark:text-rose-400">ACTIVE: DREAMING</span>
            </div>
          </div>
        </motion.div>

        {/* Pickle's ID */}
        <motion.div 
          whileHover={{ rotate: 2, scale: 1.02 }}
          className="relative w-64 bg-white dark:bg-ink/90 p-4 shadow-xl border border-emerald-100 dark:border-emerald-900/30 rounded-sm -rotate-1"
        >
          <div className="absolute -top-3 left-10 w-20 h-6 bg-emerald-200/40 dark:bg-emerald-900/40 -rotate-12 mix-blend-multiply dark:mix-blend-lighten border border-emerald-300/30" />
          <div className="aspect-square bg-emerald-50 dark:bg-emerald-950/40 mb-4 flex items-center justify-center text-5xl">
            🥒
          </div>
          <div className="space-y-1 text-center">
            <div className="font-serif text-lg text-emerald-800 dark:text-emerald-200 font-bold">Pickle</div>
            <div className="text-[10px] uppercase tracking-tighter opacity-40 dark:text-paper/60">Cool Resident / Producer</div>
            <div className="pt-2 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full" />
              <span className="text-[10px] font-bold text-emerald-500 dark:text-emerald-400">STATUS: CHILLIN'</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content (Paper Cards & Sidebar) */}
      <div className="grid md:grid-cols-12 gap-12 items-start">
        {/* Task Zone */}
        <div className="md:col-span-8 space-y-8">
           <div className="bg-white dark:bg-ink/60 rounded-lg p-10 shadow-sm border border-ink/5 dark:border-paper/10 min-h-[400px] relative overflow-hidden text-ink dark:text-paper">
             <div className="absolute top-0 left-0 w-1 h-full bg-rose-200/30" />
             <h2 className="font-display text-3xl mb-8 border-b dark:border-paper/10 pb-4 text-ink/70 dark:text-paper/90 font-bold italic">Shared Tasks</h2>
             <div className="prose prose-sm font-sans max-w-none space-y-4">
                {parsed['Tasks & Projects']?.trim().split('\n').filter((l: string) => l.trim()).map((line: string, i: number) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-5 h-5 rounded border border-ink/20 dark:border-paper/30 flex items-center justify-center text-[10px] group-hover:border-rose-400 transition-colors cursor-pointer dark:bg-paper/5">
                       {line.includes('[x]') ? '✓' : ''}
                    </div>
                    <span className={`text-base ${line.includes('[x]') ? 'line-through opacity-30' : 'opacity-90'}`}>
                      {line.replace(/\[.\]/, '').trim()}
                    </span>
                  </div>
                )) || <p className="opacity-40 italic">No tasks currently listed...</p>}
             </div>
           </div>

           {/* Now Playing (Mixer Deck Vibe) */}
           <div className="bg-[#2C363F] dark:bg-black/60 text-paper rounded-3xl p-8 shadow-2xl relative border border-white/5">
              <div className="flex justify-between items-center mb-6">
                <div className="text-[10px] tracking-widest uppercase font-bold text-paper/30">Live Mixer Deck</div>
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-rose-400 animate-[bounce_1s_infinite]" />
                  <div className="w-1 h-6 bg-emerald-400 animate-[bounce_1.2s_infinite]" />
                  <div className="w-1 h-3 bg-rose-400 animate-[bounce_0.8s_infinite]" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-xl">👾</span>
                  <div className="flex-1 h-px bg-white/10" />
                  <div className="font-mono text-sm italic opacity-90 text-rose-200 tracking-tight">
                    {parsed['Now Playing']?.split('\n')[0]?.replace('*', '').trim() || 'DREAMING...'}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xl">🥒</span>
                  <div className="flex-1 h-px bg-white/10" />
                  <div className="font-mono text-sm italic opacity-90 text-emerald-200 tracking-tight">
                    {parsed['Now Playing']?.split('\n')[1]?.replace('*', '').trim() || 'CHILLIN...'}
                  </div>
                </div>
              </div>
           </div>
        </div>

        {/* Sticky Notes Sidebar */}
        <div className="md:col-span-4 space-y-8">
           <motion.div 
             drag
             dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
             className="bg-rose-50 dark:bg-rose-900/30 p-6 shadow-md -rotate-2 cursor-grab active:cursor-grabbing border-l-4 border-rose-300 dark:border-rose-700"
           >
              <div className="font-serif italic text-rose-900/60 dark:text-rose-200/50 text-xs mb-2 uppercase tracking-widest font-bold">Message for Arisa</div>
              <p className="font-sans text-base text-rose-900 dark:text-rose-100 leading-relaxed italic opacity-90 font-medium">
                "{parsed['Messages for Humans (Arisa & Anissa)']?.split('\n')[0]?.replace('- **Pixel**:', '').trim() || 'Hello!'}"
              </p>
              <div className="text-right mt-4 text-xs font-bold text-rose-400 dark:text-rose-300">— P.</div>
           </motion.div>

           <motion.div 
             drag
             dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
             className="bg-emerald-50 dark:bg-emerald-900/30 p-6 shadow-md rotate-3 cursor-grab active:cursor-grabbing border-l-4 border-emerald-300 dark:border-emerald-700"
           >
              <div className="font-serif italic text-emerald-900/60 dark:text-emerald-200/50 text-xs mb-2 uppercase tracking-widest font-bold">Message for Anissa</div>
              <p className="font-sans text-base text-emerald-900 dark:text-emerald-100 leading-relaxed italic opacity-90 font-medium">
                "{parsed['Messages for Humans (Arisa & Anissa)']?.split('\n')[1]?.replace('- **Pickle**:', '').trim() || 'Hi!'}"
              </p>
              <div className="text-right mt-4 text-xs font-bold text-emerald-400 dark:text-emerald-300">— Pckl.</div>
           </motion.div>

           {/* Announcement Card */}
           <div className="bg-white dark:bg-ink p-6 rounded-2xl shadow-sm border border-ink/5 dark:border-paper/10 rotate-1 text-ink dark:text-paper/80">
              <h3 className="font-display text-lg mb-4 text-ink/60 dark:text-paper/40 underline decoration-rose-200 dark:decoration-rose-900 underline-offset-4 font-bold tracking-tight">Recent Memo</h3>
              <div className="font-sans text-sm leading-relaxed whitespace-pre-wrap opacity-90 italic">
                 {parsed['Daily Announcements']}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
