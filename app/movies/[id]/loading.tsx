export default function Loading() {
  return (
    <main
      aria-label="Loading movie details"
      aria-busy="true"
      className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:py-10"
    >
      <div className="h-5 w-36 animate-pulse rounded bg-surface" />

      <div className="grid gap-8 rounded-2xl border border-border bg-surface p-5 sm:p-8 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10 md:p-10">
        <div className="mx-auto aspect-[2/3] w-full max-w-60 animate-pulse rounded-xl bg-surface-hover md:mx-0" />
        <div className="flex flex-col gap-5 self-center">
          <div className="flex flex-col gap-3">
            <div className="h-10 w-3/4 animate-pulse rounded bg-surface-hover" />
            <div className="h-5 w-2/5 animate-pulse rounded bg-surface-hover" />
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((pill) => (
              <div
                key={pill}
                className="h-7 w-20 animate-pulse rounded-full bg-surface-hover"
              />
            ))}
          </div>
          <div className="flex gap-6">
            {[1, 2, 3].map((fact) => (
              <div key={fact} className="flex flex-col gap-2">
                <div className="h-3 w-16 animate-pulse rounded bg-surface-hover" />
                <div className="h-4 w-20 animate-pulse rounded bg-surface-hover" />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-5 w-24 animate-pulse rounded bg-surface-hover" />
            <div className="h-4 w-full animate-pulse rounded bg-surface-hover" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-surface-hover" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="h-7 w-28 animate-pulse rounded bg-surface" />
        <div className="aspect-video w-full animate-pulse rounded-xl bg-surface" />
      </div>
    </main>
  );
}
