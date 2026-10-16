import Image from "next/image";

import { GenrePills } from "~/components/GenrePills";
import { MovieTrailer } from "~/components/MovieTrailer";
import { formatMovieRuntime, getYearFromDate } from "~/lib/utils";
import type { MovieDetail, MovieVideo } from "~/types/movie";
import { BackButton } from "../BackButton";

interface Props {
  movie: MovieDetail;
  videos: MovieVideo[];
  videosUnavailable?: boolean;
}

export function MovieDetails({
  movie,
  videos,
  videosUnavailable = false,
}: Props) {
  const runtime = formatMovieRuntime(movie.runtime);
  const year = movie.releaseDate && getYearFromDate(movie.releaseDate);

  return (
    <article className="flex flex-col gap-8">
      <BackButton label="Back" />

      <div className="relative isolate overflow-hidden rounded-2xl border border-border bg-surface">
        {movie.backdropPath ? (
          <Image
            src={`https://image.tmdb.org/t/p/w1280${movie.backdropPath}`}
            alt=""
            fill
            // No `priority` — the poster is the LCP element on this page.
            sizes="(min-width: 1280px) 1152px, 100vw"
            className="-z-20 object-cover opacity-30"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top_right,_var(--color-brand-600)_0%,_transparent_55%)] opacity-30"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-background/95 via-background/85 to-background/60"
        />

        <div className="grid gap-8 p-5 sm:p-8 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10 md:p-10">
          <div className="relative mx-auto aspect-[2/3] w-full max-w-60 overflow-hidden rounded-xl border border-white/10 bg-surface shadow-2xl shadow-black/40 md:mx-0">
            {movie.posterPath ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                alt={`${movie.title} poster`}
                fill
                priority
                sizes="(min-width: 768px) 220px, 80vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-4 text-center text-sm text-muted">
                Poster unavailable
              </div>
            )}
          </div>

          <div className="flex flex-col items-start gap-5 self-center">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {movie.title}
                {year ? (
                  <span className="ml-2 text-xl font-normal text-muted sm:text-2xl">
                    ({year})
                  </span>
                ) : null}
              </h1>
              {movie.tagline ? (
                <p className="text-base text-muted italic sm:text-lg">
                  {movie.tagline}
                </p>
              ) : null}
            </div>

            <GenrePills genres={movie.genres} />

            <dl className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {movie.releaseDate ? (
                <div className="flex flex-col gap-1">
                  <dt className="text-xs tracking-wider text-muted uppercase">
                    Release date
                  </dt>
                  <dd className="text-foreground">{movie.releaseDate}</dd>
                </div>
              ) : null}

              {runtime ? (
                <div className="flex flex-col gap-1">
                  <dt className="text-xs tracking-wider text-muted uppercase">
                    Runtime
                  </dt>
                  <dd className="text-foreground">{runtime}</dd>
                </div>
              ) : null}

              <div className="flex flex-col gap-1">
                <dt className="text-xs tracking-wider text-muted uppercase">
                  Rating
                </dt>
                <dd
                  className="text-foreground"
                  aria-label={`Rated ${movie.voteAverage.toFixed(1)} out of 10`}
                >
                  <span aria-hidden="true" className="text-accent-400">
                    ★{" "}
                  </span>
                  {movie.voteAverage.toFixed(1)} / 10
                </dd>
              </div>
            </dl>

            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-foreground">
                Overview
              </h2>
              <p className="max-w-3xl text-sm leading-7 text-muted sm:text-base">
                {movie.overview || "No overview is available for this movie."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <MovieTrailer
        movieTitle={movie.title}
        videos={videos}
        unavailable={videosUnavailable}
      />
    </article>
  );
}
