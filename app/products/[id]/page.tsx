import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Star, 
  ArrowLeft, 
  ShoppingCart, 
  Truck, 
  ShieldCheck, 
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { getProduct, getProducts } from "@/lib/api";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/products/ProductCard";
import dynamic from 'next/dynamic';

const ProductGallery = dynamic(() => import('@/components/products/ProductGallery').then(mod => mod.ProductGallery), {
  loading: () => <div className="aspect-square w-full rounded-3xl bg-white/5 animate-pulse" />,
});

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const product: Product = await getProduct(id);
    return {
      title: `${product.title} | Checkit Store`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [{ url: product.thumbnail }],
      },
    };
  } catch {
    // If something goes wrong, it will show a generic "Product Not Found" title
    return {
      title: "Product Not Found",
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  
  let product: Product;
  let similarProducts: Product[];

  try {
    product = await getProduct(id);
    // Fetch similar products based on category
    const similarData = await getProducts({ category: product.category, limit: 4 });
    similarProducts = similarData.products.filter(p => p.id !== product.id);
  } catch {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6">
      {/* Breadcrumbs */}
      <nav className="mb-12 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
        <Link href="/" className="transition-colors hover:text-white">Store</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/?category=${product.category}`} className="transition-colors hover:text-white">{product.category}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-white">{product.title}</span>
      </nav>

      {/* Product Detail Grid */}
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        {/* Left: Images */}
        <ProductGallery 
          images={product.images && product.images.length > 0 ? product.images : [product.thumbnail]} 
          title={product.title} 
        />

        {/* Right: Info */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <span className="mb-4 inline-block rounded-full bg-white/5 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-zinc-400">
              {product.brand || "Exclusive"}
            </span>
            <h1 className="mb-4 font-display text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 rounded-full border border-white/5 bg-white/5 px-3 py-1 text-sm font-bold text-white">
                <Star className="h-4 w-4 fill-white" />
                {product.rating}
              </div>
              <span className="text-sm font-medium text-zinc-500 underline underline-offset-4 cursor-pointer hover:text-zinc-300">
                24 reviews
              </span>
            </div>
          </div>

          <div className="mb-12">
            <div className="mb-6 flex items-baseline gap-4">
              <span className="text-5xl font-black text-white">${product.price}</span>
              {product.discountPercentage > 0 && (
                <span className="rounded-lg bg-green-500/10 px-3 py-1 text-sm font-bold text-green-500">
                  Save {product.discountPercentage}%
                </span>
              )}
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-zinc-400">
              {product.description}
            </p>
          </div>

          <div className="mb-12 space-y-6 rounded-3xl border border-white/5 bg-white/5 p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-zinc-400">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Free Prime Delivery</h4>
                <p className="text-xs text-zinc-500">Fast shipping on all orders over $99</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-zinc-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Certified Quality</h4>
                <p className="text-xs text-zinc-500">1-year warranty on all electronic parts</p>
              </div>
            </div>
          </div>

          <button className="group flex h-16 w-full items-center justify-center gap-4 rounded-2xl bg-white text-lg font-black text-black transition-all hover:bg-zinc-200">
            <ShoppingCart className="h-6 w-6" />
            Add to Cart
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
          </button>
        </div>
      </div>

      {/* A little section for related items at the bottom */}
      {similarProducts.length > 0 && (
        <section className="mt-32">
          <h2 className="mb-12 text-3xl font-black text-white">Similar to this item</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Back to Results */}
      <div className="mt-20 flex justify-center">
        <Link 
          href="/" 
          className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-zinc-500 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all products
        </Link>
      </div>
    </div>
  );
}
