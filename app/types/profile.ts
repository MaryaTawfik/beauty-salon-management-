// types/profile.ts
export type AppointmentStatus = 'Upcoming' | 'Completed' | 'Cancelled';

export interface Appointment {
  id: string;
  date: string;
  time: string;
  service: string;
  stylist: string;
  status: AppointmentStatus;
  price: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  loyaltyPoints: number;
  totalSpent: string;
  avatar?: string;
}