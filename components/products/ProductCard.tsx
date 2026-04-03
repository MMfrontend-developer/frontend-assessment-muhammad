import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-black"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-zinc-800">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8AKpT9D9pAAAAABJRU5ErkJggg=="
        />
        
        {/* A nice little overlay that pops up when you hover over the card */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-lg">
            <ShoppingCart className="h-4 w-4" />
            View Details
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-300 backdrop-blur-md">
            {product.category}
          </span>
        </div>
      </div>

      {/* All the important product details go here */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-base font-bold text-white transition-colors group-hover:text-zinc-200">
            {product.title}
          </h3>
          <span className="text-base font-black text-white">
            ${product.price}
          </span>
        </div>

        <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-zinc-400">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < Math.floor(product.rating)
                      ? "fill-white text-white"
                      : "fill-zinc-800 text-zinc-800"
                  )}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-zinc-500">
              ({product.rating})
            </span>
          </div>

          {product.stock < 50 && (
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">
              Only {product.stock} left
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50">
      <div className="aspect-square animate-pulse bg-zinc-800" />
      <div className="p-5">
        <div className="mb-4 flex justify-between">
          <div className="h-5 w-32 animate-pulse rounded bg-zinc-800" />
          <div className="h-5 w-12 animate-pulse rounded bg-zinc-800" />
        </div>
        <div className="mb-2 h-3 w-full animate-pulse rounded bg-zinc-800" />
        <div className="mb-6 h-3 w-4/5 animate-pulse rounded bg-zinc-800" />
        <div className="flex justify-between">
          <div className="h-4 w-20 animate-pulse rounded bg-zinc-800" />
          <div className="h-4 w-12 animate-pulse rounded bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}
