"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star} from 'lucide-react';
import {STYLISTS } from '@/app/data/stylists';

export default function StylistGrid() {
  return (
    <section id="experience" className="py-32 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="mb-20 text-center lg:text-left">
          <h2 className="text-[#D4AF7A] text-sm uppercase tracking-[0.4em] mb-4">Meet The Artists</h2>
          <h3 className="text-white text-5xl md:text-6xl font-light italic">World Class Experts</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {STYLISTS.map((stylist, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              key={stylist.id}
              className="group relative"
            >
              {/* Image with Filter Effect */}
              <div className="relative aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <Image 
                  src={stylist.image} alt={stylist.name} fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60" />
                
                {/* Hover Social Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/10 hover:bg-[#D4AF7A] hover:text-black transition-colors cursor-pointer">
                    {/* <Instagram size={18} /> */}
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-white text-xl font-light tracking-wide">{stylist.name}</h4>
                  <div className="flex items-center gap-1">
                    <Star size={12} fill="#D4AF7A" className="text-[#D4AF7A]" />
                    <span className="text-white/60 text-[10px] font-bold">{stylist.rating}</span>
                  </div>
                </div>
                <p className="text-[#D4AF7A] text-[10px] uppercase tracking-[0.2em]">{stylist.role}</p>
                <p className="text-white/40 text-xs font-light italic">Specialist in {stylist.specialty}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}