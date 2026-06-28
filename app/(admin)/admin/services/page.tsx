"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Plus, Search, Edit3, Trash2, 
  ExternalLink, Image as ImageIcon, Layout,
  ChevronRight
} from 'lucide-react';
import { getAdminServices, saveAdminServices } from '@/lib/admin-utils';
import { ServiceCategory, SubService } from '@/app/types/service';
import ServiceFormModal from './ServiceFormModal';
import CategoryFormModal from './CategoryFormModal'; // Ensure you created this file

export default function AdminServicesPage() {
  // --- States ---
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [searchQuery, setQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Service Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{catId: string, sub: SubService | null} | null>(null);

  // Category Modal State
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null);

  // 1. Initial Load (Hydration Guard)
  useEffect(() => {
    setCategories(getAdminServices());
    setIsMounted(true);
  }, []);

  // --- Category Handlers ---
  const handleOpenCatModal = (cat: ServiceCategory | null = null) => {
    setEditingCategory(cat);
    setIsCatModalOpen(true);
  };

  const handleSaveCategory = (catData: ServiceCategory) => {
    const exists = categories.find(c => c.id === catData.id);
    let updated;
    if (exists) {
      updated = categories.map(c => c.id === catData.id ? catData : c);
    } else {
      updated = [...categories, catData];
    }
    setCategories(updated);
    saveAdminServices(updated);
    setIsCatModalOpen(false);
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm("CRITICAL WARNING: Deleting this category will permanently remove ALL rituals inside it. Continue?")) {
      const updated = categories.filter(c => c.id !== id);
      setCategories(updated);
      saveAdminServices(updated);
    }
  };

  // --- Service (Ritual) Handlers ---
  const handleOpenModal = (catId: string, sub: SubService | null = null) => {
    setEditingItem({ catId, sub });
    setIsModalOpen(true);
  };

  const handleSaveService = (catId: string, serviceData: SubService) => {
    const updated = categories.map(cat => {
      if (cat.id === catId) {
        const exists = cat.subServices.find(s => s.id === serviceData.id);
        return {
          ...cat,
          subServices: exists 
            ? cat.subServices.map(s => s.id === serviceData.id ? serviceData : s)
            : [...cat.subServices, serviceData]
        };
      }
      return cat;
    });

    setCategories(updated);
    saveAdminServices(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (catId: string, subId: string) => {
    if (confirm("Are you sure you want to remove this ritual?")) {
      const updated = categories.map(cat => {
        if (cat.id === catId) {
          return { ...cat, subServices: cat.subServices.filter(s => s.id !== subId) };
        }
        return cat;
      });
      setCategories(updated);
      saveAdminServices(updated);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="space-y-10 pb-20">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-light italic text-white tracking-tight">Ritual Management</h1>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] mt-2 font-medium">Configure salon categories and services</p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => handleOpenCatModal()}
            className="border border-[#D4AF7A]/30 text-[#D4AF7A] px-6 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#D4AF7A] hover:text-[#121212] transition-all"
          >
            <Layout size={16} /> New Category
          </button>
          <button 
            onClick={() => handleOpenModal(categories[0]?.id)}
            className="bg-[#D4AF7A] text-[#121212] px-6 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-white transition-all shadow-lg shadow-[#D4AF7A]/10"
          >
            <Plus size={16} /> Add Ritual
          </button>
        </div>
      </div>

      {/* Unified Search */}
      <div className="relative max-w-md group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#D4AF7A] transition-colors" size={18} />
        <input 
          placeholder="Filter inventory..."
          className="w-full bg-[#121212] border border-white/5 p-4 pl-12 text-sm text-white focus:border-[#D4AF7A] outline-none transition-all"
          value={searchQuery}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Main List */}
      <div className="space-y-16">
        {categories.map((cat) => (
          <div key={cat.id} className="space-y-6">
            {/* Category Header */}
            <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-4 group">
              <div className="flex items-center gap-4">
                <h2 className="text-[#D4AF7A] text-[11px] uppercase tracking-[0.5em] font-bold">{cat.title}</h2>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenCatModal(cat)} className="p-1.5 text-white/20 hover:text-white transition-colors" title="Edit Category">
                    <Edit3 size={14} />
                  </button>
                  <button onClick={() => handleDeleteCategory(cat.id)} className="p-1.5 text-white/10 hover:text-red-500 transition-colors" title="Delete Category">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              
              <button 
                onClick={() => handleOpenModal(cat.id)}
                className="text-white/30 hover:text-[#D4AF7A] text-[9px] uppercase tracking-widest flex items-center gap-1 transition-colors"
              >
                <Plus size={12} /> Add Ritual to {cat.slug}
              </button>
            </div>

            {/* Sub-Services Grid */}
            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence mode="popLayout">
                {cat.subServices
                  .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((sub) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={sub.id}
                      className="group bg-[#121212] border border-white/5 p-5 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#D4AF7A]/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-6 w-full md:w-auto">
                        <div className="relative w-20 h-20 bg-zinc-900 border border-white/5 flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                           {sub.images[0] ? (
                             <img src={sub.images[0]} alt="" className="object-cover w-full h-full opacity-40 group-hover:opacity-100 transition-opacity" />
                           ) : (
                             <ImageIcon className="text-white/10" size={24} />
                           )}
                        </div>
                        <div>
                          <h3 className="text-white text-lg font-light tracking-wide group-hover:text-[#D4AF7A] transition-colors">{sub.name}</h3>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-[#D4AF7A] text-xs font-bold">{sub.price}</span>
                            <span className="text-white/10 text-xs">|</span>
                            <span className="text-white/40 text-[10px] uppercase tracking-widest font-light">{sub.duration}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                        <button 
                          onClick={() => handleOpenModal(cat.id, sub)}
                          className="p-3 text-white/40 hover:text-white hover:bg-white/5 transition-all rounded-full"
                        >
                          <Edit3 size={18} />
                        </button>
                        
                        <button 
                          onClick={() => handleDelete(cat.id, sub.id)}
                          className="p-3 text-white/20 hover:text-red-500 hover:bg-red-500/5 transition-all rounded-full"
                        >
                          <Trash2 size={18} />
                        </button>

                        <Link 
                          href={`/services/${cat.slug}/${sub.slug}`}
                          target="_blank"
                          className="p-3 text-white/20 hover:text-[#D4AF7A] transition-all"
                        >
                           <ExternalLink size={18} />
                        </Link>
                      </div>
                    </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODALS --- */}
      <ServiceFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveService}
        initialData={editingItem}
      />

      <CategoryFormModal
        isOpen={isCatModalOpen}
        onClose={() => setIsCatModalOpen(false)}
        onSave={handleSaveCategory}
        initialData={editingCategory}
      />
    </div>
  );
}