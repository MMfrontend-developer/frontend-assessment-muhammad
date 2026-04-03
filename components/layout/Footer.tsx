import Link from "next/link";
import { ShoppingBag, Globe, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("border-t border-white/10 bg-black pt-16 pb-8", className)}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="mb-6 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Checkit<span className="text-zinc-500">Store</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
              Premium product catalog built with Next.js 16 and DummyJSON API.
              Experience the future of e-commerce.
            </p>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
              Shop
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=smartphones"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Smartphones
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=laptops"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Laptops
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-zinc-400 transition-all hover:bg-white/10 hover:text-white"
              >
                <Globe className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-zinc-400 transition-all hover:bg-white/10 hover:text-white"
              >
                <Mail className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-zinc-400 transition-all hover:bg-white/10 hover:text-white"
              >
                <Phone className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/5 pt-8 text-center">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} Checkit Technical Assessment. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
