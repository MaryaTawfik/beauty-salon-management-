"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';


const Hero = () => {
  return (
   <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[#121212]">
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
 <Image
          src="/images/hero-bg.jpg" // Ensure you have a high-quality portrait/salon image here
          alt="Luxury Salon Experience"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/60 to-transparent" />

      </motion.div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 w-full">
         <div className="max-w-2xl">
               <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >

            <h2 className="text-[#D4AF7A] text-sm md:text-base uppercase tracking-[0.4em] font-semibold mb-6">
              Welcome to the Epitome of Beauty
            </h2>
            <h1 className="text-5xl md:text-8xl text-white font-light italic leading-[1.1] mb-8 tracking-tight">
              Unveiling Your <br />
              <span className="text-[#D4AF7A]">Inner Radiance</span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-md">
              Experience world-class hair artistry, henna, and bridal care tailored specifically for your unique elegance.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/services/bridal">
                <button className="px-10 py-5 bg-[#D4AF7A] text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-500 flex items-center gap-3">
                  Book Royal Package <ArrowRight size={16} />
                </button>
              </Link>
              
              <Link href="#services">
                <button className="px-10 py-5 border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-500">
                  View Services
                </button>
              </Link>
            </div>
          </motion.div>
         </div>
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-white/30 uppercase tracking-[0.3em] text-[10px]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF7A] to-transparent" />
      </motion.div>
   </section>

  )
}

export default Hero
