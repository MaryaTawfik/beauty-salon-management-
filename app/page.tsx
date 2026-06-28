"use client"

import { motion } from "framer-motion";
import { Playfair_Display, Inter } from 'next/font/google';

// UI Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServiceGrid from "@/components/services/ServiceGrid";
import StylistGrid from "@/components/home/StylistGrid"; // Make sure to create this component
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import ProductsAndCheckout from "./components/ProductsAndCheckout";
import ProductSection from "@/app/components/products/ProductSection";
// Data
import { TESTIMONIALS } from "./data/testimonials";

const playfair = Playfair_Display({ subsets: ['latin'], style: ['normal', 'italic'] });
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`min-h-screen bg-[#121212] text-white overflow-x-hidden ${inter.className}`}>
      {/* <Navbar /> */}

      {/* 1. Hero Section */}
      <Hero />
      
      {/* 2. Services Section */}
      <section id="services" className="py-20 bg-[#121212] relative z-10">
        <ServiceGrid />
      </section>

      {/* 3. Stylists / Experience Section */}
      <section id="experience">
        <StylistGrid />
      </section>

      {/* 4. Products Section */}
      {/* <section id="products">
        <ProductsAndCheckout />
        
      </section> */}

       <section id="products">
        <ProductSection />
      </section>

      {/* 5. Testimonials Section */}
      <section id="testimonials" className="py-32 bg-[#121212] border-t border-white/5">
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
            <h3 className={`text-white text-4xl md:text-5xl font-light italic tracking-tight ${playfair.className}`}>
              Client Experiences
            </h3>
            <div className="w-20 h-[1px] bg-[#D4AF7A]/50 mx-auto mt-8" />
          </motion.div>
        </div>

        <InfiniteMovingCards
          items={TESTIMONIALS} 
          direction="left"
          speed="slow"
        />
      </section>
    </main>
  );
}