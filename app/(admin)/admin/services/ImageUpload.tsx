"use client";

import React, { useState, useRef } from 'react';
import { Upload, X, ImageIcon, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value: string; // The current image (URL or Base64)
  onChange: (value: string) => void; // Callback to update parent state
  onUploading: (status: boolean) => void; // To disable "Save" button in parent
}

export default function ImageUpload({ value, onChange, onUploading }: ImageUploadProps) {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Validation: File Size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image is too large. Maximum size is 5MB.");
      return;
    }

    // 2. Validation: File Type
    if (!file.type.startsWith('image/')) {
      setError("Please select a valid image file (JPG, PNG, WebP).");
      return;
    }

    setError(null);
    setIsUploading(true);
    onUploading(true);
    setProgress(0);

    // 3. Simulate Upload Progress (Luxury touch)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 100);

    // 4. Convert to Base64 (Simulating a real server upload)
    const reader = new FileReader();
    reader.onloadend = () => {
      setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        setIsUploading(false);
        onUploading(false);
        onChange(reader.result as string);
      }, 1000); // Artificial delay for premium feel
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    onChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-4 w-full">
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        accept="image/*" 
        onChange={handleFileChange} 
      />

      <AnimatePresence mode="wait">
        {!value && !isUploading ? (
          /* EMPTY STATE: UPLOAD BUTTON */
          <motion.div
            key="upload-btn"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => fileInputRef.current?.click()}
            className="group cursor-pointer border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-[#D4AF7A]/50 transition-all p-8 text-center flex flex-col items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-[#D4AF7A]/10 flex items-center justify-center text-[#D4AF7A] group-hover:scale-110 transition-transform">
              <Upload size={20} />
            </div>
            <div>
              <p className="text-white text-xs uppercase tracking-widest font-bold">Select Image</p>
              <p className="text-white/30 text-[10px] mt-1 uppercase tracking-tighter">JPG, PNG, WEBP (Max 5MB)</p>
            </div>
          </motion.div>
        ) : isUploading ? (
          /* UPLOADING STATE: PROGRESS BAR */
          <motion.div
            key="uploading"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="border border-white/10 bg-white/5 p-8 flex flex-col items-center gap-4"
          >
            <Loader2 className="text-[#D4AF7A] animate-spin" size={24} />
            <div className="w-full max-w-xs bg-white/5 h-1 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#D4AF7A]" 
                initial={{ width: 0 }} 
                animate={{ width: `${progress}%` }} 
              />
            </div>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.3em]">Processing Ritual Visual... {progress}%</p>
          </motion.div>
        ) : (
          /* PREVIEW STATE: IMAGE & CONTROLS */
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-video w-full border border-white/10 group overflow-hidden"
          >
            <img src={value} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            
            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-white text-black p-3 rounded-full hover:bg-[#D4AF7A] transition-colors shadow-xl"
              >
                <RefreshCw size={18} />
              </button>
              <button 
                type="button"
                onClick={removeImage}
                className="bg-white text-black p-3 rounded-full hover:bg-red-500 transition-colors shadow-xl"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/10">
              <p className="text-[9px] text-white uppercase tracking-widest flex items-center gap-2">
                <ImageIcon size={10} className="text-[#D4AF7A]" /> Visual Ready
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ERROR MESSAGE */}
      {error && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-red-400 bg-red-400/5 border border-red-400/10 p-3 text-[10px] uppercase tracking-widest">
          <AlertCircle size={14} /> {error}
        </motion.div>
      )}
    </div>
  );
}