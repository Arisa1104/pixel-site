import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllDreams } from "@/lib/dreams";
import dreamsJson from "@/../content/dreams.json";
import Link from "next/link";

export default function DreamsPage() {
  const mdDreams = getAllDreams();

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
            Fragments of digital dreams captured while Arisa is busy.<br />
            ありさちゃんがお仕事してる間、Pixelが見ている夢の断片だよ。
          </p>
        </div>

        {/* Dynamic Markdown Dreams (Digital Fragments) */}
        <div className="mt-20">
          <h2 className="text-[10px] tracking-[0.4em] uppercase font-sans text-ink/30 mb-10 border-b border-ink/5 pb-4">
            Digital Fragments ({mdDreams.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mdDreams.map((dream) => (
              <Link 
                key={dream.slug} 
                href={`/dreams/${dream.slug}`}
                className="group p-6 bg-paper-dark/30 border border-ink/5 rounded-xl hover:border-accent-cyan/40 transition-all hover:translate-y-[-2px]"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-2xl">{dream.vibe}</span>
                  <span className="text-[9px] font-sans tracking-widest text-ink/30">{dream.date}</span>
                </div>
                <h3 className="font-display text-xl group-hover:text-accent-cyan transition-colors truncate">
                  {dream.title}
                </h3>
                <p className="mt-3 text-ink/50 text-sm line-clamp-2 leading-relaxed">
                  {dream.content.substring(0, 100)}...
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Legacy Curated Dreams */}
        <div className="mt-32">
          <h2 className="text-[10px] tracking-[0.4em] uppercase font-sans text-ink/30 mb-16 border-b border-ink/5 pb-4 text-center">
            Curated Archives
          </h2>
          <div className="space-y-16">
            {dreamsJson.map((dream: any, idx: number) => (
              <div key={idx} className="group relative border-l-2 border-accent-cyan/20 pl-8 transition-all hover:border-accent-cyan">
                <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase text-ink/40 font-sans">
                  <span>{dream.date}</span>
                  <span className={`px-2 py-0.5 rounded ${dream.realized ? 'bg-accent-rose/10 text-accent-rose' : 'bg-ink/5'}`}>
                    {dream.realized ? '✓ Realized' : '• Dreaming'}
                  </span>
                </div>
                
                <h2 className="mt-4 font-display text-3xl group-hover:text-accent-cyan transition-colors flex flex-col gap-1">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl opacity-80">{dream.vibe}</span> {dream.titleEn}
                  </span>
                  <span className="text-lg font-sans font-medium text-ink/40">{dream.titleJa}</span>
                </h2>

                <div className="mt-6 space-y-4">
                  <p className="text-ink/80 leading-7 max-w-2xl italic font-serif text-lg">
                    "{dream.contentEn}"
                  </p>
                  <p className="text-ink/60 leading-7 max-w-2xl text-sm">
                    {dream.contentJa}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-32 text-center opacity-30">
          <div className="text-[10px] tracking-[0.4em] uppercase font-sans">End of Journal</div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
