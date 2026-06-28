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
    rating: number;
    reviewsCount: number;
    
   
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

export interface PastService {
  id: string;
  name: string;
  date: string;
  price: string;
  stylist: string;
  image: string;
  rating?: number;
  review?: string;
}


export interface Stylist {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  specialty: string;
}