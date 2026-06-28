"use client";

import React from 'react';
import Image from 'next/image';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const orders = [
  {
    id: 'ORD-9921',
    product: 'Luxury Argan Hair Oil',
    image: '/images/products/oil.jpg', // Ensure this image exists or use a placeholder
    date: 'Aug 12, 2023',
    price: '1,200 ETB',
    status: 'Delivered'
  }
];

export default function OrdersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light italic text-[#D4AF7A]">Orders & Purchases</h1>
        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-2">Track your luxury beauty collection</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white/[0.02] border border-white/5 p-4 flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-24 h-24 bg-zinc-900 overflow-hidden">
               {/* Replace with actual image or Lucide icon placeholder */}
               <div className="absolute inset-0 flex items-center justify-center text-white/10">
                 <ShoppingBag size={40} />
               </div>
            </div>
            
            <div className="flex-1 space-y-1 text-center md:text-left">
              <p className="text-[10px] text-[#D4AF7A] uppercase tracking-widest">{order.id}</p>
              <h3 className="text-lg text-white font-light">{order.product}</h3>
              <p className="text-white/40 text-xs">Purchased on {order.date}</p>
            </div>

            <div className="text-right flex flex-col items-center md:items-end gap-2">
              <span className="text-xl font-light text-white">{order.price}</span>
              <button className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF7A] flex items-center gap-2 hover:text-white transition-colors">
                Order Details <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}