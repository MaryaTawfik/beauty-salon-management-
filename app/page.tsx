"use client"
import { motion } from "framer-motion";
import Image from 'next/image';
import { Playfair_Display, Inter } from 'next/font/google';
import ServiceGrid from "@/components/services/ServiceGrid";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

// --- YOUR COMPONENTS IMPORT ---
import Navbar from "./components/Navbar";
import Experience from "./components/Hero";
import ProductsAndCheckout from "./components/ProductsAndCheckout";

import { TESTIMONIALS } from "./data/testimonials";

// Load Google Fonts
const playfair = Playfair_Display({ subsets: ['latin'], style: ['normal', 'italic'] });
const inter = Inter({ subsets: ['latin'] });

export default function Home(){
  return(
    <main className={`min-h-screen bg-[#121212] text-white overflow-x-hidden ${inter.className}`}>
      {/* 1. YOUR NAVBAR */}
      

      {/* 2. THE PERFECT RESPONSIVE SIDE-BY-SIDE HERO LAYOUT */}
      <section className="relative w-full max-w-7xl mx-auto px-6 py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[80vh]">
        
        {/* Left Side: Text Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 text-center md:text-left order-2 md:order-1"
        >
          <p className="text-[#D4AF7A] text-xs md:text-sm uppercase tracking-[0.4em] font-semibold">
            WELCOME TO THE EPITOME OF BEAUTY
          </p>
          <h1 className={`text-5xl sm:text-6xl md:text-7xl font-light tracking-wide leading-[1.15] text-white ${playfair.className}`}>
            Unveiling Your <br />
            <span className="italic text-amber-200 font-normal">Inner Radiance</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-md mx-auto md:mx-0">
            Experience world-class hair artistry, henna, and bridal care tailored specifically for your unique elegance.
          </p>
        </motion.div>

        {/* Right Side: Your Premium Photo & Booking Button Below It */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col space-y-5 w-full order-1 md:order-2"
        >
          {/* Responsive Image Wrapper */}
          <div className="relative w-full aspect-[4/3] md:aspect-[16/11] bg-zinc-900 border border-white/10 rounded-lg overflow-hidden shadow-2xl group">
            <Image 
              src="/beauty.jpg" 
              alt="Luxury Salon Visual"
              fill
              className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
          
          {/* Booking Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <a 
              href="#payment" 
              className="block w-full text-center bg-gradient-to-r from-[#D4AF7A] to-amber-600 text-black font-bold uppercase text-xs tracking-[0.2em] py-4 rounded shadow-xl hover:brightness-110 active:scale-[0.99] transition-all duration-300"
            >
              Book Your Appointment Now
            </a>
          </motion.div>
        </motion.div>
      </section>
      
      {/* 3. ANIMATED SERVICE GRID */}
      <motion.div 
        id="services" 
        className="relative z-10 my-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <ServiceGrid/>
      </motion.div>

      {/* 4. ANIMATED EXPERIENCE SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <Experience />
      </motion.div>

      {/* 5. YOUR BESPOKE PRODUCTS & CHECKOUT SYSTEM */}
      <ProductsAndCheckout />

      {/* Testimonials Section */}
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