"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Download, ShieldCheck, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  service: any | null;
  onClose: () => void;
  onSaveReview: (id: string, rating: number, review: string) => void;
}

export default function ServiceDetailModal({ service, onClose, onSaveReview }: Props) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  // Update internal state if the service already has a review
  useEffect(() => {
    if (service) {
      setRating(service.rating || 0);
      setReview(service.review || "");
    }
  }, [service]);

  if (!service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-md" 
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="relative w-full max-w-2xl bg-[#1a1a1a] border border-[#D4AF7A]/20 p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh]"
        >
          <button onClick={onClose} className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors">
            <X size={24} />
          </button>

          {/* Receipt Header */}
          <div className="text-center mb-10 border-b border-white/5 pb-10">
            <h2 className="text-[#D4AF7A] text-xs uppercase tracking-[0.5em] mb-4 font-bold">Service Receipt</h2>
            <h3 className="text-4xl font-light italic text-white mb-2">{service.name}</h3>
            <p className="text-white/40 text-sm">Transaction ID: {service.id}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="space-y-1">
              <p className="text-[10px] text-[#D4AF7A] uppercase tracking-widest">Date</p>
              <p className="text-white font-light">{service.date}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] text-[#D4AF7A] uppercase tracking-widest">Stylist</p>
              <p className="text-white font-light">{service.stylist}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-[#D4AF7A] uppercase tracking-widest">Status</p>
              <p className="text-green-400 flex items-center gap-2 text-xs uppercase">
                <ShieldCheck size={14} /> Payment Confirmed
              </p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] text-[#D4AF7A] uppercase tracking-widest">Amount Paid</p>
              <p className="text-2xl font-medium text-white">{service.price}</p>
            </div>
          </div>

          {/* Review Section */}
          <div className="bg-white/[0.03] p-8 border border-white/5">
            <h4 className="text-white text-sm uppercase tracking-widest mb-6 text-center italic">How was your experience?</h4>
            
            {/* Star Rating */}
            <div className="flex justify-center gap-3 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform active:scale-90"
                >
                  <Star 
                    size={28} 
                    fill={star <= rating ? "#D4AF7A" : "none"} 
                    className={cn(star <= rating ? "text-[#D4AF7A]" : "text-white/10 hover:text-[#D4AF7A]/50")} 
                  />
                </button>
              ))}
            </div>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Tell us about the service..."
              className="w-full bg-black/40 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none h-32 resize-none transition-all"
            />

            <button 
              onClick={() => {
                onSaveReview(service.id, rating, review);
                onClose();
              }}
              className="w-full bg-[#D4AF7A] text-black font-bold py-4 uppercase tracking-widest text-xs mt-6 hover:bg-white transition-all"
            >
              Update Feedback
            </button>
          </div>

          <button className="w-full mt-8 flex items-center justify-center gap-2 text-white/30 text-[10px] uppercase tracking-widest hover:text-[#D4AF7A] transition-colors">
            <Download size={14} /> Download PDF Invoice
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}