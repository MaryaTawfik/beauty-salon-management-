"use client";

import { useState } from "react";
import Link from "next/link";
import { ImagePlus, ExternalLink, Upload } from "lucide-react";

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

    setMessage("");

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

    if (!title.trim() || !beforeImage || !afterImage) {
      setMessage("Add a title, before image, and after image.");
      return;
    }

    try {
      const savedItems = JSON.parse(
        localStorage.getItem("galleryItems") || "[]"
      ) as GalleryItem[];

      const newItem: GalleryItem = {
        id: crypto.randomUUID(),
        title: title.trim(),
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
      setCategory("Hairstyle");
      setBeforeImage("");
      setAfterImage("");
      setMessage("Gallery result saved successfully.");
    } catch (error) {
      console.error("Could not save gallery item:", error);
      setMessage("Could not save images. Try smaller image files.");
    }
  }

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
        <div>
          <div className="flex items-center gap-3">
            <ImagePlus className="text-[#D4AF7A]" size={22} />
            <h1 className="text-3xl font-light italic tracking-tight text-white">
              Gallery Upload
            </h1>
          </div>

          <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/40">
            Before & After Transformations
          </p>
        </div>

        <Link
          href="/gallery"
          target="_blank"
          className="flex items-center gap-2 border border-[#D4AF7A]/30 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-[#D4AF7A] transition-all hover:bg-[#D4AF7A] hover:text-black"
        >
          <ExternalLink size={15} />
          View Public Gallery
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl space-y-7 border border-white/5 bg-[#121212] p-6 md:p-8"
      >
        <div>
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
            Transformation Title
          </label>

          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Example: Bridal makeup transformation"
            className="w-full border border-white/10 bg-[#0F0F0E] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#D4AF7A]"
          />
        </div>

        <div>
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
            Service Category
          </label>

          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as GalleryItem["category"])
            }
            className="w-full border border-white/10 bg-[#0F0F0E] px-4 py-3 text-sm text-white outline-none focus:border-[#D4AF7A]"
          >
            {categories.map((item) => (
              <option key={item} value={item} className="bg-[#121212]">
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              Before Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(event) =>
                readImage(event.target.files?.[0], "before")
              }
              className="w-full border border-dashed border-white/15 bg-[#0F0F0E] p-3 text-xs text-white/60 file:mr-4 file:border-0 file:bg-[#D4AF7A] file:px-3 file:py-2 file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:text-black"
            />

            {beforeImage && (
              <p className="mt-2 text-[10px] uppercase tracking-wider text-[#D4AF7A]">
                Before image selected
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              After Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(event) =>
                readImage(event.target.files?.[0], "after")
              }
              className="w-full border border-dashed border-white/15 bg-[#0F0F0E] p-3 text-xs text-white/60 file:mr-4 file:border-0 file:bg-[#D4AF7A] file:px-3 file:py-2 file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:text-black"
            />

            {afterImage && (
              <p className="mt-2 text-[10px] uppercase tracking-wider text-[#D4AF7A]">
                After image selected
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 bg-[#D4AF7A] px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-white"
        >
          <Upload size={16} />
          Save Gallery Result
        </button>

        {message && (
          <p className="border border-[#D4AF7A]/20 bg-[#D4AF7A]/5 p-3 text-center text-xs text-[#D4AF7A]">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}