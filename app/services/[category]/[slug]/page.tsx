// "use client"
// import { SERVICES_DATA } from "../../../data/services";
// import React,{useState,use} from "react";
// import { notFound } from "next/navigation";
// import ServiceGallery from "@/components/services/ServiceGallery";
// import { CheckCircle2, Clock, Tag, Calendar } from "lucide-react";
"use client";

import React, { useState, use } from "react";
import { SERVICES_DATA } from "../../../data/services";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ServiceGallery from "@/components/services/ServiceGallery";
import BookingModal from "../../../../components/services/booking/BookingModal";
import { CheckCircle2, Clock, Tag, Calendar, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export default function ServiceDetailPage({ params }: PageProps) {
  // Next.js 15: Unwrap the params promise using React.use()
  const resolvedParams = use(params);
  const { category, slug } = resolvedParams;

  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // 1. Find the category data
  const categoryData = SERVICES_DATA.find((c) => c.slug === category);
  
  // 2. Find the specific sub-service data
  const service = categoryData?.subServices.find((s) => s.slug === slug);

  // If service doesn't exist, show the 404 page
  if (!service) notFound();

  return (
    <main className="min-h-screen bg-[#121212] text-white pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb / Back Link */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link 
            href={`/services/${category}`}
            className="flex items-center gap-2 text-[#D4AF7A] uppercase tracking-[0.2em] text-xs hover:opacity-70 transition-opacity"
          >
            <ArrowLeft size={16} /> Back to {categoryData?.title}
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Animated Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ServiceGallery images={service.images} />
          </motion.div>

          {/* Right Side: Details & Booking */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col space-y-8"
          >
            <div>
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

            {/* Price and Duration Info Box */}
            <div className="flex flex-wrap gap-12 py-8 border-y border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#D4AF7A]/30 flex items-center justify-center">
                  <Tag className="text-[#D4AF7A]" size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Investment</p>
                  <p className="text-xl font-medium tracking-wide text-[#D4AF7A]">{service.price}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#D4AF7A]/30 flex items-center justify-center">
                  <Clock className="text-[#D4AF7A]" size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Time Required</p>
                  <p className="text-xl font-medium tracking-wide">{service.duration}</p>
                </div>
              </div>
            </div>

            {/* Benefits List */}
            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-white/80 mb-6 font-medium">
                Experience Includes
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-white/70 text-sm group">
                    <div className="w-1.5 h-1.5 bg-[#D4AF7A] rotate-45 group-hover:rotate-180 transition-transform duration-500" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="flex-[2] bg-[#D4AF7A] text-black font-bold py-5 uppercase tracking-[0.2em] text-sm hover:bg-white transition-all duration-500 flex items-center justify-center gap-3 shadow-xl"
              >
                <Calendar size={18} /> Reserve Appointment
              </button>
              
              <Link 
                href="/#services"
                className="flex-1 border border-white/20 py-5 uppercase tracking-[0.2em] text-sm hover:bg-white hover:text-black transition-all duration-500 text-center"
              >
                Explore More
              </Link>
            </div>

            <p className="text-white/30 text-[10px] uppercase tracking-widest text-center sm:text-left">
              * Final price may vary based on consultation
            </p>
          </motion.div>
        </div>
      </div>

      {/* Booking Modal Logic */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        serviceName={service.name} 
      />
    </main>
  );
}