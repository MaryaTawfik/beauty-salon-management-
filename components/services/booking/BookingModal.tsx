"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Check, Clock, Loader2, User, ChevronDown, Scissors } from 'lucide-react';
import { useBookings } from '@/app/context/BookingContext';
import { useServices } from '@/app/context/ServiceContext';
import { getActiveUser } from '@/lib/auth-utils';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string; 
  price?: string;       
}

export default function BookingModal({ isOpen, onClose, serviceName: initialService, price: initialPrice }: BookingModalProps) {
  const { availableSlots, bookAppointment, isMounted } = useBookings();
  const { categories } = useServices();
  const router = useRouter();

  // States
  const [selectedService, setSelectedService] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Flatten all available services from the CMS/Context
  const allRituals = categories.flatMap(cat => cat.subServices);

  // --- FILTERING LOGIC ---
  // Only show unbooked slots that allow the selected service
  const filteredSlots = availableSlots.filter(s => 
    !s.isBooked && 
    s.allowedServices?.includes(selectedService)
  );

  // Reset or initialize state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedService(initialService || "");
      setSelectedPrice(initialPrice || "");
      setSelectedSlotId(null);
      setIsSuccess(false);
    }
  }, [isOpen, initialService, initialPrice]);

  const handleConfirm = () => {
    const user = getActiveUser();

    if (!user || !user.email) {
      onClose();
      router.push('/sign-in');
      return;
    }

    if (!selectedSlotId || !selectedService) return;

    const selectedSlot = filteredSlots.find(s => s.id === selectedSlotId);
    if (!selectedSlot) return;

    setIsSubmitting(true);

    // Simulate luxury processing
    setTimeout(() => {
      bookAppointment(
        selectedService, 
        selectedPrice, 
        selectedSlotId, 
        user.fullName, 
        user.phone, 
        selectedSlot.stylistName
      );
      
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
          
          <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-[#1a1a1a] border border-[#D4AF7A]/30 w-full max-w-lg shadow-2xl overflow-hidden rounded-none">
            {isSuccess ? (
              <div className="text-center py-20 px-8 bg-[#121212]">
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20"><Check size={32} /></div>
                <h3 className="text-2xl text-white font-light italic tracking-tight">Ritual Confirmed</h3>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mt-2">Check your profile for details</p>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#121212]">
                  <div>
                    <h2 className="text-[#D4AF7A] text-[10px] uppercase tracking-[0.3em] font-bold">Bespoke Reservation</h2>
                    {!initialService && <p className="text-white/40 text-[9px] uppercase mt-1 tracking-tighter">Choose a ritual to view availability</p>}
                  </div>
                  <button onClick={onClose} className="text-white/20 hover:text-white"><X size={20}/></button>
                </div>

                <div className="p-8 space-y-8">
                  {/* STEP 1: RITUAL SELECTION (If opened from Navbar) */}
                  {!initialService && (
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase text-white/40 tracking-widest font-bold">1. Select Ritual</label>
                      <div className="relative">
                        <select 
                          className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none appearance-none cursor-pointer"
                          value={selectedService}
                          onChange={(e) => {
                            const found = allRituals.find(r => r.name === e.target.value);
                            setSelectedService(e.target.value);
                            setSelectedPrice(found?.price || "");
                          }}
                        >
                          <option value="" className="bg-black">Choose a ritual...</option>
                          {allRituals.map(ritual => (
                            <option key={ritual.id} value={ritual.name} className="bg-black">{ritual.name}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={16} />
                      </div>
                    </div>
                  )}

                  {/* STEP 2: TIME SLOTS */}
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase text-white/40 tracking-widest font-bold">
                      {initialService ? "Select Artist & Time" : "2. Available Openings"}
                    </label>
                    <div className="grid grid-cols-1 gap-3 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
                      {!selectedService ? (
                        <div className="text-center py-10 border border-dashed border-white/5 bg-white/[0.01]">
                          <Scissors size={24} className="mx-auto text-white/5 mb-2" />
                          <p className="text-white/20 text-[10px] uppercase italic">Waiting for selection...</p>
                        </div>
                      ) : filteredSlots.length > 0 ? (
                        filteredSlots.map(slot => (
                          <button 
                            key={slot.id} 
                            onClick={() => setSelectedSlotId(slot.id)} 
                            className={cn(
                              "p-4 border transition-all duration-300 flex justify-between items-center text-left", 
                              selectedSlotId === slot.id ? "bg-[#D4AF7A] border-[#D4AF7A] text-[#121212]" : "bg-white/5 border-white/5 text-white/60 hover:border-white/20"
                            )}
                          >
                            <div className="flex items-center gap-4">
                              <User size={16} className={selectedSlotId === slot.id ? "text-black" : "text-[#D4AF7A]"} />
                              <div>
                                <p className={cn("text-[10px] font-bold uppercase", selectedSlotId === slot.id ? "text-black" : "text-white")}>{slot.stylistName}</p>
                                <p className="text-[11px] font-light opacity-60">{slot.date} @ {slot.time}</p>
                              </div>
                            </div>
                            {selectedSlotId === slot.id && <Check size={16} />}
                          </button>
                        ))
                      ) : (
                        <p className="text-center py-10 text-white/20 text-[10px] uppercase italic">No current availability for this ritual.</p>
                      )}
                    </div>
                  </div>

                  <button 
                    onClick={handleConfirm} 
                    disabled={!selectedSlotId || isSubmitting} 
                    className="w-full bg-[#D4AF7A] text-[#121212] py-5 font-bold uppercase tracking-[0.2em] text-xs transition-all hover:bg-white disabled:opacity-20 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={18}/> : "Authorize Ritual Reservation"}
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