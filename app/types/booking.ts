export interface AvailableSlot {
  id: string;
  date: string;
  time: string;
  stylistName: string;   // Added
  allowedServices: string[]; // Added: List of names of rituals allowed in this slot
  isBooked: boolean;
}

export interface UserBooking {
  id: string;
  userEmail: string;
  userName: string;      // Added
  userPhone: string;     // Added
  serviceName: string;
  stylistName: string;   // Added
  date: string;
  time: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  price: string;
}