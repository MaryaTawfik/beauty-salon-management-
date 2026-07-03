"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, Heart, Package, UserRound } from "lucide-react";
import { Playfair_Display, Inter } from "next/font/google";

import Hero from "./components/Hero";
import ServiceGrid from "@/components/services/ServiceGrid";
import StylistGrid from "@/components/home/StylistGrid";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import ProductSection from "@/app/components/products/ProductSection";
import { TESTIMONIALS } from "./data/testimonials";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({ subsets: ["latin"] });

const accountLinks = [
  {
    title: "My Profile",
    description: "Manage your personal details and salon preferences.",
    href: "/profile",
    icon: UserRound,
  },
  {
    title: "Appointments",
    description: "View upcoming appointments and booking history.",
    href: "/profile/appointments",
    icon: CalendarDays,
  },
  {
    title: "Favorites",
    description: "See your saved salon services and products.",
    href: "/profile/favorites",
    icon: Heart,
  },
  {
    title: "Orders",
    description: "Track your beauty product orders.",
    href: "/profile/orders",
    icon: Package,
  },
];

export default function Home() {
  return (
    <main
      className={`min-h-screen bg-[#121212] text-white overflow-x-hidden ${inter.className}`}
    >
      <Hero />

      <section id="services" className="py-20 bg-[#121212] relative z-10">
        <ServiceGrid />
      </section>

      <section id="experience">
        <StylistGrid />
      </section>

      <section id="booking" className="py-24 px-4 bg-[#171717] border-y border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#D4AF7A] text-xs uppercase tracking-[0.35em] mb-4">
            Your beauty, your time
          </p>

          <h2
            className={`text-4xl md:text-5xl font-light italic ${playfair.className}`}
          >
            Book Your Salon Experience
          </h2>

          <p className="text-white/60 max-w-xl mx-auto mt-5">
            Choose a service, select your favorite stylist, and reserve a time
            that works for you.
          </p>

          <Link
            href="/services"
            className="inline-flex mt-9 bg-[#D4AF7A] text-black px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
          >
            Book a Service
          </Link>
        </div>
      </section>

      <section id="account" className="py-24 px-4 bg-[#121212]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#D4AF7A] text-xs uppercase tracking-[0.35em] mb-4">
              Customer dashboard
            </p>

            <h2
              className={`text-4xl md:text-5xl font-light italic ${playfair.className}`}
            >
              Manage Your Salon Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {accountLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group border border-white/10 bg-white/[0.02] p-7 hover:border-[#D4AF7A]/60 hover:bg-white/[0.05] transition-all"
                >
                  <Icon
                    size={28}
                    className="text-[#D4AF7A] mb-6 group-hover:scale-110 transition-transform"
                  />

                  <h3 className="text-lg mb-3">{item.title}</h3>

                  <p className="text-sm leading-6 text-white/55">
                    {item.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="products">
        <ProductSection />
      </section>

      <section
        id="testimonials"
        className="py-32 bg-[#121212] border-t border-white/5"
      >
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

            <h3
              className={`text-white text-4xl md:text-5xl font-light italic tracking-tight ${playfair.className}`}
            >
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