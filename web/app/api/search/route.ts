import { parseSearchQuery, searchSite } from "@/lib/search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = parseSearchQuery(searchParams.get("q") ?? "");
  const requested = Number(searchParams.get("limit") ?? 5);
  const limit = Number.isFinite(requested) ? Math.min(Math.max(requested, 1), 40) : 5;
  return Response.json({
    query,
    results: searchSite(query, limit),
  });
}
