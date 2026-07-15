"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Star, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SubService } from '@/app/types/service';

interface SubServiceCardProps {
  sub: SubService;
  categorySlug: string;
}

export default function SubServiceCard({ sub, categorySlug }: SubServiceCardProps) {
  const [imgIndex, setImgIndex] = useState(0);

  const images = sub.images || ['/placeholder.jpg'];
  const hasMultipleImages = images.length > 1;

  // Stop click from navigating to the detail page when clicking arrows
  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Link 
      href={`/services/${categorySlug}/${sub.slug}`}
      className="group block bg-[#1a1a1a] border border-white/5 hover:border-[#D4AF7A]/30 transition-all duration-500 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row h-full">
        
        {/* IMAGE SECTION - Controlled Size */}
        <div className="relative w-full md:w-72 lg:w-80 h-64 md:h-auto overflow-hidden bg-zinc-900 flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={imgIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full"
            >
              <Image 
                src={images[imgIndex]} 
                alt={sub.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </motion.div>
          </AnimatePresence>

          {/* GALLERY ARROWS */}
          {hasMultipleImages && (
            <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button 
                onClick={handlePrev}
                className="p-1.5 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-[#D4AF7A] hover:text-black transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={handleNext}
                className="p-1.5 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-[#D4AF7A] hover:text-black transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* Dots Indicator */}
          {hasMultipleImages && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
              {images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all",
                    imgIndex === idx ? "bg-[#D4AF7A] w-4" : "bg-white/20"
                  )} 
                />
              ))}
            </div>
          )}
        </div>

        {/* CONTENT SECTION */}
        <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-white text-2xl lg:text-3xl font-light italic tracking-tight group-hover:text-[#D4AF7A] transition-colors">
                  {sub.name}
                </h4>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 bg-[#D4AF7A]/10 px-2 py-0.5 rounded-full border border-[#D4AF7A]/20">
                    <Star size={10} fill="#D4AF7A" className="text-[#D4AF7A]" />
                    <span className="text-[10px] text-[#D4AF7A] font-bold">4.9</span>
                  </div>
                  <span className="text-white/20 text-[10px] uppercase tracking-widest">Premium Ritual</span>
                </div>
              </div>
              <p className="text-[#D4AF7A] text-xl font-medium tracking-tighter">{sub.price}</p>
            </div>

            <p className="text-white/40 text-sm font-light leading-relaxed line-clamp-2 max-w-xl">
              {sub.description}
            </p>
          </div>

          <div className="pt-6 flex items-center justify-between border-t border-white/5">
            <div className="flex items-center gap-4 text-white/30 text-[10px] uppercase tracking-widest font-medium">
               <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#D4AF7A]" /> {sub.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-[#D4AF7A] text-[10px] uppercase font-bold tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
              View Ritual <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}