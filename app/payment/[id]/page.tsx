"use client";

import React, { useState, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, ExternalLink, Upload, Check, Landmark, Smartphone, Loader2, ShieldCheck } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const BANKS = [
  { id: 'telebirr', name: 'Telebirr', account: '0988944313', owner: "MARYA T.", url: 'https://telebirr.et', icon: Smartphone },
  { id: 'cbe', name: 'CBE Mobile', account: '100055667788', owner: "MARYA T.", url: 'https://www.cbe.com.et', icon: Landmark },
  { id: 'awash', name: 'Awash Bank', account: '0132055667788', owner: "MARYA T.", url: 'https://www.awashbank.com', icon: Landmark },
];

export default function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: orderId } = use(params);
  const { totalPrice, clearCart } = useCart();
  const router = useRouter();
  
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [receipt, setReceipt] = useState<string | null>(null);
  const [refNumber, setRefNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setReceipt(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const orders = JSON.parse(localStorage.getItem('salon_orders') || '[]');
      const updated = orders.map((o: any) => o.id === orderId ? { 
        ...o, 
        status: 'Verifying', 
        paymentMethod: selectedBank.name,
        receiptImage: receipt,
        transactionRef: refNumber 
      } : o);
      localStorage.setItem('salon_orders', JSON.stringify(updated));
      
      clearCart();
      router.push(`/order-success?id=${orderId}`);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#121212] text-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-light italic text-[#D4AF7A]">Authorize Transfer</h1>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.4em]">Order ID: {orderId} • Total: {totalPrice} ETB</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* BANK LIST */}
          <div className="space-y-4">
            {BANKS.map(bank => (
              <button key={bank.id} onClick={() => setSelectedBank(bank)}
                className={cn("w-full p-6 border transition-all text-left relative overflow-hidden group", 
                selectedBank?.id === bank.id ? "bg-[#D4AF7A] border-[#D4AF7A] text-black shadow-2xl" : "bg-white/5 border-white/5 hover:border-white/20")}>
                <div className="flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-4"><bank.icon size={20} /><span className="text-xs font-bold uppercase tracking-widest">{bank.name}</span></div>
                  {selectedBank?.id === bank.id && <Check size={18} />}
                </div>
                <AnimatePresence>
                  {selectedBank?.id === bank.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-6 pt-4 border-t border-black/10 space-y-4 relative z-10">
                      <div className="flex justify-between items-center bg-black/5 p-4">
                        <div className="font-mono text-lg tracking-tighter">{bank.account}</div>
                        <button onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(bank.account); setCopied(true); setTimeout(() => setCopied(false), 2000); }} 
                          className="p-2 hover:bg-black/10 transition-colors">{copied ? <Check size={16}/> : <Copy size={16}/>}</button>
                      </div>
                      <a href={bank.url} target="_blank" className="w-full py-3 bg-black text-white text-[9px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">Open App <ExternalLink size={12}/></a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>

          {/* UPLOAD AREA */}
          <div className="space-y-6">
            <div className={cn("border-2 border-dashed p-8 text-center transition-all", receipt ? "border-green-500 bg-green-500/5" : "border-white/10 bg-white/5")}>
              {receipt ? (
                <div className="space-y-4">
                  <img src={receipt} className="max-h-48 mx-auto rounded shadow-2xl" alt="Receipt" />
                  <button onClick={() => setReceipt(null)} className="text-red-400 text-[10px] uppercase underline">Remove Image</button>
                </div>
              ) : (
                <label className="cursor-pointer py-10 block space-y-4">
                  <Upload size={40} className="mx-auto text-[#D4AF7A]" />
                  <div><p className="text-sm font-medium">Upload Payment Receipt</p><p className="text-[10px] text-white/20 mt-1 uppercase">Screenshot required</p></div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                </label>
              )}
            </div>
            <div className="space-y-4">
              <input value={refNumber} onChange={e => setRefNumber(e.target.value)} placeholder="Transaction Reference (Optional)" className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white outline-none focus:border-[#D4AF7A]" />
              <button disabled={!receipt || !selectedBank || isSubmitting} onClick={handleSubmit}
                className="w-full bg-[#D4AF7A] text-black py-5 text-[11px] font-black uppercase tracking-widest hover:bg-white disabled:opacity-20 flex items-center justify-center gap-3">
                {isSubmitting ? <Loader2 className="animate-spin" size={20}/> : <><ShieldCheck size={18}/> Submit for Verification</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}