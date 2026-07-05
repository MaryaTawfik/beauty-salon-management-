"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { getActiveUser } from '@/lib/auth-utils';
import Image from 'next/image';
import { ArrowLeft, MapPin, ShieldCheck, Truck, ShoppingBag } from 'lucide-react';
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
    if (!form.fullName) newErrors.fullName = "Full Name is required";
    if (!form.phone) newErrors.phone = "Phone number is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.address) newErrors.address = "Detailed address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;

    // 1. Create unique Order ID
    const orderId = `ELITE-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    // 2. Save Order Details for Payment Page to pick up
    const orderDetails = {
      id: orderId,
      total: totalPrice,
      shipping: form,
      items: cart
    };
    localStorage.setItem("current_pending_order", JSON.stringify(orderDetails));

    // 3. Navigate to Payment
    router.push(`/payment/${orderId}`);
  };

  return (
    <main className="min-h-screen bg-[#121212] text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Shipping Form */}
        <div className="lg:col-span-8 space-y-12">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-widest hover:text-[#D4AF7A] transition-colors">
            <ArrowLeft size={14} /> Modify Selection
          </button>

          <section className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#D4AF7A]/10 flex items-center justify-center text-[#D4AF7A] border border-[#D4AF7A]/20">
                <MapPin size={20} />
              </div>
              <h1 className="text-4xl font-light italic tracking-tight">Shipping Sanctuary</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#1a1a1a] p-8 border border-white/5 shadow-2xl">
              <Input label="Full Name" value={form.fullName} error={errors.fullName} onChange={v => setForm({...form, fullName: v})} />
              <Input label="Email Address" value={form.email} readOnly />
              <Input label="Phone Number" value={form.phone} error={errors.phone} onChange={v => setForm({...form, phone: v})} />
              <Input label="City" placeholder="e.g. Addis Ababa" value={form.city} error={errors.city} onChange={v => setForm({...form, city: v})} />
              <div className="md:col-span-2">
                <Input label="Sanctuary Address" placeholder="Street, Building, Apartment Number..." value={form.address} error={errors.address} onChange={v => setForm({...form, address: v})} />
              </div>
              <Input label="Country" value={form.country} readOnly />
              <Input label="Postal Code (Optional)" value={form.postalCode} onChange={v => setForm({...form, postalCode: v})} />
            </div>
          </section>
        </div>

        {/* Right: Order Summary */}
        <aside className="lg:col-span-4">
          <div className="bg-[#1a1a1a] border border-white/10 p-8 sticky top-32 shadow-2xl">
            <div className="flex items-center gap-2 mb-10 text-[#D4AF7A]">
              <Truck size={18} />
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold">Ritual Summary</h2>
            </div>

            <div className="space-y-6 mb-10 max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 border-b border-white/5 pb-4 last:border-0">
                  <div className="relative w-12 h-16 flex-shrink-0 bg-black border border-white/10">
                    <Image src={item.image || '/placeholder.jpg'} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-xs text-white/90 font-medium">{item.name}</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-tighter">{item.quantity} Units • {item.price} ETB</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-white/10 pt-6">
              <div className="flex justify-between text-[11px] text-white/40 uppercase tracking-widest">
                <span>Collection Subtotal</span>
                <span>{totalPrice} ETB</span>
              </div>
              <div className="flex justify-between text-[11px] text-white/40 uppercase tracking-widest">
                <span>Shipping Ritual</span>
                <span className="text-green-500 italic font-bold">Complimentary</span>
              </div>
              <div className="flex justify-between text-2xl font-light italic text-[#D4AF7A] pt-4">
                <span>Grand Total</span>
                <span>{totalPrice} ETB</span>
              </div>
            </div>

            <button 
              onClick={handlePlaceOrder}
              className="w-full bg-[#D4AF7A] text-[#121212] py-5 mt-10 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all shadow-xl active:scale-[0.98]"
            >
              Place My Order
            </button>
            <p className="text-[9px] text-white/20 text-center mt-6 flex items-center justify-center gap-2 uppercase tracking-widest">
              <ShieldCheck size={14} className="text-[#D4AF7A]" /> Secure Asset Transfer
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Input({ label, value, onChange, placeholder, error, readOnly }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF7A] font-bold ml-1">{label}</label>
      <input 
        readOnly={readOnly}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          "w-full bg-black/40 border p-4 text-sm text-white focus:outline-none transition-all outline-none",
          error ? "border-red-500/50" : "border-white/10 focus:border-[#D4AF7A]",
          readOnly && "opacity-30 cursor-not-allowed"
        )}
      />
      {error && <p className="text-[9px] text-red-500 uppercase font-bold ml-1">{error}</p>}
    </div>
  );
}