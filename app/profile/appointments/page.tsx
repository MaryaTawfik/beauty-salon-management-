"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Scissors, Trash2 } from 'lucide-react';
import { useBookings } from '@/app/context/BookingContext';
import { getActiveUser } from '@/lib/auth-utils';

export default function UserAppointments() {
  const { userBookings, cancelAppointment, isMounted } = useBookings();
  const user = getActiveUser();

  if (!isMounted || !user) return null;

  const myApts = userBookings.filter(b => b.userEmail === user.email);

  return (
    <div className="space-y-8">
      <div className="border-b border-white/5 pb-6">
        <h2 className="text-3xl font-light italic text-[#D4AF7A]">My Rituals</h2>
        <p className="text-white/40 text-[10px] uppercase tracking-widest mt-2">Manage your scheduled sanctuary sessions</p>
      </div>

      <div className="space-y-4">
        {myApts.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-white/10">
            <p className="text-white/20 text-xs uppercase tracking-widest">You have no upcoming rituals.</p>
          </div>
        ) : (
          <AnimatePresence mode='popLayout'>
            {myApts.map((apt) => (
              <motion.div
                layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: 20 }}
                key={apt.id}
                className="bg-[#121212] border border-white/5 p-6 flex flex-col md:flex-row justify-between items-center group hover:border-[#D4AF7A]/30 transition-all duration-500"
              >
                <div className="flex gap-6 items-center">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF7A]/10 text-[#D4AF7A] flex items-center justify-center">
                    <Scissors size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl text-white font-light italic">{apt.serviceName}</h4>
                    <div className="flex gap-4 text-[10px] text-white/40 uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Calendar size={12}/> {apt.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12}/> {apt.time}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 mt-4 md:mt-0">
                  <div className="text-right">
                    <p className="text-[#D4AF7A] text-lg font-medium">{apt.price}</p>
                    <span className="text-green-500 text-[8px] uppercase font-black px-2 py-0.5 bg-green-500/10 border border-green-500/10">Confirmed</span>
                  </div>
                  <button 
                    onClick={() => { if(confirm("Cancel this ritual?")) cancelAppointment(apt.id) }}
                    className="p-3 text-white/10 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18}/>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}