import { SearchBar } from "~/components/SearchBar";
import { TrendingGrid } from "~/components/TrendingGrid";
import { getTrendingMovies } from "~/lib/api";

export const revalidate = 3600;

export default async function HomePage() {
  const trendingMovies = await getTrendingMovies();

  const top10 = trendingMovies.slice(0, 10);

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
      <header className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-foreground">Movie Search</h1>
        <SearchBar />
      </header>

      <section
        aria-labelledby="trending-heading"
        className="flex flex-col gap-4"
      >
        <div>
          <h2
            id="trending-heading"
            className="text-lg font-medium text-foreground"
          >
            Trending this week
          </h2>
          <p className="mt-1 text-sm text-muted">Popular movies right now</p>
        </div>

        {top10.length > 0 ? (
          <TrendingGrid movies={top10} />
        ) : (
          <p role="status" className="text-sm text-muted">
            No trending movies right now. Check back soon.
          </p>
        )}
      </section>
    </main>
  );
}
