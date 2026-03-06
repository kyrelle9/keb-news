import { getAllArticles, SITE_NAME, SITE_URL } from "@/lib/news";

export function GET() {
  const articles = getAllArticles();

  const items = articles
    .map(
      (article) => `
        <item>
          <title><![CDATA[${article.title}]]></title>
          <link>${SITE_URL}/news/${article.slug}</link>
          <guid>${SITE_URL}/news/${article.slug}</guid>
          <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
          <description><![CDATA[${article.deck}]]></description>
        </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>${SITE_NAME}</title>
        <link>${SITE_URL}</link>
        <description>Original reporting on AI systems, products, labor, and enterprise software.</description>
        <language>en-us</language>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
