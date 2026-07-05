"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, ShoppingBag, Loader2, ChevronDown, PlusCircle } from 'lucide-react';
import ImageUpload from '../services/ImageUpload';

export default function ProductFormModal({ isOpen, onClose, onSave, initialData }: any) {
  const [formData, setFormData] = useState({
    id: '', name: '', price: 0, description: '', image: '', category: 'Skin Care'
  });
  const [isCreatingNewCategory, setIsCreatingNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // FIX: Synchronize prop to state only when modal opens or initialData changes
  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
        setFormData(initialData);
    } else {
        setFormData({
            id: `prod_${Date.now()}`,
            name: '',
            price: 0,
            description: '',
            image: '',
            category: 'Skin Care'
        });
    }
    setIsCreatingNewCategory(false);
  }, [isOpen, initialData]); // Dependencies correctly managed

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading) return;
    const finalData = { ...formData, category: isCreatingNewCategory ? newCategoryName : formData.category };
    onSave(finalData);
    setNewCategoryName("");
  };

  return (
      <AnimatePresence>
          {isOpen && (
              <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
                  {/* Backdrop */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
                  
                  {/* Modal Box */}
                  <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-[#121212] border border-[#D4AF7A]/30 w-full max-w-xl shadow-2xl overflow-hidden">
                      {/* ... rest of your existing form JSX ... */}
                      <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                         {/* Category and Image Upload components go here */}
                         <button type="submit" disabled={isUploading} className="w-full bg-[#D4AF7A] text-black py-4 font-bold uppercase tracking-widest text-xs">
                             {isUploading ? "Processing..." : "Confirm Ritual Inventory"}
                         </button>
                      </form>
                  </motion.div>
              </div>
          )}
      </AnimatePresence>
  );
}