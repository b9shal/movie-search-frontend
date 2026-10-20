import Link from "next/link";

export default function MovieNotFound() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-start gap-4 px-4 py-16">
      <h1 className="text-2xl font-semibold text-foreground">
        Movie not found
      </h1>
      <p className="text-muted">
        We couldn’t find that title. It may have been removed, or the link might
        be wrong.
      </p>
      <Link
        href="/"
        className="rounded-md border border-border px-4 py-2 text-sm hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
      >
        Back to trending
      </Link>
    </main>
  );
}
