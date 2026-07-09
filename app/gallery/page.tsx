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
    const savedItems = JSON.parse(
      localStorage.getItem("galleryItems") || "[]"
    ) as GalleryItem[];

    setItems(savedItems);
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#121212] px-6 pb-24 pt-32 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-xs uppercase tracking-[0.45em] text-[#D4AF7A]">
          The Salon Journal
        </p>

        <h1 className="mt-5 text-center text-4xl font-light md:text-6xl">
          Before <span className="text-[#D4AF7A]">&</span> After
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-7 text-white/60">
          Explore real hairstyle, makeup, henna design, and bridal transformations.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`border px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] transition ${
                selectedCategory === category
                  ? "border-[#D4AF7A] bg-[#D4AF7A] text-[#121212]"
                  : "border-white/15 text-white/70 hover:border-[#D4AF7A]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <div className="mt-14 border border-dashed border-white/15 p-12 text-center">
            <p className="text-white/60">No gallery results in this category yet.</p>
            <p className="mt-3 text-sm text-[#D4AF7A]">
              Admin can add customer results from the Gallery Upload page.
            </p>
          </div>
        ) : (
          <section className="mt-14 grid gap-6 md:grid-cols-2">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden border border-white/10 bg-[#1a1a1a]"
              >
                <div className="grid grid-cols-2">
                  <div className="relative h-44 sm:h-56">
                    <Image
                      src={item.beforeImage}
                      alt={`${item.title} before`}
                      fill
                      sizes="(max-width: 768px) 50vw, 350px"
                      className="object-cover"
                    />
                    <span className="absolute left-3 top-3 bg-black/70 px-3 py-1 text-[9px] uppercase tracking-[0.2em]">
                      Before
                    </span>
                  </div>

                  <div className="relative h-44 sm:h-56">
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

                <div className="p-5">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF7A]">
                    {item.category}
                  </p>
                  <h2 className="mt-2 text-2xl font-light">{item.title}</h2>
                </div>
              </article>
            ))}
          </section>
        )}

        <div className="mt-16 text-center">
          <Link
            href="/#services"
            className="inline-block bg-[#D4AF7A] px-7 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#121212]"
          >
            Explore services
          </Link>
        </div>
      </div>
    </main>
  );
}