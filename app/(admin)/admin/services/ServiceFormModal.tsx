"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';
import { SubService } from '@/app/types/service';
import ImageUpload from './ImageUpload';

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

  const [isAnyImageUploading, setIsAnyImageUploading] = useState(false);

  useEffect(() => {
    if (initialData?.sub) {
      setFormData(initialData.sub);
    } else {
      setFormData({
        id: Math.random().toString(36).substr(2, 9),
        slug: '', name: '', description: '', price: '', duration: '', benefits: [''], images: ['']
      });
    }
  }, [initialData, isOpen]);

  // GALLERY HANDLERS
  const addImageField = () => setFormData({ ...formData, images: [...formData.images, ''] });
  const updateImage = (index: number, base64Value: string) => {
    const newImages = [...formData.images];
    newImages[index] = base64Value;
    setFormData({ ...formData, images: newImages });
  };
  const removeImage = (index: number) => {
    if (formData.images.length > 1) {
      setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
    }
  };

  // BENEFITS HANDLERS
  const addBenefit = () => setFormData({ ...formData, benefits: [...formData.benefits, ''] });
  const updateBenefit = (index: number, val: string) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = val;
    setFormData({ ...formData, benefits: newBenefits });
  };
  const removeBenefit = (index: number) => {
    setFormData({ ...formData, benefits: formData.benefits.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData && !isAnyImageUploading) {
      onSave(initialData.catId, formData);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-[#121212] border border-[#D4AF7A]/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-8 space-y-10 custom-scrollbar">
            
            <div className="flex justify-between items-center border-b border-white/5 pb-6">
              <h2 className="text-xl text-white font-light italic flex items-center gap-2"><Sparkles className="text-[#D4AF7A]" /> Ritual Portfolio</h2>
              <button onClick={onClose} className="text-white/20 hover:text-white transition-colors"><X size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})} className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-[#D4AF7A] outline-none transition-all" placeholder="Ritual Name" />
                <div className="flex gap-2">
                   <input required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="flex-1 bg-white/5 border border-white/10 p-4 text-white focus:border-[#D4AF7A] outline-none" placeholder="Price" />
                   <input required value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="flex-1 bg-white/5 border border-white/10 p-4 text-white focus:border-[#D4AF7A] outline-none" placeholder="Time" />
                </div>
              </div>

              <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-[#D4AF7A] outline-none resize-none h-32" placeholder="Describe the ritual..." />

              {/* DYNAMIC GALLERY UPLOAD */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <label className="text-[10px] uppercase tracking-widest text-[#D4AF7A] font-bold">Visual Assets (Multi-Image)</label>
                   <button type="button" onClick={addImageField} className="text-white/40 text-[9px] uppercase flex items-center gap-1 hover:text-white"><Plus size={12}/> Add Another View</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="space-y-2">
                       <ImageUpload value={img} onChange={(val) => updateImage(idx, val)} onUploading={setIsAnyImageUploading} />
                       {formData.images.length > 1 && (
                         <button type="button" onClick={() => removeImage(idx)} className="text-[9px] text-red-400/50 hover:text-red-400 uppercase tracking-widest">Remove Slot</button>
                       )}
                    </div>
                  ))}
                </div>
              </div>

              {/* BENEFITS */}
              <div className="space-y-4">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Included Benefits</label>
                  <button type="button" onClick={addBenefit} className="text-[#D4AF7A] text-[10px] flex items-center gap-1"><Plus size={12}/> Add Line</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.benefits.map((b, idx) => (
                    <div key={idx} className="flex gap-2 group">
                      <input value={b} onChange={e => updateBenefit(idx, e.target.value)} className="flex-1 bg-white/5 border border-white/10 p-3 text-xs text-white focus:border-[#D4AF7A] outline-none" placeholder="Benefit details..." />
                      <button type="button" onClick={() => removeBenefit(idx)} className="p-2 text-white/10 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={isAnyImageUploading} className="w-full bg-[#D4AF7A] text-black py-5 font-bold uppercase tracking-[0.3em] text-xs hover:bg-white transition-all disabled:opacity-30 flex items-center justify-center gap-2">
                {isAnyImageUploading ? <><Loader2 className="animate-spin" /> Uploading...</> : <><Save size={18} /> Confirm Ritual Portfolio</>}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}