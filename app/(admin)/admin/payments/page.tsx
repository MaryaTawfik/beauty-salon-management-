"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Eye, Search, AlertCircle, Phone, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminPayments() {
  const [orders, setOrders] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("salon_orders");
    if (data) setOrders(JSON.parse(data));
  }, []);

  const handleAction = (id: string, status: string, reasonText?: string) => {
    const updated = orders.map(o => o.id === id ? { ...o, status, rejectionReason: reasonText } : o);
    setOrders(updated);
    localStorage.setItem("salon_orders", JSON.stringify(updated));
    setRejectId(null);
    setReason("");
  };

  const filtered = orders.filter(o => (o.customerName?.toLowerCase().includes(query.toLowerCase()) || o.id.includes(query)) && o.status === 'Verifying');

  return (
    <div className="space-y-10 mt-10 text-white">
      <div className="flex justify-between items-end">
        <div><h1 className="text-3xl font-light italic text-[#D4AF7A]">Payment Verification</h1><p className="text-white/40 text-[10px] uppercase tracking-widest">Manual Audit Required</p></div>
        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16}/><input placeholder="Filter ID/Name..." className="bg-white/5 border border-white/10 p-3 pl-10 text-xs outline-none focus:border-[#D4AF7A]" onChange={e => setQuery(e.target.value)} /></div>
      </div>

      <div className="overflow-x-auto border border-white/5">
        <table className="w-full text-left text-sm font-light">
          <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-white/40">
            <tr><th className="p-5">Order/Customer</th><th className="p-5">Method</th><th className="p-5">Amount</th><th className="p-5">Receipt</th><th className="p-5 text-right">Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all">
                <td className="p-5"><div><p className="font-medium text-white">{o.customerName}</p><p className="text-[10px] text-white/30 font-mono">{o.id}</p></div></td>
                <td className="p-5"><span className="text-[10px] uppercase text-[#D4AF7A] font-bold">{o.paymentMethod}</span></td>
                <td className="p-5 font-bold text-white">{o.totalAmount} ETB</td>
                <td className="p-5"><button onClick={() => setSelectedImg(o.receiptImage)} className="flex items-center gap-2 text-blue-400 hover:underline uppercase text-[9px] font-bold"><Eye size={14}/> View Ritual Receipt</button></td>
                <td className="p-5 text-right flex justify-end gap-3">
                  <button onClick={() => handleAction(o.id, 'Confirmed')} className="bg-green-600 p-2 rounded-full hover:bg-green-500 transition-colors"><Check size={16}/></button>
                  <button onClick={() => setRejectId(o.id)} className="bg-red-600 p-2 rounded-full hover:bg-red-500 transition-colors"><X size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* REJECTION MODAL */}
      <AnimatePresence>
        {rejectId && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/90" onClick={() => setRejectId(null)} />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative bg-[#1a1a1a] border border-red-500/20 p-10 max-w-md w-full shadow-2xl">
              <h2 className="text-xl text-white italic mb-6">Select Rejection Reason</h2>
              <div className="space-y-3 mb-8">
                {["Amount incorrect", "Receipt unclear", "Payment not found", "Invalid receipt"].map(r => (
                  <button key={r} onClick={() => setReason(r)} className={cn("w-full p-4 border text-left text-xs uppercase transition-all", reason === r ? "bg-red-500 border-red-500 text-white" : "bg-white/5 border-white/5 text-white/40")}>{r}</button>
                ))}
              </div>
              <button disabled={!reason} onClick={() => handleAction(rejectId, 'Rejected', reason)} className="w-full bg-red-600 py-4 font-bold uppercase text-[10px] disabled:opacity-30">Authorize Rejection</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULL IMAGE MODAL */}
      <AnimatePresence>{selectedImg && (<div className="fixed inset-0 z-[700] flex items-center justify-center p-10"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/95" onClick={() => setSelectedImg(null)} /><img src={selectedImg} className="relative max-h-full shadow-2xl" /></div>)}</AnimatePresence>
    </div>
  );
}