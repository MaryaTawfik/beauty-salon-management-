"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getActiveUser } from '@/lib/auth-utils';
import { Award, Star, TrendingUp, Calendar } from 'lucide-react';

export default function ProfileOverview() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getActiveUser());
  }, []);

  if (!user) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-light italic tracking-tight text-white">Welcome back, {user.fullName.split(' ')[0]}</h1>
        <p className="text-white/40 text-xs uppercase tracking-[0.2em]">Your Private Sanctuary Dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Loyalty Points', val: '850', icon: Award },
          { label: 'Completed Rituals', val: '12', icon: Star },
          { label: 'Upcoming', val: '1', icon: Calendar },
        ].map((stat, i) => (
          <div key={i} className="bg-[#121212] border border-white/5 p-6 space-y-4">
            <stat.icon className="text-[#D4AF7A]" size={20} />
            <div>
              <p className="text-white/30 text-[9px] uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-medium text-white">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-[#D4AF7A]/10 to-transparent border-l-2 border-[#D4AF7A] p-8">
        <h3 className="text-white text-lg font-light italic mb-2">Member Special</h3>
        <p className="text-white/60 text-sm max-w-md leading-relaxed">
          As a Gold Tier member, you have a complimentary Hand Henna session waiting for your next visit.
        </p>
      </div>
    </motion.div>
  );
}