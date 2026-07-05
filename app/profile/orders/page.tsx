"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, CheckCircle2, AlertCircle, Upload, Truck, ShoppingBag } from 'lucide-react';
import { getActiveUser } from '@/lib/auth-utils';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function UserOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const user = getActiveUser();

  useEffect(() => {
    const fetchOrders = () => {
      const data = localStorage.getItem("salon_orders");
      if (data && user) {
        setOrders(JSON.parse(data).filter((o: any) => o.userId === user.email));
      }
    };
    fetchOrders();
    window.addEventListener('order-updated', fetchOrders);
    return () => window.removeEventListener('order-updated', fetchOrders);
  }, []);

  const getStatusColor = (s: string) => {
    if(s === 'Confirmed') return 'text-green-500 bg-green-500/10 border-green-500/20';
    if(s === 'Rejected') return 'text-red-500 bg-red-500/10 border-red-500/20';
    if(s === 'Verifying') return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
  };

  return (
    <div className="space-y-10 pb-20">
      <h1 className="text-3xl font-light italic text-[#D4AF7A]">Ritual History</h1>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="bg-[#121212] border border-white/5 p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div><p className="text-[10px] font-mono text-white/20">{order.id}</p><h3 className="text-white text-lg font-light italic">{order.totalAmount} ETB</h3></div>
              <span className={cn("px-3 py-1 text-[9px] font-black uppercase border rounded-full", getStatusColor(order.status))}>{order.status}</span>
            </div>

            {order.status === 'Rejected' && (
              <div className="bg-red-500/5 border border-red-500/20 p-5 flex items-start gap-4">
                <AlertCircle className="text-red-500 shrink-0" size={18} />
                <div className="space-y-3">
                  <p className="text-xs text-white/80"><span className="font-bold text-red-400">Rejection Reason:</span> {order.rejectionReason}</p>
                  <Link href={`/payment/${order.id}`} className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 text-[9px] font-bold uppercase tracking-widest hover:bg-[#D4AF7A] transition-all"><Upload size={14} /> Upload New Receipt</Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}