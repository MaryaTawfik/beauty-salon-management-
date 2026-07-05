"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, Lock, Bell, 
  ShieldCheck, Smartphone, Check, AlertCircle, Tag, Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getActiveUser } from '@/lib/auth-utils';

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
  const [isMounted, setIsMounted] = useState(false);

  // --- 1. State for Profile Information ---
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: ""
  });

  // --- 2. State for Notification Preferences ---
  const [notifications, setNotifications] = useState({
    appointmentsEmail: true,
    appointmentsSMS: true,
    marketingEmail: false,
    securityAlerts: true
  });

  // Load Real Data on Mount
  useEffect(() => {
    const user = getActiveUser();
    if (user) {
      setProfile({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || ""
      });
      // In a real app, notifications would also be in the user object
    }
    setIsMounted(true);
  }, []);

  // --- Handlers ---
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');

    // 1. Update Master DB
    const allUsers = JSON.parse(localStorage.getItem("salon_users_db") || "[]");
    const updatedUsers = allUsers.map((u: any) => 
      u.email === profile.email ? { ...u, ...profile } : u
    );
    localStorage.setItem("salon_users_db", JSON.stringify(updatedUsers));

    // 2. Update Active Session
    const currentSession = getActiveUser();
    const updatedSession = { ...currentSession, ...profile };
    localStorage.setItem("active_salon_user", JSON.stringify(updatedSession));

    // 3. UI Feedback
    setTimeout(() => {
      setSaveStatus('success');
      // Trigger a storage event so other components (Sidebar/Navbar) update
      window.dispatchEvent(new Event('storage')); 
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 800);
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isMounted) return null;

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
            className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-2 border border-green-400/20 text-[10px] uppercase tracking-widest font-bold"
          >
            <Check size={14} /> Profile Synchronized
          </motion.div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-8 border-b border-white/5 overflow-x-auto no-scrollbar">
        {menuTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={cn(
              "pb-4 text-[10px] uppercase tracking-[0.3em] transition-all relative flex items-center gap-2 whitespace-nowrap",
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
                  <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF7A]/40" size={16} />
                    <input 
                      required
                      type="text" 
                      value={profile.fullName}
                      onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 p-4 pl-10 text-sm text-white focus:border-[#D4AF7A] outline-none transition-all" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF7A]/40" size={16} />
                    <input 
                      required
                      type="tel" 
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 p-4 pl-10 text-sm text-white focus:border-[#D4AF7A] outline-none transition-all" 
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF7A]/40" size={16} />
                  <input 
                    readOnly
                    type="email" 
                    value={profile.email}
                    className="w-full bg-white/5 border border-white/10 p-4 pl-10 text-sm text-white/30 cursor-not-allowed outline-none" 
                  />
                </div>
                <p className="text-[9px] text-white/20 italic ml-1">* Email cannot be changed for security</p>
              </div>
              <button 
                type="submit"
                disabled={saveStatus === 'saving'}
                className="px-10 py-4 bg-[#D4AF7A] text-[#121212] py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {saveStatus === 'saving' ? <><Loader2 className="animate-spin" size={14}/> Updating...</> : 'Update Identity'}
              </button>
            </motion.form>
          )}

          {/* SECURITY TAB (Simplified for prototype) */}
          {activeSection === 'security' && (
            <motion.div 
              key="security"
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
              className="space-y-8"
            >
              <div className="p-6 bg-[#D4AF7A]/5 border border-[#D4AF7A]/10 flex items-start gap-4">
                <ShieldCheck className="text-[#D4AF7A] mt-1" size={20} />
                <div>
                  <p className="text-white text-sm">Luxury Vault Protection</p>
                  <p className="text-white/40 text-xs mt-1 leading-relaxed">Your password and ritual history are encrypted. To change your security key, provide your current authorization below.</p>
                </div>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-4">
                  <input type="password" placeholder="Current Authorization Key" className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none transition-all" />
                  <input type="password" placeholder="New Authorization Key" className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none transition-all" />
                </div>
                <button className="px-10 py-4 border border-[#D4AF7A]/30 text-[#D4AF7A] text-[10px] font-bold uppercase tracking-widest hover:bg-[#D4AF7A] hover:text-black transition-all">
                  Rotate Keys
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
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF7A]/10 flex items-center justify-center text-[#D4AF7A]">
                    <Smartphone size={14} />
                  </div>
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-white">Booking Alerts</h3>
                </div>

                <div className="space-y-0 border border-white/5 bg-white/[0.01]">
                  <div className="flex justify-between items-center p-6 border-b border-white/5">
                    <div>
                      <p className="text-sm text-white/80">Ritual Confirmations</p>
                      <p className="text-[10px] text-white/30 italic mt-1 font-light">Sent after any successful reservation</p>
                    </div>
                    <LuxuryToggle enabled={notifications.appointmentsEmail} onChange={() => toggleNotification('appointmentsEmail')} />
                  </div>
                  <div className="flex justify-between items-center p-6">
                    <div>
                      <p className="text-sm text-white/80">SMS Presence Alerts</p>
                      <p className="text-[10px] text-white/30 italic mt-1 font-light">Direct alerts for concierge responses</p>
                    </div>
                    <LuxuryToggle enabled={notifications.appointmentsSMS} onChange={() => toggleNotification('appointmentsSMS')} />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF7A]/10 flex items-center justify-center text-[#D4AF7A]">
                    <Tag size={14} />
                  </div>
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-white">Boutique News</h3>
                </div>

                <div className="p-6 bg-white/[0.01] border border-white/5 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-white/80">Seasonal Lookbooks</p>
                    <p className="text-[10px] text-white/30 italic mt-1 font-light">Exclusive access to new product collections</p>
                  </div>
                  <LuxuryToggle enabled={notifications.marketingEmail} onChange={() => toggleNotification('marketingEmail')} />
                </div>
              </div>

              <div className="p-6 bg-[#D4AF7A]/5 border border-[#D4AF7A]/10 flex items-start gap-4">
                <AlertCircle className="text-[#D4AF7A] mt-0.5" size={16} />
                <p className="text-white/40 text-[10px] leading-relaxed uppercase tracking-tighter">
                  System health and critical security alerts cannot be disabled.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}