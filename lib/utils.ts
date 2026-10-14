export function delay(duration: number = 1000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export function getYearFromDate(date: string) {
  return new Date(date).getUTCFullYear();
}

export function formatMovieRuntime(runtime: number | null) {
  if (runtime === null || runtime <= 0) return null;

  const hours = Math.floor(runtime / 60);

  const minutes = runtime % 60;

  return [hours > 0 ? `${hours}h` : null, minutes > 0 ? `${minutes}m` : null]
    .filter(Boolean)
    .join(" ");
}
