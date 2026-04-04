"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  placeholder = "Search products...",
  className,
}: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialValue = searchParams.get("q") ?? "";
  
  const [value, setValue] = useState(initialValue);
  const [prevQ, setPrevQ] = useState(initialValue);
  const debouncedValue = useDebounce(value, 400);
  const [isPending, startTransition] = useTransition();

  // If the query param changes externally, we need to update our local state
  if (initialValue !== prevQ) {
    setPrevQ(initialValue);
    setValue(initialValue);
  }

  useEffect(() => {
    const currentQ = searchParams.get("q") ?? "";
    
    // Stop the debounce cycle from re-applying old state if we've already synced with the URL
    // (e.g., when clicking "Clear all filters" or navigating to "/")
    if (debouncedValue === currentQ || value === currentQ) return;

    const params = new URLSearchParams(searchParams.toString());
    if (debouncedValue) {
      params.set("q", debouncedValue);
    } else {
      params.delete("q");
    }
    params.set("page", "1"); // Reset to page 1 on search

    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  }, [debouncedValue, router, searchParams, value]);

  const clearSearch = () => {
    setValue("");
  };

  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-4 w-4 text-zinc-500" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-11 w-full rounded-xl border border-white/10 bg-zinc-900/50 pl-10 pr-10 text-sm italic text-white placeholder:text-zinc-500 focus:border-white/30 focus:outline-none focus:ring-0"
        placeholder={placeholder}
      />
      {isPending ? (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />
        </div>
      ) : value ? (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 flex items-center pr-3 transition-colors hover:text-white text-zinc-500"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
