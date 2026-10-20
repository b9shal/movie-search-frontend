import type { MovieVideo } from "~/types/movie";

export interface Props {
  movieTitle: string;
  videos: MovieVideo[];
  unavailable?: boolean;
}

export function MovieTrailer({
  movieTitle,
  videos,
  unavailable = false,
}: Props) {
  // Defensive: a shape-mismatched backend shouldn't crash the page.
  const safeVideos = Array.isArray(videos) ? videos : [];

  const youtubeVideos = safeVideos.filter((video) => video.site === "YouTube");

  const trailer =
    youtubeVideos.find(
      (video) =>
        typeof video.type === "string" &&
        video.type.toLowerCase() === "trailer",
    ) ?? youtubeVideos[0];

  return (
    <section
      aria-labelledby="movie-trailer-heading"
      className="flex flex-col gap-4"
    >
      <div>
        <h2
          id="movie-trailer-heading"
          className="text-xl font-semibold text-foreground"
        >
          Trailer
        </h2>
        {trailer ? (
          <p className="mt-1 text-sm text-muted">{trailer.name}</p>
        ) : null}
      </div>

      {trailer ? (
        <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-black/20">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${encodeURIComponent(trailer.key)}`}
            title={`${movieTitle} trailer${trailer.name ? `: ${trailer.name}` : ""}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center rounded-xl border border-border bg-surface px-6 text-center text-sm text-muted">
          {unavailable
            ? "Trailer information couldn’t be loaded."
            : "No YouTube trailer is available for this movie."}
        </div>
      )}
    </section>
  );
}
