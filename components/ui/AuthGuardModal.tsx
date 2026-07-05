"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface AuthGuardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export default function AuthGuardModal({ isOpen, onClose, title, message }: AuthGuardModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
          {/* Dark Blurred Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-[#1a1a1a] border border-[#D4AF7A]/30 w-full max-w-md p-10 text-center shadow-2xl overflow-hidden"
          >
            {/* Background Decorative Sparkle */}
            <Sparkles className="absolute -top-10 -right-10 text-[#D4AF7A]/10 w-40 h-40" />

            {/* Icon */}
            <div className="w-16 h-16 bg-[#D4AF7A]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#D4AF7A]/20 text-[#D4AF7A]">
              <Lock size={28} strokeWidth={1.5} />
            </div>

            {/* Text */}
            <h2 className="text-white text-2xl font-light italic mb-4">{title}</h2>
            <p className="text-white/50 text-sm font-light leading-relaxed mb-10">
              {message}
            </p>

            {/* Actions */}
            <div className="space-y-4">
              <Link href="/sign-in" onClick={onClose} className="block">
                <button className="w-full bg-[#D4AF7A] text-[#121212] py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white transition-all flex items-center justify-center gap-2">
                  Sign In to Your Account <ArrowRight size={14} />
                </button>
              </Link>
              
              <Link href="/sign-up" onClick={onClose} className="block">
                <button className="w-full text-white/40 text-[9px] uppercase tracking-[0.3em] hover:text-[#D4AF7A] transition-colors">
                  Don`&apos;`t have an account? <span className="underline ml-1">Become a Member</span>
                </button>
              </Link>
            </div>

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}