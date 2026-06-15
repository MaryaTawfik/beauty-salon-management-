export type CategorySlug = 'hair' | 'nails' | 'makeup' | 'henna' | 'spa' | 'hair-coloring' | 'bridal';

export interface SubService{
    id: string;
    slug: string;
    name: string;
    description:string;
    price:string;
    duration: String;
    benefits:string[];
    images: string[];
   
}

export interface ServiceCategory {
  id: string;
  slug: CategorySlug;
  title: string;
  description: string;
  image: string;         // Main image for the card
  startingPrice: string;
  isPopular?: boolean;   // To show the "Popular" badge
  isPremium?: boolean;   // Special flag for the Bridal Package
  subServices: SubService[];
}