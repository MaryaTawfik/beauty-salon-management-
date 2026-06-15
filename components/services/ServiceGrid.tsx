import React from 'react';
import { SERVICES_DATA } from '@/app/data/services';
import  ServiceCard from './ServiceCard';



export default function ServiceGrid() {
  return (
    <section className='py-20 px-4 md:px-10 bg-[#121212]'>
        <div className='max-w-7xl mx-auto mb-16 text-center'>
            <h2 className='text-[#D4AF7A] text-sm uppercase tracking-[0.3em font semibold mb-4'>
                Our Service
            </h2>
            <h3 className='text-white text-4xl md:text-5xl font-light tracking-tight italic'>
                Elevate Your Beauty
            </h3>
            <div className='w-24 h-[1px] bg-[#D4AF7A] mx-auto mt-8 opacity-50'>

            </div>
            <div className='max-w-7xl mx-auto grid grid-col-1 md:grid-col-2 lg:grid-3 gap-6 auto-rows-auto'>
                {SERVICES_DATA.map((service)=>(
                   <ServiceCard key={service.id} service={service} />
                ))}
                
            </div>
            
        </div>
    </section>
  
  )
} 
