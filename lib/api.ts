import { unstable_cache } from "next/cache";
import "server-only";
import {
  MAX_MOVIE_DETAILS_REVALIDATE_TIME,
  MAX_MOVIE_VIDEO_REVALIDATE_TIME,
  MAX_TRENDING_MOVIES_REVALIDATE_TIME,
} from "~/constants";

import type {
  Movie,
  MovieDetail,
  MovieId,
  MovieVideo,
  SearchResponse,
} from "~/types/movie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is not set. Copy .env.example to .env.local and point it at the running API.",
  );
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public title: string,
    public detail: string,
  ) {
    super(detail || title);
    this.name = "ApiError";
  }
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        Accept: "application/json, application/problem+json",
        ...init?.headers,
      },
    });
  } catch {
    // Transport-level failure: DNS, connection refused, server restart mid-request.
    throw new ApiError(
      0,
      "Network error",
      `Could not reach the movie service at ${API_BASE_URL}.`,
    );
  }

  if (!response.ok) {
    // Preserve Problem Details from the API so the UI can explain the actual failure.
    let problem: { title?: unknown; detail?: unknown } = {};

    try {
      const body: unknown = await response.json();
      if (body && typeof body === "object") {
        problem = body as typeof problem;
      }
    } catch {
      // Some upstream failures return an empty or non-JSON body; keep the fallback.
    }

    const title =
      typeof problem.title === "string"
        ? problem.title
        : `Request failed (${response.status})`;
    const detail =
      typeof problem.detail === "string"
        ? problem.detail
        : `Request to ${path} failed with status ${response.status}.`;

    throw new ApiError(response.status, title, detail);
  }

  return (await response.json()) as T;
}

export function getTrendingMovies(): Promise<Movie[]> {
  return apiFetch<Movie[]>("/movies/trending", {
    next: {
      revalidate: MAX_TRENDING_MOVIES_REVALIDATE_TIME,
      tags: ["trending-movies"],
    },
  });
}

/**
 * Two caching layers, on purpose:
 *  - outer `unstable_cache` dedupes identical (query, page) pairs across users
 *    for 60 s, so ten people searching "batman" cause one backend call.
 *  - inner `cache: "no-store"` disables the *fetch* HTTP cache so an
 *    `unstable_cache` miss always hits the backend fresh. Without this we'd
 *    stack two caches with different invalidation stories.
 *
 * Errors are not cached — they propagate to the caller on every request.
 */
export const searchMovies = unstable_cache(
  async (query: string, page: number): Promise<SearchResponse> => {
    const params = new URLSearchParams({ query, page: String(page) });
    return apiFetch<SearchResponse>(`/movies/search?${params}`, {
      cache: "no-store",
    });
  },
  ["search-movies"],
  { revalidate: 60, tags: ["search"] },
);

export function getMovieDetails(id: MovieId): Promise<MovieDetail> {
  return apiFetch<MovieDetail>(`/movies/${id}`, {
    next: {
      revalidate: MAX_MOVIE_DETAILS_REVALIDATE_TIME,
      tags: [`movie-${id}`],
    },
  });
}

export function getMovieVideos(id: MovieId): Promise<MovieVideo[]> {
  return apiFetch<MovieVideo[]>(`/movies/${id}/videos`, {
    next: {
      revalidate: MAX_MOVIE_VIDEO_REVALIDATE_TIME,
      tags: [`movie-${id}-videos`],
    },
  });
}
