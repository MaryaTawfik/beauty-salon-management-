"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { getActiveUser } from '@/lib/auth-utils';
import Image from 'next/image';
import { ArrowLeft, MapPin, ShieldCheck, Truck, ShoppingBag, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice, isMounted } = useCart();
  const user = getActiveUser();

  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    country: "Ethiopia",
    city: "",
    address: "",
    postalCode: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isMounted && (!user || cart.length === 0)) {
      router.push('/#products');
    }
  }, [isMounted, user, cart, router]);

  if (!isMounted || !user) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.fullName) newErrors.fullName = "Required";
    if (!form.phone) newErrors.phone = "Required";
    if (!form.city) newErrors.city = "Required";
    if (!form.address) newErrors.address = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;

    const orderId = `ELITE-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    const newOrder = {
      id: orderId,
      userId: user.email,
      customerName: form.fullName,
      phone: form.phone,
      items: cart,
      totalAmount: totalPrice,
      status: 'Pending Payment',
      createdAt: new Date().toISOString(),
      shippingAddress: `${form.address}, ${form.city}, ${form.country}`
    };

    // Save to the global array of orders
    const existingOrders = JSON.parse(localStorage.getItem("salon_orders") || "[]");
    localStorage.setItem("salon_orders", JSON.stringify([...existingOrders, newOrder]));

    router.push(`/payment/${orderId}`);
  };

  return (
    <main className="min-h-screen bg-[#121212] text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-widest hover:text-[#D4AF7A] transition-all">
            <ArrowLeft size={14} /> Back to Selection
          </button>

          <section className="space-y-10">
            <h1 className="text-4xl font-light italic tracking-tight text-[#D4AF7A]">Shipping Sanctuary</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#1a1a1a] p-8 border border-white/5 shadow-2xl">
              <Input label="Full Name" value={form.fullName} error={errors.fullName} onChange={(v: string) => setForm({...form, fullName: v})} />
              <Input label="Phone Number" value={form.phone} error={errors.phone} onChange={(v: string) => setForm({...form, phone: v})} />
              <Input label="City" placeholder="e.g. Addis Ababa" value={form.city} error={errors.city} onChange={(v: string) => setForm({...form, city: v})} />
              <div className="md:col-span-2">
                <Input label="Street Address" placeholder="Building, Apartment..." value={form.address} error={errors.address} onChange={(v: string) => setForm({...form, address: v})} />
              </div>
              <Input label="Country" value={form.country} readOnly />
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4">
          <div className="bg-[#1a1a1a] border border-white/10 p-8 sticky top-32 shadow-2xl">
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold mb-10 text-[#D4AF7A]">Ritual Summary</h2>
            <div className="space-y-6 mb-10 max-h-[30vh] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-12 h-16 flex-shrink-0 bg-black">
                    <Image src={item.image} alt={item.name} fill className="object-cover opacity-60" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-white/90">{item.name}</p>
                    <p className="text-[10px] text-white/30 uppercase">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-white/5 pt-6 space-y-4">
              <div className="flex justify-between text-2xl font-light italic text-[#D4AF7A]">
                <span>Total</span>
                <span>{totalPrice} ETB</span>
              </div>
              <button onClick={handlePlaceOrder} className="w-full bg-[#D4AF7A] text-black py-5 text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl active:scale-95">
                Place Order & Pay
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Input({ label, value, onChange, placeholder, error, readOnly }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1 font-bold">{label}</label>
      <input readOnly={readOnly} placeholder={placeholder} value={value} onChange={(e) => onChange?.(e.target.value)} 
        className={cn("w-full bg-black/40 border p-4 text-sm text-white focus:outline-none transition-all outline-none", 
        error ? "border-red-500" : "border-white/10 focus:border-[#D4AF7A]", readOnly && "opacity-30 cursor-not-allowed")} />
      {error && <p className="text-[9px] text-red-500 uppercase mt-1 ml-1">{error}</p>}
    </div>
  );
}