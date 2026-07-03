"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Playfair_Display } from 'next/font/google';
import { cn } from '@/lib/utils';

const playfair = Playfair_Display({ subsets: ['latin'], style: ['italic'] });

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const serviceLinks = [
    { name: 'Hair Styling', href: '/services/hair' },
    { name: 'Nail Artistry', href: '/services/nails' },
    { name: 'Bridal Packages', href: '/services/bridal' },
    { name: 'Spa & Wellness', href: '/services/spa' },
  ];

  const quickLinks = [
    { name: 'Our Story', href: '/#experience' },
    { name: 'Products', href: '/#products' },
    { name: 'Client Reviews', href: '/#testimonials' },
    { name: 'Member Login', href: '/sign-in' },
  ];

  return (
    <footer className="bg-[#121212] border-t border-white/5 pt-20 pb-10 px-6 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className={cn("text-3xl text-white font-light tracking-tighter", playfair.className)}>
                The<span className="text-[#D4AF7A]">Salon</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm font-light leading-relaxed max-w-xs italic">
              "Redefining Ethiopian beauty standards through world-class artistry and bespoke luxury rituals since MMXXIV."
            </p>
            <div className="flex gap-5 pt-2">
              {[ Mail].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-[#D4AF7A] hover:text-[#D4AF7A] transition-all duration-500">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: The Rituals (Services) */}
          <div className="space-y-6">
            <h4 className="text-[#D4AF7A] text-[10px] uppercase tracking-[0.4em] font-bold">The Rituals</h4>
            <ul className="space-y-4">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-white text-xs uppercase tracking-widest flex items-center gap-2 group transition-all">
                    <ChevronRight size={12} className="text-[#D4AF7A] opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Sanctuary */}
          <div className="space-y-6">
            <h4 className="text-[#D4AF7A] text-[10px] uppercase tracking-[0.4em] font-bold">The Sanctuary</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 group">
                <MapPin size={18} className="text-[#D4AF7A] mt-0.5 shrink-0" />
                <span className="text-white/50 text-xs leading-relaxed group-hover:text-white transition-colors">
                  Bole Road, Mega Building<br />
                  Addis Ababa, Ethiopia
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <Phone size={18} className="text-[#D4AF7A] shrink-0" />
                <span className="text-white/50 text-xs group-hover:text-white transition-colors">+251 911 223 344</span>
              </li>
              <li className="flex items-center gap-4 group">
                <Mail size={18} className="text-[#D4AF7A] shrink-0" />
                <span className="text-white/50 text-xs group-hover:text-white transition-colors">concierge@thesalon.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours of Elegance */}
          <div className="space-y-6">
            <h4 className="text-[#D4AF7A] text-[10px] uppercase tracking-[0.4em] font-bold">Hours of Elegance</h4>
            <div className="bg-white/[0.02] border border-white/5 p-6 space-y-4 relative overflow-hidden">
              <Sparkles className="absolute -top-4 -right-4 text-[#D4AF7A]/10 w-16 h-16" />
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/40 uppercase tracking-widest font-light">Mon — Fri</span>
                <span className="text-white font-medium italic">09:00 — 20:00</span>
              </div>
              <div className="h-px bg-white/5 w-full" />
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/40 uppercase tracking-widest font-light">Saturday</span>
                <span className="text-white font-medium italic">10:00 — 18:00</span>
              </div>
              <div className="h-px bg-white/5 w-full" />
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/40 uppercase tracking-widest font-light">Sunday</span>
                <span className="text-[#D4AF7A] font-bold uppercase tracking-tighter">By Appointment Only</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] uppercase tracking-[0.3em]">
            © {currentYear} The Salon Luxury Group. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-white/20 hover:text-white text-[9px] uppercase tracking-widest transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-white/20 hover:text-white text-[9px] uppercase tracking-widest transition-colors">Terms of Ritual</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}