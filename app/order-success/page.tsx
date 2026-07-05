"use client";

import { motion } from 'framer-motion';
import { CheckCircle, Truck, Package, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || "ELITE-CONFIRMED";

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      className="max-w-2xl w-full bg-[#1a1a1a] border border-[#D4AF7A]/20 p-12 text-center shadow-2xl relative overflow-hidden"
    >
      <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-green-500/20 text-green-500">
        <CheckCircle size={56} strokeWidth={1} />
      </div>
      
      <div className="space-y-4 mb-12">
        <h1 className="text-5xl font-light italic text-white tracking-tighter">Ritual Secured</h1>
        <p className="text-white/40 text-[10px] uppercase tracking-[0.5em]">Order Identifier: {id}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 text-left">
        <div className="bg-[#121212] p-6 border border-white/5">
          <p className="text-[9px] uppercase tracking-widest text-[#D4AF7A] font-bold mb-2">Inventory Status</p>
          <p className="text-xs text-white font-light">Asset Reserved & Paid</p>
        </div>
        <div className="bg-[#121212] p-6 border border-white/5">
          <p className="text-[9px] uppercase tracking-widest text-[#D4AF7A] font-bold mb-2">Estimated Arrival</p>
          <p className="text-xs text-white font-light">3 — 5 Business Days</p>
        </div>
      </div>

      <p className="text-white/40 font-light text-sm max-w-sm mx-auto leading-relaxed italic mb-12">
        A detailed summary of your acquisition and delivery tracking has been dispatched to your private email.
      </p>

      <div className="flex flex-col gap-4">
        <Link href="/" className="block">
          <button className="w-full bg-[#D4AF7A] text-[#121212] py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white transition-all">
            Return to Sanctuary
          </button>
        </Link>
        <Link href="/profile/orders" className="block">
          <button className="w-full text-white/30 text-[9px] uppercase tracking-widest hover:text-white transition-colors">
            View My Order History
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-[#121212] flex items-center justify-center p-6">
      <Suspense fallback={<div className="text-[#D4AF7A]">Verifying Assets...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}