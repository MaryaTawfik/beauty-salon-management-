import React from 'react';
import { PRODUCTS } from '@/app/data/products';
import ProductCard from './ProductCard';

export default function ProductSection() {
  return (
    <section className="py-24 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-[#D4AF7A] text-sm uppercase tracking-[0.4em] font-bold mb-4">
            Boutique
          </h2>
          <h3 className="text-white text-4xl md:text-5xl font-light italic tracking-tight">
            Professional Care At Home
          </h3>
          <div className="w-20 h-[1px] bg-[#D4AF7A]/30 mx-auto mt-8" />
        </div>

        {/* Responsive Grid: 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}