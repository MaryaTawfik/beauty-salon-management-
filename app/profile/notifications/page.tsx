"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Calendar, Gift, Tag, Trash2, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SalonNotification } from '@/app/types/profile';
const INITIAL_NOTIFICATIONS: SalonNotification[] = [
  {
    id: '1',
    type: 'appointment',
    title: 'Reminder: Hair Styling',
    message: 'Your appointment with Martha K. is tomorrow at 10:00 AM. We look forward to seeing you.',
    time: '2 hours ago',
    isRead: false
  },
  {
    id: '2',
    type: 'reward',
    title: 'New Points Earned',
    message: 'You earned 150 points from your last visit! You are getting closer to a free treatment.',
    time: '1 day ago',
    isRead: true
  },
  {
    id: '3',
    type: 'promotion',
    title: 'Exclusive Weekend Offer',
    message: 'Members get 15% off on all Spa rituals this weekend. Book your spot now.',
    time: '3 days ago',
    isRead: true
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'appointment': return <Calendar size={18} />;
      case 'reward': return <Gift size={18} />;
      case 'promotion': return <Tag size={18} />;
      default: return <Bell size={18} />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Action */}
      <div className="flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-light italic text-[#D4AF7A]">Notifications</h1>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-2">Stay updated with your beauty schedule</p>
        </div>
        <button 
          onClick={markAllAsRead}
          className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-[#D4AF7A] hover:text-white transition-colors"
        >
          <CheckCheck size={14} /> Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {notifications.map((n, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              key={n.id}
              className={cn(
                "group relative p-6 border transition-all duration-500",
                n.isRead 
                  ? "bg-white/[0.01] border-white/5 opacity-60" 
                  : "bg-white/[0.04] border-[#D4AF7A]/20"
              )}
            >
              <div className="flex gap-6">
                {/* Icon Column */}
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border",
                  n.isRead ? "border-white/10 text-white/20" : "border-[#D4AF7A]/40 text-[#D4AF7A]"
                )}>
                  {getIcon(n.type)}
                </div>

                {/* Content Column */}
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className={cn(
                      "text-lg font-light tracking-wide",
                      n.isRead ? "text-white/60" : "text-white"
                    )}>
                      {n.title}
                    </h3>
                    <span className="text-[10px] text-white/30 uppercase tracking-tighter">{n.time}</span>
                  </div>
                  <p className="text-sm text-white/40 font-light leading-relaxed max-w-xl">
                    {n.message}
                  </p>
                </div>

                {/* Delete Button */}
                <button 
                  onClick={() => deleteNotification(n.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-white/20 hover:text-red-400 transition-all self-center"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Unread Indicator Dot */}
              {!n.isRead && (
                <div className="absolute top-6 right-6 w-2 h-2 bg-[#D4AF7A] rounded-full shadow-[0_0_10px_#D4AF7A]" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {notifications.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="py-32 text-center border border-dashed border-white/5"
          >
            <Bell className="mx-auto text-white/5 mb-4" size={48} />
            <p className="text-white/20 uppercase tracking-[0.3em] text-xs">Your inbox is empty</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}