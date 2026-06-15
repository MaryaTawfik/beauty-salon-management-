"use client";
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ServiceCategory } from '../../app/types/service';

import { cn } from '@/lib/utils'; // Make sure you created the utility from Step 2
import { ArrowRight, Star } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceCategory;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { title, description, image, slug,startingPrice, isPopular, isPremium } = service;

  return (
    <Link href={`/services/${slug}`}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden bg-[#121212] border border-white/10 rounded-none",
        isPremium ? "md:col-span-2 md:row-span-1" : "col-span-1"
      )}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute top-4 left-4 z-20 bg-[#D4AF7A] text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1">
          Most Popular
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Dark Overlay for Luxury Feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 space-y-3">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[#D4AF7A] text-xs uppercase tracking-[0.2em] font-medium mb-2">
              Starting from {startingPrice}
            </p>
            <h3 className="text-2xl md:text-3xl text-white font-light tracking-wide italic">
              {title}
            </h3>
          </div>
          
          <motion.div 
            whileHover={{ x: 5 }}
            className="w-12 h-12 border border-[#D4AF7A] rounded-full flex items-center justify-center text-[#D4AF7A] group-hover:bg-[#D4AF7A] group-hover:text-black transition-colors duration-300"
          >
            <ArrowRight size={20} strokeWidth={1.5} />
          </motion.div>
        </div>

        <p className="text-white/60 text-sm font-light leading-relaxed max-w-md line-clamp-2 group-hover:text-white transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Premium Border Highlight */}
      {isPremium && (
        <div className="absolute inset-0 border-2 border-[#D4AF7A]/30 pointer-events-none" />
      )}
    </motion.div>
    </Link>
  );
}