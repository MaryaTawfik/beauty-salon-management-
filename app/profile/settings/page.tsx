"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, Lock, Bell, 
  ShieldCheck, Smartphone, Check, AlertCircle, Tag // <--- ADD Tag HERE
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Reusable Luxury Toggle Component ---
const LuxuryToggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
  <button
    onClick={(e) => { e.preventDefault(); onChange(); }}
    className={cn(
      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF7A]/20",
      enabled ? "bg-[#D4AF7A]" : "bg-white/10"
    )}
  >
    <motion.span
      animate={{ x: enabled ? 24 : 4 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm"
    />
  </button>
);

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<'profile' | 'security' | 'notifications'>('profile');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');

  // --- 1. State for Profile Information ---
  const [profile, setProfile] = useState({
    fullName: "Jane Doe",
    email: "jane.doe@luxury.com",
    phone: "+251 911 223344"
  });

  // --- 2. State for Notification Preferences ---
  const [notifications, setNotifications] = useState({
    appointmentsEmail: true,
    appointmentsSMS: true,
    marketingEmail: false,
    securityAlerts: true
  });

  // --- 3. State for Password Update ---
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  // --- Handlers ---
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 1000);
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const menuTabs = [
    { id: 'profile', label: 'Personal Info', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-light italic text-[#D4AF7A]">Account Settings</h1>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-2">Personalize your luxury experience</p>
        </div>
        
        {saveStatus === 'success' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-2 border border-green-400/20 text-[10px] uppercase tracking-widest"
          >
            <Check size={14} /> Changes Saved Successfully
          </motion.div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-8 border-b border-white/5">
        {menuTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={cn(
              "pb-4 text-[10px] uppercase tracking-[0.3em] transition-all relative flex items-center gap-2",
              activeSection === tab.id ? "text-[#D4AF7A]" : "text-white/30 hover:text-white"
            )}
          >
            <tab.icon size={14} />
            {tab.label}
            {activeSection === tab.id && (
              <motion.div layoutId="settingsTab" className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#D4AF7A]" />
            )}
          </button>
        ))}
      </div>

      <div className="max-w-2xl">
        <AnimatePresence mode="wait">
          {/* PROFILE TAB */}
          {activeSection === 'profile' && (
            <motion.form 
              key="profile"
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
              onSubmit={handleSaveProfile}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF7A]/40" size={16} />
                    <input 
                      type="text" 
                      value={profile.fullName}
                      onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 p-4 pl-10 text-sm text-white focus:border-[#D4AF7A] outline-none transition-all" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF7A]/40" size={16} />
                    <input 
                      type="tel" 
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 p-4 pl-10 text-sm text-white focus:border-[#D4AF7A] outline-none transition-all" 
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF7A]/40" size={16} />
                  <input 
                    type="email" 
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 p-4 pl-10 text-sm text-white focus:border-[#D4AF7A] outline-none transition-all" 
                  />
                </div>
              </div>
              <button 
                type="submit"
                disabled={saveStatus === 'saving'}
                className="px-10 py-4 bg-[#D4AF7A] text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50"
              >
                {saveStatus === 'saving' ? 'Processing...' : 'Update Profile'}
              </button>
            </motion.form>
          )}

          {/* SECURITY TAB */}
          {activeSection === 'security' && (
            <motion.div 
              key="security"
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
              className="space-y-8"
            >
              <div className="p-6 bg-blue-500/5 border border-blue-500/20 flex items-start gap-4">
                <ShieldCheck className="text-blue-400 mt-1" size={20} />
                <div>
                  <p className="text-white text-sm">Account Security Status</p>
                  <p className="text-white/40 text-xs mt-1">Your account is currently protected by Two-Factor Authentication via email.</p>
                </div>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">Current Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">New Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none transition-all" 
                    />
                  </div>
                </div>
                <button className="px-10 py-4 border border-[#D4AF7A]/30 text-[#D4AF7A] text-[10px] font-bold uppercase tracking-widest hover:bg-[#D4AF7A] hover:text-black transition-all">
                  Change Password
                </button>
              </form>
            </motion.div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeSection === 'notifications' && (
            <motion.div 
              key="notifications"
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
              className="space-y-10"
            >
              {/* Appointments */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF7A]/10 flex items-center justify-center text-[#D4AF7A]">
                    <Smartphone size={14} />
                  </div>
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-white">Booking Alerts</h3>
                </div>

                <div className="space-y-0 border border-white/5 bg-white/[0.02]">
                  <div className="flex justify-between items-center p-6 border-b border-white/5">
                    <div>
                      <p className="text-sm text-white/80">Email Confirmations</p>
                      <p className="text-xs text-white/30 italic mt-1 font-light">Sent immediately after booking</p>
                    </div>
                    <LuxuryToggle 
                      enabled={notifications.appointmentsEmail} 
                      onChange={() => toggleNotification('appointmentsEmail')} 
                    />
                  </div>
                  <div className="flex justify-between items-center p-6">
                    <div>
                      <p className="text-sm text-white/80">SMS Reminders</p>
                      <p className="text-xs text-white/30 italic mt-1 font-light">Received 24 hours before appointment</p>
                    </div>
                    <LuxuryToggle 
                      enabled={notifications.appointmentsSMS} 
                      onChange={() => toggleNotification('appointmentsSMS')} 
                    />
                  </div>
                </div>
              </div>

              {/* Marketing */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF7A]/10 flex items-center justify-center text-[#D4AF7A]">
                    <Tag size={14} />
                  </div>
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-white">Luxury Offers</h3>
                </div>

                <div className="space-y-0 border border-white/5 bg-white/[0.02]">
                  <div className="flex justify-between items-center p-6">
                    <div>
                      <p className="text-sm text-white/80">Member Newsletter</p>
                      <p className="text-xs text-white/30 italic mt-1 font-light">Exclusive early access to seasonal packages</p>
                    </div>
                    <LuxuryToggle 
                      enabled={notifications.marketingEmail} 
                      onChange={() => toggleNotification('marketingEmail')} 
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#D4AF7A]/5 border border-[#D4AF7A]/10 flex items-start gap-4">
                <AlertCircle className="text-[#D4AF7A] mt-0.5" size={16} />
                <p className="text-white/40 text-[11px] leading-relaxed">
                  Note: Critical security alerts and system updates will always be sent regardless of your notification preferences.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}