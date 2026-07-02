"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  User, Heart, Calendar, Clock, ShoppingBag, 
  Settings, LogOut, ChevronRight, Bell, CreditCard 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getActiveUser, logoutUser } from '@/lib/auth-utils';

const menuItems = [
  { name: 'Dashboard', icon: User, href: '/profile' },
  { name: 'My Favorites', icon: Heart, href: '/profile/favorites' },
  { name: 'Appointments', icon: Calendar, href: '/profile/appointments' },
  { name: 'Service History', icon: Clock, href: '/profile/history' },
  { name: 'Order History', icon: ShoppingBag, href: '/profile/orders' },
  { name: 'Account Settings', icon: Settings, href: '/profile/settings' },
];

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const activeUser = getActiveUser();
    if (!activeUser) {
      router.push('/sign-in');
    } else {
      setUser(activeUser);
    }
  }, [router]);

  if (!isMounted || !user) return <div className="min-h-screen bg-[#121212]" />;

  return (
    <div className="min-h-screen bg-[#121212] text-white pt-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-150px)] gap-1 px-4 md:px-10">
        
        {/* SIDEBAR */}
        <aside className="w-full lg:w-72 bg-[#1a1a1a] border border-white/5 flex flex-col">
          <div className="p-8 text-center border-b border-white/5">
            <div className="w-20 h-20 bg-gradient-to-tr from-[#D4AF7A] to-[#C9A227] rounded-full mx-auto mb-4 flex items-center justify-center text-black text-2xl font-bold shadow-lg shadow-[#D4AF7A]/10">
              {user.fullName.charAt(0)}
            </div>
            <h2 className="text-xl font-light italic tracking-tight">{user.fullName}</h2>
            <p className="text-[#D4AF7A] text-[9px] uppercase tracking-[0.3em] mt-1 font-bold">Royal Member</p>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition-all duration-500 group",
                  pathname === item.href 
                    ? "bg-[#D4AF7A] text-black font-bold" 
                    : "text-white/40 hover:bg-white/5 hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={16} strokeWidth={pathname === item.href ? 2.5 : 1.5} />
                  {item.name}
                </div>
                <ChevronRight size={12} className={cn("opacity-0 group-hover:opacity-100 transition-all", pathname === item.href && "opacity-100")} />
              </Link>
            ))}
          </nav>

          <div className="p-6 border-t border-white/5">
            <button 
              onClick={() => logoutUser()}
              className="w-full flex items-center gap-3 px-4 py-3 text-[10px] uppercase tracking-widest text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </aside>

        {/* CONTENT AREA */}
        <section className="flex-1 bg-[#1a1a1a] border border-white/5 p-6 md:p-12 overflow-hidden relative">
           {children}
        </section>
      </div>
    </div>
  );
}