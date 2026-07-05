"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Truck, CheckCircle, Search, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Order, OrderStatus } from '@/app/types/order';

export default function AdminOrderTracking() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("salon_orders");
    if (saved) setOrders(JSON.parse(saved));
  }, []);

  const updateStatus = (id: string, newStatus: OrderStatus) => {
    const updated = orders.map(o => o.id === id ? { ...o, status: newStatus } : o);
    setOrders(updated);
    localStorage.setItem("salon_orders", JSON.stringify(updated));
  };

  const filteredOrders = orders.filter(o => 
    o.status !== 'Pending Payment' && o.status !== 'Rejected' &&
    (o.customerName.toLowerCase().includes(query.toLowerCase()) || o.id.includes(query))
  );

  return (
    <div className="space-y-10 mt-10 text-white">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-light italic text-[#D4AF7A]">Order Logistics</h1>
          <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Manage delivery pipeline</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
          <input 
            placeholder="Search Orders..." 
            className="bg-white/5 border border-white/10 p-2.5 pl-10 text-xs outline-none focus:border-[#D4AF7A]"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-[#121212] border border-white/5 p-6 flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-[#D4AF7A]">
                <Package size={20} />
              </div>
              <div>
                <h3 className="text-lg font-medium">{order.customerName}</h3>
                <p className="text-white/40 text-xs">Order ID: {order.id} • {order.items.length} Items</p>
              </div>
            </div>

            {/* STATUS SELECTOR */}
            <div className="flex flex-wrap gap-2">
              {(['Confirmed', 'Out for Delivery', 'Delivered'] as OrderStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(order.id, status)}
                  className={cn(
                    "px-4 py-2 text-[9px] uppercase font-bold border transition-all",
                    order.status === status 
                      ? "bg-[#D4AF7A] text-black border-[#D4AF7A]" 
                      : "bg-white/5 border-white/10 text-white/40 hover:text-white"
                  )}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        ))}
        
        {filteredOrders.length === 0 && (
          <div className="py-20 text-center text-white/20 text-xs uppercase tracking-widest border border-dashed border-white/10">
            No active orders to track
          </div>
        )}
      </div>
    </div>
  );
}