"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, CreditCard, ShoppingBag, ShieldCheck, Loader2 } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems, isMounted } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isMounted) return null;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert("Transaction successful! Your luxury collection is on the way.");
      clearCart(); // Wipes the user-specific storage
      setIsProcessing(false);
      setIsCheckingOut(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]" />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-full max-w-md bg-[#1a1a1a] z-[210] shadow-2xl flex flex-col border-l border-white/5" >
            
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#121212]">
              <div>
                <h2 className="text-white text-xl font-light italic">Your Collection</h2>
                <p className="text-[#D4AF7A] text-[10px] uppercase tracking-[0.3em] mt-1">{totalItems} Items</p>
              </div>
              <button onClick={onClose} className="p-2 text-white/40 hover:text-white transition-colors"><X size={24} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag size={48} className="text-white/5" />
                  <p className="text-white/20 uppercase tracking-widest text-xs">Your bag is empty</p>
                </div>
              ) : (
                cart.map((item, index) => (
                  <motion.div 
                    layout 
                    // FIX: Fallback to index if ID is empty to prevent console crash
                    key={item.id || `item-${index}`} 
                    className="flex gap-4 group bg-white/[0.02] p-3 border border-white/5"
                  >
                    <div className="relative w-20 h-24 bg-zinc-900 overflow-hidden">
                      <Image src={item.image || '/placeholder.jpg'} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between text-white">
                        <h3 className="text-sm font-light italic">{item.name}</h3>
                        <button onClick={() => removeFromCart(item.id)} className="text-white/10 hover:text-red-400 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="flex justify-between items-end">
                        <p className="text-[#D4AF7A] text-xs font-medium">{item.price} ETB</p>
                        <div className="flex items-center gap-3 border border-white/10 rounded-full px-2 py-0.5 bg-black/20">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-white/40 hover:text-[#D4AF7A]"><Minus size={10} /></button>
                          <span className="text-white text-[10px] w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-white/40 hover:text-[#D4AF7A]"><Plus size={10} /></button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 border-t border-white/5 bg-[#121212] space-y-6">
                <div className="flex justify-between items-center text-white">
                  <span className="text-lg font-light italic">Total</span>
                  <span className="text-[#D4AF7A] text-2xl font-medium">{totalPrice} ETB</span>
                </div>
                <button onClick={() => setIsCheckingOut(true)} className="w-full bg-[#D4AF7A] text-[#121212] py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white transition-all shadow-xl flex items-center justify-center gap-3">
                  <CreditCard size={16} /> Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}

      {/* --- PAYMENT MODAL --- */}
      <AnimatePresence>
        {isCheckingOut && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9 }} className="relative bg-[#1a1a1a] border border-[#D4AF7A]/30 p-8 md:p-12 max-w-md w-full shadow-2xl text-center" >
              <div className="w-16 h-16 bg-[#D4AF7A]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#D4AF7A]">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl text-white font-light italic mb-2">Secure Checkout</h3>
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-10">{totalPrice} ETB Total</p>
              
              <div className="space-y-4">
                <input placeholder="Cardholder Name" className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none" />
                <input placeholder="Card Number" className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none" />
              </div>

              <button onClick={handlePayment} disabled={isProcessing} className="w-full bg-[#D4AF7A] text-black py-5 mt-10 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white flex items-center justify-center gap-2">
                {isProcessing ? <><Loader2 className="animate-spin" size={16} /> Authorizing...</> : "Authorize Payment"}
              </button>
              <button onClick={() => setIsCheckingOut(false)} className="w-full text-white/20 text-[9px] uppercase mt-6">Cancel</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}