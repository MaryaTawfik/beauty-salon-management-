// data/testimonials.ts

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "The bridal package was incredible. I felt like royalty on my special day.",
    name: "Abeba Y.",
    title: "Bridal Client",
    rating: 5,
  },
  {
    quote: "Best Ethiopian Shuruba in the city. The atmosphere is purely premium.",
    name: "Martha K.",
    title: "Regular Client",
    rating: 5,
  },
  {
    quote: "Professional nail artistry. The attention to detail is unmatched.",
    name: "Sara L.",
    title: "Fashion Designer",
    rating: 5,
  },
  {
    quote: "The spa treatment was transformative. Pure luxury from start to finish.",
    name: "Eden G.",
    title: "Wellness Enthusiast",
    rating: 4,
  },
];