"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Star, User, ShoppingBag, ArrowRight } from 'lucide-react';
import { getUnifiedSearch } from '@/lib/search-utils';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");

  // Memoize results so we don't re-filter on every re-render unless query changes
  const results = useMemo(() => getUnifiedSearch(query), [query]);

  // Accessibility: Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] bg-[#121212] flex flex-col"
        >
          {/* TOP BAR */}
          <div className="p-6 md:px-12 md:py-10 flex justify-between items-center border-b border-white/5 bg-[#121212]">
            <div className="flex items-center gap-6 flex-1 max-w-4xl">
              <Search className="text-[#D4AF7A] shrink-0" size={28} />
              <input 
                autoFocus
                placeholder="Search rituals, boutique, or artists..."
                className="bg-transparent border-none outline-none text-2xl md:text-5xl font-light italic text-white w-full placeholder:text-white/5 selection:bg-[#D4AF7A]/30"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={onClose} 
              className="p-3 text-white/40 hover:text-[#D4AF7A] transition-all duration-300 hover:rotate-90"
              aria-label="Close search"
            >
              <X size={36} strokeWidth={1} />
            </button>
          </div>

          {/* RESULTS AREA */}
          <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-20 custom-scrollbar">
            {!query ? (
              /* EMPTY STATE / SUGGESTIONS */
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto text-center space-y-8 mt-12"
              >
                <p className="text-[#D4AF7A] text-[10px] uppercase tracking-[0.6em] font-bold">Inspirations</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {['Shuruba', 'Bridal', 'Gold Serum', 'Nails', 'Martha'].map((s) => (
                    <button 
                      key={s} 
                      onClick={() => setQuery(s)}
                      className="px-8 py-3 border border-white/10 rounded-none text-white/40 hover:border-[#D4AF7A] hover:text-[#D4AF7A] transition-all text-[10px] uppercase tracking-[0.2em]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* SEARCH RESULTS GRID */
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
                
                {/* 1. SERVICES COLUMN */}
                <div className="space-y-10">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <h3 className="text-[#D4AF7A] text-[10px] uppercase tracking-[0.4em] font-bold">Service Rituals</h3>
                    <span className="text-white/20 text-xs font-mono">{results.services.length}</span>
                  </div>
                  
                  {results.services.length === 0 && <p className="text-white/20 italic text-sm font-light">No rituals found matching your search.</p>}
                  
                  <div className="space-y-8">
                    {results.services.map((s) => (
                      <Link 
                        key={s.id} 
                        href={`/services/${s.categorySlug}/${s.slug}`} // FIXED LINK
                        onClick={onClose}
                        className="group block space-y-2 border-l border-transparent hover:border-[#D4AF7A] pl-4 transition-all"
                      >
                        <p className="text-[#D4AF7A] text-[9px] uppercase tracking-widest">{s.categoryTitle}</p>
                        <h4 className="text-white text-xl font-light group-hover:text-[#D4AF7A] transition-colors flex items-center gap-2">
                          {s.name} <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </h4>
                        <p className="text-white/30 text-xs font-light">{s.price} • {s.duration}</p>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* 2. PRODUCTS COLUMN */}
                <div className="space-y-10">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <h3 className="text-[#D4AF7A] text-[10px] uppercase tracking-[0.4em] font-bold">The Boutique</h3>
                    <span className="text-white/20 text-xs font-mono">{results.products.length}</span>
                  </div>

                  {results.products.length === 0 && <p className="text-white/20 italic text-sm font-light">No products found in our collection.</p>}

                  <div className="space-y-6">
                    {results.products.map((p) => (
                      <Link key={p.id} href="/#products" onClick={onClose} className="flex gap-5 group items-center">
                        <div className="relative w-16 h-20 bg-white/5 overflow-hidden">
                          <Image src={p.image} alt={p.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <div>
                          <h4 className="text-white text-sm font-light group-hover:text-[#D4AF7A] transition-colors">{p.name}</h4>
                          <p className="text-[#D4AF7A] text-[10px] font-bold mt-1 uppercase tracking-tighter">{p.price} ETB</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* 3. STYLISTS COLUMN */}
                <div className="space-y-10">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <h3 className="text-[#D4AF7A] text-[10px] uppercase tracking-[0.4em] font-bold">Master Artists</h3>
                    <span className="text-white/20 text-xs font-mono">{results.stylists.length}</span>
                  </div>

                  {results.stylists.length === 0 && <p className="text-white/20 italic text-sm font-light">No artists matching your criteria.</p>}

                  <div className="space-y-8">
                    {results.stylists.map((st) => (
                      <div key={st.id} className="flex items-center gap-5 group">
                        <div className="w-12 h-12 rounded-full border border-[#D4AF7A]/20 p-1">
                          <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center text-[#D4AF7A]">
                            <User size={20} />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-white text-sm font-medium tracking-wide">{st.name}</h4>
                          <p className="text-[#D4AF7A] text-[9px] uppercase tracking-widest">{st.role}</p>
                          <div className="flex items-center gap-1 mt-1">
                             <Star size={8} fill="#D4AF7A" className="text-[#D4AF7A]" />
                             <span className="text-white/20 text-[9px]">{st.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* FOOTER INFO */}
          <div className="p-8 border-t border-white/5 text-center">
            <p className="text-white/10 text-[9px] uppercase tracking-[0.4em]">Press Esc to Close • L`&apos;`ÉLITE Digital Concierge</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}