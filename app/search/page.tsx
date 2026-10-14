import Link from "next/link";
import { ApiError, searchMovies } from "~/lib/api";
import { TrendingGrid } from "~/components/TrendingGrid";
import type { SearchResponse } from "~/types/movie";

interface Props {
  searchParams: Promise<{ query?: string; page?: string }>;
}

export async function generateMetadata({ searchParams }: Props) {
  const { query } = await searchParams;
  return { title: query ? `Search: ${query}` : "Search movies" };
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.query?.trim() ?? "";
  const page = parsePage(params.page);

  // Empty query: invitation state. Rendered inside the shared search layout,
  // so the SearchBar is still on screen.
  if (!query) {
    return (
      <section className="rounded-lg border border-border bg-surface p-8 text-center">
        <p className="text-foreground">
          Type a movie title to start searching.
        </p>
        <p className="mt-2 text-sm text-muted">
          Try <code className="rounded bg-white/10 px-1">batman</code>,{" "}
          <code className="rounded bg-white/10 px-1">slow</code>,{" "}
          <code className="rounded bg-white/10 px-1">noresults</code>, or{" "}
          <code className="rounded bg-white/10 px-1">error</code>.
        </p>
      </section>
    );
  }

  let data: SearchResponse | null = null;
  let apiError: ApiError | null = null;

  try {
    data = await searchMovies(query, page);
  } catch (error) {
    if (error instanceof ApiError) {
      // Problem Details are actionable — keep them inside the search context
      // so the user can edit the query without losing it.
      apiError = error;
    } else {
      // Unexpected — let app/search/error.tsx own it.
      throw error;
    }
  }

  return (
    <section
      aria-labelledby="search-results-heading"
      className="flex flex-col gap-4"
    >
      <div>
        <h2
          id="search-results-heading"
          className="text-lg font-medium text-foreground"
        >
          Results for “{query}”
        </h2>
        {data && (
          <p className="mt-1 text-sm text-muted" aria-live="polite">
            {data.totalResults.toLocaleString()}{" "}
            {data.totalResults === 1 ? "movie" : "movies"} found
          </p>
        )}
      </div>

      {apiError ? (
        <div
          role="alert"
          className="rounded-lg border border-border bg-surface p-5"
        >
          <h3 className="font-medium text-foreground">{apiError.title}</h3>
          <p className="mt-2 text-sm text-muted">{apiError.detail}</p>
        </div>
      ) : data && data.results.length > 0 ? (
        <TrendingGrid movies={data.results} />
      ) : data ? (
        <p role="status" className="text-sm text-muted">
          No movies matched “{query}”. Try a different title.
        </p>
      ) : null}

      {data && data.totalPages > 1 && (
        <nav
          aria-label="Search result pages"
          className="flex w-full items-center justify-between"
        >
          {data.page > 1 ? (
            <Link
              href={hrefFor(query, data.page - 1)}
              rel="prev"
              className="rounded-md border border-border px-4 py-2 text-sm hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
            >
              Prev
            </Link>
          ) : (
            <span aria-hidden />
          )}

          <span className="text-sm text-muted" aria-current="page">
            Page {data.page} of {data.totalPages}
          </span>

          {data.page < data.totalPages ? (
            <Link
              href={hrefFor(query, data.page + 1)}
              rel="next"
              className="rounded-md border border-border px-4 py-2 text-sm hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
            >
              Next
            </Link>
          ) : (
            <span aria-hidden />
          )}
        </nav>
      )}
    </section>
  );
}

function parsePage(raw: string | undefined): number {
  const n = Number.parseInt(raw ?? "1", 10);
  return Number.isFinite(n) && n >= 1 && n <= 500 ? n : 1;
}

function hrefFor(query: string, page: number) {
  return `/search?${new URLSearchParams({ query, page: String(page) })}`;
}
