"use client";

import React, { useState } from 'react'; // FIXED: Added useState here
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, ShoppingBag, Star, Check } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { cn } from '@/lib/utils';

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  
  // This state is what caused the error because it wasn't imported
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    // Visual feedback reset after 2 seconds
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-[#1a1a1a] border border-white/5 overflow-hidden rounded-none"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
        <Image 
          src={product.image || '/placeholder.jpg'} 
          alt={product.name} 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
        />
        
        {/* Desktop Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6">
           <button 
            onClick={handleAdd}
            disabled={added}
            className={cn(
                "w-full py-4 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300",
                added ? "bg-green-600 text-white" : "bg-[#D4AF7A] text-[#121212] hover:bg-white"
            )}
           >
             {added ? (
                <> <Check size={14} /> Added to Collection </>
             ) : (
                <> <Plus size={14} /> Add to Collection </>
             )}
           </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 text-left">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[#D4AF7A] text-[9px] uppercase tracking-[0.4em] font-bold mb-1">
              {product.category}
            </p>
            <h3 className="text-white font-light text-lg italic tracking-wide">{product.name}</h3>
          </div>
          <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-full">
            <Star size={10} fill="#D4AF7A" className="text-[#D4AF7A]" />
            <span className="text-[10px] text-white/60 font-bold">5.0</span>
          </div>
        </div>
        
        <p className="text-white/40 text-[11px] font-light line-clamp-2 leading-relaxed h-8">
          {product.description}
        </p>
        
        <div className="pt-4 border-t border-white/5 flex justify-between items-center">
          <span className="text-xl font-medium text-white tracking-tighter">
            {product.price} <span className="text-[10px] text-[#D4AF7A] uppercase ml-1">ETB</span>
          </span>
          
          {/* Mobile-Only Quick Add Button */}
          <button 
            onClick={handleAdd}
            className={cn(
                "lg:hidden p-2.5 rounded-full transition-all active:scale-90",
                added ? "bg-green-600 text-white" : "bg-[#D4AF7A]/10 text-[#D4AF7A]"
            )}
          >
            {added ? <Check size={18} /> : <ShoppingBag size={18} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}