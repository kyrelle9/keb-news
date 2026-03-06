import { NewsBoard } from "@/components/news-board";
import { getNewsDigest } from "@/lib/news";

export const revalidate = 900;

export default async function Home() {
  const digest = await getNewsDigest();

  return <NewsBoard digest={digest} />;
}
