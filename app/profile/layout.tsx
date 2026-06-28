"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  User, Calendar, History, ShoppingBag, 
  Heart, Star, Bell, Gift, Settings, LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Navbar from '../components/Navbar';

const menuItems = [
  { name: 'Overview', icon: User, href: '/profile' },
  { name: 'Appointments', icon: Calendar, href: '/profile/appointments' },
  { name: 'Service History', icon: History, href: '/profile/history' },
  { name: 'Orders', icon: ShoppingBag, href: '/profile/orders' },
  { name: 'Favorites', icon: Heart, href: '/profile/favorites' },
  { name: 'Loyalty & Rewards', icon: Gift, href: '/profile/loyalty' },
  { name: 'Notifications', icon: Bell, href: '/profile/notifications' },
  { name: 'Settings', icon: Settings, href: '/profile/settings' },
];

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-32 pb-20 px-4 md:px-10 flex flex-col lg:flex-row gap-10">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-64 space-y-2">
          <div className="px-4 py-6 mb-4 bg-white/[0.03] border border-white/5 text-center">
            <div className="w-20 h-20 bg-[#D4AF7A] rounded-full mx-auto mb-4 flex items-center justify-center text-[#121212] text-2xl font-bold">
              JD
            </div>
            <h2 className="font-light italic text-xl tracking-tight">Jane Doe</h2>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-1">Gold Member</p>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest transition-all duration-300",
                  pathname === item.href 
                    ? "bg-[#D4AF7A] text-black font-bold" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon size={16} />
                {item.name}
              </Link>
            ))}
            
            <button className="w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest text-red-400/60 hover:bg-red-400/10 transition-all mt-4">
              <LogOut size={16} /> Logout
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-white/[0.02] border border-white/5 p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}