"use client";

import Link from "next/link";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Checkit<span className="text-zinc-400">Store</span>
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-400 Transition-colors hover:text-white"
            >
              All Products
            </Link>
            <Link
              href="/?category=smartphones"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              Phones
            </Link>
            <Link
              href="/?category=laptops"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              Laptops
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/10 hover:text-white">
            <Search className="h-5 w-5" />
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-zinc-200 md:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-black/90 p-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              All Products
            </Link>
            <Link
              href="/?category=smartphones"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              Phones
            </Link>
            <Link
              href="/?category=laptops"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              Laptops
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
