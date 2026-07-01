"use client";

import React, { useState, use, useEffect } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ServiceGallery from "@/components/services/ServiceGallery";
import BookingModal from "../../../../components/services/booking/BookingModal";
import { CheckCircle2, Clock, Tag, Calendar, ArrowLeft, Star, Heart, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { getFavorites, toggleFavoriteId } from "@/lib/favorites";
import { cn } from "@/lib/utils";
import { useServices } from "@/app/context/ServiceContext";

export default function ServiceDetailPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  // 1. Correctly unwrap params from the URL
  const resolvedParams = use(params);
  const categorySlug = resolvedParams.category;
  const slug = resolvedParams.slug;

  // 2. Correctly pull categories from Global Context
  const { categories, isMounted: servicesLoaded } = useServices();

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // 3. Find dynamic data using the slugs from the URL
  const categoryData = categories.find((c) => c.slug === categorySlug);
  const service = categoryData?.subServices.find((s) => s.slug === slug);

  useEffect(() => {
    setIsMounted(true);
    if (service) {
      const savedFavs = getFavorites();
      setIsFavorited(savedFavs.includes(service.id));
    }
  }, [service]);

  // Loading and Error checks
  if (!isMounted || !servicesLoaded) return <div className="min-h-screen bg-[#121212]" />;
  if (!service) notFound();

  const handleToggleFavorite = () => {
    toggleFavoriteId(service.id);
    setIsFavorited(!isFavorited);
  };

  return (
    <main className="min-h-screen bg-[#121212] text-white pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <Link href={`/services/${categorySlug}`} className="flex items-center gap-2 text-[#D4AF7A] uppercase tracking-[0.2em] text-xs hover:opacity-70 transition-opacity">
            <ArrowLeft size={16} /> Back to {categoryData?.title}
          </Link>
          <div className="flex gap-4">
            <button onClick={handleToggleFavorite}
              className={cn("p-3 rounded-full border transition-all duration-500", isFavorited ? "bg-[#D4AF7A] border-[#D4AF7A] text-black shadow-lg shadow-[#D4AF7A]/20" : "bg-white/5 border-white/10")}
            >
              <Heart size={20} fill={isFavorited ? "currentColor" : "none"} />
            </button>
            <button className="p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all">
                <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <ServiceGallery images={service.images} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#D4AF7A" className="text-[#D4AF7A]" />)}
                </div>
                <span className="text-white/40 text-[10px] uppercase tracking-widest ml-2">Verified Stylist Result</span>
              </div>
              <h2 className="text-[#D4AF7A] uppercase tracking-[0.4em] text-xs mb-4 font-semibold">{categoryData?.title}</h2>
              <h1 className="text-5xl md:text-7xl font-light italic tracking-tight mb-6">{service.name}</h1>
              <p className="text-white/60 text-lg leading-relaxed font-light">{service.description}</p>
            </div>

            <div className="flex flex-wrap gap-12 py-8 border-y border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#D4AF7A]/30 flex items-center justify-center text-[#D4AF7A]"><Tag size={20} /></div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Investment</p>
                  <p className="text-xl font-medium text-[#D4AF7A]">{service.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#D4AF7A]/30 flex items-center justify-center text-[#D4AF7A]"><Clock size={20} /></div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Duration</p>
                  <p className="text-xl font-medium">{service.duration}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm uppercase tracking-[0.2em] text-white/80 font-medium">Why Choose This Experience?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 text-white/70 text-sm">
                    <CheckCircle2 size={16} className="text-[#D4AF7A]" /> {benefit}
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setIsBookingOpen(true)} className="w-full bg-[#D4AF7A] text-black py-5 font-bold uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl">
              Reserve Appointment
            </button>
          </motion.div>
        </div>
      </div>
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} serviceName={service.name} />
    </main>
  );
}