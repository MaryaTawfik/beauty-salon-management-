"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryData } from "@/app/data/gallery";

const categories = [
  "All",
  "Hair Style",
  "Bridal",
  "Nails",
  "Henna Design",
  "Makeup",
];

export default function UserGallery() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === active);

  return (
    <section className="min-h-screen bg-[#0F0F0E] px-6 py-20 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.45em] text-[#D4AF7A]">
            Beauty Portfolio
          </p>

          <h1 className="text-3xl font-light italic tracking-tight text-white md:text-5xl">
            Before & After Gallery
          </h1>

          <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/40">
            See our beauty transformations
          </p>
        </div>

        {/* Category buttons */}
        <div className="mb-14 flex flex-wrap justify-center gap-3 border-y border-white/5 py-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`border px-5 py-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                active === cat
                  ? "border-[#D4AF7A] bg-[#D4AF7A] text-black"
                  : "border-white/10 bg-[#121212] text-white/50 hover:border-[#D4AF7A]/50 hover:bg-[#D4AF7A]/10 hover:text-[#D4AF7A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery cards */}
        {filtered.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, index) => (
              <div
                key={index}
                className="group overflow-hidden border border-white/5 bg-[#121212] transition-all duration-300 hover:border-[#D4AF7A]/40"
              >
                <div className="grid grid-cols-2 border-b border-white/5">
                  <div className="border-r border-white/5">
                    <p className="border-b border-white/5 py-3 text-center text-[9px] font-bold uppercase tracking-[0.25em] text-white/40">
                      Before
                    </p>

                    <div className="relative h-52 overflow-hidden md:h-60">
                      <Image
                        src={item.before}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        alt={`${item.title} before`}
                        className="object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="border-b border-white/5 py-3 text-center text-[9px] font-bold uppercase tracking-[0.25em] text-[#D4AF7A]">
                      After
                    </p>

                    <div className="relative h-52 overflow-hidden md:h-60">
                      <Image
                        src={item.after}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        alt={`${item.title} after`}
                        className="object-cover transition-all duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.3em] text-[#D4AF7A]">
                    {item.category}
                  </p>

                  <h3 className="text-xl font-light tracking-wide text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-white/40">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-white/5 bg-[#121212] py-20 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
              No transformations found in this category
            </p>
          </div>
        )}
      </div>
    </section>
  );
}