import React from 'react';
import { SERVICES_DATA } from '@/app/data/services';
import  ServiceCard from './ServiceCard';



// import React from 'react';
// import { SERVICES_DATA } from '@/data/services'; // Ensure this path matches your structure
// import ServiceCard from './ServiceCard';

export default function ServiceGrid() {
  return (
    <section className="py-24 px-4 md:px-10 bg-[#121212]">
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <h2 className="text-[#D4AF7A] text-sm uppercase tracking-[0.4em] font-semibold mb-4">
          Our Services
        </h2>
        <h3 className="text-white text-4xl md:text-6xl font-light tracking-tight italic">
          Elevate Your Beauty
        </h3>
        <div className="w-24 h-[1px] bg-[#D4AF7A]/30 mx-auto mt-8" />
      </div>

      {/* 
         GRID LOGIC: 
         - 1 column on mobile 
         - 2 columns on tablet and desktop (md:grid-cols-2)
         - max-w-6xl keeps the cards from becoming too wide on huge monitors
      */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {SERVICES_DATA.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}