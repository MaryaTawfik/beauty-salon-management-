"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit3, Trash2, Package } from 'lucide-react';
import { useProducts } from '@/app/context/ProductContext';
import ProductFormModal from './ProductFormModal';
import { cn } from '@/lib/utils';

export default function AdminProductsPage() {
  const { products, setProducts, isMounted } = useProducts();
  const [searchQuery, setQuery] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: any) => {
    setEditingItem(product);
    setIsModalOpen(true);
  };

  const handleSave = (data: any) => {
    setProducts(prev => {
      const exists = prev.find(p => p.id === data.id);
      return exists ? prev.map(p => p.id === data.id ? data : p) : [...prev, data];
    });
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Remove this product?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  if (!isMounted) return null;

  return (
    // FIX: Added 'mt-6 lg:mt-12' for better spacing on large devices
    <div className="space-y-10 pb-20 mt-6 lg:mt-12">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-light italic text-white tracking-tight">Boutique Inventory</h1>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.4em]">Curate your luxury collection</p>
        </div>
        
        {/* IMPROVED BUTTON: Entire surface is now the hit-box */}
        <motion.button 
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpenAddModal}
          className="w-full md:w-auto relative group"
        >
          {/* Subtle Glow Effect on Hover */}
          <div className="absolute inset-0 bg-[#D4AF7A] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
          
          <div className="relative bg-[#D4AF7A] text-[#121212] px-10 py-5 flex items-center justify-center gap-3 shadow-lg overflow-hidden">
            {/* Shimmer effect inside the button */}
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            
            <Plus size={20} strokeWidth={2.5} />
            <span className="text-xs font-bold uppercase tracking-[0.25em]">New Product</span>
          </div>
        </motion.button>
      </div>

      {/* Search Bar Area */}
      <div className="relative max-w-md group">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <Search className="text-white/20 group-focus-within:text-[#D4AF7A] transition-colors" size={18} />
        </div>
        <input 
          placeholder="Search items..." 
          className="w-full bg-[#1a1a1a] border border-white/5 p-5 pl-12 text-sm text-white focus:border-[#D4AF7A]/50 outline-none transition-all placeholder:text-white/5" 
          value={searchQuery} 
          onChange={(e) => setQuery(e.target.value)} 
        />
      </div>

      {/* Product List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {products
            .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((product) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={product.id} 
                className="bg-[#121212] border border-white/5 p-5 flex gap-5 group hover:border-[#D4AF7A]/30 transition-all duration-500 relative"
              >
                <div className="relative w-28 h-32 bg-[#1a1a1a] border border-white/5 overflow-hidden flex-shrink-0">
                   {product.image ? (
                     <img src={product.image} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000" alt={product.name} />
                   ) : (
                     <Package className="m-auto text-white/5 mt-10" size={32} />
                   )}
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <p className="text-[#D4AF7A] text-[9px] uppercase tracking-[0.2em] font-bold mb-1">{product.category}</p>
                    <h3 className="text-white text-base font-light tracking-wide line-clamp-1">{product.name}</h3>
                    <p className="text-white/40 text-sm font-medium mt-2">{product.price} <span className="text-[10px] opacity-30">ETB</span></p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleOpenEditModal(product)} 
                      className="p-2 text-white/20 hover:text-white hover:bg-white/5 transition-all"
                      title="Edit"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)} 
                      className="p-2 text-white/20 hover:text-red-500 hover:bg-red-500/5 transition-all"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <ProductFormModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }} 
        onSave={handleSave} 
        initialData={editingItem} 
      />
    </div>
  );
}