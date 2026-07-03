"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-20 lg:py-32 bg-[#121212] text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#D4AF7A]/5 blur-[180px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">

          {/* IMAGE FIRST ON MOBILE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative order-1 lg:order-2"
          >
            {/* Outer Frame */}
            <div className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6 w-full h-full border border-[#D4AF7A]/20 z-0" />

            {/* Glow */}
            <div className="absolute inset-0 bg-[#D4AF7A]/10 blur-3xl scale-90 z-0" />

            {/* Image */}
            <div className="relative h-[420px] sm:h-[550px] lg:h-[700px] overflow-hidden rounded-tl-[70px] rounded-br-[70px] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
              <Image
                src="/banner.png"
                alt="Luxury Salon Experience"
                fill
                priority
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Corner Decorations */}
              <div className="absolute top-6 left-6 w-16 h-16 border-l border-t border-[#D4AF7A]/50" />
              <div className="absolute bottom-6 right-6 w-16 h-16 border-r border-b border-[#D4AF7A]/50" />

              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-8 backdrop-blur-md bg-black/60 border border-[#D4AF7A]/20 px-5 py-4">
                <p className="text-[#D4AF7A] text-2xl lg:text-3xl font-serif">
                  15+
                </p>
                <p className="text-[10px] lg:text-xs uppercase tracking-[0.25em] text-gray-300 mt-1">
                  Years Excellence
                </p>
              </div>
            </div>
          </motion.div>

          {/* TEXT SECOND ON MOBILE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 order-2 lg:order-1"
          >
            <div>
              <p className="uppercase tracking-[0.4em] text-xs text-[#D4AF7A]/70 mb-4">
                Exclusive Salon Experience
              </p>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-[#D4AF7A]">
                The Luxury
                <br />
                Experience
              </h2>
            </div>

            <div className="w-24 h-[1px] bg-[#D4AF7A]/50" />

            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl">
              Every visit to L'ÉLITE is crafted as a bespoke ritual. From
              complimentary refreshments curated by experts to meticulous
              consultations with master stylists, every detail is designed to
              create an experience that feels effortlessly luxurious.
            </p>

            <ul className="space-y-5 text-gray-400">
              <li className="flex items-center gap-4">
                <span className="text-[#D4AF7A] text-lg">✦</span>
                <span>Award-Winning Senior Stylists</span>
              </li>

              <li className="flex items-center gap-4">
                <span className="text-[#D4AF7A] text-lg">✦</span>
                <span>Private Premium Care Suites</span>
              </li>

              <li className="flex items-center gap-4">
                <span className="text-[#D4AF7A] text-lg">✦</span>
                <span>Luxury Organic Product Collections</span>
              </li>

              <li className="flex items-center gap-4">
                <span className="text-[#D4AF7A] text-lg">✦</span>
                <span>Personalized Beauty Consultations</span>
              </li>
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}