"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="space-y-6">
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/50 backdrop-blur-3xl">
        <Image
          src={activeImage}
          alt={title}
          fill
          priority
          className="object-contain p-8 transition-transform duration-700 hover:scale-105"
        />
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(image)}
              className={cn(
                "relative h-24 w-24 shrink-0 cursor-pointer overflow-hidden rounded-2xl border bg-zinc-900 transition-all hover:border-white/40",
                activeImage === image ? "border-white/50 ring-2 ring-white/20" : "border-white/10"
              )}
            >
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
