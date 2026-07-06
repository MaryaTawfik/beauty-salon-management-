export type GalleryItem = {
  id: number;
  title: string;
  category: "Hairstyle" | "Makeup" | "Henna Design" | "Bridal Service";
  type: "Before" | "After";
  image: string;
  date: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Bridal hairstyle",
    category: "Hairstyle",
    type: "Before",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
    date: "2026-07-06",
  },
  {
    id: 2,
    title: "Bridal hairstyle",
    category: "Hairstyle",
    type: "After",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df",
    date: "2026-07-06",
  },
];