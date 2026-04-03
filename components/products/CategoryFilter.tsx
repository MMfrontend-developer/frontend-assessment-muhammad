"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") ?? "all";

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    params.set("page", "1"); // Reset to page 1 on category change
    
    router.push(`/?${params.toString()}`);
  };

  const allCategories = ["all", ...categories];

  return (
    <div className="no-scrollbar flex w-full items-center gap-2 overflow-x-auto pb-4 pt-2">
      {allCategories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={cn(
            "whitespace-nowrap rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200",
            currentCategory === category
              ? "bg-white text-black shadow-lg shadow-white/10"
              : "bg-zinc-900 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
          )}
        >
          {category.replace("-", " ")}
        </button>
      ))}
    </div>
  );
}
