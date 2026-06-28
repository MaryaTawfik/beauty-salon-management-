"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], style: ['normal', 'italic'] });

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center bg-[#121212] overflow-hidden pt-20 md:pt-0">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#D4AF7A]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        
        {/* Left Side: Copywriting */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 space-y-8"
        >
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 text-[#D4AF7A] text-xs md:text-sm uppercase tracking-[0.5em] font-semibold"
            >
              <Sparkles size={16} />
              <span>The Gold Standard of Beauty</span>
            </motion.div>
            
            <h1 className={`text-6xl md:text-8xl text-white font-light leading-[1.1] tracking-tight ${playfair.className}`}>
              Unveiling Your <br />
              <span className="italic text-[#D4AF7A]">Inner Radiance</span>
            </h1>
          </div>

          <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-lg">
            Experience world-class hair artistry, henna, and bridal care tailored specifically for your unique elegance.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            {/* Primary Button: Champagne Gold */}
            <Link href="/services/bridal" className="group">
              <button className="w-full sm:w-auto px-10 py-5 bg-[#D4AF7A] text-[#121212] font-bold uppercase tracking-[0.2em] text-xs transition-all duration-300 hover:bg-[#C9A227] hover:shadow-[0_0_20px_rgba(212,175,122,0.4)] flex items-center justify-center gap-3">
                Book Royal Package <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            {/* Secondary Button: Outlined */}
            <Link href="#services">
              <button className="w-full sm:w-auto px-10 py-5 border border-[#D4AF7A]/30 text-white font-bold uppercase tracking-[0.2em] text-xs transition-all duration-300 hover:bg-white hover:text-[#121212] hover:border-white">
                View Services
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Right Side: Luxury Image Composition */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          {/* Main Image Frame */}
          <div className="relative aspect-[4/5] w-full max-w-[500px] mx-auto border border-white/10 p-3 bg-white/5 backdrop-blur-sm">
            <div className="relative w-full h-full overflow-hidden">
              <Image 
                src="/app/banner.png" 
                alt="Luxury Salon Visual"
                fill
                className="object-cover transition-transform duration-[3000ms] hover:scale-110"
                priority
              />
              {/* Luxury Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/40 via-transparent to-transparent" />
            </div>

            {/* Floating Element: Starting Price Tag */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-[#1a1a1a] border border-[#D4AF7A]/30 p-6 shadow-2xl hidden md:block"
            >
              <p className="text-[#D4AF7A] text-[10px] uppercase tracking-widest mb-1">Starting From</p>
              <p className="text-white text-2xl font-light italic">500 ETB</p>
            </motion.div>
          </div>

          {/* Background Gold Ring Decorative */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square border border-[#D4AF7A]/10 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
