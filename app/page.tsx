"use client"
import { motion } from "framer-motion";
import ServiceGrid from "@/components/services/ServiceGrid";
import Hero from "@/components/home/Hero";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

import { TESTIMONIALS } from "./data/testimonials";
export default function Home(){
  return(
    <main className='min-h-screen bg-[#121212]'>
      <Hero/>
      <div id="services" className="relative z-10 -mt-20">
        <ServiceGrid/>
      </div>
     <section className="py-32 bg-[#121212] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[#D4AF7A] text-sm uppercase tracking-[0.4em] font-semibold mb-4">
              Voices of Elegance
            </h2>
            <h3 className="text-white text-4xl md:text-5xl font-light italic tracking-tight">
              Client Experiences
            </h3>
            <div className="w-20 h-[1px] bg-[#D4AF7A]/50 mx-auto mt-8" />
          </motion.div>
        </div>

        {/* The Aceternity Component */}
        <InfiniteMovingCards
          items={TESTIMONIALS} // Pass the imported array here
          direction="left"
          speed="slow"
        />
      </section>
    </main>
  );
}