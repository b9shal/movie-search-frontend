"use client";

import Link from "next/link";

export default function MovieError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-start gap-4 px-4 py-16">
      <div
        role="alert"
        className="w-full rounded-lg border border-border bg-surface p-6"
      >
        <h1 className="text-xl font-semibold text-foreground">
          We couldn’t load this movie
        </h1>
        <p className="mt-2 text-sm text-muted">
          {error.message ||
            "The movie service is unavailable right now. Please try again."}
        </p>
        {error.digest && (
          <p className="mt-1 text-xs text-muted">Reference: {error.digest}</p>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-border px-4 py-2 text-sm hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-md border border-transparent px-4 py-2 text-sm text-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
          >
            Back to trending
          </Link>
        </div>
      </div>
    </main>
  );
}
