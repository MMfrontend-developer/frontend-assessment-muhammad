import { Suspense } from "react";
import { getProducts, getCategories } from "@/lib/api";
import Link from "next/link";
import { ProductCard, ProductCardSkeleton } from "@/components/products/ProductCard";
import { SearchInput } from "@/components/products/SearchInput";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { Pagination } from "@/components/products/Pagination";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";

interface HomeProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    page?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { q, category, page } = await searchParams;
  const currentPage = parseInt(page ?? "1");
  const limit = 20;
  const skip = (currentPage - 1) * limit;

  // Fetch data on the server
  const [productsData, categories] = await Promise.all([
    getProducts({ query: q, category, limit, skip }),
    getCategories(),
  ]);

  const { products, total } = productsData;

  return (
    <div className="container mx-auto min-h-screen px-4 pb-20 pt-8 sm:px-6">
      {/* Hero Section */}
      <section className="relative mb-16 mt-8 flex flex-col items-center text-center overflow-hidden rounded-[3rem] border border-white/10 px-6 py-20 shadow-2xl">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-bg.png" 
            alt="Hero Background" 
            fill 
            className="object-cover opacity-40 mix-blend-screen"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-black/80" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <Link 
            href="/"
            className="relative h-24 w-24 shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/20 bg-zinc-900/80 shadow-xl backdrop-blur-xl transition-all hover:border-white/60 flex items-center justify-center mb-8"
          >
            <ShoppingBag className="h-8 w-8 text-white drop-shadow-lg" />
          </Link>
          <h1 className="animate-fade-in mb-6 font-display text-5xl font-black tracking-tight drop-shadow-md sm:text-6xl text-white">
            Future of <span className="text-zinc-400 italic mix-blend-plus-lighter">E-commerce</span>
          </h1>
          <p className="animate-fade-in max-w-lg text-lg text-zinc-300 drop-shadow-sm [animation-delay:200ms]">
            Explore our curated collection of premium products. 
            Built with cutting-edge technology for the ultimate experience.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="sticky top-[65px] z-40 mb-12 flex flex-col gap-6 rounded-3xl border border-white/5 bg-black/40 p-6 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
          <SearchInput className="shrink-0" />
          <div className="h-px w-full shrink-0 bg-white/5 sm:h-8 sm:w-px" />
          <div className="flex-1 min-w-0">
            <CategoryFilter categories={categories} />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <Suspense fallback={<ProductGridSkeleton />}>
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product, index) => (
                <div 
                  key={product.id} 
                  className="animate-fade-in" 
                  style={{ animationDelay: `${(index % 8) * 100}ms` }}
                >
                  <ProductCard 
                    product={product} 
                    priority={index < 4} // These first few images should load as fast as possible
                  />
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <Pagination totalItems={total} limit={limit} />
          </>
        ) : (
          <EmptyState />
        )}
      </Suspense>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-900 text-zinc-600">
        <ShoppingBag className="h-10 w-10" />
      </div>
      <h3 className="mb-2 text-2xl font-bold text-white">No products found</h3>
      <p className="mb-8 max-w-xs text-zinc-500">
        We couldn&apos;t find any products matching your current search or filters.
      </p>
      <Link 
        href="/" 
        className="flex items-center gap-2 font-bold text-white transition-all hover:gap-3 underline decoration-white/20 underline-offset-8 hover:decoration-white"
      >
        Clear all filters <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
