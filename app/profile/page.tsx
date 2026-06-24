"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Award, Calendar, Sparkles } from 'lucide-react';
import { cn } from "@/lib/utils";
export default function ProfileOverview() {
  const stats = [
    { name: 'Total Spent', value: '12,500 ETB', icon: CreditCard },
    { name: 'Loyalty Points', value: '850 pts', icon: Award, highlight: true },
    { name: 'Appointments', value: '12 Total', icon: Calendar },
  ];

  return (
    <div className="space-y-10">
      {/* 1. Header Area */}
      <div>
        <h1 className="text-4xl font-light italic tracking-tight mb-2 text-[#D4AF7A]">Dashboard Overview</h1>
        <p className="text-white/40 text-sm uppercase tracking-widest">Welcome back to your luxury sanctuary.</p>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.name}
            className={cn(
              "p-6 border border-white/10 flex flex-col gap-4 relative overflow-hidden",
              stat.highlight ? "bg-gradient-to-br from-[#D4AF7A]/20 to-transparent" : "bg-white/[0.02]"
            )}
          >
            <stat.icon className={stat.highlight ? "text-[#D4AF7A]" : "text-white/40"} size={24} />
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">{stat.name}</p>
              <p className="text-2xl font-light tracking-wide">{stat.value}</p>
            </div>
            {stat.highlight && <Sparkles className="absolute -top-2 -right-2 text-[#D4AF7A]/20" size={60} />}
          </motion.div>
        ))}
      </div>

      {/* 3. Upcoming Appointment Card */}
      <div className="border border-white/10 bg-white/[0.02] p-8 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-[#D4AF7A] text-xs uppercase tracking-[0.4em] mb-4 font-bold">Your Next Experience</h3>
            <h4 className="text-3xl font-light italic mb-2">Ethiopian Shuruba</h4>
            <div className="flex gap-6 text-white/60 text-sm">
              <p>Oct 24, 2023</p>
              <p>10:00 AM</p>
              <p>With <span className="text-white">Senior Stylist Martha</span></p>
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-8 py-4 bg-[#D4AF7A] text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all">
              Reschedule
            </button>
            <button className="flex-1 md:flex-none px-8 py-4 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest hover:border-white transition-all">
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* 4. Reward Progress */}
      <div className="bg-[#D4AF7A] p-8 text-[#121212] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-xs uppercase tracking-[0.4em] font-black">Royal Loyalty Program</h3>
          <p className="text-xl font-light italic">You are only 150 points away from a <span className="font-bold underline">Free Facial Treatment</span>.</p>
        </div>
        <button className="bg-[#121212] text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#121212] transition-all">
          View All Rewards
        </button>
      </div>
    </div>
  );
}