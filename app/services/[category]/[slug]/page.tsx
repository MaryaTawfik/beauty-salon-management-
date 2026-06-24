"use client";

import React, { useState, use, useEffect } from "react";
import { SERVICES_DATA } from "../../../data/services";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ServiceGallery from "@/components/services/ServiceGallery";
import BookingModal from "../../../../components/services/booking/BookingModal";
import { CheckCircle2, Clock, Tag, Calendar, ArrowLeft, Star, Heart, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getFavorites, toggleFavoriteId } from "@/lib/favorites";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export default function ServiceDetailPage({ params }: PageProps) {
  const { category, slug } = use(params);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const categoryData = SERVICES_DATA.find((c) => c.slug === category);
  const service = categoryData?.subServices.find((s) => s.slug === slug);

  useEffect(() => {
    setIsMounted(true);
    if (service) {
      const savedFavs = getFavorites();
      setIsFavorited(savedFavs.includes(service.id));
    }
  }, [service]);

  if (!service) notFound();

  const handleToggleFavorite = () => {
    toggleFavoriteId(service.id);
    setIsFavorited(!isFavorited);
  };

  return (
    <main className="min-h-screen bg-[#121212] text-white pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation & Header Actions */}
        <div className="flex justify-between items-center mb-12">
          <Link href={`/services/${category}`} className="flex items-center gap-2 text-[#D4AF7A] uppercase tracking-[0.2em] text-xs hover:opacity-70 transition-opacity">
            <ArrowLeft size={16} /> Back to {categoryData?.title}
          </Link>
          
          <div className="flex gap-4">
             <button 
              onClick={handleToggleFavorite}
              className={cn(
                "p-3 rounded-full border transition-all duration-500",
                isMounted && isFavorited ? "bg-[#D4AF7A] border-[#D4AF7A] text-black shadow-lg" : "bg-white/5 border-white/10 text-white"
              )}
             >
                <Heart size={20} fill={isMounted && isFavorited ? "currentColor" : "none"} />
             </button>
             <button className="p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all">
                <Share2 size={20} />
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Gallery (Using your ServiceGallery component) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <ServiceGallery images={service.images} />
          </motion.div>

          {/* Right: Info Area */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex flex-col space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < 5 ? "#D4AF7A" : "none"} className="text-[#D4AF7A]" />
                  ))}
                </div>
                <span className="text-white/40 text-[10px] uppercase tracking-widest ml-2">Verified Stylist Result</span>
              </div>

              <h2 className="text-[#D4AF7A] uppercase tracking-[0.4em] text-xs mb-4 font-semibold">
                {categoryData?.title}
              </h2>
              <h1 className="text-5xl md:text-7xl font-light italic tracking-tight mb-6">
                {service.name}
              </h1>
              <p className="text-white/60 text-lg leading-relaxed font-light max-w-xl">
                {service.description}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-12 py-8 border-y border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#D4AF7A]/30 flex items-center justify-center text-[#D4AF7A]"><Tag size={20} /></div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Investment</p>
                  <p className="text-xl font-medium tracking-wide text-[#D4AF7A]">{service.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#D4AF7A]/30 flex items-center justify-center text-[#D4AF7A]"><Clock size={20} /></div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Time Required</p>
                  <p className="text-xl font-medium tracking-wide">{service.duration}</p>
                </div>
              </div>
            </div>

            {/* Staggered Benefits */}
            <div className="space-y-6">
              <h3 className="text-sm uppercase tracking-[0.2em] text-white/80 font-medium">Why Choose This Experience?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.benefits.map((benefit, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={index} 
                    className="flex items-center gap-3 text-white/70 text-sm"
                  >
                    <CheckCircle2 size={16} className="text-[#D4AF7A]" />
                    {benefit}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="flex-[2] bg-[#D4AF7A] text-black font-bold py-5 uppercase tracking-[0.2em] text-sm hover:bg-white transition-all duration-500 shadow-xl"
              >
                Reserve Appointment
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        serviceName={service.name} 
      />
    </main>
  );
}