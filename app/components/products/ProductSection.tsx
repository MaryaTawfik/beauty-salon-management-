"use client"; // Must be a client component to use Context

import React from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '@/app/context/ProductContext'; // Import the shared brain
import { motion } from 'framer-motion';

export default function ProductSection() {
  // 1. Pull the live product list and mounting status
  const { products, isMounted } = useProducts();

  // 2. Hydration Guard: 
  // This prevents the "Text content did not match" error.
  // It ensures the section only renders once the browser is ready.
  if (!isMounted) {
    return (
      <section className="py-24 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-96 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#D4AF7A] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-[#D4AF7A] text-sm uppercase tracking-[0.4em] font-bold mb-4">
            Boutique
          </h2>
          <h3 className="text-white text-4xl md:text-5xl font-light italic tracking-tight">
            Professional Care At Home
          </h3>
          <div className="w-20 h-[1px] bg-[#D4AF7A]/30 mx-auto mt-8" />
        </motion.div>

        {/* Dynamic Grid */}
        {products.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-white/5">
            <p className="text-white/20 uppercase tracking-widest text-xs">The collection is currently being curated.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}