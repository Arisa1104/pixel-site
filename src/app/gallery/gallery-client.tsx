"use client";

import { useState } from "react";
import { GalleryItem } from "@/content/gallery";

export default function GalleryClient({ items }: { items: GalleryItem[] }) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="aspect-square relative group overflow-hidden rounded-sm bg-ink/5 hover:ring-2 hover:ring-accent-rose/50 transition-all cursor-pointer"
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

        {/* Empty slots */}
        {Array.from({ length: Math.max(0, 40 - items.length) }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="aspect-square rounded-sm bg-ink/5 border border-dashed border-ink/10 flex items-center justify-center"
          >
            <span className="text-ink/20 text-lg">?</span>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-paper/95 backdrop-blur-md p-6 sm:p-12 animate-in fade-in duration-300"
          onClick={() => setSelectedItem(null)}
        >
          <button
            className="absolute top-6 right-6 text-ink/40 hover:text-ink transition-colors"
            onClick={() => setSelectedItem(null)}
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="max-w-4xl w-full flex flex-col items-center gap-8" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full aspect-square max-h-[70vh] shadow-2xl overflow-hidden rounded-lg bg-ink/5">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-center">
              <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent-rose mb-2">
                {selectedItem.date}
              </div>
              <h2 className="font-display text-3xl tracking-tight">
                {selectedItem.title}
              </h2>
              {selectedItem.prompt && (
                <p className="mt-4 text-sm text-ink/50 italic max-w-lg mx-auto font-sans leading-relaxed">
                  "{selectedItem.prompt}"
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
