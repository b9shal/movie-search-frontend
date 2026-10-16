import { BackButton } from "~/components/BackButton";
import { SearchBar } from "~/components/SearchBar";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
      <header className="flex flex-col gap-4">
        <div>
          <BackButton label="Back to trending" />
        </div>

        <h1 className="text-2xl font-semibold text-foreground">
          Search movies
        </h1>
        <SearchBar />
      </header>
      {children}
    </main>
  );
}
