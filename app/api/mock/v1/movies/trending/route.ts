import { movies } from "~/mocks/fixures";

export function GET() {
  const trending = movies.map((m) => ({
    id: m.id,
    title: m.title,
    overview: m.overview,
    posterPath: m.posterPath,
    backdropPath: m.backdropPath,
    voteAverage: m.voteAverage,
    releaseDate: m.releaseDate,
  }));

  return Response.json(trending);
}
