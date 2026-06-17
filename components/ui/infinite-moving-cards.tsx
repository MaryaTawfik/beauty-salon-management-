"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    rating: number;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplicate items for infinite effect
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      updateAnimationProperties();
      setStart(true);
    }
  }

  const updateAnimationProperties = () => {
    if (scrollerRef.current) {
      // Set Direction
      const animationDirection = direction === "left" ? "forwards" : "reverse";
      scrollerRef.current.style.setProperty("--animation-direction", animationDirection);

      // Set Speed
      const duration = speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      scrollerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-[100vw] overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4",
          start && "animate-scroll", // This class triggers the CSS we wrote in globals.css
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative w-[350px] max-w-full shrink-0 border border-white/10 bg-[#1a1a1a] px-8 py-10 md:w-[450px]"
            key={`${item.name}-${idx}`}
          >
            <blockquote>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < item.rating ? "#D4AF7A" : "transparent"}
                    className={i < item.rating ? "text-[#D4AF7A]" : "text-white/20"}
                  />
                ))}
              </div>

              <span className="relative z-20 text-lg leading-[1.6] font-light italic text-white/80">
                "{item.quote}"
              </span>

              <div className="relative z-20 mt-8 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] font-bold uppercase tracking-[0.2em] text-[#D4AF7A]">
                    {item.name}
                  </span>
                  <span className="text-xs leading-[1.6] font-medium text-white/40">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};