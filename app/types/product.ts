export interface Product {
  id: string;
  name: string;
  price: number; // Use number for calculations
  description: string;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}