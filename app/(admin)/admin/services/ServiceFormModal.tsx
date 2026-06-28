"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Plus, Trash2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { SubService } from '@/app/types/service';
import { cn } from '@/lib/utils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (catId: string, data: SubService) => void;
  initialData: { catId: string; sub: SubService | null } | null;
}

export default function ServiceFormModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [formData, setFormData] = useState<SubService>({
    id: '', slug: '', name: '', description: '', price: '', duration: '', benefits: [''], images: ['']
  });

  useEffect(() => {
    if (initialData?.sub) {
      setFormData(initialData.sub);
    } else {
      setFormData({
        id: Math.random().toString(36).substr(2, 9), // Auto-generate ID for new items
        slug: '', name: '', description: '', price: '', duration: '', benefits: [''], images: ['']
      });
    }
  }, [initialData]);

  const addBenefit = () => setFormData({ ...formData, benefits: [...formData.benefits, ''] });
  const updateBenefit = (index: number, val: string) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = val;
    setFormData({ ...formData, benefits: newBenefits });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) onSave(initialData.catId, formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-[#121212] border border-[#D4AF7A]/20 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="p-8 border-b border-white/5 flex justify-between items-center sticky top-0 bg-[#121212] z-10">
              <div className="flex items-center gap-3">
                <Sparkles className="text-[#D4AF7A]" size={20} />
                <h2 className="text-xl text-white font-light italic">
                  {initialData?.sub ? 'Edit Ritual' : 'Add New Ritual'}
                </h2>
              </div>
              <button onClick={onClose} className="text-white/20 hover:text-white"><X size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Ritual Name</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})} className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none" placeholder="e.g. Royal Shuruba" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Slug (URL)</label>
                  <input required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white/40 focus:border-[#D4AF7A] outline-none" placeholder="royal-shuruba" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Investment (Price)</label>
                  <input required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none" placeholder="1500 ETB" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Duration</label>
                  <input required value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none" placeholder="2-3 Hours" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Detailed Description</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none resize-none" placeholder="Describe the luxury experience..." />
              </div>

              {/* Benefits Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Key Benefits</label>
                  <button type="button" onClick={addBenefit} className="text-[#D4AF7A] text-[10px] uppercase tracking-widest flex items-center gap-1 hover:text-white"><Plus size={12}/> Add Benefit</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.benefits.map((b, idx) => (
                    <input key={idx} value={b} onChange={e => updateBenefit(idx, e.target.value)} className="bg-white/5 border border-white/10 p-3 text-xs text-white focus:border-[#D4AF7A] outline-none" placeholder="Benefit details..." />
                  ))}
                </div>
              </div>

              {/* Image URL Section */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Cover Image URL</label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  <input value={formData.images[0]} onChange={e => setFormData({...formData, images: [e.target.value]})} className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-sm text-white focus:border-[#D4AF7A] outline-none" placeholder="/images/services/your-photo.jpg" />
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <button type="submit" className="flex-1 bg-[#D4AF7A] text-[#121212] py-4 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all">
                  <Save size={16} /> Confirm Ritual Details
                </button>
                <button type="button" onClick={onClose} className="px-8 py-4 border border-white/10 text-white/40 text-[10px] uppercase tracking-widest hover:text-white transition-all">
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}