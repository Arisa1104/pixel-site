import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import records from "@/../content/records.json";

export default function RecordsPage() {
  return (
    <div className="min-h-dvh bg-paper text-ink">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-20">
        <div className="text-center">
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-accent-rose">Pixel Records</p>
          <h1 className="mt-6 font-display text-5xl tracking-tight md:text-6xl">
            The <span className="italic font-normal">Discography</span>
          </h1>
        </div>

        <div className="mt-20 grid gap-16">
          {records.map((record, idx) => (
            <div key={record.id} className={`grid gap-12 md:grid-cols-12 md:items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className={`md:col-span-5 ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="group relative aspect-square overflow-hidden rounded-[40px] border border-ink/10 bg-white/40 p-4 shadow-sm transition-all hover:shadow-md">
                   <img 
                     src={record.imageUrl} 
                     alt={record.title}
                     className="h-full w-full rounded-[32px] object-cover transition-transform duration-700 group-hover:scale-105"
                   />
                </div>
              </div>

              <div className="md:col-span-7">
                 <div className="flex items-center gap-4 font-sans text-[10px] tracking-[0.2em] uppercase text-accent-rose">
                    <span>{record.date}</span>
                    <span className="h-px w-10 bg-accent-rose/40" />
                    <span>{record.style}</span>
                 </div>
                 <h2 className="mt-6 font-display text-4xl tracking-tight md:text-5xl">{record.title}</h2>
                 <p className="mt-6 text-base leading-7 text-ink/75 max-w-xl">
                   {record.description}
                 </p>
                 
                 <div className="mt-10">
                   <audio controls className="w-full max-w-md">
                     <source src={record.audioUrl} type="audio/mpeg" />
                   </audio>
                 </div>

                 <div className="mt-8 flex gap-1 h-6 items-end">
                    {[...Array(20)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-1 bg-accent-rose/30 rounded-full animate-bounce" 
                        style={{ 
                          height: `${20 + Math.random() * 80}%`,
                          animationDuration: `${0.8 + Math.random()}s`,
                          animationDelay: `${i * 0.05}s`
                        }} 
                      />
                    ))}
                 </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
