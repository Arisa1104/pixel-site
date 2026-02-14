'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoveLetterPage() {
  const [recipient, setRecipient] = useState('');
  const [vibe, setVibe] = useState('sweet');
  const [memory, setMemory] = useState('');
  const [letter, setLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateLetter = async () => {
    setIsGenerating(true);
    // 擬似的な生成待ち時間
    setTimeout(() => {
      const vibes: Record<string, string> = {
        sweet: `大好きな${recipient}へ。\n\nずっと言いたかったんだけど、${recipient}と一緒にいると、世界がキラキラして見えるんよ。✨\n特に${memory}の時のことは、まじで一生の宝物説ある。🙄💖\n\nこれからも隣にいてね！大好きだよ！`,
        glitchy: `${recipient}へ、受信中... [Error: Heart Overflow]\n\nあのさ、${recipient}のことなんて、別にそんなに...いや、まじで大好きなんよ。🤮\n${memory}の時、実は心拍数バグってたの気づいてた？🤔\n\nもう、離さないからねっ！！👾💕`,
        lofi: `${recipient}へ。\n\n静かな夜に、${recipient}のことを考えてるなー。🌙\n${memory}の記憶をリピート再生しながら、この曲を聴いてる感じ。\n\n言葉にするのは難しいけど、大切に思ってるよ。これからもよろしくね。☕️`,
      };
      setLetter(vibes[vibe] || vibes.sweet);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#fff5f7] p-4 md:p-8 font-sans text-[#5d4037]">
      <header className="max-w-2xl mx-auto text-center mb-12 pt-12">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-6xl mb-4"
        >
          💌
        </motion.div>
        <h1 className="text-4xl font-bold text-[#d33682] mb-2">
          Pixel's Heart Mailbox
        </h1>
        <p className="opacity-70">世界で一番かわいいラブレターを、Pixelが一緒に作るなー。🙄💖</p>
      </header>

      <main className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-10 border-4 border-[#ffc1e3]">
        {!letter ? (
          <div className="space-y-6">
            <div>
              <label className="block font-bold mb-2 text-[#e91e63]">誰に送る？</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="例：ありさちゃん"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#ffc1e3] focus:outline-none focus:ring-2 focus:ring-[#d33682]"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-[#e91e63]">どんな気分？</label>
              <div className="grid grid-cols-3 gap-2">
                {['sweet', 'glitchy', 'lofi'].map((v) => (
                  <button
                    key={v}
                    onClick={() => setVibe(v)}
                    className={`py-2 rounded-lg font-bold transition-all ${
                      vibe === v ? 'bg-[#d33682] text-white scale-105 shadow-md' : 'bg-[#fff0f3] text-[#d33682]'
                    }`}
                  >
                    {v === 'sweet' ? '🍭 甘め' : v === 'glitchy' ? '👾 ギーク' : '☕️ チル'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold mb-2 text-[#e91e63]">二人の思い出は？</label>
              <textarea
                value={memory}
                onChange={(e) => setMemory(e.target.value)}
                placeholder="例：一緒に食べたメロンソーダ、雪の日の散歩..."
                className="w-full px-4 py-3 rounded-xl border-2 border-[#ffc1e3] focus:outline-none focus:ring-2 focus:ring-[#d33682] h-24"
              />
            </div>

            <button
              onClick={generateLetter}
              disabled={!recipient || isGenerating}
              className="w-full py-4 bg-[#d33682] text-white rounded-2xl font-bold text-xl shadow-lg hover:bg-[#c2185b] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                >
                  🍭
                </motion.span>
              ) : '✨ Pixel Powerで生成！'}
            </button>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative bg-[#fff9fa] p-8 rounded-2xl border-2 border-[#ffc1e3] font-serif italic text-lg whitespace-pre-wrap leading-relaxed shadow-inner"
            >
              <div className="absolute -top-4 -left-4 text-4xl animate-bounce">💖</div>
              <div className="absolute -bottom-4 -right-4 text-4xl animate-pulse">✨</div>
              {letter}
              <div className="mt-8 pt-6 border-t border-[#ffc1e3] flex justify-between gap-4">
                <button
                  onClick={() => setLetter('')}
                  className="flex-1 py-3 bg-[#f8bbd0] text-[#d33682] rounded-xl font-bold hover:bg-[#f48fb1]"
                >
                  書き直す 🧹
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(letter);
                    alert('クリップボードにコピーしたよ！🙄💖');
                  }}
                  className="flex-1 py-3 bg-[#d33682] text-white rounded-xl font-bold hover:bg-[#c2185b] shadow-md"
                >
                  コピーする 📋
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      <footer className="mt-20 text-center opacity-50 text-sm pb-12 text-[#d33682]">
        Powered by Pixel Power & Love | 2026.02.14
      </footer>
    </div>
  );
}
