"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Scissors, ShoppingBag, Users, MessageSquare, Menu, X, LogOut, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@/app/context/ChatContext'; // 1. Import useChat

const adminLinks = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { name: 'Services', icon: Scissors, href: '/admin/services' },
  { name: 'Products', icon: ShoppingBag, href: '/admin/products' },
  { name: 'Appointments', icon: Users, href: '/admin/appointments' },
  { name: 'Live Support', icon: MessageSquare, href: '/admin/support' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { unreadThreads } = useChat(); // 2. Get unread count

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col md:flex-row">
      <AnimatePresence>
        {(isSidebarOpen || true) && (
          <motion.aside className={cn("fixed md:sticky top-0 left-0 h-screen w-64 bg-[#121212] border-r border-white/5 z-[150] flex flex-col transition-transform", !isSidebarOpen && "hidden md:flex")}>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden absolute top-6 right-6 text-white/40"><X size={20}/></button>
            <div className="p-8 border-b border-white/5">
              <h1 className="text-[#D4AF7A] text-xl font-bold uppercase tracking-[0.2em]">L'Élite <span className="text-white font-light">Admin</span></h1>
            </div>
            <nav className="flex-1 p-4 space-y-2 mt-4">
              {adminLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsSidebarOpen(false)}
                  className={cn("flex items-center justify-between px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition-all", 
                    pathname === link.href ? "bg-[#D4AF7A] text-[#121212] font-bold" : "text-white/40 hover:text-white hover:bg-white/5")}
                >
                  <div className="flex items-center gap-3"><link.icon size={16} />{link.name}</div>
                  
                  {/* 3. DYNAMIC NOTIFICATION BADGE */}
                  {link.name === 'Live Support' && unreadThreads > 0 && (
                    <span className="relative flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[8px] text-white items-center justify-center font-black">
                        {unreadThreads}
                      </span>
                    </span>
                  )}
                </Link>
              ))}
            </nav>
            {/* ... rest of footer ... */}
          </motion.aside>
        )}
      </AnimatePresence>
      <main className="flex-1 p-6 md:p-12 overflow-x-hidden">{children}</main>
    </div>
  );
}