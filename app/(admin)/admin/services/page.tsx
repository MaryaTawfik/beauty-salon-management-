"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Plus, Search, Edit3, Trash2, ExternalLink, Image as ImageIcon, Layout } from 'lucide-react';
import { ServiceCategory, SubService } from '@/app/types/service';
import { useServices } from '@/app/context/ServiceContext'; 
import ServiceFormModal from './ServiceFormModal';
import CategoryFormModal from './CategoryFormModal';

export default function AdminServicesPage() {
  const { categories, setCategories, isMounted } = useServices(); 
  const [searchQuery, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{catId: string, sub: SubService | null} | null>(null);
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null);

  const handleSaveCategory = (catData: ServiceCategory) => {
    setCategories(prev => {
      const exists = prev.find(c => c.id === catData.id);
      return exists ? prev.map(c => c.id === catData.id ? catData : c) : [...prev, catData];
    });
    setIsCatModalOpen(false);
  };

  const handleSaveService = (catId: string, serviceData: SubService) => {
    setCategories(prev => prev.map(cat => {
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
    }));
    setIsModalOpen(false);
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm("Delete this category and all its rituals?")) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleOpenCatModal = (cat: ServiceCategory | null = null) => {
    setEditingCategory(cat);
    setIsCatModalOpen(true);
  };

  const handleOpenModal = (catId: string, sub: SubService | null = null) => {
    setEditingItem({ catId, sub });
    setIsModalOpen(true);
  };

  const handleDelete = (catId: string, subId: string) => {
    if (confirm("Remove this ritual?")) {
      setCategories(prev => prev.map(cat => cat.id === catId ? 
        { ...cat, subServices: cat.subServices.filter(s => s.id !== subId) } : cat
      ));
    }
  };

  if (!isMounted) return null;

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h1 className="text-3xl font-light italic text-white tracking-tight">Ritual Inventory</h1>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] mt-1">Live Management</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => handleOpenCatModal()} className="border border-[#D4AF7A]/30 text-[#D4AF7A] px-6 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#D4AF7A] hover:text-black transition-all">
            <Layout size={16} /> New Category
          </button>
          <button onClick={() => handleOpenModal(categories[0]?.id)} className="bg-[#D4AF7A] text-black px-6 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-white transition-all">
            <Plus size={16} /> Add Ritual
          </button>
        </div>
      </div>

      <div className="space-y-16">
        {categories.map((cat) => (
          <div key={cat.id} className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 group">
               <div className="flex items-center gap-4">
                 <h2 className="text-[#D4AF7A] text-[11px] uppercase tracking-[0.5em] font-bold">{cat.title}</h2>
                 <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                   <button onClick={() => handleOpenCatModal(cat)} className="p-1 text-white/20 hover:text-white transition-colors"><Edit3 size={14}/></button>
                   <button onClick={() => handleDeleteCategory(cat.id)} className="p-1 text-white/20 hover:text-red-500 transition-colors"><Trash2 size={14}/></button>
                 </div>
               </div>
               <button onClick={() => handleOpenModal(cat.id)} className="text-white/30 hover:text-[#D4AF7A] text-[9px] uppercase tracking-widest flex items-center gap-1 transition-colors"><Plus size={12} /> Add Ritual</button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence mode="popLayout">
                {cat.subServices.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).map((sub) => (
                  <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={sub.id} className="group bg-[#121212] border border-white/5 p-5 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#D4AF7A]/30 transition-all duration-300">
                    <div className="flex items-center gap-6 w-full md:w-auto">
                      <div className="relative w-20 h-20 bg-zinc-900 border border-white/5 overflow-hidden">
                        {sub.images[0] && <img src={sub.images[0]} alt="" className="object-cover w-full h-full opacity-50 group-hover:opacity-100 transition-all" />}
                      </div>
                      <div>
                        <h3 className="text-white text-lg font-light tracking-wide">{sub.name}</h3>
                        <p className="text-[#D4AF7A] text-xs font-bold">{sub.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleOpenModal(cat.id, sub)} className="p-3 text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all"><Edit3 size={18} /></button>
                      <button onClick={() => handleDelete(cat.id, sub.id)} className="p-3 text-white/20 hover:text-red-500 hover:bg-red-500/5 rounded-full transition-all"><Trash2 size={18} /></button>
                      <Link href={`/services/${cat.slug}/${sub.slug}`} target="_blank" className="p-3 text-white/20 hover:text-[#D4AF7A] transition-all"><ExternalLink size={18} /></Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      <ServiceFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveService} initialData={editingItem} />
      <CategoryFormModal isOpen={isCatModalOpen} onClose={() => setIsCatModalOpen(false)} onSave={handleSaveCategory} initialData={editingCategory} />
    </div>
  );
}