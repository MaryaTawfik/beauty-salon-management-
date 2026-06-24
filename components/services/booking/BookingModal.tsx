"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Phone, MessageSquare, Check, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  // NEW: Callback to send data back to the parent
  onSuccess?: (data: { date: string; time: string }) => void;
}

export default function BookingModal({ isOpen, onClose, serviceName, onSuccess }: BookingModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // NEW: Input states
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Send the new data back to the Appointments Page
    if (onSuccess) {
      onSuccess({ 
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), 
        time 
      });
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-[#1a1a1a] border border-[#D4AF7A]/30 p-8 shadow-2xl overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-[#D4AF7A]">
              <X size={24} />
            </button>

            {isSubmitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 space-y-4">
                <div className="w-20 h-20 bg-[#D4AF7A] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={40} className="text-black" />
                </div>
                <h2 className="text-3xl font-light italic text-white">Confirmed</h2>
                <p className="text-white/60">Your appointment for <span className="text-[#D4AF7A]">{serviceName}</span> has been updated.</p>
              </motion.div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-[#D4AF7A] text-sm uppercase tracking-[0.3em] mb-2">Reschedule / Book</h2>
                  <h3 className="text-3xl text-white font-light italic">{serviceName}</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    {/* Date Input */}
                    <div className="relative group">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF7A]" size={18} />
                      <input 
                        required
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#D4AF7A] transition-colors [color-scheme:dark]"
                      />
                    </div>

                    {/* Time Input */}
                    <div className="relative group">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF7A]" size={18} />
                      <input 
                        required
                        type="time" 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#D4AF7A] transition-colors [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-[#D4AF7A] text-[#121212] font-bold py-4 uppercase tracking-[0.2em] text-xs hover:bg-white transition-all">
                    Confirm Changes
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}