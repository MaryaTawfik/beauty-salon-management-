"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
// Added Chevron icons for the next/prev functionality
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ServiceGallery({ images }: { images: string[] }) {
  // We use an index state to handle the circular navigation
  const [index, setIndex] = useState(0);

  // Fallback to a placeholder if the admin hasn't added images yet
  const galleryImages = images?.length > 0 ? images : ["/placeholder.jpg"];
  const isMultiImage = galleryImages.length > 1;

  // Navigation Logic: Wrapping around using modulo
  const nextImage = () => setIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () => setIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  return (
    /* We use max-w-md here to ensure the gallery stays 'Medium' and doesn't stretch too wide */
    <div className="space-y-6 w-full max-w-md mx-auto">
      
      {/* MAIN VIEWPORT: Using aspect-square for a balanced, modern look */}
      <div className="relative aspect-square overflow-hidden bg-zinc-900 border border-white/10 group shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            /* Slide effect: image enters from right, exits to left */
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <Image
              src={galleryImages[index]}
              alt="Ritual Visual"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* INTERACTIVE ARROWS: Visible only on hover for a clean UI */}
        {isMultiImage && (
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <button
              onClick={prevImage}
              className="w-10 h-10 flex items-center justify-center bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-[#D4AF7A] hover:text-black transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="w-10 h-10 flex items-center justify-center bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-[#D4AF7A] hover:text-black transition-all"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* PROGRESS BARS: A luxury alternative to simple dots */}
        {isMultiImage && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 px-4">
            {galleryImages.map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "h-0.5 rounded-full transition-all duration-500",
                  index === i ? "w-8 bg-[#D4AF7A]" : "w-3 bg-white/20"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* THUMBNAILS: Kept small and centered to maintain 'Medium' proportions */}
      <div className="flex justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {galleryImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={cn(
              "relative w-14 aspect-square flex-shrink-0 border transition-all duration-300",
              index === i ? "border-[#D4AF7A] scale-105 shadow-md" : "border-white/5 opacity-40 hover:opacity-100"
            )}
          >
            <Image src={img} alt="thumbnail" fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}