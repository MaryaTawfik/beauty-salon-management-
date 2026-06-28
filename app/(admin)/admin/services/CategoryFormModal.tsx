"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Layout, Image as ImageIcon } from 'lucide-react';
import { ServiceCategory } from '@/app/types/service';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ServiceCategory) => void;
  initialData: ServiceCategory | null;
}

export default function CategoryFormModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [formData, setFormData] = useState<ServiceCategory>({
    id: '', slug: 'hair', title: '', description: '', image: '', startingPrice: '', subServices: []
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        id: Math.random().toString(36).substr(2, 9),
        slug: 'hair', title: '', description: '', image: '', startingPrice: '', subServices: []
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-[#121212] border border-[#D4AF7A]/20 w-full max-w-2xl shadow-2xl"
          >
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#121212]">
              <div className="flex items-center gap-3">
                <Layout className="text-[#D4AF7A]" size={20} />
                <h2 className="text-xl text-white font-light italic">
                  {initialData ? 'Edit Category' : 'Create New Category'}
                </h2>
              </div>
              <button onClick={onClose} className="text-white/20 hover:text-white"><X size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Category Title</label>
                  <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') as any})} className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none" placeholder="e.g. Skin Care" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Starting Price</label>
                  <input required value={formData.startingPrice} onChange={e => setFormData({...formData, startingPrice: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none" placeholder="300 ETB" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Brief Description</label>
                <textarea rows={2} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none resize-none" placeholder="Summarize this category..." />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Cover Image URL</label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  <input value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-sm text-white focus:border-[#D4AF7A] outline-none" placeholder="/images/categories/hair.jpg" />
                </div>
              </div>

              <div className="flex gap-6 pt-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={formData.isPopular} onChange={e => setFormData({...formData, isPopular: e.target.checked})} className="w-4 h-4 accent-[#D4AF7A]" />
                  <span className="text-[10px] uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Mark as Popular</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={formData.isPremium} onChange={e => setFormData({...formData, isPremium: e.target.checked})} className="w-4 h-4 accent-[#D4AF7A]" />
                  <span className="text-[10px] uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Premium Package</span>
                </label>
              </div>

              <div className="pt-6 flex gap-4">
                <button type="submit" className="flex-1 bg-[#D4AF7A] text-[#121212] py-4 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all">
                  <Save size={16} /> Save Category
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}