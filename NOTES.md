# Submission notes

## Scope

- **P0 — done:** trending list on `/`; search wired to `GET /movies/search`; results rendered via `MovieCard`/`TrendingGrid`; prev/next pagination driven by `page`/`totalPages`/`totalResults`. Mock follows the documented camelCase shapes and Problem Details format.
- **P1 — done:** loading, empty, and error states for search; accessible labels, visible keyboard focus, `status`/`alert` semantics.
- **P2 — done:** `/movies/[id]` with metadata and genre pills; YouTube trailer when available; 404 for unknown IDs; trailer-unavailable fallback when video lookup fails but details succeed.
- **P3 — deferred (time):** TV/series search and debouncing.

## Mock API

Next.js route handlers under `app/api/mock/v1/movies/` backed by fixed fixtures in `fixtures.ts`. No TMDB calls. Fixtures carry a superset of fields; endpoint serializers project them to the exact contract shape. Mock Problem Details helpers are isolated from the app's API client. The frontend only knows `NEXT_PUBLIC_API_BASE_URL`.

| Case              | Trigger                      | Expected                                              |
| ----------------- | ---------------------------- | ----------------------------------------------------- |
| Trending          | `GET /movies/trending`       | First 10 fixtures, `Movie` shape                      |
| Multi-page search | `?query=batman`              | 20 fixtures → 4 pages of 6                            |
| Empty result      | `?query=noresults`           | `200`, `totalPages: 0`, `results: []`                 |
| Slow response     | `?query=slow`                | ~3 s delay; route skeleton visible                    |
| Server error      | `?query=error`               | `503` problem+json rendered inline on the page        |
| Invalid query     | `?query=` or whitespace only | `400`; page-level empty submission redirects to `/`   |
| Invalid page      | `?query=batman&page=501`     | `400` (also rejects `0`, decimals, non-numeric, >500) |
| With trailer      | `/movies/268`                | Details + YouTube embed                               |
| No videos         | `/movies/1339274`            | `200`, `[]`; "no trailer" message shown               |
| Non-YouTube only  | `/movies/806704`             | Vimeo filtered out; no embed                          |
| Unknown movie     | `/movies/999999`             | `404`; not-found page                                 |

## Rendering

- **Server:** home, search, and detail routes are Server Components. Initial HTML contains movie data; the browser never calls the API directly.
- **Home (`/`):** static + ISR. `export const revalidate = 3600` prerenders the page at build time and revalidates hourly. The trending `fetch` also uses Next's data cache (`revalidate: 3600`, tag `trending-movies`). Effect: the HTML is served from cache with no per-request render cost.
  - Build-time caveat: because the page prerenders, `pnpm build` executes the trending fetch at build time and requires the mock (or the real backend) to be reachable. In dev this is a non-issue.
- **Search:** query and page come from URL params, so refresh, back/forward, and shared links reproduce the same result set. A native GET form works without client-side state. Search responses are cached for 60 seconds by query and page; the underlying fetch disables the separate fetch cache.
- **Detail:** details and videos are fetched concurrently — details required, videos optional. A video failure degrades to "trailer unavailable" without blocking the page. Both API responses use Next's data cache and revalidate hourly.
- **Client:** no client-side data layer or search state. Client Components exist only where Next requires `reset()` on error boundaries. Search API Problem Details render inline on the server page; unexpected errors reach `app/search/error.tsx`.
- **Loading/errors:** route `loading.tsx` skeletons; search errors inline; detail 404 → route `not-found.tsx`.

## Pagination and accessibility

URL-driven prev/next links (not infinite scroll): shareable, back/forward-safe, keyboard-friendly, no client state, no unbounded list.

The search control is a labeled native GET form. Movie cards and pagination are links. Focus-visible styles are present throughout. Loading, empty, and error messages use `role="status"` or `role="alert"`. The YouTube iframe has a movie-specific `title` and `loading="lazy"`.
