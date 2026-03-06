import { NewsBoard } from "@/components/news-board";
import { getNewsDigest } from "@/lib/news";

export default function Home() {
  const digest = getNewsDigest();

  return <NewsBoard digest={digest} />;
}
