"use client";

import React, { useEffect, useState } from 'react';
import { Heart, Trash2, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'; // <--- THIS WAS MISSING
import { useServices } from '@/app/context/ServiceContext';
import { getFavorites, toggleFavoriteId } from '@/lib/favorites';

export default function FavoritesPage() {
  const [favIds, setFavIds] = useState<string[]>([]);
  const { categories, isMounted: servicesLoaded } = useServices();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setFavIds(getFavorites());
  }, []);

  const rituals = categories
    .flatMap(c => c.subServices)
    .filter(s => favIds.includes(s.id));

  const handleRemove = (id: string) => {
    const updated = toggleFavoriteId(id);
    setFavIds(updated);
  };

  if (!isMounted || !servicesLoaded) return null;

  return (
    <div className="space-y-10">
      <div className="border-b border-white/5 pb-6">
        <h2 className="text-3xl font-light italic text-[#D4AF7A]">Saved Collections</h2>
        <p className="text-white/40 text-[10px] uppercase tracking-widest mt-2">Your personally curated rituals</p>
      </div>
      
      {rituals.length === 0 ? (
        <div className="py-32 text-center border border-dashed border-white/10 flex flex-col items-center justify-center">
          <Heart size={48} className="text-white/5 mb-6" />
          <p className="text-white/20 text-xs uppercase tracking-[0.3em]">Your sanctuary is currently empty</p>
          <Link href="/#services" className="mt-8 text-[#D4AF7A] text-[10px] uppercase underline tracking-widest hover:text-white transition-colors">
            Explore Rituals
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rituals.map(ritual => (
            <div key={ritual.id} className="bg-[#121212] border border-white/5 group overflow-hidden relative">
               <div className="relative aspect-[16/10] overflow-hidden">
                  <Image 
                    src={ritual.images[0] || '/placeholder.jpg'} 
                    alt={ritual.name} fill 
                    className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-1000" 
                  />
                  <button 
                    onClick={() => handleRemove(ritual.id)}
                    className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-full text-white/40 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16}/>
                  </button>
               </div>
               <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-white text-xl font-light italic">{ritual.name}</h4>
                    <p className="text-[#D4AF7A] text-xs font-bold mt-1 tracking-widest uppercase">{ritual.price}</p>
                  </div>
                  <button className="w-full py-4 bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#D4AF7A] hover:text-[#121212] transition-all flex items-center justify-center gap-2">
                    <Calendar size={14}/> Book Ritual
                  </button>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}