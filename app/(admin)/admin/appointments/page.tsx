"use client";
import React, { useState } from 'react';
import { useBookings } from '@/app/context/BookingContext';
import { Plus, Trash2, Calendar as CalIcon, Clock } from 'lucide-react';

export default function AdminAvailability() {
  const { availableSlots, addAvailableSlot, removeAvailableSlot } = useBookings();
  const [newSlot, setNewSlot] = useState({ date: '', time: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addAvailableSlot({
      id: Date.now().toString(),
      date: newSlot.date,
      time: newSlot.time,
      isBooked: false
    });
  };

  return (
    <div className="space-y-10 mt-10">
      <h1 className="text-3xl font-light italic text-white">Schedule Manager</h1>
      
      {/* ADD SLOT FORM */}
      <form onSubmit={handleAdd} className="bg-[#121212] border border-white/5 p-8 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 space-y-2">
          <label className="text-[10px] uppercase text-white/40 tracking-widest">Date</label>
          <input type="date" required className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-[#D4AF7A] outline-none" 
            onChange={e => setNewSlot({...newSlot, date: e.target.value})} />
        </div>
        <div className="flex-1 space-y-2">
          <label className="text-[10px] uppercase text-white/40 tracking-widest">Time</label>
          <input type="time" required className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-[#D4AF7A] outline-none" 
            onChange={e => setNewSlot({...newSlot, time: e.target.value})} />
        </div>
        <button className="bg-[#D4AF7A] text-black px-8 py-3.5 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all">
          Post Available Slot
        </button>
      </form>

      {/* LIST OF SLOTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {availableSlots.map(slot => (
          <div key={slot.id} className="bg-[#121212] border border-white/5 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3 text-white/80">
              <CalIcon size={14} className="text-[#D4AF7A]"/>
              <span className="text-sm font-light">{slot.date} @ {slot.time}</span>
              {slot.isBooked && <span className="text-[8px] bg-red-500/20 text-red-400 px-2 py-0.5 uppercase font-bold">Booked</span>}
            </div>
            {!slot.isBooked && (
              <button onClick={() => removeAvailableSlot(slot.id)} className="text-white/20 hover:text-red-500"><Trash2 size={16}/></button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}