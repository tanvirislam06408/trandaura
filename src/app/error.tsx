"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        <h1 className="text-7xl font-bold text-[#14B8A6]">!</h1>
        <h2 className="text-2xl font-semibold text-gray-900">
          Something Went Wrong
        </h2>
        <p className="text-gray-600">
          An unexpected error occurred. Please try again or return to the home
          page.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <button onClick={reset} className="btn-primary">
            Try Again
          </button>
          <Link href="/" className="btn-outline">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
