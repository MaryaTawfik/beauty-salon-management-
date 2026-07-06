"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const galleryItems = [
  {
    id: 1,
    title: "Silk & Sculpt",
    category: "Hairstyle",
    beforeImage: "/gallery/hairstyle-before.jpg",
    afterImage: "/gallery/hairstyle2-after.jpg",
  }, 
    {
    id: 5,
    title: "Soft Curls",
    category: "Hairstyle",
    beforeImage: "/gallery/hairstyle-before.jpg",
    afterImage: "/gallery/hairstyle-after.jpg",
  },
  {
    id: 6,
    title: "Hair Color Renewal",
    category: "Hairstyle",
    beforeImage: "/gallery/hair-color-before.jpg",
    afterImage: "/gallery/hair-color-after.jpg",
  },

  {
    id: 2,
    title: "Luxury Makeup",
    category: "Makeup",
    beforeImage: "/gallery/makeup-before.jpg",
    afterImage: "/gallery/makeup-after.jpg",
  },
  
  {
    id: 3,
    title: "Elegant Henna Art",
    category: "Henna Design",
    beforeImage: "/gallery/henna-before.jpg",
    afterImage: "/gallery/henna-after.jpg",
  },
  {
    id: 4,
    title: "Bridal Transformation",
    category: "Bridal Service",
    beforeImage: "/gallery/bridal-before.jpg",
    afterImage: "/gallery/bridal-after.jpg",
  },
];

const categories = [
  "All",
  "Hairstyle",
  "Makeup",
  "Henna Design",
  "Bridal Service",
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#121212] px-6 pb-24 pt-32 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-xs uppercase tracking-[0.45em] text-[#D4AF7A]">
          The Salon Journal
        </p>

        <h1 className="mt-5 text-center text-4xl font-light md:text-6xl">
          Before <span className="text-[#D4AF7A]">&</span> After
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-7 text-white/60 md:text-base">
          Discover the detail, artistry, and confidence behind every hairstyle,
          makeup, henna design, and bridal transformation.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`border px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] transition ${
                selectedCategory === category
                  ? "border-[#D4AF7A] bg-[#D4AF7A] text-[#121212]"
                  : "border-white/15 bg-transparent text-white/70 hover:border-[#D4AF7A] hover:text-[#D4AF7A]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF7A]">
            {selectedCategory === "All"
              ? "All Transformations"
              : `${selectedCategory} Transformations`}
          </p>

          <p className="mt-3 text-sm text-white/60">
            {filteredItems.length} result
            {filteredItems.length !== 1 ? "s" : ""} shown
          </p>
        </div>

        <section className="mt-8 grid gap-8 md:grid-cols-2">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden border border-white/10 bg-[#1a1a1a]"
            >
              <div className="grid grid-cols-2">
                <div className="relative h-34 sm:h-48 overflow-hidden">
                  <Image
                    src={item.beforeImage}
                    alt={`${item.title} before`}
                    fill
                    sizes="(max-width: 768px) 50vw, 350px"
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 border border-white/20 bg-black/60 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-white">
                    Before
                  </span>
                </div>

                <div className="relative h-34 sm:h-48 overflow-hidden">
                  <Image
                    src={item.afterImage}
                    alt={`${item.title} after`}
                    fill
                    sizes="(max-width: 768px) 50vw, 350px"
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 bg-[#D4AF7A] px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-[#121212]">
                    After
                  </span>
                </div>
              </div>

              <div className="p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF7A]">
                  {item.category}
                </p>

                <h2 className="mt-3 text-2xl font-light">{item.title}</h2>

                <Link
                  href="/#services"
                  className="mt-5 inline-block border-b border-[#D4AF7A] pb-1 text-[10px] uppercase tracking-[0.2em] text-white/80 transition hover:text-[#D4AF7A]"
                >
                  Book this ritual
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-20 border border-[#D4AF7A]/30 bg-[#1a1a1a] px-6 py-12 text-center md:px-12">
          <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF7A]">
            Your transformation awaits
          </p>

          <h2 className="mt-5 text-3xl font-light md:text-4xl">
            Ready for your next beauty ritual?
          </h2>

          <Link
            href="/#services"
            className="mt-8 inline-block bg-[#D4AF7A] px-7 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#121212] transition hover:bg-white"
          >
            Explore services
          </Link>
        </section>
      </div>
    </main>
  );
}