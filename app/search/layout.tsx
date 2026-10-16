import Link from "next/link";
import { SearchBar } from "~/components/SearchBar";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
      <header className="flex flex-col gap-4">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
        >
          <span aria-hidden="true">←</span> Back to trending
        </Link>

        <h1 className="text-2xl font-semibold text-foreground">
          Search movies
        </h1>
        <SearchBar />
      </header>
      {children}
    </main>
  );
}
