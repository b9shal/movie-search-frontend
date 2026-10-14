export default function SearchLoading() {
  return (
    <main
      aria-label="Loading search results"
      aria-busy="true"
      className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10"
    >
      <p role="status" className="sr-only">
        Loading search results…
      </p>
      <header className="flex flex-col gap-4">
        <div className="h-8 w-48 animate-pulse rounded bg-surface" />
        <div className="h-10 w-full max-w-md animate-pulse rounded-md bg-surface" />
      </header>
      <section aria-hidden="true" className="flex flex-col gap-4">
        <div className="h-6 w-56 animate-pulse rounded bg-surface" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 12 }, (_, index) => (
            <div
              key={index}
              className="aspect-[2/3] w-full animate-pulse rounded-lg bg-surface"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
