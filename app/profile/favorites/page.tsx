"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Calendar, Trash2, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import BookingModal from '@/components/services/booking/BookingModal';

// Mock Data
const SAVED_SERVICES = [
  { id: 's1', name: 'Ethiopian Shuruba', price: '1,500 ETB', duration: '3-5 Hours', image: '/images/services/shuruba-1.jpg' },
  { id: 's2', name: 'Gel Nails + Art', price: '1,200 ETB', duration: '90 Mins', image: '/images/services/gel-nails.jpg' },
];

const SAVED_STYLISTS = [
  { id: 'st1', name: 'Martha K.', role: 'Senior Hair Artist', rating: 5, image: '/images/stylists/martha.jpg' },
  { id: 'st2', name: 'Sara L.', role: 'Nail Technician', rating: 4.9, image: '/images/stylists/sara.jpg' },
];

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState<'services' | 'stylists'>('services');
  const [services, setServices] = useState(SAVED_SERVICES);
  const [stylists, setStylists] = useState(SAVED_STYLISTS);
  
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const removeService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const removeStylist = (id: string) => {
    setStylists(prev => prev.filter(s => s.id !== id));
  };

  const handleQuickBook = (name: string) => {
    setSelectedService(name);
    setIsBookingOpen(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light italic text-[#D4AF7A]">My Favorites</h1>
        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-2 tracking-widest">Your preferred beauty essentials</p>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-8 border-b border-white/5">
        {['services', 'stylists'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={cn(
              "pb-4 text-[10px] uppercase tracking-[0.3em] transition-all relative",
              activeTab === tab ? "text-[#D4AF7A]" : "text-white/30 hover:text-white"
            )}
          >
            {tab}
            {activeTab === tab && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#D4AF7A]" />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {activeTab === 'services' ? (
            services.map((service) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={service.id}
                className="bg-white/[0.02] border border-white/5 p-4 flex gap-4 group"
              >
                <div className="relative w-24 h-24 bg-zinc-900 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-white/5"><Heart size={40} /></div>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white font-light text-lg">{service.name}</h3>
                    <p className="text-[#D4AF7A] text-xs uppercase tracking-widest">{service.price}</p>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => handleQuickBook(service.name)}
                      className="text-[9px] uppercase tracking-widest text-white/60 hover:text-[#D4AF7A] flex items-center gap-1"
                    >
                      <Calendar size={12} /> Book
                    </button>
                    <button 
                      onClick={() => removeService(service.id)}
                      className="text-[9px] uppercase tracking-widest text-white/20 hover:text-red-400 flex items-center gap-1"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            stylists.map((stylist) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={stylist.id}
                className="bg-white/[0.02] border border-white/5 p-4 flex items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#D4AF7A]/20 flex items-center justify-center text-[#D4AF7A]">
                  <User size={30} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-light">{stylist.name}</h3>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest">{stylist.role}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={10} fill="#D4AF7A" className="text-[#D4AF7A]" />
                    <span className="text-[10px] text-white/60">{stylist.rating}</span>
                  </div>
                </div>
                <button 
                  onClick={() => removeStylist(stylist.id)}
                  className="p-2 text-white/10 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {((activeTab === 'services' && services.length === 0) || (activeTab === 'stylists' && stylists.length === 0)) && (
        <div className="py-20 text-center border border-dashed border-white/5">
          <Heart className="mx-auto text-white/5 mb-4" size={40} />
          <p className="text-white/20 uppercase tracking-[0.2em] text-xs">Nothing saved yet</p>
        </div>
      )}

      <BookingModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        serviceName={selectedService}
      />
    </div>
  );
}