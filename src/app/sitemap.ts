import type { MetadataRoute } from "next";
import { getAllArticles, SITE_URL } from "@/lib/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  return [
    {
      url: SITE_URL,
      lastModified: articles[0]?.updatedAt,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/feed.xml`,
      lastModified: articles[0]?.updatedAt,
      changeFrequency: "daily",
      priority: 0.5,
    },
    ...articles.map((article) => ({
      url: `${SITE_URL}/news/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
