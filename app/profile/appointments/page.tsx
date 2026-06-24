// "use client";

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Calendar, Clock, User, CheckCircle2, XCircle, RefreshCcw } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import BookingModal from '../../../components/services/booking/BookingModal';


"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, CheckCircle2, XCircle, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import BookingModal from '../../../components/services/booking/BookingModal';

const INITIAL_APPOINTMENTS = [
  { id: '1', service: 'Ethiopian Shuruba', date: 'Oct 24, 2023', time: '10:00 AM', stylist: 'Martha K.', status: 'Upcoming' },
  { id: '2', service: 'Gel Nails + Art', date: 'Sept 15, 2023', time: '02:30 PM', stylist: 'Sara L.', status: 'Completed' }
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  
  // NEW: Track which specific appointment we are editing
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleCancel = (id: string) => {
    if (confirm("Are you sure you want to cancel?")) {
      setAppointments(prev => prev.filter(apt => apt.id !== id));
    }
  };

  // Open modal and store the ID of the appointment we want to change
  const openReschedule = (id: string, serviceName: string) => {
    setEditingId(id);
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  // THIS IS THE CORE LOGIC: Update the list with the new data from the modal
  const handleUpdateData = (newData: { date: string; time: string }) => {
    setAppointments(prev => prev.map(apt => {
      if (apt.id === editingId) {
        return { 
          ...apt, 
          date: newData.date, 
          time: newData.time.padStart(5, '0') // Ensures 09:00 format
        };
      }
      return apt;
    }));
    setEditingId(null); // Clear the editing state
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light italic text-[#D4AF7A]">My Appointments</h1>
        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-2 tracking-widest">Manage your scheduled luxury sessions</p>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode='popLayout'>
          {appointments.map((apt) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
              key={apt.id}
              className="group relative bg-white/[0.02] border border-white/5 p-6 hover:border-[#D4AF7A]/30 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex gap-6">
                  <div className={cn(
                    "w-12 h-12 flex items-center justify-center rounded-full border",
                    apt.status === 'Upcoming' ? "border-[#D4AF7A]/50 text-[#D4AF7A]" : "border-white/10 text-white/30"
                  )}>
                    {apt.status === 'Upcoming' ? <Clock size={20} /> : <CheckCircle2 size={20} />}
                  </div>
                  
                  <div className="space-y-1">
                    <span className={cn(
                      "text-[9px] uppercase tracking-widest px-2 py-0.5 border",
                      apt.status === 'Upcoming' ? "border-[#D4AF7A] text-[#D4AF7A]" : "border-white/20 text-white/40"
                    )}>
                      {apt.status}
                    </span>
                    <h3 className="text-xl font-light italic text-white">{apt.service}</h3>
                    <div className="flex flex-wrap gap-4 text-white/40 text-xs">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {apt.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {apt.time}</span>
                      <span className="flex items-center gap-1"><User size={12} /> {apt.stylist}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => openReschedule(apt.id, apt.service)}
                    className="px-6 py-3 border border-white/10 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                  >
                    {apt.status === 'Upcoming' ? 'Reschedule' : 'Book Again'}
                  </button>
                  {apt.status === 'Upcoming' && (
                    <button onClick={() => handleCancel(apt.id)} className="p-3 border border-white/10 text-red-400/50 hover:text-red-400 transition-all">
                      <XCircle size={18} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={selectedService}
        onSuccess={handleUpdateData} // Connect the modal to the update logic
      />
    </div>
  );
}