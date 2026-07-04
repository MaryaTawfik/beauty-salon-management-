"use client";

import React, { useState } from 'react';
import { useBookings } from '@/app/context/BookingContext';
import { useServices } from '@/app/context/ServiceContext';
import { STYLISTS } from '@/app/data/stylists';
import { Plus, Trash2, Calendar, Clock, User, CheckCircle, Square, CheckSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminScheduleManager() {
  const { availableSlots, addAvailableSlot, removeAvailableSlot, userBookings, isMounted } = useBookings();
  const { categories } = useServices();
  
  // States for mass creation
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [selectedStylists, setSelectedStylists] = useState<string[]>([]);
  const [allowedServices, setAllowedServices] = useState<string[]>([]);

  const ritualNames = categories.flatMap(cat => cat.subServices.map(s => s.name));

  const handleAddMassSlots = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStylists.length === 0 || allowedServices.length === 0) {
      alert("Please select at least one artist and one authorized ritual.");
      return;
    }

    // Loop through selected stylists and create unique slots for each
    selectedStylists.forEach(stylist => {
      addAvailableSlot({
        id: Math.random().toString(36).substr(2, 9),
        date: newDate,
        time: newTime,
        stylistName: stylist,
        allowedServices: allowedServices,
        isBooked: false
      });
    });

    // Reset selection for next entry
    setSelectedStylists([]);
    alert(`Success: Created ${selectedStylists.length} availability slots.`);
  };

  const toggleStylist = (name: string) => {
    setSelectedStylists(prev => prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]);
  };

  const toggleService = (name: string) => {
    setAllowedServices(prev => prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]);
  };

  if(!isMounted) return null;

  return (
    <div className="space-y-10 mt-6 lg:mt-12 text-white pb-20">
      <div className="space-y-2">
        <h1 className="text-3xl font-light italic text-[#D4AF7A]">Mass Schedule Authorizer</h1>
        <p className="text-white/40 text-[10px] uppercase tracking-[0.3em]">Deploy availability across multiple artists</p>
      </div>

      {/* 1. MULTI-SLOT CREATOR FORM */}
      <form onSubmit={handleAddMassSlots} className="bg-[#121212] border border-white/5 p-8 space-y-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* A. Timing */}
          <div className="space-y-4">
            <label className="text-[10px] uppercase text-[#D4AF7A] tracking-widest font-bold border-b border-white/5 pb-2 block">1. Schedule</label>
            <input type="date" required className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none transition-all [color-scheme:dark]" onChange={e => setNewDate(e.target.value)} />
            <input type="time" required className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none transition-all [color-scheme:dark]" onChange={e => setNewTime(e.target.value)} />
          </div>

          {/* B. Multi-Stylist */}
          <div className="space-y-4">
            <label className="text-[10px] uppercase text-[#D4AF7A] tracking-widest font-bold border-b border-white/5 pb-2 block">2. Assign Artists</label>
            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {STYLISTS.map(s => (
                <button 
                  key={s.id} type="button" onClick={() => toggleStylist(s.name)}
                  className={cn(
                    "flex items-center gap-3 p-4 border transition-all text-left group",
                    selectedStylists.includes(s.name) ? "bg-[#D4AF7A] border-[#D4AF7A] text-[#121212]" : "bg-white/5 border-white/5 text-white/40 hover:border-white/20"
                  )}
                >
                  {selectedStylists.includes(s.name) ? <CheckSquare size={16} /> : <Square size={16} className="opacity-20 group-hover:opacity-100" />}
                  <span className="text-[11px] font-bold uppercase tracking-widest">{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* C. Multi-Service */}
          <div className="space-y-4">
            <label className="text-[10px] uppercase text-[#D4AF7A] tracking-widest font-bold border-b border-white/5 pb-2 block">3. Valid Rituals</label>
            <div className="h-48 overflow-y-auto border border-white/10 p-4 space-y-3 bg-black/20 custom-scrollbar">
              {ritualNames.map(name => (
                <label key={name} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={allowedServices.includes(name)} onChange={() => toggleService(name)} className="accent-[#D4AF7A] w-4 h-4" />
                  <span className="text-[11px] uppercase tracking-tighter text-white/40 group-hover:text-white transition-colors">{name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
          type="submit"
          className="w-full bg-[#D4AF7A] text-[#121212] py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all shadow-xl"
        >
          Authorize Availability for {selectedStylists.length} Artists
        </motion.button>
      </form>

      {/* 2. LIVE SCHEDULE VIEW */}
      <div className="space-y-6">
        <h2 className="text-[10px] uppercase tracking-[0.5em] text-white/20 border-b border-white/5 pb-4">Real-Time Schedule Status</h2>
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence mode='popLayout'>
            {availableSlots.map(slot => {
              const booking = userBookings.find(b => b.date === slot.date && b.time === slot.time && b.stylistName === slot.stylistName);

              return (
                <motion.div 
                  layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  key={slot.id} 
                  className={cn(
                    "border p-6 transition-all duration-500 flex flex-col md:flex-row justify-between items-center gap-8",
                    slot.isBooked ? "bg-white/[0.03] border-[#D4AF7A]/30" : "bg-[#121212] border-white/5"
                  )}
                >
                  <div className="flex items-center gap-6 min-w-[240px]">
                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center border", slot.isBooked ? "bg-[#D4AF7A] text-black border-[#D4AF7A]" : "border-white/10")}><Clock size={20} /></div>
                    <div>
                      <p className="text-lg font-light text-white">{slot.date}</p>
                      <p className="text-[#D4AF7A] text-[10px] uppercase font-bold tracking-[0.2em]">{slot.time}</p>
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <p className="text-[#D4AF7A] text-xs font-bold uppercase tracking-widest mb-1">{slot.stylistName}</p>
                    <p className="text-white/30 text-[9px] uppercase leading-relaxed tracking-tighter">
                      Valid for: {slot.allowedServices?.join(" • ") || "All Rituals"}
                    </p>
                  </div>

                  {slot.isBooked && booking ? (
                    <div className="bg-white/5 px-6 py-3 border border-white/5 text-left min-w-[200px]">
                      <p className="text-[8px] uppercase text-white/30 mb-1">Confirmed Guest</p>
                      <p className="text-xs text-white font-medium">{booking.userName}</p>
                      <p className="text-[10px] text-[#D4AF7A] italic">{booking.serviceName}</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-white/10 uppercase tracking-[0.3em] text-[9px]">
                      <CheckCircle size={14} /> Open for Ritual
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    {!slot.isBooked && (
                      <button onClick={() => removeAvailableSlot(slot.id)} className="p-3 text-white/20 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"><Trash2 size={20}/></button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}