"use client";

import React, { useState, use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Check, ShieldCheck, Landmark, Wallet, Loader2, ArrowLeft } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { cn } from '@/lib/utils';

export default function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: orderId } = use(params);
  const { clearCart } = useCart();
  const router = useRouter();
  
  const [method, setMethod] = useState<'card' | 'paypal' | 'chapa' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("current_pending_order");
    if (savedOrder) setOrder(JSON.parse(savedOrder));
    else router.push('/checkout');
  }, [router]);

  const handleFinalPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // Logic: Save to order history here if desired
      clearCart(); // Wipes cart only after money is authorized
      router.push(`/order-success?id=${orderId}`);
    }, 3000);
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit / Debit Card', icon: CreditCard, description: 'Visa, Mastercard, AMEX' },
    { id: 'chapa', name: 'Chapa (Mobile Pay)', icon: Landmark, description: 'Telebirr, CBE Birr, HelloCash' },
    { id: 'paypal', name: 'PayPal', icon: Wallet, description: 'Direct checkout' },
  ];

  if (!order) return null;

  return (
    <main className="min-h-screen bg-[#121212] pt-32 pb-20 px-6 flex flex-col items-center">
      <div className="max-w-2xl w-full space-y-12">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-light italic text-white tracking-tight">Authorization</h1>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.4em]">Order: {orderId} • {order.total} ETB</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {paymentMethods.map((pm) => (
            <button
              key={pm.id}
              onClick={() => setMethod(pm.id as any)}
              className={cn(
                "w-full p-6 border transition-all duration-500 flex items-center justify-between group rounded-none",
                method === pm.id 
                  ? "bg-[#D4AF7A] border-[#D4AF7A] text-[#121212] shadow-2xl scale-[1.02]" 
                  : "bg-[#1a1a1a] border-white/5 text-white hover:border-white/20"
              )}
            >
              <div className="flex items-center gap-6 text-left">
                <pm.icon size={24} strokeWidth={1.5} />
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] block">{pm.name}</span>
                  <span className={cn("text-[9px] uppercase opacity-40", method === pm.id && "text-black")}>{pm.description}</span>
                </div>
              </div>
              <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center transition-all", method === pm.id ? "border-black/50" : "border-white/10")}>
                {method === pm.id && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
              </div>
            </button>
          ))}
        </div>

        <AnimatePresence>
          {method === 'card' && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="bg-[#1a1a1a] border border-white/10 p-8 space-y-6 shadow-2xl overflow-hidden">
               <input placeholder="Card Number" className="w-full bg-black border border-white/10 p-4 text-sm text-white focus:border-[#D4AF7A] outline-none" />
               <div className="grid grid-cols-2 gap-4">
                  <input placeholder="MM / YY" className="w-full bg-black border border-white/10 p-4 text-white focus:border-[#D4AF7A] outline-none" />
                  <input placeholder="CVC" className="w-full bg-black border border-white/10 p-4 text-white focus:border-[#D4AF7A] outline-none" />
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4 pt-6">
          <button 
            disabled={!method || isProcessing}
            onClick={handleFinalPayment}
            className="w-full bg-[#D4AF7A] text-[#121212] py-5 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white transition-all disabled:opacity-20 shadow-2xl flex items-center justify-center gap-3"
          >
            {isProcessing ? <><Loader2 className="animate-spin" size={18} /> Authorizing Transaction...</> : `Confirm Ritual Asset Authorization`}
          </button>
          <button onClick={() => router.push('/checkout')} className="w-full text-white/20 text-[9px] uppercase tracking-widest hover:text-white transition-colors">Go back to Shipping</button>
        </div>
      </div>
    </main>
  );
}