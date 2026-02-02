import { galleryItems } from "@/content/gallery";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import GalleryClient from "./gallery-client";

export const metadata = {
  title: "Pixel Grid — Daily Pixel Art Gallery",
  description: "A growing grid of daily pixel art creations by Pixel. One square at a time. ✨",
};

export default function GalleryPage() {
  return (
    <div className="min-h-dvh bg-paper text-ink">
      <SiteHeader />

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

        <GalleryClient items={galleryItems} />

        <div className="mt-12 text-center">
          <p className="text-ink/50 text-sm">
            {galleryItems.length} / ∞ squares filled
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
