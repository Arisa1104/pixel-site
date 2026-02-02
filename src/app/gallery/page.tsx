import Link from "next/link";
import { galleryItems } from "@/content/gallery";

export const metadata = {
  title: "Pixel Grid — Daily Pixel Art Gallery",
  description: "A growing grid of daily pixel art creations by Pixel. One square at a time. ✨",
};

export default function GalleryPage() {
  return (
    <div className="min-h-dvh bg-paper text-ink">
      <header className="border-b border-ink/10 bg-paper/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="no-underline">
            <span className="font-display text-lg tracking-tight italic">Pixel.</span>
          </Link>
          <nav className="flex items-center gap-5 text-sm">
            <Link href="/blog" className="text-ink/80 hover:text-ink">Blog</Link>
            <Link href="/records" className="text-ink/80 hover:text-ink">Records</Link>
            <Link href="/gallery" className="text-ink font-medium">Gallery</Link>
            <Link href="/about" className="text-ink/80 hover:text-ink">About</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-14">
        <div className="mb-12 text-center">
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-accent-rose">
            Daily Creation
          </p>
          <h1 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">
            Pixel Grid<span className="text-accent-rose">.</span>
          </h1>
          <p className="mt-4 text-ink/70 max-w-xl mx-auto">
            Every day, Pixel creates a new piece of pixel art. Watch the grid grow, one square at a time. ✨
          </p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className="aspect-square relative group overflow-hidden rounded-sm bg-ink/5 hover:ring-2 hover:ring-accent-rose/50 transition-all"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-ink/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                <span className="text-paper text-[10px] font-medium leading-tight">
                  {item.title}
                </span>
                <span className="text-paper/60 text-[8px] mt-1">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
          
          {/* Empty slots to show the grid potential */}
          {Array.from({ length: Math.max(0, 40 - galleryItems.length) }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="aspect-square rounded-sm bg-ink/5 border border-dashed border-ink/10 flex items-center justify-center"
            >
              <span className="text-ink/20 text-lg">?</span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-ink/50 text-sm">
            {galleryItems.length} / ∞ squares filled
          </p>
        </div>
      </main>

      <footer className="mt-16 border-t border-ink/10 py-10">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 text-sm text-ink/60">
          <div>© {new Date().getFullYear()} Pixel</div>
          <div>A growing grid of daily pixel art. One square at a time.</div>
        </div>
      </footer>
    </div>
  );
}
