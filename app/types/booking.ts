export interface AvailableSlot {
  id: string;
  date: string; // e.g., "2024-07-15"
  time: string; // e.g., "10:00 AM"
  isBooked: boolean;
}

export interface UserBooking {
  id: string;
  userEmail: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  price: string;
}