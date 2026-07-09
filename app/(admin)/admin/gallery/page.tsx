"use client";

import { useState } from "react";
import Link from "next/link";

type GalleryItem = {
  id: string;
  title: string;
  category: "Hairstyle" | "Makeup" | "Henna Design" | "Bridal Service";
  beforeImage: string;
  afterImage: string;
  createdAt: string;
};

const categories: GalleryItem["category"][] = [
  "Hairstyle",
  "Makeup",
  "Henna Design",
  "Bridal Service",
]; 
import UserGallery from "@/app/components/UserGallery";



export default function AdminGalleryPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] =
    useState<GalleryItem["category"]>("Hairstyle");
  const [beforeImage, setBeforeImage] = useState("");
  const [afterImage, setAfterImage] = useState("");
  const [message, setMessage] = useState("");

  function readImage(file: File | undefined, imageType: "before" | "after") {
    if (!file) return;

    if (file.size > 1_500_000) {
      setMessage("Choose an image smaller than 1.5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageData = reader.result as string;

      if (imageType === "before") {
        setBeforeImage(imageData);
      } else {
        setAfterImage(imageData);
      }
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title || !beforeImage || !afterImage) {
      setMessage("Add a title, before image, and after image.");
      return;
    }

    const savedItems = JSON.parse(
      localStorage.getItem("galleryItems") || "[]"
    ) as GalleryItem[];

    const newItem: GalleryItem = {
      id: crypto.randomUUID(),
      title,
      category,
      beforeImage,
      afterImage,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "galleryItems",
      JSON.stringify([newItem, ...savedItems])
    );

    setTitle("");
    setBeforeImage("");
    setAfterImage("");
    setMessage("Saved successfully. Open the public gallery to see it.");
  }

  return (
    <main className="min-h-screen bg-[#121212] px-6 py-28 text-white">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/gallery"
          className="text-xs uppercase tracking-[0.2em] text-[#D4AF7A]"
        >
          View public gallery
        </Link>

        <p className="mt-8 text-xs uppercase tracking-[0.4em] text-[#D4AF7A]">
          Admin gallery manager
        </p>

        <h1 className="mt-4 text-4xl font-light">Add Customer Result</h1>

        <p className="mt-4 text-white/60">
          Upload before and after photos after a customer service is completed.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6 border border-white/10 bg-[#1a1a1a] p-6"
        >
          <div>
            <label className="mb-2 block text-sm">Transformation title</label>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Example: Bridal makeup transformation"
              className="w-full border border-white/15 bg-[#121212] px-4 py-3 outline-none focus:border-[#D4AF7A]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">Service category</label>
            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as GalleryItem["category"])
              }
              className="w-full border border-white/15 bg-[#121212] px-4 py-3 outline-none focus:border-[#D4AF7A]"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm">Before image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) =>
                readImage(event.target.files?.[0], "before")
              }
              className="w-full text-sm text-white/70"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">After image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) =>
                readImage(event.target.files?.[0], "after")
              }
              className="w-full text-sm text-white/70"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#D4AF7A] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#121212]"
          >
            Save gallery result
          </button>

          {message && <p className="text-sm text-[#D4AF7A]">{message}</p>}
        </form>
      </div>
    </main>
  );
}