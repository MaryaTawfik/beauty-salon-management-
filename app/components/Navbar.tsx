"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
// Note: If Facebook still gives an error, replace it with 'FacebookIcon' or 'MessageCircle'
import { Menu, X, User, LogOut,  Phone, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], style: ['italic'] });

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = document.cookie.includes('isLoggedIn=true');
      setIsLoggedIn(loggedIn);
    };
    checkAuth();
  }, [pathname]);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleLogout = () => {
    document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setIsLoggedIn(false);
    setIsOpen(false);
    router.refresh();
    router.push('/');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Products', href: '/#products' },
    { name: 'Testimonials', href: '/#testimonials' },
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

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-[10px] uppercase tracking-[0.4em] text-white/60 hover:text-[#D4AF7A] transition-colors">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              {isLoggedIn ? (
                <div className="flex items-center gap-6">
                  <Link href="/profile" className="text-white/70 hover:text-[#D4AF7A] flex items-center gap-2 text-[10px] uppercase tracking-widest transition-colors">
                    <User size={14} /> Profile
                  </Link>
                  <button onClick={handleLogout} className="text-white/30 hover:text-red-400 text-[9px] uppercase tracking-widest transition-colors">Logout</button>
                </div>
              ) : (
                <Link href="/sign-in">
                  <button className="px-8 py-2.5 border border-[#D4AF7A]/40 text-white text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:border-[#C9A227] hover:bg-[#C9A227]/10">
                    Sign In
                  </button>
                </Link>
              )}
            </div>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-[130] text-white p-2"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Slide-in Mobile Drawer (Modern Right-side) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm z-[120] bg-[#1a1a1a] border-l border-white/5 lg:hidden flex flex-col"
            >
              <div className="flex flex-col p-8 pt-24 space-y-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-white/90 hover:text-[#D4AF7A] text-xs uppercase tracking-[0.4em] font-medium block py-2 transition-colors flex items-center justify-between group"
                    >
                      {link.name}
                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto p-8 border-t border-white/5 space-y-8 bg-white/[0.01]">
                {isLoggedIn ? (
                  <div className="space-y-6">
                    <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-white">
                      <User size={18} className="text-[#D4AF7A]" />
                      <span className="text-xs uppercase tracking-widest">My Profile</span>
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-3 text-white/40 w-full">
                      <LogOut size={18} />
                      <span className="text-xs uppercase tracking-widest">Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link 
                    href="/sign-in" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-full bg-[#D4AF7A] text-black py-4 text-[10px] font-bold uppercase tracking-[0.2em]"
                  >
                    Member Login
                  </Link>
                )}

                {/* Information Section */}
                <div className="pt-4 space-y-6">
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF7A]">Locate Us</p>
                    <p className="text-white/40 text-[10px] leading-relaxed">Bole Road, Addis Ababa, Ethiopia</p>
                  </div>
                  
                  <div className="flex gap-6 text-white/40">
                    {/* <Instagram size={18} className="hover:text-[#D4AF7A] transition-colors cursor-pointer" />
                    <Facebook size={18} className="hover:text-[#D4AF7A] transition-colors cursor-pointer" /> */}
                    <Phone size={18} className="hover:text-[#D4AF7A] transition-colors cursor-pointer" />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}