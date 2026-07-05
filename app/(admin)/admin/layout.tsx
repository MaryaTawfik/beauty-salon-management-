"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Scissors, ShoppingBag, 
  Users, MessageSquare, Menu, X, LogOut, 
  ExternalLink, CreditCard, ClipboardList // 1. Added CreditCard and ClipboardList
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@/app/context/ChatContext';

// 2. Updated Admin Navigation Array
const adminLinks = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { name: 'Ritual Manager', icon: Scissors, href: '/admin/services' },
  { name: 'Boutique Inventory', icon: ShoppingBag, href: '/admin/products' },
  { name: 'Schedule Manager', icon: Users, href: '/admin/appointments' },
  { 
    name: 'Payment Requests', // NEW: Link to verify receipts
    icon: CreditCard, 
    href: '/admin/payments' 
  },
  { 
    name: 'Order Tracking', // NEW: Link to update delivery status
    icon: ClipboardList, 
    href: '/admin/orders' 
  },
  { name: 'Live Support', icon: MessageSquare, href: '/admin/support' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { unreadThreads } = useChat();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col md:flex-row">
      
      {/* MOBILE ADMIN HEADER */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#121212] border-b border-white/5 sticky top-0 z-[100]">
        <h1 className="text-[#D4AF7A] text-sm font-bold uppercase tracking-widest text-center">Admin Panel</h1>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-white">
          <Menu size={24} />
        </button>
      </div>

      {/* ADMIN SIDEBAR */}
      <AnimatePresence>
        {(isSidebarOpen || true) && (
          <motion.aside 
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            className={cn(
              "fixed md:sticky top-0 left-0 h-screen w-64 bg-[#121212] border-r border-white/5 z-[150] flex flex-col transition-transform",
              !isSidebarOpen && "hidden md:flex" 
            )}
          >
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden absolute top-6 right-6 text-white/40"><X size={20} /></button>

            <div className="p-8 border-b border-white/5">
              <h1 className="text-[#D4AF7A] text-xl font-bold uppercase tracking-[0.2em]">L'Élite <span className="text-white font-light">Admin</span></h1>
            </div>

            <nav className="flex-1 p-4 space-y-1 mt-4 overflow-y-auto custom-scrollbar">
              {adminLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition-all group",
                    pathname === link.href 
                      ? "bg-[#D4AF7A] text-[#121212] font-bold shadow-[0_0_20px_rgba(212,175,122,0.2)]" 
                      : "text-white/40 hover:text-white hover:bg-white/5"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <link.icon size={16} strokeWidth={pathname === link.href ? 2.5 : 1.5} />
                    {link.name}
                  </div>

                  {/* CHAT BADGE */}
                  {link.name === 'Live Support' && unreadThreads > 0 && (
                    <span className="flex h-4 w-4 rounded-full bg-red-600 text-[8px] text-white items-center justify-center font-black animate-pulse">
                      {unreadThreads}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            <div className="p-6 border-t border-white/5 space-y-4 bg-black/20">
              <Link href="/" className="flex items-center gap-3 text-white/30 hover:text-[#D4AF7A] text-[9px] uppercase tracking-widest transition-colors">
                <ExternalLink size={14} /> Back to Live Site
              </Link>
              <button className="flex items-center gap-3 text-red-400/50 hover:text-red-400 text-[9px] uppercase tracking-widest w-full">
                <LogOut size={14} /> System Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Admin Content */}
      <main className="flex-1 p-6 md:p-12 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}