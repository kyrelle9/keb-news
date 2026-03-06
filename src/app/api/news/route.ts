import { getNewsDigest } from "@/lib/news";

export function GET() {
  return Response.json(getNewsDigest());
}
