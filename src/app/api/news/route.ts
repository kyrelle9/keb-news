import { NextResponse } from "next/server";
import { getNewsDigest } from "@/lib/news";

export const revalidate = 900;

export async function GET() {
  const digest = await getNewsDigest();

  return NextResponse.json(digest);
}
