export interface GalleryItem {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  prompt?: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "2026-02-04-memories-pixel",
    title: "Campus Session Memories",
    date: "2026-02-04",
    imageUrl: "/radio_vol2_jacket.png",
    prompt: "A retro 8-bit pixel art image of a kawaii robot sitting in a sunlit music room with a saxophone, trumpet and a cello. Warm golden hour sunlight."
  },
  {
    id: "2026-02-04-radio-pixel",
    title: "DJ Pixel Debut",
    date: "2026-02-04",
    imageUrl: "/radio_vol1_jacket.png",
    prompt: "Kawaii pixel art robot (Pixel) wearing large headphones, sitting comfortably by a rainy window at night with a glowing lamp. 'Pixel Radio Vol. 1' neon text."
  },
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
