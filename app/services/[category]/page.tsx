"use client";

import React, { useState, useEffect, use } from 'react';
import { SERVICES_DATA } from "../../data/services";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Star, Heart, ArrowLeft } from "lucide-react";
import { getFavorites, toggleFavoriteId } from "@/lib/favorites";
import { cn } from "@/lib/utils";

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  
  const categoryData = SERVICES_DATA.find((s) => s.slug === category);

  useEffect(() => {
    // 1. Mark as mounted to prevent hydration mismatch/cascading render
    setIsMounted(true);
    // 2. Load favorites only once safely in the browser
    setFavorites(getFavorites());
  }, []);

  if (!categoryData) notFound();

  const handleToggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); // Stop Link navigation
    e.stopPropagation(); // Stop event bubbling
    const updated = toggleFavoriteId(id);
    setFavorites(updated);
  };

  return (
    <main className="min-h-screen bg-[#121212] pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <Link href="/" className="text-[#D4AF7A] text-xs uppercase tracking-[0.3em] mb-8 inline-flex items-center gap-2 hover:opacity-70 transition-opacity">
            <ArrowLeft size={14} /> Back to Salon
          </Link>
          <h1 className="text-white text-5xl md:text-7xl font-light italic mb-6 tracking-tight">
            {categoryData.title}
          </h1>
          <p className="text-white/60 text-lg max-w-2xl font-light leading-relaxed">
            {categoryData.description}
          </p>
        </motion.div>

        {/* Sub-Services List */}
        <div className="grid grid-cols-1 gap-6">
          {categoryData.subServices.map((sub, i) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                href={`/services/${category}/${sub.slug}`}
                className="group flex flex-col md:flex-row justify-between items-center p-6 md:p-8 border border-white/5 hover:border-[#D4AF7A]/30 transition-all duration-500 bg-white/[0.02] hover:bg-white/[0.04] relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row items-center gap-8 w-full">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden border border-white/5">
                     <Image 
                      src={sub.images[0]} 
                      alt={sub.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                     />
                  </div>

                  <div className="flex-1 text-center md:text-left space-y-3">
                    <div className="flex items-center justify-center md:justify-start gap-3">
                      <h4 className="text-white text-2xl md:text-3xl font-light italic">{sub.name}</h4>
                      <div className="flex items-center gap-1 bg-[#D4AF7A]/10 px-2 py-0.5 rounded-full border border-[#D4AF7A]/20">
                        <Star size={10} fill="#D4AF7A" className="text-[#D4AF7A]" />
                        <span className="text-[10px] text-[#D4AF7A] font-bold">4.9</span>
                      </div>
                    </div>
                    
                    <p className="text-white/40 text-sm font-light line-clamp-2 max-w-xl">
                      {sub.description}
                    </p>

                    <div className="flex items-center justify-center md:justify-start gap-6 text-white/60 text-xs tracking-widest uppercase">
                      <span className="flex items-center gap-2"><Clock size={14} className="text-[#D4AF7A]" /> {sub.duration}</span>
                      <span className="text-[#D4AF7A] font-bold">{sub.price}</span>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="mt-6 md:mt-0 flex items-center gap-4">
                  <button 
                    onClick={(e) => handleToggleFavorite(e, sub.id)}
                    className={cn(
                      "p-4 rounded-full border transition-all duration-300",
                      isMounted && favorites.includes(sub.id) 
                        ? "bg-[#D4AF7A] border-[#D4AF7A] text-black shadow-lg" 
                        : "border-white/10 text-white/40 hover:border-white"
                    )}
                  >
                    <Heart size={20} fill={isMounted && favorites.includes(sub.id) ? "currentColor" : "none"} />
                  </button>
                  <div className="p-4 rounded-full bg-white/5 text-[#D4AF7A] opacity-0 group-hover:opacity-100 transition-all hidden md:flex">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}