export type OrderStatus = 'Pending Payment' | 'Verifying' | 'Confirmed' | 'Out for Delivery' | 'Delivered' | 'Rejected';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string; // The email of the user
  customerName: string;
  phone: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: string;
  receiptImage?: string; // Base64 string of the screenshot
  rejectionReason?: string;
  createdAt: string;
}