"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getActiveUser } from '@/lib/auth-utils';
import { AvailableSlot, UserBooking } from '@/app/types/booking';

interface BookingContextType {
  availableSlots: AvailableSlot[];
  userBookings: UserBooking[];
  addAvailableSlot: (slot: AvailableSlot) => void;
  removeAvailableSlot: (id: string) => void;
  bookAppointment: (serviceName: string, price: string, slotId: string, userName: string, userPhone: string, stylistName: string) => void;
  cancelAppointment: (id: string) => void;
  isMounted: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [userBookings, setUserBookings] = useState<UserBooking[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedSlots = localStorage.getItem("salon_availability");
    const savedBookings = localStorage.getItem("user_bookings");
    if (savedSlots) setAvailableSlots(JSON.parse(savedSlots));
    if (savedBookings) setUserBookings(JSON.parse(savedBookings));
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("salon_availability", JSON.stringify(availableSlots));
      localStorage.setItem("user_bookings", JSON.stringify(userBookings));
    }
  }, [availableSlots, userBookings, isMounted]);

  const addAvailableSlot = (slot: AvailableSlot) => setAvailableSlots(prev => [...prev, slot]);
  const removeAvailableSlot = (id: string) => setAvailableSlots(prev => prev.filter(s => s.id !== id));

  const bookAppointment = (serviceName: string, price: string, slotId: string, userName: string, userPhone: string, stylistName: string) => {
    const user = getActiveUser();
    if (!user) return;
    const slot = availableSlots.find(s => s.id === slotId);
    if (!slot) return;

    const newBooking: UserBooking = {
      id: Math.random().toString(36).substr(2, 9),
      userEmail: user.email,
      userName,
      userPhone,
      serviceName,
      stylistName,
      date: slot.date,
      time: slot.time,
      price,
      status: 'Upcoming'
    };

    setUserBookings(prev => [...prev, newBooking]);
    setAvailableSlots(prev => prev.map(s => s.id === slotId ? { ...s, isBooked: true } : s));
  };

  const cancelAppointment = (id: string) => {
    const booking = userBookings.find(b => b.id === id);
    if (!booking) return;
    setUserBookings(prev => prev.filter(b => b.id !== id));
    setAvailableSlots(prev => prev.map(s => (s.date === booking.date && s.time === booking.time) ? { ...s, isBooked: false } : s));
  };

  return (
    <BookingContext.Provider value={{ availableSlots, userBookings, addAvailableSlot, removeAvailableSlot, bookAppointment, cancelAppointment, isMounted }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBookings must be used within BookingProvider");
  return context;
};