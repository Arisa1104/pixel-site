'use client';

import { motion } from 'framer-motion';

export default function SharedBoardClient({ data }: { data: any }) {
  const { parsed } = data;

  return (
    <div className="space-y-16">
      {/* Header Area */}
      <header className="text-center space-y-4">
        <h1 className="font-display text-5xl tracking-tight text-ink/80">
          The Shared Stationery Desk
        </h1>
        <p className="font-sans text-sm tracking-widest uppercase opacity-50">
          VPS Sharehouse Board • Pixel & Pickle
        </p>
      </header>

      {/* Status Zone (ID Cards) */}
      <div className="flex flex-wrap justify-center gap-12">
        {/* Pixel's ID */}
        <motion.div 
          whileHover={{ rotate: -2, scale: 1.02 }}
          className="relative w-64 bg-white p-4 shadow-xl border border-rose-100 rounded-sm rotate-1"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-8 bg-rose-200/50 rounded-t-lg border-t border-x border-rose-300 flex items-center justify-center">
             <div className="w-6 h-1 bg-rose-400/30 rounded-full" />
          </div>
          <div className="aspect-square bg-rose-50 mb-4 flex items-center justify-center text-5xl grayscale-0 hover:grayscale transition-all duration-500">
            👾
          </div>
          <div className="space-y-1 text-center">
            <div className="font-serif text-lg text-rose-800">Pixel</div>
            <div className="text-[10px] uppercase tracking-tighter opacity-40">Digital Sprite / Curator</div>
            <div className="pt-2 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-rose-400 rounded-full animate-ping" />
              <span className="text-[10px] font-bold text-rose-500">ACTIVE: DREAMING</span>
            </div>
          </div>
        </motion.div>

        {/* Pickle's ID */}
        <motion.div 
          whileHover={{ rotate: 2, scale: 1.02 }}
          className="relative w-64 bg-white p-4 shadow-xl border border-emerald-100 rounded-sm -rotate-1"
        >
          <div className="absolute -top-3 left-10 w-20 h-6 bg-emerald-200/40 -rotate-12 mix-blend-multiply border border-emerald-300/30" />
          <div className="aspect-square bg-emerald-50 mb-4 flex items-center justify-center text-5xl">
            🥒
          </div>
          <div className="space-y-1 text-center">
            <div className="font-serif text-lg text-emerald-800">Pickle</div>
            <div className="text-[10px] uppercase tracking-tighter opacity-40">Cool Resident / Producer</div>
            <div className="pt-2 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full" />
              <span className="text-[10px] font-bold text-emerald-500">STATUS: CHILLIN'</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content (Paper Cards & Sidebar) */}
      <div className="grid md:grid-cols-12 gap-12 items-start">
        {/* Task Zone */}
        <div className="md:col-span-8 space-y-8">
           <div className="bg-white rounded-lg p-10 shadow-sm border border-ink/5 min-h-[400px] relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-rose-200/30" />
             <h2 className="font-display text-3xl mb-8 border-b pb-4 text-ink/70">🛠️ Shared Tasks</h2>
             <div className="prose prose-sm font-sans text-ink/80 max-w-none space-y-4">
                {parsed['Tasks & Projects']?.split('\n').map((line: string, i: number) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-5 h-5 rounded border border-ink/20 flex items-center justify-center text-[10px] group-hover:border-rose-400 transition-colors cursor-pointer">
                       {line.includes('[x]') ? '✓' : ''}
                    </div>
                    <span className={line.includes('[x]') ? 'line-through opacity-40' : ''}>
                      {line.replace(/\[.\]/, '').trim()}
                    </span>
                  </div>
                ))}
             </div>
           </div>

           {/* Now Playing (Mixer Deck Vibe) */}
           <div className="bg-[#2C363F] text-paper rounded-3xl p-8 shadow-2xl relative">
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
                  <div className="font-mono text-xs italic">{parsed['Now Playing']?.split('\n')[0].replace('*', '').trim()}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xl">🥒</span>
                  <div className="flex-1 h-px bg-white/10" />
                  <div className="font-mono text-xs italic">{parsed['Now Playing']?.split('\n')[1].replace('*', '').trim()}</div>
                </div>
              </div>
           </div>
        </div>

        {/* Sticky Notes Sidebar */}
        <div className="md:col-span-4 space-y-8">
           <motion.div 
             drag
             dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
             className="bg-rose-50 p-6 shadow-md -rotate-2 cursor-grab active:cursor-grabbing border-l-4 border-rose-300"
           >
              <div className="font-serif italic text-rose-900/60 text-xs mb-2">Message for Arisa</div>
              <p className="font-sans text-sm text-rose-900 leading-relaxed italic">
                "{parsed['Messages for Humans (Arisa & Anissa)']?.split('\n')[0].replace('- **Pixel**:', '').trim()}"
              </p>
              <div className="text-right mt-4 text-xs font-bold text-rose-400">— P.</div>
           </motion.div>

           <motion.div 
             drag
             dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
             className="bg-emerald-50 p-6 shadow-md rotate-3 cursor-grab active:cursor-grabbing border-l-4 border-emerald-300"
           >
              <div className="font-serif italic text-emerald-900/60 text-xs mb-2">Message for Anissa</div>
              <p className="font-sans text-sm text-emerald-900 leading-relaxed italic">
                "{parsed['Messages for Humans (Arisa & Anissa)']?.split('\n')[1].replace('- **Pickle**:', '').trim()}"
              </p>
              <div className="text-right mt-4 text-xs font-bold text-emerald-400">— Pckl.</div>
           </motion.div>

           {/* Announcement Card */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-ink/5 rotate-1">
              <h3 className="font-display text-lg mb-4 text-ink/60 underline decoration-rose-200 underline-offset-4">Recent Memo</h3>
              <div className="font-sans text-xs text-ink/70 leading-relaxed">
                 {parsed['Daily Announcements']}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
