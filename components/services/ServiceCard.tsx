"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ServiceCategory } from '@/app/types/service'; // Ensure correct path
import { cn } from '@/lib/utils';
import { ArrowRight, Star, Heart } from 'lucide-react';

// "use client";

// import Link from 'next/link';
// import React, { useState } from 'react';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import { ServiceCategory } from '@/types/service'; // Adjusted path
// import { cn } from '@/lib/utils';
// import { ArrowRight, Star, Heart } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceCategory;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { title, description, image, slug, startingPrice, isPopular, isPremium } = service;
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    setIsFavorited(!isFavorited);
  };

  return (
    <Link href={`/services/${slug}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "relative overflow-hidden bg-[#121212] border border-white/5 rounded-none",
          // Removed col-span-2 logic here to keep a strict 2-column look on desktop
          "w-full" 
        )}
      >
        {/* Top Overlay Actions */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-30">
          {isPopular ? (
            <div className="bg-[#D4AF7A] text-[#121212] text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 shadow-xl">
              Most Popular
            </div>
          ) : (
            <div /> 
          )}
          
          <button 
            onClick={toggleFavorite}
            className={cn(
              "p-3 rounded-full backdrop-blur-md transition-all duration-500 border border-white/10",
              isFavorited 
                ? "bg-[#D4AF7A] text-[#121212] border-[#D4AF7A] shadow-[0_0_20px_rgba(212,175,122,0.4)]" 
                : "bg-black/20 text-white hover:bg-black/40"
            )}
          >
            <Heart size={18} fill={isFavorited ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Image Container - Height adjusted for 2-column layout */}
        <div className="relative h-[450px] md:h-[550px] w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
          />
          {/* Subtle vignette for luxury feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/20 to-transparent opacity-90" />
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 space-y-4">
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <p className="text-[#D4AF7A] text-xs uppercase tracking-[0.3em] font-medium">
                  From {startingPrice}
                </p>
                <div className="h-px w-8 bg-[#D4AF7A]/30" />
                <div className="flex items-center gap-1">
                  <Star size={12} fill="#D4AF7A" className="text-[#D4AF7A]" />
                  <span className="text-[11px] text-white/70 font-semibold tracking-widest">4.9</span>
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl text-white font-light italic tracking-tight">
                {title}
              </h3>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="w-14 h-14 border border-[#D4AF7A]/30 rounded-full flex items-center justify-center text-[#D4AF7A] group-hover:bg-[#D4AF7A] group-hover:text-[#121212] transition-all duration-500"
            >
              <ArrowRight size={24} strokeWidth={1} />
            </motion.div>
          </div>

          <p className="text-white/50 text-sm font-light leading-relaxed max-w-sm line-clamp-2 group-hover:text-white transition-colors duration-500">
            {description}
          </p>
        </div>

        {/* Premium Frame Effect for All Cards */}
        <div className="absolute inset-0 border border-white/5 pointer-events-none group-hover:border-[#D4AF7A]/20 transition-colors duration-700" />
      </motion.div>
    </Link>
  );
}