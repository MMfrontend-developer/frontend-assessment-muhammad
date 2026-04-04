"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";


interface PaginationProps {
  totalItems: number;
  limit: number;
}

export function Pagination({ totalItems, limit }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = parseInt(searchParams.get("page") ?? "1");

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex h-fit items-center justify-center gap-6">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex h-10 items-center gap-4 px-4 font-mono text-sm tracking-widest text-zinc-500">
        <span className="text-white font-bold">{currentPage}</span>
        <span className="opacity-30">/</span>
        <span>{totalPages}</span>
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 Transition-all hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
