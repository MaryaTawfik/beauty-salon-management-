"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Scissors, Trash2, Loader2, User } from 'lucide-react';
import { useBookings } from '@/app/context/BookingContext';
import { getActiveUser } from '@/lib/auth-utils';

export default function UserAppointments() {
  const { userBookings, cancelAppointment, isMounted } = useBookings();
  const [user, setUser] = useState<any>(null);

  useEffect(() => { setUser(getActiveUser()); }, []);
  if (!isMounted || !user) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-[#D4AF7A]" /></div>;

  const myApts = userBookings.filter(b => b.userEmail === user.email);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-light italic text-[#D4AF7A]">My Rituals</h2>
      <div className="space-y-4">
        {myApts.map((apt) => (
          <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: 20 }} key={apt.id} className="bg-[#121212] border border-white/5 p-6 flex flex-col md:flex-row justify-between items-center group">
            <div className="flex gap-6 items-center">
              <div className="w-12 h-12 rounded-full bg-[#D4AF7A]/10 text-[#D4AF7A] flex items-center justify-center"><Scissors size={20} /></div>
              <div>
                <h4 className="text-xl text-white font-light italic">{apt.serviceName}</h4>
                <div className="flex gap-4 text-[10px] text-white/40 uppercase tracking-widest mt-1">
                  <span className="flex items-center gap-1"><User size={12}/> {apt.stylistName}</span>
                  <span className="flex items-center gap-1"><Calendar size={12}/> {apt.date} @ {apt.time}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right"><p className="text-[#D4AF7A] text-lg font-medium">{apt.price}</p><span className="text-green-500 text-[8px] uppercase font-black px-2 py-0.5 bg-green-500/10 border border-green-500/10">Confirmed</span></div>
              <button onClick={() => { if(confirm("Cancel?")) cancelAppointment(apt.id) }} className="p-3 text-white/10 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
            </div>
          </motion.div>
        ))}
        {myApts.length === 0 && <p className="text-white/20 text-center py-20 uppercase text-xs border border-dashed border-white/5">No sanctuary reservations found.</p>}
      </div>
    </div>
  );
}