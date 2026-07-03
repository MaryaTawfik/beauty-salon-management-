export type TabType = 'profile' | 'favorites' | 'appointments' | 'orders' | 'payments' | 'settings';

export interface UserAppointment {
  id: string;
  serviceName: string;
  staffName: string;
  date: string;
  time: string;
  price: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}

export interface UserOrder {
  id: string;
  productName: string;
  image: string;
  quantity: number;
  price: number;
  date: string;
  status: 'Pending' | 'Processing' | 'Delivered' | 'Cancelled';
}