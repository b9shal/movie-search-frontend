import { respondWithError } from "~/mocks/http";
import { movies } from "~/mocks/fixtures";
import { serializeVideo } from "~/mocks/serializers";

interface MovieVideosRouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: Request,
  { params }: MovieVideosRouteContext,
) {
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

  return Response.json((movie.videos ?? []).map(serializeVideo));
}
