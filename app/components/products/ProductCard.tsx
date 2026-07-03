"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { cn } from '@/lib/utils';

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-[#1a1a1a] border border-white/5 overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
           <button 
            onClick={() => addToCart(product)}
            className="bg-[#D4AF7A] text-[#121212] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-white"
           >
             <Plus size={14} /> Add to Collection
           </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[#D4AF7A] text-[9px] uppercase tracking-[0.3em] font-semibold mb-1">
              {product.category}
            </p>
            <h3 className="text-white font-light text-lg italic tracking-wide">{product.name}</h3>
          </div>
          <div className="flex items-center gap-1">
            <Star size={10} fill="#D4AF7A" className="text-[#D4AF7A]" />
            <span className="text-[10px] text-white/40 font-bold">5.0</span>
          </div>
        </div>
        
        <p className="text-white/40 text-xs font-light line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="pt-2 border-t border-white/5 flex justify-between items-center">
          <span className="text-lg font-medium text-white">{product.price} <span className="text-[10px] text-white/30 uppercase">ETB</span></span>
          <button 
            onClick={() => addToCart(product)}
            className="lg:hidden text-[#D4AF7A] p-2" // Visible only on mobile since hover doesn't work there
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}