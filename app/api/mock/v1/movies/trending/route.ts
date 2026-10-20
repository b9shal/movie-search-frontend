import { movies } from "~/mocks/fixtures";
import { serializeMovie } from "~/mocks/serializers";

export function GET() {
  return Response.json(movies.map(serializeMovie));
}
