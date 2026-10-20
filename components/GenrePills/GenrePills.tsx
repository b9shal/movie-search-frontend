const genreColors: Record<string, string> = {
  action: "bg-orange-400/15 text-orange-200 ring-orange-300/30",
  adventure: "bg-emerald-400/15 text-emerald-200 ring-emerald-300/30",
  animation: "bg-pink-400/15 text-pink-200 ring-pink-300/30",
  comedy: "bg-amber-300/15 text-amber-100 ring-amber-200/30",
  crime: "bg-slate-300/15 text-slate-100 ring-slate-200/30",
  documentary: "bg-cyan-400/15 text-cyan-200 ring-cyan-300/30",
  drama: "bg-violet-400/15 text-violet-200 ring-violet-300/30",
  family: "bg-lime-400/15 text-lime-200 ring-lime-300/30",
  fantasy: "bg-fuchsia-400/15 text-fuchsia-200 ring-fuchsia-300/30",
  history: "bg-yellow-500/15 text-yellow-100 ring-yellow-300/30",
  horror: "bg-rose-400/15 text-rose-200 ring-rose-300/30",
  music: "bg-indigo-400/15 text-indigo-200 ring-indigo-300/30",
  mystery: "bg-purple-400/15 text-purple-200 ring-purple-300/30",
  romance: "bg-red-400/15 text-red-200 ring-red-300/30",
  "science fiction": "bg-sky-400/15 text-sky-200 ring-sky-300/30",
  thriller: "bg-blue-400/15 text-blue-200 ring-blue-300/30",
  war: "bg-stone-400/15 text-stone-200 ring-stone-300/30",
  western: "bg-amber-700/20 text-amber-200 ring-amber-500/30",
};

interface Props {
  genres: string[];
}

export function GenrePills({ genres }: Props) {
  if (genres.length === 0) return null;

  return (
    <ul aria-label="Genres" className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <li
          key={genre}
          className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${genreColors[genre.toLowerCase()] ?? "bg-surface-hover text-foreground ring-border"}`}
        >
          {genre}
        </li>
      ))}
    </ul>
  );
}
