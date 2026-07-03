"use client";

import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterProps {
  maxPrice: number;
  setMaxPrice: (val: number) => void;
  minRating: number;
  setMinRating: (val: number) => void;
}

export default function FilterBar({ maxPrice, setMaxPrice, minRating, setMinRating }: FilterProps) {
  return (
    <div className="flex flex-col md:flex-row gap-10 items-center justify-center py-10 border-b border-white/5">
      {/* Price Filter */}
      <div className="space-y-4 w-full max-w-xs">
        <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40">
          <span>Max Investment</span>
          <span className="text-[#D4AF7A]">{maxPrice} ETB</span>
        </div>
        <input 
          type="range" min="300" max="15000" step="100"
          value={maxPrice}
          onChange={(e) => setMaxPrice(parseInt(e.target.value))}
          className="w-full accent-[#D4AF7A] bg-white/10 h-1 rounded-full appearance-none cursor-pointer"
        />
      </div>

      {/* Rating Filter */}
      <div className="flex gap-4">
        {[4, 5].map((stars) => (
          <button
            key={stars}
            onClick={() => setMinRating(stars)}
            className={cn(
              "px-6 py-2 border transition-all text-[10px] uppercase tracking-widest flex items-center gap-2",
              minRating === stars ? "bg-[#D4AF7A] border-[#D4AF7A] text-black" : "border-white/10 text-white/40 hover:border-white"
            )}
          >
            {stars}+ <Star size={12} fill={minRating === stars ? "black" : "none"} />
          </button>
        ))}
        <button onClick={() => {setMaxPrice(15000); setMinRating(0)}} className="text-[9px] uppercase tracking-tighter text-white/20 underline">Reset</button>
      </div>
    </div>
  );
}