"use client";
import React from 'react';
import ServiceCard from './ServiceCard';
import { useServices } from "@/app/context/ServiceContext";

export default function ServiceGrid() {
  // Pull the dynamic categories that Admin updates
  const { categories, isMounted } = useServices();

  if (!isMounted) return <div className="h-96" />; // Loading state

  return (
    <section className="py-24 px-4 md:px-10 bg-[#121212]">
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <h2 className="text-[#D4AF7A] text-sm uppercase tracking-[0.4em] font-semibold mb-4">
          Our Services
        </h2>
        <h3 className="text-white text-4xl md:text-5xl font-light tracking-tight italic">
          Elevate Your Beauty
        </h3>
        <div className="w-24 h-[1px] bg-[#D4AF7A]/30 mx-auto mt-8" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* WE NOW MAP OVER THE CONTEXT CATEGORIES */}
        {categories.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}