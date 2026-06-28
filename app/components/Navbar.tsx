"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, User, LogOut, Phone, 
  ChevronRight, ShoppingBag, Search, MessageSquare,
  LayoutDashboard // Added for the Admin icon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Playfair_Display } from 'next/font/google';
import { useCart } from '@/app/context/CartContext';
import CartDrawer from './products/CartDrawer';
import SearchOverlay from './search/SearchOverlay';

const playfair = Playfair_Display({ subsets: ['latin'], style: ['italic'] });

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Admin state
  const [hasUnreadChat, setHasChatNotification] = useState(false);
  
  const { totalItems, isMounted } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkStatus = () => {
      const loggedIn = document.cookie.includes('isLoggedIn=true');
      const adminRole = document.cookie.includes('role=admin');
      setIsLoggedIn(loggedIn);
      setIsAdmin(adminRole);

      const chatHistory = localStorage.getItem('salon_chat');
      if (chatHistory && pathname !== '/support') {
        const messages = JSON.parse(chatHistory);
        if (messages.length > 0 && messages[messages.length - 1].sender === 'salon') {
          setHasChatNotification(true);
        }
      } else if (pathname === '/support') {
        setHasChatNotification(false);
      }
    };
    checkStatus();
  }, [pathname]);

  useEffect(() => {
    if (isOpen || isCartOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, isCartOpen, isSearchOpen]);

  const handleLogout = () => {
    // Clear both cookies
    document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsOpen(false);
    router.refresh();
    router.push('/');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Products', href: '/#products' },
    { name: 'Concierge', href: '/support' },
  ];

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 w-full z-[100] transition-all duration-500",
          isScrolled 
            ? "bg-[#121212]/95 backdrop-blur-md border-b border-white/5 py-3 px-4 md:px-10" 
            : "bg-transparent py-6 px-6 md:px-10"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <Link href="/" className="relative z-[130]">
            <span className={cn("text-xl md:text-2xl text-white font-light tracking-tighter", playfair.className)}>
              The<span className="text-[#D4AF7A]">Salon</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-[10px] uppercase tracking-[0.4em] text-white/60 hover:text-[#D4AF7A] transition-colors">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-5">
            <button onClick={() => setIsSearchOpen(true)} className="p-2 text-white/80 hover:text-[#D4AF7A] transition-colors">
              <Search size={19} strokeWidth={1.5} />
            </button>

            <Link href="/support" className="relative p-2 text-white/80 hover:text-[#D4AF7A] transition-colors">
              <MessageSquare size={19} strokeWidth={1.5} />
              {isMounted && hasUnreadChat && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D4AF7A] rounded-full shadow-[0_0_8px_#D4AF7A]" />
              )}
            </Link>

            <button onClick={() => setIsCartOpen(true)} className="relative group p-2 transition-transform active:scale-90">
              <ShoppingBag size={19} strokeWidth={1.5} className="text-white/80 group-hover:text-[#D4AF7A] transition-colors" />
              {isMounted && totalItems > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-0.5 -right-0.5 bg-[#D4AF7A] text-[#121212] text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-lg">
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* AUTH & ADMIN SECTION */}
            <div className="hidden lg:flex items-center gap-6 border-l border-white/10 ml-4 pl-6">
              {isLoggedIn ? (
                <div className="flex items-center gap-6">
                  {/* NEW: Admin Dashboard Button */}
                  {isAdmin && (
                    <Link href="/admin">
                      <button className="bg-[#D4AF7A] text-[#121212] px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_15px_rgba(212,175,122,0.3)]">
                        Admin Panel
                      </button>
                    </Link>
                  )}
                  <Link href="/profile" className="text-white/70 hover:text-[#D4AF7A] flex items-center gap-2 text-[10px] uppercase tracking-widest transition-colors">
                    <User size={14} /> Profile
                  </Link>
                  <button onClick={handleLogout} className="text-white/30 hover:text-red-400 text-[9px] uppercase tracking-widest transition-colors">
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/sign-in">
                  <button className="px-6 py-2 border border-[#D4AF7A]/40 text-white text-[9px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#D4AF7A] hover:text-black">
                    Sign In
                  </button>
                </Link>
              )}
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden relative z-[130] text-white p-2 ml-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-sm lg:hidden" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-[85%] max-w-sm z-[120] bg-[#1a1a1a] border-l border-white/5 lg:hidden flex flex-col" >
              <div className="flex flex-col p-8 pt-24 space-y-8">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-white hover:text-[#D4AF7A] text-xs uppercase tracking-[0.4em] flex justify-between items-center group">
                    {link.name}
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                ))}
              </div>
              
              <div className="mt-auto p-8 border-t border-white/5 bg-white/[0.01] space-y-6">
                {isLoggedIn ? (
                   <div className="flex flex-col gap-5">
                     {/* Mobile Admin Link */}
                     {isAdmin && (
                        <Link href="/admin" onClick={() => setIsOpen(false)} className="text-[#D4AF7A] text-xs uppercase tracking-widest flex items-center gap-3">
                          <LayoutDashboard size={16}/> Admin Dashboard
                        </Link>
                     )}
                     <Link href="/profile" onClick={() => setIsOpen(false)} className="text-white/70 text-xs uppercase tracking-widest flex items-center gap-3">
                       <User size={16}/> My Profile
                     </Link>
                     <button onClick={handleLogout} className="text-white/30 text-xs uppercase tracking-widest text-left flex items-center gap-3">
                       <LogOut size={16}/> Logout
                     </button>
                   </div>
                ) : (
                   <Link href="/sign-in" onClick={() => setIsOpen(false)} className="bg-[#D4AF7A] text-black py-4 w-full block text-center text-[10px] uppercase font-bold tracking-widest">Sign In</Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}