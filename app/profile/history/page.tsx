"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, FileText, MessageSquare, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PastService } from '@/app/types/service';
import ServiceDetailModal from '@/app/profile/ServiceDetailModal';
const PAST_SERVICES: PastService[] = [
  {
    id: 'H-101',
    name: 'Bridal Makeup Session',
    date: 'June 12, 2023',
    price: '4,000 ETB',
    stylist: 'Helen M.',
    image: '/images/services/makeup-main.jpg',
    rating: 5,
    review: "Absolutely stunning work. I felt like a queen."
  },
  {
    id: 'H-102',
    name: 'Classic Manicure',
    date: 'May 05, 2023',
    price: '300 ETB',
    stylist: 'Sara L.',
    image: '/images/services/nails-main.jpg',
  }
];

export default function HistoryPage() {
  const [history, setHistory] = useState(PAST_SERVICES);
  const [selectedService, setSelectedService] = useState<PastService | null>(null);

  const handleUpdateReview = (id: string, rating: number, review: string) => {
    setHistory(prev => prev.map(item => 
      item.id === id ? { ...item, rating, review } : item
    ));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light italic text-[#D4AF7A]">Service History</h1>
        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-2 tracking-widest">A record of your beauty journey</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {history.map((service, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={service.id}
            className="group bg-white/[0.02] border border-white/5 p-6 hover:bg-white/[0.04] transition-all cursor-pointer"
            onClick={() => setSelectedService(service)}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6 w-full">
                <div className="w-16 h-16 bg-zinc-900 flex items-center justify-center text-[#D4AF7A] border border-white/5">
                  <CheckCircle2 size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">{service.id}</p>
                  <h3 className="text-xl font-light italic text-white">{service.name}</h3>
                  <p className="text-white/50 text-xs">{service.date} • with {service.stylist}</p>
                </div>
              </div>

              <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right">
                  <p className="text-white font-medium">{service.price}</p>
                  {service.rating ? (
                    <div className="flex gap-1 justify-end mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} fill={i < service.rating! ? "#D4AF7A" : "none"} className="text-[#D4AF7A]" />
                      ))}
                    </div>
                  ) : (
                    <p className="text-[#D4AF7A] text-[9px] uppercase tracking-tighter mt-1 italic">Pending Review</p>
                  )}
                </div>
                <FileText className="text-white/20 group-hover:text-[#D4AF7A] transition-colors" size={20} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <ServiceDetailModal 
        service={selectedService} 
        onClose={() => setSelectedService(null)}
        onSaveReview={handleUpdateReview}
      />
    </div>
  );
}