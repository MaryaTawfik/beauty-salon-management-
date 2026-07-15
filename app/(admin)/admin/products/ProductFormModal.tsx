"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, ShoppingBag, Loader2, ChevronDown, PlusCircle } from 'lucide-react';
import ImageUpload from '../services/ImageUpload';
import { cn } from '@/lib/utils';

export default function ProductFormModal({ isOpen, onClose, onSave, initialData }: any) {
  const [formData, setFormData] = useState({
    id: '', name: '', price: 0, description: '', image: '', category: 'Skin Care'
  });
  
  const [isCreatingNewCategory, setIsCreatingNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Hardcoded defaults, but in a real app these could come from your context
  const existingCategories = ["Skin Care", "Hair Care", "Treatments", "Fragrance"];

  // SYNC Logic: Fixed to prevent cascading renders
  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        name: '',
        price: 0,
        description: '',
        image: '',
        category: 'Skin Care'
      });
    }
    setIsCreatingNewCategory(false);
    setNewCategoryName("");
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading) return;

    const finalData = {
      ...formData,
      category: isCreatingNewCategory ? newCategoryName : formData.category
    };

    onSave(finalData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
          />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-[#121212] border border-[#D4AF7A]/30 w-full max-w-xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#1a1a1a]">
              <div className="flex items-center gap-3 text-white">
                <ShoppingBag className="text-[#D4AF7A]" size={20} />
                <h2 className="text-xl font-light italic">
                  {initialData ? 'Refine Product' : 'Add to Collection'}
                </h2>
              </div>
              <button onClick={onClose} className="text-white/20 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
              
              <div className="space-y-2">
                 <label className="text-[10px] uppercase tracking-widest text-[#D4AF7A] font-bold">Product Visual</label>
                 <ImageUpload 
                   value={formData.image} 
                   onChange={(v) => setFormData({...formData, image: v})} 
                   onUploading={setIsUploading} 
                 />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 text-white">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Product Name</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-[#D4AF7A] outline-none transition-all" />
                </div>
                <div className="space-y-2 text-white">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Price (ETB)</label>
                  <input required type="number" value={formData.price || ''} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-[#D4AF7A] outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Collection Category</label>
                <div className="relative">
                  {/* VISIBILITY FIX: Always visible border and text color */}
                  <select 
                    value={isCreatingNewCategory ? "NEW" : formData.category} 
                    onChange={(e) => {
                      if (e.target.value === "NEW") {
                        setIsCreatingNewCategory(true);
                      } else {
                        setIsCreatingNewCategory(false);
                        setFormData({...formData, category: e.target.value});
                      }
                    }}
                    className="w-full bg-white/5 border border-white/20 p-4 pr-10 text-sm text-white focus:border-[#D4AF7A] outline-none appearance-none cursor-pointer"
                  >
                    {existingCategories.map(cat => (
                      <option key={cat} value={cat} className="bg-black text-white">{cat}</option>
                    ))}
                    <option value="NEW" className="bg-black text-[#D4AF7A] font-bold">+ Create New Collection</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" size={16} />
                </div>

                <AnimatePresence>
                  {isCreatingNewCategory && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <div className="p-4 bg-[#D4AF7A]/5 border border-[#D4AF7A]/20 space-y-2">
                        <label className="text-[9px] uppercase text-[#D4AF7A] flex items-center gap-2">
                          <PlusCircle size={12} /> Name of New Collection
                        </label>
                        <input 
                          required 
                          autoFocus
                          placeholder="e.g. Summer Specials"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          className="w-full bg-black/40 border border-[#D4AF7A]/30 p-3 text-xs text-white outline-none focus:border-[#D4AF7A]"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-2 text-white">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Description</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-[#D4AF7A] outline-none resize-none h-24" />
              </div>

              <button 
                type="submit" 
                disabled={isUploading}
                className="w-full bg-[#D4AF7A] text-[#121212] py-5 font-bold uppercase tracking-[0.3em] text-xs transition-all hover:bg-white disabled:opacity-30 flex items-center justify-center gap-2 shadow-xl"
              >
                {isUploading ? (
                  <><Loader2 className="animate-spin" size={18} /> Processing Asset...</>
                ) : (
                  <><Save size={18} /> Confirm Ritual Inventory</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}