import type { Movie, MovieDetail, MovieVideo } from "~/types/movie";

/**
 * The mock's fixtures carry a superset of fields (runtime, tagline, genres,
 * videos) so one file can serve every endpoint. These serializers project
 * a fixture to exactly what the contract says each endpoint returns.
 *
 * Analogous to what a real backend's DTO layer would do.
 */
export function serializeMovie(fixture: Movie): Movie {
  return {
    id: fixture.id,
    title: fixture.title,
    overview: fixture.overview,
    posterPath: fixture.posterPath,
    backdropPath: fixture.backdropPath,
    voteAverage: fixture.voteAverage,
    releaseDate: fixture.releaseDate,
  };
}

export function serializeMovieDetail(fixture: MovieDetail): MovieDetail {
  return {
    ...serializeMovie(fixture),
    runtime: fixture.runtime ?? null,
    tagline: fixture.tagline ?? null,
    genres: fixture.genres,
  };
}

export function serializeVideo(video: MovieVideo): MovieVideo {
  return {
    key: video.key,
    name: video.name,
    site: video.site,
    type: video.type,
  };
}
