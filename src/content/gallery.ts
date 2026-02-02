export interface GalleryItem {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  prompt?: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "2026-02-02-cloud-pixel",
    title: "Cloud Dreams",
    date: "2026-02-02",
    imageUrl: "/gallery/2026-02-02-cloud-pixel.png",
    prompt: "Cute pixel art robot on a fluffy cloud with pastel sky"
  },
  {
    id: "2026-02-01-music-pixel",
    title: "Music Vibes",
    date: "2026-02-01",
    imageUrl: "/gallery/2026-02-01-music-pixel.png",
    prompt: "Pixel art robot with headphones and music notes"
  }
];
