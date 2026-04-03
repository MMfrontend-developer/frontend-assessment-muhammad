import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "@/components/products/ProductCard";

export default function Loading() {
  return (
    <div className="container mx-auto min-h-screen px-4 pb-20 pt-8 sm:px-6">
      {/* Hero Skeleton */}
      <section className="mb-24 mt-12 flex flex-col items-center text-center">
        <Skeleton className="mb-4 h-12 w-12 rounded-2xl" />
        <Skeleton className="mb-4 h-16 w-3/4 max-w-2xl" />
        <Skeleton className="h-6 w-1/2 max-w-lg" />
      </section>

      {/* Filter Bar Skeleton */}
      <div className="mb-12 flex flex-col gap-6 rounded-3xl border border-white/5 bg-black/40 p-6 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-11 w-full max-w-sm rounded-xl" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-full" />
          ))}
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
