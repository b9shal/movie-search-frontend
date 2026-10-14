import { respondWithError } from "~/mocks/http";
import { movies } from "~/mocks/fixures";

interface MovieRouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: MovieRouteContext) {
  const { id } = await params;

  const movieId = Number(id);
  if (!/^\d+$/.test(id) || !Number.isSafeInteger(movieId) || movieId < 1) {
    return respondWithError({
      status: 404,
      title: "Movie not found",
      detail: `Invalid movie '${id}'.`,
    });
  }

  const movie = movies.find((item) => item.id === movieId);

  if (!movie) {
    return respondWithError({
      status: 404,
      title: "Movie not found",
      detail: `No movie exists with ID '${id}'.`,
    });
  }

  return Response.json({
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    posterPath: movie.posterPath,
    backdropPath: movie.backdropPath,
    voteAverage: movie.voteAverage,
    releaseDate: movie.releaseDate,
    runtime: movie.runtime,
    tagline: movie.tagline,
    genres: movie.genres,
  });
}
