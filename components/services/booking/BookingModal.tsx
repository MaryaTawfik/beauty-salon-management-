"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Check, Clock, Loader2, AlertCircle } from 'lucide-react';
import { useBookings } from '@/app/context/BookingContext';
import { getActiveUser } from '@/lib/auth-utils';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  price: string;
}

export default function BookingModal({ isOpen, onClose, serviceName, price }: BookingModalProps) {
  const { availableSlots, bookAppointment, isMounted } = useBookings();
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleConfirm = () => {
    const user = getActiveUser();
    if (!user) {
      router.push('/sign-in');
      return;
    }

    if (!selectedSlotId) return;

    setIsSubmitting(true);
    setTimeout(() => {
      bookAppointment(serviceName, price, selectedSlotId);
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        router.push('/profile/appointments');
      }, 2000);
    }, 1500);
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-[#1a1a1a] border border-[#D4AF7A]/30 w-full max-w-lg shadow-2xl p-8 overflow-hidden">
            {isSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                  <Check size={40} />
                </div>
                <h3 className="text-2xl text-white font-light italic">Ritual Scheduled</h3>
                <p className="text-white/40 text-sm">We've reserved your session for {serviceName}.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-[#D4AF7A] text-[10px] uppercase tracking-[0.3em] font-bold">Secure Reservation</h2>
                    <h3 className="text-2xl text-white font-light italic mt-1">{serviceName}</h3>
                  </div>
                  <button onClick={onClose} className="text-white/20 hover:text-white"><X size={24}/></button>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase text-white/40 tracking-widest">Select Available Time</label>
                    <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                      {availableSlots.filter(s => !s.isBooked).length > 0 ? (
                        availableSlots.filter(s => !s.isBooked).map(slot => (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setSelectedSlotId(slot.id)}
                            className={cn(
                              "p-4 text-[10px] uppercase border transition-all text-center flex flex-col items-center gap-1",
                              selectedSlotId === slot.id ? "bg-[#D4AF7A] border-[#D4AF7A] text-black font-bold" : "bg-white/5 border-white/5 text-white/60 hover:border-white/20"
                            )}
                          >
                            <Calendar size={12}/> {slot.date}
                            <Clock size={12}/> {slot.time}
                          </button>
                        ))
                      ) : (
                        <div className="col-span-2 py-8 text-center border border-dashed border-white/10">
                          <p className="text-white/20 text-[10px] uppercase italic">No slots currently available</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleConfirm}
                    disabled={!selectedSlotId || isSubmitting}
                    className="w-full bg-[#D4AF7A] text-[#121212] py-4 font-bold uppercase tracking-[0.2em] text-xs transition-all hover:bg-white disabled:opacity-30 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={18}/> : "Confirm Appointment"}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}