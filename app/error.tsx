"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10 text-red-500">
        <AlertCircle className="h-12 w-12" />
      </div>
      
      <h2 className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
        Something went wrong
      </h2>
      
      <p className="mb-12 max-w-md text-lg text-zinc-400">
        We encountered an unexpected error while fetching the data. 
        It might be a temporary network issue or a problem with the API.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={() => reset()}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-8 font-bold text-black transition-all hover:bg-zinc-200"
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </button>
        
        <Link
          href="/"
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 px-8 font-bold text-white transition-all hover:bg-white/5"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
