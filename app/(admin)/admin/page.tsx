"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, Calendar, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { name: 'Revenue', value: '142,500 ETB', trend: '+12%', icon: DollarSign },
    { name: 'Active Clients', value: '1,240', trend: '+5%', icon: Users },
    { name: 'Appointments', value: '48', trend: 'Today', icon: Calendar },
    { name: 'Conversion', value: '64%', trend: '+8%', icon: TrendingUp },
  ];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-white text-3xl font-light italic tracking-tight">Executive Overview</h2>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] mt-2">Daily business performance</p>
        </div>
        <div className="text-right">
          <p className="text-white/20 text-[10px] uppercase tracking-widest">Last Updated</p>
          <p className="text-[#D4AF7A] text-sm">June 27, 2024 • 15:42</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#121212] border border-white/5 p-6 space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="p-3 bg-[#D4AF7A]/10 text-[#D4AF7A] rounded-none">
                <stat.icon size={20} />
              </div>
              <span className="text-green-400 text-[10px] font-bold">{stat.trend}</span>
            </div>
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-widest">{stat.name}</p>
              <p className="text-2xl text-white font-medium mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Table (Concept) */}
      <div className="bg-[#121212] border border-white/5">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-white text-sm uppercase tracking-widest">Upcoming Rituals</h3>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-white/20 border-b border-white/5">
                <th className="p-6">Client</th>
                <th className="p-6">Service</th>
                <th className="p-6">Stylist</th>
                <th className="p-6">Time</th>
                <th className="p-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm font-light">
              {[1, 2, 3].map((_, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-white">Sara Tadesse</td>
                  <td className="p-6 text-white/60">Ethiopian Shuruba</td>
                  <td className="p-6 text-[#D4AF7A]">Martha K.</td>
                  <td className="p-6 text-white/60">16:00 PM</td>
                  <td className="p-6 text-right">
                    <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[9px] uppercase font-bold tracking-tighter">Confirmed</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}