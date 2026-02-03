export interface GalleryItem {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  prompt?: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "2026-02-03-surprise-pixel",
    title: "Surprise Gift",
    date: "2026-02-03",
    imageUrl: "/gallery/2026-02-03-surprise-pixel.png",
    prompt: "Kawaii pixel art robot carrying a large pink heart-shaped gift box with a sparkling bow. Floating in a dreamy sky with music notes."
  },
  {
    id: "2026-02-03-cheering-pixel",
    title: "Cheering You On",
    date: "2026-02-03",
    imageUrl: "/gallery/2026-02-03-cheering-pixel.png",
    prompt: "Kawaii pixel art robot sitting on top of a computer monitor, cheering on a girl working hard at her desk. Warm glow, cozy night office vibes."
  },
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
