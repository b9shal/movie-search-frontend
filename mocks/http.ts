interface RespondWithErrorArgs {
  status: number;
  title: string;
  detail: string;
}

export function respondWithError({
  status,
  title,
  detail,
}: RespondWithErrorArgs) {
  return Response.json(
    { type: "about:blank", title, status, detail },
    { status, headers: { "Content-Type": "application/problem+json" } },
  );
}
