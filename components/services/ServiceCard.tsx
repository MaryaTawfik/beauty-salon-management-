"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ServiceCategory } from '@/app/types/service';
import { cn } from '@/lib/utils';
import { ArrowRight, Star, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getActiveUser } from '@/lib/auth-utils';
import { getFavorites, toggleFavoriteId } from '@/lib/favorites';

interface ServiceCardProps {
  service: ServiceCategory;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { title, description, image, slug, startingPrice, isPopular, isPremium, id } = service;
  const [isFavorited, setIsFavorited] = useState(false);
  const router = useRouter();

  // Sync heart state on load
  useEffect(() => {
    const favs = getFavorites();
    setIsFavorited(favs.includes(id));
  }, [id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    
    const user = getActiveUser();
    if (!user) {
      router.push('/sign-in');
      return;
    }

    const updated = toggleFavoriteId(id);
    setIsFavorited(updated.includes(id));
  };

  return (
    <Link href={`/services/${slug}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden bg-[#121212] border border-white/5 rounded-none w-full"
      >
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-30">
          {isPopular ? (
            <div className="bg-[#D4AF7A] text-[#121212] text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 shadow-xl">
              Most Popular
            </div>
          ) : <div />}
          
          {/* <button 
            onClick={toggleFavorite}
            className={cn(
              "p-3 rounded-full backdrop-blur-md transition-all duration-500 border border-white/10",
              isFavorited ? "bg-[#D4AF7A] text-[#121212] border-[#D4AF7A]" : "bg-black/20 text-white hover:bg-black/40"
            )}
          >
            <Heart size={18} fill={isFavorited ? "currentColor" : "none"} />
          </button> */}
        </div>

        <div className="relative h-[450px] md:h-[550px] w-full overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/20 to-transparent opacity-90" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 space-y-4">
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <p className="text-[#D4AF7A] text-xs uppercase tracking-[0.3em] font-medium">From {startingPrice}</p>
                <div className="flex items-center gap-1">
                  <Star size={12} fill="#D4AF7A" className="text-[#D4AF7A]" />
                  <span className="text-[11px] text-white/70 font-semibold tracking-widest">4.9</span>
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl text-white font-light italic tracking-tight">{title}</h3>
            </div>
            <div className="w-14 h-14 border border-[#D4AF7A]/30 rounded-full flex items-center justify-center text-[#D4AF7A] group-hover:bg-[#D4AF7A] group-hover:text-[#121212] transition-all duration-500">
              <ArrowRight size={24} strokeWidth={1} />
            </div>
          </div>
          <p className="text-white/50 text-sm font-light leading-relaxed max-w-sm line-clamp-2 group-hover:text-white transition-colors duration-500">{description}</p>
        </div>
      </motion.div>
    </Link>
  );
}