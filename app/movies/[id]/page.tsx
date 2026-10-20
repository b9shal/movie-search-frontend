import { notFound } from "next/navigation";
import { MovieDetails } from "~/components/MovieDetails";
import { ApiError, getMovieDetails, getMovieVideos } from "~/lib/api";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const movieId = Number(id);
  if (!Number.isSafeInteger(movieId) || movieId < 1) return {};

  try {
    const movie = await getMovieDetails(movieId);
    return {
      title: movie.title,
      description: movie.overview ?? undefined,
    };
  } catch {
    return { title: "Movie not found" };
  }
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params;
  const movieId = Number(id);

  if (!/^\d+$/.test(id) || !Number.isSafeInteger(movieId) || movieId < 1) {
    notFound();
  }

  // Videos are optional. Start the request in parallel with the details call
  // so total latency is max(details, videos), not details + videos.
  const videosPromise = getMovieVideos(movieId)
    .then((videos) => ({ videos, unavailable: false }))
    .catch((error: unknown) => {
      // A 404 here means the movie exists but has no videos — that's fine.
      // Anything else means the videos service failed — surface it to the UI.
      const isNotFound = error instanceof ApiError && error.status === 404;
      return { videos: [], unavailable: !isNotFound };
    });

  let movie;
  try {
    movie = await getMovieDetails(movieId);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  const { videos, unavailable: videosUnavailable } = await videosPromise;

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:py-10">
      <MovieDetails
        movie={movie}
        videos={videos}
        videosUnavailable={videosUnavailable}
      />
    </main>
  );
}
