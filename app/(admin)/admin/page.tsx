"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, Calendar, TrendingUp, Clock } from 'lucide-react';
import { useBookings } from '@/app/context/BookingContext';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const { userBookings, isMounted } = useBookings();
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // 1. Calculate Real Revenue (Sum of all Confirmed/Delivered orders)
    const savedOrders = JSON.parse(localStorage.getItem("salon_orders") || "[]");
    const revenue = savedOrders
      .filter((o: any) => o.status === 'Confirmed' || o.status === 'Delivered' || o.status === 'Out for Delivery')
      .reduce((sum: number, o: any) => sum + Number(o.totalAmount), 0);
    setTotalRevenue(revenue);

    // 2. Calculate Active Clients (Unique users from our DB)
    const savedUsers = JSON.parse(localStorage.getItem("salon_users_db") || "[]");
    setClientCount(savedUsers.length);

    // 3. Set "Last Updated" timestamp
    const now = new Date();
    setCurrentTime(now.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }));
  }, []);

  // 4. Get the 5 most recent upcoming appointments
  const upcomingRituals = useMemo(() => {
    return userBookings
      .filter(b => b.status === 'Upcoming')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  }, [userBookings]);

  const stats = [
    { 
      name: 'Total Revenue', 
      value: `${totalRevenue.toLocaleString()} ETB`, 
      trend: 'Live', 
      icon: DollarSign 
    },
    { 
      name: 'Registered Clients', 
      value: clientCount, 
      trend: '+100%', 
      icon: Users 
    },
    { 
      name: 'Upcoming Rituals', 
      value: userBookings.filter(b => b.status === 'Upcoming').length, 
      trend: 'Today', 
      icon: Calendar 
    },
    { 
      name: 'Avg. Order Value', 
      value: `${clientCount > 0 ? Math.round(totalRevenue / clientCount) : 0} ETB`, 
      trend: 'Target', 
      icon: TrendingUp 
    },
  ];

  if (!isMounted) return null;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-white text-3xl font-light italic tracking-tight">Executive Overview</h2>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] mt-2">Real-time business performance</p>
        </div>
        <div className="text-right">
          <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold">Last Synchronized</p>
          <p className="text-[#D4AF7A] text-[11px] font-mono uppercase mt-1">{currentTime}</p>
        </div>
      </div>

      {/* Live Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#121212] border border-white/5 p-6 space-y-4 hover:border-[#D4AF7A]/30 transition-all group"
          >
            <div className="flex justify-between items-center">
              <div className="p-3 bg-[#D4AF7A]/10 text-[#D4AF7A] rounded-none group-hover:bg-[#D4AF7A] group-hover:text-black transition-all">
                <stat.icon size={20} />
              </div>
              <span className="text-[#D4AF7A] text-[9px] font-black uppercase tracking-tighter">{stat.trend}</span>
            </div>
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">{stat.name}</p>
              <p className="text-2xl text-white font-light tracking-tight mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upcoming Rituals Table (Real Data) */}
      <div className="bg-[#121212] border border-white/5">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-white text-sm uppercase tracking-widest font-bold">Upcoming Rituals</h3>
          <span className="text-[10px] text-white/30 italic">Showing next 5 scheduled sessions</span>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.2em] text-white/20 border-b border-white/5">
                <th className="p-6">Client & Contact</th>
                <th className="p-6">Service Ritual</th>
                <th className="p-6">Assigned Artist</th>
                <th className="p-6">Schedule</th>
                <th className="p-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm font-light">
              {upcomingRituals.length > 0 ? (
                upcomingRituals.map((booking) => (
                  <tr key={booking.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="text-white font-medium group-hover:text-[#D4AF7A] transition-colors">{booking.userName}</span>
                        <span className="text-[10px] text-white/30 font-mono">{booking.userEmail}</span>
                      </div>
                    </td>
                    <td className="p-6 text-white/60 italic">{booking.serviceName}</td>
                    <td className="p-6 text-[#D4AF7A] font-bold uppercase text-[10px] tracking-widest">{booking.stylistName}</td>
                    <td className="p-6">
                       <div className="flex items-center gap-2 text-white/60">
                         <Clock size={12} className="text-[#D4AF7A]" />
                         <span className="text-xs">{booking.date} • {booking.time}</span>
                       </div>
                    </td>
                    <td className="p-6 text-right">
                      <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[9px] uppercase font-black tracking-tighter border border-green-500/20">
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-20 text-center text-white/20 uppercase text-xs tracking-widest italic">
                    No upcoming rituals found in the database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}