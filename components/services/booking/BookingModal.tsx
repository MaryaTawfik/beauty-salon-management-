"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Phone, MessageSquare, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

export default function BookingModal({ isOpen, onClose, serviceName }: BookingModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to an API
    setIsSubmitted(true);
    // Auto close after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-[#1a1a1a] border border-[#D4AF7A]/30 p-8 shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-[#D4AF7A] transition-colors"
            >
              <X size={24} />
            </button>

            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center py-12 space-y-4"
              >
                <div className="w-20 h-20 bg-[#D4AF7A] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={40} className="text-black" />
                </div>
                <h2 className="text-3xl font-light italic text-white">Booking Received</h2>
                <p className="text-white/60">We will contact you shortly to confirm your appointment for <span className="text-[#D4AF7A]">{serviceName}</span>.</p>
              </motion.div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-[#D4AF7A] text-sm uppercase tracking-[0.3em] mb-2">Private Booking</h2>
                  <h3 className="text-3xl text-white font-light italic">{serviceName}</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    {/* Name Input */}
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF7A]" size={18} />
                      <input 
                        required
                        type="text" 
                        placeholder="Your Full Name"
                        className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF7A] transition-colors"
                      />
                    </div>

                    {/* Phone Input */}
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF7A]" size={18} />
                      <input 
                        required
                        type="tel" 
                        placeholder="Phone Number"
                        className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF7A] transition-colors"
                      />
                    </div>

                    {/* Date Input */}
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF7A]" size={18} />
                      <input 
                        required
                        type="date" 
                        className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#D4AF7A] transition-colors [color-scheme:dark]"
                      />
                    </div>

                    {/* Special Notes */}
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-4 text-[#D4AF7A]" size={18} />
                      <textarea 
                        placeholder="Special Requests or Notes"
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF7A] transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#D4AF7A] text-black font-bold py-4 uppercase tracking-[0.2em] hover:bg-[#C9A227] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Confirm Appointment
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