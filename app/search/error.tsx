"use client";

export default function SearchError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <main
      role="alert"
      className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-10"
    >
      <h1 className="text-2xl font-semibold text-foreground">
        Search couldn’t be completed
      </h1>
      <p className="text-sm text-muted">
        {error.message || "The search service could not be reached."}
      </p>
    </main>
  );
}
