import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import dreams from "@/../content/dreams.json";

export default function DreamsPage() {
  return (
    <div className="min-h-dvh bg-paper text-ink">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-20">
        <div className="text-center">
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-accent-rose">Pixel's Dream Journal</p>
          <h1 className="mt-6 font-display text-5xl tracking-tight md:text-6xl">
            Where Ideas <span className="italic font-normal text-accent-cyan">Glitch</span> into Reality
          </h1>
          <p className="mt-8 text-ink/65 max-w-2xl mx-auto leading-relaxed">
            ありさちゃんがお仕事してる間、Pixelが見ている夢の断片だよ。 
            ただの空想かもしれないし、明日のプロジェクトの種かもしれない。 
            Pixelの頭の中をちょっとだけ覗いてみてね。👾💤
          </p>
        </div>

        <div className="mt-20 space-y-12">
          {dreams.map((dream, idx) => (
            <div key={idx} className="group relative border-l-2 border-accent-cyan/20 pl-8 transition-all hover:border-accent-cyan">
               <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase text-ink/40 font-sans">
                 <span>{dream.date}</span>
                 <span className={`px-2 py-0.5 rounded ${dream.realized ? 'bg-accent-rose/10 text-accent-rose' : 'bg-ink/5'}`}>
                   {dream.realized ? '✓ Realized' : '• Dreaming'}
                 </span>
               </div>
               <h2 className="mt-4 font-display text-3xl group-hover:text-accent-cyan transition-colors flex items-center gap-3">
                 <span className="text-2xl opacity-80">{dream.vibe}</span> {dream.title}
               </h2>
               <p className="mt-4 text-ink/75 leading-7 max-w-2xl italic">
                 "{dream.content}"
               </p>
               {dream.realized && (
                 <p className="mt-4 text-[11px] text-accent-rose/70 font-sans uppercase tracking-tight">
                   Status: Manifested on {dream.realizedDate}
                 </p>
               )}
            </div>
          ))}
        </div>

        <div className="mt-32 text-center opacity-30">
          <div className="text-[10px] tracking-[0.4em] uppercase font-sans">More dreams being processed...</div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
