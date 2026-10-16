"use client";

import Form from "next/form";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SearchBarInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.nativeEvent.inputType is undefined when the native clear button is clicked

    //@ts-expect-error
    if (e.target.value === "" && !e.nativeEvent.inputType) {
      router.replace("/");
    }
  };

  return (
    <Form
      action="/search"
      role="search"
      aria-label="Search movies"
      className="flex flex-col gap-2 sm:flex-row"
    >
      <label htmlFor="movie-search" className="sr-only">
        Search movies
      </label>
      <input
        id="movie-search"
        name="query"
        type="search"
        required
        autoComplete="off"
        spellCheck={false}
        defaultValue={query}
        key={query}
        onChange={handleChange}
        placeholder="Search movies…"
        className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none"
      />
      <button
        type="submit"
        className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none"
      >
        Search
      </button>
    </Form>
  );
}

export function SearchBar() {
  return (
    <Suspense
      fallback={
        <div className="h-10 animate-pulse rounded-md bg-white/5" aria-hidden />
      }
    >
      <SearchBarInner />
    </Suspense>
  );
}
