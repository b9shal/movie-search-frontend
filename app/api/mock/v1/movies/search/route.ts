import { delay } from "~/lib/utils";
import { respondWithError } from "~/mocks/http";
import { movies } from "~/mocks/fixtures";
import { serializeMovie } from "~/mocks/serializers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query");
  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const pageParam = searchParams.get("page") ?? "1";

  if (!normalizedQuery) {
    return respondWithError({
      status: 400,
      title: "Invalid request",
      detail: "The 'query' parameter is required and must not be blank.",
    });
  }

  const page = Number(pageParam);

  if (
    !/^\d+$/.test(pageParam) ||
    !Number.isSafeInteger(page) ||
    page < 1 ||
    page > 500
  ) {
    return respondWithError({
      status: 400,
      title: "Invalid request",
      detail: "The 'page' parameter must be a whole number from 1 to 500.",
    });
  }

  if (normalizedQuery === "error") {
    return respondWithError({
      status: 503,
      title: "Service unavailable",
      detail: "The search service could not be reached.",
    });
  }

  if (normalizedQuery === "noresults") {
    return Response.json({ page, totalPages: 0, totalResults: 0, results: [] });
  }

  // "slow" waits 3s, then serves a real result set so the loading state is
  // actually demonstrated end-to-end (not a 3s wait followed by "no results").
  let effectiveQuery = normalizedQuery;
  if (normalizedQuery === "slow") {
    await delay(3000);
    effectiveQuery = "batman";
  }

  const pageSize = 6;

  const results = movies.filter((movie) =>
    movie.title.toLowerCase().includes(effectiveQuery),
  );

  const totalPages = Math.ceil(results.length / pageSize);
  const start = (page - 1) * pageSize;

  return Response.json({
    page,
    totalPages,
    totalResults: results.length,
    results: results.slice(start, start + pageSize).map(serializeMovie),
  });
}
