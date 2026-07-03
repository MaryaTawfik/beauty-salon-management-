"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Layout, Sparkles, Loader2 } from 'lucide-react';
import { ServiceCategory } from '@/app/types/service';
import ImageUpload from './ImageUpload'; // Import the same logic used in rituals

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ServiceCategory) => void;
  initialData: ServiceCategory | null;
}

export default function CategoryFormModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [formData, setFormData] = useState<ServiceCategory>({
    id: '', 
    slug: 'hair', 
    title: '', 
    description: '', 
    image: '', 
    startingPrice: '', 
    subServices: []
  });

  const [isImageUploading, setIsImageUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        id: Math.random().toString(36).substr(2, 9),
        slug: 'hair', 
        title: '', 
        description: '', 
        image: '', 
        startingPrice: '', 
        subServices: []
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isImageUploading) {
      onSave(formData);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
          />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-[#121212] border border-[#D4AF7A]/20 w-full max-w-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#121212]">
              <div className="flex items-center gap-3">
                <Layout className="text-[#D4AF7A]" size={20} />
                <h2 className="text-xl text-white font-light italic">
                  {initialData ? 'Refine Category' : 'New Collection Category'}
                </h2>
              </div>
              <button onClick={onClose} className="text-white/20 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
              
              {/* Category Main Visual */}
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF7A] font-bold">Category Cover Visual</label>
                <ImageUpload 
                  value={formData.image} 
                  onChange={(val) => setFormData({...formData, image: val})} 
                  onUploading={setIsImageUploading}
                />
                <p className="text-white/20 text-[9px] italic">This image will appear on the main services grid on the home page.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Collection Title</label>
                  <input 
                    required 
                    value={formData.title} 
                    onChange={e => setFormData({
                      ...formData, 
                      title: e.target.value, 
                      slug: e.target.value.toLowerCase().replace(/ /g, '-') as any
                    })} 
                    className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none transition-all" 
                    placeholder="e.g. Artistic Henna" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Starting Price</label>
                  <input 
                    required 
                    value={formData.startingPrice} 
                    onChange={e => setFormData({...formData, startingPrice: e.target.value})} 
                    className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none transition-all" 
                    placeholder="e.g. 400 ETB" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Brand Narrative (Description)</label>
                <textarea 
                  rows={2} 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                  className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none resize-none" 
                  placeholder="Describe the essence of this collection..." 
                />
              </div>

              {/* Badges/Flags */}
              <div className="flex flex-wrap gap-8 pt-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={formData.isPopular} 
                    onChange={e => setFormData({...formData, isPopular: e.target.checked})} 
                    className="w-4 h-4 accent-[#D4AF7A] bg-transparent border-white/10" 
                  />
                  <span className="text-[10px] uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Featured / Popular</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={formData.isPremium} 
                    onChange={e => setFormData({...formData, isPremium: e.target.checked})} 
                    className="w-4 h-4 accent-[#D4AF7A] bg-transparent border-white/10" 
                  />
                  <span className="text-[10px] uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Premium Layout (Wide)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-white/5">
                <button 
                  type="submit" 
                  disabled={isImageUploading}
                  className="w-full bg-[#D4AF7A] text-[#121212] py-5 font-bold uppercase tracking-[0.3em] text-xs transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white flex items-center justify-center gap-2 shadow-xl"
                >
                  {isImageUploading ? (
                    <><Loader2 size={18} className="animate-spin" /> Processing Asset...</>
                  ) : (
                    <><Save size={18} /> Deploy Category Changes</>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}