"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Scissors, ShoppingBag, 
  Users, MessageSquare, Menu, X, LogOut, ExternalLink 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col md:flex-row">
      
      {/* MOBILE ADMIN HEADER */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#121212] border-b border-white/5 sticky top-0 z-[100]">
        <h1 className="text-[#D4AF7A] text-sm font-bold uppercase tracking-widest">Admin Panel</h1>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-white">
          <Menu size={24} />
        </button>
      </div>

      {/* ADMIN SIDEBAR (Drawer logic) */}
      <AnimatePresence>
        {(isSidebarOpen || true) && ( // Show if open OR if on desktop
          <motion.aside 
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            className={cn(
              "fixed md:sticky top-0 left-0 h-screen w-64 bg-[#121212] border-r border-white/5 z-[150] flex flex-col transition-transform",
              !isSidebarOpen && "hidden md:flex" // Mobile toggle logic
            )}
          >
            {/* Close button for mobile only */}
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden absolute top-6 right-6 text-white/40"
            >
              <X size={20} />
            </button>

            <div className="p-8 border-b border-white/5">
              <h1 className="text-[#D4AF7A] text-xl font-bold uppercase tracking-[0.2em]">L'Élite Admin</h1>
            </div>

            <nav className="flex-1 p-4 space-y-2 mt-4">
              {adminLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsSidebarOpen(false)} // Close on click for mobile
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-[10px] uppercase tracking-widest transition-all",
                    pathname === link.href 
                      ? "bg-[#D4AF7A] text-[#121212] font-bold" 
                      : "text-white/40 hover:text-white hover:bg-white/5"
                  )}
                >
                  <link.icon size={16} />
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="p-6 border-t border-white/5 space-y-4">
              <Link href="/" className="flex items-center gap-3 text-white/30 hover:text-[#D4AF7A] text-[9px] uppercase tracking-widest">
                <ExternalLink size={14} /> Back to Public Site
              </Link>
              <button className="flex items-center gap-3 text-red-400/50 hover:text-red-400 text-[9px] uppercase tracking-widest w-full">
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for mobile when sidebar is open */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[140] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main Admin Content */}
      <main className="flex-1 p-6 md:p-12 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}