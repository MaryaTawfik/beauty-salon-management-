"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type GalleryItem = {
  id: string;
  title: string;
  category: "Hairstyle" | "Makeup" | "Henna Design" | "Bridal Service";
  beforeImage: string;
  afterImage: string;
  createdAt: string;
};

const categories = [
  "All",
  "Hairstyle",
  "Makeup",
  "Henna Design",
  "Bridal Service",
];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    try {
      const savedItems = localStorage.getItem("galleryItems");

      if (savedItems) {
        setItems(JSON.parse(savedItems));
      }
    } catch (error) {
      console.error("Could not load gallery:", error);
    }
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#0F0F0E] px-6 pb-24 pt-32 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="border-b border-white/5 pb-10 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-[#D4AF7A]">
            The Salon Journal
          </p>

          <h1 className="mt-5 text-4xl font-light italic tracking-tight md:text-6xl">
            Before <span className="text-[#D4AF7A]">&</span> After
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-center text-[10px] uppercase tracking-[0.25em] leading-6 text-white/40">
            Explore real hairstyle, makeup, henna design, and bridal transformations
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`border px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                selectedCategory === category
                  ? "border-[#D4AF7A] bg-[#D4AF7A] text-black"
                  : "border-white/10 bg-[#121212] text-white/50 hover:border-[#D4AF7A]/50 hover:bg-[#D4AF7A]/10 hover:text-[#D4AF7A]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <div className="mt-14 border border-dashed border-white/10 bg-[#121212] p-12 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
              No transformations found in this category
            </p>

            <p className="mt-4 text-sm text-[#D4AF7A]/80">
              Admin can add customer results from the Gallery Upload page.
            </p>
          </div>
        ) : (
          <section className="mt-14 grid gap-6 md:grid-cols-2">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden border border-white/5 bg-[#121212] transition-all duration-300 hover:border-[#D4AF7A]/40"
              >
                <div className="grid grid-cols-2 border-b border-white/5">
                  <div className="border-r border-white/5">
                    <p className="border-b border-white/5 py-3 text-center text-[9px] font-bold uppercase tracking-[0.25em] text-white/40">
                      Before
                    </p>

                    <div className="relative h-44 overflow-hidden sm:h-56">
                      <Image
                        src={item.beforeImage}
                        alt={`${item.title} before`}
                        fill
                        sizes="(max-width: 768px) 50vw, 350px"
                        className="object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="border-b border-white/5 py-3 text-center text-[9px] font-bold uppercase tracking-[0.25em] text-[#D4AF7A]">
                      After
                    </p>

                    <div className="relative h-44 overflow-hidden sm:h-56">
                      <Image
                        src={item.afterImage}
                        alt={`${item.title} after`}
                        fill
                        sizes="(max-width: 768px) 50vw, 350px"
                        className="object-cover transition-all duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D4AF7A]">
                    {item.category}
                  </p>

                  <h2 className="mt-3 text-2xl font-light tracking-wide text-white">
                    {item.title}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-white/40">
                    Love this transformation? Reserve your appointment with our beauty team.
                  </p>

                  <Link
                    href={`/booking?service=${encodeURIComponent(
                      item.category
                    )}&look=${encodeURIComponent(item.title)}`}
                    className="mt-6 inline-block border border-[#D4AF7A]/50 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF7A] transition-all hover:bg-[#D4AF7A] hover:text-black"
                  >
                    Book This Look
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}

        <div className="mt-16 text-center">
          <Link
            href="/#services"
            className="inline-block bg-[#D4AF7A] px-7 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-black transition-all hover:bg-white"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </main>
  );
}