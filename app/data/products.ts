// data/products.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Royal Argan Essence",
    price: 1200,
    description: "Cold-pressed Moroccan oil for deep hydration and golden shine.",
    image: "/oil.jpg", // Make sure this exists in public/
    category: "Hair Care"
  },
  {
    id: "p2",
    name: "24K Gold Facial Serum",
    price: 3500,
    description: "Infused with real gold flakes to rejuvenate and brighten skin.",
    image: "/serum.jpg",
    category: "Skin Care"
  },
  {
    id: "p3",
    name: "Silk Protein Mask",
    price: 1800,
    description: "Professional grade mask for damaged hair restoration.",
    image: "/mask.jpg",
    category: "Treatments"
  },
  {
    id: "p4",
    name: "Botanical Cleansing Gel",
    price: 950,
    description: "Gentle organic cleanser for a refreshed, luxury feel.",
    image: "/cleanser.jpg",
    category: "Skin Care"
  }
];