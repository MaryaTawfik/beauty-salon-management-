"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, CreditCard, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, isMounted } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
          />

          {/* Side Drawer */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#1a1a1a] z-[210] shadow-2xl flex flex-col border-l border-white/5"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#121212]">
              <div>
                <h2 className="text-white text-xl font-light italic">Your Collection</h2>
                <p className="text-[#D4AF7A] text-[10px] uppercase tracking-[0.3em] mt-1">{totalItems} Items Selected</p>
              </div>
              <button onClick={onClose} className="p-2 text-white/40 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag size={48} className="text-white/5" />
                  <p className="text-white/20 uppercase tracking-widest text-xs font-light">Your bag is empty</p>
                  <button onClick={onClose} className="text-[#D4AF7A] text-[10px] uppercase underline tracking-widest hover:text-white transition-colors">Return to Boutique</button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div layout key={item.id} className="flex gap-4 group bg-white/[0.02] p-3 border border-white/5">
                    <div className="relative w-20 h-24 bg-zinc-900 overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between">
                        <h3 className="text-white text-sm font-light italic">{item.name}</h3>
                        <button onClick={() => removeFromCart(item.id)} className="text-white/10 hover:text-red-400 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <p className="text-[#D4AF7A] text-xs font-medium">{item.price} ETB</p>
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 border border-white/10 rounded-full px-2 py-0.5 bg-black/20">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-white/40 hover:text-[#D4AF7A] transition-colors"><Minus size={10} /></button>
                          <span className="text-white text-[10px] w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-white/40 hover:text-[#D4AF7A] transition-colors"><Plus size={10} /></button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Sticky Drawer Footer */}
            {cart.length > 0 && (
              <div className="p-8 border-t border-white/5 bg-[#121212] space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest">
                    <span className="text-white/40 font-light">Subtotal</span>
                    <span className="text-white">{totalPrice} ETB</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest">
                    <span className="text-white/40 font-light">Delivery</span>
                    <span className="text-green-400 font-bold italic">Complimentary</span>
                  </div>
                  <div className="h-px bg-white/10 w-full" />
                  <div className="flex justify-between items-center">
                    <span className="text-white text-lg font-light italic">Total</span>
                    <span className="text-[#D4AF7A] text-2xl font-medium">{totalPrice} ETB</span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full bg-[#D4AF7A] text-[#121212] py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 shadow-xl flex items-center justify-center gap-3"
                >
                  <CreditCard size={16} /> Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}

      {/* --- PAYMENT MODAL POPUP --- */}
      <AnimatePresence>
        {isCheckingOut && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-[#1a1a1a] border border-[#D4AF7A]/30 p-8 md:p-12 max-w-md w-full shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-[#D4AF7A]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#D4AF7A]">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-3xl text-white font-light italic mb-2">Secure Payment</h3>
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-10 leading-relaxed">
                Enter your details to finalize your purchase of <span className="text-[#D4AF7A]">{totalPrice} ETB</span>
              </p>
              
              <div className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-white/30 ml-1">Cardholder Name</label>
                  <input placeholder="Full Name" className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none transition-colors" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-white/30 ml-1">Card Details</label>
                  <input placeholder="0000 0000 0000 0000" className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="MM/YY" className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none transition-colors" />
                  <input placeholder="CVC" className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none transition-colors" />
                </div>
              </div>

              <button 
                onClick={() => {
                  alert("Transaction successful! Thank you for choosing L'ÉLITE.");
                  setIsCheckingOut(false);
                  onClose();
                }}
                className="w-full bg-[#D4AF7A] text-black py-5 mt-10 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white transition-all duration-500"
              >
                Authorize Payment
              </button>
              
              <button 
                onClick={() => setIsCheckingOut(false)} 
                className="w-full text-white/20 text-[9px] uppercase tracking-widest mt-6 hover:text-white transition-colors"
              >
                Go Back to Collection
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}